<!--  -->
<template>
  <div class="">
    <el-button type="primary" size="mini" @click="updaYin" v-if="isShow">上传考察报告</el-button>
    <el-dialog width="30%" title="上传文件" :visible.sync="dialogVisible">
      <el-form size="small">
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :data="uploadData"
            :before-upload="beforeUpload1"
            :on-change="handleChange"
            :fileList="fileList"
            :action="api"
            :on-success="onUploadSuccess"
            :multiple="false"
            :auto-upload="false"
            :headers="header"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload1">下载模板</el-button> -->
            <div slot="tip" class="el-upload__tip">
              只能上传pdf文件，最大10M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["obj"],
  data() {
    return {
      api: process.env.VUE_APP_API_URL + "/api/FileUpload/InvesResultPdfUpload",
      isShow: false,
      dialogVisible: false,
      uploadData: {},
      fileList: [],
      header: { Authorization: "Bearer " + this.$store.state.token }, // 请求头的规则，用你们后台给你的就是
    };
  },
  computed: {
    token() {
      return sessionStorage.getItem("BiddingStoreAsync").token;
    },
  },
  watch: {},
  created() {},
  mounted() {
    // console.log(this.$route.query.show);
    if (this.$route.query.show == 1) {
      this.isShow = true;
    } else {
      this.$nextTick(() => {
        this.isShow = false;
      });
    }
  },
  methods: {
    updaYin() {
      this.dialogVisible = true;
    },
    beforeUpload1(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = [".pdf"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件格式有误");
        return false;
      }
      const isLt = file.size / 1024 / 1024 < 10;
      if (!isLt) {
        this.$message.error(`上传文件大小不能超过10兆`);
        return false;
      }
    },
    handleChange(file, fileList) {
      //只能上传一个
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success) {
        // this.$message.success(response.message);
        this.$alert(response.message, {
          confirmButtonText: "确定",
        });
        this.fileList = [];
        this.$refs.upload.clearFiles();
        this.dialogVisible = false;
        // this.$emit("fatherMethod", response);
      } else {
        // this.$message.error(response.message);
        this.$alert(response.message, {
          confirmButtonText: "确定",
        });
      }
    },
    submitUpload() {
      Object.assign(this.uploadData, this.obj);
      this.$refs.upload.submit();

      //   this.dialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
