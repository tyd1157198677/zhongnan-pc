<template>
  <el-main>
    <el-card style="margin-bottom: 60px">
      <!-- <div slot="header" class="clearfix flex between middle"> -->
      <!-- <el-page-header @back="$router.back(-1)" :content="navBarName"></el-page-header> -->
      <div>
        <span
          ><strong>{{ showmessage }}</strong></span
        >
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
        <!-- <i class="el-icon-s-home" style="float:right;margin-left:10px;" title="点击进入首页" @click="gohome"></i> -->
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
      <div>
        <el-row>
          <div class="float-right mb-2" style="margin-top: 10px">
            <el-button type="primary" size="small" @click="downfile(filesId)">下载模板</el-button>
            <el-button type="primary" size="small" v-if="uploadButton" @click="onUploadPreview">上传附件</el-button>
          </div>
          <div style="margin-top: 10px">
            <span style="margin-right: 20px">
              状态：<span>{{ showstatus }}</span>
            </span>
            <span v-if="returnMessage != ''">
              驳回原因：<span>{{ returnMessage }}</span>
            </span>
            <span v-if="repeatUserName != ''">
              被转发人：<span>{{ repeatUserName }}</span>
            </span>
          </div>

          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="files">
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="附件名称" prop="fileName" align="left"> </el-table-column>
            <el-table-column label="附件大小" width="120" prop="fileSize" align="center"> </el-table-column>
            <!-- <el-table-column label="附件类型" prop="dataType" align="center"> </el-table-column> -->
            <el-table-column label="上传人" width="120" prop="creationUserName" align="center"> </el-table-column>
            <el-table-column label="上传日期" width="200" prop="creationTime" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <i v-if="scope.row.canDel" class="el-icon-delete" title="删除" @click="onDelete(scope.row)"></i>
                <i class="el-icon-download" title="下载" @click="download(scope.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-row v-loading="loading2">
        <el-button
          size="mini"
          type="primary"
          v-if="submitButton"
          style="float: right; margin-top: 10px; margin-left: 10px"
          @click="omsubmit"
          >提交</el-button
        >
        <el-button size="mini" type="primary" v-if="rejectButton" style="float: right; margin-top: 10px; margin-left: 10px" @click="bohui"
          >驳回</el-button
        >
        <el-button
          size="mini"
          type="primary"
          v-if="repeatButton"
          style="float: right; margin-top: 10px; margin-left: 10px"
          @click="zhuanjiao"
          >转交他人</el-button
        >
      </el-row>
      <div style="margin-top: 10px" v-if="this.tablelist.length > 0">
        <el-row>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tablelist">
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
            <el-table-column label="结果" width="100" prop="status" align="center"> </el-table-column>
            <el-table-column label="意见/备注" prop="comments" align="center" show-overflow-tooltip> </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-card>
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
    <el-dialog width="60%" title="驳回原因" :visible.sync="dialogVisiblebohui">
      <el-form>
        <el-form-item label="驳回原因：">
          <el-input type="textarea" style="width: 400px" v-model="message"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" style="margin-left: 10px; float: right" @click="save">确认</el-button>
          <el-button size="small" style="margin-left: 10px; float: right" @click="dialogVisiblebohui = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
        <el-form-item label="文件名称">
          <el-input v-model="FileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="false"
            :data="uploadData"
            :fileList="fileList"
            :action="getUploadUrl()"
            :on-change="beforeUpload"
            :on-success="onUploadSuccess"
            :auto-upload="false"
            :headers="header"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传</el-button>
            <div slot="tip" class="el-upload__tip">文件格式：.xlsx|.xls|.doc|.docx|.pdf|压缩包| 最大：200 兆</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
