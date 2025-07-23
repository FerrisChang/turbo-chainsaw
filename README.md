<div class="container-fluid mx-0 px-0"
    style="background: linear-gradient( to top , rgba(0, 60, 110, 0.15), 5%, rgba(255, 255, 255, 0.2))  ">
    <h1 class="  px-4 pt-4 pb-3 " style="border-bottom: 2px solid rgba(0, 60, 110, 0.15); ;">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
            class="bi bi-plus-square pb-1 pe-2" viewBox="0 0 16 16">
            <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
        Submit MRA Request
    </h1>
</div>


<div class="container-fluid " style="position: relative;">
    <div class="row mx-3 pb-3">
        You can add companies, update their status and send their information to partner countries in the G2G Network
        Web Portal through an MRA Request Submission
    </div>
    <div class="search-form-row card widget-card">
        <div class="search-field-frame">
            <mat-form-field class="search-form-field" [hideRequiredMarker]="true">
                <mat-label>MRA Request Country</mat-label>
                <input required type="text"  placeholder="Enter in A Country" aria-label="Country Input" matInput
                    [formControl]="countriesForm" [matAutocomplete]="auto">
                <button *ngIf="countriesForm.value.length>0" matSuffix mat-icon-button aria-label="Clear"
                    (click)="clearCountryInput()" style="position: fixed; right: 0px; top: 5px;">
                    <mat-icon>close</mat-icon>
                </button>
                <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
                    <mat-option *ngFor="let country of filteredCountries" [value]="country.name">
                        <span class="fi fi-{{country.code.toLowerCase()}}"></span>
                        {{country.name}}</mat-option>
                </mat-autocomplete>
            </mat-form-field>
            <app-validator (sendError)="addError($event)" (correctError)="removeError($event)"
                class="centered-validation" condition_type="country" [input]="countriesForm.value"
                inputName="MRA Request Country"></app-validator>
        </div>
        <div class="search-field-frame">
            <mat-form-field class="search-form-field" [hideRequiredMarker]="true">
                <mat-label>MRA Request AEO Program Name</mat-label>
                <input required #name="ngModel" matInput type="text" [(ngModel)]="submission.aeo_program">
                <ng-container *ngIf="submission.aeo_program">
                    <button matSuffix mat-icon-button aria-label="Clear" (click)="submission.aeo_program=''"
                        style="position: fixed; right: 0px; top: 5px;">
                        <mat-icon>close</mat-icon>
                    </button>
                </ng-container>
            </mat-form-field>
            <app-validator (sendError)="addError($event)" (correctError)="removeError($event)" [shiftLeft]="true"
                class="centered-validation" condition_type="normal" [input]="submission.aeo_program"
                inputName="MRA Request AEO Program"></app-validator>
        </div>


    </div>
    <div class="search-form-row card widget-card">
        <div class="comment-header">
            Comment:
        </div>
        <input class="form-control" required maxlength="100" type="textarea" rows="3" height="6" matInput
            [(ngModel)]="submission.comment" />
        <app-validator (sendError)="addError($event)" (correctError)="removeError($event)" condition_type="comment"
            [input]="submission.comment" [shiftLeft]="true" inputName="MRA Request Comment"></app-validator>
    </div>


    <div class="row mx-1 pb-3 card widget-card mb-4">
        <div class="row mt-2">
            <div class="col ">
                <b>Import Companies With Excel Sheet</b>
            </div>

            <div class="col-2 float-right">
                <a class="btn btn-light btn-sm" href="assets/MRA_Request_Submission_Sample.xlsx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                        class="bi bi-file-earmark-excel-fill" viewBox="0 0 18 18" color="navy">
                        <path
                            d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64" />
                    </svg>Download Sample Spreadsheet
                </a>
            </div>

        </div>
        <div class="form-group row">
            <label class="col-sm-12 col-form-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                    class="bi bi-file-text" viewBox="0 0 16 16">
                    <path
                        d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                    <path
                        d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                </svg>
                Please select your Excel file</label>
            <div class="col-sm-12">
                <input type="file" class="form-control   " accept=".xls, .xlsx" (change)="uploadExcelToForm($event);"
                    [ngClass]="{ 'is-invalid': submitted   }">

            </div>
        </div>


    </div>


    <div class="row px-1">
        <div class="col ">
            <div class="card widget-card">
                <div class="card-header card-hdr-class">
                    <div class="row">
                        <div class="col">
                            <h4 class="card-title mb-1 pt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-list-task" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z" />
                                    <path
                                        d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
                                    <path fill-rule="evenodd"
                                        d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z" />
                                </svg>
                                List of Companies In MRA Request Submission
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="card-body px-0 pt-0 pb-0 ">
                    <div class="company-submissions-frame">
                        <mat-expansion-panel [expanded]="true" class="company-submission"
                            *ngFor="let company of companySubmissions; let companyIndex = index;">
                            <mat-expansion-panel-header class="header">
                                <mat-panel-title>
                                    Company {{companyIndex+1}}
                                </mat-panel-title>
                                <mat-panel-description>
                                    <button type="button" class="remove-description"
                                    (click)="removeCompany(companyIndex)">
                                Remove Company {{companyIndex+1}}</button>
                                </mat-panel-description>
                            </mat-expansion-panel-header>
                            <div class="company-submission-frame">
                                <div class="input">
                                    <div class="input-header">
                                        {{
                                            company.name.length===0 ? 'Name*:' : 'Name:'
                                        }}
                                    </div>
                                    <input [class.error]="fieldErrors.includes('Name '+(companyIndex+1)) && company.name.length" class="form-control input-content" type="text" [(ngModel)]="company.name" />
                                    <app-validator (sendError)="addError($event)" (correctError)="removeError($event)"
                                        condition_type="normal" [input]="company.name"
                                        inputName="Name {{companyIndex+1}}" class="line-spacing"></app-validator>
                                </div>
                                <div class="input">
                                    <div class="input-header">
                                        {{
                                            company.g2g_id.length===0 ? 'G2G ID*:' : 'G2G ID:'
                                        }}
                                        
                                    </div>
                                    <input required [class.error]="fieldErrors.includes('G2G ID '+(companyIndex+1)) && company.g2g_id.length" class="form-control input-content line-spacing" type="text"
                                        [(ngModel)]="company.g2g_id" />
                                    <app-validator (sendError)="addError($event)" (correctError)="removeError($event)"
                                        condition_type="country_id" [shiftLeft]="true" [input]="company.g2g_id"
                                        inputName="G2G ID {{companyIndex+1}}"></app-validator>

                                </div>
                                <div class="input">
                                    <div class="input-header">
                                        {{
                                            company.hostCountryIDType.length===0 ? 'Host Country ID Type*:' : 'Host Country ID Type:'
                                        }}
                                        
                                    </div>
                                    <input required [class.error]="fieldErrors.includes('Host Country ID Type '+(companyIndex+1)) && company.hostCountryIDType.length" class="form-control input-content" type="text"
                                        [(ngModel)]="company.hostCountryIDType" />
                                    <app-validator (sendError)="addError($event)" (correctError)="removeError($event)"
                                        condition_type="id_type" [input]="company.hostCountryIDType"
                                        inputName="Host Country ID Type {{companyIndex+1}}" class="line-spacing"></app-validator>
                                </div>
                                <div class="input">
                                    <div class="input-header">
                                        {{
                                            company.hostCountryID.length===0 ? 'Host Country ID*:' : 'Host Country ID:'
                                        }}
                                    </div>
                                    <input [class.error]="fieldErrors.includes('Host Country ID '+(companyIndex+1)) && company.hostCountryID.length" class="form-control input-content line-spacing" type="text"
                                        [(ngModel)]="company.hostCountryID" />
                                    <app-validator (sendError)="addError($event)" (correctError)="removeError($event)"
                                        condition_type="country_id" [shiftLeft]="true" [input]="company.hostCountryID"
                                        inputName="Host Country ID {{companyIndex+1}}"></app-validator>
                                </div>
                                <div class="input">
                                    <div class="input-header">
                                        {{
                                            company.tin.length===0 ? 'TIN*:' : 'TIN:'
                                        }}
                                    </div>
                                    <input [class.error]="fieldErrors.includes('TIN '+(companyIndex+1)) && company.tin.length" class="form-control input-content" type="text" [(ngModel)]="company.tin" />
                                    <app-validator (sendError)="addError($event)" (correctError)="removeError($event)"
                                        condition_type="normal" [input]="company.tin"
                                        inputName="TIN {{companyIndex+1}}" class="line-spacing"></app-validator>
                                </div>
                                <div class="input">
                                    <div class="input-header">
                                        {{
                                            company.aeoAccountNumber.length===0 ? 'AEO Account Number*:' : 'AEO Account Number:'
                                        }}
                                    </div>
                                    <input class="form-control input-content line-spacing"  [class.error]="fieldErrors.includes('AEO Account Number '+(companyIndex+1)) && company.aeoAccountNumber.length"  type="text"
                                        [(ngModel)]="company.aeoAccountNumber" />
                                    <app-validator (sendError)="addError($event)" (correctError)="removeError($event)"
                                        condition_type="normal" [shiftLeft]="true" [input]="company.aeoAccountNumber"
                                        inputName="AEO Account Number {{companyIndex+1}}"></app-validator>
                                </div>
                            </div>
                            <mat-expansion-panel class="location-panel" [expanded]="true"
                                *ngFor="let location of company.locations; let locationIndex = index;">
                                <mat-expansion-panel-header>
                                    <mat-panel-title>
                                        Location {{locationIndex+1}} for Company {{companyIndex+1}}
                                    </mat-panel-title>
                                    <mat-panel-description>
                                        <button type="button" class="remove-description"
                                            (click)="removeCompanyLocation(companyIndex,locationIndex)">
                                            Remove Location {{locationIndex+1}}
                                        </button>
                                    </mat-panel-description>
                                </mat-expansion-panel-header>
                                <div class="company-submission-frame">
                                    <div class="input">
                                        <div class="input-header">
                                            Primary Location:
                                        </div>
                                        <div class="checkbox-input-content">
                                            <input type="checkbox" class="input-checkbox"
                                                [(ngModel)]="location.primaryLocation" />
                                        </div>
                                    </div>
                                    <div class="input">
                                        <div class="input-header">
                                            {{
                                                location.country.length===0 ? 'Country*:' : 'Country:'
                                            }}
                                        </div>
                                        <input  
                                        [class.error]="fieldErrors.includes('Country for Location '+(locationIndex+1)+', Company '+(companyIndex+1)) && location.country.length" 
                                        class="form-control input-content line-spacing" 
                                        type="text"
                                        [matAutocomplete]="autoCountries"
                                        [formControl]="getCountryFormControl(companyIndex, locationIndex)"
                                    />
                                    <mat-autocomplete #autoCountries="matAutocomplete">
                                        <mat-option *ngFor="let country of getCountryFilter(companyIndex, locationIndex) | async; let i = index" [value]="country">
                                            {{country}}
                                        </mat-option>
                                    </mat-autocomplete>
                                        <app-validator (sendError)="addError($event)"
                                            (correctError)="removeError($event)" [shiftLeft]="true"
                                            condition_type="country" [input]="location.country"
                                            inputName="Country for Location {{locationIndex+1}}, Company {{companyIndex+1}}"></app-validator>
                                    </div>
                                    <div class="input">
                                        <div class="input-header">
                                            {{
                                                location.addressLine1.length===0 ? 'Address Line 1*:' : 'Address Line 1:'
                                            }}
                                        </div>
                                        <input class="form-control input-content left-margin" type="text"
                                        [class.error]="fieldErrors.includes('Address for Location '+(locationIndex+1)+', Company '+(companyIndex+1)) && location.addressLine1.length" 
                                            
                                        [(ngModel)]="location.addressLine1" />
                                        <app-validator (sendError)="addError($event)"
                                            (correctError)="removeError($event)" condition_type="normal"
                                            [input]="location.addressLine1"
                                            inputName="Address for Location {{locationIndex+1}}, Company {{companyIndex+1}}" class="line-spacing"></app-validator>
                                    </div>
                                    <div class="input">
                                        <div class="input-header">
                                            Address Line 2:
                                        </div>
                                        <input class="form-control input-content line-spacing" type="text"
                                            [(ngModel)]="location.addressLine2" />
                                    </div>
                                    <div class="input">
                                        <div class="input-header">
                                            {{
                                                location.city.length===0 ? 'City*:' : 'City:'
                                            }}
                                        </div>
                                        <input 
                                        [class.error]="fieldErrors.includes('City for Location '+(locationIndex+1)+', Company '+(companyIndex+1)) && location.city.length" 
                                        
                                        class="form-control input-content left-margin" type="text"
                                            [(ngModel)]="location.city" />
                                        <app-validator (sendError)="addError($event)"
                                            (correctError)="removeError($event)" condition_type="city"
                                            [input]="location.city"
                                            inputName="City for Location {{locationIndex+1}}, Company {{companyIndex+1}}" class="line-spacing"></app-validator>

                                    </div>
                                    <div class="input">
                                        <div class="input-header">
                                            {{
                                                location.stateOrProvince.length===0 ? 'State or Province*:' : 'State or Province:'
                                            }}
                                        </div>
                                        <input class="form-control input-content line-spacing" type="text"
                                        [class.error]="fieldErrors.includes('State/Province for Location '+(locationIndex+1)+', Company '+(companyIndex+1)) && location.stateOrProvince" 
                                            
                                        [(ngModel)]="location.stateOrProvince" />
                                        <app-validator (sendError)="addError($event)"
                                            (correctError)="removeError($event)" [shiftLeft]="true"
                                            condition_type="normal" [input]="location.stateOrProvince"
                                            inputName="State/Province for Location {{locationIndex+1}}, Company {{companyIndex+1}}"></app-validator>

                                    </div>
                                    <div class="input">
                                        <div class="input-header">
                                            {{
                                                location.postalCode.length===0 ? 
                                                'Postal Code*:' : 'Postal Code:'
                                            }}
                                        </div>
                                        <input 
                                        [class.error]="fieldErrors.includes('Zip Code for Location '+(locationIndex+1)+', Company '+(companyIndex+1)) && location.postalCode" 
                                        class="form-control input-content left-margin" type="text"
                                            [(ngModel)]="location.postalCode" />
                                        <app-validator (sendError)="addError($event)"
                                            (correctError)="removeError($event)" condition_type="zip_code"
                                            [input]="location.postalCode"
                                            inputName="Zip Code for Location {{locationIndex+1}}, Company {{companyIndex+1}}" class="line-spacing"></app-validator>

                                    </div>
                                    <div class="input">
                                        <div class="input-header">
                                            Role List:
                                        </div>
                                        <input class="form-control input-content line-spacing" type="text"
                                            [(ngModel)]="location.roleInput"
                                            (keyup.enter)="submitRole(companyIndex,locationIndex)" />
                                    </div>
                                    <div>
                                    </div>
                                    <div class="role-container">
                                        <div class="header">
                                            Roles:
                                        </div>
                                        <div class="role-content">
                                            <div class="role"
                                                *ngFor="let role of location.roleList; let roleIndex = index">
                                                {{role}}
                                                <mat-icon (click)="clearRole(companyIndex, locationIndex, roleIndex)"
                                                    class="clear-role">close</mat-icon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="alternate-ids-frame">
                                    <div class="alternate-id-header">
                                        Alternate IDs for Location {{locationIndex+1}}
                                    </div>
                                    <div class="alternate-id-container"
                                        *ngFor="let id of location.alternateID; let idIndex = index;">
                                        <div class="alt-id-submission-frame">
                                            <div class="input">
                                                <div class="input-header">
                                                    {{
                                                        id.type.length===0 ? 
                                                        'Alternate ID Type*:' : 'Alternate ID Type:'
                                                    }}
                                                </div>
                                                <input class="form-control input-content" type="text"
                                                [class.error]="fieldErrors.includes('Alternate ID Type For ID'+(idIndex+1)+ ', Location '+(locationIndex+1)+', Company '+(companyIndex+1)) && id.type.length" 
                                                    
                                                [(ngModel)]="id.type" />
                                                <app-validator (sendError)="addError($event)"
                                                    (correctError)="removeError($event)" condition_type="normal"
                                                    [input]="id.type"
                                                    inputName="Alternate ID Type for ID {{idIndex+1}}, Location {{locationIndex+1}}, Company {{companyIndex+1}}"></app-validator>
                                            </div>
                                            <div class="input">
                                                <div class="input-header">
                                                    {{
                                                        id.type.length===0 ? 
                                                        'Alternate ID*:' : 'Alternate ID:'
                                                    }}
                                                </div>
                                                <input class="form-control input-content" type="text"
                                                [class.error]="fieldErrors.includes('Alternate ID For ID'+(idIndex+1)+ ', Location '+(locationIndex+1)+', Company '+(companyIndex+1)) && id.id.length" 
                                                    [(ngModel)]="id.id" />
                                                <app-validator (sendError)="addError($event)"
                                                    (correctError)="removeError($event)" condition_type="normal"
                                                    [input]="id.id"
                                                    [shiftLeft]="true"
                                                    inputName="Alternate ID for ID {{idIndex+1}}, Location {{locationIndex+1}}, Company {{companyIndex+1}}"></app-validator>
                                            </div>
                                            <div class="clear-button-frame">
                                                <button class="clear-alt-button" matSuffix mat-icon-button
                                                    aria-label="Clear"
                                                    (click)="removeAltID(companyIndex,locationIndex,idIndex)">
                                                    <mat-icon>close</mat-icon>
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn   btn-outline-success mb-3 px-2 mx-3"
                                    (click)="addAlternateID(companyIndex, locationIndex)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                        class="bi bi-plus-square" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>
                                    Add Alternate ID</button>
                            </mat-expansion-panel>
                            <button type="button" class="btn   btn-outline-success add-button mb-3 px-2 mx-3"
                                (click)="addCompanyLocation(companyIndex)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                    class="bi bi-plus-square" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                </svg>
                                Add Company Location</button>
                        </mat-expansion-panel>
                    </div>
                    <button type="button" class="btn   btn-outline-success add-button mb-3 px-2 mx-3" style="width:125px"
                        (click)="addCompanyRow()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                            class="bi bi-plus-square" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                        </svg>
                        Add Entry</button>
                </div>
                <div class="card-footer">
                    <div class="row ">
                        <div class="col-5 float-right">
                        </div>
                        <div class="col   " style="vertical-align: middle;">
                            <button type="button" [disabled]="sendingRequest "
                                class="btn btn-success mt-4 float-right mb-2"
                                style="position: relative; bottom: 5px; width:300px" (click)="submitMraRequest()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                    class="bi bi-floppy-fill" viewBox="0 0 20 20">
                                    <path
                                        d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                                    <path
                                        d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                                </svg>
                                {{actualSubmission===null ? 'Submit' : 'Resubmit'}} MRA Request</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="json-submission-window" *ngIf="actualSubmission">
        <ngx-json-viewer [json]="actualSubmission" [expanded]="true"></ngx-json-viewer>
    </div>
