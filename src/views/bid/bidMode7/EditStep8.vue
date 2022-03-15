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
      <el-col :span="20" style="margin-bottom:50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招标入围</el-breadcrumb-item>
          <el-breadcrumb-item>相关附件</el-breadcrumb-item>
        </el-breadcrumb>
        <statusList></statusList>
        <div>
          <el-row>
            <div style="width:100%;margin-top:10px">
              <div style="color: red;float: left;">
                招标专业为{{ this.tableData1.cateName }},需上传：{{ this.string1 }}模版
                <br />
                必须上传加盖公章且有法人签字的pdf或图片才有效
              </div>
              <div style="float: right;margin-bottom:10px">
                <el-tooltip :content="'上传' + this.show1 + '模版'" placement="top" v-if="this.show1 && showButton">
                  <div style="float: right;">
                    <el-button type="primary" size="small" @click="onUploadPreview2(1)">{{ this.show1 }}</el-button>
                  </div>
                </el-tooltip>
                <el-tooltip :content="'上传' + this.show2 + '模版'" placement="top" v-if="this.show2 && showButton">
                  <div style="float: right;margin-right: 10px;">
                    <el-button type="primary" size="small" @click="onUploadPreview2(2)">{{ this.show2 }}</el-button>
                  </div>
                </el-tooltip>
                <el-tooltip :content="'上传' + this.show3 + '模版'" placement="top" v-if="this.show3 && showButton">
                  <div style="float: right;margin-right: 10px;">
                    <el-button type="primary" size="small" @click="onUploadPreview2(3)">{{ this.show3 }}</el-button>
                  </div>
                </el-tooltip>
                <el-tooltip :content="'上传' + this.show4 + '模版'" placement="top" v-if="this.show4 && showButton">
                  <div style="float: right;margin-right: 10px;">
                    <el-button type="primary" size="small" @click="onUploadPreview2(4)">{{ this.show4 }}</el-button>
                  </div>
                </el-tooltip>
              </div>
              <!-- <div class="float-right mb-2" style="margin-right:10px">
                <el-button type="primary" size="small" @click="onUploadPreview">上传其它附件</el-button>
              </div> -->
            </div>
            <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData">
              <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
              <el-table-column label="文件名称" prop="fileName"> </el-table-column>
              <el-table-column label="文件类型" prop="fileExtName"> </el-table-column>
              <el-table-column label="文件大小" prop="showFileSize"> </el-table-column>
              <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-delete" title="删除" @click="onDelete(scope.row)" v-if="showButton"></i>
                  <i class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible">
              <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loadingfile">
                <el-form-item label="文件名称" v-if="showFlag1">
                  <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
                </el-form-item>
                <el-form-item label="选择文件">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="api + '/api/FileUpload/BidSupplierInRequiredAttachUpload'"
                    :on-change="beforeUpload"
                    :before-remove="beforeRemove"
                    :file-list="fileList"
                    :auto-upload="false"
                    :headers="header"
                  >
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">文件格式：.doc|.docx|.pdf|.rar|.zip 最大：50 兆</div>
                  </el-upload>
                  <el-button style="margin-left: 10px;float: right" size="small" type="success" @click="submitUpload">上传</el-button>
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
import PlanMenu from "../components/PlanMenuDemoru.vue";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step2",
  components: { PlanMenu, showplanMenu, statusList: () => import("@/components/statusList.vue") },
  inject: ["reload"],
  data() {
    return {
      tablerizhi: [],
      fileList: [],
      showFlag1: true,
      loadingfile: false,
      show1: "",
      show2: "",
      show3: "",
      show4: "",
      activeName: "first",
      uploadData: {
        FileName: "",
      },
      dialogVisible: false,
      files: [],
      form: {},
      rules: {},
      // planId: "",
      tableData1: {},
      string1: "",
      tableData: [],
      api: process.env.VUE_APP_API_URL,
      loading: false,
      file: {},
      x: true,
      showButton: true,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  computed: {
    planId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else if (this.$route.params.id) {
        return this.$route.params.id;
      } else if (this.$route.params.baseId) {
        return this.$route.params.baseId;
      } else {
        return this.$route.query.baseId;
      }
    },
  },
  created: function() {
    // this.planId = this.$route.query.id;
    this.GetRequiredAttach04();
    this.GetSupplierInAttachList04();

    this.$api.supIn.CheckCanEdit({ planId: this.planId }).then(res => {
      if (!res.success) {
        this.showButton = false;
        // this.openM(res.message);
        // this.$message.error(res.message);
      }
    });
  },
  mounted() {},
  methods: {
    openM(msg) {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [h("span", null, msg), h("i", { style: "color: teal" }, "")]),
      }).then(action => {});
    },
    GetRequiredAttach04() {
      this.$api.supIn.GetRequiredAttach04({ planId: this.planId }).then(res => {
        this.tableData1 = res;
        for (var i = 0; i < res.attachNameList.length; i++) {
          if (i != 0) {
            this.string1 += "、";
          }
          this.string1 += res.attachNameList[i];
          if (i == 0) {
            this.show1 = res.attachNameList[i];
          }
          if (i == 1) {
            this.show2 = res.attachNameList[i];
          }
          if (i == 2) {
            this.show3 = res.attachNameList[i];
          }
          if (i == 3) {
            this.show4 = res.attachNameList[i];
          }
        }
      });
    },
    GetSupplierInAttachList04() {
      this.$api.supIn.GetSupplierInAttachList04({ planId: this.planId }).then(res => {
        this.tableData = res;
      });
    },
    beforeUpload(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
      this.file = file;
      // let name = file.name;
      // let index = name.lastIndexOf("\.");
      // this.uploadData = {
      //   FileName: name.substring(0, index),
      // };
      // console.log("name", this.uploadData.FileName);
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidModeAttachUpload";
    },
    onDonwLoad(file) {
      // this.$api.supIn.BidFileDownLoad006({ fileId: file.id }).then(res => {
      //
      // });
      window.location.href = process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad006?fileId=" + file.id;
    },
    getBidModeAttachList(baseId) {
      this.$api.BidModeMaster.GetBidModeAttachList(this.baseId).then(res => {
        this.files = res;
      });
    },
    onUploadPreview() {
      this.uploadData.FileName = "";
      this.showFlag1 = true;
      this.dialogVisible = true;
    },
    onUploadPreview2(type) {
      this.showFlag1 = false;
      if (type == 1) {
        this.uploadData.FileName = this.show1;
      }
      if (type == 2) {
        this.uploadData.FileName = this.show2;
      }
      if (type == 3) {
        this.uploadData.FileName = this.show3;
      }
      if (type == 4) {
        this.uploadData.FileName = this.show4;
      }
      this.fileList = [];
      this.file.raw = [];
      this.dialogVisible = true;
    },
    onUploadSuccess(response, file, fileList) {
      console.log("onUploadSuccess", response, file, fileList);
    },
    onDelete(row) {
      // this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
      //     this.$api.supIn.DeleteSupplierInAttach04({ id: row.id }).then(res => {
      //       if (res.success) {
      //         this.$message.success(res.message);
      //         this.GetSupplierInAttachList04();
      //       } else {
      //         this.$message.error(res.message);
      //         this.GetSupplierInAttachList04();
      //       }
      //     });
      //   })
      //   .catch(() => {
      //     this.$msg({ type: "info", message: "已取消删除" });
      //   });
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LIandoSupplierIn/DeleteInAttach04", { id: row.id }).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.GetSupplierInAttachList04();
          } else {
            this.$message.error(res.data.message);
            this.GetSupplierInAttachList04();
          }
        });
      });
      // .catch(() => {
      //   this.$msg({ type: "info", message: "已取消删除" });
      // });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`).then(() => {
        this.fileList = [];
        this.file.raw = [];
      });
    },
    // beforeUpload(file) {
    //   this.file = file;
    // },
    submitUpload() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then(res1 => {
        if (res1.planId == "00000000-0000-0000-0000-000000000000") {
          this.$message.error("请先完善入围相关信息");
        } else {
          if (!this.uploadData.FileName) {
            this.$message.error("请填写文件名称");
            return;
          }
          this.showButton = false;
          this.loadingfile = true;
          let f = new FormData();
          f.append("PlanId", this.planId);
          f.append("FileName", this.uploadData.FileName);
          f.append("fileBix", this.file.raw);
          this.$api.supIn.BidSupplierInRequiredAttachUpload(f).then(res => {
            this.showButton = true;
            this.loadingfile = false;
            if (res.success) {
              this.$refs.upload.clearFiles();
              this.$message.success(res.message);
              this.dialogVisible = false;
              this.fileList = [];
              this.file.raw = [];
              this.GetSupplierInAttachList04();
            } else {
              this.loadingfile = false;
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    submitUpload2() {
      this.$message("该功能待确认");
    },
    onUploadSuccess(response, file, fileList) {
      this.$message.success(res.message);
      this.getBidModeAttachList(this.baseId);
      this.dialogVisible = false;
      this.fileList = [];
      this.file.raw = [];
      //console.log("onUploadSuccess", response, file, fileList);
    },
    test() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then(res => {
        if (res.planId == "00000000-0000-0000-0000-000000000000") {
          this.$message.error("请先完善入围相关信息");
          this.x = true;
        } else {
          this.x = false;
        }
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
  width: 88%;
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
