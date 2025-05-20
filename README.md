<div class="container-fluid  ">
    <h1 class="  px-4 pt-4 pb-2 " style="border-bottom: 2px solid rgba(0, 60, 110, 0.15);">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search"
            viewBox="0 0 18 18">
            <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        Search MRA Requests
    </h1>
</div>


<div class="row mx-4 pb-3">
    Once MRA Requests are searched, these following search filters are available to filter the current results.
</div>

<div class="input-container pb-3" *ngIf="mraRequests.length>0">
    <div class="filters-container">
        <div class="filters-row">
            <mat-form-field class="search-form-field">
                <mat-label>MRA Request ID</mat-label>
                <input matInput type="text" [(ngModel)]="searchItems.request_id"
                    (ngModelChange)="filterUpdate('request_id', $event)">
                <ng-container *ngIf="searchItems.request_id">
                    <button matSuffix mat-icon-button aria-label="Clear"
                        (click)="searchItems.request_id='';filterUpdate('request_id', '')"
                        style="position: fixed; right: 0px; top: 5px;">
                        <mat-icon>close</mat-icon>
                    </button>
                </ng-container>
            </mat-form-field>
            <mat-form-field class="search-form-field">
                <mat-label>Company Name</mat-label>
                <input matInput type="text" [(ngModel)]="searchItems.company"
                    (ngModelChange)="filterUpdate('name', $event)">
                <ng-container *ngIf="searchItems.company">
                    <button matSuffix mat-icon-button aria-label="Clear"
                        (click)="searchItems.company='';filterUpdate('name', '')"
                        style="position: fixed; right: 0px; top: 5px;">
                        <mat-icon>close</mat-icon>
                    </button>
                </ng-container>
            </mat-form-field>
            <!--
            Date field to be figured out another time 
            -->
            <!-- <form [formGroup]="dateRangeForm">
                <mat-form-field class="search-form-field" style="width: 300px;">
                    <mat-label>Enter the date updated range</mat-label>
                    <mat-date-range-input [rangePicker]="picker" formGroupName="dateRange">
                        <input matStartDate formControlName="start" placeholder="Start date">
                        <input matEndDate formControlName="end" placeholder="End date">
                    </mat-date-range-input>
                    <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
                    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-date-range-picker #picker></mat-date-range-picker>
                </mat-form-field>
            </form> -->
            <mat-form-field class="search-form-field">
                <mat-label>TIN</mat-label>
                <input matInput type="text" [(ngModel)]="searchItems.tin" (ngModelChange)="filterUpdate('tin', $event)">
                <ng-container *ngIf="searchItems.tin">
                    <button matSuffix mat-icon-button aria-label="Clear"
                        (click)="searchItems.tin=''; filterUpdate('tin', '')"
                        style="position: fixed; right: 0px; top: 5px;">
                        <mat-icon>close</mat-icon>
                    </button>
                </ng-container>
            </mat-form-field>
        </div>
        <div class="filters-row">
            <mat-form-field class="search-form-field">
                <mat-label>G2G ID</mat-label>
                <input matInput type="text" [(ngModel)]="searchItems.g2g_id"
                    (ngModelChange)="filterUpdate('g2g_id', $event)">
                <ng-container *ngIf="searchItems.g2g_id">
                    <button matSuffix mat-icon-button aria-label="Clear"
                        (click)="searchItems.g2g_id='';filterUpdate('g2g_id', '')"
                        style="position: fixed; right: 0px; top: 5px;">
                        <mat-icon>close</mat-icon>
                    </button>
                </ng-container>
            </mat-form-field>
            <mat-form-field class="search-form-field">
                <mat-label>MRA Request Statuses</mat-label>
                <mat-select [formControl]="statusesForm" multiple [panelWidth]="''">
                    <mat-option *ngFor="let mraRequestStatus of MRAList"
                        [value]="mraRequestStatus.value">{{mraRequestStatus.name}}</mat-option>
                </mat-select>
            </mat-form-field>
            <mat-form-field class="search-form-field">
                <mat-label>From Country</mat-label>
                <mat-select [formControl]="countriesForm" multiple [panelWidth]="''">
                    <mat-option *ngFor="let country of mainCountries" [value]="country.isoCd">
                        <span *ngIf="country.name.length>2"
                            class="flag-input fi fi-{{country.isoCd.toLowerCase()}}"></span>
                        {{country.name}}</mat-option>
                </mat-select>
            </mat-form-field>
        </div>
    </div>

