<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <showplan-menu />
      </el-col>
    </el-row>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招标入围</el-breadcrumb-item>
          <el-breadcrumb-item>招标计划</el-breadcrumb-item>
        </el-breadcrumb>
        <statusList></statusList>
        <el-form :model="form" ref="form" size="small" :inline="true" label-width="150px" class="mt-2">
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
                  <span style="margin-right: 10px">{{ this.data1.presidentUserName }}</span
                  ><span style="margin-right: 10px">{{ this.data1.presidentAltUserName }}</span
                  ><span style="margin-right: 10px">{{ this.data1.presidentOtherUserName }}</span>
                </td>
              </tr>
              <tr>
                <td style="width: 20%" class="right">审计经办人：</td>
                <td style="width: 30%">
                  <span style="margin-right: 10px">{{ this.data1.auditUserName }}</span
                  ><span style="margin-right: 10px">{{ this.data1.auditAlternativesUserName }}</span>
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
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import PlanMenu from "../components/PlanMenuDemoru.vue";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step1",
  components: { PlanMenu, showplanMenu, statusList: () => import("@/components/statusList.vue") },
  data() {
    return {
      form: {},
      data1: {},
      planId: "",
      tablerizhi: [],
    };
  },
  created: function () {
    this.planId = this.$route.query.id;
  },
  mounted() {
    this.$api.supIn.GetOnePlanById({ planId: this.planId }).then((res) => {
      this.data1 = res;
    });
  },
  methods: {},
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 2% 0 120px;
  height: 100%;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: #ffffff;
  position: relative;
  /* width: 88%; */
  border-radius: 10px 10px 0 0;
  overflow: auto;
}

.buttoncss {
  float: right;
  margin-top: 12px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}

::v-deep .el-input {
  width: 300px;
}

::v-deep .el-textarea {
  width: 760px;
}

::v-deep .el-form-item {
  margin-bottom: 10px;
}
</style>
