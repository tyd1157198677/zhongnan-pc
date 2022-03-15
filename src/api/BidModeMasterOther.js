import request from "../util/request";

export default {
  /**
   * 新增或修改招采方案
   * @params{plan} 招采直委信息
   */
  InsertOrUpdateBidModeMasterZhiWei: mode => {
    return request({
      url: "/api/services/app/BidModeMasterOther/InsertOrUpdateBidModeMaster_ZhiWei",
      method: "post",
      data: mode,
    });
  },
  /**
   * 直接委托原因下拉
   */
  GetCauseZhiWei: () => {
    return request({
      url: "/api/services/app/BidModeMasterOther/GetCauseDropDown_ZhiWei",
      method: "get",
    });
  },
  /**
   * 根据BaseId检查招采方案是否符合提交条件-直接委托
   * @params{baseId} baseId
   */
  CheckSubmitZhiWei: baseId => {
    return request({
      url: "/api/services/app/BidModeMasterOther/CheckSubmit_ZhiWei",
      method: "get",
      params: {
        baseId,
      },
    });
  },
  /**
   * 提交招采方案-直接委托
   * @params{form} form
   */
  SubmitBidModeZhiWei: id => {
    return request({
      url: "/api/services/app/BidModeMasterOther/SubmitBidMode_ZhiWei",
      method: "post",
      data: {
        id,
      },
    });
  },
  /**
   * 竞争性判断原因下拉
   */
  GetCauseLinXing: () => {
    return request({
      url: "/api/services/app/BidModeMasterOther/GetCauseDropDown_LinXing",
      method: "get",
    });
  },
  /**
   * 根据BaseId检查招采方案是否符合提交条件-零新采购
   * @params{baseId} baseId
   */
  CheckSubmitLinXing: baseId => {
    return request({
      url: "/api/services/app/BidModeMasterOther/CheckSubmit_LinXing",
      method: "get",
      params: {
        baseId,
      },
    });
  },
  /**
   * 提交招采方案-竞争性谈判
   * @params{form} form
   */
  SubmitBidModeLinXing: id => {
    return request({
      url: "/api/services/app/BidModeMasterOther/SubmitBidMode_LinXing",
      method: "post",
      data: {
        id,
      },
    });
  },
  /**
   * 新增或修改招采方案
   * @params{plan} 招采竞争性判断信息
   */
  InsertOrUpdateBidModeMasterLinXing: mode => {
    return request({
      url: "/api/services/app/BidModeMasterOther/InsertOrUpdateBidModeMaster_LinXing",
      method: "post",
      data: mode,
    });
  },
  /**
   * 计价方式下拉
   */
  GetBidPersonRole: () => {
    return request({
      url: "/api/services/app/BidModeMasterOther/GetBidPersonRole",
      method: "get",
    });
  },
  /**
   * 计价方式下拉
   */
  GetExamMethod: () => {
    return request({
      url: "/api/services/app/BidModeMasterOther/GetExamMethod",
      method: "get",
    });
  },
  /**
   * 根据BaseId检查招采方案是否符合提交条件-集采
   * @params{baseId} baseId
   */
  CheckSubmitJiCai: baseId => {
    return request({
      url: "/api/services/app/BidModeMasterOther/CheckSubmit_JiCai",
      method: "get",
      params: {
        baseId,
      },
    });
  },
  /**
   * 提交招采方案-集采
   * @params{form} form
   */
  SubmitBidModeJiCai: id => {
    return request({
      url: "/api/services/app/BidModeMasterOther/SubmitBidMode_JiCai",
      method: "post",
      data: {
        id,
      },
    });
  },
  /**
   * 新增或修改招采方案
   * @params{plan} 集采使用信息
   */
  InsertOrUpdateBidModeMasterJiCai: mode => {
    return request({
      url: "/api/services/app/BidModeMasterOther/InsertOrUpdateBidModeMaster_JiCai",
      method: "post",
      data: mode,
    });
  },
  /**
   * 竞争方式原因下拉
   */
  GetCauseJingZheng: () => {
    return request({
      url: "/api/services/app/BidModeMasterOther/GetCauseDropDown_JingZheng",
      method: "get",
    });
  },
  /**
   * 新增或修改招采方案
   * @params{plan} 竞争性谈判信息
   */
  InsertOrUpdateBidModeMasterJingZheng: mode => {
    return request({
      url: "/api/services/app/BidModeMasterOther/InsertOrUpdateBidModeMaster_JingZheng",
      method: "post",
      data: mode,
    });
  },
  /**
   * 根据BaseId检查招采方案是否符合提交条件-竞争性谈判
   * @params{baseId} baseId
   */
  CheckSubmitJingZheng: baseId => {
    return request({
      url: "/api/services/app/BidModeMasterOther/CheckSubmit_JingZheng",
      method: "get",
      params: {
        baseId,
      },
    });
  },
  /**
   * 提交招采方案-竞争新谈判
   * @params{form} form
   */
  SubmitBidModeJingZheng: id => {
    return request({
      url: "/api/services/app/BidModeMasterOther/SubmitBidMode_JingZheng",
      method: "post",
      data: {
        id,
      },
    });
  },
};
