<!--  -->
<template>
  <div class="" style="margin-top:10px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>首轮回标及澄清回标</span>
        <el-select
          v-model="sectionId"
          @change="sectionNameChange()"
          clearable
          size="small"
          style="float: right;"
          placeholder="请选择招标方式："
        >
          <el-option v-for="item in sectionDropDownList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div class="text item">
        <!-- 主表数据 -->
        <el-table
          empty-text="暂无数据"
          :row-class-name="selectedRow"
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="docBackCenterList"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column label="标段" align="center" prop="sectionName"></el-table-column>
          <el-table-column label="类型" align="center" prop="masterType"></el-table-column>
          <el-table-column label="回标截止时间" align="center" prop="backEndDate">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.backEndDate, "yyyy-MM-dd hh:mm") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="查看明细" align="center">
            <template slot-scope="scope">
              <el-radio @change="GetBackDetailList01(scope.row)" v-model="selectedRowId" :label="scope.row.rowId" style="color:#409eff;"
                >查看明细</el-radio
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span
          ><div v-if="this.docBackCenterList.length > 0">{{ this.masterType }}明细</div></span
        >
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div class="text item">
        <el-table
          empty-text="暂无数据"
          :row-class-name="status_change"
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="backDetailList"
          v-loading="loading2"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column align="left" label="供应商名称" min-width="160">
            <template slot-scope="scope">
              <el-link type="primary" style="color:#409eff;text-decoration: none" @click="jumpDetail(scope.row.supplierId)">{{
                scope.row.comFullName
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="投标联系人" align="center" prop="personName"></el-table-column>
          <el-table-column label="联系电话" align="center" prop="mobilePhone"></el-table-column>
          <el-table-column label="回标状态" align="center" prop="backStatus"></el-table-column>
          <el-table-column label="回标IP地址" align="center" prop="ipAddress">
            <template slot-scope="scope">
              <span :style="{ color: scope.row.showColor ? 'red' : '' }">{{ scope.row.ipAddress }}</span>
            </template>
          </el-table-column>
          <el-table-column label="回标时间" align="center" prop="backTime"></el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 附表信息 -->
  </div>
</template>

<script>
import { dateFormat } from "@/util/validate";
import { parseTime } from "@/util";
export default {
  components: {
    // publicUpload: () => import("@/components/publicUpload.vue"),
  },
  props: ["id"],
  data() {
    return {
      sectionId: "",
      sectionName: "",
      selectedRowId: "",
      pageMessage: "",
      sectionDropDownList: [],

      docBackCenterList: [], //  主表数据

      loading2: false, // 附表loading
      backDetailList: [], //  副表数据
      masterType: "",
      supplierBackViewData: [],
      chengQingTimes: [],
      chengQingList: [],
      tableList: [],
      tableList2: [],
      explainIndex: 0,
      activeName: "",
      supplierId: "",
      supplierList: [],
      activeName1: "首次回标",
      activeName2: "",
      activeName3: "",
      value: "",
      sectionName: "",
      tableList1: [],
      supplierId: "",
      loading: false,
      dialogVisible: false,
      uploadData: {},
      fileType: [".xls", ".xlsx"],
      condition: "允许文件类型：.xls|.xlsx 格式 最大：10 兆",
      obj: {},
      getUploadUrl1: "/api/FileUpload/BidAnswerAttach",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.CheckUserProcessPageAuth();
  },
  methods: {
    parseTime,
    tomethgohuibiao() {
      this.CheckUserProcessPageAuth();
    },
    CheckUserProcessPageAuth() {
      this.$http.get("/BidCheckCenter/CheckUserProcessPageAuth", { params: { baseId: this.id } }).then(res => {
        if (res.data.success) {
          if (!res.data.returnValue1) {
            this.GetSectionDropDownList();
          } else {
            this.$router.push({
              path: res.data.returnValue1,
            });
          }
        } else {
          this.$router.push({
            path: "/bid/notice/",
          });
        }
      });
    },
    sectionNameChange() {
      this.GetDocBackCenterPageShow01();
    },
    selectedRow({ row }) {
      if (row.rowId == this.selectedRowId) {
        return "table-main-row";
      }
      return "";
    },
    // 获取标段下拉，默认选中第一条
    GetSectionDropDownList() {
      this.loading = true;
      this.$http
        .get("/DocBackCenter/GetDocBackCenterPageShow01", {
          params: {
            bidModeId: this.id,
          },
        })
        .then(res => {
          this.loading = false;
          // 标段下拉数据
          if (res.data.sectionDropDownList && res.data.sectionDropDownList.length) {
            this.sectionDropDownList = res.data.sectionDropDownList;
            this.sectionId = res.data.sectionDropDownList[0].value;
            this.GetDocBackCenterPageShow01();
          } else {
            this.sectionDropDownList = [];
            this.backDetailList = [];
          }
        });
    },
    // 主表
    GetDocBackCenterPageShow01() {
      this.loading = true;
      this.docBackCenterList = [];
      this.$http
        .get("/DocBackCenter/GetDocBackCenterPageShow01", {
          params: {
            bidModeId: this.id,
            sectionId: this.sectionId,
          },
        })
        .then(res => {
          this.loading = false;
          // 主表数据
          if (res.data.docBackCenterList && res.data.docBackCenterList.length) {
            this.docBackCenterList = res.data.docBackCenterList;
            this.pageMessage = res.data.pageMessage;
            this.selectedRowId = res.data.docBackCenterList[0].rowId;
            this.GetBackDetailList01(res.data.docBackCenterList[0]);
            this.masterType = res.data.docBackCenterList[0].masterType;
          }
        });
    },
    // 副标数据
    GetBackDetailList01(row) {
      this.selectedRowId = row.rowId;
      this.masterType = row.masterType;
      this.loading2 = true;
      this.backDetailList = [];
      this.$http
        .get("/DocBackCenter/GetBackDetailList01", {
          params: {
            rowId: row.rowId,
            bidModeId: row.bidModeId,
            sectionId: row.sectionId,
          },
        })
        .then(res => {
          this.loading2 = false;
          if (res.data && res.data.length) {
            this.backDetailList = res.data;
          }
        });
    },

    status_change({ row }) {
      if (row.showColor) {
        return "table-info-row";
      }
      return "";
    },

    GetSupplierQuestionPageShow() {
      this.loading = true;
      this.$http.get("/BidDocBack/GetSupplierBackList", { params: { bidModeId: this.id } }).then(res => {
        this.tableList = res.data;
        this.activeName = res.data.length > 0 ? res.data[0].sectionId : "";
        this.loading = false;
        if (this.activeName1 == "首次回标") {
          this.GetExplainBackPageShow();
        }
      });
    },
    // GetExplainHistory() {
    //   this.dialogVisible = false;
    //   this.loading = true;
    //   let obj = {
    //     bidModeId: this.id,
    //     sectionId: this.activeName == 0 ? "" : this.activeName,
    //   };
    //   this.$http.get("/BidExplain/GetExplainHistory", { params: obj }).then(res => {
    //     this.activeName3 = res.data.length > 0 ? res.data.map(v => v.explainIndex) : [];
    //     this.tableList2 = res.data;
    //     this.loading = false;
    //   });
    // },
    GetExplainHistory() {
      this.dialogVisible = false;
      this.loading = true;
      let obj = {
        bidModeId: this.id,
        sectionId: this.activeName == 0 ? "" : this.activeName,
      };
      this.$http.get("/BidDocBack/GetExplainDocBackList", { params: obj }).then(res => {
        this.activeName3 = res.data.length > 0 ? res.data.map(v => v.explainId) : [];
        this.tableList2 = res.data;
        this.loading = false;
      });
    },
    GetExplainBackPageShow() {
      let obj = {
        bidModeId: this.id,
        sectionId: this.activeName,
      };
      this.loading = true;
      this.$http.get("/BidDocBack/GetExplainBackPageShow", { params: obj }).then(res => {
        this.tableList1 = res.data;
        this.loading = false;
      });
    },
    downLoad(url) {
      window.open(process.env.VUE_APP_API_URL + url, "_blank");
    },
    handleClick(e) {
      this.explainIndex = e.index;
      this.activeName = this.tableList.length > 0 ? this.tableList[0].sectionId : "";
      if (this.activeName1 == "首次回标") {
        this.GetExplainBackPageShow();
      } else {
        this.GetExplainHistory();
      }
    },
    handleClick1(e) {
      if (this.activeName1 == "首次回标") {
        this.GetExplainBackPageShow();
      } else {
        this.GetExplainHistory();
      }
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.pub {
  border-left: 3px solid #21468c;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background: #f4f4f4;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
}
</style>
<style>
.el-table .table-main-row {
  background-color: #ccffff;
}
.el-table .table-info-row {
  background-color: #ffffcc;
}
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
  /*padding: 18px 20px;*/
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
</style>
