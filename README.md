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
    G2G Network Web Portal provides extensive search capabilities and allows you to search for any MRA Request in our
    records.
</div>

<div class="input-container pb-3">
    <div class="filters-container">
        <div class="filters-row">
            <mat-form-field class="search-form-field" style="width: 200px;">
                <mat-label>MRA Request ID</mat-label>
                <input matInput type="text" [(ngModel)]="searchItems.request_id">
                <ng-container *ngIf="searchItems.request_id">
                    <button matSuffix mat-icon-button aria-label="Clear" (click)="searchItems.request_id=''"
                        style="position: fixed; right: 0px; top: 5px;">
                        <mat-icon>close</mat-icon>
                    </button>
                </ng-container>
            </mat-form-field>
            <mat-form-field class="search-form-field" style="width: 200px;">
                <mat-label>Company Name</mat-label>
                <input matInput type="text" [(ngModel)]="searchItems.company">
                <ng-container *ngIf="searchItems.company">
                    <button matSuffix mat-icon-button aria-label="Clear" (click)="searchItems.company=''"
                        style="position: fixed; right: 0px; top: 5px;">
                        <mat-icon>close</mat-icon>
                    </button>
                </ng-container>
            </mat-form-field>

            <form [formGroup]="dateRangeForm">
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
            </form>
        </div>
        <div class="filters-row">
            <mat-form-field class="search-form-field" style="width: 200px;">
                <mat-label>TIN</mat-label>
                <input matInput type="text" [(ngModel)]="searchItems.tin">
                <ng-container *ngIf="searchItems.tin">
                    <button matSuffix mat-icon-button aria-label="Clear" (click)="searchItems.tin=''"
                        style="position: fixed; right: 0px; top: 5px;">
                        <mat-icon>close</mat-icon>
                    </button>
                </ng-container>
            </mat-form-field>
            <mat-form-field class="search-form-field" style="width:300px">
                <mat-label>MRA Request Statuses</mat-label>
                <mat-select [formControl]="statusesForm" multiple>
                    <mat-option *ngFor="let mraRequestStatus of MRAList"
                        [value]="mraRequestStatus.value">{{mraRequestStatus.name}}</mat-option>
                </mat-select>
            </mat-form-field>
            <mat-form-field class="search-form-field">
                <mat-label>From Country</mat-label>
                <mat-select [formControl]="countriesForm" multiple>
                    <mat-option *ngFor="let country of mainCountries" [value]="country.isoCd">
                        <span *ngIf="country.name.length>2"
                            class="flag-input fi fi-{{country.isoCd.toLowerCase()}}"></span>
                        {{country.name}}</mat-option>
                </mat-select>
            </mat-form-field>
        </div>


    </div>
    <div class="row justify-content-center" style="text-align: left;">
        <div class="col-auto  ">
            <button mat-raised-button color="primary" style="height: 55px; width: 150px;"
                (click)="startSearch()">Search</button>
        </div>
    </div>

</div>

