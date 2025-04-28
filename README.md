
<div class="container-fluid  "  >   
  <h1 class="  px-4 pt-4 pb-2 " style="border-bottom: 2px solid rgba(0, 60, 110, 0.15);">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search" viewBox="0 0 18 18">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
      </svg>
      Search Companies
  </h1>
</div>  


<div class="row mx-4 pb-3">
  G2G Network Web Portal provides extensive search capabilities and allows you to search for any company in our records. Ferrus
</div> 

<div class="input-container pb-3">
  <!-- First Row -->
  <div class="row mb-4" style="text-align: center;">
    <div class="col-3 text-center">
      <mat-form-field class="search-form-field" style="width: 250px;">
        <mat-label>Company Name</mat-label>
        <input matInput type="text" [(ngModel)]="searchItems.companyName">
        <ng-container *ngIf="searchItems.companyName">
          <button matSuffix mat-icon-button aria-label="Clear" (click)="searchItems.companyName=''" style="position: fixed; right: 0px; top: 5px;">
            <mat-icon>close</mat-icon>
          </button>
        </ng-container>
      </mat-form-field>
    </div>

    <div class="col-3 text-center">
      <div class="dropdown">
        <button type="button" style="width: 250px; height: 55px;" class="btn btn-light dropdown-toggle btn-filter" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 18 18">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
            <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
          </svg>
          Company Status
        </button>
        <form class="dropdown-menu p-4" style="box-shadow: 4px 4px 8px rgba(199, 199, 199, 0.514); width: 260px;">
          <h4>Select MRA Status</h4>
          <section>
            <span>
              <mat-checkbox [checked]="allMRAComplete" [color]="MRAList.color" [indeterminate]="someCompleteMRA()" (change)="setAllMRA($event.checked)">
                {{MRAList.name}}
              </mat-checkbox>
            </span>
            <span>
              <ul>
                <span *ngFor="let country of MRAList.list">
                  <mat-checkbox [ngModelOptions]="{standalone: true}" [(ngModel)]="country.selected" [color]="country.color" (ngModelChange)="updateAllCompleteMRA()">
                    {{country.name}}
                  </mat-checkbox>
                  <br>
                </span>
              </ul>
            </span>
          </section>
        </form>
      </div>
    </div>

    <div class="col-3 text-center">
      <div class="dropdown">
        <button type="button" style="width: 250px; height: 55px;" class="btn btn-light dropdown-toggle btn-filter" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-globe-americas navbar-svg-icon" viewBox="0 0 18 18">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
          </svg>
          Countries
        </button>
        <form class="dropdown-menu p-4" style="box-shadow: 4px 4px 8px rgba(199, 199, 199, 0.514); width: 200px;">
          <h4>Select Countries</h4>
          <section class="example-section">
            <span class="example-list-section">
              <mat-checkbox class="example-margin" [checked]="allComplete" [color]="mainCountries.color" [indeterminate]="someComplete()" (change)="setAll($event.checked)">
                {{mainCountries.name}}
              </mat-checkbox>
            </span>
            <span class="example-list-section">
              <ul>
                <span *ngFor="let country of mainCountries.list">
                  <mat-checkbox [ngModelOptions]="{standalone: true}" [(ngModel)]="country.selected" [color]="country.color" (ngModelChange)="updateAllComplete()">
                    {{country.name}}
                  </mat-checkbox>
                  <br>
                </span>
              </ul>
            </span>
          </section>
        </form>
      </div>
    </div>
  </div>

  <!-- Second Row -->
  <div class="row" style="text-align: center;">
    <div class="col-3 text-center">
      <mat-form-field class="search-form-field" style="width: 250px;">
        <mat-label>TIN</mat-label>
        <input matInput type="text" [(ngModel)]="searchItems.companyName">
        <ng-container *ngIf="searchItems.companyName">
          <button matSuffix mat-icon-button aria-label="Clear" (click)="searchItems.companyName=''" style="position: fixed; right: 0px; top: 5px;">
            <mat-icon>close</mat-icon>
          </button>
        </ng-container>
      </mat-form-field>
    </div>

    <div class="col-3 text-center">
      <mat-form-field class="search-form-field" style="width: 250px;">
        <mat-label>Date</mat-label>
        <input matInput type="date" [(ngModel)]="searchItems.companyName">
        <ng-container *ngIf="searchItems.companyName">
          <button matSuffix mat-icon-button aria-label="Clear" (click)="searchItems.companyName=''" style="position: fixed; right: 0px; top: 5px;">
            <mat-icon>close</mat-icon>
          </button>
        </ng-container>
      </mat-form-field>
    </div>

    <div class="col-3 text-center">
      <button mat-raised-button color="primary" style="height: 55px; width: 250px;" (click)="startSearch()">Search</button>
    </div>
  </div>
</div>







