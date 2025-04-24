import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { DB_Country } from './dashboard-view/dashboard-view.component'; 
import { GEO_Coordinate } from './companies-view/companies-view.component'; 
import { MRA_Details } from './company-single-view/company-single-view.component'; 
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { MRARequestCompanyTotalPayload, Pagination } from './mra-request-full-view/mra-request-types';
import { CompanyFilterTotalPayload } from './company-full-view/companies-types';

@Injectable({
  providedIn: 'root'
})
export class BackendapiService {

  endpoint: string = '';
  secret : string = '';

  countries: string = 'countries';
  companiesForACountry: string = 'companiesforonecountry';
  companyDetails: string = 'company';
  companiesByFilter: string = 'getCountryByFilter';
  AEOProfiles: string = 'aeoProfile/all';
  httpHeaders = new HttpHeaders(); 
  tokenFound : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  availableCountries : BehaviorSubject<string []> = new BehaviorSubject<string []> ([]); 
  keycloakToken: string = '';

  constructor( private http: HttpClient) 
  {
      this.endpoint = environment.backendUrl;
      this.keycloakToken = '';
  }


  // setKeycloakToken(token: string) {
  //   console.log('setKeycloakToken setting', token);
  //   if (token && token !== '' && token.length > 12) {
  //     this.keyCloakToken = token;
  //   }
  //   console.log('setKeycloakToken set', this.keyCloakToken);
  // }

  exchangePublicForPrivateToken () {
    return this.http.get(`${this.endpoint}public/token/exchange`);
  }
  getAllCountries(): any {
    //return this.http.get('assets/mockdata/countries_mra.json');
    return this.http.get(this.endpoint + this.countries);
  }
  
  getCompanyDetails(countryName: string, companyName: string)   {
    let options = { params: {country : countryName, company: companyName}, headers: this.httpHeaders};
    // return this.http.get('assets/mockdata/list_of_companies.json', options).pipe(
    //   map((companies: any) => companies.filter((country: any) => country.hostCountry === countryName &&  country.name === companyName)), );
    return this.http.get(this.endpoint + this.companyDetails, options);
  }

  getCompaniesByFilter(filter: any)   {
    let options = { params:  filter};

     //Mock Data
    /*
     const reqMRA = filter.mra ? filter.mra.split(',') : [];
    const reqCountries = filter.countries ? filter.countries.split(',') : ['US']; //remove ['US'] - change to []
    const reqName = filter.name ?? '';
    return this.http.get('assets/mockdata/list_of_companies.json', options).pipe(
      map((companies: any) => {
        let filteredCompanies = companies.filter( (company:any) => {
          const countryMatch = reqCountries.some( (thisCountry: any) =>  thisCountry === company.hostCountry);
          const mraMatch = reqMRA.some( (thisMRA: any) =>  thisMRA === company.mra_status);
          const name = company.name.includes(reqName);
          return countryMatch && mraMatch && name;
        })
        return filteredCompanies; 
      } ));
    */
      return this.http.get(this.endpoint + this.companiesByFilter, options);
  }
  getMraRequestFromSearch  = (payload : MRARequestCompanyTotalPayload, pagination: Pagination) : Observable<any> => {
    return this.http.post(`${this.endpoint}mraRequestCompany/filter`, {searchRequest: payload, pagination: pagination});
  }

  getAEOProfiles(): Observable<any> { 
    //return this.http.get('assets/mockdata/aeoprofile.json');
    return this.http.get( `${this.endpoint}${this.AEOProfiles}`);
  }
  getAEOProfilesDirect(): Observable<any> { 
    return this.http.get(`${this.endpoint}${this.AEOProfiles}`);
  }
  /*
  getCompaniesForACountry(countryName: string) {
    let options = { params: {country : countryName}};
    return this.http.get(this.endpoint + this.companiesForACountry, options);
  }
  */
  
  getCompaniesWithAFilter = (payload : CompanyFilterTotalPayload, pagination: Pagination) => {
    /*
    return this.http.get('assets/mockdata/list_of_companies.json', options).pipe(
      map((companies: any) => companies.filter((country: any) => country.hostCountry === countryName )), );
    */
   // this endpoint should be fixed later to fit with the params a bit better
   return this.http.post(`${this.endpoint}company/filter`, {searchRequest: payload, pagination: pagination});
  }

  getLatLonAPI(address: string) { 
    //let options = { params: {country :'AU'}};
    return this.http.get('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + address );
  }

  

  getSavedKeyCloakToken():  string  {
    return this.keycloakToken;
  }
}