import choseUser from "@/components/choseUser";
export default {
  inject: ["reload"],
  components: { choseUser },
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      form: [],
      msg: "",
      showmessage: "",
      isCanEdit: false,
      radio: true,
      showstatus: "",
      returnMessage: "",
      repeatUserName: "",
      files: [
        {
          id: "",
          planId: "",
          fileName: "",
        },
      ],
      fileList: [],
      loading2: false,
      FileName: "",
      message: "",
      filesId: "",
      tablelist: [],
      loading: false,
      submitButton: false,
      repeatButton: false,
      rejectButton: false,
      uploadButton: false,
      dialogVisible: false,
      dialogVisiblebohui: false,
      selectSupVisible: false,
      haveSupplier: false,
      tableData: "",
      loading: false,
      uploadData: {},
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rules: {},
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  computed: {
    masterId() {
      return this.$route.query.masterId;
    },
    navBarName() {
      const barName = "";
      return barName;
    },
    bidModeId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.id;
      }
    },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
    // planId() {
    //   return this.$route.params.id;
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
    this.getList();
    // this.getlist();
    this.getbidModeId();
    this.GetSectionCancelList();
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
    this.GetProjectTempFile();
    // this.GetUserTodoList();
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
    zhuanjiao() {
      this.type = 1;
      this.$refs.choseUser.openfnc();
    },
    gohome() {
      this.$router.push({
        path: "/index",
      });
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then((res) => {
        this.showmessage = res.data;
      });
    },
    onUserAdd(id) {
      const obj = {
        bidModeId: this.bidModeId,
        userId: id.userGuid,
        todoId: this.todoId,
        masterId: this.masterId,
      };
      this.$http.post("/LiandoBidMaster/RepeatOtherUser", obj).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.getList();
          this.GetSectionCancelList();
          // this.showif = true;
          // this.GetSectionCancelList();
          // this.$router.push({
          //   path: "/user/todoList",
          // });
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    bohui() {
      this.dialogVisiblebohui = true;
      this.message = "";
    },
    save() {
      if (this.message == "") {
        this.$alert("请填写驳回原因", {
          confirmButtonText: "确定",
        });
      } else {
        this.$http
          .post("/LiandoBidMaster/RejectProgrammeFile", {
            bidModeId: this.bidModeId,
            masterId: this.masterId,
            todoId: this.todoId,
            message: this.message,
          })
          .then((res) => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.dialogVisiblebohui = false;
              this.getList();
              this.GetSectionCancelList();
            } else {
              this.$msg.error(res.data.message);
            }
          });
      }
    },
    GetSectionCancelList() {
      this.$http
        .get("/WorkFlowStart/GetNewLogList_EngineeringFile", { params: { MasterId: this.masterId, bidModeId: this.bidModeId } })
        .then((res) => {
          this.tablelist = res.data.logs;
        });
    },
    download(id) {
      // this.$http.get("/BidAttach/GetProjectTempFile", { params: { bidModeId: this.bidModeId } }).then(res => {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad006?fileId=" + id);
      //  window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad004?fileId=" + res.data.id);
      // });
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
    // async GetUserTodoList() {
    //   let obj = {
    //     IsCompleted: false,
    //   };
    //   let res = await this.$http.get("/SysTodo/GetUserTodoList", { params: obj });
    //   if (res.status == 200) {
    //     this.id = res.data.id;
    //   }
    // },
    // CheckCanEditPlan01() {
    //   this.$http.get("/LiandoPlan/CheckCanEditPlan01?planId=" + this.planId).then(res => {
    //     this.isCanEdit = res.data.success;
    //     this.msg = res.data.message;
    //     if (res.data.success) {
    //       this.getList();
    //     }
    //   });
    // },

    beforeUpload(file) {
      let name = file.name;
      if (this.FileName == "") {
        let index = name.lastIndexOf("\.");
        this.FileName = name.substring(0, index);
      }
    },

    onUploadSuccess(response, file, fileList) {
      this.$message.success(response.message);
      this.loading = false;
      this.getList();
      this.dialogVisible = false;
    },
    getList() {
      this.$http
        .get("/LiandoBidMaster/GetProcessProgrammeFile02", { params: { bidModeId: this.bidModeId, masterId: this.masterId } })
        .then((res) => {
          this.files = res.data.fileList[0].fileList;
          this.showstatus = res.data.fileList[0].auditStatus;
          this.returnMessage = res.data.fileList[0].returnMessage;
          this.repeatUserName = res.data.fileList[0].repeatUserName;
          this.rejectButton = res.data.rejectButton;
          this.repeatButton = res.data.repeatButton;
          this.submitButton = res.data.submitButton;
          this.uploadButton = res.data.uploadButton;
        });
    },
    submitUpload() {
      this.loading = true;
      Object.assign(this.uploadData);
      // console.log(this.planId);
      this.$refs.upload.submit();
    },
    getUploadUrl() {
      let fileName = this.FileName;
      return (
        process.env.VUE_APP_API_URL +
        "/api/services/app/LiandoBidMaster/UploadProgrammeFile?bidModeId=" +
        this.bidModeId +
        "&fileName=" +
        fileName +
        "&masterId=" +
        this.masterId
      );
    },
    onUploadPreview() {
      this.dialogVisible = true;
      // this.$refs.upload.clear();
      this.fileList = [];
      this.FileName = "";
    },
    GetProjectTempFile() {
      this.$http.get("/BidAttach/GetProjectTempFile", { params: { bidModeId: this.bidModeId } }).then((res) => {
        this.filesId = res.data.id;
        console.log(this.filesId);
      });
    },
    downfile(filesId) {
      this.GetProjectTempFile();
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad006?fileId=" + this.filesId);
    },
    onDelete(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoBidMaster/DelProgrammeFile", { id: opt.id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.getList();
        });
      });
    },
    omsubmit(opt) {
      this.$confirm("确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading2 = true;
        this.$http
          .post("/LiandoBidMaster/SubmitProgrammeFile", { bidModeId: this.bidModeId, todoId: this.todoId, masterId: this.masterId })
          .then((res) => {
            if (!res.status == 200) {
              this.$msg.error(res.data.message);
            } else {
              this.$msg.success(res.data.message);
              this.loading2 = false;
              this.getList();
              // this.$router.push({
              //   path: "/user/todoList",
              // });
              this.GetSectionCancelList();
            }
          });
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
.el-icon-s-home {
  color: #409eff;
}
::v-deep .clearfix::after {
  content: none;
}
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 20px;
  float: right;
  cursor: pointer;
}
</style>
