<template>
  <div>
    <!--<div style="color: red;margin-top: 10px;">招标专业为{{this.tableData1.cateName}},需上传：{{this.string1}}</div>-->
    <el-table
      empty-text="无符合条件的记录"
      stripe
      border
      style="margin-top: 10px"
      element-loading-text="请稍候,数据正在加载中..."
      :data="tableData"
      v-loading="loading"
    >
      <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column prop="comFullName" align="left" label="供应商名称"> </el-table-column>
      <!-- <el-table-column prop="comMainName" label="承接主体名称"> </el-table-column> -->
      <el-table-column prop="tbFilePath" label="投标承诺函" width="150" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.tbFilePath" class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row.tbFileId)"></i>
          <i v-if="!scope.row.tbFilePath">未上传</i>
        </template>
      </el-table-column>
      <el-table-column prop="rzFilePath" label="融资走款承诺函" width="150" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.rzFilePath" class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row.rzFileId)"></i>
          <i v-if="!scope.row.rzFilePath">未上传</i>
        </template>
      </el-table-column>
      <el-table-column prop="msFilePath" label="承接模式承诺函" width="150" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.msFilePath" class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row.msFileId)"></i>
          <i v-if="!scope.row.msFilePath">未上传</i>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作" width="80" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<i class="el-icon-download ml-2" title="下载" @click="down(scope.row)"></i>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Step2",
  data() {
    return {
      dialogVisible: false,
      form: [],
      tableData: [],
      loading: false,
      rols: [],
      bidPersonExam: [],
      bidRole: "",
      infos: [],
      selectUser: [],
      planId: "",
      string1: "",
      tableData1: {},
      x: true,
    };
  },
  created: function () {
    this.planId = this.$route.query.id;
  },
  mounted() {
    this.GetSupplierPromission07();
    this.GetRequiredAttach04();
  },
  methods: {
    GetRequiredAttach04() {
      this.$api.supIn.GetRequiredAttach04({ planId: this.planId }).then((res) => {
        this.tableData1 = res;
        for (var i = 0; i < res.attachNameList.length; i++) {
          if (i != 0) {
            this.string1 += "、";
          }
          this.string1 += res.attachNameList[i];
        }
      });
    },
    onDonwLoad(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad007?fileId=" + id);
      //window.open(process.env.VUE_APP_API_URL + path)
      //window.location.href = process.env.VUE_APP_API_URL + path;
    },
    GetSupplierPromission07() {
      this.$api.supIn.GetSupplierPromission07({ planId: this.planId }).then((res) => {
        this.tableData = res;
      });
    },
    add() {
      this.dialogVisible = true;
    },
    // onDonwLoad(){
    //   this.dialogVisible = true;
    // },
    onSubmit() {
      this.dialogVisible = false;
    },
    getPersonalRole(id) {
      this.loading = true;
      this.$api.BidPerson.GetBidModePersonDropDown()
        .then((res) => {
          this.rols = res.bidPersonRole;
          this.bidPersonExam = res.bidPersonExam;
        })
        .then(() => {
          this.getBidModePersonList();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getBidModePersonList() {
      this.$api.BidPerson.GetBidModePersonList(this.baseId).then((res) => {
        this.infos = res;
      });
    },
    onAdd() {
      this.$refs.userSelect.open();
    },
    onDelete(user) {
      this.$api.BidPerson.DeleteBidModePersonById(user.id).then((res) => {
        this.getBidModePersonList();
      });
    },
    onSaveUserRole() {
      // if(!this.bidPersonExam == "" || this.bidRole == "") {
      //   this.$message({
      //           message: "请先选择评价类型和角色",
      //           type: "error",
      //           });
      // } else {
      const rols = this.infos.map((x) => {
        return {
          userGuid: x.userGuid,
          bidRole: x.bidRole,
          bidPersonExam: x.bidPersonExam,
        };
      });
      this.$api.BidPerson.SaveBidPersonRoles(this.baseId, rols).then((res) => {
        this.$message.success("保存成功");
        this.getBidModePersonList();
      });
      // }
    },
    onUserAdd(user) {
      this.$api.BidPerson.SaveSinglePerson(this.baseId, user.userGuid).then((res) => {
        if (res.success) {
          this.$message.success("添加成功");
          this.getBidModePersonList();
        }
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
