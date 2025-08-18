
<div class="container-fluid" style="background-color:rgba(243, 247, 250, 0.315)">    
    <div class="total-frame">
        <div class="sidebar-frame" [class.collapse]="isCollapsed" >
            <div class="sidebar-header-frame">
                <button (click)="isCollapsed=!isCollapsed" class="collapse-button btn btn-sm "> <mat-icon style="color:black;">{{
                    isCollapsed ? 'chevron_right' : 'chevron_left'}}</mat-icon></button>
            </div>
           <!--Sidebar wrapper-->
            <div class="sidebar-content" [@fadeCollapse]="isCollapsed ? 'collapse' : 'open'">
                <div class="card cbp-left-card-main">
                    <div class="card-header cbp-dhs-toolbar-header">
                      Hotlist
                    </div>
                    <div class="hotlist-section" *ngFor="let search of hotList">
                        <div class="header">
                            {{search.header}}
                        </div>
                        <div class="section">
                            <div class="section-link" *ngFor="let searchSection of search.searches" (click)="submitSearch(searchSection.search)">
                                {{searchSection.name}}
                            </div>
                        </div>
                    </div>
                        <!-- <p class="ms-3 mb-0 pb-0 mt-2" style="font-weight: bold;"> Applications</p> -->
                        <!-- <div class="card m-3 mt-1" >
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-8">
                                            Unassigned
                                        </div>
                                        <div class="col cbp-left-card-content">
                                            <span class="cbp-left-card-stats">31</span>
                                        </div>
                                    </div>
                                </li> 
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-8">
                                            Assigned to me
                                        </div>
                                        <div class="col cbp-left-card-content">
                                            <span class="cbp-left-card-stats">12</span>
                                        </div>
                                    </div>
                                </li> 
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-8">
                                            Not Processed
                                        </div>
                                        <div class="col cbp-left-card-content">
                                            <span class="cbp-left-card-stats">20</span>
                                        </div>
                                    </div>
                                </li> 
                                <li class="list-group-item">
                                    <div class="row">
                                        <div class="col-9">
                                            Certified
                                        </div>
                                        <div class="col cbp-left-card-content">
                                            <span class="cbp-left-card-stats">50</span>
                                        </div>
                                    </div>
                                </li> 
                            </ul>
                        </div> -->
                  </div>
             <!--   <div class="card cbp-left-card-main" >
                    <div class="card-header cbp-dhs-toolbar-header">
                      Navigation
                    </div>
                    <ul class="list-group list-group-flush">

                        <li class="list-group-item nav-link" routerLink="home" style="cursor: pointer;">
                            <div class="row pt-1 pb-1">
                                <div class="col-9">
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 18 18">
                                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                                          </svg>
                                        Home</a>
                                </div>
                                <div class="col cbp-left-card-content">
                                     
                                </div>
                            </div>
                        </li> 

                        <li class="list-group-item nav-link"  routerLink="countries" style="cursor: pointer;">
                            <div class="row pt-1 pb-1">
                                <div class="col-9">
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe-americas" viewBox="0 0 18 18">
                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
                                        </svg>
                                      G2G Network Overview</a>
                                </div>
                                <div class="col cbp-left-card-content">
                                
                                </div>
                            </div>
                        </li>
                            
                        <li class="list-group-item nav-link"  routerLink="companies"  style="cursor: pointer;">
                            <div class="row pt-1 pb-1">
                                <div class="col-9">
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 18 18">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                        </svg>
                                        Search Companies</a>
                                </div>
                                <div class="col cbp-left-card-content">
                                     
                                </div>
                            </div>
                        </li>

                        <li class="list-group-item nav-link"  routerLink="mra-requests"  style="cursor: pointer;">
                            <div class="row pt-1 pb-1">
                                <div class="col-9">
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stickies" viewBox="0 0 18 18">
                                            <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1z"/>
                                            <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293z"/>
                                          </svg>
                                        Search MRA Requests</a>
                                </div>
                                <div class="col cbp-left-card-content">
                                     
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item nav-link"  routerLink="placeholder"  style="cursor: pointer;">
                            <div class="row pt-1 pb-1">
                                <div class="col-9">
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stickies" viewBox="0 0 18 18">
                                            <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1z"/>
                                            <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293z"/>
                                          </svg>
                                        Open Company Model</a>
                                </div>
                                <div class="col cbp-left-card-content">
                                     
                                </div>
                            </div>
                        </li>

                        <li class="list-group-item nav-link"  routerLink="addUpdateCompanies" style="cursor: pointer;">
                            <div class="row pt-1 pb-1">
                                <div class="col-9">
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building-fill-gear" viewBox="0 0 18 18">
                                            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-3.59 1.787A.5.5 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.5 4.5 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                                            <path d="M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                                        </svg>
                                        Add/Update Companies</a>
                                </div>
                                <div class="col cbp-left-card-content">
                                     
                                </div>
                            </div>
                        </li> 


                      <li class="list-group-item bg-light">
                        <span class="float-right">
                        </span>

                      </li>
                    </ul>
                  </div>
                -->

                <div class="card mt-3 cbp-left-card-main" *ngIf="currentRoute!=='/main/mra-requests'">
                    <div class="card-header cbp-dhs-toolbar-header">
                        Search Companies
                    </div>
                    <div class="search-parameters-cmpny">
                        <mat-form-field class="search-form-field" >
                            <mat-label>Company Name</mat-label>
                            <input matInput type="text" [(ngModel)]="searchParameters.company">
                        </mat-form-field>
                        <mat-form-field class="search-form-field">
                            <mat-label>TIN</mat-label>
                            <input matInput type="text" [(ngModel)]="searchParameters.tin">
                        </mat-form-field>
                        <mat-form-field class="search-form-field" >
                            <mat-label>MRA Request Statuses</mat-label>
                            <mat-select [formControl]="statusesForm" multiple>
                                <mat-option *ngFor="let mraRequestStatus of MRAList"
                                    [value]="mraRequestStatus.value">{{mraRequestStatus.name}}</mat-option>
                            </mat-select>
                        </mat-form-field>
                        <mat-form-field class="search-form-field">
                            <mat-label>From Country</mat-label>
                            <mat-select [formControl]="countriesForm" multiple>
                                <mat-option *ngFor="let country of mainCountries" [value]="country.code">
                                    <span *ngIf="country.name.length>2" class="flag-input fi fi-{{country.code?.toLowerCase()}}"></span>
                                    {{country.name}}
                                </mat-option>
                            </mat-select>
                        </mat-form-field>
                        <form [formGroup]="updatedDateRangeForm" class="search-form-field">
                            <mat-form-field class="search-form-field-date">
                              <mat-label>Enter the updated date range</mat-label>
                              <mat-date-range-input [rangePicker]="updatedPicker">
                                <input matStartDate formControlName="start" placeholder="Start date">
                                <input matEndDate formControlName="end" placeholder="End date">
                              </mat-date-range-input>
                              <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
                              <mat-datepicker-toggle matIconSuffix [for]="updatedPicker"></mat-datepicker-toggle>
                              <mat-date-range-picker #updatedPicker></mat-date-range-picker>
                            </mat-form-field>
                          </form>
                          <form  [formGroup]="approvedDateRangeForm" class="search-form-field">
                            <mat-form-field class="search-form-field-date">
                              <mat-label>Enter the approved date range</mat-label>
                              <mat-date-range-input [rangePicker]="approvedPicker">
                                <input matStartDate formControlName="start" placeholder="Start date">
                                <input matEndDate formControlName="end" placeholder="End date">
                              </mat-date-range-input>
                              <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
                              <mat-datepicker-toggle matIconSuffix [for]="approvedPicker"></mat-datepicker-toggle>
                              <mat-date-range-picker #approvedPicker></mat-date-range-picker>
                            </mat-form-field>
                          </form>
                        <div class="row px-2 specialStyle">  
                            <div class="col std-btn">
                                <button mat-stroked-button color="basic" class="w-100 mb-2" (click)="clearSearch('company')">Clear</button>
                            </div>
                            <div class="col std-btn">
                                <button mat-raised-button color="primary" class="w-100 mb-2" (click)="startSearch('company')">Search</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="card mt-3 cbp-left-card-main" *ngIf="currentRoute!=='/main/companies'">
                    <div class="card-header cbp-dhs-toolbar-header">
                        Search MRA Requests
                    </div>
                    <div class="search-parameters">
                        <mat-form-field class="search-form-field">
                            <mat-label>MRA Request ID</mat-label>
                            <input matInput type="text" [(ngModel)]="searchParameters.request_id">
                        </mat-form-field>
                        <mat-form-field class="search-form-field">
                            <mat-label>Company Name</mat-label>
                            <input matInput type="text" [(ngModel)]="searchParameters.company">
                        </mat-form-field>
                        <mat-form-field class="search-form-field">
                            <mat-label>MRA Request Statuses</mat-label>
                            <mat-select [formControl]="statusesForm" multiple [panelWidth]="''">
                                <mat-option *ngFor="let mraRequestStatus of MRAList"
                                    [value]="mraRequestStatus.value">{{mraRequestStatus.name}}</mat-option>
                            </mat-select>
                        </mat-form-field>
                        <mat-form-field class="search-form-field">
                            <mat-label>From Country</mat-label>
                            <mat-select [formControl]="countriesForm" multiple [panelWidth]="''">
                                <mat-option *ngFor="let country of mainCountries" [value]="country.code">
                                    <span *ngIf="country.name.length>2"
                                        class="flag-input fi fi-{{country.code.toLowerCase()}}"></span>
                                    {{country.name}}</mat-option>
                            </mat-select>
                        </mat-form-field>
                        <form [formGroup]="updatedDateRangeForm" class="search-form-field">
                            <mat-form-field  class="search-form-field-date">
                              <mat-label>Enter the updated date range</mat-label>
                              <mat-date-range-input [rangePicker]="updatedPicker">
                                <input matStartDate formControlName="start" placeholder="Start date">
                                <input matEndDate formControlName="end" placeholder="End date">
                              </mat-date-range-input>
                              <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
                              <mat-datepicker-toggle matIconSuffix [for]="updatedPicker"></mat-datepicker-toggle>
                              <mat-date-range-picker #updatedPicker></mat-date-range-picker>
                            </mat-form-field>
                          </form>
                          <form [formGroup]="approvedDateRangeForm"  class="search-form-field">
                            <mat-form-field  class="search-form-field-date">
                              <mat-label>Enter the approved date range</mat-label>
                              <mat-date-range-input [rangePicker]="approvedPicker">
                                <input matStartDate formControlName="start" placeholder="Start date">
                                <input matEndDate formControlName="end" placeholder="End date">
                              </mat-date-range-input>
                              <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
                              <mat-datepicker-toggle matIconSuffix [for]="approvedPicker"></mat-datepicker-toggle>
                              <mat-date-range-picker #approvedPicker></mat-date-range-picker>
                            </mat-form-field>
                          </form>
                        <div class="row px-2 specialStyle">  
                            <div class="col std-btn">
                                <button mat-stroked-button color="basic" class="w-100 mb-2" (click)="clearSearch('mra-request')">Clear</button>
                            </div>
                            <div class="col std-btn">
                                <button mat-raised-button color="primary" class="w-100 mb-2" (click)="startSearch('mra-request')">Search</button>
                            </div>
                        </div>
                        <!-- <button mat-button color="primary" class="w-75"
                            (click)="openAdvanceSearchDialogDialog()">Advanced Search</button> -->
                    </div>
                </div>
           
            <!--End of wrapper-->
        </div>
        </div>
        <div class="content-frame" > <!-- [ngClass]="{'col-9' : currentRoute === 'AddUpdateCompanies'}"  -->
           <router-outlet></router-outlet>
            <!--     

            <ng-container *ngIf="currentRoute === 'Companies'">
                <app-company-full-view [searchItems]="searchParameters"></app-company-full-view>
            </ng-container>

            <ng-container *ngIf="currentRoute === 'Countries'">
                    <app-companies-view></app-companies-view>
            </ng-container>
          
            <ng-container *ngIf="currentRoute === 'AddUpdateCompanies'"> 
                <app-add-update-companies-dlg></app-add-update-companies-dlg> 
            </ng-container>

            <ng-container *ngIf="currentRoute === 'userHome'"> 
                <app-home></app-home> 
            </ng-container>
             -->

        </div>

    </div>
