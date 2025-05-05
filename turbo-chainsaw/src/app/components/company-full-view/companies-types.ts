
export type companyFilterTotlaPayload = {
  searchRequest: {
    cmpny: CompanyPayload,
    cmpnyLoc: CompanyLocationPayload
  }
    };

export type CompanyOnMapView = {
  id: number,
  hostCountry: string,
  name: string,
  mra_status: {
    class: string,
    value: string
  },
  companyAddress: string,
  containers: number,
  monetaryValue: number,
  companyID: CountryCompanyID,
  g2gID: string,
  lastupdated: Date,
  aeoCertDate: Date,
  aeoLastCertDate: Date,
  tin: string,
  roleList: string[],
  latlon: [any, any],
  company: Company
}
export type CountryCompanyID = {
  idType: string,
  id: string
}
export type ChartEntry = {
  name: string,
  value: number
}
export type Company = {
  cmpnyObjId: number,
  hostCtryCmpnyIdType: string, 
  hostCtryCmpnyId: string,
  aeoAccntNbr: string,
  tin: string,
  cmpnyNm: string,
  aeoCertDt: Date,
  aeoRecertDt: Date,
  cmpnyUuid: string,
  apprvlStusCd: string,
  apprvlStusDttm: Date,
  mdVal: number,
  isLtstInd: boolean,
  st: string,
  cmt: string,
  entyType: string,
  g2gCmpnyId: string,
  rolList: string,
  cntryCd: string,
  crteDttm: Date,
  updtDttm: Date,
  usrAudit: string,
  isLatest: boolean,
  cmpnyLocList: CompanyLocation[]
}
export type CompanyLocation = {
  cmpnyLocObjId: number,
  cmpnyObjId: number,
  isPrmryLoc: boolean,
  cmpnyAddr: string,
  addrLine1: string,
  addrLine2: string,
  stOrProvince: string,
  city: string,
  postalCd: string,
  cntryCd: string,
  rolList: string,
  mdVal: number,
  latud: number,
  lngtud: number,
  crteDttm: Date,
  updtDttm: Date,
  cmpnyLocAltidList: CompanyLocationAltid[]
}
export type CompanyLocationPayload = {
  cmpnyLocObjId?: number,
  cmpnyObjId?:number,
  isPrmryLoc?: boolean,
  cmpnyAddr?: string,
  addrLine1?: string,
  addrLine2?: string,
  stOrProvince?: string,
  city?: string,
  postalCd?: string,
  cntryCd?: string,
  rolList?: string,
  midVal?: number,
  latud?: string,
  lngtud?: string,
  crteDttm?: Date,
  updtDttm?: Date,
  cmpnyLocAltidList?: CompanyLocationAltid[]
}
export type CompanyLocationAltID = {
  cmpnyLocAltidObjId: number,
  cmpnyLocObjId: number,
  cmpnyAltidTyp: string,
  cmpnyAltidNbr: string,
}
export type CompanyLocationAltIDPayload = {
  cmpnyLocAltidObjId?: number,
  cmpnyLocObjId?: number,
  cmpnyAltidTyp?: string,
  cmpnyAltidNbr?: string,
}
export type CompanyPayload = {
  cmpnyObjId?: number,
  hostCtryCmpnyIdType?: string,
  hostCtryCmpnyId?: string,
  aeoAccntNbr?: string,
  tin?: string,
  cmpnyNm?: string,
  aeoCertDt?: Date,
  aeoRecertDt?: Date,
  cmpnyUuid?: string,
  apprvlStusCd?: string,  
  apprvlStusDttm?: Date,
  mdVal?: number,
  isLtstInd?: boolean,
  st?: string,
  cmt?: string,
  entyType?: string,
  g2gCmpnyId?: string,
  rolList?: string,
  cntryCd?: string,
  crteDttm?: Date,
  updtDttm?: Date,
  usrAudit?: string,  
  isLatest?: boolean
}