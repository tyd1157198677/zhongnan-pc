<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu-other />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>基本信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="form" :rules="rules" ref="form" :inline="true" label-width="130px" class="mt-2">
          <div class="fromborder">
            <el-form-item label="项目名称">
              <el-input v-model="form.projectName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="方案名称" prop="modeName">
              <el-input v-model="form.modeName"></el-input>
            </el-form-item>
            <el-form-item label="计价方式" prop="bidPriceType">
              <el-select v-model="form.bidPriceType" placeholder="请选择">
                <el-option v-for="item in causeFrom" :key="item.value" :value="item.value" :label="item.text"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商务标占比(%)" prop="businessPercent">
              <el-input v-model.number="form.businessPercent"></el-input>
            </el-form-item>
            <el-form-item label="技术标占比(%)" prop="techPercent">
              <el-input v-model.number="form.techPercent"></el-input>
            </el-form-item>
            <el-form-item label="邀标方式" prop="bidInviteType">
              <el-select v-model="form.bidInviteType" placeholder="请选择">
                <el-option v-for="item in dropDownGroup" :key="item.value" :value="item.value" :label="item.text"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item class="float-right">
            <el-button type="primary" class="buttoncss" size="small" @click="onSubmit">保存信息</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
/**
 * 招标采购-基本信息
 */
import PlanMenuOther from "../components/PlanMenuOther";

export default {
  name: "Step1",
  components: { PlanMenuOther },
  inject: ["reload"],
  data() {
    return {
      causeFrom: {},
      dropDownGroup: [],
      form: {
        id: "",
        projectName: "",
        modeName: "",
        businessPercent: "",
        techPercent: "",
        bidPriceType: "",
        bidInviteType: "",
      },
      rules: {
        techPercent: [{ required: true, message: "请填写技术标占比", trigger: ["blur"] }],
        bidInviteType: [{ required: true, message: "请选择邀标方式", trigger: ["blur"] }],
        businessPercent: [{ required: true, message: "请填写商务标占比", trigger: ["blur"] }],
        bidPriceType: [{ required: true, message: "请选择计价方式", trigger: ["blur"] }],
        modeName: [
          { required: true, message: "请填写方案名称", trigger: ["blur"] },
          { min: 1, max: 50, message: "不超过50个字", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.getBaseInfo();
    this.getPersonRole();
  },
  methods: {
    /**
     * 查询当前方案基本信息
     */
    getBaseInfo() {
      this.$api.BidModeMaster.GetBidModeBaseInfo(this.baseId).then((res) => {
        Object.assign(this.form, res);
      });
      this.$api.BidModeMaster.GetBidModeSearchDropDown().then((res) => {
        this.dropDownGroup = res.bidInviteType;
      });
    },
    getPersonRole() {
      this.$api.BidModeMasterOther.GetBidPersonRole().then((res) => {
        this.causeFrom = res;
      });
    },
    /**
     * 保存信息
     */
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api.BidModeMasterOther.InsertOrUpdateBidModeMasterJiCai(this.form)
            .then((res) => {
              if (res.success) {
                this.$msg.success("保存成功");
                this.reload();
              } else {
                this.$msg.error(res.message);
              }
            })
            .finally(() => {});
        }
      });
    },
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
  /* width: 88%; */
  border-radius: 10px 10px 0 0;
  overflow: auto;
}

.buttoncss {
  float: right;
  margin-top: 12px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}

/deep/ .el-input {
  width: 300px;
}

/deep/ .el-textarea {
  width: 300px;
}

/deep/ .el-form-item {
  margin-bottom: 10px;
}
</style>
