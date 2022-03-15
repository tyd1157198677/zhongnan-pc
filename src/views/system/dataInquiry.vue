<template>
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
          {{ item.text }}
        </div>
      </div>
    </el-aside>
    <el-main>
      <div class="top">
        <div class="right1">
          <el-button size="small" type="primary" @click="addRolses">新增参数</el-button>
        </div>
      </div>
      <div class="right">
        <el-table
          height="450"
          style="width: 100%"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
          <el-table-column prop="supCateName" label="模板名称" align="center"> </el-table-column>
          <el-table-column prop="supQuaItemType1" label="大类" align="center"> </el-table-column>
          <el-table-column prop="supQuaItemType2" label="小类" align="center"> </el-table-column>
          <el-table-column prop="itemDesc" label="指标描述" align="center"> </el-table-column>
          <el-table-column prop="groupNumber" label="分组序号" align="center"> </el-table-column>
          <el-table-column label="显示顺序" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.showOrder"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <i class="el-icon-edit" @click="edit(scope.row)" style="margin-right: 10px"></i>
              <i class="el-icon-delete" @click="deletes(scope.row)" style="margin-right: 10px"></i>
              <i class="el-icon-delete" v-if="scope.row.supQuaItemType2" @click="deletes(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>

        <!-- <pagination :total="totalCount" :current-page="currentPage" :pageSize="pageSize" @pageChange="pageChange" /> -->
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  //   components: {
  //     Pagination: () => import("@/components/Pagination.vue"),
  //   },
  data() {
    return {
      roleList1: [],
      indexactive: 0,
      content: "", //搜索内容
      tableData: [
        {
          id: "",
        },
      ],
      orderList: [],
      options: [],
      loading: false,
      value: "",
      optionValue: "",
      pageSize: 15,
      currentPage: 1,
      totalCount: 0,
    };
  },
  mounted() {
    this.GetTempReportDowns();
  },
  methods: {
    ///api/services/app/InvesCate/GetInvesCateList reportType smallCate
    async GetTempReportDowns() {
      let res = await this.$http.get("/SupQuaItem/GetSupCateDropDowns");
      console.log(res);
      this.roleList1 = res.data;
      this.value = res.data.length > 0 ? res.data[0].text : "";
      this.GetInvesCateList();
    },
    // async GetSmallCate() {
    //   let res = await this.$http.get("/InvesCate/GetSmallCate", { params: { reportType: this.value } });
    //   console.log(res);
    //   this.options = res.data;
    //   this.optionValue = res.data.length > 0 ? res.data[0].text : "";
    //   this.GetInvesCateList();
    // },
    async GetInvesCateList() {
      let obj = {
        Id: this.id,
        SupCateName: this.value,
      };
      this.loading = true;
      let res = await this.$http.get("/SupQuaItem/GetSupQuaItemList", { params: obj });
      if (res.status == 200) {
        this.loading = false;
        console.log(res);
        this.tableData = res.data;
        // this.totalCount = res.data.result.totalCount;
        // this.orderList = res.data.result.items.map(item => {
        //   return {
        //     id: item.id,
        //     cateOrder: item.cateOrder,
        //   };
        // });
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
      this.value = item.value;
      this.GetInvesCateList();
    },
    handleChange(val) {
      this.GetInvesCateList();
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
  height: 720px;
  padding-bottom: 100px;
  display: flex;
  .left {
    width: 100%;
    height: 100%;
    overflow: auto;
    flex: 2;
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
.right1 {
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
