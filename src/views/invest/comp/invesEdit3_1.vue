<template>
  <div>
    考察报告
    <i v-if="isEdit == 1" class="el-icon-circle-plus" @click="add2" style="float: right;margin-bottom: 5px;font-size: 28px;"></i>
    <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData2" v-loading="loading">
      <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column label="文件名称" prop="investAttachCate"></el-table-column>
      <el-table-column label="上传人" prop="userName"></el-table-column>
      <el-table-column label="上传日期" prop="uploadDate"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <i @click="downLoad(scope.row)" class="el-icon-download" title="下载" style="margin-left:5px" />
          <i v-if="isEdit == 1" @click="delete2(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="flag2" title="上传文件" width="50%">
      <el-form ref="form3" :inline="true" label-width="100px" :model="form3" class="m-3">
        <el-row>
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="api + '/api/FileUpload/InvesImageUpload'"
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
            :headers="header"
            :http-request="save2"
            v-loading="loading"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-form-item label="文件名称：" prop="fileName">
              <el-input type="text" v-model="fileName"></el-input>
            </el-form-item>
            <div slot="tip" class="el-upload__tip">只能上传Word、Pdf格式文件，最大50M</div>
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
export default {
  data() {
    return {
      isEdit: 0, // 1:编辑，2：详情
      flag2: false,
      flag3: false,
      tableData2: [],
      tableData3: [],
      loading: false,
      flag: false,
      form: {},
      fileName: "",
      fileName2: "",
      srcList: [],
      srcList2: [],
      fileList: [],
      fileList2: [],
      file: {},
      file2: {},
      form3: {},
      form4: {},
      api: process.env.VUE_APP_API_URL,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  mounted() {
    this.isEdit = this.$route.query.type;
    this.getPic();
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file, fileList) {
      this.file = file;
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.fileName = name.substring(0, index);
    },
    getPic() {
      this.loading = true;
      var id = this.$route.query.id;
      this.$api.invest.GetInvesReportList({ masterId: id }).then(res => {
        this.loading = false;
        for (var i = 0; i < res.length; i++) {
          res[i].donwLoadUrl = this.api + res[i].filePath + res[i].fileReName;
        }
        this.tableData2 = res;
      });
    },
    add2() {
      this.flag2 = true;
      this.fileName = "";
      this.file = {};
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
    // 下载
    downLoad(row) {
      if (!row.fileReName) {
        this.$message({
          message: "提示，没有可下载的文件！",
          type: "warning",
        });
        return;
      }
      window.open(`${process.env.VUE_APP_API_URL}${row.filePath}${row.fileReName}`, "_blank");
    },
  },
};
</script>
