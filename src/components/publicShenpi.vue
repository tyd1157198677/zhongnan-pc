<template>
  <div>
    <processtring :type="type" style="margin-top: 10px" ref="processtring"></processtring>
    <div v-if="rizhiList.length > 0">
      <div class="pub">审批日志</div>
      <el-card style="margin-bottom: 10px">
        <div style="margin-top: 10px">
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
        </div>
      </el-card>
    </div>
    <!-- <el-card style="margin-bottom: 10px"> -->
    <el-card style="margin-bottom: 10px" v-if="showPassButton || showRefuseButton">
      <el-form>
        <slot name="tabDown"></slot>
        <el-form-item label="审批意见：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="请输入审批意见"
            v-model="comments"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="text-align: right">
            <el-button v-if="showRefuseButton" size="mini" type="primary" style="margin-right: 10px" @click="omsubmit(0)">驳回</el-button>
            <el-button v-if="showPassButton" size="mini" type="primary" @click="omsubmit(1)">通过</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    processtring: () => import("@/components/processTring.vue"),
  },
  props: ["id", "urlSubmit", "urlRizhi", "showBtnUrl", "type"],
  data() {
    return {
      rizhiList: [],
      planId: "",
      comments: "",
      index: 0,
      showPassButton: false,
      showRefuseButton: false,
      fileslist: [],
    };
  },
  mounted() {
    this.EB_GetPlanChangeList();
    this.CheckShowStartBid1001();
  },
  methods: {
    parseTime,
    EB_GetPlanChangeList() {
      this.$http.get(this.urlRizhi, { params: { masterId: this.id } }).then((res) => {
        this.rizhiList = res.data;
      });
    },
    CheckShowStartBid1001() {
      this.$http.post(this.showBtnUrl, { masterId: this.id }).then((res) => {
        this.showPassButton = res.data.showPassButton;
        this.showRefuseButton = res.data.showRefuseButton;
      });
    },
    omsubmit(i) {
      if (i == 0 && !this.comments) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
        return false;
      }
      let str = i == 0 ? "驳回" : "通过";
      this.$confirm("确认要" + str + "审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          audit: i,
          masterId: this.id,
          comments: this.comments,
        };
        this.$http.post(this.urlSubmit, obj).then((res) => {
          if (res.data.result.success) {
            this.$msg.success(res.data.result.message);
            this.CheckShowStartBid1001();
            this.EB_GetPlanChangeList();
            this.$refs.processtring.GetPlanRequireList();
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pub {
  border-left: 3px solid #ea5514;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: #d9d6d6;
  margin-top: 6px;
  font-size: 13px;
  font-weight: 600;
}
</style>
