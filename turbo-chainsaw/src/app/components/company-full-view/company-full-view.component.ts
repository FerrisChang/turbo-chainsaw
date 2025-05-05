import { Component, Input } from '@angular/core';
import { BackendapiService } from '../backendapi.service'; 
import { Task, DB_Country } from '../dashboard-view/dashboard-view.component';
import { getCountryNameFromISO } from '../companies-view/companies-view.component';
import { ActivatedRoute } from '@angular/router';
import { CompanyPayload } from './companies-type';

// Interfaces
interface Company {
	cmpnyObjId: number;
	hostCtryCmpnyIdTyp: string;
	hostCtryCmpnyId: string;
	aeoAccntNbr: string;
	tin: string;
	cmpnyNm: string;
	aeoCertDt: Date;
	aeoRecertDt: Date;
	cmpnyUuid: string;
	apprvlStusCd: string;
	apprvlStusDttm: Date;
	midVal: number;
	isLtstInd: boolean;
	st: string;
	cmt: string;
	entyTyp: string;
	g2gCmpnyId: string;
	rolList: string;
	cntryCd: string;
	crteDttm: Date;
	updtDttm: Date;
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

export interface SearchRecord {
	companyName: string;
	companyG2GID: string;
	selectedCountries: string[];
	selectedMRAStatus: string[];
}

@Component({
  selector: 'app-company-full-view',
  templateUrl: './company-full-view.component.html',
  styleUrls: ['./company-full-view.component.scss']
})
export class CompanyFullViewComponent {

	// Input properties
	@Input() searchItems: SearchRecord = {
		companyName: '',
		companyG2GID: '',
		selectedCountries: [],
		selectedMRAStatus: [],
	};

	// Form input properties
	companyNameInput: string = '';
	tinInput: string = '';
	dateInput: string = '';
 
	// Component state
	hostCountry: string = "";
	companiesList: Company[] = [];
	
	companyName = '';  
	countryName = '';  
	expandedCompanyinTable = '';
	pageTotalLength = 0;
	pageSize = 0;

	// Country selection state
	allComplete: boolean = false;
	mainCountries: CheckSelected = {
		name: 'All Countries',
		IsoCd: 'All',
		selected: false,
		color: 'primary',  
		list: [ ],
	  };

	// MRA status selection state
	allMRAComplete: boolean = false; 

	MRAList: CheckSelected = {
		name: 'All MRA Status',
		IsoCd: 'All',
		selected: false,
		color: 'primary',  
		list: [
			{
				name: 'Approved', 
				IsoCd: '', 
				selected: true, 
				color: 'basic'
			},
			{
				name: 'Rejected', 
				IsoCd: '', 
				selected: true, 
				color: 'warn'
			},
			{
				name: 'In Progress', 
				IsoCd: '', 
				selected: true, 
				color: 'primary'
			}
		],
	};

	constructor( private backendApi: BackendapiService, private  route: ActivatedRoute ) {  
	}
    
	getThisCountryNameFromISO(countryIso: string) {
		return getCountryNameFromISO(countryIso);
	}
  
	updateAllComplete() {
		this.allComplete = this.mainCountries.list != null && this.mainCountries.list.every(t => t.selected);
	}

	someComplete(): boolean {
		if (this.mainCountries.list == null) {
			return false;
		}
		return this.mainCountries.list.filter(t => t.selected).length > 0 && !this.allComplete;
	}

	setAll(selected: boolean) {
		this.allComplete = selected;
		if (this.mainCountries.list == null) {
			return;
		}
		this.mainCountries.list.forEach(t => (t.selected = selected));
	}

	updateAllCompleteMRA() {
		this.allMRAComplete = this.MRAList.list != null && this.MRAList.list.every(t => t.selected);
	}

	someCompleteMRA(): boolean {
		if (this.MRAList.list == null) {
			return false;
		}
		return this.MRAList.list.filter(t => t.selected).length > 0 && !this.allMRAComplete;
	}

