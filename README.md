    <!-- Analytics Section -->
    <div class="analytics-section container-fluid" *ngIf="selectedCountry">
        <div class="row">
            <div class="col-lg-6 col-md-12 mb-4">
                <div class="analytics-card">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col">
                                <h4 class="card-title">
                                    <i class="bi bi-pie-chart me-2"></i>
                                    Distribution of Company Statuses for AEO Profile
                                </h4>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-sm btn-outline-light" [matMenuTriggerFor]="pieMenu">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <mat-menu #pieMenu="matMenu">
                                    <button mat-menu-item>
                                        <i class="bi bi-download me-2"></i>Export
                                    </button>
                                    <button mat-menu-item>
                                        <i class="bi bi-funnel me-2"></i>Filter
                                    </button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <ngx-charts-pie-chart 
                                [view]="view2" 
                                [results]="mraApprovalData" 
                                [gradient]="gradient"
                                [legend]="showLegend" 
                                [labels]="showLabels" 
                                [doughnut]="isDoughnut"
                                [scheme]="colorScheme" 
                                [legendTitle]="'Status Distribution'"
                                [tooltipDisabled]="false"
                                (select)="onSelect($event)">
                            </ngx-charts-pie-chart>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 mb-4">
                <div class="analytics-card">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col">
                                <h4 class="card-title">
                                    <i class="bi bi-bar-chart me-2"></i>
                                    MRA Companies by Country
                                </h4>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-sm btn-outline-light" [matMenuTriggerFor]="barMenu">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <mat-menu #barMenu="matMenu">
                                    <button mat-menu-item>
                                        <i class="bi bi-download me-2"></i>Export
                                    </button>
                                    <button mat-menu-item>
                                        <i class="bi bi-funnel me-2"></i>Filter
                                    </button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <ngx-charts-bar-vertical 
                                [view]="view2" 
                                [results]="mraCountryData" 
                                [gradient]="gradient"
                                [xAxis]="showXAxis" 
                                [yAxis]="showYAxis" 
                                [legend]="showLegend"
                                [showXAxisLabel]="showXAxisLabel2" 
                                [showYAxisLabel]="showYAxisLabel2"
                                [xAxisLabel]="xAxisLabel2" 
                                [yAxisLabel]="yAxisLabel2" 
                                [scheme]="colorScheme"
                                [tooltipDisabled]="false"
                                (select)="onSelect($event)">
                            </ngx-charts-bar-vertical>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Additional Legend Container for Better Readability -->
        <div class="row mt-3" *ngIf="mraApprovalData.length > 0 || mraCountryData.length > 0">
            <div class="col-12">
                <div class="chart-legend-container">
                    <h5 class="mb-3">Chart Legend</h5>
                    <div class="row">
                        <div class="col-md-6" *ngIf="mraApprovalData.length > 0">
                            <h6 class="text-muted mb-2">Status Distribution</h6>
                            <div class="legend-item" *ngFor="let item of mraApprovalData">
                                <div class="legend-color" [style.background-color]="getColorForStatus(item.name)"></div>
                                <span class="legend-text">{{item.name}}: {{item.value}} companies</span>
                            </div>
                        </div>
                        <div class="col-md-6" *ngIf="mraCountryData.length > 0">
                            <h6 class="text-muted mb-2">Country Distribution</h6>
                            <div class="legend-item" *ngFor="let item of mraCountryData">
                                <div class="legend-color" [style.background-color]="getColorForCountry(item.name)"></div>
                                <span class="legend-text">{{item.name}}: {{item.value}} companies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
















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

  // Chart specific styling for better readability
  ::ng-deep {
    // Pie chart legend styling
    .ngx-charts-pie-chart {
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

      // Pie chart labels
      .pie-label {
        font-size: 11px;
        font-weight: 600;
        fill: #333;
        text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
      }
    }

    // Bar chart styling
    .ngx-charts-bar-vertical {
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

    // General chart container styling
    .chart-container {
      width: 100%;
      height: 100%;
      min-height: 350px;
    }
  }

  // Responsive design
  @media (max-width: 768px) {
    .analytics-card {
      .card-body {
        min-height: 300px;
        padding: 1rem;
      }
    }

    ::ng-deep {
      .ngx-charts-pie-chart,
      .ngx-charts-bar-vertical {
        .legend {
          .legend-labels {
            .legend-label {
              font-size: 11px;
            }
          }
        }
      }
    }
  }

  // Dark theme support
  @media (prefers-color-scheme: dark) {
    .analytics-card {
      background: #2d3748;
      color: #e2e8f0;

      .card-header {
        background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
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

// Additional utility classes for chart readability
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

// High contrast mode support
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

















	// Color generation methods for chart legends
	getColorForStatus(status: string): string {
		const statusColors: { [key: string]: string } = {
			'APPROVED': '#5AA454',
			'PENDING': '#C7B42C',
			'REJECTED': '#A10A28',
			'In Progress': '#C7B42C',
			'Approved': '#5AA454',
			'Rejected': '#A10A28'
		};
		return statusColors[status] || '#AAAAAA';
	}

	getColorForCountry(country: string): string {
		// Generate a consistent color based on country name
		const colors = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#7B68EE', '#FF6347', '#32CD32', '#FFD700'];
		const index = country.charCodeAt(0) % colors.length;
		return colors[index];
	}
