<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu-other />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>计划节点</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="form" :rules="rules" ref="form" :inline="true" label-width="220px" class="mt-2">
          <div class="fromborder">
            <el-form-item label="方案确认日期" prop="modeConfirmDate">
              <el-date-picker type="date" v-model="form.modeConfirmDate" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="供方考察日期" prop="supplierInvesDate">
                            <el-date-picker
                            type="date"
                            v-model="form.supplierInvesDate"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="图纸技术条件提供日期" prop="dwgFileDate">
                            <el-date-picker
                            type="date"
                            v-model="form.dwgFileDate"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="清单编制、招采文件完成日期" prop="listEditDate">
                            <el-date-picker
                            type="date"
                            v-model="form.listEditDate"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item> -->
            <!-- <el-form-item label="计划发标时间" prop="bidSendDate">
                            <el-date-picker
                            type="datetime"
                            v-model="form.bidSendDate"
                            value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择时间">
                            </el-date-picker>
                        </el-form-item> -->
            <!-- <el-form-item label="计划开标时间" prop="bidOpenDate">
                            <el-date-picker
                            type="datetime"
                            v-model="form.bidOpenDate"
                            value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择时间">
                            </el-date-picker>
                        </el-form-item> -->
            <el-form-item label="计划定标时间" prop="bidEndDate">
              <el-date-picker type="datetime" v-model="form.bidEndDate" value-format="yyyy-MM-dd HH:mm" placeholder="选择时间">
              </el-date-picker>
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
 * 招标采购-计划节点
 */
import PlanMenuOther from "../components/PlanMenuOther";

export default {
  name: "Step2",
  components: { PlanMenuOther },
  inject: ["reload"],
  data() {
    return {
      form: {
        id: "",
        baseId: "",
        modeConfirmDate: "",
        // supplierInvesDate: '',
        // dwgFileDate: '',
        // listEditDate: '',
        // bidSendDate: '',
        // bidOpenDate: '',
        bidEndDate: "",
      },
      rules: {
        modeConfirmDate: [{ required: true, message: "请填写方案确认日期", trigger: "blur" }],
        listEditDate: [{ required: true, message: "请填写清单编制、招采文件完成日期", trigger: "blur" }],
        bidSendDate: [{ required: true, message: "请填写计划发标时间", trigger: "blur" }],
        bidOpenDate: [{ required: true, message: "请填写计划开标时间", trigger: "blur" }],
        bidEndDate: [{ required: true, message: "请填写计划定标时间", trigger: "blur" }],
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
     * 查询当前方案计划节点
     */
    getBaseInfo() {
      this.$api.BidDate.GetBidModeDateByBaseId(this.baseId).then((res) => {
        Object.assign(this.form, res);
      });
    },
    /**
     * 保存
     */
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          this.$api.BidDate.SaveBidModeDate(this.form)
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
</style>
