import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryType } from './query-type';

export function getFormGroup(queryType: QueryType, fb: FormBuilder): FormGroup {
  let form: FormGroup;

  switch (queryType) {
    case 'hts':
      form = fb.group({
        'processing-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'preparer-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'from-tariff-number': [
          '',
          [Validators.required, Validators.pattern(/^\d{10}$/)],
        ],
        'to-tariff-number': [
          '',
          [Validators.required, Validators.pattern(/^\d{10}$/)],
        ],
        'as-of-date': ['', Validators.required],
      });
      break;
    case 'domestic':
      form = fb.group({
        'processing-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'preparer-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'port-code': ['', [Validators.required, Validators.maxLength(4)]],
      });
      break;
    case 'foreign':
      form = fb.group({
        'processing-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'preparer-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'port-code': ['', [Validators.required, Validators.maxLength(4)]],
      });
      break;
    case 'firms':
      form = fb.group({
        'processing-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'preparer-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'firms-code': [
          '',
           [Validators.required, Validators.maxLength(10)],
          ],
      });
      break;
    case 'country':
      form = fb.group({
        'processing-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'preparer-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'country-code-list': [
          '',
          [Validators.required, Validators.maxLength(10)],
        ],
      });
      break;
    case 'carrier':
      form = fb.group({
        'processing-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'preparer-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'carrier-code': ['', 
          [Validators.required, Validators.maxLength(10)],
        ],
      });
      break;
      case 'docSubmission':
      form = fb.group({
        'processing-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'preparer-port-code': [
          '',
          [Validators.required, Validators.maxLength(4)],
        ],
        'senderReceiverSiteCode':['',[Validators.required]],
        'senderReceiverIDCode':['',[Validators.required]],
        'portCodes':['',[Validators.required]],
        'transactionType':['',[Validators.required]],
        'govermentCodes':['',[Validators.required]],
        'document-id': ['', [Validators.required]],
        'fileExt': ['',Validators.required],
        'docDescription': ['', Validators.required],
        'fileName': ['', Validators.required],
        'documentLabelCode':[',',Validators.required],
        'documentObject':['', Validators.required],
        "transactionId" : ['', Validators.required],
        "transmissionDate" : ['', Validators.required],
        "submittedToPortCode" : ['', Validators.required],
        "actionCode" : ['', Validators.required],
        "transactionNumber" : ['', Validators.required],
        "transactionName" :['', Validators.required],
        "documentSentDate" :['', Validators.required],
        "cargoTransactionUUID":['',Validators.required],
      });
      break;
  }

  return form;
}



import { FormGroup } from '@angular/forms';
import { QueryType } from './query-type';
import {
  CarrierCodeList,
  CountryCodeList,
  DomesticPort,
  Firm,
  ForeignPort,
  HTS, DISsubmission
  
} from './request-payloads';

export function getPayload(
  queryType: QueryType,
  form: FormGroup
): HTS | DomesticPort | ForeignPort | Firm | CountryCodeList | CarrierCodeList | DISsubmission {
  // processingDistrictPortCode: required String max length 4
  // preparerDistrictPortCode: required String max length 4
  // codeList: Array of strings for domestic, foreign, and country elements are Strings max length 10 Firms

  let payload:
    | HTS
    | Firm
    | DomesticPort
    | ForeignPort
    | CarrierCodeList
    | CountryCodeList
    | DISsubmission;

  
  switch (queryType) {
    // HTS
    case 'hts': {
      payload = {
        tariffList: [
          {
            processingDistrictPortCode: form.get('processing-port-code')?.value as string,
            preparerDistrictPortCode: form.get('preparer-port-code')?.value as string,
            fromTariffNumber: form.get('from-tariff-number')?.value,
            toTariffNumber: form.get('to-tariff-number')?.value,
            asOfDate: form.get('as-of-date')?.value,
          },
        ],
        type: 'ha'
      };
      break;
    }
    // Domestic
    case 'domestic':
      payload = {
        processingDistrictPortCode: form.get('processing-port-code')
          ?.value as string,
        preparerDistrictPortCode: form.get('preparer-port-code')
          ?.value as string,
          codeList: [
          form.get('port-code')?.value as string,
        ],
        type: 'domestic',
      };
      break;
    case 'foreign':
      payload = {
        processingDistrictPortCode: form.get('processing-port-code')
          ?.value as string,
        preparerDistrictPortCode: form.get('preparer-port-code')
          ?.value as string,
        codeList: [form.get('port-code')?.value as string],
        type: 'foreign',
      };
      break;
    case 'firms':
      payload = {
        processingDistrictPortCode: form.get('processing-port-code')
          ?.value as string,
        preparerDistrictPortCode: form.get('preparer-port-code')
          ?.value as string,
        codeList: [
          {
            firmsCode: form.get('firms-code')?.value as string,
          },
        ],
        type: 'firms_cd',
      };
      break;
    case 'country':
      payload = {
        processingDistrictPortCode: form.get('processing-port-code')
          ?.value as string,
        preparerDistrictPortCode: form.get('preparer-port-code')
          ?.value as string,
        codeList: [form.get('country-code-list')?.value as string],
        type: 'country',
      };
      break;
    case 'carrier': 
      payload = {
        processingDistrictPortCode: form.get('processing-port-code')
          ?.value as string,
        preparerDistrictPortCode: form.get('preparer-port-code')
          ?.value as string,
        codeList: [
          {
            carrierCode: form.get('carrier-code')?.value as string,
          },
        ],
        type: 'carrier',
      };
      break;

      case 'docSubmission': 
      payload = {
        processingDistrictPortCode: form.get('processing-port-code')
          ?.value as string,
        preparerDistrictPortCode: form.get('preparer-port-code')
          ?.value as string,
          senderReceiverSiteCode: form.get('senderReceiverSiteCode')?.value as string,
          senderReceiverIDCode: form.get('senderReceiverIDCode')?.value as string,
        //  portCodes: form.get('portCodes')?.value as string,
        documentId: form.get('document-id')
          ?.value as string,
          //govermentCodes:form.get('govermentCodes')?.value as string,
          documentLabelCode:form.get('documentLabelCode')?.value as string,
          transactionType:form.get('transactionType')?.value as string,
        fileExt:form.get('fileExt')?.value as string,
        docDescription: form.get('docDescription')?.value as string,
        fileName: form.get('fileName')?.value as string,
        transmissionDate:form.get('transmissionDate')?.value,
        submittedToPortCode:form.get('submittedToPortCode')?.value as string,
        actionCode:form.get('actionCode')?.value as string,
        transactionNumber:form.get('transactionNumber')?.value as string,
        transactionName:form.get('transactionName')?.value as string,
        documentSentDate:form.get('documentSentDate')?.value ,
        transactionId:form.get('cargoTransactionUUID')?.value as string,
        documentObject: form.get('documentObject')?.value || '',
        type: 'docSubmission',
      };
      console.log("final Payload ", JSON.stringify(payload,null,2));
      break;
    
  }

  return payload;
}



export type QueryType =
  | 'hts'
  | 'domestic'
  | 'foreign'
  | 'firms'
  | 'country'
  | 'carrier'
  | 'docSubmission';

  
export interface QueryTypeFormControl {
  id: string;
  label: string;
  type: 'text' | 'date' | 'file'| 'select';
  formControlName: string;
  placeholder?: string;
  options?:{value:string; label:string}[];
  errorMessage?: string;
  maxLength?: number;
}

export const queryTypeLabel: Record<QueryType, string> = {
  hts: 'HTS Query',
  domestic: 'Domestic Ports',
  foreign: 'Foreign Ports',
  firms: 'Firms',
  country: 'Country',
  carrier: 'Carrier',
  docSubmission: 'DIS Submission',
};


export const queryTypeTitle: Record<QueryType, string> = {
  hts: 'Please enter a Valid HTS Code or range of HTS Codes',
  domestic: 'Please enter a Valid Port Code for the following transaction',
  foreign: 'Please enter a Valid Port Code for the following transaction',
  firms: 'Please enter a Valid Firms Code for the following transaction',
  country: 'Please enter a Valid Country Code for the following transaction',
  carrier: 'Please enter a Valid Carrier Code for the following transaction',
  docSubmission: 'Please enter a Valid DIS Submission for the following transaction',
};

