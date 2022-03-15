<template>
  <div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right">项目名称：</td>
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
          <td class="right">直接委托原因：</td>
          <td>
            {{ form.cause }}
          </td>
        </tr>
        <tr>
          <td class="right">直接委托申请描述：</td>
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
        Object.assign(this.form, res);
      });
    },
  },
};
</script>
