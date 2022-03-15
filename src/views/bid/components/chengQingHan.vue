<!-- 澄清 -->
<template>
  <div class="" style="overflow: hidden; margin-top: 10px">
    <div v-if="isshow">
      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header" class="clearfix">
          <el-select
            v-model="sectionId"
            @change="sectionNameChange()"
            size="small"
            style="float: right; margin-right: 10px"
            placeholder="请选择标段"
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
            :data="explainMasterMainList"
            v-loading="loading"
          >
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>

            <!-- <el-table-column label="询标序号" align="center" prop="explainIndex"> </el-table-column> -->
            <el-table-column label="类型" align="center" prop="explainClass"></el-table-column>
            <!-- <el-table-column label="开启时间" align="center" prop="creationTime">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd") }}</span>
            </template>
          </el-table-column> -->
            <el-table-column label="询标状态" align="center" prop="explainMasterStatus"></el-table-column>
            <el-table-column label="技术标状态" align="center" prop="techStatus"></el-table-column>
            <el-table-column label="商务标状态" align="center" prop="businessStatus"></el-table-column>

            <el-table-column label="澄清截止时间" align="center" prop="backEndTime" width="200">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.backEndTime, "yyyy-MM-dd hh:mm") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="审批状态" align="center" prop="auditStatus"></el-table-column>
            <el-table-column label="查看明细" align="center">
              <template slot-scope="scope">
                <el-radio
                  @change="GetExplainDetailList32(scope.row)"
                  v-model="selectExplainId"
                  :label="scope.row.explainId"
                  style="color: #409eff"
                  >查看明细</el-radio
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header" class="clearfix">
          <span v-if="this.explainMasterMainList.length > 0">第{{ this.explainIndex1 }}轮澄清明细</span>
        </div>
        <div class="text item">
          <el-table
            empty-text="暂无数据"
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="backDetailList"
            v-loading="loading2"
            style="margin-bottom: 20px"
          >
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <el-table-column align="left" label="供应商名称" min-width="160">
              <template slot-scope="scope">
                <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpDetail(scope.row.supplierId)">{{
                  scope.row.comFullName
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="技术澄清类型" align="center" prop="explainTechType" v-if="type3 != '谈判'"></el-table-column>
            <el-table-column label="商务澄清类型" align="center" prop="explainBusinessType"></el-table-column>
            <el-table-column label="状态" align="center" prop="explainStatus" width="120"></el-table-column>
            <el-table-column label="商务澄清函" align="center" prop="businessFileName" width="150">
              <template slot-scope="scope">
                <el-link
                  v-if="scope.row.businessFilePath"
                  type="primary"
                  @click="downLoadtech(scope.row.businessFileId)"
                  style="color: #409eff; text-decoration: none; margin-left: 10px"
                  >{{ scope.row.businessFileName }}</el-link
                >
              </template>
            </el-table-column>
            <el-table-column label="技术澄清函" align="center" prop="techFileName" width="150">
              <template slot-scope="scope">
                <el-link
                  v-if="scope.row.techFilePath"
                  type="primary"
                  @click="downLoadtech(scope.row.techFileId)"
                  style="color: #409eff; text-decoration: none; margin-left: 10px"
                  >{{ scope.row.techFileName }}</el-link
                >
              </template>
            </el-table-column>
            <el-table-column label="回复时间" align="center" prop="backTime"></el-table-column>
          </el-table>
          <div style="float: left; color: red; width: 100%">1、开启第1轮澄清条件：首轮回标已开商务标、已开技术标</div>
          <div style="float: left; color: red; width: 100%">
            2、开启第N轮澄清：最近一次澄清已到澄清截止日期、已开商务、已开技术标、已评商务标
          </div>
        </div>
      </el-card>

      <div style="margin-top: 50px">
        <el-form v-if="showmark" v-loading="loadingneibu" :rules="rulesrizhi">
          <el-form-item label="审批意见：" prop="ideaRemark" style="margin-top: 20px">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 4 }"
              placeholder="如对某条审批有意见，请填写审批意见"
              v-model="ideaRemark"
              style="width: 100%"
            ></el-input>
            <div style="color: red; margin: 10px 0">如对某条审批有意见，请填写审批意见</div>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" v-if="showPassButton" type="primary" style="float: right; margin-top: 10px" @click="omsubmit"
              >通过</el-button
            >
            <el-button
              size="mini"
              v-if="showRefuseButton"
              type="primary"
              style="float: right; margin-top: 10px; margin-right: 10px"
              @click="bohui"
              >驳回</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-card class="box-card" style="margin-top: 30px" v-if="tableif">
        <div slot="header" class="clearfix">
          <span>审批日志({{ status }})</span>
        </div>
        <div class="text item">
          <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableshenpi">
            <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
            <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
            <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
            <el-table-column prop="creationTime" width="200" label="待办时间" align="center">
              <template slot-scope="scope"
                ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column>
            <el-table-column prop="dealTime" width="200" label="处理时间" align="center">
              <template slot-scope="scope"
                ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column>
            <el-table-column prop="status" width="100" label="结果" align="center"> </el-table-column>
            <el-table-column prop="comments" label="意见/备注" align="center"> </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
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
      fileloading: false,
      showRefuseButton: false,
      showPassButton: false,
      showmark: false,
      loadingneibu: false,
      ideaRemark: "",
      sectionId: "",
      sectionName: "",
      explainIndex: "",
      explainIndex1: "",
      status: "", //审批状态
      selectExplainId: "",
      sectionDropDownList: [],
      explainIndex1: "",
      explainId: "",
      fileList: [],
      fileList1: [],
      explainMasterMainList: [], //  主表数据
      historyPrice: {}, // 历史回标数据
      bidOpeningRow: {}, // 选中主表数据行
      loading2: false, // 附表loading
      backDetailList: [], //  副表数据
      thisSectionDesc: "",
      isshow: true,
      todatalist: [],
      selectList: [],
      dialogVisibleto: false,
      dialogVisibledate: false,
      showOpenExplainButton: false, // 是否显示【开启澄清】按钮
      showCloseExplainButton: false,
      pageMessage: "",
      showSendMsgButton: false,
      showpage: true,
      loading3: false,
      showedit: false,
      tableshenpi: [],
      tableif: false,
      tableList: {},
      tableList1: [],
      tableList2: [],
      tableList3: [],
      opform: {
        backEndTime: new Date(),
      },
      ouform: {
        bidOpenDate: new Date(),
      },
      activeName: "",
      showOpenExplainFlag: false,
      showCloseExplainFlag: false,
      explainFileType: "技术澄清附件",
      activeName1: "开启澄清",
      activeName2: [],
      supplierId: "",
      loading4: false,
      loading: false,
      dialogVisiblejishu: false,
      dialogVisibleshangwu: false,
      dialogVisible1: false,
      uploadData: {},
      rulesrizhi: {
        // ideaRemark: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
      },
      fileType: [".pdf", ".rar", "zip"],
      condition: "允许文件类型：.pdf|.压缩包 格式 最大：200 兆",
      header: { Authorization: "Bearer " + this.$store.state.token },
      type3: "",
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
    tomethgochengqing() {
      this.CheckUserProcessPageAuth();
    },
    CheckUserProcessPageAuth() {
      this.$http.get("/BidCheckCenter/CheckUserProcessPageAuth", { params: { baseId: this.id } }).then((res) => {
        if (res.data.success) {
          if (!res.data.returnValue1) {
            this.GetSectionDropDownList();
            this.GetNewLogList_SupExplain();
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
    delete1(id, i) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post(i == 1 ? "/ExplainCenter/DeleteExplain37" : "/ExplainCenter/DeleteExplainAttach", { id }).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            if (i == 1) {
              this.GetSectionDropDownList();
            } else {
              this.GetOpenExplainList35();
            }
          } else {
            this.$msg.error(res.data.message);
          }
        });
      });
    },

    sectionNameChange() {
      this.GetExplainMasterMainList31();
      this.GetHistoryPrice38();
      this.backDetailList = [];
    },
    selectedRow({ row }) {
      if (row.explainId == this.selectExplainId) {
        return "table-main-row";
      }
      return "";
    },
    GetNewLogList_SupExplain(row) {
      this.$http
        .get("/WorkFlowStart/GetNewLogList_SupExplain", { params: { bidModeId: this.id, masterId: this.selectExplainId } })
        .then((res) => {
          // if (res.data.logs.length > 0) {
          this.tableshenpi = res.data.logs;
          this.status = res.data.status;
          if (res.data.logs.length > 0 || res.data.logs != null) {
            this.tableif = true;
          } else {
            this.tableif = false;
          }
          // }
        });
    },
    //历史报价列表
    GetHistoryPrice38() {
      this.$http.get("/ExplainCenter/GetHistoryPrice38", { params: { bidModeId: this.id, sectionId: this.sectionId } }).then((res) => {
        this.historyPrice = res.data;
      });
    },
    // 获取标段下拉，默认选中第一条
    GetSectionDropDownList() {
      this.loading = true;
      this.backDetailList = [];
      this.$http
        .get("/ExplainCenter/GetExplainMasterMainList31", {
          params: {
            bidModeId: this.id,
          },
        })
        .then((res) => {
          this.loading = false;
          // 标段下拉数据
          if (res.data.sectionDropDownList && res.data.sectionDropDownList.length) {
            this.sectionDropDownList = res.data.sectionDropDownList;
            this.sectionId = res.data.sectionDropDownList[0].value;
            // this.pageMessage = res.data.pageMessage;
            this.GetExplainMasterMainList31();
            this.GetHistoryPrice38();
          } else {
            this.sectionDropDownList = [];
            this.backDetailList = [];
          }
        });
    },
    // 主表
    GetExplainMasterMainList31() {
      this.loading = true;
      this.explainMasterMainList = [];
      this.bidOpeningRow = {};
      this.$http
        .get("/ExplainCenter/GetExplainMasterMainList31", {
          params: {
            bidModeId: this.id,
            sectionId: this.sectionId,
          },
        })
        .then((res) => {
          this.loading = false;
          this.showOpenExplainButton = res.data.showOpenExplainButton;
          this.showCloseExplainButton = res.data.showCloseExplainButton;
          // 主表数据
          if (res.data.explainMasterMainList && res.data.explainMasterMainList) {
            this.explainIndex1 = res.data.explainMasterMainList[0].explainIndex;
            this.explainMasterMainList = res.data.explainMasterMainList;
            this.showedit = res.data.explainMasterMainList.editDateFlag;
            this.selectExplainId = res.data.explainMasterMainList[0].explainId;
            this.GetExplainDetailList32(res.data.explainMasterMainList[0]);
            this.GetNewLogList_SupExplain(res.data.explainMasterMainList[0]);
            this.bidOpeningRow = res.data.explainMasterMainList[0];
          }
          if (res.status == 200) {
            this.pageMessage = res.data.pageMessage;
            this.nextExplainIndex = res.data.nextExplainIndex;
          }
          if (this.pageMessage == "" || this.pageMessage == null) {
            this.showpage = false;
          } else {
            this.showpage = true;
          }
        });
    },
    // 副标数据
    GetExplainDetailList32(row) {
      // this.showOpenExplainButton = false
      // this.showCloseExplainButton = false
      // this.pageMessage = "";
      this.bidOpeningRow = row;
      console.log("this.bidOpeningRow", this.bidOpeningRow);
      this.explainIndex1 = row.explainIndex;
      this.selectExplainId = row.explainId;
      this.loading2 = true;
      this.backDetailList = [];
      this.$http
        .get("/ExplainCenter/GetExplainDetailList32", {
          params: {
            explainId: row.explainId,
          },
        })
        .then((res) => {
          this.loading2 = false;
          this.showSendMsgButton = res.data.showSendMsgButton;
          let explainMainDetailList = res.data.explainMainDetailList || [];
          if (explainMainDetailList && explainMainDetailList.length) {
            this.backDetailList = explainMainDetailList;
            this.GetNewLogList_SupExplain(row);
            this.GetAuditButton01();
          }
          // this.showOpenExplainButton = res.data.showOpenExplainButton;
          // this.showCloseExplainButton = res.data.showCloseExplainButton;
          // this.pageMessage = res.data.pageMessage;
        });
    },
    GetAuditButton01() {
      this.$http.get("/BidExplain/GetAuditButton01", { params: { bidModeId: this.id, masterId: this.selectExplainId } }).then((res) => {
        this.ideaRemark = res.data.ideaRemark;
        if (res.data.showPassButton) {
          this.showPassButton = true;
        } else {
          this.showPassButton = false;
        }
        if (res.data.showRefuseButton) {
          this.showRefuseButton = true;
        } else {
          this.showRefuseButton = false;
        }
        if (res.data.showRefuseButton == false && res.data.showPassButton == false) {
          this.showmark = false;
        } else {
          this.showmark = true;
        }
      });
    },
    omsubmit() {
      this.$confirm("确认要通过审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.ideaRemark == "") {
          let obj = {
            bidModeId: this.id,
            masterId: this.selectExplainId,
            remark: this.ideaRemark,
            isOk: 0,
          };
          this.loadingneibu = true;
          this.$http.post("/WorkFlowStart/WF_Process_SupExplain_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingneibu = false;
              this.$msg.success("操作成功");
              this.GetNewLogList_SupExplain();
              this.GetAuditButton01();
              console.log(res.data.status);
            } else {
              this.loadingneibu = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        } else {
          this.$message({
            message: "请先输入审批意见",
            type: "error",
          });
        }
      });
    },
    bohui() {
      this.$confirm("确认要驳回审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.ideaRemark == "") {
          let obj = {
            bidModeId: this.id,
            masterId: this.selectExplainId,
            remark: this.ideaRemark,
            isOk: -1,
          };
          this.loadingneibu = true;
          this.$http.post("/WorkFlowStart/WF_Process_SupExplain_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingneibu = false;
              this.$msg.success("操作成功");
              this.GetNewLogList_SupExplain();
              this.GetAuditButton01();
            } else {
              this.loadingneibu = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        } else {
          this.$message({
            message: "请先输入审批意见",
            type: "error",
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    GetSendSupplierContact1002() {
      this.$http.get("/BidSend/GetSendSupplierContact1002", { params: { explainId: this.selectExplainId } }).then((res) => {
        this.todatalist = res.data;
      });
    },
    tosend(val) {
      this.$confirm("确认要发送短信吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (val.length > 0) {
          let phoneList = val.map((item) => item.mobilePhone);
          let todata = {
            phoneList: phoneList,
            bidModeId: this.id,
          };
          this.$http.post("/BidSend/SendSupplierMsg1002", todata).then((res) => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.dialogVisibleto = false;
            } else {
              // this.$message.error(res.data.message);
              this.dialogVisibleto = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        }
      });
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidExplainAttachUpload";
    },
    handleChange1(file, fileList) {
      // console.log(fileList);
      this.fileList1 = [file];
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success) {
        this.fileList1 = [];
        this.$message.success(response.message);
        this.$nextTick(() => {
          this.$refs.upload.clearFiles();
        });
        this.fileloading = false;
        this.dialogVisiblejishu = false;
        this.dialogVisibleshangwu = false;
        this.GetOpenExplainList35();
      } else {
        this.fileloading = false;
        this.$message.error(response.message);
        this.$refs.upload.clearFiles();
        this.dialogVisiblejishu = false;
        this.dialogVisibleshangwu = false;
      }
    },

    GetSupplierBackList() {
      this.loading = true;
      this.$http.get("/BidDocBack/GetSupplierBackList", { params: { bidModeId: this.id } }).then((res) => {
        this.tableList1 = res.data;
        this.activeName = res.data.length > 0 ? res.data[0].sectionId : "";
        if (this.activeName1 == "开启澄清") {
          this.GetOpenExplainList35();
        }
        this.loading = false;
      });
    },
    makeSure() {
      if (!this.ouform.bidOpenDate) {
        this.$message.warning("请先选择澄清日期！");
      } else {
        this.$confirm("提交后将不能修改，确定要提交吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let obj = {
              explainId: this.tableList.explainId,
              explainClass: this.type3,
              backEndTime: parseTime(this.ouform.bidOpenDate, "yyyy-MM-dd hh:mm"),
            };
            this.loading4 = true;
            this.dialogVisible1 = false;
            this.$http
              .post("/ExplainCenter/SubmitExplain2001", obj)
              .then((res) => {
                if (res.data.success) {
                  this.$message.success(res.data.message);
                  this.GetOpenExplainList35();
                  this.GetNewLogList_SupExplain();
                  this.GetExplainMasterMainList31();
                  this.loading4 = false;
                  this.isshow = true;
                } else {
                  this.loading4 = false;
                  this.$message.error(res.data.message);
                }
              })
              .catch((err) => {
                this.$message.error("请求失败！");
              });
          })
          .catch(() => {
            this.$msg({ type: "info", message: "已取消" });
          });
      }
    },
    //开启澄清获取记录
    GetOpenExplainList35() {
      this.loading3 = true;
      let obj = {
        bidModeId: this.id,
        sectionId: this.sectionId,
      };
      this.$http.get("/ExplainCenter/GetExplainList2001", { params: obj }).then((res) => {
        console.log(res);
        this.thisSectionDesc = res.data.explainIndex;
        this.explainIndex = res.data.explainIndex;
        this.tableList = res.data;
        this.tableList.explainDetailList = this.tableList.explainDetailList.map((item) => {
          return {
            ...item,
            oPenJiShuChengQing: "",
            oPenShangWuChengQing: "",
            viold: "",
          };
        });
        this.loading3 = false;
      });
    },
    handleChange(row) {
      let obj = {
        id: row.id,
        explainBusinessType: row.explainBusinessType.selectedType,
        explainTechType: row.explainTechType.selectedType,
        explainContent: row.explainContent,
      };
      this.$http.post("/ExplainCenter/SaveExplainDetail2001", obj).then((res) => {
        if (res.data.success) {
          // this.$message.success(res.data.message);
          this.GetOpenExplainList35();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    GetExplainHistory() {
      this.dialogVisiblejishu = false;
      this.dialogVisibleshangwu = false;
      this.loading = true;
      let obj = {
        bidModeId: this.id,
        sectionId: this.bidOpeningRow.sectionId,
      };
      this.$http.get("/BidExplain/GetExplainHistory", { params: obj }).then((res) => {
        this.tableList2 = res.data;
        this.activeName2 = res.data.length > 0 ? res.data.map((v) => v.explainIndex) : [];
        this.loading = false;
      });
    },
    //开启澄清
    openType(type) {
      if (type == 1) {
        this.type3 = "澄清";
      } else {
        this.type3 = "谈判";
      }
      this.isshow = false;
      this.GetOpenExplainList35();
    },
    //关闭澄清
    closeType() {
      this.$confirm("确认要关闭当前澄清吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          bidModeId: this.id,
          sectionId: this.bidOpeningRow.sectionId,
          explainId: this.bidOpeningRow.explainId,
        };
        this.$http.post("/ExplainCenter/CloseSectionExplain34", obj).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.GetExplainMasterMainList31();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    // 取消
    cancelBtn() {
      // this.$confirm("确认要取消吗?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      let obj = {
        id: this.tableList.explainId,
      };
      this.$http.post("/ExplainCenter/CancelExplain2001", obj).then((res) => {
        if (res.data.success) {
          // this.$message.success(res.data.message);
          this.isshow = true;
          this.GetOpenExplainList35();
        } else {
          this.$message.error(res.data.message);
        }
      });
      // });
    },
    // 提交
    submitBtn() {
      this.dialogVisible1 = true;
    },
    editdate(row) {
      this.dialogVisibledate = true;
      this.explainId = row.explainId;
      this.opform.backEndTime = row.backEndTime;
    },
    truedate() {
      // console.log(parseTime(this.opform.backEndTime), "yyyy-MM-dd hh:mm");
      let obj = {
        explainId: this.explainId,
        backEndTime: parseTime(this.opform.backEndTime, "yyyy-MM-dd hh:mm"),
      };
      this.$http.post("/ExplainCenter/SaveBackEndDate36", obj).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.dialogVisibledate = false;
          this.GetExplainMasterMainList31();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    upLoadjishu(row, val) {
      this.fileList1 = [];
      this.supplierId = row.supplierId;
      this.dialogVisiblejishu = true;
      this.fileloading = false;
      this.explainFileType = val;
    },
    submitUploadjishu() {
      this.fileloading = true;
      Object.assign(this.uploadData, {
        BidModeId: this.id,
        SectionId: this.sectionId,
        SupplierId: this.supplierId,
        // ExplainIndex: this.thisSectionDesc,
        ExplainMasterId: this.tableList.explainId,
        ExplainFileType: this.explainFileType,
      });
      this.$refs.upload.submit();
      // }
    },
    downLoad(url) {
      window.open(process.env.VUE_APP_API_URL + url, "_blank");
    },
    downLoadtech(fileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidExplainDownLoad003?fileId=" + fileId);
    },
    handleClick(e) {
      if (this.activeName1 == "开启澄清") {
        this.GetOpenExplainList35();
      } else {
        this.GetExplainHistory();
      }
    },
    handleClick1(e) {
      this.GetOpenExplainList35();
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-main {
  overflow: hidden;
}
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
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
<style>
.el-table .table-main-row {
  background-color: #ccffff;
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

.el-card__header {
  height: 60px;
  /*padding: 18px 20px;*/
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
</style>
