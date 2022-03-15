<template>
  <div>
    <el-table
      empty-text="无符合条件的记录"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="tableData"
      max-height="600px"
    >
      <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column prop="wdName" label="维度名称" width="120" align="center"> </el-table-column>
      <el-table-column prop="fullScore" label="权重" width="80" align="center"></el-table-column>
      <el-table-column prop="zbName" label="指标名称">
        <template slot-scope="scope">
          <span>{{ scope.row.zbName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="standard" label="参考标准">
        <template slot-scope="scope">
          <span>{{ scope.row.standard }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="depName" label="参与部门"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  created() {
    this.loadQueryForm();
  },
  methods: {
    loadQueryForm() {
      this.$api.Evaluate.GetTempDetail({ tempId: this.id }).then((res) => {
        this.tableData = res;
      });
    },
  },
};
</script>
<style scoped>
.el-table /deep/ .cell {
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding-right: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: initial;
  overflow: visible;
}
</style>
