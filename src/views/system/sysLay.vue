<template>
  <div class="rolse">
    <div class="right">
      <el-main style="padding: 0 10px">
        <div class="top">
          <div class="right1">
            <el-input v-model="content" style="margin-right: 10px" placeholder="请选择参数分类" />
            <el-button type="primary" size="small" @click="search(content)">搜索</el-button>
          </div>
        </div>
        <el-table
          height="510"
          style="width: 100%"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
          <!-- <el-table-column prop="cateModule" label="参数分类" align="center" width="140"> </el-table-column> -->
          <el-table-column prop="sysConfigCate" label="参数名称" align="center" width="140"> </el-table-column>
          <el-table-column label="参数值" width="100" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.showOrder"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" width="100" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.isEnable"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="保存" width="120" align="center">
            <template slot-scope="scope">
              <i class="el-icon-circle-check" @click="check(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        <!-- <pagination :total="totalCount" :current-page="currentPage" :pageSize="pageSize" @pageChange="pageChange" /> -->
      </el-main>
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
      roleList1: [],
      // activeName: "系统配置",
      indexactive: 0,
      content: "", //搜索内容
      tableData: [],
      orderList: [],
      loading: false,
      value: "",
      pageSize: 15,
      currentPage: 1,
      totalCount: 0,
    };
  },
  mounted() {
    this.GetSysTreeCateType();
  },
  methods: {
    // /api/services/app/SysTreeCate/SaveOrder
    async GetSysTreeCateType() {
      let res = await this.$http.get("/SysTreeCate/GetSysTreeCateType");
      this.roleList1 = res.data;
      this.value = res.data.length > 0 ? res.data[0].text : "";
      this.GetList();
      console.log(this.roleList1);
    },
    async GetList() {
      let obj = {
        TreeCateType: this.value,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
      };
      this.loading = true;
      let res = await this.$http.get("/api/services/app/SysConfig/GetSysConfigList", { params: obj });
      if (res.status == 200) {
        this.loading = false;
        this.tableData = res.data.result.items;
        this.totalCount = res.data.result.totalCount;
        this.orderList = res.data.result.items.map((item) => {
          return {
            id: item.id,
            cateOrder: item.cateOrder,
          };
        });
      }
    },
    async SaveOrder() {
      let obj = this.orderList;
      let res = await this.$http.post("/SysTreeCate/SaveOrder", obj);
      this.GetList();
    },
    pageChange(page) {
      this.pageSize = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetList();
    },
    clickLeft(item, index) {
      this.indexactive = index;
      this.value = item.text;
      this.GetList();
    },
    search(val) {
      // this.GetMenuTree()
    },
    addRolses() {
      // this.SaveOrder();
    },
    saveRolses(val) {
      this.SaveOrder();
    },
    edit(val) {
      // this.GetMenuTree()
    },
    deletes(val) {
      // this.GetMenuTree()
    },
  },
};
</script>
<style lang="scss" scoped>
.rolse {
  height: 620px;
  margin-bottom: 90px;
  display: flex;
  flex-flow: row; /*伸缩项目单行排列*/
  // overflow: auto;
  .left {
    width: 230px;
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
    width: auto;
    height: 100%;
    border: 1px solid #ccc;
    flex: 1;
    // overflow: auto;
    margin-left: 10px;
    .top {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .left1 {
        padding-left: 20px;
        display: flex;
      }
      .right1 {
        padding-right: 10px;
      }
    }
  }
}
</style>
