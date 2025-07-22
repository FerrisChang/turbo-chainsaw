
<input  
                                        [class.error]="fieldErrors.includes('Country for Location '+(locationIndex+1)+', Company '+(companyIndex+1)) && location.country.length" 
                                        class="form-control input-content line-spacing" type="text"
                                            [(ngModel)]="location.country"
                                            [matAutocomplete]="autoCountries{{companyIndex}}{{locationIndex}}"
                                            (ngModelChange)="filterLocationCountries(location, companyIndex, locationIndex)" />
                                        <mat-autocomplete #autoCountries{{companyIndex}}{{locationIndex}}="matAutocomplete" autoActiveFirstOption>
                                            <mat-option *ngFor="let country of location.filteredCountries" [value]="country.name">
                                                <span class="fi fi-{{country.code.toLowerCase()}}"></span>
                                                {{country.name}}
                                            </mat-option>
                                        </mat-autocomplete>
                                        <app-validator (sendError)="addError($event)"
                                            (correctError)="removeError($event)" [shiftLeft]="true"
                                            condition_type="country" [input]="location.country"
                                            inputName="Country for Location {{locationIndex+1}}, Company {{companyIndex+1}}"></app-validator>
