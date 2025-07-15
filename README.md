     // Chart specific styling for better readability
    ::ng-deep {
      // Advanced pie chart styling
      .ngx-charts-advanced-pie-chart {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        
        .advanced-pie {
          flex: 1;
          max-width: 60%;
          
          .pie-label {
            font-size: 11px;
            font-weight: 600;
            fill: #333;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
          }
        }
        
        .advanced-pie-legend {
          flex: 1;
          max-width: 40%;
          padding-left: 20px;
          padding-right: 10px;
          
          .legend-item {
            display: flex;
            align-items: center;
            font-size: 13px;
            font-weight: 500;
            color: #333;
            margin-bottom: 12px;
            padding: 4px 0;
            
            .legend-label {
              flex: 1;
              font-weight: 600;
              color: #333;
              margin-left: 8px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            
            .legend-value {
              font-weight: 600;
              color: #555;
              margin-left: 8px;
              min-width: 40px;
              text-align: right;
            }
            
            .legend-percent {
              font-weight: 500;
              color: #666;
              margin-left: 8px;
              min-width: 50px;
              text-align: right;
            }
          }
        }
      }
