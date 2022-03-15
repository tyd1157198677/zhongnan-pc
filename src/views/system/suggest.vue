<template>
  <el-main>
    <el-card style="margin-bottom: 10px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="投诉" name="投诉">
          <div class="top">
            <div class="right1" style="float: right; margin-bottom: 10px">
              <el-input v-model="font1" style="margin-right: 10px" placeholder="请输入关键字" clearable @input="handleChange1" />
              <el-input v-model="phone1" style="margin-right: 10px" placeholder="请输入手机号" clearable @input="handleChange3" />
              <!-- <el-button type="primary" size="small" @click="search1()">搜索</el-button> -->
            </div>
          </div>
          <el-table
            style="width: 100%"
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData1"
            v-loading="loading"
          >
            <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
            <el-table-column prop="title" label="标题" align="center"> </el-table-column>
            <el-table-column prop="content" label="内容" align="left"> </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180" align="center"> </el-table-column>
            <el-table-column prop="phone" label="电话" width="150" align="center"> </el-table-column>
            <el-table-column prop="creationTime" label="提交时间" width="250" align="center">
              <template slot-scope="scope">
                {{ scope.row.creationTime | creationTime }}
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="totalCount1" :current-page="currentPage1" :pageSize="pageSize1" @pageChange="pageChange1" />
        </el-tab-pane>
        <el-tab-pane label="建议" name="建议">
          <div class="top">
            <div class="right1" style="float: right; margin-bottom: 10px">
              <el-input v-model="font2" style="margin-right: 10px" placeholder="请输入关键字" clearable @input="handleChange2" />
              <el-input v-model="phone2" style="margin-right: 10px" placeholder="请输入手机号" clearable @input="handleChange4" />
              <!-- <el-button type="primary" size="small" @click="search2()">搜索</el-button> -->
            </div>
          </div>
          <el-table
            style="width: 100%"
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData2"
            v-loading="loading"
          >
            <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
            <el-table-column prop="title" label="标题" align="center"> </el-table-column>
            <el-table-column prop="content" label="内容" align="left"> </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180" align="center"> </el-table-column>
            <el-table-column prop="phone" label="电话" width="150" align="center"> </el-table-column>
            <el-table-column prop="creationTime" label="提交时间" width="250" align="center">
              <template slot-scope="scope">
                {{ scope.row.creationTime | creationTime }}
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="totalCount2" :current-page="currentPage2" :pageSize="pageSize2" @pageChange="pageChange2" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-main>
</template>

<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      roleList1: [],
      activeName: "投诉",
      indexactive: 0,
      userName1: "",
      UserName: "",
      userName2: "",
      font1: "",
      phone1: "",
      font2: "",
      phone2: "",
      tableData1: [
        {
          title: "",
          content: "",
          phone: "",
          email: "",
          creationTime: "",
        },
      ],
      tableData2: [
        {
          title: "",
          content: "",
          phone: "",
          email: "",
          creationTime: "",
        },
      ],
      value: "",
      optionValue: "",
      options: [],
      orderList: [],
      items: "",
      loading: false,
      isEnable: "",
      pageSize1: 10,
      currentPage1: 1,
      totalCount1: 10,
      pageSize2: 10,
      currentPage2: 1,
      totalCount2: 10,
    };
  },
  created() {
    this.getList1();
    this.getList2();
  },
  mounted() {},
  filters: {
    creationTime(opt) {
      if (opt) {
        const date = new Date(opt);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      } else {
        return "";
      }
    },
  },
  methods: {
    async getList1() {
      let obj = {
        KeyWord: this.font1,
        Phone: this.phone1,
        SuggestType: "投诉",
        SkipCount: (this.currentPage1 - 1) * this.pageSize1,
        MaxResultCount: this.pageSize1,
      };
      this.loading = true;
      let res = await this.$http.get("/SysSuggest/GetSysSuggestList", { params: obj });
      if (res.status == 200) {
        this.totalCount1 = res.data.result.totalCount;
        this.loading = false;
        this.tableData1 = res.data.result.items;
      }
    },
    handleChange1(val) {
      this.getList1();
    },
    handleChange3(val) {
      this.getList1();
    },
    async getList2() {
      let obj = {
        KeyWord: this.font2,
        Phone: this.phone2,
        SuggestType: "建议",
        SkipCount: (this.currentPage2 - 1) * this.pageSize2,
        MaxResultCount: this.pageSize2,
      };
      this.loading = true;
      let res = await this.$http.get("/SysSuggest/GetSysSuggestList", { params: obj });
      if (res.status == 200) {
        this.totalCount2 = res.data.result.totalCount;
        this.loading = false;
        this.tableData2 = res.data.result.items;
      }
    },
    handleChange2(val) {
      this.getList2();
    },
    handleChange4(val) {
      this.getList2();
    },
    async search1() {
      this.getList1();
    },
    async search2() {
      this.getList2();
    },
    pageChange1(page) {
      this.pageSize1 = page._pageSize1;
      this.currentPage1 = page._currentPage1;
      this.getList1();
    },
    pageChange2(page) {
      this.pageSize2 = page._pageSize2;
      this.currentPage2 = page._currentPage2;
      this.getList2();
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
::v-deep .right1 {
  .el-input {
    width: 200px !important;
  }
}
</style>
