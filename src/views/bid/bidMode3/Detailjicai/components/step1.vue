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
          <td class="right">竞争性判断原因：</td>
          <td>
            {{ form.cause }}
          </td>
        </tr>
        <tr>
          <td class="right">招标方式：</td>
          <td>
            {{ form.bidInviteType }}
          </td>
          <td class="right">招标层级：</td>
          <td>
            {{ form.bidLevel }}
          </td>
        </tr>
        <tr>
          <td class="right">招标计划名称：</td>
          <td>
            {{ form.planName }}
          </td>
          <td class="right">计价方式：</td>
          <td>
            {{ form.bidPriceType }}
          </td>
        </tr>
        <tr>
          <td class="right">评标办法：</td>
          <td>
            {{ form.evaluateType }}
          </td>
          <td class="right">招采计划分类：</td>
          <td>
            {{ form.planCate }}
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
          <td>
            {{ form.desc }}
          </td>
          <td class="right">经办单位：</td>
          <td>
            {{ form.orgFullName }}
          </td>
        </tr>
        <tr>
          <td class="right">经办人：</td>
          <td colspan="3">
            {{ form.editUserName }}
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
