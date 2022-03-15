<template>
  <div id="app">
    <el-container direction="vertical" class="home">
      <app-header v-if="headerShow" ref="appvew" id="appheader"></app-header>
      <router-view class="st" id="conter" v-on:header="header" v-on:footer="footer" v-if="isRouterAlive"></router-view>
      <app-footer v-if="footerShow" ref="appvew1" id="appfooter"></app-footer>
    </el-container>
  </div>
</template>
<script>
import warterMark from "@/style/warterMark";
import { mapState, mapMutations } from "vuex";
import Header from "./components/Header";
import Footer from "./components/Footer";
import config from "@/config";
import build from "@/router/build";

export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      headerShow: true,
      footerShow: true,
    };
  },

  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
  watch: {
    userName: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          // warterMark.set(this.$store.state.userName + this.addDate());
        }
      },
    },
    $route(to, from) {
      this.$nextTick(() => {
        setTimeout(() => {
          let appfooter = this.headerShow ? document.getElementById("appfooter").offsetHeight : 0;
          let appheader = this.footerShow ? document.getElementById("appheader").offsetHeight : 0;
          let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
          let conter = document.getElementById("conter");
          conter.style.height = clientHeight - appfooter - appheader + "px";
        }, 500);
      });
    },
  },
  computed: {
    ...mapState(["userName"], "oriMenus"),
    ...mapState("menu", ["menus"]),
  },
  created() {
    // 在页面加载时尝试重新加载路由信息
    // let menus = JSON.parse(localStorage.getItem("menus"));
    // if (this.menus) {
    //   this.$router.addRoutes(build(this.menus));
    // }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        let appfooter = this.headerShow ? document.getElementById("appfooter").offsetHeight : 0;
        let appheader = this.footerShow ? document.getElementById("appheader").offsetHeight : 0;
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let conter = document.getElementById("conter");
        conter.style.height = clientHeight - appfooter - appheader + "px";
      }, 500);
    });

    // document.documentElement.clientHeight || document.body.clientHeight
    this.pub();
  },
  methods: {
    ...mapMutations("menu", { initMenu: "init" }),
    pub() {
      let that = this;
      let currRouteId = this.$route.path;
      let accessToken = localStorage.getItem("accessToken");
      let oriMenus = JSON.parse(localStorage.getItem("oriMenus"));
      let userName = localStorage.getItem("userName");
      if (accessToken) {
        this.$store.commit("setToken", accessToken);
        this.$store.commit("setUserName", userName);
        this.$api.SysMenu.LoadUserMenus().then((res) => {
          that.initMenu(res);
          const m = oriMenus.find((x) => x.menuUrl.indexOf(currRouteId) > -1);
          that.$router.addRoutes(build(that.menus));
          this.$refs.appvew.renderColor1(m.id, m.parentId);
          that.$emit("header", true);
          that.$emit("footer", true);
        });
      }
    },

    //是否显示头部
    header(bool) {
      this.headerShow = bool;
    },
    //是否显示底部
    footer(bool) {
      this.footerShow = bool;
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    addDate() {
      const nowDate = new Date();
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      };
      const systemDate = date.year + "-" + date.month + "-" + date.date;
      return systemDate;
    },
  },
};
</script>
<style src="@/assets/css/public.css"></style>
<style lang="scss" src="@/style/main.scss"></style>
<style lang="scss">
body,
html {
  background-color: #f0f2f5;
  overflow: hidden;
}

#app {
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 0px;
  overflow: hidden;
}
.st {
  width: 95%;
  // max-height: 80vh;
  // min-height: 72vh;
  padding: 10px;
  margin-bottom: 80px;
  background: #f0f2f5;
  overflow: auto;
}
* {
  padding: 0;
  box-sizing: border-box;
}
.pagination-detail {
  float: right;
  margin: 10px auto;
}
</style>
