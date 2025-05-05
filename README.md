
							cmpnyObjId: element.cmpnyObjId,
							hostCtryCmpnyIdTyp: element.hostCtryCmpnyIdTyp,
							hostCtryCmpnyId: element.hostCtryCmpnyId,
							aeoAccntNbr: element.aeoAccntNbr,
							tin: element.tin,
							cmpnyNm: element.cmpnyNm,
							aeoCertDt: element.aeoCertDt,
							aeoRecertDt: element.aeoRecertDt,
							cmpnyUuid: element.cmpnyUuid,
							apprvlStusCd: element.apprvlStusCd,
							apprvlStusDttm: element.apprvlStusDttm,
							midVal: element.midVal,
							isLtstInd: element.isLtstInd,
							st: element.st,
							cmt: element.cmt,
							entyTyp: element.entyTyp,
							g2gCmpnyId: element.g2gCmpnyId,
							rolList: element.rolList,
							cntryCd: element.cntryCd,
							crteDttm: element.crteDttm,
							updtDttm: element.updtDttm,
							usrAudit: element.usrAudit,
							isLatest: element.isLatest


         cmpnyObjId: number;
	hostCtryCmpnyIdTyp: string;
	hostCtryCmpnyId: string;
	aeoAccntNbr: string;
	tin: string;
	cmpnyNm: string;
	aeoCertDt: Date;
	aeoRecertDt: Date;
	cmpnyUuid: string;
	apprvlStusCd: string;
	apprvlStusDttm: Date;
	midVal: number;
	isLtstInd: boolean;
	st: string;
	cmt: string;
	entyTyp: string;
	g2gCmpnyId: string;
	rolList: string;
	cntryCd: string;
	crteDttm: Date;
	updtDttm: Date;
	usrAudit: string;
	isLatest: boolean;


                           <div class="row">
                            <div class="col-md-6">
                              <p><strong>Company Object ID:</strong> {{company.cmpnyObjId}}</p>
                              <p><strong>Host Country ID Type:</strong> {{company.hostCtryCmpnyIdTyp}}</p>
                              <p><strong>Host Country ID:</strong> {{company.hostCtryCmpnyId}}</p>
                              <p><strong>AEO Account Number:</strong> {{company.aeoAccntNbr}}</p>
                              <p><strong>TIN:</strong> {{company.tin}}</p>
                              <p><strong>Company Name:</strong> {{company.cmpnyNm}}</p>
                              <p><strong>AEO Cert Date:</strong> {{company.aeoCertDt | date}}</p>
                              <p><strong>AEO Recert Date:</strong> {{company.aeoRecertDt | date}}</p>
                            </div>
                            <div class="col-md-6">
                              <p><strong>Company UUID:</strong> {{company.cmpnyUuid}}</p>
                              <p><strong>Approval Status:</strong> {{company.apprvlStusCd}}</p>
                              <p><strong>Approval DateTime:</strong> {{company.apprvlStusDttm | date}}</p>
                              <p><strong>Mid Value:</strong> {{company.midVal}}</p>
                              <p><strong>Is Latest:</strong> {{company.isLtstInd}}</p>
                              <p><strong>State:</strong> {{company.st}}</p>
                              <p><strong>Entity Type:</strong> {{company.entyTyp}}</p>
                              <p><strong>G2G Company ID:</strong> {{company.g2gCmpnyId}}</p>
                            </div>
                          </div>
                          <div class="row mt-3">
                            <div class="col-12">
                              <p><strong>Role List:</strong> {{company.rolList}}</p>
                              <p><strong>Country Code:</strong> {{company.cntryCd}}</p>
                              <p><strong>Create DateTime:</strong> {{company.crteDttm | date}}</p>
                              <p><strong>Update DateTime:</strong> {{company.updtDttm | date}}</p>
                              <p><strong>User Audit:</strong> {{company.usrAudit}}</p>
                              <p><strong>Comment:</strong> {{company.cmt}}</p>
                            </div>
                          </div>
