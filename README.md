

<div class="container-fluid  "  >   
  <h1 class="  px-4 pt-4 pb-2 " style="border-bottom: 2px solid rgba(0, 60, 110, 0.15);">
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
  <!-- First Row -->
  <div class="filters-row">
    <mat-form-field class="search-form-field" style="width: 200px;">
      <mat-label>Company Name</mat-label>
      <input matInput type="text" [(ngModel)]="companyNameInput">
      <ng-container *ngIf="companyNameInput">
        <button matSuffix mat-icon-button aria-label="Clear" (click)="companyNameInput=''" 
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
          <mat-option *ngFor="let country of mainCountries" [value]="country.IsoCd">
              <span *ngIf="country.name"
                  class="flag-input fi fi-{{country.IsoCd.toLowerCase()}}"></span>
              {{country.name}}</mat-option>
      </mat-select>
    </mat-form-field>


  <!-- Second Row -->
  <div class="filters-row" style="text-align: center;">
    <mat-form-field class="search-form-field" style="width: 200px;">
        <mat-label>TIN</mat-label>
        <input matInput type="text" [(ngModel)]="tinInput">
        <ng-container *ngIf="tinInput">
        <button matSuffix mat-icon-button aria-label="Clear" (click)="tinInput=''" 
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

    <div class="col-3 text-center">
      <button mat-raised-button color="primary" style="height: 55px; width: 250px;" (click)="startSearch()">Search</button>
    </div>
  </div>
</div>



<div class="container-fluid"  style="  position: relative;  " >                
  <div class="row">
      <div class="col ">
          <div class="card widget-card">
              <div class="card-header card-hdr-class">
                  <div class="row">
                      <div class="col">
                          <h4 class="card-title mb-1 pt-1" >Search Results</h4> 
                      </div>
                      <div class="col-1 float-right">                                            
                          <button  class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0  " [matMenuTriggerFor]="menu">
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
              <div class="card-body px-0 pt-0 pb-0 " >                       
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
                              <tr [ngClass]="expandedCompanyinTable === company.cmpnyNm + '-' + company.tin ? 'bg-light' :'bg-white'"  (click)="selectCompaniesRow(company.cmpnyNm, company.tin)" style="cursor: pointer;" >
                                  <th scope="row" >{{ i + 1 }}</th>
                                  <td> 
                                      <p>{{getThisCountryNameFromISO(company.cntryCd)}}</p>
                                  </td>
                                  <td> 
                                      <p>{{company.cmpnyNm}}</p>
                                  </td>
                                  <td>
                                    <p>{{company.g2gCmpnyId}}</p>
                                  </td> 
                                  <td>
                                    <p>{{company.apprvlStusCd}}</p>
                                  </td> 
                                  <td>
                                    <p>{{company.apprvlStusDttm}}</p>
                                  </td> 
                                  <td>
                                    <p>{{company.updtDttm}}</p>
                                  </td> 
                                  <td ><button type="button" class="btn btn-sm" style="width: 120px;" [ngClass]="company.mra_status ==='Approved' ? 'btn-success' : company.mra_status ==='Rejected' ? 'btn-danger' : company.mra_status ==='In Progress' ? 'btn-warning' : 'black'" >{{company.mra_status}} </button></td>
                              </tr>
                              <tr  *ngIf="expandedCompanyinTable === company.cmpnyNm + '-' + company.tin" style="background-color:rgb(218, 218, 218) !important;  ">                                            
                                  <td colspan="8"  style="background-color:rgb(244, 244, 244) !important; height: 200px;">
                                      <p  (click)="showCompanyView(company.country, company.cmpnyNm)" style="cursor: pointer;"><b>Click here to view Company Details for {{expandedCompanyinTable}}</b></p>
                                      <div class="row">
                                          <div class="col-6">
                                              <h4>Information about this Company</h4>
                                              <p><strong>Company Name:</strong> {{company.cmpnyNm}}</p>
                                              <p><strong>Company Object ID:</strong> {{company.cmpnyObjId}}</p>
                                              <p><strong>Host Country ID Type:</strong> {{company.hostCtryCmpnyIdTyp}}</p>
                                              <p><strong>Host Country ID:</strong> {{company.hostCtryCmpnyId}}</p>
                                              <p><strong>AEO Account Number:</strong> {{company.aeoAccntNbr}}</p>
                                              <p><strong>TIN:</strong> {{company.tin}}</p>
                                          </div>
                                          <div class="col-6">
                                            <p><strong>Company UUID:</strong> {{company.cmpnyUuid}}</p>
                                            <p><strong>Approval Status:</strong> {{company.apprvlStusCd}}</p>
                                            <p><strong>Approval DateTime:</strong> {{company.apprvlStusDttm | date}}</p>
                                            <p><strong>Mid Value:</strong> {{company.midVal}}</p>
                                            <p><strong>Is Latest:</strong> {{company.isLtstInd}}</p>
                                            <p><strong>State:</strong> {{company.st}}</p>
                                            <p><strong>Entity Type:</strong> {{company.entyTyp}}</p>
                                            <p><strong>G2G Company ID:</strong> {{company.g2gCmpnyId}}</p>
                                          </div>
                                          <div class="col-6">
                                            <p><strong>Role List:</strong> {{company.rolList}}</p>
                                            <p><strong>Country Code:</strong> {{company.cntryCd}}</p>
                                            <p><strong>Create DateTime:</strong> {{company.crteDttm | date}}</p>
                                            <p><strong>Update DateTime:</strong> {{company.updtDttm | date}}</p>
                                            <p><strong>User Audit:</strong> {{company.usrAudit}}</p>
                                            <p><strong>Comment:</strong> {{company.cmt}}</p>
                                          </div>
                                          <!-- <div class="col">
                                              <p>Information about MRA Status</p>
                                              <p>Status: <b>{{company.apprvlStusCd}}</b></p>
                                          </div> -->
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


