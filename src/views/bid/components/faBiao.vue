<!-- 发标 -->
<template>
  <div class="">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
    <el-card class="box-card" style="margin-top:10px">
      <div slot="header" class="clearfix">
        <span>{{ this.pageMessage }}</span>
        <el-button
          type="danger"
          style="float:right;margin-bottom:10px;margin-left:10px"
          v-if="fabut"
          v-loading="loading1"
          size="mini"
          @click="fabiaobtn"
          >发标</el-button
        >
        <el-button type="danger" style="float:right;margin-bottom:10px" v-if="this.pageMessage == '已经发标'" size="mini" @click="mesto"
          >短信提醒</el-button
        >
      </div>
      <div class="text item">
        <el-table stripe border :data="tableList.attachList">
          <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
          <el-table-column prop="fileName" label="文件名称" align="left"> </el-table-column>
          <el-table-column label="文件分类" align="center" width="150">
            <template slot-scope="scope"
              ><span>{{ scope.row.fileCateName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件格式" align="center" width="150">
            <template slot-scope="scope"
              ><span>{{ scope.row.fileExtName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="todoBusinessCate" label="文件大小" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.showFileSize }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="showToSupplier" label="是否展示给供应商" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.showToSupplier ? "是" : "否" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下载" align="center" width="80">
            <template slot-scope="scope">
              <!-- <a class="btn btn-primary btn-sm" target="_blank" :href="api + scope.row.filePath + scope.row.fileReName">下载</a> -->
              <span class="el-icon-download" @click="downLoad(scope.row.id)"></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 30px;" v-if="this.comFullNameList.length > 0">
      <div slot="header" class="clearfix">
        <span>投标方下载招标文件情况</span>
        <!-- <el-button type="danger" style="float:right;margin-bottom:10px" v-if="fabut" v-loading="loading1" size="mini" @click="fabiaobtn">发标</el-button> -->
      </div>
      <div class="text item">
        <el-table stripe border :data="fileDownLoadList">
          <el-table-column type="index" width="80" label="序号" align="center" fixed> </el-table-column>
          <el-table-column prop="fileName" width="180" label="文件名称" align="left" fixed> </el-table-column>
          <el-table-column
            v-for="(item, index) in comFullNameList"
            min-width="250"
            :key="item"
            :label="item"
            align="center"
            prop="comFullNameList"
          >
            <template slot-scope="scope">
              <!-- <i class="el-icon-downlaod" v-if="scope.row.isDownLoad[index] == 'true'" @click="downLoad1(scope.row.fileId)"></i> -->
              <!-- <span>{{ scope.row.isDownLoad[index] ? "是" : "否" }}</span> -->
              <span :style="{ color: scope.row.isDownLoad[index] ? 'green' : 'red' }">{{ scope.row.isDownLoad[index] ? "√" : "×" }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!--<div style="text-align:right;margin-bottom:10px;margin-top:10px">-->
    <!--<span style="flota:right;margin-right:10px;color:red">{{ this.pageMessage }}</span>-->
    <!--<el-button type="danger" v-if="fabut" v-loading="loading1" size="mini" @click="fabiaobtn">发标</el-button>-->
    <!--</div>-->

    <!--&lt;!&ndash; <el-tab-pane label="发送文件清单" name="发送文件清单"> &ndash;&gt;-->
    <!--&lt;!&ndash; <el-button type="danger" size="mini" @click="submit" v-if="tableList.showSubmitButton">发标</el-button> &ndash;&gt;-->
    <!--&lt;!&ndash; <el-button-->
    <!--type="danger"-->
    <!--v-if="tableList.showSubmitButton"-->
    <!--v-loading="loading1"-->
    <!--size="mini"-->
    <!--@click="submit"-->
    <!--style="float:right;margin-bottom:10px"-->
    <!--&gt;提交审批</el-button-->
    <!--&gt; &ndash;&gt;-->
    <!--<el-table stripe border :data="tableList.attachList">-->
    <!--<el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>-->
    <!--<el-table-column prop="fileName" label="文件名称" align="center"> </el-table-column>-->
    <!--<el-table-column prop="showFileSize" label="文件大小" align="center"> </el-table-column>-->
    <!--<el-table-column prop="fileExtName" label="文件类型" align="center"> </el-table-column>-->
    <!--<el-table-column label="下载" align="center" width="80">-->
    <!--<template slot-scope="scope">-->
    <!--&lt;!&ndash; <a class="btn btn-primary btn-sm" target="_blank" :href="api + scope.row.filePath + scope.row.fileReName">下载</a> &ndash;&gt;-->
    <!--<span class="el-icon-download" @click="downLoad(scope.row.id)"></span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--<div style="margin-top:20px">-->
    <!--<el-table stripe border :data="fileDownLoadList">-->
    <!--<el-table-column type="index" width="80" label="序号" align="center" fixed> </el-table-column>-->
    <!--<el-table-column prop="fileName" width="180" label="文件名称" align="center" fixed> </el-table-column>-->
    <!--<el-table-column-->
    <!--v-for="(item, index) in comFullNameList"-->
    <!--min-width="250"-->
    <!--:key="item"-->
    <!--:label="item"-->
    <!--align="center"-->
    <!--prop="comFullNameList"-->
    <!--&gt;-->
    <!--<template slot-scope="scope">-->
    <!--&lt;!&ndash; <i class="el-icon-downlaod" v-if="scope.row.isDownLoad[index] == 'true'" @click="downLoad1(scope.row.fileId)"></i> &ndash;&gt;-->
    <!--&lt;!&ndash; <span>{{ scope.row.isDownLoad[index] ? "是" : "否" }}</span> &ndash;&gt;-->
    <!--<span :style="{ color: scope.row.isDownLoad[index] ? 'green' : 'red' }">{{ scope.row.isDownLoad[index] ? "√" : "×" }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->
    <!-- </el-tab-pane> -->
    <!-- </el-tabs> -->
    <el-dialog width="40%" :visible.sync="dialogVisible1">
      <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="mt-2">
        <el-form-item label="答疑截止时间" prop="bidQaEndDate">
          <el-date-picker
            type="datetime"
            v-model="form.bidQaEndDate"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="回标截止时间" prop="bidBackEndDate">
          <el-date-picker
            type="datetime"
            v-model="form.bidBackEndDate"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择时间"
          >
          </el-date-picker>
        </el-form-item>
        <div style="text-align:right">
          <el-button type="primary" :loading="loading" @click="save">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleto" title="短信通知投标联系人" width="70%">
      <div style="margin-bottom:10px">短信内容</div>
      <div class="mesgContent">
        <el-input v-model="content" style="width:90%" placeholder="请输入短信内容"></el-input>
        <el-button style="margin-bottom:10px" size="small" type="primary" @click="tosend">确认发送</el-button>
      </div>
      <el-table stripe border :data="todatalist">
        <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
        <el-table-column prop="comFullName" label="投标方名称" align="left"> </el-table-column>
        <el-table-column prop="personName" width="180" label="联系人姓名" align="center"> </el-table-column>
        <el-table-column prop="mobilePhone" width="180" label="手机号" align="center"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  props: ["id"],
  data() {
    return {
      activeName: "发送文件清单",
      dialogVisibleto: false,
      dialogVisible1: false,
      fabut: false,
      phoneList: [],
      mobilePhone: "",
      activeName1: [],
      form: {
        bidQaEndDate: "",
        bidBackEndDate: "",
      },
      showelse: false,
      comFullNameList: {},
      fileDownLoadList: [
        {
          isDownLoad: [],
        },
      ],
      loadingfa: false,
      showRefuseButton: false,
      showPassButton: false,
      ideaRemark: "",
      rules: {
        bidQaEndDate: [{ required: true, message: "请选择日期", trigger: "change" }],
        bidBackEndDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
      },
      todatalist: [],
      tableData: [],
      content: "", //短信默认内容
      pageMessage: "",
      tableList: {
        attachList: [],
      },
      loading: false,
      loading1: false,
      api: process.env.VUE_APP_API_URL,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.CheckUserProcessPageAuth();
  },
  methods: {
    parseTime,
    tomethgofabiao() {
      this.CheckUserProcessPageAuth();
    },
    CheckUserProcessPageAuth() {
      this.$http.get("/BidCheckCenter/CheckUserProcessPageAuth", { params: { baseId: this.id } }).then(res => {
        if (res.data.success) {
          if (!res.data.returnValue1) {
            this.GetBidSendPageShow();
            this.GetBidDate1001();
            this.GetFileDownLoadLog();
          } else {
            this.$router.push({
              path: res.data.returnValue1,
            });
          }
        } else {
          this.$router.push({
            path: "/bid/notice/",
          });
        }
      });
    },
    mesto() {
      this.dialogVisibleto = true;
      this.GetSendSupplierContact1001();
    },
    GetSendSupplierContact1001() {
      this.$http.get("/BidSend/GetSendSupplierContact1001", { params: { bidModeId: this.id } }).then(res => {
        this.todatalist = res.data;
      });
      this.$http.get("/BidSend/GetSupplierMsg1001Content", { params: { bidModeId: this.id } }).then(res => {
        this.content = res.data.content;
      });
    },
    tosend() {
      this.$confirm("确认要发送短信吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.todatalist.length > 0) {
          let phoneList = this.todatalist.map(item => item.mobilePhone);
          let todata = {
            bidModeId: this.id,
            phoneList: phoneList,
            content: this.content,
          };
          this.$http.post("/BidSend/SendSupplierMsg1001", todata).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.dialogVisibleto = false;
              this.GetBidSendPageShow();
            } else {
              // this.$message.error(res.data.message);
              this.dialogVisibleto = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        }
      });
    },
    fabiaobtn() {
      // this.form.bidQaEndDate = "";
      // this.form.bidOpenDate = "";
      this.dialogVisible1 = true;
    },
    GetFileDownLoadLog() {
      this.$http.get("/BidSend/GetFileDownLoadLog", { params: { bidModeId: this.id } }).then(res => {
        this.fileDownLoadList = res.data.fileDownLoadList;
        this.comFullNameList = res.data.comFullNameList;
      });
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm("发标后将不能撤回，确定要执行发标吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let obj = {
              ...this.form,
              bidModeId: this.id,
            };
            this.$http.post("/BidMaster/SubmitBidFile", obj).then(res => {
              if (res.data.success) {
                this.$message.success(res.data.message);
                this.GetBidSendPageShow();
                this.GetBidDate1001();
                this.fabut = false;
                this.dialogVisible1 = false;
              } else {
                this.$alert(res.data.message, {
                  confirmButtonText: "确定",
                });
              }
            });
          });
        }
      });
    },
    GetBidDate1001() {
      this.$http.get("/bidMaster/GetBidDate1001", { params: { bidModeId: this.id } }).then(res => {
        this.form.bidQaEndDate = res.data.bidQaEndDate;
        this.form.bidOpenDate = res.data.bidOpenDate;
        // this.showtime = res.data;
        // let arr = [res.data.bidSendDate, res.data.qaEndTime, res.data.backEndTime, res.data.bidEndDate];
        // this.ulList.forEach((item, index) => {
        //   item.value = arr[index];
        // });
      });
    },
    GetBidSendPageShow() {
      this.loading = true;
      this.$http.get("/BidSend/GetBidSendPageShow", { params: { bidModeId: this.id } }).then(res => {
        this.showRefuseButton = res.data.auditButton.showRefuseButton;
        this.showPassButton = res.data.auditButton.showPassButton;
        this.auditMasterId = res.data.auditMasterId;
        // this.tableList = res.data.result;
        // console.log(res.data.attachList);
        this.tableList = res.data;
        // console.log(this.attachList);
        // if (this.attachList.length > 0) {
        //   this.attachList.forEach(e => {
        //     this.activeName1.push(e.sectionName);
        //   });
        // }
        // console.log(res.data.showSubmitButton);
        if (res.data.showSubmitButton == false) {
          this.fabut = false;
          this.pageMessage = res.data.pageMessage;
        } else {
          this.fabut = true;
        }
        this.loading = false;
      });
    },

    handleClick(e) {
      // console.log(e);
    },
    // submit() {
    //   this.loading1 = true;
    //   this.$http.post("/BidSend/SubmitSendFile?bidModeId=" + this.id).then(res => {
    //     if (res.data.success) {
    //       this.$message.success(res.data.message);
    //       this.GetBidSendPageShow();
    //     } else {
    //       this.$message.error(res.data.message);
    //     }
    //     this.loading1 = false;
    //   });
    // },
    handleChange(row) {
      let obj = [
        {
          sectionId: row.sectionId,
          supplierId: row.supplierId,
          comShortName: row.comShortName,
        },
      ];
      this.$http.post("/BidSupplierIn/SaveComShortName", obj).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetBidSendPageShow();
          this.GetBidDate1001();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
    downLoad(id) {
      // window.location.href = process.env.VUE_APP_API_URL + url;
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad004?fileId=" + id);
    },
    downLoad1(fileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad004?fileId=" + fileId);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-button--danger:focus,
.el-button--danger :hover {
  background-color: #5e83da;
  border-color: #5e83da;
}
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
.mesgContent {
  display: flex;
  justify-content: space-between;
}
</style>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 0px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card__body {
  padding: 0px;
}

.box-card {
  /*width: 480px;*/
}
.el-card__header {
  height: 60px;
  /*padding: 18px 20px;*/
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
</style>
