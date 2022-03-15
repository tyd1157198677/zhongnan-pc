<template>
  <el-main style="margin-bottom: 120px">
    <el-row id="page_main">
      <el-col :span="24">
        <el-form label-position="right" label-width="120px" :model="formSearch" size="small" class="p-2 mt-2">
          <el-row>
            <el-col :span="3">
              <!-- <el-form-item label="状态："> -->
              <el-select v-model="formSearch.IsEnable">
                <el-option label="状态" value=""></el-option>
                <el-option label="开启" :value="true"></el-option>
                <el-option label="关闭" :value="false"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="21" class="right">
              <el-button type="primary" size="small" @click="loadQueryForm">搜索</el-button>
              <el-button type="primary" size="small" @click="add">新增</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          empty-text="无符合条件的记录"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column prop="year" label="年份" align="center" min-width="15%"> </el-table-column>
          <el-table-column prop="stage" label="评价阶段" align="center" min-width="20%"> </el-table-column>
          <el-table-column prop="isEnable" label="状态" align="center" min-width="15%">
            <template slot-scope="scope">
              {{ scope.row.isEnable == true ? "开启" : "关闭" }}
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="描述" min-width="50%"> </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left: 5px" />
              <i @click="handleEdit(scope.row)" class="el-icon-edit" title="编辑" style="margin-left: 15px" />
              <el-switch
                v-model="scope.row.isEnable"
                @change="handleEdit2(scope.row)"
                title="更改状态"
                style="margin-left: 15px"
                :width="35"
                active-color="#409eff"
                inactive-color="#dcdfe6"
              >
              </el-switch>
              <i @click="handleReport(scope.row.id)" class="el-icon-upload2" title="生成综合得分报告" style="margin-left: 15px" />
              <i
                v-if="scope.row.isEnable"
                @click="showprogress(scope.row.id, scope.row.isCompleted)"
                class="el-icon-s-order"
                title="评价进度"
                style="margin-left: 15px"
              />
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="评价进度" width="60%">
      <el-row>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right">评价总数：</td>
              <td>
                {{ prograssform.evalCount }}
              </td>
              <td class="right">已完成评价：</td>
              <td>
                {{ prograssform.evalEnd }}
              </td>
              <td class="right">未完成评价：</td>
              <td>
                {{ prograssform.evalIng }}
              </td>
            </tr>
            <tr>
              <td class="right">待办数量：</td>
              <td>
                {{ prograssform.todoCount }}
              </td>
              <td class="right">已完成打分：</td>
              <td>
                {{ prograssform.todoEnd }}
              </td>
              <td class="right">未完成打分：</td>
              <td>
                {{ prograssform.todoIng }}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <el-button v-if="!isCompleted" @click="textcui" type="primary" size="small" style="float: right; margin-top: 10px"
            >催办</el-button
          >
        </div>
      </el-row>
    </el-dialog>
  </el-main>
</template>
<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      prograssform: {},
      isCompleted: false,
      dialogFormVisible: false,
      formSearch: {
        IsEnable: "",
        SkipCount: 0,
        MaxResultCount: 10,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      tableData: [],
      loading: false,
    };
  },
  created() {
    this.loadQueryForm();
  },
  methods: {
    add() {
      this.$router.push({
        path: "/Evaluate/EvaluateForm",
      });
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.loadQueryForm();
    },
    loadQueryForm() {
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      this.$api.Evaluate.GetEvalMainList(this.formSearch).then((res) => {
        console.log(res.items);
        this.tableData = res.items;
        this.page.total = res.totalCount;
      });
    },
    handleEdit(row) {
      this.$router.push({
        path: "/Evaluate/EvaluateForm",
        query: { row: row },
      });
    },
    handleEdit2(row) {
      let params = {
        id: row.id,
        isEnable: row.isEnable,
      };
      this.$api.Evaluate.UpdateIsEnable(params).then((res) => {
        if (res.success) {
          this.$message.success("修改成功");
          this.loadQueryForm();
        } else {
          this.$message.error(res.message);
          this.loadQueryForm();
        }
      });
    },
    //生成综合得分报告
    handleReport(id) {
      this.$api.Evaluate.UpdateCompleted({ id: id }).then((res) => {
        if (res.success) {
          this.$message.success("生成报告成功");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    showprogress(id, isCompleted) {
      this.dialogFormVisible = true;
      this.gressid = id;
      this.isCompleted = isCompleted;
      this.GetEvalProgress();
    },
    GetEvalProgress() {
      let obj = {
        id: this.gressid,
      };
      this.$http.get("/EvalMain/GetEvalProgress", { params: obj }).then((res) => {
        this.prograssform = res.data;
      });
    },
    textcui() {
      this.$confirm("确定要催办吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/EvalMain/UrgeEval", { id: this.gressid }).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.GetEvalProgress();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    delete1(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.Evaluate.DeleteEvalMain({ id: id }).then((res) => {
            if (res.success) {
              this.$message.success("删除成功");
              this.loadQueryForm();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
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
