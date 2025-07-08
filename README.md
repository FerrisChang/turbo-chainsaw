	processMRACompaniesData() {
		console.log('Processing MRA companies data:', this.mraCompanies);
		
		if (this.mraCompanies && this.mraCompanies.length > 0) {
			// Process approval status data for pie chart
			const approvalStatusMap = new Map<string, number>();
			
			this.mraCompanies.forEach(company => {
				const status = company.mra_status.value;
				approvalStatusMap.set(status, (approvalStatusMap.get(status) || 0) + 1);
			});
			
			this.mraApprovalData = Array.from(approvalStatusMap.entries()).map(([status, count]) => ({
				name: status,
				value: count
			}));
			
			// Process country distribution data for second chart
			const countryMap = new Map<string, number>();
			
			this.mraCompanies.forEach(company => {
				const country = company.hostCountry;
				countryMap.set(country, (countryMap.get(country) || 0) + 1);
			});
			
			this.mraCountryData = Array.from(countryMap.entries()).map(([country, count]) => ({
				name: this.utils.translateCodeToCountry(country),
				value: count
			}));
			
			console.log('Pie chart data (approval status):', this.mraApprovalData);
			console.log('Bar chart data (country distribution):', this.mraCountryData);
		} else {
			// Default data if no MRA companies
			this.mraApprovalData = [
				{ name: 'Approved', value: 0 },
				{ name: 'Pending', value: 0 },
				{ name: 'Rejected', value: 0 }
			];
			
			this.mraCountryData = [
				{ name: 'No Data', value: 0 }
			];
			
			console.log('No MRA companies data available, using default data');
		}
	}
