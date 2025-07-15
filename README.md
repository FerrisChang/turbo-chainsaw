import { Component, PipeTransform, ViewChild, ViewContainerRef } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Task, DB_Country } from '../dashboard-view/dashboard-view.component';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator'; // import leaflet-arc here
import { ThemePalette } from '@angular/material/core';
import { countryCodes, countryGeoCoords } from '../data/countrycodes';
import { CompanyMraDlgComponent } from '../company-mra-dlg/company-mra-dlg.component';
import { CountryMraDlgComponent } from '../country-mra-dlg/country-mra-dlg.component';
import {
	MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle,
} from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { getLocaleDirection } from '@angular/common';
import { JsonViewerComponent } from '../json-viewer/json-viewer.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ChartEntry, Company, CompanyLocation, CompanyOnMapView } from '../company-full-view/companies-types';
import { UtilsService } from '../services/utils.service';
import { LoggingService } from '../services/logging.service';
import { AeoProfile, JWPPartner } from './aeo-profile-types';
import { LoadingService } from '../services/loading.service';
import { MRADataService } from '../services/mra-data.service';





const COMPANIES: CompanyOnMapView[] = [
];

export const mraCounts = [
	{
		"name": "Approved",
		"value": 0
	},
	{
		"name": "In Progress",
		"value": 0
	},
	{
		"name": "Rejected",
		"value": 0
	}
];

export const multi = [
	{
		"name": "Germany",
		"series": [
			{
				"name": "2010",
				"value": 7300000
			},
			{
				"name": "2011",
				"value": 8940000
			}
		]
	},

	{
		"name": "USA",
		"series": [
			{
				"name": "2010",
				"value": 7870000
			},
			{
				"name": "2011",
				"value": 8270000
			}
		]
	},

	{
		"name": "France",
		"series": [
			{
				"name": "2010",
				"value": 5000002
			},
			{
				"name": "2011",
				"value": 5800000
			}
		]
	}
];



export interface GEO_Coordinate {
	lat: number;
	lon: number;
}


@Component({
	selector: 'app-companies-view',
	templateUrl: './companies-view.component.html',
	styleUrls: ['./companies-view.component.scss']
})

export class CompaniesViewComponent {

	constructor(private backendApi: BackendapiService,
		public dialogModel: MatDialog,
		private loading: LoadingService,
		private utils: UtilsService,
		private logger: LoggingService,
		private mraDataService: MRADataService
	)
		 {
		Object.assign(this, { mraCounts });
	}
	countriesForm: FormControl = new FormControl('');
	dateRangeForm: FormControl = new FormControl({
		
	});
	currentSelectedCountry: string = '';
	hostCountryIso: string = 'US';
	hostCountry: string = this.utils.translateCodeToCountry(this.hostCountryIso);

	mraDialog!: MatDialogRef<CompanyMraDlgComponent> | MatDialogRef<JsonViewerComponent>;
	countryDialog!: MatDialogRef<CountryMraDlgComponent>;
	dialogConfig!: MatDialogConfig;
	dlgCloseStatus = '';

	openDialog(countryName: string) {
		this.countryDialog = this.dialogModel.open(CountryMraDlgComponent, {
			height: '70%',
			width: '70%',
			data: { countryName: this.utils.translateCodeToCountry(countryName), closeStatus: this.dlgCloseStatus }
		});
		this.countryDialog.afterClosed().subscribe((result: any) => {
			console.log(`Dialog result: ${result}`);
			console.log(this.dlgCloseStatus);
		});
	}
	openAeoProfile(country: string) {
		console.log("Opening Aeo Profile for: ", country);
		this.countriesForm.setValue(country);
		this.processSelectedCountry(this.mainCountries.find((mainCountry) => {
			return this.utils.translateCodeToCountry(mainCountry.ctryIsoCd) === country
		}));
	}

	openCompanyDialog(companyName: string) {
		this.mraDialog = this.dialogModel.open(CompanyMraDlgComponent, {
			height: '70%',
			width: '70%',
			data: { companyName: companyName, countryName: this.getSelectedCountryCode(), closeStatus: this.dlgCloseStatus }
		});
		this.mraDialog.afterClosed().subscribe((result: any) => {
			console.log(`Dialog result: ${result}`);
			console.log(this.dlgCloseStatus);
		});
	}
	// json is viewed here rohit
	openJSONDialog() {
		this.mraDialog = this.dialogModel.open(JsonViewerComponent, {
			height: '70%',
			width: '70%',
			data: { json: JSON.stringify(this.selectedCountry) }
		});
		this.mraDialog.afterClosed().subscribe((result: any) => {
			console.log(`Dialog result: ${result}`);
			console.log(this.dlgCloseStatus);
		})
	}

	selectedCountry?: AeoProfile;
	companiesList = COMPANIES;
	aeoCompanies: CompanyOnMapView[] = []
	mraCompanies: CompanyOnMapView[] = []
	private map: any;
	mapHeight = 500;
	animations: boolean = true;
	mainCountries: AeoProfile[] = [];
	companyCountryChart: ChartEntry[] = []

	enlargeMap() {
		//<button mat-menu-item (click)="enlargeMap()">Enlarge Map</button>
		this.mapHeight = 700;
	}

	private initMap(): void {
		this.map = L.map('map', {
			center: [25.5, 10],
			zoom: 2,
			attributionControl: false
		});

		const southWest = L.latLng(-89.98155760646617, -180),
			northEast = L.latLng(89.99346179538875, 180);
		const bounds = L.latLngBounds(southWest, northEast);
		this.map.setMaxBounds(bounds);

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			minZoom: 2,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

		tiles.addTo(this.map);
	}

	chipSelectionChange(countryName: string) {
		console.log('chipSelectionChange ' + countryName);
		console.log(this.mainCountries);
		this.mainCountries.forEach(country => {
			if (country.name === countryName)
				country.selected = true;
			else
				country.selected = false;
		})

		//this.processSelectedCountry();
	}
	selectCountryOption(event: MatAutocompleteSelectedEvent) {
		this.processSelectedCountry(
			this.mainCountries.find(country => country.name === event.option.value));
	}

	labelFormatting(c: any) {
		return `${(c.label)}`;
	}


