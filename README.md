import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './quick-link-dialog.component.html',
  styleUrls: ['./quick-link-dialog.component.scss']
})
export class QuickLinkDialogComponent {
  @Input() data!: QuickLinkData;
  @Output() saveQuickLink = new EventEmitter<QuickLink>();
  @Output() cancelDialog = new EventEmitter<void>();
  
  quickLinkForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quickLinkForm = this.fb.group({
      searchName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  onCancel(): void {
    this.cancelDialog.emit();
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

      this.saveQuickLink.emit(quickLink);
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

