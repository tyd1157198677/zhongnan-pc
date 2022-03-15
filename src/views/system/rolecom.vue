<template>
  <div>
    <el-form label-position="right" label-width="120px" :model="formSearch" size="small">
      <el-row>
        <el-col :span="24">
          <el-form-item style="float: right">
            <el-input
              placeholder="请输入公司名称"
              clearable
              v-model="formSearch.ProjectFullName"
              style="width: 150px; margin-right: 10px"
            ></el-input>
            <el-input
              placeholder="请输入工程总监"
              clearable
              v-model="formSearch.RoleName3"
              style="width: 150px; margin-right: 10px"
            ></el-input>
            <el-input
              placeholder="请输入项目成本经理"
              clearable
              v-model="formSearch.RoleName4"
              style="width: 150px; margin-right: 10px"
            ></el-input>
            <el-input
              placeholder="请输入区域成本总监"
              clearable
              v-model="formSearch.RoleName5"
              style="width: 150px; margin-right: 10px"
            ></el-input>
            <el-button type="primary" size="small" @click="onsubmit()">搜索</el-button>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4" style="text-align:right">
         
        </el-col> -->
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
        <el-table-column prop="projectFullName" label="公司名称" align="center" min-width="150"> </el-table-column>
        <el-table-column v-for="(item, index) in RoleNameList" :key="item.roleName" :label="item.roleName" align="center">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.userName" placeholder="请输入内容"></el-input> -->
            <el-select
              ref="select"
              v-model="scope.row.userNameList[index].userName"
              filterable
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              placeholder="请输入关键词"
              :loading="loading1"
              @focus="setEmpty"
              @change="handle($event, scope.row.projectId, scope.row.userNameList[index].roleName)"
            >
              <el-tooltip
                :open-delay="500"
                v-for="item in options"
                :key="item.value"
                class="item"
                effect="dark"
                :content="item.title"
                placement="left"
              >
                <el-option :label="item.userName" :value="item.userGuid"> </el-option>
              </el-tooltip>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="totalCount" :current-page="currentPage" :pageSize="page_size" @pageChange="pageChange" />
    </el-row>

    <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="95%">
      <gongFang @itemClick="onSelectSups" />
      <!-- <supplier-list @itemClick="onSelectSups" /> -->
    </el-dialog>
  </div>
</template>
<script>
import gongFang from "../invest/components/storageList2";
export default {
  components: {
    gongFang,
    Pagination: () => import("@/components/Pagination.vue"),
    SupplierList: () => import("@/components/SupplierList"),
  },
  data() {
    return {
      dropDownGroup: {},
      dialogVisible: false,
      selectSupVisible: false,
      supplierGuid: "",
      RoleNameList: [],
      supplierName: "",
      zhuTi: "",
      currentPage: 1,
      page_size: 15,
      totalCount: 10,
      formSearch: {
        ProjectFullName: "",
        RoleName3: "",
        RoleName4: "",
        RoleName5: "",
        // SkipCount: 0,
        // MaxResultCount: 10,
      },
      value1: "",
      codeList: [],
      options: [],
      tableData: [],
      isShowFaQibtn: false,
      loading: false,
      loading1: false,
      userGuid: "",
      index1: 1,
      leixing: "",
    };
  },
  created() {
    this.userGuid = sessionStorage.getItem("userGuid");
    this.loadQueryForm();
  },
  methods: {
    setEmpty() {
      this.options = [];
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading1 = true;
        this.GetSearchUserList21(query);
        this.loading1 = false;
      } else {
        this.options = [];
      }
    },
    handle(userGuid, projectId, roleName) {
      let obj = {
        projectId,
        roleName,
        userGuid,
      };
      this.$http.post("/RoleUserDetail/SaveCompanyRole02", obj).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.loadQueryForm();
        } else {
          this.$msg.warning(res.data.message);
        }
      });
    },
    // handle1(userGuid, projectId, roleName) {
    //   let obj = {
    //     projectId,
    //     roleName,
    //     userGuid,
    //   };
    //   this.$http.post("/RoleUserDetail/SaveCompanyRole02", obj).then(res => {
    //     if (res.data.success) {
    //       this.$msg.success(res.data.message);
    //       this.loadQueryForm();
    //     } else {
    //       this.$msg.warning(res.data.message);
    //     }
    //   });
    // },
    GetSearchUserList21(val) {
      this.$http.get("/IdmUserInfo/GetSearchUserList21", { params: { keyWords: val } }).then((res) => {
        this.options = res.data;
      });
    },
    //选择公司
    onSelectSups(sup) {
      this.supplierGuid = sup.id;
      this.supplierName = sup.comFullName;
      this.selectSupVisible = false;
    },

    // pageChange(page) {
    //   this.page.size = page._pageSize;
    //   this.page.index = page._currentPage;
    //   this.index1 = page._currentPage;
    //   this.loadQueryForm();
    // },
    pageChange(page) {
      this.page_size = page._pageSize;
      this.currentPage = page._currentPage;
      this.loadQueryForm();
    },
    onsubmit() {
      this.currentPage = 1;
      this.loadQueryForm();
    },
    loadQueryForm() {
      this.loading = true;
      this.formSearch.SkipCount = (this.currentPage - 1) * this.page_size;
      this.formSearch.MaxResultCount = this.page_size;
      // SkipCount: (this.currentPage - 1) * this.page_size,
      //   MaxResultCount: this.page_size,
      this.$http.get("/RoleUserDetail/GetCompanyRoleList02", { params: this.formSearch }).then((res) => {
        this.loading = false;
        this.tableData = res.data.result.items;
        this.RoleNameList = res.data.result.items.length > 0 ? res.data.result.items[0].userNameList : [];
        this.totalCount = res.data.result.totalCount;
        // this.$set(this.page, "index", this.index1);
      });
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
</style>
