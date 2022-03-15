<template>
  <el-table
            empty-text="无符合条件的记录"
            stripe
            border
            style="margin-top:10px"
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
          >
            <el-table-column type="index" width="50" label="序号" align="center" prop="num"> </el-table-column>
            <el-table-column prop="bidWorkType" label="项目工程" width="300" align="center"> </el-table-column>
            <el-table-column prop="workDesc" label="工作结果">
            </el-table-column>
            <el-table-column prop="endDate" label="完成时限" width="200" align="center">
              <template slot-scope="scope">
                      <span>{{ parseTime(scope.row.endDate, "yyyy-MM-dd") }}</span>
                    </template>
            </el-table-column>
            <el-table-column label="责任人" width="180" prop="userName" align="center">
            </el-table-column>
          </el-table>
</template>

<script>
import { parseTime } from "@/util";
/**
 * 招标采购-入围标准
 */
export default {
  name: "step4",
  components: {},
  props: ["id"],
  inject: ["reload"],
  data() {
    return {
      tableData: [
        {
          // id: this.id,
          workDesc: "",
          endDate: "",
          userName: "",
        },
      ],
      form: {
        id: "",
        baseId: "",
        cerInfos: [],
        regCapitalMin: 0,
        caseRequire: "",
        managerRequire: "",
        otherRequire: "",
      },
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
    cerInfos() {
      const names = this.form.cerInfos.map(c => c.cerName).join(",");
      return names;
    },
  },
  created: function() {
    
    // this.planId = sessionStorage.getItem("bidModeId");
  },
  mounted(){
    this.getList();
  },
  methods: {
    parseTime,
    // getbidModeId() {
    //   this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then(res => {
    //     console.log(this.bidModeId);
    //     this.planId = res.data.planId;
    //     console.log(this.planId);
    //     this.getList();
    //   });
    // },
    /**
     * 查询当前方案入围标准
     */
    getList() {
      this.$http.get("/LiandoPlan/GetBidWorkList04", { params: { planId: this.planId } })
      .then(res => {
        this.tableData = res.data;
      })
    }
  },
}
</script>
