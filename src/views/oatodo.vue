<!--  -->
<!--  -->
<template>
  <div class="box">
    <!-- 111 -->
    <el-empty description="链接跳转中..." v-if="show"></el-empty>
    <el-empty description="很抱歉，出错了" velse></el-empty>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { API_URL } from "@/config/urls";
import bus from "@/util/bus";
import build from "../router/build";
export default {
  components: {},
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapState("menu", ["menus"], "userName"),
  },
  watch: {},
  created() {},
  mounted() {
    this.regexp();
  },
  methods: {
    ...mapMutations("menu", { initMenu: "init" }),
    /**
     * [通过参数名获取url中的参数值]
     * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
     * @param  {[string]} queryName [参数名]
     * @return {[string]}           [参数值]
     */
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.href.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    regexp() {
      let that = this;
      let path = this.$route.query;
      // 清空缓存，防止数据错误
      localStorage.setItem("accessToken", "");
      sessionStorage.setItem("userGuid", "");
      localStorage.setItem("userName", "");
      localStorage.setItem("userGuid", "");
      this.$store.commit("setToken", "");
      this.$store.commit("setUserName", "");
      this.$store.commit("setUserRoleNames", "");
      this.$store.commit("setUserId", "");
      this.$store.commit("setUserGuid", "");
      //初始化不显示导航
      bus.$emit("hideNav");
      //链接没有todoId的时候拿LoginId和链接token
      if (!path.todoId) {
        let url = this.getQueryString("LinkUrl");
        let obj = {
          // loginId: path.LoginId,
          loginId: "2034027",
        };
        let token =
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4RTk4MTA3ODI4QzQ5RDU2OUJFMEJFMDU1ODFCQzZBIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NDI1NzY5OTAsImV4cCI6MTY0MjU4MDU5MCwiaXNzIjoiaHR0cDovL2JpZGRzLnpvaW5hZm9yLmNvbTo1MTAxIiwiY2xpZW50X2lkIjoiY2xpZW50X2JpZDE1MGRiN2ViNTUwMzQzMTkiLCJqdGkiOiI4MTU5Njk5RUY5Nzg0NTk5QzY1Q0E0NkQ4MTJDRDI1NiIsImlhdCI6MTY0MjU3Njk5MCwic2NvcGUiOlsiYXBpMSJdfQ.gXpQhQmxPiR1rNsT-kaoyMonfdtC1uvpVlelF_8OR3Sm2fij0VQWTHRVlVgBURFo0VHi82vz_PmUZBz0KfEJMuVT2Jo6Cyg4Mf48dLCePR_OzKMNSqtiGG4rVCIXBdimxhb5PPg-4GtO5phL8YmKDgFDRLHU4TJ2sc17mRm7j318ZKnee3IsOzQ5003V7X7ezZdSZwL7dTwucecqExWC-__5WzFPm8Mheo7sotnOIgn5VIG0u0W2i6rFwXDP3_QEBsgsAiHPiW0PVzW7NnnIDg3AxGQ48C5mN6FJv38g4-vd5pmzDq2QlUG0WgzcQPfGbAb71aDaEsF4usUglDNXKg";
        this.$http
          .post(API_URL + "/api/TokenAuth/SignByClientAuth", obj, { headers: { Authorization: "Bearer " + token } })
          // .post(API_URL + "/api/TokenAuth/SignByClientAuth", obj, { headers: { Authorization: "Bearer " + path.AccessToken } })
          .then((res) => {
            if (res.data.result.accessToken == null) {
              this.$message.error(res.data.result.loginMessage);
              that.show = false;
            } else {
              that.show = true;
              let { accessToken, userName, userRoleNames, userId, userGuid } = res.data.result;
              localStorage.setItem("accessToken", accessToken);
              sessionStorage.setItem("userGuid", userGuid);
              localStorage.setItem("userName", userName);
              localStorage.setItem("userGuid", userGuid);
              this.$store.commit("setToken", accessToken);
              this.$store.commit("setUserName", userName);
              this.$store.commit("setUserRoleNames", userRoleNames);
              this.$store.commit("setUserId", userId);
              this.$store.commit("setUserGuid", userGuid);
              this.$api.SysMenu.LoadUserMenus().then((res) => {
                that.initMenu(res);
                that.$router.addRoutes(build(that.menus));
                bus.$emit("showNav");
                this.$router.push({
                  path: url,
                });
              });
            }
          });
      } else {
        //链接有todoId的时候
        let obj = {
          todoId: path.todoId,
          // todoId: "E463162B-975A-41B6-893D-3859525547D5",
        };
        this.$http.post(API_URL + "/api/TokenAuth/UserLoginByOaTodo", obj).then((res) => {
          if (res.data.result.accessToken == null) {
            that.show = false;
            this.$message.error(res.data.result.loginMessage);
          } else {
            let data = res.data.result;
            let url = data.gotoUrl.substr(2);
            that.show = true;
            // let userName = this.$store.state.userName;
            let { accessToken, userName, userRoleNames, userId, userGuid } = res.data.result;
            localStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("userGuid", userGuid);
            localStorage.setItem("userName", userName);
            localStorage.setItem("userGuid", userGuid);
            this.$store.commit("setToken", accessToken);
            this.$store.commit("setUserName", userName);
            this.$store.commit("setUserRoleNames", userRoleNames);
            this.$store.commit("setUserId", userId);
            this.$store.commit("setUserGuid", userGuid);
            this.$api.SysMenu.LoadUserMenus().then((res) => {
              that.initMenu(res);
              that.$router.addRoutes(build(that.menus));
              this.$http.post("/SysTodo/SetRead", { id: path.todoId }).then((res) => {
                if (!res.data.success) {
                  this.$message.error(res.data.message);
                } else {
                  bus.$emit("showNav");
                  that.$router.push({
                    path: url,
                  });
                }
              });
            });
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  margin-top: 10%;
  margin: auto;
}
</style>
