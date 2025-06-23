<ng-container *ngIf="infoPresent">
    <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" animationDuration="0ms">
        <mat-tab label="Business Details">
            <div class="container-fluid entity-tab  ">
                <div class="row">
                    <button type="button" class=" btn btn-light section-header-frame  mb-2" style="text-align: left;"
                        (click)="collapseSection('companyInfo')">
                        <svg *ngIf="!collapsableSections['companyInfo']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                        <svg *ngIf="collapsableSections['companyInfo']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                        </svg>
                        <div class="section-header">G2G Company Information</div>
                    </button>
                    <div class="row mb-2" *ngIf="collapsableSections['companyInfo']">
                        <div class="col-6">
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Country:
                                </div>
                                <div class="col">
                                    {{convertCodeToCountry(hostCountry)}}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Address:
                                </div>
                                <div class="col">
                                    {{companyBasicInfo.companyAddress}}
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Number of Containers:
                                </div>
                                <div class="col">
                                    {{companyBasicInfo.containers}}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Monetary Value:
                                </div>
                                <div class="col">
                                    {{companyBasicInfo.monetary_value}}
                                </div>
                            </div>
                        </div>
                    </div>


                    <button type="button" class=" btn btn-light section-header-frame  " style="text-align: left;"
                        (click)="collapseSection('businessInfo')">
                        <svg *ngIf="!collapsableSections['businessInfo']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                        <svg *ngIf="collapsableSections['businessInfo']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                        </svg>
                        <div class="section-header">Business Information</div>
                    </button>
                    <div class="row mb-2 float-right collapse-section" *ngIf="collapsableSections['businessInfo']">
                        <div class="col-6">
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Company Name:
                                </div>
                                <div class="col">
                                    {{companyBasicInfo.name}}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Doing Business As:
                                </div>
                                <div class="col">
                                    {{companyBasicInfo.name}}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Ownership Type:
                                </div>
                                <div class="col">
                                    {{companyBasicInfo.type}}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Business Start Date:
                                </div>
                                <div class="col">

                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Status:
                                </div>
                                <div class="col status-text"
                                [ngClass]="companyBasicInfo.mra_status.class === 'approved' ? 'approved-text' : companyBasicInfo.mra_status.class === 'rejected' ? 'rejected-text' : 'pending-text'">
                                {{
                                    companyBasicInfo.mra_status.value
                                    }}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Status Last Updated:
                                </div>
                                <div class="col">
                                    {{companyBasicInfo.lastUpdated}}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Website:
                                </div>
                                <div class="col">

                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Number of Employees:
                                </div>
                                <div class="col">

                                </div>
                            </div>
                        </div>
                    </div>
                    <button *ngIf="mraRequest" type="button" class=" btn btn-light section-header-frame  "
                        style="text-align: left;" (click)="collapseSection('mraRequest')">
                        <svg *ngIf="!collapsableSections['mraRequest']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                        <svg *ngIf="collapsableSections['mraRequest']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                        </svg>
                        <div class="section-header">MRA Request Information: </div>
                    </button>
                    <div class="row mb-2 float-right collapse-section"
                        *ngIf="collapsableSections['mraRequest'] && mraRequest">
                        <div class="col-6">
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Host Country:
                                </div>
                                <div class="col">
                                    {{convertCodeToCountry(mraRequest.hostCtry)}}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    AEO Program Name:
                                </div>
                                <div class="col">
                                    {{mraRequest.aeoPgmNm}}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Request ID:
                                </div>
                                <div class="col">
                                    {{mraRequest.mraRqstId}}
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Comment On MRA Request Company:
                                </div>
                                <div class="col">
                                    {{mraRequest.cmt}}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Approval Status:
                                </div>
                                <div class="col status-text"
                                [ngClass]="mraRequestStatus.class === 'approved' ? 'approved-text' : mraRequestStatus.class === 'rejected' ? 'rejected-text' : 'pending-text'">
                                    {{mraRequestStatus.value}}
                                </div>
                            </div>
                            <div class="row pt-2">
                                <div class="col text-bold title-field">
                                    Approval Status Last Updated:
                                </div>
                                <div class="col">
                                    {{mraRequest.wrkflwStusDttm}}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" class=" btn btn-light section-header-frame  " style="text-align: left;"
                        (click)="collapseSection('locations')">
                        <svg *ngIf="!collapsableSections['locations']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                        <svg *ngIf="collapsableSections['locations']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                        </svg>
                        <div class="section-header">Locations: </div>
                    </button>
                    <div class="row mb-2" *ngIf="collapsableSections['locations']">
                        <div class="card widget-card">
                            <div class="card-body mx-0 px-0">
                                <table class="table" mat-table [dataSource]="locations">
                                    <ng-container matColumnDef="type">
                                        <th class="table-header" mat-header-cell *matHeaderCellDef>
                                            Type
                                        </th>
                                        <td class="table-entry" mat-cell *matCellDef="let location">
                                            -
                                        </td>
                                    </ng-container>
                                    <ng-container matColumnDef="addrLine1">
                                        <th class="table-header" mat-header-cell *matHeaderCellDef>
                                            Address Line 1
                                        </th>
                                        <td class="table-entry" mat-cell *matCellDef="let location">
                                            {{location.addrLne1}}
                                        </td>
                                    </ng-container>
                                    <ng-container matColumnDef="addrLine2">
                                        <th class="table-header" mat-header-cell *matHeaderCellDef>
                                            Address Line 2
                                        </th>
                                        <td class="table-entry" mat-cell *matCellDef="let location">
                                            {{location.addrLne2}}
                                        </td>
                                    </ng-container>
                                    <ng-container matColumnDef="city">
                                        <th class="table-header" mat-header-cell *matHeaderCellDef>
                                            City
                                        </th>
                                        <td class="table-entry" mat-cell *matCellDef="let location">
                                            {{location.city}}
                                        </td>
                                    </ng-container>
                                    <ng-container matColumnDef="state">
                                        <th class="table-header" mat-header-cell *matHeaderCellDef>
                                            State
                                        </th>
                                        <td class="table-entry" mat-cell *matCellDef="let location">
                                            {{location.stOrProvince}}
                                        </td>
                                    </ng-container>
                                    <ng-container matColumnDef="country">
                                        <th class="table-header" mat-header-cell *matHeaderCellDef>
                                            Country
                                        </th>
                                        <td class="table-entry" mat-cell *matCellDef="let location">
                                            {{convertCodeToCountry(location.cntryCd)}}
                                        </td>
                                    </ng-container>
                                    <ng-container matColumnDef="primary">
                                        <th mat-header-cell *matHeaderCellDef>
                                            Primary Location?
                                        </th>
                                        <td class="table-entry" mat-cell *matCellDef="let location">
                                            {{location.isPrmryLoc ? 'Yes': 'No'}}
                                        </td>
                                    </ng-container>

                                    <tr mat-header-row *matHeaderRowDef="locationHeaders"></tr>
                                    <tr mat-row class="table-row" *matRowDef="let row; columns: locationHeaders;"></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <button type="button" class=" btn btn-light mt-4 pe-2 section-header-frame"
                        style="text-align: left;" (click)="collapseSection('contactUsers')">
                        <svg *ngIf="!collapsableSections['contactUsers']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                        <svg *ngIf="collapsableSections['contactUsers']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                        </svg>
                        <div class="section-header">Contacts/Users</div>
                    </button>
                    <div class="row mb-2" *ngIf="collapsableSections['contactUsers']">
                        <div class="card widget-card">
                            <div class="card-body mx-0 px-0">
                                <table class="table ">
                                    <thead>
                                        <tr style="background : rgb(237,240,245) !important;">
                                            <th>Salutation</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Title</th>
                                            <th>Type</th>
                                            <th>Email</th>
                                            <th>Telephone</th>
                                            <th>Primary</th>
                                            <th>Email Notification (Portal)</th>
                                            <th>Last Login</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ng-container *ngFor="let contact of [1]; index as i">
                                            <tr class="table-row-hover">
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                        </ng-container>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>



                    <button type="button" class=" btn btn-light mt-4 pe-2 section-header-frame"
                        style="text-align: left;" (click)="collapseSection('companymra')">
                        <svg *ngIf="!collapsableSections['companymra']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                        <svg *ngIf="collapsableSections['companymra']" xmlns="http://www.w3.org/2000/svg" width="18"
                            height="18" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                        </svg>
                        <div class="section-header">Mutual Recognition Agreement</div>
                    </button>
                    <div class="row mb-2" *ngIf="collapsableSections['companymra']">
                        <div class="col mt-3">
                            <p><b>Selected Programs</b></p>
                            <ul>
                                <li>Canada</li>
                                <li>India</li>
                                <li>Dominica Republic</li>
                                <li>European Union</li>
                                <li>Isreal</li>
                                <li>Japan</li>
                                <li>Jordan</li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </mat-tab>

        <mat-tab label="Business Entity Information">
            <div class="container-fluid entity-tab">
                <div class="row">


                </div>
            </div>
        </mat-tab>

        <mat-tab label="Vetting">
            <div class="container-fluid entity-tab">
                <div class="row">


                </div>
            </div>
        </mat-tab>

        <mat-tab label="Documents">
            <div class="container-fluid entity-tab">
                <div class="row">


                </div>
            </div>
        </mat-tab>

        <mat-tab label="Milestones">
            <div class="container-fluid entity-tab">
                <div class="row">


                </div>
            </div>
        </mat-tab>


        <mat-tab label="Event History">
            <div class="container-fluid entity-tab">
                <div class="row">


                </div>
            </div>
        </mat-tab>


        <mat-tab label="Logistics Analytics">
            <div class="container-fluid entity-tab">
                <div class="row pt-3">
                    <div class="col-6">
                        <h2>
                            Total Shipments Value
                        </h2>
                        <ngx-charts-number-card [view]="view" [results]="single" [cardColor]="cardColor"
                            (select)="onSelect($event)">
                        </ngx-charts-number-card>
                    </div>
                    <div class="col-6">
                        <h2>
                            Total Containers from Origin Countries
                        </h2>
                        <ngx-charts-tree-map [view]="view" [results]="single" [gradient]="gradient"
                            [animations]="animations" [labelFormatting]="labelFormatting" (select)="onSelect($event)">
                        </ngx-charts-tree-map>



                    </div>


                    <div class="row pt-3">
                        <div class="col-6">
                            <h2>
                                Value per each Destination Country
                            </h2>
                            <ngx-charts-pie-grid [view]="view" [results]="single" (select)="onSelect($event)">
                            </ngx-charts-pie-grid>
                        </div>
                        <div class="col-6">
                            <h2>
                                Last 2 Years of Shipments
                            </h2>
                            <ngx-charts-bar-horizontal-2d [view]="view" [results]="multi" [gradient]="gradient"
                                [xAxis]="showXAxis" [yAxis]="showYAxis" [legend]="showLegend"
                                [showXAxisLabel]="showXAxisLabel" [showYAxisLabel]="showYAxisLabel"
                                [xAxisLabel]="xAxisLabel" [yAxisLabel]="yAxisLabel" (select)="onSelect($event)">
                            </ngx-charts-bar-horizontal-2d>


                        </div>
                    </div>



                    <div class="row pt-3">
                        <div class="col-6">
                            <h2>
                                Destination per Country
                            </h2>
                            <ngx-charts-polar-chart [view]="view" [legend]="legend" [showXAxisLabel]="showXAxisLabel"
                                [showYAxisLabel]="showYAxisLabel" [xAxis]="xAxis" [yAxis]="yAxis"
                                [xAxisLabel]="xAxisLabel" [yAxisLabel]="yAxisLabel" [results]="mult_polar"
                                (select)="onSelect($event)">
                            </ngx-charts-polar-chart>

                        </div>
                        <div class="col-6">
                            <h2>
                                Number of Total Containers per Country Last 3 Years
                            </h2>

                            <ngx-charts-bubble-chart [view]="view" [results]="bubbleData" [xAxis]="showXAxis"
                                [yAxis]="showYAxis" [legend]="showLegend" [showXAxisLabel]="showXAxisLabel"
                                [showYAxisLabel]="showYAxisLabel" [xAxisLabel]="xAxisLabel" [yAxisLabel]="yAxisLabel"
                                [yScaleMin]="yScaleMin" [yScaleMax]="yScaleMax" [minRadius]="minRadius"
                                [maxRadius]="maxRadius" (select)="onSelect($event)">
                            </ngx-charts-bubble-chart>

                        </div>
                    </div>

                </div>

                <div class="row pt-3  ">
                    <div class="col-12  ">
                        <h2>
                            Trade Value per Country
                        </h2>
                        <ngx-charts-advanced-pie-chart [view]="view2" [results]="single" [gradient]="gradient"
                            (select)="onSelect($event)">
                        </ngx-charts-advanced-pie-chart>
                    </div>
                </div>
            </div>
        </mat-tab>

        <mat-tab label="MRA Details">
            <div class="container-fluid entity-tab">
                <div class="row">

                    <div class="row pb-3 pt-2">

                        <h3><b>Actions</b></h3>
                        <div class="card widget-card">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">Set MRA Status to Approved</td>
                                        <td><button type="button" class="btn btn-sm btn-success"
                                                style="width: 120px;">Approve</button> </td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Set MRA Status to Rejected</td>
                                        <td><button type="button" class="btn btn-sm btn-danger"
                                                style="width: 120px;">Reject</button> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="row pb-3 pt-2">

                        <h3><b>MRA Details</b></h3>
                        <div class="card widget-card">
                            <div class="card-body mx-0 px-0">
                                <table class="table ">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Officer</th>
                                            <th scope="col">Decision Type</th>
                                            <th scope="col">Decision ID Type</th>
                                            <th scope="col">Decision</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ng-container *ngFor="let company of companyMRADetails; index as i">
                                            <tr (click)="selectCompaniesRow(company.AEODCSNDate)"
                                                [ngClass]="expandedCompanyinTable === company.AEODCSNDate ? 'bg-light' :'bg-white'"
                                                class="table-row-hover">
                                                <th scope="row">{{ i + 1 }}</th>
                                                <td>
                                                    <p>{{company.AEODCSNDate}}</p>
                                                </td>
                                                <td>{{company.officerLastName + ", " + company.officerFirstName}}</td>
                                                <td>{{company.AEODCSNType}}</td>
                                                <td>{{company.DCSNBasedOnIDType}}</td>
                                                <td><button type="button" class="btn btn-sm" style="width: 120px;"
                                                        [ngClass]="company.AEODCSN ==='Approved' ? 'btn-success' : company.AEODCSN ==='Rejected' ? 'btn-danger' : company.AEODCSN ==='In Progress' ? 'btn-warning' : 'black'">{{company.AEODCSN}}
                                                    </button></td>
                                            </tr>
                                            <tr *ngIf="expandedCompanyinTable == company.AEODCSNDate"
                                                style="background-color:rgb(218, 218, 218) !important;  ">
                                                <td colspan="7"
                                                    style="background-color:rgb(244, 244, 244) !important; ">
                                                    <div class="row">
                                                        <div class="col">
                                                            <p>Information about this MRA</p>
                                                            <p><b>AEO Account Number:</b> {{company.AEOAccountNumber}}
                                                            </p>
                                                            <p><b>DCSN BasedOn ID Number:</b>
                                                                {{company.DCSNBasedOnIDNumber}}</p>
                                                            <p><b>country Company ID:</b> {{company.countryCompanyID}}
                                                            </p>
                                                            <p><b>country Company ID Type:</b>
                                                                {{company.countryCompanyIDType}}</p>
                                                        </div>
                                                        <div class="col">

                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </ng-container>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </mat-tab>
    </mat-tab-group>
