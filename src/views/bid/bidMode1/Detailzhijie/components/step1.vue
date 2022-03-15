<template>
  <div>
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
    <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="60%">
      <div>
        <!--<font style="color: red;margin-left: 60px;">*</font>请选择标段-->
        <!--<el-select placeholder="请选择标段" v-model="biaoDuan2" style="margin-left: 60px;">-->
        <!--<el-option  v-for="item in dropDown" :key="item.value" :label="item.text" :value="item.value"></el-option>-->
        <!--</el-select>-->
        <supplier-list @itemClick="onSelectSups" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SupplierList from "@/components/SupplierList";
export default {
  props: ["id"],
  data() {
    return {
      selectSupVisible: false,
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
        purchaseType: "",
        creationTime: "",
        bidInviteType: "",
      },
    };
  },
  computed: {
    baseId() {
      if (this.$route.params.baseId) {
        return this.$route.params.baseId;
      } else {
        return this.id;
      }
    },
  },
  mounted() {
    this.GetOnePlanById();
  },
  methods: {
    GetOnePlanById() {
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.baseId } }).then(res => {
        this.form = res.data;
      });
    },
    onSelectSups(sup) {
      var forms = { planId: this.planId, bidSignUpType: this.activeName, sectionId: this.biaoDuan, supplierId: sup.id };
      this.$api.supIn.SaveSupplier02(forms).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.GetSupplierInviteList02();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /**
     * 查询当前方案基本信息
     */
    getBaseInfo() {
      this.$api.BidModeMaster.GetBidModeBaseInfo(this.baseId).then(res => {
        console.log(res);
        Object.assign(this.form, res);
      });
    },
  },
};
</script>
