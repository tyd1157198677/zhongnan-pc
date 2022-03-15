<template>
  <el-main style="margin-bottom: 120px">
    <el-row id="page_main">
      <el-col :span="24">
        <el-form label-position="right" label-width="120px" :model="formSearch" size="small" class="border p-2 mt-2">
          <el-row :gutter="12">
            <el-col :span="3">
              <!-- <el-form-item label="供方名称"> -->
              <el-input v-model="formSearch.SupplierName" placeholder="供方名称"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="合同项目名称"> -->
              <el-input v-model="formSearch.ProjectName" placeholder="合同项目名称"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="合同名称"> -->
              <el-input v-model="formSearch.ConName" placeholder="合同名称"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="评价主体"> -->
              <el-select v-model="formSearch.MainId">
                <el-option label="评价主体" value=""></el-option>
                <el-option v-for="item in evalData" :label="item.year + item.stage" :value="item.id" :key="item.id"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="分值差"> -->
              <el-input v-model="formSearch.PoorScore" placeholder="分值差"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="9">
              <el-button type="primary" style="float: right" size="small" @click="loadQueryForm">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          empty-text="无符合条件的记录"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column prop="supplierName" label="供方名称">
            <template slot-scope="scope">
              <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpSuppInfo(scope.row.supplierId)">{{
                scope.row.supplierName
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="projectName" label="合同项目名称" width="250"> </el-table-column>
          <el-table-column prop="conName" label="合同名称"> </el-table-column>
          <el-table-column prop="conValue" label="合同金额" align="center" width="120"> </el-table-column>
          <el-table-column prop="mainDesc" label="评价主体" align="center" width="150"> </el-table-column>
          <el-table-column prop="score" label="得分" align="center" width="80"> </el-table-column>
        </el-table>
        <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      formSearch: {
        SupplierName: "",
        ProjectName: "",
        ConName: "",
        PoorScore: "20",
        MainId: "",
        SkipCount: 0,
        MaxResultCount: 10,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      tableData: [],
      evalData: [],
      loading: false,
    };
  },
  created() {
    console.log("query=", this.$route.query);
    if (this.$route.query.row) {
      this.formSearch.MainId = this.$route.query.row.mainId;
      this.formSearch.SupplierName = this.$route.query.row.supplierName;
    }
    this.loadQueryForm();
    // 评价主体下拉
    this.$api.Evaluate.GetEvalMainList().then((res) => {
      this.evalData = res.items;
    });
  },
  methods: {
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.loadQueryForm();
    },
    loadQueryForm() {
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      this.$api.Evaluate.GetAlarmEvaluateList(this.formSearch).then((res) => {
        console.log(res.items);
        this.tableData = res.items;
        this.page.total = res.totalCount;
      });
    },
    jumpSuppInfo(id) {
      window.open(`#/supplier/detail/${id}`);
    },
  },
};
</script>

<style scoped>
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
</style>
