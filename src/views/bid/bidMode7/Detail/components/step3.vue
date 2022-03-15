<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="库内邀请" name="库内邀请"></el-tab-pane>
      <el-tab-pane label="库外寻源" name="库外寻源"></el-tab-pane>
      <el-tab-pane label="自主报名" name="自主报名"></el-tab-pane>
    </el-tabs>
    <!--<el-select placeholder="请选择标段" @change="dropDownChange" v-model="biaoDuan">-->
    <!--<el-option  v-for="item in dropDown" :key="item.value" :label="item.text" :value="item.value"></el-option>-->
    <!--</el-select>-->
    <!--<el-button type="primary" style="float: right" size="small" @click="add">添加供应商</el-button>-->

    <div style="margin-top: 10px">
      <el-table
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData"
        v-loading="loading"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column label="标段名称" width="150" prop="sectionName" align="center"></el-table-column>
        <el-table-column label="供方来源" width="150" prop="bidSignUpType" align="center"></el-table-column>
        <el-table-column align="left" prop="comFullName" label="供应商名称"> </el-table-column>
        <!-- <el-table-column prop="comMainName" label="承接主体名称"> </el-table-column> -->
        <el-table-column label="备注" width="150" prop="supplierInDesc" align="center"></el-table-column>
        <el-table-column label="资格预审" width="150" prop="quaMasterName" align="center"></el-table-column>
        <el-table-column label="考察" width="150" prop="invesMasterName" align="center"></el-table-column>
        <el-table-column label="背调" width="150" prop="backMasterName" align="center"></el-table-column>
        <!--<el-table-column label="操作" width="120" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<i class="el-icon-delete" title="删除" @click="delete1(scope.row)" style="margin-right:10px"></i>-->
        <!--<i class="el-icon-s-promotion" title="发起资审" @click="onDelete(scope.row)" style="margin-right:10px"></i>-->
        <!--<i class="el-icon-s-promotion" title="发起考察" @click="onDelete1(scope.row)"></i>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step3",
  data() {
    return {
      biaoDuan2: "",
      planId: "",
      biaoDuan: "",
      dropDown: [],
      activeName: "库内邀请",
      selectSupVisible: false,
      tableData: [],
      form: {},
      tableIdList: [],
      loading: false,
      x: true,
    };
  },
  created: function () {
    this.planId = this.$route.query.id;
    this.GetSectionDropDown02();
  },
  methods: {
    onDelete(row) {
      alert("建设中");
    },
    add2() {
      this.test();
      if (this.x) {
        return;
      }
      var ids = [];
      for (var i = 0; i < this.tableData.length; i++) {
        ids.push(this.tableData[i].id);
      }
      var forms = { planId: this.planId, ids: ids };
      this.$api.supIn.SaveSupplierIn02(forms).then((res) => {
        if (res.success) {
          this.$message.success("添加成功");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    dropDownChange(e) {
      this.biaoDuan = e;
      this.GetSupplierInviteList02();
    },
    GetSupplierInviteList02() {
      // this.$api.supIn.GetSupplierInviteList02({ planId: this.planId, signUpType: this.activeName }).then(res => {
      //   this.tableData = res;
      // });
      this.$api.supIn.GetSupplierInviteList02({ planId: this.planId, signUpType: this.activeName }).then((res) => {
        this.tableData = res;
      });
    },
    GetSectionDropDown02() {
      this.$api.supIn.GetSectionDropDown02({ planId: this.planId }).then((res) => {
        this.dropDown = res;
        if (res.length > 0) {
          this.biaoDuan = res[0].value;
        }
        this.GetSupplierInviteList02();
      });
    },
    handleClick(tab, event) {
      this.GetSupplierInviteList02();
    },
    add() {
      this.test();
      if (this.x) {
        return;
      }
      this.selectSupVisible = true;
      this.biaoDuan2 = "";
    },
    delete1(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.supIn.DeleteSupplierInvite02({ id: row.id }).then((res) => {
            if (res.success) {
              this.$message.success(res.message);
              this.GetSupplierInviteList02();
            } else {
              this.$message.error(res.message);
              this.GetSupplierInviteList02();
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    onSelectSups(sup) {
      if (!this.biaoDuan2) {
        this.$message.error("请选择标段");
        return;
      }
      var forms = { planId: this.planId, bidSignUpType: this.activeName, sectionId: this.biaoDuan2, supplierId: sup.id };
      this.$api.supIn.SaveSupplier02(forms).then((res) => {
        if (res.success) {
          this.$message.success("添加成功");
          this.GetSupplierInviteList02();
          this.selectSupVisible = false;
        } else {
          this.$message.error(res.message);
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
/* .fromborder {
    border: solid 1px #e6e6e6;
    padding: 12px 24px 12px 12px;
  } */
</style>
