import request from "../util/request";

export default {
  /**
   * 新增或修改招采方案
   * @params{plan} 招采信息
   */
  BidFileDownLoad004: mode => {
    return request({
      url: "/api/FileDownLoad/BidFileDownLoad004?fileId=" + mode,
      method: "post",
    });
  },

  /**
   * 根据BaseId检查招采方案是否符合提交条件
   * @params{baseId} baseId
   */
  CheckSubmit: baseId => {
    return request({
      url: "/api/services/app/BidModeMaster/CheckSubmit",
      method: "get",
      params: {
        baseId,
      },
    });
  },
  /**
   * 提交招采方案
   * @params{form} form
   */
  SubmitBidMode: id => {
    return request({
      url: "/api/services/app/BidModeMaster/SubmitBidMode",
      method: "post",
      data: {
        id,
      },
    });
  },
};
