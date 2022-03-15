<template>
  <el-main>
    <div style="margin-bottom: 40px;">
      <el-button size="mini" style="float: right" @click="$router.back(-1)">返回</el-button>
    </div>
    <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><b>招标计划信息</b></el-breadcrumb-item>
    </el-breadcrumb>
    <table class="layui-table el-table__body mt-3">
      <tbody>
        <tr>
          <td style="width: 20%" class="right">招标计划名称：</td>
          <td style="width: 30%">
            金茂悦招采计划
            <!-- {{ form.planName }} -->
          </td>
          <td style="width: 20%" class="right">招标方式：</td>
          <td style="width: 30%">
            邀请招标
            <!-- {{ form.purchaseType }} -->
          </td>
          <td style="width: 20%" class="right">招标层级：</td>
          <td style="width: 30%">
            全国
            <!-- {{ form.bidLevel }} -->
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">招标专业：</td>
          <td style="width: 30%">
            政府及垄断资源
            <!-- {{ form.bidCateName }} -->
          </td>
          <td style="width: 20%" class="right">合约规划金额：</td>
          <td style="width: 30%">
            <!-- {{ form.planMoney }}  -->
            1222万 元
          </td>
          <td style="width: 20%" class="right">计划开工日期：</td>
          <td style="width: 30%">
            2021-5-01
            <!-- {{ form.bidOpenDate }} -->
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">计划竣工日期：</td>
          <td style="width: 30%">
            2023-5-01
            <!-- {{ form.bidEndDate }} -->
          </td>
          <td style="width: 20%" class="right">招采计划分类：</td>
          <td style="width: 30%">
            开业采购
            <!-- {{ form.planCate }} -->
          </td>
          <td style="width: 20%" class="right">需求部门：</td>
          <td style="width: 30%">
            工程部
            <!-- {{ form.depName }} -->
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">所属项目：</td>
          <td style="width: 30%">
            南京江宁汇中空调项目1期
            <!-- {{ form.projectName }} -->
          </td>
          <td style="width: 20%" class="right">经办人：</td>
          <td style="width: 30%">
            <!-- {{ form.editUserName }} -->
            张钰
          </td>
          <td style="width: 20%" class="right"></td>
          <td style="width: 30%"></td>
        </tr>
      </tbody>
    </table>
    <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><b>定标单位信息</b></el-breadcrumb-item>
    </el-breadcrumb>
    <table class="layui-table el-table__body mt-3">
      <tbody>
        <tr>
          <td style="width: 150px" class="right">中标单位名称：</td>
          <td>
            深圳市筑奥景观建筑设计有限公司
            <!-- {{ form.planName }} -->
          </td>
          <td style="width: 150px" class="right">承接主体名称：</td>
          <td>
            深圳市筑奥景观建筑设计有限公司
            <!-- {{ form.purchaseType }} -->
          </td>
          <td style="width: 120px" class="right">中标金额：</td>
          <td style="width: 80px">
            500万
            <!-- {{ form.bidLevel }} -->
          </td>
          <td style="width: 120px" class="right">定标日期：</td>
          <td style="width: 120px">
            2021-5-01
            <!-- {{ form.bidLevel }} -->
          </td>
        </tr>
      </tbody>
    </table>
  </el-main>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
::v-deep .table-top-title {
  border-left: 4px solid #0f7fd2;
  // border-left: 4px solid #409eff;
}
</style>
