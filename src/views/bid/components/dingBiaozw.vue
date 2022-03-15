<template>
  <div class="">
    <div class="pub">基本信息</div>
    <el-row>
      <div style="float:right;height:50px">
        <el-button type="primary" class="buttoncss" size="small" v-if="showedit" @click="onSubmit('form1')">保存</el-button>
      </div>
    </el-row>
    <el-form :model="form1" :rules="rules" ref="form1" size="small">
      <div>
        <el-row :gutter="10" style="margin-right: 0px;margin-left:0px">
          <el-col :span="7">
            <el-form-item label="中标单位" prop="supplierName">
              <el-select style="width:100%" v-model="form1.supplierName" disabled placeholder="请选择">
                <el-option :value="true" label="有"></el-option>
                <el-option :value="false" label="无"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="中标金额（元）" prop="finalWinPrice" v-if="showedit">
              <el-input style="width:100%" v-model="form1.finalWinPrice" placeholder="请输入"> </el-input>
            </el-form-item>
            <el-form-item label="中标金额（元）" prop="finalWinPrice" v-else>
              <el-input style="width:100%" v-model="form1.finalWinPrice" disabled placeholder="请输入"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="相关说明" prop="winDesc" v-if="showedit">
              <el-input style="width:100%" type="textarea" v-model="form1.winDesc"></el-input>
            </el-form-item>
            <el-form-item label="相关说明" prop="winDesc" v-else>
              <el-input style="width:100%" type="textarea" disabled v-model="form1.winDesc"></el-input>
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
            <el-button
              v-if="showedit"
              style="margin-bottom:10px;float:right"
              :loading="loadingfile"
              type="primary"
              size="small"
              @click="onUploadPreview"
              >上传附件</el-button
            >
          </div>
        </div>
        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="fileslist">
          <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
          <el-table-column label="附件名称" prop="fileName"> </el-table-column>
          <!-- <el-table-column label="文件类型" prop="tempType" align="center" width="120"> </el-table-column> -->
          <el-table-column label="附件大小" prop="fileSize" align="center" width="120"> </el-table-column>
          <el-table-column label="附件类型" prop="fileExtName" align="center" width="120"> </el-table-column>
          <el-table-column label="上传日期" prop="creationTime" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <i class="el-icon-delete" v-if="showedit" title="删除" @click="deleteRow(scope.row)"></i>
              <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <div class="pub">提交信息</div>
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
    </div>
    <div style="margin-top:10px;margin-bottom:50px">
      <div class="float-right" style="margin-bottom:50px">
        <el-button type="primary" v-loading="subloading" v-if="showedit" @click="onSubmitto" size="small">提交</el-button>
      </div>
    </div>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible" style="z-index:999999">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
        <el-form-item label="文件分类">
          <el-select v-model="optionValue" placeholder="请选择文件分类" @change="upLoadeChange">
            <el-option v-for="i in FileNamess" :key="i.fileName" :value="i.fileName">
              {{ i.fileName }}{{ i.fileExt ? "(必传)" : "(非必传)" }}
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="文件名称" required>
          <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
        </el-form-item> -->
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="false"
            :action="api + '/api/FileUpload/BidWinAttachUpload1'"
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">允许文件类型：{{ getOneFileTemp.fileExt }} 最大：200 兆</div>
          </el-upload>
          <el-button v-loading="loading" style="margin-left: 10px;float: right" size="small" type="success" @click="submitUpload"
            >上传</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/util";
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
        finalWinPrice: [{ required: true, message: "中标金额不能为空", trigger: "change" }],
        supplierName: [{ required: true, message: "中标单位不能为空", trigger: "blur" }],
      },
      api: process.env.VUE_APP_API_URL,
      selectSupVisible: false,
      dialogVisible: false,
      subloading: false,
      checkResult: "",
      form: {},
      showedit: false,
      form1: {},
      tabs: [],
      fileList: [],
      fileslist: [],
      zuzhangdata: [],
      activeNames: [],
      loading: false,
      uploadData: {
        FileName: "",
        fileName: "",
      },
      optionValue: "",
      getOneFileTemp: {},
      optionObj: {},
      showlabel: "",
      itemvalue: "",
      FileNamess: [],
      file: {},
      UploadfileList: [],
      loadingfile: false,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  created() {
    this.bidModeId = this.$route.query.id;
  },
  mounted() {
    this.CheckPurchaseWinZwEdit2001();
    this.GetPurchaseWinZw2021();
    this.getList2();
  },
  methods: {
    parseTime,
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
    CheckPurchaseWinZwEdit2001() {
      this.$http.get("/PurchaseModeZw/CheckPurchaseWinZwEdit2001", { params: { bidModeId: this.bidModeId } }).then(res => {
        if (res.data.success) {
          this.showedit = true;
        } else {
          this.showedit = false;
        }
      });
    },
    GetWinFileTempList() {
      this.$http.get("/BidFileConfig/GetWinFileTempList", { params: { bidModeId: this.bidModeId } }).then(res => {
        this.FileNamess = res.data;
        this.uploadData.fileName = res.data.length > 0 ? res.data[0].fileName : "";
        // if (res.data.length > 0) {
        //   this.uploadData.fileName = res.data[0].fileName + res.data[0].isMust ? "（必传）" : "（非必传）";
        // }
      });
    },
    upLoadeChange(val) {
      console.log(val);
      let str = this.FileNamess.find(item => item.fileName == val);
      this.optionObj = str;
      console.log(str);
      this.getOneFileTemp = str;
    },
    beforeUpload(file) {
      this.file = file;
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = this.getOneFileTemp.fileExt.split("|");
      console.log(file);
      console.log(fileSuffix);
      console.log(whiteList);
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件格式有误");

        return false;
      }
      // const isLt = file.size / 1024 / 1024 < this.getOneFileTemp.maxFileSize;
      // if (!isLt) {
      //   this.$message.error("上传文件大小不能超过" + this.getOneFileTemp.maxFileSize + "兆");
      //   return false;
      // }
    },
    submitUpload() {
      this.loading = true;
      let f = new FormData();
      f.append("BidModeId", this.bidModeId);
      f.append("FileName", this.optionValue);
      f.append("TempType", this.optionValue);
      f.append("fileBix", this.file.raw);
      console.log(this.file.raw);
      this.$api.supIn.BidWinAttachUpload1(f).then(res => {
        this.loading = false;
        if (res.success) {
          this.$refs.upload.clearFiles();
          this.$message.success(res.message);
          this.dialogVisible = false;
          this.getList2();
          this.CheckPurchaseWinZwEdit2001();
        } else {
          this.loading = false;
          this.$message.error(res.message);
        }
      });
    },
    GetPurchaseWinZw2021() {
      this.$http.get("/PurchaseModeZw/GetPurchaseWinZw2021", { params: { bidModeId: this.bidModeId } }).then(res => {
        this.form1 = res.data;
      });
    },
    deleteRow(row) {
      this.$confirm("当前操作不可恢复，确认要执行当前操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.DeleteBidWinAttach({ id: row.id }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.getList2();
          } else {
            this.$msg.error(res.message);
          }
        });
      });
    },
    // submitUpload() {
    //   if (!this.uploadData.FileName) {
    //     this.$message.error("请填写文件名称");
    //     return;
    //   }
    //   this.loading = true;
    //   let f = new FormData();
    //   f.append("BidModeId", this.bidModeId);
    //   f.append("FileName", this.uploadData.FileName);
    //   f.append("fileBix", this.file.raw);
    //   this.$api.supIn.BidWinAttachUpload1(f).then(res => {
    //     this.loading = false;
    //     if (res.success) {
    //       this.$refs.upload.clearFiles();
    //       this.$message.success(res.message);
    //       this.dialogVisible = false;
    //       this.getList2();
    //     } else {
    //       this.loading = false;
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
    getList2() {
      this.$api.supIn.GetBidWinAttachList01({ bidModeId: this.bidModeId }).then(res => {
        this.fileslist = res;
        console.log(this.fileslist);
      });
    },
    onUploadPreview() {
      this.dialogVisible = true;
      this.uploadData.FileName = "";
      this.fileList = [];
      this.GetWinFileTempList();
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
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidWinAttachUpload1";
    },
    onDownload(id) {
      // window.open(process.env.VUE_APP_API_URL+file.filePath+file.fileReName)
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + id);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success) {
        this.$message.success(response.message);
        this.dialogVisible = false;
        this.loading = false;
        this.BidActionButton14();
        this.getList2();
      } else {
        this.$message.error(response.message);
      }
    },
    // beforeUpload(file) {
    //   this.file = file;
    //   let name = file.name;
    //   let index = name.lastIndexOf("\.");
    //   this.uploadData = {
    //     FileName: name.substring(0, index),
    //   };
    //   console.log(this.uploadData.FileName);
    // },
    onSubmit() {
      this.$refs.form1.validate(valid => {
        if (valid) {
          this.$http.post("/PurchaseModeZw/SavePurchaseWin2021", this.form1).then(res => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.GetPurchaseWinZw2021();
              this.CheckPurchaseWinZwEdit2001();
            } else {
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              });
            }
          });
        } else {
          this.$msg.warning("请填写完必填项!");
        }
      });
    },
    onSubmitto() {
      this.$confirm("确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.subloading = true;
        this.$http.post("/PurchaseModeZw/SubmitPurchaseZwWin2021", { id: this.bidModeId }).then(res => {
          if (res.data.success == false) {
            this.$confirm(res.data.message, "提示", {
              confirmButtonText: "确定",
              type: "warning",
            });
            this.subloading = false;
          } else {
            this.$msg.success(res.data.message);
            this.CheckPurchaseWinZwEdit2001();
            this.subloading = false;
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
::v-deep .el-row {
  margin-right: 0px;
  margin-left: 0px;
}
</style>
<style scoped>
::v-deep .el-main {
  overflow: hidden;
}
</style>
