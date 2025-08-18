import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface QuickLinkData {
  searchName: string;
  searchParameters: any;
}

export interface QuickLink {
  id: string;
  name: string;
  description: string;
  searchParameters: any;
  type: string;
  createdAt: string;
}

@Component({
  selector: 'app-quick-link-dialog',
  templateUrl: './quick-link-dialog.component.html',
  styleUrls: ['./quick-link-dialog.component.scss']
})
export class QuickLinkDialogComponent {
  quickLinkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: QuickLinkData
  ) {
    this.quickLinkForm = this.fb.group({
      searchName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  onCancel(): void {
    // This will be handled by the parent component
    console.log('Cancel clicked');
  }

  onSave(): void {
    if (this.quickLinkForm.valid) {
      const quickLink: QuickLink = {
        id: Date.now().toString(),
        name: this.quickLinkForm.get('searchName')?.value,
        description: this.quickLinkForm.get('description')?.value || '',
        searchParameters: this.data.searchParameters,
        type: 'company',
        createdAt: new Date().toISOString()
      };

      // This will be handled by the parent component
      console.log('Quick link to save:', quickLink);
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.quickLinkForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors?.['minlength'].requiredLength} characters`;
    }
    if (field?.hasError('maxlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must not exceed ${field.errors?.['maxlength'].requiredLength} characters`;
    }
    return '';
  }
}
