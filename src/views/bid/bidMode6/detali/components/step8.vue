<template>
  <el-table
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="huiqiandata"
            >
              <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
            <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
            <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
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
      huiqiandata: [
        {
          userGuid: "",
        },
      ],
      files: [],
    };
  },
  computed: {
    planId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.id;
      }
    },
  },
  created() {
    // if (this.id) {
    //   this.getBidModeAttachList(this.id);
    // }
    // this.planId = sessionStorage.getItem("bidModeId");
  },
  mounted() {
    this.gethuiqianList();
  },
  methods: {
    // getbidModeId() {
    //   this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then(res => {
    //     console.log(this.bidModeId);
    //     this.planId = res.data.planId;
    //     console.log(this.planId);
    //     this.gethuiqianList();
    //   });
    // },
    gethuiqianList() {
      // this.loading = true;
      this.$http.get("/LiandoPlan/GetAuditUser05", { params: { planId: this.planId } }).then(res => {
        // this.loading = false;
        this.huiqiandata = res.data;
      });
    },
  },
};
</script>

<style></style>
