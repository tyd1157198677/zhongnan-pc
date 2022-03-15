<template>
  <div>
    <el-table
      empty-text="无符合条件的记录"
      stripe
      style="margin-top: 10px"
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="tableData"
      v-loading="loading"
    >
      <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column align="left" prop="comFullName" label="供应商名称"> </el-table-column>
      <!-- <el-table-column prop="comMainName" label="承接主体名称"> </el-table-column> -->
      <!--<el-table-column prop="filePath" label="是否缴纳" width="80" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<i v-if="scope.row.filePath">是</i>-->
      <!--<i v-if="!scope.row.filePath">否</i>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="bankName" label="打款银行名称" width="150" align="center"> </el-table-column>
      <el-table-column label="打款银行账号" width="150" prop="bankAccount" align="center"></el-table-column>
      <el-table-column label="打款金额" width="150" prop="money" align="center"></el-table-column>
      <el-table-column label="证明文件" width="150" prop="filePath" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.filePath" class="el-icon-download ml-2" title="下载" @click="onDonwLoad2(scope.row.fileId)"></i>
          <i v-if="!scope.row.filePath">未上传</i>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作" width="150" prop="yushen" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<i @click="ReUploadDepositFile06(scope.row)" type="primary">重新上传</i>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script>
/**
 * 招标采购-邀请供方
 */

export default {
  name: "Step5",
  data() {
    return {
      files: "",
      form: [],
      uploadData: [],
      dialogVisible1: false,
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      tableData: [],
      loading: false,
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rules: {},
      planId: "",
      x: true,
    };
  },
  created: function () {
    this.planId = this.$route.query.id;
  },
  mounted() {
    this.GetLiandoSupplierDeposit06();
  },
  methods: {
    onDonwLoad2(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad007?fileId=" + id);
      //window.open(process.env.VUE_APP_API_URL + path)
      //window.location.href = process.env.VUE_APP_API_URL + path;
    },
    ReUploadDepositFile06(row) {
      this.test();
      if (this.x) {
        return;
      }
      this.$api.supIn.ReUploadDepositFile06({ id: row.id }).then((res) => {
        if (res.success) {
          this.$message.success("添加成功");
          this.GetLiandoSupplierDeposit06();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    GetLiandoSupplierDeposit06() {
      this.$api.supIn.GetLiandoSupplierDeposit06({ planId: this.planId }).then((res) => {
        this.tableData = res;
      });
    },
    add() {
      this.dialogVisible = true;
    },
    onDonwLoad() {
      this.dialogVisible = true;
    },
    onSubmit() {
      this.dialogVisible = false;
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.loadData();
    },
    onSelectSups(sup) {
      this.$api.BidModeSupplier.SaveSupplier({
        baseId: this.baseId,
        supplierId: sup.id,
      }).then((res) => {
        if (res.success) {
          this.$message.success("添加成功");
          this.loadData();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    CheckHaveSupplier() {
      this.$api.BidModeSupplier.CheckHaveSupplier(this.baseId).then((res) => {
        this.haveSupplier = res.success;
        if (this.haveSupplier) {
          this.loadData();
        } else {
          this.message = res.message;
        }
      });
    },
    // loadData() {
    //   const { index, size } = this.page;
    //   const query = {
    //     SkipCount: (index - 1) * size,
    //     MaxResultCount: size,
    //     baseId: this.baseId,
    //   };
    //   this.$api.BidModeSupplier.GetBidModeSupplierList(query).then(res => {
    //     this.tableData = res;
    //   });
    // },
    delSup(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.BidModeSupplier.DeleteBidModeSupplier(row.id).then((res) => {
          if (res.success) {
            this.loadData();
          } else {
            this.$message.error(res.message);
          }
        });
      });
    },
    test() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res) => {
        if (res.planId == "00000000-0000-0000-0000-000000000000") {
          this.$message.error("请先完善入围相关信息");
          this.x = true;
        } else {
          this.x = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 2% 0 120px;
  height: 100%;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: #ffffff;
  position: relative;
  /* width: 88%; */
  border-radius: 10px 10px 0 0;
  overflow: auto;
}

.buttoncss {
  float: right;
  margin-top: 12px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}
</style>
