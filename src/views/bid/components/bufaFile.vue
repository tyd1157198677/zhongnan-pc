<!--  -->
<template>
  <div class="">
    <!-- <el-button type="danger" size="mini" @click="submit" v-if="tableList.showSubmitButton">提交审批</el-button> -->
    <div style="float:left;color:red;margin-top:10px">提交文件后投标方才能查看</div>
    <el-button type="danger" v-if="showbut" size="mini" @click="tijiao" style="float:right;margin:10px 0">提交文件</el-button>
    <el-button
      type="danger"
      size="mini"
      v-if="isBidUser"
      @click="shangchuan"
      style="float:right;margin-top:10px;margin-bottom:10px;margin-right:10px"
      >上传文件</el-button
    >

    <el-table stripe border :data="tableList">
      <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
      <el-table-column prop="fileName" label="文件名称" align="center"> </el-table-column>
      <el-table-column prop="fileCateName" label="文件分类" align="center"> </el-table-column>
      <el-table-column prop="showFileSize" label="文件大小" align="center" width="150"> </el-table-column>
      <el-table-column prop="fileExtName" label="文件格式" align="center" width="150"> </el-table-column>
      <el-table-column prop="submitStatus" label="状态" align="center" width="150"> </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
          <span class="el-icon-download" title="下载" @click="downLoad(scope.row.id)" style="margin-right:10px"></span>
          <i class="el-icon-delete" v-if="scope.row.submitStatus === '草稿'" title="删除" @click="onDelete(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="40%" title="上传文件" :visible.sync="dialogVisible">
      <el-form class="mt-0" size="small" style="padding: 20px" element-loading-text="上传中请稍等···" v-loading="loading">
        <el-form-item label="文件名称">
          <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-select v-model="value" placeholder="请选择文件类型">
            <el-option label="设计类" value="设计类"></el-option>
            <el-option label="工程类" value="工程类"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="false"
            :data="uploadData"
            :action="getUploadUrl()"
            :on-change="beforeUpload"
            :on-success="onUploadSuccess"
            :auto-upload="false"
            :headers="header"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
            <div slot="tip" class="el-upload__tip">
              允许文件类型：.doc|.docx|.xls|.xlsx|.ppt|.pptx|.rar|.zip|.png|.jpg|.pdf, 最大：500 兆
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
    publicUpload: () => import("@/components/publicUpload.vue"),
  },
  props: ["id"],
  data() {
    return {
      showbut: false,
      isBidUser: false,
      radio: true,
      loading: false,
      dialogVisible: false,
      otherValue: "",
      tableList: [],
      FileName: "",
      uploadData: {},
      fileList: [],
      fileType: [".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".rar", ".zip", ".png", ".jpg", ".pdf"],
      condition: "允许文件类型：.doc|.docx|.ppt|.pptx|.xls|.xlsx|.rar|.zip|.png|.jpg|.pdf 格式 最大：500 兆",
      obj: {},
      header: { Authorization: "Bearer " + this.$store.state.token },
      value: "",
      // getUploadUrl1: "/api/FileUpload/BidProcessAttach3",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetBidMasterPageShow();
    this.GetBidAddFileList();
    this.CheckCanAddBidFile40();
  },
  methods: {
    tomethgobufaFile() {
      this.GetBidMasterPageShow();
      this.GetBidAddFileList();
      this.CheckCanAddBidFile40();
    },
    GetBidAddFileList() {
      // this.otherValue = "";
      // this.uploadData = {};
      let obj = {
        baseId: this.id,
      };
      // this.loading = true;
      this.$http.get("/BidAttach/GetBidAddFileList", { params: obj }).then(res => {
        this.tableList = res.data;
        // this.loading = false;
        this.dialogVisible = false;
      });
    },
    tijiao() {
      this.$confirm("提交后将不能删除，并且展示给投标方，确认要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/BidAttach/SubmitAddFile", { id: this.id }).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.GetBidAddFileList();
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
            // this.GetBidAddFileList();
          }
        });
      });
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidProcessAttach3";
    },
    shangchuan() {
      this.dialogVisible = true;

      this.loading = false;
      this.uploadData.FileName = "";
      this.uploadData = {};
      this.$refs.upload.clearFiles();
    },
    GetBidMasterPageShow() {
      this.$http.get("/BidMaster/GetBidMasterPageShow", { params: { bidModeId: this.id } }).then(res => {
        this.isBidUser = res.data.isBidUser;
      });
    },
    CheckCanAddBidFile40() {
      this.$http.get("/BidCheckCenter/CheckCanAddBidFile40", { params: { bidModeId: this.id } }).then(res => {
        if (res.data.success) {
          this.showbut = true;
        } else {
          this.showbut = false;
        }
      });
    },
    // handleChange() {
    //   this.obj = {
    //     BaseId: this.id,
    //     FileName: this.otherValue,
    //     ShowToSupplier: true,
    //   };
    // },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    downLoad(id) {
      // window.location.href = process.env.VUE_APP_API_URL + url;
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad004?fileId=" + id);
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
      if (response.success) {
        this.$message.success(response.message);
        this.dialogVisible = false;
        this.loading = false;
        this.GetBidAddFileList();
      } else {
        this.loading = false;
        this.$message.error(response.message);
      }
    },
    // submitUpload1() {
    //   Object.assign(this.uploadData, { BaseId: this.id, FileName: this.uploadData.FileName, ShowToSupplier: true });
    //   this.$refs.upload.submit();
    //   this.loading = true;
    // },
    submitUpload() {
      Object.assign(this.uploadData, { BaseId: this.id, ShowToSupplier: true, FileCateName: "其他" });
      this.$refs.upload.submit();
      this.loading = true;
    },
    onDelete(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/BidAttach/DeleteBidEditFileAttachById", { id: opt.id }).then(res => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.GetBidAddFileList();
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
