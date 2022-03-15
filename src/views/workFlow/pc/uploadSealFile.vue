<template>
  <el-main>
    <el-card style="margin-bottom: 60px">
      <!-- <div slot="header" class="clearfix flex between middle">
        <el-page-header @back="$router.back(-1)" :content="navBarName"> </el-page-header> -->
      <div>
        <span
          ><strong>{{ showmessage }}</strong></span
        >
        <i class="el-icon-s-operation" style="float: right; margin-left: 10px; font-size: 28px" title="点击查看招标过程" @click="goto"></i>
        <!-- <i class="el-icon-s-home" style="float:right;margin-left:10px" title="点击进入首页" @click="gohome"></i> -->
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
      </div>
      <!-- </div> -->
      <div>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right">项目名称：</td>
              <td>
                {{ form.projectName }}
              </td>
              <td class="right">期区：</td>
              <td>
                {{ form.subProjectName }}
              </td>
            </tr>
            <tr>
              <td class="right">招标计划名称(计划系统)：</td>
              <td>
                {{ form.otherPlanName }}
              </td>
              <td class="right">计划完成日期(计划系统)：</td>
              <td>
                {{ parseTime(form.bidEndDate, "yyyy-MM-dd") }}
              </td>
            </tr>
            <tr>
              <td class="right">招标计划名称：</td>
              <td>
                {{ form.planName }}
              </td>
              <td class="right">招标层级：</td>
              <td>
                {{ form.bidLevel }}
              </td>
            </tr>
            <tr>
              <td class="right">招标经办人：</td>
              <td>
                {{ form.bidUserName }}
              </td>
              <td class="right">入围经办人：</td>
              <td>
                {{ form.supplierUserName }}
              </td>
            </tr>
            <tr>
              <td class="right">总裁三室经办人：</td>
              <td>
                <span style="margin-right: 10px">{{ form.presidentUserName }}</span
                ><span style="margin-right: 10px">{{ form.presidentAltUserName }}</span
                ><span style="margin-right: 10px">{{ form.presidentOtherUserName }}</span>
              </td>
              <td class="right">审计经办人：</td>
              <td>
                <span style="margin-right: 10px">{{ form.auditUserName }}</span
                ><span style="margin-right: 10px">{{ form.auditAlternativesUserName }}</span>
              </td>
            </tr>
            <tr>
              <td class="right">项目需求日期：</td>
              <td>
                {{ parseTime(form.confirmDate, "yyyy-MM-dd") }}
              </td>
              <td class="right">建筑面积：</td>
              <td>{{ form.jzSquire }}㎡</td>
            </tr>
            <tr>
              <td class="right">项目需求原因：</td>
              <td>{{ form.requireDesc }}</td>
              <td class="right">招标计划编号：</td>
              <td>{{ form.planCode }}</td>
            </tr>
            <tr>
              <td class="right">招标专业：</td>
              <td>
                {{ form.bidCateName }}
              </td>
              <td class="right">招标方式：</td>
              <td>{{ form.purchaseType }}</td>
            </tr>
            <tr>
              <td class="right">说明：</td>
              <td colspan="3">
                {{ form.desc }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-top: 10px">
        <div class="pub">中标单位</div>
        <el-row>
          <!-- <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="table1"> -->
          <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="table1">
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column width="200" align="center" label="标段名称" prop="sectionName"> </el-table-column>
            <el-table-column align="left" label="供应商名称">
              <template slot-scope="scope">
                <el-link
                  class="sp"
                  type="primary"
                  style="color: #409eff; text-decoration: none; padding-right: 10px"
                  icon="el-icon-search"
                  @click="jumpDetail(scope.row.supplierId)"
                  >{{ scope.row.comFullName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column width="120" label="中标金额" align="center" prop="finalWinPrice">
              <template slot-scope="scope">
                <span>{{ scope.row.finalWinPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="相关附件">
              <el-table-column label="报价附件" align="center" width="100">
                <template slot-scope="scope">
                  <i
                    class="el-icon-download ml-2"
                    title="下载"
                    @click="onDonwLoad(scope.row.priceFileId)"
                    v-if="scope.row.priceFilePath"
                  ></i>
                </template>
              </el-table-column>

              <el-table-column label="中标通知书" align="center" width="100">
                <template slot-scope="scope">
                  <i
                    class="el-icon-download ml-2"
                    title="下载"
                    @click="onDonwLoad(scope.row.noticeFileId)"
                    v-if="scope.row.noticeFilePath"
                  ></i>
                </template>
              </el-table-column>
              <el-table-column label="其它" align="center" width="100">
                <template slot-scope="scope">
                  <i class="el-icon-download" title="下载" @click="onDonwLoad(scope.row.otherFileId)" v-if="scope.row.otherFilePath"></i>
                </template>
              </el-table-column>
              <el-table-column label="盖章文件" align="center" width="100">
                <template slot-scope="scope">
                  <i class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row.sealId)" v-if="scope.row.sealUrl"></i>
                  <i class="el-icon-upload ml-2" title="上传" @click="upload4(scope.row, 5)" v-if="!scope.row.sealUrl"></i>
                  <i class="el-icon-delete ml-2" title="删除" @click="deleteRow(scope.row, 5)" v-if="scope.row.sealUrl"></i>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pub">未中标单位</div>
        <el-row>
          <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="table2">
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column width="200" align="center" label="标段名称" prop="sectionName"> </el-table-column>
            <el-table-column align="left" min-width="350" label="供应商名称">
              <template slot-scope="scope">
                <el-link
                  class="sp"
                  type="primary"
                  style="color: #409eff; text-decoration: none; padding-right: 10px"
                  icon="el-icon-search"
                  @click="jumpDetail(scope.row.supplierId)"
                  >{{ scope.row.comFullName }}
                </el-link>
              </template>
            </el-table-column>

            <el-table-column label="感谢信" align="center" width="100">
              <template slot-scope="scope">
                <i
                  class="el-icon-download ml-2"
                  title="下载"
                  @click="onDonwLoad(scope.row.thanksFileId)"
                  v-if="scope.row.thanksFilePath"
                ></i>
              </template>
            </el-table-column>
            <el-table-column label="盖章文件" align="center" width="100">
              <template slot-scope="scope">
                <i class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row.sealId)" v-if="scope.row.sealUrl"></i>
                <i class="el-icon-upload ml-2" title="上传" @click="upload5(scope.row, 5)" v-if="!scope.row.sealUrl"></i>
                <i class="el-icon-delete ml-2" title="删除" @click="deleteRow(scope.row, 5)" v-if="scope.row.sealUrl"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <div>
        <el-form v-loading="loadingto">
          <el-form-item>
            <el-button size="mini" type="primary" v-if="showsubmit" style="float: right; margin-top: 10px" @click="omsubmit"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 50px" v-if="tableif2">
        <span>审批日志</span>
        <div style="float: right; color: red">{{ status2 }}</div>
        <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableshenpi2">
          <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
          <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
          <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
          <el-table-column prop="creationTime" width="180" label="待办时间" align="center">
            <template slot-scope="scope"
              ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
            >
          </el-table-column>
          <el-table-column prop="dealTime" width="180" label="处理时间" align="center">
            <template slot-scope="scope"
              ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
            >
          </el-table-column>
          <el-table-column prop="status" width="80" label="结果" align="center"> </el-table-column>
          <el-table-column prop="comments" label="意见/备注" align="center"> </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible2">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
        <el-form-item label="文件名称">
          <el-select v-model="uploadData.FileName">
            <el-option label="中标通知书_盖章文件" value="中标通知书_盖章文件"></el-option>
            <!-- <el-option label="感谢信_盖章文件" value="感谢信_盖章文件"></el-option> -->
          </el-select>
          <!--<el-input  v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>-->
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="'/api/FileUpload/BidWinAttachUpload2'"
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包，最大20M</div>
          </el-upload>
          <el-button v-loading="loading" style="margin-left: 10px; float: right" size="small" type="success" @click="submitUpload"
            >上传</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
        <el-form-item label="文件名称">
          <el-select v-model="uploadData.FileName">
            <!-- <el-option label="中标通知书_盖章文件" value="中标通知书_盖章文件"></el-option> -->
            <el-option label="感谢信_盖章文件" value="感谢信_盖章文件"></el-option>
          </el-select>
          <!--<el-input  v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>-->
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="'/api/FileUpload/BidWinAttachUpload2'"
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
            v-loading="loading"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包，最大20M</div>
          </el-upload>
          <el-button v-loading="loading" style="margin-left: 10px; float: right" size="small" type="success" @click="submitUpload"
            >上传</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  inject: ["reload"],
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      form: {},
      msg: "",
      uploadData: {
        FileName: "",
        // FileName2: "感谢信_盖章文件",
      },
      showmessage: "",
      showsubmit: false,
      loadingto: false,
      activeName: "1",
      isCanEdit: false,
      radio: true,
      dialogVisible: false,
      dialogVisible2: false,
      showRefuseButton: false,
      showPassButton: false,
      showmark: false,
      loading: false,
      tabledata: [],
      tablelist: [],
      uploadList: [],
      dingfile: [],
      table1: [],
      table2: [],
      table4: [
        {
          sectionName: "",
        },
      ],

      // FileName: "",
      tableshenpi2: [],
      tableif2: false,
      remark: "",
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      tableData: "",
      loading: false,
      // loading1: false,
      // uploadData: {},
      fileList: [],
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rules: {},
    };
  },
  computed: {
    // bidModeId() {
    //   return this.$route.params.bidModeId;
    // },
    navBarName() {
      const barName = "";
      return barName;
    },
    bidModeId() {
      if (this.$route.query.bidModeId) {
        return this.$route.query.bidModeId;
      } else {
        return this.id;
      }
    },
    masterId() {
      return this.$route.query.masterId;
    },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
    // baseId() {
    //   return this.$route.params.baseId;
    // },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.todoId = this.$route.query.todoId;
    // this.todoId = sessionStorage.getItem("todoId");
    // this.bidModeId = sessionStorage.getItem("bidModeId");
  },
  mounted() {
    // this.CheckCanEditPlan01();
    // this.getList();
    // this.getlist();
    this.getbidModeId();
    // this.GetWinAuditPageShow();
    this.GetBidWinList();
    this.getListjiaodi();
    this.getListtongzhizhong();
    this.getListtpngzhibuzhong();
    this.getListdingfile();
    this.getInfo();
    this.getzhong();
    this.GetNewLogList_BidWin();
    this.GetWinAffixFile();
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
  },
  methods: {
    parseTime,
    timeFormatSeconds(time) {
      var d = time ? new Date(time) : new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      // var hours = d.getHours();
      // var min = d.getMinutes();
      // var seconds = d.getSeconds();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      // if (hours < 0) hours = "0" + hours;
      // if (min < 10) min = "0" + min;
      // if (seconds < 10) seconds = "0" + seconds;

      return year + "-" + month + "-" + day;
    },
    onDonwLoad2(file) {
      window.open(process.env.VUE_APP_API_URL + file.filePath + file.fileReName);
    },
    onDonwLoad3(file) {
      window.open(process.env.VUE_APP_API_URL + file.filePath + file.fileReName);
    },
    upload4(row, index) {
      this.uploadData.bidModeId = this.bidModeId;
      this.uploadData.sectionId = row.sectionId;
      this.uploadData.supplierId = row.supplierId;
      this.dialogVisible2 = true;
      this.uploadData.FileName = "";
      this.fileList = [];
      this.file.raw = "";
    },
    upload5(row, index) {
      this.uploadData.bidModeId = this.bidModeId;
      this.uploadData.sectionId = row.sectionId;
      this.uploadData.supplierId = row.supplierId;
      this.dialogVisible = true;
      this.uploadData.FileName = "";
      this.fileList = [];
      this.file.raw = "";
    },
    beforeUpload(file, fileList) {
      this.file = file;
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    GetWinAffixFile() {
      this.$http.get("/BidWin/GetWinAffixFile", { params: { bidModeId: this.bidModeId } }).then((res) => {
        if (res.data.result.success) {
          this.showsubmit = true;
        } else {
          this.showsubmit = false;
        }
      });
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then((res) => {
        this.showmessage = res.data;
      });
    },
    GetNewLogList_BidWin() {
      this.$http.get("/WorkFlowStart/GetNewLogList_BidWin", { params: { bidModeId: this.bidModeId } }).then((res) => {
        // if (res.data.logs.length > 0) {
        this.tableshenpi2 = res.data.logs;
        this.status2 = res.data.status;
        if (res.data.logs.length > 0 || res.data.logs == null) {
          this.tableif2 = true;
        } else {
          this.tableif2 = false;
        }
        // }
      });
    },
    submitUpload() {
      this.loading = true;
      let f = new FormData();
      f.append("BidModeId", this.bidModeId);
      f.append("FileName", this.uploadData.FileName);
      // f.append("FileName", this.uploadData.FileName2);
      f.append("SectionId", this.uploadData.sectionId);
      f.append("SupplierId", this.uploadData.supplierId);
      f.append("fileBix", this.file.raw);
      this.$api.supIn.BidWinAttachUpload2(f).then((res) => {
        this.loading = false;
        if (res.success) {
          this.$refs.upload.clearFiles();
          this.$message.success(res.message);
          this.dialogVisible = false;
          this.dialogVisible2 = false;
          // this.getList1();
          // this.getList2();
          this.getListtongzhizhong();
          this.getListtpngzhibuzhong();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // onDonwLoad(file, index) {
    //   var path = "";
    //   if (index == 1) {
    //     path = file.priceFilePath;
    //   } else if (index == 2) {
    //     path = file.noticeFilePath;
    //   } else if (index == 3) {
    //     path = file.thanksFilePath;
    //   } else if (index == 4) {
    //     path = file.otherFilePath;
    //   } else if (index == 5) {
    //     path = file.sealUrl;
    //   }
    //   window.open(process.env.VUE_APP_API_URL + path);
    // },
    onDonwLoad(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + id);
    },
    gohome() {
      this.$router.push({
        path: "/index",
      });
    },
    deleteRow(row, index) {
      var id = "";
      if (index == 1) {
        id = row.priceFileId;
      } else if (index == 2) {
        id = row.noticeFileId;
      } else if (index == 3) {
        id = row.thanksFileId;
      } else if (index == 4) {
        id = row.otherFileId;
      } else if (index == 5) {
        id = row.sealId;
      }
      this.$confirm("确认要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.DeleteBidWinAttach({ id: id }).then((res) => {
          if (res.success) {
            this.$msg.success(res.message);
            this.getListtongzhizhong();
            this.getListtpngzhibuzhong();
          } else {
            this.$msg.error(res.message);
          }
        });
      });
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
    goto() {
      window.open("#/bid/processDetail?id=" + this.bidModeId);
      console.log(this.bidModeId);
    },
    getbidModeId() {
      this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then((res) => {
        console.log(this.bidModeId);
        this.planId = res.data.planId;
        console.log(this.planId);
        this.getlist();
      });
    },
    getlist() {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then((res) => {
        this.form = res.data;
      });
    },
    getListjiaodi() {
      this.$api.supIn.GetBidWinAttachList03({ bidModeId: this.bidModeId }).then((res) => {
        this.uploadList = res;
      });
    },
    getListtongzhizhong() {
      this.$api.supIn.GetThanksSupplierList02({ bidModeId: this.bidModeId }).then((res) => {
        this.table1 = res;
        this.finalWinPrice = res[0].finalWinPrice;
        this.sectionId = res[0].sectionId;
        this.supplierId = res[0].supplierId;
        console.log(this.finalWinPrice);
      });
    },
    getListtpngzhibuzhong() {
      this.$api.supIn.GetNoThanksSupplierList02({ bidModeId: this.bidModeId }).then((res) => {
        this.table2 = res;
      });
    },
    getListdingfile() {
      this.$api.supIn.GetBidWinAttachList01({ bidModeId: this.bidModeId }).then((res) => {
        this.dingfile = res;
      });
    },
    getInfo() {
      this.$api.supIn.GetBidWinMaster01({ bidModeId: this.bidModeId }).then((res) => {
        this.form = res;
        if (this.form.bidWinDate) {
          this.form.bidWinDate = this.form.bidWinDate.substring(0, 10);
        }
      });
    },
    getzhong() {
      this.$api.supIn.GetSectionSupplier01({ bidModeId: this.bidModeId }).then((res) => {
        this.table4 = res[0].winSupplierList;
        this.table4.sectionName = "排名（" + res[0].sectionName + ")";
      });
    },
    // GetWinAuditPageShow() {
    //   this.$http.get("/BidWin/GetWinAuditPageShow", { params: { bidModeId: this.bidModeId, masterId: this.masterId } }).then(res => {
    //     //   this.tabledata = res.data.fileList;
    //     //   console.log(res.data);
    //     this.showTab = this.activeName;
    //     if (res.data.showPassButton) {
    //       this.showPassButton = true;
    //     } else {
    //       this.showPassButton = false;
    //     }
    //     if (res.data.showRefuseButton) {
    //       this.showRefuseButton = true;
    //     } else {
    //       this.showRefuseButton = false;
    //     }
    //     if (res.data.showRefuseButton == false && res.data.showPassButton == false) {
    //       this.showmark = false;
    //     } else {
    //       this.showmark = true;
    //     }
    //   });
    // },
    GetBidWinList() {
      this.$http.get("/WflowApproveLogsAppServices/GetBidWinList", { params: { MasterId: this.masterId } }).then((res) => {
        this.tablelist = res.data;
      });
    },
    omsubmit() {
      var a = [];
      for (var i = 0; i < this.table1.length; i++) {
        var b = {};
        b.bidModeId = this.bidModeId;
        b.sectionId = this.table1[i].sectionId;
        b.supplierId = this.table1[i].supplierId;
        b.finalWinPrice = this.table1[i].finalWinPrice;
        a.push(b);
      }
      this.$confirm("提交后不能修改，确定要提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // let obj = {
        //   bidModeId : this.bidModeId,
        // sectionId : this.sectionId,
        // supplierId :  this.supplierId,
        // finalWinPrice : this.finalWinPrice,
        // }
        this.loadingto = true;
        this.$http.post("/BidWin/SubmitThanks03", a).then((res) => {
          if (res.data.success) {
            this.loadingto = false;
            this.$msg.success(res.data.message);
            // this.$router.push({
            //   path: "/user/todoList",
            // });
            this.GetNewLogList_BidWin();
            this.getListtongzhizhong();
            this.getListtpngzhibuzhong();
            this.GetWinAffixFile();
          } else {
            this.loadingto = false;
            this.GetWinAffixFile();
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    bohui() {
      this.$confirm("确认要驳回定标审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.remark == "") {
          let obj = {
            bidModeId: this.bidModeId,
            masterId: this.masterId,
            remark: this.remark,
            isOk: -1,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_BidWin_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.getbidModeId();
              this.GetWinAuditPageShow();
              this.GetBidWinList();
            } else {
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
::v-deep .clearfix::after {
  content: none;
}
.el-icon-s-home {
  color: #409eff;
}
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 20px;
  float: right;
  cursor: pointer;
}
</style>