</div>

































.search-form-field {
  margin:1em 0.5em 0 0.5em;
  width: 90%;
}
.search-form-field-date {
  width: 100%;
}
.total-frame {
  display: flex;
}
.sidebar-frame {
  flex: 1.5; 
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.5s ease-in-out;
}
.sidebar-header-frame {
  flex: 1; 
  height: 1em;
}
.sidebar-frame.collapse {
  flex: 0; 
}
.sidebar-content {
  flex: 19;
  transition: opacity 0.5s ease-in-out;
}
.sidebar-content.open {
  opacity: 1;
}
.sidebar-content.collapse {
  opacity: 0;
}
.collapse-button {
  flex: 0; 
  float: right;
}
.content-frame {
  flex: 7;
  overflow-x: hidden;
}
.widget-card {
    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
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
    
      .btn-nav-selected {
        background-color: rgba(13, 110, 253, 1);
        color: white !important;
      }
      
      
      .linkactive{
        color: black;
      background-color: rgb(216, 232, 248) !important; 
      }
      .linkactive:hover {
        color: black;
        background-color: rgb(216, 232, 248);
      }
      .linkactive:focus {
        color: black;
        background-color: rgb(216, 232, 248) !important;
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
      color:black !important;
      border-radius: 5px;  
    }
    .navbar-btn-hover:focus {
      background-color: rgb(225, 236, 247);
      color:black !important;
      border-radius: 5px;  
    }
    
    .link-hover:hover {
      background-color: rgb(225, 242, 247);
      border-radius: 5px;  
    }
    
    
    .btn-filter:hover {
       color: rgb(8, 67, 230);
    }
    
    mat-sidenav {
      width: 350px;
    }
    
    .card-hdr-class {
      background: linear-gradient( to right , rgb(236, 238, 240), rgb(255, 255, 255));
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


    .cbp-dhs-toolbar-header {
      background-color: rgb(0,60,100);
      color: white;
      padding-top: 10px;
      font-size: large;
      border-radius: 5px;
    }

    .cbp-left-card-content {
      text-align: end;
    }
    .cbp-left-card-main {
      box-shadow: 0px 0px  3px rgba(142, 153, 163, 0.4); 
      border-color: rgb(142, 153, 163);
    }
    .cbp-left-card-stats {
      background-color: rgb(0, 60, 110);
      color: white;
      border-radius: 5px;
      padding: 5px 7px 5px 7px;
    }

    .cbp-input-ctrl {
        border: 1px solid rgb(148,169,193);
    }

    .nav-link:hover {
      background-color: rgba(0, 60, 110, 0.10);
      color: rgb(0, 60, 110);
      font-weight: bold;
    }

    //companies search params
    .search-parameters-cmpny {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .search-parameters {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .specialStyle {
      margin-top: .5rem;
      margin-bottom: .5rem;
    }
    .card {
      margin-bottom: 1rem;
    }
    .std-btn {
      width: 10rem;
    }
    .hotlist-section {
      padding: 0.25em; 
      font-size: 1em;
      border: 2px solid black;
      border-radius: 3px ;
    }
    .hotlist-section>.header {
      font-weight: 550;
    }
    .hotlist-section>.section {
    }
    .hotlist-section>.section>.section-link {
      font-size: 1.1em;
      font-weight: 550; 
      color: rgb(0, 30, 128);
      white-space: nowrap;
    }
    .hotlist-section>.section>.section-link:hover {
      cursor: pointer; 
      font-weight: 650; 
    }



















    import { Component } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { Task, DB_Country, } from '../dashboard-view/dashboard-view.component';
import { MainAdvanceSearchDlgComponent } from '../main-advance-search-dlg/main-advance-search-dlg.component';
import { AddUpdateCompaniesDlgComponent } from '../add-update-companies-dlg/add-update-companies-dlg.component';
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
		private backendApi: BackendapiService, private router: Router, private fb: FormBuilder, private utils: UtilsService) {

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

}









import { HotlistSearchEntry } from "./main-view-types";

export let hotlistItems : HotlistSearchEntry [] = [
    {
        header: "Quick Search", 
        searches: [
            {
                search: 'company-2', 
                name: 'Search for All Companies'
            }, 
            {
                search: 'mra-request-1', 
                name: 'Search for Pending MRA Requests for the last 24 Hours'
            },
            {
                search: 'mra-request-2', 
                name: 'Search for All MRA Requests'
            }, 
            
        ]
    }
]
