<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <showplan-menu />
      </el-col>
    </el-row>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招标入围</el-breadcrumb-item>
          <el-breadcrumb-item
            >退还保证金审批<span style="color: red; margin-left: 10px" v-if="subbut1 && this.msg3 != null"
              >({{ this.msg3 }})</span
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
            <div>
              <el-button
                type="primary"
                size="small"
                @click="shenpirizhi()"
                v-if="showtable"
                :loading="loadfing"
                style="float: right; margin-bottom: 10px; margin-top: 10px; margin-left: 10px"
                >审批日志</el-button
              >
              <el-button
                type="primary"
                size="small"
                :loading="loadfing"
                @click="ReUploadDepositFile06"
                style="float: right; margin-bottom: 10px; margin-top: 10px"
                v-if="subbut"
                >提交审批</el-button
              >
            </div>
            <el-table
              empty-text="无符合条件的记录"
              stripe
              style="margin-top: 10px"
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData"
              v-loading="loadfing"
            >
              <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
              <el-table-column prop="comFullName" min-width="250" align="left" fixed label="供应商名称"> </el-table-column>
              <!-- <el-table-column prop="comMainName" min-width="250" align="left" fixed label="承接主体名称"> </el-table-column> -->
              <!--<el-table-column prop="filePath" label="是否缴纳" width="80" align="center">-->
              <!--<template slot-scope="scope">-->
              <!--<i v-if="scope.row.filePath">是</i>-->
              <!--<i v-if="!scope.row.filePath">否</i>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column prop="bankName" label="打款银行名称" width="150" align="center"> </el-table-column>
              <el-table-column label="银行账户" width="180" prop="bankAccount" align="center"></el-table-column>
              <el-table-column label="收取总额" width="100" prop="getAmount" align="center"></el-table-column>
              <el-table-column label="剩余未退" width="100" prop="leftAmount" align="center"></el-table-column>
              <el-table-column label="证明文件" width="80" prop="filePath" align="center">
                <template slot-scope="scope">
                  <i v-if="scope.row.filePath" class="el-icon-download ml-2" title="下载" @click="onDonwLoad2(scope.row.filePath)"></i>
                  <i v-if="!scope.row.filePath">未上传</i>
                </template>
              </el-table-column>
              <el-table-column label="退还金额" width="150" prop="backAmount" align="center" v-if="showSubmitButton">
                <template slot-scope="scope">
                  <span v-if="scope.row.canEdit">
                    <el-input-number
                      size="small"
                      :min="0"
                      v-if="scope.row.getAmount != '0' || scope.row.leftAmount != '0'"
                      v-model.number="scope.row.backAmount"
                    ></el-input-number>
                  </span>
                  <span v-if="!scope.row.canEdit">{{ scope.row.backAmount }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="退回金额" width="120" prop="backAmount" align="center" v-if="!showSubmitButton">
                <template slot-scope="scope">
                  <span>{{ scope.row.backAmount }}</span>
                </template>
              </el-table-column> -->
              <!--<el-table-column label="操作" width="60"  align="center">-->
              <!--<template slot-scope="scope">-->
              <!--<i class="el-icon-refresh" @click="ReUploadDepositFile06(scope.row)" type="primary"></i>-->
              <!--</template>-->
              <!--</el-table-column>-->
            </el-table>

            <!--<p style="color: red;margin-top: 10px;">如投标方上传的投标保证金证明文件有误，可在【操作】列开启重新上传</p>-->
          </el-row>
          <!-- </el-tab-pane>
          </el-tabs> -->
        </div>
        <!-- <div style="margin-top:20px" v-if="showtable">
          <el-row>
            <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tablerizhi">
              <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
              <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
              <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
              <el-table-column prop="creationTime" width="180" label="待办时间" align="center">
                <template slot-scope="scope"
                  ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
                >
              </el-table-column>
              <el-table-column prop="dealTime" width="180" label="处理时间" align="center">
                <template slot-scope="scope"
                  ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
                >
              </el-table-column>
              <el-table-column prop="status" width="80" label="结果" align="center"> </el-table-column>
              <el-table-column label="意见/备注" prop="comments" align="center"  show-overflow-tooltip> </el-table-column>
            </el-table>
          </el-row>
        </div> -->
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisiblerizhi" title="审批日志" width="60%">
      <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tablerizhi">
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="creationTime" label="时间" align="center">
          <template slot-scope="scope"
            ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
          >
        </el-table-column>
        <el-table-column label="状态" prop="auditStatus" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.auditStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="供应商信息" width="100" align="center">
          <template slot-scope="scope">
            <el-link type="primary" style="color: #409eff; text-decoration: none" @click="showsupplier(scope.row)">查看</el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <i class="el-icon-zoom-in" title="查看详情" @click="showdep(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisiblerizhixiang" title="审批日志" width="80%">
      <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tablerizhixiang">
        <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
        <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
        <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
        <el-table-column prop="creationTime" width="180" label="待办时间" align="center">
          <template slot-scope="scope"
            ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
          >
        </el-table-column>
        <el-table-column prop="dealTime" width="180" label="处理时间" align="center">
          <template slot-scope="scope"
            ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
          >
        </el-table-column>
        <el-table-column prop="status" width="80" label="结果" align="center"> </el-table-column>
        <el-table-column label="意见/备注" prop="comments" align="center" show-overflow-tooltip> </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisiblesupplier" title="供应商信息" width="80%">
      <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tablesupplier">
        <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
        <!-- <el-table-column prop="comMainName" label="承接主体" align="center"> </el-table-column> -->
        <el-table-column prop="comFullName" label="供应商名称" align="left"> </el-table-column>
      </el-table>
    </el-dialog>
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
import { parseTime } from "@/util";
import PlanMenu from "../components/PlanMenuDemoru.vue";
import SupplierList from "@/components/SupplierList";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step9",
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
      loadfing: false,
      dialogVisiblesupplier: false,
      tablesupplier: [],
      dialogVisiblerizhi: false,
      dialogVisiblerizhixiang: false,
      tablerizhixiang: [],
      uploadData: [],
      dialogVisible1: false,
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      tableData: [],
      tableData1: [],
      showSubmitButton: false,
      showSubmitButton1: false,
      loading: false,
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      showtable: false,
      rules: {},
      // planId: "",
      x: true,
      msg2: "",
      flag2: true,
      showButton: false,
      msg3: "",
      subbut: false,
      subbut1: false,
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
    //});
  },
  mounted() {
    this.GetLiandoSupplierDeposit06();
    this.CheckShowSubmitDepositBack1001();
    this.GetBidSupDepositBackMaster();
    // this.CheckCanBackDeposit41();
  },
  methods: {
    parseTime,
    onDonwLoad2(path) {
      window.open(process.env.VUE_APP_API_URL + path);
      //window.location.href = process.env.VUE_APP_API_URL + path;
    },

    shenpirizhi() {
      this.dialogVisiblerizhi = true;
      this.GetBidSupDepositBackMaster();
    },
    GetBidSupDepositBackMaster() {
      this.$http.get("/BidSupplierDeposit/GetBidSupDepositBackMaster", { params: { planId: this.planId } }).then((res) => {
        this.tablerizhi = res.data;
        // this.masterId = res.data.id;
        if (res.data.length > 0) {
          this.masterId = res.data[0].id;
          this.GetNewLogList_RefundMoney(this.masterId);
          this, GetBidSupDepositBack(this.masterId);
        }
        // this.masterId = res.data.map(v => v.id).join();
      });
    },
    GetBidSupDepositBack(masterId) {
      this.$http.get("/BidSupplierDeposit/GetBidSupDepositBack", { params: { masterId: masterId } }).then((res) => {
        this.tablesupplier = res.data;
      });
    },
    GetNewLogList_RefundMoney(masterId) {
      this.$http.get("/WorkFlowStart/GetNewLogList_RefundMoney", { params: { planId: this.planId, masterId: masterId } }).then((res) => {
        this.tablerizhixiang = res.data.logs;
        if (res.data.logs.length > 0) {
          this.showtable = true;
        } else {
          this.showtable = false;
        }
      });
    },
    showdep(row) {
      this.dialogVisiblerizhixiang = true;
      this.masterIds = row.id;
      this.GetNewLogList_RefundMoney(this.masterIds);
      // this.$http.get("/WorkFlowStart/GetNewLogList_RefundMoney", { params: { planId: this.planId, masterId: this.masterId } }).then(res => {
      //   this.tablerizhi = res.data.logs;
      //   if (res.data.logs.length > 0) {
      //     this.showtable = true;
      //   } else {
      //     this.showtable = false;
      //   }
      // });
    },
    showsupplier(row) {
      this.dialogVisiblesupplier = true;
      this.masterIds = row.id;
      this.GetBidSupDepositBack(this.masterIds);
    },
    CheckCanBackDeposit41() {
      this.$api.supIn.CheckCanBackDeposit41({ planId: this.planId }).then((res) => {
        this.msg2 = res.message;
        if (res.success) {
          this.showButton = true;
          this.flag2 = true;
        }
      });
    },
    CheckShowSubmitDepositBack1001() {
      this.$http.get("/BidCheckCenter/CheckShowSubmitDepositBack1001", { params: { planId: this.planId } }).then((res) => {
        if (res.data.success) {
          this.subbut = true;
          this.subbut1 = false;
        } else {
          this.subbut = false;
          this.subbut1 = true;
          this.msg3 = res.data.message;
        }
      });
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
        this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res1) => {
          // this.$http.get("/LianDHelper/GetCreateWorkflow11091", { params: { PlanId: this.planId } }).then(res1 => {
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
            this.loadfing = true;
            this.$api.supIn.SubmitSupplierDeposit02(a).then((res) => {
              if (res.success) {
                this.loadfing = false;
                this.$message.success(res.message);
                this.GetLiandoSupplierDeposit06();
                this.GetBidSupDepositBackMaster();
                // this.CheckCanBackDeposit41();
              } else {
                this.loadfing = false;
                this.$message.error(res.message);
              }
            });
          }
        });
      });
    },
    // ReUploadDepositFile061() {
    //   this.$confirm("提交后不能修改，确认要提交吗?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then(res1 => {
    //       // this.$http.get("/LianDHelper/GetCreateWorkflow11091", { params: { PlanId: this.planId } }).then(res1 => {
    //       if (res1.planId == "00000000-0000-0000-0000-000000000000") {
    //         this.$message.error("请先完善入围相关信息");
    //       } else {
    //         var a = {};
    //         a.planId = this.planId;
    //         var b = [];
    //         for (var i = 0; i < this.tableData1.length; i++) {
    //           var c = {};
    //           c.supplierId = this.tableData1[i].supplierId;
    //           c.getAmount = this.tableData1[i].getAmount;
    //           c.backAmount = this.tableData1[i].backAmount;
    //           c.desc = "";
    //           b.push(c);
    //         }
    //         a.supplierDepositList = b;
    //         this.$api.supIn.SubmitSupplierDeposit02_2(a).then(res => {
    //           if (res.success) {
    //             this.$message.success(res.message);
    //             this.GetLiandoSupplierDeposit061();
    //             // this.CheckCanBackDeposit41();
    //           } else {
    //             this.$message.error(res.message);
    //           }
    //         });
    //       }
    //     });
    //   });
    // },
    GetLiandoSupplierDeposit06() {
      this.$api.supIn.GetBidSupplierDeposit01({ planId: this.planId }).then((res) => {
        this.tableData = res.supplierDepositList;
        this.showSubmitButton = res.showSubmitButton;
      });
    },
    // GetLiandoSupplierDeposit061() {
    //   this.$api.supIn.GetBidSupplierDeposit01({ planId: this.planId, supplierInType: "补录入围" }).then(res => {
    //     this.tableData1 = res.supplierDepositList;
    //     this.showSubmitButton1 = res.showSubmitButton;
    //   });
    // },
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
