<template>
  <div>
    <div class="pub">
      <span>入围供方</span>
      <el-button type="primary" size="small" @click.stop="saveSup">保存信息</el-button>
    </div>
    <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="supplierList">
      <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
      <el-table-column label="供应商名称" prop="supplierName"> </el-table-column>
      <el-table-column label="主营专业" prop="supCateNames" align="center"> </el-table-column>
      <el-table-column label="注册资金" prop="regCapital" align="center">
        <template slot-scope="scope">
          {{ scope.row.regCapital + scope.row.regCapitalType }}
        </template>
      </el-table-column>
      <el-table-column label="报价总金额(含税)" prop="amount" align="center" width="130">
        <template slot-scope="scope">
          <el-input
            style="width: 100%"
            type="number"
            placeholder="报价总金额(含税)"
            v-model.trim="scope.row.amount"
            :min="1"
            :precision="2"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="报价总金额(不含税)" prop="amountNoTax" align="center" width="150">
        <template slot-scope="scope">
          <el-input
            style="width: 100%"
            type="number"
            placeholder="报价总金额(不含税)"
            v-model.trim="scope.row.amountNoTax"
            :min="1"
            :precision="2"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="商务联系人" align="center">
        <el-table-column label="姓名" align="center" width="130">
          <template slot-scope="scope">
            <el-input style="width: 100%" placeholder="姓名" v-model.trim="scope.row.personName"> </el-input>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center" width="170">
          <template slot-scope="scope">
            <el-input
              maxlength="11"
              minlength="11"
              @change="changes"
              style="width: 100%"
              placeholder="手机号"
              v-model.trim="scope.row.mobilePhone"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="职务" align="center" width="130">
          <template slot-scope="scope">
            <el-input style="width: 100%" placeholder="职务" v-model.trim="scope.row.workAs"> </el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <!-- <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete ml-2" title="删除" @click="onDownload(scope.row.id, 2)"></i>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="pub">中标单位</div>
    <el-form label-position="top" :model="form1" ref="form1" :rules="rules">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="中标单位" prop="supplierName">
            <el-select style="width: 100%" v-model.trim="form1.supplierName" placeholder="选择中标单位" @change="handleChange">
              <el-option v-for="item in supplierList" :key="item.supplierId" :label="item.supplierName" :value="item.supplierName">
              </el-option>
            </el-select>
            <!-- <el-input @focus="selectSupVisible = true" v-model="form1.supplierName" placeholder="中标单位" clearable></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="含税中标金额（元）" prop="winPrice">
            <el-input
              style="width: 100%"
              type="number"
              placeholder="含税中标金额（元）"
              v-model.trim="form1.winPrice"
              :min="1"
              :precision="2"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="不含税中标金额（元）" prop="excludingTaxPrice">
            <el-input
              style="width: 100%"
              type="number"
              placeholder="不含税中标金额（元）"
              v-model.trim="form1.excludingTaxPrice"
              :min="1"
              :precision="2"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="相关说明" prop="desc">
            <el-input style="width: 100%" type="textarea" v-model.trim="form1.desc"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="pub">
      <span>相关附件</span>
      <el-button type="primary" size="small" @click="dialogVisible = true">上传附件</el-button>
    </div>
    <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="fileslist">
      <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
      <el-table-column label="文件名称" prop="fileName" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.fileName + scope.row.fileExtName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件大小" prop="fileSize" align="center"> </el-table-column>
      <el-table-column label="上传日期" prop="creationTime" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传人" prop="userName" align="center"> </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
          <i v-if="scope.row.submitStatus != '审批完成'" class="el-icon-delete ml-2" title="删除" @click="deletes(scope.row.id)"></i>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right; margin-top: 10px">
      <el-button type="primary" size="small" @click="onSubmitto(1)">保存信息</el-button>
      <el-button type="primary" size="small" :loading="subloading" @click="onSubmitto(2)">提交定标审批</el-button>
    </div>
    <rizhi :id="$route.query.id" :urlRizhi="urlRizhi"></rizhi>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible" style="z-index: 999999">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
        <el-form-item label="文件名称" required>
          <el-select style="width: 100%" v-model.trim="uploadData.TempType" @change="handlechange">
            <el-option v-for="item in tempList" :key="item.value" :label="item.fileName" :value="item.fileName"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="uploadData.TempType == '其他附件'">
          <el-input style="width: 100%" placeholder="请填写文件名称" v-model.trim="uploadData.FileName"> </el-input>
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
            <div slot="tip" class="el-upload__tip" v-if="!texts">请选择文件名称</div>
            <div slot="tip" class="el-upload__tip" v-else>只能上传{{ texts }}，单文件最大{{ maxFileSize }}M</div>
          </el-upload>
          <el-button v-loading="loading" style="margin-left: 10px; float: right" size="small" type="success" @click="submitUpload"
            >上传</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="95%">
      <supplier-list @itemClick="onSelectSups" />
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  props: ["amount"],
  components: {
    rizhi: () => import("@/components/rizhi.vue"),
    supplierList: () => import("@/components/SupplierList.vue"),
  },
  data() {
    return {
      id: "",
      urlRizhi: "/WflowApproveLogsAppServices/EB_GetSimpleWinList",
      data: {},
      rules: {
        supplierName: [{ required: true, message: "中标单位不能为空", trigger: "blur" }],
        winPrice: [{ required: true, message: "中标金额不能为空", trigger: "blur" }],
        excludingTaxPrice: [{ required: true, message: "中标不含税金额不能为空", trigger: "blur" }],
        desc: [{ required: true, message: "相关说明不能为空", trigger: "blur" }],
      },
      selectSupVisible: false,
      dialogVisible: false,
      subloading: false,
      texts: "",
      maxFileSize: "",
      form: {},
      tempList: [],
      reasons: [],
      supplierList: [],
      form1: {
        supplierName: "",
        supplierId: "",
        winPrice: "",
        excludingTaxPrice: "",
        desc: "",
      },
      tabs: [],
      fileList: [],
      fileslist: [],
      zuzhangdata: [],
      activeNames: [],
      loading: false,
      uploadData: {
        TempType: "",
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
    this.bidModeId = this.$route.query.id;
  },
  mounted() {
    this.getList2();
    this.GetWinFileTempList();
    this.GetBidModeSupplierList1001();
  },
  methods: {
    parseTime,
    GetWinFileTempList() {
      this.$http.get("/BidFileConfig/GetWinFileTempList?bidModeId=" + this.bidModeId).then((res) => {
        this.tempList = res.data;
        this.getScaleing();
      });
    },
    changes(val) {
      if (!/^1[3456789]\d{9}$/.test(val)) {
        this.$msg.error("请输入正确的手机号");
      }
    },
    getScaleing() {
      this.$http.get("/ZhiWeiPurchaseAppServices/getScaleing?bidModeId=" + this.bidModeId).then((res) => {
        this.form1 = res.data;
      });
    },
    handlechange(val) {
      this.texts = this.tempList.find((e) => e.fileName == val).fileExt;
      this.maxFileSize = this.tempList.find((e) => e.fileName == val).maxFileSize;
    },
    //获取已添加供方列表
    GetBidModeSupplierList1001() {
      this.$http.get("/BidModeSupplier/GetBidModeSupplierList1001", { params: { baseId: this.bidModeId } }).then((res) => {
        this.supplierList = res.data.result;
      });
    },
    //保存供方信息
    saveSup() {
      for (var i = 0; i < this.supplierList.length; i++) {
        let amount = this.supplierList[i].amount;
        let amountNoTax = this.supplierList[i].amountNoTax;
        let mobilePhone = this.supplierList[i].mobilePhone;
        if (parseFloat(amount) < parseFloat(amountNoTax)) {
          this.$msg.error("不含税中标金额不能大于含税中标金额");
          return false;
        }
        if (parseFloat(amount) > parseFloat(this.amount)) {
          this.$alert(this.supplierList[i].supplierName + "报价总金额不能大于含税总限价", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (!/^1[3456789]\d{9}$/.test(mobilePhone)) {
          this.$message.error("请输入正确的手机号");
          return false;
        }
      }
      // if (rar) {
      let arr = this.supplierList.map((e) => {
        return {
          bidModeId: this.bidModeId,
          ...e,
        };
      });
      this.$http.post("/BidModeSupplier/SaveSupplierPersonList1001", arr).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.GetBidModeSupplierList1001();
        }
      });
      // }
    },
    onSelectSups(sup) {
      this.form1.supplierId = sup.id;
      this.form1.supplierName = sup.comFullName;
      this.$refs.form1.clearValidate(["supplierName"]);
      this.selectSupVisible = false;
    },
    handleChange(val) {
      let form = this.supplierList.find((v) => v.supplierName == val);
      console.log(form);
      this.form1.supplierName = form.supplierName;
      this.form1.supplierId = form.supplierId;
      this.form1.winPrice = form.amount;
      this.form1.excludingTaxPrice = form.amountNoTax;
    },
    submitUpload() {
      if (!this.uploadData.FileName && this.uploadData.TempType == "其他附件") {
        this.$message.error("请填写文件名称");
        return false;
      }
      this.loading = true;
      let f = new FormData();
      f.append("BidModeId", this.bidModeId);
      f.append("FileName", this.uploadData.TempType == "其他附件" ? this.uploadData.FileName : this.uploadData.TempType);
      f.append("TempType", this.uploadData.TempType);
      f.append("fileBix", this.file.raw);
      this.$api.supIn
        .BidWinAttachUpload1(f)
        .then((res) => {
          this.loading = false;
          if (res.success) {
            this.uploadData.FileName = "";
            this.uploadData.TempType = "";
            this.$refs.upload.clearFiles();
            this.$message.success(res.message);
            this.loading = false;
            this.dialogVisible = false;
            this.getList2();
          } else {
            this.loading = false;
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err.data.message);
        });
    },
    getList2() {
      this.$http.get("/BidWin/GetBidWinAttachList01?bidModeId=" + this.bidModeId).then((res) => {
        this.fileslist = res.data;
      });
    },

    onDownload(id) {
      // window.open(process.env.VUE_APP_API_URL+file.filePath+file.fileReName)
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + id);
    },
    deletes(id) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = { id };
        this.$http.post("/BidWin/DeleteBidWinAttach", obj).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.getList2();
          } else {
            // this.$msg.warning(res.data.message);
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    beforeRemove(file, fileList) {
      this.file = {};
    },

    beforeUpload(file) {
      this.file = file;
      let name = file.name;
      //   let index = name.lastIndexOf("\.");
      //   this.uploadData = {
      //     FileName: name.substring(0, index),
      //   };
    },

    onSubmitto(a) {
      console.log(a);
      for (var i = 0; i < this.supplierList.length; i++) {
        let amount = this.supplierList[i].amount;
        let amountNoTax = this.supplierList[i].amountNoTax;
        let mobilePhone = this.supplierList[i].mobilePhone;
        if (parseFloat(amount) < parseFloat(amountNoTax)) {
          this.$msg.error("不含税中标金额不能大于含税中标金额");
          return false;
        }
        if (parseFloat(amount) > parseFloat(this.amount)) {
          this.$alert(this.supplierList[i].supplierName + "报价总金额不能大于含税总限价", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (!/^1[3456789]\d{9}$/.test(mobilePhone)) {
          this.$message.error("请输入正确的手机号");
          return false;
        }
      }
      this.$refs.form1.validate((valid) => {
        if (valid) {
          if (parseFloat(this.form1.winPrice) > parseFloat(this.amount)) {
            this.$alert("含税中标金额不能大于含税总限价", {
              confirmButtonText: "确定",
            });
          } else if (parseFloat(this.form1.excludingTaxPrice) > parseFloat(this.form1.winPrice)) {
            this.$alert("不含税中标金额不能大于含税中标金额", {
              confirmButtonText: "确定",
            });
          } else {
            let supplierId = this.supplierList.find((v) => v.supplierName == this.form1.supplierName).supplierId;
            if (a == 1) {
              let obj = {
                bidModeId: this.bidModeId,
                supplierId: supplierId,
                winPrice: parseFloat(this.form1.winPrice),
                excludingTaxPrice: parseFloat(this.form1.excludingTaxPrice),
                desc: this.form1.desc,
              };
              // obj.bidModeId = this.bidModeId;
              // obj.excludingTaxPrice = parseFloat(obj.excludingTaxPrice);
              this.$http.post("/BidWin/InsertOrUpdateScaleing", obj).then((res) => {
                if (res.data.success) {
                  this.$msg.success(res.data.message);
                  this.getScaleing();
                } else {
                  this.$alert(res.data.message, {
                    confirmButtonText: "确定",
                  });
                }
              });
            } else {
              this.$confirm("确定要提交吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }).then(() => {
                let obj1 = {
                  bidModeId: this.bidModeId,
                  supplierId: supplierId,
                  amount: this.form1.winPrice,
                  amountNoTax: this.form1.excludingTaxPrice,
                  desc: this.form1.desc,
                };
                this.$http.post("/BidWin/SubmitSimpleBidWin1001", obj1).then((res) => {
                  if (res.data.success) {
                    this.$msg.success(res.data.message);
                    this.$emit("CheckBidWinSubmit1001");
                  } else {
                    this.$confirm(res.data.message, "提示", {
                      confirmButtonText: "确定",
                      type: "warning",
                    });
                  }
                });
              });
            }
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
}
::v-deep .el-form-item__label {
  height: 20px;
  line-height: 20px;
}
.pub {
  border-left: 3px solid #ea5514;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: #d9d6d6;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}
</style>
