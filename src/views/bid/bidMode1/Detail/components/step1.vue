<template>
  <div>
    <div>
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td class="right">项目名称：</td>
            <td colspan="3">{{ form.planName }}</td>
            <td class="right">招标计划名称：</td>
            <td colspan="3">{{ form.projectName }}</td>
          </tr>
          <tr>
            <td class="right">招标层级：</td>
            <td>
              {{ form.bidLevel }}
            </td>
            <td class="right">招标方式：</td>
            <td>
              {{ form.purchaseType }}
            </td>
            <td class="right">计划定标日期：</td>
            <td>
              {{ parseTime(form.bidEndDate, "yyyy-MM-dd") }}
            </td>
            <td class="right">招标专业：</td>
            <td>
              {{ form.bidCateName }}
            </td>
          </tr>
          <tr>
            <td class="right">需求部门：</td>
            <td>
              {{ form.depName }}
            </td>
            <td class="right">合约规划金额：</td>
            <td>
              {{ form.planMoney }}
            </td>
            <td class="right">建筑面积：</td>
            <td>
              {{ form.jzSquire }}
            </td>
            <td class="right">经办人：</td>
            <td>
              {{ form.bidUserName }}
            </td>
          </tr>
          <tr>
            <td class="right">经办日期：</td>
            <td>
              {{ parseTime(form.creationTime, "yyyy-MM-dd") }}
            </td>
            <td class="right">招标进度：</td>
            <td>
              {{ form.planStatus }}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="right">备注：</td>
            <td colspan="7">
              {{ form.requireDesc }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  props: ["id"],
  components: { peoUser: () => import("@/components/peoUser.vue") },
  data() {
    return {
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
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.id;
      }
    },
  },
  mounted() {
    this.GetOnePlanById();
  },
  methods: {
    parseTime,
    /**
     * 查询当前方案基本信息
     */
    GetOnePlanById() {
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.baseId } }).then(res => {
        this.form = res.data;
      });
    },
  },
};
</script>
