                                        <input  
                                            [class.error]="fieldErrors.includes('Country for Location '+(locationIndex+1)+', Company '+(companyIndex+1)) && location.country.length" 
                                            class="form-control input-content line-spacing" 
                                            type="text"
                                            [(ngModel)]="location.country"
                                            [matAutocomplete]="autoCountries"
                                            [formControl]="ctryControl"
                                        />
                                        <mat-autocomplete #autoCountries="matAutocomplete">
                                            <mat-option *ngFor="let country of countryList; let i = index" [value]="country">
                                                {{country}}
                                            </mat-option>
                                        </mat-autocomplete>







ctryControl = new FormControl('');
  countryList: string[] = [ "Afghanistan", "Albania","Algeria", "Andorra", "Angola", "Argentina", "Australia", "Austria", "Brazil", "Canada", "China", "Egypt", "France", "Germany", "India", "Indonesia", "Italy", "Japan", "Mexico", "Netherlands", "New Zealand", "Nigeria", "Pakistan", "Russia", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Turkey", "United Kingdom", "United States",];
  countryFilter!: Observable<string[]>;







    ngOnInit() {
    this.countryFilter = this.ctryControl.valueChanges.pipe(
      startWith(''),
      map(i => this._ctryFilter(i || '')),
    );

    this.backendAPI.availableCountries.subscribe((countries) => {
      this.availableCountries = countries;
    })
    this.countriesForm.valueChanges.subscribe(filteredValue => {
      this.submission.country = filteredValue;
      this.filteredCountries = this.availableCountries.filter((country) => {
        return country.name.toLowerCase().includes(filteredValue.toLowerCase())
      })
    })
  }

  private _ctryFilter(country: string): string[] {
    const filterCountry = country.toLowerCase();
    return this.countryList.filter(country => country.toLowerCase().includes(filterCountry))
  }




                                        
