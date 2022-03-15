<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="24" style="margin-bottom:50px">
        <el-collapse v-model="activeNames" class="mt-0 mb-0">
          <el-collapse-item :name="index" v-for="(item, index) in tabs" :key="index">
            <template slot="title">
              <span class="infonametits">{{ item.label }}</span>
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

export default {
  name: "detail",
  components: {},
  inject: ["reload"],
  data() {
    return {
      tabs: [],
      activeNames: [],
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  mounted() {
    this.tabs = [
      { label: "基本信息", name: "step1", component: step1 },
      { label: "计划节点", name: "step2", component: step2 },
      { label: "供应商信息", name: "step3", component: step3 },
      { label: "采购小组成员", name: "step4", component: step4 },
      { label: "相关文件", name: "step5", component: step5 },
    ];
    this.activeNames = this.tabs.map((e, i) => i);
  },
  created: function() {
    //this.$emit('header', true);
    //this.$emit('footer', true);
    bus.$emit("hideNav");
  },
  methods: {},
};
</script>

<style scoped>
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}

::v-deep .el-collapse-item__header {
  border-left: 4px solid #409eff;
  display: flex;
  align-items: center;
  height: 40px;
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
