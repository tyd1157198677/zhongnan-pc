<!-- 澄清 -->
<template>
  <div class="" style="overflow: hidden; margin-top: 10px">
    <el-card v-if="isshow" class="box-card" style="margin-top: 30px">
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
          <el-table-column label="供应商名称" min-width="260" show-overflow-tooltip fixed="left">
            <template slot-scope="scope">
              <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpDetail(scope.row.supplierId)">{{
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
    <div v-if="isshow">
      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header" class="clearfix">
          <span style="color: red">{{ pageMessage }}</span>
          <el-button v-if="showCloseExplainButton" style="float: right" class="redBtn" type="danger" size="mini" @click="closeType()"
            >关闭澄清</el-button
          >
          <!--  v-if="showOpenExplainButton" -->
          <el-button style="float: right; margin-left: 10px" v-if="showOpenExplainButton" type="danger" size="mini" @click="openType(1)"
            >开启澄清</el-button
          >
          <!--  v-if="showOpenExplainButton" -->
          <el-button style="float: right; margin-left: 10px" v-if="showOpenExplainButton" type="danger" size="mini" @click="openType(2)"
            >开启谈判</el-button
          >
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
            <el-table-column label="操作" align="center" width="80">
              <template slot-scope="scope">
                <i class="el-icon-edit" v-if="scope.row.editDateFlag === true" title="修改澄清截止时间" @click="editdate(scope.row)"></i>
                <i
                  class="el-icon-delete"
                  v-if="scope.row.auditStatus === '驳回'"
                  title="删除"
                  @click="delete1(scope.row.explainId, 1)"
                  style="margin-left: 10px"
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header" class="clearfix">
          <span v-if="this.explainMasterMainList.length > 0">第{{ this.explainIndex1 }}轮询标明细</span>
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
            <el-table-column label="技术询标类型" align="center" prop="explainTechType" v-if="type3 != '谈判'"></el-table-column>
            <el-table-column label="商务询标类型" align="center" prop="explainBusinessType"></el-table-column>
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
            <!-- <el-table-column label="下载澄清函" align="center" prop="personName">
              <template slot-scope="scope">
                <el-link
                  v-if="scope.row.techFilePath"
                  type="primary"
                  @click="downLoadtech(scope.row.techFileId)"
                  style="color:#409eff;text-decoration: none;margin-left:10px"
                  >{{ scope.row.techFileName }}</el-link
                >
                <el-link
                  v-if="scope.row.businessFilePath"
                  type="primary"
                  @click="downLoadtech(scope.row.businessFileId)"
                  style="color:#409eff;text-decoration: none;margin-left:10px"
                  >{{ scope.row.businessFileName }}</el-link
                >
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="澄清回函" align="center" prop="personName">
            <template slot-scope="scope">
              <el-link v-if="scope.row.backTechFilePath" type="primary"  @click="downLoad(scope.row.backTechFilePath)" style="color:#409eff;text-decoration: none" icon="el-icon-search" >技术</el-link>
              <el-link v-if="scope.row.backBusinessFilePath" type="primary"  @click="downLoad(scope.row.backBusinessFilePath)" style="color:#409eff;text-decoration: none" icon="el-icon-search" >商务</el-link>
            </template>
          </el-table-column> -->
            <!-- <el-table-column label="最新报价" align="center" prop="amount"></el-table-column> -->
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

    <el-card class="box-card" v-if="!isshow" style="margin-top: 30px">
      <div slot="header" class="clearfix">
        <span>第{{ thisSectionDesc }}次{{ type3 }}</span>
      </div>
      <div class="text item">
        <el-table
          key="tan2"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableList.explainDetailList"
          v-loading="loading3"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column align="left" label="供应商名称" min-width="300" prop="comFullName">
            <template slot-scope="scope">
              <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpDetail(scope.row.supplierId)">{{
                scope.row.comFullName
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column :label="type3 == '澄清' ? '澄清说明' : '谈判说明'" align="center" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.explainContent" placeholder="请输入说明" @change="handleChange(scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="技术澄清类型" align="center" width="170" v-if="type3 != '谈判'">
            <template slot-scope="scope">
              <el-select v-model="scope.row.explainTechType.selectedType" placeholder="请选择" @change="handleChange(scope.row)">
                <el-option v-for="item in scope.row.explainTechType.explainTypeName" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column :label="type3 == '澄清' ? '商务澄清类型' : '商务谈判类型'" align="center" width="170">
            <template slot-scope="scope">
              <el-select v-model="scope.row.explainBusinessType.selectedType" placeholder="请选择" @change="handleChange(scope.row)">
                <el-option v-for="item in scope.row.explainBusinessType.explainTypeName" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="技术澄清函" align="center" width="100" v-if="type3 != '谈判'">
            <template slot-scope="scope">
              <i
                v-if="!scope.row.techFileId"
                class="el-icon-upload2"
                title="上传技术澄清文件"
                @click="upLoadjishu(scope.row, '技术澄清附件')"
              ></i>
              <span v-else>
                <i class="el-icon-download" title="下载技术澄清文件" @click="downLoadtech(scope.row.techFileId)"></i>
                <i class="el-icon-delete" style="margin-left: 10px" title="删除技术澄清文件" @click="delete1(scope.row.techFileId), 2"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="type3 == '澄清' ? '商务澄清函' : '商务谈判函'" align="center" width="100">
            <template slot-scope="scope">
              <i
                v-if="!scope.row.businessFileId"
                class="el-icon-upload2"
                title="上传商务澄清文件"
                @click="upLoadjishu(scope.row, '商务澄清附件')"
              ></i>
              <span v-else>
                <i class="el-icon-download" title="下载商务澄清文件" @click="downLoadtech(scope.row.businessFileId)"></i>
                <i
                  class="el-icon-delete"
                  title="删除商务澄清文件"
                  style="margin-left: 10px"
                  @click="delete1(scope.row.businessFileId, 2)"
                ></i>
              </span>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          type="danger"
          style="float: right; margin-top: 10px; margin-bottom: 10px"
          size="mini"
          v-loading="loading4"
          @click="submitBtn()"
          >提交</el-button
        >
        <el-button size="mini" style="float: right; margin-right: 10px; margin-top: 10px; margin-bottom: 10px" @click="cancelBtn()"
          >取消</el-button
        >
      </div>
    </el-card>
    <el-dialog width="50%" :visible.sync="dialogVisibledate">
      <el-form ref="opform" :model="opform">
        <el-form-item label="澄清截止时间：">
          <el-date-picker
            type="datetime"
            v-model="opform.backEndTime"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择澄清时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibledate = false">关 闭</el-button>
        <el-button type="primary" @click="truedate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="50%" :visible.sync="dialogVisible1">
      <el-form ref="ouform" :model="ouform">
        <el-form-item label="澄清截止时间：">
          <el-date-picker
            type="datetime"
            v-model="ouform.bidOpenDate"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择澄清时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">关 闭</el-button>
        <el-button type="primary" @click="makeSure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="40%" title="上传文件" :visible.sync="dialogVisiblejishu">
      <el-form>
        <!-- <el-form-item label="文件类型">
          <el-select v-model="explainFileType" placeholder="请选择">
            <el-option v-if="explainFileType == '技术澄清附件'" label="商务澄清附件" value="商务澄清附件"> </el-option>
            <el-option v-else label="商务澄清附件" value="商务澄清附件"> </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="选取文件">
          <el-upload
            element-loading-text="上传中请稍等···"
            v-loading="fileloading"
            class="upload-demo"
            ref="upload"
            :data="uploadData"
            :action="getUploadUrl()"
            :fileList="fileList1"
            :on-change="handleChange1"
            :on-success="onUploadSuccess"
            :auto-upload="false"
            :headers="header"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px" size="small" type="success" @click="submitUploadjishu">上传</el-button>
            <div slot="tip" class="el-upload__tip">文件格式：.xls|.xlsx|.doc|.docx|.zip|.rar|.pdf| 最大：200 兆</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleto" title="短信通知投标联系人" width="70%">
      <el-button style="float: right; margin-bottom: 10px" size="small" type="primary" @click="tosend(selectList)">确认发送</el-button>
      <el-table stripe border :data="todatalist" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
        <el-table-column prop="comFullName" label="投标方名称" align="left"> </el-table-column>
        <el-table-column prop="personName" width="180" label="联系人姓名" align="center"> </el-table-column>
        <el-table-column prop="mobilePhone" width="180" label="手机号" align="center"> </el-table-column>
      </el-table>
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
          if (res.data.logs == "" || res.data.logs == null || res.data.logs == []) {
            this.tableif = false;
          } else {
            this.tableif = true;
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
          this.pageMessage = res.data.pageMessage;
          this.nextExplainIndex = res.data.nextExplainIndex;
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
          // if (this.pageMessage == "" || this.pageMessage == null) {
          //   this.showpage = false;
          // } else {
          //   this.showpage = true;
          // }
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
        this.uploadData = {};
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
        explainClass: this.type3,
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
      console.log(this.fileList1);
      if (this.fileList1.length > 0) {
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
      } else {
        // this.$alert("请上传文件", {
        //   confirmButtonText: "确定",
        // });
        this.$message.error("请上传文件");
      }
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
