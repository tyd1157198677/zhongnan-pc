<template>
  <el-main>
    <div class="userwidth" style="padding-bottom: 90px">
      <el-container>
        <!--左边分类-->
        <project-tree @itemClick="onChangeProject" @slideNave="slideNave" />
        <el-card class="box-card" shadow="never" :body-style="{ padding: '15px 15px 0 15px' }" style="margin-left: 10px">
          <el-form label-position="right" label-width="120px" :model="formSearch" size="small" class="border p-2 mt-0">
            <el-row>
              <el-col :span="8">
                <el-form-item label="经办人：">
                  <el-input v-model="formSearch.EditUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标计划名称：">
                  <el-input v-model="formSearch.PlanName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目或期区名称：">
                  <el-input v-model="formSearch.ProjectName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招采计划分类：">
                  <el-select v-model="formSearch.PlanCate">
                    <el-option v-for="item in dropDownGroup.planCate" :key="item.value" :label="item.text" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标层次：">
                  <el-select v-model="formSearch.BidLevel">
                    <el-option v-for="item in dropDownGroup.bidLevel" :key="item.value" :label="item.text" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标专业名称：">
                  <el-input v-model="formSearch.BidCateName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="需求部门：">
                  <el-select v-model="formSearch.DepName">
                    <el-option
                      v-for="item in dropDownGroup.purchaseDepartment"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标方式：	">
                  <el-select v-model="formSearch.PurchaseType">
                    <el-option
                      v-for="item in dropDownGroup.purchaseType"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审批状态：">
                  <el-select v-model="formSearch.PlanStatus">
                    <el-option
                      v-for="item in dropDownGroup.planStatus"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    ></el-option>
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
              <el-button type="primary" size="small" @click="onAddBidPlan">新增招采计划</el-button>
              <el-button type="primary" size="small" @click="confirmAaddPlan" :loading="addPlanLoading">添加招采方案</el-button>
              <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
            </el-col>
          </el-row>
          <div class="mt-2">
            <el-tabs v-model="currTab" type="card" @tab-click="handleTabClick">
              <el-tab-pane label="待添加方案" name="a">
                <el-table
                  height="370"
                  empty-text="无符合条件的记录"
                  stripe
                  border
                  element-loading-text="请稍候,数据正在加载中..."
                  :data="tabs.a.tableData"
                  v-loading="tabs.a.loading"
                >
                  <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                  <el-table-column prop="projectName" label="项目或期区名称">
                    <template slot-scope="scope"> {{ scope.row.projectName }} </template>
                  </el-table-column>
                  <el-table-column prop="bidCateName" label="招标专业" align="center"> </el-table-column>
                  <el-table-column prop="planName" label="招标计划名称" min-width="150" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-link
                        class="sp"
                        type="primary"
                        style="margin-left: 10px; color: #409eff; text-decoration: none"
                        icon="el-icon-search"
                        @click="jumpDetail(scope.row.id)"
                        >{{ scope.row.planName }}</el-link
                      >
                    </template>
                  </el-table-column>
                  <el-table-column prop="editUserName" label="经办人" align="center" width="80"></el-table-column>
                  <el-table-column prop="editDate" label="经办日期" align="center" width="100"></el-table-column>
                  <el-table-column prop="planStatus" label="审核状态" align="center" width="90"> </el-table-column>
                  <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                      <el-dropdown style="width: 80px">
                        <span class="el-dropdown-link"> 选择操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <a
                              class="dropdown-item"
                              href="javascript:void(0)"
                              v-if="scope.row.planStatus === '草稿'"
                              @click="edit(scope.row.id)"
                              >编辑计划</a
                            >
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <a
                              class="dropdown-item"
                              href="javascript:void(0)"
                              v-if="scope.row.planStatus === '草稿'"
                              @click="del(scope.row.id)"
                              >删除计划</a
                            >
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <a class="dropdown-item" href="javascript:void(0)" @click="jumpDetail(scope.row.id)">计划详情</a>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <a
                              class="dropdown-item"
                              href="javascript:void(0)"
                              v-if="scope.row.planStatus === '审批完成'"
                              @click="selectPlan(scope.row)"
                              >选择计划</a
                            >
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                </el-table>
                <pagination
                  :total="tabs.a.page.total"
                  :current-page="tabs.a.page.index"
                  :pageSize="tabs.a.page.size"
                  @pageChange="pageAChange"
                />
              </el-tab-pane>
              <el-tab-pane label="已添加方案" name="b">
                <el-table
                  height="370"
                  empty-text="无符合条件的记录"
                  stripe
                  border
                  element-loading-text="请稍候,数据正在加载中..."
                  :data="tabs.b.tableData"
                  v-loading="tabs.b.loading"
                >
                  <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                  <el-table-column prop="projectName" label="项目或期区名称">
                    <template slot-scope="scope"> {{ scope.row.projectName }}{{ scope.row.subProjectName }} </template>
                  </el-table-column>
                  <el-table-column prop="bidCateName" label="招标专业" align="center"> </el-table-column>
                  <el-table-column prop="planName" label="招标计划名称" min-width="150" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-link
                        class="sp"
                        type="primary"
                        style="margin-left: 10px; color: #409eff; text-decoration: none"
                        icon="el-icon-search"
                        @click="jumpDetail(scope.row.id)"
                        >{{ scope.row.planName }}</el-link
                      >
                    </template>
                  </el-table-column>
                  <el-table-column prop="editUserName" label="经办人" align="center" width="80"> </el-table-column>
                  <el-table-column prop="editDate" label="经办日期" align="center" width="100"> </el-table-column>
                  <el-table-column prop="planStatus" label="审核状态" align="center" width="90"> </el-table-column>
                  <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                      <el-dropdown style="width: 80px">
                        <span class="el-dropdown-link"> 选择操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <a class="dropdown-item" href="javascript:void(0)" @click="jumpDetail(scope.row.id)">计划详情</a>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                </el-table>
                <pagination
                  :total="tabs.b.page.total"
                  :current-page="tabs.b.page.index"
                  :pageSize="tabs.b.page.size"
                  @pageChange="pageBChange"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
        <!-- <el-dialog :visible.sync="detailVisible" width="98%">
          <bidPlanForm ref="detail" @onCancle="onCancle" @onSubmit="onEditSave" />
        </el-dialog> -->
      </el-container>
    </div>
  </el-main>
