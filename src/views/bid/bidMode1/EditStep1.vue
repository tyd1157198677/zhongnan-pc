<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>基本信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="form" :rules="rules" ref="form" size="small" :inline="true" label-width="150px" class="mt-2">
          <div class="fromborder">
            <el-form-item label="直接委托原因" prop="modeName">
              <el-select v-model="form.haveManager" placeholder="请选择">
                <el-option :value="true" label="有"></el-option>
                <el-option :value="false" label="无"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="委托供方" prop="cashDeposit">
              <el-input placeholder="请选择" @focus="selectSupVisible = true" v-model.number="form.cashDeposit"></el-input>
            </el-form-item>
            <!-- <el-form-item label="质保金(元)" prop="cashQuality">
              <el-input v-model.number="form.cashQuality"></el-input>
            </el-form-item>
            <el-form-item label="项目经理" prop="haveManager">
              <el-select v-model="form.haveManager" placeholder="请选择">
                <el-option :value="true" label="有"></el-option>
                <el-option :value="false" label="无"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否公开报名" prop="openRegistration">
              <el-select v-model="form.openRegistration" placeholder="请选择">
                <el-option :value="true" label="是"></el-option>
                <el-option :value="false" label="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否立项" prop="setUpFlag">
              <el-select v-model="form.setUpFlag" placeholder="请选择">
                <el-option :value="true" label="是"></el-option>
                <el-option :value="false" label="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="建筑面积(平方米)" prop="jzSquare">
              <el-input v-model.number="form.jzSquare"></el-input>
            </el-form-item>
            <el-form-item label="单方造价(元)" prop="moneyPerSquare">
              <el-input v-model.number="form.moneyPerSquare"></el-input>
            </el-form-item>
            <el-form-item label="招标主体" prop="bidBody">
              <el-input v-model="form.bidBody"></el-input>
            </el-form-item>
            <el-form-item label="邀标方式" prop="bidInviteType">
              <el-select v-model="form.bidInviteType" placeholder="请选择">
                <el-option v-for="item in dropDownGroup" :key="item.value" :value="item.value" :label="item.text"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="备注" prop="bidScope">
              <el-input type="textarea" v-model="form.bidScope"></el-input>
            </el-form-item>
          </div>
          <el-form-item class="float-right">
            <el-button type="primary" class="buttoncss" size="small" @click="onSubmit">保存信息</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="60%">
      <div>
        <supplier-list @itemClick="onSelectSups" />
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
/**
 * 招标采购-基本信息
 */
import PlanMenu from "../components/PlanMenu";
import SupplierList from "@/components/SupplierList";
export default {
  name: "Step1",
  components: { PlanMenu, SupplierList },
  inject: ["reload"],
  data() {
    return {
      selectSupVisible: false,
      dropDownGroup: [],
      form: {
        id: "",
        modeName: "",
        projectId: "",
        cashDeposit: 0,
        cashQuality: 0,
        haveManager: false,
        openRegistration: false,
        setUpFlag: false,
        jzSquare: 0,
        moneyPerSquare: 0,
        bidBody: "",
        bidScope: "",
        purchaseType: "",
        modeStatus: "",
        bidInviteType: "",
      },
      rules: {
        modeName: [
          { required: true, message: "请输入方案名称", trigger: "blur" },
          { min: 1, max: 50, message: "不超过50个字", trigger: "blur" },
        ],
        bidInviteType: [{ required: true, message: "请选择邀标方式", trigger: ["blur"] }],
        cashDeposit: [
          { required: true, message: "请填写投标保证金", trigger: ["blur"] },
          { type: "number", message: "必须是数字" },
        ],
        // cashQuality: [
        //     { required: true, message: '请填写质保金', trigger: ['blur'] },
        //     { type: 'number', message: '必须是数字'}
        // ],
        haveManager: [{ required: true, message: "请选择项目经理", trigger: ["blur", "change"] }],
        openRegistration: [{ required: true, message: "请选择项是否公开报名", trigger: ["blur", "change"] }],
        setUpFlag: [{ required: true, message: "请选择项是否立项", trigger: ["blur", "change"] }],
        bidBody: [{ required: true, message: "请填写招标主体", trigger: ["blur"] }],
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
  },
  methods: {
    onSelectSups(sup) {
      var forms = { planId: this.planId, bidSignUpType: this.activeName, sectionId: this.biaoDuan, supplierId: sup.id };
      this.$api.supIn.SaveSupplier02(forms).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
          this.GetSupplierInviteList02();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /**
     * 查询当前方案基本信息/api/services/app/LiandoPlan/CheckCanEditPlan01
     */
    getBaseInfo() {
      this.$api.BidModeMaster.GetOneBidMasterById(this.baseId).then((res) => {
        Object.assign(this.form, res);
      });
      this.$api.BidModeMaster.GetBidModeSearchDropDown().then((res) => {
        this.dropDownGroup = res.bidInviteType;
      });
    },
    /**
     * 保存信息
     */
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api.BidModeMaster.InsertOrUpdateBidModeMaster(this.form)
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

::v-deep .el-input {
  width: 300px;
}

::v-deep .el-textarea {
  width: 760px;
}

::v-deep .el-form-item {
  margin-bottom: 10px;
}
</style>
