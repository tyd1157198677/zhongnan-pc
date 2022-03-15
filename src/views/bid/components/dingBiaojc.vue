<template>
  <div class="">
    <div class="pub">基本信息</div>
    <el-row>
      <div style="float:right;height:50px">
        <el-button type="primary" class="buttoncss" size="small" @click="onSubmit">保存</el-button>
      </div>
    </el-row>
    <el-form :model="form" :rules="rules" ref="form" size="small">
      <div class="fromborder">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="中标单位" prop="modeName">
              <el-select style="width:100%" v-model="form1.haveManager" placeholder="请选择">
                <el-option :value="true" label="有"></el-option>
                <el-option :value="false" label="无"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中标金额（元）" prop="modeName">
              <el-input style="width:100%" v-model="form1.haveManager" placeholder="请输入"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="相关说明" prop="bidScope">
              <el-input style="width:100%" type="textarea" v-model="form1.bidScope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </div>
    </el-form>
    <div class="pub">相关附件</div>
    <div>
      <el-row>
        <div class="sts">
          <!-- <div style="color:red">必须上传施工方案模板</div> -->
          <div>
            <!-- <el-upload
                style="display:inline-block"
                action="#"
                multipl
                :show-file-list="false"
                :headers="header"
                :http-request="headeuploadFile"
                :file-list="UploadfileList"
              >
                <el-button size="small" :loading="loadingfile" type="primary" title="请上传.rar|.zip格式文件   文件最大100M"
                  >上传施工方案模板</el-button
                >
              </el-upload> -->
            <el-button style="margin-bottom:10px;float:right" :loading="loadingfile" type="primary" size="small" @click="onUploadPreview"
              >上传附件</el-button
            >
          </div>
        </div>
        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="files">
          <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
          <el-table-column label="附件名称" prop="fileName"> </el-table-column>
          <el-table-column label="附件大小" prop="showFileSize" align="center" width="120"> </el-table-column>
          <el-table-column label="附件类型" prop="fileExtName" align="center" width="120"> </el-table-column>
          <!-- <el-table-column label="上传人" prop="bidProcessName"> </el-table-column> -->
          <el-table-column label="上传日期" prop="uploadDate" align="center" width="150">
            <!-- <template slot-scope="scope">
                  <span>
                  {{scope.row.creationTime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}
                  </span>
                  </template>  -->
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <i class="el-icon-delete" v-if="showsubmit" title="删除" @click="onDelete(scope.row)"></i>
              <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <!-- <div class="pub">提交信息</div>
    <div class="alert alert-primary" role="alert" style="margin-top:10px;">
      <p class="h7"><i class="el-icon-star-on"></i>提交招标计划必要条件：</p>
      <p class="h7">1、保存基本信息</p>
      <p class="h7">2、上传相关附件</p>
    </div>
    <div class="card mt-3" v-show="checkResult.length > 0">
      <div class="card-header">不符合提交条件，原因：</div>
      <div class="card-body">
        <div>{{ checkResult }}</div>
      </div>
    </div> -->
    <div style="margin-top:10px;margin-bottom:50px">
      <div class="float-right" style="margin-bottom:50px">
        <el-button type="primary" v-loading="subloading" @click="onSubmitto" size="small">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    faQiDingBiao: () => import("./dingBiaoComponents/faQiDingBiao"),
    tongZhiShu: () => import("./dingBiaoComponents/tongZhiShu"),
    ziLiao: () => import("./dingBiaoComponents/ziLiao"),
  },
  data() {
    return {
      activeName: "1",
      id: "",
      data: {},
      rules: {
        modeName: [{ required: true, message: "中标单位不能为空", trigger: "change" }],
      },
      selectSupVisible: false,
      dialogVisible: false,
      subloading: false,
      checkResult: "",
      form: {},
      form1: {},
      tabs: [],
      fileList: [],
      files: [],
      zuzhangdata: [],
      activeNames: [],
      loading: false,
      uploadData: {
        id: "",
        planId: "",
        FileName: "",
      },
      UploadfileList: [],
      loadingfile: false,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  mounted() {},
  methods: {
    tomethgodingbiao() {
      this.CheckBidWin();
      if (this.activeName == "1") {
        this.$refs.faqi.tomethgofaqi();
      }
      if (this.activeName == "2") {
        this.$refs.mychild.tomethgotongzhi();
      }
      if (this.activeName == "3") {
        this.$refs.ziliao.ziliao();
      }
    },
    tabsClick(val) {
      if (val.name == "2") {
        this.$refs.mychild.$emit("show2");
      }
    },
    submitUpload() {
      Object.assign(this.uploadData, { planId: this.planId, FileName: this.uploadData.FileName });
      console.log(this.planId);
      this.loadingfile = true;
      this.$refs.upload.submit();
    },
    onUploadPreview() {
      this.dialogVisible = true;
      this.uploadData.FileName = "";
      this.fileList = [];
      // this.$refs.upload.clearFiles();
    },
    headeuploadFile(item) {
      let that = this;
      const fileObj = item.file;
      const from = new FormData(); // FormData 对象
      from.append("file", fileObj);
      from.append("planId", this.planId);
      this.loadingfile = true;
      this.$axios
        .post("/api/FileUpload/BidProcessAttach4", from)
        .then(res => {
          console.log(res);
          if (res.data.success) {
            that.$message.success(res.data.message);
            this.loadingfile = false;
            this.getList();
          } else {
            // that.$msg.error(res.data.message);
            this.loadingfile = false;
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        })
        .catch(err => {
          // console.log(err);
          this.$alert(err.data.message, {
            confirmButtonText: "确定",
          });
        });
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidModeAttachUpload";
    },
    onDownload(id) {
      // window.open(`${process.env.VUE_APP_API_URL}/${file.filePath}${file.fileReName}`, "_blank");
      // console.log("down file,", file);
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad006?fileId=" + id);
    },
    beforeUpload(file) {
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData = {
        FileName: name.substring(0, index),
      };
      console.log(this.uploadData.FileName);
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success == true) {
        this.$message.success(response.message);
        this.getList(this.planId);
        this.dialogVisible = false;
        this.loadingfile = false;
      }
      if (response.success == false) {
        this.loadingfile = false;
        this.$alert(response.message, {
          confirmButtonText: "确定",
        });
      }
    },
    onSubmit() {},
    onSubmitto() {
      this.$confirm("确定要提交招标计划吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.subloading = true;
        this.$http.post("/LiandoPlan/SubmitBidPlan", { id: this.planId }).then(res => {
          if (res.data.success == false) {
            console.log(res.data.success);
            this.checkResult = res.data.message;
            this.subloading = false;
            // this.$router.push({
            //   name: "../../bidPlanDemo",
            // });
            // this.$msg.success(res.data.message)
            // this.loginShow = true
          } else {
            this.masterId = res.data.returnValue1;
            this.$http.post("/LiandoPlan/StartEngineeringFile", { planId: this.planId, masterId: this.masterId }).then(res => {});
            // this.$msg.success(res.data.message);
            this.subloading = false;
            if (res.data.message == "提交成功") {
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              }).then(() => {
                this.$router.push({
                  path: "/bid/bidPlanDemo",
                });
              });
            } else {
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
              this.subloading = false;
            }
            this.showmo = true;
            this.checkResult.length = 0;
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
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
::v-deep .el-main {
  overflow: hidden;
}
</style>
