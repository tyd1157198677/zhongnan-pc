<template>
  <el-main>
    <el-row id="page_main">
      <statusList></statusList>
      <el-col :span="24" style="margin-bottom:50px">
        <el-collapse v-model="activeNames" class="mt-0 mb-0" v-if="isShow">
          <el-collapse-item :name="index" v-for="(item, index) in tabs" :key="index">
            <template slot="title">
              <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">{{ item.label }}</span>
            </template>
            <div class="mt-2">
              <component :is="item.component" :id="baseId" />
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" class="mt-0 mb-0" v-if="isShowOver">
          <el-collapse-item :name="index" v-for="(item, index) in tabs2" :key="index">
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
import step5 from "./components/step5";
import step7 from "./components/step7";
import step6 from "./components/step6";
import step8 from "./components/step8";

export default {
  name: "detail",
  components: { statusList: () => import("@/components/statusList.vue") },
  inject: ["reload"],
  data() {
    return {
      isShow: false,
      isShowOver: true,
      tabs: [],
      tabs2: [],
      activeNames: [],
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  mounted() {
    this.GetNoticeByPlanId05();
    this.tabs = [
      { label: "招标计划", name: "step1", component: step1 },
      { label: "入围基本信息", name: "step2", component: step2 },
      { label: "邀请单位", name: "step3", component: step3 },
      { label: "入围单位", name: "step4", component: step4 },
      { label: "招标公告", name: "step7", component: step7 },
      { label: "相关附件", name: "step8", component: step8 },
      { label: "投标保证金", name: "step5", component: step5 },
      { label: "投标承诺函", name: "step6", component: step6 },
    ];
    this.tabs2 = [
      { label: "招标计划", name: "step1", component: step1 },
      { label: "入围基本信息", name: "step2", component: step2 },
      { label: "邀请单位", name: "step3", component: step3 },
      { label: "入围单位", name: "step4", component: step4 },
      // { label: "招标公告", name: "step7", component: step7 },
      { label: "相关附件", name: "step8", component: step8 },
      { label: "投标保证金", name: "step5", component: step5 },
      { label: "投标承诺函", name: "step6", component: step6 },
    ];
    this.activeNames = this.tabs.map((e, i) => i);
  },
  created: function() {
    //this.$emit('header', true);
    //this.$emit('footer', true);
    bus.$emit("hideNav");
  },
  methods: {
    GetNoticeByPlanId05() {
      this.$api.supIn.GetNoticeByPlanId05({ planId: this.planId }).then(res => {
        if (res.planId != "00000000-0000-0000-0000-000000000000") {
          if (res.data.isShow) {
            this.isShowOver = false;
            this.isShow = true;
          } else {
            this.isShow = false;
            this.isShowOver = true;
          }
          // this.isShow = res.data.isShow;
        }
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
</style>
