<template>
  <el-card style="margin-bottom: 10px">
    <div class="v-postConfig">
      <el-form label-position="right" label-width="120px" :model="formSearch" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item style="float: right">
              <el-input
                placeholder="请输入所属组织"
                clearable
                v-model="formSearch.orgName"
                style="width: 200px; margin-right: 10px"
                @input="handlechange"
              ></el-input>
              <el-input
                placeholder="请输入供方审核岗位"
                clearable
                v-model="formSearch.PositionFullname"
                style="width: 200px; margin-right: 10px"
                @input="handlechange"
              ></el-input>
              <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="margin: 10px 0">
        <el-table
          empty-text="无符合条件的记录"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center" fixed="left"> </el-table-column>

          <el-table-column prop="orgAlias" label="组织别名" align="center" min-width="200">
            <template slot-scope="scope">
              <el-input placeholder="请输入组织别名" clearable v-model="scope.row.orgAlias"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="orgName" label="所属组织" align="center" min-width="200"> </el-table-column>
          <el-table-column prop="xxxxx" label="供方审核岗位" align="center" min-width="200">
            <template slot-scope="scope">
              <el-input
                placeholder="请选择供方审核岗位"
                style="width: 100%"
                v-model.trim="scope.row.positionFullname"
                @focus="setPost(scope.$index, scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="personName" label="岗位人员" align="center" min-width="200"></el-table-column>
          <el-table-column prop="orgSort" label="排序" align="center" min-width="200">
            <template slot-scope="scope">
              <el-input type="number" clearable v-model="scope.row.orgSort"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="保存" width="80" align="center">
            <template slot-scope="scope">
              <i class="el-icon-circle-check" @click="onSaveRow(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        <PopupTree ref="PopupTree" @onChange="treeChange" :currentData="currentData"></PopupTree>
      </el-row>
    </div>
  </el-card>
</template>
<script>
export default {
  components: {
    PopupTree: () => import("./components/PopupTree.vue"),
  },
  data() {
    return {
      formSearch: {
        orgName: "",
        PositionFullname: "",
      },
      options: [],
      tableData: [],
      loading: false,
      loading1: false,
      userGuid: "",
      currentTableIndex: null,
      currentData: {},
    };
  },
  created() {
    this.userGuid = localStorage.getItem("userGuid");
    this.loadQueryForm();
  },
  methods: {
    treeChange(data) {
      this.tableData[this.currentTableIndex].positionId = data.id;
      this.tableData[this.currentTableIndex].positionFullname = data.comShortName;
      this.$refs.PopupTree.close();
    },
    setPost(index, row) {
      this.currentData = JSON.parse(JSON.stringify(row));
      this.currentTableIndex = index;
      this.$refs.PopupTree.open();
    },
    onSaveRow(row) {
      const params = {
        ...row,
        projectId: row.infoId,
      };
      this.$http.post("/RoleUserDetail/SaveProjectRole03", params).then((res) => {
        if (res.data.success) {
          this.$message({
            message: res.data.message,
            type: "success",
          });
          this.loadQueryForm();
        } else {
          this.$message({
            message: res.data.message,
            type: "warning",
          });
        }
      });
    },
    onChange(e, row) {
      const params = {
        projectId: row.infoId, // 这个数据的值
        roleName: row.roleName || "",
        userGuid: this.userGuid,
        positionId: e, // 下拉框的值
      };
      this.$http.post("/RoleUserDetail/SaveProjectRole03", params).then((res) => {
        this.$message({
          message: res.data.message,
          type: "success",
        });
        this.loadQueryForm();
      });
    },
    handlechange() {
      this.loadQueryForm();
    },
    onSearch() {
      this.loadQueryForm();
    },
    loadQueryForm() {
      this.loading = true;
      this.$http.get("/RoleUserDetail/GetOrgPositionList01", { params: this.formSearch }).then((res) => {
        this.loading = false;
        this.tableData = res.data.result.items;
        this.tableData = this.tableData.map((v) => {
          if (v.positionNameList.length !== 0) {
            return {
              ...v,
              ...v.positionNameList[0],
            };
          }
          return v;
        });
      });
    },
  },
};
</script>

<style scoped>
.v-postConfig {
}
.el-select {
  width: 100%;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
</style>