</div>






import { Component, Inject } from '@angular/core';

import { read, utils } from "xlsx";
import { states } from '../services/resources/states';
import { Country, MRARequestCompanyLocationSubmission, MRARequestCompanySubmission, MRARequestSubmission, MraRequestSubmissionPayload } from '../mra-request-full-view/mra-request-types';
import { BackendapiService } from '../backendapi.service';
import { FormControl } from '@angular/forms';
import { emptyAlternativeID, emptyMraRequestCompanyLocationSubmission, emptyMraRequestCompanySubmission, emptyMraRequestSubmission } from '../mra-request-full-view/mra-request-models';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Company } from '../company-full-view/companies-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { variables } from 'src/environments/variables';
import { G2GCompany, G2GCompanyLocation } from '../services/G2GMessage-types';å
import { UtilsService } from '../services/utils.service';
import { map, Observable, startWith } from 'rxjs';


export interface DialogData {
  countryName: string;
  companyName: string;
  closeStatus: string;
}

export interface excelData {
  function: string;
  companyName: string;
  programName: string;
  companyStatus: string;
  certificationDate: string;
  ein: string;
  streetAdress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lastValidationDate: string;
}


@Component({
  selector: 'app-add-update-companies-dlg',
  templateUrl: './add-update-companies-dlg.component.html',
  styleUrls: ['./add-update-companies-dlg.component.scss']
})
export class AddUpdateCompaniesDlgComponent {
  constructor(private backendAPI: BackendapiService,
    private snackBar: MatSnackBar,
    private utils: UtilsService
  ) {

  }


