import request from '../util/request'

//招采方案--》招标公告模块

export default { 
    /**
   * 获取招标公告列表
   * @params{baseId} baseId
   */
  GetBidNoticeList: (query) => {
    return request({
      url: "/api/services/app/BidNotice/GetBidNoticeList",
      method: "get",
      params:query
    });
  },
      /**
   * 获取招标公告供应商列表
   * @params{baseId} baseId
   */
  GetBidNoticeSignUpList: (baseId) => {
    return request({
      url: "/api/services/app/BidNoticeSignUp/GetBidNoticeSignUpList",
      method: "get",
      params:{
        baseId
      }
    });
  },
        /**
   * 显示招标公告明细
   * @params{baseId} baseId
   */
  ShowNotice: (baseId) => {
    return request({
      url: "/api/services/app/BidNotice/ShowNotice",
      method: "get",
      params:{
        baseId
      }
    });
  },
  /**
   * 根据BaseId获取一条招标公告
   * @params{baseId} baseId
   */
  GetOneBidNoticeById: (baseId) => {
    return request({
      url: "/api/services/app/BidNotice/GetOneBidNoticeById",
      method: "get",
      params:{
        baseId
      }
    });
  },
    /**
   * 新增或修改招标公告
   * @params{form} form
   */
  InsertOrUpdateBidNoticeSingle: (form) => {
    return request({
      url: "/api/services/app/BidNotice/InsertOrUpdateBidNoticeSingle",
      method: "post",
      data:form
    });
  },
    /**
   * 根据BaseId获取招采公告附件列表
   * @params{baseId} baseId
   */
  GetNoticeAttachList: (baseId) => {
    return request({
      url: "/api/services/app/BidNoticeAttach/GetNoticeAttachList",
      method: "get",
      params:{
        baseId
      }
    });
  },
      /**
   * 删除招标公告附件
   * @params{form} form
   */
  DeleteBidNoticeAttachById: (id) => {
    return request({
      url: "/api/services/app/BidNoticeAttach/DeleteBidNoticeAttachById",
      method: "post",
      data:{
          id
      }
    });
  },

  GetNoticeShowTypeDropDown: (query) => {
    return request({
      url: "/api/services/app/BidNotice/GetNoticeShowTypeDropDown",
      method: "get",
      params:query
    });
  },
  GetNoticeShowTypeDropDown01: (query) => {
    return request({
      url: "/api/services/app/BidNotice/GetNoticeShowTypeDropDown01",
      method: "get",
      params:query
    });
  },

}