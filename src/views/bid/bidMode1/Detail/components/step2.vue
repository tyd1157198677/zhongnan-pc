<template>
  <div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right">直接委托原因：</td>
          <td>
            {{ form.modeConfirmDate }}
          </td>
          <td class="right">委托供方：</td>
          <td>
            {{ form.supplierInvesDate }}
          </td>
        </tr>
        <tr>
          <td class="right">备注：</td>
          <td colspan="3">
            {{ form.bidEndDate }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/**
 * 招标采购-计划节点
 */
export default {
  name: "step2",
  components: {},
  props: ["id"],
  inject: ["reload"],
  data() {
    return {
      form: {
        id: "",
        baseId: "",
        modeConfirmDate: "",
        supplierInvesDate: "",
        dwgFileDate: "",
        listEditDate: "",
        bidSendDate: "",
        bidOpenDate: "",
        bidEndDate: "",
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
  created: function() {
    this.getBaseInfo();
  },
  methods: {
    /**
     * 查询当前方案计划节点
     */
    getBaseInfo() {
      this.$api.BidDate.GetBidModeDateByBaseId(this.baseId).then(res => {
        Object.assign(this.form, res);
      });
    },
  },
};
</script>