<div class="container-fluid" style="  position: relative;  ">
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
                    <table mat-table [dataSource]="mraRequests" multiTemplateDataRows class="table table-hover">
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
                                <div class="{{mraRequest.status.class}} table-cell">
                                    {{mraRequest.status.value}}
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
                                    <div class="details-header">
                                        MRA Request Additional Information
                                    </div>
                                    <div class="details-row">
                                        <div class="flex-row">
                                            <div class="flag" *ngIf="getThisCountryNameFromISO(mraRequest.country).length>2">
                                                <span class="flag-detail fi fi-{{mraRequest.country}}"></span>
                                            </div>
                                            <div class="details-frame-1">
                                                <div class="flex-row">
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">Company Name</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.request.mraRqstCmpny.cmpnyNm}}
                                                        </span>
                                                    </div>
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">Country</mat-label>
                                                        <span class="details-field">
                                                            {{getThisCountryNameFromISO(mraRequest.country)}}
                                                        </span>
                                                    </div>
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">MRA Request ID</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.request_id}}
                                                        </span>
                                                    </div>
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">G2G ID</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.g2g_id}}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="flex-row">
                                                    
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">TIN</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.request.mraRqstCmpny.tin}}
                                                        </span>
                                                    </div>
                                                   
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">Role List</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.request.mraRqstCmpny.rolList}}
                                                        </span>
                                                    </div>
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">Status</mat-label>
                                                        <span class="details-field {{mraRequest.status.class}} status-details-text">
                                                            {{mraRequest.status.value}}
                                                        </span>
                                                    </div>
                                                    <div class="details-field-container">
                                                        <mat-label class="details-header">Approval Status Updated</mat-label>
                                                        <span class="details-field">
                                                            {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex-row"></div>
                                    </div>
                                    <div class="auto-vetting-row">
                                        <mat-expansion-panel>
                                            <mat-expansion-panel-header class="details-expansion-header">
                                                <mat-panel-title> Autovetting </mat-panel-title>
                                                <mat-panel-description  class="details-expansion-description">
                                                    View Autovetting Information
                                                </mat-panel-description>
                                            </mat-expansion-panel-header>
                                            <div class="flex-row">
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="flex-row">
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Approval Status Updated</mat-label>
                                                    <span class="details-field">
                                                        {{mraRequest.request.mraRqstCmpny.apprvlStusDttm}}
                                                    </span>
                                                </div>
                                            </div>
                                        </mat-expansion-panel>
                                    </div>
                                    <div class="locations-row">
                                        <mat-expansion-panel>
                                            <mat-expansion-panel-header class="details-expansion-header">
                                                <mat-panel-title> Company Locations </mat-panel-title>
                                                <mat-panel-description class="details-panel-description">
                                                    View Company Location Information
                                                </mat-panel-description>
                                            </mat-expansion-panel-header>
                                               <div class="details-location-frame flex-column">
                                                <div *ngFor="let location of mraRequest.request.mraRqstCmpny.mraRqstCmpnyLocList; index as locationIndex;" class="location-detail flex-column">
                                                    <div class="{{location.isPrmryLoc ? 'bolded' : ''}} location-header">
                                                        Location {{locationIndex +1}}:
                                                    </div>
                                                    <div class="location-details flex-column">
                                                        <div class="flex-row">
                                                            <div class="details-field-container">
                                                                <mat-label class="details-header">Company Address</mat-label>
                                                                <span class="details-field">
                                                                    {{location.cmpnyAddr}}
                                                                </span>
                                                            </div>
                                                            <div class="details-field-container">
                                                                <mat-label class="details-header">City</mat-label>
                                                                <span class="details-field">
                                                                    {{location.city}}
                                                                </span>
                                                            </div>
                                                            <div class="details-field-container">
                                                                <mat-label class="details-header">State/Province</mat-label>
                                                                <span class="details-field">
                                                                    {{location.stOrProvince}}
                                                                </span>
                                                            </div>
                                                            <div class="details-field-container">
                                                                <mat-label class="details-header">Primary Location?</mat-label>
                                                                <span class="{{location.isPrmryLoc}} details-primary-location details-field">
                                                                    {{location.isPrmryLoc}}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="flex-row">
                                                            <div class="details-field-container">
                                                                <mat-label class="details-header">Longitude</mat-label>
                                                                <span class="details-field">
                                                                    {{location.lngtud}}
                                                                </span>
                                                            </div>
                                                            <div class="details-field-container">
                                                                <mat-label class="details-header">Latitude</mat-label>
                                                                <span class="details-field">
                                                                    {{location.latud}}
                                                                </span>
                                                            </div>
                                                            <div class="details-field-container">
                                                                <mat-label class="details-header">Date Created</mat-label>
                                                                <span class="details-field">
                                                                    {{location.crteDttm}}
                                                                </span>
                                                            </div>
                                                            <div class="details-field-container">
                                                                <mat-label class="details-header">Last Updated</mat-label>
                                                                <span class="details-field">
                                                                    {{location.updtDttm}}
                                                                </span>
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
                        <tr mat-row class="table-row {{expandedRows.includes(row.index) ? 'selected' : ''}}" *matRowDef="let row; columns: mraRequestHeaders;"
                            (click)="toggleRow(row.index)"></tr>
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

 
  #map {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height:  460px;
  }
  .table-row {
    cursor: pointer;
    text-align: center;
    font-size: 1.1em;
  }
  .filters-container {
    display: flex; 
    width: 90%;
    flex-direction: column;
  }
  .table-row:hover {
    background-color: rgb(184, 181, 181);
  }
  tr.table-details-row {
    height: 0;
    width: 100%;
  }
  tr.table-details-row:hover {
    background-color: whitesmoke !important;
  }
  .details-frame {
    flex:1;
  }
  .table-details-frame {
    height: 0;
    padding: 0;
  }
  .details-row {
    display: flex; 
    flex-direction: column;
    width: 100%;
  }
  .flag {
    flex: 1; 
    display: flex; 
    align-items: center;
  }
  .flag-detail {
    height: 100%; 
    flex: auto; 
  }
  .table-row.selected {
    background-color: rgb(227 237 246);
  }
  .table-row.selected>td {
    background-color: transparent;
  }
  .details-frame-1 {
    flex: 7; 
    display: flex; 
    flex-direction: column
  }
  .auto-vetting-row {
    margin-top: 1em;
  }
  .details-field-container {
    flex: 1;
    display: inline-block; 
    cursor: pointer;
    margin-top: 1em; 
  }
  .details-expansion-header {
    font-size: 1.2em;
  }

  .details-header {
    flex: 1;
    margin-left: 0.25em;
    font-size: 1.25em; 
    font-weight: 500;
  }
  .details-field {
    flex: 1; 
    margin-left: 0.5em;
    font-size: 1.25em; 
  }
  .status-details-text {
    padding-left: 1em; 
    padding-right: 1em;
    width: fit-content;
  }
  .details-primary-location {
    width: fit-content;
    padding-right: 1.5em;
    padding-left: 1.5em;
  }
  .table-details-wrapper {
    overflow: hidden; 
    display: flex; 
    flex-direction: column;
    height: 0;
    opacity: 0;
    width: 100%;
    transition:  0.2s ease-out;
  }
  .table-details-wrapper.expanded {
    opacity: 1;
    padding-top: 1em; 
    padding-bottom: 2em;
    height: auto;
  }
  .table-details-wrapper.expanded:hover {
    background-color: whitesmoke !important;
  }
  .location-detail {
    margin-top: 1em;
    border-bottom: 1px solid black;
  }
  .location-header {
    font-size: 1.4em; 
    margin-bottom: 0.5em;
    border-bottom: 1px solid black; 
  }
  .bolded.location-header {
    font-weight: 700;
  }
  .location-details {
    margin-left: 1em;
  }
  .details-expansion-header:hover {
    background-color: #e2dfdf !important;
  }
  .approved,.true {
    background-color: rgb(132, 255, 142);
  }
  .pending {
    background-color: rgb(239, 255, 170);
  }
  .rejected,.false {
    background-color: rgb(255, 132, 132);
  }
  .table-cell {
    width: 40%; 
    height: 80%;
    text-align: center;
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
    .flag-input {
      width: 1.25em; 
      margin-right: 0.5em;
      height: 1.25em;
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
    .input-container {
      width: 95%;
    }

    .filters-row {
      display: flex;
      gap: 1em;
    }
    .search-form-field {
      flex: 1; 
      margin-left: 1em; 
      margin-right: 1em;
    }

