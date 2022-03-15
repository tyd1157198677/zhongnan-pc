<template>
  <el-main>
    <div class="userwidth" style="padding-bottom: 90px">
      <el-container>
        <!--左边分类-->
        <!-- <project-tree @itemClick="onChangeProject" @slideNave="slideNave" /> -->
        <el-card class="box-card" shadow="never" :body-style="{ padding: '15px' }">
          <el-form label-position="right" label-width="120px" :model="formSearch" size="small">
            <el-row :gutter="12">
              <el-col :span="3">
                <!-- <el-form-item label="公告标题："> -->
                <el-input v-model="formSearch.NoticeTitle" placeholder="公告标题" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <!--<el-col :span="6">-->
              <!--<el-form-item label="公告显示模式：">-->
              <!--<el-select v-model="formSearch.ShowType">-->
              <!--<el-option-->
              <!--v-for="item in dropDown.showTypeDropDownList"-->
              <!--:key="item.value"-->
              <!--:value="item.value"-->
              <!--:label="item.text"-->
              <!--&gt;</el-option>-->
              <!--</el-select>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="3">
                <!-- <el-form-item label="报名状态："> -->
                <el-select v-model="formSearch.SignUpStatus" @change="selectChange">
                  <el-option
                    v-for="item in dropDown.statusDropDownList"
                    :key="item.value"
                    :value="item.value"
                    :label="item.text"
                  ></el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <!--<el-col :span="6">-->
              <!--<el-form-item label="经办人：">-->
              <!--<el-input v-model="formSearch.editUserName" placeholder="请输入经办人"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :offset="5" :span="3" class="text-right"> </el-col>-->
              <el-col :span="18">
                <el-button type="primary" size="small" @click="onSubmit" style="margin-left: 10px; float: right">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!--<div class="text-right" style="margin-top: 10px">-->
          <!--<el-button type="primary" size="small" @click="onSubmit">搜索</el-button>-->
          <!--</div>-->
          <div class="mt-2">
            <el-table
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData"
              v-loading="loading"
            >
              <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
              <el-table-column prop="projectName" label="所属组织" width="270px"> </el-table-column>
              <el-table-column prop="noticeTitle" label="公告标题" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpDetail(scope.row.baseId)">{{
                    scope.row.noticeTitle
                  }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="signUpEndDate" label="报名截止时间" align="center" width="170">
                <template slot-scope="scope">
                  <span>
                    {{ parseTime(scope.row.signUpEndDate, "yyyy-MM-dd") }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="已报名数量" align="center" width="100">
                <template slot-scope="scope">
                  <el-link type="primary" style="color: #409eff; text-decoration: none" @click="showSignUpList(scope.row.baseId)">{{
                    scope.row.signUpCount
                  }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="signUpStatus" label="报名状态" align="center" width="100"> </el-table-column>
              <!--<el-table-column prop="showType" label="显示模式" align="center" width="130"> </el-table-column>-->
            </el-table>
            <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
          </div>
          <el-dialog width="60%" title="已报名供应商列表" :visible.sync="dialogVisible">
            <el-tabs v-model="activeName">
              <el-tab-pane v-for="item in siginUpList" :key="item.sectionId" :label="item.sectionName" :name="item.sectionId">
                <el-table stripe border style="width: 100%" :data="item.supplierSignUpList">
                  <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
                  <el-table-column prop="comFullName" label="报名单位"> </el-table-column>
                  <el-table-column prop="signUpTime" width="250" label="报名时间" align="center"> </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-dialog>
        </el-card>
      </el-container>
    </div>
  </el-main>
</template>
<script>
import ProjectTree from "./components/ProjectTree";
import { parseTime } from "@/util";
export default {
  components: {
    ProjectTree,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      dropDownGroup: {},
      dialogVisible: false,
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      formSearch: {
        BaseId: "",
        ProjectId: "",
        OpenRegistration: "",
        NoticeTitle: "",
        SignUpStatus: "",
        SkipCount: 0,
        MaxResultCount: 15,
      },
      activeName: "",
      siginUpList: [],
      tableData: [],
      loading: false,
      dropDown: {},
    };
  },
  created() {
    let baseId = this.$route.params.baseId;
    if (baseId) {
      this.formSearch.BaseId = baseId;
    }
    this.GetBidNoticeList();

    this.$api.BidNotice.GetNoticeShowTypeDropDown01().then((res) => {
      this.dropDown = res;
    });
  },
  methods: {
    parseTime,
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.GetBidNoticeList();
    },
    onSubmit() {
      this.page.index = 1;
      this.GetBidNoticeList();
    },
    GetBidNoticeList() {
      // let that = this;
      // if (that.loading) {
      //   return;
      // }
      // that.tableData = [];
      this.loading = true;
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      // const query = {
      //   // SkipCount: (that.currentPage - 1) * that.page_size,
      //   // MaxResultCount: that.page_size,
      //   AddModeFlag: that.AddModeFlag,
      //   ...this.formSearch,
      // };
      this.$http
        .get("/BidNotice/GetBidNoticeList", { params: this.formSearch })
        .then((res) => {
          this.page.total = res.data.result.totalCount;
          this.tableData = res.data.result.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    selectChange() {
      this.page.index = 1;
      this.GetBidNoticeList();
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
     * 选择项目
     */
    // onChangeProject(project) {
    //   this.formSearch.ProjectId = project.id;
    //   this.onSubmit();
    // },
    /**
     * 查看详情
     */
    jumpDetail(id) {
      window.open(`#/bid/noticeDetail/${id}`);
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
<!--<style lang="scss" scoped>-->
<!--::v-deep .el-col-5 {-->
<!--  width: auto;-->
<!--}-->
<!--::v-deep .el-col-19 {-->
<!--  width: 79%;-->
<!--}-->
<!--</style>-->
