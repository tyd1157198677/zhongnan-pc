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
                <el-form-item label="招标计划名称：">
                  <el-input v-model="PlanName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目或期区名称：">
                  <el-input v-model="ProjectName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="入围经办人：">
                  <el-input v-model="SupplierUserName"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="招标专业：">
                  <el-input v-model="formSearch.PlanStatus"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="招标层级：">
                  <el-select v-model="bidLevel">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in bidLevels" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分工状态：">
                  <el-select v-model="divideStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in divideStatuss" :key="item.value" :label="item.text" :value="item.value"> </el-option>
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
              <el-table-column prop="projectName" label="项目或期区名称" min-width="250" fixed show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.projectName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="planName" label="招标计划名称" min-width="250" show-overflow-tooltip fixed>
                <template slot-scope="scope">
                  <!-- <el-tooltip class="item" effect="dark" content="点击查看入围详细信息" placement="top" :open-delay = 500> -->
                  <el-link type="primary" style="color: #409eff; text-decoration: none" @click="onAddBidPlan(scope.row.id)">{{
                    scope.row.planName
                  }}</el-link>
                  <!-- </el-tooltip> -->
                </template>
              </el-table-column>
              <!-- <el-table-column prop="editUserName" label="需求负责人" align="center" width="150"> </el-table-column> -->
              <el-table-column prop="bidEndDate" label="计划完成日期#(计划系统)" :render-header="renderheader" align="center" width="120">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.bidEndDate, "yyyy-MM-dd") }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="confirmDate" label="项目需求日期" align="center" width="150"> </el-table-column>
              <el-table-column prop="requireDesc" label="需求原因" align="center" min-width="180px" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="需求负责人" align="center" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.editUserName }}</span>
                </template>
              </el-table-column>

              <el-table-column label="入围经办人" align="center" width="100" fixed="right">
                <template slot-scope="scope">
                  <!-- <el-link class="sp" type="primary" v-if="!scope.row.supplierUserName" @click="showSignUpListname2(scope.row.id)"
                    ><img src="../../assets/ren.png" height="23" width="23"
                  /></el-link> -->
                  <span>{{ scope.row.supplierUserName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="100" fixed="right">
                <template slot-scope="scope">
                  <div>
                    <span
                      v-if="scope.row.showEditUserButton === true"
                      title="分配人员"
                      class="el-icon-user"
                      @click="showSignUpListname2(scope.row.id)"
                    ></span>
                    <span
                      v-if="scope.row.showSubmitBidButton === true"
                      class="el-icon-circle-check"
                      style="margin-left: 10px"
                      title="提交"
                      @click="tijiao(scope.row)"
                    ></span>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="submitStatus" label="计划编辑状态" align="center" width="120"> </el-table-column>
                  <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                      <el-dropdown style="width:80px">
                        <span class="el-dropdown-link"> 选择操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <a class="dropdown-item" href="javascript:void(0)" @click="edit(scope.row.id)">完善招标计划</a>
                          </el-dropdown-item> -->
              <!-- <el-dropdown-item>
                            <a class="dropdown-item" href="javascript:void(0)" @click="del(scope.row.id)">删除计划</a>
                          </el-dropdown-item> -->
              <!-- <el-dropdown-item>
                            <a class="dropdown-item" href="javascript:void(0)" @click="selectPlan(scope.row)">编辑入围信息</a>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column> -->
            </el-table>
            <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
            <!-- </el-tab-pane> -->
            <!-- <el-tab-pane label="直接委托" name="b">
                <div>正在建设...</div>
              </el-tab-pane> -->
            <!-- </el-tabs> -->
          </div>
        </el-card>
        <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
      </el-container>
    </div>
  </el-main>
</template>
<script>
import ProjectTree from "./components/ProjectTree";
import choseUser from "@/components/choseUser";
import { groupBy } from "@/util";
import bus from "@/util/bus";
import { parseTime } from "@/util";
export default {
  components: {
    ProjectTree,
    choseUser,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      bidLevel: "",
      bidLevels: [],
      divideStatus: "",
      divideStatuss: [],
      dropDownGroup: {},
      dialogVisiblename: false,
      pageSize: 15,
      addPlanLoading: false,
      detailVisible: false,
      activeName: "1",
      rowId: "",
      SupplierUserName: "",
      ProjectName: "",
      PlanName: "",
      BidLevel: "",
      HaveSupplierUser: "",
      formSearch: {
        Id: "",
        ProjectId: "",
        ProjectName: "",
        PlanName: "",
        RequireDoStatus: "",
        PlanStatus: "",
        BidLevel: "",
        HaveBidUser: "",
        HaveSupplierUser: "",
        // size: 15,
        // current: 1,
        // total: 0,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      type: 1,
      tableData: [
        {
          id: "",
        },
      ],
      plans: [],
      currTab: "a",
    };
  },
  created() {
    // this.$emit("header", false);
    // this.$emit("footer", false);/api/services/app/LiandoPlan/GetPlanList
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
        this.bidLevels = res.data.bidLevel;
        this.bidLevel = res.data.length > 0 ? res.data[0].value : "";
        this.divideStatuss = res.data.divideStatus;
        this.divideStatus = res.data.length > 0 ? res.data[0].value : "";
        this.GetPlanList();
      });
    },
    GetPlanList() {
      let obj = {
        Id: this.id,
        SupplierUserName: this.SupplierUserName,
        ProjectName: this.ProjectName,
        PlanName: this.PlanName,
        BidLevel: this.bidLevel,
        DivideStatus: this.divideStatus,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
      };
      this.$http.get("/LiandoPlan/GetPlanDivideSupplierWorkList", { params: obj }).then((res) => {
        if (res.data.result.items) {
          res.data.result.items.forEach((item) => {
            item.confirmDate = this.timeFormatSeconds(item.confirmDate);
          });
        }
        this.tableData = res.data.result.items;
        this.tableData.id = res.data.result.items.id;
        this.page.total = res.data.result.totalCount;
        console.log(res);
      });
    },
    showSignUpListname2(id) {
      this.type = 2;
      this.rowId = id;
      this.$refs.choseUser.openfnc();
    },
    getBidNoticeSignUpList(baseId) {
      this.$api.BidNotice.GetBidNoticeSignUpList(baseId).then((res) => {
        this.siginUpList = res;
        if (this.siginUpList && this.siginUpList.length > 0) {
          this.activeName = this.siginUpList[0].sectionId;
        }
      });
    },
    tijiao(row) {
      this.$confirm("提交后将不能修改，确认要提交入围经办人吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          id: row.id,
        };
        this.$http.post("/LiandoPlan/SubmitSupplierWork", obj).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetPlanList();
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
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
    onUserAdd(id) {
      const obj = {
        planId: this.rowId,
        userId: id.userGuid,
        type: 2,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    // slideNave(data) {
    //   this.open = data;
    //   console.log(this.open);
    // },
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
        name: "/bid/bidMode6/EditStep1",
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
     * 选择计划
     */
    selectPlan(row) {
      this.$router.push({
        path: "/bid/bidMode7/EditStep1",
        query: { row: row },
      });
    },
    /**
     * 清除计划
     */
    removePlan(plan) {
      this.plans.splice(this.plans.indexOf(plan), 1);
    },
    /**
     * 添加或修改招标计划
     */
    onAddBidPlan(id) {
      // window.open(`#/bid/${"bidModeDetail"}/${id}`);
      // this.$router.push({
      //   // path: "/bid/bidMode6/EditStep1",
      //   name: "bidModeDetail",
      //   params: {
      //     baseId: id,
      //   },
      // });
      window.open("#/bid/bidMode7/detail?id=" + id);
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
</style>
