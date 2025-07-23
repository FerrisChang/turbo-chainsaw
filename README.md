ERROR
src/app/add-update-companies-dlg/add-update-companies-dlg.component.html:32:80 - error TS2339: Property 'companyIndex' does not exist on type 'AddUpdateCompaniesDlgComponent'.

32                     <mat-option *ngFor="let country of getCountryFilterResults(companyIndex, locationIndex); let i = index" [value]="country">
                                                                                  ~~~~~~~~~~~~

  src/app/add-update-companies-dlg/add-update-companies-dlg.component.ts:41:16
    41   templateUrl: './add-update-companies-dlg.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component AddUpdateCompaniesDlgComponent.
ERROR
src/app/add-update-companies-dlg/add-update-companies-dlg.component.html:32:94 - error TS2339: Property 'locationIndex' does not exist on type 'AddUpdateCompaniesDlgComponent'.

32                     <mat-option *ngFor="let country of getCountryFilterResults(companyIndex, locationIndex); let i = index" [value]="country">
                                                                                                ~~~~~~~~~~~~~

  src/app/add-update-companies-dlg/add-update-companies-dlg.component.ts:41:16
    41   templateUrl: './add-update-companies-dlg.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component AddUpdateCompaniesDlgComponent.
ERROR
src/app/add-update-companies-dlg/add-update-companies-dlg.component.html:254:76 - error TS2551: Property 'getCountryFilter' does not exist on type 'AddUpdateCompaniesDlgComponent'. Did you mean 'countryFilter'?

254                                         <mat-option *ngFor="let country of getCountryFilter(companyIndex, locationIndex) | async; let i = index" [value]="country">
                                                                               ~~~~~~~~~~~~~~~~

  src/app/add-update-companies-dlg/add-update-companies-dlg.component.ts:41:16
    41   templateUrl: './add-update-companies-dlg.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component AddUpdateCompaniesDlgComponent.




