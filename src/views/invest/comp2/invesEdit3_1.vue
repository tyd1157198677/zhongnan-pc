<template>
    <div>
          考察报告
            <!--<i class="el-icon-circle-plus" @click="add2" style="float: right;margin-bottom: 5px;font-size: 28px;"></i>-->
            <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData2"
              v-loading="loading"
            >
              <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
              <el-table-column label="文件名称" prop="attachDesc"></el-table-column>
              <el-table-column label="上传人" prop="userName"></el-table-column>
              <el-table-column label="上传日期" prop="uploadDate"></el-table-column>
              <!--<el-table-column label="照片" align="center">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-image-->
                    <!--style="width: 50px; height: 50px"-->
                    <!--:src="'http://bidserver.hrdservice.com' + scope.row.filePath + scope.row.fileReName"-->
                    <!--:preview-src-list="srcList"-->
                  <!--&gt;-->
                  <!--</el-image>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <i @click="delete2(scope.row)" class="el-icon-download" title="下载" style="margin-left:5px" />
                </template>
              </el-table-column>
            </el-table>

      <el-dialog :visible.sync="flag2" title="上传文件" width="50%">
        <el-form ref="form3" :inline="true" label-width="100px" :model="form3" class="m-3">
          <el-row>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://bidserver.hrdservice.com/api/FileUpload/InvesImageUpload"
              :on-change="beforeUpload"
              :before-remove="beforeRemove"
              :file-list="fileList"
              :auto-upload="false"
              :headers="header"
              :http-request="save2"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-row>
          <el-row>
            <el-form-item label="文件名称：" prop="fileName">
              <el-input type="text" v-model="fileName"></el-input>
            </el-form-item>
            <el-button type="primary" size="small" @click="save2" style="float: right;" v-loading="loading">保存</el-button>
          </el-row>
        </el-form>
      </el-dialog>
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
          header: { Authorization: "Bearer " + this.$store.state.token },
        }
    },
    mounted() {
      this.getPic();
    },
    methods: {
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      beforeUpload(file) {
        this.file = file;
      },
      getPic() {
        var id = this.$route.query.id;
        this.$api.invest.GetInvesReportList({ masterId: id}).then(res => {
          this.tableData2 = res;
          for (var i = 0; i < res.length; i++) {
            this.srcList.push("http://bidserver.hrdservice.com" + res[i].filePath + res[i].fileReName);
          }
        });
      },
      add2() {
        this.flag2 = true;
      },
      save2(content) {
        this.loading = true;
        let f = new FormData();
        f.append("MasterId", this.$route.query.id);
        f.append("FileName", this.fileName);
        f.append("fileBix", this.file.raw);
        this.$api.invest.InvesReportUpload(f).then(res => {
          this.loading = false;
          if (res.success) {
            this.$refs.upload.clearFiles();
            this.$message.success(res.message);
            this.flag2 = false;
            this.getPic();
          } else {
            this.$message.error(res.message);
          }
        });
      },
      delete2(id) {
        window.open("http://bidserver.hrdservice.com"+id.filePath+id.fileReName)
        // this.$confirm("确认删除吗?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning",
        // })
        //   .then(() => {
        //     this.$api.invest.DeleteInvesReport({ id: id }).then(res => {
        //       if (res.success) {
        //         this.$message.success(res.message);
        //         this.getPic();
        //       } else {
        //         this.$message.error(res.message);
        //       }
        //     });
        //   })
        //   .catch(() => {
        //     this.$msg({ type: "info", message: "已取消" });
        //   });
      },
    }
}
</script>
</style>
