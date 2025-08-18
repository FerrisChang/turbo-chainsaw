<div class="quick-link-dialog">
  <h2 class="dialog-title">Save Quick Link Search</h2>
  
  <form [formGroup]="quickLinkForm" (ngSubmit)="onSave()">
    <div class="dialog-content">
      <div class="form-content">
        <div class="form-field">
          <label class="form-label">Search Name *</label>
          <input type="text" class="form-input" formControlName="searchName" placeholder="Enter a name for this search">
          <div class="error-message" *ngIf="quickLinkForm.get('searchName')?.hasError('required')">
            Search name is required
          </div>
          <div class="error-message" *ngIf="quickLinkForm.get('searchName')?.hasError('minlength')">
            Search name must be at least 3 characters
          </div>
          <div class="error-message" *ngIf="quickLinkForm.get('searchName')?.hasError('maxlength')">
            Search name must not exceed 50 characters
          </div>
        </div>

        <div class="form-field">
          <label class="form-label">Description (Optional)</label>
          <textarea class="form-textarea" formControlName="description" placeholder="Enter a description for this search" rows="3"></textarea>
          <div class="error-message" *ngIf="quickLinkForm.get('description')?.hasError('maxlength')">
            Description must not exceed 200 characters
          </div>
        </div>

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
    </div>

    <div class="dialog-actions">
      <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
      <button type="button" class="btn btn-primary" (click)="onSave()" [disabled]="!quickLinkForm.valid">
        Save Quick Link
      </button>
    </div>
  </form>
</div>
