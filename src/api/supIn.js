import request from '../util/request'

export default {

  /**
   * 考察分类弹框
  */
  GetPlanList: (query) => {
      return request({
          url: '/api/services/app/LiandoSupplierIn/GetPlanList',
          method: 'get',
          params: query
      })
  },

  GetOnePlanById: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetOnePlanById',
      method: 'get',
      params: query
    })
  },

  GetMasterByPlanId01: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetMasterByPlanId01',
      method: 'get',
      params: query
    })
  },

  SaveMaster01: (query) => {
      return request({
          url: '/api/services/app/LiandoSupplierIn/SaveMaster01',
          method: 'post',
          data: query
      })
  },

  GetMasterDropDown01: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetMasterDropDown01',
      method: 'get',
      params: query
    })
  },

  GetSectionDropDown02: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetSectionDropDown02',
      method: 'get',
      params: query
    })
  },

  GetSupplierInviteList02: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetSupplierInviteList02',
      method: 'get',
      params: query
    })
  },

  SaveSupplier02: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/SaveSupplier02',
      method: 'post',
      data: query
    })
  },

  DeleteSupplierInvite02: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/DeleteSupplierInvite02',
      method: 'post',
      data: query
    })
  },

  SaveSupplierIn02: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/SaveSelectedSupplierIn02',
      method: 'post',
      data: query
    })
  },

  GetSupplierInList03: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetSupplierInList03',
      method: 'get',
      params: query
    })
  },

  DeleteSupplierIn03: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/DeleteSupplierIn03',
      method: 'post',
      data: query
    })
  },

  GetRequiredAttach04: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetRequiredAttach04',
      method: 'get',
      params: query
    })
  },

  GetSupplierInAttachList04: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetSupplierInAttachList04',
      method: 'get',
      params: query
    })
  },

  DeleteSupplierInAttach04: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/DeleteSupplierInAttach04',
      method: 'post',
      data: query
    })
  },

  BidSupplierInRequiredAttachUpload: (query) => {
    return request({
      url: '/api/FileUpload/BidSupplierInRequiredAttachUpload',
      method: 'post',
      data: query,
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },

  GetNoticeShowTypeDropDown05: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetNoticeShowTypeDropDown05',
      method: 'get',
      params: query
    })
  },

  SaveLiandoNotice05: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/SaveLiandoNotice05',
      method: 'post',
      data: query
    })
  },

  GetNoticeByPlanId05: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetNoticeByPlanId05',
      method: 'get',
      params: query
    })
  },

  GetLiandoSupplierInList: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetLiandoSupplierInList',
      method: 'get',
      params: query
    })
  },

  GetNoticeTemplet05: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetNoticeTemplet05',
      method: 'get',
      params: query
    })
  },

  GetLiandoSupplierDeposit06: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetLiandoSupplierDeposit06',
      method: 'get',
      params: query
    })
  },

  GetSupplierPromission07: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetSupplierPromission07',
      method: 'get',
      params: query
    })
  },

  ReUploadDepositFile06: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/ReUploadDepositFile06',
      method: 'post',
      data: query
    })
  },

  SubmitSupplierIn: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/SubmitSupplierIn',
      method: 'post',
      data: query
    })
  },

  GetBidSupplierPerson03: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetBidSupplierPerson03',
      method: 'get',
      params: query
    })
  },

  SaveSupplierPerson03: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/SaveSupplierPerson03',
      method: 'post',
      data: query
    })
  },

  CheckCanEdit: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/CheckCanEdit',
      method: 'get',
      params: query
    })
  },

  CheckCanEditBaseInfo: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/CheckCanEditBaseInfo',
      method: 'get',
      params: query
    })
  },

  SaveSupplierInDesc02: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/SaveSupplierInDesc02',
      method: 'post',
      data: query
    })
  },

  SaveSupplierPersonRow03: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/SaveSupplierPersonRow03',
      method: 'post',
      data: query
    })
  },
  SaveOrganizeOrder: (query) => {
    return request({
      url: '/api/services/app/IdmOrganizeInfo/SaveOrganizeOrder',
      method: 'post',
      data: query
    })
  },
  SaveSelectedInves: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/SaveSelectedInves',
      method: 'post',
      data: query
    })
  },
  SaveSelectedQua: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/SaveSelectedQua',
      method: 'post',
      data: query
    })
  },
  GetSupplierInves: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetSupplierInves',
      method: 'get',
      params: query
    })
  },
  GetSupplierQua: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/GetSupplierQua',
      method: 'get',
      params: query
    })
  },

  GetBidSupplierDeposit01: (query) => {
    return request({
      url: '/api/services/app/BidSupplierDeposit/GetBidSupplierDeposit01',
      method: 'get',
      params: query
    })
  },

  SubmitSupplierDeposit02: (query) => {
    return request({
      url: '/api/services/app/BidSupplierDeposit/SubmitSupplierDeposit02',
      method: 'post',
      data: query
    })
  },
  SubmitSupplierDeposit02_2: (query) => {
    return request({
      url: '/api/services/app/BidSupplierDeposit/SubmitSupplierDeposit02_2',
      method: 'post',
      data: query
    })
  },

  CancelBidWin04: (query) => {
    return request({
      url: '/api/services/app/BidWin/CancelBidWin04',
      method: 'post',
      data: query
    })
  },







