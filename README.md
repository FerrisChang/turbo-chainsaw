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

    <div #tooltip [style.visibility]="selectedCountry ? 'visible' :'hidden'">
    </div>
    <div class="container-fluid pt-2 mt-1 pb-5 mb-5" style="height: 50px;">
    </div>
















</div>
