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
              <el-form-item label="考察模板名称：">
                <el-input v-model="formSearch.TempName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="考察报告类型：">
                <el-select v-model="formSearch.ReportType">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="item in dropDownGroup.reportType" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="考察状态：">
                <el-select v-model="formSearch.InvesStatus">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="item in dropDownGroup.invesStatus" :key="item.value" :label="item.text" :value="item.value"></el-option>
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
          <el-table-column prop="reportType" label="考察报告类型" align="center"></el-table-column>
          <el-table-column prop="startUserName" label="考察发起人" align="center" width="100"> </el-table-column>

          <el-table-column prop="supCateName" label="考察分类" align="center" width="180"> </el-table-column>
          <!--          <el-table-column prop="tempName" label="考察模板名称" align="center"> </el-table-column>-->
          <el-table-column prop="invesReason" label="考察目的" align="center" width="150"> </el-table-column>
          <el-table-column prop="invesStatus" label="状态" align="center" width="80"> </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <!--<i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />-->
              <i
                v-if="scope.row.invesStatus == '草稿'"
                @click="handleEdit(scope.row)"
                class="el-icon-edit"
                title="编辑"
                style="margin-left: 15px"
              />
              <i @click="investProgress(scope.row)" class="el-icon-user" title="打分进度" style="margin-left: 15px" />
              <i @click="handleEdit2(scope.row)" class="el-icon-tickets" title="编辑考察报告" style="margin-left: 15px" />
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
      </el-col>
    </el-row>

    <el-dialog :visible.sync="flag" title="考察报告" width="70%">
      <el-table
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData2"
        v-loading="loading"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="supName" label="供应商名称" align="left"> </el-table-column>
        <el-table-column prop="passFlag" label="考察报告状态" align="center"> </el-table-column>
        <el-table-column label="操作" align="center" width="130">
          <template slot-scope="scope">
            <i @click="handleEdit3(scope.row)" class="el-icon-edit" title="编辑考察报告" style="margin-left: 15px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-main>
</template>
<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      flag: false,
      dropDownGroup: {},
      formSearch: {
        MasterName: "",
        TempName: "",
        ReportType: "",
        InvesStatus: "",
        MyStartFlag: true,
        SkipCount: 0,
        MaxResultCount: 10,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      tableData: [],
      tableData2: [],
      loading: false,
      typeReport: "",
    };
  },
  created() {
    this.loadQueryForm();
    this.$api.invest.GetSearchDropDown().then((res) => {
      this.dropDownGroup = res;
    });
  },
  methods: {
    investProgress(row) {
      this.$router.push({
        path: "/invest/investProgress",
        query: { row: row },
      });
    },
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
      this.$api.invest.GetInvesMasterList(this.formSearch).then((res) => {
        this.loading = false;
        console.log(res.items);
        this.tableData = res.items;
        this.page.total = res.totalCount;
      });
    },
    handleEdit(row) {
      this.$router.push({
        path: "/invest/InvestForm",
        query: { row: row },
      });
    },
    handleEdit2(row) {
      this.typeReport = row.reportType;
      this.handleEdit3(row.id);
    },
    handleEdit3(id) {
      if (this.typeReport == "工程施工类") {
        this.$router.push({
          path: "/invest/editReport1",
          query: { masterId: id },
        });
      }
      if (this.typeReport == "材料设备类") {
        this.$router.push({
          path: "/invest/editReport2",
          query: { masterId: id },
        });
      }
      if (this.typeReport == "咨询服务类") {
        this.$router.push({
          path: "/invest/editReport3",
          query: { masterId: id },
        });
      }
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
