
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Task, DB_Country } from '../dashboard-view/dashboard-view.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MRARequest, MRARequestCompanyTotalPayload, MRARequestPayload, MRARequestPayloadInput, MRARequestTotalResponse, MRARequestStatusInput, MRARequestTableOutput, SelectedCountryInput, MRARequestFilters, ApprovalOverrideInput, EditMRARequestInput, MRARequestCompanyLocation, MRARequestCompanyTableOutput } from './mra-request-types';
import { LoadingService } from '../services/loading.service';
import { UtilsService } from '../services/utils.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyMraDlgComponent } from '../company-mra-dlg/company-mra-dlg.component';
import { MraRequestModalComponent } from './dialog/mra-request-modal/mra-request-modal.component';
import { ViewLocationComponent } from '../utils/view-location/view-location.component';
import { CompanyLocation } from '../company-full-view/companies-types';
import { emptyMraRequestTableOutput, emptyMraRequestTotalResponse } from './mra-request-models';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export const MRAList = [
	{
		name: 'Approved',
		value: 'APPROVED',
		class: 'approved'
	},
	{
		name: 'Rejected',
		value: 'REJECTED',
		class: 'rejected'
	},
	{
		name: 'Pending Review',
		value: 'PENDING_REVIEW',
		class: 'pending'
	},
	{
		name: 'Suspended',
		value: 'SUSPENDED',
		class: 'rejected'
	}]
