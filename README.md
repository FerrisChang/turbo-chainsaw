
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Task, DB_Country } from '../dashboard-view/dashboard-view.component';
import { getCountryNameFromISO } from '../companies-view/companies-view.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MRARequest, MRARequestCompanyTotalPayload, MRARequestPayload, MRARequestPayloadInput, MRARequestTotalResponse, MRARequestStatusInput, MRARequestTableOutput, SelectedCountryInput, MRARequestFilters, ApprovalOverrideInput, EditMRARequestInput, MRARequestCompanyLocation } from './mra-request-types';
import { LoadingService } from '../services/loading.service';
import { UtilsService } from '../services/utils.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyMraDlgComponent } from '../company-mra-dlg/company-mra-dlg.component';
import { MraRequestModalComponent } from './dialog/mra-request-modal/mra-request-modal.component';
import { ViewLocationComponent } from '../utils/view-location/view-location.component';
import { CompanyLocation } from '../company-full-view/companies-types';
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
		name: 'Pending Approval',
		value: 'PENDING_APPROVAL',
		class: 'pending'
	},
	{
		name: 'Suspended',
		value: 'SUSPENDED',
		class: 'pending'
	}]
@Component({
	selector: 'app-mra-request-full-view',
	templateUrl: './mra-request-full-view.component.html',
	styleUrls: ['./mra-request-full-view.component.scss']
})
export class MRARequestFullViewComponent implements AfterViewInit {
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
	mraRequests: MRARequestTableOutput [] = [];
	filteredMraRequests : MRARequestTableOutput [] = [] 

	companyName = '';
	countryName = '';

	submissionDialog? : MatDialog; 

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	pageTotalLength = 0;
	pageSize = 15;
	currentPage = 0;
	pageSizeOptions = [15, 25, 50];
	private _mraRequestsList: MRARequestTableOutput[] = [];

	get mraRequestsList(): MRARequestTableOutput[] {
		return this._mraRequestsList;
	}

