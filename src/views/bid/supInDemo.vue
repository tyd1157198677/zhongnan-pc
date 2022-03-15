<template>
  <el-main>
    <div class="userwidth" style="padding-bottom: 90px">
      <el-container>
        <!--左边分类-->
        <!-- <project-tree @itemClick="onChangeProject" @slideNave="slideNave" ref="child" /> -->
        <el-card class="box-card" shadow="never" :body-style="{ padding: '15px 15px 0 15px' }">
          <el-form label-position="right" label-width="150px" :model="formSearch" size="small">
            <el-row :gutter="12">
              <el-col :span="3">
                <!-- <el-form-item label="项目或期区名称："> -->
                <el-input v-model="formSearch.projectName" placeholder="项目或期区名称"></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="招标计划名称："> -->
                <el-input v-model="formSearch.planName" placeholder="招标计划名称"></el-input>
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
                <el-input v-model="formSearch.bidCateName" placeholder="招标专业名称"></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="需求部门："> -->
                <el-select v-model="formSearch.depName" placeholder="需求部门" @change="selectChange">
                  <el-option label="需求部门" value=""> </el-option>
                  <el-option v-for="item in depNames" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="选择权限："> -->
                <el-select v-model="formSearch.myAuth" placeholder="选择权限" @change="selectChange">
                  <el-option label="选择权限" value=""></el-option>
                  <el-option label="我经办的" value="true"></el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="招标专业名称："> -->
                <el-input v-model="formSearch.editUserName" placeholder="招标经办人"></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <div class="text-right">
                  <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>

          <el-row class="mb-1 mt-1"> </el-row>
          <div class="mt-2">
            <el-table
              key="s1"
              height="500"
              empty-text="无符合条件的记录"
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData"
            >
              <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
              <el-table-column label="项目或期区名称" min-width="250px" fixed>
                <template slot-scope="scope">
                  <span>{{ scope.row.projectName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="planName" label="招标计划名称" min-width="250" show-overflow-tooltip fixed>
                <template slot-scope="scope">
                  <el-link type="primary" style="color: #409eff; text-decoration: none" @click="selectPlan(scope.row.id)">{{
                    scope.row.planName
                  }}</el-link>
                  <!-- <el-link type="primary" style="color:#409eff;text-decoration: none" @click="jumpSuppInfo(scope.row)">{{
                    scope.row.planName
                  }}</el-link> -->
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
              <el-table-column label="需求部门" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.depName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="入围截止日期" width="150" align="center">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.bidEndDate, "yyyy-MM-dd") }}</span>
                </template>
              </el-table-column>
              <el-table-column label="招标经办人" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.bidUserName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="入围进度" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.planStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column label="保证金退还" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.planStatus }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageAChange" />
          </div>
        </el-card>
        <el-dialog width="60%" title="已报名供应商列表" :visible.sync="dialogVisible">
          <el-tabs v-model="activeName">
            <el-tab-pane label="标段1" name="1">
              <el-table stripe border style="width: 100%" :data="supplierSignUpList">
                <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
                <el-table-column prop="comFullName" label="报名单位"> </el-table-column>
                <el-table-column prop="signUpTime" width="250" label="报名时间" align="center"> </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="标段2" name="2">
              <el-table stripe border style="width: 100%" :data="supplierSignUpList">
                <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
                <el-table-column prop="comFullName" label="报名单位"> </el-table-column>
                <el-table-column prop="signUpTime" width="250" label="报名时间" align="center"> </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
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
import threeRoomVue from "../system/threeRoom.vue";
export default {
  components: {
    ProjectTree,
    // bidPlanForm,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      depNames: [],
      purchaseTypes: [],
      bidLevels: [],
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      loading: false,
      dropDownGroup: {},
      pageSize: 15,
      addPlanLoading: false,
      detailVisible: false,
      dialogVisible: false,
      activeName: "1",
      supplierSignUpList: [],
      formSearch: {
        editUserName: "",
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
      planStatus: [],
      bidLevels: [],
      tableData: [],
      plans: [],
      currTab: "a",
      tabs: {
        a: {
          AddModeFlag: false,
          page: {
            size: 15,
            index: 1,
            total: 0,
          },
          loading: false,
        },
        b: {
          //   tableData: [],
          AddModeFlag: true,
          page: {
            size: 15,
            index: 1,
            total: 0,
          },
          loading: false,
        },
      },
      userGuid: "",
    };
  },
  created() {
    // this.$emit("header", false);
    // this.$emit("footer", false);
    bus.$emit("showNav");
    this.GetPlanEditDropDowns();
    // this.loadQueryForm();
    // this.getTable();
    this.userGuid = sessionStorage.getItem("userGuid");
    // this.userGuid = sessionStorage.getItem("userGuid").toLowerCase();
  },
  mounted() {
    //this.$refs.child.$emit("slideNave")
  },
  methods: {
    parseTime,
    jumpSuppInfo(row) {
      window.open("#/bid/bidMode7/detail?id=" + row.id);
      // this.$router.push({
      //   path: "/bid/bidMode7/detail",
      //   query: { id: row.id},
      // });
    },
    getTable2() {
      // this.page = {
      //   size: 15,
      //   index: 1,
      //   total: 0,
      // };
      this.page.index = 1;
      this.getTable();
    },
    GetPlanEditDropDowns() {
      this.$http.get("/PurchasePlan/GetPlanEditDropDowns").then((res) => {
        this.bidLevels = res.data.bidLevel;
        this.formSearch.bidLevel = res.data.length > 0 ? res.data[0].value : "";
        this.purchaseTypes = res.data.purchaseType;
        this.formSearch.purchaseType = res.data.length > 0 ? res.data[0].value : "";
        this.depNames = res.data.depName;
        this.formSearch.depName = res.data.length > 0 ? res.data[0].value : "";
        this.getTable();
      });
    },
    getTable() {
      this.loading = true;
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      this.$api.supIn.GetPlanList(this.formSearch).then((res) => {
        this.loading = false;
        this.tableData = res.items;
        this.page.total = res.totalCount;
      });
    },
    selectChange() {
      this.page.index = 1;
      this.getTable();
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.getTable();
    },
    handleEdit(row) {
      this.$router.push({
        path: "/invest/invesEdit",
        query: { id: row.id, supGuid: row.supGuid },
      });
    },
    delete1(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.DeleteInvesMaster({ id: id }).then((res) => {
            if (res.success) {
              this.$message.success(res.message);
              this.loadQueryForm();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
    showSignUpList(baseId) {
      this.dialogVisible = true;
      this.getBidNoticeSignUpList(baseId);
    },
    getBidNoticeSignUpList(baseId) {
      this.$api.BidNotice.GetBidNoticeSignUpList(baseId).then((res) => {
        this.siginUpList = res;
        if (this.siginUpList && this.siginUpList.length > 0) {
          this.activeName = this.siginUpList[0].sectionId;
        }
      });
    },
    pageAChange(page) {
      let tab = this.tabs["a"];
      tab.page.size = page._pageSize;
      tab.page.index = page._currentPage;
      // this.onASubmit();
    },
    pageBChange(page) {
      let tab = this.tabs["b"];
      tab.page.size = page._pageSize;
      tab.page.index = page._currentPage;
      // this.onBSubmit();
    },
    loadQueryForm() {
      this.$api.BidPlan.GetBidPlanDropDown().then((res) => {
        this.dropDownGroup = res;
        this.onSubmit();
      });
    },
    onSubmit() {
      // this.onASubmit();
      // this.onBSubmit();
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
    // onASubmit() {
    //   let tab = this.tabs["a"];
    //   if (tab.loading) {
    //     return;
    //   }
    //   tab.tableData = [];
    //   let that = this;
    //   tab.loading = true;
    //   const query = {
    //     SkipCount: (tab.page.index - 1) * tab.page.size,
    //     MaxResultCount: tab.page.size,
    //     AddModeFlag: tab.AddModeFlag,
    //     ...this.formSearch,
    //   };
    //   this.$api.BidPlan.GetBidPlanList(query)
    //     .then(res => {
    //       tab.page.total = res.totalCount;
    //       tab.tableData = res.items;
    //     })
    //     .finally(() => {
    //       tab.loading = false;
    //     });
    // },
    // onBSubmit() {
    //   let tab = this.tabs["b"];
    //   if (tab.loading) {
    //     return;
    //   }
    //   tab.tableData = [];
    //   let that = this;
    //   tab.loading = true;
    //   const query = {
    //     SkipCount: (tab.page.index - 1) * tab.page.size,
    //     MaxResultCount: tab.page.size,
    //     AddModeFlag: tab.AddModeFlag,
    //     ...this.formSearch,
    //   };
    //   this.$api.BidPlan.GetBidPlanList(query)
    //     .then(res => {
    //       tab.page.total = res.totalCount;
    //       tab.tableData = res.items;
    //     })
    //     .finally(() => {
    //       tab.loading = false;
    //     });
    // },
    // onChangeProject(project) {
    //   this.formSearch.ProjectId = project.id;
    //   this.onSubmit();
    // },
    // jumpDetail(id) {
    //   // window.open(`#/bid/bidPlanShow?id=`);
    //   this.$router.push({
    //     path: '/bid/bidPlanShow',
    //     query: {
    //       id: id
    //     }
    //   })
    // },
    changepeo(id) {
      this.$confirm("确认要领取吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoSupplierIn/SaveMyWork", { id }).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.getTable();
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    handleTabClick(tab, event) {
      this.currTab = tab.name;
    },
    /**
     * 编辑计划
     */
    edit(row) {
      this.$router.push({
        path: "/bid/bidMode6/EditStep1",
        query: { row: row },
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
              this.$msg.error(res.message);
            }
          })
          .finally(() => {});
      });
    },
    /**
     * 选择计划
     */
    selectPlan(id) {
      // this.$router.push({
      //   path: "/bid/bidMode7/EditStep2",
      //   query: { id: row.id },
      // });
      this.$router.push({
        path: `/bid/bidMode7/EditStep2/${id}`,
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
    onAddBidPlan() {
      this.$router.push({
        path: "/bid/bidMode6/EditStep1",
      });
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
