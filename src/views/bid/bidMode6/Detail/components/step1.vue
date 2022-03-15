<template>
  <div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right">项目或期区名称：</td>
          <td>
            {{ form.projectName }}
          </td>
          <td class="right">招标方式：</td>
          <td>
            {{ form.bidInviteType }}
          </td>
        </tr>
        <tr>
          <td class="right">方案名称：</td>
          <td>
            {{ form.modeName }}
          </td>
          <td class="right">招标方式：</td>
          <td>
            {{ form.purchaseType }}
          </td>
        </tr>
        <tr>
          <td class="right">招标专业名称：</td>
          <td>
            {{ form.bidCateName }}
          </td>
          <td class="right">是否公开报名：</td>
          <td>
            {{ form.openRegistration ? "是" : "否" }}
          </td>
        </tr>
        <tr>
          <td class="right">项目经理：</td>
          <td>
            {{ form.haveManager ? "有" : "无" }}
          </td>
          <td class="right">是否立项：</td>
          <td>
            {{ form.setUpFlag ? "是" : "否" }}
          </td>
        </tr>
        <tr>
          <td class="right">经办日期：</td>
          <td>
            {{ form.creationTime }}
          </td>
          <td class="right">经办人：</td>
          <td>
            {{ form.editUserName }}
          </td>
        </tr>
        <tr>
          <td class="right">招标保证金：</td>
          <td>{{ form.cashDeposit }} 万元</td>
          <td class="right">质保金：</td>
          <td>{{ form.cashQuality }} 万元</td>
        </tr>
        <tr>
          <td class="right">建筑面积(平方米)：</td>
          <td>
            {{ form.jzSquare }}
          </td>
          <td class="right">单方造价：</td>
          <td>{{ form.moneyPerSquare }} 元</td>
        </tr>
        <tr>
          <td class="right">招标主体：</td>
          <td>
            {{ form.bidBody }}
          </td>
          <td class="right">招标范围说明：</td>
          <td>
            {{ form.bidScope }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["id"],
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
      if (this.$route.params.baseId) {
        return this.$route.params.baseId;
      } else {
        return this.id;
      }
    },
  },
  mounted() {
    this.getBaseInfo();
  },
  methods: {
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
