
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
    }

	ngAfterViewInit() {
		if (this.paginator) {
			// Configure paginator
			this.paginator.pageSize = this.pageSize;
			this.paginator.pageSizeOptions = this.pageSizeOptions;
			this.paginator.length = this.pageTotalLength;
			
			// Subscribe to page changes
			this.paginator.page.subscribe(event => {
				this.onPageChange(event);
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
		this.displayedCompanies = [...this._companiesList.slice(startIndex, endIndex)];
		
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

		const startIndex = this.currentPage * this.pageSize;
		const endIndex = Math.min(startIndex + this.pageSize, this._companiesList.length);
		
		// Create a new array reference to force change detection
		this.displayedCompanies = [...this._companiesList.slice(startIndex, endIndex)];
		
		// Update paginator if it exists
		if (this.paginator) {
			this.paginator.length = this._companiesList.length;
			this.paginator.pageSize = this.pageSize;
			this.paginator.pageIndex = this.currentPage;
		}
		
		console.log('Display Update:', {
			totalCompaniesInMemory: this._companiesList.length,
			displayedCompaniesCount: this.displayedCompanies.length,
			pageSize: this.pageSize,
			currentPage: this.currentPage,
			startIndex: startIndex,
			endIndex: endIndex,
			displayedCompanyNames: this.displayedCompanies.map(c => c.name)
		});
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

