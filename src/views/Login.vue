<template>
  <el-container class="login">
    <div class="logodiv">
      <img src="../assets/zhongnanLog.png" height="53" />
    </div>
    <div class="login-bg">
      <img :src="urlbg" height="100%" />
    </div>
    <div class="left"></div>
    <div class="pass-main" v-if="false">
      <!-- <div class="pass-main" v-if="showInt"> -->
      <div>
        <div class="pass-title">
          <div>
            <img
              v-if="title == '钉钉扫码登录'"
              src="@/assets/computer.png"
              style="width: 80px; height: 80px; float: right"
              @click="checkOut"
            />
            <img v-else src="@/assets/erwema.png" style="width: 80px; height: 80px; float: right" @click="checkOut" />
          </div>
          <!-- <img :src="title == '钉钉扫码登录' ? url : url1" style="width:60px;height:60px;float:right" /> -->
          <div class="pass-title-text" style="padding-top: 60px; margin-left: 80px">{{ title }}</div>
        </div>
        <el-form :model="formData" :rules="rules" class="head" ref="loginForm" v-if="title == '员工登录'">
          <el-form-item label="用户账户" class="name" prop="userName">
            <el-input v-model="formData.loginId" class="layui-input"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" class="name" prop="password">
            <el-input type="password" v-model="formData.password" class="layui-input" @keyup.enter.native="doLogin"></el-input>
          </el-form-item>
          <el-button type="info" class="btn" @click="doLogin" :loading="loading" style="margin-bottom: 20px">登录</el-button>
          <!-- <el-button type="info" class="btn" @click="doRegister">供方注册</el-button> -->
        </el-form>
        <div class="code" v-show="title == '钉钉扫码登录'">
          <div id="login_container" style="transform: scale(0.8)"></div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { API_URL } from "@/config/urls";
