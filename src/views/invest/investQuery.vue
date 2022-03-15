<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="24">
        <el-form label-position="right" label-width="120px" :model="formSearch" size="small" class="border p-2 mt-2">
          <el-row>
            <el-col :span="6">
              <el-form-item label="考察主题：">
                <el-input v-model="formSearch.MasterName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="供应商名称：">
                <el-input v-model="formSearch.SupName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发起人：">
                <el-input v-model="formSearch.StartUserName"></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="6">-->
            <!--<el-form-item label="考察模板名称：">-->
            <!--<el-input v-model="formSearch.TempName"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="6">
              <el-form-item label="总体结果：">
                <el-select v-model="formSearch.ReportType">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="通过" value="通过"></el-option>
                  <el-option label="未通过" value="未通过"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button type="primary" size="small" @click="loadQueryForm" style="float: right; margin-bottom: 10px; margin-top: 10px"
          >搜索</el-button
        >
        <!--<el-row class="float-right mb-1 mt-1">-->
        <!--<el-col :span="24">-->
        <!--<el-button type="primary" size="small" @click="onSubmit">搜索</el-button>-->
        <!--<el-button type="primary" size="small" @click="add">新增</el-button>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-table
          empty-text="无符合条件的记录"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column prop="masterName" label="考察主题"> </el-table-column>
          <el-table-column align="left" prop="supName" label="供应商名称" width="340"> </el-table-column>
          <el-table-column prop="startUserName" label="发起人" align="center" width="100"> </el-table-column>
          <!--          <el-table-column prop="reportType" label="考察报告类型" align="center"></el-table-column>-->
          <el-table-column prop="supCateName" label="考察分类" align="center" width="180"> </el-table-column>
          <!--          <el-table-column prop="tempName" label="考察模板名称" align="center"> </el-table-column>-->
          <el-table-column prop="finalScore" label="考察得分" align="center" width="80"> </el-table-column>
          <el-table-column prop="passFlag" label="考察结果" align="center" width="100">
            <template slot-scope="scope">
              <i v-if="scope.row.passFlag">通过</i>
              <i v-if="!scope.row.passFlag">未通过</i>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <!--<i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />-->
              <!--<i @click="handleEdit(scope.row)" class="el-icon-edit" title="编辑" style="margin-left:15px" />-->
              <i @click="handleEdit(scope.row)" class="el-icon-picture" title="预览" style="margin-left: 15px" />
            </template>
          </el-table-column>
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
      dropDownGroup: {},
      formSearch: {
        StartUserName: "",
        MasterName: "",
        SupName: "",
        TempName: "",
        SkipCount: 0,
        MaxResultCount: 10,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      tableData: [],
      loading: false,
    };
  },
  created() {
    this.loadQueryForm();
    this.$api.invest.GetSearchDropDown().then((res) => {
      this.dropDownGroup = res;
    });
  },
  methods: {
    add() {
      this.$router.push({
        path: "/invest/InvestForm",
      });
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.loadQueryForm();
    },
    loadQueryForm() {
      this.loading = true;
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      this.$api.invest.GetSupplierList(this.formSearch).then((res) => {
        this.loading = false;
        this.tableData = res.items;
        this.page.total = res.totalCount;
      });
    },
    handleEdit(row) {
      window.open(`#/invest/report1?masterId=` + row.id + "&supGuid=" + row.supGuid);
      // this.$router.push({
      //   path: '/invest/report1',query:{masterId:row.id,supGuid:row.supGuid}
      // })
    },
    delete1(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.SaveInvesMaster(this.form).then((res) => {
            if (res.success) {
              this.$message.success("保存成功");
              this.masterId = res.returnValue1;
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
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
