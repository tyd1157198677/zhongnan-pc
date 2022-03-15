<template>
  <el-main>
    <div class="userwidth" style="padding-bottom: 90px">
      <el-container>
        <!--左边分类-->
        <!-- <project-tree @itemClick="onChangeProject" @slideNave="slideNave" /> -->
        <el-card class="box-card" shadow="never" :body-style="{ padding: '15px 15px 0 15px' }">
          <el-form label-position="right" label-width="150px" :model="formSearch" size="small">
            <el-row :gutter="12">
              <el-col :span="3">
                <!-- <el-form-item label="项目或期区名称："> -->
                <el-input v-model="formSearch.depName" placeholder="所属组织" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="招标计划名称："> -->
                <el-input v-model="formSearch.planName" placeholder="招标计划名称" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="招标方式："> -->
                <el-select v-model="formSearch.purchaseType" placeholder="招标方式" @change="selectChange">
                  <el-option v-for="item in purchaseTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="招标专业名称："> -->
                <el-input v-model="formSearch.bidCateName" placeholder="招标专业名称" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <!-- <el-col :span="3"> -->
              <!-- <el-select v-model="formSearch.depName" placeholder="需求部门" @change="selectChange"> -->
              <!-- <el-option label="需求部门" value=""> </el-option> -->
              <!-- <el-option v-for="item in depNames" :key="item.value" :label="item.text" :value="item.value"> </el-option> -->
              <!-- </el-select> -->
              <!-- </el-col> -->
              <el-col :span="3">
                <!-- <el-form-item label="选择权限："> -->
                <el-select v-model="formSearch.myAuth" placeholder="选择权限" @change="selectChange">
                  <el-option label="选择权限" value=""></el-option>
                  <el-option label="我经办的" value="true"></el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="6">
                <div class="text-left">
                  <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
                  <el-button type="primary" size="small" @click="onAddBidPlan" v-if="isShowFaQibtn">新增</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>

          <div class="mt-2">
            <el-table
              v-loading="loading"
              min-height="570"
              key="s1"
              empty-text="无符合条件的记录"
              element-loading-text="请稍候,数据正在加载中..."
              :row-class-name="status_change"
              :data="tableData"
            >
              <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
              <el-table-column label="所属组织" min-width="250px" fixed>
                <template slot-scope="scope">
                  <span>{{ scope.row.depName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="planName" label="招标计划名称" min-width="250" show-overflow-tooltip fixed>
                <template slot-scope="scope">
                  <el-link type="primary" style="color: #409eff; text-decoration: none" @click="onAddBidPlan1(scope.row)">{{
                    scope.row.planName
                  }}</el-link>
                </template>
              </el-table-column>
              <el-table-column label="招标方式" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.purchaseType }}</span>
                </template>
              </el-table-column>
              <el-table-column label="招标专业" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.bidCateName }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="需求部门" width="120" align="center"> -->
              <!-- <template slot-scope="scope"> -->
              <!-- <span>{{ scope.row.depName }}</span> -->
              <!-- </template> -->
              <!-- </el-table-column> -->
              <el-table-column label="计划定标日期" width="150" align="center">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.bidEndDate, "yyyy-MM-dd") }}</span>
                </template>
              </el-table-column>
              <el-table-column label="招标经办人" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.bidUserName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="审批状态" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.submitStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="100" fixed="right">
                <template slot-scope="scope">
                  <div>
                    <i v-if="scope.row.showDeleteBtn" title="删除" class="el-icon-delete" @click="del(scope.row.id)"></i>
                    <i title="编辑" style="margin: 0 10px" v-if="scope.row.showEditBtn" class="el-icon-edit" @click="edit(scope.row)"></i>
                    <!-- <i title="发起" v-if="scope.row.submitStatus == '已提交'" class="el-icon-position" @click="faqi(scope.row.id)"></i> -->
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageAChange" />
          </div>
        </el-card>
        <el-dialog width="60%" title="选择经办人员" :visible.sync="dialogVisiblename">
          <div class="zuzhi">请从组织架构中选择人员</div>
        </el-dialog>
      </el-container>
    </div>
  </el-main>
