<template>
  <el-main style="margin-bottom: 120px">
    <el-row id="page_main">
      <el-col :span="24">
        <el-form label-position="right" label-width="120px" :model="formSearch" size="small" class="border p-2 mt-2">
          <el-row :gutter="12">
            <el-col :span="3">
              <!-- <el-form-item label="评审状态"> -->
              <el-select v-model="formSearch.isCompleted">
                <el-option label="评审状态" value=""></el-option>
                <el-option label="打分中" :value="false"></el-option>
                <el-option label="已结束" :value="true"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="供方名称"> -->
              <el-input v-model="formSearch.SupplierName" placeholder="供方名称"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="合同名称"> -->
              <el-input v-model="formSearch.ConName" placeholder="合同名称"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="评审模板"> -->
              <el-select v-model="formSearch.TempId">
                <el-option label="评审模板" value=""></el-option>
                <el-option v-for="item in tempData" :label="item.tempName" :value="item.id" :key="item.id"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="评价主体"> -->
              <el-select v-model="formSearch.MainId">
                <el-option label="评价主体" value=""></el-option>
                <el-option v-for="item in evalData" :label="item.year + item.stage" :value="item.id" :key="item.id"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="得分范围"> -->
              <el-row>
                <el-col :span="8">
                  <el-input v-model.number="formSearch.FinalScoreMin" placeholder="得分范围(小值)"></el-input>
                </el-col>
                <el-col :span="4" class="center" style="margin-top: 5px">到</el-col>
                <el-col :span="8">
                  <el-input v-model.number="formSearch.FinalScoreMax" placeholder="得分范围(大值)"></el-input>
                </el-col>
              </el-row>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <el-button type="primary" style="float: right" size="small" @click="loadQueryForm">搜索</el-button>
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
          <el-table-column prop="supplierName" label="供方名称">
            <template slot-scope="scope">
              <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpSuppInfo(scope.row.supplierId)">{{
                scope.row.supplierName
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="conName" label="合同名称"> </el-table-column>
          <el-table-column label="评价主体" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.year + scope.row.stage }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="finalScore" label="评审得分" align="center" width="100">
            <template slot-scope="scope">
              <el-link
                v-if="scope.row.isCompleted != false"
                type="primary"
                style="color: #409eff; text-decoration: none"
                @click="jumpDetail(scope.row.id)"
                >{{ scope.row.finalScore }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="isCompleted" label="评审状态" align="center" width="100">
            <template slot-scope="scope">
              {{ scope.row.isCompleted ? "已结束" : "打分中" }}
            </template>
          </el-table-column>
          <el-table-column label="发起日期" align="center" width="120">
            <template slot-scope="scope">
              {{ scope.row.creationTime | formateTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-dropdown style="width: 80px">
                <span class="el-dropdown-link"> 选择操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <a class="dropdown-item" href="javascript:void(0)" @click="handleDetail(scope.row.id)">查看详情</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a class="dropdown-item" href="javascript:void(0)" @click="deleate(scope.row.id)">删除</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import { dateFormat } from "@/util/validate";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
    baoan: () => import("./components/baoAnmodle.vue"),
  },
  data() {
    return {
      formSearch: {
        IsStart: true,
        isCompleted: "",
        SupplierName: "",
        ConName: "",
        TempId: "",
        MainId: "",
        SkipCount: 0,
        MaxResultCount: 10,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      tempData: [], //履约模板
      tableData: [],
      evalData: [],
      loading: false,
    };
  },
  filters: {
    //格式化日期
    formateTime(time) {
      return dateFormat(time, "yyyy-MM-dd");
    },
  },
  created() {
    this.loadQueryForm();
    this.loadEvalMainForm();
    this.$api.Evaluate.GetTempMasterList().then((res) => {
      this.tempData = res;
    });
  },
  methods: {
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.loadQueryForm();
    },
    loadQueryForm() {
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      this.$api.Evaluate.GetContractEvaluateList(this.formSearch).then((res) => {
        console.log(res.items);
        this.tableData = res.items;
        this.page.total = res.totalCount;
      });
    },
    loadEvalMainForm() {
      this.$api.Evaluate.GetEvalMainList().then((res) => {
        console.log(res.items);
        this.evalData = res.items;
      });
    },
    handleDetail(id) {
      // window.open(`#/Evaluate/myEvaluateDetail?id=${id}`)
      this.$router.push({
        name: "Evaluate-myEvaluateDetail",
        query: {
          id: id,
        },
      });
    },
    //得分详情
    jumpDetail(id) {
      // window.open(`#/Evaluate/scoreDetail?id=${id}`)
      this.$router.push({
        name: "Evaluate-scoreDetail",
        query: {
          id: id,
        },
      });
    },
    deleate(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.Evaluate.DelEvaluate({ id: id }).then((res) => {
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
    jumpSuppInfo(id) {
      window.open(`#/supplier/detail/${id}`);
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
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
</style>
