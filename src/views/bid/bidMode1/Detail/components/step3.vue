<template>
  <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="shangwudata">
    <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
    <el-table-column label="标段" prop="sectionName" align="center"> </el-table-column>
    <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
    <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
    <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
  </el-table>
</template>

<script>
/**
 * 招标采购-标段信息
 */
export default {
  name: "step3",
  components: {},
  props: ["id"],
  inject: ["reload"],
  data() {
    return {
      shangwudata: [],
      form: {
        tableData: [],
      },
      loading: false,
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
  created: function() {},
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.$api.BidModeSection.GetBidModeSectionList(this.baseId).then(res => {
        this.form.tableData = res;
      });
    },
  },
};
</script>
