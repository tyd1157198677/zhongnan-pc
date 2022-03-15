<template>
  <el-main>
    <el-form ref="form" label-position="left" :inline="true" label-width="180px" size="small" :model="info" :rules="rules" class="m-3">
      <el-row>
        <!-- <el-col :span="8">
          <el-form-item label="计划发标时间" prop="bidSendDate">
            <el-date-picker
              type="datetime"
              v-model="info.bidSendDate"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="答疑截止时间" prop="bidQaEndDate">
            <el-date-picker
              type="datetime"
              v-model="info.bidQaEndDate"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="回标截止时间" prop="bidBackDate">
            <el-date-picker
              type="datetime"
              v-model="info.bidBackDate"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="计划开标时间" prop="bidOpenDate">
            <el-date-picker
              type="date"
              v-model="info.bidOpenDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="评标办法" prop="examMethod">
            <el-select v-model="info.examMethod">
              <el-option :label="item.text" :value="item.value" v-for="(item, index) in selectList.examMethod" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :span="8" v-if="info.examMethod != '合理低价法'">
          <el-form-item label="技术权重(%)" prop="techPercent">
            <el-input v-model="info.techPercent" placeholder="请输入内容" :max="100" @input.native="onInput0_100"> </el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="技术权重(%)" prop="techPercent">
            <el-input v-model="info.techPercent" placeholder="请输入内容" :max="100" @input.native="onInput0_100"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商务权重(%)" prop="businessPercent">
            <el-input v-model="info.businessPercent" placeholder="请输入内容" :max="100" @input.native="onInput0_100"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="right">
          <el-button type="primary" size="small" :loading="loadingSave" @click="onSubmit">保存信息</el-button>
          <el-button size="small" @click="onCancle">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
export default {
  inject: ["reload"],
  props: {
    info: Object,
    required: true,
  },
  data() {
    return {
      selectList: {},
      projectVisible: false,
      categoryVisible: false,
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
  computed: {
    showSubmitApply() {
      return this.form.planStatus === "草稿";
    },
  },
  mounted() {
    this.GetBidMasterDropDowns();
  },
  methods: {
    onInput0_100(e) {
      this.$message.closeAll();
      // 验证是否是纯数字
      let isNumber = /^\d*$/.test(e.target.value);
      // 过滤非数字
      e.target.value = e.target.value.replace(/\D/g, "");
      if (!isNumber || e.target.value < 0 || e.target.value > 100) {
        this.$message.warning("只能输入0-100的整数");
      }
      e.target.value = (e.target.value >= 0 && e.target.value <= 100 && e.target.value.match(/^\d*/g)[0]) || null;
    },
    GetBidMasterDropDowns() {
      this.$http.get("/BidMaster/GetBidMasterDropDowns").then(res => {
        this.selectList = res.data;
      });
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadingSave = true;
          if (parseInt(this.info.techPercent) + parseInt(this.info.businessPercent) != 100) {
            this.$alert("技术权重+商务权重应该等于100", {
              confirmButtonText: "确定",
            });
            this.loadingSave = false;
          } else {
            this.$http.post("/LiandoBidMaster/UpdateLiandoBidMasterBase", this.info).then(res => {
              this.loadingSave = false;
              if (res.data.success) {
                this.$emit("onSubmit", res.data);
                this.$message.success(res.data.message);
                this.$refs["form"].clearValidate();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    },
    onCancle() {
      this.$refs["form"].clearValidate();
      this.$emit("onCancle");
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