</template>
<script>
import ProjectTree from "./components/ProjectTree";
// import bidPlanForm from "./bidPlanForm";
import { groupBy } from "@/util";
import bus from "@/util/bus";
export default {
  components: {
    ProjectTree,
    // bidPlanForm,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      dropDownGroup: {},
      pageSize: 15,
      addPlanLoading: false,
      detailVisible: false,
      formSearch: {
        Id: "",
        ProjectId: "",
        ProjectName: "",
        PlanCate: "",
        PlanName: "",
        PurchaseType: "",
        BidLevel: "",
        DepName: "",
        BidCateName: "",
        EditUserName: "",
        PlanStatus: "",
      },
      plans: [],
      currTab: "a",
      tabs: {
        a: {
          tableData: [],
          AddModeFlag: false,
          page: {
            size: 15,
            index: 1,
            total: 0,
          },
          loading: false,
        },
        b: {
          tableData: [],
          AddModeFlag: true,
          page: {
            size: 15,
            index: 1,
            total: 0,
          },
          loading: false,
        },
      },
    };
  },
  created() {
    // this.$emit("header", false);
    // this.$emit("footer", false);
    bus.$emit("showNav");
    this.loadQueryForm();
  },
  methods: {
    pageAChange(page) {
      let tab = this.tabs["a"];
      tab.page.size = page._pageSize;
      tab.page.index = page._currentPage;
      this.onASubmit();
    },
    pageBChange(page) {
      let tab = this.tabs["b"];
      tab.page.size = page._pageSize;
      tab.page.index = page._currentPage;
      this.onBSubmit();
    },
    loadQueryForm() {
      this.$api.BidPlan.GetBidPlanDropDown().then((res) => {
        this.dropDownGroup = res;
        this.onSubmit();
      });
    },
    onSubmit() {
      this.onASubmit();
      this.onBSubmit();
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
    onASubmit() {
      let tab = this.tabs["a"];
      if (tab.loading) {
        return;
      }
      tab.tableData = [];
      let that = this;
      tab.loading = true;
      const query = {
        SkipCount: (tab.page.index - 1) * tab.page.size,
        MaxResultCount: tab.page.size,
        AddModeFlag: tab.AddModeFlag,
        ...this.formSearch,
      };
      this.$api.BidPlan.GetBidPlanList(query)
        .then((res) => {
          tab.page.total = res.totalCount;
          tab.tableData = res.items;
        })
        .finally(() => {
          tab.loading = false;
        });
    },
    onBSubmit() {
      let tab = this.tabs["b"];
      if (tab.loading) {
        return;
      }
      tab.tableData = [];
      let that = this;
      tab.loading = true;
      const query = {
        SkipCount: (tab.page.index - 1) * tab.page.size,
        MaxResultCount: tab.page.size,
        AddModeFlag: tab.AddModeFlag,
        ...this.formSearch,
      };
      this.$api.BidPlan.GetBidPlanList(query)
        .then((res) => {
          tab.page.total = res.totalCount;
          tab.tableData = res.items;
        })
        .finally(() => {
          tab.loading = false;
        });
    },
    onChangeProject(project) {
      this.formSearch.ProjectId = project.id;
      this.onSubmit();
    },
    jumpDetail(id) {
      // window.open(`#/bid/bidPlanShow?id=${id}`);
      this.$router.push({
        path: "/bid/bidPlanShow",
        query: {
          id: id,
        },
      });
    },
    handleTabClick(tab, event) {
      this.currTab = tab.name;
    },
    /**
     * 编辑计划
     */
    edit(id) {
      this.$router.push({
        path: "/bid/bidPlanForm",
        query: {
          id: id,
          tit: "编辑",
        },
      });
      // this.detailVisible = true;
      // this.$nextTick(() => {
      //   this.$refs["detail"].init("edit", id);
      // });
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
    selectPlan(plan) {
      if (this.plans.indexOf(plan) > -1) {
        this.$message.warning("已存在");
      } else {
        this.plans.push(plan);
      }
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
        path: "/bid/bidPlanForm",
        query: {
          tit: "新增",
        },
      });
      // this.detailVisible = true;
      // this.$nextTick(() => {
      //   this.$refs["detail"].init("add");
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

.dropdown-item {
  padding: 0.25rem 1rem !important;
}
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
</style>
