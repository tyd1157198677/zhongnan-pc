<template>
  <div>
    <!--<div style="color: red;margin-top: 10px;">招标专业为{{this.tableData1.cateName}},需上传：{{this.string1}}</div>-->
    <!--<div style="margin-top:10px;float: left">-->
    <!--<el-button type="primary" size="small" @click="onUploadPreview" v-if="this.show1">上传{{this.show1}}</el-button>-->
    <!--<el-button type="primary" size="small" @click="onUploadPreview" v-if="this.show2">上传{{this.show2}}</el-button>-->
    <!--<el-button type="primary" size="small" @click="onUploadPreview" v-if="this.show3">上传{{this.show3}}</el-button>-->
    <!--</div>-->
    <!--<div class="float-right mb-2" style="margin-top:10px">-->
    <!--<el-button type="primary" size="small" @click="onUploadPreview">上传其它附件</el-button>-->
    <!--</div>-->
    <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData">
      <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
      <el-table-column label="文件名称" prop="fileName" align="center"> </el-table-column>
      <el-table-column label="文件类型" prop="fileExtName" align="center"> </el-table-column>
      <el-table-column label="文件大小" prop="showFileSize" align="center"> </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <!--<i class="el-icon-delete" title="删除" @click="onDelete(scope.row)"></i>-->
          <i class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/**
 * 招标采购-相关附件
 */

export default {
  name: "Step2",
  inject: ["reload"],
  data() {
    return {
      show1: "",
      show2: "",
      show3: "",
      activeName: "first",
      uploadData: {
        FileName: "",
      },
      dialogVisible: false,
      files: [],
      form: {},
      rules: {},
      planId: "",
      tableData1: {},
      string1: "",
      tableData: [],
      api: process.env.VUE_APP_API_URL,
      loading: false,
      file: {},
      x: true,
    };
  },
  created: function () {
    this.planId = this.$route.query.id;
    this.GetRequiredAttach04();
    this.GetSupplierInAttachList04();
  },
  mounted() {},
  methods: {
    GetRequiredAttach04() {
      this.$api.supIn.GetRequiredAttach04({ planId: this.planId }).then((res) => {
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
        }
      });
    },
    GetSupplierInAttachList04() {
      this.$api.supIn.GetSupplierInAttachList04({ planId: this.planId }).then((res) => {
        this.tableData = res;
      });
    },
    beforeUpload(file) {
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData = {
        FileName: name.substring(0, index),
      };
      console.log("name", this.uploadData.FileName);
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidModeAttachUpload";
    },
    onDonwLoad(file) {
      //window.open(process.env.VUE_APP_API_URL+file.filePath+file.fileReName)
      window.location.href = process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad006?fileId=" + file.id;
    },
    getBidModeAttachList(baseId) {
      this.$api.BidModeMaster.GetBidModeAttachList(this.baseId).then((res) => {
        this.files = res;
      });
    },
    onUploadPreview() {
      this.dialogVisible = true;
    },
    onUploadSuccess(response, file, fileList) {
      console.log("onUploadSuccess", response, file, fileList);
    },
    onDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.supIn.DeleteSupplierInAttach04({ id: row.id }).then((res) => {
            if (res.success) {
              this.$message.success(res.message);
              this.GetSupplierInAttachList04();
            } else {
              this.$message.error(res.message);
              this.GetSupplierInAttachList04();
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      this.file = file;
    },
    submitUpload() {
      this.test();
      if (this.x) {
        return;
      }
      this.loading = true;
      let f = new FormData();
      f.append("PlanId", this.planId);
      f.append("FileName", this.uploadData.FileName);
      f.append("fileBix", this.file.raw);
      this.$api.supIn.BidSupplierInRequiredAttachUpload(f).then((res) => {
        this.loading = false;
        if (res.success) {
          this.$refs.upload.clearFiles();
          this.$message.success(res.message);
          this.dialogVisible = false;
          this.GetSupplierInAttachList04();
        } else {
          this.$message.error(res.message);
        }
      });
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
    test() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res) => {
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
