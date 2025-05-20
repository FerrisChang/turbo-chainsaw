
                                                    <mat-form-field appearance="fill">
                                                        <mat-label>MRA Request Statuses</mat-label>
                                                        <mat-select [(value)]="mraRequest.edit.payload.status"
                                                            [panelWidth]="''">
                                                            <mat-option *ngFor="let mraRequestStatus of MRAList"
                                                                class="mra-status-option {{mraRequestStatus.class}}"
                                                                [value]="mraRequestStatus.value">{{mraRequestStatus.name.toUpperCase()}}</mat-option>
                                                        </mat-select>
                                                    </mat-form-field>
