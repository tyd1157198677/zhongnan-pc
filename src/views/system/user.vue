<template>
  <div class="userwidth">
    <el-container>
      <!--左边分类-->
      <div class="aside-wraper" style="height: 600px">
        <div class="SideNavbtn" @click="slideNave()">
          <el-tooltip class="item" effect="dark" :content="open ? '收起' : '展开'" placement="top">
            <i class="color666" :class="open ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
          </el-tooltip>
        </div>
        <el-aside
          v-loading="loading"
          element-loading-text="拼命加载中"
          :width="sysTreeCateTypeW"
          :class="open ? 'type-list' : ''"
          style="margin-bottom: 10px"
        >
          <div class="list-ul" v-if="sysTreeCateType.length > 0" v-show="open">
            <el-tree
              ref="ProjectTree"
              :data="sysTreeCateType"
              :props="defaultProps"
              highlight-current
              node-key="id"
              :expand-on-click-node="false"
              @node-click="selectedType"
              :current-node-key="orgTypeGuid"
              :default-expanded-keys="multipleSelection1"
            ></el-tree>
          </div>
        </el-aside>
      </div>
      <!-- <el-main class="p-0 tabs"> -->
      <el-card class="box-card" shadow="never" :body-style="{ padding: '15px' }" style="margin-left: 10px">
        <div>
          <el-input v-model="content" style="width: 200px; margin-right: 10px" placeholder="请输入内容" />
          <el-button type="primary" size="small" @click="search(content)">搜索</el-button>
          <!-- <el-button type="primary" size="small" style="float: right; margin-bottom: 10px" @click="addshow">新增项目</el-button> -->
        </div>
        <div class="card-cont" style="margin-top: 10px">
          <el-table
            stripe
            ref="tablebleref"
            :default-expand-all="true"
            element-loading-text="拼命加载中"
            v-loading="loading"
            :data="dataList"
            style="width: 100%; margin-bottom: 10px; z-index: 99"
            row-key="subjectCode"
            border
            :cell-style="{ padding: '5px 0' }"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <template slot="empty">
              <span style="margin: 50% auto">暂无数据</span>
            </template>
            <el-table-column label="序号" width="80" type="index" align="center"> </el-table-column>
            <el-table-column align="center" width="100px" label="人员姓名">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="100px" label="登录名">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.loginId }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" min-width="200px" label="岗位名称">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.positionName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="其他兼岗" min-width="200px">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.otherPositionNames }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                <i class="el-icon-key" title="重置密码" @click="key(scope.row)"></i>
                <!-- <i @click="showedit(scope.row.userGuid)" class="el-icon-edit" title="编辑" style="margin-left: 5px" /> -->
                <!-- <i @click="DeleteIdmOrganizeInfoById(scope.row.userGuid)" class="el-icon-delete" title="删除" style="margin-left: 5px" /> -->
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="totalCount" :current-page="currentPage" :pageSize="page_size" @pageChange="pageChange" />
        </div>
      </el-card>
      <el-dialog :title="boxTitle" :visible.sync="dialogFormVisible" width="60%">
        <el-form ref="options" :model="options" label-width="130px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属组织" prop="departmentCode">
                <!-- <el-input v-model="options.departmentCode" placeholder="请输入部门编码"></el-input> -->
                <el-input v-model.trim="options.orgName" placeholder="请输入所属组织" @focus="subJectAdd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="options.userName" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="options.mobile" placeholder="请输入手机号" maxlength="11"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="options.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登录名" prop="loginId">
                <el-input v-model="options.loginId" placeholder="请输入登录名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="submitForm('options')">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog width="50%" height="80%" title="" :visible.sync="dialogVisible">
        <el-row>
          <el-col>
            <div class="card">
              <ul class="list-group list-group-flush">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable class="p-2"> </el-input>
                <el-tree
                  style="height: 400px; overflow: scroll"
                  ref="tree1"
                  :data="depData"
                  node-key="id"
                  :expand-on-click-node="false"
                  :filter-node-method="filterNode"
                  :default-expanded-keys="multipleSelection"
                  :props="defaultProps1"
                  :highlight-current="true"
                  @node-click="handleNodeClick"
                >
                </el-tree>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
      <subJectTree title="请选择" ref="subJectTree" @itemClick="subJectTree"></subJectTree>
      <!-- </el-main> -->
    </el-container>
  </div>
</template>

