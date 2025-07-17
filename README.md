
<div class="validation-container">
    <mat-icon class="validator-icon" [class.red]="!normal && errors.length>0">{{errors.length > 0 ? 'info-circle' : 'check'}}</mat-icon>
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
