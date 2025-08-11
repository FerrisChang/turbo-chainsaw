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
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

@Service
public class InternalApiClientNoComments {
    
    private final RestTemplate restTemplate;
    private final String internalApiBaseUrl;
    private final String internalApiUsername;
    private final String internalApiPassword;
    
    public InternalApiClientNoComments(
            @Value("${internal.api.base-url:http://localhost:8080}") String internalApiBaseUrl,
            @Value("${internal.api.username:admin}") String internalApiUsername,
            @Value("${internal.api.password:admin123}") String internalApiPassword) {
        this.restTemplate = new RestTemplate();
        this.internalApiBaseUrl = internalApiBaseUrl;
        this.internalApiUsername = internalApiUsername;
        this.internalApiPassword = internalApiPassword;
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
        } catch (ResourceAccessException e) {
            throw new RuntimeException("Internal API is not accessible: " + e.getMessage(), e);
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
        } catch (ResourceAccessException e) {
            throw new RuntimeException("Internal API is not accessible: " + e.getMessage(), e);
        }
    }
    
    public boolean isInternalApiHealthy() {
        try {
            String url = internalApiBaseUrl + "/api/workflow/health";
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            return false;
        }
    }
    
    private HttpHeaders createAuthHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(internalApiUsername, internalApiPassword);
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
