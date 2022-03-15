<!-- 进度中心 -->
<template>
  <div class="">
    <el-form label-position="right" label-width="120px" :model="formSearch" size="small">
      <div class="rows">
        <div>
          <el-form-item label="操作人：">
            <el-input v-model="formSearch.userName" placeholder="请输入操作人"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="关键字：">
            <el-input v-model="formSearch.logDesc" placeholder="请输入关键字"></el-input>
          </el-form-item>
        </div>
        <div style="margin-left: 10px">
          <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
        </div>
      </div>
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
      <el-table-column prop="userName" label="操作人" width="230px" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="sp">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="creationTime" label="操作时间" align="center" width="200"> </el-table-column>
      <el-table-column prop="ipAddress" label="IP地址" align="center" width="170"> </el-table-column>
      <el-table-column prop="logDesc" label="描述" align="left"> </el-table-column>
    </el-table>
    <pagination :total="page.total" :current-page="page.current" :pageSize="page.size" @pageChange="pageChange" />
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  props: ["id"],
  data() {
    return {
      formSearch: {
        userName: "",
        logDesc: "",
      },
      tableData: [],
      page: {
        size: 15,
        current: 1,
        total: 0,
      },
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.onSubmit();
  },
  methods: {
    parseTime,
    tomethgoguoChengLog() {
      this.onSubmit();
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.current = page._currentPage;
      this.onSubmit();
    },
    onSubmit() {
      let that = this;
      if (that.loading) {
        return;
      }
      that.tableData = [];
      that.loading = true;
      const query = {
        BidModeId: this.id,
        SkipCount: (this.page.current - 1) * this.page.size,
        MaxResultCount: that.page.size,
        ...this.formSearch,
      };
      this.$http
        .get("/BidProcessLog/GetBidProcessLogList", { params: query })
        .then((res) => {
          res.data.result.items.forEach((v) => {
            v.creationTime = parseTime(v.creationTime, "yyyy-MM-dd hh:mm");
          });
          that.page.total = res.data.result.totalCount;
          that.tableData = res.data.result.items;
        })
        .finally(() => {
          that.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.rows {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
