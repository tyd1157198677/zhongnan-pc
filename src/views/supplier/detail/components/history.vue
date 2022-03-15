<template>
  <div class="">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="历史邀请及报名" name="历史邀请及报名">
        <el-table
          style="width:100%"
          height="420"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableDatayao"
          v-loading="loading"
        >
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="projectName" min-width="250" label="项目名称" align="center"> </el-table-column>
          <el-table-column prop="planName" min-width="250" label="招标计划名称" align="center"> </el-table-column>
          <el-table-column prop="signUpDate" label="邀请日期" align="center" width="100"> </el-table-column>
          <el-table-column prop="bidSignUpType" label="邀请方式" align="center" width="100"> </el-table-column>
          <!-- <el-table-column prop="su" label="邀请时间" align="center" width="150"> </el-table-column> -->
          <el-table-column prop="supplierInDesc" label="备注" align="center" min-width="100"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="历史投标及中标" name="历史投标及中标">
        <el-table
          style="width:100%"
          height="420"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="projectName" min-width="200" label="项目名称" align="center"> </el-table-column>
          <el-table-column prop="planName" min-width="200" label="招标计划名称" align="center"> </el-table-column>
          <el-table-column prop="sectionName" label="标段名称" align="center" width="200"> </el-table-column>
          <el-table-column prop="supplierInStatus" label="是否入围" align="center" width="100"> </el-table-column>
          <el-table-column prop="backDate" label="回标日期" align="center" width="100"> </el-table-column>
          <el-table-column prop="isWin" label="是否中标" align="center" width="100"> </el-table-column>
          <el-table-column prop="winPrice" label="中标金额" align="center" width="100"> </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
      tableData: [],
      tableDatayao: [],
      activeName: "历史邀请及报名",
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.getList();
    this.getListyao();
  },
  methods: {
    async getList() {
      // let obj = {
      //   supGuid: this.baseGuid,
      // };
      this.loading = true;
      let res = await this.$http.get("/DivideReport/GetSupplierBidStat", { params: { supplierId: this.id } });
      if (res.status == 200) {
        this.loading = false;
        res.data.forEach(v => {
          v.isWin = v.isWin ? "是" : "否";
        });
        this.tableData = res.data;
      }
    },
    async getListyao() {
      this.loading = true;
      let res = await this.$http.get("/DivideReport/GetSupplierSignStat", { params: { supplierId: this.id } });
      if (res.status == 200) {
        this.loading = false;
        this.tableDatayao = res.data;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
