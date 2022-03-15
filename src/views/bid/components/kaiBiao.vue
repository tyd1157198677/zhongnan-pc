<!--  -->
<template>
  <div class="" style="margin-top:10px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ pageMessage }}</span>
        <el-button v-if="showOpenTechButton" style="float:right;margin-left: 10px;" type="danger" size="mini" @click="bidOpening('A')"
          >开技术标</el-button
        >
        <el-button v-if="showOpenBusinessButton" style="float:right; margin-left: 10px;" type="danger" size="mini" @click="bidOpening('B')"
          >开商务标</el-button
        >
        <el-select v-model="sectionId" style="float:right" @change="sectionNameChange()" size="small" placeholder="请选择招标方式：">
          <el-option v-for="item in sectionDropDownList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div class="text item">
        <el-table
          empty-text="暂无数据"
          :row-class-name="selectedRow"
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="openBidMainList"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column label="标段" align="center" prop="sectionName"></el-table-column>
          <el-table-column label="类型" align="center" prop="masterType"></el-table-column>
          <el-table-column label="技术标" align="center" prop="techStatus"></el-table-column>
          <el-table-column label="商务标" align="center" prop="businessStatus"></el-table-column>
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
    <!--<div style="margin-top:10px;width:100%">-->
    <!--<el-select v-model="sectionId" style="float:left" @change="sectionNameChange()" clearable size="small" placeholder="请选择招标方式：">-->
    <!--<el-option v-for="item in sectionDropDownList" :key="item.value" :label="item.text" :value="item.value"> </el-option>-->
    <!--</el-select>-->
    <!--<div style="width:100%">-->
    <!--<div-->
    <!--style="height:40px;color:#E6A23C;width:80%;float:right;margin-bottom:10px;padding:8px 16px;border-radius:4px;background-color:#fdf6ec"-->
    <!--&gt;-->
    <!--{{ pageMessage }}-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div>-->
    <!--<br />-->
    <!--<br />-->
    <!--<div style="margin-top:10px">-->
    <!--<el-button v-if="showOpenTechButton" style="float:right;margin-bottom:10px" type="danger" size="mini" @click="bidOpening('A')"-->
    <!--&gt;开技术标</el-button-->
    <!--&gt;-->
    <!--<el-button-->
    <!--v-if="showOpenBusinessButton"-->
    <!--style="float:right;margin-right:10px;margin-bottom:10px"-->
    <!--type="danger"-->
    <!--size="mini"-->
    <!--@click="bidOpening('B')"-->
    <!--&gt;开商务标</el-button-->
    <!--&gt;-->
    <!--</div>-->
    <!--</div>-->
    <!-- 主表数据 -->
    <!--<el-table-->
    <!--empty-text="暂无数据"-->
    <!--:row-class-name="selectedRow"-->
    <!--border-->
    <!--element-loading-text="请稍候,数据正在加载中..."-->
    <!--:data="openBidMainList"-->
    <!--v-loading="loading"-->
    <!--style="margin-bottom: 20px"-->
    <!--&gt;-->
    <!--<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>-->
    <!--<el-table-column label="标段" align="center" prop="sectionName"></el-table-column>-->
    <!--<el-table-column label="类型" align="center" prop="masterType"></el-table-column>-->
    <!--<el-table-column label="技术标" align="center" prop="techStatus"></el-table-column>-->
    <!--<el-table-column label="商务标" align="center" prop="businessStatus"></el-table-column>-->
    <!--<el-table-column label="计划开标时间" align="center" prop="openDate">-->
    <!--<template slot-scope="scope">-->
    <!--<span>{{ parseTime(scope.row.openDate, "yyyy-MM-dd hh:mm") }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="查看明细" align="center">-->
    <!--<template slot-scope="scope">-->
    <!--<el-radio @change="GetBidCenterDetailShow01(scope.row)" v-model="selectedRowId" :label="scope.row.rowId" style="color:#409eff;"-->
    <!--&gt;查看明细</el-radio-->
    <!--&gt;-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->

    <!-- 副表信息 -->
    <el-card class="box-card" style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span>{{ this.masterType1 }}明细</span>
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
          <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
          <el-table-column align="left" label="供应商名称" min-width="250" prop="supplierName" fixed>
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
          <el-table-column
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
          ></el-table-column>
          <el-table-column label="回标状态" align="center" width="110" fixed>
            <template slot-scope="scope">
              <span>{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否响应招标文件" align="center" width="150" v-if="showif1">
            <template slot-scope="scope">
              <span v-if="scope.row.fitFile === '否'" style="color:red">{{ scope.row.fitFile }}</span>
              <span v-else>{{ scope.row.fitFile }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否响应工期" align="center" width="120" v-if="showif1">
            <template slot-scope="scope">
              <span v-if="scope.row.month === '否'" style="color:red">{{ scope.row.month }}</span>
              <span v-else>{{ scope.row.month }}</span>
            </template>
          </el-table-column>
          <el-table-column label="技术标书" v-if="showbiao" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isLockTechFilePath" class="el-icon-lock"></span>
              <span
                v-if="!scope.row.isLockTechFilePath && scope.row.techFilePath"
                class="el-icon-download"
                title="下载技术标书"
                @click="downLoadtech(scope.row.techFileId)"
              ></span>
            </template>
          </el-table-column>
          <el-table-column label="商务标书" v-if="showbiao" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isLockBusinessFilePath" class="el-icon-lock"></span>
              <span
                v-if="!scope.row.isLockBusinessFilePath && scope.row.businessFilePath"
                class="el-icon-download"
                title="下载商务标书"
                @click="downLoadbusiness(scope.row.businessFileId)"
              ></span>
            </template>
          </el-table-column>
          <el-table-column label="技术澄清回函" v-if="showhui" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isLockTechFilePath" class="el-icon-lock"></span>
              <span
                v-if="!scope.row.isLockTechFilePath && scope.row.techFilePath"
                class="el-icon-download"
                title="下载技术澄清回函"
                @click="downLoadtech(scope.row.techFileId)"
              ></span>
            </template>
          </el-table-column>
          <el-table-column label="商务澄清回函" v-if="showhui" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isLockBusinessFilePath" class="el-icon-lock"></span>
              <span
                v-if="!scope.row.isLockBusinessFilePath && scope.row.businessFilePath"
                class="el-icon-download"
                title="下载商务澄清回函"
                @click="downLoadbusiness(scope.row.businessFileId)"
              ></span>
            </template>
          </el-table-column>
          <el-table-column label="投标总金额" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isLockBusinessFilePath" class="el-icon-lock"></span>
              <span v-else>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="不响应招标文件的原因" align="center" width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.fitFileMes }}</span>
              <!-- <span v-else>{{ scope.row.amountNoTax }}</span> -->
            </template>
          </el-table-column>
          <el-table-column label="不响应工期的原因" align="center" width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.monthMes }}</span>
              <!-- <span v-else>{{ scope.row.taxAmount }}</span> -->
            </template>
          </el-table-column>
          <!-- <el-table-column label="税率" align="center" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.isLockBusinessFilePath" class="el-icon-lock"></span>
              <span v-else>{{ scope.row.taxPercent }}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="IP地址" align="center" prop="ipAddress">
            <template slot-scope="scope">
              <span :style="{ color: scope.row.showColor ? 'red' : '' }">{{ scope.row.ipAddress }}</span>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span>历史报价</span>
      </div>
      <div class="text item">
        <el-table
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="historyPrice.supplierPriceList"
        >
          <el-table-column type="index" width="60" label="序号" align="center" fixed="left"> </el-table-column>
          <el-table-column align="left" min-width="260" show-overflow-tooltip fixed="left">
            <template slot-scope="scope">
              <el-link type="primary" style="color:#409eff;text-decoration: none" @click="jumpDetail(scope.row.supplierId)">{{
                scope.row.comFullName
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in historyPrice.titleNames" :key="item" :label="item" width="200" align="center">
            <el-table-column width="150" label="投标总金额" align="center">
              <template slot-scope="scope"
                ><span>{{ scope.row.priceList[0 + index * 4] }}</span></template
              >
            </el-table-column>
            <!-- <el-table-column width="100" label="不含税金额" align="center">
                <template slot-scope="scope"
                  ><span>{{ scope.row.priceList[1 + index * 4] }}</span></template
                >
              </el-table-column>
              <el-table-column width="100" label="税金" align="center">
                <template slot-scope="scope"
                  ><span>{{ scope.row.priceList[2 + index * 4] }}</span></template
                >
              </el-table-column>
              <el-table-column width="100" label="税率" align="center">
                <template slot-scope="scope"
                  ><span>{{ scope.row.priceList[3 + index * 4] }}</span></template
                >
              </el-table-column> -->
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!--<div v-if="this.openBidMainList.length > 0" style="margin-bottom:10px;font-size:15px;color:red">{{ this.masterType1 }}明细</div>-->
    <!--<el-table-->
    <!--key="tan1"-->
    <!--empty-text="暂无数据"-->
    <!--stripe-->
    <!--border-->
    <!--element-loading-text="请稍候,数据正在加载中..."-->
    <!--:data="backDetailList"-->
    <!--v-loading="loading"-->
    <!--&gt;-->
    <!--<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>-->
    <!--<el-table-column label="供应商名称" min-width="160" prop="supplierName">-->
    <!--<template slot-scope="scope">-->
    <!--<el-link-->
    <!--v-if="status == '待开'"-->
    <!--type="primary"-->
    <!--style="color:#409eff;text-decoration: none"-->
    <!--icon="el-icon-search"-->
    <!--@click="jumpDetail(scope.row.supplierId)"-->
    <!--&gt;{{ scope.row.comFullName }}</el-link-->
    <!--&gt;-->
    <!--<span v-else>{{ scope.row.comFullName }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--v-if="bidOpeningRow.masterType === '澄清开标'"-->
    <!--label="技术澄清"-->
    <!--align="center"-->
    <!--prop="explainTechType"-->
    <!--&gt;</el-table-column>-->
    <!--<el-table-column-->
    <!--v-if="bidOpeningRow.masterType === '澄清开标'"-->
    <!--label="商务澄清"-->
    <!--align="center"-->
    <!--prop="explainBusinessType"-->
    <!--&gt;</el-table-column>-->
    <!--<el-table-column label="回标状态" align="center">-->
    <!--<template slot-scope="scope">-->
    <!--<span>{{ scope.row.status }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="技术标书" align="center" width="120">-->
    <!--<template slot-scope="scope">-->
    <!--<span v-if="scope.row.isLockTechFilePath" class="el-icon-lock"></span>-->
    <!--<span-->
    <!--v-if="!scope.row.isLockTechFilePath && scope.row.techFilePath"-->
    <!--class="el-icon-download"-->
    <!--title="下载技术标书"-->
    <!--@click="downLoad(scope.row.techFilePath)"-->
    <!--&gt;</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="商务标书" align="center" width="120">-->
    <!--<template slot-scope="scope">-->
    <!--<span v-if="scope.row.isLockBusinessFilePath" class="el-icon-lock"></span>-->
    <!--<span-->
    <!--v-if="!scope.row.isLockBusinessFilePath && scope.row.businessFilePath"-->
    <!--class="el-icon-download"-->
    <!--title="下载商务标书"-->
    <!--@click="downLoad(scope.row.businessFilePath)"-->
    <!--&gt;</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="含税总价" align="center">-->
    <!--<template slot-scope="scope">-->
    <!--<span v-if="scope.row.isLockBusinessFilePath" class="el-icon-lock"></span>-->
    <!--<span v-else>{{ scope.row.amount }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--&lt;!&ndash; <el-table-column label="IP地址" align="center" prop="ipAddress">-->
    <!--<template slot-scope="scope">-->
    <!--<span :style="{ color: scope.row.showColor ? 'red' : '' }">{{ scope.row.ipAddress }}</span>-->
    <!--</template>-->
    <!--</el-table-column> &ndash;&gt;-->
    <!--</el-table>-->

    <el-dialog width="40%" title="上传文件" :visible.sync="dialogVisible">
      <public-upload
        @fatherMethod="GetOpenPageNavigate"
        :fileType="fileType"
        :url="getUploadUrl1"
        :condition="condition"
        :obj="obj"
        :maxValue="10"
      ></public-upload>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    publicUpload: () => import("@/components/publicUpload.vue"),
  },
  props: ["id"],
  data() {
    return {
      sectionId: "",
      sectionName: "",
      selectedRowId: "",
      sectionDropDownList: [],
      bidOpeningRow: {},
      pageMessage: "",
      openBidMainList: [], //  主表数据
      showif1: false,
      loading2: false, // 附表loading
      backDetailList: [], //  副表数据

      showOpenTechButton: false, // 是否显示【开技术标】按钮
      showOpenBusinessButton: false, // 是否显示【开商务标】按钮
      masterType1: "",
      masterType: "",
      openTechButton: false,
      openBusinessButton: false,
      showbiao: true,
      showhui: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      msg: true,
      noopen: "",
      sectionList: [],
      tableList: [],
      activeNameCq: "",
      tableListTabCQ: [],
      supplierList: [],
      tablebiaoList: [],
      tableData: [],
      tableListCq1: {},
      tableList1: {
        techSupplierList: [],
        supplierTechList: [],
        businessSupplierList: [],
        supplierBusinessList: [],
      },
      historyPrice: {},
      tableList2: {},
      pageMessage: "",
      activeName: "",
      activeName1: "first",
      activeName2: "",
      supplierId: "",
      status: "待开",
      loading: false,
      dialogVisible: false,
      examMethod: "", //综合评标法还是低价法
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
    tomethgokaibiao() {
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
      this.GetBidCenterPageMain01();
    },
    selectedRow({ row }) {
      if (row.rowId == this.selectedRowId) {
        return "table-main-row";
      }
      return "";
    },
    GetHistoryPrice38() {
      this.$http.get("/ExplainCenter/GetHistoryPrice38", { params: { bidModeId: this.id, sectionId: this.sectionId } }).then(res => {
        this.historyPrice = res.data;
      });
    },
    // 获取标段下拉，默认选中第一条
    GetSectionDropDownList() {
      this.loading = true;
      this.$http
        .get("/OpenBidCenter/GetBidCenterPageMain01", {
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
            this.GetBidCenterPageMain01();
            this.GetHistoryPrice38();
          } else {
            this.sectionDropDownList = [];
            this.backDetailList = [];
          }
        });
    },
    // 主表
    GetBidCenterPageMain01() {
      this.openBidMainList = [];
      this.bidOpeningRow = {};
      this.loading = true;
      this.$http
        .get("/OpenBidCenter/GetBidCenterPageMain01", {
          params: {
            bidModeId: this.id,
            sectionId: this.sectionId,
          },
        })
        .then(res => {
          this.loading = false;
          // 主表数据
          if (res.data.openBidMainList && res.data.openBidMainList.length) {
            this.masterType1 = res.data.openBidMainList[0].masterType;
            this.openBidMainList = res.data.openBidMainList;
            this.selectedRowId = res.data.openBidMainList[0].rowId;
            this.bidOpeningRow = res.data.openBidMainList[0];
            this.GetBidCenterDetailShow01(res.data.openBidMainList[0]);
            this.pageMessage = res.data.pageMessage;
          }
        });
    },
    // 副标数据
    GetBidCenterDetailShow01(row) {
      this.showOpenTechButton = false;
      this.showOpenBusinessButton = false;
      this.masterType1 = row.masterType;
      // if (this.masterType1 === "首次开标") {
      //   if (this.bidOpeningRow.fitFile == "") {
      //     this.showif1 = true;
      //   } else {
      //     this.showif1 = false;
      //   }
      // } else {
      //   this.showif1 = false;
      // }
      this.bidOpeningRow = row;
      this.selectedRowId = row.rowId;
      this.loading2 = true;
      this.backDetailList = [];
      if (row.rowId == row.bidModeId) {
        this.showbiao = true;
        this.showhui = false;
      } else {
        this.showbiao = false;
        this.showhui = true;
      }
      this.$http
        .get("/OpenBidCenter/GetBidCenterDetailShow01", {
          params: {
            rowId: row.rowId,
            bidModeId: row.bidModeId,
            sectionId: row.sectionId,
          },
        })
        .then(res => {
          this.loading2 = false;
          this.pageMessage = res.data.pageMessage;
          let openBidSupplierDetailList = res.data.openBidSupplierDetailList || [];
          if (openBidSupplierDetailList && openBidSupplierDetailList.length) {
            this.backDetailList = openBidSupplierDetailList;
            if (this.masterType1 === "首次开标") {
              if (res.data.openBidSupplierDetailList[0].month != "") {
                this.showif1 = true;
              } else {
                this.showif1 = false;
              }
            } else {
              this.showif1 = false;
            }
          }
          this.pageMessage = res.data.pageMessage;
          this.showOpenTechButton = res.data.showOpenTechButton;
          this.showOpenBusinessButton = res.data.showOpenBusinessButton;
          this.GetHistoryPrice38();
        });
    },

    // 开标
    bidOpening(openType) {
      this.$confirm("确认要开标吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // let bidOpeningUrl = "";
        let obj = {
          sectionId: this.bidOpeningRow.sectionId,
          bidModeId: this.bidOpeningRow.bidModeId,
          openType,
          rowId: this.bidOpeningRow.rowId,
        };
        // if (this.bidOpeningRow.masterType === "首次开标") {
        //   bidOpeningUrl = "/BidOpen/SubmitOpenBidType";
        //   obj = {
        //     sectionId: this.bidOpeningRow.sectionId,
        //     BidModeId: this.bidOpeningRow.bidModeId,
        //     openType,
        //   };
        // }
        // if (this.bidOpeningRow.masterType === "澄清开标") {
        //   bidOpeningUrl = "/BidOpen/SubmitExplainOpen";
        //   obj = {
        //     explainId: this.bidOpeningRow.rowId,
        //     openType,
        //   };
        // }
        // if (!bidOpeningUrl) {
        //   this.$message.error("未知masterType！");
        //   return;
        // }

        this.$http.post("/BidOpen/SubmitOpenBidType1001", obj).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.GetBidCenterPageMain01();
            this.GetBidCenterDetailShow01();
            this.GetHistoryPrice38();
          } else {
            this.$message.error(res.data.message);
            this.GetBidCenterPageMain01();
            this.GetBidCenterDetailShow01();
            this.GetHistoryPrice38();
          }
        });
      });
    },

    /**
     * [通过参数名获取url中的参数值]
     * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
     * @param  {[string]} queryName [参数名]
     * @return {[string]}           [参数值]
     */
    getParameter(url, variable) {
      var query = url.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },

    //判断是综合评标还是低价法
    GetOneBidMasterByBidModeId() {
      this.$http.get("/BidMaster/GetOneBidMasterByBidModeId", { params: { bidModeId: this.id } }).then(res => {
        this.examMethod = res.data.examMethod;
        this.GetOpenPageNavigate();
      });
    },
    GetOpenPageNavigate() {
      this.dialogVisible = false;
      this.loading = true;
      this.$http.get("/BidOpen/GetOpenPageNavigate", { params: { bidModeId: this.id } }).then(res => {
        res.data.forEach(item => {
          item.navName = item.navName.replace("<br>", "( ") + " )";
        });
        this.tableList = res.data;
        this.activeName = res.data.length > 0 ? res.data[0].navUrl : "";
        this.loading = false;
        if (this.examMethod == "综合评标法") {
          this.GetBidUnOpenPageInfoType1();
        } else {
          this.GetBidUnOpenPageInfoType2();
        }
      });
    },
    GetOpenExplainPageNavigate() {
      this.loading = true;
      this.$http.get("/BidOpen/GetOpenExplainPageNavigate", { params: { bidModeId: this.id } }).then(res => {
        res.data.forEach(item => {
          item.navName = item.navName.replace("<br>", "( ") + " )";
        });
        this.tableListTabCQ = res.data;
        this.activeNameCq = res.data.length > 0 ? res.data[0].navUrl : "";
        this.loading = false;
        this.GetUnOpenExplainList();
        // if (this.examMethod == "综合评标法") {
        // } else {
        //   this.GetBidUnOpenPageInfoType2();
        // }
      });
    },
    //【综合评标法】各标段【待开标】
    GetBidUnOpenPageInfoType1() {
      this.loading = true;
      let obj = {
        sectionId: this.getParameter(this.activeName, "sectionId"),
        bidModeId: this.id,
        // sectionId: "40ebcb60-d662-4061-84b8-075c1567841c",
      };
      this.$http.get("/BidOpen/GetBidUnOpenPageInfoType1", { params: obj }).then(res => {
        this.tableList1 = res.data;
        this.show1 = res.data.techSupplierList.length > 0 ? true : false;
        this.show2 = res.data.businessSupplierList.length > 0 ? true : false;
        this.loading = false;
      });
    },
    //【合理低价法】各标段【待开标】
    GetBidUnOpenPageInfoType2() {
      this.loading = true;
      let obj = {
        bidModeId: this.id,
        sectionId: this.getParameter(this.activeName, "sectionId"),
        // sectionId: "40ebcb60-d662-4061-84b8-075c1567841c",
      };
      this.$http.get("/BidOpen/GetBidUnOpenPageInfoType2", { params: obj }).then(res => {
        this.tableList1 = res.data;
        this.show1 = res.data.techSupplierList.length > 0 ? true : false;
        this.show2 = res.data.businessSupplierList.length > 0 ? true : false;
        this.loading = false;
      });
    },
    //【综合评标法】各标段【已开标】
    GetOpenPageShowType1() {
      this.loading = true;
      let obj = {
        bidModeId: this.id,
        sectionId: this.getParameter(this.activeName, "sectionId"),
      };
      this.$http.get("/BidOpen/GetOpenPageShowType1", { params: obj }).then(res => {
        this.show3 = res.data.supplierTechList.length > 0 ? true : false;
        this.show4 = res.data.supplierBusinessList.length > 0 ? true : false;
        this.tableList1 = res.data;
        this.loading = false;
      });
    },
    //【合理低价法】各标段【已开标】
    GetOpenPageShowType2() {
      this.loading = true;
      let obj = {
        bidModeId: this.id,
        // sectionId: "40ebcb60-d662-4061-84b8-075c1567841c",
        sectionId: this.getParameter(this.activeName, "sectionId"),
      };
      this.$http.get("/BidOpen/GetOpenPageShowType2", { params: obj }).then(res => {
        this.tableList1 = res.data;
        this.show3 = res.data.supplierTechList.length > 0 ? true : false;
        this.show4 = res.data.supplierBusinessList.length > 0 ? true : false;
        this.loading = false;
      });
    },
    //开标页签获取各标段待开标的澄清记录
    GetUnOpenExplainList() {
      this.loading = true;
      let obj = {
        bidModeId: this.id,
        sectionId: this.getParameter(this.activeNameCq, "sectionId"),
      };
      this.$http.get("/BidOpen/GetUnOpenExplainList", { params: obj }).then(res => {
        this.tableListCq1 = res.data;
        this.show5 = res.data.techExplainDetailList.length > 0 ? true : false;
        this.show6 = res.data.businessExplainDetailList.length > 0 ? true : false;
        this.loading = false;
      });
    },
    //开标页签获取各标段待开标的澄清记录
    GetOpenExplainList() {
      this.loading = true;
      let obj = {
        bidModeId: this.id,
        sectionId: this.getParameter(this.activeNameCq, "sectionId"),
      };
      this.$http.get("/BidOpen/GetOpenExplainList", { params: obj }).then(res => {
        this.tableListCq1 = res.data;
        this.show7 = res.data.techExplainDetailList.length > 0 ? true : false;
        this.show8 = res.data.businessExplainDetailList.length > 0 ? true : false;
        this.loading = false;
      });
    },
    //开标
    openType1(openType, i) {
      this.$confirm("确认要开标吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          bidModeId: this.id,
          sectionId: this.getParameter(this.activeName, "sectionId"),
          openType,
        };
        let obj1 = {
          explainId: this.tableListCq1.explainId,
          openType,
        };
        this.$http.post(i == 1 ? "/BidOpen/SubmitOpenBidType" : "/BidOpen/SubmitExplainOpen", i == 1 ? obj : obj1).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message || res.data.result.message);
            if (this.examMethod == "综合评标法") {
              if (this.activeName1 == "first") {
                this.GetBidUnOpenPageInfoType1();
              } else {
                this.GetUnOpenExplainList();
              }
            } else {
              this.GetBidUnOpenPageInfoType2();
            }
          } else {
            this.$message.error(res.data.message || res.data.result.message);
          }
        });
      });
    },
    //澄清评标
    openType(openType) {
      let obj = {
        explainId: this.explainMasterId,
        openType,
      };
      this.$http.post("/BidOpen/SubmitExplainOpen", obj).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.result.message);
          this.GetUnOpenSupplierDetailList();
          this.BidActionButton01();
        } else {
          this.$message.error(res.data.result.message);
          this.BidActionButton01();
        }
      });
    },
    downLoad(url) {
      window.open(process.env.VUE_APP_API_URL + url, "_blank");
    },
    downLoadtech(techFileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidOpenDownLoad002?fileId=" + techFileId);
    },
    downLoadbusiness(businessFileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidOpenDownLoad002?fileId=" + businessFileId);
    },
    handleClick(e, i) {
      if (i == 1) {
        if (this.examMethod == "综合评标法") {
          if (e.includes("openType1")) {
            this.status = "已开";
            this.GetOpenPageShowType1();
          } else {
            this.status = "待开";
            this.GetBidUnOpenPageInfoType1();
          }
        } else {
          if (e.includes("openType1")) {
            this.GetOpenPageShowType2();
          } else {
            this.GetBidUnOpenPageInfoType2();
          }
        }
      } else {
        if (e.includes("unOpenExplainType1")) {
          this.status = "待开";
          this.GetUnOpenExplainList();
        } else {
          this.status = "已开";
          this.GetOpenExplainList();
        }
      }
    },
    //澄清开标
    GetUnOpenExplainPageShow1() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/BidOpen/GetUnOpenExplainPageShow", { params: obj }).then(res => {
        console.log(res.data.sectionList);
        this.sectionList = res.data.sectionList;
        this.activeName2 = res.data.thisSectionId;
        this.BidActionButton01();
        this.GetUnOpenSupplierDetailList();
      });
    },
    BidActionButton01() {
      this.$http.get("/BidActionButton/BidActionButton01", { params: { bidModeId: this.id, sectionId: this.activeName2 } }).then(res => {
        // console.log(res.data.openBusinessButton);
        if (res.data.openBusinessButton) {
          this.openBusinessButton = true;
        } else {
          this.openBusinessButton = false;
        }
        if (res.data.openTechButton) {
          this.openTechButton = true;
        } else {
          this.openTechButton = false;
        }
        if (!res.data.openBusinessButton || !res.data.openTechButton) {
          this.msg = true;
          this.noopen = res.data.message;
        } else {
          this.msg = false;
        }
      });
    },
    GetUnOpenSupplierDetailList() {
      this.$http.get("/BidOpen/GetUnOpenSupplierDetailList", { params: { bidModeId: this.id, sectionId: this.activeName2 } }).then(res => {
        console.log(res.data.supplierList);
        this.explainMasterId = res.data.explainMasterId;
        // if(res.data.success){

        this.supplierList = res.data.supplierList;
        // }
      });
    },
    //澄清开标
    // GetUnOpenExplainPageShow() {
    //   this.loading = true;
    //   let obj = {
    //     bidModeId: this.id,
    //     sectionId: this.activeName2,
    //   };
    //   this.$http.get("/BidOpen/GetUnOpenExplainPageShow", { params: obj }).then(res => {
    //     if (res.data.success) {
    //       res.data.sectionList.forEach(e => {
    //         e.sectionList.forEach(item => {
    //           let val = item.explainBusinessType + "," + item.explainTechType;
    //           item.type = val[0] == "," ? val.substr(1, val.length - 1) : val[val.length - 1] == "," ? val.substr(0, val.length - 1) : val;
    //         });
    //       });
    //       this.tableList2 = res.data.result;
    //       console.log(this.tableList2);
    //     }
    //     this.loading = false;
    //   });
    // },
    handleClick1(e) {
      this.status = "待开";
      if (e.name == "second") {
        // this.GetUnOpenExplainPageShow1();
        this.GetOpenExplainPageNavigate();
      } else {
        this.GetOneBidMasterByBidModeId();
      }
    },
    handleClick2(e) {
      this.GetUnOpenExplainPageShow();
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
    status_change({ row }) {
      if (row.showColor) {
        return "table-info-row";
      }
      return "";
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
v-deep .el-radio-button__inner {
  padding: 7px 20px !important;
}
</style>
<style>
.el-table .table-main-row {
  background-color: #ccffff;
}
.el-table .table-info-row {
  background-color: #ffffcc;
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
  /*padding: 18px 20px;*/
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
</style>
