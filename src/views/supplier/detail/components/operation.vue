<template>
  <div style="margin-bottom: 100px">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="infonametits">运维日志</span>
        </template>
        <div class="right1" style="margin-bottom: 10px">
          <el-input v-model="KeyWords" style="margin-right: 10px; width: 200px" placeholder="请输入关键字" clearable />
          <el-button type="primary" size="small" @click="search()">搜索</el-button>
        </div>
        <el-table :data="lianxirenlist" border>
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column prop="module" label="模块" align="center" width="300"> </el-table-column>
          <el-table-column prop="desc" label="内容" align="left"> </el-table-column>
          <el-table-column prop="operatingTime" label="修改时间" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.operatingTime, "yyyy-MM-dd hh:ss") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="操作人" align="center" width="120"> </el-table-column>
          <el-table-column prop="email" label="操作" align="center" width="100">
            <template slot-scope="scope">
              <i class="el-icon-download" v-if="scope.row.fileId" title="下载" @click="downLoad(scope.row.fileId)"></i>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageAChange" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      KeyWords: "",
      activeNames: ["1"],
      lianxirenlist: [],
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
    };
  },
  mounted() {
    this.lianxirenDataList();
  },
  methods: {
    parseTime,
    search() {
      this.lianxirenDataList();
    },
    pageAChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.lianxirenDataList();
    },
    lianxirenDataList() {
      let obj = {
        params: {
          SupplierId: this.id,
          KeyWords: this.KeyWords,
          SkipCount: (this.page.index - 1) * this.page.size,
          MaxResultCount: this.page.size,
        },
      };
      this.$http
        .get("/SysOperationLog/OperationLogList", obj)
        .then((res) => {
          this.lianxirenlist = res.data.items;
          this.page.total = res.data.totalCount;
        })
        .finally(() => {});
    },
    downLoad(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/UploadFileById?fileId=" + id, "_blank");
    },
  },
};
</script>

<style scoped>
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}

.layui-table {
  width: 100%;
  background-color: #fff;
  color: #666;
  border-top: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}

.layui-table td,
.layui-table th {
  position: relative;
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}

.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: rgba(0, 0, 0, 0.03);
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
</style>
