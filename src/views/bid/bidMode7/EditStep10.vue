<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="24">
        <div style="width: 100%">
          <div style="width: 16.6667%; float: left">
            <showplan-menu />
          </div>
          <div style="width: 83.3333%; float: right; margin-top: 55px">
            <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>招标入围</el-breadcrumb-item>
              <el-breadcrumb-item
                >退还保证金确认<span style="color: red; margin-left: 10px" v-if="tableData.pageMessage"
                  >({{ tableData.pageMessage }})</span
                ></el-breadcrumb-item
              >
            </el-breadcrumb>
            <statusList></statusList>
            <div>
              <!-- <el-tabs v-model="activeName" type="card" style="margin-top: 10px;">
            <el-tab-pane label="首次入围" name="首次入围"> -->
              <el-row>
                <!--<div class="float-right mb-2" style="margin-top:10px">-->
                <!--<el-button type="primary" size="small" @click="add">新增</el-button>-->
                <!--<el-button type="primary" size="small" @click="add1">催办</el-button>-->
                <!--</div>-->
                <el-table
                  empty-text="无符合条件的记录"
                  stripe
                  style="margin-top: 10px"
                  border
                  element-loading-text="请稍候,数据正在加载中..."
                  :data="tableData.supplierDepositList"
                  v-loading="loading"
                >
                  <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
                  <el-table-column prop="comFullName" min-width="250" align="left" fixed label="供应商名称"> </el-table-column>
                  <!-- <el-table-column prop="comMainName" min-width="250" align="left" fixed label="承接主体名称"> </el-table-column> -->
                  <el-table-column prop="getAmount" label="收取金额" width="110" align="center"> </el-table-column>
                  <el-table-column prop="backAmount" label="退还金额" width="110" align="center"> </el-table-column>
                  <el-table-column prop="confirmStatus" label="退还确认" width="200" align="center" v-if="tableData.canChangeStatus">
                    <template slot-scope="scope">
                      <el-radio-group v-model="scope.row.confirmStatus" @change="change2($event, scope.row)">
                        <el-radio label="未确认">未确认</el-radio>
                        <el-radio label="已确认">已确认</el-radio>
                      </el-radio-group>
                    </template>
                  </el-table-column>
                </el-table>
                <!--<p style="color: red;margin-top: 10px;">如投标方上传的投标保证金证明文件有误，可在【操作】列开启重新上传</p>-->
              </el-row>
              <!-- </el-tab-pane>
          </el-tabs> -->
            </div>
          </div>
        </div></el-col
      >
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="新增" width="35%">
      <el-form :model="form" :rules="rules" ref="form" size="small" class="mt-2" label-width="120px">
        <div>
          <el-form-item label="公司名称" prop="projectName">
            <el-input v-model="form.projectName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="开户行信息" prop="planName">
            <el-input v-model="form.planName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="sectionName">
            <el-input v-model="form.sectionName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="投标保证金" prop="sectionType">
            <el-input v-model="form.sectionType" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="证明文件" prop="yushen">
            <el-button>上传</el-button>
          </el-form-item>
          <el-form-item label="来源及考察意见" prop="kaocha">
            <el-input v-model="form.sectionType1" style="width: 200px"></el-input>
          </el-form-item>
          <div slot="footer" style="float: right; margin-top: -20px">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="onSubmit" size="small">确 定</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <!-- <el-dialog width="40%" title="上传附件【承诺函模板、清单模板等】"  :visible.sync="dialogVisible1">
                  <el-form class="mt-0" size="small" label-width="120px">
                    <el-form-item label="文件名称">
                      <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
                    </el-form-item>
                    <el-form-item label="选择文件">
                      <el-upload
                        class="upload-demo"
                        ref="upload"
                        accept=".doc,.docx,.xls,.xlsx"
                        :multiple="false"
                        :data="uploadData"
                        :action="getUploadUrl()"
                        :on-change="beforeUpload"
                        :on-success="onUploadSuccess"
                        :auto-upload="false"
                      >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
                        <div slot="tip" class="el-upload__tip">文件格式：.doc|.docx|.xls|.xlsx| 最大：50 兆</div>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                </el-dialog> -->
    <!-- <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="95%"> -->
    <!-- <supplier-list @itemClick="onSelectSups" />
   </el-dialog> -->
  </el-main>
