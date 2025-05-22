
import { Component, Input } from '@angular/core';
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
export class CompaniesTableComponent {
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
  ) {
   
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
  ngOnInit() {
    console.log("Companies being added for the first time: ", this.companies)
    this.filteredCompanies = this.companies;
    this.statusesForm.valueChanges.subscribe((status) => {
      this.filter.status = status;
      this.filterUpdate('status', status)
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
    // takes account every other filter when needed
    this.filteredCompanies = this.companies.filter((company: CompanyOnMapView) => {
      let statusList = this.filter.status.filter((companyStatus) => {
        return companyStatus.includes(company.mra_status.value)
      })
      console.log("Status : ", statusList);
      let allFilterConditions: boolean[] = [
        company.name.toLowerCase().includes(this.filter.name.toLowerCase()),
        company.hostCountry.toLowerCase().includes(this.filter.country.toLowerCase()),
        company.companyAddress.toLowerCase().includes(this.filter.address.toLowerCase()),
        company.companyID.id.toLowerCase().includes(this.filter.company_id.toLowerCase()),
        statusList.length > 0 || this.filter.status.length === 0,
        company.tin.toLowerCase().includes(this.filter.tin.toLowerCase()),
      ]
      let conditionIndex = this.filterConditions.indexOf(filterType);
      let condition = true;
      let filterValue: any = filter;
      switch (filterType) {
        case 'name':
          condition = company.name.toLowerCase().includes(filterValue.toLowerCase());
          break;
        case 'address':
          condition = company.companyAddress.toLowerCase().includes(filterValue.toLowerCase());
          break;
        case 'company_id':
          condition = company.companyID.id.toLowerCase().includes(filterValue.toLowerCase());
          break;
        case 'status':
          condition = filterValue.includes(company.mra_status.value) || filterValue.length === 0;
          break;
        case 'country':
          condition = company.hostCountry.toLowerCase().includes(filterValue.toLowerCase());
          break;
        case 'tin':
          condition = company.tin.toLowerCase().includes(filterValue.toLowerCase());
          break;
      }
      allFilterConditions[conditionIndex] = condition;
      return allFilterConditions.reduce((allConditions, condition) => {
        return allConditions && condition
      }, true)
    })
  }
}

<div class="companies-table-frame">
    <div class="filters">
        <mat-form-field class="search-form-field" *ngIf="filters.includes('name')">
            <mat-label>Company Name</mat-label>
            <input matInput type="text" [(ngModel)]="filter.name" (ngModelChange)="filterUpdate('name', $event)">
            <ng-container *ngIf="filter.name">
                <button matSuffix mat-icon-button aria-label="Clear" (click)="filter.name='';filterUpdate('name', '')"
                    style="position: fixed; right: 0px; top: 5px;">
                    <mat-icon>close</mat-icon>
                </button>
            </ng-container>
        </mat-form-field>
        <mat-form-field class="search-form-field" *ngIf="filters.includes('country')">
            <mat-label>Country</mat-label>
            <input matInput type="text" [(ngModel)]="filter.country" (ngModelChange)="filterUpdate('country', $event)">
            <ng-container *ngIf="filter.country">
                <button matSuffix mat-icon-button aria-label="Clear" (click)="filter.country='';filterUpdate('country', '')"
                    style="position: fixed; right: 0px; top: 5px;">
                    <mat-icon>close</mat-icon>
                </button>
            </ng-container>
        </mat-form-field>
        <mat-form-field class="search-form-field" *ngIf="filters.includes('address')">
            <mat-label>Address</mat-label>
            <input matInput type="text" [(ngModel)]="filter.address" (ngModelChange)="filterUpdate('address', $event)">
            <ng-container *ngIf="filter.address">
                <button matSuffix mat-icon-button aria-label="Clear" (click)="filter.address='';filterUpdate('address', '')"
                    style="position: fixed; right: 0px; top: 5px;">
                    <mat-icon>close</mat-icon>
                </button>
            </ng-container>
        </mat-form-field>
        <mat-form-field class="search-form-field" *ngIf="filters.includes('company_id')">
            <mat-label>Company ID</mat-label>
            <input matInput type="text" [(ngModel)]="filter.company_id" (ngModelChange)="filterUpdate('company_id', $event)">
            <ng-container *ngIf="filter.company_id">
                <button matSuffix mat-icon-button aria-label="Clear" (click)="filter.company_id=''; filterUpdate('company_id', '')"
                    style="position: fixed; right: 0px; top: 5px;">
                    <mat-icon>close</mat-icon>
                </button>
            </ng-container>
        </mat-form-field>
        <mat-form-field class="search-form-field" *ngIf="filters.includes('status')">
            <mat-label>MRA Statuses</mat-label>
            <mat-select [formControl]="statusesForm" multiple [panelWidth]="''">
                <mat-option *ngFor="let mraRequestStatus of MRAList"
                    [value]="mraRequestStatus.value">{{mraRequestStatus.name}}</mat-option>
            </mat-select>
        </mat-form-field>
        <mat-form-field class="search-form-field" *ngIf="filters.includes('tin')">
            <mat-label>TIN</mat-label>
            <input matInput type="text" [(ngModel)]="filter.tin" (ngModelChange)="filterUpdate('tin', $event)">
            <ng-container *ngIf="filter.tin">
                <button matSuffix mat-icon-button aria-label="Clear" (click)="filter.tin=''; filterUpdate('tin', '')"
                    style="position: fixed; right: 0px; top: 5px;">
                    <mat-icon>close</mat-icon>
                </button>
            </ng-container>
        </mat-form-field>
    </div>
    <div class="table">
        <table mat-table [dataSource]="filteredCompanies" multiTemplateDataRows class="table table-hover">
            <ng-container matColumnDef="index">
                <th mat-header-cell *matHeaderCellDef>
                    #
                </th>
                <td mat-cell *matCellDef="let company">
                    {{company.id+1}}
                </td>
            </ng-container>
            <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>
                    Company Name
                </th>
                <td mat-cell *matCellDef="let company">
                    {{company.name}}
                </td>
            </ng-container>
            <ng-container matColumnDef="company_id">
                <th mat-header-cell *matHeaderCellDef>
                    Company ID
                </th>
                <td mat-cell *matCellDef="let company">
                    {{company.companyID.id}}
                </td>
            </ng-container>
            <ng-container matColumnDef="g2g_id">
                <th mat-header-cell *matHeaderCellDef>
                    G2G ID
                </th>
                <td mat-cell *matCellDef="let company">
                    {{company.g2gID}}
                </td>
            </ng-container>
            <ng-container matColumnDef="address">
                <th mat-header-cell *matHeaderCellDef>
                    Address
                </th>
                <td mat-cell *matCellDef="let company">
                    {{company.companyAddress}}
                </td>
            </ng-container>
            <ng-container matColumnDef="country">
                <th mat-header-cell *matHeaderCellDef>
                    Country
                </th>
                <td mat-cell *matCellDef="let company">
                    {{getThisCountryNameFromISO(company.hostCountry)}}
                </td>
            </ng-container>
            <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>
                    Current MRA Status
                </th>
                <td mat-cell *matCellDef="let company">
                    <div class="table-cell status-text"
                    [ngClass]="company.mra_status.class ==='approved' ? 'approved-text' : company.mra_status.class ==='rejected' 
                    ? 'rejected-text' : 'pending-text'">
                    {{company.mra_status.value}}
                    </div>
                </td>
            </ng-container>
            <ng-container matColumnDef="status_updated">
                <th mat-header-cell *matHeaderCellDef>
                    Approval Status Last Updated
                </th>
                <td mat-cell *matCellDef="let company">
                    {{company.company.apprvlStusDttm}}
                </td>
            </ng-container>

            <ng-container matColumnDef="extra-details">
                <td mat-cell *matCellDef="let company" [attr.colspan]="headers.length"
                    class="table-details-frame">
                    <div class="table-details-wrapper" [class.expanded]="rowExpanded(company.id)">
                        <div class="table-details-header">
                            <div class="details-text">
                                Company Information
                            </div>
                            <button class="details-button" mat-raised-button (click)="openModal(company)">
                                Details
                            </button>
                        </div>
                        <div class="details-row">
                            <div class="flex-row">
                                <div class="details-frame-1">
                                    <div class="flex-row">
                                        <div class="details-field-container">
                                            <mat-label class="details-header">Company Name:</mat-label>
                                            <span class="details-field">
                                                {{company.name}}
                                            </span>
                                        </div>
                                       
                                    </div>
                                    <div class="flex-row">
                                        <div class="details-field-container">
                                            <mat-label class="details-header">Company ID:</mat-label>
                                            <span class="details-field">
                                                {{company.companyID.id}}
                                            </span>
                                        </div>
                                        <div class="details-field-container">
                                            <mat-label class="details-header">G2G ID:</mat-label>
                                            <span class="details-field">
                                                {{company.g2gID}}
                                            </span>
                                        </div>
                                        <div class="details-field-container">
                                            <mat-label class="details-header">TIN:</mat-label>
                                            <span class="details-field">
                                                {{company.tin}}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex-row">
                                        <div class="details-field-container">
                                            <mat-label class="details-header">Country: </mat-label>
                                            <span class="details-field">
                                                {{getThisCountryNameFromISO(company.hostCountry)}}
                                            </span>
                                        </div>
                                        <div class="details-field-container">
                                            <mat-label class="details-header">Role List:</mat-label>
                                            <span class="details-field">
                                                {{company.roleList.join(",")}}
                                            </span>
                                        </div>
                                        <div class="details-field-container">
                                            <mat-label class="details-header">Status: </mat-label>
                                            <div class="details-field status-text status-details-text"
                                                [ngClass]="company.mra_status.class === 'approved' ? 'approved-text' : 
                                                company.mra_status.class === 'rejected' ? 'rejected-text' : 'pending-text'"
                                            >
                                                {{company.mra_status.value}}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="flex-row">
                                        <div class="address-container">
                                            <mat-label class="details-header">Primary Location</mat-label>
                                            <div class="details-field" *ngIf="company.companyAddress">
                                                {{company.companyAddress}}
                                            </div>
                                            <div class="details-field" *ngIf="!company.companyAddress">
                                                <div class="address-text" *ngFor="let address of company.address">
                                                    {{address}}
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="locations-row" *ngIf="company.company.cmpnyLocList.length>0">
                            <mat-expansion-panel class="remove-expansion-padding"  [expanded]="true">
                                <mat-expansion-panel-header class="details-expansion-header">
                                    <mat-panel-title> 
                                            Company Locations
                                        </mat-panel-title>
                                </mat-expansion-panel-header>
                                   <div class="details-location-frame">
                                    <div *ngFor="let location of company.company.cmpnyLocList; index as locationIndex;" 
                                    (click)="openAddressModal(company, location)"
                                    class="location-detail flex-column" [class.primaryLocation]="location.isPrmryLoc">
                                        <div>
                                            <div class="location-header" >
                                                {{location.isPrmryLoc ? 'Primary Location' : 'Other Location '+(locationIndex)}}:
                                            </div>
                                        </div>
                                        <div class="location-details flex-column">
                                            <div class="flex-row">
                                                <div class="address details-field-container">
                                                    <mat-label class="details-header">Address: </mat-label>
                                                    <div class="address details-field" *ngIf="location.cmpnyAddr">
                                                        {{location.cmpnyAddr}}
                                                    </div>
                                                    <div class="address details-field" *ngIf="!location.cmpnyAddr">
                                                        <div class="address-text" *ngFor="let address of createAddress(location)">
                                                            {{address}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="location-row-2 flex-row">
                                                <div class="details-field-container" *ngIf="location.latud && location.lngtud">
                                                    <mat-label class="details-header">Latitude/Latitude:</mat-label>
                                                    <span class="details-field">
                                                        {{location.latud}}/{{location.lngtud}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container">
                                                    <mat-label class="details-header">Last Updated:</mat-label>
                                                    <span class="details-field">
                                                        {{location.updtDttm || company.lastUpdated}}
                                                    </span>
                                                </div>
                                                <div class="details-field-container details-primary-location">
                                                    <mat-label class="details-header">Primary Location: </mat-label>
                                                    <div class="details-field status-text"
                                                        [ngClass]="location.isPrmryLoc ? 'approved-text' :  'rejected-text'">
                                                        {{location.isPrmryLoc ? 'Yes': 'No'}}
                                                </div>
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
            <tr mat-header-row *matHeaderRowDef="headers"></tr>
            <tr mat-row class="table-row {{selected.includes(row.id) ? 'selected' : ''}}" *matRowDef="let row; columns: headers;"
                (click)="toggleRow(row.id)"></tr>
            <tr mat-row *matRowDef="let row; columns: ['extra-details'];" class="table-details-row"></tr>
            
        </table>
    </div>
</div>
<!-- <mat-paginator style="background-color: rgba(0,0,0,0);"
                        [length]="pageTotalLength" 
                        [pageSize]="pageSize"
                        [pageSizeOptions]="[15, 25, 50]"
                        (page)="tablePageChange($event)"
                        aria-label="Select page">
                    </mat-paginator> -->
