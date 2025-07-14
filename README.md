
Warning: src/app/company-full-view/company-full-view.component.html:55:91 - warning NG8107: The left side of this optional chain operation does not include 'null' or 'undefined' in its type, therefore the '?.' operator can be replaced with the '.' operator.

55               <span *ngIf="country.name.length>2" class="flag-input fi fi-{{country.code?.toLowerCase()}}"></span>
                                                                                             ~~~~~~~~~~~

  src/app/company-full-view/company-full-view.component.ts:30:15
    30  templateUrl: './company-full-view.component.html',
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component CompanyFullViewComponent.


Warning: src/app/main-view/main-view.component.html:202:113 - warning NG8107: The left side of this optional chain operation does not include 'null' or 'undefined' in its type, therefore the '?.' operator can be replaced with the '.' operator.

202                                     <span *ngIf="country.name.length>2" class="flag-input fi fi-{{country.code?.toLowerCase()}}"></span>
                                                                                                                    ~~~~~~~~~~~

  src/app/main-view/main-view.component.ts:51:15
    51  templateUrl: './main-view.component.html',
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component MainViewComponent.


Warning: C:\Users\BBDFQQF\g2g-ui\g2g-ui\src\app\utils\view-location\view-location.component.ts depends on 'leaflet'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies



Error: src/app/companies-view/companies-view.component.html:518:57 - error TS2551: Property 'showLabels' does not exist on type 'CompaniesViewComponent'. Did you mean 'showLables'?

518                         [legend]="showLegend" [labels]="showLabels" [doughnut]="isDoughnut"
                                                            ~~~~~~~~~~

  src/app/companies-view/companies-view.component.ts:106:15
    106  templateUrl: './companies-view.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component CompaniesViewComponent.


Error: src/app/companies-view/companies-view.component.html:519:26 - error TS2322: Type '{ domain: string[]; }' is not assignable to type 'string | Color'.
  Type '{ domain: string[]; }' is missing the following properties from type 'Color': name, selectable, group

519                         [scheme]="colorScheme" (select)="onSelect($event)">
                             ~~~~~~

  src/app/companies-view/companies-view.component.ts:106:15
    106  templateUrl: './companies-view.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component CompaniesViewComponent.


Error: src/app/companies-view/companies-view.component.html:550:39 - error TS2551: Property 'xAxisLabel2' does not exist on type 'CompaniesViewComponent'. Did you mean 'xAxisLabel'?

550                         [xAxisLabel]="xAxisLabel2" [yAxisLabel]="yAxisLabel2"
                                          ~~~~~~~~~~~

  src/app/companies-view/companies-view.component.ts:106:15
    106  templateUrl: './companies-view.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component CompaniesViewComponent.


Error: src/app/companies-view/companies-view.component.html:550:66 - error TS2551: Property 'yAxisLabel2' does not exist on type 'CompaniesViewComponent'. Did you mean 'yAxisLabel'?

550                         [xAxisLabel]="xAxisLabel2" [yAxisLabel]="yAxisLabel2"
                                                                     ~~~~~~~~~~~

  src/app/companies-view/companies-view.component.ts:106:15
    106  templateUrl: './companies-view.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component CompaniesViewComponent.


Error: src/app/companies-view/companies-view.component.html:551:26 - error TS2322: Type '{ domain: string[]; }' is not assignable to type 'string | Color'.

551                         [scheme]="colorScheme" (select)="onSelect($event)">
                             ~~~~~~

  src/app/companies-view/companies-view.component.ts:106:15
    106  templateUrl: './companies-view.component.html',
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component CompaniesViewComponent.

