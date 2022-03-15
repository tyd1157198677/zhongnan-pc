<!--  -->
<template>
  <div>
    <!--<div class="bottom" style="text-align:right;margin-bottom:10px">-->
      <!--<el-button type="danger" size="small" @click="upload3" v-if="showButton">上传</el-button>-->
    <!--</div>-->
    <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="uploadList" v-loading="loading">
      <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
      <el-table-column label="附件名称" min-width="160" align="center" prop="fileName"> </el-table-column>
      <el-table-column label="附件类型" align="center" prop="fileExtName"> </el-table-column>
      <el-table-column align="center" label="附件大小" prop="fileSize"> </el-table-column>
      <el-table-column align="center" label="上传日期" prop="creationTime">
        <template slot-scope="scope">
          <font>{{scope.row.creationTime.substring(0,10)}}</font>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <i class="el-icon-download" title="下载" @click="onDonwLoad(scope.row)"></i>
          <!--<i class="el-icon-delete ml-2" @click="deleteRow(scope.row)" v-if="scope.row.submitStatus!='已提交'"></i>-->
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="bottom" style="text-align:right;margin-top:10px">-->
      <!--<el-button type="danger" size="small" @click="save4" v-if="showButton"> 提交</el-button>-->
    <!--</div>-->



    <el-dialog width="40%" title="上传附件"  :visible.sync="dialogVisible">
      <el-form class="mt-0" size="small" label-width="120px">
        <el-form-item label="文件名称">
          <el-input  v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="api+'/api/FileUpload/BidWinAttachUpload1'"
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
            v-loading="loading"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包，最大200M</div>
          </el-upload>
          <el-button v-loading="loading" style="margin-left: 10px;float: right" size="small" type="success" @click="submitUpload">上传</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ["dataF3"],
    data() {
      return {
        form: {
        },
        activeName: "1",
        dialogVisible: false,
        table1: {},
        table2: {},
        table3: {},
        bidModeId:"",
        show1:false,
        show2:false,
        show3:false,
        saveTable1:[],
        saveTable2:[],
        saveTable3:[],
        uploadData: {
          FileName: "",
        },
        file:{},
        fileList:[],
        loading:false,
        api: process.env.VUE_APP_API_URL,
        showButton:true,
        uploadList:[]
      };
    },
    created() {
      this.bidModeId =this.$route.query.id;
      if(!this.dataF3.showButton3){
        this.showButton = false
      }else{
        this.$api.supIn.BidActionButton14({bidModeId:this.bidModeId}).then(res => {
          if(!res.success){
            this.showButton = false
          }
        });
      }
      this.getList2();
    },
    methods: {
      onDonwLoad(file) {
        //window.open(process.env.VUE_APP_API_URL+file.filePath+file.fileReName)
        window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + file.id);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      beforeUpload(file) {
        this.file = file;
      },
      submitUpload() {
        this.loading = true;
        let f = new FormData();
        f.append("BidModeId", this.bidModeId);
        f.append("FileName", this.uploadData.FileName);
        f.append("fileBix", this.file.raw);
        this.$api.supIn.BidWinAttachUpload3(f).then(res => {
          this.loading = false;
          if (res.success) {
            this.$refs.upload.clearFiles();
            this.$message.success(res.message);
            this.dialogVisible = false;
            this.getList2();
          } else {
            this.$message.error(res.message);
          }
        });
      },
      upload3(){
        this.dialogVisible = true;
      },
      getList2(){
        this.$api.supIn.GetBidWinAttachList03({bidModeId:this.bidModeId}).then(res => {
          this.uploadList = res;
        });
      },
      deleteRow(row) {
        this.$confirm("当前操作不可恢复，确认要执行当前操作吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$api.supIn.DeleteBidWinAttach({ id: row.id }).then(res => {
            if(res.success) {
              this.$msg.success(res.message)
              this.getList2();
            } else {
              this.$msg.error(res.message)
            }
          });
        });
      },
      save4() {
        this.$confirm("提交后不能修改，确定要提交吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$api.supIn.SubmitEndFile03({ id: this.bidModeId }).then(res => {
            if(res.success) {
              this.$msg.success(res.message)
              this.getList2()
            } else {
              //this.$msg.error(res.message)
              this.openM(res.message)
            }
          });
        });
      },
      openM(msg) {
        const h = this.$createElement;
        this.$msgbox({
          showConfirmButton:false,
          showCancelButton: true,
          cancelButtonText: '关闭',
          title: "消息",
          message: h("p", null, [h("span", null, msg), h("i", { style: "color: teal" }, "")]),
        }).then(action => {});
      },
      jumpDetail(id) {
        window.open(`#/supplier/detail/${id}`);
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
</style>
