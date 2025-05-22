import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Company, CompanyLocation, CompanyOnMapView } from 'src/app/company-full-view/companies-types';
import { MRAList } from 'src/app/mra-request-full-view/mra-request-full-view.component';
import { sampleCompany } from './models/companies';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CompanyMraDlgComponent } from 'src/app/company-mra-dlg/company-mra-dlg.component';
import { ViewLocationComponent } from 'src/app/utils/view-location/view-location.component';
import { UtilsService } from 'src/app/services/utils.service';

export type CompanyTableFilter = {
  address: any;
  name: string,
  status: string[],
  country: string,
  company_id: string
  tin: string
}

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss']
})
export class CompaniesTableComponent implements OnChanges {
  @Input() companies: CompanyOnMapView[] = sampleCompany
  @Input() headers: string[] = ['index', 'name', 'country', 'company_id', 'status'];
  @Input() filters: string[] = ['index', 'name', 'country', 'company_id', 'status', 'tin'];
  MRAList = MRAList;
  filter: CompanyTableFilter = {
    name: '',
    country: '',
    company_id: '',
    tin: '',
    address: '',
    status: []
  }
  statusesForm: FormControl = new FormControl([]);
  selected: number[] = []
  filteredCompanies: CompanyOnMapView[] = this.companies;
  modal!: MatDialogRef<CompanyMraDlgComponent>;

  constructor(public dialogModel: MatDialog,
    private utils: UtilsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['companies']) {
      console.log('Companies input changed:', this.companies);
      this.filteredCompanies = [...this.companies];
      this.applyFilters();
    }
  }

  private applyFilters() {
    if (!this.companies) return;
    
    this.filteredCompanies = this.companies.filter((company: CompanyOnMapView) => {
      let statusList = this.filter.status.filter((companyStatus) => {
        return companyStatus.includes(company.mra_status.value)
      });
      
      let allFilterConditions: boolean[] = [
        company.name.toLowerCase().includes(this.filter.name.toLowerCase()),
        company.hostCountry.toLowerCase().includes(this.filter.country.toLowerCase()),
        company.companyAddress.toLowerCase().includes(this.filter.address.toLowerCase()),
        company.companyID.id.toLowerCase().includes(this.filter.company_id.toLowerCase()),
        statusList.length > 0 || this.filter.status.length === 0,
        company.tin.toLowerCase().includes(this.filter.tin.toLowerCase()),
      ];
      
      return allFilterConditions.every(condition => condition);
    });
  }

  createAddress(location : CompanyLocation ) {
    return this.utils.convertLocationConversion(location, 'company');
  }

  openModal(company: Company) {
    this.modal = this.dialogModel.open(CompanyMraDlgComponent, {
      height: '80%',
      width: '75%',
      data: { company: company }
    });
    this.modal.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addressModal!: MatDialogRef<ViewLocationComponent>;
  openAddressModal(company: CompanyOnMapView, location: CompanyLocation) {
    this.addressModal = this.dialogModel.open(ViewLocationComponent, {
      width: '75%',
      height: '75%',
      data: {
        name: company.name,
        country: company.hostCountry,
        address: this.utils.convertLocationConversion(location, 'company'),
        locationFound: false,
        location: [0, 0]
      }
    })
  }
  ngOnInit() {
    console.log("Companies being added for the first time: ", this.companies)
    this.filteredCompanies = this.companies;
    this.statusesForm.valueChanges.subscribe((status) => {
      this.filter.status = status;
      this.filterUpdate('status', status)
    })
  }
  toggleRow = (id: number) => {
    let selectedIndex = this.selected.indexOf(id);
    if (selectedIndex >= 0) {
      this.selected.splice(selectedIndex, 1);
    }
    else {
      this.selected.push(id);
    }
  }
  rowExpanded = (id: number) => {
    return this.selected.includes(id);
  }
  getThisCountryNameFromISO = (countryCode: string) => {
    return this.utils.translateCodeToCountry(countryCode);
  }
  filterConditions: string[] = ['name', 'country', 'address', 'company_id', 'status', 'tin']
  filterUpdate = (filterType: string, filter: string | string[]) => {
    this.filter[filterType as keyof CompanyTableFilter] = filter as any;
    this.applyFilters();
  }
}
