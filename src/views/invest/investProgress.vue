<template>
  <el-main>
    <el-row id="page_main">
      <div class="table-top-title" style="margin-bottom: 10px">{{ this.rows.masterName }}</div>
      <el-col :span="24">
        <el-row class="float-right mb-1">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="UrgePerson">催办</el-button>
            <el-button type="primary" size="small" @click="add" style="background-color: lightgray; border-color: lightgray; color: black"
              >返回</el-button
            >
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
          <el-table-column prop="userName" label="姓名" align="center" width="100"> </el-table-column>
          <el-table-column prop="depName" label="部门" align="center"> </el-table-column>
          <el-table-column prop="supplierName" label="供方名称" align="center"></el-table-column>
          <el-table-column prop="isCompleted" label="打分状态" align="center" width="100">
            <template slot-scope="scope">
              <i v-if="scope.row.isCompleted">已打分</i>
              <i v-if="!scope.row.isCompleted">未打分</i>
            </template>
          </el-table-column>
          <el-table-column prop="tempName" label="查看结果" align="center" width="100">
            <template slot-scope="scope">
              <i v-if="scope.row.isCompleted" @click="handleEdit2(scope.row)" class="el-icon-zoom-in" style="margin-left: 15px" />
              <font v-if="!scope.row.isCompleted">-</font>
            </template>
          </el-table-column>
        </el-table>
        <!--<pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />-->
      </el-col>
    </el-row>

    <el-dialog :visible.sync="flag" title="打分结果" width="70%" style="margin-bottom: 75px">
      <el-table
        empty-text="暂无数据"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData2"
        max-height="500"
        v-loading="loading"
        style="padding: 3px"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="standard" label="评审项">
          <template slot-scope="scope">
            <span :title="scope.row.standard">
              <strong>{{ scope.row.wdName }}-{{ scope.row.zbName }}</strong>
              <br />
              <span>{{ scope.row.standard }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fullScore" label="满分" align="center" width="80"></el-table-column>
        <el-table-column prop="giveScore" label="得分" align="center" width="80"> </el-table-column>
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
      rows: {},
      tableData: [],
      tableData2: [],
      loading: false,
      typeReport: "",
    };
  },
  created() {
    var row = this.$route.query.row;
    this.rows = row;
    this.$api.invest.GetInvesPersonProcess({ masterId: row.id }).then((res) => {
      this.tableData = res;
    });
  },
  methods: {
    add() {
      this.$router.push({
        path: "/invest/myStartInvest",
      });
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.loadQueryForm();
    },
    UrgePerson() {
      this.$confirm("确定要催办吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.UrgePerson({ id: this.rows.id }).then((res) => {
            this.$message.success(res.message);
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消" });
        });
    },
    handleEdit(row) {
      this.$router.push({
        path: "/invest/InvestForm",
        query: { row: row },
      });
    },
    handleEdit2(row) {
      this.flag = true;
      this.$api.invest.GetPersonSupplierResult({ personId: row.personId, supGuid: row.supplierId }).then((res) => {
        this.tableData2 = res;
      });
    },
    handleEdit3(row) {
      if (this.typeReport == "工程施工类") {
        this.$router.push({
          path: "/invest/editReport1",
          query: { masterId: row.masterId, supGuid: row.supGuid },
        });
      }
      if (this.typeReport == "材料设备类") {
        this.$router.push({
          path: "/invest/editReport2",
          query: { masterId: row.masterId, supGuid: row.supGuid },
        });
      }
      if (this.typeReport == "咨询服务类") {
        this.$router.push({
          path: "/invest/editReport3",
          query: { masterId: row.masterId, supGuid: row.supGuid },
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
