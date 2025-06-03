
<section class="sub-page-description-container">
  <div class="sub-page-description-title-container">
    <h1 class="sub-page-description-title">API Testing Tools</h1>
    <p class="sub-page-description">API > API Testing Tools</p>
  </div>
</section>

<section class="sub-page-artifacts-container">
  <div class="container mt-5 mb-5">
    <div class="card-header mx-0 pb-1">
      <h5>
       {{queryTypeTitle[queryType]}}
      </h5>
    </div>
    <div class="card-body">
      <div class="outer-container">
        <div class="main-container">
          <div class="side-panel">
            <p class="side-panel-instruction">
              Select an option from the available Query Types shown below:
            </p>
            <!-- query type nav buttons  -->
            <button
              *ngFor="let btnType of queryTypeButtons"
              class="btn btn-primary"
              (click)="switchForm(btnType.type)"
              [ngClass]="{
                selected: queryType == btnType.type
              }"
            >
              {{ btnType.label }}
            </button>
          </div>

          <div class="content-wrapper">
            <div class="form-container">
              <h2 class="form-type-label">{{ formLabel }}</h2>
              <form [formGroup]="form" (ngSubmit)="onSubmit()">
                <!-- Common template for query type controls -->
<div class="form-section" >




<ng-container *ngFor="let control of queryTypeFormControls[this.queryType]">
<!-- side by side-->
<ng-container *ngIf = "isFirstInSideBySidePair(control.id); else singleField">
    <div class="side-by-side-row">
       <!--First Input-->
      <div class="form-input-container">
        <label [for] = "control.id">{{control.label}}</label>
        <input 
              *ngIf="control.type !== 'select'"
              [type]="control.type"
              [id]="control.id"
              [formControlName]="control.formControlName"
              class="form-control"
              [placeholder]="control.placeholder ?? null"
              />
              <select *ngIf="control.type === 'select'"
              [id]="control.id"
              [formControlName]="control.formControlName"
              class="form-control dropdown">
                <option *ngFor="let option of control.options" [value]="option.value">{{option.label}}</option>
              </select>
      </div>
        <!--end first input-->
<!--second input-->



        <div class ="form-input-container" *ngIf="getSecondInPair(control.id) as secondId">
          <ng-container *ngFor="let secondControl of queryTypeFormControls[this.queryType]">
            <ng-container *ngIf="secondControl.id === secondId">
              <label [for] = "secondControl.id">{{secondControl.label}}</label>
              <input 
              *ngIf="secondControl.type !== 'select'"
              [type]="secondControl.type"
              [id]="secondControl.id"
              [formControlName]="secondControl.formControlName"
              class="form-control"
              [placeholder]="secondControl.placeholder ?? null"
              />
              <select *ngIf="secondControl.type === 'select'"
              [id]="secondControl.id"
              [formControlName]="secondControl.formControlName"
              class="form-control dropdown">
                <option *ngFor="let option of secondControl.options" [value]="option.value">{{option.label}}</option>
              </select>
            </ng-container>
          </ng-container>
        </div>
      
    </div>
  </ng-container>

  
<!--end of side by side input-->
<ng-template #singleField>
  <div class="form-input-container" [ngClass]="{hidden: control.id === 'fileName'|| control.id === 'fileExt'}" *ngIf="!sideBySidePairs.flat().includes(control.id)">
    <label [for] = "control.id">{{control.label}}</label>

    <input *ngIf="control.type !== 'select' && control.type !== 'file'"
      [type]="control.type"
      [id]="control.id"
      [formControlName]="control.formControlName"
      class="form-control"
      [placeholder]="control.placeholder ?? null"
    />
    <input *ngIf=" control.type === 'file'"
    [type]="control.type"
    [id]="control.id"
    [formControlName]="control.formControlName"
    class="form-control"
    [placeholder]="control.placeholder ?? null"
    (change)="onFileSelected($event)"
  />

    <select *ngIf="control.type === 'select'" [id]="control.id"
    [formControlName]="control.formControlName" class="form-control dropdown">
  <option *ngFor="let option of control.options" [value]="option.value">{{option.label}}
  </option>
  </select>
  </div>
</ng-template>

</ng-container> 
</div>


        
                <!-- form buttons  -->
                <div class="button-container">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="form.invalid"
                  >
                    Generate JSON Input
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    (click)="onClear()"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </div>

            <div class="alert-container" *ngIf="error">
              <div class="alert alert-warning" role="alert">
                {{ error }}
              </div>
            </div>

            <div
              id="hts-response-section"
              *ngIf="showHTSResponseSection"
              class="form-container extra-margin"
            >
              <h3 class="form-page-banner-title">Query JSON Input Message</h3>
              <textarea
                [value]="htsJSONResponse"
                (input)="handleInputEvent($event)"
                class="form-control display-results-textarea"
              ></textarea>
              <div class="button-container">
                <button
                  class="btn btn-secondary"
                  [disabled]="invalidJSON"
                  (click)="onSendQuery()"
                >
                  Submit Transaction
                </button>
              </div>
              <div *ngIf="invalidJSON" class="invalid-feedback">
                Invalid JSON format. Please correct it before sending the query.
              </div>
            </div>

            <div
              id="api-response-section"
              *ngIf="showAPIResponseSection"
              class="form-container extra-margin"
            >
              <h3 class="form-page-banner-title">API JSON Response</h3>
              <textarea
                [value]="apiJSONResponse"
                class="form-control display-results-textarea"
                readonly
              ></textarea>
              <div class="button-container">
                <button class="btn btn-primary" (click)="onDownloadJSON()">
                  Download JSON
                </button>
              </div>
            </div>
            <div
              class="text-centered width-full"
              *ngIf="errorMsg2"
            >
              <div class="alert alert-warning" role="alert">
                Error: {{ errorMsg2 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



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

  constructor(private fb: FormBuilder, private http: HttpClient) {
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

      //const payload = getPayload(this.queryType, this.form);
      const payload: {[key:string]:any}=getPayload(this.queryType, this.form);
      // (payload as any).error = 'test' // uncomment this line to test errors

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
}
