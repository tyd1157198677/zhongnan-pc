import Vue from "vue";
import Vuex from "vuex";
import { _axiosGlobal } from "@/plugins/axios.js";
import config from "@/config/index.js";
import vuexStorage from "@/util/vuexStorage.js";
import menu from "./module/menu";
import categoryTree from "./module/categoryTree";
import projectTree from "./module/projectTree";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userName: "",
    userGuid: "",
    userRoleNames: "" || sessionStorage.getItem("userRoleNames"),
    userId: "",
    active: "",
  },
  mutations: {
    setToken(state, token) {
      _axiosGlobal.headers.Authorization = token ? `Bearer ${token}` : "";
      state.token = token;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setUserRoleNames(state, userRoleNames) {
      state.userRoleNames = userRoleNames;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setUserGuid(state, userGuid) {
      state.userGuid = userGuid;
    },
    setActive(state, active) {
      state.active = active;
    },
    clean(state) {
      state.token = "";
      state.userName = "";
      state.userGuid = "";
      state.userRoleNames = "";
      state.userId = "";
      state.menu.menus = [];
      state.menu.oriMenus = [];
    },
  },
  actions: {
    logout({ commit }) {
      commit("clean");
      commit("categoryTree/clean");
      commit("projectTree/clean");
    },
  },
  modules: { menu, categoryTree, projectTree },
  plugins: [
    vuexStorage.init(config.storageKeys, config.sessionKeys, config.cookieKeys),
    ({ state }) => {
      if (state.token) {
        _axiosGlobal.headers.Authorization = `Bearer ${state.token}`;
      }
    },
  ],
});
