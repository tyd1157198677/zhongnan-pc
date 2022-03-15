"use strict";

import Vue from "vue";
// import echarts from "echarts";
import axios from "axios";
import store from "../store";

import { API_URL } from "../config/urls";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: API_URL, // 测试
  // baseURL: "http://211.94.93.168:8017", // 外网链接
  // baseURL: "http://10.160.144.164:8001", // 正式数据库
  timeout: 500 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
const _axiosGlobal = _axios.defaults;
_axios.interceptors.request.use(
  function(config) {
    // console.log(store.state.token)
    const token = store.state.token;
    config.headers.Authorization = "Bearer " + token;
    // Do something before request is sent
    if (config.method === "get") {
      config.params = {
        // r: Math.random(),
        ...config.params,
      };
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(res) {
    if (res.data.success === false) {
      return Promise.reject(res);
    } else {
      return res;
    }
    // Do something with response data
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
    $baseURL: {
      get() {
        return config.baseURL;
      },
    },
    axiosGlobal: {
      get() {
        return _axiosGlobal;
      },
    },
    // $echarts: {
    //   get() {
    //     return echarts;
    //   },
    // },
    $axiosGlobal: {
      get() {
        return _axiosGlobal;
      },
    },
  });
};

Vue.use(Plugin);

export { _axios, _axiosGlobal };
