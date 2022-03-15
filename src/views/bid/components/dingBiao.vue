<template>
  <div class="">
    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane label="定标" name="1">
        <fa-qi-ding-biao v-if="data.showModule1" v-bind:dataF="data" ref="faqi"></fa-qi-ding-biao>
        <p style="color: red" v-if="!data.showModule1">{{ this.data.pageMessage1 }}</p>
      </el-tab-pane>

      <el-tab-pane label="通知书及感谢信" name="2">
        <tong-zhi-shu v-if="data.showModule2" v-bind:dataF2="data" ref="mychild"></tong-zhi-shu>
        <p style="color: red" v-if="!data.showModule2">{{ this.data.pageMessage2 }}</p>
      </el-tab-pane>

      <el-tab-pane label="交底资料" name="3">
        <zi-liao v-if="data.showModule3" v-bind:dataF3="data" ref="ziliao"></zi-liao>
        <p style="color: red" v-if="!data.showModule3">{{ this.data.pageMessage3 }}</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    faQiDingBiao: () => import("./dingBiaoComponents/faQiDingBiao"),
    tongZhiShu: () => import("./dingBiaoComponents/tongZhiShu"),
    ziLiao: () => import("./dingBiaoComponents/ziLiao"),
  },
  data() {
    return {
      activeName: "1",
      id: "",
      data: {},
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$api.supIn.CheckBidWin({ bidModeId: this.id }).then(res => {
      this.data = res;
      this.tabIndex = res.tabIndex;
      console.log(this.tabIndex);
      // this.tabIndex == 2;
      if (this.tabIndex === 1) {
        this.activeName = "1";
      }
      if (this.tabIndex === 2) {
        this.activeName = "2";
      }
      if (this.tabIndex === 3) {
        this.activeName = "3";
      }
    });
  },
  mounted() {
    this.CheckBidWin();
  },
  methods: {
    tomethgodingbiao() {
      this.CheckBidWin();
      if (this.activeName == "1") {
        this.$refs.faqi.tomethgofaqi();
      }
      if (this.activeName == "2") {
        this.$refs.mychild.tomethgotongzhi();
      }
      if (this.activeName == "3") {
        this.$refs.ziliao.ziliao();
      }
    },
    tabsClick(val) {
      if (val.name == "2") {
        this.$refs.mychild.$emit("show2");
      }
    },
    CheckBidWin() {
      this.$api.supIn.CheckBidWin({ bidModeId: this.id }).then(res => {
        this.data = res;
        this.tabIndex = res.tabIndex;
        if (this.tabIndex === 1) {
          this.activeName = "1";
        }
        if (this.tabIndex === 2) {
          this.activeName = "2";
        }
        if (this.tabIndex === 3) {
          this.activeName = "3";
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
}
.pub {
  border-left: 3px solid #21468c;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background: #f4f4f4;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
}
</style>