export interface QueryBtnType {
  type: QueryType;
  label: string;
}
  // define the query type-specific controls
  export const queryTypeFormControls: Record<QueryType, QueryTypeFormControl[]> = {
    // hts
    hts: [
      {
        id: 'processing-port-code',
        type: 'text',
        label: 'Processing District Port Code',
        formControlName: 'processing-port-code',
        placeholder: 'Enter Processing Port Code',
        maxLength: 4,

      },
      {
        id: 'preparer-port-code',
        type: 'text',
        label: 'Preparer District Port Code',
        formControlName: 'preparer-port-code',
        placeholder: 'Enter Preparer Port Code',
        maxLength: 4,

      },
      {
        id: 'fromTariffNumber',
        type: 'text',
        label: 'From Tariff Number',
        formControlName: 'from-tariff-number',
        placeholder: 'Enter 10-digit tariff number',
        errorMessage: 'Must be a 10-digit number.',
        maxLength: 10,
      },
      {
        id: 'toTariffNumber',
        type: 'text',
        label: 'To Tariff Number',
        formControlName: 'to-tariff-number',
        placeholder: 'Enter 10-digit tariff number',
        errorMessage: 'Must be a 10-digit number.',
        maxLength: 10,
      },
      {
        id: 'asOfDate',
        type: 'date',
        label: 'As Of Date',
        formControlName: 'as-of-date',
        errorMessage: 'Please select a valid date.',
      },
    ],
    // domestic
    domestic: [
      {
        id: 'processing-port-code',
        type: 'text',
        label: 'Processing District Port Code',
        formControlName: 'processing-port-code',
        placeholder: 'Enter Processing Port Code',
        maxLength: 4,

      },
      {
        id: 'preparer-port-code',
        type: 'text',
        label: 'Preparer District Port Code',
        formControlName: 'preparer-port-code',
        placeholder: 'Enter Preparer Port Code',
        maxLength: 4,

      },
      {
        id: 'port-code',
        type: 'text',
        label: 'Port Code',
        formControlName: 'port-code',
        errorMessage: 'This field is required.',
        placeholder: 'Enter port code',
      },
    ],
    foreign: [
      {
        id: 'processing-port-code',
        type: 'text',
        label: 'Processing Foreign Port Code',
        formControlName: 'processing-port-code',
        placeholder: 'Enter Processing Port Code',
        maxLength: 4,

      },
      {
        id: 'preparer-port-code',
        type: 'text',
        label: 'Preparer Foreign Port Code',
        formControlName: 'preparer-port-code',
        placeholder: 'Enter Preparer Port Code',
        maxLength: 4,

      },
      {
        id: 'port-code',
        type: 'text',
        label: 'Port Code',
        formControlName: 'port-code',
        errorMessage: 'This field is required.',
        placeholder: 'Enter port code',
      },
    ],
    firms: [
      {
        id: 'processing-port-code',
        type: 'text',
        label: 'Processing District Port Code',
        formControlName: 'processing-port-code',
        placeholder: 'Enter Processing Port Code',
        maxLength: 4,

      },
      {
        id: 'preparer-port-code',
        type: 'text',
        label: 'Preparer District Port Code',
        formControlName: 'preparer-port-code',
        placeholder: 'Enter Preparer Port Code',
        maxLength: 4,

      },
      {
        id: 'firmsCode',
        type: 'text',
        label: 'Firms Code',
        formControlName: 'firms-code',
        placeholder: 'Enter Firms Code',
        errorMessage: 'This field is required.',
        maxLength: 10,

      },
    ],
    country: [
      {
        id: 'processing-port-code',
        type: 'text',
        label: 'Processing District Port Code',
        formControlName: 'processing-port-code',
        placeholder: 'Enter Processing Port Code',
        maxLength: 4,

      },
      {
        id: 'preparer-port-code',
        type: 'text',
        label: 'Preparer District Port Code',
        formControlName: 'preparer-port-code',
        placeholder: 'Enter Preparer Port Code',
        maxLength: 4,

      },
      {
        id: 'countryCodeList',
        type: 'text',
        label: 'Country Code List',
        formControlName: 'country-code-list',
        placeholder: 'Enter Country Code List',
        errorMessage: 'This field is required.',
        maxLength: 10,

      },
    ],
    carrier: [
      {
        id: 'processing-port-code',
        type: 'text',
        label: 'Processing District Port Code',
        formControlName: 'processing-port-code',
        placeholder: 'Enter Processing Port Code',
        maxLength: 4,

      },
      {
        id: 'preparer-port-code',
        type: 'text',
        label: 'Preparer District Port Code',
        formControlName: 'preparer-port-code',
        placeholder: 'Enter Preparer Port Code',
        maxLength: 4,

      },
      {
        id: 'carrier-code',
        type: 'text',
        label: 'Carrier Code',
        formControlName: 'carrier-code',
        placeholder: 'Enter Carrier Code',
        errorMessage: 'This field is required.',
        maxLength: 10,

      },
    ],
    //dis submissions
    docSubmission: [
      {
        id: 'processing-port-code',
        type: 'text',
        label: 'Processing District Port Code',
        formControlName: 'processing-port-code',
        placeholder: 'Enter Processing Port Code',
        maxLength: 4,

      },
      {
        id: 'preparer-port-code',
        type: 'text',
        label: 'Preparer District Port Code',
        formControlName: 'preparer-port-code',
        placeholder: 'Enter Preparer Port Code',
        maxLength: 4,

      },
      {
        id: 'senderReceiverIDCode',
        type: 'text',
        label: 'Sender Receiver ID Code',
        formControlName: 'senderReceiverIDCode',
        placeholder: 'Enter sender receiver id code',
      

      },
      {
        id: 'senderReceiverSiteCode',
        type: 'text',
        label: 'Sender Receiver Site Code',
        formControlName: 'senderReceiverSiteCode',
        placeholder: 'Enter sender receiver site code',
       
      },  
      {
        id: 'portCodes',
        type: 'select',
        label: 'Port Codes',
        formControlName: 'portCodes',
        options:[
          { value: '0', label: '<---Select --->' },  
          { value: '3181' , label: '3181 ST PAUL AIRPORT, AK' },
          { value: '3195' , label: '3195 FEDEX CORP ANCHORAGE HUB' },{ value: '3196' , label: '3196 UPS ANCHORAGE HUB' },{ value: '3201' , label: '3201 HONOLULU, HI' },{ value: '3202' , label: '3202 HILO, HI' },{ value: '3203' , label: '3203 KAHULUI, HI' },{ value: '3204' , label: '3204 NAWILIWILI-PORT ALLEN, H' },
          { value: '3205' , label: '3205 HONOLULU AIRPORT' },{ value: '3206' , label: '3206 KONA HI' },{ value: '3295' , label: '3295 INACTIVE DO NOT USE' },{ value: '3301' , label: '3301 RAYMOND, MT' },{ value: '3302' , label: '3302 EASTPORT, ID' },{ value: '3303' , label: '3303 SALT LAKE CITY, UT' },{ value: '3304' , label: '3304 GREAT FALLS, MT' },{ value: '3305' , label: '3305 BUTTE, MT' },{ value: '3306' , label: '3306 TURNER, MT' },
          { value: '3307' , label: '3307 DENVER, CO' },{ value: '3308' , label: '3308 PORTHILL, ID' },{ value: '3309' , label: '3309 SCOBEY, MT' },{ value: '3310' , label: '3310 SWEETGRASS, MT' },{ value: '3316' , label: '3316 PIEGAN, MT' },
          { value: '3317' , label: '3317 OPHEIM, MT' },{ value: '3318' , label: '3318 ROOSVILLE, MT' },{ value: '3319' , label: '3319 MORGAN, MT' },{ value: '3321' , label: '3321 WHITLASH, MT' },{ value: '3322' , label: '3322 DEL BONITA, MT' },{ value: '3323' , label: '3323 WILDHORSE, MT' },{ value: '3324' , label: '3324 KALISPELL, MT' },
          { value: '3325' , label: '3325 WILLOW CREEK, MT' },{ value: '3332' , label: '3332 INACTIVE DO NOT USE' },{ value: '3381' , label: '3381 MISSOULA USER FEE APT' },{ value: '3382' , label: '3382 INACTIVE DO NOT USE' },{ value: '3383' , label: '3383 JEFFCO USER FEE AIRPORT' },{ value: '3384' , label: '3384 CENTENNIAL AIRPORT' },{ value: '3385' , label: '3385 EAGLE COUNTY REGNL AIRPT' },
          { value: '3386' , label: '3386 BOZEMAN YELLOWSTONE UFA' },{ value: '3401' , label: '3401 PEMBINA, ND' },{ value: '3411' , label: '3411 FARGO INTL AIRPORT, ND' },{ value: '3416' , label: '3416 MAIDA, ND' },{ value: '3426' , label: '3426 ROSEAU, MN' },{ value: '3427' , label: '3427 GRAND FORKS AIRPORT' },{ value: '3428' , label: '3428 WINNIPEG INTL AIRPORT' },{ value: '3433' , label: '3433 WILLISTON AIRPORT' },{ value: '3434' , label: '3434 MINOT AIRPORT' },{ value: '3481' , label: '3481 INACTIVE DO NOT USE' },{ value: '3501' , label: '3501 MINNEAPOLIS-ST. PAUL, MN' },{ value: '3502' , label: '3502 SIOUX FALLS, SD' },{ value: '3510' , label: '3510 DULUTH, MN' },{ value: '3511' , label: '3511 ASHLAND, WI' },{ value: '3512' , label: '3512 OMAHA, NE' },{ value: '3513' , label: '3513 DES MOINES, IA' },{ value: '3581' , label: '3581 ROCHESTER, MN UFA' },{ value: '3614' , label: '3614 SILVER BAY, MN (INACTIVE' },{ value: '3701' , label: '3701 GEN MITCHELL INTL ARPT (' },{ value: '3703' , label: '3703 AUSTIN STRAUBEL INTL ARP' },{ value: '3708' , label: '3708 RACINE, WI' },{ value: '3801' , label: '3801 DETROIT, MI' },{ value: '3802' , label: '3802 PORT HURON, MI' },{ value: '3803' , label: '3803 SAULT STE. MARIE, MI' },{ value: '3804' , label: '3804 SAGINAW/BAY CITY, MI' },{ value: '3805' , label: '3805 BATTLE CREEK, MI' },{ value: '3806' , label: '3806 GRAND RAPIDS, MI' },{ value: '3807' , label: '3807 DETROIT METROPLTN AIRPRT' },{ value: '3808' , label: '3808 ESCANABA, MI' },{ value: '3809' , label: '3809 MARQUETTE, MI' },{ value: '3815' , label: '3815 MUSKEGON, MI' },{ value: '3816' , label: '3816 GRAND HAVEN, MI' },{ value: '3818' , label: '3818 ROGERS CITY, MI' },{ value: '3819' , label: '3819 DETOUR, MI' },{ value: '3820' , label: '3820 INACTIVE DO NOT USE' },{ value: '3822' , label: '3822 SOUTH HAVEN, MI' },{ value: '3842' , label: '3842 PRESQUE ISLE, MI' },{ value: '3843' , label: '3843 ALPENA, MI' },{ value: '3844' , label: '3844 FERRYSBURG, MI' },{ value: '3881' , label: '3881 OAKLAND CNTY -  MICHIGAN' },{ value: '3882' , label: '3882 WILLOW RUN AIRPORT' },{ value: '3883' , label: '3883 CAPITAL REGION INTL AIRP' },{ value: '3901' , label: '3901 CHICAGO, IL' },{ value: '3902' , label: '3902 PEORIA, IL' },{ value: '3904' , label: '3904 EAST CHICAGO, IN' },{ value: '3905' , label: '3905 GARY CHICAGO INTL ARPRT' },{ value: '3908' , label: '3908 DAVENPORT-ROCK ISLAND' },{ value: '3909' , label: '3909 ROCKFORD AIRPORT' },{ value: '3971' , label: '3971 ECCF FEDEX CHICAGO' },{ value: '3981' , label: '3981 WAUKEGAN AIRPORT' },{ value: '3983' , label: '3983 PAL-WAUKEE MNCPL AIRPORT' },{ value: '3984' , label: '3984 DUPAGE AIRPORT AUTH' },{ value: '3985' , label: '3985 DECATUR AIRPORT' },{ value: '3991' , label: '3991 DHL CHICAGO HUB' },{ value: '4101' , label: '4101 CLEVELAND, OH' },{ value: '4102' , label: '4102 CINCINNATI, OH' },{ value: '4103' , label: '4103 COLUMBUS, OH' },{ value: '4104' , label: '4104 DAYTON, OH' },{ value: '4105' , label: '4105 TOLEDO, OH' },{ value: '4106' , label: '4106 ERIE, PA' },{ value: '4110' , label: '4110 INDIANAPOLIS, IN' },{ value: '4115' , label: '4115 LOUISVILLE, KY' },{ value: '4116' , label: '4116 OWENSBORO-EVANSVILLE' },{ value: '4122' , label: '4122 ASHTABULA/CONNEAUT' },{ value: '4170' , label: '4170 INACTIVE DO NOT USE' },{ value: '4181' , label: '4181 INACTIVE DO NOT USE' },{ value: '4183' , label: '4183 FORT WAYNE AIRPORT UFA' },{ value: '4184' , label: '4184 BLUE GRASS AIRPORT UFA' },{ value: '4185' , label: '4185 HULMAN REGIONAL AIRPORT' },{ value: '4191' , label: '4191 INACTIVE DO NOT USE' },{ value: '4194' , label: '4194 INACTIVE DO NOT USE' },{ value: '4195' , label: '4195 INACTIVE DO NOT USE' },{ value: '4196' , label: '4196 UPS LOUISVILLE HUB' },{ value: '4197' , label: '4197 DHL CINCINNATI HUB' },{ value: '4198' , label: '4198 FEDEX CORP INDIANAPOLIS' },{ value: '4501' , label: '4501 KANSAS CITY, MO' },{ value: '4502' , label: '4502 ST JOSEPH, MO' },{ value: '4503' , label: '4503 ST. LOUIS, MO' },{ value: '4504' , label: '4504 WICHITA, KS' },{ value: '4505' , label: '4505 SPRINGFIELD, MO' },{ value: '4506' , label: '4506 SPIRIT OF ST LOUIS AIRPO' },{ value: '4581' , label: '4581 MIDAMERICA AIRPORT' },{ value: '4601' , label: '4601 NEW YORK/NEWARK AREA' },{ value: '4602' , label: '4602 PERTH AMBOY, NJ' },{ value: '4670' , label: '4670 ECCF UPS NEWARK' },{ value: '4671' , label: '4671 ECCF FEDEX CORP NEWARK' },{ value: '4681' , label: '4681 MORRISTOWN AIRPORT, NJ' },{ value: '4701' , label: '4701 JFK AIRPORT' },{ value: '4702' , label: '4702 INACTIVE DO NOT USE' },{ value: '4755' , label: '4755 INACTIVE DO NOT USE' },{ value: '4770' , label: '4770 INACTIVE DO NOT USE' },{ value: '4771' , label: '4771 ECCF NYACC JFK AIRPORT' },{ value: '4772' , label: '4772 ECCF DHL AIRWAYS JFK AIR' },{ value: '4773' , label: '4773 ECCF MICOM JFK' },{ value: '4774' , label: '4774 ECCF IBC JFK' },{ value: '4775' , label: '4775 INACTIVE DO NOT USE' },{ value: '4776' , label: '4776 INACTIVE DO NOT USE' },{ value: '4777' , label: '4777 INACTIVE DO NOT USE' },{ value: '4778' , label: '4778 ECCF FEDEX CORP JFK AIRP' },{ value: '4901' , label: '4901 AGUADILLA, PR' },{ value: '4904' , label: '4904 FAJARDO, PR' },{ value: '4905' , label: '4905 GUANICA, PR' },{ value: '4906' , label: '4906 HUMACAO, PR' },{ value: '4907' , label: '4907 MAYAGUEZ, PR' },{ value: '4908' , label: '4908 PONCE, PR' },{ value: '4909' , label: '4909 SAN JUAN, PR' },{ value: '4911' , label: '4911 JOBOS, PR' },{ value: '4912' , label: '4912 GUAYANILLA, PR' },{ value: '4913' , label: '4913 SAN JUAN INTL AIRPORT' },{ value: '5101' , label: '5101 CHARLOTTE AMALIE, USVI' },{ value: '5102' , label: '5102 CRUZ BAY, VI' },{ value: '5103' , label: '5103 CORAL BAY, VI' },{ value: '5104' , label: '5104 CHRISTIANSTED, VI' },{ value: '5201' , label: '5201 MIAMI, FL' },{ value: '5202' , label: '5202 KEY WEST, FL' },{ value: '5203' , label: '5203 PORT EVERGLADES, FL' },{ value: '5204' , label: '5204 WEST PALM BEACH, FL' },{ value: '5205' , label: '5205 FORT PIERCE, FL' },{ value: '5206' , label: '5206 MIAMI INTERNATIONAL AIRP' },{ value: '5210' , label: '5210 FT LAUDERDALE INTL AIRPT' },{ value: '5270' , label: '5270 ECCF INTL COURIER ASSN M' },{ value: '5272' , label: '5272 ECCF MIA/CFS MAIMI' },{ value: '5295' , label: '5295 UPS MIAMI HUB' },{ value: '5296' , label: '5296 DHL MIAMI HUB' },{ value: '5297' , label: '5297 FEDEX CORP MIAMI HUB' },{ value: '5298' , label: '5298 IBC MIAMI HUB' },{ value: '5299' , label: '5299 INACTIVE DO NOT USE' },{ value: '5301' , label: '5301 HOUSTON, TX' },{ value: '5306' , label: '5306 TEXAS CITY, TX' },{ value: '5309' , label: '5309 HOUSTON GEO. BUSH INTERC' },{ value: '5310' , label: '5310 GALVESTON, TX' },{ value: '5311' , label: '5311 FREEPORT, TX' },{ value: '5312' , label: '5312 CORPUS CHRISTI, TX' },{ value: '5313' , label: '5313 PORT LAVACA, TX' },{ value: '5314' , label: '5314 HOBBY INTL AIRPORT' },{ value: '5315' , label: '5315 ELLINGTON FIELD' },{ value: '5381' , label: '5381 SUGAR LAND REGIONAL UFA' },{ value: '5401' , label: '5401 WASHINGTON, DC  (DULLES)' },{ value: '5402' , label: '5402 REAGAN NATIONAL (DCA)' },{ value: '5501' , label: '5501 DALLAS/FT WORTH TX' },{ value: '5502' , label: '5502 AMARILLO, TX' },{ value: '5503' , label: '5503 LUBBOCK, TX' },{ value: '5504' , label: '5504 OKLAHOMA CITY, OK' },{ value: '5505' , label: '5505 TULSA, OK' },{ value: '5506' , label: '5506 AUSTIN, TX' },{ value: '5507' , label: '5507 SAN ANTONIO, TX' },{ value: '5582' , label: '5582 MIDLAND INTERNATIONAL UF' },{ value: '5583' , label: '5583 FORT WORTH ALLIANCE UFA' },{ value: '5584' , label: '5584 ADDISON AIRPORT UFA' },{ value: '5585' , label: '5585 COLLIN COUNTY REGIONAL U' },{ value: '5586' , label: '5586 ARDMORE MUNICIPAL AIRPOR' },{ value: '5587' , label: '5587 KELLY FIELD ANNEX' },{ value: '5588' , label: '5588 DALLAS LOVE FIELD UFA (D' },{ value: '7401' , label: '7401 PRECLEARANCE ST THOMAS U' },{ value: '9999' , label: '9999 FORMS DISTRIBUTION CENTR' },                                                                                                            
        ]
      },
      
      {
        id: 'govermentCodes',
        type: 'select',
        label: 'Government Agency Codes',
        formControlName: 'govermentCodes',
        options:[  
          { value: '0', label: '<---Select --->' },                                                                                                                                                                                                                                                                                                                         
          { value: 'ACE' , label:'ACE' },                                                                                                                
                                                                                                                                                                                
          { value: 'AMS' , label:'AMS' },                                                                                                                               

          { value: 'APH' , label:'APH' },                                                                                                                

          { value: 'ATF' , label:'ATF' },                                                                                                                   

          { value: 'BIS' , label:'BIS' },                                                                                                                    

          { value: 'BLS' , label:'BLS' },                                                                                                                 

          { value: 'BTS' , label:'BTS' },                                                                                                                   

          { value: 'UTC' , label:'UTC' },                                                                                                                

          { value: 'CBC' , label:'CBC' },                                                                                                                              

          { value: 'CBP' , label:'CBP' },                                                                                                                

          { value: 'CDC' , label:'CDC' },                                                                                                                             

          { value: 'CGD' , label:'CGD' },                                                                                                                             

          { value: 'CPS' , label:'CPS' },                                                                                                                

          { value: 'DCM' , label:'DCM' },                                                                                                                            

          { value: 'DEA' , label:'DEA' },                                                                                                                

          { value: 'DEE' , label:'DEE' },                                                                                                                

          { value: 'DTC' , label:'DTC' },                                                                                                                

          { value: 'ECO' , label:'ECO' },                                                                                                                              

          { value: 'EIA' , label:'EIA' },                                                                                                                     

          { value: 'EPA' , label:'EPA' },                                                                                                                  

          { value: 'ETA' , label:'ETA' },                                                                                                                   

          { value: 'FAA' , label:'FAA' },                                                                                                                  

          { value: 'FAS' , label:'FAS' },                                                                                                                  

          { value: 'FCC' , label:'FCC' },                                                                                                                               

          { value: 'FCN' , label:'FCN' },                                                                                                                               

          { value: 'FDA' , label:'FDA' },                                                                                                                 

          { value: 'FHA' , label:'FHA' },                                                                                                                 

          { value: 'FMC' , label:'FMC' },                                                                                                                              

          { value: 'FMS' , label:'FMS' },                                                                                                                               

          { value: 'FSI' , label:'FSI' },                                                                                                                     

          { value: 'FTZ' , label:'FTZ' },                                                                                                                   

          { value: 'FWS' , label:'FWS' },                                                                                                                               

          { value: 'GIP' , label:'GIP' },                                                                                                                   

          { value: 'IDV' , label:'IDV' },                                                                                                                   

          { value: 'IRS' , label:'IRS' },                                                                                                                    

          { value: 'MAR' , label:'MAR' },                                                                                                                              

          { value: 'NHT' , label:'NHT' },                                                                                                                               

          { value: 'NMF' , label:'NMF' },                                                                                                                              
          { value: 'NRC' , label:'NRC' },                                                                                                                              
          { value: 'OFA' , label:'OFA' },                                                                                                                
          { value: 'OFE' , label:'OFE' },                                                                                                                
          { value: 'OFM' , label:'OFM' },                                                                                                                             
          { value: 'OGC' , label:'OGC' },                                                                                                                             
          { value: 'OLM' , label:'OLM' },                                                                                                                             
          { value: 'OMC' , label:'OMC' },                                                                                                                           
          { value: 'OTX' , label:'OTX' },                                                                                                                 
          { value: 'PHM' , label:'PHM' },                                                                                                                             
          { value: 'TRP' , label:'TRP' },                                                                                                                 
          { value: 'TSA' , label:'TSA' },                                                                                                                   
          { value: 'TTB' , label:'TTB' },                                                                                                                  
          { value: 'DOL' , label:'DOL' },                                                                                                                                
        ]
      },
      {
        id: 'transactionType',
        type: 'select',
        label: 'Transaction Type',
        formControlName: 'transactionType',
        options:[
         { value: '0', label: '<---Select --->' },                                                                      
         { value: 'ACEActionIdentifier', label: 'ACEActionIdentifier' },
         { value: 'ADMISSION_NBR', label: 'ADMISSION_NBR' },
         { value: 'BATCH_NBR', label: 'BATCH_NBR' },
         { value: 'BOL_NBR', label: 'BOL_NBR' },
         { value: 'CIT_BATCH_NBR', label: 'CIT_BATCH_NBR' },
         { value: 'CIT_NBR', label: 'CIT_NBR' },
         { value: 'CONTINUOUS', label: 'CONTINUOUS' },
         { value: 'ENTRY_NBR', label: 'ENTRY_NBR' },
         { value: 'ENTRY_SUMMARY_NBR', label: 'ENTRY_SUMMARY_NBR' },
         { value: 'IMO_NBR', label: 'IMO_NBR' },
         { value: 'ISF_TRANSACTION_NBR', label: 'ISF_TRANSACTION_NBR' },
         { value: 'ITN', label: 'ITN' },
         { value: 'MNFCTR_RULING', label: 'MNFCTR_RULING' },
         { value: 'OFCL_RGSTRTN_NBR', label: 'OFCL_RGSTRTN_NBR' },
         { value: 'PIN', label: 'PIN' },
         { value: 'VIN', label: 'VIN' },
         { value: 'VSL_ID_NBR', label: 'VSL_ID_NBR' },
         { value: 'VSL_INSP_ID_NBR', label: 'VSL_INSP_ID_NBR' },
         { value: 'VSL_VYG_NBR', label: 'VSL_VYG_NBR' },
         { value: 'VSL_VYG_SGMT_NBR', label: 'VSL_VYG_SGMT_NBR' }, 
                                                                                                                                                                                                      
        ],
        placeholder: 'Select a transaction type',
  
      },

      {
        id: 'documentLabelCode',
        type: 'select',
        label: 'Document Label Code',
        formControlName: 'documentLabelCode',
        options:[
          { value: '0', label: '<--- Select --->' },                                                                                                                                               { value: '201BIFAC_CERT', label: '201BIFAC_CERT' }, 
          { value: '301_LITIGATION_SPREADSHEET', label: '301_LITIGATION_SPREADSHEET' },
           { value: '301STS_CERT', label: '301STS_CERT' },
           { value: '520D', label: '520D' },
           { value: '9802_ASSEMBLER_DECLARATION', label: '9802_ASSEMBLER_DECLARATION' },
           { value: '9802_IMPORT_DECLARATION', label: '9802_IMPORT_DECLARATION' },
           { value: 'ADCVD', label: 'ADCVD' },
           { value: 'AGOA_DECLARATION', label: 'AGOA_DECLARATION' },
           { value: 'AGOA_TEXTILE_VISA', label: 'AGOA_TEXTILE_VISA' },
           { value: 'AMS_FOREIGN_GOVT_EXPORT', label: 'AMS_FOREIGN_GOVT_EXPORT' },
           { value: 'AMS_FV_237_REQ_FOR_INSP', label: 'AMS_FV_237_REQ_FOR_INSP' }, 
           { value: 'AMS_FV_356_APPL_FOR_INSP', label: 'AMS_FV_356_APPL_FOR_INSP' }, 
           { value: 'AMS_FV_357_NOTIFICATION_OF_ENTRY', label: 'AMS_FV_357_NOTIFICATION_OF_ENTRY' }, 
           { value: 'AMS_FV_6_IMPORTERS_EXEMPT', label: 'AMS_FV_6_IMPORTERS_EXEMPT' }, 
           { value: 'AMS_LPS_222_IMPORT_ REQ_SHELL_EGGS', label: 'AMS_LPS_222_IMPORT_ REQ_SHELL_EGGS' }, 
           { value: 'APH_CERT_STAT_DOCS', label: 'APH_CERT_STAT_DOCS' },
           { value: 'APHIS_PERMIT', label: 'APHIS_PERMIT' },
           { value: 'APH_PERMIT_APP_DOCS', label: 'APH_PERMIT_APP_DOCS' },
           { value: 'APH_PHYTO_CERTIFICATE', label: 'APH_PHYTO_CERTIFICATE' },
           { value: 'APH_PHYTO_REEXPORT_CERTIFICATE', label: 'APH_PHYTO_REEXPORT_CERTIFICATE' },
           { value: 'APH_SUPPORTING_DOCS', label: 'APH_SUPPORTING_DOCS' }, { value: 'APPL_APPR_TO_MANIPULATE_SAMPLE_TRANSFER', label: 'APPL_APPR_TO_MANIPULATE_SAMPLE_TRANSFER' }, { value: 'APPL_FOR_ALLOWANCE_IN_DUTIES', label: 'APPL_FOR_ALLOWANCE_IN_DUTIES' }, { value: 'AR_EXPORT_WGJC_LICENSE', label: 'AR_EXPORT_WGJC_LICENSE' }, { value: 'ARTICLES_EXPORTED_RETURNED', label: 'ARTICLES_EXPORTED_RETURNED' }, { value: 'AUFTA_CERT_OF_ORIGIN', label: 'AUFTA_CERT_OF_ORIGIN' }, { value: 'AUTO_PRODUCTS', label: 'AUTO_PRODUCTS' }, { value: 'BEEF_EXPORT', label: 'BEEF_EXPORT' }, { value: 'BHFTA_DECLARATION', label: 'BHFTA_DECLARATION' }, { value: 'BILL_OF_LADING', label: 'BILL_OF_LADING' }, { value: 'BOAT_USCG_EXEMPT', label: 'BOAT_USCG_EXEMPT' }, { value: 'CAA_FAA_CERT', label: 'CAA_FAA_CERT' }, { value: 'CAFTA_DR_CERT_OF_ORIGIN', label: 'CAFTA_DR_CERT_OF_ORIGIN' }, { value: 'CANCELLATION', label: 'CANCELLATION' }, { value: 'CAS_NUMBER', label: 'CAS_NUMBER' }, { value: 'CBERA_CBI_DECL_TEXTILES', label: 'CBERA_CBI_DECL_TEXTILES' }, { value: 'CBMA_CONTROLLED_GROUP', label: 'CBMA_CONTROLLED_GROUP' }, { value: 'CBMA_IMPORTER_SPREADSHEET', label: 'CBMA_IMPORTER_SPREADSHEET' }, { value: 'CBMA_PRODUCER_CERTIFICATE', label: 'CBMA_PRODUCER_CERTIFICATE' }, { value: 'CBPF_214_APPLICATION_FOR_FTZ', label: 'CBPF_214_APPLICATION_FOR_FTZ' }, { value: 'CBPF_28', label: 'CBPF_28' }, { value: 'CBPF_29', label: 'CBPF_29' }, { value: 'CBPF_3229', label: 'CBPF_3229' }, { value: 'CBPF_3299', label: 'CBPF_3299' }, { value: 'CBPF_4455', label: 'CBPF_4455' }, { value: 'CBPF_4457', label: 'CBPF_4457' }, { value: 'CBPF_4647', label: 'CBPF_4647' }, { value: 'CBPF_6051D', label: 'CBPF_6051D' }, { value: 'CBPF_7514_DRAWBACK_NOTICE', label: 'CBPF_7514_DRAWBACK_NOTICE' }, { value: 'CBPF_7553_NOTICE_OF_INTENT', label: 'CBPF_7553_NOTICE_OF_INTENT' }, { value: 'CBTPA_CERT_OF_ORIGIN', label: 'CBTPA_CERT_OF_ORIGIN' }, { value: 'CDC_0728_IMPORT_ETIOLOGIC_AGENTS', label: 'CDC_0728_IMPORT_ETIOLOGIC_AGENTS' }, { value: 'CDC_APPL_TO_TRANSFER', label: 'CDC_APPL_TO_TRANSFER' }, { value: 'CDC_IMPORT_A_DOG', label: 'CDC_IMPORT_A_DOG' }, { value: 'CDC_IMPORT_AFRICAN_RODENTS', label: 'CDC_IMPORT_AFRICAN_RODENTS' }, { value: 'CDC_NONHUMAN_PRIMATE_NOTIFICATION', label: 'CDC_NONHUMAN_PRIMATE_NOTIFICATION' }, { value: 'CDC_NONINFECTIOUS_MATERIAL', label: 'CDC_NONINFECTIOUS_MATERIAL' }, { value: 'CDC_PERMISSION', label: 'CDC_PERMISSION' }, { value: 'CDC_RABIES_VACC', label: 'CDC_RABIES_VACC' }, { value: 'CENSUS', label: 'CENSUS' }, { value: 'CERTIFICATE_OF_COMPLIANCE', label: 'CERTIFICATE_OF_COMPLIANCE' }, { value: 'CERTIFICATION_OF_ORIGIN', label: 'CERTIFICATION_OF_ORIGIN' }, { value: 'CLFTA_CERT_OF_ORIGIN', label: 'CLFTA_CERT_OF_ORIGIN' }, { value: 'COD', label: 'COD' }, { value: 'COFR', label: 'COFR' }, { value: 'COFR_PTI', label: 'COFR_PTI' }, { value: 'COMMERCIAL_INVOICE', label: 'COMMERCIAL_INVOICE' }, { value: 'COPPER_FLUXING_MATERIAL', label: 'COPPER_FLUXING_MATERIAL' }, { value: 'COST_SUBMISSION', label: 'COST_SUBMISSION' }, { value: 'COTPA_CERT_OF_ORIGIN', label: 'COTPA_CERT_OF_ORIGIN' }, { value: 'COVID19_SELF_CERTIFICATION', label: 'COVID19_SELF_CERTIFICATION' }, { value: 'CPS_FORM_354_NOTICE_OF_CONDITIONAL_RELEASE', label: 'CPS_FORM_354_NOTICE_OF_CONDITIONAL_RELEASE' }, { value: 'CSR', label: 'CSR' }, { value: 'CULTURAL_PROPERTY', label: 'CULTURAL_PROPERTY' }, { value: 'DCM_DUTY_FREE_ENTRY', label: 'DCM_DUTY_FREE_ENTRY' }, { value: 'DEA_236_CONTROLLED_SUBSTANCES', label: 'DEA_236_CONTROLLED_SUBSTANCES' }, { value: 'DEA_35_PERMIT_TO_IMPORT', label: 'DEA_35_PERMIT_TO_IMPORT' }, { value: 'DEA_486A_IMPORT_DECLARATION', label: 'DEA_486A_IMPORT_DECLARATION' }, { value: 'DEA_486_LIST_I_AND_II', label: 'DEA_486_LIST_I_AND_II' }, { value: 'DECLARATION_BY_IMPORTER', label: 'DECLARATION_BY_IMPORTER' }, { value: 'DECLARATION_BY_INSTITUTION', label: 'DECLARATION_BY_INSTITUTION' }, { value: 'DECL_OF_ARTIST_SELLER_SHIPPER_CURATOR', label: 'DECL_OF_ARTIST_SELLER_SHIPPER_CURATOR' }, { value: 'DELIVERY_CERT_FOR_PURPOSES_OF_DRAWBACK', label: 'DELIVERY_CERT_FOR_PURPOSES_OF_DRAWBACK' }, { value: 'DELIVERY_RECORDS', label: 'DELIVERY_RECORDS' }, { value: 'DOC_01', label: 'DOC_01' }, { value: 'DOCS_FOR_COMMERCIAL_SAMPLES', label: 'DOCS_FOR_COMMERCIAL_SAMPLES' }, { value: 'DOCS_REQUIRED', label: 'DOCS_REQUIRED' }, { value: 'DOCS_REQUIRED_FOR_APPRAISEMENT', label: 'DOCS_REQUIRED_FOR_APPRAISEMENT' }, { value: 'DRAWBACK_1313BP_CERTIFICATION', label: 'DRAWBACK_1313BP_CERTIFICATION' }, { value: 'DRAWBACK_1313C_DOCUMENT', label: 'DRAWBACK_1313C_DOCUMENT' }, { value: 'DRAWBACK_1313P_CERTIFICATION', label: 'DRAWBACK_1313P_CERTIFICATION' }, { value: 'DRAWBACK_5062C_CERTIFICATION', label: 'DRAWBACK_5062C_CERTIFICATION' }, { value: 'DRAWBACK_ACCOUNTS_PAYABLE', label: 'DRAWBACK_ACCOUNTS_PAYABLE' }, { value: 'DRAWBACK_ACCOUNTS_RECEIVABLE', label: 'DRAWBACK_ACCOUNTS_RECEIVABLE' }, { value: 'DRAWBACK_BUSINESS_RECORDS_LAB_REPORT', label: 'DRAWBACK_BUSINESS_RECORDS_LAB_REPORT' }, { value: 'DRAWBACK_CERTIFICATE_OF_ANALYSIS', label: 'DRAWBACK_CERTIFICATE_OF_ANALYSIS' }, { value: 'DRAWBACK_CID_APPLICATION', label: 'DRAWBACK_CID_APPLICATION' }, { value: 'DRAWBACK_CID_APPROVAL_LETTER', label: 'DRAWBACK_CID_APPROVAL_LETTER' }, { value: 'DRAWBACK_CID_SUPPORTING_DOCUMENT', label: 'DRAWBACK_CID_SUPPORTING_DOCUMENT' }, { value: 'DRAWBACK_EXPORT_INVOICE', label: 'DRAWBACK_EXPORT_INVOICE' }, { value: 'DRAWBACK_EXPORT_WAIVER', label: 'DRAWBACK_EXPORT_WAIVER' }, { value: 'DRAWBACK_FINISHED_GOODS_INVENTORY', label: 'DRAWBACK_FINISHED_GOODS_INVENTORY' }, { value: 'DRAWBACK_INVENTORY_CONTROL_RECORDS', label: 'DRAWBACK_INVENTORY_CONTROL_RECORDS' }, { value: 'DRAWBACK_INVENTORY_RECORDS', label: 'DRAWBACK_INVENTORY_RECORDS' }, 
           { value: 'DRAWBACK_INVENTORY_TURNOVER_RECORDS', label: 'DRAWBACK_INVENTORY_TURNOVER_RECORDS' },
           { value: 'DRAWBACK_MANUFACTURING_RECORDS', label: 'DRAWBACK_MANUFACTURING_RECORDS' },
           { value: 'DRAWBACK_NAFTA', label: 'DRAWBACK_NAFTA' }, { value: 'DRAWBACK_NAFTA_CODING_SHEET', label: 'DRAWBACK_NAFTA_CODING_SHEET' }, { value: 'DRAWBACK_OIL_SPILL_CERTIFICATION', label: 'DRAWBACK_OIL_SPILL_CERTIFICATION' }, { value: 'DRAWBACK_OTW_APPROVAL_LETTER', label: 'DRAWBACK_OTW_APPROVAL_LETTER' }, { value: 'DRAWBACK_PRODUCTION_EXHIBIT', label: 'DRAWBACK_PRODUCTION_EXHIBIT' }, { value: 'DRAWBACK_PROOF_OF_EXPORTS', label: 'DRAWBACK_PROOF_OF_EXPORTS' }, { value: 'DRAWBACK_RECEIVING_REPORTS', label: 'DRAWBACK_RECEIVING_REPORTS' }, { value: 'DRAWBACK_SALES_ORDER_CONTRACT', label: 'DRAWBACK_SALES_ORDER_CONTRACT' }, { value: 'DRAWBACK_USMCA', label: 'DRAWBACK_USMCA' }, { value: 'DTC_DSP_61_TEMP_IMPORT', label: 'DTC_DSP_61_TEMP_IMPORT' }, { value: 'DTC_DSP_62_APPL_FOR_AMENDMENT', label: 'DTC_DSP_62_APPL_FOR_AMENDMENT' }, { value: 'DTC_DSP_73_TEMP_EXPORT', label: 'DTC_DSP_73_TEMP_EXPORT' }, { value: 'DTC_DSP_74_APPL_FOR_AMENDMENT', label: 'DTC_DSP_74_APPL_FOR_AMENDMENT' }, { value: 'DTC_DSP_85_PERM_TEMP_EXPORT_IMPORT', label: 'DTC_DSP_85_PERM_TEMP_EXPORT_IMPORT' }, { value: 'DUTY_FREE_ENTRY', label: 'DUTY_FREE_ENTRY' }, { value: 'ECO_AD_BUTT_WELD_PIPE_FITTINGS_OF_CN', label: 'ECO_AD_BUTT_WELD_PIPE_FITTINGS_OF_CN' }, { value: 'ECO_AD_CVD_ORGANIC_PASTA_OF_IT', label: 'ECO_AD_CVD_ORGANIC_PASTA_OF_IT' }, { value: 'ECO_AD_CVD_PASTA_OF_IT', label: 'ECO_AD_CVD_PASTA_OF_IT' }, { value: 'ECO_AD_CVD_SOLAR_CELLS_OF_CN', label: 'ECO_AD_CVD_SOLAR_CELLS_OF_CN' }, { value: 'ECO_AD_GLYCINE_OF_CN', label: 'ECO_AD_GLYCINE_OF_CN' }, { value: 'ECO_AD_SMALL_DIA_GRAPHITE_ELECTRODES_OF_CN', label: 'ECO_AD_SMALL_DIA_GRAPHITE_ELECTRODES_OF_CN' }, { value: 'ECO_AD_SOLAR_PROD_OF_TW', label: 'ECO_AD_SOLAR_PROD_OF_TW' }, { value: 'ECO_EXPORT_URANIUM_PROD', label: 'ECO_EXPORT_URANIUM_PROD' }, { value: 'ECO_EXPORT_URANIUM_PROD_OF_RU', label: 'ECO_EXPORT_URANIUM_PROD_OF_RU' }, { value: 'ECO_RE_EXPORT_URANIUM_PROD_OF_FR', label: 'ECO_RE_EXPORT_URANIUM_PROD_OF_FR' }, { value: 'ECO_RE_EXPORT_URANIUM_PROD_OF_RU', label: 'ECO_RE_EXPORT_URANIUM_PROD_OF_RU' }, { value: 'ECO_URANIUM_PROD', label: 'ECO_URANIUM_PROD' }, { value: 'ECO_URANIUM_PROD_OF_FR_END_USER', label: 'ECO_URANIUM_PROD_OF_FR_END_USER' }, { value: 'ECO_URANIUM_PROD_OF_RU', label: 'ECO_URANIUM_PROD_OF_RU' }, { value: 'ECO_URANIUM_PROD_OF_RU_END_USER', label: 'ECO_URANIUM_PROD_OF_RU_END_USER' }, { value: 'ECO_URANIUM_PROD_ORIGIN', label: 'ECO_URANIUM_PROD_ORIGIN' }, { value: 'ENTRY_SUMMARY_PACKAGE', label: 'ENTRY_SUMMARY_PACKAGE' }, { value: 'EPA_3520_1_IMPORTER_OF_MOTOR_V_E_ON_ROAD', label: 'EPA_3520_1_IMPORTER_OF_MOTOR_V_E_ON_ROAD' }, { value: 'EPA_3520_21_IMPORT_OF_MOTOR_V_E_OFF_ROAD', label: 'EPA_3520_21_IMPORT_OF_MOTOR_V_E_OFF_ROAD' }, { value: 'EPA_3540_1_NOA', label: 'EPA_3540_1_NOA' }, { value: 'EPA_CERTIFICATE_OF_ANALYSIS', label: 'EPA_CERTIFICATE_OF_ANALYSIS' }, { value: 'EPA_CONFIRMATION_NOTICE_TRANSSHIPMENT', label: 'EPA_CONFIRMATION_NOTICE_TRANSSHIPMENT' }, { value: 'EPA_IMPORT_OF_ODS', label: 'EPA_IMPORT_OF_ODS' }, { value: 'EPA_NON_OBJECTION_NOTICE', label: 'EPA_NON_OBJECTION_NOTICE' }, { value: 'EPA_PESTICIDE', label: 'EPA_PESTICIDE' }, { value: 'EPA_TSCA', label: 'EPA_TSCA' }, { value: 'EPA_V_E_EXEMPTION', label: 'EPA_V_E_EXEMPTION' }, { value: 'EUROPEAN_COMMUNITY_CHEESE_AFFIDAVIT', label: 'EUROPEAN_COMMUNITY_CHEESE_AFFIDAVIT' }, { value: 'FAS_LETTER_OF_EXEMPTION', label: 'FAS_LETTER_OF_EXEMPTION' }, { value: 'FAS_QUOTA_ELIGIBILITY', label: 'FAS_QUOTA_ELIGIBILITY' }, { value: 'FAS_SPECIALTY_SUGAR', label: 'FAS_SPECIALTY_SUGAR' }, { value: 'FREE_ENTRY_OF_RETURNED_AMERICAN_PROD', label: 'FREE_ENTRY_OF_RETURNED_AMERICAN_PROD' }, { value: 'FRESH_CHILLED_FROZEN_BEEF', label: 'FRESH_CHILLED_FROZEN_BEEF' }, { value: 'FSI_FORM_9540_1_IMPORT_INSPECT_APPL', label: 'FSI_FORM_9540_1_IMPORT_INSPECT_APPL' }, { value: 'FSI_MEAT_POULTRY_EXPORT', label: 'FSI_MEAT_POULTRY_EXPORT' }, { value: 'FWS_SUPPORTING_DOCS', label: 'FWS_SUPPORTING_DOCS' }, { value: 'GENERIC_DOC_TO_ALLOW_FDA_PN_REFUSAL', label: 'GENERIC_DOC_TO_ALLOW_FDA_PN_REFUSAL' }, { value: 'GENERIC_DOCUMENT', label: 'GENERIC_DOCUMENT' }, { value: 'GENERIC_DOCUMENT_2', label: 'GENERIC_DOCUMENT_2' }, { value: 'GOODS_MADE_BY_FORCED_LABOR', label: 'GOODS_MADE_BY_FORCED_LABOR' }, { value: 'GSP_DECLARATION', label: 'GSP_DECLARATION' }, { value: 'HHS_MILK_CREAM_IMPORT', label: 'HHS_MILK_CREAM_IMPORT' }, { value: 'HOPE_DECL_OF_COMPLIANCE', label: 'HOPE_DECL_OF_COMPLIANCE' }, { value: 'ILFTA_JOINT_COMMITTEE_CERT', label: 'ILFTA_JOINT_COMMITTEE_CERT' }, { value: 'IMPORTER_OF_CRUDE_PETROLEUM', label: 'IMPORTER_OF_CRUDE_PETROLEUM' }, { value: 'IMPORTER_SELF_CERTIFICATION', label: 'IMPORTER_SELF_CERTIFICATION' }, { value: 'INFORMAL_FOR_VESSEL_REPAIRS_PARTS_EQUIP', label: 'INFORMAL_FOR_VESSEL_REPAIRS_PARTS_EQUIP' }, { value: 'INGREDIENTS_LIST', label: 'INGREDIENTS_LIST' }, { value: 'INVOICE_WORKSHEET', label: 'INVOICE_WORKSHEET' }, { value: 'IP_DECLARATION', label: 'IP_DECLARATION' }, { value: 'IRS_FORM_6627', label: 'IRS_FORM_6627' }, { value: 'IRS_FORM_720', label: 'IRS_FORM_720' }, { value: 'IRS_FORM_720X', label: 'IRS_FORM_720X' }, { value: 'ISF_BOND_TYPE_16', label: 'ISF_BOND_TYPE_16' }, { value: 'JOFTA_DECLARATION', label: 'JOFTA_DECLARATION' }, { value: 'KIMBERLEY_PROCESS_EXPORT_CERT', label: 'KIMBERLEY_PROCESS_EXPORT_CERT' }, { value: 'KIMBERLEY_PROCESS_IMPORT_CERT', label: 'KIMBERLEY_PROCESS_IMPORT_CERT' }, { value: 'KORUS_CERT_OF_ORIGIN', label: 'KORUS_CERT_OF_ORIGIN' }, { value: 'LEGAL_EXPORT_EXEMPT', label: 'LEGAL_EXPORT_EXEMPT' }, { value: 'LICENSEE_AGREEMENT', label: 'LICENSEE_AGREEMENT' }, { value: 'LICENSING_AGREEMENT', label: 'LICENSING_AGREEMENT' }, { value: 'LL', label: 'LL' }, { value: 'MAFTA_DECLARATION', label: 'MAFTA_DECLARATION' }, { value: 'MAINTENANCE_AGREEMENT', label: 'MAINTENANCE_AGREEMENT' }, { value: 'MARKING_CERT_REPACKER_NOTICE', label: 'MARKING_CERT_REPACKER_NOTICE' }, { value: 'MASTER_RECORDS_METAL_MATRICES', label: 'MASTER_RECORDS_METAL_MATRICES' }, { value: 'MATCH_INSPECTION', label: 'MATCH_INSPECTION' }, { value: 'MX_EXPORT_SUGAR_LICENSE', label: 'MX_EXPORT_SUGAR_LICENSE' }, { value: 'NAFTA_CA_TEXTILE_CERT_OF_ELIGIBILITY', label: 'NAFTA_CA_TEXTILE_CERT_OF_ELIGIBILITY' }, { value: 'NAFTA_CERT_OF_ORIGIN', label: 'NAFTA_CERT_OF_ORIGIN' }, { value: 'NAFTA_MOTOR_VEHICLE_AVERAGING_ELECTION', label: 'NAFTA_MOTOR_VEHICLE_AVERAGING_ELECTION' }, { value: 'NAFTA_MX_TEXTILE_CERT_OF_ELIGIBILITY', label: 'NAFTA_MX_TEXTILE_CERT_OF_ELIGIBILITY' }, { value: 'NAFTA_TEXTILE_REQUIREMENTS', label: 'NAFTA_TEXTILE_REQUIREMENTS' }, { value: 'NAFTA_VERIF_OF_ORIGIN', label: 'NAFTA_VERIF_OF_ORIGIN' }, { value: 'NHT_HS_474_DOT_CONF_BOND', label: 'NHT_HS_474_DOT_CONF_BOND' }, { value: 'NHT_HS_7', label: 'NHT_HS_7' }, { value: 'NHT_INCOMPLETE_VEHICLE', label: 'NHT_INCOMPLETE_VEHICLE' }, { value: 'NHT_MOTOR_VEHICLE_EQUIP_MANUF', label: 'NHT_MOTOR_VEHICLE_EQUIP_MANUF' }, { value: 'NHT_OFFICIAL_ORDERS', label: 'NHT_OFFICIAL_ORDERS' }, { value: 'NHT_SIGNED_MANUF_COMPL', label: 'NHT_SIGNED_MANUF_COMPL' }, { value: 'NMF_CATCH_DOCS_ACCOMP_FRESH_AIR_SHIPPED_TOOTHFISH', label: 'NMF_CATCH_DOCS_ACCOMP_FRESH_AIR_SHIPPED_TOOTHFISH' }, { value: 'NMF_CCSBT_CATCH_MONITORING', label: 'NMF_CCSBT_CATCH_MONITORING' }, { value: 'NMF_CCSBT_RE_EXPORT_EXPORT', label: 'NMF_CCSBT_RE_EXPORT_EXPORT' }, { value: 'NMF_DISSOSTICHUS_CATCH', label: 'NMF_DISSOSTICHUS_CATCH' }, { value: 'NMF_DISSOSTICHUS_CATCH_CCAMLR', label: 'NMF_DISSOSTICHUS_CATCH_CCAMLR' }, { value: 'NMF_DISSOSTICHUS_RE_EXPORT', label: 'NMF_DISSOSTICHUS_RE_EXPORT' }, { value: 'NMF_IATTC_BIGEYE_TUNA', label: 'NMF_IATTC_BIGEYE_TUNA' }, { value: 'NMF_IATTC_BIGEYE_TUNA_RE_EXPORT', label: 'NMF_IATTC_BIGEYE_TUNA_RE_EXPORT' }, { value: 'NMF_ICCAT_BIGEYE_TUNA_RE_EXPORT', label: 'NMF_ICCAT_BIGEYE_TUNA_RE_EXPORT' }, { value: 'NMF_ICCAT_BIGEYE_TUNA_STAT', label: 'NMF_ICCAT_BIGEYE_TUNA_STAT' }, { value: 'NMF_ICCAT_BLUEFIN_TUNA_CATCH', label: 'NMF_ICCAT_BLUEFIN_TUNA_CATCH' }, { value: 'NMF_ICCAT_BLUEFIN_TUNA_RE_EXPORT', label: 'NMF_ICCAT_BLUEFIN_TUNA_RE_EXPORT' }, { value: 'NMF_ICCAT_SWORDFISH_RE_EXPORT', label: 'NMF_ICCAT_SWORDFISH_RE_EXPORT' }, { value: 'NMF_ICCAT_SWORDFISH_STAT', label: 'NMF_ICCAT_SWORDFISH_STAT' }, { value: 'NMF_IMPORT_RE_EXPORT_ANTARTIC_MARINE', label: 'NMF_IMPORT_RE_EXPORT_ANTARTIC_MARINE' }, { value: 'NMF_IOTC_BIGEYE_TUNA_RE_EXPORT', label: 'NMF_IOTC_BIGEYE_TUNA_RE_EXPORT' }, { value: 'NMF_IOTC_BIGEYE_TUNA_STAT', label: 'NMF_IOTC_BIGEYE_TUNA_STAT' }, { value: 'NMF_NOAA_370_FCO_PKG', label: 'NMF_NOAA_370_FCO_PKG' }, { value: 'NMF_TOOTHFISH_PRE_APPROVAL', label: 'NMF_TOOTHFISH_PRE_APPROVAL' }, { value: 'NMF_US_BLUEFIN_TUNA_CATCH', label: 'NMF_US_BLUEFIN_TUNA_CATCH' }, { value: 'NMF_US_IMP_CERTIFICATION_ADMISSIBILITY', label: 'NMF_US_IMP_CERTIFICATION_ADMISSIBILITY' }, { value: 'NOAA_370_FCO_PKG', label: 'NOAA_370_FCO_PKG' }, { value: 'NON_BEVERAGE_ETHEL_ALCOHOL_ATF_PERMIT', label: 'NON_BEVERAGE_ETHEL_ALCOHOL_ATF_PERMIT' }, { value: 'NON_COMMERCIAL_INVOICE', label: 'NON_COMMERCIAL_INVOICE' }, { value: 'OMC_DS_2031', label: 'OMC_DS_2031' }, { value: 'OMFTA_DECLARATION', label: 'OMFTA_DECLARATION' }, { value: 'OTHER', label: 'OTHER' }, { value: 'OTX_DR_EARNED_IMPORT_ALLOWANCE', label: 'OTX_DR_EARNED_IMPORT_ALLOWANCE' }, { value: 'OTX_HAITI_EARNED_IMPORT_ALLOWANCE', label: 'OTX_HAITI_EARNED_IMPORT_ALLOWANCE' }, { value: 'PACKING_LIST', label: 'PACKING_LIST' }, { value: 'PASSPORT_DL_GOVT_ISSUED_ID', label: 'PASSPORT_DL_GOVT_ISSUED_ID' }, { value: 'PATPA_CERT_OF_ORIGIN', label: 'PATPA_CERT_OF_ORIGIN' }, { value: 'PCC', label: 'PCC' }, { value: 'PEA', label: 'PEA' }, { value: 'PERMIT', label: 'PERMIT' }, { value: 'PERMIT_FILE_FOLDER', label: 'PERMIT_FILE_FOLDER' }, { value: 'PETPA_CERT_OF_ORIGIN', label: 'PETPA_CERT_OF_ORIGIN' }, { value: 'PHOTO_OR_IMAGE', label: 'PHOTO_OR_IMAGE' }, { value: 'PHYTOSANITARY_CERTIFICATE', label: 'PHYTOSANITARY_CERTIFICATE' }, { value: 'PLANT_PLANT_PRODUCTS_NOA', label: 'PLANT_PLANT_PRODUCTS_NOA' }, { value: 'PPQ_203_PRE_CLEARANCE_FORM', label: 'PPQ_203_PRE_CLEARANCE_FORM' }, { value: 'PRIOR_DISCLOSURE_LETTER  ', label: 'PRIOR_DISCLOSURE_LETTER  ' }, { value: 'PROFORMA_INVOICE', label: 'PROFORMA_INVOICE' }, { value: 'PROTEST', label: 'PROTEST' }, { value: 'PTPA_RECORDS', label: 'PTPA_RECORDS' }, { value: 'PUREBRED_BREEDING', label: 'PUREBRED_BREEDING' }, { value: 'REG', label: 'REG' }, { value: 'REJECT', label: 'REJECT' }, { value: 'RE_MELTING_CERTIFICATE', label: 'RE_MELTING_CERTIFICATE' }, { value: 'RESCUE_AND_RELIEF_EQUIP', label: 'RESCUE_AND_RELIEF_EQUIP' }, { value: 'ROYALTY_AGREEMENT', label: 'ROYALTY_AGREEMENT' }, { value: 'SE Other', label: 'SE Other' }, { value: 'SERIAL_NUMBERS', label: 'SERIAL_NUMBERS' }, { value: 'SERVICE_AGREEMENT', label: 'SERVICE_AGREEMENT' }, { value: 'SGFTA_CERT_OF_ORIGIN', label: 'SGFTA_CERT_OF_ORIGIN' }, { value: 'SOLAS_1', label: 'SOLAS_1' }, { value: 'SOLAS_2', label: 'SOLAS_2' }, { value: 'SOLAS_3', label: 'SOLAS_3' }, { value: 'SOLAS_4', label: 'SOLAS_4' }, { value: 'SOLAS_5', label: 'SOLAS_5' }, { value: 'SOLAS_6', label: 'SOLAS_6' }, { value: 'STB_TYPE_1', label: 'STB_TYPE_1' }, { value: 'STEEL_IMPORT_LICENSE', label: 'STEEL_IMPORT_LICENSE' }, { value: 'STIP_CERT_FOR_GOVT_SHIPMTS_DUTY_FREE_ENTRIES', label: 'STIP_CERT_FOR_GOVT_SHIPMTS_DUTY_FREE_ENTRIES' }, { value: 'SUGAR_CERT_OF_ELIGIBILITY', label: 'SUGAR_CERT_OF_ELIGIBILITY' }, { value: 'SWITCHBLADE_KNIVES', label: 'SWITCHBLADE_KNIVES' }, { value: 'TON', label: 'TON' }, { value: 'TRP_P1_PASTA_CERTIFICATE', label: 'TRP_P1_PASTA_CERTIFICATE' }, { value: 'TRP_P2_PASTA_CERTIFICATE', label: 'TRP_P2_PASTA_CERTIFICATE' }, { value: 'TTB_5100_31_LABEL_BOTTLE_APPROVAL', label: 'TTB_5100_31_LABEL_BOTTLE_APPROVAL' }, { value: 'TTB_5200_11_NOTICE_OF_RELEASE', label: 'TTB_5200_11_NOTICE_OF_RELEASE' }, { value: 'TTB_AGE_ORIGIN_IDENTITY_NON_STANDARD_FILL', label: 'TTB_AGE_ORIGIN_IDENTITY_NON_STANDARD_FILL' }, { value: 'TTB_BASIC_PERMIT', label: 'TTB_BASIC_PERMIT' }, { value: 'TTB_SPIRITS_FOR_USE_IN_US', label: 'TTB_SPIRITS_FOR_USE_IN_US' }, { value: 'TTB_TRANSFER_RECORD', label: 'TTB_TRANSFER_RECORD' }, { value: 'US_DEPT_OF_STATE_FOR_VISUAL_AUDITORY_MATERIALS', label: 'US_DEPT_OF_STATE_FOR_VISUAL_AUDITORY_MATERIALS' }, { value: 'USE_OF_CERTAIN_METAL_ARTICLES', label: 'USE_OF_CERTAIN_METAL_ARTICLES' }, { value: 'USMCA_AUTOMOTIVE_CERTIFICATE', label: 'USMCA_AUTOMOTIVE_CERTIFICATE' }, { value: 'USMCA_CA_TEXTILE_CERT_OF_ELIGIBILITY', label: 'USMCA_CA_TEXTILE_CERT_OF_ELIGIBILITY' }, { value: 'USMCA_MX_TEXTILE_CERT_OF_ELIGIBILITY', label: 'USMCA_MX_TEXTILE_CERT_OF_ELIGIBILITY' }, { value: 'VEHICLE_TITLE_CERTIFICATES', label: 'VEHICLE_TITLE_CERTIFICATES' }
        ]
      },
      
      {
        id: 'cargoTransactionUUID',
        type: 'text',
        label: 'Cargo Transaction UUID',
        formControlName: 'cargoTransactionUUID',
        placeholder: 'Enter the Cargo Transaction UUID',
        errorMessage: 'This field is required.',

      },
      
    {
      id: 'submittedToPortCode',
      type: 'text',
      label: 'Submitted to Port Code',
      formControlName: 'submittedToPortCode',
      placeholder: 'Enter the Submitted Port Code',
      errorMessage: 'This field is required.',

    },
    {
      id: 'actionCode',
      type: 'text',
      label: 'Action Code',
      formControlName: 'actionCode',
      placeholder: 'Enter the Action Code',
      errorMessage: 'This field is required.',

    },
    {
      id: 'transactionNumber',
      type: 'text',
      label: 'Transaction Number',
      formControlName: 'transactionNumber',
      placeholder: 'Enter the Transaction Number',
      errorMessage: 'This field is required.',

    },
    {
      id: 'transactionName',
      type: 'text',
      label: 'Transaction Name',
      formControlName: 'transactionName',
      placeholder: 'Enter the Transaction Name',
      errorMessage: 'This field is required.',

    },
    {
      id: 'transmissionDate',
      type: 'date',
      label: 'Transmission Date',
      formControlName: 'transmissionDate',
      errorMessage: 'Please select a valid date.',
    },
 
    {
      id: 'documentSentDate',
      type: 'date',
      label: 'Document Date',
      formControlName: 'documentSentDate',
      errorMessage: 'Please select a valid date.',
    },
      {
        id: 'document-id',
        type: 'text',
        label: 'Document ID',
        formControlName: 'document-id',
        placeholder: 'Enter the Document ID',
        errorMessage: 'This field is required.',
      

      },
      {
        id: 'docDescription',
        type: 'text',
        label: 'Document Description',
        formControlName: 'docDescription',
        placeholder: 'Enter the a description of the document',
        errorMessage: 'This field is required.',
    
      },
      {
        id: 'documentObject',
        type: 'file',
        label: 'File',
        formControlName: 'documentObject',
        placeholder: 'Please upload your file',
        errorMessage: 'This field is required.',
      },
      {
        id: 'fileExt',
        type: 'text',
        label: 'File Extention Type',
        formControlName: 'fileExt',
        placeholder: 'Enter the file extention type (.pdf, .docx, .xlsx)',
        errorMessage: 'This field is required.',
        maxLength: 7,

      },
     
      {
        id: 'fileName',
        type: 'text',
        label: 'File Name',
        formControlName: 'fileName',
        placeholder: 'Enter file name',
        errorMessage: 'This field is required.',
        maxLength: 100,
      },
   
    ],
  };




