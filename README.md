
package gov.dhs.cbp.cspd.tv.model;

import java.util.Date;

public class VcidStatus {
    private Long vcidStatusId;
    private String vcid;
    private String status;
    private Date createDttm;
    private String statusCd;

    public VcidStatus() {}

    public VcidStatus(String vcid, String status) {
        this.vcid = vcid;
        this.status = status;
        this.createDttm = new Date();
        this.statusCd = "ACTIVE";
    }

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

    public Date getCreateDttm() {
        return createDttm;
    }

    public void setCreateDttm(Date createDttm) {
        this.createDttm = createDttm;
    }

    public String getStatusCd() {
        return statusCd;
    }

    public void setStatusCd(String statusCd) {
        this.statusCd = statusCd;
    }

    @Override
    public String toString() {
        return "VcidStatus{vcidStatusId=" + vcidStatusId + 
               ", vcid='" + vcid + "'" + 
               ", status='" + status + "'" + 
               ", createDttm=" + createDttm + 
               ", statusCd='" + statusCd + "'}";
    }
} 
