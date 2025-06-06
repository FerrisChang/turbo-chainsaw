

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
              <div class="card-body px-0 pb-0">
                <app-companies-table class="companies-table" *ngIf="displayedCompanies.length>0"
                  [headers]="['index', 'name', 'country', 'g2g_id', 'company_id', 'status', 'status_updated']"
                  [filters]="['name', 'address', 'status', 'tin', 'g2g_id']"
                  [companies]="displayedCompanies">
                </app-companies-table>
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












import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { BackendapiService } from '../backendapi.service'; 
import { Task, DB_Country } from '../dashboard-view/dashboard-view.component';
import { ActivatedRoute } from '@angular/router';
import { Company, CompanyFilterTotalPayload, CompanyLocation, CompanyOnMapView } from './companies-types';
import { CompanyPayload } from './companies-types'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { DateRange } from '@angular/material/datepicker';
import { MRARequestStatusInput } from './companies-types';
import { UtilsService } from '../services/utils.service';
import { LoadingService } from '../services/loading.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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


@Component({
  selector: 'app-company-full-view',
  templateUrl: './company-full-view.component.html',
  styleUrls: ['./company-full-view.component.scss']
})
export class CompanyFullViewComponent implements OnInit, AfterViewInit, OnChanges {
	// controls all default status of the forms
	MRAList: MRARequestStatusInput[] = MRAList;
	defaultSelectCountry: string[] = [];
	defaultSelectStatus: string[] = this.MRAList.map((mraStatus) => mraStatus.value)
	countriesForm: FormControl = new FormControl(this.defaultSelectCountry);
	statusesForm: FormControl = new FormControl(this.defaultSelectStatus);
	dateRangeForm: FormGroup = new FormGroup({});

	@Input() searchItems: searchRecord = {
		companyName: '',
		companyG2GID: '',
		selectedCountries: [],
		selectedMRAStatus: [],
		status: this.defaultSelectStatus,
		countries: this.defaultSelectCountry
	};

	cmpnySearchParam = {
		cmpnyName: '',
		tin: '',
	}
  
	hostCountry: string = "";

	
	companyName = '';  
	countryName = '';  


	
	constructor(private backendApi: BackendapiService, 
		private utils: UtilsService,
		private route: ActivatedRoute, 
		private fb: FormBuilder,
		private loader: LoadingService,
	) {
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
		return this.utils.translateCodeToCountry(countryIso);
	}

	getSelectedCountries(): string | undefined { 
		return this.mainCountries.list?.filter(country=> country.selected ).map(country => country.name).join(', ');
	  }
	  
	getSelectedCountriesIsoCd(): string | undefined { 
		return this.mainCountries.list?.filter(country=> country.selected ).map(country => country.IsoCd).join(', ');
	  }


	  isUSASelected(): boolean {
		if (this.mainCountries.list == null) {
		  return false;
		}
		if (this.mainCountries.list.filter(t => t.selected).length > 1 )
			return false;

		return this.mainCountries.list.some(t => { return (t.selected && t.name === 'United States') ? true : false }) ;
	  }

	  
	
	mainCountries: CheckSelected = {		
		name: 'All Countries',
		IsoCd: 'All',
		selected: false,
		color: 'primary',  
		list: [ ]
	}
	  ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageTotalLength = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions = [15, 25, 50];
  displayedCompanies: CompanyOnMapView[] = [];
  private _companiesList: CompanyOnMapView[] = [];

  get companiesList(): CompanyOnMapView[] {
    return this._companiesList;
  }

  set companiesList(value: CompanyOnMapView[]) {
    this._companiesList = value;
    this.pageTotalLength = value.length;
    this.updateDisplayedCompanies();
  }

