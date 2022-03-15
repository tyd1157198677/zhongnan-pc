<template>
  <el-main>
    <div class="userwidth">
      <el-container>
        <!--左边分类-->
        <!-- <project-tree @itemClick="onChangeProject" @slideNave="slideNave" /> -->
        <el-card class="box-card" shadow="never" :body-style="{ padding: '15px 15px 0 15px' }">
          <el-form label-position="right" label-width="150px" :model="formSearch" size="small">
            <el-row :gutter="12">
              <el-col :span="3">
                <!-- <el-form-item label="项目或期区名称："> -->
                <el-input v-model="formSearch.projectName" placeholder="所属组织" clearable></el-input>
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
                  <el-option label="招标方式" value=""> </el-option>
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
                </div>
              </el-col>
            </el-row>
          </el-form>

          <div class="mt-2">
            <el-table
              v-loading="loading"
              key="s1"
              min-height="570"
              empty-text="无符合条件的记录"
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData"
            >
              <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
              <el-table-column label="所属组织" min-width="250px" fixed>
                <template slot-scope="scope">
                  <span>{{ scope.row.projectName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="planName" label="招标计划名称" min-width="250" show-overflow-tooltip fixed>
                <template slot-scope="scope">
                  <!--  v-if="scope.row.isEditUser" -->
                  <el-link
                    type="primary"
                    style="color: #409eff; text-decoration: none"
                    @click="edit(scope.row.id, scope.row.bidModeId, scope.row.purchaseType)"
                    >{{ scope.row.planName }}</el-link
                  >
                  <!-- <el-link
                    v-else
                    type="primary"
                    style="color: #409eff; text-decoration: none"
                    @click="onAddBidPlan(scope.row.id, scope.row.bidModeId, scope.row.purchaseType)"
                    >{{ scope.row.planName }}</el-link
                  > -->
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
              <!-- <el-table-column label="审批状态" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.auditStatus }}</span>
                </template>
              </el-table-column> -->
            </el-table>
            <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageAChange" />
          </div>
        </el-card>
        <!-- <el-dialog :visible.sync="detailVisible" width="98%">
          <bidPlanForm ref="detail" @onCancle="onCancle" @onSubmit="onEditSave" />
        </el-dialog> -->
        <el-dialog width="60%" title="选择经办人员" :visible.sync="dialogVisiblename">
          <div class="zuzhi">请从组织架构中选择人员</div>
        </el-dialog>
      </el-container>
    </div>
  </el-main>
