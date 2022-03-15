<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>招标公告</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs type="card" class="mt-2" v-model="activeName">
          <el-tab-pane label="基本信息" name="first">
            <el-form :model="form" :rules="rules" size="small" label-position="right" label-width="auto" ref="form" class="mt-2">
              <div class="fromborder">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="公告标题" prop="noticeTitle" class="fm-full-line">
                      <el-input v-model="form.noticeTitle" placeholder="请输入公告标题"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="项目计划开始日期" prop="startDate">
                      <el-date-picker type="date" v-model="form.startDate" value-format="yyyy-MM-dd" placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="报名截止时间" prop="signUpEndDate">
                      <el-date-picker
                        type="datetime"
                        v-model="form.signUpEndDate"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="选择时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="计划工期【月】" prop="projectTimeSpan">
                      <el-input type="number" :min="1" v-model.number="form.projectTimeSpan" placeholder="请输入计划工期"> </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联系人姓名" prop="personName">
                      <el-input v-model="form.personName" placeholder="请输入联系人姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系方式" prop="mobilePhone">
                      <el-input v-model="form.mobilePhone" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人邮箱" prop="personEmail">
                      <el-input v-model="form.personEmail" placeholder="请输入联系人邮箱"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="联系地址" prop="contactAddress" class="fm-full-line">
                      <el-input v-model="form.contactAddress" placeholder="请输入联系地址"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="报名方式" prop="bidSignUpType">
                      <el-select v-model="form.bidSignUpType" placeholder="请选择报名方式">
                        <el-option label="线上报名" value="线上报名"></el-option>
                        <el-option label="线下报名" value="线下报名"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="项目地址" prop="projectAddress" class="fm-full-line">
                      <el-input v-model="form.projectAddress" placeholder="请输入项目地址"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="项目介绍" prop="projectDesc" class="fm-textarea">
                      <el-input type="textarea" rows="4" show-word-limit v-model="form.projectDesc" placeholder="请输入项目介绍"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="招标范围" prop="bidScope" class="fm-textarea">
                      <el-input type="textarea" rows="4" show-word-limit v-model="form.bidScope" placeholder="请输入招标范围"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="报名提交材料" prop="requireFile" class="fm-textarea">
                      <el-input
                        type="textarea"
                        rows="4"
                        show-word-limit
                        v-model="form.requireFile"
                        placeholder="请输入报名提交材料"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-form-item class="float-right">
                <el-button type="primary" class="buttoncss" size="small" @click="onSubmit">保存信息</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="附件信息" name="second">
            <div>
              <div class="float-right mb-2">
                <el-button type="primary" size="small" @click="onUploadPreview">上传新附件</el-button>
              </div>
              <el-table
                empty-text="无符合条件的记录"
                stripe
                border
                element-loading-text="请稍候,数据正在加载中..."
                :data="files"
                v-loading="loading"
              >
                <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
                <el-table-column label="附件名称" prop="fileName"> </el-table-column>
                <el-table-column label="操作" width="90" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-delete" title="删除" @click="onDelete(scope.row)"></i>
                    <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row)"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-dialog width="50%" title="上传招标公告" :visible.sync="dialogVisible">
              <el-form class="mt-2">
                <el-form-item label="文件名称">
                  <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
                </el-form-item>
                <el-form-item label="选择文件">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :multiple="false"
                    :data="uploadData"
                    :action="getUploadUrl()"
                    :on-success="onUploadSuccess"
                    :auto-upload="false"
                    :headers="header"
                  >
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传</el-button>
                    <div slot="tip" class="el-upload__tip">文件格式：.doc|.docx|.ppt|.pptx|.xls|.xlsx|.pdf|.rar|.zip| 最大：50 兆</div>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
/**
 * 招标采购-招标公告
 */
import PlanMenu from "../components/PlanMenuDemo.vue";
import { mapState } from "vuex";

export default {
  name: "Step2",
  components: { PlanMenu },
  inject: ["reload"],
  data() {
    return {
      activeName: "first",
      dialogVisible: false,
      files: [],
      loading: false,
      uploadData: {},
      form: {},
      rules: {
        noticeTitle: [{ required: true, message: "请输入公告标题", trigger: "blur" }],
        startDate: [{ required: true, message: "请选择项目计划开始日期", trigger: "change" }],
        signUpEndDate: [{ required: true, message: "请选择报名截止时间", trigger: "change" }],
        bidSignUpType: [{ required: true, message: "请选择报名方式", trigger: "change" }],
        personName: [{ required: true, message: "请输入联系人姓名", trigger: "blur" }],
        mobilePhone: [{ required: true, message: "请输入联系人手机号", trigger: "blur" }],
        projectTimeSpan: [
          { required: true, message: "请输入计划工期【月】", trigger: "blur" },
          { type: "number", message: "工期必须为数字值" },
        ],
        projectAddress: [{ required: true, message: "请输入项目地址", trigger: "blur" }],
        requireFile: [{ required: true, message: "请输入报名提交材料", trigger: "blur" }],
      },
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
  },
  mounted() {
    if (this.baseId) {
      this.getOneBidNoticeById(this.baseId);
      this.getNoticeAttachList(this.baseId);
    }
  },
  methods: {
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidNoticeAttachUpload";
    },
    onDownload(file) {
      window.open(`${process.env.VUE_APP_API_URL}/${file.filePath}${file.fileReName}`, "_blank");
      console.log("down file,", file);
    },
    getNoticeAttachList(baseId) {
      this.$api.BidNotice.GetNoticeAttachList(this.baseId).then((res) => {
        this.files = res;
      });
    },
    getOneBidNoticeById(baseId) {
      this.$api.BidNotice.GetOneBidNoticeById(this.baseId).then((res) => {
        this.form = res;
      });
    },
    /**
     * 保存
     */
    onSubmit() {
      console.log(this.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.baseId = this.baseId;
          console.log(this.form);
          this.$api.BidNotice.InsertOrUpdateBidNoticeSingle(this.form)
            .then((res) => {
              if (res.success) {
                this.$msg.success("保存成功");
                this.getOneBidNoticeById(this.baseId);
              } else {
                this.$msg.error(res.message);
              }
            })
            .finally(() => {});
        }
      });
    },
    onUploadPreview() {
      this.dialogVisible = true;
    },
    submitUpload() {
      Object.assign(this.uploadData, { BaseId: this.baseId });
      this.$refs.upload.submit();
    },
    onUploadSuccess(response, file, fileList) {
      this.$message.success("保存成功");
      this.getNoticeAttachList(this.baseId);
      this.dialogVisible = false;
      //console.log("onUploadSuccess", response, file, fileList);
    },
    onDelete(file) {
      console.log("onDelete file,", file);
      this.$api.BidNotice.DeleteBidNoticeAttachById(file.id).then((res) => {
        this.$message.success("删除成功");
        this.getNoticeAttachList(this.baseId);
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

.el-input {
  width: 200px;
}

.el-form-item {
  margin-bottom: 10px;
}

.el-form-item__error {
  top: auto;
}

.fm-textarea {
  width: 100%;
}

.fm-textarea .el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  width: 80%;
}
.fm-full-line {
  width: 100%;
}
.fm-full-line .el-input {
  width: 100%;
}
.fm-full-line .el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  width: 80%;
}
::v-deep .el-form-item__error {
  position: initial;
}
</style>
