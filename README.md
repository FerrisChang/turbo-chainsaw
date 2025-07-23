

  // Create a unique FormControl for each location's country input
  getCountryFormControl(companyIndex: number, locationIndex: number): FormControl {
    const key = `country_${companyIndex}_${locationIndex}`;
    if (!this.countryFormControls) {
      this.countryFormControls = new Map();
    }
    if (!this.countryFormControls.has(key)) {
      const control = new FormControl('');
      // Set up the value changes subscription for this specific control
      control.valueChanges.subscribe(value => {
        const filtered = this._filterCountries(value || '');
        this.countryFilterResults.set(key, filtered);
      });
      this.countryFormControls.set(key, control);
      // Initialize with all countries
      this.countryFilterResults.set(key, [...this.countryList]);
    }
    return this.countryFormControls.get(key)!;
  }

  // Get the filtered countries for a specific location (direct array, no async)
  getCountryFilterResults(companyIndex: number, locationIndex: number): string[] {
    const key = `country_${companyIndex}_${locationIndex}`;
    return this.countryFilterResults.get(key) || [...this.countryList];
  }

  countryFormControls: Map<string, FormControl> = new Map();
  countryFilterResults: Map<string, string[]> = new Map();






<mat-option *ngFor="let country of getCountryFilterResults(companyIndex, locationIndex); let i = index" [value]="country">
