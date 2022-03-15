<template>
  <div class="border p-3">
    <p>资质及等级（不低于）：{{ cerInfos }}</p>
    <p>注册资金（不低于）：{{ form.regCapitalMin }}万元</p>
    <p>既往业绩要求： {{ form.caseRequire }}</p>
    <p>项目经理团队要求：{{ form.managerRequire }}</p>
    <p>其他入围要求：{{ form.otherRequire }}</p>
  </div>
</template>

<script>
/**
 * 招标采购-入围标准
 */
export default {
  name: "step4",
  components: {},
  props: ["id"],
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
    cerInfos() {
      const names = this.form.cerInfos.map(c => c.cerName).join(",");
      return names;
    },
  },
  created: function() {
    this.getBaseInfo();
  },
  methods: {
    /**
     * 查询当前方案入围标准
     */
    getBaseInfo() {
      this.$api.BidModeRequire.GetOneBidModeRequireById(this.baseId).then(res => {
        Object.assign(this.form, res);
      });
    },
  },
};
</script>
