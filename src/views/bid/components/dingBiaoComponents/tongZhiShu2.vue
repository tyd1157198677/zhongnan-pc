<!--  -->
<template>
  <div>
    <div class="pub">中标单位</div>
    <el-table
      empty-text="暂无数据"
      style="width:100%"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="table1"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>

      <el-table-column width="150" align="center" label="标段名称" prop="sectionName"> </el-table-column>

      <el-table-column align="left" label="供应商名称">
        <template slot-scope="scope">
          <el-link
            class="sp"
            type="primary"
            style="color:#409eff;text-decoration: none;padding-right:10px"
            icon="el-icon-search"
            @click="jumpDetail(scope.row.supplierId)"
            >{{ scope.row.comFullName }}
          </el-link>
        </template>
      </el-table-column>

      <el-table-column width="150" label="中标金额" align="center" prop="finalWinPrice">
        <!--<template slot-scope="scope">-->
        <!--<el-input v-model="scope.row.finalWinPrice"></el-input>-->
        <!--</template>-->
      </el-table-column>

      <el-table-column align="center" label="相关附件">
        <el-table-column label="报价附件" align="center" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-download ml-2"
              title="下载"
              @click="onDonwLoad(scope.row, 1)"
              v-if="scope.row.priceFilePath && scope.row.submitStatus != '已提交'"
            ></i>
          </template>
        </el-table-column>

        <el-table-column label="中标通知书" align="center" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-download ml-2"
              title="下载"
              @click="onDonwLoad(scope.row, 2)"
              v-if="scope.row.noticeFilePath && scope.row.submitStatus != '已提交'"
            ></i>
          </template>
        </el-table-column>

        <!--<el-table-column label="感谢信" align="center" width="150">-->
        <!--<template slot-scope="scope">-->
        <!--<i class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row,3)" v-if="scope.row.thanksFilePath&&scope.row.submitStatus!='已提交'"></i>-->
        <!--<i class="el-icon-upload ml-2" title="上传" @click="upload3(scope.row,3)" v-if="!scope.row.thanksFilePath&&scope.row.submitStatus!='已提交'"></i>-->
        <!--<i class="el-icon-delete ml-2" @click="deleteRow(scope.row,3)" v-if="scope.row.thanksFilePath&&scope.row.submitStatus!='已提交'"></i>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column label="其它" align="center" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-download"
              title="下载"
              @click="onDonwLoad(scope.row, 4)"
              v-if="scope.row.otherFilePath && scope.row.submitStatus != '已提交'"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="盖章文件" align="center" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-download ml-2"
              title="下载"
              @click="onDonwLoad(scope.row, 5)"
              v-if="scope.row.sealUrl && scope.row.submitStatus != '已提交'"
            ></i>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <div class="pub">未中标单位</div>
    <el-table
      empty-text="暂无数据"
      style="width:100%"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="table2"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>

      <el-table-column width="150" align="center" label="标段名称" prop="sectionName"> </el-table-column>

      <el-table-column align="left" label="供应商名称">
        <template slot-scope="scope">
          <el-link
            class="sp"
            type="primary"
            style="color:#409eff;text-decoration: none;padding-right:10px"
            icon="el-icon-search"
            @click="jumpDetail(scope.row.supplierId)"
            >{{ scope.row.comFullName }}
          </el-link>
        </template>
      </el-table-column>

      <el-table-column label="感谢信" align="center" width="150">
        <template slot-scope="scope">
          <i
            class="el-icon-download ml-2"
            title="下载"
            @click="onDonwLoad(scope.row, 3)"
            v-if="scope.row.thanksFilePath && scope.row.submitStatus != '已提交'"
          ></i>
        </template>
      </el-table-column>
      <el-table-column label="盖章文件" align="center" width="150">
        <template slot-scope="scope">
          <i
            class="el-icon-download ml-2"
            title="下载"
            @click="onDonwLoad(scope.row, 5)"
            v-if="scope.row.sealUrl && scope.row.submitStatus != '已提交'"
          ></i>
        </template>
      </el-table-column>
    </el-table>

    <!--<div class="bottom" style="text-align:right;margin:10px" v-if="showButton">-->
    <!--<el-button type="danger" size="small" @click="save4"> 提交定标审批</el-button>-->
    <!--</div>-->

    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible">
      <el-form class="mt-0" size="small" label-width="120px">
        <!--<el-form-item label="文件名称">-->
        <!--<el-input  v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="api + '/api/FileUpload/BidWinAttachUpload1'"
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
            v-loading="loading"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包，最大200M</div>
          </el-upload>
          <el-button v-loading="loading" style="margin-left: 10px;float: right" size="small" type="success" @click="submitUpload"
            >上传</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dataF2"],
  data() {
    return {
      form: {},
      dialogVisible: false,
      table1: {},
      table2: {},
      table3: {},
      bidModeId: "",
      uploadData: {
        FileName: "",
      },
      file: {},
      fileList: [],
      loading: false,
      api: process.env.VUE_APP_API_URL,
      showButton: true,
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.$on("show2", function() {
        this.show2 = true;
      });
    });
  },
  created() {
    this.bidModeId = this.$route.query.id;

    // if(!this.dataF2.showButton2){
    //   this.showButton = false
    // }else{
    //   this.$api.supIn.BidActionButton13({bidModeId:this.bidModeId}).then(res => {
    //     if(!res.success){
    //       this.showButton = false
    //     }
    //   });
    // }

    this.getList1();
    this.getList2();
  },
  methods: {
    save4() {
      var a = [];
      for (var i = 0; i < this.table1.length; i++) {
        var b = {};
        b.bidModeId = this.bidModeId;
        b.sectionId = this.table1[i].sectionId;
        b.supplierId = this.table1[i].supplierId;
        b.finalWinPrice = this.table1[i].finalWinPrice;
        a.push(b);
      }
      this.$confirm("提交后不能修改，确定要提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.SubmitThanks02(a).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
          } else {
            //this.$msg.error(res.message)
            this.openM(res.message);
          }
        });
      });
    },
    onDonwLoad(file, index) {
      var path = "";
      if (index == 1) {
        path = file.priceFileId;
      } else if (index == 2) {
        path = file.noticeFileId;
      } else if (index == 3) {
        path = file.thanksFileId;
      } else if (index == 4) {
        path = file.otherFileid;
      } else if (index == 5) {
        path = file.sealId;
      }
      //window.open(process.env.VUE_APP_API_URL + path);
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + path);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      this.file = file;
    },
    submitUpload() {
      this.loading = true;
      let f = new FormData();
      f.append("BidModeId", this.bidModeId);
      f.append("FileName", this.uploadData.FileName);
      f.append("SectionId", this.uploadData.sectionId);
      f.append("SupplierId", this.uploadData.supplierId);
      f.append("fileBix", this.file.raw);
      this.$api.supIn.BidWinAttachUpload2(f).then(res => {
        this.loading = false;
        if (res.success) {
          this.$refs.upload.clearFiles();
          this.$message.success(res.message);
          this.dialogVisible = false;
          this.getList1();
          this.getList2();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    upload3(row, index) {
      var path = "";
      if (index == 1) {
        path = "报价文件";
      } else if (index == 2) {
        path = "中标通知书";
      } else if (index == 3) {
        path = "感谢信";
      } else if (index == 4) {
        path = "其他";
      }
      this.uploadData.FileName = path;
      this.uploadData.sectionId = row.sectionId;
      this.uploadData.supplierId = row.supplierId;
      this.dialogVisible = true;
    },

    getList2() {
      this.$api.supIn.GetNoThanksSupplierList02({ bidModeId: this.bidModeId }).then(res => {
        this.table2 = res;
      });
    },
    getList1() {
      this.$api.supIn.GetThanksSupplierList02({ bidModeId: this.bidModeId }).then(res => {
        this.table1 = res;
      });
    },
    save1() {
      this.form.bidModeId = this.bidModeId;
      this.$api.supIn.SubmitThanks02(this.form).then(res => {
        if (res.success) {
          this.$msg.success(res.message);
        } else {
          this.$msg.error(res.message);
        }
      });
    },
    deleteRow(row, index) {
      var id = "";
      if (index == 1) {
        id = row.priceFileId;
      } else if (index == 2) {
        id = row.noticeFileId;
      } else if (index == 3) {
        id = row.thanksFileId;
      } else if (index == 4) {
        id = row.otherFileId;
      }
      this.$confirm("确认要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.DeleteBidWinAttach({ id: id }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.getList1();
            this.getList2();
          } else {
            this.$msg.error(res.message);
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
<style>
.el-table thead.is-group th {
  background: lightgray;
}
</style>
