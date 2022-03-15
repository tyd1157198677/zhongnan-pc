<!--  -->
<template>
  <div style="margin-top:10px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-select v-model="activeName2" @change="selectchange" @tab-click="tabsClick1" style="float: right;">
          <el-option v-for="item in supplierList" :key="item.id" :label="item.sectionName" :value="item.id"> </el-option>
        </el-select>
      </div>
      <div class="text item">
        <el-table
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData.businessScoreList"
          v-loading="loading"
        >
          <el-table-column label="排名" width="80" align="center" prop="sort"> </el-table-column>
          <el-table-column label="投标方" min-width="300" align="center" prop="comFullName"> </el-table-column>
          <el-table-column v-for="(item, index) in tableData.titleList" :key="item" :label="item" align="center" prop="finalScoreList">
            <template slot-scope="scope">
              <span>{{ scope.row.finalScoreList[index] }}</span>
            </template>
            <el-table-column label="含税总金额" align="center" prop="amount">
              <template slot-scope="scope">
                <span>{{ scope.row.amount[index] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="得分" align="center" prop="finalScoreList">
              <template slot-scope="scope">
                <span>{{ scope.row.finalScoreList[index] }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="最新得分" width="120" align="center" prop="finalScore"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      sectionId: this.$route.query.sectionId,
      type: 0,
      activeName1: "",
      activeName2: "",
      activeName3: [],
      pageMessage: "",
      titleList: [],
      loading: false,
      tableData: [],
      tableList2: { openTechExplainList: [] },
      supplierList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.type = this.$route.query.type;
    this.GetSupplierInPageShow1();
  },
  methods: {
    selectchange() {
      this.GetExamTechFinalScore();
    },
    GetSupplierInPageShow1() {
      this.$http.get("/BidOpen/GetOpenTechShowPage", { params: { bidModeId: this.id } }).then(res => {
        this.supplierList = res.data.sectionList;
        this.activeName2 = res.data.thisSectionId;
        this.GetExamTechFinalScore();
      });
    },
    GetExamTechFinalScore() {
      this.$http
        .get("/BidExamScore/GetExamBusinessFinalScore", { params: { bidModeId: this.id, sectionId: this.activeName2 } })
        .then(res => {
          this.tableData = res.data;
          // this.pageMessage = res.data.pageMessage;
        });
    },
    // GetExamTechFinalScore() {
    //   let obj = {
    //     bidModeId: this.id,
    //     sectionId: this.activeName2,
    //   };
    //   this.$http.get("", { params: obj }).then(res => {
    //     this.tableList2 = res.data;
    //     this.activeName3 = res.data.openTechExplainList.length > 0 ? res.data.map(v => v.explainIndex) : [];
    //     this.loading = false;
    //   });
    // },
    // jumpDetail(id) {
    //   window.open(`#/supplier/detail/${id}`);
    // },
    tabsClick() {},
    tabsClick1() {},
    // tabsClick(e) {
    //   if (e.name == "首次开标") {
    //     this.GetSupplierInPageShow();
    //   } else {
    //     this.GetExplainHistory();
    //   }
    // },
    // tabsClick1(e) {
    //   if (this.activeName1 == "首次开标") {
    //     this.GetSupplierInPageShow();
    //   } else {
    //     this.GetExplainHistory();
    //   }
    // },
    // downLoad(url) {
    //   window.location.href = process.env.VUE_APP_API_URL + url;
    // },
  },
};
</script>
<style lang="scss" scoped>
// ::v-deep.el-dialog__body {
//   padding: 20px !important;
// }
</style>
