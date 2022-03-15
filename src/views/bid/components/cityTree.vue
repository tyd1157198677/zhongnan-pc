<template>
  <el-dialog width="40%" :title="title" :visible.sync="dialogVisible">
    <el-row>
      <!-- <div style="text-align:right">
        <el-button @click="sure" type="primary">确定</el-button>
      </div> -->
      <el-col>
        <el-tree
          style="height:350px; overflow: scroll;"
          show-checkbox
          ref="tree"
          :data="depData"
          node-key="cateName"
          :expand-on-click-node="false"
          :props="defaultProps"
          @check="handleNodeClick"
        >
        </el-tree>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="sure" type="primary">确定</el-button>
      <el-button @click="dialogVisible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: "",
    level: Number,
  },
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      dialogVisible: false,
      multipleSelection: [],
      depData: [],
      defaultProps: {
        children: "children",
        label: "cateName",
        disabled: data => {
          return data.cateName.indexOf("省") > -1 || data.cateName.indexOf("自治区") > -1 ? true : false;
        },
      },
      loading: false,
      // 已选择的人员
    };
  },
  mounted() {},

  methods: {
    open() {
      this.dialogVisible = true;
      this.fetchDepTree();
    },
    close() {
      this.dialogVisible = false;
    },
    /**
     * 加载部门树
     */
    fetchDepTree() {
      this.$http.get("/CommonTreeAppServices/GetCityTreeList", { params: { level: this.level } }).then(res => {
        this.depData = res.data;
      });
    },
    handleNodeClick(data, arr) {
      this.multipleSelection = arr;
    },
    sure() {
      this.$emit("itemClick", this.multipleSelection);
    },
  },
};
</script>

<style scoped></style>
