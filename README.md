
  #map {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height:  460px;
  }
 .country-input {
  width: 30%;
 }
 .country-row {
  display: flex; 
 }
 .flag-network-icon {
  margin-right: 1em; 
  width: 4em; 
  height: 4em;
 }
 .card-title>.title-header {
  font-size: 1.5em; 
  font-weight: 550;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
 }
 .card-title>.title-description {
  margin-top: 0.5em; 
  margin-left: 1em;
  font-size: 1.1em;
 }
 .companies-table-layout {
  height: 50em;
  display: flex; 
  gap: 2em;
}
.companies-table-frame {
  flex: 1;
  height: 100%;
}

.companies-table-frame>.card-body{
  max-height: 100%; 
  overflow-y: hidden
 } 
    body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
      }
      
      html {
        height: -webkit-fill-available;
      }
      
      main {
        height: 100vh;
        height: -webkit-fill-available;
        max-height: 100vh;
        overflow-x: auto;
        overflow-y: hidden;
      }
      
      .dropdown-toggle { outline: 0; }
      
      .btn-toggle {
        padding: .25rem .5rem;
        font-weight: 600;
        color: var(--bs-emphasis-color);
        background-color: transparent;
      }
      .btn-toggle:hover,
      .btn-toggle:focus {
        color: rgba(var(--bs-emphasis-color-rgb), .85);
        background-color: var(--bs-tertiary-bg);
      }
       
      
      .btn-toggle[aria-expanded="true"] {
        color: rgba(var(--bs-emphasis-color-rgb), .85);
      }
      .btn-toggle[aria-expanded="true"]::before {
        transform: rotate(90deg);
      }
      
      .btn-toggle-nav a {
        padding: .1875rem .5rem;
        margin-top: .125rem;
        margin-left: 1.25rem;
      }
      .btn-toggle-nav a:hover,
      .btn-toggle-nav a:focus {
        background-color: var(--bs-tertiary-bg);
      }
      
      .scrollarea {
        overflow-y: auto;
      }
    
    
      .navbar-svg-icon {
        position:relative;
        top:-2px;
        margin-right: 5px
    }
    
    .navbar-svg-icon-inactive {
      position:relative; 
      margin-right: 5px
    }
    
    .btn-filter {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
       ;
    }
    
    .navbar-btn-hover:hover {
      background-color: rgb(225, 236, 247);
      border-radius: 5px;
      
    }
    
    
    .btn-filter:hover {
       color: rgb(8, 67, 230);
    }
    
    mat-sidenav {
      width: 350px;
    }
    
