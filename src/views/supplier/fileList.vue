<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix flex between middle">
        <el-page-header @back="back()" :content="navBarName"></el-page-header>
      </div>
      <div>
        <el-row>
          <div class="float-right mb-2" style="margin-top: 10px">
            <el-button type="primary" size="small" @click="onUploadPreview">上传新附件</el-button>
          </div>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData">
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="文件类型" prop="fileExtName"> </el-table-column>
            <el-table-column label="文件大小" prop="showFileSize"> </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <span
                  class="el-icon-download"
                  @click="downLoad(scope.row.filePath + scope.row.fileReName)"
                  style="margin-right: 10px"
                ></span>
                <i class="el-icon-delete" title="删除" @click="onDelete(scope.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog v-if="dialogVisible" width="40%" title="上传附件" :visible.sync="dialogVisible">
            <el-form class="m-2 p-3">
              <el-form-item label="文件名称">
                <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
              </el-form-item>
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
                  <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传</el-button>
                  <div slot="tip" class="el-upload__tip">文件格式：.png|.jpg|.pdf| 最大：10 兆</div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-row>
      </div>
    </el-card>
  </el-main>
</template>

<script>
/**
 * 招标采购-相关附件
 */
// import PlanMenuOther from "../components/PlanMenuOther";

export default {
  //   name: "Step2",
  //   components: { PlanMenuOther },
  //   inject: ["reload"],
  data() {
    return {
      uploadData: {},
      dialogVisible: false,
      tableData: [
        {
          id: "",
          fileName: "",
        },
      ],
      file: "",
      form: {},
      rules: {},
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  computed: {
    navBarName() {
      const barName = "附件内容";
      return barName;
    },
    id() {
      return this.$route.query.id;
    },
  },
  created() {
    // this.$emit("header", true);
    // this.$emit("footer", true);
    // if (this.noticeId) {
    //   this.GetNoticeAttachList(this.noticeId);
    // }
  },
  mounted() {
    this.GetNoticeAttachList();
  },
  methods: {
    downLoad(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/SupBackAttachUpload";
    },
    GetNoticeAttachList() {
      let obj = {
        id: this.id,
      };
      let res = this.$http.get("/SupBackList/GetBackListAttach", { params: obj }).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          this.tableData = res.data;
        }
      });
    },
    onUploadPreview() {
      this.dialogVisible = true;
      //   this.tableData = [];
      this.uploadData = {};
    },
    beforeUpload(file) {
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData = {
        FileName: name.substring(0, index),
      };
      //   console.log("name", this.uploadData.FileName);
    },
    onDelete(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupBackList/DeleteAttach", { id: id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.GetNoticeAttachList(this.id);
        });
      });
    },
    submitUpload() {
      Object.assign(this.uploadData, { BackId: this.id });
      this.$refs.upload.submit();
    },
    onUploadSuccess(response, file, fileList) {
      this.$message.success("保存成功");
      this.GetNoticeAttachList(this.id);
      this.dialogVisible = false;
    },
    back(id) {
      this.$router.push({
        path: "/supplier/backlistadd?id=",
        query: { id: this.id },
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 2% 0 120px;
  height: 100%;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: #ffffff;
  position: relative;
  /* width: 88%; */
  border-radius: 10px 10px 0 0;
  overflow: auto;
}

.buttoncss {
  float: right;
  margin-top: 12px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}

.el-input {
  width: 300px;
}
</style>
