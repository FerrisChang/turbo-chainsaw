#map {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height:  460px;
}
.input-container {
  width: 95%;
}

.filters-container {
  display: flex;
  width: 90%;
  flex-direction: column;
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

.widget-card {
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  border-color: rgb(142, 153, 163);
}

.card-hdr-class {
  background: rgb(0, 60, 110);
  color: white;
}

.btn-filter {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-filter:hover {
  color: rgb(8, 67, 230);
}

.flag-input {
  width: 1.25em;
  margin-right: 0.5em;
  height: 1.25em;
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
  
  .navbar-btn-hover:hover {
    background-color: rgb(225, 236, 247);
    border-radius: 5px;
    
  }
  
  .dropdown-menu {
    min-width: 200px;
  }
  
  mat-sidenav {
    width: 350px;
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

.dropdown-button {
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  text-align: left;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  font-family: inherit;
  line-height: 1.125;
  margin: 0;
  outline: none;

  &:hover {
    background: none;
  }

  &:focus {
    outline: none;
  }
}

.button-content {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 0 16px;
}

.button-text {
  flex: 1;
  text-align: left;
}

.search-button {
  height: 55px;
  width: 250px;
}

.status-button {
  min-width: 120px;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.2rem;
  font-weight: 500;
  text-transform: capitalize;
}

.expanded-row {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;

  td {
    padding: 1rem;
  }
}

.view-details-link {
  cursor: pointer;
}

@media (max-width: 768px) {
  .search-form-field {
    width: 100%;
  }

  .search-button {
    width: 100%;
  }
}

.company-details {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);

  .row {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  strong {
    color: #495057;
    min-width: 180px;
    display: inline-block;
  }
}

.mt-3 {
  margin-top: 1rem;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 0;
}

:host ::ng-deep {
  .mat-form-field-wrapper {
    margin-bottom: 0;
  }

  .mat-form-field-infix {
    padding: 0.5em 0;
  }

  .mat-form-field-appearance-outline .mat-form-field-outline {
    color: #ced4da;
  }

  .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline {
    color: #007bff;
  }

  .mat-form-field-label {
    color: #6c757d;
  }

  .mat-form-field.mat-focused .mat-form-field-label {
    color: #007bff;
  }

  .mat-checkbox-frame {
    border-color: #ced4da;
  }

  .mat-checkbox-checked .mat-checkbox-background {
    background-color: #007bff;
  }

  .mat-paginator {
    background: transparent;
  }

  .mat-paginator-page-size-select {
    margin: 0 4px 0 4px;
    width: 56px;
  }

  .mat-paginator-range-label {
    margin: 0 32px 0 24px;
  }

  .mat-paginator-navigation-previous {
    order: 0;
  }

  .mat-paginator-page-size {
    order: 1;
  }

  .mat-paginator-range-label {
    order: 2;
  }

  .mat-paginator-navigation-next {
    order: 3;
  }
}




<div class="container-fluid">
  <h1 class="px-4 pt-4 pb-2" style="border-bottom: 2px solid rgba(0, 60, 110, 0.15);">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search" viewBox="0 0 18 18">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
    </svg>
    Search Companies
  </h1>
</div>

<div class="row mx-4 pb-3">
  G2G Network Web Portal provides extensive search capabilities and allows you to search for any company in our records. Ferrus
</div>

<div class="input-container pb-3">
  <div class="filters-container">
    <div class="filters-row">
      <mat-form-field class="search-form-field" style="width: 200px;">
        <mat-label>Company Name</mat-label>
        <input matInput type="text" [(ngModel)]="companyNameInput">
        <ng-container *ngIf="companyNameInput">
          <button matSuffix mat-icon-button aria-label="Clear" (click)="companyNameInput=''" style="position: fixed; right: 0px; top: 5px;">
            <mat-icon>close</mat-icon>
          </button>
        </ng-container>
      </mat-form-field>

      <mat-form-field class="search-form-field" style="width: 200px;">
        <mat-label>TIN</mat-label>
        <input matInput type="text" [(ngModel)]="tinInput">
        <ng-container *ngIf="tinInput">
          <button matSuffix mat-icon-button aria-label="Clear" (click)="tinInput=''" style="position: fixed; right: 0px; top: 5px;">
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
      <mat-form-field class="search-form-field" style="width: 300px">
        <mat-label>MRA Status</mat-label>
        <mat-select [formControl]="statusesForm" multiple>
          <mat-option *ngFor="let status of MRAList" [value]="status.value">{{status.name}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field class="search-form-field">
        <mat-label>Countries</mat-label>
        <mat-select [formControl]="countriesForm" multiple>
          <mat-option *ngFor="let country of mainCountries" [value]="country.isoCd">
            <span *ngIf="country.name.length>2" class="flag-input fi fi-{{country.isoCd.toLowerCase()}}"></span>
            {{country.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  </div>

  <div class="row justify-content-center" style="text-align: left;">
    <div class="col-auto">
      <button mat-raised-button color="primary" style="height: 55px; width: 150px;" (click)="startSearch()">Search</button>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col">
      <div class="card widget-card">
        <div class="card-header card-hdr-class">
          <div class="row">
            <div class="col">
              <h4 class="card-title mb-1 pt-1">Search Results</h4>
            </div>
            <div class="col-1 float-right">
              <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0" [matMenuTriggerFor]="menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item>Export</button>
                <button mat-menu-item>Filter</button>
              </mat-menu>
            </div>
          </div>
        </div>

        <div class="card-body px-0 pt-0 pb-0">
          <table class="table table-hover">
            <thead>
              <tr style="height: 50px;">
                <th scope="col">#</th>
                <th scope="col">Country</th>
                <th scope="col">Company Name</th>
                <th scope="col">G2G ID</th>
                <th scope="col">Current Company Status</th>
                <th scope="col">Approval Status Date Time</th>
                <th scope="col">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let company of companiesList; index as i">
                <tr [ngClass]="expandedCompanyinTable === company.cmpnyNm + '-' + company.tin ? 'bg-light' :'bg-white'" (click)="selectCompaniesRow(company.cmpnyNm, company.tin)" style="cursor: pointer;">
                  <th scope="row">{{ i + 1 }}</th>
                  <td>
                    <p>{{getThisCountryNameFromISO(company.cntryCd)}}</p>
                  </td>
                  <td>
                    <p>{{company.cmpnyNm}}</p>
                  </td>
                  <td>{{company.g2gCmpnyId}}</td>
                  <td>{{company.apprvlStusCd}}</td>
                  <td>{{company.apprvlStusDttm | date}}</td>
                  <td>{{company.updtDttm | date}}</td>
                  <td>
                    <button type="button" class="btn btn-sm status-button" [ngClass]="company.apprvlStusCd ==='Approved' ? 'btn-success' : company.apprvlStusCd ==='Rejected' ? 'btn-danger' : company.apprvlStusCd ==='In Progress' ? 'btn-warning' : 'black'">
                      {{company.apprvlStusCd}}
                    </button>
                  </td>
                </tr>
                <tr *ngIf="expandedCompanyinTable === company.cmpnyNm + '-' + company.tin" class="expanded-row">
                  <td colspan="8">
                    <div class="row">
                      <div class="col-12 px-4 mx-2">
                        <h4>Company Information</h4>
                        <div class="company-details">
                          <div class="row">
                            <div class="col-md-6">
                              <p><strong>Company Object ID:</strong> {{company.cmpnyObjId}}</p>
                              <p><strong>Host Country ID Type:</strong> {{company.hostCtryCmpnyIdTyp}}</p>
                              <p><strong>Host Country ID:</strong> {{company.hostCtryCmpnyId}}</p>
                              <p><strong>AEO Account Number:</strong> {{company.aeoAccntNbr}}</p>
                              <p><strong>TIN:</strong> {{company.tin}}</p>
                              <p><strong>Company Name:</strong> {{company.cmpnyNm}}</p>
                              <p><strong>AEO Cert Date:</strong> {{company.aeoCertDt | date}}</p>
                              <p><strong>AEO Recert Date:</strong> {{company.aeoRecertDt | date}}</p>
                            </div>
                            <div class="col-md-6">
                              <p><strong>Company UUID:</strong> {{company.cmpnyUuid}}</p>
                              <p><strong>Approval Status:</strong> {{company.apprvlStusCd}}</p>
                              <p><strong>Approval DateTime:</strong> {{company.apprvlStusDttm | date}}</p>
                              <p><strong>Mid Value:</strong> {{company.midVal}}</p>
                              <p><strong>Is Latest:</strong> {{company.isLtstInd}}</p>
                              <p><strong>State:</strong> {{company.st}}</p>
                              <p><strong>Entity Type:</strong> {{company.entyTyp}}</p>
                              <p><strong>G2G Company ID:</strong> {{company.g2gCmpnyId}}</p>
                            </div>
                          </div>
                          <div class="row mt-3">
                            <div class="col-12">
                              <p><strong>Role List:</strong> {{company.rolList}}</p>
                              <p><strong>Country Code:</strong> {{company.cntryCd}}</p>
                              <p><strong>Create DateTime:</strong> {{company.crteDttm | date}}</p>
                              <p><strong>Update DateTime:</strong> {{company.updtDttm | date}}</p>
                              <p><strong>User Audit:</strong> {{company.usrAudit}}</p>
                              <p><strong>Comment:</strong> {{company.cmt}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </ng-container>
            </tbody>
          </table>
        </div>

        <div class="card-footer">
          <mat-paginator style="background-color: rgba(0,0,0,0);"
            [length]="pageTotalLength"
            [pageSize]="pageSize"
            [pageSizeOptions]="[15, 25, 50]"
            (page)="tablePageChange($event)"
            aria-label="Select page">
          </mat-paginator>
        </div>
      </div>
    </div>
  </div>
</div>

<ng-container *ngIf="countryName !== '' && companyName !==''">
  <div class="container-fluid mt-3 pt-4 px-4">
    <div class="row card widget-card">
      <div class="card-header card-hdr-class">
        <div class="row">
          <div class="col">
            <h1>Company Details for: {{companyName}}</h1>
          </div>
          <div class="col-2">
            <button class="float-right text-white" mat-button (click)="closeCompanyView()">Close</button>
          </div>
        </div>
      </div>
      <div class="row pt-3 mx-1 px-3">
        <app-company-single-view [countryName]="countryName" [companyName]="companyName"></app-company-single-view>
      </div>
    </div>
  </div>
</ng-container>
