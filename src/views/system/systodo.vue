<template>
  <el-main>
    <el-card style="margin-bottom: 10px">
      <div class="top">
        <div class="right1" style="float: right; margin-bottom: 10px">
          <el-input v-model="title" style="margin-right: 10px" placeholder="请输入待办标题" clearable @input="handleChange1" />
          <el-input v-model="name" style="margin-right: 10px" placeholder="请输入姓名" clearable @input="handleChange2" />
          <el-select
            v-model="value"
            size="small"
            style="margin-right: 10px; margin-bottom: 10px"
            placeholder="请选择待办分类"
            @change="handleChange"
          >
            <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value"> </el-option>
          </el-select>
          <!-- <el-button type="primary" size="small" @click="search()">搜索</el-button> -->
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
        <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
        <el-table-column prop="userName" label="姓名" width="120" align="center"> </el-table-column>
        <el-table-column prop="todoTitle" label="待办名称" align="left"> </el-table-column>
        <el-table-column prop="todoTime" label="待办时间" width="150" align="center"> </el-table-column>
        <el-table-column prop="doTime" label="处理时间" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.doTime ? scope.row.doTime : "--" }}
          </template>
        </el-table-column>
        <el-table-column prop="isCompleted" label="状态" width="120" align="center">
          <template slot-scope="scope">
            <span style="padding: 5px" :type="scope.row.isCompleted == 'false' ? 'false' : 'true'">
              {{ scope.row.isCompleted == "已处理" ? "已处理" : "未处理" }}
            </span>
          </template></el-table-column
        >
        <el-table-column prop="linkUrl" label="链接地址" align="left"> </el-table-column>
      </el-table>
      <pagination :total="totalCount" :current-page="currentPage" :pageSize="pageSize" @pageChange="pageChange1" />
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
      options: [],
      activeName: "用户登录日志",
      indexactive: 0,
      userName1: "",
      UserName: "",
      userName2: "",
      contentlayout: "",
      tableData: [
        {
          userName: "",
          linkUrl: "",
          isCompleted: "",
          todoTime: "",
          doTime: "",
          todoTitle: "",
          id: "",
          readTime: "",
        },
      ],
      title: "",
      name: "",
      value: "",
      optionValue: "",
      options: [],
      orderList: [],
      items: "",
      loading: false,
      isEnable: "",
      pageSize: 15,
      currentPage: 1,
      totalCount: 10,
    };
  },
  created() {
    this.getList();
  },
  filters: {
    readTime(opt) {
      if (opt) {
        const date = new Date(opt);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.GetTodoBusinessCate();
  },
  methods: {
    async GetTodoBusinessCate() {
      let res = await this.$http.get("/SysTodo/GetTodoBusinessCate");
      this.options = res.data;
      this.value = res.data.length > 0 ? res.data[0].value : "";
      this.getList();
    },
    async getList() {
      let obj = {
        IsCompleted: this.isCompleted,
        TodoTitle: this.title,
        UserName: this.name,
        TodoBusinessCate: this.value,
        RecordGuid: this.id,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
      };
      this.loading = true;
      let res = await this.$http.get("/SysTodo/GetAllTodoList", { params: obj });
      if (res.status == 200) {
        this.totalCount = res.data.result.totalCount;
        this.loading = false;
        this.tableData = res.data.result.items;
      }
    },
    handleChange1(val) {
      this.getList();
    },
    handleChange2(val) {
      this.getList();
    },
    handleChange() {
      this.getList();
    },
    async search() {
      this.getList();
    },
    pageChange1(page) {
      this.pageSize = page._pageSize;
      this.currentPage = page._currentPage;
      this.getList();
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