	getCountryFullName(ISOCode: string): string {
		return this.utils.translateCodeToCountry(ISOCode);
	}
	displayCountryInput(country: AeoProfile) {
		return country.name;
	}
	companyHeaders: string[] = ['index', 'name', 'country', 'company_id', 'mra_status']
	convertYearToString(year: string | null) {
		if (year !== null) {
			year = year.replaceAll(",", "");
		}
		return year;
	}
	processSelectedCountry(getCountry?: AeoProfile) {
		console.log('processSelectedCountry', getCountry);
		//const getCountry = this.mainCountries.find( (country: AeoProfile) => country.selected);
		// the country information is binded here, rohit 
		this.selectedCountry = getCountry;
		this.currentSelectedCountry = getCountry?.name || '';
		this.mraCounts = [{
			"name": "Approved",
			"value": 0
		},
		{
			"name": "In Progress",
			"value": 0
		},
		{
			"name": "Rejected",
			"value": 0
		}];
		this.mraCounter = {
			approved: 0,
			rejected: 0,
			inprogress: 0,
			max: 0
		};
		// loads mra companies
		if (getCountry && getCountry.name.length > 1) {
			//get the countries list for the selected country			
			console.log('get the countries list for the selected country', getCountry);
			const companyFilter = {
				searchRequest: {
					cmpny: {
						cntryCd: getCountry.ctryIsoCd
					},
					cmpnyLoc: {}
				}
			} // searches on for mra companies
			this.backendApi.getCompaniesWithAFilter2(companyFilter, { totalNumberOfElements: 0, totalPages: 0, currentPage: 0 }).subscribe(async (companies: any) => {
				let countriesSelectedFromCompanies = new Map()
				let companiesData: Company [] = companies; //check if g2g-api uses this nested property
				// updates to the right companies data
				this.mraCompanies = companiesData.map((company: Company, index: number) => {
					// checking all the status
					if (company.apprvlStusCd.includes('APPROVED')) {
						this.mraCounter.approved++;
					}
					if (company.apprvlStusCd.includes('REJECTED'))
						this.mraCounter.rejected++;
					if (company.apprvlStusCd.includes('PENDING'))
						this.mraCounter.inprogress++;
					let locationToUse = company.cmpnyLocList.find((location: CompanyLocation) => { return location.isPrmryLoc })
						|| company.cmpnyLocList[0] || {
						cmpnyAddr: ''
					};
					let shipment = {
						containers: 0,
						monetaryValue: 0
					} // TO-DO Shipment Data
					// adds a tally of the country names
					let countryName = this.utils.translateCodeToCountry(company.cntryCd)
					let countryValue = countriesSelectedFromCompanies.get(countryName)
					if (countryValue) {
						countriesSelectedFromCompanies.set(countryName, countryValue + 1)
					}
					else {
						countriesSelectedFromCompanies.set(countryName, 1);
					}

					return {
						id: index,
						hostCountry: company.cntryCd || getCountry.ctryIsoCd,//countryData.ctry,
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
				this.companyCountryChart = Array.from(countriesSelectedFromCompanies.entries()).map(([country, value]) => {
					return {
						name: country || this.selectedCountry || '',
						value: value
					}
				})
				console.log("Company Country Chart: ", this.companyCountryChart)
				console.log("MRA Companies: ", this.mraCompanies);
				this.mraDataService.setMraCompanies(this.mraCompanies);
				this.processMRACompaniesData();
				this.addCompanyMarkers();
				this.addShippingMarkers();

				this.mraCounter.max = this.mraCounter.approved > this.mraCounter.rejected ? this.mraCounter.approved : this.mraCounter.rejected;
				this.mraCounter.max = this.mraCounter.max > this.mraCounter.inprogress ? this.mraCounter.max : this.mraCounter.inprogress;
				this.mraCounts = [{
					"name": "Approved",
					"value": Number(this.mraCounter.approved)
				},
				{
					"name": "In Progress",
					"value": Number(this.mraCounter.inprogress)
				},
				{
					"name": "Rejected",
					"value": Number(this.mraCounter.rejected)
				}];
			});

			// populate map with markers on country

			this.removeMapMarkers();
			this.addMarker(getCountry.name, getCountry.name, 'select', getCountry);

			getCountry.jwpPrtnrList.forEach((jwp: JWPPartner) => {
				const countryName = this.utils.translateCodeToCountry(jwp.countryCode);
				// makes sure that the main country marker isn't being overwritten
				if (getCountry.name !== countryName) {
					this.addMarker(countryName, countryName, 'JWP', jwp);
				}
			})

			getCountry.mraPrtnrList.forEach((mra: any) => {
				const countryName = this.utils.translateCodeToCountry(mra.countryCode);
				// makes sure that the main country marker isn't being overwritten
				if (getCountry.name !== countryName) {
					this.addMarker(countryName, countryName, 'MRA', mra);
				}
			})
			//update stats 
		}
		else { // loads aeo companies
			const companyFilter = {
				searchRequest: {
					cmpny: {
						cntryCd: 'US'
					},
					cmpnyLoc: {}
				}
			} // searches on for mra companies
			this.backendApi.getCompaniesWithAFilter2(companyFilter, { totalNumberOfElements: 0, totalPages: 0, currentPage: 0 }).subscribe(async (companies: any) => {
				this.aeoCompanies = companies.map((company : Company, index : number)=> {
					let locationToUse = company.cmpnyLocList.find((location: CompanyLocation) => { return location.isPrmryLoc })
						|| company.cmpnyLocList[0] || {
						cmpnyAddr: ''
					};
					return {
						id: index,
						hostCountry: company.cntryCd || "US",//countryData.ctry,
						name: company.cmpnyNm || "", //countryData.cmpnyNm, 
						mra_status: {
							class: company.apprvlStusCd.toLowerCase().includes('approved') ? 'approved' :
								company.apprvlStusCd.toLowerCase().includes('rejected') ? 'rejected' :
									company.apprvlStusCd.toLowerCase().includes('pending') ? 'pending' : '',
							value: company.apprvlStusCd || ""
						},
						companyAddress: locationToUse.cmpnyAddr || "",//compAddr,
						address: this.utils.convertLocationConversion(locationToUse, 'company'),
						containers: 0, // to be determined later
						monetaryValue: 0, // to be determined later 
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
			})
			//no country is selected - then display all participaating countries on the map
			this.loadMainCountriesMarkers();
			console.log("Main Countries: ", this.mainCountries);
			// at the end of it, they add all the coords together 
			console.log("Country Coords: ", this.logger.countryCoords);
		}
		this.searching = "";
	}

	addCompanyMarkers() {
		console.log('addCompanyMarker');
		this.removeCompanyMarkers();
		if (this.mapShowCountries) {
			this.companiesList.forEach((company) => {
				this.addCompanyMarker(company.latlon[1], company.latlon[0], company.name + ': ' + company.companyAddress);
			})
		}
	}

	addShippingMarkers() {
		console.log('addShippingMarkers');
		this.removeShippingMarkers();
		if (this.mapShowShipments) {
			this.companiesList.forEach((country) => {
				//this.addShipmentLine(country.origin, country.destination);
			})
		}
	}


	getSelectedCountryName(): string {
		return this.selectedCountry?.name || '';
	}

	getSelectedCountryCode(): string {
		return this.selectedCountry?.ctryIsoCd || '';
	}
	clearCountryInput = () => {
		this.selectedCountry = undefined;
		this.countriesForm.setValue('');
		// reloads country markers
		this.loadMainCountriesMarkers();
	}
	// reload main country markers 
	loadMainCountriesMarkers = () => {
		//no country is selected - then display all participaating countries on the map
		this.removeMapMarkers();
		for (let mainCountry of this.mainCountries) {
			this.addMarker(mainCountry.name, mainCountry.name, '', mainCountry);
		}
		// this will post all the unmarked countries 
		console.log("Countries Coordinates: ", this.logger.countryCoords)
	}
	mapShowCountries: boolean = false;
	mapShowShipments: boolean = false;

	mapChangeShowSettings() {
		console.log('mapChangeShowSettings');
		this.addCompanyMarkers();
	}

	mapChangeShippingSettings() {
		console.log('mapChangeShippingSettings');
		this.addShippingMarkers();
	}

	countries: Task[] = [];
	allComplete: boolean = false;
	task: Task = {
		name: 'All Countries',
		completed: false,
		color: 'primary',
		mra: {
			Approved: 0,
			Rejected: 0,
			In_Progress: 0,
		},
		mra_total: 0,
		subtasks: [],
	};

	updateAllComplete() {
		this.allComplete = this.task.subtasks != null && this.task.subtasks.every((t: any) => t.completed);
		// this.countries = this.task.subtasks?.map(country => country) ?? [];
	}

	someComplete(): boolean {
		if (this.task.subtasks == null) {
			return false;
		}
		return this.task.subtasks.filter((t: any) => t.completed).length > 0 && !this.allComplete;
	}

	setAll(completed: boolean) {
		this.allComplete = completed;
		if (this.task.subtasks == null) {
			return;
		}
		this.task.subtasks.forEach((t: any) => (t.completed = completed));
	}

	getSelectedCountries(): string | undefined {
		return this.task.subtasks?.filter((country: any) => country.completed).map((country: any) => country.name).join(', ');
	}

	expandedCountryinTable = '';

	selectCountriesRow(country: string) {
		console.log(country);
		if (this.expandedCountryinTable === country)
			this.expandedCountryinTable = '';
		else
			this.expandedCountryinTable = country;
	}

	expandedCompanyinTable = '';
	selectCompaniesRow(company: string) {
		console.log(company);
		if (this.expandedCompanyinTable === company)
			this.expandedCompanyinTable = '';
		else
			this.expandedCompanyinTable = company;
	}


	noDataReceived: boolean = true;
	searching : string = ""; 
	filteredCountries: AeoProfile[] = []
	ngOnInit(): void {
		this.hostCountry = this.utils.translateCodeToCountry(this.hostCountryIso)
		this.backendApi.getAllCountries().subscribe((data: any) => {
			console.log(data);
			this.task.subtasks = data.map((country: DB_Country) => {
				return { name: country.country, completed: true, color: 'primary', companies: country.companies, mra: country.MRA, mra_total: country.MRA.Approved + country.MRA.Rejected + country.MRA.In_Progress };
			});
			this.countries = this.task.subtasks?.map((country: any) => country) ?? [];
			//this.task.subtasks {name: 'Australia', completed: true, color: 'primary'},
			console.log(this.countries);
		});
		this.countriesForm.valueChanges.subscribe(filteredValue => {
			this.filteredCountries = this.mainCountries.filter((country) => {
				return country.name.toLowerCase().includes(filteredValue.toLowerCase())
			})
		})
		this.backendApi.tokenFound.subscribe((found: any) => {
			// loads in the aeoProfile
			if (found) {
				this.searching = "Searching..."
				this.backendApi.getAEOProfiles().subscribe({
					next: (data: any) => {
						this.searching = "Loading AEO Profiles..."
					this.noDataReceived = false;
						console.log(data);
						this.mainCountries = [];
						let selected = 0;
						const aeoData = data?.aeoPrflList;
						if (aeoData) {
							aeoData.forEach((element: any) => {
								const initialLen = this.mainCountries.length;
								this.mainCountries = this.mainCountries.filter((country: AeoProfile) => country.ctryIsoCd !== element.ctryIsoCd); //see if the country already exists then filter it out to avoid back-end sending duplicates.
								if (initialLen !== this.mainCountries.length)
									selected = 0;
								console.log(countryCodes.find((country: any) => country.code === element.ctryIsoCd));
								this.mainCountries.push({
									name: this.utils.translateCodeToCountry(element.cntryCd),
									ctryIsoCd: element.cntryCd,
									selected: false, //selected ? false : true,
									cmplncBasedPgm: element.cmplncBasedPgm,
									securityBasedPgm: element.securityBasedPgm,
									nbrOfMbrs: element.nbrOfMbrs,
									pgmCd: element.pgmNm,
									ctryAgncCd: element.cntryAgncNm,
									yearMraPgmEst: element.yearAeoPgmEst,
									mraPrtnrList: element.mraPrtnrList,
									jwpPrtnrList: element.jwpPrtnrList,
								});

							selected = 1;
						});
					}

					this.processSelectedCountry();
				},
				error: ()=>{
					this.searching = "error";
				}
			});
			}
			else {
				this.searching = "error"; 
			}
		})

	}


	ngAfterViewInit(): void {
		this.initMap();
		//this.addMarkerToMap(-74.0060152, 40.7127281);
		//this.addMarker('New York');
	}

	mapMarkers: any[] = [];
	mapCompanyMarkers: any[] = [];
	mapShippingMarkers: any[] = [];
	addMarkerToMap(lon: number, lat: number, country: string, type: string, object: any) {
		console.log('addMarker');
		const marker = L.marker([lat, lon])
		let tooltipSettings: L.TooltipOptions = {
			direction: 'top',
			offset: [-15, -10]
		}
		switch (type) {
			case 'select':
			case '':
				let countryTooltip = this.loading.generateTooltip('country', object)
				marker.bindTooltip(countryTooltip || '', tooltipSettings);
				break;
			case 'JWP':
				let jwpTooltip = this.loading.generateTooltip('jwp', object)
				marker.bindTooltip(jwpTooltip || '', tooltipSettings);
				break;
			case 'MRA':
				let mraTooltip = this.loading.generateTooltip('mra', object)
				marker.bindTooltip(mraTooltip || '', tooltipSettings);
				break;
		}
		// binds tooltip to the makrer, no idea of this works

		marker.addTo(this.map).on('click', ((e: any) => {
			switch (type) {
				case 'JWP':
					break;
				case 'MRA':
					break;
				default:
					if (!this.selectedCountry) {
						this.openAeoProfile(country); // adds an event 
					}
			}

		}));

		this.mapMarkers.push(marker);

		const circle = L.circleMarker([lat, lon])
		if (type!=='') {
			// binds a jwp tooltip
			circle.bindTooltip(country,
				{
					permanent: true,
					offset: [11, -1],
					direction: 'right'
				});
		}
		/*
		
		*/

		if (type === 'MRA') {
			circle.setStyle({ color: 'green' });
		}
		else if (type === 'JWP') {
			circle.setStyle({ color: 'orange' });
		}
		else {
			circle.setStyle({ color: 'blue' });
		}
		circle.addTo(this.map);
		this.mapMarkers.push(circle);


		/*
		var pointA = new L.LatLng(128.635308, 77.22496);
		var pointB = new L.LatLng(28.984461, 37.70641);
		var pointList = [pointA, pointB];
	
		var firstpolyline = new L.Polyline(pointList, {
			color: 'green',
			weight: 1,
			opacity: 0.5,
			smoothFactor: 1
		});
		firstpolyline.addTo(this.map);
		*/

		//this.addCurvedLine([23.634501, -102.552783], [17.987557, -92.929147]);
	}

	async addShipmentLine(origin: string, destination: string) {
		console.log('addShipmentLine');
		const originCoordinates = await this.getLatLon(origin);
		const destinationCoordinates = await this.getLatLon(destination);
		//console.log(originCoordinates);
		//console.log(destinationCoordinates);
		if (originCoordinates != undefined && destinationCoordinates != undefined)
			this.addCurvedLine([originCoordinates[1], originCoordinates[0]], [destinationCoordinates[1], destinationCoordinates[0]], origin, destination);
	}

	addCurvedLine(originPoints: number[], destPoints: number[], origin: string, destination: string) {
		const latlngs = [];

		const offsetX = destPoints[1] - originPoints[1],
			offsetY = destPoints[0] - originPoints[0];

		const r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
			theta = Math.atan2(offsetY, offsetX);

		const thetaOffset = (3.14 / 10);

		const r2 = (r / 2) / (Math.cos(thetaOffset)),
			theta2 = theta - thetaOffset;

		const midpointX = (r2 * Math.cos(theta2)) + originPoints[1],
			midpointY = (r2 * Math.sin(theta2)) + originPoints[0];

		const midpointLatLng = [midpointY, midpointX];

		latlngs.push(originPoints, midpointLatLng, destPoints);

		console.log([
			'M', originPoints,
			'Q', midpointLatLng,
			destPoints]);

		const pointA = new L.LatLng(originPoints[0], originPoints[1]);
		const pointB = new L.LatLng(midpointLatLng[0], midpointLatLng[1]);
		const pointC = new L.LatLng(destPoints[0], destPoints[1]);
		const pointList = [pointA, pointB, pointC];

		const firstpolyline = new L.Polyline(pointList, {
			color: 'green',
			weight: 2,
			opacity: 0.5,
			dashArray: '15, 5',
			smoothFactor: 1
		});
		this.mapShippingMarkers.push(firstpolyline);

		firstpolyline.addTo(this.map);

		const decorator = L.polylineDecorator(firstpolyline, {
			patterns: [
				// defines a pattern of 10px-wide dashes, repeated every 20px on the line
				{ offset: 0, repeat: 50, symbol: L.Symbol.arrowHead({ pixelSize: 8, polygon: false, pathOptions: { stroke: true } }) }
			]
		}).bindTooltip(origin + ' >> ' + destination, { permanent: false, direction: 'top' }).addTo(this.map);

		this.mapShippingMarkers.push(decorator);
	}


	addCompanyMarker(lon: number, lat: number, name: string) {
		const lat1 = [lon, lat];
		const svgIcon = L.divIcon({
			html: `
			<svg xmlns="http://www.w3.org/2000/svg"   fill="currentColor"  
			width="120"
			height="120" color="green"
			viewBox="0 0 90 90">
			<path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
			<path d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
		</svg>
			<path d="M0 0 L50 100 L100 0 Z" fill="#7A8BE7"></path>
		  </svg>`,
			className: "",
			iconSize: [120, 120],
			iconAnchor: [0, 0],
		});
		const compMarker = L.marker([lon, lat], { icon: svgIcon }).bindTooltip(name, { permanent: false, direction: 'top' }).addTo(this.map);

		this.mapCompanyMarkers.push(compMarker);
	}


	removeMapMarkers() {
		this.removeCompanyMarkers();
		this.removeShippingMarkers()
		for (let i = 0; i < this.mapMarkers.length; i++) {
			this.map.removeLayer(this.mapMarkers[i]);
		}
		this.mapMarkers = [];
	}


	removeCompanyMarkers() {
		for (let i = 0; i < this.mapCompanyMarkers.length; i++) {
			this.map.removeLayer(this.mapCompanyMarkers[i]);
		}
		this.mapCompanyMarkers = [];
	}

	removeShippingMarkers() {
		for (let i = 0; i < this.mapShippingMarkers.length; i++) {
			this.map.removeLayer(this.mapShippingMarkers[i]);
		}
		this.mapShippingMarkers = [];
	}

	//retreives lat and lon. input: address
	async getLatLon(address: string): Promise<[number, number] | undefined> {
		if (!address || address === '') {
			return undefined;
		}
		const getCoords = countryGeoCoords.find((element: any) => element.Name === address);

		if (getCoords) {
			console.log(getCoords);
			return [getCoords.lon, getCoords.lat];
		}
		else {
			const latLon = await this.backendApi.getLatLonAPI(address).subscribe((data: any) => {
				console.log(data);
				if (data && data.length > 0) {
					return [data[0].lon, data[0].lat];
				}
				return undefined;
			});
			console.log(latLon);
			return undefined;
		}
	}


	//adds country marker on the map. input: country's name
	addMarker(address: string, country: string, type: string, payload?: any) {
		const getCoords = countryGeoCoords.find((element: any) => element.name === address);
		if (getCoords) {
			this.addMarkerToMap(getCoords.lon, getCoords.lat, country, type, payload);
		}
		else {
			if (address) {
				this.backendApi.getLatLonAPI(address).subscribe((data: any) => {
					if (data.length > 0) {
						// country name added 
						this.addMarkerToMap(data[0].lon, data[0].lat, data[0].name, type, payload);
						if (type === 'select' || type === '') {
							this.logger.addCountryToJSON({
								name: data[0].name,
								lat: data[0].lat,
								lon: data[0].lon,
								code: payload?.ctryIsoCd || ''
							})
						}
					}
				});
			}
		}
	}

	//chart variables
	mraCounter = {
		approved: 0,
		rejected: 0,
		inprogress: 0,
		max: 0,
	};
	mraCounts: any[] = [];
	multi: any[] = [];

	mraApprovalData: any[] = [];
	mraCountryData: any[] = [];

	view: [number, number] = [600, 350];
	view1: [number, number] = [700, 400];
	view2: [number, number] = [500, 400];
	viewPie: [number, number] = [700, 400];
	// options
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	gradientHeatmap = true;
	showLegend = true;
	showXAxisLabel = false;
	xAxisLabel = 'MRA Counts';
	showYAxisLabel = true;
	yAxisLabel = 'Population';
	showLabels = true;
	isDoughnut = false;
	showXAxisLabel2 = true;
	showYAxisLabel2 = true;
	xAxisLable2 = 'Country';
	yAxisLable2 = 'Number of Companies';

	colorScheme: any = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	};

	onSelect(event: any) {
		console.log(event);
	}


	processMRACompaniesData() {
		console.log('Processing MRA companies data:', this.mraCompanies);
		
		if (this.mraCompanies && this.mraCompanies.length > 0) {
			// Process approval status data for pie chart
			const approvalStatusMap = new Map<string, number>();
			
			this.mraCompanies.forEach(company => {
				const status = company.mra_status.value;
				approvalStatusMap.set(status, (approvalStatusMap.get(status) || 0) + 1);
			});
			
			this.mraApprovalData = Array.from(approvalStatusMap.entries()).map(([status, count]) => ({
				name: status,
				value: count
			}));
			
			// Process country distribution data for second chart
			const countryMap = new Map<string, number>();
			
			this.mraCompanies.forEach(company => {
				const country = company.hostCountry;
				countryMap.set(country, (countryMap.get(country) || 0) + 1);
			});
			
			this.mraCountryData = Array.from(countryMap.entries()).map(([country, count]) => ({
				name: this.utils.translateCodeToCountry(country),
				value: count
			}));
			
			console.log('Pie chart data (approval status):', this.mraApprovalData);
			console.log('Bar chart data (country distribution):', this.mraCountryData);
		} else {
			// Default data if no MRA companies
			this.mraApprovalData = [
				{ name: 'Approved', value: 0 },
				{ name: 'Pending', value: 0 },
				{ name: 'Rejected', value: 0 }
			];
			
			this.mraCountryData = [
				{ name: 'No Data', value: 0 }
			];
			
			console.log('No MRA companies data available, using default data');
		}
	}


	filter = new FormControl('', { nonNullable: true });


	getColorForStatus(status: string): string {
		const statusColors: { [key: string]: string } = {
			'APPROVED': '#5AA454',
			'PENDING': '#C7B42C',
			'REJECTED': '#A10A28',
			'In Progress': '#C7B42C',
			'Approved': '#5AA454',
			'Rejected': '#A10A28'
		};
		return statusColors[status] || '#AAAAAA';
	}

	getColorForCountry(country: string): string {
		const colors = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#7B68EE', '#FF6347', '#32CD32', '#FFD700'];
		const index = country.charCodeAt(0) % colors.length;
		return colors[index];
	}

}

















 
  #map {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height:  460px;
  }
 .country-input {
  width: 30%;
 }
 .country-row {
  display: flex; 
 }
 .flag-network-icon {
  margin-right: 1em; 
  width: 4em; 
  height: 4em;
 }
 .card-title>.title-header {
  font-size: 1.5em; 
  font-weight: 550;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
 }
 .card-title>.title-description {
  margin-top: 0.5em; 
  margin-left: 1em;
  font-size: 1.1em;
 }
 .companies-table-layout {
  height: 50em;
  display: flex; 
  gap: 2em;
}
.companies-table-frame {
  flex: 1;
  height: 100%;
}

.companies-table-frame>.card-body{
  max-height: 100%; 
  overflow-y: hidden
 } 
    body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
      }
      
      html {
        height: -webkit-fill-available;
      }
      
      main {
        height: 100vh;
        height: -webkit-fill-available;
        max-height: 100vh;
        overflow-x: auto;
        overflow-y: hidden;
      }
      
      .dropdown-toggle { outline: 0; }
      
      .btn-toggle {
        padding: .25rem .5rem;
        font-weight: 600;
        color: var(--bs-emphasis-color);
        background-color: transparent;
      }
      .btn-toggle:hover,
      .btn-toggle:focus {
        color: rgba(var(--bs-emphasis-color-rgb), .85);
        background-color: var(--bs-tertiary-bg);
      }
       
      
      .btn-toggle[aria-expanded="true"] {
        color: rgba(var(--bs-emphasis-color-rgb), .85);
      }
      .btn-toggle[aria-expanded="true"]::before {
        transform: rotate(90deg);
      }
      
      .btn-toggle-nav a {
        padding: .1875rem .5rem;
        margin-top: .125rem;
        margin-left: 1.25rem;
      }
      .btn-toggle-nav a:hover,
      .btn-toggle-nav a:focus {
        background-color: var(--bs-tertiary-bg);
      }
      
      .scrollarea {
        overflow-y: auto;
      }
    
    
      .navbar-svg-icon {
        position:relative;
        top:-2px;
        margin-right: 5px
    }
    
    .navbar-svg-icon-inactive {
      position:relative; 
      margin-right: 5px
    }
    
    .btn-filter {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
       ;
    }
    
    .navbar-btn-hover:hover {
      background-color: rgb(225, 236, 247);
      border-radius: 5px;
      
    }
    
    
    .btn-filter:hover {
       color: rgb(8, 67, 230);
    }
    
    mat-sidenav {
      width: 350px;
    }
    
.widget-card {
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  border-color: rgb(142, 153, 163);
  }
  
 
    .card-hdr-class {
      background:  rgb(0, 60, 110);
      color: white;
    }
    
    .example-accordion {
      display: block;
      max-width: 500px;
    }
    
    .example-accordion-item {
      display: block;
      border: solid 1px #ccc;
    }
    
    .example-accordion-item + .example-accordion-item {
      border-top: none;
    }
    
    .example-accordion-item-header {
      display: flex;
      align-content: center;
      justify-content: space-between;
    }
    
    .example-accordion-item-description {
      font-size: 0.85em;
      color: #999;
    }
    
    .example-accordion-item-header,
    .example-accordion-item-body {
      padding: 16px;
    }
    
    .example-accordion-item-header:hover {
      cursor: pointer;
      background-color: #eee;
    }
    
    .example-accordion-item:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    
    .example-accordion-item:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .loading-container {
      margin-left: 1em;
      display: flex; 
      gap: 0.75em; 
      font-size: 2em; 
    }
    .loading-container>.spinner {
      width: 2.5em !important;
      height: 2.5em !important;
    }
    .loading-text {
      margin-top: auto;
      margin-bottom: auto;
    }

    .analytics-section {
      margin-top: 2rem;
      margin-bottom: 2rem;
    
      .analytics-card {
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
        overflow: hidden;
    
        .card-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 1.5rem;
          border-bottom: none;
    
          .card-title {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 600;
            color: white;
          }
        }
    
        .card-body {
          padding: 1.5rem;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }


 ::ng-deep {
  ngx-charts-advanced-pie-chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .advanced-pie,.chart {
      padding: 0 1rem 0 3rem;
      width: 286px !important;
      height: 360px !important;
    }

    .advanced-pie {
      flex: 1;
      max-width: 100%;
      width: 100%;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      
      svg {
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
      }

      path {
        stroke-width: 2px !important;
      }
      .pie-label {
        font-size: 12px;
        font-weight: 600;
        fill: #333;
        text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
      }
    }
    .advanced-pie-legend-wrapper {
      width: 380px !important;

        .advanced-pie-legend {
        width: 100% !important;
        padding: 20px 10px 10px 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
        
        .total-value {
          padding-left: 12px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
          color: #333;
          padding: 8px 12px;
          background: rgba(255,255,255,0.9);
          border-radius: 6px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          min-width: 120px;

          .legend-label {
            font-weight: 600;
            color: #333;
            margin-left: 8px;
            white-space: nowrap;
          }
          
          .legend-value {
            font-weight: 600;
            color: #555;
            margin-left: 8px;
            min-width: 30px;
            text-align: right;
          }
          
          .legend-percent {
            font-weight: 500;
            color: #666;
            margin-left: 8px;
            min-width: 40px;
            text-align: right;
          }
        }
      }    
    }

  }
    
        .ngx-charts-bar-vertical {
          .x-axis {
            .tick {
              text {
                font-size: 11px;
                font-weight: 500;
                fill: #555;
              }
            }
          }
    
          .y-axis {
            .tick {
              text {
                font-size: 11px;
                font-weight: 500;
                fill: #555;
              }
            }
          }
    
          .x-axis-label, .y-axis-label {
            font-size: 12px;
            font-weight: 600;
            fill: #333;
          }
    
          .legend {
            .legend-title {
              font-size: 14px;
              font-weight: 600;
              color: #333;
              margin-bottom: 8px;
            }
    
            .legend-labels {
              .legend-label {
                font-size: 12px;
                font-weight: 500;
                color: #555;
                line-height: 1.4;
                margin-bottom: 4px;
    
                .legend-label-text {
                  color: #333;
                  font-weight: 600;
                }
    
                .legend-label-color {
                  border-radius: 3px;
                  margin-right: 8px;
                }
              }
            }
          }
        }
    

        .chart-container {
          width: 100%;
          height: 100%;
          min-height: 350px;
        }
        
        .ngx-charts-outer {
          width: 100% !important;
        }


    // Override ngx-charts legend styling for full text visibility
    ngx-charts-legend {
      width: 25% !important;
      
      // Target the inner div that contains the legend text
      > div {
        width: 100% !important;
        max-width: none !important;
        white-space: normal !important;
        word-wrap: break-word !important;
        overflow: visible !important;
      }
      
      // Ensure legend labels don't get cut off
      .legend-label {
        width: 100% !important;
        max-width: none !important;
        white-space: normal !important;
        word-wrap: break-word !important;
        overflow: visible !important;
        
        .legend-label-text {
          max-width: none !important;
          white-space: normal !important;
          word-wrap: break-word !important;
          overflow: visible !important;
        }
      }
    }

      }
    

      @media (max-width: 768px) {
        .analytics-card {
          .card-body {
            min-height: 300px;
            padding: 1rem;
          }
        }
    
        ::ng-deep {
          .ngx-charts-pie-chart,
          .ngx-charts-bar-vertical {
            .legend {
              .legend-labels {
                .legend-label {
                  font-size: 11px;
                }
              }
            }
          }
        }
      }
    
      @media (prefers-color-scheme: dark) {
        .analytics-card {
          .card-header {
            background: rgb(0, 60, 110);
          }
        }
    
        ::ng-deep {
          .ngx-charts-pie-chart,
          .ngx-charts-bar-vertical {
            .legend {
              .legend-title {
                color: #e2e8f0;
              }
    
              .legend-labels {
                .legend-label {
                  color: #cbd5e0;
    
                  .legend-label-text {
                    color: #e2e8f0;
                  }
                }
              }
            }
    
            .x-axis, .y-axis {
              .tick text {
                fill: #cbd5e0;
              }
            }
    
            .x-axis-label, .y-axis-label {
              fill: #e2e8f0;
            }
    
            .pie-label {
              fill: #e2e8f0;
              text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
            }
          }
        }
      }
    }
    
    .chart-legend-container {
      padding: 1rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 6px;
      margin-top: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    
      .legend-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        font-size: 13px;
        font-weight: 500;
    
        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          margin-right: 8px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
    
        .legend-text {
          color: #333;
          font-weight: 600;
        }
      }
    }
    
