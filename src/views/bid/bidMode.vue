<template>
  <el-main>
    <div class="userwidth" style="padding-bottom: 90px">
      <el-container>
        <!--左边分类-->
        <project-tree @itemClick="onChangeProject" @slideNave="slideNave" />
        <el-card class="box-card" shadow="never" :body-style="{ padding: '15px' }" style="margin-left: 10px">
          <el-form label-position="right" label-width="120px" :model="formSearch" size="small" class="border p-2 mt-0">
            <el-row>
              <el-col :span="8">
                <el-form-item label="经办人：">
                  <el-input v-model="formSearch.EditUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="方案名称：">
                  <el-input v-model="formSearch.ModeName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标专业名称：">
                  <el-input v-model="formSearch.BidCateName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标方式：">
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
                <el-form-item label="邀标方式：">
                  <el-select v-model="formSearch.BidInviteType">
                    <el-option
                      v-for="item in dropDownGroup.bidInviteType"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审批状态：">
                  <el-select v-model="formSearch.ModeStatus">
                    <el-option
                      v-for="item in dropDownGroup.modeStatus"
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
            <el-col :span="24" class="text-right">
              <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
            </el-col>
          </el-row>
          <div class="mt-2">
            <el-table
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData"
              v-loading="loading"
              height="450"
            >
              <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
              <el-table-column prop="projectName" label="项目或期区名称"> </el-table-column>
              <el-table-column prop="bidCateName" label="招标专业"> </el-table-column>
              <el-table-column show-overflow-tooltip prop="modeName" label="方案名称" min-width="150">
                <template slot-scope="scope">
                  <el-link
                    class="sp"
                    type="primary"
                    style="color: #409eff; text-decoration: none"
                    icon="el-icon-search"
                    @click="jumpDetail(scope.row.id, scope.row.purchaseType)"
                    >{{ scope.row.modeName }}</el-link
                  >
                </template>
              </el-table-column>
              <el-table-column prop="purchaseType" label="招标方式" align="center" width="100"> </el-table-column>
              <el-table-column prop="editUserName" label="经办人" align="center" width="80"></el-table-column>
              <el-table-column prop="editDate" label="经办日期" align="center" width="100"></el-table-column>
              <el-table-column prop="modeStatus" label="审核状态" align="center" width="100"></el-table-column>
              <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-dropdown style="width: 90px">
                    <span class="el-dropdown-link"> 选择操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <a
                          class="dropdown-item"
                          href="javascript:void(0)"
                          v-if="scope.row.modeStatus === '草稿'"
                          @click="edit(scope.row.id, scope.row.purchaseType)"
                          >编辑方案</a
                        >
                      </el-dropdown-item>
                      <el-dropdown-item
                        ><a
                          class="dropdown-item"
                          href="javascript:void(0)"
                          v-if="scope.row.modeStatus === '草稿'"
                          @click="del(scope.row.id)"
                          >删除方案</a
                        ></el-dropdown-item
                      >
                      <el-dropdown-item
                        ><a class="dropdown-item" href="javascript:void(0)" @click="jumpDetail(scope.row.id, scope.row.purchaseType)"
                          >方案详情</a
                        ></el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
          </div>
        </el-card>
      </el-container>
    </div>
  </el-main>
</template>
<script>
import ProjectTree from "./components/ProjectTree";
import { groupBy } from "@/util";
export default {
  components: {
    ProjectTree,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      dropDownGroup: {},
      pageSize: 15,
      formSearch: {
        Id: "",
        ProjectId: "",
        PurchaseType: "",
        ModeName: "",
        EditUserName: "",
        ModeStatus: "",
        BidCateName: "",
        BidInviteType: "",
      },
      tableData: [],
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      loading: false,
    };
  },
  created() {
    this.loadQueryForm();
  },
  methods: {
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.onSubmit();
    },
    loadQueryForm() {
      this.$api.BidModeMaster.GetBidModeSearchDropDown().then((res) => {
        this.dropDownGroup = res;
        this.onSubmit();
      });
    },
    onSubmit() {
      let that = this;
      if (that.loading) {
        return;
      }
      that.tableData = [];
      that.loading = true;
      const query = {
        SkipCount: (that.page.index - 1) * that.page.size,
        MaxResultCount: that.page.size,
        AddModeFlag: that.AddModeFlag,
        ...this.formSearch,
      };
      this.$api.BidModeMaster.GetBidModeMasterList(query)
        .then((res) => {
          that.page.total = res.totalCount;
          that.tableData = res.items;
        })
        .finally(() => {
          that.loading = false;
        });
    },
    /**
     * 选择项目
     */
    onChangeProject(project) {
      this.formSearch.ProjectId = project.id;
      this.onSubmit();
    },
    /**
     * 查看详情
     */
    jumpDetail(id, type) {
      let pathName = "";
      switch (type) {
        case "邀请招标":
          pathName = "bidModeDetail";
          break;
        case "直接委托":
          pathName = "bidModeDetail2";
          break;
        case "竞争性谈判":
          pathName = "bidModeDetail3";
          break;
        case "集采招标":
          pathName = "bidModeDetail4";
          break;
        case "竞争性谈判":
          pathName = "bidModeDetail5";
          break;
      }
      window.open(`#/bid/${pathName}/${id}`);
    },
    /**
     * 编辑方案
     */
    edit(id, type) {
      let pathName = "";
      switch (type) {
        case "邀请招标":
          pathName = "bidMode1";
          break;
        case "直接委托":
          pathName = "bidMode2";
          break;
        case "竞争性谈判":
          pathName = "bidMode3";
          break;
        case "集采使用":
          pathName = "bidMode4";
          break;
        case "竞争性谈判":
          pathName = "bidMode5";
          break;
      }
      this.$router.push({
        path: `/bid/${pathName}/EditStep1/${id}`,
      });
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
    /**
     * 删除方案
     */
    del(id) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.BidModeMaster.DeleteBidModeMasterById(id)
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
  padding: 0.25rem 0rem !important;
  z-index: 99999999999 !important;
}
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
</style>
<!--<style lang="scss" scoped>-->
<!--::v-deep .el-col-5 {-->
<!--  width: auto;-->
<!--}-->
<!--::v-deep .el-col-19 {-->
<!--  width: 79%;-->
<!--}-->
<!--</style>-->
