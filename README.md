package gov.dhs.cbp.cspd.tv.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessagePostProcessor;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import gov.dhs.cbp.cspd.tv.util.SchemaValidation;
import gov.dhs.cbp.cspd.tv.util.Util;
import gov.dhs.cbp.cspd.tv.util.VCTypesEnum;
import gov.dhs.cbp.cspd.tv.verifier.VCVerifier;
import gov.dhs.cbp.cspd.tv.verifier.VPVerifier;
import jakarta.jms.JMSException;
import jakarta.jms.Message;

@Service
public class VerifiablePresentationService {

	private static final Logger logger = LoggerFactory.getLogger(VerifiablePresentationService.class);

	@Value("${spring.activemq.vp.outbound}")
	private String vpOutboundQueue;

	@Autowired
	private SchemaValidation schemaValidation;

	@Autowired
	private JmsTemplate jmsTemplate;

	@Autowired
	private MessageMonitorService messageMonitorService;

	@Autowired
	private VPVerifier vpVerifier;

	@Autowired
	private VCVerifier vcVerifier;

	@Value("${enable-schema-validation:true}")
	private boolean enableSchemaValidation;

	@Value("${enable-verification:true}")
	private boolean enableVerification;

	public String processVerifiablePresentation(Long correlationId, String jwt) throws Exception {
		// retrieve the full decoded jwt
		
		String jwtDecoded = decodeJwt(jwt);
		logger.info("Fully decoded Jwt = {}", jwtDecoded);
		
		jmsTemplate.convertAndSend(vpOutboundQueue, jwtDecoded, new MessagePostProcessor() {
			public Message postProcessMessage(Message message) throws JMSException {
				message.setJMSCorrelationID(String.valueOf(correlationId));
				return message;
			}
		});
		messageMonitorService.logOutgngMsgToWorkflow(correlationId, jwtDecoded);
		return "success";
	}

	public String decodeJwt(String jwt) throws Exception {
		String decodedVp = Util.decodeVpStr(jwt);
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode vpNode = objectMapper.readTree(decodedVp);
		JsonNode vcListNode = vpNode.get("verifiableCredential");
		if (vcListNode != null) {
			Iterator<JsonNode> vcElements = vcListNode.elements();
			while (vcElements.hasNext()) {
				JsonNode vcNode = vcElements.next();
				String vcNodeStr = vcNode.get("id").toString();
				String decodedVc = Util.decodeVcId(vcNodeStr);
				decodedVp = StringUtils.replace(decodedVp, vcNodeStr, decodedVc);
			}
		}
		return decodedVp;
	}

	public List<String> validate(String jwt) throws Exception {
		List<String> validationResults = new ArrayList<>();
		try {
			if(enableVerification) {
				String response = vpVerifier.verifyPresentationToken(jwt);
				boolean vpVerified = StringUtils.isNotBlank(response) && response.contains("has passed");
				if (!vpVerified) {
					validationResults.add(response);
				}
			}
			// decode vp part, validate the schema and do verification of presentation..
			String decodedVp = Util.decodeVpStr(jwt);
			logger.info(decodedVp);
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode vpNode = objectMapper.readTree(decodedVp);
						
			if (enableSchemaValidation) {
				String vpValidationResult = schemaValidation.validate(VCTypesEnum.VerifiablePresentation, vpNode);
				boolean vpSchemaValid = Util.isEmpty(vpValidationResult);
				if (!vpSchemaValid) {
					String errorMessage = "{\"schema\":\"" + VCTypesEnum.VerifiablePresentation.toString() + "\",  "
							+ vpValidationResult + "}";
					validationResults.add(errorMessage);
				}
			}
			// validate and verify each vc..
			JsonNode vcListNode = vpNode.get("verifiableCredential");
			if (vcListNode == null) {
				logger.info("No verifiable credentials in pay load to process");
			} else {
				Iterator<JsonNode> vcElements = vcListNode.elements();
				while (vcElements.hasNext()) {
					JsonNode vcNode = vcElements.next();
					String vcJwt = vcNode.get("id").asText();
					String[] vcJwtSplit = vcJwt.split(";");
					if(enableVerification) {
						String response = vcVerifier.verifyVcToken(vcJwtSplit[1]);
						boolean vcVerified = StringUtils.isNotBlank(response) && response.contains("has passed");
						if (!vcVerified) {
							validationResults.add(response);
						}
					}
					if (enableSchemaValidation) {
						String decodedVcStr = Util.decodeVcId(vcJwt);
						logger.info(decodedVcStr);
						JsonNode decodedVcNode = objectMapper.readTree(decodedVcStr);
						// type is an array of 2 values, the 2nd value being the actual vc.
						String type = decodedVcNode.get("type").get(1).asText();
						if(VCTypesEnum.valueOf(type) != null) {
							String vcValidationResult = schemaValidation.validate(VCTypesEnum.valueOf(type), decodedVcNode);
							boolean vcSchemaValid = Util.isEmpty(vcValidationResult);
							if (!vcSchemaValid) {
								String errorMessage = "{\"schema\":\"" + type + "\",  "
										+ vcValidationResult + "}";
								validationResults.add(errorMessage);
							}
						}else {
							String errorMessage = "{\"schema\":\"" + type + "\",  "
									+ "not supported" + "}";
							validationResults.add(errorMessage);
						}
					}
				}
			}
		} catch (Exception e) {
			logger.error(e.toString(), e);
		}
		return validationResults;
	}
}