</div>
<div class="searching-container" *ngIf="searching.length>0">
    <mat-progress-spinner class="spinner" [mode]="'indeterminate'"></mat-progress-spinner>
    <div class="searching-text">
        {{searching}}
    </div>
</div>

<div class="container-fluid" style="  position: relative;" *ngIf="searching.length===0">
    <div class="row">
        <div class="col ">
            <div class="card widget-card">
                <div class="card-header card-hdr-class">
                    <div class="row">
                        <div class="col">
                            <h4 class="card-title mb-1 pt-1">Search Results</h4>
                        </div>
                        <div class="col-1 float-right">
                            <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0  " [matMenuTriggerFor]="menu">
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
                <div class="card-body px-0 pt-0 pb-0 ">
                    <table mat-table [dataSource]="filteredMraRequests" multiTemplateDataRows class="table table-hover">
                        <ng-container matColumnDef="index">
                            <th mat-header-cell *matHeaderCellDef>
                                #
                            </th>
                            <td mat-cell *matCellDef="let mraRequest">
                                {{mraRequest.index}}
                            </td>
                        </ng-container>
                        <ng-container matColumnDef="request_id">
                            <th mat-header-cell *matHeaderCellDef>
                                MRA Request ID
                            </th>
                            <td mat-cell *matCellDef="let mraRequest">
                                {{mraRequest.request_id}}
                            </td>
                        </ng-container>
                        <ng-container matColumnDef="name">
                            <th mat-header-cell *matHeaderCellDef>
                                Company Name
                            </th>
                            <td mat-cell *matCellDef="let mraRequest">
                                {{mraRequest.company_name}}
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="g2g_id">
                            <th mat-header-cell *matHeaderCellDef>
                                G2G ID
                            </th>
                            <td mat-cell *matCellDef="let mraRequest">
                                {{mraRequest.g2g_id}}
                            </td>
                        </ng-container>
                        <ng-container matColumnDef="country">
                            <th mat-header-cell *matHeaderCellDef>
                                Country
                            </th>
                            <td mat-cell *matCellDef="let mraRequest">
                                {{getThisCountryNameFromISO(mraRequest.country)}}
                            </td>
                        </ng-container>
                        <ng-container matColumnDef="status">
                            <th mat-header-cell *matHeaderCellDef>
                                Current MRA Status
                            </th>
                            <td mat-cell *matCellDef="let mraRequest">
                                <div class=" table-cell">
                                    <button type="button" class="btn btn-sm"
                                        [ngClass]="mraRequest.status.class ==='approved' ? 'btn-success' : mraRequest.status.class ==='rejected' ? 'btn-danger' : mraRequest.status.class ==='pending' ? 'btn-warning' : 'black'">{{mraRequest.status.value}}
                                    </button>
                                </div>
                            </td>
                        </ng-container>
                        <ng-container matColumnDef="date_updated">
                            <th mat-header-cell *matHeaderCellDef>
                                Last Updated Date
                            </th>
                            <td mat-cell *matCellDef="let mraRequest">
                            </td>
                        </ng-container>
                        <ng-container matColumnDef="extra-details">
                            <td mat-cell *matCellDef="let mraRequest" [attr.colspan]="mraRequestHeaders.length"
                                class="table-details-frame">
                                <div class="table-details-wrapper" [class.expanded]="rowExpanded(mraRequest.index)">
                                    <div class="details-wrapper-header">
                                        <div class="left-header">
                                            <span class="text-header"
                                                [class.clickable]="mraRequest.edit.mode.length===0"
                                                (click)="openModal(mraRequest)">
                                                {{mraRequest.edit.mode === 'location' || mraRequest.edit.mode === '' ?
                                                'MRA Request Company Additional Information' :
                                                mraRequest.edit.mode === 'edit' ?
                                                'Edit Company Information' :
                                                'Override Request Company Decision'
                                                }}
                                            </span>

                                        </div>
                                        <div class="right-header">
                                            <div *ngIf="mraRequest.edit.error.length>0" class="error-message">
                                                {{mraRequest.edit.error}}
                                            </div>
                                            <div class="edit-button-frame">
                                                <button mat-raised-button *ngIf="mraRequest.edit.mode.length>0"
                                                    (click)="toggleEditMode(mraRequest, '', 0)"
                                                    class="btn btn-sm">Cancel</button>
                                                <button mat-raised-button *ngIf="mraRequest.edit.mode.length>0"
                                                    (click)="saveEdit(mraRequest, 0)" color="primary"
                                                    class="btn btn-sm">Save</button>
                                                <!-- <button mat-raised-button class="additional-action-item"  *ngIf="mraRequest.edit.mode.length===0"
                                                    (click)="toggleEditMode(mraRequest, 'edit', 0)">Edit MRA Request
                                                    Company</button> -->
                                                <button mat-raised-button color="primary" class="additional-action-item"
                                                    *ngIf="mraRequest.edit.mode.length===0"
                                                    (click)="toggleEditMode(mraRequest, 'override', 0)">
                                                    Override Approval Status</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="details-row" *ngIf="mraRequest.edit.mode==''">
                                        <div class="flex-row">
                                            <div class="flag"
                                                *ngIf="getThisCountryNameFromISO(mraRequest.country).length>2">
                                                <span
                                                    class="flag-detail fi fi-{{mraRequest.country.toLowerCase()}}"></span>
                                            </div>
                                            <div class="details-frame-1">
                                                <div class="flex-row">
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">Company Name:</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.request.mraRqstCmpny.cmpnyNm}}
                                                        </span>
                                                    </div>
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">Country:</mat-label>
                                                        <span class="details-field">
                                                            {{getThisCountryNameFromISO(mraRequest.country)}}
                                                        </span>
                                                    </div>
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">MRA Request ID:</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.request_id}}
                                                        </span>
                                                    </div>
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">G2G ID:</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.g2g_id}}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="flex-row">

                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">TIN:</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.request.mraRqstCmpny.tin}}
                                                        </span>
                                                    </div>

                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">Role List:</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.request.mraRqstCmpny.rolList}}
                                                        </span>
                                                    </div>
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">Status:</mat-label>
                                                        <span class="details-field status-details-text">
                                                            <button type="button" class="btn btn-sm"
                                                                [ngClass]="mraRequest.status.class ==='approved' ? 'btn-success' : mraRequest.status.class ==='rejected' ? 'btn-danger' : mraRequest.status.class ==='pending' ? 'btn-warning' : 'black'">{{mraRequest.status.value}}
                                                            </button>
                                                        </span>
                                                    </div>
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">Approval Status
                                                            Updated:</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="edit details-row" *ngIf="mraRequest.edit.mode=='edit'">
                                        <div class="edit-frame">
                                            <div class="edit-field-container">
                                                <mat-label class="details-header"
                                                    [class.text-error]="mraRequest.edit.error.includes('name')">Company
                                                    Name:</mat-label>
                                                <span class="details-field">
                                                    <mat-form-field class="edit-form-field">
                                                        <mat-label>Company Name</mat-label>
                                                        <input matInput type="text"
                                                            [(ngModel)]="mraRequest.edit.payload.name">
                                                        <ng-container *ngIf="mraRequest.edit.payload.name">
                                                            <button matSuffix mat-icon-button aria-label="Clear"
                                                                (click)="mraRequest.edit.payload.name=''"
                                                                style="position: fixed; right: 0px; top: 5px;">
                                                                <mat-icon>close</mat-icon>
                                                            </button>
                                                        </ng-container>
                                                    </mat-form-field>
                                                </span>
                                            </div>
                                            <div class="edit-field-container">
                                                <mat-label class="details-header"
                                                    [class.text-error]="mraRequest.edit.error.includes('TIN')">TIN:</mat-label>
                                                <span class="details-field">
                                                    <mat-form-field class="edit-form-field">
                                                        <mat-label>TIN</mat-label>
                                                        <input matInput type="text"
                                                            [(ngModel)]="mraRequest.edit.payload.tin">
                                                        <ng-container *ngIf="mraRequest.edit.payload.tin">
                                                            <button matSuffix mat-icon-button aria-label="Clear"
                                                                (click)="mraRequest.edit.payload.tin=''"
                                                                style="position: fixed; right: 0px; top: 5px;">
                                                                <mat-icon>close</mat-icon>
                                                            </button>
                                                        </ng-container>
                                                    </mat-form-field>
                                                </span>
                                            </div>
                                            <div class="edit-field-container">
                                                <mat-label class="details-header">Role List:</mat-label>
                                                <span class="details-field">
                                                    <mat-form-field class="edit-form-field">
                                                        <mat-label>Role List</mat-label>
                                                        <input matInput type="text"
                                                            [(ngModel)]="mraRequest.edit.payload.roleList">
                                                        <ng-container *ngIf="mraRequest.edit.payload.roleList">
                                                            <button matSuffix mat-icon-button aria-label="Clear"
                                                                (click)="mraRequest.edit.payload.roleList=''"
                                                                style="position: fixed; right: 0px; top: 5px;">
                                                                <mat-icon>close</mat-icon>
                                                            </button>
                                                        </ng-container>
                                                    </mat-form-field>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="comment-frame">
                                            <textarea class="comment" matInput
                                                [class.error]="mraRequest.edit.error.includes('comment')"
                                                [(ngModel)]="mraRequest.edit.payload.comment"
                                                placeholder="Enter comment here..." cdkTextareaAutosize
                                                #autosize="cdkTextareaAutosize" cdkAutosizeMinRows="1"
                                                cdkAutosizeMaxRows="6"></textarea>
                                        </div>
                                    </div>
                                    <div class="override details-row" *ngIf="mraRequest.edit.mode=='override'">
                                        <div class="status-transformation-frame">
                                            <div class="status-frame">
                                                <div class="status-header">
                                                    Current Approval Status
                                                </div>
                                                <div class="current-status">
                                                    <button type="button" class="btn btn-sm"
                                                        style="width: 100%; height: 3em; font-size: 1.25em;"
                                                        [ngClass]="mraRequest.status.class ==='approved' ? 'btn-success' : mraRequest.status.class ==='rejected' ? 'btn-danger' : mraRequest.status.class ==='pending' ? 'btn-warning' : 'black'">{{mraRequest.status.value}}
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="transformation">
                                                <mat-icon class="transformation-icon">chevron_right</mat-icon>
                                            </div>
                                            <div class="status-frame">
                                                <div class="status-header"
                                                    [class.text-error]="mraRequest.edit.error.includes('Status')">
                                                    Updated Approval Status
                                                </div>
                                                <div class="current-status">
                                                    <mat-form-field appearance="fill">
                                                        <mat-label>MRA Request Statuses</mat-label>
                                                        <mat-select [(value)]="mraRequest.edit.payload.status"
                                                            [panelWidth]="''">
                                                            <mat-option *ngFor="let mraRequestStatus of MRAList"
                                                                class="mra-status-option {{mraRequestStatus.class}}"
                                                                [value]="mraRequestStatus.value">{{mraRequestStatus.name.toUpperCase()}}</mat-option>
                                                        </mat-select>
                                                    </mat-form-field>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="comment-frame">
                                            <textarea class="comment" matInput
                                                [class.error]="mraRequest.edit.error.includes('comment')"
                                                [(ngModel)]="mraRequest.edit.payload.comment"
                                                placeholder="Enter comment here..." cdkTextareaAutosize
                                                #autosize="cdkTextareaAutosize" cdkAutosizeMinRows="1"
                                                cdkAutosizeMaxRows="6"></textarea>
                                        </div>
                                    </div>
                                    <!-- <div class="auto-vetting-row">
                                        <mat-expansion-panel>
                                            <mat-expansion-panel-header class="details-expansion-header">
                                                <mat-panel-title> Autovetting </mat-panel-title>
                                                <mat-panel-description class="details-expansion-description">
                                                    View Autovetting Information
                                                </mat-panel-description>
                                            </mat-expansion-panel-header>
                                            <div class="flex-row">
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status
                                                        Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status
                                                        Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status
                                                        Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status
                                                        Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="flex-row">
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status
                                                        Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status
                                                        Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status
                                                        Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status
                                                        Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                            </div>
                                        </mat-expansion-panel>
                                    </div> -->
                                    <div class="locations-row">
                                        <mat-expansion-panel [expanded]="true">
                                            <mat-expansion-panel-header class="details-expansion-header">
                                                <mat-panel-title>
                                                    Company Locations
                                                </mat-panel-title>
                                            </mat-expansion-panel-header>
                                            <div class="details-location-frame">
                                                <div *ngFor="let location of mraRequest.request.mraRqstCmpny.mraRqstCmpnyLocList; index as locationIndex;"
                                                    class="location-detail"
                                                    [class.primaryLocation]="location.isPrmryLoc">
                                                    <div class="location-header"
                                                        (click)="openAddressModal(mraRequest, location)">
                                                        {{location.isPrmryLoc ? 'Primary Location' : 'Other Location '+(locationIndex)}}:
                                                    </div>
                                                    <div class="flex-row">
                                                        <div class="details-field-container">
                                                            <mat-label class="details-header">Company
                                                                Address: </mat-label>
                                                            <span class="details-field" *ngIf="location.cmpnyAddr">
                                                                {{location.cmpnyAddr}}
                                                            </span>
                                                            <div class="address details-field"
                                                                *ngIf="!location.cmpnyAddr">
                                                                <div class="address-text"
                                                                    *ngFor="let address of createAddress(location)">
                                                                    {{address}}
                                                                </div>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                    <div class="flex-row">
                                                        <div class="details-field-container"
                                                            *ngIf="location.lngtud && location.latud">
                                                            <mat-label
                                                                class="details-header">Longitude/Latitude:</mat-label>
                                                            <div class="details-field">
                                                                {{location.lngtud}}/{{location.latud}}
                                                            </div>
                                                        </div>
                                                        <div class="details-field-container">
                                                            <mat-label class="details-header">Last
                                                                Updated:</mat-label>
                                                            <span class="details-field">
                                                                {{location.updtDttm}}
                                                            </span>
                                                        </div>
                                                        <div class="details-field-container">
                                                            <mat-label class="details-header">Primary
                                                                Location?</mat-label>
                                                            <div class=" details-primary-location details-field" [ngClass]="location.isPrmryLoc ? 'approved-text' :  'rejected-text'">
                                                                {{location.isPrmryLoc ? 'Yes': 'No'}}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </mat-expansion-panel>
                                    </div>
                                </div>
                            </td>
                        </ng-container>
                        <tr mat-header-row *matHeaderRowDef="mraRequestHeaders"></tr>
                        <tr mat-row class="table-row {{expandedRows.includes(row.index) ? 'selected' : ''}}"
                            *matRowDef="let row; columns: mraRequestHeaders;" (click)="toggleRow(row.index)"></tr>
                        <tr mat-row *matRowDef="let row; columns: ['extra-details'];" class="table-details-row"></tr>
                    </table>
                </div>

                <div class="card-footer">
                    <mat-paginator style="background-color: rgba(0,0,0,0);" [length]="pageTotalLength"
                        [pageSize]="pageSize" [pageSizeOptions]="[15, 25, 50]" (page)="tablePageChange($event)"
                        aria-label="Select page">
                    </mat-paginator>
                </div>
            </div>
        </div>
    </div>
