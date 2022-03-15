<template>
  <div>
    <el-row>
      <el-col :span="24">
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
  </div>
</template>

<script>
/**
 * 招标采购-详情
 */
import bus from "@/util/bus";
import step1 from "@/views/bid/bidMode1/Detail/components/step1";
import step2 from "@/views/bid/bidMode1/Detail/components/step2";
import step3 from "@/views/bid/bidMode1/Detail/components/step3";
import step4 from "@/views/bid/bidMode1/Detail/components/step4";
import step6 from "@/views/bid/bidMode1/Detail/components/step6";
import step8 from "@/views/bid/bidMode1/Detail/components/step8";
export default {
  name: "detail",
  components: {},
  props: ["id"],
  inject: ["reload"],
  data() {
    return {
      tabs: [],
      activeNames: [],
    };
  },
  computed: {
    baseId() {
      return this.id;
    },
  },
  mounted() {
    this.tabs = [
      { label: "基本信息", name: "step1", component: step1 },
      { label: "计划节点", name: "step2", component: step2 },
      { label: "标段信息", name: "step3", component: step3 },
      { label: "入围标准", name: "step4", component: step4 },
      { label: "采购小组成员", name: "step6", component: step6 },
      { label: "相关文件", name: "step8", component: step8 },
    ];
    this.activeNames = this.tabs.map((e, i) => i);
  },
  created: function() {
    //   904ed498-1b91-451a-904c-56df19ae60f9
    //   904ed498-1b91-451a-904c-56df19ae60f9
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
