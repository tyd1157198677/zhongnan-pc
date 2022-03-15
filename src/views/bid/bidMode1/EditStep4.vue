<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>计划节点</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="form" :rules="rules" size="small" ref="form" label-width="220px" class="mt-2">
          <div class="fromborder">
            <el-form-item label="资质及等级（不低于）" prop="modeConfirmDate">
              <el-button type="primary" size="small" icon="el-icon-search" @click="certificateVisible = true">选择资质</el-button>
              <div>
                <el-tag v-for="c in form.cerInfos" :key="c.cerId" closable class="mr-2" type="danger">
                  {{ c.cerName }}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item label="注册资金（不低于）" prop="regCapitalMin">
              <el-input v-model.number="form.regCapitalMin">
                <template slot="append">（单位：万元）</template>
              </el-input>
            </el-form-item>
            <el-form-item label="既往业绩要求" prop="caseRequire">
              <el-input type="textarea" v-model="form.caseRequire" rows="5"></el-input>
            </el-form-item>
            <el-form-item label="项目经理团队要求" prop="managerRequire">
              <el-input type="textarea" v-model="form.managerRequire" rows="5"></el-input>
            </el-form-item>
            <el-form-item label="其他入围要求" prop="otherRequire">
              <el-input type="textarea" v-model="form.otherRequire" rows="5"></el-input>
            </el-form-item>
          </div>
          <el-form-item class="float-right">
            <el-button type="primary" class="buttoncss" size="small" @click="onSubmit">保存信息</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="certificateVisible">
      <certificate-tree title="【双击】选择资质要求，可选多个资质" :selectLast="true" @itemDbClick="onChangeCertificate" />
    </el-dialog>
  </el-main>
</template>

<script>
/**
 * 招标采购-入围标准
 */
import PlanMenu from "../components/PlanMenu";
import CertificateTree from "../components/CertificateTree";

export default {
  name: "Step4",
  components: { PlanMenu, CertificateTree },
  inject: ["reload"],
  data() {
    return {
      form: {
        id: "",
        baseId: "",
        cerInfos: [],
        regCapitalMin: 0,
        caseRequire: "",
        managerRequire: "",
        otherRequire: "",
      },
      certificateVisible: false,
      /** 资质列表 */
      cers: [],
      rules: {
        caseRequire: [
          { required: true, message: "请输入既往业绩要求", trigger: "blur" },
          { min: 1, max: 1000, message: "不超过1000个字", trigger: "blur" },
        ],
        managerRequire: [
          { required: false, message: "请输入项目经理团队要求", trigger: "blur" },
          { min: 1, max: 1000, message: "不超过1000个字", trigger: "blur" },
        ],
        regCapitalMin: [
          { required: true, message: "请填写最低资金要求", trigger: ["blur"] },
          { type: "number", message: "必须是数字" },
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
  },
  methods: {
    /**
     * 查询当前方案计划入围标准
     */
    getBaseInfo() {
      this.$api.BidModeRequire.GetOneBidModeRequireById(this.baseId).then((res) => {
        Object.assign(this.form, res);
      });
    },
    /**
     * 选择供方资质
     */
    onChangeCertificate(cer) {
      this.form.cerInfos.push({
        cerId: cer.id,
        cerName: cer.cateName,
      });
      this.certificateVisible = false;
    },
    /**
     * 保存
     */
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          this.$api.BidModeRequire.InsertOrUpdateBidModeRequire(this.form)
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

.fromborder /deep/ [class^="el-icon-"],
[class*=" el-icon-"] {
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  text-transform: none;
}
</style>
