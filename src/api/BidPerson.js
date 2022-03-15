import request from '../util/request'

//招采方案--》采购小组成员模块

export default { 

  /**
   * 获取采购小组成员角色下拉
   * @params{id} id
   */
  GetBidModePersonDropDown: () => {
    return request({
      url: "/api/services/app/BidModePerson/GetBidModePersonDropDown",
      method: "get",
    });
  },
  /**
   * 根据方案id，获取所有采购小组成员列表【不分页】
   * @params{id} id
   */
  GetBidModePersonList: baseId => {
    return request({
      url: "/api/services/app/BidModePerson/GetBidModePersonList",
      method: "get",
      params: {
        baseId,
      },
    });
  },
   /**
   * 保存采购小组成员信息
   * @params{baseId} baseId
   */
  SaveSinglePerson: (baseId, uid) => {
    return request({
      url: "/api/services/app/BidModePerson/SaveSinglePerson",
      method: "post",
      data: {
        baseId: baseId,
        userGuid:uid
      },
    });
  },
  /**
   * 保存采购小组成员角色信息
   * @params{baseId} baseId
   */
  SaveBidPersonRoles: (baseId, roles) => {
    return request({
      url: "/api/services/app/BidModePerson/SaveBidPersonRoles",
      method: "post",
      data: {
        baseId: baseId,
        personRoles:roles
      },
    });
  },
    /**
   * 删除采购小组成员
   * @params{baseId} baseId
   */
  DeleteBidModePersonById: (id) => {
    return request({
      url: "/api/services/app/BidModePerson/DeleteBidModePersonById",
      method: "post",
      data: {
        id
      },
    });
  },
}