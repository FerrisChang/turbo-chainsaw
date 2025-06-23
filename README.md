src/app/company-single-view/company-single-view.component.html:447:30 - error TS2322: Type 'string[]' is not assignable to type 'string | Color'.

447                             [scheme]="colorScheme" (select)="onSelect($event)">
                                 ~~~~~~

  src/app/company-single-view/company-single-view.component.ts:281:16
    281   templateUrl: './company-single-view.component.html',
                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component CompanySingleViewComponent.
ERROR
src/app/company-single-view/company-single-view.component.html:457:92 - error TS2322: Type 'string[]' is not assignable to type 'string | Color'.

457                             [xAxisLabel]="'Country'" [yAxisLabel]="'Number of Companies'" [scheme]="colorScheme" (select)="onSelect($event)">
                                                                                               ~~~~~~

  src/app/company-single-view/company-single-view.component.ts:281:16
    281   templateUrl: './company-single-view.component.html',
                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component CompanySingleViewComponent.
