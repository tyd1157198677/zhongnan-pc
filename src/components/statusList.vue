<!--  -->
<template>
  <div class="">
    <el-steps style="margin-top:10px;background-color: #dff0d8;padding:10px;margin-bottom:10px" align-center>
      <el-step v-for="(item, index) in statusList" :key="index">
        <div :style="{ color: item.showFlag ? '' : '#ccc' }" slot="icon" :class="item.showFlag ? 'el-icon-success' : 'el-icon-error'"></div>
        <span slot="title" style="color:#333;font-size:13px">{{ item.processName }}</span>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: ["planId"],
  components: {},
  data() {
    return {
      statusList: [],
    };
  },
  computed: {
    planId1() {
      if (!this.planId) {
        return this.$route.query.id;
      } else {
        return this.planId;
      }
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.$http.get("/BidSupplierIn/GetSupplierInProcess1001", { params: { planId: this.planId1 } }).then(res => {
      this.statusList = res.data;
    });
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
