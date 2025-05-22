

<div class="container-fluid  "  >   
  <h1 class="  px-4 pt-4 pb-2 " style="border-bottom: 2px solid rgba(0, 60, 110, 0.15);">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search" viewBox="0 0 18 18">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
      </svg>
      Search Companies
  </h1>
</div>  


<div class="row mx-4 pb-3">
  G2G Network Web Portal provides extensive search capabilities and allows you to search for any company in our records.
</div> 

<div class="input-container pb-3">
  <div class="filters-container">
    <div class="filters-row">
    <mat-form-field class="search-form-field" style="width: 200px;">
      <mat-label>Company Name</mat-label>
      <input matInput type="text" [(ngModel)]="cmpnySearchParam.cmpnyName">
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
          <mat-option *ngFor="let country of mainCountries.list" [value]="country.IsoCd">
              <span *ngIf="country.name !== undefined && country.name.length>2" class="flag-input fi fi-{{country.IsoCd?.toLowerCase()}}"></span>
              {{country.name}}
          </mat-option>
      </mat-select>
    </mat-form-field>
    </div>
    <div class="filters-row" style="text-align: center;">
    <mat-form-field class="search-form-field" style="width: 200px;">
        <mat-label>TIN</mat-label>
        <input matInput type="text" [(ngModel)]="cmpnySearchParam.tin">
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
  </div>
</div>

<div class="searching-container" *ngIf="searching.length>0">
  <mat-progress-spinner class="spinner" [mode]="'indeterminate'"></mat-progress-spinner>
  <div class="searching-text">
      {{searching}}
  </div>
</div>

<div class="container-fluid"  style="  position: relative;  " *ngIf="searching.length===0">                
  <div class="row">
      <div class="col ">
          <div class="card widget-card">
              <div class="card-header card-hdr-class">
                  <div class="row">
                      <div class="col">
                          <h4 class="card-title mb-1 pt-1" >Search Results</h4> 
                      </div>
                  </div> 
              </div>
              <div class="card-body px-0 pb-0 " >
                <app-companies-table class="companies-table" *ngIf="companiesList.length>0"
                  [headers]="['index', 'name', 'country', 'g2g_id', 'company_id', 'status', 'status_updated']"
                  [filters]="['name', 'address', 'status', 'tin', 'g2g_id']"
                  [companies]="companiesList">
                </app-companies-table>                       
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




<ng-container *ngIf="countryName !== '' && companyName !=='' ">
  
      <div class="container-fluid mt-3 pt-4 px-4" style="position:relative;  ">
          <div class="row card widget-card"> 
              <div class="card-header card-hdr-class">
                  <div class="row">
                      <div class="col">
                          <h1   >Company Details for: {{companyName}}</h1>
                      </div>
                      <div class="col-2">
                          <button class="float-right text-white" mat-button (click)="closeCompanyView()" style="position: relative; bottom: 0px;">Close</button>
                      </div>
                  </div>
              </div>
          <div class="row pt-3 mx-1 px-3"  >
              <app-company-single-view [countryName]="countryName" [companyName]="companyName"></app-company-single-view>
          </div>
      </div>
  </div>
</ng-container>
