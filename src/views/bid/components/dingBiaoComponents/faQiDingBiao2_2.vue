<!--  -->
<template>
  <div class="">

    <!--<div class="bottom" style="text-align:right;margin:10px">-->
      <!--<el-button type="danger" size="small" @click="upload3" v-if="showButton">上传附件</el-button>-->
    <!--</div>-->
    <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="uploadList" v-loading="loading">
      <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
      <el-table-column label="附件名称" min-width="160" align="center" prop="fileName"> </el-table-column>
      <el-table-column label="附件类型" align="center" prop="fileExtName"> </el-table-column>
      <el-table-column align="center" label="附件大小" prop="fileSize"> </el-table-column>
      <el-table-column align="center" label="上传日期" prop="creationTime">
        <template slot-scope="scope">
          <font>{{ scope.row.creationTime.substring(0, 10) }}</font>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <i class="el-icon-download" title="下载" @click="onDonwLoad(scope.row)"></i>
          <!--<i class="el-icon-delete ml-2" @click="deleteRow(scope.row)" v-if="scope.row.submitStatus != '已提交' && showButton"></i>-->
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="bottom" style="text-align:right;margin:10px">-->
      <!--<el-button type="danger" size="small" @click="save4" v-if="showButton"> 提交定标审批</el-button>-->
    <!--</div>-->

    <!--<el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible">-->
      <!--<el-form class="mt-0" size="small" label-width="120px">-->
        <!--<el-form-item label="文件名称" required>-->
          <!--<el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="选择文件">-->
          <!--<el-upload-->
            <!--class="upload-demo"-->
            <!--ref="upload"-->
            <!--:action="api + '/api/FileUpload/BidWinAttachUpload1'"-->
            <!--:on-change="beforeUpload"-->
            <!--:before-remove="beforeRemove"-->
            <!--:file-list="fileList"-->
            <!--:auto-upload="false"-->
            <!--v-loading="loading"-->
          <!--&gt;-->
            <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
            <!--<div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包，最大200M</div>-->
          <!--</el-upload>-->
          <!--<el-button v-loading="loading" style="margin-left: 10px;float: right" size="small" type="success" @click="submitUpload"-->
            <!--&gt;上传</el-button-->
          <!--&gt;-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      activeName: "1",
      dialogVisible: false,
      table1: {},
      table2: {},
      table3: {},
      bidModeId: "",
      show1: false,
      show2: false,
      show3: false,
      saveTable1: [],
      saveTable2: [],
      saveTable3: [],
      uploadData: {
        FileName: "",
      },
      file: {},
      fileList: [],
      loading: false,
      api: process.env.VUE_APP_API_URL,
      showButton: true,
      uploadList: [],
    };
  },
  created() {
    this.bidModeId = this.$route.query.id;

    // if (!this.dataF.showButton1) {
    //   this.showButton = false;
    // } else {
    //   this.$api.supIn.BidActionButton12({ bidModeId: this.bidModeId }).then(res => {
    //     if (!res.success) {
    //       this.showButton = false;
    //     }
    //   });
    // }

    //this.getInfo();
    //this.getList1();
    this.getList2();
  },
  methods: {
    onDonwLoad(file) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + file.id);
      //window.open(process.env.VUE_APP_API_URL + file.filePath + file.fileReName);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      this.file = file;
    },
    submitUpload() {
      if (!this.uploadData.FileName) {
        this.$message.error("请填写文件名称");
        return;
      }
      this.loading = true;
      let f = new FormData();
      f.append("BidModeId", this.bidModeId);
      f.append("FileName", this.uploadData.FileName);
      f.append("fileBix", this.file.raw);
      this.$api.supIn.BidWinAttachUpload1(f).then(res => {
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
    upload3() {
      this.dialogVisible = true;
    },
    getList2() {
      this.$api.supIn.GetBidWinAttachList01({ bidModeId: this.bidModeId }).then(res => {
        this.uploadList = res;
      });
    },
    save2() {
      var a = [];
      for (var i = 0; i < this.saveTable1.length; i++) {
        var item = this.saveTable1[i];
        var b = {};
        b.sectionId = this.table1.sectionId;
        b.supplierId = item.supplierId;
        b.amount = item.winAmount;
        a.push(b);
      }
      for (var i = 0; i < this.saveTable2.length; i++) {
        var item = this.saveTable2[i];
        var b = {};
        b.sectionId = this.table2.sectionId;
        b.supplierId = item.supplierId;
        b.amount = item.winAmount;
        a.push(b);
      }
      for (var i = 0; i < this.saveTable3.length; i++) {
        var item = this.saveTable3[i];
        var b = {};
        b.sectionId = this.table3.sectionId;
        b.supplierId = item.supplierId;
        b.amount = item.winAmount;
        a.push(b);
      }
      if (a.length == 0) {
        this.$msg.error("最少勾选一条数据");
        return;
      }
      this.$api.supIn.SaveWinSupplierList01(a).then(res => {
        if (res.success) {
          this.$msg.success(res.message);
          this.getList1();
        } else {
          this.$msg.error(res.message);
        }
      });
    },
    handleSelectionChange(val) {
      this.saveTable1 = val;
    },
    handleSelectionChange2(val) {
      this.saveTable2 = val;
    },
    handleSelectionChange3(val) {
      this.saveTable3 = val;
    },
    getList1() {
      this.$api.supIn.GetSectionSupplier01({ bidModeId: this.bidModeId }).then(res => {
        for (var i = 0; i < res.length; i++) {
          if (i == 0) {
            this.show1 = true;
            this.table1 = res[i];
            this.table1.sectionName = "排名（" + this.table1.sectionName + ")";
            var sf1 = [];
            this.table1.winSupplierList[0].selectFlag = true;
            this.table1.winSupplierList.forEach(row => {
              if (row.selectFlag) {
                sf1.push(row);
              }
            });
            this.toggleSelection1(sf1);
          }
          if (i == 1) {
            this.show2 = true;
            this.table2 = res[i];
            this.table2.sectionName = "排名（" + this.table2.sectionName + ")";
            var sf1 = [];
            this.table2.winSupplierList.forEach(row => {
              if (row.selectFlag) {
                sf1.push(row);
              }
            });
            this.toggleSelection2(sf1);
          }
          if (i == 2) {
            this.show3 = true;
            this.table3 = res[i];
            this.table3.sectionName = "排名（" + this.table3.sectionName + ")";
            var sf1 = [];
            this.table3.winSupplierList.forEach(row => {
              if (row.selectFlag) {
                sf1.push(row);
              }
            });
            this.toggleSelection3(sf1);
          }
        }
      });
    },
    toggleSelection1(rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable1.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable1.clearSelection();
        }
      });
    },
    toggleSelection2(rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable2.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable2.clearSelection();
        }
      });
    },
    toggleSelection3(rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable3.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable3.clearSelection();
        }
      });
    },
    save1() {
      if (this.form.contractDate && this.form.bidWinDate) {
        this.form.bidModeId = this.bidModeId;
        this.$api.supIn.SaveBidWinMaster01(this.form).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
          } else {
            this.$msg.error(res.message);
          }
        });
      } else {
        this.$msg.error("请填写完整带*的必填项再保存");
        return;
      }
    },
    getInfo() {
      this.$api.supIn.GetBidWinMaster01({ bidModeId: this.bidModeId }).then(res => {
        this.form = res;
      });
    },
    deleteRow(row) {
      this.$confirm("当前操作不可恢复，确认要执行当前操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.DeleteBidWinAttach({ id: row.id }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.getList2();
          } else {
            this.$msg.error(res.message);
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
        this.$api.supIn.SubmitWin01({ id: this.bidModeId }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.showButton = false;
            this.getInfo();
            this.getList1();
            this.getList2();
          } else {
            //this.$msg.error(res.message)
            this.openM(res.message);
          }
        });
      });
    },
    openM(msg) {
      const h = this.$createElement;
      this.$msgbox({
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "关闭",
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
