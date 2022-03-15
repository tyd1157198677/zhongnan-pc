import request from "../util/request";

export default {
  /**
   * 新增或修改招采计划
   * @params{plan} 招采信息
   */
  InsertOrUpdateBidPlan: plan => {
    return request({
      url: "/api/services/app/BidPlan/InsertOrUpdateBidPlan",
      method: "post",
      data: plan,
    });
  },

  /**
   *获取招采计划列表（分页）
   * @params{query} 筛选条件
   */
  GetBidPlanList: query => {
    return request({
      url: "/api/services/app/BidPlan/GetBidPlanList",
      method: "get",
      params: query,
    });
  },

  /**
   * 删除招采计划 只有草稿状态可以删除
   * @params{id} id
   */
  DeleteBidPlanById: id => {
    return request({
      url: "/api/services/app/BidPlan/DeleteBidPlanById",
      method: "post",
      data: {
        id,
      },
    });
  },

  /**
   * 获取招采计划详细【编辑、展示详细页面使用】
   * @params{id} id
   */
  GetOneBidPlanById: id => {
    return request({
      url: "/api/services/app/BidPlan/GetOneBidPlanById",
      method: "get",
      params: {
        id,
      },
    });
  },

  /**
   * 获取招采计划编辑页面所有下拉
   */
  GetBidPlanDropDown: () => {
    return request({
      url: "/api/services/app/BidPlan/GetBidPlanDropDown",
      method: "get",
    });
  },

  /**
   * 将招采计划添加至招采方案 返回招采方案的Id
   * @params{ids} ids
   */
  AddPlanToMode: ids => {
    return request({
      url: "/api/services/app/BidPlan/AddPlanToMode",
      method: "post",
      data: ids,
    });
  },

  /**
   * 提交招采计划
   * @params{id} id
   */
  SubmitPlan: id => {
    return request({
      url: "/api/services/app/BidPlan/SubmitPlan",
      method: "post",
      data: {
        id,
      },
    });
  },
};
