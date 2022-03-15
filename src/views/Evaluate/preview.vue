<template>
  <!-- <el-main style="margin-bottom: 120px;" class="mt-3"> -->
    <!-- <div class="table-top-title" style="margin-bottom: 10px">评价预览</div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td colspan="4" class="center">
            {{ form.tempName }}
          </td>
        </tr>        
        <tr>
          <td class="right">被评价供方：</td>
          <td colspan="3">
            {{ form.supplierName }}
          </td>
        </tr>
        <tr>
          <td class="right">评审模板：</td>
          <td colspan="">
            {{ form.tempName }}
          </td>
          <td class="right">合同金额：</td>
          <td colspan="">
            {{ form.conValue }}
          </td>
        </tr>
        <tr>
          <td class="right">发起人：</td>
          <td>
            {{ form.creatorUserName }}
          </td>
          <td class="right">评审人：</td>
          <td>{{form2.userName}}</td>
        </tr>
      </tbody>
    </table> -->
    <div>
      <el-table
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData"
        max-height="500"
        :header-cell-style="{ background: 'transparent' }"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column label="评审指标">
           <template slot-scope="scope">
            <span>
              <strong>{{scope.row.wdName}} - {{scope.row.zbName}}</strong>
              <br>
              <span>{{ scope.row.standard }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fullScore" label="范围" align="center" width="100"> </el-table-column>
        <el-table-column prop="gradeScore" label="评审得分" align="center" width="100">
        </el-table-column>
      </el-table>
    </div>
  <!-- </el-main> -->
</template>

<script>
import tempList from "./components/tempList";
import bus from "@/util/bus";
import UserSelect from "./components/UserSelect";
import { dateFormat } from "@/util/validate";
export default {
  components: { tempList, UserSelect },
  props:{
    id:String
  },
  data() {
    return {
      form: {},
      form2:{},
      formData:{
        evalPersonId:"",
        depId:"",
        badDesc:"",
        goodDesc:""
      },
      tableData: [],
    };
  },
  mounted() {
    // bus.$emit("hideNav");
    // this.formData.evalPersonId = this.$route.query.id;
    this.formData.evalPersonId = this.id;
    this.getList();
  },
  filters: {
    //格式化日期
    formateTime(time) {
      return dateFormat(time, "yyyy-MM-dd");
    },
  },
  methods: {
    //详情
    getList(id) {
      let data = {
        evalPersonId: this.formData.evalPersonId
      };
      this.$api.Evaluate.GetEvaluateGradeDetail(data).then((res) => {
        this.form = res.evaluateMes;
        this.form2 = res.persionMes;
        this.formData.depId = res.persionMes.depId;
        this.formData.badDesc = res.resultRemark ? res.resultRemark.badDesc: '';
        this.formData.goodDesc = res.resultRemark ? res.resultRemark.goodDesc : '';
        this.tableData = res.persionEvaluate;
      });
    }
  },
};
</script>


<style scoped>
.el-select,
.el-input {
  width: 16rem;
}

.el-form-item {
  margin-bottom: 10px;
}

.mh {
  /*min-height:500px;*/
}
</style>
