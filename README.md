                      <div class="add-search-params-section">
                          <button mat-stroked-button color="accent" class="add-search-params-btn" (click)="addMRASearchParameters()">
                              <mat-icon>add_circle</mat-icon>
                              Add Search Parameters
                          </button>
                      </div>




    .add-search-params-section {
      display: flex;
      justify-content: center;
      margin: 1rem 0;
      width: 100%;
    }

    .add-search-params-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: rgba(255, 64, 129, 0.1);
        border-color: #ff4081;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      mat-icon {
        font-size: 1.2rem;
        width: 1.2rem;
        height: 1.2rem;
      }
    }




    	addCompanySearchParameters() {
		// This method can be used to add additional search parameters
		// For now, it will open a dialog or expand the search form
		console.log('Adding company search parameters...');
		// You can implement additional logic here such as:
		// - Opening a dialog with more search options
		// - Expanding the search form with additional fields
		// - Adding dynamic search criteria
	}

	addMRASearchParameters() {
		// This method can be used to add additional search parameters for MRA requests
		// For now, it will open a dialog or expand the search form
		console.log('Adding MRA request search parameters...');
		// You can implement additional logic here such as:
		// - Opening a dialog with more search options
		// - Expanding the search form with additional fields
		// - Adding dynamic search criteria
	}







 