</div>


import { Component, Input } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Task, DB_Country } from '../dashboard-view/dashboard-view.component';
import { getCountryNameFromISO } from '../companies-view/companies-view.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MRARequest, MRARequestCompanyTotalPayload, MRARequestPayload, MRARequestPayloadInput, MRARequestTotalResponse, MRARequestStatusInput, MRARequestTableOutput, SelectedCountryInput, MRARequestFilters, ApprovalOverrideInput, EditMRARequestInput, MRARequestCompanyLocation } from './mra-request-types';
import { LoadingService } from '../services/loading.service';
import { UtilsService } from '../services/utils.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyMraDlgComponent } from '../company-mra-dlg/company-mra-dlg.component';
import { MraRequestModalComponent } from './dialog/mra-request-modal/mra-request-modal.component';
import { ViewLocationComponent } from '../utils/view-location/view-location.component';
import { CompanyLocation } from '../company-full-view/companies-types';

export const MRAList = [
	{
		name: 'Approved',
		value: 'APPROVED',
		class: 'approved'
	},
	{
		name: 'Rejected',
		value: 'REJECTED',
		class: 'rejected'
	},
	{
		name: 'Pending Approval',
		value: 'PENDING_APPROVAL',
		class: 'pending'
	},
	{
		name: 'Suspended',
		value: 'SUSPENDED',
		class: 'pending'
	}]
