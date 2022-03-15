<template>
  <el-main>
    <el-row class="pt-3 pl-3 pr-3 mx-auto">
      <el-form ref="form" label-width="130px" size="small" :model="info" :rules="rules" class="m-3">
        <el-row>
          <!-- <el-col :span="8">
            <el-form-item label="报名截止时间" prop="signUpEndDate">
              <el-date-picker
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                v-model="info.signUpEndDate"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="计划发标日期" prop="bidSendDate">
              <el-date-picker type="date" v-model="info.bidSendDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="答疑截止时间" prop="bidQaEndDate">
              <el-date-picker
                type="datetime"
                v-model="info.bidQaEndDate"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="回标截止时间" prop="bidBackDate">
              <el-date-picker
                type="datetime"
                v-model="info.bidBackDate"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
                @change="same"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划开标时间" prop="bidOpenDate">
              <el-date-picker
                type="datetime"
                v-model="info.bidOpenDate"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="计划定标时间" prop="bidEndDate">
              <el-date-picker
                type="datetime"
                v-model="info.bidEndDate"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24" class="right">
            <el-button type="primary" size="small" :loading="loadingSave" @click="onSubmit">保存信息</el-button>
            <el-button size="small" @click="onCancle">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-main>
</template>

<script>
export default {
  inject: ["reload"],
  props: {
    // id,
    info: Object,
    required: true,
  },
  data() {
    return {
      form: {},
      loadingSave: false,
      loading: false,
      rules: {
        signUpEndDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        bidSendDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        bidQaEndDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        bidBackDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        bidOpenDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        bidEndDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        standardContractFlag: [{ required: true, message: "请选择", trigger: "blur" }],
        bidOpenType: [{ required: true, message: "请选择", trigger: "blur" }],
        bidPriceType: [{ required: true, message: "请选择", trigger: "blur" }],
        examMethod: [{ required: true, message: "请选择日期", trigger: "blur" }],
        techPercent: [{ required: true, message: "请输入技术权重", trigger: "blur" }],
        businessPercent: [{ required: true, message: "请输入商务权重", trigger: "blur" }],
        techQualifyScore: [{ required: true, message: "请输入技术合格分", trigger: "blur" }],
        businessExamType: [{ required: true, message: "请选择商务评标方式", trigger: "blur" }],
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  computed: {
    showSubmitApply() {
      return this.form.planStatus === "草稿";
    },
  },
  mounted() {
    this.GetBidMasterPageShow();
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadingSave = true;
          this.$http.post("/BidDate/ModifyPlanTime", this.info).then(res => {
            this.loadingSave = false;
            if (res.data.success) {
              this.$emit("onSubmit", res.data);
              this.$message.success(res.data.message);
              this.$refs.form.clearValidate();
              this.GetBidMasterPageShow();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    same() {
      this.info.bidOpenDate = this.info.bidBackDate;
    },
    GetBidMasterPageShow() {
      // console.log(this.id);
      this.$http.get("/BidMaster/GetBidMasterPageShow", { params: { bidModeId: this.id } }).then(res => {
        // let info = res.data;
        // let that = this;
        this.info = res.data.baseInfo;
      });
    },
    onCancle() {
      this.$refs.form.clearValidate();
      this.$emit("onCancle");
      this.GetBidMasterPageShow();
    },
    onSubmitApply() {
      // this.$confirm("您确认要提交信息吗?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      //   this.loading = true;
      //   this.$api.BidPlan.SubmitPlan(this.form.id)
      //     .then(() => {
      //       this.$msg.success("提交成功");
      //     })
      //     .finally(() => {
      //       this.loading = false;
      //       this.reload();
      //     });
      // });
    },
  },
};
</script>

<style scoped>
.el-select,
.el-input {
  width: 13rem;
}

.el-form-item {
  margin-bottom: 10px;
}

.mh {
  min-height: 500px;
}

.el-main {
  width: 100%;
}
</style>
