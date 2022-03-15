<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="24">
        <el-form label-position="right" label-width="120px" :model="formSearch" size="small" class="border p-2 mt-2">
          <el-row type="flex" justify="end">
            <el-col :span="6">
              <el-form-item label="年份：">
                <el-select v-model="formSearch.Year">
                  <el-option v-for="item in table1.yearDropDown" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="招标层级：">
                <el-select v-model="formSearch.BidLevel">
                  <el-option v-for="item in table1.bidLevelDropDown" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row class="float-right mb-2 mt-2">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="loadQueryForm">搜索</el-button>
          </el-col>
        </el-row>
        <el-table
          empty-text="无符合条件的记录"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column prop="cateName" align="center" label="专业名称"> </el-table-column>
          <el-table-column prop="noStartCount" align="center" label="未开始"> </el-table-column>
          <el-table-column prop="processCount" align="center" label="进行中"> </el-table-column>
          <el-table-column prop="completedCount" align="center" label="已完成"> </el-table-column>
          <el-table-column prop="allCount" align="center" label="总计"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
export default {
  data() {
    return {
      flag1: false,
      flag2: false,
      formgongfang: {
        masterName: "",
        supGuid: "",
        name: "",
        type: "", // 类型
      },
      formSearch: {
        Year: "",
        BidLevel: "",
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      value1: "",
      codeList: [],
      tableData: [],
      tableData2: [],
      isShowFaQibtn: false,
      loading: false,
      userGuid: "",
      activeName: "first",
      table1: {},
    };
  },
  created() {
    this.$api.supIn.GetStatPageDropDown().then((res) => {
      this.table1 = res;
    });
    this.loadQueryForm();
  },
  methods: {
    loadQueryForm() {
      this.loading = true;
      this.$api.supIn.GetBidCateStat(this.formSearch).then((res) => {
        this.loading = false;
        this.tableData = res;
      });
    },
    loadQueryForm2() {
      this.loading = true;
      this.$api.supIn.GetSupplierInDivideStat(this.formSearch).then((res) => {
        this.loading = false;
        this.tableData2 = res;
      });
    },
  },
};
</script>

<style scoped>
.el-select {
  width: 100%;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
</style>
