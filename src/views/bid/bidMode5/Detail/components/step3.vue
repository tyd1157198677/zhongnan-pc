<template>
  <div class="border p-3">
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
    </el-table>
  </div>
</template>

<script>
/**
 * 招标采购-供应商
 */
export default {
  name: "step3",
  components: {},
  inject: ["reload"],
  data() {
    return {
      loading: false,
      form: {
        id: "",
        baseId: "",
      },
      tableData: [],
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  created: function () {
    this.getBaseInfo();
  },
  methods: {
    /**
     * 查询当前方案供应商
     */
    getBaseInfo() {
      this.loading = true;
      const { index, size } = this.page;
      const query = {
        SkipCount: (index - 1) * size,
        MaxResultCount: size,
        baseId: this.baseId,
      };
      this.$api.BidModeSupplier.GetBidModeSupplierList(query).then((res) => {
        this.loading = false;
        this.tableData = res;
      });
    },
  },
};
</script>
