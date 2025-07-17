import { Component, Inject } from '@angular/core';

import { read, utils } from "xlsx";
import { states } from '../services/resources/states';
import { Country, MRARequestCompanyLocationSubmission, MRARequestCompanySubmission, MRARequestSubmission, MraRequestSubmissionPayload } from '../mra-request-full-view/mra-request-types';
import { BackendapiService } from '../backendapi.service';
import { FormControl } from '@angular/forms';
import { emptyAlternativeID, emptyMraRequestCompanyLocationSubmission, emptyMraRequestCompanySubmission, emptyMraRequestSubmission } from '../mra-request-full-view/mra-request-models';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Company } from '../company-full-view/companies-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { variables } from 'src/environments/variables';
import { G2GCompany, G2GCompanyLocation } from '../services/G2GMessage-types';
import { UtilsService } from '../services/utils.service';


export interface DialogData {
  countryName: string;
  companyName: string;
  closeStatus: string;
}

export interface excelData {
  function: string;
  companyName: string;
  programName: string;
  companyStatus: string;
  certificationDate: string;
  ein: string;
  streetAdress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lastValidationDate: string;
}


@Component({
  selector: 'app-add-update-companies-dlg',
  templateUrl: './add-update-companies-dlg.component.html',
  styleUrls: ['./add-update-companies-dlg.component.scss']
})
export class AddUpdateCompaniesDlgComponent {
  constructor(private backendAPI: BackendapiService,
    private snackBar: MatSnackBar,
    private utils: UtilsService
  ) {

  }


  sendToCountry: string = '';

  companiesHeader = ['function', 'programName', 'ein', 'companyName', 'streetAdress', 'city', 'state', 'country', 'postalCode', 'companyStatus', 'certificationDate', 'lastValidationDate'];
  excelHeader = ['List function needed for record', 'Program Name', 'BEI Value', 'BEI Type', 'Account/Company Name', 'Comment', 'Street Adress', 'City', 'State', 'Country', 'Postal Code', 'Certification Date (MM/DD/YYYY)', 'Last Validation Date (MM/DD/YYYY)'];

  viewMode: number = 2;
  companiesData: excelData[] = [];
  companySubmissions: MRARequestCompanySubmission[] = [];
  availableCountries: Country[] = [];
  filteredCountries: Country[] = [];
  countriesForm: FormControl = new FormControl('');
  file: any;
  uploadEvent = '';
  arrayBuffer: any = '';
  exceljsondata: any = '';
  submitted = false;

  processedData: any = [];
  processedDataCount: number = 0;
  sendingRequest = false;

  submission: MRARequestSubmission = emptyMraRequestSubmission;
  fieldErrors: string[] = []; // all of the fields that are found to have errors
  actualSubmission: MraRequestSubmissionPayload | null = null;

