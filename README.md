
    @GetMapping("/vcid/{vcid}")
    public ResponseEntity<List<VcidStatusResponse>> getVcidStatuses(
            @Parameter(description = "VCID to search for", required = true)
            @PathVariable String vcid) {
        
        try {
            List<VcidStatusResponse> statuses = internalApiClient.getVcidStatuses(vcid);
            return ResponseEntity.ok(statuses);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


     @GetMapping("/vcid/all")
    public ResponseEntity<List<VcidStatusResponse>> getAllVcidStatuses() {
        try {
            List<VcidStatusResponse> statuses = internalApiClient.getAllVcidStatuses();
            return ResponseEntity.ok(statuses);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