</template>

<script>
/**
 * 招标采购-邀请供方
 */
import PlanMenu from "../components/PlanMenuDemoru.vue";
import SupplierList from "@/components/SupplierList";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step10",
  components: {
    PlanMenu,
    SupplierList,
    showplanMenu,
    Pagination: () => import("@/components/Pagination.vue"),
    statusList: () => import("@/components/statusList.vue"),
  },
  inject: ["reload"],
  data() {
    return {
      tablerizhi: [],
      files: "",
      activeName: "首次入围",
      form: [],
      uploadData: [],
      dialogVisible1: false,
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      tableData: [],
      tableData1: [],
      loading: false,
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rules: {},
      // planId: "",
      x: true,
      msg2: "",
      flag2: true,
      showButton: true,
    };
  },
  computed: {
    planId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else if (this.$route.params.id) {
        return this.$route.params.id;
      } else if (this.$route.params.baseId) {
        return this.$route.params.baseId;
      } else {
        return this.$route.query.baseId;
      }
    },
  },
  created: function () {
    // this.planId = this.$route.query.id;
    // this.$api.supIn.CheckCanEdit({ planId: this.planId }).then(res => {
    //   if (!res.success) {
    //     //this.showButton = false;
    //     this.openM(res.message);
    //   }
    // this.$api.supIn.CheckCanBackDeposit41({ planId: this.planId }).then(res => {
    //   if (!res.success) {
    //     this.showButton = false;
    //     this.flag2 = false;
    //   }
    //   this.msg2 = res.message;
    // });
    //});
  },
  mounted() {
    this.GetLiandoSupplierDeposit06();
    // this.GetLiandoSupplierDeposit061();
  },
  methods: {
    change2(val, row) {
      this.$api.supIn.SaveConfirmDeposit04({ id: row.id, planId: this.planId, confirmStatus: val }).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
          this.GetLiandoSupplierDeposit06();
        } else {
          this.$message.error(res.message);
          this.GetLiandoSupplierDeposit06();
        }
      });
    },
    onDonwLoad2(path) {
      window.open(process.env.VUE_APP_API_URL + path);
      //window.location.href = process.env.VUE_APP_API_URL + path;
    },
    openM(msg) {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [h("span", null, msg), h("i", { style: "color: teal" }, "")]),
      }).then((action) => {});
    },
    ReUploadDepositFile06() {
      this.$confirm("提交后不能修改，确认要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.SaveConfirmDeposit04({ planId: this.planId, confirmStatus: "" }).then((res1) => {
          if (res1.planId == "00000000-0000-0000-0000-000000000000") {
            this.$message.error("请先完善入围相关信息");
          } else {
            var a = {};
            a.planId = this.planId;
            var b = [];
            for (var i = 0; i < this.tableData.length; i++) {
              var c = {};
              c.supplierId = this.tableData[i].supplierId;
              c.getAmount = this.tableData[i].getAmount;
              c.backAmount = this.tableData[i].backAmount;
              c.desc = "";
              b.push(c);
            }
            a.supplierDepositList = b;
            this.$api.supIn.SubmitSupplierDeposit02(a).then((res) => {
              if (res.success) {
                this.$message.success(res.message);
                this.GetLiandoSupplierDeposit06();
              } else {
                this.$message.error(res.message);
              }
            });
          }
        });
      });
    },
    GetLiandoSupplierDeposit06() {
      this.$api.supIn.GetBidDepositConfirmList03({ planId: this.planId }).then((res) => {
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
          this.$message.success(res.message);
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
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
</style>
