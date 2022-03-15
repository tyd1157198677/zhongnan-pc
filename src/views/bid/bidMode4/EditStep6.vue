<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu-other />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>相关附件</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="fromborder mt-2">
          <el-row>
            <div class="float-right mb-2">
              <el-button type="primary" size="small" @click="onUploadPreview">上传新附件</el-button>
            </div>
            <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="files">
              <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
              <el-table-column label="附件名称" prop="fileName"> </el-table-column>
              <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-delete" title="删除" @click="onDelete(scope.row)"></i>
                  <i class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog v-if="dialogVisible" width="40%" title="上传附件【清单模板等】" :visible.sync="dialogVisible">
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
                    <div slot="tip" class="el-upload__tip">文件格式：.doc|.docx|.xls|.xlsx| 最大：50 兆</div>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
/**
 * 招标采购-相关附件
 */
import PlanMenuOther from "../components/PlanMenuOther";

export default {
  name: "Step2",
  components: { PlanMenuOther },
  inject: ["reload"],
  data() {
    return {
      activeName: "first",
      uploadData: {},
      dialogVisible: false,
      files: [],
      form: {},
      rules: {},
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
    if (this.baseId) {
      this.getBidModeAttachList(this.baseId);
    }
  },
  mounted() {},
  methods: {
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidModeAttachUpload";
    },
    onDonwLoad(file) {
      window.open(`${process.env.VUE_APP_API_URL}/${file.filePath}${file.fileReName}`, "_blank");
    },
    getBidModeAttachList(baseId) {
      this.$api.BidModeMaster.GetBidModeAttachList(this.baseId).then((res) => {
        this.files = res;
      });
    },
    onUploadPreview() {
      this.dialogVisible = true;
      this.files = [];
      this.uploadData = {};
    },
    beforeUpload(file) {
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData = {
        FileName: name.substring(0, index),
      };
      console.log("name", this.uploadData.FileName);
    },
    onDelete(file) {
      this.$api.BidModeMaster.DeleteBidAttachById(file.id).then((res) => {
        this.$message.success("删除成功");
        this.getBidModeAttachList(this.baseId);
      });
    },
    submitUpload() {
      Object.assign(this.uploadData, { BaseId: this.baseId });
      this.$refs.upload.submit();
    },
    submitUpload2() {
      this.$message("该功能待确认");
    },
    onUploadSuccess(response, file, fileList) {
      this.$message.success("保存成功");
      this.getBidModeAttachList(this.baseId);
      this.dialogVisible = false;
      //console.log("onUploadSuccess", response, file, fileList);
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

::v-deep .el-input {
  width: 300px;
}
</style>
