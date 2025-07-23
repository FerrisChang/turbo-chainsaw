  // Alternative method that takes location object directly
  getLocationCountryFilter(location: any): string[] {
    // Find the company and location indices
    for (let companyIndex = 0; companyIndex < this.companySubmissions.length; companyIndex++) {
      const company = this.companySubmissions[companyIndex];
      for (let locationIndex = 0; locationIndex < company.locations.length; locationIndex++) {
        if (company.locations[locationIndex] === location) {
          return this.getCountryFilterResults(companyIndex, locationIndex);
        }
      }
    }
    return [...this.countryList];
  }



                                        <mat-option *ngFor="let country of getLocationCountryFilter(location); let i = index" [value]="country">
