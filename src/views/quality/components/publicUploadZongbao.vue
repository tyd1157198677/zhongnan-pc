<!--  -->
<template>
  <div class="">
    <!-- <el-dialog width="40%" title="上传文件" :visible.sync="dialogVisible"> -->
    <el-form class="mt-0" size="small" style="padding:20px">
      <slot name="formHead"></slot>
      <el-form-item label="选择文件">
        <el-upload
          class="upload-demo"
          ref="upload"
          :data="uploadData"
          :before-upload="beforeUpload1"
          :on-change="handleChange"
          :fileList="fileList"
          :action="api + url"
          :on-success="onUploadSuccess"
          :multiple="false"
          :auto-upload="false"
          :headers="header"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button> -->
          <!-- <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload1">下载模板</el-button> -->
          <div slot="tip" class="el-upload__tip">
            {{ condition }}
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- </el-dialog> -->
  </div>
</template>

<script>

export default {
  components: {},
  props: ["fileType", "url", "condition", "obj", "maxValue", "type", "msg", "more"],
  data() {
    return {
      api: process.env.VUE_APP_API_URL,
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
  watch: {
    obj:{
      handler(val, oldVal){

        if(val.resumeFileId ==oldVal.resumeFileId ){
          return
        }
        if(val.resumeFileId && val.resumeFileUrl){
          this.$set(this.fileList, 0, {
            name: val.resumeFileId, 
            url: val.resumeFileUrl
          })
        }else{
          this.fileList = []
        }
      },
      deep:true //true 深度监听
    }
  },
  created() {},
  mounted() {
    if(this.obj.resumeFileId && this.obj.resumeFileUrl){
      console.log(this.obj);
      this.fileList = [{
        name: this.obj.resumeFileId, 
        url: this.obj.resumeFileUrl
      }] 
    }
  },
  methods: {
    beforeUpload1(file) {
      console.log('beforeUpload1',file);
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = this.fileType;
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件格式有误");
        return false;
      }
      const isLt = file.size / 1024 / 1024 < this.maxValue;
      if (!isLt) {
        this.$message.error(`上传文件大小不能超过${this.maxValue}兆`);
        return false;
      }
    },
    handleChange(file, fileList) {
      
      delete this.obj.resumeFileUrl
      delete this.obj.resumeFileId

      this.fileList = [file]
      console.log('fileList', fileList);
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success) {
        this.$message.success(response.message);
        this.fileList = [];
        this.$refs.upload.clearFiles();
        this.$emit("fatherMethod", response);
      } else {
        this.$message.error(response.message);
      }
    },
    submitUpload() {
      if(this.fileList.length<1){
        this.$message.error('请先选择上传的文件');
        return
      }
      if(this.obj.resumeFileUrl){
        this.$api.quality.InsterManagerMes(this.obj).then(response => {
          console.log(response);
          if (response.success) {
            this.$message.success(response.message);
            this.fileList = [];
            this.$refs.upload.clearFiles();
            this.$emit("fatherMethod", response);
          } else {
            this.$message.error(response.message);
          }
        });
      }else{
        Object.assign(this.uploadData, this.obj);
        this.$refs.upload.submit();
      }

      // if (this.type == 0) {
      //   this.$msg.warning(this.msg);
      // } else {
      //   Object.assign(this.uploadData, this.obj);
      //   this.$refs.upload.submit();
      // }

      //   this.dialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
