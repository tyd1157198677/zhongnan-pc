<template>
  <el-main style="margin-bottom: 120px" class="pt-3">
    <div class="table-top-title" style="margin-bottom: 10px">{{ form.supplierName }}-{{ form.conName }}</div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right" style="width: 150px">所属项目：</td>
          <td class="left">{{ form.projectName }}</td>
          <td class="right" style="width: 120px">供方名称：</td>
          <td class="left">{{ form.supplierName }}</td>
          <td class="right" style="width: 150px">合同名称：</td>
          <td class="left">{{ form.conName }}</td>
        </tr>
        <tr>
          <td class="right">合同签订日期：</td>
          <td class="left">{{ form.conDate }}</td>
          <td class="right">合同金额：</td>
          <td class="left">{{ form.conValue }}</td>
          <td class="right">合同执行状态：</td>
          <td class="left">{{ form.state }}</td>
        </tr>
        <tr>
          <td class="right">所属专业：</td>
          <td class="left">{{ form.conCate }}</td>
          <td class="right">项目经理：</td>
          <td class="left">{{ form.userName }}</td>
          <td class="right"></td>
          <td class="left"></td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: right; margin-top: 10px">
      <el-button type="primary" size="small" @click="onSubmit">启动评估</el-button>
    </div>
    <!-- <div class="mt-4" v-if="showTemp"> -->
    <el-radio-group v-model="examineType" size="medium" @change="getTempList">
      <el-radio-button label="打分评估">打分评估</el-radio-button>
      <el-radio-button label="月度费用确认">月度费用确认</el-radio-button>
    </el-radio-group>
    <div>
      <el-date-picker
        @change="getTempList"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        v-model="value1"
        style="width: 50%"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>

    <div class="mt-4">
      <el-table
        v-if="examineType == '打分评估'"
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData"
        :header-cell-style="{ background: 'transparent' }"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="majorType" label="分类" align="center" width="150"> </el-table-column>
        <el-table-column prop="stage" label="评估时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.startTime == '-'">-</span>
            <span v-else>{{ scope.row.startTime }}至{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="评估状态" align="center" width="150"> </el-table-column>
        <el-table-column prop="finalScore" label="最终得分" align="center" width="150"> </el-table-column>
        <el-table-column prop="creationTime" label="发起日期" align="center"> </el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <i class="el-icon-search" title="查看详情" @click="showdep(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-else
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData"
        :header-cell-style="{ background: 'transparent' }"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="majorType" label="分类" align="center" width="80"> </el-table-column>
        <el-table-column prop="stage" label="评估时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.startTime == '-'">-</span>
            <span v-else>{{ scope.row.startTime }}至{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payableTaxcontainingAmount" label="应付含税金额" align="center" width="130"> </el-table-column>
        <el-table-column prop="actualTaxcontainingAmount" label="实付含税金额" align="center" width="130"> </el-table-column>
        <el-table-column prop="defaultdeductionTotal" label="违约扣款金额金额" align="center" width="150"> </el-table-column>
        <el-table-column prop="exclusiveOfTax" label="不含税金额" align="center" width="120"> </el-table-column>
        <el-table-column prop="finalScore" label="最终得分" align="center" width="150"> </el-table-column>
        <el-table-column prop="state" label="状态" align="center" width="120"> </el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <i class="el-icon-search" title="查看详情" @click="showdep(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
    </div>

    <el-dialog :visible.sync="dealog" title="启动评估" width="50%" style="margin-bottom: 75px">
      <div style="color: red; margin-left: 30px; margin-bottom: 10px">两种评估只能选一个类型</div>
      <el-form :model="formInline" label-position="right" label-width="100px">
        <el-form-item label="打分评估">
          <el-radio-group v-model="formInline.majorType" @change="handleChange($event, 1)">
            <el-radio label="IT类">IT类</el-radio>
            <el-radio label="工程类">工程类</el-radio>
            <el-radio label="物资采购类">物资采购类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="月度费用确认">
          <el-radio-group v-model="formInline.majorType" @change="handleChange($event, 2)">
            <el-radio label="保安类">保安类</el-radio>
            <el-radio label="保洁类">保洁类</el-radio>
            <el-radio label="绿化类">绿化类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right" size="small" @click="sendtodo(type)">确定</el-button>
          <el-button size="small" style="float: right; margin-right: 10px" @click="dealog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
import { dateFormat } from "@/util/validate";
import { mapState } from "vuex";
export default {
  components: { Pagination: () => import("@/components/Pagination.vue") },
  data() {
    return {
      form: {},
      dealog: false,
      tableData: [],
      formInline: {
        examineType: "",
        majorType: "",
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      type: 1,
      value1: "",
      examineType: "打分评估",
      id: this.$route.query.id,
      flag1: false,
      flag2: false,
      showTemp: false,
      depId: "",
    };
  },

  mounted() {
    this.loadQuery();
    this.getTempList();
  },
  computed: {
    ...mapState("menu", { registerMenu: "menus" }),
  },
  filters: {
    //格式化日期
    formateTime(time) {
      return dateFormat(time, "yyyy-MM-dd");
    },
  },
  methods: {
    loadQuery() {
      let obj = {
        SkipCount: 0,
        MaxResultCount: 10,
        id: this.id,
      };
      this.$api.Evaluate.GetProjectContractList(obj).then((res) => {
        this.form = res.items[0];
        this.form.conDate = this.form.conDate.substring(0, this.form.conDate.indexOf("T"));
      });
    },
    // 保存评价信息
    onSubmit() {
      this.formInline.majorType = "";
      this.dealog = true;
    },
    // 提交评价信息
    sendtodo(i) {
      if (!this.formInline.majorType) {
        this.$message.error("请选择类型");
        return false;
      }
      let obj = {
        contractId: this.id,
      };
      obj.examineType = i == 1 ? "打分评估" : "月度费用确认";
      obj.majorType = this.formInline.majorType;
      this.$http.post("/StartEvaluate/StartEvaluate", obj).then((res) => {
        if (res.data.success) {
          this.$router.push({
            path: i == 1 ? "/Evaluate/contractForm" : "/Evaluate/baoan",
            query: { groupId: res.data.returnValue1, id: this.id },
          });
        }
      });
    },
    handleChange(val, i) {
      this.type = i;
    },
    showdep(obj) {
      this.$router.push({
        path: obj.examineType == "打分评估" ? "/Evaluate/myEvaluateDetail" : "/Evaluate/baoan",
        query: { groupId: obj.id, id: obj.examineType == "打分评估" ? obj.id : this.id },
      });
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.getTempList();
    },
    //打分评估与月度费用确认列表信息
    getTempList() {
      let obj = {
        StartTime: this.value1[0],
        EndTime: this.value1[1],
        ExamineType: this.examineType,
        Id: this.id,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
      };
      this.$http.get("/StartEvaluate/GetEvaluateGroupList", { params: obj }).then((res) => {
        this.tableData = res.data.items;
        this.tableData.forEach((e) => {
          e.startTime = !e.startTime ? "-" : e.startTime.substring(0, e.startTime.indexOf("T"));
          e.endTime = !e.endTime ? "-" : e.endTime.substring(0, e.endTime.indexOf("T"));
          e.creationTime = !e.creationTime ? "-" : e.creationTime.substring(0, e.creationTime.indexOf("T"));
        });
        this.page.total = res.data.totalCount;
      });
    },
    openSelect(row) {
      this.depId = row.depId;
      this.$refs.userSelect.open();
    },
    clearUser(item) {
      this.$api.Evaluate.DelEvalPerson({ id: item.id }).then((res) => {
        if (res.success) {
          this.$message.success("删除成功");
          this.getTempList();
        }
      });
    },
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

.redicon::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
