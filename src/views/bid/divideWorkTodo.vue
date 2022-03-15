<!--  -->
<template>
  <div style="margin:0px auto 10px;margin-bottom: 65px;width:88%;">
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right" style="width:180px">项目名称：</td>
          <td>
            <span>{{ base.projectName }}</span>
          </td>
          <td class="right" style="width:150px">
            期区：
          </td>
          <td class="center">
            <span>{{ base.subProjectName }}</span>
          </td>
        </tr>
        <tr>
          <td class="right">
            业务事项：
          </td>
          <td class="center">
            <span>{{ base.otherPlanName }}</span>
          </td>
          <td class="right">
            招标计划名称：
          </td>
          <td class="center">
            <span>{{ base.planName }}</span>
          </td>
        </tr>
        <tr>
          <td class="right">需求负责人：</td>
          <td>
            <span>{{ base.editUserName }}</span>
          </td>
          <td class="right">
            招标状态：
          </td>
          <td class="center">
            <span>{{ base.planStatus }}</span>
          </td>
        </tr>
        <tr>
          <td class="right">项目需求日期：</td>
          <td>
            <span>{{ base.takeOnProjectDate }}</span>
          </td>
          <td class="right">计划完成日期：</td>
          <td>
            <span>{{ parseTime(base.bidEndDate, "yyyy-MM-dd") }}</span>
          </td>
        </tr>
        <tr>
          <td class="right">项目需求原因：</td>
          <td colspan="3">
            <span>{{ base.requireDesc }}</span>
          </td>
        </tr>
        <!-- <tr>
          <td class="right">招标计划编号：</td>
          <td colspan="3">
            <span>{{ base.planCode }}</span>
          </td>
        </tr> -->
        <!-- <tr>
          <td class="right">招标专业：</td>
          <td>
            <span>{{ base.bidCateName }}</span>
          </td>
          <td class="right">招标方式：</td>
          <td>
            <span>{{ base.purchaseType }}</span>
          </td>
        </tr>
        <tr>
          <td class="right">说明：</td>
          <td colspan="3">
            <span>{{ base.desc }}</span>
          </td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {},
  data() {
    return {
      base: {},
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.getBaseInfo();
  },
  methods: {
    parseTime,
    getBaseInfo() {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.baseId } }).then(res => {
        this.base = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
