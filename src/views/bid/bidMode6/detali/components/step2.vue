<template>
  <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tabledata">
    <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
    <el-table-column prop="projectName" label="项目或期区名称"> </el-table-column>
    <el-table-column prop="planName" label="招标计划名称"> </el-table-column>
    <el-table-column prop="sectionName" label="标段名称" width="200"></el-table-column>
    <el-table-column prop="sectionOrder" label="排序序号" width="120" align="center"></el-table-column>
  </el-table>
</template>

<script>
/**
 * 招标采购-计划节点
 */
export default {
  name: "step2",
  components: {},
  props: ["id"],
  inject: ["reload"],
  data() {
    return {
      tabledata: [],
      form: {
        id: "",
        baseId: "",
        modeConfirmDate: "",
        supplierInvesDate: "",
        dwgFileDate: "",
        listEditDate: "",
        bidSendDate: "",
        bidOpenDate: "",
        bidEndDate: "",
      },
      // baseId: "",
    };
  },
  computed: {
    baseId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.id;
      }
    },
  },
  created: function() {
    // this.baseId = sessionStorage.getItem("bidModeId");
  },
  mounted() {
    this.getBaseInfo();
  },
  methods: {
    // getbidModeId() {
    //   this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then(res => {
    //     console.log(this.bidModeId);
    //     this.baseId = res.data.planId;
    //     console.log(this.baseId);
    //     this.getBaseInfo();
    //   });
    // },
    /**
     * 查询当前方案计划节点
     */
    getBaseInfo() {
      this.$http.get("/LiandoPlan/GetBidModeSection02", { params: { planId: this.baseId } }).then(res => {
        this.tabledata = res.data;
      });
    },
  },
};
</script>