  sendToCountry: string = '';

  companiesHeader = ['function', 'programName', 'ein', 'companyName', 'streetAdress', 'city', 'state', 'country', 'postalCode', 'companyStatus', 'certificationDate', 'lastValidationDate'];
  excelHeader = ['List function needed for record', 'Program Name', 'BEI Value', 'BEI Type', 'Account/Company Name', 'Comment', 'Street Adress', 'City', 'State', 'Country', 'Postal Code', 'Certification Date (MM/DD/YYYY)', 'Last Validation Date (MM/DD/YYYY)'];

  ctryControl = new FormControl('');
  countryList: string[] = [ "Afghanistan", "Albania","Algeria", "Andorra", "Angola", "Argentina", "Australia", "Austria", "Brazil", "Canada", "China", "Egypt", "France", "Germany", "India", "Indonesia", "Italy", "Japan", "Mexico", "Netherlands", "New Zealand", "Nigeria", "Pakistan", "Russia", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Turkey", "United Kingdom", "United States",];
  countryFilter!: Observable<string[]>;
  viewMode: number = 2;
  companiesData: excelData[] = [];
  companySubmissions: MRARequestCompanySubmission[] = [];
  filteredCountries: string[] = [];
  countriesForm: FormControl = new FormControl('');
  file: any;
  uploadEvent = '';
  arrayBuffer: any = '';
  exceljsondata: any = '';
  submitted = false;

  processedData: any = [];
  processedDataCount: number = 0;
  sendingRequest = false;

  submission: MRARequestSubmission = emptyMraRequestSubmission;
  fieldErrors: string[] = []; // all of the fields that are found to have errors
  actualSubmission: MraRequestSubmissionPayload | null = null;

  ngOnInit() {
    this.countryFilter = this.ctryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountries(value || ''))
    );

