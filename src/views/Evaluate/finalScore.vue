<template>
  <el-main style="margin-bottom: 120px">
    <el-row id="page_main">
      <el-col :span="24">
        <el-form label-position="right" label-width="120px" :model="formSearch" size="small" class="border p-2 mt-2">
          <el-row :gutter="12">
            <el-col :span="3">
              <!-- <el-form-item label="供方名称"> -->
              <el-input v-model="formSearch.SupplierName" placeholder="供方名称"></el-input>
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
            <el-col :span="3">
              <!-- <el-form-item label="结果等级"> -->
              <el-select v-model="formSearch.Level">
                <el-option label="结果等级" value=""></el-option>
                <el-option v-for="item in levelData" :label="item.text" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="15">
              <el-button style="float: right" type="primary" size="small" @click="loadQueryForm">搜索</el-button>
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
          <el-table-column label="评价主体" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.mainDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="评审次数" align="center" width="150">
            <template slot-scope="scope">
              <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpDetail(scope.row)">{{
                scope.row.count
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="综合得分" align="center" width="150"> </el-table-column>
          <el-table-column prop="level" label="结果等级" align="center" width="120"> </el-table-column>
          <el-table-column prop="creationTime" label="生成日期" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.creationTime | formateTime }}</span>
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
import bus from "@/util/bus";
import { mapState } from "vuex";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      formSearch: {
        SupplierName: "",
        MainId: "",
        Level: "",
        SkipCount: 0,
        MaxResultCount: 10,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      levelData: [], //结果
      tableData: [],
      evalData: [],
      loading: false,
    };
  },
  filters: {
    //格式化日期
    formateTime(time) {
      return dateFormat(time, "yyyy-MM-dd hh:mm");
    },
  },
  computed: {
    ...mapState("menu", { registerMenu: "menus" }),
  },
  created() {
    this.loadQueryForm();
    this.loadEvalMainForm();
    this.$api.Evaluate.GetLevel().then((res) => {
      this.levelData = res;
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
      this.$api.Evaluate.GetEvaluateList(this.formSearch).then((res) => {
        console.log(res.items);
        this.tableData = res.items;
        this.page.total = res.totalCount;
      });
    },
    //评价主体
    loadEvalMainForm() {
      this.$api.Evaluate.GetEvalMainList().then((res) => {
        console.log(res.items);
        this.evalData = res.items;
      });
    },
    //评审次数
    jumpDetail(row) {
      let menu = this.registerMenu.find((x) => x.name == "履约评价").subMenus;
      let id = menu.find((x) => x.name == "评价预警").index;
      bus.$emit("changeSub", id);
      this.$router.push({
        path: "/Evaluate/alarm",
        query: { row },
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
