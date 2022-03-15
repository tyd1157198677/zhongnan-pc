<template>
  <div class="overFl">
    <el-steps style="margin-bottom: 10px" align-center>
      <el-step v-for="(item, index) in list" :key="index" :status="item.isFinish ? 'success' : ''">
        <span slot="icon">
          <i :class="item.isFinish ? 'el-icon-success' : 'el-icon-odometer'"></i>
        </span>
        <span slot="title" style="line-height: 10px">
          {{ item.activityName }}
        </span>
        <!-- <span :class="index == activePath ? 'el-icon-caret-right' : ''"></span> -->
        <div slot="description" class="setColor">
          <div v-for="(item1, index) in item.approveUser" :key="index">
            <div class="king">
              <i style="vertical-align: middle" :class="item1.isTrue ? 'el-icon-success' : 'el-icon-odometer'"></i>
              <span style="margin-left: 5px">{{ item1.userName }}</span>
            </div>
          </div>
        </div>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      activePath: 1,
      purchaseType: "",
      id: this.$route.query.id,
      masterId: this.$route.query.masterId,
      list: [],
      tableData: [],
      total: 0,
      tableData1: [],
      total1: 0,
      tableData2: [],
      total2: 0,
    };
  },
  computed: {
    active() {
      if (this.purchaseType == "零星采购") {
        if (this.total == 0) {
          return 0;
        } else if (this.total == 1 && this.total2 == 0) {
          return 1;
        } else {
          return 2;
        }
      } else {
        if (this.total == 0 && this.total1 == 0 && this.total2 == 0) {
          return 0;
        } else if (this.total > 0 && this.total1 == 0 && this.total2 == 0) {
          return 1;
        } else if (this.total > 0 && this.total1 > 0 && this.total2 == 0) {
          return 2;
        } else {
          return 3;
        }
      }
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.GetPlanRequireList();
  },
  methods: {
    //计划列表
    GetPlanRequireList() {
      let path = this.$route.path;
      if (path.indexOf("bidrequireshowdet") > -1) {
        this.activePath = 0;
      } else if (path.indexOf("supplierInDetail") > -1) {
        this.activePath = 1;
      } else {
        this.activePath = 2;
      }
      let obj = {
        name: this.type,
        masterId: this.id || this.masterId,
      };
      this.$http.get("/WflowApproveLogsAppServices/getProcessAll", { params: obj }).then((res) => {
        if (res.data.success) {
          this.list = res.data.workFlowLine;
          this.total = res.data.workFlowLine.length;
          //   if (this.total > 0) {
          //     this.purchaseType = this.tableData[0].purchaseType;
          //     if (this.purchaseType == "零星采购") {
          //       this.list = ["计划信息", "定标信息"];
          //     } else {
          //       this.list = ["计划信息", "入围信息", "定标信息"];
          //     }
          //   }
        }
      });
    },
    handleClick(i) {
      if (i == 0) {
        if (this.total > 0) {
          let row = this.tableData[0];
          console.log(row);
          this.$router.push({
            path: `/bid/bidrequireshowdet?id=` + row.id,
          });
        }
      } else if (i == 1) {
        if (this.total1 > 0) {
          let row = this.tableData1[0];
          this.$router.push({
            path: `/bid/supplierInDetail`,
            query: {
              id: row.id,
              bidModeId: row.bidModeId,
            },
          });
        }
      } else {
        if (this.total2 > 0) {
          let row = this.tableData2[0];
          this.$router.push({ path: "/bid/processDetailjianyi?id=" + row.bidModeId + "&isShowheader=" + true });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.overFl {
  overflow: auto;
}
::v-deep .el-step__title {
  line-height: 20px;
  font-size: 13px;
}
</style>