@Component({
	selector: 'app-mra-request-full-view',
	templateUrl: './mra-request-full-view.component.html',
	styleUrls: ['./mra-request-full-view.component.scss']
})
export class MRARequestFullViewComponent {
	MRAList: MRARequestStatusInput[] = MRAList;
	defaultSelectStatus: string[] = this.MRAList.map((mraStatus) => mraStatus.value)

	defaultSelectCountry: string[] = [];
	statusesForm: FormControl = new FormControl(this.defaultSelectStatus);
	countriesForm: FormControl = new FormControl(this.defaultSelectCountry);
	@Input() searchItems: MRARequestFilters = {
		request_id: '',
		company: '',
		tin: '',
		g2g_id: '',
		countries: this.defaultSelectCountry,
		status: this.defaultSelectStatus,
	};
	//dateRangeForm: FormGroup = new FormGroup({});
	mraRequests: MRARequestTableOutput [] = [];
	filteredMraRequests : MRARequestTableOutput [] = [] 

	companyName = '';
	countryName = '';

	submissionDialog? : MatDialog; 

	constructor(private backendApi: BackendapiService, private route: ActivatedRoute, private fb: FormBuilder,
		private snackBar: MatSnackBar,
		private dialogModal: MatDialog, 
		private loader : LoadingService, private utils : UtilsService) {
		
		
		// this.dateRangeForm = this.fb.group({
		// 	dateRange: this.fb.group({
		// 		start: [null],
		// 		end: [null]
		// 	})
		// })
		// this.dateRangeForm.get('dateRange')?.valueChanges.subscribe(val => {
		// 	this.searchItems.date_updated = {
		// 		start: val.start,
		// 		end: val.end
		// 	}
		// })
	}

