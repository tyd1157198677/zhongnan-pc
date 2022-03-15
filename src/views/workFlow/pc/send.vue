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
      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header" class="clearfix flexs">
          <span>招标文件</span>
        </div>
        <div class="tits"></div>
        <el-table
          style="width: 100%; margin-top: 10px"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="attachList01"
        >
          <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
          <el-table-column label="文件名称" align="left">
            <template slot-scope="scope">
              <i class="el-icon-star-on" v-if="scope.row.mustUpload" style="color: red; font-size: 8px"></i>
              <span>{{ scope.row.fileName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件格式" align="center" width="150">
            <template slot-scope="scope"
              ><span>{{ scope.row.fileExtName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="todoBusinessCate" label="文件大小" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.showFileSize }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <span>
                <i class="el-icon-download" @click="download(scope.row.id)" style="margin-right: 10px" title="下载文件"></i>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header" class="clearfix flexs">
          <span>底稿</span>
        </div>
        <div class="tits"></div>
        <el-table
          style="width: 100%; margin-top: 10px"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="attachList02"
        >
          <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
          <el-table-column label="文件名称" align="left">
            <template slot-scope="scope">
              <i class="el-icon-star-on" v-if="scope.row.mustUpload" style="color: red; font-size: 8px"></i>
              <span>{{ scope.row.fileName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件格式" align="center" width="150">
            <template slot-scope="scope"
              ><span>{{ scope.row.fileExtName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="todoBusinessCate" label="文件大小" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.showFileSize }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <span>
                <i class="el-icon-download" @click="download(scope.row.id)" style="margin-right: 10px" title="下载文件"></i>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div style="margin-top: 30px">
        <el-form v-if="showPassButtonfile || showRefuseButtonfile" v-loading="loadingfa">
          <el-form-item label="审批意见：" prop="ideaRemark" style="margin-top: 20px">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 4 }"
              placeholder="请输入审批意见"
              v-model="ideaRemark"
              style="width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" v-if="showPassButtonfile" type="primary" style="float: right; margin-top: 10px" @click="omsubmitfile()"
              >通过</el-button
            >
            <el-button
              size="mini"
              v-if="showRefuseButtonfile"
              type="primary"
              style="float: right; margin-top: 10px; margin-right: 10px"
              @click="bohuifile()"
              >驳回</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 50px" v-if="logsfileshow">
        <div slot="header" class="clearfix">
          <span>审批日志({{ statusfile }})</span>
        </div>
        <div class="text item">
          <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="logsfile">
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
      </div>
    </el-card>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  inject: ["reload"],
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      form: [],
      logsfile: [],
      logsfileshow: false,
      statusfile: "",
      showPassButtonfile: false,
      showRefuseButtonfile: false,
      loadingfa: false,
      msg: "",
      attachList02: [],
      attachList01: [],
      loadingfa: false,
      ideaRemark: "",
      showmessage: "",
      isCanEdit: false,
      radio: true,
      showRefuseButton: false,
      showPassButton: false,
      showmark: false,
      tabledata: [],
      tablelist: [],
      optionList3: [],
      tableList: {
        attachList: [],
      },
      FileName: "",
      remark: "",
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      tableData: "",
      loading: false,
      // loading1: false,
      uploadData: {},
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rulesrizhi: {
        // remark: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
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
    // this.GetBidFileEditAttachList_02();
    // this.GetBidSendPageShow();
    this.GetBidMasterFilePageShow();
    this.getbidModeId();
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
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then((res) => {
        this.showmessage = res.data;
      });
    },
    downLoad(id) {
      // window.location.href = process.env.VUE_APP_API_URL + url;
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad004?fileId=" + id);
    },
    // 相关附件下载
    download(fileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad004?fileId=" + fileId);
      // window.location.href = process.env.VUE_APP_API_URL + url;
    },
    getlist() {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then((res) => {
        this.form = res.data;
      });
    },
    //招标文件的审批
    GetBidMasterFilePageShow() {
      this.$http.get("/BidMaster/GetBidMasterFilePageShow", { params: { bidModeId: this.bidModeId } }).then((res) => {
        // this.showSubmitButtonfile = res.data.showSubmitButton;
        // this.masterId = res.data.masterId;
        this.attachList01 = res.data.attachList01;
        this.attachList02 = res.data.attachList02;
        this.logsfile = res.data.data.logs;
        if (this.logsfile.length > 0) {
          this.logsfileshow = true;
        } else {
          this.logsfileshow = false;
        }
        this.statusfile = res.data.data.status;
        this.showPassButtonfile = res.data.auditButton.showPassButton;
        this.showRefuseButtonfile = res.data.auditButton.showRefuseButton;
      });
    },
    // 底稿列表
    // GetBidFileEditAttachList_02() {
    //   this.$http.get("/BidAttach/GetBidFileEditAttachList_02", { params: { baseId: this.bidModeId } }).then(res => {
    //     if (res.data.result) {
    //       this.optionList3 = res.data.result;
    //     }
    //   });
    // },
    // GetBidSendPageShow() {
    //   this.loading = true;
    //   this.$http.get("/BidSend/GetBidSendPageShow", { params: { bidModeId: this.bidModeId } }).then(res => {
    //     this.showRefuseButton = res.data.auditButton.showRefuseButton;
    //     this.showPassButton = res.data.auditButton.showPassButton;
    //     this.auditMasterId = res.data.auditMasterId;
    //     this.tableList = res.data;
    //   });
    // },
    //通过招标文件
    omsubmitfile() {
      if (!this.ideaRemark) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
      } else {
        this.$confirm("确认要通过审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            bidModeId: this.bidModeId,
            masterId: this.masterId,
            remark: this.ideaRemark,
            isOk: 0,
          };
          this.loadingfa = true;
          this.$http.post("/WorkFlowStart/WF_Process_Send_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingfa = false;
              this.$msg.success("操作成功");
              this.GetBidMasterFilePageShow();
            } else {
              this.loadingfa = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    //驳回招标文件
    bohuifile() {
      if (!this.ideaRemark) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
      } else {
        this.$confirm("确认要驳回审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            bidModeId: this.bidModeId,
            masterId: this.masterId,
            remark: this.ideaRemark,
            isOk: -1,
          };
          this.loadingfa = true;
          this.$http.post("/WorkFlowStart/WF_Process_Send_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingfa = false;
              this.$msg.success("操作成功");
              this.GetBidMasterFilePageShow();
            } else {
              this.loadingfa = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    gohome() {
      this.$router.push({
        path: "/index",
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
