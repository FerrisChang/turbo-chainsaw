package controller;

import java.util.List;
import service.WorkflowService;

public class WorkflowController {

    private WorkflowService workflowService;
    
    public WorkflowController() {
        this.workflowService = new WorkflowService();
    }
    
    public List<WorkflowService.VcidStatus> getVcidStatuses(String vcid) {
        return workflowService.getVcidStatuses(vcid);
    }
    
    public List<WorkflowService.VcidStatus> getAllVcidStatuses() {
        return workflowService.getAllVcidStatuses();
    }
    
    public boolean updateVcidStatus(String vcid, String status) {
        return workflowService.updateVcidStatus(vcid, status);
    }
    
    public boolean addVcid(String vcid, String status) {
        return workflowService.addVcid(vcid, status);
    }

    public String getWorkFlowString(String workflowId) {
        return "Received workflow.id = " + workflowId;
    }
}








package service;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class WorkflowService {
    
    private Map<String, String> vcidStatusMap;
    
    public WorkflowService() {
        vcidStatusMap = new HashMap<>();
        vcidStatusMap.put("VCID001", "ACTIVE");
        vcidStatusMap.put("VCID002", "PENDING");
        vcidStatusMap.put("VCID003", "COMPLETED");
        vcidStatusMap.put("VCID004", "EXPIRED");
        vcidStatusMap.put("VCID005", "REVOKED");
    }
    
    public List<VcidStatus> getVcidStatuses(String vcid) {
        List<VcidStatus> statuses = new ArrayList<>();
        
        if (vcidStatusMap.containsKey(vcid)) {
            statuses.add(new VcidStatus(vcid, vcidStatusMap.get(vcid)));
        }
        
        String relatedVcid1 = vcid + "_related_1";
        String relatedVcid2 = vcid + "_related_2";
        
        statuses.add(new VcidStatus(relatedVcid1, "PENDING"));
        statuses.add(new VcidStatus(relatedVcid2, "ACTIVE"));
        
        return statuses;
    }
    
    public List<VcidStatus> getAllVcidStatuses() {
        List<VcidStatus> statuses = new ArrayList<>();
        
        for (Map.Entry<String, String> entry : vcidStatusMap.entrySet()) {
            statuses.add(new VcidStatus(entry.getKey(), entry.getValue()));
        }
        
        return statuses;
    }
    
    public boolean updateVcidStatus(String vcid, String status) {
        if (vcid != null && status != null) {
            vcidStatusMap.put(vcid, status);
            return true;
        }
        return false;
    }
    
    public boolean addVcid(String vcid, String status) {
        if (vcid != null && status != null && !vcidStatusMap.containsKey(vcid)) {
            vcidStatusMap.put(vcid, status);
            return true;
        }
        return false;
    }
    
    public static class VcidStatus {
        private String vcid;
        private String status;
        
        public VcidStatus(String vcid, String status) {
            this.vcid = vcid;
            this.status = status;
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
            return "VcidStatus{vcid='" + vcid + "', status='" + status + "'}";
        }
    }
} 

