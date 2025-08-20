hotListSearch(string: param) {
    if (param === "VCs_Today") {
    const yesterday = new Date();
    yesterday.setDate(this.today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(this.today.getDate() - 2);
    const queryParams = {
      from: this.today,
      to: this.tomorrow,
    };
    const url = this.router.createUrlTree(['/layout/search'], {
      queryParams,
      queryParamsHandling: 'merge',
    });
    this.router.navigateByUrl(url);
    } else if (param === 'Steel_VCs') {
      const queryParams = {
        type: this.selectedVerifiableCredential,
      };
      const url = this.router.createUrlTree(['/layout/search'], {
        queryParams,
        queryParamsHandling: 'merge',
      });
      this.router.navigateByUrl(url);
    } else if (param === 'Oil_&_Gas_VCs') {
      const queryParams = {
        type: this.selectedVerifiableCredential,
      };
      const url = this.router.createUrlTree(['/layout/search'], {
        queryParams,
        queryParamsHandling: 'merge',
      });
      this.router.navigateByUrl(url);
    }
  }
