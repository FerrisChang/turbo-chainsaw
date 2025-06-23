      <mat-tab label="Logistics Analytics">
          <div class="container-fluid entity-tab">
              <div class="row pt-3">
                  <div class="col-6">
                      <h2>
                          MRA Companies Approval Status
                      </h2>
                      <ngx-charts-pie-chart [view]="view" [results]="mraApprovalData" [gradient]="gradient"
                          [legend]="showLegend" [labels]="showLabels" [doughnut]="isDoughnut"
                          [scheme]="colorScheme" (select)="onSelect($event)">
                      </ngx-charts-pie-chart>
                  </div>
                  <div class="col-6">
                      <h2>
                          MRA Companies by Country
                      </h2>
                      <ngx-charts-bar-vertical [view]="view" [results]="mraCountryData" [gradient]="gradient"
                          [xAxis]="showXAxis" [yAxis]="showYAxis" [legend]="showLegend"
                          [showXAxisLabel]="showXAxisLabel" [showYAxisLabel]="showYAxisLabel"
                          [xAxisLabel]="'Country'" [yAxisLabel]="'Number of Companies'" (select)="onSelect($event)">
                      </ngx-charts-bar-vertical>
                  </div>
              </div>
          </div>
      </mat-tab>




      import { Component, Input, OnInit, OnChanges, } from '@angular/core';
import { BackendapiService } from '../backendapi.service';
import { CompanyLocation, CompanyOnMapView } from '../company-full-view/companies-types';
import { MRARequest, MRARequestCompany, MRARequestCompanyLocation, MRARequestCompanyTableOutput } from '../mra-request-full-view/mra-request-types';
import { MRAList } from '../mra-request-full-view/mra-request-full-view.component';
import { UtilsService } from '../services/utils.service';
import { AeoProfile } from '../companies-view/aeo-profile-types';


export interface MRA_Details {
  hostCountry: string;
  AEOAccountNumber: string;

  officerFirstName: string;
  officerLastName: string;

  AEODCSN: string;
  AEODCSNType: string;
  AEODCSNDate: string;
  
  DCSNBasedOnIDType: string;
  DCSNBasedOnIDNumber: string;

  countryCompanyID: string;
  countryCompanyIDType: string;

  companyAddress: string;
}

const single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
  {
    "name": "UK",
    "value": 5200000
  },
  {
    "name": "Italy",
    "value": 7700000
  },
  {
    "name": "Spain",
    "value": 4300000
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


const mult_polar = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "1990",
        "value": 62000000
      },
      {
        "name": "2010",
        "value": 73000000
      },
      {
        "name": "2011",
        "value": 89400000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "1990",
        "value": 250000000
      },
      {
        "name": "2010",
        "value": 309000000
      },
      {
        "name": "2011",
        "value": 311000000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "1990",
        "value": 58000000
      },
      {
        "name": "2010",
        "value": 50000020
      },
      {
        "name": "2011",
        "value": 58000000
      }
    ]
  },
  {
    "name": "UK",
    "series": [
      {
        "name": "1990",
        "value": 57000000
      },
      {
        "name": "2010",
        "value": 62000000
      },
      {
        "name": "2011",
        "value": 72000000
      }
    ]
  }
];

const bubbleData =  [
  {
    name: 'Germany',
    series: [
      {
        name: '2010',
        x: '2010',
        y: 80.3,
        r: 80.4
      },
      {
        name: '2000',
        x: '2000',
        y: 80.3,
        r: 78
      },
      {
        name: '1990',
        x: '1990',
        y: 75.4,
        r: 79
      }
    ]
  },
  {
    name: 'United States',
    series: [
      {
        name: '2010',
        x: '2010',
        y: 78.8,
        r: 310
      },
      {
        name: '2000',
        x: '2000',
        y: 76.9,
        r: 283
      },
      {
        name: '1990',
        x: '1990',
        y: 75.4,
        r: 253
      }
    ]
  },
  {
    name: 'France',
    series: [
      {
        name: '2010',
        x: '2010',
        y: 81.4,
        r: 63
      },
      {
        name: '2000',
        x: '2000',
        y: 79.1,
        r: 59.4
      },
      {
        name: '1990',
        x: '1990',
        y: 77.2,
        r: 56.9
      }
    ]
  },
  {
    name: 'United Kingdom',
    series: [
      {
        name: '2010',
        x: '2010',
        y: 80.2,
        r: 62.7
      },
      {
        name: '2000',
        x: '2000',
        y: 77.8,
        r: 58.9
      },
      {
        name: '1990',
        x: '1990',
        y: 75.7,
        r: 57.1
      }
    ]
  }
];

export type CompanyModalLocation = {
  addrLne1: string, 
  addrLne2 : string, 
  city: string, 
  stOrProvince: string, 
  cntryCd: string,
  isPrmryLoc: boolean
}

@Component({
  selector: 'app-company-single-view',
  templateUrl: './company-single-view.component.html',
  styleUrls: ['./company-single-view.component.scss']
})
export class CompanySingleViewComponent implements  OnInit, OnChanges{