	getThisCountryNameFromISO(countryIso: string) {
		return getCountryNameFromISO(countryIso);
	}


	mainCountries: SelectedCountryInput[] = [];
	searching: string = ''; 

	ngOnInit() {
		this.statusesForm.valueChanges.subscribe((status) => {
			this.searchItems.status = status
			this.filterResults('status', status); 
		})
		this.countriesForm.valueChanges.subscribe((countries) => {
			this.searchItems.countries = countries
			this.filterResults('country', countries); 
		})
		this.loader.searchFilter.subscribe((filter)=>{
			if (filter!==null) {
				this.searching = 'Searching...'; // starts the searching modal
				this.doSearch(filter); // does the search filter, then it resets the search filter 
				this.loader.searchFilter.next(null); 
			}
		})

	}

	pageTotalLength = 0;
	pageSize = 0;
	tablePageChange(event: any) {
		console.log(event);
	}
	expandedRows : number [] = [];
	addressModal!: MatDialogRef<ViewLocationComponent>;
	createAddress(location : CompanyLocation ) {
		return this.utils.convertLocationConversion(location, 'company');
	}
	openAddressModal(company: MRARequestTableOutput, location: MRARequestCompanyLocation) {
	  this.addressModal = this.dialogModal.open(ViewLocationComponent, {
		width: '50%',
		height: '50%',
		data: {
		  name: company.company_name,
		  country: company.country,
		  address: this.utils.convertLocationConversion(location, 'mra-request-company'),
		  locationFound: false,
		  location: [0, 0]
		}
	  })
	}
	toggleEditMode (mraRequest: MRARequestTableOutput,  mode : string, locationIndex : number) {
		// rearranged to make them emppty
		switch (mode) {
			case 'edit': 
			// they will be binded to original
				mraRequest.edit.payload = {
					comment: '', 
					tin: mraRequest.request.mraRqstCmpny.tin, 
					name: mraRequest.company_name, 
					roleList: mraRequest.request.mraRqstCmpny.rolList
				}; 
				break;
			case 'override': 
				mraRequest.edit.payload = {
					status: '', 
					comment: ''
				}; 
				break;
			case '':
				mraRequest.edit.payload = undefined; 
				break; 
		}
		if (mode === 'location') {
			// will do seperate processing if the mode turns out to be location
		}
		else {
			mraRequest.edit.mode = mraRequest.edit.mode === mode ? '' : mode
			mraRequest.edit.error = ''; // clears at any error messages
			this.updateMainTable(mraRequest); // updates mra request to make sure everything is updated
		}
	}
	// this is the save editting process
	saveEdit (mraRequest : MRARequestTableOutput, locationIndex : number) {
		// for each mode, it will submit backend calls or do verification beforehand
		let payload = mraRequest.edit.payload
		let mode = mraRequest.edit.mode; 
		let errors : string [] = this.verifyPayload(mraRequest, payload, mode); 
		if (errors.length>0) {
			mraRequest.edit.error = errors.join("\n");
		}
		else {
			// once verification is complete, it could do backend calls
			switch (mraRequest.edit.mode) {
				case 'edit':
					let currentEditPayload : EditMRARequestInput = mraRequest.edit.payload as EditMRARequestInput
					this.backendApi.editCompany({
					}).subscribe({next: (res)=>{
						this.toggleEditMode(mraRequest, '', 0) // returns back to normal
					}, error: (err)=>{
						console.error("Error occured when saving: ", err)
					}})
					console.log("Payload for edit: ", payload) 
					break; 
				case 'override':
					let currentOverridePayload : ApprovalOverrideInput = mraRequest.edit.payload as ApprovalOverrideInput
					this.backendApi.overrideApprovalStatus({
						mraRqstId: mraRequest.request_id,
						tin: mraRequest.request.mraRqstCmpny.tin,
						apprvlStusCd: currentOverridePayload.status,
						cmt: currentOverridePayload.comment
					}).subscribe({next: (res : any)=>{
						mraRequest.status = this.MRAList.find((status)=>{
							return status.value === res.mraRqstCmpnyStatus.apprvlStusCd
						}) || mraRequest.status;
						this.snackBar.open(
							`Approval status sent successfully.`,
							'Close',
							{
							  duration: 5000,
							  panelClass: 'errorSnack',
							}
						  );
						this.toggleEditMode(mraRequest, '', 0) // returns back to normal
					}, error: (err)=>{
						console.error("Error occured when saving: ", err)
					}})
					break; 
				case 'location': 
					console.log("location information updated")
					break;
			}
		}
		// updates the main request table at the end
	}
	// makes sure that the requests are updated
	updateMainTable (mraRequest : MRARequestTableOutput) {
		// copies the edit to the main mra request list  
		let mraRequestFromTotalIndex = this.mraRequests.findIndex((request : MRARequestTableOutput)=>{
			return request.index === mraRequest.index
		}) 
		if (mraRequestFromTotalIndex >= 0) {
			this.mraRequests[mraRequestFromTotalIndex].edit = mraRequest.edit; 
		} 
	}
	// ensures that the payload is good 
	verifyPayload (original: MRARequestTableOutput, payload : any, mode : string) : string [] {
		let results : string [] = []
		console.log("Payload being screened")
		switch (mode) {
			case 'override':
				if (payload.comment.length===0) {
					results.push("Comments are currently empty. Changes require comments to be added.")
				}
				if (payload.status.length===0) {
					results.push("Status for override is currently empty. Status would need to be filled in to make a change.")
				}
				if (payload.status && original.status.value === payload.status) {
					results.push("Status for override is the same as the original. Status would need to be different to submit a change.")
				}
				break;  
			case 'edit':
				// check for empties
				if (payload.comment.length===0) {
					results.push("Comments are currently empty. Changes require comments to be added.")
				}
				if (payload.tin.length===0) {
					results.push("TIN input is currently empty. TIN would need to be filled.")
				}
				if (payload.name.length===0) {
					results.push("Company Name is currently empty. Company name would need to be filled.")
				}
				break; 
		}
		return results
	}
	toggleRow (index : number) {
		let searchIndex = this.expandedRows.indexOf(index); 
		if (searchIndex>=0) {
			this.expandedRows.splice(searchIndex, 1); 
		}
		else {
			this.expandedRows.push(index);
		}
	}
	rowExpanded (index : number) {
		return this.expandedRows.includes(index); 
	}
	mraRequestHeaders: string[] = ['index', 'request_id', 'name', 'g2g_id', 'country', 'status', 'date_updated']
	filtersToLook : string [] = ['request_id', 'name', 'g2g_id', 'country', 'status', 'tin']
	doSearch(filter: MRARequestCompanyTotalPayload) {
		//send a REST API with selected countries and other user entered values to get the list of companies matching the criteria
		console.log("Search Items: ", this.searchItems)
		console.log(filter);
		this.backendApi.getMraRequestFromSearch(filter, {
			totalNumberOfElements: 0,
			totalPages: 0,
			currentPage: 0
		}).subscribe((mraRequests: MRARequestTotalResponse []) => {
			this.searching = 'Loading Results...'
			let unique_countries : string [] = [] 
			let mraRequestTable : MRARequestTableOutput [] = mraRequests.map((mraRequest: MRARequestTotalResponse, index: number) => {
				let status = mraRequest.mraRqstCmpny.apprvlStusCd.includes("PENDING") ?
					"pending" : mraRequest.mraRqstCmpny.apprvlStusCd.includes("APPROVED") ?
						"approved" : "rejected";
				// missing g2g_ui and date_updated for now, to be figured out later 
				let country = mraRequest.mraRqst.cntryCd || mraRequest.mraRqst.hostCtry;
				if (!unique_countries.includes(country)) {
					unique_countries.push(country);
				}
				return {
					index: index + 1,
					request_id: mraRequest.mraRqst.mraRqstId,
					g2g_id: mraRequest.mraRqstCmpny.g2gCmpnyId,
					company_name: mraRequest.mraRqstCmpny.cmpnyNm,
					country: mraRequest.mraRqst.cntryCd || mraRequest.mraRqst.hostCtry,
					status: {
						class: status,
						value: mraRequest.mraRqstCmpny.apprvlStusCd
					},
					monetaryValue: 0, 
					mainAddress: '', 
					containers: 0,
					request: mraRequest, 
					edit: {
						mode: '', 
						error: '',
						locationEdit: []
					}
				}
			}) || []
			this.mraRequests = mraRequestTable;
			// loads up the countries based on the search results given
			this.mainCountries = unique_countries.map((country: string) => {
				return {
					name: this.utils.translateCodeToCountry(country),
					isoCd: country,
				}
			})
			this.searching = '';
			console.log("Main countries: ", this.mainCountries);
			this.filterResults('new_search', []);
		})
		this.pageTotalLength = 0;
	}
	filterUpdate = (type : string, filterValue : string) => {
		// filters based on the results change of the filter 
		this.filterResults(type, filterValue);
	}
	modal!: MatDialogRef<CompanyMraDlgComponent>;
	openModal = (mraRequestCompany : MRARequestTableOutput) => {
		// checks if it's normal view mode
		if (mraRequestCompany.edit.mode=='') {
			this.modal = this.dialogModal.open(CompanyMraDlgComponent, {
				height: '70%', 
				width: '70%', 
				data: {
					mraRequestCompany: mraRequestCompany
				}
			})
		}
	}
	filterResults = (filter : string, currentValue : string | string []) => {
		// will only filter if it turns out to be a unique search
		console.log("Filter type: ", filter, " Filter Value: ", currentValue);
		this.filteredMraRequests = filter!== 'new_search' ? this.mraRequests.filter((mraRequest)=>{
			let allFilterConditions : boolean [] = [
				mraRequest.request_id.toLowerCase().includes(this.searchItems.request_id.toLowerCase()),
				mraRequest.company_name.toLowerCase().includes(this.searchItems.company.toLowerCase()), 
				mraRequest.g2g_id.toLowerCase().includes(this.searchItems.g2g_id.toLowerCase()), // g2g ui 
				this.searchItems.countries.includes(mraRequest.country) || this.searchItems.countries.length === 0,
				this.searchItems.status.includes(mraRequest.status.value) || this.searchItems.status.length===0, 
				mraRequest.request.mraRqstCmpny.tin.toLowerCase().includes(this.searchItems.tin.toLowerCase()) // tin number 
			]
			let value : any = currentValue; 
			let filterIndex = this.mraRequestHeaders.indexOf(filter);
			let condition = true; 
			
			// depending on the filter type, it will use different conditions to filter out the value
			switch (filter) {
				case 'request_id':
					condition = mraRequest.request_id.toLowerCase().includes(value.toLowerCase())
					break; 
				case 'name': 
					condition = mraRequest.company_name.toLowerCase().includes(value.toLowerCase())
					break; 
				case 'g2g_id': 
					condition = mraRequest.g2g_id.toLowerCase().includes(value.toLowerCase());
					break; 
				case 'country': 
					// makes a unique condition, if countries is empty, it will accept anything
					condition = value.includes(mraRequest.country) || value.length === 0
					break; 
				case 'status': 
					// makes a unique condition, if status is empty, it will accept anything
					condition = value.includes(mraRequest.status.value) || value.length === 0
					break; 
				case 'tin': 
					condition = mraRequest.request.mraRqstCmpny.tin.toLowerCase().includes(value.toLowerCase())
					break; 
			}
			if (filterIndex>0) {
				allFilterConditions[filterIndex] = condition;
			}
			// accumulates all of the conditions put together 
			return allFilterConditions.reduce((totalCondition, condition)=> {
				return totalCondition && condition
			}, true);
		}) : this.mraRequests; 
	}

	showCompanyView(countryName: string, companyName: string) {
		this.closeCompanyView();
		this.companyName = companyName;
		this.countryName = countryName;
	}

	closeCompanyView() {
		this.companyName = '';
		this.countryName = '';
	}
}

