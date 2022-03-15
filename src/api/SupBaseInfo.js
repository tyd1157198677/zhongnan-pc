import request from "../util/request";

/**
 *获取供应商基本信息表单所有下拉
 *
 * @return {*}
 */
const GetBaseInfoDropDown = function () {
  return request({
    url: "/api/services/app/SupBaseInfo/GetBaseInfoDropDown",
    method: "get",
  });
};

/**
 *获取已入库供方
 *
 * @param {*} formSearch
 * @param {*} pageIndex
 * @param {*} pageSize
 * @return {*}
 */
const SupplierAuthStockInList = function (formSearch, pageIndex, pageSize) {
  return request({
    url: "/api/services/app/SupBaseInfo/SupplierAuthStockInList",
    method: "get",
    params: {
      AuditUserGuid: formSearch.AuditUserGuid,
      ComShortName: formSearch.ComShortName,
      ComMainName: formSearch.ComMainName,
      BusinessArea: formSearch.BusinessArea,
      BusinessCate: formSearch.BusinessCate,
      Province: formSearch.Province,
      City: formSearch.City,
      MyAuthFlag: formSearch.MyAuthFlag,
      BusinessDomain: formSearch.BusinessDomain,
      SupTaxType: formSearch.SupTaxType,
      SupCateNames: formSearch.SupCateNames,
      SupSubCateNames: formSearch.SupSubCateNames,
      SupSubCateName: formSearch.SupSubCateName,
      CompanyType: formSearch.CompanyType,
      RegCapitalMin: formSearch.RegCapitalMin,
      RegCapitalMax: formSearch.RegCapitalMax,
      RegCapitalType: formSearch.RegCapitalType,
      SupplyType: formSearch.SupplyType,
      Brand: formSearch.Brand,
      RegStatus: formSearch.RegStatus,
      SupplierFrom: formSearch.SupplierFrom,
      CooperStatus: formSearch.CooperStatus,
      PurchaseType: formSearch.PurchaseType,
      // regStatus: formSearch.regStatus,
      SkipCount: (pageIndex - 1) * pageSize,
      MaxResultCount: pageSize,
    },
  });
};

const SupplierToBeInvestigatedList = function (formSearch, pageIndex, pageSize) {
  return request({
    url: "/api/services/app/SupBaseInfo/SupplierToBeInvestigatedList",
    method: "get",
    params: {
      AuditUserGuid: formSearch.AuditUserGuid,
      ComShortName: formSearch.ComShortName,
      ComMainName: formSearch.ComMainName,
      BusinessArea: formSearch.BusinessArea,
      BusinessCate: formSearch.BusinessCate,
      Province: formSearch.Province,
      City: formSearch.City,
      MyAuthFlag: formSearch.MyAuthFlag,
      BusinessDomain: formSearch.BusinessDomain,
      SupTaxType: formSearch.SupTaxType,
      SupCateNames: formSearch.SupCateNames,
      SupSubCateNames: formSearch.SupSubCateNames,
      SupSubCateName: formSearch.SupSubCateName,
      CompanyType: formSearch.CompanyType,
      RegCapitalMin: formSearch.RegCapitalMin,
      RegCapitalMax: formSearch.RegCapitalMax,
      RegCapitalType: formSearch.RegCapitalType,
      SupplyType: formSearch.SupplyType,
      Brand: formSearch.Brand,
      RegStatus: formSearch.RegStatus,
      SupplierFrom: formSearch.SupplierFrom,
      CooperStatus: formSearch.CooperStatus,
      // regStatus: formSearch.regStatus,
      SkipCount: (pageIndex - 1) * pageSize,
      MaxResultCount: pageSize,
    },
  });
};

/**
 *获取未入库供方列表【分页】
 *
 * @param {*} formSearch
 * @param {*} pageIndex
 * @param {*} pageSize
 * @return {*}
 */
const SupplierStockOutList = function (formSearch, pageIndex, pageSize) {
  return request({
    url: "/api/services/app/SupBaseInfo/SupplierStockOutList",
    method: "get",
    params: {
      AuditUserGuid: formSearch.AuditUserGuid,
      ComShortName: formSearch.ComShortName,
      BusinessArea: formSearch.BusinessArea,
      BusinessCate: formSearch.BusinessCate,
      Province: formSearch.Province,
      City: formSearch.City,
      BusinessDomain: formSearch.BusinessDomain,
      SupTaxType: formSearch.SupTaxType,
      SupCateNames: formSearch.SupCateNames,
      SupSubCateNames: formSearch.SupSubCateNames,
      SupSubCateName: formSearch.SupSubCateName,
      CompanyType: formSearch.CompanyType,
      RegCapitalMin: formSearch.RegCapitalMin,
      RegCapitalMax: formSearch.RegCapitalMax,
      RegCapitalType: formSearch.RegCapitalType,
      SupplyType: formSearch.SupplyType,
      Brand: formSearch.Brand,
      SupplierFrom: formSearch.SupplierFrom,
      RegStatus: formSearch.RegStatus,
      SkipCount: (pageIndex - 1) * pageSize,
      MaxResultCount: pageSize,
    },
  });
};