import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BackendapiService } from '../backendapi.service'; 
import { Task, DB_Country } from '../dashboard-view/dashboard-view.component';
import { getCountryNameFromISO } from '../companies-view/companies-view.component';
import { ActivatedRoute } from '@angular/router';
import { CompanyFilterTotalPayload } from './companies-types';
import { CompanyPayload } from './companies-types'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { DateRange } from '@angular/material/datepicker';
import { MRARequestStatusInput } from './companies-types';

export const MRAList = [
	{
		name: 'Approved',
		value: 'approved',
		selected: true,
		color: 'basic'
	},
	{
		name: 'Rejected',
		value: 'rejected',
		selected: true,
		color: 'warn'
	},
	{
		name: 'Pending Approval',
		value: 'pending',
		selected: true,
		color: 'primary'
	}]

interface Company {
	cmpnyAddr: string;
	country: string;
	cmpnyNm: string;
	apprvlStusCd: string;
	apprvlStusDttm: Date;
	updtDttm: Date;
	g2gCmpnyId: string;
	cntryCd: string;
	type: string;
	mra_status: string;
	origin: string;
	destination: string;	
	companyAddress : string;
	containers: string;
	monetaryValue: string; 
	tin: string;
	cmpnyObjId: number;
	hostCtryCmpnyIdTyp: string;
	hostCtryCmpnyId: string;
	aeoAccntNbr: string;
	aeoCertDt: Date;
	aeoRecertDt: Date;
	cmpnyUuid: string;
	midVal: number;
	isLtstInd: boolean;
	st: string;
	cmt: string;
	entyTyp: string;
	rolList: string;
	crteDttm: Date;
	usrAudit: string;
	isLatest: boolean;
};

export interface CheckSelected {
	name: string;
	IsoCd: string;
	selected: boolean;
	color: string;
	list?: CheckSelected[];
};

export interface searchRecord {
	companyName: string;
	companyG2GID: string;
	selectedCountries: string[];
	selectedMRAStatus: string[];
	status: string[];
	countries: string[];
}

export interface CompanyLocation {
	cmpnyAddr: string,
}

@Component({
  selector: 'app-company-full-view',
  templateUrl: './company-full-view.component.html',
  styleUrls: ['./company-full-view.component.scss']
})
export class CompanyFullViewComponent {
	MRAList: MRARequestStatusInput[] = MRAList;
	defaultSelectCountry: string[] = [];
	defaultSelectStatus: string[] = this.MRAList.map((mraStatus) => mraStatus.value)
	countriesForm: FormControl = new FormControl(this.defaultSelectCountry);

	statusesForm: FormControl = new FormControl(this.defaultSelectStatus);

	@Input() searchItems: searchRecord = {
		companyName: '',
		companyG2GID: '',
		selectedCountries: [],
		selectedMRAStatus: [],
		status: this.defaultSelectStatus,
		countries: this.defaultSelectCountry
	};

	stringDate: string = '';
	companyNameInput: string = '';
	tinInput: string = '';
	dateInput: Date = new Date(this.stringDate);
  
	hostCountry: string = "";
	companiesList: Company[] = [];

	
	companyName = '';  
	countryName = '';  
	dateRangeForm: FormGroup = new FormGroup({});

