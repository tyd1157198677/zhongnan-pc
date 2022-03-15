<template>
  <el-main>
    <div class="userwidth" style="padding-bottom: 90px">
      <el-container>
        <!--左边分类-->
        <project-tree @itemClick="onChangeProject" @slideNave="slideNave" />
        <el-card class="box-card" shadow="never" :body-style="{ padding: '15px 15px 0 15px' }" style="margin-left: 10px">
          <el-form label-position="right" label-width="150px" :model="formSearch" size="small" class="border p-2 mt-0">
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目或期区名称：">
                  <el-input v-model="formSearch.ProjectName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标计划名称：">
                  <el-input v-model="formSearch.PlanName"></el-input>
                </el-form-item>
              </el-col>

              <!-- <el-col :span="8">
                <el-form-item label="是否处理：">
                  <el-select v-model="formSearch.RequireDoStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已处理" value="已处理"></el-option>
                    <el-option label="未处理" value="未处理"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->

              <!-- <el-col :span="8">
                <el-form-item label="是否分配招标经办人：" label-width="170px">
                  <el-select v-model="formSearch.HaveBidUser">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="8">
                <el-form-item label="是否分配入围经办人：" label-width="170px">
                  <el-select v-model="formSearch.HaveSupplierUser">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="招标进度：" label-width="170px">
                  <el-select v-model="formSearch.planStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in planStatuss" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="权限：">
                  <el-select v-model="formSearch.supplierAuth">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="我经办的" value="我经办的"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-row class="mb-1 mt-1">
            <el-col :span="12">
              &nbsp;
              <el-tag v-for="p in plans" :key="p.id" closable class="mr-2" @close="removePlan(p)" type="danger">
                {{ p.planName }}
              </el-tag>
            </el-col>
            <el-col :span="12" class="text-right">
              <!-- <el-button type="primary" size="small" @click="onAddBidPlan">新增招采计划</el-button> -->
              <!-- <el-button type="primary" size="small" @click="confirmAaddPlan" :loading="addPlanLoading">添加招采方案</el-button> -->
              <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
            </el-col>
          </el-row>
          <div class="mt-2">
            <!-- <el-tabs v-model="currTab" type="card" @tab-click="handleTabClick">
              <el-tab-pane label="邀请招标" name="a"> -->
            <el-table
              height="470"
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData"
            >
              <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
              <el-table-column label="项目或期区名称" show-overflow-tooltip min-width="250" fixed>
                <template slot-scope="scope">
                  <span>{{ scope.row.projectName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="planName" label="招标计划名称" min-width="250" show-overflow-tooltip fixed>
                <template slot-scope="scope">
                  <!-- <el-tooltip class="item" effect="dark" content="点击查看招标计划详细信息" placement="top" :open-delay = 500> -->
                  <el-link type="primary" style="color: #409eff; text-decoration: none" @click="onAddBidPlan(scope.row.id)">{{
                    scope.row.planName
                  }}</el-link>
                  <!-- </el-tooltip> -->
                </template>
              </el-table-column>
              <el-table-column prop="bidEndDate" label="计划完成日期#(计划系统)" :render-header="renderheader" align="center" width="120">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.bidEndDate, "yyyy-MM-dd") }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="confirmDate" label="项目需求日期" align="center" width="120"> </el-table-column>
              <el-table-column label="需求原因" align="center" min-width="180px" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="sp">{{ scope.row.requireDesc }}</span>
                </template>
              </el-table-column>
              <el-table-column label="需求负责人" align="center" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.editUserName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="招标经办人" align="center" width="100">
                <template slot-scope="scope">
                  <!-- <el-link class="sp" type="primary" v-if="!scope.row.bidUserName" @click="showSignUpListname"
                        ><img src="../../assets/ren.png" height="40" width="40"
                      /></el-link> -->
                  <span>{{ scope.row.bidUserName }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="入围经办人" align="center" width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.supplierUserName }}</span>
                    </template>
                  </el-table-column> -->
              <el-table-column prop="PlanStatus" label="招标进度" align="center" width="100"> </el-table-column>
              <el-table-column label="操作" align="center" width="50" fixed="right">
                <template slot-scope="scope">
                  <i class="el-icon-edit" v-if="scope.row.canEditPlan" title="编辑" @click="edit(scope.row.id)"></i>
                  <!-- <el-dropdown style="width:80px" v-if="userGuid == scope.row.supplierUserGuidString">
                    <span class="el-dropdown-link"> 选择操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <a class="dropdown-item" href="javascript:void(0)" @click="edit(scope.row.id)">完善招标计划</a>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown> -->
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
            <!-- </el-tab-pane>
            </el-tabs> -->
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
      planStatus: "",
      planStatuss: [],
      dropDownGroup: {},
      dialogVisiblename: false,
      pageSize: 15,
      addPlanLoading: false,
      detailVisible: false,
      activeName: "1",
      formSearch: {
        Id: "",
        ProjectId: "",
        ProjectName: "",
        PlanName: "",
        RequireDoStatus: "",
        PlanStatus: "",
        BidLevel: "项目",
        HaveBidUser: "",
        HaveSupplierUser: "",
        supplierAuth: "",
        planStatus: "",
        // size: 15,
        // current: 1,
        // total: 0,
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
    bus.$emit("showNav");
    this.loadQueryForm();
    // this.GetPlanList();
    this.GetLiandoPlanAllDropDown();
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
    GetLiandoPlanAllDropDown() {
      this.$http.get("/LiandoPlan/GetLiandoPlanAllDropDown").then((res) => {
        this.planStatuss = res.data.planStatus;
        this.planStatus = res.data.length > 0 ? res.data[0].value : "";
        this.GetPlanList();
      });
    },
    GetPlanList() {
      let obj = {
        BidLevel: "项目",
        ProjectName: this.formSearch.ProjectName,
        PlanName: this.formSearch.PlanName,
        PlanStatus: this.formSearch.planStatus,
        SupplierAuth: this.formSearch.supplierAuth,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
      };
      this.$http.get("/LiandoPlan/GetPlanList", { params: obj }).then((res) => {
        if (res.data.result.items) {
          res.data.result.items.forEach((item) => {
            item.confirmDate = this.timeFormatSeconds(item.confirmDate);
          });
        }
        this.tableData = res.data.result.items;
        this.page.total = res.data.result.totalCount;
        console.log(res);
      });
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
    pageChange(page) {
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
    jumpDetail(id) {
      // window.open(`#/bid/bidPlanShow?id=${id}`);
      this.$router.push({
        path: "/bid/bidPlanShow",
        params: {
          baseId: id,
        },
      });
    },
    handleTabClick(tab, event) {
      // this.currTab = tab.name;
    },
    /**
     * 编辑计划
     */
    edit(id) {
      this.$router.push({
        name: "/bid/bidMode6/EditStep2",
        params: {
          baseId: id,
        },
      });
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
              // this.$msg.error(res.message);
              this.$alert(res.message, {
                confirmButtonText: "确定",
              });
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
     * 添加或修改招标计划/
     */
    onAddBidPlan(id) {
      window.open(`#/bid/${"liandoBidPlanDetail"}/${id}`);
      // this.$router.push({
      //   // path: "/bid/bidModedetali",
      //   name: "bidModedetali",
      //   params: {
      //     baseId: id,
      //   },
      // });
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
</style>
