
import { Component, Input } from '@angular/core';
import { BackendapiService } from '../backendapi.service'; 
import { Task, DB_Country } from '../dashboard-view/dashboard-view.component';
import { getCountryNameFromISO } from '../companies-view/companies-view.component';
import { ActivatedRoute } from '@angular/router';



interface Company {
	country: string;
	name: string;
	type: string;
	mra_status: string;
	origin: string;
	destination: string;	
	companyAddress : string;
	containers: string;
	monetaryValue: string; 
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
	selectedMRAStatus: string[]
}

@Component({
  selector: 'app-company-full-view',
  templateUrl: './company-full-view.component.html',
  styleUrls: ['./company-full-view.component.scss']
})
export class CompanyFullViewComponent {

	@Input() searchItems:searchRecord = {
		companyName: '',
		companyG2GID: '',
		selectedCountries: [],
		selectedMRAStatus: [],
	};

 
  
	hostCountry: string = "";
	companiesList: Company[] = [];
	
	companyName = '';  
	countryName = '';  

  	constructor( private backendApi: BackendapiService, private  route: ActivatedRoute ) {  
    }
    
    

	getThisCountryNameFromISO(countryIso: string) {
		return getCountryNameFromISO(countryIso);
	}
  

	
	
	  allComplete: boolean = false;
	
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

	  
	
	mainCountries: CheckSelected = {
		name: 'All Countries',
		IsoCd: 'All',
		selected: false,
		color: 'primary',  
		list: [ ],
	  };

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

	pageTotalLength = 0;
	pageSize = 0;
	tablePageChange(event: any) {
		console.log(event);

	}

	startSearch() {
		console.log('startSearch');
		console.log(this.getSelectedCountriesIsoCd());

		//send a REST API with selected countries and other user entered values to get the list of companies matching the criteria
		
		const filter = {
			countries:  this.mainCountries.list?.filter(country=> country.selected ).map(country => country.IsoCd).join(',')   ,
			mra: this.MRAList.list?.filter(t => t.selected).map(t => t.name).join(','),
			name: this.searchItems.companyName,
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
							country: element.hostCountry,
							name: element.name,
							type: element.type,
							mra_status: element.mra_status, 
							companyAddress : element.companyAddress,//compAddr,
							containers: element.containers,
							monetaryValue: element.monetary_value,
							origin: element.origin,
							destination: element.destination,
					}); 
					companiesCount++;
				});

				this.pageTotalLength =  companiesCount;
			}		 
		});
		
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
    selectCompaniesRow(company: string) {
      console.log(company);
      if (this.expandedCompanyinTable === company) {
        this.expandedCompanyinTable = '';
        this.closeCompanyView();
      }
      else
        this.expandedCompanyinTable = company;
    }
}
