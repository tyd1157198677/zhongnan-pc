<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4"> <kind-nav @itemClick="onChangeKind" /></el-col>
      <el-col :span="20">
        <!-- <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>供方信息</el-breadcrumb-item>
          <el-breadcrumb-item>供方资质库</el-breadcrumb-item>
        </el-breadcrumb> -->
        <el-form :inline="true" :model="formSearch" size="small" class="border p-2 mb-2 mt-0">
          <el-form-item label="供方名称：">
            <el-input v-model="formSearch.ComFullName"></el-input>
          </el-form-item>
          <el-form-item label="供方分类：">
            <el-input v-model="formSearch.SupCateNames"></el-input>
          </el-form-item>
          <el-form-item label="资质名称：">
            <el-input v-model="formSearch.CerName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
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
          <el-table-column prop="comFullName" label="供方名称">
            <template slot-scope="scope">
              <!-- <i class="el-icon-search"></i> -->
              <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpSuppInfo(scope.row.baseGuid)">{{
                scope.row.comFullName
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="supCateNames" label="主营分类"> </el-table-column>
          <el-table-column prop="cerName" label="资质名称"> </el-table-column>
          <el-table-column prop="outDate" label="有效期至" align="center"> </el-table-column>
          <el-table-column label="到期剩余（天）" align="center">
            <template slot-scope="scope">
              {{ dateDiff(scope.row.outDate) }}
            </template>
          </el-table-column>
          <el-table-column label="查看资质" width="90" align="center">
            <template slot-scope="scope">
              <!-- <el-image style="width: 80px; height: 80px" :src="joinImgPath(scope.row)" :preview-src-list="[joinImgPath(scope.row)]">
                <div slot="error" class="image-slot"><i class="el-icon-picture-outline"></i>加载失败</div>
              </el-image> -->
              <i class="el-icon-picture" title="资质预览" @click="preview(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination-detail"
          background
          prev-text="上一页"
          next-text="下一页"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.index"
          :page-sizes="[10, 20]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next"
          :total="page.total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import KindNav from "./components/KindNav";
import dayjs from "dayjs";
export default {
  components: {
    KindNav,
  },
  data() {
    return {
      formSearch: {
        ComFullName: "",
        SupCateNames: "",
        CerName: "",
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
    this.onSubmit();
  },
  methods: {
    joinImgPath(item) {
      return `${process.env.VUE_APP_API_URL}${item.filePath}${item.fileReName}`;
    },
    dateDiff(date) {
      return dayjs(date).diff(new Date(), "day");
    },
    onSubmit() {
      if (this.loading) {
        return;
      }
      this.tableData = [];
      let that = this;
      this.loading = true;
      this.$api.SupBaseInfo.GetSupCerPageList(this.formSearch, this.page.index, this.page.size)
        .then((res) => {
          that.page.total = res.totalCount;
          that.tableData = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onChangeKind(kind) {
      this.formSearch.SupCateNames = kind;
      this.onSubmit();
    },
    jumpSuppInfo(id) {
      window.open(`#/supplier/detail/${id}`);
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.onSubmit();
    },
    handleCurrentChange(val) {
      this.page.index = val;
      this.onSubmit();
    },
    preview(row) {
      const url = this.joinImgPath(row);
      this.$openPreview([url]);
    },
  },
};
</script>

<style scoped>
/deep/ .el-select {
  width: 100%;
}

/deep/ .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
</style>
