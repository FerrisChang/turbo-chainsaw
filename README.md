<div class="quick-link-dialog">
  <h2 mat-dialog-title>Save Quick Link Search</h2>
  
  <form [formGroup]="quickLinkForm" (ngSubmit)="onSave()">
    <mat-dialog-content>
      <div class="form-content">
        <mat-form-field class="full-width">
          <mat-label>Search Name *</mat-label>
          <input matInput formControlName="searchName" placeholder="Enter a name for this search">
          <mat-error *ngIf="quickLinkForm.get('searchName')?.hasError('required')">
            Search name is required
          </mat-error>
          <mat-error *ngIf="quickLinkForm.get('searchName')?.hasError('minlength')">
            Search name must be at least 3 characters
          </mat-error>
          <mat-error *ngIf="quickLinkForm.get('searchName')?.hasError('maxlength')">
            Search name must not exceed 50 characters
          </mat-error>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Description (Optional)</mat-label>
          <textarea matInput formControlName="description" placeholder="Enter a description for this search" rows="3"></textarea>
          <mat-error *ngIf="quickLinkForm.get('description')?.hasError('maxlength')">
            Description must not exceed 200 characters
          </mat-error>
        </mat-form-field>

        <div class="search-preview">
          <h4>Search Parameters Preview:</h4>
          <div class="param-item" *ngIf="data.searchParameters.company">
            <strong>Company:</strong> {{data.searchParameters.company}}
          </div>
          <div class="param-item" *ngIf="data.searchParameters.tin">
            <strong>TIN:</strong> {{data.searchParameters.tin}}
          </div>
          <div class="param-item" *ngIf="data.searchParameters.countries && data.searchParameters.countries.length > 0">
            <strong>Countries:</strong> {{data.searchParameters.countries.join(', ')}}
          </div>
          <div class="param-item" *ngIf="data.searchParameters.status && data.searchParameters.status.length > 0">
            <strong>Status:</strong> {{data.searchParameters.status.join(', ')}}
          </div>
          <div class="param-item" *ngIf="data.searchParameters.updated_date?.start || data.searchParameters.updated_date?.end">
            <strong>Updated Date Range:</strong> 
            {{data.searchParameters.updated_date?.start ? (data.searchParameters.updated_date.start | date) : 'Any'}} - 
            {{data.searchParameters.updated_date?.end ? (data.searchParameters.updated_date.end | date) : 'Any'}}
          </div>
          <div class="param-item" *ngIf="data.searchParameters.approved_date?.start || data.searchParameters.approved_date?.end">
            <strong>Approved Date Range:</strong> 
            {{data.searchParameters.approved_date?.start ? (data.searchParameters.approved_date.start | date) : 'Any'}} - 
            {{data.searchParameters.approved_date?.end ? (data.searchParameters.approved_date.end | date) : 'Any'}}
          </div>
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" type="submit" [disabled]="!quickLinkForm.valid">
        Save Quick Link
      </button>
    </mat-dialog-actions>
  </form>
</div>
