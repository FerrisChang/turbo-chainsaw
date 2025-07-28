package gov.dhs.cbp.cspd.tv.controller;


@RestController()
public class WorkflowController {

        public String getWorkFlowString(String workflowId) {
            return "Revieved workflow.id = " + workflowId;
        }
}
