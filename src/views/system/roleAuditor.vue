<template>
  <!--应用权限设置页面-->
  <el-container style="overflow: hidden">
    <!--左边分类-->
    <el-aside width="200px" class="type-list" style="height: 635px">
      <div
        :style="{ background: indexactive == index ? '#409eff' : '#fff', color: indexactive == index ? '#FFF' : '' }"
        @click="clickLeft(item, index)"
        class="item"
        v-for="(item, index) in roleList1"
        :key="item.value"
      >
        {{ item.value }}
      </div>
    </el-aside>
    <!--右边列表-->
    <div style="width: 100%">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card class="box-card" shadow="never" :body-style="{ padding: '10px', height: '510px' }" style="margin-left: 5px">
            <el-row slot="header" type="flex" justify="space-between" align="middle">
              <div class="headertitle">已设人员</div>
            </el-row>
            <el-table
              :data="fileListyi"
              v-loading="loading"
              border
              stripe
              height="450"
              :row-style="{ height: '41px' }"
              :cell-style="{ padding: '6px' }"
              :header-cell-style="tableHeaderColor"
              style="width: 100%"
              row-key="id"
              ref="tableleft"
            >
              <el-table-column label="序号" align="center" width="70" type="index"> </el-table-column>
              <el-table-column label="姓名" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="登录名" align="center">
                <template slot-scope="scope" style="text-align: left">
                  <span>{{ scope.row.loginId }}</span>
                </template>
              </el-table-column>
              <el-table-column label="删除" align="center" width="70">
                <template slot-scope="scope">
                  <span><i icon="el-icon-delete"></i></span>
                  <el-button type="text" @click="postDelete(scope.row.id)" icon="el-icon-delete"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页-->
            <!--            <pagination-->
            <!--              :total="lefttotalCount"-->
            <!--              :current-page="leftCurrentPage"-->
            <!--              :pageSize="leftpagesize"-->
            <!--              :pageSizes="[5, 10, 20, 50]"-->
            <!--              @pageChange="leftpageChange"-->
            <!--            />-->
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card m-l-15" shadow="never" :body-style="{ padding: '10px', height: '510px' }">
            <el-row slot="header" type="flex" justify="space-between" align="middle">
              <div class="headertitle">新增人员</div>
              <div class="flex between">
                <el-input type="text" style="width: 90%" placeholder="请输入内容" clearable v-model="searchPersonNew"> </el-input>
                <el-button size="small" class="m-l-15" @click="rightsearchfnc(searchPersonNew)">搜索</el-button>
              </div>
            </el-row>
            <el-table
              :data="fileListNew"
              v-loading="loading"
              border
              stripe
              height="450"
              :row-style="{ height: '41px' }"
              :cell-style="{ padding: '6px' }"
              :header-cell-style="tableHeaderColor"
              style="width: 100%"
              row-key="id"
              ref="tablenew"
            >
              <el-table-column label="序号" align="center" width="70" type="index"></el-table-column>
              <el-table-column label="姓名" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="登录名" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.loginId }}</span>
                </template>
              </el-table-column>
              <el-table-column label="所属组织" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.orgName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="添加" align="center" width="70">
                <template slot-scope="scope">
                  <el-button type="text" @click="posAdd(scope.row.userGuid)" icon="el-icon-circle-check"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页-->
            <pagination
              :total="righttotalCount"
              :current-page="rightCurrentPage"
              :pageSize="rightpagesize"
              :pageSizes="[5, 10, 20, 50]"
              @pageChange="rightpageChange"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "parameterSettings",
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      indexactive: 0,
      roleList1: [],
      value: "",
      loading: true, // 表格状态
      searchPerson: "", // 搜索已设人员
      searchPersonNew: "", // 搜索新增人员
      fileListyi: [], // 已设人员列表
      fileListNew: [], // 新增人员列表
      disabledleft: true,
      disablednew: true,
      tablemultipleSelection: [], // 已设人员选中的
      tablemultipleSelectionNew: [], // 新增人员选中的
      leftCurrentPage: 1, // 默认页数
      lefttotalCount: 0,
      leftpagesize: 10,
      rightCurrentPage: 1, // 右侧默认页数
      righttotalCount: 0,
      rightpagesize: 10,
      currentRow: "", // 编辑权限当前行
      userId: "",
      // userRoleNamesSubStan: JSON.parse(this.$store.state.userRoleNamesSubStan), // 登录用户权限
    };
  },
  mounted() {
    // this.getallList();
    this.GetAuditUserType();
  },
  computed: {
    // 按多少条数据获取
    count() {
      if (this.files_count !== 10) {
        return this.files_count;
      }
      return this.$store.state.pageCount;
    },
  },
  methods: {
    clickLeft(item, index) {
      this.indexactive = index;
      this.value = item.value;
      // this.GetAuditUserType();
      this.getPageParameter();
      this.getPageNewPerson();
    },
    async GetAuditUserType() {
      let res = await this.$http.get("/SupAuditUser/GetAuditUserType");
      this.value = res.data.length > 0 ? res.data[0].value : "";
      this.roleList1 = res.data;
      this.getPageParameter();
      this.getPageNewPerson();
    },
    // 已设人员列表
    getPageParameter() {
      this.loading = true;
      const obj = {
        auditType: this.value,
      };
      this.$http
        .get("/SupAuditUser/GetAuditUserList", {
          params: obj,
        })
        .then((res) => {
          // this.lefttotalCount = res.data.totalCount;
          this.fileListyi = res.data;
          this.loading = false;
        });
    },
    // 新增人员列表
    getPageNewPerson() {
      this.loading = true;
      const obj = {
        SkipCount: (this.rightCurrentPage - 1) * this.rightpagesize,
        MaxResultCount: this.rightpagesize,
        SubCompanyCode: this.subCompanyCode,
        UserNameMobileEmail: this.searchPersonNew,
      };
      this.$http
        .get("/IdmUserInfo/GetUserList", {
          params: obj,
        })
        .then((res) => {
          this.righttotalCount = res.data.result.totalCount;
          this.fileListNew = res.data.result.items;
          this.loading = false;
        });
    },
    /*
     * 自定表格头部样式
     */
    tableHeaderColor() {
      return "background-color: #d3d3d3;color: #333;";
    },
    /*
     * 删除某一条数据
     */
    async postDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.post("/SupAuditUser/DeleteSupAuditUser", { id });
          this.getPageParameter();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /*
     * 新增某一条数据
     */
    posAdd(userGuid) {
      this.$http.post("/SupAuditUser/SaveSupAuditUserSingle", { userGuid, supAuditType: this.value }).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.getPageParameter();
          this.getPageNewPerson();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 新增人员搜索
    rightsearchfnc() {
      // this.rightCurrentPage = 1;
      this.rightCurrentPage = 1;
      this.rightpagesize = 10;
      this.getPageNewPerson();
    },
    // 已设人员分页
    leftpageChange(page) {
      this.leftpagesize = page._pageSize;
      this.leftCurrentPage = page._currentPage;
      this.getPageParameter();
    },
    // 新增人员分页
    rightpageChange(page) {
      this.rightpagesize = page._pageSize;
      this.rightCurrentPage = page._currentPage;
      this.getPageNewPerson();
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  height: 40px;
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  text-align: justify;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  //   font-weight: 550;
  font-size: 14px;
}
::v-deep.el-tabs__header .el-tabs__item:first-child {
  margin-left: 0px;
}
::v-deep.el-tabs--border-card > .el-tabs__header {
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  margin: 0;
  border-top: none;
}
::v-deep.el-card__header {
  padding: 10px 10px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
::v-deep.el-tabs__item.is-active {
  background: #fff !important;
  color: #409eff !important;
  margin-right: 1px;
}
::v-deep.el-tabs__header .el-tabs__item {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border: 1px solid #e4e7ed;
  margin-top: 0px;
  color: #333;
  margin-bottom: -1px;
}
::v-deep.el-tabs--border-card {
  background: #ffffff;
  border: 0px solid #dcdfe6;
}
::v-deep.el-tabs--border-card > .el-tabs__content {
  padding: 15px 0;
  overflow: inherit;
}
::v-deep.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
::v-deep.el-table th,
.el-table td {
  padding: 6px 0;
}
.el-table--group,
.el-table--border {
  border: 1px solid #ebeef5;
  height: 630px;
}
.type-list .list-ul .ul-li[data-v-44a1129a] {
  cursor: pointer;
  width: 90%;
}
::v-deep.type-list .list-ul .ul-li[data-v-44a1129a]:hover {
  width: 90%;
  height: 40px;
  padding-left: 15px;
  cursor: pointer;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
  background-color: rgb(211, 211, 211);
}
::v-deep.el-pager li {
  padding: 0 4px;
  background: #ffffff;
  vertical-align: top;
  display: inline-block;
  font-size: 13px;
  min-width: 24.5px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  margin: 0;
}
.type-list[data-v-44a1129a] {
  border: 1px solid #ebeef5;
  width: 100%;
  height: 100%;
  background: #fff;
}
.headertitle {
  padding-bottom: 5px;
  margin-top: -5px;
  font-size: 14px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/*分页样式*/
.paginationClass {
  width: 100%;
  text-align: right;
  padding: 15px 0;
}
.border-card {
  .el-table th,
  .el-table td {
    padding: 6px 0;
  }
}
/*列表样式*/
.type-list {
  border: 1px solid #ebeef5;
  width: 100%;
  height: 100%;
  background: #fff;
  .list-ul {
    width: 100%;
    .active-class {
      background: #409eff !important;
      color: #fff;
    }
    .ul-li {
      width: 90%;
      height: 40px;
      font-size: 14px;
      padding-left: 15px;
      line-height: 40px;
      border-bottom: 1px solid #ebeef5;
    }
    .ul-li:hover {
      width: 90%;
      height: 40px;
      padding-left: 15px;
      cursor: pointer;
      line-height: 40px;
      border-bottom: 1px solid #ebeef5;
      background-color: rgb(211, 211, 211);
    }
  }
}
.batch-set-button {
  position: absolute;
  top: -40px;
  right: 0;
  color: #ffffff;
  background-color: #409eff;
  border-color: #409eff;
}
::v-deep.tab_body {
  min-height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  border: 0px solid #e4e7ed;
  border-top: none;
}
</style>
