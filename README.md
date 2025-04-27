
getCompaniesByFilter(payload: CompanyFilterTotalPayload, pagination: Pagination): Observable<any> {
    try {
      // Create a flat object for query parameters
      const queryParams: { [key: string]: string } = {
        page: pagination.page.toString(),
        size: pagination.size.toString()
      };

      console.log('Initial payload:', payload);
      console.log('Initial pagination:', pagination);

      // Add all company filter parameters if they exist
      if (payload.cmpny) {
        console.log('Processing company parameters:', payload.cmpny);
        Object.entries(payload.cmpny).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            // Convert camelCase to snake_case for API parameters
            const paramKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
            queryParams[paramKey] = value.toString();
            console.log(`Added company parameter: ${paramKey} = ${value}`);
          }
        });
      }

      // Add all location filter parameters if they exist
      if (payload.cmpnyLoc) {
        console.log('Processing location parameters:', payload.cmpnyLoc);
        Object.entries(payload.cmpnyLoc).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            // Convert camelCase to snake_case for API parameters
            const paramKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
            queryParams[paramKey] = value.toString();
            console.log(`Added location parameter: ${paramKey} = ${value}`);
          }
        });
      }

      console.log('Final query parameters:', queryParams);

      const options = {
        params: new HttpParams({ fromObject: queryParams }),
        headers: this.httpHeaders
      };

      console.log('Request URL:', `${this.endpoint}${this.companiesByFilter}`);
      console.log('Request options:', options);

      return this.http.get(`${this.endpoint}${this.companiesByFilter}`, options).pipe(
        tap(response => {
          console.log('API Response:', response);
        }),
        catchError(error => {
          console.error('API Error:', error);
          console.error('Error details:', {
            status: error.status,
            statusText: error.statusText,
            message: error.message,
            url: error.url,
            params: queryParams
          });
          throw error;
        })
      );
    } catch (error) {
      console.error('Error in getCompaniesByFilter:', error);
      throw error;
    }
  }
