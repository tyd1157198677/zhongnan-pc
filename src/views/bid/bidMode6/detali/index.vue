<template>
  <el-main>
    <el-row id="page_main">
      <div style="height:40px">
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
      </div>
      <el-col :span="24" style="margin-bottom:50px">
        <!-- <div style="text-align:right;margin-bottom:10px">
          <el-button size="small" type="primary" @click="$router.back(-1)">返回</el-button>
        </div> -->
        <el-collapse v-model="activeNames" class="mt-0 mb-0">
          <el-collapse-item :name="index" v-for="(item, index) in tabs" :key="index">
            <template slot="title">
              <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">{{ item.label }}</span>
            </template>
            <div class="mt-2">
              <component :is="item.component" :id="baseId" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
/**
 * 招标采购-详情
 */
import bus from "@/util/bus";
import step1 from "./components/step1";
import step2 from "./components/step2";
import step3 from "./components/step3";
import step4 from "./components/step4";
import step6 from "./components/step6";
import step8 from "./components/step8";

export default {
  name: "detail",
  components: {},
  inject: ["reload"],
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      tabs: [],
      activeNames: [],
      baseId: "",
    };
  },
  computed: {
    // baseId() {
    //   return this.$route.params.baseId;
    // },
  },
  mounted() {
    this.tabs = [
      { label: "基本信息", name: "step1", icon: "el-icon-menu", component: step1 },
      { label: "标段信息", name: "step2", icon: "el-icon-menu", component: step2 },
      { label: "招标小组", name: "step3", icon: "el-icon-menu", component: step3 },
      { label: "招标单项计划", name: "step4", icon: "el-icon-menu", component: step4 },
      { label: "相关附件", name: "step6", icon: "el-icon-menu", component: step6 },
      { label: "会签人员", name: "step8", icon: "el-icon-menu", component: step8 },
    ];
    this.activeNames = this.tabs.map((e, i) => i);
  },
  created: function() {
    //this.$emit('header', true);
    //this.$emit('footer', true);
    bus.$emit("hideNav");
  },
  methods: {
    gohome() {
      this.$router.push({
        path: "/index",
      });
    },
  },
};
</script>

<style scoped>
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}
::v-deep.el-collapse-item__header {
  border-left: 4px solid #409eff;
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: rgba(0, 0, 0, 0.03);
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 15px;
  float: right;
  cursor: pointer;
}
</style>
