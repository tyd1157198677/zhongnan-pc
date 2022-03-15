import "babel-polyfill";
import Es6Promise from "es6-promise";
require("es6-promise").polyfill();
Es6Promise.polyfill();
// "babel-polyfill": "^6.26.0",
//     "core-js": "^3.6.5",
//     "es6-promise": "^4.2.8",
// import promise from "es6-promise";
// promise.polyfill();
// import "core-js/stable";
// import "regenerator-runtime/runtime";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import api from "./api";
// import Loading from "./util/Loading";
import { API_URL } from "@/config/urls.js";
ElementUI.Dialog.props.closeOnClickModal.default = false;
import echarts from "echarts";
import "./assets/css/new-navigation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import spanArr from "@/js/spanArr"; //合并行
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Print from "@/js/print";
Vue.use(Print); // 注册
Vue.use(VueQuillEditor);

axios.defaults.baseURL = API_URL + "/api/services/app/";
//==========================【全局loading】
import { Message, Loading } from "element-ui"; //项目已经全局引入element的话可以不单独引入
let loading = null; //定义loading变量
//开始 加载loading
let startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(0, 0, 0, 0.5)",
    // spinner:
  });
};
//结束 取消loading加载
let endLoading = () => {
  loading.close();
};
//showFullScreenLoading() 与 tryHideFullScreenLoading() 目的是合并同一页面多个请求触发loading
let needLoadingRequestCount = 0; //声明一个变量
let showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    //当等于0时证明第一次请求 这时开启loading
    startLoading();
  }
  needLoadingRequestCount++; //全局变量值++
};
let tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return; //小于等于0 证明没有开启loading 此时return
  needLoadingRequestCount--; //正常响应后 全局变量 --
  if (needLoadingRequestCount === 0) {
    //等于0 时证明全部加载完毕 此时结束loading 加载
    setTimeout(() => {
      // Vue.nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      if (needLoadingRequestCount === 0) {
        endLoading();
        // });
      }
    }, 500);
  }
};
//==========================【全局loading】
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.interceptors.request.use(
  (config) => {
    //开启loading加载
    showFullScreenLoading();
    //在所有请求头部添加token值
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    //对某个接口设置请求时长
    // console.log(config.url);
    let arr = ["UploadAnswerFileList"];
    arr.forEach((e) => {
      if (config.url.indexOf(e) > -1) {
        // console.log("success");
        config.timeout = 500 * 1000;
      }
    });
    // console.log(config.timeout);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    //关闭loading加载
    tryHideFullScreenLoading();

    return response;
  },
  (error) => {
    tryHideFullScreenLoading();
    console.log(error);
  }
);
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.spanArr = spanArr;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Loading);

// 加载插件
let pluginsArr = require.context("@/plugins", false, /\w+\.(js)$/);
pluginsArr = pluginsArr.keys().map(function (fileName) {
  const componentConfig = pluginsArr(fileName);
  return componentConfig.default;
});
const len = pluginsArr.length;
const initVue = function () {
  return new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
};
const runVue = function (index) {
  if (index > len) {
    initVue();
  } else {
    if (pluginsArr[index] && pluginsArr[index].then) {
      pluginsArr[index].then(function () {
        index++;
        runVue(index);
      });
    } else {
      index++;
      runVue(index);
    }
  }
};

runVue(0);
