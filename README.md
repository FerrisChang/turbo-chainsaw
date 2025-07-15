

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
      border-radius: 0.5rem;
      box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
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
        min-height: 25rem;
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
    overflow: hidden;
    position: relative;
    max-width: 100%;
    max-height: 100%;

    .advanced-pie,.chart {
      padding: 0;
      width: 100% !important;
      height: auto !important;
      max-width: 15rem;
      max-height: 15rem;
      overflow: hidden;
      position: relative;
    }

    .advanced-pie {
      flex: 1;
      max-width: 100%;
      width: 100%;
      min-height: 12rem;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;

      
      svg {
        width: 100% !important;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100% !important;
        overflow: hidden;
        position: relative;
      }

      path {
        stroke-width: 0.125rem !important;
      }
      .pie-label {
        font-size: 0.625rem;
        font-weight: 600;
        fill: #333;
        text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.8);
      }
    }
    .advanced-pie-legend-wrapper {
      width: 100% !important;
      max-width: 20rem;
      overflow: hidden;
      position: relative;

        .advanced-pie-legend {
        width: 100% !important;
        padding: 0.25rem 0.125rem 0.125rem 0.125rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.25rem;
        justify-content: center;
        overflow: hidden;
        position: relative;
        
        .total-value {
          padding-left: 0.125rem;
          font-size: 0.625rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          font-size: 0.625rem;
          font-weight: 500;
          color: #333;
          padding: 0.1875rem 0.25rem;
          background: rgba(255,255,255,0.9);
          border-radius: 0.25rem;
          box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.1);
          min-width: 4rem;
          max-width: 6rem;
          flex: 0 1 auto;
          overflow: hidden;
          position: relative;

          .legend-label {
            font-weight: 600;
            color: #333;
            margin-left: 0.1875rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 2.5rem;
          }
          
          .legend-value {
            font-weight: 600;
            color: #555;
            margin-left: 0.1875rem;
            min-width: 1rem;
            text-align: right;
          }
          
          .legend-percent {
            font-weight: 500;
            color: #666;
            margin-left: 0.1875rem;
            min-width: 1.5rem;
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
              font-size: 0.6875rem;
              font-weight: 500;
              fill: #555;
            }
          }
        }
  
        .y-axis {
          .tick {
            text {
              font-size: 0.6875rem;
              font-weight: 500;
              fill: #555;
            }
          }
        }
  
        .x-axis-label, .y-axis-label {
          font-size: 0.75rem;
          font-weight: 600;
          fill: #333;
        }
  
        .legend {
          .legend-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 0.5rem;
          }
  
          .legend-labels {
            .legend-label {
              font-size: 0.75rem;
              font-weight: 500;
              color: #555;
              line-height: 1.4;
              margin-bottom: 0.25rem;
  
              .legend-label-text {
                color: #333;
                font-weight: 600;
              }
  
              .legend-label-color {
                border-radius: 0.1875rem;
                margin-right: 0.5rem;
              }
            }
          }
        }
      }
  

      .chart-container {
        width: 100%;
        height: 100%;
        min-height: 21.875rem;
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
            min-height: 28.125rem;
            padding: 2rem;
          }
        }
        
        ::ng-deep {
          ngx-charts-advanced-pie-chart {
            .advanced-pie,.chart {
              max-width: 20rem;
              max-height: 20rem;
            }
            
            .advanced-pie-legend-wrapper {
              max-width: 25rem;
            }
          }
          
          .ngx-charts-bar-vertical {
            .x-axis, .y-axis {
              .tick text {
                font-size: 0.75rem;
              }
            }
          }
        }
      }

          // Medium screens (768px to 1199px)
      @media (min-width: 768px) and (max-width: 1199px) {
        .analytics-card {
          .card-body {
            min-height: 25rem;
            padding: 1.5rem;
          }
        }
        
        ::ng-deep {
          ngx-charts-advanced-pie-chart {
            .advanced-pie,.chart {
              max-width: 16rem;
              max-height: 16rem;
            }
            
            .advanced-pie-legend-wrapper {
              max-width: 20rem;
            }
          }
        }
      }

                 // Small screens (576px to 767px)
      @media (min-width: 576px) and (max-width: 767px) {
        .analytics-card {
          .card-body {
            min-height: 21.875rem;
            padding: 1rem;
          }
        }
        
        ::ng-deep {
          ngx-charts-advanced-pie-chart {
            .advanced-pie,.chart {
              max-width: 13rem;
              max-height: 13rem;
              padding: 0;
            }
            
            .advanced-pie-legend-wrapper {
              max-width: 16rem;
              
              .advanced-pie-legend {
                gap: 0.1875rem;
                padding: 0.25rem 0.125rem 0.125rem 0.125rem;
                
                .legend-item {
                  font-size: 0.5625rem;
                  padding: 0.125rem 0.1875rem;
                  min-width: 3.5rem;
                  max-width: 5rem;
                  
                  .legend-label {
                    max-width: 2rem;
                    margin-left: 0.1875rem;
                  }
                  
                  .legend-value {
                    min-width: 0.875rem;
                    margin-left: 0.1875rem;
                  }
                  
                  .legend-percent {
                    min-width: 1.25rem;
                    margin-left: 0.1875rem;
                  }
                }
              }
            }
          }
          
          .ngx-charts-bar-vertical {
            .x-axis, .y-axis {
              .tick text {
                font-size: 0.625rem;
              }
            }
            
            .x-axis-label, .y-axis-label {
              font-size: 0.6875rem;
            }
          }
        }
      }

                 // Extra small screens (up to 575px)
      @media (max-width: 575px) {
        .analytics-card {
          .card-body {
            min-height: 18.75rem;
            padding: 0.75rem;
          }
        }
        
        ::ng-deep {
          ngx-charts-advanced-pie-chart {
            .advanced-pie,.chart {
              max-width: 10rem;
              max-height: 10rem;
              padding: 0;
            }
            
            .advanced-pie-legend-wrapper {
              max-width: 100%;
              
              .advanced-pie-legend {
                flex-direction: column;
                gap: 0.125rem;
                padding: 0.25rem 0.125rem 0.125rem 0.125rem;
                
                .legend-item {
                  font-size: 0.5rem;
                  padding: 0.0625rem 0.125rem;
                  min-width: 3rem;
                  max-width: none;
                  width: 100%;
                  justify-content: space-between;
                  
                  .legend-label {
                    max-width: none;
                    margin-left: 0.125rem;
                    flex: 1;
                  }
                  
                  .legend-value {
                    min-width: 0.75rem;
                    margin-left: 0.125rem;
                  }
                  
                  .legend-percent {
                    min-width: 1rem;
                    margin-left: 0.125rem;
                  }
                }
              }
            }
            
            .pie-label {
              font-size: 0.5rem !important;
            }
          }
          
          .ngx-charts-bar-vertical {
            .x-axis, .y-axis {
              .tick text {
                font-size: 0.5625rem;
              }
            }
            
            .x-axis-label, .y-axis-label {
              font-size: 0.625rem;
            }
            
            .legend {
              .legend-title {
                font-size: 0.75rem;
              }
              
              .legend-labels {
                .legend-label {
                  font-size: 0.625rem;
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
          min-height: 15.625rem;
        }
      }
      
      ::ng-deep {
        ngx-charts-advanced-pie-chart {
          .advanced-pie,.chart {
            max-height: 12.5rem;
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
            text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
  }
  
  .chart-legend-container {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 0.375rem;
    margin-top: 1rem;
    box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1);
  
    .legend-item {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 500;
  
      .legend-color {
        width: 1rem;
        height: 1rem;
        border-radius: 0.1875rem;
        margin-right: 0.5rem;
        border: 0.0625rem solid rgba(0, 0, 0, 0.1);
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
  }