</ng-container>










import { Component, Input, OnInit, OnChanges, } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { CompanyLocation, CompanyOnMapView } from '../company-full-view/companies-types';
import { MRARequest, MRARequestCompany, MRARequestCompanyLocation, MRARequestCompanyTableOutput } from '../mra-request-full-view/mra-request-types';
import { MRAList } from '../mra-request-full-view/mra-request-full-view.component';
import { UtilsService } from '../services/utils.service';
import { AeoProfile } from '../companies-view/aeo-profile-types';


export interface MRA_Details {
  hostCountry: string;
  AEOAccountNumber: string;

  officerFirstName: string;
  officerLastName: string;

  AEODCSN: string;
  AEODCSNType: string;
  AEODCSNDate: string;
  
  DCSNBasedOnIDType: string;
  DCSNBasedOnIDNumber: string;

  countryCompanyID: string;
  countryCompanyIDType: string;

  companyAddress: string;
}

const single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
  {
    "name": "UK",
    "value": 5200000
  },
  {
    "name": "Italy",
    "value": 7700000
  },
  {
    "name": "Spain",
    "value": 4300000
  }
];

export const multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];


const mult_polar = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "1990",
        "value": 62000000
      },
      {
        "name": "2010",
        "value": 73000000
      },
      {
        "name": "2011",
        "value": 89400000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "1990",
        "value": 250000000
      },
      {
        "name": "2010",
        "value": 309000000
      },
      {
        "name": "2011",
        "value": 311000000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "1990",
        "value": 58000000
      },
      {
        "name": "2010",
        "value": 50000020
      },
      {
        "name": "2011",
        "value": 58000000
      }
    ]
  },
  {
    "name": "UK",
    "series": [
      {
        "name": "1990",
        "value": 57000000
      },
      {
        "name": "2010",
        "value": 62000000
      },
      {
        "name": "2011",
        "value": 72000000
      }
    ]
  }
];

