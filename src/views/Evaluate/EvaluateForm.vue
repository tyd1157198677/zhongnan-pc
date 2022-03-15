<template>
  <el-main style="margin-bottom: 120px;">
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">评价主体信息</div>
      <el-form ref="form" :inline="true" label-width="130px" :model="form" :rules="rules" class="m-3">
        <el-row>
          <el-form-item label="年份" prop="year">
            <el-select v-model="form.year" @change="onSelectedDrug">
              <el-option v-for="item in dropDownYear" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评价阶段" prop="stage">
            <el-select v-model="form.stage" @change="stageChange">
              <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="isEnable">
            <el-select v-model="form.isEnable">
              <el-option label="开启" :value="true"></el-option>
              <el-option label="关闭" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 2 }"></el-input>
          </el-form-item>
        </el-row>
        <el-row class="right mt-3" style="width: 93%">
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">保存信息</el-button>
            <el-button size="small" @click="onCancle">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
  </el-main>
</template>

<script>
// import KindNav from "./components/KindNav";
export default {
  components: {},
  data() {
    return {
      options: [],
      dropDownYear: {},
      form: {
        id: "",
        year: "",
        stage: "",
        desc: "",
        isEnable: "",
      },
      rules: {
        year: [{ required: true, message: "请选择年份", trigger: "blur" }],
        stage: [{ required: true, message: "请选择评价阶段", trigger: "blur" }],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }],
        isEnable: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$api.Evaluate.GetYearList().then(res => {
      this.dropDownYear = res;
    });
    this.$api.Evaluate.GetBidPersonRole().then(res => {
      this.options = res;
    });
    this.form = this.$route.query.row ? this.$route.query.row : {};
    console.log(this.$route);
  },
  methods: {
    onSelectedDrug(val) {
      this.form.year = val;
    },
    stageChange(val) {
      this.form.stage = val;
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.Evaluate.SaveEvalMain(this.form).then(res => {
            if (res.success) {
              this.$message.success("保存成功");
              this.$router.push({
                path: "/Evaluate/EvaluateMain",
              });
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    onCancle() {
      this.$router.push({
        path: "/Evaluate/EvaluateMain",
      });
    },
  },
};
</script>

<style scoped>
.el-select,
.el-input {
  width: 16rem;
}

.el-form-item {
  margin-bottom: 10px;
}

.mh {
  /*min-height:500px;*/
}
</style>
