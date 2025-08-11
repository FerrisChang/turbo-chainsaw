public class VcidStatusResponse {
    
    private Long vcidStatusId;
    private String vcid;
    private String status;
    
    public VcidStatusResponse() {}
    
    public VcidStatusResponse(Long vcidStatusId, String vcid, String status) {
        this.vcidStatusId = vcidStatusId;
        this.vcid = vcid;
        this.status = status;
    }
    
    // Getters and Setters
    public Long getVcidStatusId() {
        return vcidStatusId;
    }
    
    public void setVcidStatusId(Long vcidStatusId) {
        this.vcidStatusId = vcidStatusId;
    }
    
    public String getVcid() {
        return vcid;
    }
    
    public void setVcid(String vcid) {
        this.vcid = vcid;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    @Override
    public String toString() {
        return "VcidStatusResponse{" +
                "vcidStatusId=" + vcidStatusId +
                ", vcid='" + vcid + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
