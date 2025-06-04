import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import {
  QueryBtnType,
  QueryType,
  queryTypeFormControls,
  queryTypeLabel,
  queryTypeTitle,
} from './query-type';
import { getFormGroup } from './get-form-group';
import { getPayload } from './get-payload';
import { MockResponseService } from '../../services/mock-response.service';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrl: './query-form.component.scss',
})
export class QueryFormComponent implements OnInit {
  private cargoDevApiUrl = environment.CARGO_DEV_API_URL;
  private aceAPIUrl = environment.ACE_API_URL;
  form!: FormGroup;
  queryType: QueryType = 'hts';
  formLabel: string = 'HTS Query';
  customFieldLabel: string = 'Custom Field';
  showHTSResponseSection = false;
  showAPIResponseSection = false;
  htsJSONResponse: string = '';
  apiJSONResponse: string = '';
  invalidJSON: boolean = false;
  error?: string;
  title = '';
  
  // define the query type-specific buttons
  queryTypeButtons: QueryBtnType[] = Object.keys(queryTypeLabel).map((type) => {
    return {
      type,
      label: queryTypeLabel[type as QueryType],
    };
  }) as QueryBtnType[];

  // add the form controls
  queryTypeFormControls = queryTypeFormControls;

  queryTypeTitle = queryTypeTitle;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private mockResponseService: MockResponseService
  ) {
    this.cargoDevApiUrl = environment.CARGO_DEV_API_URL;
    this.aceAPIUrl = environment.ACE_API_URL;
  }

  ngOnInit(): void {
    this.initForm();
    //adding saved fields to form
 
  }
  private initForm(): void {
    this.updateForm();
  }

  switchForm(type: QueryType): void {
    this.queryType = type;
    this.formLabel = queryTypeLabel[type];
    this.customFieldLabel = type === 'hts' ? 'Custom Field' : 'Port Code';
    this.updateForm();
    this.resetState();
  }

  private updateForm(): void {
    // required fields are type-specific
    this.form = getFormGroup(this.queryType, this.fb);
    const selectedQueryType = queryTypeFormControls[this.queryType]||[];
    const formControls:Record<string,any> ={};
    selectedQueryType.forEach((field)=>{
      if(field.type==='select'&& field.options &&field.options.length >0){
        
        formControls[field.formControlName] = [field.options[0].value];
      }else{
        formControls[field.formControlName]=[''];
      }
     
    });
    
    this.form = this.fb.group(formControls);
    //load from local storage
    const savedProcessingPortCode = localStorage.getItem('processingPortCode');
    const savedPreparerPortCode = localStorage.getItem('preparerPortCode');
    const savedSenderReceiverIDCode = localStorage.getItem('senderReceiverIDCode');
    const saveSenderReceiverSiteCode = localStorage.getItem('senderReceiverSiteCode');
    if(savedProcessingPortCode&&this.form.get('processing-port-code')){this.form.get('processing-port-code')!.setValue(savedProcessingPortCode);}
    if(savedPreparerPortCode&&this.form.get('preparer-port-code')){this.form.get('preparer-port-code')!.setValue(savedPreparerPortCode);}
    if(savedSenderReceiverIDCode&&this.form.get('senderReceiverIDCode')){this.form.get('senderReceiverIDCode')!.setValue(savedSenderReceiverIDCode);}
    if(saveSenderReceiverSiteCode&&this.form.get('senderReceiverSiteCode')){this.form.get('senderReceiverSiteCode')!.setValue(saveSenderReceiverSiteCode);}
  }

  isFieldInvalid(fieldId: string): boolean {
    const field = this.form.get(fieldId);
    return !!(field?.invalid && field?.touched);
  }
  isFileField(controlId: string): boolean {
    return controlId.includes('fileName')||controlId.includes('fileExt');

  }
  //add your side by side input pairing here.
  sideBySidePairs:[string,string][] =[
    ['processing-port-code','preparer-port-code'],
    ['senderReceiverIDCode','senderReceiverSiteCode'],
    ['portCodes','govermentCodes'],['transactionType','documentLabelCode'],
    ['cargoTransactionUUID','submittedToPortCode'],['transactionName','transactionNumber'],
    ['transmissionDate','documentSentDate'],['actionCode','document-id']

  ];

  isFirstInSideBySidePair(controlId:string):boolean{ 
    return this.sideBySidePairs.some(pair => pair[0]===controlId);
  }
  getSecondInPair(controlId:string):string | null{ 
    const pair = this.sideBySidePairs.find(pair => pair[0] === controlId);
    return pair ? pair[1] : null;
   
  }

  formatDateToISO(date:Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth()+1).padStart(2,'0');
    const day = String(date.getUTCDate()).padStart(2,'0');
    const hours = String(date.getUTCHours()).padStart(2,'0');
    const minutes = String(date.getUTCMinutes()).padStart(2,'0');
    const seconds = String(date.getUTCSeconds()).padStart(2,'0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.0Z`;

  }

  //update to save to local storage
  saveToLocalStorage():void{
    const processingPortCode = this.form.get('processing-port-code')?.value;
    const preparerPortCode = this.form.get('preparer-port-code')?.value; 
    const senderReceiverIDCode = this.form.get('senderReceiverIDCode')?.value;
    const senderReceiverSiteCode = this.form.get('senderReceiverSiteCode')?.value;

    if((processingPortCode && preparerPortCode)||( senderReceiverIDCode && senderReceiverSiteCode)){
      localStorage.setItem('processingPortCode',processingPortCode);
      localStorage.setItem('preparerPortCode',preparerPortCode);
      localStorage.setItem('senderReceiverIDCode', senderReceiverIDCode);
      localStorage.setItem('senderReceiverSiteCode',senderReceiverSiteCode);
    } 
  }

  onSubmit(): void {
    console.log("json in form: ", getPayload(this.queryType, this.form))
    //save port codes to to local storage
    this.saveToLocalStorage();
    this.error = '';
    // shape of payload is type-specific
    if (this.form.valid) {
      console.log('form is valid');

      const payload: {[key:string]:any} = getPayload(this.queryType, this.form);
      
      //find date 
      for(const key in payload){
        if(payload.hasOwnProperty(key)){
          const value = payload[key];
          if(typeof value === 'string'&& /^\d{4}-\d{2}-\d{2}$/.test(value)){
            const date = new Date(value);
            const formattedDate = this.formatDateToISO(date);
            payload[key]=formattedDate;
          }
        }
      }

      // New implementation using mock service
      this.mockResponseService.getMockResponse(payload).subscribe(
        (response: any) => {
          console.log('mock response: ', response);
          this.htsJSONResponse = JSON.stringify(response, null, 2);
          this.showHTSResponseSection = true;
          this.showAPIResponseSection = false;
        },
        (error: any) => {
          console.error('Error generating JSON:', error);
          this.error = error.message ?? error;
        }
      );

      /* Old HTTP implementation
      this.http
        .post(
          this.cargoDevApiUrl + '/ref-data/lookup',
          payload
        )
        .subscribe(
          (response: any) => {
            console.log('response: ', response);
            this.htsJSONResponse = JSON.stringify(response, null, 2);
            this.showHTSResponseSection = true;
            this.showAPIResponseSection = false;
          },
          (error: any) => {
            console.error('Error generating JSON:', error);
            this.error = error.message ?? error;
          }
        );
      */
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  errorMsg2: string = '';

  onSendQuery(): void {
    console.log('in sendquery');
    this.errorMsg2 = '';
    if (this.invalidJSON) {
      console.error('Cannot send invalid JSON.');
      return;
    }

    try {
      const payload = JSON.parse(this.htsJSONResponse);

      // New implementation using mock service
      this.mockResponseService.getMockResponse(payload).subscribe(
        (response: any) => {
          console.log('mock api response: ', response);
          this.apiJSONResponse = JSON.stringify(response, null, 2);
          this.showAPIResponseSection = true;

          setTimeout(() => {
            const responseSection = document.getElementById(
              'api-response-section'
            );
            responseSection?.scrollIntoView({ behavior: 'smooth' });
          }, 0);
        },
        (error: any) => {
          console.error('Error sending query:', error);
          this.errorMsg2 = error.message ?? error;
        }
      );

      /* Old HTTP implementation
      this.http.post(this.aceAPIUrl, payload).subscribe(
        (response: any) => {
          console.log('onSendQuery: ', response);
          this.apiJSONResponse = JSON.stringify(response, null, 2);
          this.showAPIResponseSection = true;

          setTimeout(() => {
            const responseSection = document.getElementById(
              'api-response-section'
            );
            responseSection?.scrollIntoView({ behavior: 'smooth' });
          }, 0);
        },
        (error: any) => {
          console.error('Error sending query:', error);
          this.errorMsg2 = error.message ?? error;
        }
      );
      */
    } catch (error) {
      console.error('Error parsing JSON or sending query:', error);
      this.invalidJSON = true;
    }
  }

  onFileSelected(event: any): void{
    const fileInput = event.target as HTMLInputElement;
    this.form.updateValueAndValidity();
    if(fileInput.files && fileInput.files.length > 0){
      //extract info 
      const file = fileInput.files[0];
      const fileName = file.name;
      const fileExtention = file.name.split('.').pop();
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload=()=>{
        const base64 =(reader.result as string).split(',')[1];
        console.log("this is the base64 data: ", base64)
        this.form.patchValue({
          'fileName': fileName,
          'fileExt': fileExtention,
          'documentObject':base64
        });
        this.form.get('fileName')?.markAsTouched();
        this.form.get('fileExt')?.markAsTouched();
        this.form.get('documentObject')?.markAsTouched();
        this.form.updateValueAndValidity();
        console.log('form valid ', this.form.valid);
        console.log('form errors ', this.form.errors);
        console.log('form values ', this.form.value);
 
        
      };
    }
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  handleInputEvent(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    if (target) {
      this.htsJSONResponse = target.value;
      this.validateJSON(target.value);
    }
  }

  validateJSON(json: string): void {
    try {
      JSON.parse(json);
      this.invalidJSON = false;
    } catch (error) {
      this.invalidJSON = true;
    }
  }

  onClear(): void {
    this.form.reset();
    this.resetState();
  }

  resetState(): void {
    this.showHTSResponseSection = false;
    this.showAPIResponseSection = false;
    this.htsJSONResponse = '';
    this.apiJSONResponse = '';
    this.invalidJSON = false;
  }

  onDownloadJSON(): void {
    const blob = new Blob([this.apiJSONResponse], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'api-response.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  generateExampleData(): void {
    const exampleData: { [key: string]: any } = {
      'processing-port-code': '4601',
      'preparer-port-code': '4602',
    };

    switch (this.queryType) {
      case 'hts':
        exampleData['from-tariff-number'] = '1234567890';
        exampleData['to-tariff-number'] = '1234567890';
        exampleData['as-of-date'] = new Date().toISOString().split('T')[0];
        break;
      case 'domestic':
      case 'foreign':
        exampleData['port-code'] = '4601';
        break;
      case 'firms':
        exampleData['firms-code'] = '1234567890';
        break;
      case 'country':
        exampleData['country-code-list'] = 'US';
        break;
      case 'carrier':
        exampleData['carrier-code'] = '1234567890';
        break;
      case 'docSubmission':
        exampleData['senderReceiverIDCode'] = '1234567890';
        exampleData['senderReceiverSiteCode'] = '1234567890';
        exampleData['portCodes'] = '4601';
        exampleData['govermentCodes'] = 'CBP';
        exampleData['transactionType'] = 'ENTRY_NBR';
        exampleData['documentLabelCode'] = 'COMMERCIAL_INVOICE';
        exampleData['cargoTransactionUUID'] = '123e4567-e89b-12d3-a456-426614174000';
        exampleData['submittedToPortCode'] = '4601';
        exampleData['actionCode'] = 'A';
        exampleData['transactionNumber'] = '1234567890';
        exampleData['transactionName'] = 'Example Transaction';
        exampleData['transmissionDate'] = new Date().toISOString().split('T')[0];
        exampleData['documentSentDate'] = new Date().toISOString().split('T')[0];
        exampleData['document-id'] = 'DOC123456';
        exampleData['docDescription'] = 'Example Document Description';
        exampleData['fileExt'] = '.pdf';
        exampleData['fileName'] = 'example.pdf';
        break;
    }

    // Only set values for fields that are empty
    Object.keys(exampleData).forEach(key => {
      const control = this.form.get(key);
      if (control && !control.value) {
        control.setValue(exampleData[key]);
      }
    });
  }
}







import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HTS, DomesticPort, ForeignPort, Firm, CountryCodeList, CarrierCodeList, DISsubmission } from '../components/query-form/request-payloads';

@Injectable({
  providedIn: 'root'
})
export class MockResponseService {
  constructor() { }

  getMockResponse(payload: any): Observable<any> {
    // Determine the type of payload and return appropriate mock response
    if (payload.type === 'ha') {
      return this.getHTSMockResponse(payload);
    } else if (payload.type === 'domestic') {
      return this.getDomesticPortMockResponse(payload);
    } else if (payload.type === 'foreign') {
      return this.getForeignPortMockResponse(payload);
    } else if (payload.type === 'firms_cd') {
      return this.getFirmsMockResponse(payload);
    } else if (payload.type === 'country') {
      return this.getCountryMockResponse(payload);
    } else if (payload.type === 'carrier') {
      return this.getCarrierMockResponse(payload);
    } else if (payload.type === 'docSubmission') {
      return this.getDocSubmissionMockResponse(payload);
    }

    return of({ error: 'Unknown payload type' });
  }

  private getHTSMockResponse(payload: HTS): Observable<any> {
    return of({
      success: true,
      data: {
        tariffList: [{
          processingDistrictPortCode: payload.tariffList[0].processingDistrictPortCode,
          preparerDistrictPortCode: payload.tariffList[0].preparerDistrictPortCode,
          fromTariffNumber: payload.tariffList[0].fromTariffNumber,
          toTariffNumber: payload.tariffList[0].toTariffNumber,
          asOfDate: payload.tariffList[0].asOfDate,
          description: "Example HTS Description",
          status: "ACTIVE",
          effectiveDate: new Date().toISOString(),
          expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        }]
      }
    });
  }

  private getDomesticPortMockResponse(payload: DomesticPort): Observable<any> {
    return of({
      success: true,
      data: {
        portList: [{
          processingDistrictPortCode: payload.processingDistrictPortCode,
          preparerDistrictPortCode: payload.preparerDistrictPortCode,
          portCode: payload.codeList[0],
          portName: "Example Domestic Port",
          status: "ACTIVE",
          location: "Example Location, USA"
        }]
      }
    });
  }

  private getForeignPortMockResponse(payload: ForeignPort): Observable<any> {
    return of({
      success: true,
      data: {
        portList: [{
          processingDistrictPortCode: payload.processingDistrictPortCode,
          preparerDistrictPortCode: payload.preparerDistrictPortCode,
          portCode: payload.codeList[0],
          portName: "Example Foreign Port",
          status: "ACTIVE",
          country: "Example Country"
        }]
      }
    });
  }

  private getFirmsMockResponse(payload: Firm): Observable<any> {
    return of({
      success: true,
      data: {
        firmsList: [{
          processingDistrictPortCode: payload.processingDistrictPortCode,
          preparerDistrictPortCode: payload.preparerDistrictPortCode,
          firmsCode: payload.codeList[0].firmsCode,
          firmName: "Example Firm",
          status: "ACTIVE",
          type: "IMPORTER"
        }]
      }
    });
  }

  private getCountryMockResponse(payload: CountryCodeList): Observable<any> {
    return of({
      success: true,
      data: {
        countryList: [{
          processingDistrictPortCode: payload.processingDistrictPortCode,
          preparerDistrictPortCode: payload.preparerDistrictPortCode,
          countryCode: payload.codeList[0],
          countryName: "Example Country",
          status: "ACTIVE"
        }]
      }
    });
  }

  private getCarrierMockResponse(payload: CarrierCodeList): Observable<any> {
    return of({
      success: true,
      data: {
        carrierList: [{
          processingDistrictPortCode: payload.processingDistrictPortCode,
          preparerDistrictPortCode: payload.preparerDistrictPortCode,
          carrierCode: payload.codeList[0].carrierCode,
          carrierName: "Example Carrier",
          status: "ACTIVE",
          type: "AIR"
        }]
      }
    });
  }

  private getDocSubmissionMockResponse(payload: DISsubmission): Observable<any> {
    return of({
      success: true,
      data: {
        submission: {
          processingDistrictPortCode: payload.processingDistrictPortCode,
          preparerDistrictPortCode: payload.preparerDistrictPortCode,
          senderReceiverSiteCode: payload.senderReceiverSiteCode,
          senderReceiverIDCode: payload.senderReceiverIDCode,
          documentId: payload.documentId,
          transactionType: payload.transactionType,
          documentLabelCode: payload.documentLabelCode,
          fileExt: payload.fileExt,
          docDescription: payload.docDescription,
          fileName: payload.fileName,
          transmissionDate: payload.transmissionDate,
          submittedToPortCode: payload.submittedToPortCode,
          actionCode: payload.actionCode,
          transactionNumber: payload.transactionNumber,
          transactionName: payload.transactionName,
          documentSentDate: payload.documentSentDate,
          status: "SUBMITTED",
          submissionId: "SUB" + Math.random().toString(36).substr(2, 9).toUpperCase()
        }
      }
    });
  }
} 
