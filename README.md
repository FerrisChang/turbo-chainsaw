
import { Component } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Task, DB_Country, } from '../dashboard-view/dashboard-view.component';
import { MainAdvanceSearchDlgComponent } from '../main-advance-search-dlg/main-advance-search-dlg.component';
import { AddUpdateCompaniesDlgComponent } from '../add-update-companies-dlg/add-update-companies-dlg.component';
import { QuickLinkDialogComponent } from './quick-link-dialog.component';
import { QuickLinksService, QuickLink } from './quick-links.service';
import { QuickLinkDialogModule } from './quick-link-dialog.module';
import {
	MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle,
} from '@angular/material/dialog';
import { searchRecord } from '../company-full-view/company-full-view.component';
import { NavigationEnd, Router } from '@angular/router';
import { MRAList } from '../mra-request-full-view/mra-request-full-view.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { MRARequestCompanyTotalPayload, Country, MRARequestStatusInput } from '../mra-request-full-view/mra-request-types';
import { LoadingService } from '../services/loading.service';
import { filter } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

//companies imports
import { CompanyFilterTotalPayload } from '../company-full-view/companies-types'
import { compileNgModule } from '@angular/compiler';
import { HotlistSearchEntry } from './main-view-types';
import { hotlistItems } from './main-view-models';
import { fadeCollapse } from '../utils/animations';

