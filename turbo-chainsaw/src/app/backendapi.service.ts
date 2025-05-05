import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { DB_Country } from './dashboard-view/dashboard-view.component'; 
import { GEO_Coordinate } from './companies-view/companies-view.component'; 
import { MRA_Details } from './company-single-view/company-single-view.component'; 
import { BehaviorSubject, filter, map, Observable, catchError } from 'rxjs';
import { MRARequestCompanyTotalPayload, Pagination } from './mra-request-full-view/mra-request-types';
import { CompanyFilterTotalPayload } from './company-full-view/companies-types';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class BackendapiService {

  endpoint: string = '';
  secret : string = '';

  countries: string = 'countries';
  companiesForACountry: string = 'companiesforonecountry';
  companyDetails: string = 'company';
  companiesByFilter: string = 'company/filter';
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

  getCompaniesByFilter(filter: any) {
    // Log the request details for debugging
    console.log('Sending request to:', `${this.endpoint}${this.companiesByFilter}`);
    console.log('Filter payload:', filter);

    // Send filter object directly in request body
    return this.http.post(`${this.endpoint}${this.companiesByFilter}`, filter).pipe(
      map(response => {
        console.log('Response:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error in getCompaniesByFilter:', error);
        throw error;
      })
    );
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


  
  getCompaniesWithAFilter (payload : CompanyFilterTotalPayload, pagination: Pagination) : Observable<any> {
   try { // Create a flat object for query parameters

    const queryParams: { [key: string]: string } = {
      totalNumberOfElements : pagination.totalNumberOfElements.toString(),
      currentPage : pagination.currentPage.toString(),
      totalPages : pagination.totalPages.toString()
     }
    console.log('Initial payload:', payload);
    console.log('Initial pagination:', pagination);
  
    // Add all company filter parameters if they exist
    if (payload.cmpny) {
      console.log('Processing company parameters:', payload.cmpny);
      Object.entries(payload.cmpny).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Convert camelCase to snake_case for API parameters
          const paramKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
          queryParams[paramKey] = value.toString();
          console.log(`Added company parameter: ${paramKey} = ${value}`);
        }
      });
    }
  
    // Add all location filter parameters if they exist
    if (payload.cmpnyLoc) {
      console.log('Processing location parameters:', payload.cmpnyLoc);
      Object.entries(payload.cmpnyLoc).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Convert camelCase to snake_case for API parameters
          const paramKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
          queryParams[paramKey] = value.toString();
          console.log(`Added location parameter: ${paramKey} = ${value}`);
        }
      });
    }
  
    console.log('Final query parameters:', queryParams);
  
    const options = {
      params: new HttpParams({ fromObject: queryParams }),
      headers: this.httpHeaders
    };
  
    console.log('Request URL:', `${this.endpoint}${this.companiesByFilter}`);
    console.log('Request options:', options);
  
    return new Observable(observer => {
      this.http.post(`${this.endpoint}${this.companiesByFilter}`, options).subscribe({
        next: (response) => {
          console.log('API Resopons:', response);
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          console.error('API Error:', error);
          console.error('Error details:', {
            status: error.status,
            statusText: error.statusText,
            message: error.message,
            url: error.url,
            params: queryParams
          });
          observer.error(error);
        }
      });
    });
  } catch (error) {
    console.log('Error in getCompaniesByFilter:', error);
    throw error;
  }
}
  getLatLonAPI(address: string) { 
    //let options = { params: {country :'AU'}};
    return this.http.get('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + address );
  }

  

  getSavedKeyCloakToken():  string  {
    return this.keycloakToken;
  }
}