export interface HtsPayloadEntry {
    processingDistrictPortCode: string
    preparerDistrictPortCode: string
    fromTariffNumber: string
    toTariffNumber: string
    asOfDate: string
}
export interface HTS {
    tariffList: HtsPayloadEntry[],
    type: 'ha'
}

export interface DomesticPort {
    processingDistrictPortCode: string
    preparerDistrictPortCode: string
    codeList: string[]
    type: 'domestic'
}

export interface ForeignPort {
    processingDistrictPortCode: string
    preparerDistrictPortCode: string
    codeList: string[]
    type: 'foreign'
}

export interface FirmsCodeListEntry {
    firmsCode: string
}

export interface Firm {
    processingDistrictPortCode: string
    preparerDistrictPortCode: string
    codeList: FirmsCodeListEntry[]
    type: 'firms_cd'
}

export interface CountryCodeList {
    processingDistrictPortCode: string
    preparerDistrictPortCode: string
    codeList: string[]
    type: 'country'
}


export interface CarrierCodeListEntry {
    carrierCode: string
}

export interface CarrierCodeList {
    processingDistrictPortCode: string
    preparerDistrictPortCode: string
    codeList: CarrierCodeListEntry[]
    type: 'carrier'

}
export interface DISsubmission {
    processingDistrictPortCode: string
    preparerDistrictPortCode: string
    senderReceiverSiteCode: string
    senderReceiverIDCode:string
   // portCodes: string
    documentId: string
   // govermentCodes: string
    transactionType: string
    documentLabelCode: string
    fileExt: string
    docDescription: string
    fileName: string
    documentObject: string
    transactionId: string
    transmissionDate: string
    submittedToPortCode: string
    actionCode:string
    transactionNumber:string
    transactionName:string
    documentSentDate:string
    type: 'docSubmission'
}
