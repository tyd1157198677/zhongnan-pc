import request from "../util/request";

export default {
  InsterManagerMes: query => {
    return request({
      url: "/api/SupplierQua/InsterManagerMes",
      method: "post",
      data: query,
    });
  },
  InsterSupQuaFormList_Index: query => {
    return request({
      url:'/api/SupplierQua/InsterSupQuaFormList_Index',
      method: "post",
      data: query,
    });
  },
};