.widget-card {
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  border-color: rgb(142, 153, 163);
  }
  
 
    .card-hdr-class {
      background:  rgb(0, 60, 110);
      color: white;
    }
    
    .example-accordion {
      display: block;
      max-width: 500px;
    }
    
    .example-accordion-item {
      display: block;
      border: solid 1px #ccc;
    }
    
    .example-accordion-item + .example-accordion-item {
      border-top: none;
    }
    
    .example-accordion-item-header {
      display: flex;
      align-content: center;
      justify-content: space-between;
    }
    
    .example-accordion-item-description {
      font-size: 0.85em;
      color: #999;
    }
    
    .example-accordion-item-header,
    .example-accordion-item-body {
      padding: 16px;
    }
    
    .example-accordion-item-header:hover {
      cursor: pointer;
      background-color: #eee;
    }
    
    .example-accordion-item:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    
    .example-accordion-item:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .loading-container {
      margin-left: 1em;
      display: flex; 
      gap: 0.75em; 
      font-size: 2em; 
    }
    .loading-container>.spinner {
      width: 2.5em !important;
      height: 2.5em !important;
    }
    .loading-text {
      margin-top: auto;
      margin-bottom: auto;
    }

    .analytics-section {
      margin-top: 2rem;
      margin-bottom: 2rem;
    
      .analytics-card {
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
        overflow: hidden;
    
        .card-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 1.5rem;
          border-bottom: none;
    
          .card-title {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 600;
            color: white;
          }
        }
    
        .card-body {
          padding: 1.5rem;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }


 ::ng-deep {
  ngx-charts-advanced-pie-chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .advanced-pie,.chart {
      padding: 0 1rem 0 3rem;
      width: 100% !important;
      height: auto !important;
      max-width: 400px;
      max-height: 400px;
    }

    .advanced-pie {
      flex: 1;
      max-width: 100%;
      width: 100%;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      
      svg {
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
      }

      path {
        stroke-width: 2px !important;
      }
      .pie-label {
        font-size: 12px;
        font-weight: 600;
        fill: #333;
        text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
      }
    }
    .advanced-pie-legend-wrapper {
      width: 100% !important;
      max-width: 500px;

        .advanced-pie-legend {
        width: 100% !important;
        padding: 15px 8px 8px 8px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        overflow: hidden;
        
        .total-value {
          padding-left: 8px;
          font-size: 12px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          font-weight: 500;
          color: #333;
          padding: 6px 10px;
          background: rgba(255,255,255,0.9);
          border-radius: 6px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          min-width: 100px;
          max-width: 150px;
          flex: 0 1 auto;
          overflow: hidden;

          .legend-label {
            font-weight: 600;
            color: #333;
            margin-left: 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 60px;
          }
          
          .legend-value {
            font-weight: 600;
            color: #555;
            margin-left: 6px;
            min-width: 25px;
            text-align: right;
          }
          
          .legend-percent {
            font-weight: 500;
            color: #666;
            margin-left: 6px;
            min-width: 35px;
            text-align: right;
          }
        }
      }    
    }

  }
    
        .ngx-charts-bar-vertical {
          width: 100% !important;
          height: 100% !important;
          
          .x-axis {
            .tick {
              text {
                font-size: 11px;
                font-weight: 500;
                fill: #555;
              }
            }
          }
    
          .y-axis {
            .tick {
              text {
                font-size: 11px;
                font-weight: 500;
                fill: #555;
              }
            }
          }
    
          .x-axis-label, .y-axis-label {
            font-size: 12px;
            font-weight: 600;
            fill: #333;
          }
    
          .legend {
            .legend-title {
              font-size: 14px;
              font-weight: 600;
              color: #333;
              margin-bottom: 8px;
            }
    
            .legend-labels {
              .legend-label {
                font-size: 12px;
                font-weight: 500;
                color: #555;
                line-height: 1.4;
                margin-bottom: 4px;
    
                .legend-label-text {
                  color: #333;
                  font-weight: 600;
                }
    
                .legend-label-color {
                  border-radius: 3px;
                  margin-right: 8px;
                }
              }
            }
          }
        }
    

        .chart-container {
          width: 100%;
          height: 100%;
          min-height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .ngx-charts-outer {
          width: 100% !important;
          height: 100% !important;
        }


    // Override ngx-charts legend styling for full text visibility
    ngx-charts-legend {
      width: 100% !important;
      max-width: 100%;
      
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
          max-width: none !important;
          white-space: normal !important;
          word-wrap: break-word !important;
          overflow: visible !important;
        }
      }
    }

      }
    

      // Large screens (1200px and up)
      @media (min-width: 1200px) {
        .analytics-card {
          .card-body {
            min-height: 450px;
            padding: 2rem;
          }
        }
        
        ::ng-deep {
          ngx-charts-advanced-pie-chart {
            .advanced-pie,.chart {
              max-width: 500px;
              max-height: 500px;
            }
            
            .advanced-pie-legend-wrapper {
              max-width: 600px;
            }
          }
          
          .ngx-charts-bar-vertical {
            .x-axis, .y-axis {
              .tick text {
                font-size: 12px;
              }
            }
          }
        }
      }

      // Medium screens (768px to 1199px)
      @media (min-width: 768px) and (max-width: 1199px) {
        .analytics-card {
          .card-body {
            min-height: 400px;
            padding: 1.5rem;
          }
        }
        
        ::ng-deep {
          ngx-charts-advanced-pie-chart {
            .advanced-pie,.chart {
              max-width: 350px;
              max-height: 350px;
            }
            
            .advanced-pie-legend-wrapper {
              max-width: 450px;
            }
          }
        }
      }

             // Small screens (576px to 767px)
       @media (min-width: 576px) and (max-width: 767px) {
         .analytics-card {
           .card-body {
             min-height: 350px;
             padding: 1rem;
           }
         }
         
         ::ng-deep {
           ngx-charts-advanced-pie-chart {
             .advanced-pie,.chart {
               max-width: 300px;
               max-height: 300px;
               padding: 0 0.5rem 0 1.5rem;
             }
             
             .advanced-pie-legend-wrapper {
               max-width: 350px;
               
               .advanced-pie-legend {
                 gap: 8px;
                 padding: 12px 6px 6px 6px;
                 
                 .legend-item {
                   font-size: 11px;
                   padding: 5px 8px;
                   min-width: 90px;
                   max-width: 120px;
                   
                   .legend-label {
                     max-width: 50px;
                     margin-left: 4px;
                   }
                   
                   .legend-value {
                     min-width: 20px;
                     margin-left: 4px;
                   }
                   
                   .legend-percent {
                     min-width: 30px;
                     margin-left: 4px;
                   }
                 }
               }
             }
           }
           
           .ngx-charts-bar-vertical {
             .x-axis, .y-axis {
               .tick text {
                 font-size: 10px;
               }
             }
             
             .x-axis-label, .y-axis-label {
               font-size: 11px;
             }
           }
         }
       }

             // Extra small screens (up to 575px)
       @media (max-width: 575px) {
         .analytics-card {
           .card-body {
             min-height: 300px;
             padding: 0.75rem;
           }
         }
         
         ::ng-deep {
           ngx-charts-advanced-pie-chart {
             .advanced-pie,.chart {
               max-width: 250px;
               max-height: 250px;
               padding: 0 0.25rem 0 1rem;
             }
             
             .advanced-pie-legend-wrapper {
               max-width: 100%;
               
               .advanced-pie-legend {
                 flex-direction: column;
                 gap: 6px;
                 padding: 12px 4px 4px 4px;
                 
                 .legend-item {
                   font-size: 10px;
                   padding: 4px 6px;
                   min-width: 70px;
                   max-width: none;
                   width: 100%;
                   justify-content: space-between;
                   
                   .legend-label {
                     max-width: none;
                     margin-left: 4px;
                     flex: 1;
                   }
                   
                   .legend-value {
                     min-width: 18px;
                     margin-left: 4px;
                   }
                   
                   .legend-percent {
                     min-width: 25px;
                     margin-left: 4px;
                   }
                 }
               }
             }
             
             .pie-label {
               font-size: 10px !important;
             }
           }
           
           .ngx-charts-bar-vertical {
             .x-axis, .y-axis {
               .tick text {
                 font-size: 9px;
               }
             }
             
             .x-axis-label, .y-axis-label {
               font-size: 10px;
             }
             
             .legend {
               .legend-title {
                 font-size: 12px;
               }
               
               .legend-labels {
                 .legend-label {
                   font-size: 10px;
                 }
               }
             }
           }
         }
       }

      // Landscape orientation on mobile
      @media (max-width: 767px) and (orientation: landscape) {
        .analytics-card {
          .card-body {
            min-height: 250px;
          }
        }
        
        ::ng-deep {
          ngx-charts-advanced-pie-chart {
            .advanced-pie,.chart {
              max-height: 200px;
            }
            
            .advanced-pie-legend-wrapper {
              .advanced-pie-legend {
                flex-direction: row;
                flex-wrap: wrap;
              }
            }
          }
        }
      }
    
      @media (prefers-color-scheme: dark) {
        .analytics-card {
          .card-header {
            background: rgb(0, 60, 110);
          }
        }
    
        ::ng-deep {
          .ngx-charts-pie-chart,
          .ngx-charts-bar-vertical {
            .legend {
              .legend-title {
                color: #e2e8f0;
              }
    
              .legend-labels {
                .legend-label {
                  color: #cbd5e0;
    
                  .legend-label-text {
                    color: #e2e8f0;
                  }
                }
              }
            }
    
            .x-axis, .y-axis {
              .tick text {
                fill: #cbd5e0;
              }
            }
    
            .x-axis-label, .y-axis-label {
              fill: #e2e8f0;
            }
    
            .pie-label {
              fill: #e2e8f0;
              text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
            }
          }
        }
      }
    }
    
    .chart-legend-container {
      padding: 1rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 6px;
      margin-top: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    
      .legend-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        font-size: 13px;
        font-weight: 500;
    
        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          margin-right: 8px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
    
        .legend-text {
          color: #333;
          font-weight: 600;
        }
      }
    }
    
    @media (prefers-contrast: high) {
      .analytics-section {
        ::ng-deep {
          .ngx-charts-pie-chart,
          .ngx-charts-bar-vertical {
            .legend {
              .legend-labels {
                .legend-label {
                  .legend-label-text {
                    font-weight: 700;
                    color: #000;
                  }
                }
              }
            }
    
            .x-axis, .y-axis {
              .tick text {
                font-weight: 700;
                fill: #000;
              }
            }
    
            .x-axis-label, .y-axis-label {
              font-weight: 700;
              fill: #000;
            }
          }
        }
      }
    }

