<template>
  <el-card class="box-card" shadow="never" style="margin-top: 10px">
    <div class="text-right">
      <el-button type="primary" style="margin-bottom: 10px" size="mini" @click="addInfo">新增财务信息</el-button>
    </div>
    <el-table :data="datalist" ref="multipleTable" border>
      <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
      <el-table-column prop="bankOpenName" label="开户名称" align="center"> </el-table-column>
      <el-table-column prop="bankName" label="开户银行" align="center"> </el-table-column>
      <el-table-column prop="bankAccount" label="银行账号" align="center"> </el-table-column>
      <el-table-column prop="openAccountNum" label="银行行号" align="center"> </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <i slot="reference" class="el-icon-edit ml-2" title="编辑" @click="editRow(scope.row)"></i>
          <el-popconfirm title="确定删除吗?" @confirm="del(scope.row.id)">
            <i slot="reference" class="el-icon-delete ml-2" title="删除"></i>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="财务信息" :visible.sync="dialogVisible" width="40%">
      <el-form ref="bankForm" :model="bankForm" :rules="rules" label-width="100px" size="small">
        <!-- <div class="alert alert-warning" role="alert">温馨提示：资产负债表需经过第三方审计单位审核。成立不满三年的企业，仅填写近一年资产负债表即可。</div> -->
        <el-form-item label="开户名称" prop="bankOpenName">
          <el-input v-model="bankForm.bankOpenName" placeholder="对公账户名称：XX公司" maxlength="25"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bankName">
          <el-input v-model="bankForm.bankName" placeholder="如：中国建设银行XXX分行XXX支行" maxlength="25"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input
            maxlength="25"
            v-model="bankForm.bankAccount"
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
            placeholder="请输入银行账号"
            max="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行行号">
          <el-input v-model="bankForm.openAccountNum" placeholder="请输入银行行号" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="buttoncss" @click="onSubmit">保存财务信息</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      bankForm: {
        id: "",
        baseGuid: "",
        bankOpenName: "",
        bankName: "",
        bankAccount: "",
        openAccountNum: "",
      },

      dialogVisible: false,
      headers: {},
      fileList: [],
      datalist: [],
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
      },
    };
  },
  computed: {
    baseGuid() {
      return this.$route.query.id;
    },
  },
  mounted() {
    if (this.baseGuid) {
      this.bankForm.baseGuid = this.baseGuid;
      this.GetSupBankList();
    }
  },
  methods: {
    /**
     * 获取账号信息
     */
    GetSupBankList() {
      this.$http.get("/SupBankInfo/GetSupBankList", { params: { baseGuid: this.baseGuid } }).then((res) => {
        this.datalist = res.data.supBanks;
      });
    },
    addInfo() {
      Object.keys(this.bankForm).forEach((key) => {
        this.bankForm[key] = "";
      });
      this.dialogVisible = true;
    },
    /**
     * 保存
     */
    onSubmit() {
      this.$refs.bankForm.validate((valid) => {
        if (valid) {
          this.bankForm.baseGuid = this.baseGuid;
          this.$http
            .post("/SupBankInfo/SaveSupBankInfo", this.bankForm)
            .then((res) => {
              this.$msg.success("保存成功");
              this.GetSupBankList();
              this.$refs.bankForm.resetFields();
              this.dialogVisible = false;
            })
            .finally(() => {
              this.dialogVisible = false;
            });
        }
      });
    },
    del(id) {
      this.$http.post("/SupBankInfo/DeleteSupBankInfoById", { id }).then((res) => {
        this.$msg.success(res.data.message);
        this.GetSupBankList();
      });
    },
    editRow(row) {
      this.bankForm.id = row.id;
      this.bankForm.bankOpenName = row.bankOpenName;
      this.bankForm.bankName = row.bankName;
      this.bankForm.bankAccount = row.bankAccount;
      this.bankForm.openAccountNum = row.openAccountNum;
      this.dialogVisible = true;
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
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
  margin-left: 5px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 56%;
}
.uploadImg {
  width: 50px;
}
.el-upload {
  margin-left: 38px;
  text-align: center;
  cursor: pointer;
  outline: 0;
  width: 100px;
  height: 80px;
  padding-top: 15px;
}
</style>
