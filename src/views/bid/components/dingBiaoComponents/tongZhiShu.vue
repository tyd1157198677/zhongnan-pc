<!--  -->
<template>
  <div>
    <div class="pub">中标单位</div>
    <el-table
      v-if="show2"
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
      <el-table-column align="left" label="供应商名称" min-width="260px">
        <template slot-scope="scope">
          <el-link type="primary" style="color:#409eff;text-decoration: none;padding-right:10px" @click="jumpDetail(scope.row.supplierId)"
            >{{ scope.row.comFullName }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column width="150" label="中标金额" align="center" prop="finalWinPrice">
        <template slot-scope="scope">
          <el-input v-if="showButton" v-model="scope.row.finalWinPrice"></el-input>
          <el-input v-if="!showButton" disabled v-model="scope.row.finalWinPrice"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" label="相关附件">
        <el-table-column label="报价附件" align="center" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-download ml-2"
              title="下载"
              @click="onDonwLoadprice(scope.row.priceFileId)"
              v-if="scope.row.priceFilePath && scope.row.submitStatus != '已提交'"
            ></i>
            <i
              class="el-icon-upload ml-2"
              title="上传"
              @click="upload3(scope.row, 1)"
              v-if="showButton && !scope.row.priceFilePath && scope.row.submitStatus != '已提交'"
            ></i>
            <i
              class="el-icon-delete ml-2"
              @click="deleteRow(scope.row, 1)"
              v-if="showButton && scope.row.priceFilePath && scope.row.submitStatus != '已提交'"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="中标通知书" align="center" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-download ml-2"
              title="下载"
              @click="onDonwLoadnotice(scope.row.noticeFileId)"
              v-if="scope.row.noticeFilePath && scope.row.submitStatus != '已提交'"
            ></i>
            <i
              class="el-icon-upload ml-2"
              title="上传"
              @click="upload3(scope.row, 2)"
              v-if="showButton && !scope.row.noticeFilePath && scope.row.submitStatus != '已提交'"
            ></i>
            <i
              class="el-icon-delete ml-2"
              @click="deleteRow(scope.row, 2)"
              v-if="showButton && scope.row.noticeFilePath && scope.row.submitStatus != '已提交'"
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
              @click="onDonwLoadother(scope.row.otherFileId)"
              v-if="scope.row.otherFilePath && scope.row.submitStatus != '已提交'"
            ></i>
            <i
              class="el-icon-upload ml-2"
              title="上传"
              @click="upload3(scope.row, 4)"
              v-if="showButton && !scope.row.otherFilePath && scope.row.submitStatus != '已提交'"
            ></i>
            <i
              class="el-icon-delete ml-2"
              @click="deleteRow(scope.row, 4)"
              v-if="showButton && scope.row.otherFilePath && scope.row.submitStatus != '已提交'"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="中标通知书盖章文件" align="center" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-download"
              title="下载"
              @click="onDonwLoadseal(scope.row.sealId)"
              v-if="scope.row.sealUrl && scope.row.submitStatus != '已提交'"
            ></i>
            <!-- <i
              class="el-icon-upload ml-2"
              title="上传"
              @click="upload4(scope.row, 5)"
              v-if="showButton && !scope.row.sealUrl && scope.row.submitStatus != '已提交'"
            ></i>
            <i
              class="el-icon-delete ml-2"
              @click="deleteRow(scope.row, 5)"
              v-if="showButton && scope.row.sealUrl && scope.row.submitStatus != '已提交'"
            ></i> -->
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <div class="pub">未中标单位</div>
    <el-table
      v-if="show2"
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
          <el-link type="primary" style="color:#409eff;text-decoration: none;padding-right:10px" @click="jumpDetail(scope.row.supplierId)"
            >{{ scope.row.comFullName }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="感谢信" align="center" width="150">
        <template slot-scope="scope">
          <i
            class="el-icon-download "
            title="下载"
            @click="onDonwLoadthanks(scope.row.thanksFileId)"
            v-if="scope.row.thanksFilePath && scope.row.submitStatus != '已提交'"
          ></i>
          <i
            class="el-icon-upload "
            title="上传"
            @click="upload3(scope.row, 3)"
            v-if="showButton && !scope.row.thanksFilePath && scope.row.submitStatus != '已提交'"
          ></i>
          <i
            class="el-icon-delete "
            @click="deleteRow(scope.row, 3)"
            v-if="showButton && scope.row.thanksFilePath && scope.row.submitStatus != '已提交'"
          ></i>
        </template>
      </el-table-column>
      <el-table-column label="盖章文件" align="center" width="150">
        <template slot-scope="scope">
          <i
            class="el-icon-download "
            title="下载"
            @click="onDonwLoadseal(scope.row.sealId)"
            v-if="scope.row.sealUrl && scope.row.submitStatus != '已提交'"
          ></i>
          <!-- <i
            class="el-icon-upload ml-2"
            title="上传"
            @click="upload4(scope.row, 5)"
            v-if="showButton && !scope.row.sealUrl && scope.row.submitStatus != '已提交'"
          ></i>
          <i
            class="el-icon-delete ml-2"
            @click="deleteRow(scope.row, 5)"
            v-if="showButton && scope.row.sealUrl && scope.row.submitStatus != '已提交'"
          ></i> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="bottom" style="text-align:right;margin:10px" v-if="showButton">
      <el-button type="danger" v-loading="loadingding" size="small" @click="save4"> 提交定标审批</el-button>
    </div>
    <div style="margin-top:50px" v-if="tableif2">
      <span>审批日志</span>
      <div style="float:right;color:red">{{ status2 }}</div>
      <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableshenpi2">
        <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
        <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
        <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
        <el-table-column prop="creationTime" width="180" label="待办时间" align="center">
          <template slot-scope="scope"
            ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
          >
        </el-table-column>
        <el-table-column prop="dealTime" width="180" label="处理时间" align="center">
          <template slot-scope="scope"
            ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
          >
        </el-table-column>
        <el-table-column prop="status" width="80" label="结果" align="center"> </el-table-column>
        <el-table-column prop="comments" label="意见/备注" align="center"> </el-table-column>
      </el-table>
    </div>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
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
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包，最大20M</div>
          </el-upload>
          <el-button style="margin-left: 10px;float: right" size="small" type="success" @click="submitUpload">上传</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible2">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
        <el-form-item label="文件名称">
          <el-select v-model="uploadData.FileName">
            <el-option label="中标通知书_盖章文件" value="中标通知书_盖章文件"></el-option>
            <el-option label="感谢信_盖章文件" value="感谢信_盖章文件"></el-option>
          </el-select>
          <!--<el-input  v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>-->
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="api + '/api/FileUpload/BidWinAttachUpload2'"
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包，最大20M</div>
          </el-upload>
          <el-button style="margin-left: 10px;float: right" size="small" type="success" @click="submitUpload">上传</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  props: ["dataF2"],
  data() {
    return {
      form: {},
      dialogVisible2: false,
      dialogVisible: false,
      loadingding: false,
      table1: [],
      table2: [],
      table3: [],
      tableshenpi2: [],
      tableif2: false,
      showButtontwo: false,
      showButton2: false,
      // fileName: "中标通知书_盖章文件",
      bidModeId: "",
      uploadData: {
        FileName: "中标通知书_盖章文件",
      },
      file: {},
      fileList: [],
      loading: false,
      api: process.env.VUE_APP_API_URL,
      showButton: true,
      show2: true,
    };
  },
  mounted() {
    this.GetNewLogList_BidWin();
    this.$nextTick(function() {
      this.$on("show2", function() {
        this.show2 = true;
      });
    });
  },
  created() {
    this.bidModeId = this.$route.query.id;
    this.BidActionButton13();
    this.getList1();
    this.getList2();
  },
  methods: {
    tomethgotongzhi() {
      this.GetNewLogList_BidWin();
      this.BidActionButton13();
      this.getList1();
      this.getList2();
    },
    parseTime,
    BidActionButton13() {
      if (!this.dataF2.showButton2) {
        this.showButton = false;
      } else {
        this.$api.supIn.BidActionButton13({ bidModeId: this.bidModeId }).then(res => {
          if (!res.success) {
            this.showButton = false;
          }
        });
      }
    },
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
        this.loadingding = true;
        this.$api.supIn.SubmitThanks02(a).then(res => {
          console.log(res.success);
          if (res.success) {
            this.$msg.success(res.message);
            this.loadingding = false;
            this.getList1();
            this.getList2();
            this.GetNewLogList_BidWin();
            this.BidActionButton13();
          } else {
            this.loadingding = false;
            // this.$message.error(res.data.message);
            this.openM(res.message);
            // this.getList1();
            // this.getList2();
            // this.openM(res.message);
          }
        });
      });
    },
    GetNewLogList_BidWin() {
      this.$http.get("/WorkFlowStart/GetNewLogList_BidWin", { params: { bidModeId: this.bidModeId, tab: 2 } }).then(res => {
        // if (res.data.logs.length > 0) {
        this.tableshenpi2 = res.data.logs;
        this.status2 = res.data.status;
        if (res.data.logs.length > 0 || res.data.logs == null) {
          this.tableif2 = true;
        } else {
          this.tableif2 = false;
        }
        // }
      });
    },
    CheckBidWin() {
      this.$api.supIn.CheckBidWin({ bidModeId: id }).then(res => {
        this.showButtontwo = res.showButton2;
      });
    },
    onDonwLoad(file, index) {
      var path = "";
      if (index == 1) {
        path = file.priceFilePath;
      } else if (index == 2) {
        path = file.noticeFilePath;
      } else if (index == 3) {
        path = file.thanksFilePath;
      } else if (index == 4) {
        path = file.otherFilePath;
      } else if (index == 5) {
        path = file.sealUrl;
      }
      window.open(process.env.VUE_APP_API_URL + path);
    },
    onDonwLoadprice(priceFileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + priceFileId);
    },
    onDonwLoadnotice(noticeFileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + noticeFileId);
    },
    onDonwLoadother(otherFileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + otherFileId);
    },
    onDonwLoadseal(sealId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + sealId);
    },
    onDonwLoadthanks(thanksFileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + thanksFileId);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file, fileList) {
      this.file = file;
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
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
          this.dialogVisible2 = false;
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
      this.fileList = [];
      this.file.raw = "";
    },
    upload4(row, index) {
      var path = "";
      // if  (index == 5) {
      //   path = "盖章文件";
      // }
      // this.uploadData.FileName = path;
      this.uploadData.bidModeId = this.bidModeId;
      this.uploadData.sectionId = row.sectionId;
      this.uploadData.supplierId = row.supplierId;
      this.dialogVisible2 = true;
      this.uploadData.FileName = "";
      this.fileList = [];
      this.file.raw = "";
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
    // save1() {
    //   this.form.bidModeId = this.bidModeId;
    //   this.$api.supIn.SubmitThanks02(this.form).then(res => {
    //     if (res.success) {
    //       this.$msg.success(res.message);
    //     } else {
    //       this.$msg.error(res.message);
    //     }
    //   });
    // },
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
      } else if (index == 5) {
        id = row.sealId;
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
/* .el-table thead.is-group th {
  background: lightgray;
} */
</style>
