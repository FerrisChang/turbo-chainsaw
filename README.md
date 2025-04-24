export type CompanyFilterTotalPayload = {
    cmpny: CompanyPayload,
    cmpnyLoc: CompanyLocationPayload
}

// which fields are the most usable?
export type CompanyOnMapView = {
    id : number, // unique ui identifier 
    hostCountry: string,//countryData.ctry,
    name: string, //countryData.cmpnyNm, 
    mra_status: {
        class: string, 
        value: string
    },
    companyAddress: string,//compAddr,
    containers: number, // shipment data
    monetaryValue: number, // shipment data 
    companyID : CountryCompanyID, // company id
    g2gID: string,
    lastUpdated: Date, // company information last updated
    aeoCertDate: Date,  // when aeo certed this 
    aeoLastCertDate: Date // when aeo was last certed
    tin: string,
    roleList : string [], 
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
    cmpnyObjId: number
    hostCtryCmpnyIdTyp: string,
    hostCtryCmpnyId: string,
    aeoAccntNbr: string,
    tin: string,
    cmpnyNm: string,
    aeoCertDt: Date,
    aeoRecertDt: Date,
    cmpnyUuid: string,
    apprvlStusCd: string,
    apprvlStusDttm: Date,
    midVal: number,
    isLtstInd: boolean,
    st: string,
    cmt: string,
    entyTyp: string,
    g2gCmpnyId: string,
    rolList: string,
    cntryCd: string,
    crteDttm: Date,
    updtDttm: Date,
    usrAudit: string,
    isLatest: boolean
    cmpnyLocList: CompanyLocation[]
}

export type CompanyLocation = {
    cmpnyLocObjId: number,
    cmpnyObjId: number,
    isPrmryLoc: boolean,
    cmpnyAddr: string,
    addrLne1: string,
    addrLne2: string,
    stOrProvince: string,
    city: string,
    postalCd: string,
    cntryCd: string,
    rolList: string,
    midVal: number,
    latud: number,
    lngtud: number,
    crteDttm: Date,
    updtDttm: Date,
    cmpnyLocAltidList: CompanyLocationAltID []
}
export type CompanyLocationPayload = {
    cmpnyLocObjId?: number,
    cmpnyObjId?: number,
    isPrmryLoc?: boolean,
    cmpnyAddr?: string,
    addrLne1?: string,
    addrLne2?: string,
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
    cmpnyLocAltidList?: CompanyLocationAltIDPayload []
}
export type CompanyLocationAltID = {
    cmpnyLocAltidObjId: number,
    cmpnyLocObjId: number,
    cmpnyAltidTyp: string,
    cmpnyAltidNbr: string
}
export type CompanyLocationAltIDPayload = {
    cmpnyLocAltidObjId?: number,
    cmpnyLocObjId?: number,
    cmpnyAltidTyp?: string,
    cmpnyAltidNbr?: string
}
export type CompanyPayload = {
    cmpnyObjId?: number
    hostCtryCmpnyIdTyp?: string,
    hostCtryCmpnyId?: string,
    aeoAccntNbr?: string,
    tin?: string,
    cmpnyNm?: string,
    aeoCertDt?: Date,
    aeoRecertDt?: Date,
    cmpnyUuid?: string,
    apprvlStusCd?: string,
    apprvlStusDttm?: Date,
    midVal?: number,
    isLtstInd?: boolean,
    st?: string,
    cmt?: string,
    entyTyp?: string,
    g2gCmpnyId?: string,
    rolList?: string,
    cntryCd?: string,
    crteDttm?: Date,
    updtDttm?: Date,
    usrAudit?: string,
    isLatest?: boolean
}

