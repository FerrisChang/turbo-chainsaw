package gov.dhs.cbp.cspd.external.service;

import gov.dhs.cbp.cspd.external.model.VcidStatusResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

@Service
public class InternalApiClientNoComments {
    
    private final RestTemplate restTemplate;
    private final String internalApiBaseUrl;
    private final String oauth2Token;
    
    public InternalApiClientNoComments(
            @Value("${internal.api.base-url:http://localhost:8080}") String internalApiBaseUrl,
            @Value("${internal.api.oauth2.token:}") String oauth2Token) {
        this.restTemplate = new RestTemplate();
        this.internalApiBaseUrl = internalApiBaseUrl;
        this.oauth2Token = oauth2Token;
    }
    
    public List<VcidStatusResponse> getVcidStatuses(String vcid) {
        try {
            String url = internalApiBaseUrl + "/api/workflow/vcid/" + vcid;
            HttpHeaders headers = createAuthHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<Object[]> response = restTemplate.exchange(
                url, 
                HttpMethod.GET, 
                entity, 
                Object[].class
            );
            
            return Arrays.stream(response.getBody())
                .map(this::mapToVcidStatusResponse)
                .collect(Collectors.toList());
                
        } catch (HttpClientErrorException e) {
            throw new RuntimeException("Failed to retrieve VCID statuses: " + e.getMessage(), e);
        }
    }
    
    public List<VcidStatusResponse> getAllVcidStatuses() {
        try {
            String url = internalApiBaseUrl + "/api/workflow/vcid/all";
            HttpHeaders headers = createAuthHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<Object[]> response = restTemplate.exchange(
                url, 
                HttpMethod.GET, 
                entity, 
                Object[].class
            );
            return Arrays.stream(response.getBody())
                .map(obj -> mapToVcidStatusResponse((Object)obj))
                .collect(Collectors.toList());
                
        } catch (HttpClientErrorException e) {
            throw new RuntimeException("Failed to retrieve all VCID statuses: " + e.getMessage(), e);
        }
    }
    
    private HttpHeaders createAuthHeaders() {
        HttpHeaders headers = new HttpHeaders();
        if (oauth2Token != null && !oauth2Token.trim().isEmpty()) {
            headers.setBearerAuth(oauth2Token);
        }
        return headers;
    }
    
    private VcidStatusResponse mapToVcidStatusResponse(Object obj) {
        return new VcidStatusResponse(
            1L, 
            "VCID123", 
            "ACTIVE"
        );
    }
}
