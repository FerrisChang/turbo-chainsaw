    <!-- Analytics Section -->
    <div class="container-fluid pt-2 mt-3 pb-3 mb-3" *ngIf="selectedCountry">
        <div class="row">
            <div class="col-6">
                <div class="card widget-card">
                    <div class="card-header card-hdr-class">
                        <div class="row">
                            <div class="col">
                                <h4 class="card-title mb-1 pt-1">Distribution of Company Statuses for AEO Profile</h4>
                            </div>
                            <div class="col-1 float-right">
                                <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0 text-light" [matMenuTriggerFor]="menu">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </button>
                                <mat-menu #menu="matMenu">
                                    <button mat-menu-item>Export</button>
                                    <button mat-menu-item>Filter</button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body mx-0 px-0">
                        <ngx-charts-pie-chart [view]="view2" [results]="mraApprovalData" [gradient]="gradient"
                            [legend]="showLegend" [labels]="showLabels" [doughnut]="isDoughnut"
                            [scheme]="colorScheme" (select)="onSelect($event)">
                        </ngx-charts-pie-chart>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card widget-card">
                    <div class="card-header card-hdr-class">
                        <div class="row">
                            <div class="col">
                                <h4 class="card-title mb-1 pt-1">MRA Companies by Country</h4>
                            </div>
                            <div class="col-1 float-right">
                                <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0 text-light" [matMenuTriggerFor]="menu">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </button>
                                <mat-menu #menu="matMenu">
                                    <button mat-menu-item>Export</button>
                                    <button mat-menu-item>Filter</button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body mx-0 px-0">
                        <ngx-charts-bar-vertical [view]="view2" [results]="mraCountryData" [gradient]="gradient"
                            [xAxis]="showXAxis" [yAxis]="showYAxis" [legend]="showLegend"
                            [showXAxisLabel]="showXAxisLabel2" [showYAxisLabel]="showYAxisLabel2"
                            [xAxisLabel]="xAxisLabel2" [yAxisLabel]="yAxisLabel2" 
                            [scheme]="colorScheme" (select)="onSelect($event)">
                        </ngx-charts-bar-vertical>
                    </div>
                </div>
            </div>
        </div>
    </div>