	constructor(private backendApi: BackendapiService, private route: ActivatedRoute, private fb: FormBuilder) {
		this.dateRangeForm = this.fb.group({
			dateRange: this.fb.group({
				start: [null],
				end: [null]
			})
		})
		this.statusesForm.valueChanges.subscribe((status) => {
			this.searchItems.status = status
		})
		this.countriesForm.valueChanges.subscribe((countries) => {
			this.searchItems.countries = countries
		})

	}
    
    

	getThisCountryNameFromISO(countryIso: string) {
		return getCountryNameFromISO(countryIso);
	}
	  allComplete: boolean = false;
	  updateAllComplete() {
		this.allComplete = this.mainCountries != null && this.mainCountries.every(t => t.selected);
	  }
	
	  someComplete(): boolean {
		if (this.mainCountries == null) {
		  return false;
		}
		return this.mainCountries.filter(t => t.selected).length > 0 && !this.allComplete;
	  }
	
	  setAll(selected: boolean) {
		this.allComplete = selected;
		if (this.mainCountries == null) {
		  return;
		}
		this.mainCountries.forEach(t => (t.selected = selected));
	  }

	  allMRAComplete: boolean = false; 
	
	
	  updateAllCompleteMRA() {
		this.allMRAComplete = this.MRAList != null && this.MRAList.every(t => t.selected);
	  }
	
	  someCompleteMRA(): boolean {
		if (this.MRAList == null) {
		  return false;
		}
		return this.MRAList.filter(t => t.selected).length > 0 && !this.allMRAComplete;
	  }
	
	  setAllMRA(selected: boolean) {
		this.allMRAComplete = selected;
		if (this.MRAList == null) {
		  return;
		}
		this.MRAList.forEach(t => (t.selected = selected));
	  }
	  
	  getSelectedCountries(): string | undefined { 
		return this.mainCountries?.filter(country=> country.selected ).map(country => country.name).join(', ');
	  }
	  
	  getSelectedCountriesIsoCd(): string | undefined { 
		return this.mainCountries?.filter(country=> country.selected ).map(country => country.IsoCd).join(', ');
	  }


	  isUSASelected(): boolean {
		if (this.mainCountries == null) {
		  return false;
		}
		if (this.mainCountries.filter(t => t.selected).length > 1 )
			return false;

		return this.mainCountries.some(t => { return (t.selected && t.name === 'United States') ? true : false }) ;
	  }

	  
	
	mainCountries: CheckSelected[] = [];

    ngOnInit() {
		this.backendApi.getAEOProfiles().subscribe((data: any) => { 
			console.log(data);
			this.mainCountries = [];
			let selected = 0;
			const aeoData = data?.aeoPrflList;
			if(aeoData) {
				aeoData.forEach( (element: any) => { 
					const initialLen = this.mainCountries?.length;
					this.mainCountries = this.mainCountries?.filter( (country: CheckSelected) => country.IsoCd !== element.ctryIsoCd); 
					if (initialLen !== this.mainCountries?.length)
						selected = 0;
					this.mainCountries?.push({
						name: getCountryNameFromISO(element.ctryIsoCd), 
						IsoCd: element.ctryIsoCd, 
						selected: selected ? false : true, 
						color: 'primary'
					});
					selected = 1; 
				});
			}	
			this.startSearch();
		});
    }

	pageTotalLength = 0;
	pageSize = 0;
	tablePageChange(event: any) {
		console.log(event);

	}

	startSearch() {
		console.log('startSearch');
		const filter = {
			searchRequest: {
				cmpny: {
					cmpnyNm: this.companyNameInput,
					tin: this.tinInput,
					aeoCertDt: this.dateInput
				},
				cmpnyLoc: {
					cntryCd: this.mainCountries?.filter(country=> country.selected ).map(country => country.IsoCd).join(',')
				}
			}
		};
		this.companiesList = [];
		this.pageTotalLength = 0; 

		this.backendApi.getCompaniesByFilter(filter).subscribe((data: any) => {
			if(data) {
				let companiesCount = 0;
				data.forEach( (element: any) => { 
					this.companiesList.push({						
						...element
					}); 
					companiesCount++;
				});
				this.pageTotalLength =  companiesCount;
			}		 
		});
	}

