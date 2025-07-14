Error: src/app/companies-view/companies-view.component.html:518:57 - error TS2551: Property 'showLabels' does not exist on type 'CompaniesViewComponent'. Did you mean 'showLables'?

518                         [legend]="showLegend" [labels]="showLabels" [doughnut]="isDoughnut"
                                                            ~~~~~~~~~~

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


Error: src/app/companies-view/companies-view.component.ts:568:33 - error TS2551: Property 'translateCodeToCounrty' does not exist on type 'UtilsService'. Did you mean 'translateCodeToCountry'?

568   this.hostCountry = this.utils.translateCodeToCounrty(this.hostCountryIso)
                                    ~~~~~~~~~~~~~~~~~~~~~~

  src/app/services/utils.service.ts:23:3
    23   translateCodeToCountry(countryCode: string) : any {
         ~~~~~~~~~~~~~~~~~~~~~~
    'translateCodeToCountry' is declared here.
