<template>
  <div>
    <el-form
      ref="form"
      :inline="true"
      label-width="130px"
      :model="form">
      <el-row>
        <el-col :span="12">
          考察照片
          <i v-if="isEdit == 1" class="el-icon-circle-plus" @click="add2" style="float: right;margin-bottom: 5px;font-size: 28px;"></i>
          <el-table
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData2"
            v-loading="loading"
          >
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <el-table-column label="图片名称" prop="attachDesc"></el-table-column>
            <el-table-column label="上传人" prop="userName"></el-table-column>
            <el-table-column label="上传日期" prop="uploadDate"></el-table-column>
            <el-table-column label="照片" align="center">
              <template slot-scope="scope">
                <el-image
                  style="width: 20px; height: 20px"
                  :src="api + scope.row.filePath + scope.row.fileReName"
                  :preview-src-list="srcList"
                >
                </el-image>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" v-if="isEdit == 1">
              <template slot-scope="scope">
                <i @click="delete2(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />
              </template>
            </el-table-column>
          </el-table>
        </el-col>


        <el-col :span="12">
          <report style="margin-left: 10px;"></report>
          <!--<i class="el-icon-circle-plus" @click="add3" style="float: right;margin-bottom: 5px;font-size: 28px;"></i>-->
          <!--<el-table-->
          <!--empty-text="暂无数据"-->
          <!--stripe-->
          <!--border-->
          <!--element-loading-text="请稍候,数据正在加载中..."-->
          <!--:data="tableData3"-->
          <!--v-loading="loading"-->
          <!--&gt;-->
          <!--<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>-->
          <!--<el-table-column label="图片名称" prop="attachDesc"></el-table-column>-->
          <!--<el-table-column label="上传人" prop="userName"></el-table-column>-->
          <!--<el-table-column label="上传日期" prop="uploadDate"></el-table-column>-->
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
          <!--<el-table-column label="操作" align="center">-->
          <!--<template slot-scope="scope">-->
          <!--<i @click="delete3(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--</el-table>-->
        </el-col>
      </el-row>
    </el-form>

    <el-dialog :visible.sync="flag2" title="上传图片" width="50%">
      <el-form ref="form3" :inline="true" label-width="100px" :model="form3" class="m-3" :rules="rule2">
        <el-row>
          <el-upload
            class="upload-demo"
            ref="upload"
            :action='api+"/api/FileUpload/InvesImageUpload"'
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
            :headers="header"
            :http-request="save2"
            v-loading="loading"
            multiple
          >
            <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
            <!-- <el-form-item label="图片名称：" prop="fileName">
              <el-input type="text" v-model="form3.fileName"></el-input>
            </el-form-item> -->
            <div slot="tip" class="el-upload__tip">只能上传图片格式文件，最大5M</div>
          </el-upload>
        </el-row>
        <el-row>
          <el-button type="primary" size="small" @click="save2" style="float: right;" v-loading="loading">保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import report from "./invesEdit3_1";
  export default {
    components: {
      report
    },
    data() {
      return {
        isEdit: 0, // 1:编辑，2：详情
        rule2: {
          fileName: { required: true, message: "请填写图片名称", trigger: "blur" },
        },
        flag2:false,
        flag3:false,
        tableData2:[],
        tableData3:[],
        loading: false,
        flag:false,
        form:{

        },
        fileName2:'',
        srcList:[],
        srcList2:[],
        fileList: [],
        fileList2: [],
        file: {},
        file2: {},
        form3: {
          // fileName:''
        },
        form4: {},
        api: process.env.VUE_APP_API_URL,
        header: { Authorization: "Bearer " + this.$store.state.token },
      }
    },
    mounted() {
      this.isEdit = this.$route.query.type;
      this.getPic();
      //this.getBaoGao();
    },
    methods: {
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      beforeUpload(file,fileList) {
        this.file = file;
        this.fileList = fileList;
      },
      getPic() {
        this.loading = true;
        var id = this.$route.query.id;
        this.$api.invest.GetInvesImageList({ masterId: id}).then(res => {
          this.loading = false;
          this.tableData2 = res;
          for (var i = 0; i < res.length; i++) {
            this.srcList.push("http://bidserver.hrdservice.com" + res[i].filePath + res[i].fileReName);
          }
        });
      },
      add2() {
        this.flag2 = true;
        // this.form3.fileName = "";
      },
      save2(content) {
        this.$refs.form3.validate(valid => {
          if (valid) {
            this.loading = true;
            let f = new FormData();
            f.append("MasterId", this.$route.query.id);
            // f.append("FileName", this.form3.fileName);
            // f.append("fileBix", this.file.raw);
            this.fileList.forEach(function (file) {
              f.append('files', file.raw, file.name);
            })

            this.$api.invest.InvesImageUpload(f).then(res => {
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
          }})

      },
      delete2(id) {
        this.$confirm("确认删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.invest.DeleteInvesImage({ id: id }).then(res => {
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
