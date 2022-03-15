<template>
  <el-dialog width="80%" height="80%" :title="title" :visible.sync="dialogVisible">
    <el-row :gutter="16" class="m-3">
      <el-col :span="6" class="border p-3" style="height: 517px; width: 267px; overflow: scroll">
        <el-tree
          ref="tree"
          :data="depData"
          node-key="id"
          :expand-on-click-node="false"
          :props="defaultProps"
          :auto-expand-parent="true"
          :highlight-current="true"
          :default-expanded-keys="defaultExpandedKeys"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-col>
      <el-col :span="17" class="border p-3 ml-2">
        <el-row>
          <el-col :span="12" class="float-right">
            <el-input v-model="query.userName" clearable placeholder="填写姓名搜索">
              <el-button slot="append" @click="searchUser" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-tag style="margin-right: 10px" @close="clearUser(index)" closable v-for="(item, index) in selectUser" :key="index">
              {{ item.userName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24">
            <el-table v-loading="loading" :data="userData" border ref="multipleTable" row-key="id" header-cell-class-name="table-header">
              <!-- <el-table-column type="selection" :reserve-selection="true" width="40"> </el-table-column> -->
              <el-table-column prop="id" label="序号" type="index" :index="indexMethod" width="55" align="center"></el-table-column>
              <el-table-column prop="userName" label="姓名" align="center" width="100"></el-table-column>
              <el-table-column prop="deptFullName" label="部门" align="center"></el-table-column>
              <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
              <el-table-column label="添加" align="center" width="80">
                <template slot-scope="scope">
                  <i class="el-icon-circle-check" @click="onAdd(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :type="1"
              :total="pageTotal"
              :current-page="query.pageIndex"
              :pageSize="query.pageSize"
              @pageChange="handlePageChange"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关 闭</el-button>
      <!-- <el-button type="primary" @click="ok">确 定</el-button> -->
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    selUser: {
      type: Array,
      default: () => {
        return [];
      },
    },
    title: "",
  },
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      dialogVisible: false,
      query: {
        departmentCode: "",
        userName: "",
        skipCount: 0,
        maxResultCount: 15,
        pageIndex: 1,
        pageSize: 15,
      },
      // 部门树默认展开的节点
      defaultExpandedKeys: [],
      multipleSelection: [],
      pageTotal: 0,
      depData: [],
      defaultProps: {
        children: "children",
        label: "comName",
      },
      loading: false,
      userData: [],
      // 已选择的人员
      selectUser: this.selUser,
    };
  },
  mounted() {
    this.fetchDepTree();
  },
  watch: {
    selUser(newValue, oldValue) {
      this.selectUser = newValue;
    },
    // multipleSelection(newValue, oldValue) {
    //   console.log(newValue);
    //   // 增
    //   let add = [];
    //   newValue.forEach(n => {
    //     if (oldValue.every(o => o.id != n.id)) {
    //       add.push({
    //         id: n.id,
    //         userName: n.userName,
    //       });
    //     }
    //   });
    //   let sub = [];
    //   // 减
    //   oldValue.forEach(o => {
    //     if (newValue.every(n => n.id != o.id)) {
    //       sub.push({
    //         id: o.id,
    //         userName: o.userName,
    //       });
    //     }
    //   });

    //   add.forEach(a => {
    //     if (this.selectUser.every(s => s.id != a.id)) {
    //       this.selectUser.push(a);
    //     }
    //   });
    //   this.selectUser.forEach((s, i) => {
    //     sub.forEach(d => {
    //       if (s.id === d.id) {
    //         this.selectUser.splice(i, 1);
    //       }
    //     });
    //   });
    // },
    userData(newValue, oldValue) {
      this.$nextTick(() => {
        let selectRows = [];
        let selectNotRows = [];
        this.userData.forEach((n) => {
          if (this.selectUser.some((s) => s.id === n.id)) {
            selectRows.push(n);
          } else {
            selectNotRows.push(n);
          }
        });
        if (selectRows.length > 0) {
          console.log("切换");
          this.toggleSelection(selectRows, true);
        }
        if (selectNotRows.length > 0) {
          console.log("切换");
          this.toggleSelection(selectNotRows, false);
        }
      });
    },
  },
  methods: {
    open() {
      this.dialogVisible = true;
      this.fetchUser();
    },
    close() {
      this.dialogVisible = false;
    },
    /**
     * 加载部门树
     */
    fetchDepTree() {
      this.$api.IdmUser.GetOrganizeTree(false).then((res) => {
        this.depData = res;
        this.$nextTick(() => {
          this.defaultExpandedKeys = [res[0].id];
        });
      });
    },
    /**
     * 加载部门用户
     */
    fetchUser() {
      this.loading = true;
      this.$api.IdmUser.GetUserList(this.query.userName, this.query.departmentCode, this.query.pageIndex, this.query.pageSize).then(
        (res) => {
          this.loading = false;
          this.userData = res.items;
          this.pageTotal = res.totalCount;
        }
      );
    },
    toggleSelection(rows, sel) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row, sel);
        });
      }
    },
    // 搜索用户
    searchUser() {
      this.query.pageIndex = 0;
      this.query.skipCount = 0;
      this.fetchUser();
    },
    handleNodeClick(data) {
      this.resetQuery();
      this.query.departmentCode = data.subCompanyCode;
      this.fetchUser();
    },
    resetQuery() {
      this.query = {
        departmentCode: "",
        userName: "",
        skipCount: 0,
        maxResultCount: 15,
        pageIndex: 1,
        pageSize: 15,
      };
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val._currentPage);
      this.$set(this.query, "skipCount", (val._currentPage - 1) * this.query.maxResultCount);
      this.fetchUser();
    },
    // 计算序号
    indexMethod(index) {
      return index + 1 + (this.query.pageIndex - 1) * this.query.pageSize;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    ok() {
      this.dialogVisible = false;
      this.$emit("multipleSelect", this.selectUser);
    },
    onAdd(user) {
      this.$emit("itemClick", user);
      // this.$api.BidPerson.SaveSinglePerson(this.baseId, user.userGuid).then(res => {
      //   this.multipleSelection.push(user);
      // });
    },
    clearUser(index) {
      const u = this.selectUser[index];
      let [row] = this.userData.filter((u) => u.id === u.id);
      this.$refs.multipleTable.toggleRowSelection(row, false);
      this.selectUser.splice(index, 1);
    },
  },
};
</script>

<style scoped>
::v-deep .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #23211f;
}
</style>
