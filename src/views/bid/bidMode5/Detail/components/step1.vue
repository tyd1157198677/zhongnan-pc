<template>
  <div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right">项目名称：</td>
          <td>
            {{ form.projectName }}
          </td>
          <td class="right">邀标方式：</td>
          <td>
            {{ form.bidInviteType }}
          </td>
        </tr>
        <tr>
          <td class="right">方案名称：</td>
          <td>
            {{ form.modeName }}
          </td>
          <td class="right">竞争性谈判原因：</td>
          <td>
            {{ form.cause }}
          </td>
        </tr>
        <tr>
          <td class="right">商务标占比(%)：</td>
          <td>
            {{ form.businessPercent }}
          </td>
          <td class="right">技术标占比(%)：</td>
          <td>
            {{ form.techPercent }}
          </td>
        </tr>
        <tr>
          <td class="right">申请描述：</td>
          <td colspan="3">
            {{ form.desc }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: "",
        projectName: "",
        modeName: "",
        cause: "",
        desc: "",
        businessPercent: "",
        techPercent: "",
        bidInviteType: "",
      },
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
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
        console.log("基本信息", res);
        Object.assign(this.form, res);
      });
    },
  },
};
</script>
