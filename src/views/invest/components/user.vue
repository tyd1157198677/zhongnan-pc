<!--  -->
<template>
  <div class="userwidth">
    <el-container>
      <!--左边分类-->
      <div class="aside-wraper">
        <div class="SideNavbtn" @click="slideNave()">
          <el-tooltip class="item" effect="dark" :content="open ? '收起' : '展开'" placement="top">
            <i class="color666" :class="open ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
          </el-tooltip>
        </div>
        <el-aside :width="sysTreeCateTypeW" :class="open ? 'type-list' : ''" style="margin-bottom: 10px">
          <div class="list-ul" v-if="sysTreeCateType.length > 0" v-show="open">
            <el-tree
              ref="ProjectTree"
              :data="sysTreeCateType"
              :props="defaultProps"
              highlight-current
              node-key="id"
              check-on-click-node
              @node-click="selectedType"
              :current-node-key="orgTypeGuid"
              default-expand-all
            ></el-tree>
          </div>
        </el-aside>
      </div>
      <el-main class="p-0 tabs">
        <el-card class="box-card" shadow="never" :body-style="{ padding: '15px' }" style="margin-left: 10px">
          <div>
            <el-input v-model="content" style="width: 200px; margin-right: 10px" placeholder="请输入内容" />
            <el-button type="primary" size="small" @click="GetUserList">搜索</el-button>
          </div>
          <div class="card-cont">
            <el-table
              stripe
              ref="tablebleref"
              :default-expand-all="true"
              v-loading="loading"
              :data="dataList"
              style="width: 100%; margin-bottom: 10px; z-index: 99"
              row-key="subjectCode"
              border
              :cell-style="{ padding: '5px 0' }"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <template slot="empty">
                <span style="margin: 50% auto">请选择左侧项目</span>
              </template>
              <el-table-column label="序号" width="80" type="index"> </el-table-column>
              <el-table-column align="center" min-width="120px" label="人员姓名">
                <template slot-scope="scope">
                  <span :max-lines="2">{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="120px" label="登录名">
                <template slot-scope="scope">
                  <span :max-lines="2">{{ scope.row.loginId }}</span>
                </template>
              </el-table-column>
              <!--<el-table-column align="center" min-width="120px" label="岗位名称">-->
              <!--<template slot-scope="scope">-->
              <!--<span :max-lines="2">{{ scope.row.orgName }}</span>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column align="center" min-width="120px" label="所属组织">-->
              <!--<template slot-scope="scope">-->
              <!--<span :max-lines="2">{{ scope.row.positionName }}</span>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column align="center" min-width="120px" label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="add(scope.row)">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="totalCount" :current-page="currentPage" :pageSize="page_size" @pageChange="pageChange" />
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      sysTreeCateTypeW: "250px", // 项目树宽度
      sysTreeCateType: [], // 项目树
      orgTypeNode: null, // 声明选择节点
      ComName: "", //项目名字
      defaultProps: {
        children: "children",
        label: "comName",
      },
      open: true, // 侧边导航是否显示
      boxTitle: "装配式建筑 — 组价明细",
      dialogFormpeople: false,
      returnValue: "",
      orgTypeGuid: "",
      subCompanyCode: "",
      content: "",
      dataList: [],
      loading: false,
      currentPage: 1,
      page_size: 15,
      totalCount: 10,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetOrganizeTree();
  },
  methods: {
    add(row) {
      this.$emit("itemClick", row);
    },
    // 获取织机构类型
    async GetOrganizeTree() {
      let res = await this.$http.get("/IdmOrganizeInfo/GetOrganizeTree", { haveProject: true });
      this.sysTreeCateType = res.data;
      this.orgTypeGuid = res.data[0].children[0].id;
      this.subCompanyCode = res.data[0].children[0].subCompanyCode;
      this.GetUserList();
    },
    // 获取列表
    async GetUserList() {
      let obj = {
        UserNameMobileEmail: this.content,
        SubCompanyCode: this.subCompanyCode,
        SkipCount: (this.currentPage - 1) * this.page_size,
        MaxResultCount: this.page_size,
      };
      let res = await this.$http.get("/IdmUserInfo/GetUserList", { params: obj });
      this.totalCount = res.data.result.totalCount;
      this.dataList = res.data.result.items;
      console.log(res.data);
    },
    pageChange(page) {
      this.page_size = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetUserList();
    },
    // 测导航显示隐藏
    slideNave() {
      let that = this;
      that.open = !that.open;
      if (!that.open) {
        that.sysTreeCateTypeW = "25px";
      } else {
        that.sysTreeCateTypeW = "250px";
      }
    },
    // 选择区域树
    selectedType(s) {
      // 判断是否为分期节点
      let that = this;
      let judgePart = false;
      if (!that.sysTreeCateType[0].children.length) {
        judgePart = false;
      } else {
        // 判断一二三级节点
        const childStatus = that.sysTreeCateType[0].children.some((m) => {
          return m.id === s.parentId;
        });
        judgePart = !(s.id === that.sysTreeCateType[0].id || s.parentId === that.sysTreeCateType[0].id || childStatus);
      }
      that.orgTypeNode = s;
      that.orgTypeGuid = s.id;
      that.orgTypeGuid = s.id;
      that.orgTypeNode.judgePart = judgePart;
      if (that.orgTypeGuid && s.orgType === "区域") {
        that.subCompanyCode = s.subCompanyCode;
        that.currentPage = 1;
        that.GetUserList();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.userwidth {
  // width: 88%;
  margin: 0 auto 15vh;
}
.title {
  font-weight: 600;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-top: -5px;
}
.aside-wraper {
  position: relative;
}
/*::v-deep.el-table .warning_row {*/
/*  background: #dbe8f7;*/
/*}*/
::v-deep.el-table .warning_row1 {
  background: #f8fbfe;
}
::v-deep .el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #00a59f;
}
::v-deep .dialog-footer {
  text-align: right;
  padding-right: 35px;
}
::v-deep .el-table thead.is-group th {
  padding: 10px 0;
  color: #000;
  background: rgba(192, 192, 192, 1);
}
::v-deep .el-table th.is-leaf {
  border-bottom: 1px solid #333;
  background: #909399;
  color: #000;
  background: silver;
}
.aside-wraper {
  position: relative;
}

::v-deep.el-table .cell {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 18px;
  padding-left: 0px;
  padding-right: 0px;
}
::v-deep .el-card__header {
  display: block;
}
::v-deep .el-dialog {
  width: 35%;
}
::v-deep .btns {
  text-align: right;
}
::v-deep.odd td {
  background: #fafafa;
}
.el-table {
  font-size: 15px;
  font-weight: 540;
  color: #606266;
}
.el-table th,
.el-table td {
  padding: 10px 0;
}
.el-table--border th:first-child .cell,
.el-table--border td:first-child .cell {
  padding-left: 0px;
}
::v-deep.el-table th > .cell {
  padding-left: 0px;
  padding-right: 0px;
}
.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
.el-aside {
  transition: width 0.06s ease 0s;
}
.SideNavbtn {
  position: absolute;
  right: 8%;
  top: 10px;
  z-index: 100;
}
::v-deep.table .el-table__fixed {
  height: auto !important;
  bottom: 17px;
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
      color: #fff;
    }
    .ul-li {
      width: 90%;
      height: 40px;
      cursor: pointer;
      padding-left: 15px;
      line-height: 40px;
      border-bottom: 1px solid #ebeef5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #409eff;
  color: #fff;
}
::v-deep .el-table {
  font-size: 15px;
  font-weight: 540;
}
</style>
