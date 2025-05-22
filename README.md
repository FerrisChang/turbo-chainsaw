import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class CompanyFullViewComponent {
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
	companiesList: CompanyOnMapView[] = [];

	
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

	pageTotalLength = 0;
	pageSize = 15;
	currentPage = 0;
	pageSizeOptions = [15, 25, 50];

	tablePageChange(event: any) {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.updateDisplayData();
	}
	private updateDisplayData(event: any) {
		const startIndex = this.currentPage * this.pageSize;
		const endIndex = startIndex + this.pageSize;
		this.filteredMraRequests = this.mraRequests.slice(startIndex, endIndex);
	}
	searching: string = ""

	startSearch(filter: CompanyFilterTotalPayload) {
		console.log('Starting Company Search:', this.searchItems);
		console.log(filter);

		this.companiesList = [];
		this.pageTotalLength = 0; 
		this.searching = "Searching..."
		this.backendApi.getCompaniesByFilter(filter).subscribe((data: any) => {
			let companies : Company [] = data as Company []; 
			this.searching = "Loading Data..."	
			this.companiesList = companies.map((company: Company, index: number) => {
					let locationToUse = company.cmpnyLocList.find((location: CompanyLocation) => { return location.isPrmryLoc })
						|| company.cmpnyLocList[0] || {
						cmpnyAddr: 'No Primary Address Found'
					};
					let shipment = {
						containers: 0,
						monetaryValue: 0
					} // TO-DO Shipment Data

					return {
						id: index,
						hostCountry: company.cntryCd || '',//countryData.ctry,
						name: company.cmpnyNm || "", //countryData.cmpnyNm, 
						mra_status: {
							class: company.apprvlStusCd.toLowerCase().includes('approved') ? 'approved' :
								company.apprvlStusCd.toLowerCase().includes('rejected') ? 'rejected' :
									company.apprvlStusCd.toLowerCase().includes('pending') ? 'pending' : '',
							value: company.apprvlStusCd || ""
						},
						companyAddress: locationToUse.cmpnyAddr || "",//compAddr,
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
						latlon: [locationToUse.latud || 0, locationToUse.lngtud || 0], //await this.getLatLon(compAddr) ?? [0,0],
						company: company
					};
				})
				this.searching = "";
				this.pageTotalLength =  companies.length;
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

