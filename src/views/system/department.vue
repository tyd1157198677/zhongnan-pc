<!--  -->
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
          element-loading-text="请稍候,数据正在加载中..."
          v-loading="loading1"
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
          <el-input v-model="name" style="width: 200px; margin-right: 10px" placeholder="请输入部门名称" />
          <!-- <el-select v-model="inUse" placeholder="请选择" style="margin-right:10px">
            <el-option label="可用" :value="true"></el-option>
            <el-option label="不可用" :value="false"></el-option>
          </el-select> -->
          <el-button type="primary" size="small" @click="search()">搜索</el-button>
          <el-button type="primary" size="small" style="float: right; margin-bottom: 10px" @click="addshow">新增项目</el-button>
        </div>
        <div class="card-cont" style="margin-top: 10px">
          <el-table
            stripe
            ref="tablebleref"
            :default-expand-all="true"
            v-loading="loading"
            :data="dataList"
            style="width: 100%; margin-bottom: 10px; z-index: 99; height: 418px; overflow-y: auto"
            row-key="subjectCode"
            border
            :cell-style="{ padding: '5px 0' }"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <template slot="empty">
              <span style="margin: 50% auto">暂无数据</span>
            </template>
            <el-table-column label="序号" width="80" type="index" align="center"> </el-table-column>
            <el-table-column align="center" min-width="120px" label="部门全称">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.deptFullName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="120px" label="部门编号">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.supDeptCode }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" min-width="120px" label="状态">
              <template slot-scope="scope">
                <span>{{ scope.row.orgName == true ? "可用" : "不可用" }}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" min-width="120px" label="操作">
              <template slot-scope="scope">
                <el-switch
                v-model="scope.row.inuse"
                @change="handleEdit(scope.row)"
                title="是否可用"
                style="margin-left: 15px"
                :width="35"
                active-color="#409eff"
                inactive-color="#dcdfe6">
              </el-switch>
              </template>
            </el-table-column> -->
            <el-table-column label="排序" align="center" width="100">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入排序"
                  type="number"
                  v-model="scope.row.showOrder"
                  @input="SaveOrganizeOrder(scope.row.id, scope.row.showOrder)"
                  :min="1"
                  :max="9999"
                />
              </template>
            </el-table-column>
            <el-table-column label="是否可用" align="center" width="180" prop="inUse">
              <template slot-scope="scope">
                <el-radio-group @change="handleEdit(scope.row)" v-model="scope.row.status">
                  <el-radio label="1">可用</el-radio>
                  <el-radio label="0">不可用</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                <i @click="showedit(scope.row)" class="el-icon-edit" title="编辑" />
                <i @click="DeleteIdmOrganizeInfoById(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left: 5px" />
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="totalCount" :current-page="currentPage" :pageSize="page_size" @pageChange="pageChange" />
        </div> </el-card
      ><el-dialog :title="boxTitle" :visible.sync="dialogFormVisible" width="60%">
        <el-form ref="options" :model="options" label-width="130px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属组织" prop="parentType">
                <!-- <el-input v-model="options.parentType" placeholder="请选择所属组织"></el-input> -->
                <el-input v-if="canedit" v-model.trim="options.orgName" placeholder="请选择所属组织" @focus="subJectAdd"></el-input>
                <el-input v-else v-model="options.orgName" placeholder="请选择所属组织" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门全称" prop="deptFullName">
                <el-input v-model="options.deptFullName" placeholder="请输入部门全称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门简称" prop="deptShortName">
                <el-input v-model="options.deptShortName" placeholder="请输入部门简称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门编号" prop="deptCode">
                <el-input v-model="options.deptCode" placeholder="请输入部门编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序编号" prop="showOrder">
                <el-input v-model="options.showOrder" placeholder="请输入排序编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否可用" prop="status">
                <el-radio-group v-model="options.status">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="close">取 消</el-button>
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
import subJectTree from "@/views/bid/components/subJectTreedep";
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
        parentType: "",
        id: "",
        deptFullName: "",
        deptShortName: "",
        deptCode: "",
        showOrder: "",
        status: "",
        supDeptCode: "",
        orgName: "",
      },
      canedit: false,
      sysTreeCateTypeW: "300px", // 项目树宽度
      sysTreeCateType: [], // 项目树
      orgTypeNode: null, // 声明选择节点
      ComName: "", //项目名字
      defaultProps: {
        children: "children",
        label: "comName",
      },
      name: "",
      open: true, // 侧边导航是否显示
      boxTitle: "",
      rules: {
        // parentType: [{ required: true, message: "请选择所属组织", trigger: "blur" }],
        deptFullName: [{ required: true, message: "请输入部门全称", trigger: "blur" }],
        deptShortName: [{ required: true, message: "请输入部门简称", trigger: "blur" }],
        deptCode: [{ required: true, message: "请输入部门编号", trigger: "blur" }],
        showOrder: [{ required: true, message: "请输入排序编号", trigger: "blur" }],
        status: [{ required: true, message: "请选择是否可用", trigger: "blur" }],
      },
      dialogFormpeople: false,
      returnValue: "",
      orgTypeGuid: "",
      subCompanyCode: "",
      content: "",
      inUse: true,
      dataList: [],
      loading: false,
      loading1: false,
      currentPage: 1,
      page_size: 15,
      totalCount: 15,
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
    fetchDepTree() {
      this.$http.get("/IdmOrganizeInfo/GetOrganizeTree", { params: { haveProject: true, haveDepartment: true } }).then((res) => {
        this.depData = res.data;
        this.$nextTick(() => {
          this.multipleSelection = [res.data[0].id];
        });
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.orgType.indexOf(value) !== -1;
    },
    /**
     * 获取指定orgType的所有id
     */
    getDefaultExpandedKeys(orgTypes, node) {
      let ids = [];
      const { orgType, id } = node;
      if (orgTypes.indexOf(orgType) > -1) {
        ids.push(id);
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
      // if (!data.orgType == "城市公司") {
      //   // this.$message.warning("请选择项目或分期！");
      //   this.$alert("请选择城市公司！", {
      //     confirmButtonText: "确定",
      //   });
      // } else {
      //   this.$emit("itemClick", data);
      this.options.supDeptCode = data.subCompanyCode;
      this.options.parentType = data.orgType;
      this.options.orgName = data.comName;
      this.dialogVisible = false;
      // }
    },
    // 获取织机构类型
    async GetOrganizeTree() {
      this.loading1 = true;
      let res = await this.$http.get("/IdmOrganizeInfo/GetOrganizeTree", { params: { haveProject: true, haveDepartment: true } });
      this.sysTreeCateType = res.data;
      if (res.data.length > 0) {
        this.$nextTick(() => {
          this.multipleSelection1 = [res.data[0].id];
          this.orgTypeGuid = res.data[0].children.id;
          this.subCompanyCode = res.data[0].children[0].subCompanyCode;
        });
      }
      this.loading1 = false;
      this.GetUserList();
    },
    // 获取列表
    async GetUserList() {
      let obj = {
        ParentType: "",
        ParentCode: "",
        Name: this.name,
        SkipCount: (this.currentPage - 1) * this.page_size,
        MaxResultCount: this.page_size,
      };
      let res = await this.$http.get("/IdmDepartmentInfo/GetDepartmentList", { params: obj });
      this.totalCount = res.data.totalCount;
      this.dataList = res.data.items;
      console.log(res.data);
    },
    pageChange(page) {
      this.page_size = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetUserList();
    },
    handleEdit(row) {
      let obj = {
        id: row.id,
        // inUse: row.inUse,
      };
      this.$http.post("/IdmDepartmentInfo/ChangeStatus", obj).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetUserList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    close() {
      this.dialogFormVisible = false;
      this.GetUserList();
    },
    search() {
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
      this.options.supDeptCode = sub.subCompanyCode;
      this.options.parentType = sub.orgType;
      console.log(this.options.parentType);
      console.log(this.options.supDeptCode);
      this.$refs.subJectTree.close();
    },
    subJectAdd() {
      //   this.$refs.subJectTree.open();
      this.dialogVisible = true;
      this.fetchDepTree();
    },
    DeleteIdmOrganizeInfoById(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("IdmDepartmentInfo/DelDepartment", { id: id }).then((res) => {
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
      if (this.options.parentType == "" || this.options.parentType == null) {
        this.$alert("请选择所属组织", {
          confirmButtonText: "确定",
        });
      } else {
        this.$refs.options.validate((valid) => {
          if (valid) {
            this.$http.post("/IdmDepartmentInfo/InsterOrUpdateDepartment", this.options).then((res) => {
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
      this.$http.post("/IdmDepartmentInfo/UpdateOrder", arr).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.GetUserList();
        }
      });
    },
    addshow() {
      this.boxTitle = "新增项目";
      this.dialogFormVisible = true;
      this.options = {};
      //   this.options.status = "1";
      this.canedit = true;
    },
    showedit(row) {
      this.dialogFormVisible = true;
      this.options.deptCode = row.deptCode;
      this.options.id = row.id;
      this.options.parentType = row.parentType;
      this.options.deptFullName = row.deptFullName;
      this.options.deptShortName = row.deptShortName;
      this.options.showOrder = row.showOrder;
      this.options.status = row.status;
      this.options.supDeptCode = row.supDeptCode;
      this.options.departentName = row.departentName;
      this.boxTitle = "编辑项目";
      this.canedit = false;
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
      that.subCompanyCode = s.subCompanyCode;
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
::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #409eff;
  color: #fff;
}
::v-deep .el-tree {
  display: inline-block;
}
::v-deep .el-table {
  font-size: 15px;
  font-weight: 540;
}
</style>
