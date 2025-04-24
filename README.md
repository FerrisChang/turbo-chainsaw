import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { MRARequestCompanyTotalPayload, Pagination } from './mra-request-full-view/mra-request-types';
import { CompanyFilterTotalPayload } from './company-full-view/companies-types';

@Injectable({
  providedIn: 'root'
})
export class BackendapiService {
  private endpoint: string = '';
  private secret: string = '';
  private keycloakToken: string = '';

  // API endpoints
  private readonly countries = 'countries';
  private readonly companiesForACountry = 'companiesforonecountry';
  private readonly companyDetails = 'company';
  private readonly companiesByFilter = 'getCountryByFilter';
  private readonly AEOProfiles = 'aeoProfile/all';

  // HTTP headers
  private httpHeaders = new HttpHeaders();
  
  // Behavior subjects
  private tokenFound = new BehaviorSubject<boolean>(false);
  private availableCountries = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    this.endpoint = environment.backendUrl;
    this.keycloakToken = '';
  }

  // Token management
  getSavedKeyCloakToken(): string {
    return this.keycloakToken;
  }

  // API calls
  exchangePublicForPrivateToken(): Observable<any> {
    return this.http.get(`${this.endpoint}public/token/exchange`);
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`${this.endpoint}${this.countries}`);
  }

  getCompanyDetails(countryName: string, companyName: string): Observable<any> {
    const options = {
      params: { country: countryName, company: companyName },
      headers: this.httpHeaders
    };
    return this.http.get(`${this.endpoint}${this.companyDetails}`, options);
  }

  getCompaniesByFilter(filter: any): Observable<any> {
    const options = {
      params: new HttpParams({ fromObject: filter })
    };
    return this.http.get(`${this.endpoint}${this.companiesByFilter}`, options);
  }

  getMraRequestFromSearch(payload: MRARequestCompanyTotalPayload, pagination: Pagination): Observable<any> {
    return this.http.post(`${this.endpoint}mraRequestCompany/filter`, {
      searchRequest: payload,
      pagination: pagination
    });
  }

  getAEOProfiles(): Observable<any> {
    return this.http.get(`${this.endpoint}${this.AEOProfiles}`);
  }

  getAEOProfilesDirect(): Observable<any> {
    return this.http.get(`${this.endpoint}${this.AEOProfiles}`);
  }

  getCompaniesWithAFilter(payload: CompanyFilterTotalPayload, pagination: Pagination): Observable<any> {
    return this.http.post(`${this.endpoint}company/filter`, {
      searchRequest: payload,
      pagination: pagination
    });
  }

  getLatLonAPI(address: string): Observable<any> {
    return this.http.get(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${address}`);
  }
}