    this.countriesForm.valueChanges.subscribe(filteredValue => {
      this.submission.country = filteredValue;
      this.filteredCountries = this.countryList.filter((country) => {
        return country.toLowerCase().includes(filteredValue.toLowerCase())
      })
    })
  }

  // Create a unique FormControl for each location's country input
  getCountryFormControl(companyIndex: number, locationIndex: number): FormControl {
    const key = `country_${companyIndex}_${locationIndex}`;
    if (!this.countryFormControls) {
      this.countryFormControls = new Map();
    }
    if (!this.countryFormControls.has(key)) {
      const control = new FormControl('');
      this.countryFormControls.set(key, control);
    }
    return this.countryFormControls.get(key)!;
  }

  // Get the filtered countries for a specific location
  getCountryFilter(companyIndex: number, locationIndex: number): Observable<string[]> {
    const control = this.getCountryFormControl(companyIndex, locationIndex);
    return control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountries(value || ''))
    );
  }

  countryFormControls: Map<string, FormControl> = new Map();

  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log('Filtering countries with value:', value);
    console.log('Filter value (lowercase):', filterValue);
    const filtered = this.countryList.filter(country => 
      country.toLowerCase().includes(filterValue)
    );
    console.log('Filtered countries:', filtered);
    console.log('Total countries in list:', this.countryList.length);
    return filtered;
  }

  addError(fieldName: string) {
    if (!this.fieldErrors.includes(fieldName)) {
      this.fieldErrors.push(fieldName)
    }
  }
  removeError(fieldName: string) {
    let removeIndex = this.fieldErrors.indexOf(fieldName);
    if (removeIndex >= 0) {
      this.fieldErrors.splice(removeIndex, 1)
    }
  }
  removeCompany(companyIndex: number) {
    
    // makes sure that all errors that are related to the company is removed 
    this.fieldErrors = this.fieldErrors.filter((error)=>{
      return !error.includes(`Company ${companyIndex+1}`)
    })
    this.companySubmissions.splice(companyIndex, 1);
  }
  addCompanyLocation(companyIndex: number) {
    const newLocation = { ...emptyMraRequestCompanyLocationSubmission, filteredCountries: [...this.countryList] };
    this.companySubmissions[companyIndex].locations.push(newLocation);
  }
  submitRole(companyIndex: number, locationIndex: number) {
    this.companySubmissions[companyIndex].locations[locationIndex].roleList.push(
      this.companySubmissions[companyIndex].locations[locationIndex].roleInput
    )
    this.companySubmissions[companyIndex].locations[locationIndex].roleInput = "";
  }
  removeCompanyLocation(companyIndex: number, locationIndex: number) {
    // makes sure that all errors that are related to the company location is removed
    this.fieldErrors = this.fieldErrors.filter((error)=>{
      return !error.includes(`Location ${locationIndex+1}, Company ${companyIndex+1}`)
    })
    this.companySubmissions[companyIndex].locations.splice(locationIndex, 1);
  }
  removeAltID(companyIndex: number, locationIndex: number, idIndex: number) {
    // makes sure that all errors that are related to the company alternate id is removed
    this.fieldErrors = this.fieldErrors.filter((error)=>{
      return !error.includes(`ID ${idIndex+1}, Location ${locationIndex+1}, Company ${companyIndex+1}`)
    })
    this.companySubmissions[companyIndex].locations[locationIndex].alternateID.splice(idIndex, 1);
  }
  addAlternateID(companyIndex: number, locationIndex: number) {
    this.companySubmissions[companyIndex].locations[locationIndex].alternateID.push({ ...emptyAlternativeID })
  }
  clearCountryInput() {
    this.countriesForm.setValue('');
  }
  clearRole = (companyIndex: number, locationIndex: number, roleIndex: number) => {
    this.companySubmissions[companyIndex].locations[locationIndex].roleList.splice(roleIndex, 1);
  }
  submitMraRequest() {
    console.log("Field Errors: ", this.fieldErrors);
    let validated = this.fieldErrors.length > 0;
    if (validated) {
      this.snackBar.open(
        `Refer to the (i) icons for the validation errors`,
        'Close',
        {
          duration: 2500,
          panelClass: 'errorSnack',
        }
      );
    }
    else {
      this.submission.companies = this.companySubmissions;
      // creates the submission to submit the MRA Request
      let submission: MraRequestSubmissionPayload = {
        G2GMessage: {
          messageHeader: {
            messageType: variables.messageType,
            messageSpecification: variables.messageSpecification,
            messageSpecificationVersion: variables.messageSpecificationVersion,
            messageId: '',
            messageSentDate: new Date(),
            messageSenderId: '',
            messageSenderCountryCode: this.utils.translateCountryToCode(this.submission.country),
            comment: this.submission.comment
          },
          messageBody: {
            MRABenefitsRequest: {
              MRARequestId: '',
              hostCountryCode: this.submission.country,
              AEOProgramName: this.submission.aeo_program,
              companyInfoList: this.submission.companies.map((company) => {
                return {
                  companyInfo: {
                    G2GCompanyID: company.g2g_id,
                    TIN: company.tin,
                    companyName: company.name,
                    hostCountryCompanyId: company.hostCountryID,
                    hostCountryCompanyIdType: company.hostCountryIDType,
                    AEOAccountNumber: company.aeoAccountNumber,
                    companyLocationList: company.locations.map((location) => {
                      return {
                        companyLocation: {
                          isPrimaryLocation: location.primaryLocation,
                          companyAddress: {
                            addressLine1: location.addressLine1,
                            addressLine2: location.addressLine2,
                            city: location.city,
                            stateOrProvince: location.stateOrProvince,
                            postalCode: location.postalCode,
                            countryCode: this.utils.translateCountryToCode(location.country)
                          },
                          supplyChainRoleList: location.roleList,
                          alternateID: location.alternateID.map((altID) => {
                            return {
                              type: altID.type,
                              ID: altID.id
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        }
      }
      console.log("MRA Request Submission: ", submission)
      this.sendingRequest = true;
      this.backendAPI.submitMraRequest(submission).subscribe({
        next: () => {
          this.actualSubmission = submission;
          this.snackBar.open(
            `Message sent successfully. Refer to the JSON Below to see what was sent.`,
            'Close',
            {
              duration: 2500,
              panelClass: 'errorSnack',
            }
          );
          this.sendingRequest = false;
        },
        error: (err) => {
          console.log("Error: ", err)
          this.sendingRequest = false;
        }
      })
    }
  }

  onFileChange(event: any) {
    this.submitted = true;
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadEvent = event;
    }
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join("");
      const workbook = read(bstr, {
        type: "binary"
      });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.exceljsondata = utils.sheet_to_json(worksheet, {
        raw: true,
        defval: "",
      });
      console.log(this.exceljsondata);
      this.submitted = false;

      let functionCol2 = "List function needed for record: Add / Revoke / Edit";
      let functionCol1 = "List function needed for record";

      this.processedDataCount = 0;
      for (let i = 0; this.exceljsondata.length && i < 100; i++) {
        const row = this.exceljsondata[i];
        console.log(row);
        if (row && row !== undefined && row[functionCol1] && row[functionCol1] !== undefined &&
          (row[functionCol1] === 'Add' || row[functionCol1] === 'Update' || row[functionCol1] === 'Suspend') &&
          row['BEI Value'] !== undefined && row['BEI Value'] !== '') {
          this.processedData[this.processedDataCount] = [];
          console.log(row);



          for (let col = 0; col < this.excelHeader.length && col < 100; col++) {
            this.processedData[this.processedDataCount][this.excelHeader[col]] = '';  //assign a blank value before we assign what's in the excel file incase excel file is blank
            if (row[this.excelHeader[col]] !== undefined) {
              console.log(row[this.excelHeader[col]]);
              this.processedData[this.processedDataCount][this.excelHeader[col]] = row[this.excelHeader[col]];
            }
          }
          this.processedDataCount++;
        }
      }

      console.log(this.processedData);
      console.log(this.processedDataCount);
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadExcelToForm(event: any) {
    console.log("Uploading Excel...")
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadEvent = event;
    }
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.arrayBuffer = fileReader.result;
      // conversion work
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join("");
      const workbook = read(bstr, {
        type: "binary"
      });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // gets the worksheet name
      let sheet = utils.sheet_to_json(worksheet, {
        raw: true,
        defval: "",
      });
      let companyClusters = this.convertClusterToSmallerCluster(sheet, "company")
      this.companySubmissions = companyClusters.map((company: any) => {
        let companyReference = company[0];
        return {
          name: companyReference["Company Name"],
          g2g_id: companyReference["G2G ID"],
          tin: companyReference["TIN"],
          hostCountryID: companyReference["Host Country ID"],
          hostCountryIDType: companyReference["Host Country ID Type"],
          aeoAccountNumber: companyReference["AEO Account Number"],
          locations: this.convertClusterToSmallerCluster(company, "location").map((location) => {
            let locationReference = location[0]
            return {
              primaryLocation: locationReference["Primary Location?"],
              addressLine1: locationReference["Address Line 1"],
              addressLine2: locationReference["Address Line 2"] || "",
              city: locationReference["City"],
              stateOrProvince: locationReference["State or Province"],
              country: locationReference["Country"],
              postalCode: locationReference["Postal Code"],
              roleInput: "",
              roleList: locationReference["Roles"].split(",") || [],
              alternateID: location.map((alternateID: any) => {
                return {
                  type: alternateID["Alternate ID Type"],
                  id: alternateID["Alternate ID"]
                }
              })
            }
          })
        }
      })
      console.log("Excel Data: ", sheet);
      console.log("Clusters relating to it: ", companyClusters);
      console.log("Company Submissions: ", this.companySubmissions);
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  convertClusterToSmallerCluster(cluster: any, type: string) {
    let result: any[] = []
    let currentCluster = [cluster[0]];  // assumes that the first guy is probably good
    let newCluster = false;
    for (let row of cluster.slice(1)) {
      // based on type of cluster, the conditions to identify new cluster will change
      switch (type) {
        case "company":
          newCluster = row["Company Name"].length > 0
          break;
        case "location":
          newCluster = row["Address Line 1"].length > 0
          break;
      }
      if (newCluster) {
        result.push(currentCluster); // gets the last cluster and now it updates to the new cluster
        currentCluster = [row];
      }
      else {
        currentCluster.push(row);
      }
    }
    result.push(currentCluster); // retrieves the last cluster that isn't added yet 
    return result;
  }
  convertCompanyClusterToLocationClusters(companyCluster: any) {

  }

  addCompanyRow() {
    const newCompany = { ...emptyMraRequestCompanySubmission };
    // Initialize filteredCountries for each location
    if (newCompany.locations) {
      newCompany.locations = newCompany.locations.map(location => ({ ...location, filteredCountries: [...this.countryList] }));
    }
    this.companySubmissions.push(newCompany);
  }
  removeCompanyRow(index: number) {
    console.log('removeRow: ' + index);
    this.companySubmissions.splice(index, 1);
  }

  usStates = states;

  apiCompanies: any = {};

  submitToSelectedCountry() {

    this.sendingRequest = true;
    setTimeout(() => {
      this.sendingRequest = false;
    }, 3500);
    this.saveOrUpdateCompany();
  }


  saveOrUpdateCompany() {


  }

}

