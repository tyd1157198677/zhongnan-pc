<template>
    <div>
        <el-form ref="form3" :inline="true"  :model="form3" class="m-3">
          <el-table
                empty-text="无符合条件的记录"
                stripe
                border
                element-loading-text="请稍候,数据正在加载中..."
                :data="files"
                v-loading="loading"
              >
                <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
                <el-table-column label="文件名称" prop="fileName" align="center"> </el-table-column>
                <el-table-column label="文件类型" prop="fileExtName" align="center"> </el-table-column>
                <el-table-column label="文件大小" prop="fileSize" align="center"> </el-table-column>
                <el-table-column label="上传日期" prop="uploadDate" align="center"> </el-table-column>
                <el-table-column label="上传人员" prop="userName" align="center"> </el-table-column>
                <el-table-column label="操作" width="90" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-delete" title="删除" @click="onDelete(scope.row.id)"></i>
                    <i class="el-icon-download ml-2" title="下载" @click="downLoad(scope.row.filePath+scope.row.fileReName)"></i>
                  </template>
                </el-table-column>
              </el-table>
          <el-row>
             <el-form-item label="文件名称:" style="width:100%;margin-top:10px">
               <el-input v-model="form3.fileName" placeholder="请填写文件名称" ></el-input>
             </el-form-item>
            <el-upload
              class="upload-demo"
              ref="upload"
              :data="uploadData"
              action="http://bidserver.hrdservice.com/api/FileUpload/InvesBdAttachUpload"
              :before-upload="beforeUpload1"
              :on-success="onUploadSuccess"
              :before-remove="beforeRemove"
              :fileList="fileList"
              :auto-upload="false"
              :multiple="true"
              :headers="header"
              v-loading="loading"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件</el-button>
              <i slot="tip" class="el-upload__tip">只能上传Word、Pdf、压缩包格式文件，最大100M。</i>
            </el-upload>

          </el-row>

        </el-form>
      <!-- <a slot="tip" class="m-3" style="cursor:pointer" :herf="this.address2" @click="goto" v-if="this.address2">下载背调结果附件</a> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
          flag2:false,
          flag3:false,
          files:[],
          loading: false,
           header: { Authorization: "Bearer " + this.$store.state.token }, // 请求头的规则，用你们后台给你的就是
          fileList: [],
          fileType: [".pdf", ".txt",'.doc','.docx','.zip','.rar'],
          file: {},
          uploadData: {},
          form3: {
            fileName:'背调附件',
          },
          address2:"",
        }
    },
    mounted() {
      this.getadd();
      this.GetInvesBdAttachList();
    },
    methods: {
      downLoad(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
    },
       beforeUpload1(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = this.fileType;
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件格式有误");
        return false;
      }
      const isLt = file.size / 1024 / 1024 < 100;
      if (!isLt) {
        this.$message.error("上传文件大小不能超过100兆");
        return false;
      }
    },
      getadd(){
        this.$api.invest.GetInvesBdAttach({ masterId: this.$route.query.id}).then(res => {
          if(res){
            this.address2 = "http://bidserver.hrdservice.com"+res;
          }
        });
      },
      GetInvesBdAttachList(){
        this.$http.get('/InvesAttach/GetInvesBdAttachList',{params:{ masterId: this.$route.query.id}}).then(res => {
          this.files=res.data
        });
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      beforeUpload(file) {
        // this.file = file;
      },
       onUploadSuccess(response, file, fileList) {
      if (response.success) {
        this.$message.success(response.message);
        this.fileList = [];
        this.$refs.upload.clearFiles();
        this.GetInvesBdAttachList()
      } else {
        this.$message.error(response.message);
      }
    },
    submitUpload() {
      let obj={
        masterId:this.$route.query.id,
        fileName:this.form3.fileName
      }
      Object.assign(this.uploadData, obj);
      this.$refs.upload.submit();
    },
      onDelete(id) {
        this.$confirm("确认删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$http.post('/InvesAttach/DeleteDbAttach',{ id}).then(res => {
              if (res.data.success) {
                this.$message.success(res.data.message);
                this.GetInvesBdAttachList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          })
          .catch(() => {
            this.$msg({ type: "info", message: "已取消" });
          });
      },
    }
}
</script>
</style>
