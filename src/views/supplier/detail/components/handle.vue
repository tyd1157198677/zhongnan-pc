<template>
  <div>
    <div v-if="msg">
      <!-- <div v-if="false"> -->
      <!-- <div> -->
      <el-button type="primary" size="small" @click="repass">修改供方名称</el-button>
      <el-button type="primary" size="small" @click="dialogVisible1 = true">修改财务信息</el-button>
      <el-button type="primary" size="small" @click="dialogVisible2 = true">新增财务信息</el-button>
    </div>
    <el-dialog width="40%" title="修改供方名称" :visible.sync="dialogVisible">
      <el-form :model="userForm" :rules="userRules" ref="userForm" style="margin-top: 20px">
        <el-row>
          <el-form-item prop="password">
            <div style="float: left">供方名称：</div>
            <el-input
              size="small"
              v-model="userForm.comFullName"
              clearable
              style="float: left; width: 400px"
              minlength="8"
              placeholder="供方名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择文件" prop="attachId">
            <el-upload
              ref="imgUpload"
              class="upload-demo"
              :before-upload="beforeUpload"
              :on-remove="handleRemove"
              :http-request="imageChange"
              action="#"
              :file-list="fileList"
              :on-change="handleChange"
            >
              <el-button size="small" type="primary">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包、图片，单文件最大200M</div>
            </el-upload>
          </el-form-item>
        </el-row>
        <el-row>
          <el-button style="float: right; margin-top: 20px" type="primary" size="small" @click="submit">提交</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog width="70%" title="修改财务信息" :visible.sync="dialogVisible1" append-to-body>
      <bank-info ref="bank"></bank-info>
    </el-dialog>
    <el-dialog title="财务信息" :visible.sync="dialogVisible2" width="40%" append-to-body>
      <el-form ref="bankForm" :model="bankForm" :rules="rules" label-width="100px" size="small">
        <!-- <div class="alert alert-warning" role="alert">温馨提示：资产负债表需经过第三方审计单位审核。成立不满三年的企业，仅填写近一年资产负债表即可。</div> -->
        <el-form-item label="开户名称" prop="bankOpenName">
          <el-input v-model="bankForm.bankOpenName" placeholder="对公账户名称：XX公司" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bankName">
          <el-input v-model="bankForm.bankName" placeholder="如：中国建设银行XXX分行XXX支行" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input
            maxlength="30"
            v-model="bankForm.bankAccount"
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
            placeholder="清输入银行账号"
            max="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行行号">
          <el-input v-model="bankForm.openAccountNum" placeholder="请输入银行行号" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="选择文件" prop="attachId">
          <el-upload
            ref="imgUpload"
            class="upload-demo"
            :before-upload="beforeUpload"
            :http-request="imageChangetwo"
            :on-remove="handleRemove"
            action="#"
            :file-list="fileList"
            :on-change="handleChange"
          >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包、图片，单文件最大200M</div>
          </el-upload>
        </el-form-item>
        <el-form-item class="text-right">
          <el-button type="primary" class="buttoncss" @click="onSubmit">保存财务信息</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import bankInfo from "./bankInfo";
export default {
  components: {
    bankInfo,
  },
  data() {
    return {
      msg: false,
      fileList: [],
      list: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      bankForm: {
        attachId: "",
        baseGuid: "",
        bankOpenName: "",
        bankName: "",
        bankAccount: "",
        openAccountNum: "",
      },
      userForm: {
        attachId: "",
        comFullName: "",
      },
      userForm1: {
        id: "",
      },
      userRules: {
        comFullName: [{ required: true, message: "请输入供方名称", trigger: "blur" }],
        attachId: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.$refs.imgUpload.fileList.length == 0) {
                console.log(this.$refs.imgUpload.fileList.length);
                callback(new Error("请选择文件"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
      },
      rules: {
        bankOpenName: [{ required: true, message: "请输入开户名称", trigger: "blur" }],
        bankName: [
          { required: true, message: "请输入开户银行", trigger: "blur" },
          { min: 1, max: 30, message: "长度不超过30个字", trigger: "blur" },
        ],
        bankAccount: [
          { required: true, message: "请输入银行账号", trigger: "blur" },
          { min: 1, max: 30, message: "长度不超过30个字", trigger: "blur" },
        ],
        attachId: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.$refs.imgUpload.fileList.length == 0) {
                callback(new Error("请选择文件"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
      },
      userRules1: {
        id: [{ required: true, message: "请选择供方审核人", trigger: "blur" }],
      },
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    this.password();
    this.GetAuditUserList();
  },
  methods: {
    password() {
      this.$http.get("/UserAuth/CheckUserOperationRole").then((res) => {
        this.msg = res.data.success;
      });
    },
    GetAuditUserList() {
      this.$http.get("/SupAuditUser/GetAuditUserList", { params: { auditType: "供方入库审批人" } }).then((res) => {
        this.list = res.data;
      });
    },
    handleRemove(file, fileList, i) {
      this.fileList = [];
      this.userForm.attachId = "";
      this.bankForm.attachId = "";
    },
    imageChange(param) {
      let formData = new FormData();
      formData.append("file", param.file);
      formData.append("FileModuleName", "运维新增银行信息");
      this.$axios.post("/api/FileUpload/OperationCommonFile", formData).then((res) => {
        if (res.data.success) {
          this.userForm.attachId = res.data.result.returnValue1;
          this.$message.success(res.data.result.message);
          this.$refs.userForm.clearValidate("attachId");
        }
      });
    },
    imageChangetwo(param) {
      let formData = new FormData();
      formData.append("file", param.file);
      formData.append("FileModuleName", "运维_修改供应商名称");
      this.$axios.post("/api/FileUpload/OperationCommonFile", formData).then((res) => {
        if (res.data.success) {
          this.bankForm.attachId = res.data.result.returnValue1;
          this.$message.success(res.data.result.message);
          this.$refs.bankForm.clearValidate("attachId");
        }
      });
    },
    beforeUpload(file) {},
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    repass() {
      this.$api.SupBaseInfo.GetOneSupBaseInfoById(this.id).then((res) => {
        this.userForm.comFullName = res.comFullName;
        this.dialogVisible = true;
      });
    },
    submit() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.$http
            .post("/SupBaseInfo/UpdateSupName", { supId: this.id, supName: this.userForm.comFullName, fileId: this.userForm.attachId })
            .then((res) => {
              this.dialogVisible = false;
              res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
              this.fileList = [];
            });
        }
      });
    },
    /**
     * 保存
     */
    onSubmit() {
      this.$refs.bankForm.validate((valid) => {
        if (valid) {
          this.bankForm.baseGuid = this.id;
          this.bankForm.fileId = this.bankForm.attachId;
          this.$http
            .post("/SupBaseInfo/InsterBankMsg", this.bankForm)
            .then((res) => {
              if (res.data.success) {
                this.$msg.success("保存成功");
                this.$refs.bank.GetSupBankList();
                Object.keys(this.bankForm).forEach((key) => {
                  this.bankForm[key] = "";
                });
                this.dialogVisible2 = false;
                this.fileList = [];
              }
            })
            .finally(() => {
              this.dialogVisible2 = false;
              this.fileList = [];
            });
        }
      });
    },
  },
};
</script>

<style scoped></style>
