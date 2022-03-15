<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card" style="margin-top: 10px">
      <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.text" :name="item.value"></el-tab-pane>
    </el-tabs>
    <!--<el-select placeholder="请选择标段" @change="dropDownChange" v-model="biaoDuan">-->
    <!--<el-option  v-for="item in dropDown" :key="item.value" :label="item.text" :value="item.value"></el-option>-->
    <!--</el-select>-->

    <!--<el-button type="primary" style="float: right" size="small" @click="add">提交入围审批</el-button>-->
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
        <el-table-column align="left" prop="comFullName" label="供应商名称"> </el-table-column>
        <!-- <el-table-column prop="comMainName" label="承接主体名称"> </el-table-column> -->
        <el-table-column label="资格预审" width="150" prop="yushen" align="center"></el-table-column>
        <el-table-column label="考察" width="150" prop="kaocha" align="center"></el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <!--<i class="el-icon-delete" title="删除" @click="delete1(scope.row)" style="margin-right:10px"></i>-->
            <i class="el-icon-s-custom" title="查看投标单位联系人信息" @click="people(scope.row)" style="margin-right: 10px"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog width="70%" title="供应商联系人" :visible.sync="dialogVisible">
      <!--<el-button type="primary" style="float: right;margin-bottom: 10px;" size="small" @click="addPerson">添加</el-button>-->
      投标联系人
      <el-table
        empty-text="无符合条件的记录"
        style="margin-bottom: 10px"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData2"
        v-loading="loading"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="personName" label="姓名" align="center"> </el-table-column>
        <el-table-column label="座机" prop="phone" align="center"></el-table-column>
        <el-table-column label="手机号" prop="mobilePhone" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"> </el-table-column>
      </el-table>

      商务洽谈联系人
      <el-table
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData3"
        v-loading="loading"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="personName" label="姓名" align="center"> </el-table-column>
        <el-table-column label="座机" prop="phone" align="center"></el-table-column>
        <el-table-column label="手机号" prop="mobilePhone" align="center"></el-table-column>
        <el-table-column prop="email" label="职务" align="center"> </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog width="50%" title="供应商联系人" :visible.sync="dialogVisible2">
      <el-form :model="form" ref="form" size="small" label-width="150px" class="mt-2">
        <el-form-item label="联系人类型" prop="personType">
          <el-select v-model="form.personType" placeholder="请选择">
            <el-option label="投标联系人" value="投标联系人"></el-option>
            <el-option label="商务洽谈联系人" value="商务洽谈联系人"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="personName">
          <el-input v-model="form.personName" style="width: 200px" placeholder="不填或0则不收取投标保证金"></el-input>
        </el-form-item>
        <el-form-item label="联系人座机号" prop="phone">
          <el-input v-model="form.phone" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号" prop="mobilePhone">
          <el-input v-model="form.mobilePhone" style="width: 200px" @input="phoneChange"></el-input>
        </el-form-item>
        <el-form-item v-if="this.form.personType == '投标联系人'" label="联系人邮箱" prop="email">
          <el-input v-model="form.email" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item v-if="this.form.personType == '商务洽谈联系人'" label="联系人职务" prop="workAs">
          <el-input v-model="form.workAs" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right" size="small" @click="onSubmit2">保存信息</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Step3",
  data() {
    return {
      form: {
        id: "",
        planId: "",
        supplierId: "",
        personType: "",
        personName: "",
        phone: "",
        mobilePhone: "",
        email: "",
        workAs: "",
      },
      tabsList: [],
      supplierId: "",
      dialogVisible2: false,
      dialogVisible: false,
      tableData3: [],
      tableData2: [],
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
    onSubmit2() {
      this.form.planId = this.planId;
      this.form.supplierId = this.supplierId;
      var a = [];
      a.push(this.form);
      this.$api.supIn.SaveSupplierPerson03(a).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
          this.GetBidSupplierPerson03(this.form.supplierId);
          this.dialogVisible2 = false;
        } else {
          this.$message.error(res.message);
          this.dialogVisible2 = false;
        }
      });
    },
    phoneChange() {
      this.form.mobilePhone = this.form.mobilePhone.replace(/[^\d]/g, "");
      if (this.form.mobilePhone.length > 11) {
        this.form.mobilePhone = this.form.mobilePhone.substr(0, 11);
      }
      var reg = /^1[3456789]\d{9}$/;
      if (this.form.mobilePhone.length >= 11 && !reg.test(this.form.mobilePhone)) {
        // alert("请输入正确的手机号码格式");
        this.$alert("请输入正确的手机号码格式", {
          confirmButtonText: "确定",
        });
      }
    },
    addPerson() {
      this.form = {
        id: "",
        planId: "",
        supplierId: "",
        personType: "",
        personName: "",
        phone: "",
        mobilePhone: "",
        email: "",
        workAs: "",
      };
      this.dialogVisible2 = true;
    },
    people(row) {
      this.supplierId = row.supplierId;
      this.dialogVisible = true;
      this.GetBidSupplierPerson03(row.supplierId);
    },
    GetBidSupplierPerson03(supplierId) {
      this.tableData2 = [];
      this.tableData3 = [];
      this.$api.supIn.GetBidSupplierPerson03({ planId: this.planId, supplierId: supplierId }).then((res) => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].personType == "投标联系人") {
            this.tableData2.push(res[i]);
          } else {
            this.tableData3.push(res[i]);
          }
        }
      });
    },
    add() {
      this.test();
      if (this.x) {
        return;
      }
      this.$api.supIn.SubmitSupplierIn({ id: this.planId }).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
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
      this.$http.get("/LiandoSupplierIn/GetSupplierInMasterIndex1001", { params: { planId: this.planId } }).then((res) => {
        this.tabsList = res.data;
        this.activeName = this.tabsList.length > 0 ? this.tabsList[0].value : "";
        // this.activeName1 = this.tabsList.length > 0 ? this.tabsList[0].text : "";
        this.GetSupplierInList03();
      });
    },
    GetSupplierInList03() {
      this.$api.supIn.GetSupplierInList03({ planId: this.planId, submitIndex: this.activeName }).then((res) => {
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
      this.GetSupplierInList03();
    },
    delete1(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.supIn.DeleteSupplierIn03({ id: row.id }).then((res) => {
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
