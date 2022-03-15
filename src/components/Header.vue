<template>
  <div id="head1">
    <!-- <el-header class="header" height="120px" id="app-header">
      <el-image style="width: 100%; height: 100%" :src="bjurl" fit=""> </el-image>
    </el-header> -->

    <register-menu v-if="!hideMenu" ref="memuRef" />
  </div>
</template>

<script>
import Menu from "components/Menu";
import bus from "@/util/bus";

export default {
  name: "app-header",
  components: {
    RegisterMenu: Menu,
  },
  data() {
    return {
      bjurl: require("@/assets/top-bg.jpg"),
      hideMenu: false,
    };
  },
  mounted() {
    let that = this;
    bus.$on("hideNav", () => {
      that.hideMenu = true;
    });
    bus.$on("showNav", () => {
      that.hideMenu = false;
    });
  },
  methods: {
    renderColor1(id, pid) {
      this.$refs.memuRef.renderColor(id, pid);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 0;
  position: relative;
  font-size: 0;
  width: 100%;
  position: relative;
  overflow: hidden;
  .bannerIndexImg {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .topbg {
    width: 100%;
  }
  .logo {
    width: 30%;
    position: absolute;
    height: auto;
    left: 6%;
    top: 40%;
    z-index: 12;
  }
}
</style>
