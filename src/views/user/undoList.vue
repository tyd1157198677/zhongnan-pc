<template>
  <el-main>
    <div class="rolse">
      <el-main>
        <div class="right">
          <div class="top">
            <div>
              <el-select v-model="value" placeholder="请选择待办类型" style="width: 200px; margin-left: 10px" @change="handleChange">
                <el-option v-for="item in roleList1" :key="item.value" :label="item.text" :value="item.value"> </el-option>
              </el-select>
              <el-input v-model="content" style="width: 200px; margin: 0 10px" placeholder="请输已待办名称" />
              <el-button type="primary" size="small" @click="search()">搜索</el-button>
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
            <el-table-column prop="todoTitle" label="已办名称" align="left">
              <template slot-scope="scope">
                <div @click="linkTo(scope.row)" style="cursor: pointer">
                  <span style="color: #409eff">{{ scope.row.todoTitle }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="todoBusinessCate" label="已办分类" align="center" width="240"> </el-table-column>
            <el-table-column prop="doTime" label="处理时间" align="center" width="150"> </el-table-column>
            <!-- <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <i class="el-icon-delete" @click="deletes(scope.row)"></i>
              </template>
            </el-table-column> -->
          </el-table>
          <pagination :total="totalCount" :current-page="currentPage" :pageSize="pageSize" @pageChange="pageChange" />
        </div>
      </el-main>
    </div>
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
    this.GetTodoBusinessCate();
  },
  methods: {
    // /app/SysTodo/GetTodoBusinessCate分类下啦//SysTodo/GetUserTodoList
    ///api/services/app/SysTodo/SetRead
    async GetTodoBusinessCate() {
      let res = await this.$http.get("/SysTodo/GetUserTodoBusinessCateList1001");
      this.roleList1 = res.data;
      this.value = res.data.length > 0 ? res.data[0].value : "";
      this.GetUserTodoList();
    },
    async GetUserTodoList() {
      let obj = {
        IsCompleted: true,
        TodoTitle: this.content,
        TodoBusinessCate: this.value,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
      };
      this.loading = true;
      let res = await this.$http.get("/SysTodo/GetUserTodoList", { params: obj });
      if (res.status == 200) {
        this.loading = false;
        console.log(res);
        this.tableData = res.data.result.items;
        this.totalCount = res.data.result.totalCount;
      }
    },
    linkTo(row) {
      let url = row.linkUrl.substr(2);
      sessionStorage.setItem("todoId", row.id);
      sessionStorage.setItem("bidModeId", row.recordGuid);
      if (row.isRead) {
        // window.open(row.linkUrl);
        // window.open("#/bid/processDetail?id=" + bidModeId);
        this.$router.push({ path: url });
      } else {
        this.$http.post("/SysTodo/SetRead", { id: row.id }).then((res) => {
          if (res.data.success) {
            // window.open(row.linkUrl);
            this.$router.push({ path: url });
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    search() {
      this.currentPage = 1;
      this.GetTodoBusinessCate();
    },
    pageChange(page) {
      this.pageSize = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetUserTodoList();
    },
    handleChange() {
      this.GetUserTodoList();
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
  width: 100%;
  display: flex;
  .right {
    height: 100%;
    border: 1px solid #ccc;
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
