<template>
  <div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right">方案确认日期：</td>
          <td>
            {{ form.modeConfirmDate }}
          </td>
          <td class="right">供方考察日期：</td>
          <td>
            {{ form.supplierInvesDate }}
          </td>
        </tr>
        <tr>
          <td class="right">图纸技术条件提供日期：</td>
          <td>
            {{ form.dwgFileDate }}
          </td>
          <td class="right">清单编制、招采文件完成日期：</td>
          <td>
            {{ form.listEditDate }}
          </td>
        </tr>
        <tr>
          <td class="right">计划发标时间：</td>
          <td>
            {{ form.bidSendDate }}
          </td>
          <td class="right">计划开标时间：</td>
          <td>
            {{ form.bidOpenDate }}
          </td>
        </tr>
        <tr>
          <td class="right">计划定标时间：</td>
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
