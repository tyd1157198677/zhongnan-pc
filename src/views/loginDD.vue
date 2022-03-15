<template>
  <div class="">
    <!-- 111 -->
    <el-empty description="链接跳转中1"></el-empty>
  </div>
</template>

<script>
import { getOSAndBrowser } from "@/util/browserInfo.js";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.regexp();
  },
  methods: {
    ...mapMutations("menu", { initMenu: "init" }),
    regexp() {
      let path = this.$route.query.code;
      this.$axios.post("/api/TokenAuth/UserLoginDingDing", { code: result.code, browserVersion: getOSAndBrowser() }).then((res) => {
        if (res.success) {
          let that = this;
          const { accessToken, userName, userRoleNames, userId, userGuid } = res.data.result;
          if (!accessToken) {
            return Promise.reject(res);
          }
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
            that.$emit("header", true);
            that.$emit("footer", true);
            that.$router.push(r.route);
          });

          setTimeout(() => {
            this.$axios
              .get(
                "/api/services/app/SysTodo/GetPcUrlByTodoId?todoId=" + path
                // '/api/services/app/SysTodo/GetPcUrlByTodoId?todoId=' + 'cfc27bd4-1a54-4852-89a5-873c1fb0c129'
              )
              .then((res) => {
                window.location.href = "http://bidpage.hrdservice.com" + res.data;
              });
          }, 50);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