  ngOnInit() {
		this.backendApi.getAEOProfiles().subscribe((data: any) => { 
			console.log(data);
			this.mainCountries.list = [];
			let selected = 0;
			const aeoData = data?.aeoPrflList;
			if(aeoData) {
				aeoData.forEach( (element: any) => { 
					const initialLen = this.mainCountries.list?.length;
					this.mainCountries.list = this.mainCountries.list?.filter( (country: CheckSelected) => country.IsoCd !== element.ctryIsoCd); 
					if (initialLen !== this.mainCountries.list?.length)
						selected = 0;
					this.mainCountries.list?.push({
						name: this.utils.translateCodeToCountry(element.ctryIsoCd), 
						IsoCd: element.ctryIsoCd, 
						selected: selected ? false : true, 
						color: 'primary'
					});
					selected = 1; 
				});
			}	
		this.loader.companiesFilter.subscribe((companyFilter) => {
			if (companyFilter!==null) {
				this.searching = 'Searching...';
				this.startSearch(companyFilter);
				this.loader.companiesFilter.next(null);
				}
			})
		});

    // Watch for changes in all filters
    this.statusesForm.valueChanges.subscribe(() => {
      this.currentPage = 0; // Reset to first page when filter changes
      this.updateDisplayedCompanies();
    });

    this.countriesForm.valueChanges.subscribe(() => {
      this.currentPage = 0;
      this.updateDisplayedCompanies();
    });

    this.dateRangeForm.valueChanges.subscribe(() => {
      this.currentPage = 0;
      this.updateDisplayedCompanies();
    });

    // Watch for changes in the company name and TIN
    this.cmpnySearchParam = new Proxy(this.cmpnySearchParam, {
      set: (target, prop, value) => {
        target[prop] = value;
        this.currentPage = 0;
        this.updateDisplayedCompanies();
        return true;
      }
    });
  }

	ngAfterViewInit() {
		if (this.paginator) {
			// Configure paginator
			this.paginator.pageSize = this.pageSize;
			this.paginator.pageSizeOptions = this.pageSizeOptions;
			this.paginator.length = this.pageTotalLength;
			
			// Subscribe to page changes
			this.paginator.page.subscribe((event: PageEvent) => {
				console.log('Paginator event received:', event);
				this.onPageChange(event);
				// Force change detection
				this.displayedCompanies = [...this.displayedCompanies];
			});
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['displayedCompanies']) {
			console.log('Displayed companies changed:', this.displayedCompanies);
		}
	}

	onPageChange(event: PageEvent) {
		console.log('Page change event:', event);
		this.pageSize = event.pageSize;
		this.currentPage = event.pageIndex;
		
		// Update displayed companies based on new page size
		const startIndex = this.currentPage * this.pageSize;
		const endIndex = Math.min(startIndex + this.pageSize, this._companiesList.length);
		
		// Create a new array reference to force change detection
		const newDisplayedCompanies = this._companiesList.slice(startIndex, endIndex);
		this.displayedCompanies = [...newDisplayedCompanies];
		
		console.log('Pagination State:', {
			totalCompaniesInMemory: this._companiesList.length,
			displayedCompaniesCount: this.displayedCompanies.length,
			pageSize: this.pageSize,
			currentPage: this.currentPage,
			startIndex: startIndex,
			endIndex: endIndex,
			displayedCompanyNames: this.displayedCompanies.map(c => c.name),
			allCompanyNames: this._companiesList.map(c => c.name)
		});
	}

