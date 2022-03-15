import request from "@/util/request";

// 获取当前用户信息
export const UserLoginDingDing = obj => {
  return request({
    url: "/api/TokenAuth/UserLoginDingDing",
    method: "post",
    data: obj,
  });
};
