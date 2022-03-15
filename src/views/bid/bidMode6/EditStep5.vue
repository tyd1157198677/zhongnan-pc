<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <showplan-menu />
      </el-col>
    </el-row>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采计划</el-breadcrumb-item>
          <el-breadcrumb-item v-if="showmessage"
            >相关附件<span style="color: red">({{ message }})</span></el-breadcrumb-item
          >
          <el-breadcrumb-item v-else>相关附件</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-alert :title="msg" type="warning" v-if="!isCanEdit" :closable="false"> </el-alert> -->

        <div>
          <!-- <div> -->

          <el-row>
            <div class="sts" style="float: right">
              <!-- <div style="color:red">必须上传施工方案模板</div> -->
              <!--  v-if="showsubmit" -->
              <div v-if="showsubmit">
                <!-- <el-upload
                      style="display:inline-block"
                      action="#"
                      multipl
                      :show-file-list="false"
                      :headers="header"
                      :http-request="headeuploadFile"
                      :file-list="UploadfileList"
                    >
                      <el-button size="small" :loading="loadingfile" type="primary" title="请上传.rar|.zip格式文件   文件最大100M"
                        >上传施工方案模板</el-button
                      >
                    </el-upload> -->
                <el-button style="margin-left: 10px" :loading="loadingfile" type="primary" size="small" @click="onUploadPreview"
                  >上传附件</el-button
                >
              </div>
            </div>
            <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="files">
              <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
              <el-table-column label="附件名称" prop="fileName"> </el-table-column>
              <el-table-column label="附件大小" prop="showFileSize" align="center" width="120"> </el-table-column>
              <el-table-column label="附件类型" prop="fileExtName" align="center" width="120"> </el-table-column>
              <!-- <el-table-column label="上传人" prop="bidProcessName"> </el-table-column> -->
              <el-table-column label="上传日期" prop="uploadDate" align="center" width="150">
                <!-- <template slot-scope="scope">
                  <span>
                  {{scope.row.creationTime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}
                  </span>
                  </template>  -->
              </el-table-column>
              <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-delete" v-if="showsubmit" title="删除" @click="onDelete(scope.row)"></i>
                  <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loadingfile">
        <el-form-item label="文件名称">
          <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <!-- <el-form-item>
                <el-radio v-model="radio" :label="true">展示给供应商</el-radio>
                <el-radio v-model="radio" :label="false">不展示给供应商</el-radio>
              </el-form-item> -->
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="true"
            :data="uploadData"
            :filelist="fileList"
            :action="getUploadUrl()"
            :on-change="beforeUpload"
            :on-success="onUploadSuccess"
            :auto-upload="false"
            :headers="header"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传</el-button>
            <div slot="tip" class="el-upload__tip">文件格式：.doc|.docx|.xls|.xlsx|.ppt|.pptx|.pdf|.rar|.zip | 最大：50 兆</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
/**
 * 招标采购-邀请供方
 */
import PlanMenu from "../components/PlanMenuDemo.vue";
import SupplierList from "@/components/SupplierList";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step5",
  components: {
    PlanMenu,
    SupplierList,
    showplanMenu,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  inject: ["reload"],
  data() {
    return {
      header: { Authorization: "Bearer " + this.$store.state.token },
      msg: "",
      showsubmit: false,
      isCanEdit: false,
      radio: true,
      loadingfile: false,
      showmessage: false,
      fileList: [],
      files: [
        {
          id: "",
          planId: "",
          fileName: "",
        },
      ],
      FileName: "",
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      tableData: "",
      loading: false,
      uploadData: {
        id: "",
        planId: "",
        FileName: "",
      },
      UploadfileList: [],
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rules: {},
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  computed: {
    planId() {
      return this.$route.params.baseId;
    },
    // planId() {
    //   return this.$route.params.id;
    // },
    // baseId() {
    //   return this.$route.params.baseId;
    // },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
  },
  mounted() {
    this.CheckCanEditPlan01();
    this.getList();
  },
  methods: {
    headeuploadFile(item) {
      let that = this;
      const fileObj = item.file;
      const from = new FormData(); // FormData 对象
      from.append("file", fileObj);
      from.append("planId", this.planId);
      this.loadingfile = true;
      this.$axios
        .post("/api/FileUpload/BidProcessAttach4", from)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            that.$message.success(res.data.message);
            this.loadingfile = false;
            this.getList();
          } else {
            // that.$msg.error(res.data.message);
            this.loadingfile = false;
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          // console.log(err);
          this.$alert(err.data.message, {
            confirmButtonText: "确定",
          });
        });
    },
    CheckCanEditPlan01() {
      this.$http.get("/LiandoPlan/CheckCanEditPlan01?planId=" + this.planId).then((res) => {
        this.isCanEdit = res.data.success;
        this.msg = res.data.message;
        if (res.data.success) {
          this.showsubmit = true;
          this.showmessage = false;
        } else {
          this.showsubmit = false;
          if (res.data.message != "" || res.data.message != null) {
            this.showmessage = true;
            this.message = res.data.message;
          } else {
            this.showmessage = false;
          }
        }
      });
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidModeAttachUpload";
    },
    onDownload(id) {
      // window.open(`${process.env.VUE_APP_API_URL}/${file.filePath}${file.fileReName}`, "_blank");
      // console.log("down file,", file);
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad006?fileId=" + id);
    },
    beforeUpload(file) {
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData = {
        FileName: name.substring(0, index),
      };
      console.log(this.uploadData.FileName);
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success == true) {
        this.$message.success(response.message);
        this.getList(this.planId);
        this.dialogVisible = false;
        this.loadingfile = false;
      }
      if (response.success == false) {
        this.loadingfile = false;
        this.$alert(response.message, {
          confirmButtonText: "确定",
        });
      }
    },
    getList() {
      this.$http.get("/LiandoPlan/GetPlanAttachList05", { params: { planId: this.planId } }).then((res) => {
        this.files = res.data;
      });
    },
    submitUpload() {
      Object.assign(this.uploadData, { planId: this.planId, FileName: this.uploadData.FileName });
      console.log(this.planId);
      this.loadingfile = true;
      this.$refs.upload.submit();
    },

    onUploadPreview() {
      this.dialogVisible = true;
      this.uploadData.FileName = "";
      this.fileList = [];
      this.$refs.upload.clearFiles();
    },
    onDelete(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/BidAttach/DeleteBidAttachById", { id: opt.id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.getList(this.baseId);
        });
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
.sts {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
