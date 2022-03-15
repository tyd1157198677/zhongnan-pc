<!--  -->
<template>
  <div class="">
    <!-- <el-alert :title="warnTitle" type="warning" :closable="false" style="margin:10px 0"> </el-alert> -->
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="投标方质疑文件" name="投标方质疑文件">
        <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="dataList1" v-loading="loading">
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column label="投标方名称" min-width="160">
            <template slot-scope="scope">
              <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpDetail(scope.row.supplierId)">{{
                scope.row.supplierName
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="文件名称" width="260" align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.fileName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件大小" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.fileSize }}</span>
            </template>
          </el-table-column>

          <el-table-column label="文件类型" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.fileExtName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上传时间" align="center" prop="creationTime" width="200">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下载" align="center" width="100">
            <template slot-scope="scope">
              <span class="el-icon-download" @click="downLoad(scope.row.id, 1)"></span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="招标方答复文件" name="招标方答复文件">
        <el-alert :title="auditmessage4" v-if="showmes4" type="warning" :closable="false"></el-alert>
        <!-- <el-alert v-if="dataList2.length == 0" title="暂无招标方答复文件" type="warning" :closable="false" style="margin:10px 0">
        </el-alert> -->
        <div>
          <!-- v-if="isShowBtn"  -->
          <span style="color: red">需要在【操作】列中提交答疑审批，审批通过后投标方才能查看</span>
          <el-button style="float: right; margin-bottom: 10px" v-if="isShowBtn" type="primary" size="mini" @click="addDyi"
            >新增答疑</el-button
          >
        </div>
        <el-collapse v-model="activeNames" style="margin-top: 20px">
          <el-collapse-item :name="item.answerName" v-for="(item, index) in dataList2" :key="index" style="margin-top: 20px">
            <template slot="title">
              <span class="infonametits">{{ item.answerName }}</span>
            </template>
            <div style="float: right">
              <span v-if="item.creationTime != null || item.creationTime != ''" style="margin-right: 10px"
                >提交时间：{{ parseTime(item.creationTime, "yyyy-MM-dd hh:mm") }}</span
              ><span v-if="item.submitStatus != null || item.submitStatus">状态：{{ item.submitStatus }}</span>
            </div>
            <!-- <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              v-loading="subloading"
              :data="dataList2"
            >
              <el-table-column label="答复供方" align="right" width="150"> </el-table-column>
              <el-table-column :label="item.detail.supplierNameList" align="left"> </el-table-column>
            </el-table> -->
            <table class="layui-table el-table__body">
              <tbody>
                <tr>
                  <td class="center">答复供方</td>
                  <td colspan="10">
                    {{ item.detail.supplierNameList }}
                  </td>
                </tr>
              </tbody>
            </table>
            <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              v-loading="subloading"
              :data="item.detail.answerFileList"
            >
              <el-table-column label="相关附件" align="center">
                <el-table-column type="index" width="70" label="序号" align="center"> </el-table-column>
                <el-table-column label="附件名称" prop="fileName" align="center"> </el-table-column>
                <el-table-column label="文件大小" prop="fileSize" align="center"> </el-table-column>
                <el-table-column label="文件类型" prop="fileExtName" align="center"> </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-delete"
                      v-if="scope.row.canDelete"
                      title="删除"
                      style="margin-right: 10px"
                      @click="del(scope.row.fileId, 2)"
                    ></i>
                    <i class="el-icon-download" title="下载" @click="downLoad(scope.row.fileId, 2)"></i>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <div style="margin-top: 10px">
              <el-button
                type="primary"
                v-if="item.canEdit"
                style="float: right; margin-left: 10px; margin-bottom: 10px"
                @click="del(item.id, 1)"
                size="small"
                v-loading="subloading"
                >删除</el-button
              >
              <el-button
                type="primary"
                v-if="item.canEdit"
                v-loading="subloading"
                style="float: right; margin-left: 10px; margin-bottom: 10px"
                @click="sub(item.id)"
                size="small"
                >提交</el-button
              >
            </div>

            <div style="margin-top: 30px">
              <el-form
                v-if="item.auditButton.showPassButton || item.auditButton.showRefuseButton"
                v-loading="loadingwaibu"
                :rules="rulesrizhi"
              >
                <el-form-item label="审批意见：" prop="ideaRemark" style="margin-top: 20px">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 4 }"
                    v-if="item.auditButton.ideaRemark != '' || item.auditButton.ideaRemark != null"
                    :placeholder="item.auditButton.ideaRemark"
                    v-model="item.remark"
                    style="width: 100%"
                  ></el-input>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 4 }"
                    v-else
                    placeholder="请输入审批意见"
                    v-model="item.remark"
                    style="width: 100%"
                  ></el-input>
                  <div style="color: red; margin: 10px 0">如对某条答疑有意见，请填写审批意见</div>
                </el-form-item>
                <el-form-item>
                  <el-button
                    size="mini"
                    v-if="item.auditButton.showPassButton"
                    type="primary"
                    style="float: right; margin-top: 10px"
                    @click="omsubmitwaibu(item)"
                    >通过</el-button
                  >
                  <el-button
                    size="mini"
                    v-if="item.auditButton.showRefuseButton"
                    type="primary"
                    style="float: right; margin-top: 10px; margin-right: 10px"
                    @click="bohuiwaibu(item)"
                    >驳回</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div style="margin-top: 50px" v-if="item.logData.logs.length > 0">
              <div slot="header" class="clearfix">
                <span>审批日志({{ item.logData.status }})</span>
              </div>
              <div class="text item">
                <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="item.logData.logs">
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
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>

    <el-dialog width="70%" :title="tit + '答疑文件'" :visible.sync="dialogVisible1">
      <div style="color: red; margin-bottom: 10px; margin-left: 20px">注：一个答疑文件可同时发送给多个投标方</div>
      <el-form
        ref="newData"
        :model="newData"
        label-width="160px"
        label-position="right"
        size="mini"
        :rules="rules"
        element-loading-text="上传中请稍等···"
        v-loading="loading2"
      >
        <el-form-item label="答疑主体名称" prop="answerName">
          <el-input v-model="newData.answerName" placeholder="例如：第1次答疑"></el-input>
        </el-form-item>
        <el-form-item label="选择要答复的投标方" prop="supplierIds">
          <el-checkbox-group v-model="newData.supplierIds" :indeterminate="true">
            <el-checkbox v-for="city in dataList" :label="city.id" :key="city.id">{{ city.comFullName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上传文件" prop="file">
          <el-upload
            ref="upload"
            multiple
            name="File"
            :headers="header"
            :on-change="handleSuccess"
            action=""
            :auto-upload="false"
            :http-request="httpRequest"
          >
            <el-button size="small" type="primary">选取文件</el-button>
            <span style="margin-left: 10px; color: red">可上传多个文件</span>
            <div slot="tip" class="el-upload__tip">允许文件类型：.doc|.docx|.xls|.xlsx|.rar|.zip, 单文件最大：100 兆</div>
          </el-upload>
          <el-button style="float: right" type="primary" @click="newForm" size="mini">保 存</el-button>
        </el-form-item>
      </el-form>
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
      header: { Authorization: "Bearer " + this.$store.state.token },
      showholder: false,
      showhold: true,
      activeNames: [],
      valuehold1: "",
      valuehold2: "",
      showmes4: false,
      auditmessage4: "",
      loading2: false,
      showmarkwaibu: false,
      ideaRemarkwaibu: "",
      showPassButtonwaibu: false,
      showRefuseButtonwaibu: false,
      loadingwaibu: false,
      auditButton: false,
      subloading: false,
      tableList: [],
      dataList: [],
      dataList1: [],
      rules: {
        answerName: [{ required: true, message: "答疑主体名称不能为空", trigger: "change" }],
        supplierIds: [{ required: true, message: "请勾选要答复的投标方", trigger: "change" }],
        file: [{ required: true, message: "文件不能为空", trigger: "change" }],
      },
      loading1: "",
      dataList2: [],
      dataList3: [],
      supplierNameList: "",
      file: [],
      newData: {
        supplierIds: [],
        answerName: "",
        file: [],
      },
      tableshenpi: [],
      tableif: false,
      status: "",
      activeName: "投标方质疑文件",
      type: 0,
      msg: "请勾选表格！",
      selectExplainId: "",
      tit: "",
      bidOpenDate: "",
      warnTitle: "",
      supplierId: "",
      isShowBtn: false,
      loading: false,
      dialogVisible: false,
      dialogVisible1: false,
      uploadData: {},
      rulesrizhi: {
        // ideaRemarkwaibu: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
      },
      fileType: [".xls", ".xlsx", ".rar", ".zip", ".doc", ".docx"],
      condition: "允许文件类型：.xls, .xlsx .rar, .zip, .doc, .docx,  最大20 兆",
      obj: {},
      getUploadUrl1: "/api/services/app/LiandoBidSupQs/BidAnswerAttach",
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
    tomethgodayi() {
      this.CheckUserProcessPageAuth();
    },
    CheckUserProcessPageAuth() {
      this.$http.get("/BidCheckCenter/CheckUserProcessPageAuth", { params: { baseId: this.id } }).then((res) => {
        if (res.data.success) {
          if (!res.data.returnValue1) {
            this.GetQsStatus();
            // this.GetNewLogList_SupQus();
            this.AuditMessageLabel4();
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
    AuditMessageLabel4() {
      this.$http.post("/LiandoBidProcess/AuditMessageLabel?bidModeId=" + this.id + "&type=" + 2).then((res) => {
        if (res.data.result.success) {
          this.showmes4 = true;
          this.auditmessage4 = res.data.result.message;
        } else {
          this.showmes4 = false;
        }
      });
    },
    httpRequest(param) {
      this.file.push(param.file); // 一般情况下是在这里创建FormData对象，但我们需要上传多个文件，为避免发送多次请求，因此在这里只进行文件的获取，param可以拿到文件上传的所有信息
      this.newData.file = this.file;
    },
    handleSuccess(file, fileList) {
      this.newData.file = fileList;
      if (fileList.length > 0) {
        //上传成功钩子
        this.$nextTick(() => {
          this.$refs["newData"].clearValidate(["file"]); //取消该项校验
        });
      }
    },
    newForm() {
      if (this.newData.file.length > 0) {
        //上传成功钩子
        this.$nextTick(() => {
          this.$refs["newData"].clearValidate(["file"]); //取消该项校验
        });
      }
      this.$refs["newData"].validate((valid) => {
        if (valid) {
          this.loading2 = true;
          let upData = new FormData();
          this.$refs.upload.submit(); // 这里是执行文件上传的函数，其实也就是获取我们要上传的文件
          this.file.forEach((file) => {
            // 因为要上传多个文件，所以需要遍历
            upData.append("file", file, file.name);
            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
          });
          upData.append("BidModeId", this.id); // 这里需要转换一下格式传给后台
          upData.append("SupplierIds", this.newData.supplierIds); // 这里需要转换一下格式传给后台
          upData.append("AnswerName", this.newData.answerName); // 这里需要转换一下格式传给后台
          this.$axios.post("/api/FileUpload/UploadAnswerFileList", upData).then((res) => {
            if (res.data.success) {
              this.loading2 = false;
              this.$message.success("上传成功");
              this.$refs.upload.clearFiles();
              this.dialogVisible1 = false;
              this.newData.supplierIds = "";
              this.newData.answerName = "";
              this.newData.file = [];
              this.fiel = [];
              this.GetQsStatus();
              // this.GetAuditButton04();
            } else {
              this.loading2 = false;
              this.$message.warning("上传失败");
            }
          });
        }
      });
    },
    GetNewLogList_SupQus(row) {
      this.$http
        .get("/WorkFlowStart/GetNewLogList_SupQus", { params: { bidModeId: this.id, masterId: this.selectExplainId } })
        .then((res) => {
          // if (res.data.logs.length > 0) {
          this.tableshenpi = res.data.logs;
          this.status = res.data.status;
          if (res.data.logs.length > 0 || res.data.logs == null) {
            this.tableif = true;
          } else {
            this.tableif = false;
          }
          // }
        });
    },
    // GetExplainDetailList32(row) {
    //   this.GetAnswerShowDetailList002();
    //   this.GetAuditButton04();
    // },
    sub(id) {
      this.$confirm("确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.subloading = true;
        this.$http.post("/LiandoBidSupQs/SubmitAnswer", { id }).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.subloading = false;
            this.GetAnswerMaster001();
          } else {
            this.$message.warning(res.data.message);
            this.subloading = false;
          }
        });
      });
    },
    del(id, i) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post(i == 1 ? "/LiandoBidSupQs/DelAnswer" : "/LiandoBidSupQs/DeleteAnswerFile003", { id }).then((res) => {
          if (res.data.success) {
            this.GetAnswerMaster001();
            this.$message.success(res.data.message);
            // this.GetAnswerShowDetailList002();
          } else {
            this.$message.warning(res.data.message);
          }
        });
      });
    },
    handleTabClick(e) {
      if (e.name == "投标方质疑文件") {
        this.GetSupQuestionList_Supplier();
      } else {
        this.GetAnswerMaster001();
      }
    },

    GetQsStatus() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/LiandoBidSupQs/GetQsStatus", { params: obj }).then((res) => {
        this.warnTitle = res.data.message;
        if (res.data.success) {
          this.isShowBtn = true;
        } else {
          this.isShowBtn = false;
        }
        // this.isShowBtn = res.data.success;
      });
      if (this.activeName == "投标方质疑文件") {
        this.GetSupQuestionList_Supplier();
      } else {
        this.GetAnswerMaster001();
      }
    },
    GetSupQuestionList_Supplier() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/LiandoBidSupQs/GetSupQuestionList_Supplier", { params: obj }).then((res) => {
        this.dataList1 = res.data;
      });
    },

    GetAnswerMaster001() {
      let obj = {
        bidModeId: this.id,
      };
      this.dialogVisible1 = false;
      this.$http.get("/LiandoBidSupQs/GetAnswerMaster001", { params: obj }).then((res) => {
        res.data.forEach((e) => {
          e.remark = "";
        });
        this.dataList2 = res.data;
        this.activeNames = res.data.map((v) => v.answerName);
        this.selectExplainId = res.data.map((v) => v.id).join();
        // this.selectExplainId = res.data.length > 0 ? res.data[0].id : "";
        // if (res.data.length > 0) {
        //   this.GetAnswerShowDetailList002();
        //   this.GetNewLogList_SupQus();
        //   this.GetAuditButton04();
        // }
      });
    },
    GetAnswerShowDetailList002() {
      let obj = {
        answerId: this.selectExplainId,
      };
      this.dialogVisible1 = false;
      this.$http.get("/LiandoBidSupQs/GetAnswerShowDetailList002", { params: obj }).then((res) => {
        this.dataList3 = res.data;
        this.supplierNameList = res.data.supplierNameList;
        console.log(this.supplierNameList);
      });
      // this.GetNewLogList_SupQus();
    },
    GetBidWinPageShow() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/LiandoBidSupQs/GetSupplierInList", { params: obj }).then((res) => {
        this.dataList = res.data;
      });
    },
    addDyi() {
      this.tit = "新增";
      this.GetBidWinPageShow();
      this.dialogVisible1 = true;
      this.fileList = [];
      this.newData.file = [];
      this.file = [];
      this.newForm.supplierIds = [];
      this.newForm.answerName = "";
      this.$nextTick(() => {
        this.$refs["newData"].resetFields();
        this.$refs.upload.clearFiles();
      });
    },
    GetAuditButton04() {
      this.$http.get("/LiandoBidSupQs/GetAuditButton04", { params: { bidModeId: this.id, masterId: this.selectExplainId } }).then((res) => {
        // this.ideaRemarkwaibu = res.data.ideaRemark;
        if (res.data.ideaRemark != "" || res.data.ideaRemark != null) {
          this.showhold = true;
          this.showholder = false;
          this.valuehold1 = res.data.ideaRemark;
        } else {
          this.showhold = false;
          this.showholder = true;
          this.valuehold2 = "请输入审批意见";
        }
        if (res.data.showPassButton) {
          this.showPassButtonwaibu = true;
        } else {
          this.showPassButtonwaibu = false;
        }
        if (res.data.showRefuseButton) {
          this.showRefuseButtonwaibu = true;
        } else {
          this.showRefuseButtonwaibu = false;
        }
        if (res.data.showRefuseButton == false && res.data.showPassButton == false) {
          this.showmarkwaibu = false;
        } else {
          this.showmarkwaibu = true;
        }
      });
    },
    omsubmitwaibu(item) {
      if (!item.remark) {
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
            bidModeId: this.id,
            masterId: item.id,
            remark: item.remark,
            isOk: 0,
          };
          this.loadingwaibu = true;
          this.$http.post("/WorkFlowStart/WF_Process_SupQus_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingwaibu = false;
              this.$msg.success("操作成功");
              this.GetAnswerMaster001();
            } else {
              this.loadingwaibu = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    bohuiwaibu(item) {
      if (!item.remark) {
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
            bidModeId: this.id,
            masterId: item.id,
            remark: item.remark,
            isOk: -1,
          };
          this.loadingwaibu = true;
          this.$http.post("/WorkFlowStart/WF_Process_SupQus_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingwaibu = false;
              this.$msg.success("操作成功");
              this.GetAnswerMaster001();
            } else {
              this.loadingwaibu = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    downLoad(id, i) {
      // window.location.href = process.env.VUE_APP_API_URL + url;
      if (i == 1) {
        window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidQuestionDownLoad001?fileId=" + id);
      } else {
        window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad009?fileId=" + id);
      }
    },
    downLoad2(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
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
.bst {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  span {
    font-weight: 600;
    font-size: 15px;
  }
}
</style>