const bubbleData =  [
  {
    name: 'Germany',
    series: [
      {
        name: '2010',
        x: '2010',
        y: 80.3,
        r: 80.4
      },
      {
        name: '2000',
        x: '2000',
        y: 80.3,
        r: 78
      },
      {
        name: '1990',
        x: '1990',
        y: 75.4,
        r: 79
      }
    ]
  },
  {
    name: 'United States',
    series: [
      {
        name: '2010',
        x: '2010',
        y: 78.8,
        r: 310
      },
      {
        name: '2000',
        x: '2000',
        y: 76.9,
        r: 283
      },
      {
        name: '1990',
        x: '1990',
        y: 75.4,
        r: 253
      }
    ]
  },
  {
    name: 'France',
    series: [
      {
        name: '2010',
        x: '2010',
        y: 81.4,
        r: 63
      },
      {
        name: '2000',
        x: '2000',
        y: 79.1,
        r: 59.4
      },
      {
        name: '1990',
        x: '1990',
        y: 77.2,
        r: 56.9
      }
    ]
  },
  {
    name: 'United Kingdom',
    series: [
      {
        name: '2010',
        x: '2010',
        y: 80.2,
        r: 62.7
      },
      {
        name: '2000',
        x: '2000',
        y: 77.8,
        r: 58.9
      },
      {
        name: '1990',
        x: '1990',
        y: 75.7,
        r: 57.1
      }
    ]
  }
];

