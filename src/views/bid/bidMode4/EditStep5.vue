<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu-other />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>选择供方</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="fromborder mt-2">
          <div class="alert alert-primary" role="alert" v-if="!haveSupplier">
            {{ message }}
          </div>
          <div v-else>
            <div class="float-right mb-2">
              <el-button type="primary" @click="selectSupVisible = true" size="small">添加供方</el-button>
            </div>
            <el-table
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData"
              v-loading="loading"
            >
              <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
              <el-table-column prop="supplierName" label="供方名称"> </el-table-column>
              <el-table-column prop="regCapital" label="注册资金">
                <template slot-scope="scope"> {{ scope.row.regCapital }} 万元 </template>
              </el-table-column>
              <el-table-column prop="supCateNames" label="供方分类"></el-table-column>
              <el-table-column label="操作" width="90" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-circle-close" @click="delSup(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
            <!-- <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" /> -->
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="95%">
      <supplier-list @itemClick="onSelectSups" />
    </el-dialog>
  </el-main>
</template>

<script>
/**
 * 招标采购-邀请供方
 */
import PlanMenuOther from "../components/PlanMenuOther";
import SupplierList from "@/components/SupplierList";

export default {
  name: "Step5",
  components: {
    PlanMenuOther,
    SupplierList,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  inject: ["reload"],
  data() {
    return {
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      tableData: [],
      loading: false,
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rules: {},
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
  },
  mounted() {
    this.CheckHaveSupplier();
  },
  methods: {
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.loadData();
    },
    onSelectSups(sup) {
      this.$api.BidModeSupplier.SaveSupplier({
        baseId: this.baseId,
        supplierId: sup.id,
      }).then((res) => {
        if (res.success) {
          this.$message.success("添加成功");
          this.loadData();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    CheckHaveSupplier() {
      this.$api.BidModeSupplier.CheckHaveSupplier(this.baseId).then((res) => {
        this.haveSupplier = res.success;
        if (this.haveSupplier) {
          this.loadData();
        } else {
          this.message = res.message;
        }
      });
    },
    loadData() {
      const { index, size } = this.page;
      const query = {
        SkipCount: (index - 1) * size,
        MaxResultCount: size,
        baseId: this.baseId,
      };
      this.$api.BidModeSupplier.GetBidModeSupplierList(query).then((res) => {
        this.tableData = res;
      });
    },
    delSup(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.BidModeSupplier.DeleteBidModeSupplier(row.id).then((res) => {
          if (res.success) {
            this.loadData();
          } else {
            this.$message.error(res.message);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 2% 0 120px;
  height: 100%;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: #ffffff;
  position: relative;
  /* width: 88%; */
  border-radius: 10px 10px 0 0;
  overflow: auto;
}

.buttoncss {
  float: right;
  margin-top: 12px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}
</style>
