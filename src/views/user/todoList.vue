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
              <el-input v-model="content" style="width: 200px; margin: 0 10px" placeholder="请输入待办名称" />
              <el-button type="primary" size="small" @click="search()">搜索</el-button>
            </div>
            <!-- <el-button type="primary" style="float: right; margin-right: 10px" size="small" @click="goyi()">设为已办</el-button> -->
          </div>
          <el-table
            style="width: 100%; margin-top: 10px"
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
            v-loading="loading"
          >
            <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
            <el-table-column prop="todoTitle" label="待办名称" align="left">
              <template slot-scope="scope">
                <div @click="linkTo(scope.row)" style="cursor: pointer">
                  <span style="color: #409eff">{{ scope.row.todoTitle }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="todoBusinessCate" label="待办分类" align="center" width="250"> </el-table-column>
            <el-table-column prop="todoTime" label="待办时间" align="center" width="150"> </el-table-column>
            <el-table-column prop="isRead" label="阅读状态" align="center" width="110">
              <template slot-scope="scope">
                <el-button v-if="scope.row.isRead" size="small" type="success" style="padding: 3px">已阅读</el-button>
                <el-button v-else type="danger" size="mini" style="padding: 3px">未阅读</el-button>
                <!-- <span>{{ scope.row ? "已阅读" : "未阅读" }}</span> -->
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="edit(scope.row)" style="margin-right:10px"></i>
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
  inject: ["reload"],
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
    this.CheckUserSystemAuth();
  },
  methods: {
    async CheckUserSystemAuth() {
      let res = await this.$http.get("/UserAuth/CheckUserSystemAuth");
      console.log(res);
      if (res.data.success) {
        this.GetTodoBusinessCate();
      } else {
        this.$alert(res.data.message, {
          confirmButtonText: "确定",
          showClose: false,
        }).then(() => {
          this.$store.dispatch("logout");
          this.$router.push("/Login");
          sessionStorage.clear();
          localStorage.clear();
        });
      }
    },
    async GetTodoBusinessCate() {
      let res = await this.$http.get("/SysTodo/GetUserTodoBusinessCateList1001");
      this.roleList1 = res.data;
      this.value = res.data.length > 0 ? res.data[0].value : "";
      this.GetUserTodoList();
    },
    async GetUserTodoList() {
      let obj = {
        IsCompleted: false,
        TodoTitle: this.content,
        TodoBusinessCate: this.value,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
      };
      this.loading = true;
      let res = await this.$http.get("/SysTodo/GetUserTodoList", { params: obj });
      if (res.status == 200) {
        this.loading = false;
        this.tableData = res.data.result.items;
        this.totalCount = res.data.result.totalCount;
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
    linkTo(row) {
      let url = row.linkUrl.substr(2);
      sessionStorage.setItem("todoId", row.id);
      sessionStorage.setItem("bidModeId", row.recordGuid);
      let routeData = this.$router.resolve({ path: url, query: { istodo: true } });
      // console.log(routeData);
      if (row.isRead) {
        this.GetUserTodoList();
        this.$router.push({ path: url, query: { istodo: true } });
        // window.open(routeData.href, "_blank");
      } else {
        this.$http.post("/SysTodo/SetRead", { id: row.id }).then((res) => {
          if (res.data.success) {
            // this.$message.success(res.data.message);
            this.GetUserTodoList();
            this.$router.push({ path: url, query: { istodo: true } });
            // window.open(routeData.href, "_blank");
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    goyi() {
      this.$confirm("本操作不影响审批类待办，是否确认将所有未读的待办设为已办？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SysTodo/SetAllTodoRead").then((res) => {
          if (res.data.success) {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
            this.GetUserTodoList();
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
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
  width: 100%;
  display: flex;
  .right {
    height: 100%;
    padding-bottom: 10px;
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
