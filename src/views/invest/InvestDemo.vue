<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="24">
        <el-form label-position="right" label-width="120px" :model="formSearch" size="small" class="border p-2 mt-2">
          <el-row>
            <el-col :span="6">
              <el-form-item label="单位名称：">
                <el-input v-model="formSearch.MasterName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="考察项目类型：">
                <el-select v-model="formSearch.ReporType">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="住宅" value="住宅"></el-option>
                  <el-option label="商业" value="商业"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="考察时间：">
                <el-date-picker v-model="value1" type="date" placeholder="考察时间："> </el-date-picker>
              </el-form-item>
            </el-col>
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
        <el-row class="float-right mb-2 mt-2">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="loadQueryForm">搜索</el-button>
            <el-button type="primary" size="small" @click="add">发起考察</el-button>
          </el-col>
        </el-row>
        <!--        <el-button type="primary" size="small" @click="loadQueryForm" style="float: right;margin-bottom: 10px;margin-top: 10px;">搜索</el-button>-->
        <!--        <el-button type="primary" size="small" @click="add">发起考察</el-button>-->
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
          <!-- <el-table-column prop="masterName" label="承接主体" header-align="center" width="260"> </el-table-column> -->
          <el-table-column prop="reportType" label="专业" align="center"></el-table-column>
          <el-table-column prop="supName" label="所属项目" align="center"></el-table-column>
          <el-table-column prop="finalScore" align="center" label="注册资金（万）"> </el-table-column>
          <el-table-column prop="tempName" label="资质等级" align="center"> </el-table-column>

          <!--          <el-table-column prop="reportType" label="考察项目类型" align="center"> </el-table-column>-->
          <!--          <el-table-column prop="tempName" label="考察模板名称" align="center"> </el-table-column>-->
          <el-table-column prop="invesReason" label="合作意愿" align="center"> </el-table-column>
          <el-table-column prop="creationTime" label="考察时间" align="center"> </el-table-column>
          <el-table-column prop="passFlag" label="考察结果" align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.passFlag">通过</i>
              <i v-if="!scope.row.passFlag">未通过</i>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template>
              <!--<i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />-->
              <!--<i @click="handleEdit(scope.row)" class="el-icon-edit" title="编辑" style="margin-left:15px" />-->
              <i @click="add" class="el-icon-picture" title="预览" style="margin-left: 15px" />
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
        ReporType: "",
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
      value1: "",
      tableData: [
        {
          bidProjectName: "深哈金融科技城项目",
          creationTime: "2021-02-23",
          invesReason: "强烈",
          finalScore: 1000,
          masterName: "深圳市广胜达建设有限公司",
          passFlag: true,
          reportType: "护坡及降水工程",
          resultDesc: "通过本次考察",
          scope: "项目",
          supCateName: "护坡及降水工程",
          supName: "联东U谷·北京科创中心",
          tempName: "总承包壹级资质",
        },
        {
          bidProjectName: "深哈金融科技城项目",
          creationTime: "2021-02-23",
          invesReason: "强烈",
          finalScore: 5000,
          masterName: "中建三局",
          passFlag: true,
          reportType: "电气动力工程",
          resultDesc: "通过本次考察",
          scope: "项目",
          supCateName: "护坡及降水工程",
          supName: "联东U谷·科技创新谷",
          tempName: "总承包壹级资质",
        },
        {
          bidProjectName: "深哈金融科技城项目",
          creationTime: "2021-02-23",
          invesReason: "强烈",
          finalScore: 1500,
          masterName: "深圳市广胜达建设有限公司",
          passFlag: true,
          reportType: "电气动力工程",
          resultDesc: "通过本次考察",
          scope: "项目",
          supCateName: "护坡及降水工程",
          supName: "联东U谷·北京金亦科技园",
          tempName: "总承包壹级资质",
        },
      ],
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
        path: "/invest/InvestFormDemo",
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
        // this.tableData = res.items
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
