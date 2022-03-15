<template>
  <div>
    <table class="layui-table el-table__body mt-3">
      <tbody>
        <tr>
          <td style="width: 20%" class="right">项目名称：</td>
          <td style="width: 30%">
            {{ this.data1.projectName }}
          </td>
          <td style="width: 20%" class="right">期区：</td>
          <td style="width: 30%">
            {{ this.data1.subProjectName }}
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">招标计划名称(计划系统):</td>
          <td style="width: 30%">
            {{ this.data1.otherPlanName }}
          </td>
          <td style="width: 20%" class="right">计划完成日期(计划系统):</td>
          <td style="width: 30%" v-if="this.data1.bidEndDate">
            {{ this.data1.bidEndDate.substring(0, 10) }}
          </td>
          <td style="width: 30%" v-if="!this.data1.bidEndDate">
            {{ this.data1.bidEndDate }}
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">招标计划名称：</td>
          <td style="width: 30%">
            {{ this.data1.planName }}
          </td>
          <td style="width: 20%" class="right">招标层级：</td>
          <td style="width: 30%">
            {{ this.data1.bidLevel }}
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">需求负责人：</td>
          <td style="width: 30%">
            {{ this.data1.editUserName }}
          </td>
          <td style="width: 20%" class="right">招标经办人：</td>
          <td style="width: 30%">
            {{ this.data1.bidUserName }}
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">入围经办人：</td>
          <td style="width: 30%">
            {{ this.data1.supplierUserName }}
          </td>
          <td style="width: 20%" class="right">总裁三室经办人：</td>
          <td style="width: 30%">
            <span style="margin-right:10px">{{ this.data1.presidentUserName }}</span
            ><span style="margin-right:10px">{{ this.data1.presidentAltUserName }}</span
            ><span style="margin-right:10px">{{ this.data1.presidentOtherUserName }}</span>
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">审计经办人：</td>
          <td style="width: 30%">
            <span style="margin-right:10px">{{ this.data1.auditUserName }}</span
            ><span style="margin-right:10px">{{ this.data1.auditAlternativesUserName }}</span>
          </td>
          <td style="width: 20%" class="right">项目需求日期：</td>
          <td style="width: 30%" v-if="this.data1.confirmDate">
            {{ this.data1.confirmDate.substring(0, 10) }}
          </td>
          <td style="width: 30%" v-if="!this.data1.confirmDate">
            {{ this.data1.confirmDate }}
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">建筑面积：</td>
          <td style="width: 30%">{{ this.data1.jzSquire }}m²</td>
          <td style="width: 20%" class="right">需求原因：</td>
          <td style="width: 30%">
            {{ this.data1.requireDesc }}
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">招标专业：</td>
          <td style="width: 30%">
            {{ this.data1.bidCateName }}
          </td>
          <td style="width: 20%" class="right">入围完成日期：</td>
          <td style="width: 30%">
            {{ this.data1.supplierInDate }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Step1",
  data() {
    return {
      data1: {},
      planId: "",
    };
  },
  created: function() {
    this.planId = this.$route.query.id;
  },
  mounted() {
    this.$api.supIn.GetOnePlanById({ planId: this.planId }).then(res => {
      this.data1 = res;
    });
  },
  methods: {},
};
</script>