export type CompanyModalLocation = {
  addrLne1: string, 
  addrLne2 : string, 
  city: string, 
  stOrProvince: string, 
  cntryCd: string,
  isPrmryLoc: boolean
}

@Component({
  selector: 'app-company-single-view',
  templateUrl: './company-single-view.component.html',
  styleUrls: ['./company-single-view.component.scss']
})
export class CompanySingleViewComponent implements  OnInit, OnChanges{

    hostCountry: string = "";
    companyMRADetails: MRA_Details[] = [];
    companyBasicInfo:any = [];
    infoPresent = false;

    @Input() company?: CompanyOnMapView;
    @Input() mraRequestCompany? : MRARequestCompanyTableOutput; 
    @Input() companyName : string = "";
    @Input() countryName : string = "";
    mraRequest? : MRARequest;  
    locations : CompanyModalLocation [] = []; 
    locationHeaders: string [] = ['type','addrLine1', 'addrLine2', 'city', 'state', 'country', 'primary']
    mraRequestStatus : any = {
      status: '', 
      class: ''
    }   
    mraCompanies: CompanyOnMapView[] = []
  multi!: any[];
  single!: any[];
  mult_polar!: any[];
  bubbleData!: any[];
  view: [number, number] = [500, 400];
  view2: [number, number] = [1200, 400];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';
 
  
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
 
 

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }


  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;  
  legendPosition: string = 'below';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Population';
  xAxis: boolean = true;
  yAxis: boolean = true;
  legend: boolean = true;
  maxRadius: number = 20;
  minRadius: number = 5;
  yScaleMin: number = 70;
  yScaleMax: number = 85;
 
  animations: boolean = true;
  schemeType: string = 'linear';

  labelFormatting(c: any) {
    return `${(c.label)}`;
  }
  /*
  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  */

    constructor( 
      private backendApi: BackendapiService,
      private utils: UtilsService
    ) {  
      Object.assign(this, { single });
      Object.assign(this, { multi });
      Object.assign(this, { mult_polar });
      Object.assign(this, { bubbleData });

    }
  
    ngOnChanges() {
      console.log('ngOnChange');
      this.processCompany();
    }
    
    ngOnInit()    {
      console.log('single company view');
      this.processCompany();
    }
    convertCodeToCountry (code : string) {
      return this.utils.translateCodeToCountry(code); 
    }

    // get company 'Approval status' from Aeoprofile 
    getCompanyProfile(getStatus: CompanyOnMapView) {
      this.company = getStatus;
      this.
    }

    processCompany() {
      this.infoPresent = true;
      // switches between mra request and mra request company
      if (this.company) {
        this.companyBasicInfo = {
          companyAddress: this.company?.companyAddress || '',
          containers: this.company?.containers || 0,
          hostCountry: this.company?.hostCountry || '',
          mra_status: this.company?.mra_status,
          lastUpdated: this.company.lastUpdated,
          name: this.company?.name || '',
          monetary_value: this.company?.monetaryValue || 0,
           //destination: countryData.destination,
          //origin: countryData.origin,
          //type: countryData.type,
        };
        this.locations = this.company.company.cmpnyLocList;
      }
      else if (this.mraRequestCompany) {
        this.companyBasicInfo = {
          companyAddress: this.mraRequestCompany?.mainAddress || '',
          containers: this.mraRequestCompany?.containers || 0,
          hostCountry: this.mraRequestCompany?.country,
          mra_status: this.mraRequestCompany?.status,
          lastUpdated: this.mraRequestCompany.request.mraRqstCmpny.apprvlStusDttm,
          name: this.mraRequestCompany?.company_name || '',
          monetary_value: this.mraRequestCompany?.monetaryValue || 0,
        }
        this.mraRequest = this.mraRequestCompany.request.mraRqst;
        this.mraRequestStatus = MRAList.find((mra)=>{
          return mra.value === this.mraRequest?.wrkflwStus
        }) || this.mraRequestStatus;
        console.log("MRA Request Being Opened: ", this.mraRequest);
        this.locations = this.mraRequestCompany.request.mraRqstCmpny.mraRqstCmpnyLocList;
      }
     
      this.hostCountry =  this.companyBasicInfo.hostCountry;
      // company data basic information
      /*
      if(this.countryName && this.companyName && this.countryName !== '' && this.companyName !== '' && this.countryName.length > 1 && this.companyName.length > 1) {
        this.infoPresent = true;        
        this.backendApi.getCompanyDetails(this.countryName, this.companyName).subscribe( (data: any) => {
          console.log(data);
          this.companyMRADetails = [];
          data.map( (element: any )=> {
            this.hostCountry =  element.hostCountry;
            this.companyMRADetails.push({
              hostCountry: element.hostCountry,
              AEOAccountNumber: element.AEOAccountNumber,
            
              officerFirstName: element.officerFirstName,
              officerLastName: element.officerLastName,
            
              AEODCSN: element.AEODCSN,
              AEODCSNType: element.AEODCSNType,
              AEODCSNDate: element.AEODCSNDate,
              
              DCSNBasedOnIDType: element.DCSNBasedOnIDType,
              DCSNBasedOnIDNumber: element.DCSNBasedOnIDNumber,
            
              countryCompanyID: element.countryCompanyID,
              countryCompanyIDType: element.countryCompanyIDType,
              
              companyAddress: element.companyAddress,
            });

            const countryData = data && data.length > 0 ? data[0] : undefined;
            if (countryData) {
                this.companyBasicInfo = {
                  companyAddress: countryData.companyAddress,
                  containers: countryData.containers,
                  destination: countryData.destination,
                  hostCountry: countryData.hostCountry,
                  mra_status: countryData.mra_status,
                  name: countryData.name,
                  origin: countryData.origin,
                  monetary_value: countryData.monetary_value,
                  type: countryData.type,
                };
              }
              else {
                this.companyBasicInfo = {
                  companyAddress: "",
                  containers: "",
                  destination: "",
                  hostCountry: "",
                  mra_status: "",
                  name: "",
                  monetary_value: "",
                  origin: "",
                  type: "",
                };
              }
          });
          console.log(this.companyMRADetails);
          
        });
      }
      else {
       return;
      }
       */
    }

    expandedCompanyinTable = '';
    selectCompaniesRow(company: string) {
      console.log(company);
      if (this.expandedCompanyinTable === company)
        this.expandedCompanyinTable = '';
      else
        this.expandedCompanyinTable = company;
    }

    collapsableSections: any = {
      'companyInfo': true,
      'businessInfo': true,
      'locations': true,
      'contactUsers': true,
      'companymra': true,
      'mraRequest': true, 
    }

    collapseSection(section: string) {
      if(this.collapsableSections[section] !== undefined) {
        this.collapsableSections[section] = !this.collapsableSections[section];
      }
    }
}





.table-row-hover:hover {
    background-color: rgb(219, 219, 219);
}


.widget-card {
    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
    }
    

.entity-tab {
    border-top: 1px solid lightgray;
    padding-bottom: 25px;
    padding-top: 5px;
}

.text-bold {
    font-weight: bold;
    max-width: 235px;
}
.table-header {
    font-size: 16px;
    font-weight: 700;
    padding: .5rem .5rem;
    color: var(--bs-table-color-state, var(--bs-table-color-type, var(--bs-table-color)));
}
.table-entry {
    font-size: 16px;
}
.table-row:hover {
    background-color: rgb(171, 183, 225) !important; 
    cursor: pointer;
}
.title-field {
    text-align: right;
}
.section-header-frame {
    display: flex;
}
.section-header {
    margin-left: 0.5em; 
    font-weight: 650;
} 
.collapse-section {
    transition: all 0.5s ease-in-out;
}



import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySingleViewComponent } from './company-single-view.component';

describe('CompanySingleViewComponent', () => {
  let component: CompanySingleViewComponent;
  let fixture: ComponentFixture<CompanySingleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySingleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanySingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
