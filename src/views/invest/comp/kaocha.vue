<template>
  <div>
    <div class="btns" v-if="isEdit == 1">
      <el-button type="primary" size="mini" @click="downLoadmoudle">下载模板</el-button>
      <el-button type="primary" size="mini" @click="add2">新增</el-button>
    </div>
    <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData2" v-loading="loading">
      <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
      <el-table-column label="文件名称" prop="investAttachCate" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.attachDesc + "-" + scope.row.investAttachCate }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="上传人" prop="userName" align="center"> </el-table-column>
      <el-table-column label="上传日期" prop="uploadDate" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="100">
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
            :action="api + '/api/FileUpload/InvesEvaluationUpload'"
            :on-change="handleChange"
            :before-upload="beforeUpload1"
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
            <div slot="tip" class="el-upload__tip">只能上传exsl格式文件，最大50M</div>
          </el-upload>
        </el-row>
        <el-row style="text-align:right">
          <el-button type="primary" size="small" @click="save2" v-loading="loading" :disabled="disableBtn">保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["moudleType"],
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
      disableBtn: true,
      api: process.env.VUE_APP_API_URL,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  mounted() {
    this.isEdit = this.$route.query.type;
    this.getPic();
  },
  methods: {
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
      this.file = file;
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.fileName = name.substring(0, index);
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = [".xls", ".xlsx"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件格式有误");
        this.disableBtn = true;
      } else {
        this.disableBtn = false;
      }
    },
    beforeUpload1(file) {
      // const isLt = file.size / 1024 / 1024 < this.maxValue;
      // if (!isLt) {
      //   this.$message.error(`上传文件大小不能超过${this.maxValue}兆`);
      //   return false;
      // }
    },
    getPic() {
      this.loading = true;
      var id = this.$route.query.id;
      this.$http.get("/InvesAttach/GetInvesEvaluationList?masterId=" + id).then(res => {
        this.loading = false;
        if (res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].donwLoadUrl = this.api + res.data[i].filePath + res.data[i].fileReName;
          }
        }

        this.tableData2 = res.data;
      });
    },
    add2() {
      this.flag2 = true;
      this.fileList = [];
      this.fileName = "";
      this.file = {};
    },
    async save2(content) {
      this.loading = true;
      let f = new FormData();
      f.append("MasterId", this.$route.query.id);
      f.append("FileName", this.fileName);
      f.append("fileBix", this.file.raw);
      let res = await this.$axios.post("/api/FileUpload/InvesEvaluationUpload", f);
      this.loading = false;
      if (res.data.success) {
        this.$refs.upload.clearFiles();
        this.$message.success(res.data.message);
        this.flag2 = false;
        this.getPic();
      } else {
        this.$message.error(res.data.message);
      }
    },
    delete2(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("/InvesAttach/DeleteInvesEvaluation", { id }).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.getPic();
            } else {
              this.$message.error(res.data.message);
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
    downLoadmoudle() {
      window.location.href = process.env.VUE_APP_API_URL + "/UploadFile/EvaluationTemplate/项目招标考评表（" + this.moudleType + "）.xlsx";
    },
  },
};
</script>
<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