<script>
import subJectTree from "@/views/bid/components/subJectTreeuser";
export default {
  components: {
    subJectTree,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      multipleSelection: [],
      multipleSelection1: [],
      depData: [],
      defaultShowNodes: [],
      defaultProps1: {
        children: "children",
        label: "comShortName",
      },
      filterText: "",
      options: {
        mobile: "",
        departmentCode: "",
        userName: "",
        userGuid: "",
        email: "",
        loginId: "",
        orgName: "",
      },
      sysTreeCateTypeW: "300px", // 项目树宽度
      sysTreeCateType: [], // 项目树
      orgTypeNode: null, // 声明选择节点
      ComName: "", //项目名字
      defaultProps: {
        children: "children",
        label: "comName",
      },
      open: true, // 侧边导航是否显示
      boxTitle: "",
      rules: {
        // departmentCode: [{ required: true, message: "请选择部门编码", trigger: "blur" }],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        loginId: [{ required: true, message: "请输入登录名", trigger: "blur" }],
      },
      dialogFormpeople: false,
      returnValue: "",
      orgTypeGuid: "",
      subCompanyCode: "",
      content: "",
      dataList: [],
      loading: false,
      currentPage: 1,
      page_size: 15,
      totalCount: 15,
      DeptCode: "",
    };
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree1.filter(val);
    },
  },
  created() {},
  mounted() {
    this.GetOrganizeTree();
  },
  methods: {
    /**
     * 加载树
     */
    fetchDepTree() {
      this.$http
        .get("/IdmOrganizeInfo/GetOrganizeTree", {
          params: {
            haveProject: true,
            haveDepartment: true,
          },
        })
        .then((res) => {
          this.depData = res.data;
          this.$nextTick(() => {
            this.multipleSelection = [res.data[0].id];
          });
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.subCompanyCode.indexOf(value) !== -1;
    },
    /**
     * 获取指定orgType的所有id
     */
    getDefaultExpandedKeys(orgTypes, node) {
      let ids = [];
      const { orgType, subCompanyCode } = node;
      if (orgTypes.indexOf(orgType) > -1) {
        ids.push(subCompanyCode);
      }
      if (node.children) {
        node.children.forEach((c) => {
          const subIds = this.getDefaultExpandedKeys(orgTypes, c);
          ids = ids.concat(subIds);
        });
      }
      return ids;
    },
    handleNodeClick(data) {
      if (data.orgType != "部门") {
        // this.$message.warning("请选择项目或分期！");
        this.$alert("请选择部门！", {
          confirmButtonText: "确定",
        });
      } else {
        // this.$emit("itemClick", data);
        this.options.orgName = data.comName;
        this.options.departmentCode = data.subCompanyCode;
        this.dialogVisible = false;
      }
    },
    // 获取织机构类型
    GetOrganizeTree() {
      this.loading = true;
      this.$http
        .get("/IdmOrganizeInfo/GetOrganizeTree", {
          params: {
            haveProject: true,
            haveDepartment: true,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.loading = false;
            if (res.data.length > 0) {
              this.$nextTick(() => {
                this.multipleSelection1 = [res.data[0].id];
                this.sysTreeCateType = res.data;
              });
            }
          }
          this.GetUserList();
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
      this.loading = true;
      this.$http.get("/IdmUserInfo/GetUserList", { params: obj }).then((res) => {
        if (res.data.success) {
          this.loading = false;
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
    subJectTree(sub) {
      // this.options.orgId = sub.id;
      this.options.departmentCode = sub.subCompanyCode;
      console.log(this.options.departmentCode);
      this.$refs.subJectTree.close();
    },
    subJectAdd() {
      // this.$refs.subJectTree.open();
      this.dialogVisible = true;
      this.fetchDepTree();
    },
    DeleteIdmOrganizeInfoById(userGuid) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("/IdmUserInfo/DeleteByUserByUserGuid", { id: userGuid }).then((res) => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.GetUserList();
            } else {
              this.$msg.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.globalMessage = this.$msg({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    submitForm(options) {
      if (this.options.departmentCode == "" || this.options.departmentCode == null) {
        this.$alert("请选择所属组织", {
          confirmButtonText: "确定",
        });
      } else {
        this.$refs.options.validate((valid) => {
          if (valid) {
            this.$http.post("IdmUserInfo/InsertOrUpdateUserInfo", this.options).then((res) => {
              // InsertOrUpdateIdmOrganize(this.options).then(res => {
              console.log(this.options);
              if (res.data.success) {
                this.$msg.success(res.data.message);
                this.dialogFormVisible = false;
                this.$refs.options.resetFields();
                this.GetUserList();
              } else {
                this.$msg.error(res.data.message);
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    SaveOrganizeOrder(id, showOrder) {
      let arr = this.dataList.map((v) => {
        return {
          id: id,
          showOrder: showOrder,
        };
      });
      this.$http.post("/ProjectMaster/UpdateOrder", arr).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.GetUserList();
        }
      });
      // }
    },
    addshow() {
      this.boxTitle = "新增项目";
      this.dialogFormVisible = true;
      this.options = {};
    },
    showedit(userGuid) {
      this.$http.get("/IdmUserInfo/GetOneByUserGuid", { params: { userGuid: userGuid } }).then((res) => {
        console.log(res.data);
        this.options.userName = res.data.userName;
        this.options.userGuid = res.data.userGuid;
        this.options.mobile = res.data.mobile;
        this.options.email = res.data.email;
        this.options.loginId = res.data.loginId;
        this.options.departmentCode = res.data.departmentCode;
        this.options.orgName = res.data.departentName;
        this.dialogFormVisible = true;
        this.boxTitle = "编辑项目";
      });
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
      that.orgTypeGuid = s.id;
      that.orgTypeGuid = s.id;
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
/*::v-deep.el-table .warning_row {*/
/*  background: #dbe8f7;*/
/*}*/

::v-deep .dialog-footer {
  text-align: right;
  padding-right: 35px;
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
::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #409eff;
  color: #fff;
}
::v-deep .el-table {
  font-size: 15px;
  font-weight: 540;
}
::v-deep .el-tree {
  display: inline-block;
}
</style>