	setAllMRA(selected: boolean) {
		this.allMRAComplete = selected;
		if (this.MRAList.list == null) {
			return;
		}
		this.MRAList.list.forEach(t => (t.selected = selected));
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

	ngOnInit()    { 
		let params = this.route.params.subscribe(params => {
			
			console.log(params);
		 });

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

	tablePageChange(event: any) {
		console.log(event);
	}

	startSearch() {
		console.log('startSearch');
		console.log(this.getSelectedCountriesIsoCd());

		const filter = {
			countries:  this.mainCountries.list?.filter(country=> country.selected ).map(country => country.IsoCd).join(',')   ,
			mra: this.MRAList.list?.filter(t => t.selected).map(t => t.name).join(','),
			name: this.companyNameInput,
			tin: this.tinInput,
			date: this.dateInput
		};

		console.log(filter);
		this.companiesList = [];
		
		this.pageTotalLength = 0; 

		this.backendApi.getCompaniesByFilter(filter).subscribe((data: any) => {
			console.log(data);
			if(data) {
				let companiesCount = 0;
				data.forEach( (element: any) => { 
					this.companiesList.push({						
							cmpnyObjId: element.cmpnyObjId,
							hostCtryCmpnyIdTyp: element.hostCtryCmpnyIdTyp,
							hostCtryCmpnyId: element.hostCtryCmpnyId,
							aeoAccntNbr: element.aeoAccntNbr,
							tin: element.tin,
							cmpnyNm: element.cmpnyNm,
							aeoCertDt: element.aeoCertDt,
							aeoRecertDt: element.aeoRecertDt,
							cmpnyUuid: element.cmpnyUuid,
							apprvlStusCd: element.apprvlStusCd,
							apprvlStusDttm: element.apprvlStusDttm,
							midVal: element.midVal,
							isLtstInd: element.isLtstInd,
							st: element.st,
							cmt: element.cmt,
							entyTyp: element.entyTyp,
							g2gCmpnyId: element.g2gCmpnyId,
							rolList: element.rolList,
							cntryCd: element.cntryCd,
							crteDttm: element.crteDttm,
							updtDttm: element.updtDttm,
							usrAudit: element.usrAudit,
							isLatest: element.isLatest
					}); 
					companiesCount++;
				});

				this.pageTotalLength =  companiesCount;
			}		 
		});
	}

	showCompanyView(countryCode: string, companyName: string) {
		this.closeCompanyView();
		this.companyName = companyName;
		this.countryName = countryCode;      
	}
	
	closeCompanyView() {
		this.companyName = '';
		this.countryName = '';
	}

	selectCompaniesRow(company: string, tin: string) {
		const rowId = `${company}-${tin}`;
		if (this.expandedCompanyinTable === rowId) {
			this.expandedCompanyinTable = '';
			this.closeCompanyView();
		} else {
			this.expandedCompanyinTable = rowId;
		}
	}

	getCompanyDetails(company: CompanyPayload): string {
		return `
			Company Object ID: ${company.cmpnyObjId}
			Host Country Company ID Type: ${company.hostCtryCmpnyIdTyp}
			Host Country Company ID: ${company.hostCtryCmpnyId}
			AEO Account Number: ${company.aeoAccntNbr}
			TIN: ${company.tin}
			Company Name: ${company.cmpnyNm}
			AEO Cert Date: ${company.aeoCertDt}
			AEO Recert Date: ${company.aeoRecertDt}
			Company UUID: ${company.cmpnyUuid}
			Approval Status Code: ${company.apprvlStusCd}
			Approval Status DateTime: ${company.apprvlStusDttm}
			Mid Value: ${company.midVal}
			Is Latest: ${company.isLtstInd}
			State: ${company.st}
			Comment: ${company.cmt}
			Entity Type: ${company.entyTyp}
			G2G Company ID: ${company.g2gCmpnyId}
			Role List: ${company.rolList}
			Country Code: ${company.cntryCd}
			Create DateTime: ${company.crteDttm}
			Update DateTime: ${company.updtDttm}
			User Audit: ${company.usrAudit}
		`;
	}

	displayCompanyInfo(company: CompanyPayload): void {
		const companyInfo = this.getCompanyDetails(company);
		// You can use this to display in a modal, tooltip, or any other UI element
		console.log(companyInfo);
	}
}