@Component({
	selector: 'app-main-view',
	animations: [
		fadeCollapse
	],
	templateUrl: './main-view.component.html',
	styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
	MRAList = MRAList;
	statusesForm = new FormControl();
	countriesForm = new FormControl();
	searchParameters: any = {
		request_id: '',
		company: '',
		tin: '',
		countries: [],
		status: [],
		updated_date: { start: null, end: null },
		approved_date: { start: null, end: null }
	};

	hotList: HotlistSearchEntry[] = hotlistItems;

	dialogRef: any;
	advanceSearchDialog!: MatDialogRef<MainAdvanceSearchDlgComponent>;
	dlgCloseStatus = '';
	isCollapsed = false;
	updatedDateRangeForm: FormGroup = new FormGroup({
		start: new FormControl<Date | null>(null),
		end: new FormControl<Date | null>(null)
	});;
	approvedDateRangeForm: FormGroup = new FormGroup({
		start: new FormControl<Date | null>(null),
		end: new FormControl<Date | null>(null)
	});;

	submitSearch(type: string) {
		// Handle quick link searches
		if (type.startsWith('quick-link-')) {
			const quickLinkId = type.replace('quick-link-', '');
			const quickLink = this.quickLinksService.getQuickLinks().find(link => link.id === quickLinkId);
			
			if (quickLink) {
				// Apply the saved search parameters
				this.searchParameters = { ...quickLink.searchParameters };
				
				// Update form controls to reflect the saved parameters
				if (this.searchParameters.status) {
					this.statusesForm.setValue(this.searchParameters.status);
				}
				if (this.searchParameters.countries) {
					this.countriesForm.setValue(this.searchParameters.countries);
				}
				if (this.searchParameters.updated_date) {
					this.updatedDateRangeForm.patchValue(this.searchParameters.updated_date);
				}
				if (this.searchParameters.approved_date) {
					this.approvedDateRangeForm.patchValue(this.searchParameters.approved_date);
				}
				
				// Navigate to companies page and start search
				this.startSearch('company');
				return;
			}
		}

		switch (type) {
			case 'company-1':
			case 'mra-request-1':
				// they're both about searching for the statuses
				let pending_statuses = MRAList.filter((status: MRARequestStatusInput) => {
					return status.class == 'pending'
				}).map((status: MRARequestStatusInput) => {
					return status.value
				}) || []
				this.searchParameters.status = pending_statuses
				this.statusesForm.setValue(pending_statuses)
				// going for dates that were last updated
				let today = new Date (); 
				let yesterday = new Date(today);
				yesterday.setDate(today.getDate() - 1); // binded to yesterday
				this.updatedDateRangeForm.get('start')?.setValue(yesterday);
				break;
			case 'company-2':
			case 'mra-request-2':
				// they're both about clearing the forms 
				this.clearSearch('');
				break;
		}
		// navigates according to type
		if (type.includes('company')) {
			this.startSearch('company')
		}
		else {
			this.startSearch('mra-request')
		}
	}
	openAdvanceSearchDialogDialog() {
		this.advanceSearchDialog = this.dialogModel.open(MainAdvanceSearchDlgComponent, {
			height: '600px',
			width: '800px',
			data: { countryName: 'None', closeStatus: this.dlgCloseStatus }
		});
		this.advanceSearchDialog.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
			console.log(this.dlgCloseStatus);
		});
	}
	mainCountries: Country[] = []
	currentRoute: string = '';
	constructor(public dialogModel: MatDialog,
		public dialog: MatDialog,
		private loading: LoadingService,
		private backendApi: BackendapiService, 
		private router: Router, 
		private fb: FormBuilder, 
		private utils: UtilsService,
		private quickLinksService: QuickLinksService) {

	}

	ngOnInit() {
		this.updatedDateRangeForm.valueChanges.subscribe((newDate) => {
			this.searchParameters.updated_date = newDate;
		})
		this.approvedDateRangeForm.valueChanges.subscribe((newDate) => {
			this.searchParameters.approved_date = newDate;
		})
		this.statusesForm.valueChanges.subscribe((status) => {
			this.searchParameters.status = status || []
		})
		this.countriesForm.valueChanges.subscribe((countries) => {
			this.searchParameters.countries = countries || []
		})
		
		// Load quick links to hotlist
		this.loadQuickLinksToHotlist();
		
		this.router.events
			.pipe(
				filter((event): event is NavigationEnd => event instanceof NavigationEnd)
			)
			.subscribe((route: NavigationEnd) => {
				console.log("route currently: ", route);
				this.currentRoute = route.url;
			})
		// waits until a token is found to embed
		this.backendApi.tokenFound.subscribe((found: boolean) => {
			if (found) {
				this.backendApi.getAEOProfiles().subscribe((data: any) => {
					const aeoData = data?.aeoPrflList;
					if (aeoData) {
						this.mainCountries = aeoData.map((country: any) => {
							return {
								name: this.utils.translateCodeToCountry(country.cntryCd),
								code: country.cntryCd
							}
						})
						let aeoProfiles = aeoData.map((aeoProfile: any) => {
							return {
								name: this.utils.translateCodeToCountry(aeoProfile.cntryCd),
								ctryIsoCd: aeoProfile.cntryCd,
								selected: false, //selected ? false : true,
								cmplncBasedPgm: aeoProfile.cmplncBasedPgm,
								securityBasedPgm: aeoProfile.securityBasedPgm,
								nbrOfMbrs: aeoProfile.nbrOfMbrs,
								pgmCd: aeoProfile.pgmNm,
								ctryAgncCd: aeoProfile.cntryAgncNm,
								yearMraPgmEst: aeoProfile.yearAeoPgmEst,
								mraPrtnrList: aeoProfile.mraPrtnrList,
								jwpPrtnrList: aeoProfile.jwpPrtnrList,
							}
						})
						this.loading.aeoProfiles.next(aeoProfiles);
						console.log(this.mainCountries);
						this.backendApi.availableCountries.next(this.mainCountries)
					}
				});
			}
		})



	}

	allComplete: boolean = false;

	addUpdateCompaniesDlg!: MatDialogRef<AddUpdateCompaniesDlgComponent>;
	quickLinkDialog!: MatDialogRef<QuickLinkDialogComponent>;
	openAddUpdateCompaniesDialog() {
		this.addUpdateCompaniesDlg = this.dialogModel.open(AddUpdateCompaniesDlgComponent, {
			height: '800px',
			width: '1200px',
			data: { companyName: '', countryName: '', closeStatus: this.dlgCloseStatus }
		});
		this.addUpdateCompaniesDlg.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
			console.log(this.dlgCloseStatus);
		});
	}

	addCompanySearchParameters() {
		// This method can be used to add additional search parameters
		// For now, it will open a dialog or expand the search form
		console.log('Adding company search parameters...');
		// You can implement additional logic here such as:
		// - Opening a dialog with more search options
		// - Expanding the search form with additional fields
		// - Adding dynamic search criteria
	}

	openQuickLinkDialog() {
		this.quickLinkDialog = this.dialogModel.open(QuickLinkDialogComponent, {
			height: '600px',
			width: '600px',
			data: { 
				searchName: '', 
				searchParameters: this.searchParameters 
			}
		});

		this.quickLinkDialog.afterClosed().subscribe((result: QuickLink | undefined) => {
			if (result) {
				console.log('Quick link saved:', result);
				this.quickLinksService.addQuickLink(result);
				// Refresh the hotlist to show the new quick link
				this.loadQuickLinksToHotlist();
			}
		});
	}

	addMRASearchParameters() {
		// This method can be used to add additional search parameters for MRA requests
		// For now, it will open a dialog or expand the search form
		console.log('Adding MRA request search parameters...');
		// You can implement additional logic here such as:
		// - Opening a dialog with more search options
		// - Expanding the search form with additional fields
		// - Adding dynamic search criteria
	}

	viewAddUpdateCompaniesDialog() {

	}

	clearSearch(searchMode: string) {

		this.searchParameters = {
			request_id: '',
			company: '',
			tin: '',
			countries: [],
			status: [],
			updated_date: { start: null, end: null }
		}
		// resetting the form
		this.statusesForm.reset();
		this.countriesForm.reset();
		this.updatedDateRangeForm.reset();
		this.approvedDateRangeForm.reset();
	}

	startSearch(searchType: string) {
		// navigates first before updating 
		if (searchType === 'mra-request' && this.router.url !== '/main/mra-requests') {
			this.router.navigate(['/main/mra-requests'])
		}
		else if (searchType === 'company' && this.router.url !== '/main/companies') {
			this.router.navigate(['/main/companies'])
		}
		//set search data
		//Company Name
		switch (searchType) {
			case 'mra-request':
				const filter: MRARequestCompanyTotalPayload = {
					mraRqstCmpny: {
						cmpnyNm: this.searchParameters.company,
						mraRqstId: this.searchParameters.request_id,
						tin: this.searchParameters.tin,
						updtDttm: this.searchParameters.updated_date.start ? this.utils.dateSearchInput.format(this.searchParameters.updated_date.start) : '', // probably the start of time 
						updtDttmEnd: this.searchParameters.updated_date.end ? this.utils.dateSearchInput.format(this.searchParameters.updated_date.end) : this.utils.dateSearchInput.format(new Date()),  // today's date
						apprvlStusDttm: this.searchParameters.approved_date.start ? this.utils.dateSearchInput.format(this.searchParameters.approved_date.start) : '', // probably the start of time 
						apprvlStusDttmEnd: this.searchParameters.approved_date.end ? this.utils.dateSearchInput.format(this.searchParameters.approved_date.end) : this.utils.dateSearchInput.format(new Date()),  // today's date
						apprvlStusCd: this.searchParameters.status.length > 0 && this.searchParameters.status.length !== 3 ? this.searchParameters.status[0] : '',
					},
					mraRqstCmpnyLoc: {
						cntryCd: this.searchParameters.countries.length > 0 ? this.searchParameters.countries[0] : undefined,
					}
				}
				this.loading.searchFilter.next(filter);
				break;
			case 'company':
				const company: CompanyFilterTotalPayload = {
					searchRequest: {
						cmpny: {
							cmpnyNm: this.searchParameters.company,
							tin: this.searchParameters.tin,
							updtDttm: this.searchParameters.updated_date.start ? this.utils.dateSearchInput.format(this.searchParameters.updated_date.start) : '', // probably the start of time 
							updtDttmEnd: this.searchParameters.updated_date.end ? this.utils.dateSearchInput.format(this.searchParameters.updated_date.end) : this.utils.dateSearchInput.format(new Date()),  // today's date
							apprvlStusDttm: this.searchParameters.approved_date.start ? this.utils.dateSearchInput.format(this.searchParameters.approved_date.start) : '', // probably the start of time 
							apprvlStusDttmEnd: this.searchParameters.approved_date.end ? this.utils.dateSearchInput.format(this.searchParameters.approved_date.end) : this.utils.dateSearchInput.format(new Date()),  // today's date
							apprvlStusCd: this.searchParameters.status.length > 0 && this.searchParameters.status.length !== 3 ? this.searchParameters.status[0] : '',
						},
						cmpnyLoc: {
							cntryCd: this.searchParameters.countries.length > 0 ? this.searchParameters.countries[0] : undefined,
						}
					}
				}
				this.loading.companiesFilter.next(company)
				break;
		}

	}

	loadQuickLinksToHotlist() {
		const companyQuickLinks = this.quickLinksService.getQuickLinksByType('company');
		
		// Convert quick links to hotlist format
		const quickLinkHotlist = companyQuickLinks.map(link => ({
			id: link.id,
			header: link.name,
			description: link.description,
			searches: [{
				search: `quick-link-${link.id}`,
				name: `Run "${link.name}" Search`
			}]
		}));

		// Combine with existing hotlist items
		this.hotList = [...hotlistItems, ...quickLinkHotlist];
	}

	removeQuickLink(id: string) {
		this.quickLinksService.removeQuickLink(id);
		this.loadQuickLinksToHotlist();
	}
}
