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
          <el-breadcrumb-item>招采计划</el-breadcrumb-item>
          <el-breadcrumb-item v-if="showmessage"
            >基本信息<span style="color: red">({{ message }})</span></el-breadcrumb-item
          >
          <el-breadcrumb-item v-else>基本信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-alert :title="msg" type="warning" v-if="!isCanEdit" :closable="false"> </el-alert> -->
        <div>
          <!-- <div> -->
          <peo-user style="width: 100%" />
          <!-- <div style="margin-top:10px;">
            <el-form :rules="rules" ref="base" :model="base" label-width="130px">
              <el-card>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="招标计划名称：" prop="planName">
                      <el-input style="width:300px" v-if="showsubmit" v-model="base.planName" placeholder="请输入招标计划名称"></el-input>
                      <el-input style="width:300px" v-else v-model="base.planName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="招标计划编号：" prop="planCode">
                      <el-input style="width:300px" v-if="showsubmit" v-model="base.planCode" placeholder="请输入招标计划编号"></el-input>
                      <el-input style="width:300px" v-else v-model="base.planCode" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="招标专业：" prop="bidCateName">
                      <el-input
                        style="width:300px"
                        v-if="showsubmit"
                        v-model="base.bidCateName"
                        placeholder="请选择招标专业"
                        @focus="categoryVisible = true"
                      ></el-input>
                      <el-input style="width:300px" v-else v-model="base.bidCateName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="招标方式：" prop="purchaseType">
                      <el-select v-model="base.purchaseType" size="small" v-if="showsubmit" style="width:300px">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="item in purchaseTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                      </el-select>
                      <el-select v-model="base.purchaseType" disabled size="small" v-else style="width:300px">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="item in purchaseTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22" style="margin-top:20px">
                    <el-form-item label="说明：">
                      <el-input
                        v-model="base.desc"
                        v-if="showsubmit"
                        type="textarea"
                        placeholder="请输入说明"
                        style="width:100%"
                      ></el-input>
                      <el-input v-model="base.desc" v-else type="textarea" disabled placeholder="请输入说明" style="width:100%"></el-input>
                    </el-form-item>
                  </el-col> </el-row
              ></el-card>
              <div style="float:left">
                <el-button type="primary" v-loading="subloading" class="buttoncss" v-if="showsubmit" size="small" @click="onSubmit('base')"
                  >保存信息</el-button
                >
                <el-button type="primary" v-loading="subloading" class="buttoncss" v-if="showguanlian" size="small" @click="guanlian"
                  >关联计划系统</el-button
                > -->
          <!-- <el-button type="primary" v-loading="subloading" class="buttoncss" size="small" @click="guanlian">关联计划系统</el-button> -->
          <!-- </div>
            </el-form> -->
          <!-- </div> -->
        </div></el-col
      >
      <!-- </el-col> -->
    </el-row>
    <!-- <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
    </el-row> -->
    <el-dialog :visible.sync="flag1" title="选择考察分类" width="35%" height="400px;">
      <project-tree @itemClick="onChangeKind" />
    </el-dialog>
    <el-dialog :visible.sync="categoryVisible" title="选择招标专业">
      <categoryTree @itemClick="onChangeCategory" />
    </el-dialog>
    <el-dialog title="关联计划系统" :visible.sync="dialogFormVisible" width="80%">
      <div>
        <el-button type="primary" style="float: right; margin-left: 10px; margin-bottom: 10px" size="small" @click="sousuo">搜索</el-button>
        <el-input
          v-model="PlanName"
          style="width: 200px; float: right; margin-left: 10px; margin-bottom: 10px"
          placeholder="请输入招标计划名称"
          clearable
        ></el-input>
        <el-input
          v-model="ProjectName"
          style="width: 200px; float: right; margin-left: 10px; margin-bottom: 10px"
          placeholder="请输入项目或期区名称"
          clearable
        ></el-input>
      </div>
      <el-table height="370" empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData1">
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="projectName" min-width="150" label="项目或期区名称" show-overflow-tooltip>
          <template slot-scope="scope"
            ><span> {{ scope.row.projectName }}{{ scope.row.subProjectName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planName" label="招标计划名称(计划系统)" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.planName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bidEndDate" label="计划完成日期#(计划系统)" :render-header="renderheader" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.bidEndDate, "yyyy-MM-dd") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="选择" align="center" width="80">
          <template slot-scope="scope">
            <i class="el-icon-circle-check" title="选择" @click="selectSup(scope.row.id)"></i>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
    </el-dialog>
  </el-main>
</template>

<script>
/**
 * 招标采购-基本信息
 */
import { parseTime } from "@/util";
import showplanMenu from "../components/showplanMenu.vue";
import PlanMenu from "../components/PlanMenuDemo.vue";
import ProjectTree from "../../invest/components/ProjectTree";
import categoryTree from "../components/CategoryTree";
export default {
  name: "Step1",
  components: {
    PlanMenu,
    showplanMenu,
    ProjectTree,
    categoryTree,
    Pagination: () => import("@/components/Pagination.vue"),
    peoUser: () => import("@/components/peoUser.vue"),
  },
  inject: ["reload"],
  data() {
    return {
      purchaseTypes: [],
      PlanName: "",
      ProjectName: "",
      dialogFormVisible: false,
      purchaseType: "",
      showmessage: false,
      showguanlian: false,
      tableData1: [],
      base: {
        purchaseType: null,
        planCode: "",
        bidCateName: "",
        desc: "",
        planName: "",
        id: "",
      },
      form: {},
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      message: "",
      subloading: false,
      showsubmit: false,
      bases: {},
      tabsList: [],
      msg: "",
      isCanEdit: false,
      flag1: false,
      categoryVisible: false,
      dropDownGroup: [],
      rules: {
        planCode: [{ required: true, message: "请输入招标计划编号", trigger: "blur" }],
        bidCateName: [{ required: true, message: "请选择招标专业", trigger: "change" }],
        purchaseType: [{ required: true, message: "请选择招标方式", trigger: "blur" }],
        planName: [{ required: true, message: "请输入招标计划名称", trigger: "blur" }],
      },
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  created() {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.GetOnePlanById();
    // this.getBaseInfo();
  },
  mounted() {
    // this.GetLiandoPlanAllDropDown();
    // this.getBaseInfo();
    // this.CheckShowJoinPlan();
  },
  methods: {
    // GetPurchaseType(){
    //   this.$http.get("/BidMaster/GetPurchaseType").then(res => {
    //   this.tabsList = res.data;
    //   this.base.purchaseType = res.data.length > 0 ? res.data[0].value : "";
    //   this.CheckCanEditPlan01();
    // });
    // },
    // GetLiandoPlanAllDropDown(){
    //   this.$http.get("/LiandoPlan/GetLiandoPlanAllDropDown").then(res => {
    //   this.purchaseTypes = res.data.purchaseType;
    //   this.base.purchaseType = res.data.length > 0 ? res.data[0].value : "";
    //   this.getBaseInfo();
    // });
    // },
    parseTime,
    renderheader(h, { column, $index }) {
      return h("span", {}, [h("span", {}, column.label.split("#")[0]), h("br"), h("span", {}, column.label.split("#")[1])]);
    },
    GetOnePlanById() {
      console.log(this.baseId);
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.baseId } }).then((res) => {
        this.form = res.data;
      });
    },
    CheckCanEditPlan01() {
      this.$http.get("/LiandoPlan/CheckCanEditPlan01?planId=" + this.baseId).then((res) => {
        this.isCanEdit = res.data.success;
        this.msg = res.data.message;
        if (res.data.success) {
          this.showsubmit = true;
          this.showmessage = false;
        } else {
          this.showsubmit = false;
          if (res.data.message != "" || res.data.message != null) {
            this.showmessage = true;
            this.message = res.data.message;
          } else {
            this.showmessage = false;
          }
        }
      });
    },
    CheckShowJoinPlan() {
      this.$http.get("/BidCheckCenter/CheckShowJoinPlan?planId=" + this.baseId).then((res) => {
        if (res.data.success) {
          this.showguanlian = true;
        } else {
          this.showguanlian = false;
        }
      });
    },
    onChangeCategory(category) {
      this.base.bidCateId = category.id;
      this.base.bidCateName = category.cateName;
      this.categoryVisible = false;
    },
    guanlian() {
      this.dialogFormVisible = true;
      this.GetJoinPlanList();
    },
    GetJoinPlanList() {
      let obj = {
        PlanName: this.PlanName,
        ProjectName: this.ProjectName,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
      };
      this.$http.get("/LiandoPlan/GetJoinPlanList", { params: obj }).then((res) => {
        this.tableData1 = res.data.result.items;
        this.page.total = res.data.result.totalCount;
      });
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.GetJoinPlanList();
    },
    //选择计划
    selectSup(id) {
      this.$confirm("关联后将不能修改，确定要执行关联操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          thisPlanId: this.baseId,
          selectedPlanId: id,
        };
        this.$http.post("/LiandoPlan/SaveJoinPlan", obj).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.CheckShowJoinPlan();
            this.dialogFormVisible = false;
            this.getBaseInfo();
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    sousuo() {
      this.page.index = 1;
      this.GetJoinPlanList();
    },
    /**
     * 查询当前方案基本信息
     */
    getBaseInfo() {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.baseId } }).then((res) => {
        this.bases = res.data;
        this.base.planName = res.data.planName;
        if (res.data.purchaseType != "" || res.data.purchaseType != null) {
          this.base.bidCateId = res.data.bidCateId;
          this.base.purchaseType = res.data.purchaseType;
          this.base.planCode = res.data.planCode;
          this.base.bidCateName = res.data.bidCateName;
          this.base.desc = res.data.desc;
        }
      });
      this.$api.BidModeMaster.GetBidModeSearchDropDown().then((res) => {
        this.dropDownGroup = res.bidInviteType;
      });
      this.$http.get("/LiandoPlan/GetLiandoPlanAllDropDown").then((res) => {
        this.purchaseTypes = res.data.purchaseType;
        // this.base.purchaseType = res.data.length > 0 ? res.data[0].value : "";
        this.purchaseType = res.data.length > 0 ? res.data[0].value : null;
      });
    },
    //弹框选择招标计划
    // GetSelectPlanList02() {
    //   this.$http.get("/LiandoPlan/GetSelectPlanList02", { params: { id: this.baseId } }).then(res => {
    //     this.base = res.data;
    //   });
    //   this.$api.BidModeMaster.GetBidModeSearchDropDown().then(res => {
    //     this.dropDownGroup = res.bidInviteType;
    //   });
    // },
    onChangeKind(kind) {
      this.form.supCate = kind.id;
      this.form.supCateName = kind.cateName;
      this.form2.supCate = kind.id;
      this.flag1 = false;
    },
    /**
     * 保存信息
     */
    onSubmit() {
      this.$refs.base.validate((valid) => {
        if (valid) {
          this.base.id = this.bases.id;
          this.subloading = true;
          this.$http.post("/LiandoPlan/SavePlanBaseInfo01", this.base).then((res) => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.getBaseInfo();
              this.subloading = false;
            } else {
              this.subloading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
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
.zuzhi {
  text-align: center;
  padding: 30px 0 50px;
  font-size: 18px;
  color: #21468c;
}
.buttoncss {
  float: left;
  margin-top: 15px;
  margin-right: 10px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}

/* ::v-deep .el-input {
  width: 300px;
} */
::v-deep .el-textarea {
  width: 760px;
}

::v-deep .el-form-item {
  margin-bottom: 10px;
}
</style>
