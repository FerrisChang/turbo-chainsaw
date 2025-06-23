src/app/company-single-view/company-single-view.component.html:447:30 - error TS2322: Type '{ domain: string[]; }' is not assignable to type 'string | Color'.
  Type '{ domain: string[]; }' is missing the following properties from type 'Color': name, selectable, group

447                             [scheme]="colorScheme" (select)="onSelect($event)">
                                 ~~~~~~

  src/app/company-single-view/company-single-view.component.ts:281:16
    281   templateUrl: './company-single-view.component.html',
                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component CompanySingleViewComponent.
