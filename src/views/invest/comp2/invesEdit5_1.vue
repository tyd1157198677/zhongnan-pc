<template>
    <div>
        <el-form ref="form3" :inline="true" label-width="100px" :model="form3" class="m-3">
          <!--<el-row>-->
            <!--<el-upload-->
              <!--class="upload-demo"-->
              <!--ref="upload"-->
              <!--action="http://bidserver.hrdservice.com/api/FileUpload/InvesBdAttachUpload"-->
              <!--:on-change="beforeUpload"-->
              <!--:before-remove="beforeRemove"-->
              <!--:file-list="fileList"-->
              <!--:auto-upload="false"-->
              <!--:http-request="save2"-->
            <!--&gt;-->
              <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
              <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="save2">上传到服务器</el-button>-->
              <!--<i slot="tip" class="el-upload__tip">只能上传Word、Pdf、压缩包格式文件，最大100M。上传时自动删除原有文件</i>-->
            <!--</el-upload>-->

          <!--</el-row>-->

        </el-form>
      <a slot="tip" class="m-3" style="cursor:pointer" :herf="this.address2" @click="goto" v-if="this.address2">下载背调结果附件</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
          flag2:false,
          flag3:false,
          tableData2:[],
          tableData3:[],
          loading: false,
          flag:false,
          form:{

          },
          fileName:'',
          fileName2:'',
          srcList:[],
          srcList2:[],
          fileList: [],
          fileList2: [],
          file: {},
          file2: {},
          form3: {},
          form4: {},
          address2:"",
        }
    },
    mounted() {
      this.getadd();
    },
    methods: {
      goto(){
        window.open(this.address2)
      },
      getadd(){
        this.$api.invest.GetInvesBdAttach({ masterId: this.$route.query.id}).then(res => {
          if(res){
            this.address2 = "http://bidserver.hrdservice.com"+res;
          }
        });
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      beforeUpload(file) {
        this.file = file;
      },
      save2(content) {
        this.loading = true;
        let f = new FormData();
        f.append("Id", this.$route.query.id);
        f.append("fileBix", this.file.raw);
        this.$api.invest.InvesBdAttachUpload(f).then(res => {
          this.loading = false;
          if (res.success) {
            this.getadd();
            this.$refs.upload.clearFiles();
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        });
      },
      delete2(id) {
        this.$confirm("确认删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.invest.DeleteInvesReport({ id: id }).then(res => {
              if (res.success) {
                this.$message.success(res.message);
                this.getPic();
              } else {
                this.$message.error(res.message);
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