	private updateDisplayedCompanies() {
		if (!this._companiesList || this._companiesList.length === 0) {
			this.displayedCompanies = [];
			return;
		}

		// Apply filters from the top-level filters
		let filteredCompanies = this._companiesList.filter(company => {
			const nameMatch = !this.cmpnySearchParam.cmpnyName || 
				company.name.toLowerCase().includes(this.cmpnySearchParam.cmpnyName.toLowerCase());
			
			const tinMatch = !this.cmpnySearchParam.tin || 
				company.tin.toLowerCase().includes(this.cmpnySearchParam.tin.toLowerCase());
			
			const statusMatch = this.statusesForm.value.length === 0 || 
				this.statusesForm.value.some(status => 
					company.mra_status.value.toLowerCase() === status.toLowerCase()
				);
			
			const countryMatch = this.countriesForm.value.length === 0 || 
				this.countriesForm.value.includes(company.hostCountry);

			const dateRange = this.dateRangeForm.get('dateRange')?.value;
			const dateMatch = !dateRange?.start || !dateRange?.end || 
				(company.lastUpdated && new Date(company.lastUpdated) >= dateRange.start && 
				 new Date(company.lastUpdated) <= dateRange.end);

			return nameMatch && tinMatch && statusMatch && countryMatch && dateMatch;
		});

		// Update pagination
		this.pageTotalLength = filteredCompanies.length;
		
		// Get the current page of results
		const startIndex = this.currentPage * this.pageSize;
		const endIndex = Math.min(startIndex + this.pageSize, filteredCompanies.length);
		this.displayedCompanies = filteredCompanies.slice(startIndex, endIndex);

		// Update paginator if it exists
		if (this.paginator) {
			this.paginator.length = filteredCompanies.length;
			this.paginator.pageSize = this.pageSize;
			this.paginator.pageIndex = this.currentPage;
		}

		// Force change detection
		this.displayedCompanies = [...this.displayedCompanies];
	}

	searching: string = ""

	startSearch(filter: CompanyFilterTotalPayload) {
		console.log('Starting Company Search:', this.searchItems);
		console.log(filter);

		// Reset pagination state
		this._companiesList = [];
		this.displayedCompanies = [];
		this.pageTotalLength = 0;
		this.currentPage = 0;
		this.searching = "Searching..."
		
		this.backendApi.getCompaniesByFilter(filter).subscribe((data: any) => {
			let companies: Company[] = data as Company[]; 
			this.searching = "Loading Data..."	
			
			// Map companies to the required format
			this._companiesList = companies.map((company: Company, index: number) => {
				let locationToUse = company.cmpnyLocList.find((location: CompanyLocation) => { return location.isPrmryLoc })
					|| company.cmpnyLocList[0] || {
					cmpnyAddr: 'No Primary Address Found'
				};
				let shipment = {
					containers: 0,
					monetaryValue: 0
				}

				return {
					id: index,
					hostCountry: company.cntryCd || '',
					name: company.cmpnyNm || "",
					mra_status: {
						class: company.apprvlStusCd.toLowerCase().includes('approved') ? 'approved' :
							company.apprvlStusCd.toLowerCase().includes('rejected') ? 'rejected' :
								company.apprvlStusCd.toLowerCase().includes('pending') ? 'pending' : '',
						value: company.apprvlStusCd || ""
					},
					companyAddress: locationToUse.cmpnyAddr || "",
					address: this.utils.convertLocationConversion(locationToUse, 'company'),
					containers: shipment.containers || 0,
					monetaryValue: shipment.monetaryValue || 0,
					companyID: {
						idType: company.hostCtryCmpnyIdTyp || "",
						id: company.hostCtryCmpnyId || ""
					},
					g2gID: company.g2gCmpnyId || "",
					roleList: company.rolList?.split(",") || [],
					lastUpdated: company.updtDttm,
					aeoCertDate: company.aeoCertDt,
					aeoLastCertDate: company.aeoRecertDt,
					tin: company.tin || "",
					latlon: [locationToUse.latud || 0, locationToUse.lngtud || 0],
					company: company
				};
			});
			
			this.searching = "";
			this.pageTotalLength = this._companiesList.length;
			
			console.log('Initial Data Load:', {
				totalCompaniesInMemory: this._companiesList.length,
				allCompanyNames: this._companiesList.map(c => c.name),
				pageSize: this.pageSize,
				currentPage: this.currentPage
			});
			
			// Update paginator
			if (this.paginator) {
				this.paginator.length = this.pageTotalLength;
				this.paginator.pageIndex = 0;
				this.paginator.pageSize = this.pageSize;
				this.paginator.pageSizeOptions = this.pageSizeOptions;
			}
			
			// Update displayed companies with initial page
			this.updateDisplayedCompanies();
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