/**
 *获取供应商资质库【分页】 只显示已经入库的供方
 *
 * @param {*} formSearch
 * @param {*} pageIndex
 * @param {*} pageSize
 * @return {*}
 */
const GetSupCerPageList = function (formSearch, pageIndex, pageSize) {
  return request({
    url: "/api/services/app/SupCertificate/GetSupCerPageList",
    method: "get",
    params: {
      ComFullName: formSearch.ComFullName,
      SupCateNames: formSearch.SupCateNames,
      CerName: formSearch.CerName,
      SkipCount: (pageIndex - 1) * pageSize,
      MaxResultCount: pageSize,
    },
  });
};

/**
 *保存供应商代注册信息
 *
 * @param {*} formData
 * @return {*}
 */
const SaveUserRegSupplierInfo = function (formData) {
  return request({
    url: "/api/services/app/SupBaseInfo/SaveUserRegSupplierInfo",
    method: "post",
    data: {
      comFullName: formData.comFullName,
      comShortName: formData.comShortName,
      supCategoryIds: formData.supCategoryIds,
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
      openAccountDetail: formData.openAccountDetail,
      personName: formData.personName,
      phone: formData.phone,
      mobile: formData.mobile,
    },
  });
};

export default {
  GetBaseInfoDropDown,
  SupplierAuthStockInList,
  SupplierStockOutList,
  GetSupCerPageList,
  SaveUserRegSupplierInfo,
  SupplierToBeInvestigatedList,
  /**
   * 保存企业详细信息
   * @params{baseInfo}
   */
  SaveSupBaseInfo: (baseInfo) => {
    return request({
      url: "/api/services/app/SupBaseInfo/SaveSupBaseInfo",
      method: "post",
      data: baseInfo,
    });
  },
  /**
   * 根据省份Id获取城市信息 返回值以Id字段为下拉值，以CateName字段为显示名称
   * 如果只获取省份信息，参数为空字符串
   * @param parentId
   * @constructor
   */
  GetAddress: (parentId = "") => {
    return request({
      url: "/api/services/app/SupBaseInfo/GetAddress?parentId=" + parentId,
      method: "get",
    });
  },
  /**
   * 获取一条记录
   * @param id
   * @returns {AxiosPromise}
   * @constructor
   */
  GetOneSupBaseInfoById: (id) => {
    return request({
      url: "/api/services/app/SupBaseInfo/GetOneSupBaseInfoById?id=" + id,
      method: "get",
    });
  },

  /**
   * 根据供应商Id获取所有合作案例【不分页】
   * @param baseGuid
   * @returns {AxiosPromise}
   * @constructor
   */
  GetSupCaseInfoList: (baseGuid) => {
    return request({
      url: "/api/services/app/SupCaseInfo/GetSupCaseInfoList?baseGuid=" + baseGuid,
      method: "get",
    });
  },
  /**
   * 获取合作案例页面所有下拉
   * @returns {AxiosPromise}
   * @constructor
   */
  GetSupCaseFormDropDown: () => {
    return request({
      url: "/api/services/app/SupCaseInfo/GetSupCaseFormDropDown",
      method: "get",
    });
  },
  /**
   * 根据供应商Id获取所有分公司【不分页】
   * @params{baseGuid} 供应商id
   */
  GetSupSubCompanies: (baseGuid) => {
    return request({
      url: "/api/services/app/SupSubCompany/GetSupSubCompanies",
      method: "get",
      params: {
        baseGuid,
      },
    });
  },
  /**
   * 获取其他信息
   * @param id
   * @returns {AxiosPromise}
   * @constructor
   */
  GetSupOtherInfo: (baseGuid) => {
    return request({
      url: "/api/services/app/SupBaseInfo/GetSupOtherInfo?baseGuid=" + baseGuid,
      method: "get",
    });
  },

  GetSupplierBelongCity: (supplierId) => {
    return request({
      url: "/api/services/app/SupAuth/GetSupplierBelongCity?supplierId=" + supplierId,
      method: "get",
    });
  },

  /**
   * 获取供应商分页记录
   * @param query
   * @returns {AxiosPromise}
   * @constructor
   */
  GetSupBaseInfoList: (query) => {
    return request({
      url: "/api/services/app/SupBaseInfo/GetSupBaseInfoList",
      method: "get",
      params: query,
    });
  },
};
