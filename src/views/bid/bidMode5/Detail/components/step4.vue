<template>
  <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="persons">
    <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
    <el-table-column width="110" label="姓名" prop="userName" align="center"> </el-table-column>
    <el-table-column label="部门" prop="depName" align="center">
      <template slot-scope="scope">
        {{ scope.row.depName }}
      </template>
    </el-table-column>
    <el-table-column label="评价类型" prop="bidPersonExam" align="center">
      <template slot-scope="scope">
        {{ scope.row.bidPersonExam }}
      </template>
    </el-table-column>
    <el-table-column label="角色">
      <template slot-scope="scope">
         {{ scope.row.bidRole }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      persons: [],
      rols: [],
      bidPersonExam: [],
    };
  },
  created() {
    if (this.id) {
      this.getPersons(this.id);
    }
  },
  methods: {
    getPersons(baseId) {
      this.$api.BidPerson.GetBidModePersonList(baseId).then(res => {
        this.persons = res;
      });
    },
  },
};
</script>

<style></style>
