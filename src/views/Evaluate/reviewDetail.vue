<template>
  <!-- <el-main style="margin-bottom: 120px;" class="mt-3"> -->
    <!-- <div class="table-top-title" style="margin-bottom: 10px">评分</div>
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
          <td class="right">合同信息：</td>
          <td colspan="3">
            {{ form.conName }}
          </td>
        </tr>
        <tr>
          <td class="right">评审模板：</td>
          <td colspan="3">
            {{ form.tempName }}
          </td>
        </tr>
        <tr>
          <td class="right">创建人：</td>
          <td>
            {{ form.creatorUserName }}
          </td>
          <td class="right">发起日期：</td>
          <td>
            {{ form.startTime | formateTime }}
          </td>
        </tr>
        <tr>
          <td class="right">评审人姓名：</td>
          <td>{{form2.userName}}</td>
          <td class="right">评审人角色：</td>
          <td>{{form2.depName}}</td>
        </tr>
        <tr>
          <td class="right">覆盖分值：</td>
          <td colspan="3">{{form2.score}} / {{form2.sumScore}}</td>
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
        max-height="400"
        :header-cell-style="{ background: 'transparent'}"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column label="评审项">
           <template slot-scope="scope">
            <span>
              <strong>{{scope.row.wdName}} - {{scope.row.zbName}}</strong>
              <br>
              <span>{{ scope.row.standard }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fullScore" label="满分" align="center" width="80"> </el-table-column>
        <el-table-column prop="gradeScore" label="得分" align="center" width="80">
        </el-table-column>
        <el-table-column prop="itemRemark" label="备注" align="center" width="200">
          <template slot-scope="scope">
            <span :title="scope.row.itemRemark">{{scope.row.itemRemark}}</span>
          </template>
        </el-table-column>
      </el-table>
    <label class="mt-3">打分描述：</label>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td>1.哪些方面不足需要提高：</td>
          <td colspan="3">{{formData.badDesc}}</td>
        </tr>
        <tr>
          <td>2.哪些方面做的不错：</td>
          <td colspan="3">
            {{formData.goodDesc}}
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  <!-- </el-main> -->
</template>

<script>
import tempList from "./components/tempList";
import UserSelect from "./components/UserSelect";
import { dateFormat } from "@/util/validate";
export default {
  components: { tempList, UserSelect },
  props:{
    id:{
      type: String
    }
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
    console.log(this.$route);
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
.el-table /deep/ .cell {
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding-right: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: initial;
  overflow: visible;
}
</style>
