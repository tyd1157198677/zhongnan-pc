<template>
  <el-card style="margin-bottom: 10px">
    <el-select style="margin-bottom: 10px" v-model="roleType" @change="reatype">
      <el-option label="全部" value=""></el-option>
      <el-option label="普通角色" value="普通角色"></el-option>
      <el-option label="审批角色" value="审批角色"></el-option>
    </el-select>
    <div class="rolse">
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
      <div class="right">
        <el-button size="small" type="primary" @click="saveRolses" class="save"> 保 存</el-button>
        <br />
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange" style="margin-top: 10px">全选</el-checkbox>
        <el-tree :props="props" :data="data" node-key="name" ref="tree" show-checkbox @check-change="handleCheckChange"> </el-tree>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      roleList1: [],
      roleType: "",
      checkList: [],
      buttonNameList: [], //所有的buttonNameList
      indexactive: 0,
      content: "", //搜索内容
      tableData: [],
      projectIds: [],
      loading: false,
      value: "",
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      sysTreeCateType: [], // 项目树
      projectIds1: [], // 项目树
      orgTypeNode: null, // 声明选择节点
      ComName: "", //项目名字
      returnValue: "",
      orgTypeGuid: "",
      SubCompanyCode: "",
      props: {
        label: "name",
        children: "zones",
      },
      data: [],
      checkAll: false,
      data2: [],
      data3: [],
    };
  },
  mounted() {
    this.GetRoleList();
  },
  methods: {
    setCheckedNodes(data) {
      this.$refs.tree.setCheckedKeys(data);
    },
    handleCheckAllChange() {
      if (this.checkAll) {
        console.log(this.data2);
        this.$refs.tree.setCheckedKeys(this.data2);
      } else {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    handleCheckChange(data, checked, indeterminate) {},
    async GetRoleList() {
      this.loading = true;
      let res = await this.$http.get("/Role/GetRoleList", { params: { RoleType: this.roleType } });
      if (res.status == 200) {
        this.loading = false;
        this.roleList1 = res.data;
        this.value = res.data.length > 0 ? res.data[0].id : "";
        this.GetMenuTree();
      }
    },
    reatype() {
      this.GetRoleList();
    },
    // 获取织机构类型
    async GetMenuTree() {
      let res = await this.$http.get("/Role/GetProcessList01");
      if (res.status == 200) {
        this.data = [];
        for (var i = 0; i < res.data.length; i++) {
          var a = {};
          a.name = res.data[i];
          this.data.push(a);
        }
        this.data2 = res.data;
        this.GetRoleProcess02();
      }
    },
    async GetRoleProcess02() {
      let res = await this.$http.get("/Role/GetRoleProcess02", { params: { roleId: this.value } });
      if (res.status == 200) {
        if (res.data.length == this.data.length) {
          this.checkAll = true;
        }
        this.setCheckedNodes(res.data);
      }
    },
    //选择节点树

    selectedType(val, e) {
      this.projectIds = e.checkedKeys;
    },
    async saveRolses() {
      var s = this.$refs.tree.getCheckedNodes();
      var p = [];
      for (var i = 0; i < s.length; i++) {
        p.push(s[i].name);
      }
      let obj = {
        roleId: this.value,
        processNameList: p,
      };
      let res = await this.$http.post("/Role/SaveRoleBidProcess03", obj);
      res.status == 200 ? this.$message.success(res.message || res.data.message) : this.$message.error(res.message || res.data.message);
    },
    handleSelectionChange(val) {
      this.tableIdList = val.map((v) => {
        return v.tableId;
      });
      // console.log(this.tableIdList)
    },
    clickLeft(item, index) {
      this.indexactive = index;
      this.value = item.id;
      this.GetMenuTree();
      this.checkAll = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.rolse {
  height: 550px;
  display: flex;
  .left {
    width: 230px;
    height: 100%;
    border: 1px solid #ccc;
    overflow: auto;
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
    height: 100%;
    border: 1px solid #ccc;
    flex: 1;
    overflow: auto;
    text-align: left;
    margin-left: 10px;
    padding: 20px 50px;
    // position: relative;
    .save {
      // position: fixed;
      // top: 20;
      z-index: 9999;
      // top: 20px;
      // left: 60px;
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
    // ::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    //   background-color: #409eff;
    //   color: #fff;
    // }

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #606266;
}
</style>
