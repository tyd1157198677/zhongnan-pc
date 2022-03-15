<template>
  <div class="">
    <el-main>
      <div class="pub">招标计划信息</div>
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td class="right">项目名称：</td>
            <td colspan="3">{{ form.planName }}</td>
            <td class="right">招标计划名称：</td>
            <td colspan="3">{{ form.projectName }}</td>
          </tr>
          <tr>
            <td class="right">招标层级：</td>
            <td>
              {{ form.bidLevel }}
            </td>
            <td class="right">招标方式：</td>
            <td>
              {{ form.purchaseType }}
            </td>
            <td class="right">计划定标日期：</td>
            <td>
              {{ parseTime(form.bidEndDate, "yyyy-MM-dd") }}
            </td>
            <td class="right">招标专业：</td>
            <td>
              {{ form.bidCateName }}
            </td>
          </tr>
          <tr>
            <td class="right">需求部门：</td>
            <td>
              {{ form.depName }}
            </td>
            <td class="right">合约规划金额：</td>
            <td>
              {{ form.planMoney }}
            </td>
            <td class="right">建筑面积：</td>
            <td>
              {{ form.jzSquire }}
            </td>
            <td class="right">经办人：</td>
            <td>
              {{ form.bidUserName }}
            </td>
          </tr>
          <tr>
            <td class="right">经办日期：</td>
            <td>
              {{ parseTime(form.creationTime, "yyyy-MM-dd") }}
            </td>
            <td class="right">招标进度：</td>
            <td>
              {{ form.planStatus }}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="right">备注：</td>
            <td colspan="7">
              {{ form.requireDesc }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pub">基本信息</div>
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td class="right">中标单位:</td>
            <td>
              {{ form1.supplierName }}
            </td>
            <td class="right">中标金额（元）:</td>
            <td>
              {{ form1.finalWinPrice }}
            </td>
          </tr>
          <tr>
            <td class="right">相关说明:</td>
            <td colspan="3">
              {{ form1.winDesc }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pub">相关附件</div>
      <div>
        <el-row>
          <div class="sts"></div>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="fileslist">
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="附件名称" prop="fileName"> </el-table-column>
            <el-table-column label="附件大小" prop="fileSize" align="center" width="120"> </el-table-column>
            <el-table-column label="附件类型" prop="fileExtName" align="center" width="120"> </el-table-column>
            <!-- <el-table-column label="上传人" prop="bidProcessName"> </el-table-column> -->
            <el-table-column label="上传日期" prop="creationTime" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible" style="z-index:999999">
        <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
          <el-form-item label="文件名称" required>
            <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
          </el-form-item>
          <el-form-item label="选择文件">
            <el-upload
              class="upload-demo"
              ref="upload"
              :multiple="false"
              :action="api + '/api/FileUpload/BidWinAttachUpload1'"
              :on-change="beforeUpload"
              :before-remove="beforeRemove"
              :file-list="fileList"
              :auto-upload="false"
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
    </el-main>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: { peoUser: () => import("@/components/peoUser.vue") },
  data() {
    return {
      activeName: "1",
      id: "",
      data: {},
      rules: {
        supplierName: [{ required: true, message: "中标单位不能为空", trigger: "change" }],
        finalWinPrice: [{ required: true, message: "中标单位不能为空", trigger: "change" }],
      },
      selectSupVisible: false,
      dialogVisible: false,
      subloading: false,
      checkResult: "",
      form: {},
      reasons: [],
      form1: {},
      tabs: [],
      fileList: [],
      fileslist: [],
      zuzhangdata: [],
      activeNames: [],
      loading: false,
      uploadData: {
        FileName: "",
      },
      file: {},
      api: process.env.VUE_APP_API_URL,
      UploadfileList: [],
      loadingfile: false,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  created() {
    this.bidModeId = this.$route.query.bidModeId;
  },
  mounted() {
    this.GetSupplierDropDown3021();
    this.getList2();
  },
  methods: {
    parseTime,
    tomethgodingbiao() {
      this.CheckBidWin();
      if (this.activeName == "1") {
        this.$refs.faqi.tomethgofaqi();
      }
      if (this.activeName == "2") {
        this.$refs.mychild.tomethgotongzhi();
      }
      if (this.activeName == "3") {
        this.$refs.ziliao.ziliao();
      }
    },
    GetSupplierDropDown3021() {
      this.$http.get("/PurchaseModeLx/GetSupplierDropDown3021", { params: { bidModeId: this.bidModeId } }).then(res => {
        this.reasons = res.data;
        this.form1.supplierName = res.data.length > 0 ? res.data[0].value : "";
        this.GetPurchaseWinZw2021();
      });
    },
    GetPurchaseWinZw2021() {
      this.$http.get("/PurchaseModeZw/GetPurchaseWinZw2021?bidModeId=" + this.bidModeId).then(res => {
        this.form1 = res.data;
        this.planId = res.data.planId;
        this.GetOnePlanById();
      });
    },
    GetOnePlanById() {
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.planId } }).then(res => {
        this.form = res.data;
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
          this.loading = false;
          this.$message.error(res.message);
        }
      });
    },
    getList2() {
      this.$api.supIn.GetBidWinAttachList01({ bidModeId: this.bidModeId }).then(res => {
        this.fileslist = res;
        console.log(this.fileslist);
      });
    },
    onUploadPreview() {
      this.dialogVisible = true;
      this.uploadData.FileName = "";
      this.fileList = [];
      // this.$refs.upload.clearFiles();
    },
    headeuploadFile(item) {
      let that = this;
      const fileObj = item.file;
      const from = new FormData(); // FormData 对象
      from.append("file", fileObj);
      from.append("planId", this.planId);
      this.loadingfile = true;
      this.$axios
        .post("/api/FileUpload/BidProcessAttach4", from)
        .then(res => {
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
        .catch(err => {
          // console.log(err);
          this.$alert(err.data.message, {
            confirmButtonText: "确定",
          });
        });
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidWinAttachUpload1";
    },
    onDownload(id) {
      // window.open(process.env.VUE_APP_API_URL+file.filePath+file.fileReName)
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + id);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success) {
        this.$message.success(response.message);
        this.dialogVisible = false;
        this.loading = false;
        this.BidActionButton14();
        this.getList2();
      } else {
        this.$message.error(response.message);
      }
    },
    beforeUpload(file) {
      this.file = file;
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData = {
        FileName: name.substring(0, index),
      };
      console.log(this.uploadData.FileName);
    },
    onSubmit() {
      this.$refs.form1.validate(valid => {
        if (valid) {
          this.$http.post("PurchaseModeLx/SavePurchaseWin2021", this.form1).then(res => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.GetPurchaseWinZw2021();
            } else {
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              });
            }
          });
        } else {
          this.$msg.warning("请填写完必填项!");
        }
      });
    },
    onSubmitto() {
      this.$confirm("确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.subloading = true;
        this.$http.post("/PurchaseModeLx/SubmitPurchaseZwWin2021", { id: this.bidModeId }).then(res => {
          if (res.data.success == false) {
            console.log(res.data.success);
            this.checkResult = res.data.message;
            this.subloading = false;
          } else {
            this.subloading = false;
            if (res.data.message == "提交成功") {
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              });
            } else {
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
              this.subloading = false;
            }
            this.showmo = true;
            this.checkResult.length = 0;
          }
        });
      });
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
<style scoped>
::v-deep .el-main {
  overflow: hidden;
}
</style>
