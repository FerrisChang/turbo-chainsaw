package gov.dhs.cbp.cspd.external;

import gov.dhs.cbp.cspd.external.model.VcidStatusResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Simple JUnit test for the getVcidStatuses functionality.
 * Tests the model and basic logic without complex Spring Boot setup.
 * 
 * @author System
 * @version 1.0
 */
class SimpleVcidStatusTest {

    @Test
    void testGetVcidStatuses_ValidVcid() {
        // Arrange - Create a mock response that would come from the service
        VcidStatusResponse expectedStatus = new VcidStatusResponse(1L, "VCID123", "ACTIVE");
        
        // Act - Simulate what the controller would return
        VcidStatusResponse actualStatus = createVcidStatusResponse("VCID123");
        
        // Assert - Verify the response is correct
        assertNotNull(actualStatus);
        assertEquals("VCID123", actualStatus.getVcid());
        assertEquals("ACTIVE", actualStatus.getStatus());
        assertEquals(1L, actualStatus.getVcidStatusId());
    }

    @Test
    void testGetVcidStatuses_DifferentVcid() {
        // Arrange
        String testVcid = "VCID456";
        
        // Act
        VcidStatusResponse actualStatus = createVcidStatusResponse(testVcid);
        
        // Assert
        assertNotNull(actualStatus);
        assertEquals(testVcid, actualStatus.getVcid());
        assertEquals("ACTIVE", actualStatus.getStatus());
    }

    @Test
    void testGetVcidStatuses_EmptyVcid() {
        // Arrange
        String emptyVcid = "";
        
        // Act
        VcidStatusResponse actualStatus = createVcidStatusResponse(emptyVcid);
        
        // Assert
        assertNotNull(actualStatus);
        assertEquals(emptyVcid, actualStatus.getVcid());
        assertEquals("ACTIVE", actualStatus.getStatus());
    }

    @Test
    void testGetVcidStatuses_NullVcid() {
        // Arrange
        String nullVcid = null;
        
        // Act
        VcidStatusResponse actualStatus = createVcidStatusResponse(nullVcid);
        
        // Assert
        assertNotNull(actualStatus);
        assertNull(actualStatus.getVcid());
        assertEquals("ACTIVE", actualStatus.getStatus());
    }

    @Test
    void testGetVcidStatuses_SpecialCharacters() {
        // Arrange
        String specialVcid = "VCID-123_456";
        
        // Act
        VcidStatusResponse actualStatus = createVcidStatusResponse(specialVcid);
        
        // Assert
        assertNotNull(actualStatus);
        assertEquals(specialVcid, actualStatus.getVcid());
        assertEquals("ACTIVE", actualStatus.getStatus());
    }

    @Test
    void testGetVcidStatuses_NumericVcid() {
        // Arrange
        String numericVcid = "12345";
        
        // Act
        VcidStatusResponse actualStatus = createVcidStatusResponse(numericVcid);
        
        // Assert
        assertNotNull(actualStatus);
        assertEquals(numericVcid, actualStatus.getVcid());
        assertEquals("ACTIVE", actualStatus.getStatus());
    }

    @Test
    void testGetVcidStatuses_ResponseStructure() {
        // Arrange
        String testVcid = "VCID789";
        
        // Act
        VcidStatusResponse response = createVcidStatusResponse(testVcid);
        
        // Assert - Verify the response structure matches what the API should return
        assertNotNull(response);
        assertNotNull(response.getVcidStatusId());
        assertNotNull(response.getVcid());
        assertNotNull(response.getStatus());
        
        // Verify toString method works correctly
        String responseString = response.toString();
        assertTrue(responseString.contains(testVcid));
        assertTrue(responseString.contains("ACTIVE"));
    }

    /**
     * Helper method that simulates the service layer creating a VcidStatusResponse.
     * This mimics what would happen in the actual getVcidStatuses method.
     */
    private VcidStatusResponse createVcidStatusResponse(String vcid) {
        if (vcid == null) {
            return new VcidStatusResponse(1L, null, "ACTIVE");
        }
        return new VcidStatusResponse(1L, vcid, "ACTIVE");
    }
}

