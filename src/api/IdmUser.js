import request from '../util/request'

export default { 
  /**
   * 分页获取所有人员信息
   * @params{id} id
   */
  GetUserList: (userName,departmentCode,SkipCount,MaxResultCount) => {
    return request({
      url: "/api/services/app/IdmUserInfo/GetUserList",
      method: "get",
      params:{
        UserNameMobileEmail:userName,
        SubCompanyCode:departmentCode,
        SkipCount,
        MaxResultCount
      }
    });
  },
    /**
   * 获取所组织架构树
   */
  GetOrganizeTree: (haveProject) => {
    return request({
      url: "/api/services/app/IdmOrganizeInfo/GetOrganizeTree",
      method: "get",
      params:{
        haveProject,
      }
    });
  },
}