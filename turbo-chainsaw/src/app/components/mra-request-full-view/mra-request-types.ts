export interface MRARequestCompanyTotalPayload {
    companyName?: string;
    companyG2gId?: string;
    selectedCountries?: string[];
    selectedMraStatus?: string[];
}

export interface Pagination {
    totalNumberOfElements: number;
    currentPage: number;
    totalPages: number;
} 