	set mraRequestsList(value: MRARequestTableOutput[]) {
		this._mraRequestsList = value;
		this.pageTotalLength = value.length;
		this.updateDisplayedRequests();
	}

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
		return getCountryNameFromISO(countryIso);
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
			});
		}
	}

	onPageChange(event: PageEvent) {
		console.log('Page change event:', event);
		this.pageSize = event.pageSize;
		this.currentPage = event.pageIndex;
		
		// Update displayed requests based on new page size
		const startIndex = this.currentPage * this.pageSize;
		const endIndex = Math.min(startIndex + this.pageSize, this._mraRequestsList.length);
		
		// Create a new array reference to force change detection
		const newDisplayedRequests = this._mraRequestsList.slice(startIndex, endIndex);
		this.filteredMraRequests = [...newDisplayedRequests];
		
		console.log('Pagination State:', {
			totalRequestsInMemory: this._mraRequestsList.length,
			displayedRequestsCount: this.filteredMraRequests.length,
			pageSize: this.pageSize,
			currentPage: this.currentPage,
			startIndex: startIndex,
			endIndex: endIndex
		});
	}

	private updateDisplayedRequests() {
		if (!this._mraRequestsList || this._mraRequestsList.length === 0) {
			this.filteredMraRequests = [];
			return;
		}

		const startIndex = this.currentPage * this.pageSize;
		const endIndex = Math.min(startIndex + this.pageSize, this._mraRequestsList.length);
		
		// Create a new array reference to force change detection
		const newDisplayedRequests = this._mraRequestsList.slice(startIndex, endIndex);
		this.filteredMraRequests = [...newDisplayedRequests];
		
		// Update paginator if it exists
		if (this.paginator) {
			this.paginator.length = this._mraRequestsList.length;
			this.paginator.pageSize = this.pageSize;
			this.paginator.pageIndex = this.currentPage;
		}
		
		console.log('Display Update:', {
			totalRequestsInMemory: this._mraRequestsList.length,
			displayedRequestsCount: this.filteredMraRequests.length,
			pageSize: this.pageSize,
			currentPage: this.currentPage,
			startIndex: startIndex,
			endIndex: endIndex
		});
	}

	pageTotalLength = 0;
	pageSize = 0;
	tablePageChange(event: any) {
		console.log(event);
	}
	expandedRows : number [] = [];
	addressModal!: MatDialogRef<ViewLocationComponent>;
	createAddress(location : CompanyLocation ) {
		return this.utils.convertLocationConversion(location, 'company');
	}
	openAddressModal(company: MRARequestTableOutput, location: MRARequestCompanyLocation) {
	  this.addressModal = this.dialogModal.open(ViewLocationComponent, {
		width: '50%',
		height: '50%',
		data: {
		  name: company.company_name,
		  country: company.country,
		  address: this.utils.convertLocationConversion(location, 'mra-request-company'),
		  locationFound: false,
		  location: [0, 0]
		}
	  })
	}
	toggleEditMode (mraRequest: MRARequestTableOutput,  mode : string, locationIndex : number) {
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
	saveEdit (mraRequest : MRARequestTableOutput, locationIndex : number) {
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
	updateMainTable (mraRequest : MRARequestTableOutput) {
		// copies the edit to the main mra request list  
		let mraRequestFromTotalIndex = this.mraRequests.findIndex((request : MRARequestTableOutput)=>{
			return request.index === mraRequest.index
		}) 
		if (mraRequestFromTotalIndex >= 0) {
			this.mraRequests[mraRequestFromTotalIndex].edit = mraRequest.edit; 
		} 
	}
	// ensures that the payload is good 
	verifyPayload (original: MRARequestTableOutput, payload : any, mode : string) : string [] {
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
	mraRequestHeaders: string[] = ['index', 'request_id', 'name', 'g2g_id', 'country', 'status', 'date_updated']
	filtersToLook : string [] = ['request_id', 'name', 'g2g_id', 'country', 'status', 'tin']
	doSearch(filter: MRARequestCompanyTotalPayload) {
		console.log('Starting MRA Request Search:', this.searchItems);
		console.log(filter);

		// Reset pagination state
		this._mraRequestsList = [];
		this.filteredMraRequests = [];
		this.pageTotalLength = 0;
		this.currentPage = 0;
		this.searching = "Searching..."
		
		this.backendApi.getMRARequestsByFilter(filter).subscribe((data: any) => {
			let requests: MRARequest[] = data as MRARequest[]; 
			this.searching = "Loading Data..."	
			
			// Map requests to the required format
			this._mraRequestsList = requests.map((request: MRARequest, index: number) => {
				let status = request.mraRqstCmpny.apprvlStusCd.includes("PENDING") ?
					"pending" : request.mraRqstCmpny.apprvlStusCd.includes("APPROVED") ?
						"approved" : "rejected";
				// missing g2g_ui and date_updated for now, to be figured out later 
				let country = request.mraRqst.cntryCd || request.mraRqst.hostCtry;
				return {
					index: index + 1,
					request_id: request.mraRqst.mraRqstId,
					g2g_id: request.mraRqstCmpny.g2gCmpnyId,
					company_name: request.mraRqstCmpny.cmpnyNm,
					country: request.mraRqst.cntryCd || request.mraRqst.hostCtry,
					status: {
						class: status,
						value: request.mraRqstCmpny.apprvlStusCd
					},
					monetaryValue: 0, 
					mainAddress: '', 
					containers: 0,
					request: request, 
					edit: {
						mode: '', 
						error: '',
						locationEdit: []
					}
				}
			});
			
			this.searching = "";
			this.pageTotalLength = this._mraRequestsList.length;
			
			console.log('Initial Data Load:', {
				totalRequestsInMemory: this._mraRequestsList.length,
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
			
			// Update displayed requests with initial page
			this.updateDisplayedRequests();
		});
	}
	filterUpdate = (type : string, filterValue : string) => {
		// filters based on the results change of the filter 
		this.filterResults(type, filterValue);
	}
	modal!: MatDialogRef<CompanyMraDlgComponent>;
	openModal = (mraRequestCompany : MRARequestTableOutput) => {
		// checks if it's normal view mode
		if (mraRequestCompany.edit.mode=='') {
			this.modal = this.dialogModal.open(CompanyMraDlgComponent, {
				height: '70%', 
				width: '70%', 
				data: {
					mraRequestCompany: mraRequestCompany
				}
			})
		}
	}
	filterResults = (filter : string, currentValue : string | string []) => {
		// will only filter if it turns out to be a unique search
		console.log("Filter type: ", filter, " Filter Value: ", currentValue);
		this.filteredMraRequests = filter!== 'new_search' ? this.mraRequests.filter((mraRequest)=>{
			let allFilterConditions : boolean [] = [
				mraRequest.request_id.toLowerCase().includes(this.searchItems.request_id.toLowerCase()),
				mraRequest.company_name.toLowerCase().includes(this.searchItems.company.toLowerCase()), 
				mraRequest.g2g_id.toLowerCase().includes(this.searchItems.g2g_id.toLowerCase()), // g2g ui 
				this.searchItems.countries.includes(mraRequest.country) || this.searchItems.countries.length === 0,
				// Updated status condition to show all items when no status is selected
				this.searchItems.status.length === 0 || this.searchItems.status.some(selectedStatus => mraRequest.status.value === selectedStatus),
				mraRequest.request.mraRqstCmpny.tin.toLowerCase().includes(this.searchItems.tin.toLowerCase()) // tin number 
			]
			let value : any = currentValue; 
			let filterIndex = this.mraRequestHeaders.indexOf(filter);
			let condition = true; 
			
			// depending on the filter type, it will use different conditions to filter out the value
			switch (filter) {
				case 'request_id':
					condition = mraRequest.request_id.toLowerCase().includes(value.toLowerCase())
					break; 
				case 'name': 
					condition = mraRequest.company_name.toLowerCase().includes(value.toLowerCase())
					break; 
				case 'g2g_id': 
					condition = mraRequest.g2g_id.toLowerCase().includes(value.toLowerCase());
					break; 
				case 'country': 
					// makes a unique condition, if countries is empty, it will accept anything
					condition = value.includes(mraRequest.country) || value.length === 0
					break; 
				case 'status': 
					// Updated to handle both multiple selections and empty selections
					condition = Array.isArray(value) ? 
						(value.length === 0 || value.some(selectedStatus => mraRequest.status.value === selectedStatus)) :
						(value.length === 0 || mraRequest.status.value === value);
					break; 
				case 'tin': 
					condition = mraRequest.request.mraRqstCmpny.tin.toLowerCase().includes(value.toLowerCase())
					break; 
			}
			if (filterIndex>0) {
				allFilterConditions[filterIndex] = condition;
			}
			// accumulates all of the conditions put together 
			return allFilterConditions.reduce((totalCondition, condition)=> {
				return totalCondition && condition
			}, true);
		}) : this.mraRequests; 
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

	addStatusClassToTextField(status: string, requestId: string) {
		// Find the specific text field wrapper using the unique request ID
		// Using a more flexible selector to find the text field wrapper within our specific form field
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
