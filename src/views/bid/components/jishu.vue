<!--  -->
<template>
  <div style="margin-top:10px">
    <el-select v-model="activeName2" @change="selectpage" style="float: right;margin-bottom:10px">
      <el-option v-for="item in supplierList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
    </el-select>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ pageMessage }}</span>
      </div>
      <div class="text item">
        <el-table empty-text="暂无数据" border element-loading-text="请稍候,数据正在加载中..." :data="openBidMainList" v-loading="loading">
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column label="标段" align="center" prop="sectionName"></el-table-column>
          <el-table-column label="类型" align="center" prop="masterType"></el-table-column>
          <el-table-column label="技术标" align="center" prop="techStatus"></el-table-column>
          <!-- <el-table-column label="商务标" align="center" prop="businessStatus"></el-table-column> -->
          <el-table-column label="计划开标时间" align="center" prop="openDate">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.openDate, "yyyy-MM-dd hh:mm") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="查看明细" align="center">
            <template slot-scope="scope">
              <el-radio
                @change="GetBidCenterDetailShow01(scope.row)"
                v-model="selectedRowId"
                :label="scope.row.rowId"
                style="color:#409eff;"
                >查看明细</el-radio
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span v-if="this.openBidMainList.length > 0">{{ this.masterType1 }}明细</span>
      </div>
      <div class="text item">
        <el-table
          key="tan1"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="backDetailList"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column align="left" label="供应商名称" min-width="160" prop="supplierName">
            <template slot-scope="scope">
              <el-link
                v-if="status == '待开'"
                type="primary"
                style="color:#409eff;text-decoration: none"
                @click="jumpDetail(scope.row.supplierId)"
                >{{ scope.row.comFullName }}</el-link
              >
              <span v-else>{{ scope.row.comFullName }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
          v-if="bidOpeningRow.masterType === '澄清开标'"
          label="技术澄清"
          align="center"
          prop="explainTechType"
        ></el-table-column>
        <el-table-column
          v-if="bidOpeningRow.masterType === '澄清开标'"
          label="商务澄清"
          align="center"
          prop="explainBusinessType"
        ></el-table-column> -->
          <el-table-column label="回标状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="技术标书" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isLockTechFilePath" class="el-icon-lock"></span>
              <span
                v-if="!scope.row.isLockTechFilePath && scope.row.techFilePath"
                class="el-icon-download"
                title="下载技术标书"
                @click="downLoad(scope.row.techFileId)"
              ></span>
            </template>
          </el-table-column>
          <el-table-column label="回标时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.bidBackTime }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- <el-tabs v-model="activeName1" @tab-click="tabsClick">
      <el-tab-pane label="首次开标" name="首次开标"> </el-tab-pane>
      <el-tab-pane label="澄清开标" name="澄清开标"> </el-tab-pane>
    </el-tabs> -->

    <!--<div>-->
    <!--<div style="margin-bottom:10px;color:red">{{ this.pageMessage }}</div>-->
    <!---->
    <!--</div>-->
    <!--<div>-->
    <!--<div v-if="this.openBidMainList.length > 0" style="margin-bottom:10px;font-size:15px;color:red">{{ this.masterType1 }}明细</div>-->
    <!---->
    <!--</div>-->
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      id: this.$route.query.id,
      sectionId: this.$route.query.sectionId,
      type: 0,
      activeName1: "",
      activeName2: "",
      activeName3: [],
      pageMessage: "",
      loading: false,
      tableData: [],
      selectedRowId: "",
      openBidMainList: [],
      backDetailList: [],
      status: "",
      tableList2: { openTechExplainList: [] },
      supplierList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.type = this.$route.query.type;
    if (this.type == 1) {
      this.activeName1 = "首次开标";
    } else {
      this.activeName1 = "澄清开标";
    }
    this.GetSupplierInPageShow1();
  },
  methods: {
    parseTime,
    selectpage() {
      this.GetSupplierInPageShow2();
    },
    GetSupplierInPageShow1() {
      this.$http.get("/OpenBidCenter/GetOpenTechPageMain001", { params: { bidModeId: this.id } }).then(res => {
        // this.supplierList = res.data.sectionDropDownList;
        // this.activeName2 = res.data.sectionDropDownList[0].value;
        this.activeName2 = res.data.sectionDropDownList.length > 0 ? res.data.sectionDropDownList[0].value : "";
        // this.pageMessage = res.data.pageMessage;
        // this.openBidMainList = res.data.openBidMainList;
        // this.selectedRowId = res.data.openBidMainList[0].rowId;
        this.GetSupplierInPageShow2();
        this.GetBidCenterDetailShow01(res.data.openBidMainList[0]);
        this.masterType1 = res.data.openBidMainList[0].masterType;
      });
    },
    GetSupplierInPageShow2() {
      this.$http.get("/OpenBidCenter/GetOpenTechPageMain001", { params: { bidModeId: this.id, sectionId: this.sectionId } }).then(res => {
        this.supplierList = res.data.sectionDropDownList;
        // this.activeName2 = res.data.sectionDropDownList[0].value;
        // this.activeName2 = res.data.sectionDropDownList.length > 0 ? res.data.sectionDropDownList[0].value : "";
        this.pageMessage = res.data.pageMessage;
        this.openBidMainList = res.data.openBidMainList;
        this.selectedRowId = res.data.openBidMainList[0].rowId;
        this.GetBidCenterDetailShow01(res.data.openBidMainList[0]);
        this.masterType1 = res.data.openBidMainList[0].masterType;
      });
    },
    GetBidCenterDetailShow01(row) {
      // this.showOpenTechButton = false;
      // this.isLockBusinessFilePath = false;
      this.masterType1 = row.masterType;
      this.bidOpeningRow = row;
      this.selectedRowId = row.rowId;
      this.loading2 = true;
      this.backDetailList = [];
      this.$http
        .get("/OpenBidCenter/GetTechDetailShow001", {
          params: {
            rowId: row.rowId,
            bidModeId: this.id,
            sectionId: this.activeName2,
          },
        })
        .then(res => {
          this.loading2 = false;
          // this.pageMessage = res.data.pageMessage;
          let openBidSupplierDetailList = res.data.openBidSupplierDetailList || [];
          if (openBidSupplierDetailList && openBidSupplierDetailList.length) {
            this.backDetailList = openBidSupplierDetailList;
          }
          this.isLockBusinessFilePath = res.data.openBidSupplierDetailList[0].isLockBusinessFilePath;
          this.showOpenTechButton = res.data.showOpenTechButton;
          this.showOpenBusinessButton = res.data.showOpenBusinessButton;
        });
    },
    GetSupplierInPageShow() {
      this.$http.get("/OpenBidCenter/GetTechDetailShow001", { params: { bidModeId: this.id, sectionId: this.sectionId } }).then(res => {
        this.tableData = res.data.supplierList;
        // this.pageMessage = res.data.pageMessage;
      });
    },
    GetExplainHistory() {
      this.dialogVisible = false;
      this.loading = true;
      let obj = {
        bidModeId: this.id,
        sectionId: this.activeName2,
      };
      this.$http.get("/BidExplain/GetOpenTechExplainPageShow", { params: obj }).then(res => {
        this.activeName3 = res.data.openTechExplainList.length > 0 ? res.data.openTechExplainList.map(v => v.explainIndex) : [];
        this.tableList2 = res.data;
        this.loading = false;
      });
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
    tabsClick(e) {
      if (e.name == "首次开标") {
        this.GetSupplierInPageShow();
      } else {
        this.GetExplainHistory();
      }
    },
    tabsClick1(e) {
      if (this.activeName1 == "首次开标") {
        this.GetSupplierInPageShow();
      } else {
        this.GetExplainHistory();
      }
    },
    downLoad(techFileId) {
      // window.location.href = process.env.VUE_APP_API_URL + url;
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidOpenDownLoad002?fileId=" + techFileId);
    },
  },
};
</script>
<style lang="scss" scoped>
// ::v-deep.el-dialog__body {
//   padding: 20px !important;
// }
::v-deep .el-card__body {
  padding: 0px;
}
</style>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 0px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card__body {
  padding: 0px;
}

.box-card {
  /*width: 480px;*/
}
.el-card__header {
  height: 60px;
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
</style>