@Component({
	selector: 'app-mra-request-full-view',
	templateUrl: './mra-request-full-view.component.html',
	styleUrls: ['./mra-request-full-view.component.scss']
})
export class MRARequestFullViewComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	MRAList: MRARequestStatusInput[] = MRAList;
	defaultSelectStatus: string[] = this.MRAList.map((mraStatus) => mraStatus.value)

	defaultSelectCountry: string[] = [];
	statusesForm: FormControl = new FormControl(this.defaultSelectStatus);
	countriesForm: FormControl = new FormControl(this.defaultSelectCountry);
	@Input() searchItems: MRARequestFilters = {
		request_id: '',
		company: '',
		tin: '',
		g2g_id: '',
		countries: this.defaultSelectCountry,
		status: this.defaultSelectStatus,
	};
	//dateRangeForm: FormGroup = new FormGroup({});


	companyName = '';
	countryName = '';

	submissionDialog? : MatDialog; 

	constructor(private backendApi: BackendapiService, private route: ActivatedRoute, private fb: FormBuilder,
		private snackBar: MatSnackBar,
		private dialogModal: MatDialog, 
		private loader : LoadingService, private utils : UtilsService) {
		
		
		// this.dateRangeForm = this.fb.group({
		// 	dateRange: this.fb.group({
		// 		start: [null],
		// 		end: [null]
		// 	})
		// })
		// this.dateRangeForm.get('dateRange')?.valueChanges.subscribe(val => {
		// 	this.searchItems.date_updated = {
		// 		start: val.start,
		// 		end: val.end
		// 	}
		// })
	}

	getThisCountryNameFromISO(countryIso: string) {
		return this.utils.translateCodeToCountry(countryIso);
	}


	mainCountries: SelectedCountryInput[] = [];
	searching: string = ''; 

	ngOnInit() {
		this.statusesForm.valueChanges.subscribe((status) => {
			this.searchItems.status = status
			this.filterResults('status', status); 
		})
		this.countriesForm.valueChanges.subscribe((countries) => {
			this.searchItems.countries = countries
			this.filterResults('country', countries); 
		})
		this.loader.searchFilter.subscribe((filter)=>{
			if (filter!==null) {
				this.searching = 'Searching...'; // starts the searching modal
				this.doSearch(filter); // does the search filter, then it resets the search filter 
				this.loader.searchFilter.next(null); 
			}
		})

	}

	pageTotalLength = 0;
	pageSize = 15;
	pageSizeOptions = [15, 25, 50];
	currentPage = 0;
	_mraRequestsList: MRARequestTableOutput[] = [];

	ngAfterViewInit() {
		// Configure the paginator
		this.paginator.pageSize = this.pageSize;
		this.paginator.pageSizeOptions = this.pageSizeOptions;
		this.paginator.length = this.pageTotalLength;

		// Subscribe to page changes
		this.paginator.page.subscribe((event: PageEvent) => {
			this.onPageChange(event);
		});
	}

	onPageChange(event: PageEvent) {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.updateDisplayedRequests();
	}

	private updateDisplayedRequests() {
		const startIndex = this.currentPage * this.pageSize;
		const endIndex = startIndex + this.pageSize;
		this.filteredMraRequests = this._mraRequestsList.slice(startIndex, endIndex);
		console.log('Pagination state:', {
			currentPage: this.currentPage,
			pageSize: this.pageSize,
			totalItems: this.pageTotalLength,
			displayedItems: this.filteredMraRequests.length,
			allItems: this._mraRequestsList.length
		});
	}

	expandedRows : number [] = [];
	addressModal!: MatDialogRef<ViewLocationComponent>;
	mraRequestCompanies: MRARequestCompanyTableOutput [] = [];
	filteredMraRequestCompanies : MRARequestCompanyTableOutput [] = [] 
	mraRequestMap : Map<string, MRARequestTableOutput> = new Map(); // this is a unique map of the mra requests 
	filteredMraRequests : MRARequestTableOutput [] = []; 
	mraRequestHeaders: string[] = ['index', 'request_id', 'name', 'country', 'count', 'date_updated']
	// creates the initial mapping for MRA Requests
	createMRARequestMapping () {
		let mraRequestIndex = 1; 
		// sets all the mra requests
		for (let mraRequestCompany of this.mraRequestCompanies) {
			let mraRequest = this.mraRequestMap.get(mraRequestCompany.request_id); 
			if (!mraRequest) {
				this.mraRequestMap.set(mraRequestCompany.request_id, 
					{
						index: mraRequestIndex++, 
						request_id : mraRequestCompany.request_id,
						aeo_name: mraRequestCompany.request.mraRqst.aeoPgmNm, 
						company_count: mraRequestCompany.request.mraRqst.cmpnyCt || 1, 
						country: mraRequestCompany.request.mraRqst.cntryCd || mraRequestCompany.request.mraRqst.hostCtry, 
						date_updated: mraRequestCompany.request.mraRqst.updt_dttm, 
						request: mraRequestCompany.request.mraRqst,
						companies: [mraRequestCompany]
					}
				)
			}
			else {
				this.mraRequestMap.set(mraRequestCompany.request_id, 
					{
						...mraRequest, 
						companies: [...mraRequest.companies, mraRequestCompany]
					}
				)
			}
		}
		console.log("MRA Request Map: ", this.mraRequestMap);
	}
	// creates a list of mra requests based on the current filtered list
	createFilteredMraRequestList () {
		let filteredRequestIDs = this.filteredMraRequestCompanies.reduce((request_ids : string [], company : MRARequestCompanyTableOutput)=>{
			return request_ids.includes(company.request_id) ? request_ids : [...request_ids, company.request_id]
		}, [])
		this.filteredMraRequests = filteredRequestIDs.map((request_id)=>{
			return this.mraRequestMap.get(request_id) || emptyMraRequestTableOutput
		}) || []; 

	}
	createAddress(location : CompanyLocation ) {
		return this.utils.convertLocationConversion(location, 'company');
	}
	openAddressModal(company: MRARequestCompanyTableOutput, location: MRARequestCompanyLocation) {
	  this.addressModal = this.dialogModal.open(ViewLocationComponent, {
		width: '75%',
		height: '75%',
		data: {
		  name: company.company_name,
		  country: company.country,
		  address: this.utils.convertLocationConversion(location, 'mra-request-company'),
		  locationFound: false,
		  location: [0, 0]
		}
	  })
	}
	toggleEditMode (mraRequest: MRARequestCompanyTableOutput,  mode : string, locationIndex : number) {
		// rearranged to make them emppty
		switch (mode) {
			case 'edit': 
			// they will be binded to original
				mraRequest.edit.payload = {
					comment: '', 
					tin: mraRequest.request.mraRqstCmpny.tin, 
					name: mraRequest.company_name, 
					roleList: mraRequest.request.mraRqstCmpny.rolList
				}; 
				break;
			case 'override': 
				mraRequest.edit.payload = {
					status: '', 
					comment: ''
				}; 
				break;
			case '':
				mraRequest.edit.payload = undefined; 
				break; 
		}
		if (mode === 'location') {
			// will do seperate processing if the mode turns out to be location
		}
		else {
			mraRequest.edit.mode = mraRequest.edit.mode === mode ? '' : mode
			mraRequest.edit.error = ''; // clears at any error messages
			this.updateMainTable(mraRequest); // updates mra request to make sure everything is updated
		}
	}
	// this is the save editting process
	saveEdit (mraRequest : MRARequestCompanyTableOutput, locationIndex : number) {
		// for each mode, it will submit backend calls or do verification beforehand
		let payload = mraRequest.edit.payload
		let mode = mraRequest.edit.mode; 
		let errors : string [] = this.verifyPayload(mraRequest, payload, mode); 
		if (errors.length>0) {
			mraRequest.edit.error = errors.join("\n");
		}
		else {
			// once verification is complete, it could do backend calls
			switch (mraRequest.edit.mode) {
				case 'edit':
					let currentEditPayload : EditMRARequestInput = mraRequest.edit.payload as EditMRARequestInput
					this.backendApi.editCompany({
					}).subscribe({next: (res)=>{
						this.toggleEditMode(mraRequest, '', 0) // returns back to normal
					}, error: (err)=>{
						console.error("Error occured when saving: ", err)
					}})
					console.log("Payload for edit: ", payload) 
					break; 
				case 'override':
					let currentOverridePayload : ApprovalOverrideInput = mraRequest.edit.payload as ApprovalOverrideInput
					this.backendApi.overrideApprovalStatus({
						mraRqstId: mraRequest.request_id,
						tin: mraRequest.request.mraRqstCmpny.tin,
						apprvlStusCd: currentOverridePayload.status,
						cmt: currentOverridePayload.comment
					}).subscribe({next: (res : any)=>{
						mraRequest.status = this.MRAList.find((status)=>{
							return status.value === res.mraRqstCmpnyStatus.apprvlStusCd
						}) || mraRequest.status;
						this.snackBar.open(
							`Approval status sent successfully.`,
							'Close',
							{
							  duration: 5000,
							  panelClass: 'errorSnack',
							}
						  );
						this.toggleEditMode(mraRequest, '', 0) // returns back to normal
					}, error: (err)=>{
						console.error("Error occured when saving: ", err)
					}})
					break; 
				case 'location': 
					console.log("location information updated")
					break;
			}
		}
		// updates the main request table at the end
	}
	// makes sure that the requests are updated
	updateMainTable (mraRequest : MRARequestCompanyTableOutput) {
		// copies the edit to the main mra request list  
		let mraRequestFromTotalIndex = this.mraRequestCompanies.findIndex((request : MRARequestCompanyTableOutput)=>{
			return request.index === mraRequest.index
		}) 
		if (mraRequestFromTotalIndex >= 0) {
			this.mraRequestCompanies[mraRequestFromTotalIndex].edit = mraRequest.edit; 
		} 
	}
	// ensures that the payload is good 
	verifyPayload (original: MRARequestCompanyTableOutput, payload : any, mode : string) : string [] {
		let results : string [] = []
		console.log("Payload being screened")
		switch (mode) {
			case 'override':
				if (payload.comment.length===0) {
					results.push("Comments are currently empty. Changes require comments to be added.")
				}
				if (payload.status.length===0) {
					results.push("Status for override is currently empty. Status would need to be filled in to make a change.")
				}
				if (payload.status && original.status.value === payload.status) {
					results.push("Status for override is the same as the original. Status would need to be different to submit a change.")
				}
				break;  
			case 'edit':
				// check for empties
				if (payload.comment.length===0) {
					results.push("Comments are currently empty. Changes require comments to be added.")
				}
				if (payload.tin.length===0) {
					results.push("TIN input is currently empty. TIN would need to be filled.")
				}
				if (payload.name.length===0) {
					results.push("Company Name is currently empty. Company name would need to be filled.")
				}
				break; 
		}
		return results
	}
	toggleRow (index : number) {
		let searchIndex = this.expandedRows.indexOf(index); 
		if (searchIndex>=0) {
			this.expandedRows.splice(searchIndex, 1); 
		}
		else {
			this.expandedRows.push(index);
		}
	}
	rowExpanded (index : number) {
		return this.expandedRows.includes(index); 
	}
	filtersToLook : string [] = ['request_id', 'name', 'g2g_id', 'country', 'status', 'tin']
	doSearch(filter: MRARequestCompanyTotalPayload) {
		console.log("Search Items: ", this.searchItems);
		console.log(filter);
		this.backendApi.getMraRequestFromSearch(filter, {
			totalNumberOfElements: 0,
			totalPages: 0,
			currentPage: 0
		}).subscribe((mraRequests: MRARequestTotalResponse[]) => {
			this.searching = 'Loading Results...';
			let unique_countries: string[] = [];
			let mraRequestCompaniesTable: MRARequestCompanyTableOutput[] = mraRequests.map((mraRequest: MRARequestTotalResponse, index: number) => {
				let status = mraRequest.mraRqstCmpny.apprvlStusCd.includes("PENDING") ?
					"pending" : mraRequest.mraRqstCmpny.apprvlStusCd.includes("APPROVED") ?
						"approved" : "rejected";
				let country = mraRequest.mraRqst.cntryCd || mraRequest.mraRqst.hostCtry;
				if (!unique_countries.includes(country)) {
					unique_countries.push(country);
				}
				return {
					index: index + 1,
					request_id: mraRequest.mraRqst.mraRqstId,
					g2g_id: mraRequest.mraRqstCmpny.g2gCmpnyId,
					company_name: mraRequest.mraRqstCmpny.cmpnyNm,
					country: mraRequest.mraRqst.cntryCd || mraRequest.mraRqst.hostCtry,
					status: {
						class: status,
						value: mraRequest.mraRqstCmpny.apprvlStusCd
					},
					monetaryValue: 0,
					mainAddress: '',
					containers: 0,
					request: mraRequest,
					edit: {
						mode: '',
						error: '',
						locationEdit: []
					}
				}
			}) || [];
			this.mraRequestCompanies = mraRequestCompaniesTable;
			this.mainCountries = unique_countries.map((country: string) => {
				return {
					name: this.utils.translateCodeToCountry(country),
					isoCd: country,
				}
			});
			this.searching = '';
			this.createMRARequestMapping();
			this.filterResults('new_search', []);
		});
	}
	filterUpdate = (type : string, filterValue : string) => {
		// filters based on the results change of the filter 
		this.filterResults(type, filterValue);
	}
	modal!: MatDialogRef<CompanyMraDlgComponent>;
	openModal = (mraRequestCompany : MRARequestCompanyTableOutput) => {
		// checks if it's normal view mode
		if (mraRequestCompany.edit.mode=='') {
			this.modal = this.dialogModal.open(CompanyMraDlgComponent, {
				height: '90%', 
				width: '70%', 
				data: {
					mraRequestCompany: mraRequestCompany
				}
			})
		}
	}
	filterResults = (filter: string, currentValue: string | string[]) => {
		console.log("Filter type: ", filter, " Filter Value: ", currentValue);
		this.filteredMraRequestCompanies = filter !== 'new_search' ? this.mraRequestCompanies.filter((mraRequest) => {
			let allFilterConditions: boolean[] = [
				mraRequest.request_id.toLowerCase().includes(this.searchItems.request_id.toLowerCase()),
				mraRequest.company_name.toLowerCase().includes(this.searchItems.company.toLowerCase()),
				mraRequest.g2g_id.toLowerCase().includes(this.searchItems.g2g_id.toLowerCase()),
				this.searchItems.countries.includes(mraRequest.country) || this.searchItems.countries.length === 0,
				this.searchItems.status.includes(mraRequest.status.value) || this.searchItems.status.length === 0,
				mraRequest.request.mraRqstCmpny.tin.toLowerCase().includes(this.searchItems.tin.toLowerCase())
			];
			let value: any = currentValue;
			let filterIndex = this.filtersToLook.indexOf(filter);
			let condition = true;

			switch (filter) {
				case 'request_id':
					condition = mraRequest.request_id.toLowerCase().includes(value.toLowerCase());
					break;
				case 'name':
					condition = mraRequest.company_name.toLowerCase().includes(value.toLowerCase());
					break;
				case 'g2g_id':
					condition = mraRequest.g2g_id.toLowerCase().includes(value.toLowerCase());
					break;
				case 'country':
					condition = value.includes(mraRequest.country) || value.length === 0;
					break;
				case 'status':
					condition = value.includes(mraRequest.status.value) || value.length === 0;
					break;
				case 'tin':
					condition = mraRequest.request.mraRqstCmpny.tin.toLowerCase().includes(value.toLowerCase());
					break;
			}
			if (filterIndex > 0) {
				allFilterConditions[filterIndex] = condition;
			}
			return allFilterConditions.reduce((totalCondition, condition) => {
				return totalCondition && condition;
			}, true);
		}) : this.mraRequestCompanies;

		this.createFilteredMraRequestList();
		this._mraRequestsList = [...this.filteredMraRequests];
		this.pageTotalLength = this._mraRequestsList.length;
		this.currentPage = 0;
		this.updateDisplayedRequests();
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

 // Testing Area Change when needed

 	addStatusClassToTextField(status: string, requestId: string) {
		// Find the specific text field wrapper using the unique request ID
		// Using a more specific selector to ensure we only get the direct child wrapper
		const textFieldWrapper = document.querySelector(`#status-field-${requestId} .mat-mdc-text-field-wrapper.mdc-text-field.mdc-text-field--filled`);
		
		if (textFieldWrapper) {
			// Remove existing status classes from this specific field
			textFieldWrapper.classList.remove('approved', 'rejected', 'pending');

			// Add the new status class
			if (status) {
				const selectedStatus = this.MRAList.find(s => s.value === status);
				if (selectedStatus) {
					textFieldWrapper.classList.add(selectedStatus.class);
				}
			}
		}
	}

	getStatusFieldId(requestId: string): string {
		return `status-field-${requestId}`;
	}

	getStatusSelectId(requestId: string): string {
		return `status-select-${requestId}`;
	}
}