  ngOnInit() {
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
  addError(fieldName: string) {
    if (!this.fieldErrors.includes(fieldName)) {
      this.fieldErrors.push(fieldName)
    }
  }
  removeError(fieldName: string) {
    let removeIndex = this.fieldErrors.indexOf(fieldName);
    if (removeIndex >= 0) {
      this.fieldErrors.splice(removeIndex, 1)
    }
  }
  removeCompany(companyIndex: number) {
    
    // makes sure that all errors that are related to the company is removed 
    this.fieldErrors = this.fieldErrors.filter((error)=>{
      return !error.includes(`Company ${companyIndex+1}`)
    })
    this.companySubmissions.splice(companyIndex, 1);
  }
  addCompanyLocation(companyIndex: number) {
    this.companySubmissions[companyIndex].locations.push(
      { ...emptyMraRequestCompanyLocationSubmission }
    )
  }
  submitRole(companyIndex: number, locationIndex: number) {
    this.companySubmissions[companyIndex].locations[locationIndex].roleList.push(
      this.companySubmissions[companyIndex].locations[locationIndex].roleInput
    )
    this.companySubmissions[companyIndex].locations[locationIndex].roleInput = "";
  }
  removeCompanyLocation(companyIndex: number, locationIndex: number) {
    // makes sure that all errors that are related to the company location is removed
    this.fieldErrors = this.fieldErrors.filter((error)=>{
      return !error.includes(`Location ${locationIndex+1}, Company ${companyIndex+1}`)
    })
    this.companySubmissions[companyIndex].locations.splice(locationIndex, 1);
  }
  removeAltID(companyIndex: number, locationIndex: number, idIndex: number) {
    // makes sure that all errors that are related to the company alternate id is removed
    this.fieldErrors = this.fieldErrors.filter((error)=>{
      return !error.includes(`ID ${idIndex+1}, Location ${locationIndex+1}, Company ${companyIndex+1}`)
    })
    this.companySubmissions[companyIndex].locations[locationIndex].alternateID.splice(idIndex, 1);
  }
  addAlternateID(companyIndex: number, locationIndex: number) {
    this.companySubmissions[companyIndex].locations[locationIndex].alternateID.push({ ...emptyAlternativeID })
  }
  clearCountryInput() {
    this.countriesForm.setValue('');
  }
  clearRole = (companyIndex: number, locationIndex: number, roleIndex: number) => {
    this.companySubmissions[companyIndex].locations[locationIndex].roleList.splice(roleIndex, 1);
  }
  submitMraRequest() {
    console.log("Field Errors: ", this.fieldErrors);
    let validated = this.fieldErrors.length > 0;
    if (validated) {
      this.snackBar.open(
        `Refer to the (i) icons for the validation errors`,
        'Close',
        {
          duration: 2500,
          panelClass: 'errorSnack',
        }
      );
    }
    else {
      this.submission.companies = this.companySubmissions;
      // creates the submission to submit the MRA Request
      let submission: MraRequestSubmissionPayload = {
        G2GMessage: {
          messageHeader: {
            messageType: variables.messageType,
            messageSpecification: variables.messageSpecification,
            messageSpecificationVersion: variables.messageSpecificationVersion,
            messageId: '',
            messageSentDate: new Date(),
            messageSenderId: '',
            messageSenderCountryCode: this.utils.translateCountryToCode(this.submission.country),
            comment: this.submission.comment
          },
          messageBody: {
            MRABenefitsRequest: {
              MRARequestId: '',
              hostCountryCode: this.submission.country,
              AEOProgramName: this.submission.aeo_program,
              companyInfoList: this.submission.companies.map((company) => {
                return {
                  companyInfo: {
                    G2GCompanyID: company.g2g_id,
                    TIN: company.tin,
                    companyName: company.name,
                    hostCountryCompanyId: company.hostCountryID,
                    hostCountryCompanyIdType: company.hostCountryIDType,
                    AEOAccountNumber: company.aeoAccountNumber,
                    companyLocationList: company.locations.map((location) => {
                      return {
                        companyLocation: {
                          isPrimaryLocation: location.primaryLocation,
                          companyAddress: {
                            addressLine1: location.addressLine1,
                            addressLine2: location.addressLine2,
                            city: location.city,
                            stateOrProvince: location.stateOrProvince,
                            postalCode: location.postalCode,
                            countryCode: this.utils.translateCountryToCode(location.country)
                          },
                          supplyChainRoleList: location.roleList,
                          alternateID: location.alternateID.map((altID) => {
                            return {
                              type: altID.type,
                              ID: altID.id
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        }
      }
      console.log("MRA Request Submission: ", submission)
      this.sendingRequest = true;
      this.backendAPI.submitMraRequest(submission).subscribe({
        next: () => {
          this.actualSubmission = submission;
          this.snackBar.open(
            `Message sent successfully. Refer to the JSON Below to see what was sent.`,
            'Close',
            {
              duration: 2500,
              panelClass: 'errorSnack',
            }
          );
          this.sendingRequest = false;
        },
        error: (err) => {
          console.log("Error: ", err)
          this.sendingRequest = false;
        }
      })
    }
  }

  onFileChange(event: any) {
    this.submitted = true;
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadEvent = event;
    }
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join("");
      const workbook = read(bstr, {
        type: "binary"
      });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.exceljsondata = utils.sheet_to_json(worksheet, {
        raw: true,
        defval: "",
      });
      console.log(this.exceljsondata);
      this.submitted = false;

      let functionCol2 = "List function needed for record: Add / Revoke / Edit";
      let functionCol1 = "List function needed for record";

      this.processedDataCount = 0;
      for (let i = 0; this.exceljsondata.length && i < 100; i++) {
        const row = this.exceljsondata[i];
        console.log(row);
        if (row && row !== undefined && row[functionCol1] && row[functionCol1] !== undefined &&
          (row[functionCol1] === 'Add' || row[functionCol1] === 'Update' || row[functionCol1] === 'Suspend') &&
          row['BEI Value'] !== undefined && row['BEI Value'] !== '') {
          this.processedData[this.processedDataCount] = [];
          console.log(row);



          for (let col = 0; col < this.excelHeader.length && col < 100; col++) {
            this.processedData[this.processedDataCount][this.excelHeader[col]] = '';  //assign a blank value before we assign what's in the excel file incase excel file is blank
            if (row[this.excelHeader[col]] !== undefined) {
              console.log(row[this.excelHeader[col]]);
              this.processedData[this.processedDataCount][this.excelHeader[col]] = row[this.excelHeader[col]];
            }
          }
          this.processedDataCount++;
        }
      }

      console.log(this.processedData);
      console.log(this.processedDataCount);
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadExcelToForm(event: any) {
    console.log("Uploading Excel...")
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadEvent = event;
    }
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.arrayBuffer = fileReader.result;
      // conversion work
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join("");
      const workbook = read(bstr, {
        type: "binary"
      });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // gets the worksheet name
      let sheet = utils.sheet_to_json(worksheet, {
        raw: true,
        defval: "",
      });
      let companyClusters = this.convertClusterToSmallerCluster(sheet, "company")
      this.companySubmissions = companyClusters.map((company: any) => {
        let companyReference = company[0];
        return {
          name: companyReference["Company Name"],
          g2g_id: companyReference["G2G ID"],
          tin: companyReference["TIN"],
          hostCountryID: companyReference["Host Country ID"],
          hostCountryIDType: companyReference["Host Country ID Type"],
          aeoAccountNumber: companyReference["AEO Account Number"],
          locations: this.convertClusterToSmallerCluster(company, "location").map((location) => {
            let locationReference = location[0]
            return {
              primaryLocation: locationReference["Primary Location?"],
              addressLine1: locationReference["Address Line 1"],
              addressLine2: locationReference["Address Line 2"] || "",
              city: locationReference["City"],
              stateOrProvince: locationReference["State or Province"],
              country: locationReference["Country"],
              postalCode: locationReference["Postal Code"],
              roleInput: "",
              roleList: locationReference["Roles"].split(",") || [],
              alternateID: location.map((alternateID: any) => {
                return {
                  type: alternateID["Alternate ID Type"],
                  id: alternateID["Alternate ID"]
                }
              })
            }
          })
        }
      })
      console.log("Excel Data: ", sheet);
      console.log("Clusters relating to it: ", companyClusters);
      console.log("Company Submissions: ", this.companySubmissions);
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  convertClusterToSmallerCluster(cluster: any, type: string) {
    let result: any[] = []
    let currentCluster = [cluster[0]];  // assumes that the first guy is probably good
    let newCluster = false;
    for (let row of cluster.slice(1)) {
      // based on type of cluster, the conditions to identify new cluster will change
      switch (type) {
        case "company":
          newCluster = row["Company Name"].length > 0
          break;
        case "location":
          newCluster = row["Address Line 1"].length > 0
          break;
      }
      if (newCluster) {
        result.push(currentCluster); // gets the last cluster and now it updates to the new cluster
        currentCluster = [row];
      }
      else {
        currentCluster.push(row);
      }
    }
    result.push(currentCluster); // retrieves the last cluster that isn't added yet 
    return result;
  }
  convertCompanyClusterToLocationClusters(companyCluster: any) {

  }

  addCompanyRow() {
    this.companySubmissions.push({ ...emptyMraRequestCompanySubmission });
  }
  removeCompanyRow(index: number) {
    console.log('removeRow: ' + index);
    this.companySubmissions.splice(index, 1);
  }

  usStates = states;

  apiCompanies: any = {};

  submitToSelectedCountry() {

    this.sendingRequest = true;
    setTimeout(() => {
      this.sendingRequest = false;
    }, 3500);
    this.saveOrUpdateCompany();
  }


  saveOrUpdateCompany() {


  }

}
