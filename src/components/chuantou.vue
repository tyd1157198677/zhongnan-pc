<template>
  <div>
    <div style="text-align: right; margin-bottom: 10px" v-if="canEdit">
      <el-button size="mini" type="primary" @click="omsubmit">发起入围审批</el-button>
    </div>
    <el-steps :active="active" finish-status="success" simple style="margin-bottom: 10px" v-if="active != 0">
      <el-step v-for="(item, index) in list" :key="index">
        <div slot="title" class="setColor" @click="handleClick(index)">
          {{ item }} <span :class="index == activePath ? 'el-icon-caret-right' : ''"></span>
        </div>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePath: 1,
      canEdit: false,
      row: {},
      purchaseType: "",
      id: this.$route.query.id,
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
        planId: this.id,
      };
      this.$http.get("/PurchasePlan/GetPurchasePlanList", { params: obj }).then((res) => {
        if (res.data.success) {
          this.tableData = res.data.result.items;
          this.total = res.data.result.totalCount;
          if (this.total > 0) {
            this.purchaseType = this.tableData[0].purchaseType;
            if (this.purchaseType == "零星采购") {
              this.list = ["计划信息", "定标信息"];
            } else {
              this.list = ["计划信息", "入围信息", "定标信息"];
              //入围列表
              this.$http.get("/ModeMasterAppServices/GetSupplierMasterList", { params: obj }).then((res) => {
                if (res.data) {
                  this.tableData1 = res.data.items;
                  this.total1 = res.data.totalCount;
                  if (this.total1 > 0) {
                    this.canEdit = this.tableData1[0].canEdit;
                    this.row = this.tableData1[0];
                  }
                }
              });
            }
            //定标列表
            this.$http.get("/BidWin/GetBidWinList", { params: obj }).then((res) => {
              this.tableData2 = res.data.result.items;
              this.total2 = res.data.result.totalCount;
            });
          }
        }
      });
    },
    omsubmit() {
      let row = this.row;
      this.$router.push({
        path: "/bid/supplierInChose",
        query: {
          id: row.id,
          bidModeId: row.bidModeId,
        },
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
.setColor {
  cursor: pointer;
}
</style>
