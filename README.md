
  
<div class="validation-container" *ngIf="true">
  <mat-icon class="validator-icon" [class.red]="errors.length>0" [class.green]="errors.length===0" *ngIf="input.length > 0">
    {{errors.length > 0 ? 'info-circle' : 'check'}}
  </mat-icon>
  <div [class.left]="shiftLeft" class="tooltip-container" *ngIf="errors.length>0">
      <div class="tooltip-header">
          {{inputName}}
      </div>
      <div class="tooltip-errors">
          <div class="error" *ngFor="let error of errors">
              {{error}}
          </div>
      </div>
  </div>
</div>
