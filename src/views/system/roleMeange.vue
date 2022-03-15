<template>
  <div>
    <el-select style="margin-bottom: 10px" v-model="roleType" @change="reatype">
      <el-option label="全部" value=""></el-option>
      <el-option label="普通角色" value="普通角色"></el-option>
      <el-option label="审批角色" value="审批角色"></el-option>
    </el-select>
    <div class="rolse">
      <el-aside width="230px">
        <div class="left">
          <div
            :style="{ background: indexactive == index ? '#409eff' : '#fff', color: indexactive == index ? '#FFF' : '' }"
            @click="clickLeft(item, index)"
            class="item"
            v-for="(item, index) in roleList1"
            :key="item.value"
          >
            {{ item.roleName }}
          </div>
        </div>
      </el-aside>
      <!-- <el-main> -->
      <div class="right">
        <!-- <el-aside width="180px" style="border-right:1px solid #ccc;">
        <el-tree
          ref="ProjectTree"
          :data="sysTreeCateType"
          :props="defaultProps"
          highlight-current
          v-loading="loading"
          element-loading-text="请稍候,数据正在加载中..."
          node-key="id"
          check-on-click-node
          @node-click="selectedType"
          :current-node-key="orgTypeGuid"
          default-expand-all
        ></el-tree>
      </el-aside> -->
        <el-main style="padding: 0 10px">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <div style="float: left; margin-bottom: 10px" v-if="activeName == '新增人员'">
              <el-input v-model="content" style="width: 200px; margin-right: 10px" placeholder="请输入姓名或邮箱或手机号" clearable />
              <el-button type="primary" size="small" @click="search(content)">搜索</el-button>
            </div>
            <div style="float: left; margin-bottom: 10px" v-if="activeName == '已设人员'">
              <el-input v-model="content1" style="width: 200px; margin-right: 10px" placeholder="请输入姓名或邮箱或手机号" clearable />
              <el-button type="primary" size="small" @click="search(content1)">搜索</el-button>
            </div>
            <div style="float: right" v-if="activeName == '新增人员'">
              <el-button type="primary" size="small" @click="dialogFormVisible = true">选择组织机构</el-button>
            </div>
            <el-tab-pane label="已设人员" name="已设人员">
              <el-table
                style="width: 100%"
                stripe
                empty-text="暂无数据"
                v-loading="loading"
                :data="tableData"
                element-loading-text="请稍候,数据正在加载中..."
                border
                height="400"
              >
                <el-table-column type="index" label="序号" width="55" align="center"> </el-table-column>
                <el-table-column prop="userName" label="姓名" align="center"> </el-table-column>
                <el-table-column prop="loginId" label="登录名" align="center"> </el-table-column>
                <!-- <el-table-column prop="orgName" label="所属组织" align="center"> </el-table-column> -->
                <el-table-column prop="depName" label="所属组织" align="center"> </el-table-column>
                <el-table-column prop="positionName" label="岗位名称" align="center"> </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <i @click="deletes(scope.row.id)" class="el-icon-delete" title="删除" />
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="新增人员" name="新增人员">
              <el-table
                style="width: 100%"
                stripe
                empty-text="暂无数据"
                v-loading="loading"
                :data="tableData"
                element-loading-text="请稍候,数据正在加载中..."
                border
                height="400"
                ref="multipleTable"
                @select="handleSelectionChange"
              >
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column type="index" label="序号" width="55" align="center"> </el-table-column>
                <el-table-column prop="userName" label="姓名" align="center"> </el-table-column>
                <el-table-column prop="loginId" label="登录名" align="center"> </el-table-column>
                <el-table-column prop="orgName" label="所属组织" align="center"> </el-table-column>
                <el-table-column prop="depName" label="所属部门" align="center"> </el-table-column>
                <el-table-column prop="positionName" label="岗位名称" align="center"> </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>

          <pagination
            style="width: 60%; float: right; margin-right: 20px"
            :total="totalCount"
            :current-page="currentPage"
            :pageSize="pageSize"
            @pageChange="pageChange"
          />
        </el-main>
      </div>
      <!-- </el-main> -->
      <el-dialog title="选择组织机构" :visible.sync="dialogFormVisible">
        <el-tree
          ref="ProjectTree"
          :data="sysTreeCateType"
          :props="defaultProps"
          highlight-current
          v-loading="loading"
          element-loading-text="请稍候,数据正在加载中..."
          node-key="id"
          check-on-click-node
          @node-click="selectedType"
          :current-node-key="orgTypeGuid"
          default-expand-all
        ></el-tree>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      dialogFormVisible: false,
      activeName: "已设人员",
      roleList1: [],
      indexactive: 0,
      roleType: "",
      content: "", //搜索内容
      content1: "",
      tableData: [],
      orderList: [],
      loading: false,
      value: "",
      sysTreeCateType: [], // 项目树
      projectIds1: [], // 项目树
      orgTypeNode: null, // 声明选择节点
      ComName: "", //项目名字
      defaultProps: {
        children: "children",
        label: "comName",
      },
      dialogFormpeople: false,
      returnValue: "",
      orgTypeGuid: "",
      subCompanyCode: "",
      pageSize: 15,
      currentPage: 1,
      totalCount: 0,
    };
  },
  mounted() {
    this.GetRoleList();
  },
  methods: {
    async GetRoleList() {
      this.loading = true;
      let res = await this.$http.get("/Role/GetRoleList", { params: { RoleType: this.roleType } });
      if (res.status == 200) {
        this.loading = false;
        this.roleList1 = res.data;
        this.value = res.data.length > 0 ? res.data[0].id : "";
        this.GetRoleUserList();
      }
    },
    reatype() {
      this.GetRoleList();
    },
    // 获取织机构类型
    async GetOrganizeTree() {
      this.loading = true;
      let res = await this.$http.get("/IdmOrganizeInfo/GetOrganizeTree", { haveProject: true });
      if (res.status == 200) {
        this.loading = false;
        this.sysTreeCateType = res.data;
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
      that.orgTypeNode.judgePart = judgePart;
      that.subCompanyCode = s.subCompanyCode;
      that.currentPage = 1;
      that.dialogFormVisible = false;
      that.GetRoleUserList();
    },
    currentChecked(val, e) {
      this.projectIds1 = e.checkedKeys;
    },
    ///app/RoleUser/GetThisRoleUserList
    async GetRoleUserList() {
      let obj = {
        RoleId: this.value,
        // UserNamePhoneEmail: this.content,
        UserNamePhoneEmail: this.content1,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
      };
      let obj1 = {
        RoleId: this.value,
        UserNamePhoneEmail: this.content,
        // UserNamePhoneEmail: this.content1,
        SubCompanyCode: this.subCompanyCode,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
      };
      this.loading = true;
      if (this.activeName == "已设人员") {
        let res = await this.$http.get("/RoleUser/GetThisRoleUserList", { params: obj });
        console.log(res);
        if (res.status == 200) {
          (this.content = ""),
            // this.content1 = "",
            (this.loading = false);
          this.tableData = res.data.items;
          this.totalCount = res.data.totalCount;
        }
      } else {
        this.GetOrganizeTree();
        let res = await this.$http.get("/RoleUser/GetRoleUserList", { params: obj1 });
        if (res.status == 200) {
          // this.content = "",
          (this.content1 = ""), (this.loading = false);
          this.$refs["multipleTable"].doLayout();
          this.tableData = res.data.items;
          this.totalCount = res.data.totalCount;
          let arr = res.data.items.filter((res) => {
            return res.isChecked == true;
          });
          this.$nextTick(() => {
            arr.forEach((row) => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          });
        }
      }
    },
    clickLeft(item, index) {
      this.indexactive = index;
      this.value = item.id;
      this.currentPage = 1;
      this.GetRoleUserList();
    },
    pageChange(page) {
      this.pageSize = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetRoleUserList();
    },
    handleSelectionChange(val, row) {
      row.isChecked = row.isChecked ? false : true;
      if (row.isChecked) {
        let obj = {
          roleId: this.value,
          userGuid: row.userGuid,
        };
        this.$http.post("/RoleUser/SaveRoleUserSingle", obj).then((res) => {
          res.status == 200 ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
        });
      } else {
        this.$http.post("/RoleUser/DeleteRoleUser", { id: row.id }).then((res) => {
          res.status == 200 ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
        });
      }
    },
    handleClick(e) {
      this.GetRoleUserList();
    },
    search(e) {
      this.currentPage = 1;
      this.GetRoleUserList();
    },
    deletes(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/RoleUser/DeleteRoleUser", { id }).then((res) => {
          res.status == 200 ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.GetRoleUserList();
        });
      });
      ///api/services/app/RoleUser/DeleteRoleUser id
      // this.GetMenuTree()
    },
  },
};
</script>
<style lang="scss" scoped>
.rolse {
  height: 550px;
  display: flex;
  // overflow: auto;
  .left {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
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
  }
  .right {
    width: 98.5%;
    height: 100%;
    border: 1px solid #ccc;
    display: flex;
    margin-left: 10px;
  }
}
::v-deep td.el-table_3_column_11.is-center.el-table-column--selection {
  padding: 0px !important;
}
::v-deep .el-checkbox:last-of-type {
  margin-bottom: 0px !important;
}
::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #409eff;
  color: #fff;
}
</style>
