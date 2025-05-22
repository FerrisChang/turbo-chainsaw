
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Company, CompanyLocation, CompanyOnMapView } from 'src/app/company-full-view/companies-types';
import { MRAList } from 'src/app/mra-request-full-view/mra-request-full-view.component';
import { sampleCompany } from './models/companies';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CompanyMraDlgComponent } from 'src/app/company-mra-dlg/company-mra-dlg.component';
import { ViewLocationComponent } from 'src/app/utils/view-location/view-location.component';
import { UtilsService } from 'src/app/services/utils.service';

export type CompanyTableFilter = {
  address: any;
  name: string,
  status: string[],
  country: string,
  company_id: string
  tin: string
}

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss']
})
export class CompaniesTableComponent implements OnChanges {
  @Input() companies: CompanyOnMapView[] = sampleCompany
  @Input() headers: string[] = ['index', 'name', 'country', 'company_id', 'status'];
  @Input() filters: string[] = ['index', 'name', 'country', 'company_id', 'status', 'tin'];
  MRAList = MRAList;
  filter: CompanyTableFilter = {
    name: '',
    country: '',
    company_id: '',
    tin: '',
    address: '',
    status: []
  }
  statusesForm: FormControl = new FormControl([]);
  selected: number[] = []
  filteredCompanies: CompanyOnMapView[] = this.companies;
  modal!: MatDialogRef<CompanyMraDlgComponent>;

  constructor(public dialogModel: MatDialog,
    private utils: UtilsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['companies']) {
      console.log('Companies input changed:', this.companies);
      this.filteredCompanies = [...this.companies];
      this.applyFilters();
    }
  }

  ngOnInit() {
    console.log("Companies being added for the first time: ", this.companies)
    this.filteredCompanies = this.companies;
    this.statusesForm.valueChanges.subscribe((status) => {
      console.log('Status form value changed:', status);
      this.filter.status = status || []; // Ensure we always have an array, even if empty
      this.filterUpdate('status', status || []);
    });
  }

  private applyFilters() {
    if (!this.companies) return;
    
    console.log('Applying filters with status:', this.filter.status);
    
    this.filteredCompanies = this.companies.filter((company: CompanyOnMapView) => {
      // If no statuses are selected, return all companies
      const statusMatch = this.filter.status.length === 0 ? true :
        this.filter.status.some(selectedStatus => {
          const companyStatus = company.mra_status.value.toLowerCase();
          const selectedStatusLower = selectedStatus.toLowerCase();
          console.log('Comparing statuses:', {
            companyStatus,
            selectedStatus: selectedStatusLower,
            matches: companyStatus === selectedStatusLower
          });
          return companyStatus === selectedStatusLower;
        });
      
      let allFilterConditions: boolean[] = [
        company.name.toLowerCase().includes(this.filter.name.toLowerCase()),
        company.hostCountry.toLowerCase().includes(this.filter.country.toLowerCase()),
        company.companyAddress.toLowerCase().includes(this.filter.address.toLowerCase()),
        company.companyID.id.toLowerCase().includes(this.filter.company_id.toLowerCase()),
        statusMatch,
        company.tin.toLowerCase().includes(this.filter.tin.toLowerCase()),
      ];
      
      console.log('Filtering company:', {
        name: company.name,
        status: company.mra_status.value,
        selectedStatuses: this.filter.status,
        statusMatch,
        allConditions: allFilterConditions,
        noStatusSelected: this.filter.status.length === 0
      });
      
      return allFilterConditions.every(condition => condition);
    });

    console.log('Filtered results:', {
      totalCompanies: this.companies.length,
      filteredCount: this.filteredCompanies.length,
      statusFilter: this.filter.status,
      filteredCompanies: this.filteredCompanies.map(c => ({
        name: c.name,
        status: c.mra_status.value
      }))
    });
  }

  createAddress(location : CompanyLocation ) {
    return this.utils.convertLocationConversion(location, 'company');
  }

  openModal(company: Company) {
    this.modal = this.dialogModel.open(CompanyMraDlgComponent, {
      height: '80%',
      width: '75%',
      data: { company: company }
    });
    this.modal.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addressModal!: MatDialogRef<ViewLocationComponent>;
  openAddressModal(company: CompanyOnMapView, location: CompanyLocation) {
    this.addressModal = this.dialogModel.open(ViewLocationComponent, {
      width: '75%',
      height: '75%',
      data: {
        name: company.name,
        country: company.hostCountry,
        address: this.utils.convertLocationConversion(location, 'company'),
        locationFound: false,
        location: [0, 0]
      }
    })
  }
  toggleRow = (id: number) => {
    let selectedIndex = this.selected.indexOf(id);
    if (selectedIndex >= 0) {
      this.selected.splice(selectedIndex, 1);
    }
    else {
      this.selected.push(id);
    }
  }
  rowExpanded = (id: number) => {
    return this.selected.includes(id);
  }
  getThisCountryNameFromISO = (countryCode: string) => {
    return this.utils.translateCodeToCountry(countryCode);
  }
  filterConditions: string[] = ['name', 'country', 'address', 'company_id', 'status', 'tin']
  filterUpdate = (filterType: string, filter: string | string[]) => {
    console.log('Filter update:', { filterType, filter });
    if (filterType === 'status') {
      // Ensure we're working with an array of strings
      const statusArray = Array.isArray(filter) ? filter : [filter];
      this.filter.status = statusArray;
    } else {
      this.filter[filterType as keyof CompanyTableFilter] = filter as any;
    }
    this.applyFilters();
  }
}





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
                                                  <mat-form-field appearance="fill" [id]="getStatusFieldId(mraRequest.request_id)">
                                                      <mat-label>MRA Request Statuses</mat-label>
                                                      <mat-select [(value)]="mraRequest.edit.payload.status"
                                                          [panelWidth]="''"
                                                          [id]="getStatusSelectId(mraRequest.request_id)"
                                                          (selectionChange)="addStatusClassToTextField($event.value, mraRequest.request_id)">
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
                  <mat-paginator 
                    [length]="pageTotalLength"
                    [pageSize]="pageSize"
                    [pageSizeOptions]="pageSizeOptions"
                    [pageIndex]="currentPage"
                    (page)="onPageChange($event)"
                    aria-label="Select page">
                  </mat-paginator>
              </div>
          </div>
      </div>
  </div>
</div>