    @media (prefers-contrast: high) {
      .analytics-section {
        ::ng-deep {
          .ngx-charts-pie-chart,
          .ngx-charts-bar-vertical {
            .legend {
              .legend-labels {
                .legend-label {
                  .legend-label-text {
                    font-weight: 700;
                    color: #000;
                  }
                }
              }
            }
    
            .x-axis, .y-axis {
              .tick text {
                font-weight: 700;
                fill: #000;
              }
            }
    
            .x-axis-label, .y-axis-label {
              font-weight: 700;
              fill: #000;
            }
          }
        }
      }
    }
















    <div class="container-fluid mx-0 px-0"
    style="background: linear-gradient( to top , rgba(0, 60, 110, 0.15), 5%, rgba(255, 255, 255, 0.2))  ">
    <h1 class="  px-4 pt-4 pb-3 " style="border-bottom: 2px solid rgba(0, 60, 110, 0.15);  ">
        <div class="row">
            <div class="col ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="bi bi-globe-americas" viewBox="0 0 18 18">
                    <path
                        d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                </svg>
                <span class="mx-2">Logged-In Country: </span>
                <span style="color: rgb(0, 60, 110);">{{hostCountry}}</span>

            </div>
        </div>
    </h1>
</div>


<div class="row mx-3 pb-3">
    View key metrics and details about the host country including stats on the companies who has requested benefits.
</div>
<div class="searching-container" *ngIf="searching.length>0 && searching!=='error'">
    <mat-progress-spinner class="spinner" [mode]="'indeterminate'"></mat-progress-spinner>
    <div class="searching-text">
        {{searching}}
    </div>
</div>

<ng-container *ngIf="searching==='error'">
    <div class="container pt-4 mt-4 text-danger">
        <h3>Unable to connect to the server, please try again or contact support.</h3>
    </div>
</ng-container>

<div class="input-container pb-3 text-left" [hidden]="searching.length!==0">
    <h2>Participating Countries in the G2G Network:</h2>
    <div class="country-row">
        <span *ngIf="selectedCountry"
            class="flag-network-icon fi fi-{{selectedCountry.ctryIsoCd.toLowerCase()}}"></span>
        <mat-form-field class="country-input">
            <mat-label>Select A Participating Country</mat-label>
            <input type="text" placeholder="Enter in A Country" aria-label="Country Input" matInput
                [formControl]="countriesForm" [matAutocomplete]="auto">
            <button *ngIf="countriesForm.value.length>0" matSuffix mat-icon-button aria-label="Clear"
                (click)="clearCountryInput()" style="position: fixed; right: 0px; top: 5px;">
                <mat-icon>close</mat-icon>
            </button>
            <mat-autocomplete autoActiveFirstOption (optionSelected)="selectCountryOption($event)"
                #auto="matAutocomplete">
                <mat-option *ngFor="let country of filteredCountries" [value]="country.name">
                    <span class="fi fi-{{country.ctryIsoCd.toLowerCase()}}"></span>
                    {{getCountryFullName(country.ctryIsoCd)}}</mat-option>
            </mat-autocomplete>
        </mat-form-field>
    </div>

</div>

<div class="container-fluid" style="height: 500px;">
    <div class="row">
        <div class="col ">
            <div class="card widget-card">
                <div class="card-header card-hdr-class">
                    <div class="row">
                        <div class="col">
                            <h4 class="card-title mb-1 pt-1">World Map: {{selectedCountry?.name == '' ? 'Showing All
                                Participating Countries' : 'Showing Member Countries for the participating country [' +
                                selectedCountry?.name+ ']'}}</h4>
                        </div>
                        <div class="col-1 float-right">
                            <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0   text-light" [matMenuTriggerFor]="menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path
                                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </button>
                            <mat-menu #menu="matMenu">
                                <button mat-menu-item>Export</button>
                                <button mat-menu-item>Filter</button>
                                <button mat-menu-item (click)="openJSONDialog()">Show JSON</button>
                            </mat-menu>
                        </div>
                    </div>
                </div>
                <div class="card-body px-0 pt-0 pb-0 ">

                    <div id="map" [style.height.px]="mapHeight"></div>
                </div>
                <div class="card-footer pt-0 pb-0">
                    <div class="row" style="text-align:right;">
                        <div class="col">
                            <mat-checkbox class="px-3" color="primary" [(ngModel)]="mapShowCountries"
                                (ngModelChange)="mapChangeShowSettings()">Show Companies</mat-checkbox>
                            <mat-checkbox class="px-3" color="primary" [(ngModel)]="mapShowShipments"
                                (ngModelChange)="mapChangeShippingSettings()">Show Shipments</mat-checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<div [style.visibility]="selectedCountry ? 'visible' :'hidden'" style="margin-top: 125px;" class="pb-4">

    <div class="container-fluid pb-2  ">
        <div class="row">
            <div class="col-6">
                <div class="card widget-card">
                    <div class="card-header  card-hdr-class pt-2">
                        <div class="row">
                            <div class="col">
                                <h4 class="card-title mb-1 pt-1">
                                    Country Details
                                    <small style="font-size: small;">{{selectedCountry?.name}}</small>
                                </h4>
                            </div>
                            <div class="col-1 float-right">
                                <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0  text-light"
                                    [matMenuTriggerFor]="menu">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </button>
                                <mat-menu #menu="matMenu">
                                    <button mat-menu-item>Export</button>
                                    <button mat-menu-item>Filter</button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body mx-0 px-0">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Agency</th>
                                    <th scope="col">MRA Members</th>
                                    <th scope="col">Program</th>
                                    <th scope="col">MRA Program Established</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ng-container *ngFor="let country of mainCountries; index as i">
                                    <ng-container *ngIf="country.ctryIsoCd === selectedCountry?.ctryIsoCd">
                                        <tr (click)="selectCountriesRow(country.ctryIsoCd)">
                                            <th scope="row">{{ i + 1 }}</th>
                                            <td> {{ getCountryFullName(country.ctryIsoCd) }}
                                            </td>
                                            <td>{{ country.ctryAgncCd }}</td>
                                            <td>{{ country.nbrOfMbrs | number }}</td>
                                            <td>{{ country.pgmCd }}</td>
                                            <td>{{ convertYearToString(country.yearMraPgmEst | number) }}</td>
                                        </tr>

                                        <tr *ngIf="expandedCountryinTable == country.ctryIsoCd"
                                            style="background-color:rgb(218, 218, 218) !important;  ">
                                            <td colspan="8" style="background-color:rgb(238, 238, 238) !important;">
                                                <b>Company Details for {{expandedCountryinTable}}</b>
                                                <div class="row">
                                                    <div class="col">
                                                        <p>Information about Companies</p>
                                                        <ng-container *ngFor="let country of countries; index as i">
                                                            <div *ngIf="expandedCountryinTable == country.name">
                                                                {{ country.name }} Total Companies {{country.companies}}
                                                                <div class="progress mb-2 mt-2">
                                                                    <div class="progress-bar" role="progressbar"
                                                                        [style.width.%]="country.companies"
                                                                        aria-valuenow="75" aria-valuemin="0"
                                                                        aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </ng-container>
                                                    </div>
                                                    <div class="col">
                                                        <p>Information about MRA Requests</p>

                                                        <ng-container *ngFor="let country of countries; index as i">
                                                            <div *ngIf="expandedCountryinTable == country.name">

                                                                Approved: {{country.mra.Approved}}
                                                                <div class="progress mb-2 mt-2">
                                                                    <div class="progress-bar bg-success"
                                                                        role="progressbar"
                                                                        [style.width.%]="country.mra.Approved"
                                                                        aria-valuenow="75" aria-valuemin="0"
                                                                        aria-valuemax="100"></div>
                                                                </div>

                                                                Rejected: {{country.mra.Rejected}}
                                                                <div class="progress mb-2 mt-2">
                                                                    <div class="progress-bar bg-danger"
                                                                        role="progressbar"
                                                                        [style.width.%]="country.mra.Rejected"
                                                                        aria-valuenow="75" aria-valuemin="0"
                                                                        aria-valuemax="100"></div>
                                                                </div>

                                                                In Progress: {{country.mra.In_Progress}}
                                                                <div class="progress mb-2 mt-2">
                                                                    <div class="progress-bar bg-warning"
                                                                        role="progressbar"
                                                                        [style.width.%]="country.mra.In_Progress"
                                                                        aria-valuenow="75" aria-valuemin="0"
                                                                        aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </ng-container>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </ng-container>
                                </ng-container>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div class="col-3">
                <div class="card widget-card" style="height: 100%;">
                    <div class="card-header card-hdr-class">
                        <div class="row">
                            <div class="col">
                                <h4 class="card-title mb-1 pt-1"><span style="color: lightgreen;"><b>MRA</b></span>
                                    Partners</h4>
                            </div>
                            <div class="col-2 float-right">
                                <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0  text-light "
                                    [matMenuTriggerFor]="menu">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </button>
                                <mat-menu #menu="matMenu">
                                    <button mat-menu-item>Export</button>
                                    <button mat-menu-item>Filter</button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body mx-0 px-0">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Country</th>
                                    <th scope="col">Agency</th>
                                    <th scope="col">Program</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ng-container *ngFor="let country of mainCountries; index as i">
                                    <ng-container *ngIf="selectedCountry?.name === country.name">
                                        <tr *ngFor="let mracountry of country.mraPrtnrList; index as i">
                                            <td (click)="openDialog(mracountry.countryCode)" style="cursor: pointer;">
                                                {{ getCountryFullName(mracountry.countryCode) }}
                                            </td>
                                            <td>{{ mracountry.agency }}</td>
                                            <td>{{ mracountry.program }}</td>
                                        </tr>
                                    </ng-container>
                                </ng-container>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-3">
                <div class="card widget-card" style="height: 100%;">
                    <div class="card-header card-hdr-class">
                        <div class="row">
                            <div class="col">
                                <h4 class="card-title mb-1 pt-1"><span
                                        style="color: rgb(228, 206, 6);"><b>JWP</b></span> Partners</h4>
                            </div>
                            <div class="col-2 float-right">
                                <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0  text-light "
                                    [matMenuTriggerFor]="menu">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </button>
                                <mat-menu #menu="matMenu">
                                    <button mat-menu-item>Export</button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body  mx-0 px-0">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Country</th>
                                    <th scope="col">Agency</th>
                                    <th scope="col">Program</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ng-container *ngFor="let country of mainCountries; index as i">
                                    <ng-container *ngIf="selectedCountry?.name === country.name">
                                        <tr *ngFor="let jwpcountry of country.jwpPrtnrList; index as i">
                                            <td (click)="openDialog(jwpcountry.countryCode)" style="cursor: pointer;">
                                                {{ getCountryFullName(jwpcountry.countryCode) }}
                                            </td>
                                            <td>{{ jwpcountry.agency }}</td>
                                            <td>{{ jwpcountry.program }}</td>
                                        </tr>
                                    </ng-container>
                                </ng-container>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>



    <!-- <div class="container-fluid pt-2 mt-3 pb-3 mb-3">
        <div class="row" style="height: 100%; top:0px;  position: relative; margin-top: 0px;">
            <div class="col-6">
                <div class="card widget-card" style="height: 100%;">
                    <div class="card-header card-hdr-class">
                        <div class="row">
                            <div class="col">
                                <h4 class="card-title mb-1 pt-1">Companies Benefits Status per year
                                </h4>
                            </div>
                            <div class="col-1 float-right">
                                <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0   text-light"
                                    [matMenuTriggerFor]="menu">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </button>
                                <mat-menu #menu="matMenu">
                                    <button mat-menu-item>Export</button>
                                    <button mat-menu-item>Filter</button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body mx-0  px-4">

                        Approved: {{mraCounter.approved}}
                        <div class="progress mb-2 mt-3">
                            <div class="progress-bar bg-success" role="progressbar"
                                [style.width.%]="mraCounter.max > 0 ? mraCounter.approved * 100 / mraCounter.max : 0">
                            </div>
                        </div>

                        Rejected: {{mraCounter.rejected}}
                        <div class="progress mb-2 mt-3">
                            <div class="progress-bar bg-danger" role="progressbar"
                                [style.width.%]="mraCounter.max > 0 ? mraCounter.rejected * 100 / mraCounter.max : 0">
                            </div>
                        </div>

                        In Progress: {{mraCounter.inprogress}}
                        <div class="progress mb-2 mt-3">
                            <div class="progress-bar bg-warning" role="progressbar"
                                [style.width.%]="mraCounter.max > 0 ? mraCounter.inprogress * 100 / mraCounter.max : 0">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <div class="card widget-card  text-center" style="height: 100%; text-align: center !important;">
                    <div class="card-header card-hdr-class">
                        <div class="row">
                            <div class="col">
                                <h4 class="card-title mb-1 pt-1">Number of Companies per Country</h4>
                            </div>
                            <div class="col-1 float-right">
                                <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0 text-light "
                                    [matMenuTriggerFor]="menu">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </button>
                                <mat-menu #menu="matMenu">
                                    <button mat-menu-item>Export</button>
                                    <button mat-menu-item>Filter</button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body mx-0 px-0 text-center w-100">
                        <ngx-charts-tree-map [view]="view1" [results]="companyCountryChart" [gradient]="gradientHeatmap"
                            [animations]="animations" [labelFormatting]="labelFormatting" (select)="onSelect($event)">
                        </ngx-charts-tree-map>
                    </div>
                </div>
            </div>
        </div>
    </div> -->


    <div class="container-fluid pt-2 mt-1 pb-5 mb-5">
        <div class="companies-table-layout">
            <div class="companies-table-frame card widget-card">
                <div class="card-header card-hdr-class">
                    <div class="row">
                        <div class="col">
                            <div class="card-title">
                                <div class="title-description">
                                    Companies from the [United States] Getting Benefits from [{{selectedCountry?.name}}]
                                </div>
                            </div>
                        </div>
                        <div class="col-1 float-right">
                            <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0   text-light" [matMenuTriggerFor]="menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path
                                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </button>
                            <mat-menu #menu="matMenu">
                                <button mat-menu-item>Export</button>
                                <button mat-menu-item>Filter</button>
                            </mat-menu>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <app-companies-table *ngIf="aeoCompanies.length>0"
                        [headers]="['index', 'name', 'company_id', 'status']"
                        [filters]="['name', 'address', 'status', 'tin']"
                        [allowFilter]="true"
                        [companies]="aeoCompanies"></app-companies-table>
                </div>
            </div>
            <div class="companies-table-frame card widget-card">
                <div class="card-header card-hdr-class">
                    <div class="row">
                        <div class="col">
                            <div class="card-title">
                                <div class="title-description">
                                    Companies from the  [{{selectedCountry?.name}}] Getting Benefits from [United States]
                                </div>
                            </div>
                        </div>
                        <div class="col-1 float-right">
                            <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0 text-light " [matMenuTriggerFor]="menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path
                                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </button>
                            <mat-menu #menu="matMenu">
                                <button mat-menu-item>Export</button>
                                <button mat-menu-item>Filter</button>
                            </mat-menu>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <app-companies-table *ngIf="mraCompanies.length>0"
                        [allowFilter]="true"
                        [companies]="mraCompanies"></app-companies-table>
                </div>
            </div>
        </div>
    </div>

<!-- Analytics Section -->
    <div class="analytics-section container-fluid" *ngIf="selectedCountry">
        <div class="row">
            <div class="col-lg-6 col-md-12 mb-4">
                <div class="analytics-card">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col">
                                <h4 class="card-title">
                                    <i class="bi bi-pie-chart me-2"></i>
                                    Distribution of Company Statuses for AEO Profile
                                </h4>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0 text-light" [matMenuTriggerFor]="pieMenu">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </button>
                                <mat-menu #pieMenu="matMenu">
                                    <button mat-menu-item>
                                        <i class="bi bi-download me-2"></i>Export
                                    </button>
                                    <button mat-menu-item>
                                        <i class="bi bi-funnel me-2"></i>Filter
                                    </button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <ngx-charts-advanced-pie-chart 
                                [view]="viewPie" 
                                [results]="mraApprovalData" 
                                [gradient]="gradient"
                                [scheme]="colorScheme" 
                                [tooltipDisabled]="false"
                                (select)="onSelect($event)">
                            </ngx-charts-advanced-pie-chart>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 mb-4">
                <div class="analytics-card">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col">
                                <h4 class="card-title">
                                    <i class="bi bi-bar-chart me-2"></i>
                                    MRA Companies by Country
                                </h4>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0 text-light" [matMenuTriggerFor]="pieMenu">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </button>
                                <mat-menu #barMenu="matMenu">
                                    <button mat-menu-item>
                                        <i class="bi bi-download me-2"></i>Export
                                    </button>
                                    <button mat-menu-item>
                                        <i class="bi bi-funnel me-2"></i>Filter
                                    </button>
                                </mat-menu>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <ngx-charts-bar-vertical 
                                [view]="view2" 
                                [results]="mraCountryData" 
                                [gradient]="gradient"
                                [xAxis]="showXAxis" 
                                [yAxis]="showYAxis" 
                                [legend]="showLegend"
                                [showXAxisLabel]="showXAxisLabel" 
                                [showYAxisLabel]="showYAxisLabel"
                                [xAxisLabel]="xAxisLabel" 
                                [yAxisLabel]="yAxisLabel" 
                                [scheme]="colorScheme"
                                [tooltipDisabled]="false"
                                (select)="onSelect($event)">
                            </ngx-charts-bar-vertical>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div #tooltip [style.visibility]="selectedCountry ? 'visible' :'hidden'">
    </div>
    <div class="container-fluid pt-2 mt-1 pb-5 mb-5" style="height: 50px;">
    </div>
</div>
