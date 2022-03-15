<template>
  <div>
    <el-card style="margin: 10px 0" v-if="rizhiList.length > 0">
      <el-row>
        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="rizhiList">
          <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
          <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
          <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
          <!-- <el-table-column prop="creationTime" width="180" label="待办时间" align="center">
              <template slot-scope="scope"
                ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column> -->
          <el-table-column prop="dealTime" width="180" label="处理时间" align="center">
            <template slot-scope="scope"
              ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
            >
          </el-table-column>
          <el-table-column prop="status" width="80" label="结果" align="center"> </el-table-column>
          <el-table-column label="意见/备注" prop="comments" align="center" show-overflow-tooltip> </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  props: ["urlRizhi", "id"],
  data() {
    return {
      rizhiList: [],
      planId: "",
      comments: "",
      index: 0,
      fileslist: [],
    };
  },
  mounted() {
    this.EB_GetPlanChangeList();
  },
  methods: {
    parseTime,
    EB_GetPlanChangeList() {
      this.$http.get(this.urlRizhi, { params: { masterId: this.id } }).then((res) => {
        this.rizhiList = res.data;
      });
    },
  },
};
</script>

<style></style>
