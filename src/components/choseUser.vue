<!--  -->
<!--  -->
<template>
  <!-- <div class="userwidth"> -->
  <el-dialog width="80%" title="选择人员" :visible.sync="dialogVisible" top="5vh">
    <el-container element-loading-text="拼命加载中">
      <!--左边分类-->
      <div class="aside-wraper" style="height: 610px" v-loading="loading">
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
              :default-expanded-keys="multipleSelection2"
              :expand-on-click-node="false"
              @node-click="selectedType"
              :current-node-key="orgTypeGuid"
            ></el-tree>
          </div>
        </el-aside>
      </div>
      <!-- <el-main class="p-0 tabs"> -->
      <el-card class="box-card" shadow="never" :body-style="{ padding: '15px' }" style="margin-left: 10px">
        <div>
          <el-input v-model="content" style="width: 200px; margin-right: 10px" placeholder="请输入内容" />
          <el-button type="primary" size="small" @click="search(content)">搜索</el-button>
          <el-button type="primary" size="small" style="float: right" @click="makeSure">保存</el-button>
        </div>
        <div class="card-cont" style="margin-top: 10px">
          <el-table
            stripe
            ref="tablebleref"
            :default-expand-all="true"
            v-loading="loading1"
            element-loading-text="请稍候,数据正在加载中..."
            :data="dataList"
            style="width: 100%; margin-bottom: 10px; z-index: 99"
            row-key="subjectCode"
            border
            :cell-style="{ padding: '5px 0' }"
            @selection-change="handleSelectionChange"
          >
            <template slot="empty">
              <span style="margin: 50% auto">暂无数据</span>
            </template>
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="序号" width="80" type="index" align="center"> </el-table-column>
            <el-table-column align="center" width="120px" label="人员姓名">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120px" label="登录名">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.loginId }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="200px" label="岗位名称">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.positionName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="所属组织" show-overflow-tooltip>
              <template slot-scope="scope">
                <span :max-lines="2" class="sp">{{ scope.row.orgName }}</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="totalCount" :current-page="currentPage" :pageSize="page_size" @pageChange="pageChange" />
        </div>
      </el-card>
      <!-- </el-main> -->
    </el-container>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="makeSure">确 定</el-button>
    </span> -->
  </el-dialog>
  <!-- </div> -->
</template>

<script>
export default {
  props: ["type"],
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      dialogVisible: false,
      sysTreeCateTypeW: "300px", // 项目树宽度
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
      orgTypeGuid: "",
      subCompanyCode: "",
      content: "",
      multipleSelection: [],
      multipleSelection1: [],
      multipleSelection2: [],
      dataList: [],
      loading: false,
      loading1: false,
      currentPage: 1,
      page_size: 15,
      totalCount: 10,
      DeptCode: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    openfnc() {
      this.dialogVisible = true;
      this.GetOrganizeTree();
      this.GetUserList();
    },
    handleSelectionChange(val) {
      if (this.type == 1) {
        if (val.length > 1) {
          this.$refs.tablebleref.clearSelection();
          this.$refs.tablebleref.toggleRowSelection(val.pop());
        } else {
          this.multipleSelection = val.pop();
        }
        if (!this.multipleSelection) {
          this.multipleSelection = [];
        }
      } else {
        this.multipleSelection1 = val;
      }
    },
    makeSure() {
      if (this.type == 1) {
        if (this.multipleSelection) {
          this.$emit("itemClick", this.multipleSelection);
          this.dialogVisible = false;
        } else {
          this.$msg.warning("请勾选人员！");
        }
      } else {
        if (this.multipleSelection1.length > 0) {
          this.$emit("itemClick", this.multipleSelection1);
          this.dialogVisible = false;
        } else {
          this.$msg.warning("请勾选人员！");
        }
      }
    },
    // 获取织机构类型
    GetOrganizeTree() {
      this.loading = true;
      this.$http
        .get("/IdmOrganizeInfo/GetOrganizeTree", {
          params: {
            haveProject: true,
            haveDepartment: false,
          },
        })
        .then((res) => {
          this.loading = false;
          this.sysTreeCateType = res.data;
          if (res.data.length > 0) {
            this.$nextTick(() => {
              this.multipleSelection2 = [res.data[0].id];
            });
          }
        });
    },
    // 获取列表
    GetUserList() {
      let obj = {
        UserNameMobileEmail: this.content,
        SubCompanyCode: this.subCompanyCode,
        SkipCount: (this.currentPage - 1) * this.page_size,
        MaxResultCount: this.page_size,
        DeptCode: this.DeptCode,
      };
      this.loading1 = true;
      this.$http.get("/IdmUserInfo/GetUserList", { params: obj }).then((res) => {
        if (res.data.success) {
          this.loading1 = false;
          this.totalCount = res.data.result.totalCount;
          this.dataList = res.data.result.items;
        }
      });
    },
    search() {
      this.GetUserList();
    },
    key(opt) {
      this.$confirm("确定要将当前用户密码重置为123qwe吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/IdmUserInfo/ResetPassword", { id: opt.userGuid }).then((res) => {
          if (res.status == 200) {
            this.$confirm(res.data.message, "提示", {
              confirmButtonText: "确定",
              type: "success",
            }).then(() => {
              this.GetUserList();
            });
          } else {
            this.$confirm(res.data.message, "提示", {
              confirmButtonText: "确定",
              type: "error",
            }).then(() => {});
          }
        });
      });
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
        that.sysTreeCateTypeW = "300px";
      }
    },
    // 选择区域树
    selectedType(s) {
      console.log(123);
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
      if (s.orgType == "部门") {
        that.DeptCode = s.subCompanyCode;
        that.subCompanyCode = "";
      } else {
        that.DeptCode = "";
        that.subCompanyCode = s.subCompanyCode;
      }

      that.orgTypeNode.judgePart = judgePart;

      that.currentPage = 1;
      that.GetUserList();
      // if (that.orgTypeGuid && s.orgType === "区域") {
      //   that.subCompanyCode = s.subCompanyCode;
      //   that.currentPage = 1;
      //   that.GetUserList();
      // }
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
::v-deep .dialog-footer {
  text-align: right;
  padding-right: 35px;
}
.aside-wraper {
  position: relative;
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

.el-aside {
  transition: width 0.06s ease 0s;
}
.SideNavbtn {
  position: absolute;
  right: 8%;
  top: 10px;
  z-index: 100;
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
::v-deep .el-tree {
  display: inline-block;
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