</template>
<script>
import ProjectTree from "./components/ProjectTree";
// import bidPlanForm from "./bidPlanForm";
import { groupBy } from "@/util";
import bus from "@/util/bus";
import { parseTime } from "@/util";
export default {
  components: {
    ProjectTree,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      depNames: [],
      purchaseTypes: [],
      bidLevels: [],
      planStatus: "",
      planStatuss: [],
      dropDownGroup: {},
      dialogVisiblename: false,
      loading: false,
      pageSize: 15,
      addPlanLoading: false,
      detailVisible: false,
      activeName: "1",
      bidLevels: [],
      formSearch: {
        myAuth: "",
        ProjectId: "",
        projectName: "",
        planName: "",
        monthSpan: "",
        purchaseType: "",
        depName: "",
        bidCateName: "",
        bidLevel: "",
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      tableData: [],
      plans: [],
      currTab: "a",
      userGuid: "",
    };
  },
  created() {
    // this.$emit("header", false);
    // this.$emit("footer", false);/api/services/app/LiandoPlan/GetPlanList
    this.userGuid = sessionStorage.getItem("userGuid");
    // this.userGuid = this.userGuid.toUpperCase();
    bus.$emit("showNav");
    // this.loadQueryForm();
    // this.GetPlanList();
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
    GetPlanEditDropDowns() {
      this.$http.get("/PurchasePlan/GetPlanEditDropDowns").then((res) => {
        this.bidLevels = res.data.bidLevel;
        this.formSearch.bidLevel = res.data.length > 0 ? res.data[0].value : "";
        this.purchaseTypes = res.data.purchaseType;
        this.formSearch.purchaseType = res.data.length > 0 ? res.data[0].value : "";
        this.depNames = res.data.depName;
        this.formSearch.depName = res.data.length > 0 ? res.data[0].value : "";
        this.GetPlanList();
      });
    },
    GetPlanList() {
      let obj = {
        MyAuth: this.formSearch.myAuth,
        BidCateName: this.formSearch.bidCateName,
        DepName: this.formSearch.depName,
        PurchaseType: this.formSearch.purchaseType,
        ProjectName: this.formSearch.projectName,
        PlanName: this.formSearch.planName,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
      };
      this.loading = true;
      this.$http.get("/ModeMasterAppServices/GetModeMasterList", { params: obj }).then((res) => {
        if (res.data.items) {
          res.data.items.forEach((item) => {
            item.confirmDate = this.timeFormatSeconds(item.confirmDate);
          });
        }
        this.loading = false;
        this.tableData = res.data.items;
        this.page.total = res.data.totalCount;
        console.log(res);
      });
    },
    selectChange() {
      this.page.index = 1;
      this.GetPlanList();
    },
    showSignUpListname() {
      this.dialogVisiblename = true;
    },
    getBidNoticeSignUpList(baseId) {
      this.$api.BidNotice.GetBidNoticeSignUpList(baseId).then((res) => {
        this.siginUpList = res;
        if (this.siginUpList && this.siginUpList.length > 0) {
          this.activeName = this.siginUpList[0].sectionId;
        }
      });
    },
    // pageAChange(page) {
    //   this.formSearch.size = page._pageSize;
    //   this.formSearch.currentPage = page._currentPage;
    //   this.GetPlanList();
    // },
    pageAChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.GetPlanList();
    },
    loadQueryForm() {
      this.$api.BidPlan.GetBidPlanDropDown().then((res) => {
        this.dropDownGroup = res;
        this.onSubmit();
      });
    },
    onSubmit() {
      this.page.index = 1;
      this.GetPlanList();
    },
    slideNave(data) {
      this.open = data;
      console.log(this.open);
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
    onChangeProject(project) {
      // this.formSearch.ProjectId = project.id;
    },

    handleTabClick(tab, event) {
      // this.currTab = tab.name;
    },

    onEditSave() {
      this.detailVisible = false;
      this.onSubmit();
    },
    onCancle() {
      this.detailVisible = false;
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
        this.$api.BidPlan.DeleteBidPlanById(id)
          .then((res) => {
            if (res.success) {
              this.$msg.success("删除成功");
              this.onSubmit();
            } else {
              this.$msg.error(res.message);
            }
          })
          .finally(() => {});
      });
    },
    /**
     * 清除计划
     */
    removePlan(plan) {
      this.plans.splice(this.plans.indexOf(plan), 1);
    },
    /**
     * 编辑方案
     */
    edit(id, bidModeId, type) {
      console.log(type);
      let pathName = "";
      let pathName1 = "";
      switch (type) {
        case "一般招标":
          // case "邀请招标":
          pathName = "yibanzhaobiao";
          // pathName = "bidMode6";
          break;
        case "直接委托":
          pathName1 = "bidModeDetailzhijie";
          break;
        case "竞争性谈判":
          pathName1 = "bidModeDetaillingxing";
          break;
        case "集采使用":
          pathName1 = "bidModeDetailjicai";
          break;
      }
      // if (type == "邀请招标") {
      if (type == "一般招标" || type == "集采招标" || type == "战采招标") {
        this.$router.push({
          path: `/bid/yibanzhaobiao`,
          query: {
            id,
            bidModeId,
          },
          // path: `/bid/${pathName}/EditStep3/${id}`,
        });
      } else {
        this.$router.push({
          path: `/bid/${pathName1}?id=${id}&bidModeId=${bidModeId}`,
        });
      }
    },
    /**
     * 编辑计划
     */
    // edit(id) {
    //   this.$router.push({
    //     name: "/bid/bidMode6/EditStep1",
    //     params: {
    //       baseId: id,
    //     },
    //   });
    // },
    /**
     * 添加或修改招标计划/
     */
    onAddBidPlan(id, bidModeId, type) {
      let pathName = "";
      switch (type) {
        case "邀请招标":
          pathName = "bidModeDetailYq";
          break;
        case "直接委托":
          pathName = "bidModeDetailZw";
          break;
        case "竞争性谈判":
          pathName = "bidModeDetailLx";
          break;
        case "集采使用":
          pathName = "bidModeDetailJc";
          break;
      }
      window.open(`#/bid/${pathName}?id=${id}&bidModeId=${bidModeId}`);
      // window.open(`#/bid/${"liandoBidPlanDetail"}?id=${id}`);
      // this.$router.push({
      //   // path: "/bid/bidModedetali",
      //   name: "bidModedetali",
      //   params: {
      //     baseId: id,
      //   },
      // });
    },
    confirmAaddPlan() {
      if (this.plans.length > 0) {
        this.$confirm("是否添加招采方案?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.addPlanToMode();
        });
      } else {
        this.$alert("请在操作列中选择一个或多个采购事项", "警告", {
          confirmButtonText: "确定",
          type: "warning",
        });
      }
    },
    /**
     * 添加招采方案
     */
    addPlanToMode() {
      const ids = this.plans.map((p) => p.id);
      this.addPlanLoading = true;
      this.$api.BidPlan.AddPlanToMode(ids)
        .then((res) => {
          if (res.success) {
            this.$msg.success("添加成功");
            this.plans.splice(0, this.plans.length);
            this.onSubmit();
          } else {
            this.$alert(res.message, "警告", {
              confirmButtonText: "确定",
              type: "warning",
            });
          }
        })
        .finally(() => {
          this.addPlanLoading = false;
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
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
/* ::v-deep .el-input__inner {
  height: 30px;
} */
</style>
