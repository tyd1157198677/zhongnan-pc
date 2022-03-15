import axios from "axios";
import { Message } from "element-ui";
import router from "@/router";
import store from "@/store";

const config = {
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 500 * 1000,
};

const service = axios.create(config);

service.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    if (config.method === "get") {
      config.params = {
        // r: Math.random(),
        ...config.params,
      };
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.headers["content-type"] === "application/octet-stream") {
        return response.data;
      } else {
        if (response.data.errorCode || response.data.result) {
          if (response.data.success) {
            return response.data.result || response.data;
          } else {
            Message({
              message: response.data.message || response.data.error,
              type: "error",
              duration: 5 * 1000,
            });
            return Promise.reject();
          }
        } else {
          return response.data;
        }
      }
    } else {
      return Promise.reject();
    }
  },
  (error) => {
    console.log(error);
    if (error.response) {
      const res = error.response;
      const status = res.status;
      Message({
        message: res.data.error.message,
        type: "error",
        duration: 5 * 1000,
      });
      if (status === 401) {
        removeToken();
        router.push({
          name: "login",
        });
      }
    } else {
      // Message({
      //   message: "请求超时",
      //   type: "error",
      //   duration: 5 * 1000,
      // });
    }
    return Promise.reject();
  }
);

export default service;