//以下是定标模块接口
  CheckBidWin: (query) => {
    return request({
      url: '/api/services/app/BidCheckCenter/CheckBidWin',
      method: 'get',
      params: query
    })
  },

  GetBidWinMaster01: (query) => {
    return request({
      url: '/api/services/app/BidWin/GetBidWinMaster01',
      method: 'get',
      params: query
    })
  },

  SaveBidWinMaster01: (query) => {
    return request({
      url: '/api/services/app/BidWin/SaveBidWinMaster01',
      method: 'post',
      data: query
    })
  },

  GetSectionSupplier01: (query) => {
    return request({
      url: '/api/services/app/BidWin/GetSectionSupplier01',
      method: 'get',
      params: query
    })
  },

  SaveWinSupplierList01: (query) => {
    return request({
      url: '/api/services/app/BidWin/SaveWinSupplierList01',
      method: 'post',
      data: query
    })
  },

  GetBidWinAttachList01: (query) => {
    return request({
      url: '/api/services/app/BidWin/GetBidWinAttachList01',
      method: 'get',
      params: query
    })
  },

  DeleteBidWinAttach: (query) => {
    return request({
      url: '/api/services/app/BidWin/DeleteBidWinAttach',
      method: 'post',
      data: query
    })
  },

  SubmitWin01: (query) => {
    return request({
      url: '/api/services/app/BidWin/SubmitBidWin01',
      method: 'post',
      data: query
    })
  },

  BidWinAttachUpload1: (query) => {
    return request({
      url: '/api/FileUpload/BidWinAttachUpload1',
      method: 'post',
      data: query,
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },

  BidWinAttachUpload2: (query) => {
    return request({
      url: '/api/FileUpload/BidWinAttachUpload2',
      method: 'post',
      data: query,
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },

  BidWinAttachUpload3: (query) => {
    return request({
      url: '/api/FileUpload/BidWinAttachUpload3',
      method: 'post',
      data: query,
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },



  BidActionButton12: (query) => {
    return request({
      url: '/api/services/app/BidActionButton/BidActionButton12',
      method: 'get',
      params: query
    })
  },

  BidActionButton13: (query) => {
    return request({
      url: '/api/services/app/BidActionButton/BidActionButton13',
      method: 'get',
      params: query
    })
  },

  BidActionButton14: (query) => {
    return request({
      url: '/api/services/app/BidActionButton/BidActionButton14',
      method: 'get',
      params: query
    })
  },

  BidActionButton20: (query) => {
    return request({
      url: '/api/services/app/BidActionButton/BidActionButton20',
      method: 'get',
      params: query
    })
  },

  GetThanksSupplierList02: (query) => {
    return request({
      url: '/api/services/app/BidWin/GetThanksSupplierList02',
      method: 'get',
      params: query
    })
  },

  GetNoThanksSupplierList02: (query) => {
    return request({
      url: '/api/services/app/BidWin/GetNoThanksSupplierList02',
      method: 'get',
      params: query
    })
  },

  SubmitThanks02: (query) => {
    return request({
      url: '/api/services/app/BidWin/SubmitThanks02',
      method: 'post',
      data: query
    })
  },

  GetBidWinAttachList03: (query) => {
    return request({
      url: '/api/services/app/BidWin/GetBidWinAttachList03',
      method: 'get',
      params: query
    })
  },

  SubmitEndFile03: (query) => {
    return request({
      url: '/api/services/app/BidWin/SubmitEndFile03',
      method: 'post',
      data: query
    })
  },

  DeleteUser03: (query) => {
    return request({
      url: '/api/services/app/LiandoPlan/DeleteUser03',
      method: 'post',
      data: query
    })
  },

  StartTechExam30: (query) => {
    return request({
      url: '/api/services/app/ExamCenter/StartTechExam30',
      method: 'post',
      data: query
    })
  },

  StartBusinessExam30: (query) => {
    return request({
      url: '/api/services/app/ExamCenter/StartBusinessExam30',
      method: 'post',
      data: query
    })
  },

  CompletedFirstTech: (query) => {
    return request({
      url: '/api/services/app/BidExamScore/CompletedFirstTech',
      method: 'post',
      data: query
    })
  },

  SaveTechUser03: (query) => {
    return request({
      url: '/api/services/app/LiandoPlan/SaveTechUser03',
      method: 'post',
      data: query
    })
  },

  SaveTechUser02: (query) => {
    return request({
      url: '/api/services/app/ExamCenter/SaveTechUser02',
      method: 'post',
      data: query
    })
  },

  DeleteTechPerson02: (query) => {
    return request({
      url: '/api/services/app/ExamCenter/DeleteTechPerson02',
      method: 'post',
      data: query
    })
  },

  CheckEditSupplierInBase41: (query) => {
    return request({
      url: '/api/services/app/BidCheckCenter/CheckEditSupplierInBase41',
      method: 'get',
      params: query
    })
  },

  CheckCanEditNotice41: (query) => {
    return request({
      url: '/api/services/app/BidCheckCenter/CheckCanEditNotice41',
      method: 'get',
      params: query
    })
  },
  CheckCanInviteSupplier41: (query) => {
    return request({
      url: '/api/services/app/BidCheckCenter/CheckCanInviteSupplier41',
      method: 'get',
      params: query
    })
  },
  CheckStartSupplierInAudit41: (query) => {
    return request({
      url: '/api/services/app/BidCheckCenter/CheckStartSupplierInAudit41',
      method: 'get',
      params: query
    })
  },
  CheckCanBackDeposit41: (query) => {
    return request({
      url: '/api/services/app/BidCheckCenter/CheckCanBackDeposit41',
      method: 'get',
      params: query
    })
  },

  BidFileDownLoad006: (query) => {
    return request({
      url: '/api/FileDownLoad/BidFileDownLoad006',
      method: 'get',
      params: query
    })
  },

  BidFileDownLoad007: (query) => {
    return request({
      url: '/api/FileDownLoad/BidFileDownLoad007',
      method: 'get',
      params: query
    })
  },

  GetBidDepositConfirmList03: (query) => {
    return request({
      url: '/api/services/app/BidSupplierDeposit/GetBidDepositConfirmList03',
      method: 'get',
      params: query
    })
  },

  SaveConfirmDeposit04: (query) => {
    return request({
      url: '/api/services/app/BidSupplierDeposit/SaveConfirmDeposit04',
      method: 'post',
      data: query
    })
  },


  // *****************************************************报表中心

  GetBidDivideStat: (query) => {
    return request({
      url: '/api/services/app/DivideReport/GetBidDivideStat',
      method: 'get',
      params: query
    })
  },

  GetSupplierInDivideStat: (query) => {
    return request({
      url: '/api/services/app/DivideReport/GetSupplierInDivideStat',
      method: 'get',
      params: query
    })
  },

  GetBidCateStat: (query) => {
    return request({
      url: '/api/services/app/DivideReport/GetBidCateStat',
      method: 'get',
      params: query
    })
  },

  GetStatPageDropDown: (query) => {
    return request({
      url: '/api/services/app/DivideReport/GetStatPageDropDown',
      method: 'get',
      params: query
    })
  },

  GetSupplierBidStat: (query) => {
    return request({
      url: '/api/services/app/DivideReport/GetSupplierBidStat',
      method: 'get',
      params: query
    })
  },

  GetProjectStatTree: (query) => {
    return request({
      url: '/api/services/app/DivideReport/GetProjectStatTree',
      method: 'get',
      params: query
    })
  },

  GetProjectSupplierInStatTree: (query) => {
    return request({
      url: '/api/services/app/DivideReport/GetProjectSupplierInStatTree',
      method: 'get',
      params: query
    })
  },

  SaveShowNotice: (query) => {
    return request({
      url: '/api/services/app/LiandoSupplierIn/SaveShowNotice',
      method: 'post',
      data: query
    })
  },

  GetImportFileList: (query) => {
    return request({
      url: '/api/services/app/BidWin/GetImportFileList',
      method: 'get',
      params: query
    })
  },

  DoImportFile008: (query) => {
    return request({
      url: '/api/FileDownLoad/DoImportFile008?'+query,
      method: 'post',
      data: query
    })
  },




















}