</template>
<script>
import ProjectTree from "./components/ProjectTree";
import bus from "@/util/bus";
import categoryTree from "./components/CategoryTree";
import dayjs from "dayjs";
import { parseTime } from "@/util";
export default {
  components: {
    ProjectTree,
    categoryTree,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      categoryVisible: false,
      loading: false,
      purchaseTypes: [],
      depNames: [],
      bidLevels: [],
      dropDownGroup: {},
      isShowFaQibtn: false,
      dialogVisiblename: false,
      addPlanLoading: false,
      detailVisible: false,
      dialogVisible: false,
      activeName: "1",
      supplierSignUpList: [],
      formSearch: {
        myAuth: "",
        ProjectId: "",
        projectName: "",
        planName: "",
        monthSpan: "",
        purchaseType: "",
        depName: "",
        bidCateName: "",
        bidCateId: "",
        bidLevel: "",
      },
      showtitle: "",
      tableData: [],
      plans: [],
      // currTab: "未处理",
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      userGuid: "",
    };
  },
  created() {
    // this.$emit("header", false);
    // this.$emit("footer", false);
    this.userName = localStorage.getItem("userName");
    this.userGuid = localStorage.getItem("userGuid");
    this.userGuid = this.userGuid.toUpperCase();
    this.$http.post("/RoleMenu/GetUserRoleButtonList", ["BIDREQUIRE001"], {}).then((res) => {
      this.codeList = res.data;
      this.isShowFaQibtn = res.data.length > 0 ? true : false;
    });
    bus.$emit("showNav");
  },
  mounted() {
    this.GetPlanEditDropDowns();
  },
  methods: {
    parseTime,
    renderheader(h, { column, $index }) {
      return h("span", {}, [h("span", {}, column.label.split("#")[0]), h("br"), h("span", {}, column.label.split("#")[1])]);
    },
    timeFormatSeconds(time) {
      var d = time ? new Date(time) : new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      // var hours = d.getHours();
      // var min = d.getMinutes();
      // var seconds = d.getSeconds();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      // if (hours < 0) hours = "0" + hours;
      // if (min < 10) min = "0" + min;
      // if (seconds < 10) seconds = "0" + seconds;

      return year + "-" + month + "-" + day;
    },
    onAdd() {
      this.type = 1;
      this.$refs.choseUser.openfnc();
    },
    newAdd() {
      this.tableData.push({});
    },
    GetPlanEditDropDowns() {
      this.$http.get("/PurchasePlan/GetPlanEditDropDowns").then((res) => {
        this.bidLevels = res.data.bidLevel;
        this.formSearch.bidLevel = res.data.length > 0 ? res.data[0].value : "";
        this.purchaseTypes = res.data.purchaseType;
        this.formSearch.purchaseType = res.data.length > 0 ? res.data[0].value : "";
        this.depNames = res.data.depName;
        this.formSearch.depName = res.data.length > 0 ? res.data[0].value : "";
        this.GetPlanRequireList();
      });
    },
    GetPlanEditDropDowns1() {
      this.$http.get("/PurchasePlan/GetPlanEditDropDowns").then((res) => {
        this.bidLevels = res.data.bidLevel;
        this.formSearch.bidLevel = res.data.length > 0 ? res.data[0].value : "";
        this.purchaseTypes = res.data.purchaseType;
        this.formSearch.purchaseType = res.data.length > 0 ? res.data[0].value : "";
        this.depNames = res.data.depName;
        this.formSearch.depName = res.data.length > 0 ? res.data[0].value : "";
      });
    },

    onAddBidPlan1(row) {
      this.$router.push({
        path: `/bid/bidrequireshowdet?id=` + row.id,
      });
    },
    GetPlanRequireList() {
      let obj = {
        MyAuth: this.formSearch.myAuth,
        BidCateName: this.formSearch.bidCateName,
        DepName: this.formSearch.depName,
        PurchaseType: this.formSearch.purchaseType,
        ProjectName: this.formSearch.projectName,
        PlanName: this.formSearch.planName,
        // RequireDoStatus: this.currTab,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
      };
      this.loading = true;
      this.$http.get("/PurchasePlan/GetPurchasePlanList", { params: obj }).then((res) => {
        if (res.data.success) {
          this.loading = false;
          res.data.result.items.forEach((item) => {
            item.confirmDate = !item.confirmDate ? "" : this.timeFormatSeconds(item.confirmDate);
            // item.bidEndDate = this.timeFormatSeconds(item.bidEndDate);
          });
          this.tableData = res.data.result.items;
          // this.showColor = res.data.result.items.showColor;
          this.page.total = res.data.result.totalCount;
        }
      });
    },
    status_change({ row }) {
      if (row.showColor) {
        return "table-info-row";
      }
      return "";
    },
    selectChange() {
      this.page.index = 1;
      this.GetPlanRequireList();
    },
    pageAChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.GetPlanRequireList();
    },
    onSubmit() {
      this.page.index = 1;
      this.GetPlanRequireList();
    },
    // 测导航显示隐藏
    slideNave() {
      let that = this;
      that.open = !that.open;
      if (!that.open) {
        that.sysTreeCateTypeW = "25px";
      } else {
        that.sysTreeCateTypeW = "300px";
      }
    },

    // onChangeProject(project) {
    //   this.formSearch.ProjectId = project.id;
    //   this.formSearch.projectName = project.projectShortName;
    //   this.GetPlanRequireList();
    // },

    handleTabClick() {
      this.formSearch.projectName = "";
      this.formSearch.planName = "";
      this.page.index = 1;
      this.page.size = 10;
      this.GetPlanRequireList();
    },
    /**
     * 编辑计划
     */
    edit(row) {
      this.showtitle = "编辑招标需求";
      this.dialogVisible = true;
      this.GetPlanEditDropDowns1();
      this.$router.push({
        path: "/bid/bidPlanAdd",
        query: {
          id: row.id,
        },
      });
    },
    faqi(id) {
      this.$confirm("您确认要发起吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = { id };
        this.$http.post("/PurchasePlan/StartProcess", obj).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.$router.push({ path: "/bid/bidProcessDemo" });
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    /**
     * 删除计划
     */
    del(id) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = { id };
        this.$http.post("/PurchasePlan/DeletePurchasePlan", obj).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetPlanRequireList();
          } else {
            // this.$msg.warning(res.data.message);
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },

    /**
     * 添加或修改招标计划
     */
    onAddBidPlan() {
      // this.xuQiuForm.planName = "";
      // this.xuQiuForm.projectName = "";
      // this.xuQiuForm.bidCateName = "";
      // this.xuQiuForm.depName = "";
      // this.xuQiuForm.bidLevel = "";
      // this.xuQiuForm.purchaseType = "";
      // this.xuQiuForm.id = "";
      // this.xuQiuForm.projectId = "";
      // this.xuQiuForm.planMoney = "";
      // this.xuQiuForm.jzSquire = "";
      // this.xuQiuForm.requireDesc = "";
      // this.xuQiuForm.bidEndDate = "";
      // this.xuQiuForm.bidCateId = "";
      // this.showtitle = "新增招标需求";
      // this.dialogVisible = true;
      // this.xuQiuForm.bidUserName = this.userName;
      // this.xuQiuForm.bidUserGuid = this.userGuid;
      // this.GetPlanEditDropDowns();

      this.$router.push({
        path: "/bid/bidPlanAdd",
      });
    },
    saveto() {
      this.$confirm("您确认要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$refs.xuQiu.validate((valid) => {
          if (valid) {
            this.xuQiuForm.isSubmit = true;
            this.$http.post("/PurchasePlan/SavePurchasePlan", this.xuQiuForm).then((res) => {
              if (res.data.success) {
                this.$msg.success(res.data.message);
                this.GetPlanRequireList();
                this.dialogVisible = false;
              } else {
                // this.$msg.warning(res.data.message);
                this.$confirm(res.data.message, "提示", {
                  confirmButtonText: "确定",
                  type: "warning",
                });
              }
            });
          } else {
            this.$msg.warning("请填写完必填项!");
          }
        });
      });

      //   this.$router.push({
      //     path: "/bid/bidMode6/EditStep1",
      //   });
    },
  },
};
</script>

<style scoped>
.el-select {
  width: 100%;
}
/* ::v-deep .el-select,
::v-deep .el-input {
  width: 100%;
} */

.dropdown-menu {
  width: 6rem;
  min-width: 3rem !important;
}
.zuzhi {
  text-align: center;
  padding: 30px 0 50px;
  font-size: 18px;
  color: #21468c;
}

.dropdown-item {
  padding: 0.25rem 1rem !important;
}
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
/* ::v-deep .el-input__inner {
  height: 30px;
} */
::v-deep .el-input__icon {
  line-height: 32px;
}
/* ::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  z-index: 1;
} */
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
::v-deep .el-form-item__label {
  margin-bottom: -4px;
}
</style>
<style>
.el-table .table-info-row {
  background-color: #ffffcc;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
