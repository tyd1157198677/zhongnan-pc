<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <showplan-menu />
      </el-col>
    </el-row>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招标入围</el-breadcrumb-item>
          <el-breadcrumb-item
            >入围相关信息<span style="color: red; margin-left: 10px" v-if="msg2">({{ this.msg2 }})</span></el-breadcrumb-item
          >
        </el-breadcrumb>
        <statusList></statusList>
        <el-form :model="form" ref="form" size="small" label-width="150px" class="mt-2">
          <div class="fromborder">
            <el-row>
              <el-col :span="12">
                <el-form-item label="投标保证金（元）" prop="deposit">
                  <el-input
                    v-model.number="form.deposit"
                    style="width: 200px"
                    min="0"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    placeholder=""
                  ></el-input>
                  <div style="color: red; margin-left: 10px">不填或0表示不收取投标保证金</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收款银行" prop="bankName">
                  <el-input v-model.number="form.bankName" style="width: 200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="收款账号" prop="bankAccount">
                  <el-input v-model.number="form.bankAccount" style="width: 200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分行信息" prop="bankAddress">
                  <el-input v-model="form.bankAddress" style="width: 200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="收取单位" prop="level">
                  <el-select v-model="form.level" placeholder="请选择">
                    <el-option v-for="item in dropDown.bidLevel" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="招标专业" prop="cateName">
                  <el-select v-model="form.cateName" placeholder="请选择">
                    <el-option v-for="item in dropDown.cateName" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="入围标准" prop="desc">
                  <el-input v-model="form.desc" type="textarea" style="width: 82%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <div style="float: right; color: red; margin-top: 15px; margin-bottom: 10px">必须先保存此模块后才能保存左侧其他模块内容</div>
            <el-button type="primary" style="float: left" class="buttoncss" size="small" @click="onSubmit" v-if="this.showButton"
              >保存信息</el-button
            >
            <el-button
              type="primary"
              style="float: left; margin-left: 10px"
              class="buttoncss"
              size="small"
              @click="back"
              v-if="this.showButton"
              >退回</el-button
            >
          </div>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import PlanMenu from "../components/PlanMenuDemoru.vue";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step2",
  components: { PlanMenu, showplanMenu, statusList: () => import("@/components/statusList.vue") },
  //inject: ['reload'],
  data() {
    return {
      form: {
        id: "00000000-0000-0000-0000-000000000000",
        bankAccount: "",
        bankAddress: "",
        bankName: "",
        cateName: "",
        deposit: 0,
        desc: "",
        level: "",
        planId: "",
      },
      tablerizhi: [],
      // planId: "",
      dropDown: {},
      type: 0,
      showButton: true,
      msg2: "",
      flag2: true,
    };
  },
  computed: {
    planId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else if (this.$route.params.id) {
        return this.$route.params.id;
      } else if (this.$route.params.baseId) {
        return this.$route.params.baseId;
      } else {
        return this.$route.query.baseId;
      }
    },
  },
  created: function () {
    // this.planId = this.$route.params.id;
    this.GetMasterDropDown01();
    this.$api.supIn.CheckCanEditBaseInfo({ planId: this.planId }).then((res) => {
      if (!res.success) {
        this.showButton = false;
      }
      this.$api.supIn.CheckEditSupplierInBase41({ planId: this.planId }).then((res) => {
        if (!res.success) {
          this.showButton = false;
          this.flag2 = false;
        }
        this.msg2 = res.message;
      });
    });
  },
  methods: {
    GetMasterByPlanId01() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res) => {
        if (res.planId != "00000000-0000-0000-0000-000000000000") {
          this.form = res;
        }
      });
    },
    GetMasterDropDown01() {
      this.$api.supIn.GetMasterDropDown01().then((res) => {
        this.dropDown = res;
        this.GetMasterByPlanId01();
      });
    },
    onSubmit() {
      if (!this.form.cateName || !this.form.level) {
        this.$msg.error("请将必填项填写完整");
        return;
      }
      if (this.form.deposit != 0) {
        if (!this.form.bankName || !this.form.bankAddress || !this.form.bankAccount) {
          this.$msg.error("如果保证金不为0，则收款银行，账号，分行信息必填");
          return;
        }
      }
      if (this.form.level == "请选择") {
        this.$msg.error("请选择收取单位");
        return;
      }
      this.form.planId = this.planId;
      this.$api.supIn.SaveMaster01(this.form).then((res) => {
        if (res.success) {
          this.$msg.success(res.message);
          this.GetMasterByPlanId01();
          this.$refs.money.GetMasterByPlanId01();
        } else {
          this.$msg.error(res.message);
        }
      });
    },
    back() {
      this.$confirm("确认要退回入围工作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          id: this.planId,
        };
        this.$http.post("/LiandoSupplierIn/ReturnMyWork", obj).then((res) => {
          if (res.data.success) {
            this.$router.push({
              path: "/bid/supInDemo",
            });
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
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
</style>
