
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


<div class="container-fluid " style="  position: relative;  ">
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
                                    <input required [class.error]="fieldErrors.includes('G2G ID '+(companyIndex+1)) && company.g2g_id.length" class="form-control input-content" type="text"
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
                                    <input [class.error]="fieldErrors.includes('Host Country ID '+(companyIndex+1)) && company.hostCountryID.length" class="form-control input-content" type="text"
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
                                    <input class="form-control input-content"  [class.error]="fieldErrors.includes('AEO Account Number '+(companyIndex+1)) && company.aeoAccountNumber.length"  type="text"
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
                                        class="form-control input-content" type="text"
                                            [(ngModel)]="location.country" />
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
                                        <input class="form-control input-content right-margin" type="text"
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
                                        <input class="form-control input-content" type="text"
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
                                        <input class="form-control input-content right-margin" type="text"
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
