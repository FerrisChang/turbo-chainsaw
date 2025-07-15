
    // Override ngx-charts legend styling for full text visibility
    .ngx-charts-legend {
      width: 100% !important;
      
      // Target the inner div that contains the legend text
      > div {
        width: 100% !important;
        max-width: none !important;
        white-space: normal !important;
        word-wrap: break-word !important;
        overflow: visible !important;
      }
      
      // Ensure legend labels don't get cut off
      .legend-label {
        width: 100% !important;
        max-width: none !important;
        white-space: normal !important;
        word-wrap: break-word !important;
        overflow: visible !important;
        
        .legend-label-text {
          width: 100% !important;
          max-width: none !important;
          white-space: normal !important;
          word-wrap: break-word !important;
          overflow: visible !important;
        }
      }
    }