import { getOSAndBrowser } from "@/util/browserInfo.js";
import build from "../router/build";
import * as dd from "dingtalk-jsapi";
import { UserLoginDingDing } from "@/api/login.js";
import bus from "@/util/bus";
export default {
  name: "login",
  data() {
    return {
      id: "",
      browserVersion: "",
      urlbg: require("@/assets/bj2.jpg"),
      title: "钉钉扫码登录",
      // title: "员工登录",
      formData: {
        loginId: "",
        password: "",
        browserVersion: "",
      },
      rules: {
        loginId: [{ required: true, message: "用户账户不能为空", trigger: "change" }],
        password: [{ required: true, message: "用户密码不能为空", trigger: "change" }],
      },
      show: true,
      showInt: true,
      loading: false,
      url: import("@/assets/computer.png"),
      url1: import("@/assets/erwema.png"),
      globalMessage: null,
      passShow: false,
    };
  },
  computed: {
    ...mapState("menu", ["menus"], "userName"),
  },

  created: function () {
    bus.$emit("hideNav");
  },
  mounted() {
    console.log(getOSAndBrowser());
    if (getOSAndBrowser().indexOf("OA") == -1) {
      this.$alert("请从OA进入", {
        confirmButtonText: "确定",
        showClose: false,
      });
      // this.$alert("请从OA进入");
    }
    // this.browserVersion = getOSAndBrowser();
    // console.log(getOSAndBrowser());
    // if (!!window.ActiveXObject || "ActiveXObject" in window) {
    //   this.$alert("建议使用谷歌、苹果、火狐、搜狗极速模式、360极速模式", {
    //     confirmButtonText: "确定",
    //   });
    // }
    // let accessToken = localStorage.getItem("accessToken");
    // if (accessToken == "null" || accessToken == "undefined" || accessToken == "" || !accessToken) {
    //   if (dd.env.platform == "notInDingTalk") {
    //     let that = this;
    //     that.formData.browserVersion = getOSAndBrowser();
    //     that.ddLoginInit();
    //     setTimeout(() => {
    //       that.show = false;
    //       let code = that.GetQueryValue("code");
    //       that.$http
    //         .post(API_URL + "/api/TokenAuth/UserLoginDingDingByQRCode", {
    //           code,
    //           browserVersion: getOSAndBrowser(),
    //         })
    //         .then(async (res) => {
    //           const { accessToken, userName, userRoleNames, userId, userGuid } = res.data.result;
    //           if (!accessToken) {
    //             return Promise.reject(res);
    //           }

    //           localStorage.setItem("accessToken", accessToken);
    //           sessionStorage.setItem("userGuid", userGuid);
    //           localStorage.setItem("userName", userName);
    //           localStorage.setItem("userGuid", userGuid);
    //           that.$store.commit("setToken", accessToken);
    //           that.$store.commit("setUserName", userName);
    //           that.$store.commit("setUserRoleNames", userRoleNames);
    //           that.$store.commit("setUserId", userId);
    //           that.$store.commit("setUserGuid", userGuid);
    //           that.$api.SysMenu.LoadUserMenus().then((res) => {
    //             that.initMenu(res);
    //             that.$router.addRoutes(build(that.menus));
    //             let r = that.menus[0];
    //             if (r.subMenus && r.subMenus.length > 0) {
    //               r = r.subMenus[0];
    //             }
    //             bus.$emit("showNav");
    //             that.$router.push(r.route);
    //           });
    //         })
    //         .catch((err) => {
    //           // that.globalMessage = that.$message.error(err.data.result.loginMessage);
    //         })
    //         .finally(() => {
    //           that.loading = false;
    //         });
    //     }, 1000);
    //   } else {
    //     // alert("钉钉登录还没没登陆");
    //     // bus.$emit("hideNav");
    //     let that = this;
    //     that.ddLoginInit();
    //     // let code = that.GetQueryValue("code");
    //     let code = that.$route.query.code;
    //     let id = that.$route.query.id;
    //     // let id = that.GetQueryValue("id");
    //     that.$axios.post("/api/TokenAuth/UserLoginDingDing", { code: code, browserVersion: getOSAndBrowser() }).then((res) => {
    //       let { accessToken, userName, userId, userGuid } = res.data.result;
    //       localStorage.setItem("accessToken", accessToken);
    //       sessionStorage.setItem("userGuid", userGuid);
    //       localStorage.setItem("userName", userName);
    //       localStorage.setItem("userGuid", userGuid);
    //       that.$store.commit("setToken", accessToken);
    //       that.$store.commit("setUserName", userName);
    //       that.$store.commit("setUserId", userId);
    //       that.$store.commit("setUserGuid", userGuid);

    //       that.$http.get("/SysTodo/GetPcUrlByTodoId?todoId=" + id).then((res) => {
    //         let url = res.data.substr(2);
    //         // let url = "/bid/bidRequireDetail?id=b0fd4352-212e-4c6b-de86-08d946021eb0&todoId=2ea7bf28-cc30-4b83-833f-3f467e2829a8";
    //         that.$api.SysMenu.LoadUserMenus().then((res1) => {
    //           that.initMenu(res1);
    //           that.$router.addRoutes(build(that.menus));
    //           this.$http.post("/SysTodo/SetRead", { id }).then((res) => {
    //             if (!res.data.success) {
    //               this.$message.error(res.data.message);
    //             }
    //           });
    //         });
    //         bus.$emit("showNav");
    //         that.$router.push({
    //           path: url,
    //         });
    //       });
    //     });
    //   }
    // } else {
    //   //判断是不是钉钉登录
    //   if (dd.env.platform == "notInDingTalk") {
    //     let that = this;
    //     that.showInt = false;
    //     bus.$emit("showNav");
    //     // this.$store.commit("setToken", accessToken);
    //     // this.$store.commit("setUserName", userName);
    //     that.$api.SysMenu.LoadUserMenus().then((res) => {
    //       that.initMenu(res);
    //       that.$router.addRoutes(build(that.menus));
    //       let r = that.menus[0];
    //       if (r.subMenus && r.subMenus.length > 0) {
    //         r = r.subMenus[0];
    //       }
    //       that.$router.push(r.route); //当前的动态返回菜单里面没有固定首页地址，所以改成在生成路由表之后，直接跳转到第一个菜单了
    //     });
    //   } else {
    //     let that = this;
    //     // alert("已登陆并且是钉钉登录");
    //     let id = that.$route.query.id;
    //     // alert("已登陆并且是钉钉登录" + id);
    //     that.$axios.get("/api/services/app/SysTodo/GetPcUrlByTodoId?todoId=" + id).then((res) => {
    //       // let url = "/bid/bidRequireDetail?id=b0fd4352-212e-4c6b-de86-08d946021eb0&todoId=2ea7bf28-cc30-4b83-833f-3f467e2829a8";
    //       let url = res.data.substr(2);
    //       // alert("第2个" + url);
    //       // that.$api.SysMenu.LoadUserMenus().then(res1 => {
    //       //   that.initMenu(res1);
    //       //   that.$router.addRoutes(build(that.menus));
    //       //   // bus.$emit("showNav");
    //       // });
    //       // alert(url);
    //       // alert("已登陆并且是钉钉登录" + url);
    //       this.$http.post("/SysTodo/SetRead", { id }).then((res) => {
    //         if (!res.data.success) {
    //           this.$message.error(res.data.message);
    //         }
    //       });
    //       bus.$emit("showNav");
    //       that.$router.push({
    //         path: url,
    //       });
    //     });
    //   }
    // }
  },
  methods: {
    ...mapMutations("menu", { initMenu: "init" }),
    /**
     * [通过参数名获取url中的参数值]
     * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
     * @param  {[string]} queryName [参数名]
     * @return {[string]}           [参数值]
     */
    GetQueryValue(queryName) {
      var query = decodeURI(window.location.search.substring(1));
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == queryName) {
          return pair[1];
        }
      }
      return null;
    },
    GetRequest() {
      var url = location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
    ddLoginInit() {
      let url = "";
      if (process.env.NODE_ENV == "development") {
        url = encodeURIComponent("http://localhost:8081"); //本地地址：http://localhost:8081
      } else {
        if (process.env.VUE_APP_API_URL == "http://8.142.67.157:8931") {
          url = encodeURIComponent("http://8.142.67.157:8932"); //测试地址：http://bidpage.hrdservice.com
        } else {
          url = encodeURIComponent("https://zhaocai.zoinafor.com"); //正式外网地址：http://1.202.238.197:8906
        }
      }
      var goto = encodeURIComponent(
        "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingjgw98byqztb0paki&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=" +
          url
      );
      var obj = DDLogin({
        id: "login_container", //这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
        goto: goto, //请参考注释里的方式
        style: "border:none;background-color:#FFFFFF;",
        width: "300",
        height: "300",
      });
      var handleMessage = (event) => {
        var origin = event.origin;
        // console.log("origin", event.origin);
        if (origin == "https://login.dingtalk.com") {
          //判断是否来自ddLogin扫码事件。
          var loginTmpCode = event.data;
          //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了/api/TokenAuth/UserLoginDingDingByQRCode
          //跳转系统界面
          window.location.href =
            "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingjgw98byqztb0paki&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=" +
            url +
            "&loginTmpCode=" +
            loginTmpCode;
        }
      };
      if (typeof window.addEventListener != "undefined") {
        window.addEventListener("message", handleMessage, false);
      } else if (typeof window.attachEvent != "undefined") {
        window.attachEvent("onmessage", handleMessage);
      }
    },
    checkOut() {
      this.title = this.title == "钉钉扫码登录" ? "员工登录" : "钉钉扫码登录";
      // this.ddLoginInit();
    },

    doLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.globalMessage) {
            this.globalMessage.close();
            this.globalMessage = null;
          }
          this.$http
            .post(API_URL + "/api/TokenAuth/UserLogin", {
              ...this.formData,
              rememberClient: true,
            })
            .then(async (res) => {
              const { accessToken, userName, userRoleNames, userId, userGuid } = res.data.result;
              if (!accessToken) {
                return Promise.reject(res);
              }
              sessionStorage.setItem("userGuid", userGuid);
              localStorage.setItem("userGuid", userGuid);
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("userName", userName);
              this.$store.commit("setToken", accessToken);
              this.$store.commit("setUserName", userName);
              this.$store.commit("setUserRoleNames", userRoleNames);
              this.$store.commit("setUserId", userId);
              this.$store.commit("setUserGuid", userGuid);
              bus.$emit("showNav");
              let that = this;
              this.$api.SysMenu.LoadUserMenus().then((res) => {
                that.initMenu(res);
                that.$router.addRoutes(build(that.menus));

                let r = that.menus[0];
                if (r.subMenus && r.subMenus.length > 0) {
                  r = r.subMenus[0];
                }
                that.$router.push(r.route); //当前的动态返回菜单里面没有固定首页地址，所以改成在生成路由表之后，直接跳转到第一个菜单了
                // this.SetUserInfoAuth();
              });
            })
            .catch((err) => {
              console.log(err);
              this.globalMessage = this.$message.error(err.data.result.loginMessage);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // SetUserInfoAuth() {
    //   this.$http.post("/UserSession/SetUserInfoAuth").then(res => {});
    // },
    /** 供方注册**/
    doRegister() {
      this.$router.push({ name: "GFindex/Register/RegNotes" });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  min-height: 100vh;
  .login-bg {
    width: 100%;
    margin-top: 6%;
    img {
      width: 100%;
      height: 80%;
      position: absolute;
      left: 0 !important;
    }
  }
  .logodiv {
    width: 85%;
    margin: 15px;
    margin-left: 150px;
  }
  .pass-main {
    width: 25%;
    /* height: 440px; */
    position: absolute;
    top: 20%;
    right: 10%;
    background: rgba(51, 51, 51, 0.6);
    background: #fff;
    border-radius: 6px;
    // padding: 0 1%;
    // padding-bottom: 3%;
    .pass-title {
      color: #333;
      text-align: center;
      font-size: 24px;
      padding: 0 3%;
      .pass-title-info {
        width: 50%;
        cursor: pointer;
        .text {
          width: 65%;
          vertical-align: top;
        }
        .pic {
          width: 35%;
        }
      }
    }
    .head {
      width: 100%;
      color: #333;
      margin: 10px auto 0;
    }
    .name {
      width: 80%;
      height: 5rem;
      margin: 0 auto 8%;
      ::v-deep .el-form-item__label {
        &:before {
          display: none;
        }
        color: #333;
        font-size: 16px;
      }
      ::v-deep .el-input__inner {
        background-color: #ffffff4d;
        color: rgb(0, 0, 0);
        /*border: none;*/
        line-height: 45px;
        height: 45px;
      }
    }
    .btn {
      margin: 12% auto 0%;
      width: 80%;
      display: block;
      font-size: 16px;
      background: #ea5514;
      color: #fff;
      border: none;
      line-height: 45px;
      height: 45px;
      padding: 0;
    }
    .lkbtn {
      margin: 0% auto 0%;
      width: 80%;
      display: block;
      font-size: 16px;
      color: #333;
      border: none;
      line-height: 45px;
      height: 45px;
      padding: 0;
      text-align: right;
    }
    .code {
      text-align: center;
      img {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 1366px) {
  .login {
    .pass-main {
      /*height:430px;*/
      .head {
        margin: 0px auto 0;
      }
      .name {
        margin: 0 auto 4%;
        ::v-deep .el-input__inner {
          line-height: 40px;
          height: 40px;
        }
      }
      .btn {
        margin: 12% auto 0%;
        line-height: 40px;
        height: 40px;
      }
    }
  }
}
</style>