    hostCountry: string = "";
    companyMRADetails: MRA_Details[] = [];
    companyBasicInfo:any = [];
    infoPresent = false;

    @Input() company?: CompanyOnMapView;
    @Input() mraRequestCompany? : MRARequestCompanyTableOutput; 
    @Input() companyName : string = "";
    @Input() countryName : string = "";
    mraRequest? : MRARequest;  
    locations : CompanyModalLocation [] = []; 
    locationHeaders: string [] = ['type','addrLine1', 'addrLine2', 'city', 'state', 'country', 'primary']
    mraRequestStatus : any = {
      status: '', 
      class: ''
    }   
    mraCompanies: CompanyOnMapView[] = []
    multi!: any[];
    single!: any[];
    mult_polar!: any[];
    bubbleData!: any[];
    
    // New chart data for MRA approval status
    mraApprovalData: any[] = [];
    mraCountryData: any[] = [];
    
    view: [number, number] = [500, 400];
    view2: [number, number] = [1200, 400];

    colorScheme = {
      domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };
    cardColor: string = '#232837';
   
   

    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
   
   

    onSelect(data: any): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }


    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;  
    legendPosition: string = 'below';
    showXAxisLabel: boolean = true;
    yAxisLabel: string = 'Country';
    showYAxisLabel: boolean = true;
    xAxisLabel = 'Population';
    xAxis: boolean = true;
    yAxis: boolean = true;
    legend: boolean = true;
    maxRadius: number = 20;
    minRadius: number = 5;
    yScaleMin: number = 70;
    yScaleMax: number = 85;
   
    animations: boolean = true;
    schemeType: string = 'linear';

    labelFormatting(c: any) {
      return `${(c.label)}`;
    }
    /*
    onActivate(data: any): void {
      console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data: any): void {
      console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
    */

      constructor( 
        private backendApi: BackendapiService,
        private utils: UtilsService
      ) {  
        Object.assign(this, { single });
        Object.assign(this, { multi });
        Object.assign(this, { mult_polar });
        Object.assign(this, { bubbleData });

      }
    
    ngOnChanges() {
      console.log('ngOnChange');
      this.processCompany();
      
      // Process MRA companies data when input changes
      if (this.mraCompanies && this.mraCompanies.length > 0) {
        this.processMRACompaniesData();
      }
    }
    
    ngOnInit()    {
      this.processCompany();
      this.processMRACompaniesData();
    }
    convertCodeToCountry (code : string) {
      return this.utils.translateCodeToCountry(code); 
    }

    // get company 'Approval status' from Aeoprofile 
    getCompanyProfile(getStatus: CompanyOnMapView) {
      this.company = getStatus;
      this.processCompany();
    }

    processCompany() {
      this.infoPresent = true;
      // switches between mra request and mra request company
      if (this.company) {
        this.companyBasicInfo = {
          companyAddress: this.company?.companyAddress || '',
          containers: this.company?.containers || 0,
          hostCountry: this.company?.hostCountry || '',
          mra_status: this.company?.mra_status,
          lastUpdated: this.company.lastUpdated,
          name: this.company?.name || '',
          monetary_value: this.company?.monetaryValue || 0,
           //destination: countryData.destination,
          //origin: countryData.origin,
          //type: countryData.type,
        };
        this.locations = this.company.company.cmpnyLocList;
      }
      else if (this.mraRequestCompany) {
        this.companyBasicInfo = {
          companyAddress: this.mraRequestCompany?.mainAddress || '',
          containers: this.mraRequestCompany?.containers || 0,
          hostCountry: this.mraRequestCompany?.country,
          mra_status: this.mraRequestCompany?.status,
          lastUpdated: this.mraRequestCompany.request.mraRqstCmpny.apprvlStusDttm,
          name: this.mraRequestCompany?.company_name || '',
          monetary_value: this.mraRequestCompany?.monetaryValue || 0,
        }
        this.mraRequest = this.mraRequestCompany.request.mraRqst;
        this.mraRequestStatus = MRAList.find((mra)=>{
          return mra.value === this.mraRequest?.wrkflwStus
        }) || this.mraRequestStatus;
        console.log("MRA Request Being Opened: ", this.mraRequest);
        this.locations = this.mraRequestCompany.request.mraRqstCmpny.mraRqstCmpnyLocList;
      }
     
      this.hostCountry =  this.companyBasicInfo.hostCountry;
      
      // Process MRA companies data for charts
      this.processMRACompaniesData();
    }

    // Process MRA companies data for charts
    processMRACompaniesData() {
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
      }
    }

    expandedCompanyinTable = '';
    selectCompaniesRow(company: string) {
      console.log(company);
      if (this.expandedCompanyinTable === company)
        this.expandedCompanyinTable = '';
      else
        this.expandedCompanyinTable = company;
    }

    collapsableSections: any = {
      'companyInfo': true,
      'businessInfo': true,
      'locations': true,
      'contactUsers': true,
      'companymra': true,
      'mraRequest': true, 
    }

    collapseSection(section: string) {
      if(this.collapsableSections[section] !== undefined) {
        this.collapsableSections[section] = !this.collapsableSections[section];
      }
    }
}
