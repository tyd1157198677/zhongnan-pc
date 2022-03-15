<template>
  <el-main style="margin-bottom: 120px">
    <el-row id="page_main" style="padding: 0px">
      <el-col :span="24">
        <el-form label-position="right" label-width="90px" :model="formSearch" size="small" class="border p-2 mt-2">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="供应商名称">
                <el-input v-model="formSearch.supplierName" placeholder="供应商名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同名称">
                <el-input v-model="formSearch.conName" placeholder="合同名称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-button type="primary" size="small" @click="loadQueryForm">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          empty-text="无符合条件的记录"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          style="margin-top: 10px"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column prop="projectName" label="所属项目"> </el-table-column>
          <el-table-column align="left" prop="supplierName" label="供应商名称">
            <template slot-scope="scope">
              <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpSuppInfo(scope.row.supplierId)">{{
                scope.row.supplierName
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="conName" label="合同名称"> </el-table-column>
          <el-table-column prop="conCate" width="100" label="合同分类" align="center"> </el-table-column>
          <el-table-column prop="userName" width="120" label="项目经理" align="center"> </el-table-column>
          <el-table-column width="120" label="合同签订日期" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.conDate.substring(0, scope.row.conDate.indexOf("T")) }}</span>
            </template>
          </el-table-column>
          <el-table-column width="80" prop="conValue" label="合同金额" align="center"> </el-table-column>
          <el-table-column prop="evaluateStatus" width="80" label="合同状态" align="center"> </el-table-column>
          <el-table-column prop="finalScore" width="80" label="最新得分" align="center"> </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <i class="el-icon-search" title="查看详情" @click="showdep(scope.row.contractId)"></i>
              <!-- <el-dropdown style="width: 80px">
                <span class="el-dropdown-link"> 选择操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <a class="dropdown-item" href="javascript:void(0)" @click="handleEdit(scope.row)">启动评价</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a class="dropdown-item" href="javascript:void(0)" @click="handleEdit2(scope.row)">本次不参评</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import { parseTime } from "@/util";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      formSearch: {
        supplierName: "",
        conName: "",
        SearchType: 1,
        id: "",
        SkipCount: 0,
        MaxResultCount: 10,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      tableData: [],
      evalData: [],
      loading: false,
    };
  },

  created() {
    this.loadQueryForm();
    this.loadEvalMainForm();
  },
  methods: {
    parseTime,
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.loadQueryForm();
    },
    showdep(contractId) {
      this.$router.push({
        path: "/Evaluate/detail",
        query: { id: contractId },
      });
    },
    loadQueryForm() {
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      this.$api.Evaluate.GetProjectContractList(this.formSearch).then((res) => {
        this.tableData = res.items;
        this.page.total = res.totalCount;
      });
    },
    loadEvalMainForm() {
      this.$api.Evaluate.GetEvalMainList().then((res) => {
        this.evalData = res.items;
      });
    },
    handleEdit(row) {
      // let menu = this.registerMenu.find((x) => x.name == "履约评价").subMenus;
      // let id = menu.find((x) => x.name == "合同信息").index;
      // bus.$emit("changeSub", id);
      // this.$api.Evaluate.StartEvaluate().then((res) => {
      //   // window.open(`#/Evaluate/contractForm?contractId=${row.contractId}&groupId=${res.returnValue1}`)
      //   this.$router.push({
      //     path: "/Evaluate/contractForm",
      //     query: { contractId: row.contractId, groupId: res.returnValue1 },
      //   });
      // });
    },
    //设置不参评
    handleEdit2(row) {
      let params = {
        id: row.contractId,
      };
      this.$api.Evaluate.NoEvaluate(params).then((res) => {
        if (res.success) {
          this.$message.success("设置成功");
          this.loadQueryForm();
        } else {
          this.$message.error(res.message);
        }
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