<div class="container-fluid"  style="  position: relative;  " >                
  <div class="row">
      <div class="col ">
          <div class="card widget-card">
              <div class="card-header card-hdr-class">
                  <div class="row">
                      <div class="col">
                          <h4 class="card-title mb-1 pt-1" >Search Results</h4> 
                      </div>
                      <div class="col-1 float-right">                                            
                          <button  class="btn btn-sm px-2 pt-1 pb-1 mb-0 mt-0  " [matMenuTriggerFor]="menu">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                              </svg>
                              </button>
                              <mat-menu #menu="matMenu">
                                  <button mat-menu-item>Export</button>
                                  <button mat-menu-item>Filter</button>
                              </mat-menu>
                      </div>
                  </div> 
              </div>
              <div class="card-body px-0 pt-0 pb-0 " >                       
                  <table class="table table-hover">
                      <thead>
                          <tr style="height: 50px;">
                              

                              <th scope="col">#</th>
                              <th scope="col">Country</th>
                              <th scope="col">Company Name</th>

                              <th scope="col">G2G ID</th>
                              <th scope="col">Current Company Status</th>
                              <th scope="col">Approval Status Date Time</th> 

                              <th scope="col">Last Updated</th>
                          </tr>
                      </thead>
                      <tbody>
                          <ng-container *ngFor="let company of companiesList; index as i"> 
                              <tr (click)="selectCompaniesRow(company.name)" [ngClass]="expandedCompanyinTable === company.name ? 'bg-light' :'bg-white'"  >
                                  <th scope="row">{{ i + 1 }}</th>
                                  <td> 
                                      <p>{{getThisCountryNameFromISO(company.country)}}</p>
                                  </td>
                                  <td> 
                                      <p>{{company.name}}</p>
                                  </td>
                                  <td>-</td> 
                                  <td>-</td> 
                                  <td>-</td> 
                                  <td>{{company.type}}</td> 
                                  <td ><button type="button" class="btn btn-sm" style="width: 120px;" [ngClass]="company.mra_status ==='Approved' ? 'btn-success' : company.mra_status ==='Rejected' ? 'btn-danger' : company.mra_status ==='In Progress' ? 'btn-warning' : 'black'" >{{company.mra_status}} </button></td>
                              </tr>
                              <tr  *ngIf="expandedCompanyinTable == company.name" style="background-color:rgb(218, 218, 218) !important;  ">                                            
                                  <td colspan="8"  style="background-color:rgb(244, 244, 244) !important; height: 200px;">
                                      <p  (click)="showCompanyView(company.country, company.name)" style="cursor: pointer;"><b>Click here to view Company Details for {{expandedCompanyinTable}}</b></p>
                                      <div class="row">
                                          <div class="col-7 px-4 mx-2">
                                              <h4>Information about this Company</h4>
                                              <p>Number of Containers: <b>{{company.containers}}</b></p>
                                              <p>Monetary Value: <b>{{company.monetaryValue}}</b></p>
                                              <!-- <p>Orign: <b>{{company.origin}}</b></p>
                                              <p>Destination: <b>{{company.destination}}</b></p> -->
                                          </div>
                                          <div class="col">
                                              <p>Information about MRA Status</p>
                                              <p>Status: <b>{{company.mra_status}}</b></p>
                                          </div>
                                      </div>
                                  </td>
                              </tr>
                      </ng-container>
                      </tbody>
                  </table>
              </div>
              
              <div class="card-footer">
                  <mat-paginator style="background-color: rgba(0,0,0,0);"
                      [length]="pageTotalLength" 
                      [pageSize]="pageSize"
                      [pageSizeOptions]="[15, 25, 50]"
                      (page)="tablePageChange($event)"
                      aria-label="Select page">
                  </mat-paginator>
              </div>
          </div>
      </div>
  </div>
</div>




<ng-container *ngIf="countryName !== '' && companyName !=='' ">
  
      <div class="container-fluid mt-3 pt-4 px-4" style="position:relative;  ">
          <div class="row card widget-card"> 
              <div class="card-header card-hdr-class">
                  <div class="row">
                      <div class="col">
                          <h1   >Company Details for: {{companyName}}</h1>
                      </div>
                      <div class="col-2">
                          <button class="float-right text-white" mat-button (click)="closeCompanyView()" style="position: relative; bottom: 0px;">Close</button>
                      </div>
                  </div>
              </div>
          <div class="row pt-3 mx-1 px-3"  >
              <app-company-single-view [countryName]="countryName" [companyName]="companyName"></app-company-single-view>
          </div>
      </div>
  </div>
</ng-container>


#map {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height:  460px;
}
.input-container {
  margin: 2em;
  padding: 1em;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
    transition: all 0.3s ease;
    
    &:hover {
      color: rgb(8, 67, 230);
      transform: translateY(-1px);
      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.15);
    }
  }
  
  .navbar-btn-hover:hover {
    background-color: rgb(225, 236, 247);
    border-radius: 5px;
    
  }
  
  .dropdown-menu {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
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

  .search-form-field {
    width: 250px;
    margin: 0 auto;
  }