	getCompanyDetails(company: CompanyPayload): string {
		return `
		Company Object ID: ${company.cmpnyObjId}
		Host Country Company ID Type: ${company.hostCtryCmpnyIdTyp}
		`
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

	expandedCompanyinTable = '';
    selectCompaniesRow(company: string, tin: string) {
	  const rowId = `${company}-${tin}`
      if (this.expandedCompanyinTable === rowId) {
		this.expandedCompanyinTable = '';
        this.closeCompanyView();
      } else {
		this.expandedCompanyinTable = rowId;
	  }
      
    }
}

export type CompanyFilterTotalPayload = {
    searchRequest: {
        cmpny: CompanyPayload,
        cmpnyLoc: CompanyLocationPayload
    }
}

// which fields are the most usable?
export type CompanyOnMapView = {
    id : number, // unique ui identifier 
    hostCountry: string,//countryData.ctry,
    name: string, //countryData.cmpnyNm, 
    mra_status: {
        class: string, 
        value: string
    },
    companyAddress: string,//compAddr,
    containers: number, // shipment data
    monetaryValue: number, // shipment data 
    companyID : CountryCompanyID, // company id
    g2gID: string,
    lastUpdated: Date, // company information last updated
    aeoCertDate: Date,  // when aeo certed this 
    aeoLastCertDate: Date // when aeo was last certed
    tin: string,
    roleList : string [], 
    latlon: [any, any],
    company: Company
}
export type CountryCompanyID = {
    idType: string, 
    id: string
}
export type ChartEntry = {
    name: string, 
    value: number
}
export type Company = {
    cmpnyAddr: string,
    cmpnyObjId: number,
    hostCtryCmpnyIdTyp: string,
    hostCtryCmpnyId: string,
    aeoAccntNbr: string,
    tin: string,
    cmpnyNm: string,
    aeoCertDt: Date,
    aeoRecertDt: Date,
    cmpnyUuid: string,
    apprvlStusCd: string,
    apprvlStusDttm: Date,
    midVal: number,
    isLtstInd: boolean,
    st: string,
    cmt: string,
    entyTyp: string,
    g2gCmpnyId: string,
    rolList: string,
    cntryCd: string,
    crteDttm: Date,
    updtDttm: Date,
    usrAudit: string,
    isLatest: boolean
    cmpnyLocList: CompanyLocation[]
}

export type CompanyLocation = {
    cmpnyLocObjId: number,
    cmpnyObjId: number,
    isPrmryLoc: boolean,
    cmpnyAddr: string,
    addrLne1: string,
    addrLne2: string,
    stOrProvince: string,
    city: string,
    postalCd: string,
    cntryCd: string,
    rolList: string,
    midVal: number,
    latud: number,
    lngtud: number,
    crteDttm: Date,
    updtDttm: Date,
    cmpnyLocAltidList: CompanyLocationAltID []
}
export type CompanyLocationPayload = {
    cmpnyLocObjId?: number,
    cmpnyObjId?: number,
    isPrmryLoc?: boolean,
    cmpnyAddr?: string,
    addrLne1?: string,
    addrLne2?: string,
    stOrProvince?: string,
    city?: string,
    postalCd?: string,
    cntryCd?: string,
    rolList?: string,
    midVal?: number,
    latud?: string,
    lngtud?: string,
    crteDttm?: Date,
    updtDttm?: Date,
    cmpnyLocAltidList?: CompanyLocationAltIDPayload []
}
export type CompanyLocationAltID = {
    cmpnyLocAltidObjId: number,
    cmpnyLocObjId: number,
    cmpnyAltidTyp: string,
    cmpnyAltidNbr: string
}
export type CompanyLocationAltIDPayload = {
    cmpnyLocAltidObjId?: number,
    cmpnyLocObjId?: number,
    cmpnyAltidTyp?: string,
    cmpnyAltidNbr?: string
}
export type CompanyPayload = {
    cmpnyAddr?: string,
    cmpnyObjId?: number
    hostCtryCmpnyIdTyp?: string,
    hostCtryCmpnyId?: string,
    aeoAccntNbr?: string,
    tin?: string,
    cmpnyNm?: string,
    aeoCertDt?: Date,
    aeoRecertDt?: Date,
    cmpnyUuid?: string,
    apprvlStusCd?: string,
    apprvlStusDttm?: Date,
    midVal?: number,
    isLtstInd?: boolean,
    st?: string,
    cmt?: string,
    entyTyp?: string,
    g2gCmpnyId?: string,
    rolList?: string,
    cntryCd?: string,
    crteDttm?: Date,
    updtDttm?: Date,
    usrAudit?: string,
    isLatest?: boolean
}

export type MRARequestPayloadInput = {
	countries: string [], 
}

export type MRARequestStatusInput = {
	name: string, 
	value: string, 
	selected: boolean, 
	color: string
}
