<mat-form-field appearance="fill" [id]="getStatusFieldId(mraRequest.request_id)">
                                                      <mat-label>MRA Request Statuses</mat-label>
                                                      <mat-select [(value)]="mraRequest.edit.payload.status"
                                                          [panelWidth]="''"
                                                          [id]="getStatusSelectId(mraRequest.request_id)"
                                                          (selectionChange)="addStatusClassToTextField($event.value, mraRequest.request_id)">
                                                          <mat-option *ngFor="let mraRequestStatus of MRAList"
                                                              class="mra-status-option {{mraRequestStatus.class}}"
                                                              [value]="mraRequestStatus.value">{{mraRequestStatus.name.toUpperCase()}}</mat-option>
                                                      </mat-select>
                                                  </mat-form-field>

	addStatusClassToTextField(status: string, requestId: string) {
		// Find the specific text field wrapper using the unique request ID
		// Using a more specific selector to ensure we only get the direct child wrapper
		const textFieldWrapper = document.querySelector(`#status-field-${requestId} > .mat-mdc-form-field-flex > .mat-mdc-text-field-wrapper.mdc-text-field.mdc-text-field--filled`);
		
		if (textFieldWrapper) {
			// Remove existing status classes from this specific field
			textFieldWrapper.classList.remove('approved', 'rejected', 'pending');

			// Add the new status class
			if (status) {
				const selectedStatus = this.MRAList.find(s => s.value === status);
				if (selectedStatus) {
					textFieldWrapper.classList.add(selectedStatus.class);
				}
			}
		}
	}

	getStatusFieldId(requestId: string): string {
		return `status-field-${requestId}`;
	}

	getStatusSelectId(requestId: string): string {
		return `status-select-${requestId}`;
	}
