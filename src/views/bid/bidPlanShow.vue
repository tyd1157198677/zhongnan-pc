<template>
  <el-main>
    <el-row class="pt-3 pl-3 pr-3 mx-auto">
      <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>{{ form.projectName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ form.planName }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" size="small" style="float:right;margin:10px 0" @click="backList">返回</el-button>
      <table class="layui-table el-table__body mt-3">
        <tbody>
          <tr>
            <td style="width: 20%" class="right">招标计划名称：</td>
            <td style="width: 30%">
              {{ form.planName }}
            </td>
            <td style="width: 20%" class="right">招标方式：</td>
            <td style="width: 30%">
              {{ form.purchaseType }}
            </td>
            <td style="width: 20%" class="right">招标层级：</td>
            <td style="width: 30%">
              {{ form.bidLevel }}
            </td>
          </tr>
          <tr>
            <td style="width: 20%" class="right">招标专业：</td>
            <td style="width: 30%">
              {{ form.bidCateName }}
            </td>
            <td style="width: 20%" class="right">合约规划金额：</td>
            <td style="width: 30%">{{ form.planMoney }} 元</td>
            <!-- <td style="width: 20%" class="right">招标控制价：</td>
                        <td style="width: 30%">
                            {{ form.limitMoney }} 元
                        </td> -->
            <!-- <td style="width: 20%" class="right">确认日期：</td>
            <td style="width: 30%">
              {{ form.confirmDate }}
            </td> -->
            <td style="width: 20%" class="right">计划开工日期：</td>
            <td style="width: 30%">
              {{ form.bidOpenDate }}
            </td>
          </tr>
          <tr>
            <!-- <td style="width: 20%" class="right">发标日期：</td>
            <td style="width: 30%">
              {{ form.bidSendDate }}
            </td> -->
            
            <td style="width: 20%" class="right">计划竣工日期：</td>
            <td style="width: 30%">
              {{ form.bidEndDate }}
            </td>
            <td style="width: 20%" class="right">招采计划分类：</td>
            <td style="width: 30%">
              {{ form.planCate }}
            </td>
            <td style="width: 20%" class="right">需求部门：</td>
            <td style="width: 30%">
              {{ form.depName }}
            </td>
          </tr>
          <tr>
            
            <td style="width: 20%" class="right">所属项目：</td>
            <td style="width: 30%">
              {{ form.projectName }}
            </td>
            <td style="width: 20%" class="right">经办人：</td>
            <td style="width: 30%">
              {{ form.editUserName }}
            </td>
            <td style="width: 20%" class="right"></td>
            <td style="width: 30%">
              <!-- {{ form.addModeFlag }} -->
            </td>
          </tr>
          <!-- <tr>
            
            
            <td style="width: 20%" class="right"></td>
            <td style="width: 30%"></td>
          </tr> -->
        </tbody>
      </table>
    </el-row>
    <el-row class="right p-3">
      <el-button type="primary" size="small" :loading="loading" v-if="showSubmit" @click="onSubmit">提交审核</el-button>
    </el-row>
  </el-main>
</template>

<script>
import bus from "@/util/bus";
export default {
  inject: ["reload"],
  data() {
    return {
      form: {
        id: "",
        projectId: "",
        projectName: "",
        planCate: "",
        planName: "",
        purchaseType: "",
        bidLevel: "",
        bidCateId: "",
        bidCateName: "",
        planMoney: 0,
        limitMoney: 0,
        confirmDate: "",
        bidSendDate: "",
        bidOpenDate: "",
        bidEndDate: "",
        depName: "",
        addModeFlag: false,
        planStatus: "",
      },
      loading: false,
    };
  },
  computed: {
    showSubmit() {
      return this.form.planStatus === "草稿";
    },
  },
  mounted() {
    // bus.$emit("hideNav");
    this.form.id = this.$route.query.id || "";
    this.loadForm();
  },
  methods: {
    loadForm() {
      this.$api.BidPlan.GetOneBidPlanById(this.form.id).then(res => {
        this.form = res;
      });
    },
    backList() {
      this.$router.replace({
        path: "/bid/bidPlan",
      });
    },
    onSubmit() {
      this.$confirm("您确认要提交信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        this.$api.BidPlan.SubmitPlan(this.form.id).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.$router.replace({
              path: "/bid/bidPlan",
            });
          } else {
            this.$msg.error(res.message);
          }
          this.loading = false;
        });
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
</style>
