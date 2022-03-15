<template>
  <el-main style="margin-bottom: 120px" class="pt-3">
    <div style="height: 50px">
      <el-button style="float: right" @click="sendMessage">通知供方</el-button>
    </div>
    <div class="table-top-title" style="margin-bottom: 10px">{{ form.supplierName }}-{{ form.conName }}({{ form.tempName }})</div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right">发起人：</td>
          <td>
            {{ form.creatorUserName }}
          </td>
          <td class="right">发起日期：</td>
          <td>
            {{ form.conDate | formateTime }}
          </td>
        </tr>
        <tr>
          <td class="right">参与部门：</td>
          <td>
            {{ form.allDepNames }}
          </td>
          <td class="right">参与人：</td>
          <td>{{ form.allUserNames }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4">
      <el-table
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData"
        show-summary
        height="500"
        :summary-method="getSummaries"
        :header-cell-style="{ background: 'transparent', 'text-align': 'center' }"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="standard" label="评审项">
          <template slot-scope="scope">
            <span>
              <strong>{{ scope.row.wdName }} - {{ scope.row.zbName }}</strong>
              <br />
              <span>{{ scope.row.standard }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fullScore" label="满分" align="center" width="100"> </el-table-column>
        <el-table-column prop="score" label="打分人员" align="center">
          <template v-for="(col, i) in depScoreList">
            <el-table-column :label="col.depName" :key="col.depId" width="100" align="center">
              <template slot-scope="scope">
                <span>
                  {{ scope.row.depScoreList[i].score }}
                </span>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="汇总得分" align="center" width="100"> </el-table-column>
      </el-table>
      <el-dialog :visible.sync="flag1" title="通知供方" width="40%">
        <el-form
          label-position="right"
          label-width="150px"
          ref="formSearch"
          :rules="rules"
          :model="formSearch"
          size="small"
          class="border p-3 mt-2"
        >
          <el-form-item label="联系人手机号：" prop="phone" class="mb-4">
            <el-input v-model.number="formSearch.phone" @input="phoneChange"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱：" prop="email" class="mb-4">
            <el-input v-model.number="formSearch.email"></el-input>
          </el-form-item>
          <div class="center">
            <el-button type="primary" size="small" @click="onSubmit">发送通知</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </el-main>
</template>

<script>
import tempList from "./components/tempList";
import bus from "@/util/bus";
import UserSelect from "./components/UserSelect";
import { dateFormat } from "@/util/validate";
export default {
  components: { tempList, UserSelect },
  data() {
    return {
      groupId: "",
      form: {},
      tableData: [],
      form2: {
        id: "",
        contractId: "",
        examineType: "",
        tempId: "",
        mainId: "",
        startTime: "",
        endTime: "",
      },
      formSearch: {},
      tempId: "",
      tempData: [], //履约模板
      roleData: [], //评审分类
      evalData: [], //评价主体
      depScoreList: [],
      flag1: false,
      showTemp: false,
      rules: {
        phone: [{ required: true, message: "请输入联系人手机号", trigger: ["blur"] }],
        email: [{ required: true, message: "请输入联系人邮箱", trigger: ["blur"] }],
      },
    };
  },
  filters: {
    //格式化日期
    formateTime(time) {
      return dateFormat(time, "yyyy-MM-dd");
    },
  },
  mounted() {
    console.log(this.$route.query.id);
    // bus.$emit("hideNav");
    this.groupId = this.$route.query.id;
    this.loadQuery();
    this.loadScoreQuery();
  },
  methods: {
    phoneChange() {
      this.formSearch.phone = this.formSearch.phone.replace(/[^\d]/g, "");
      if (this.formSearch.phone.length > 11) {
        this.formSearch.phone = this.formSearch.phone.substr(0, 11);
      }
      var reg = /^1[3456789]\d{9}$/;
      if (this.formSearch.phone.length >= 11 && !reg.test(this.formSearch.phone)) {
        this.$alert("请输入正确的手机号码格式", {
          confirmButtonText: "确定",
        });
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        // if (index === 0) {
        //   sums[index] = '满分';
        //   return;
        // }
        // if (index === columns.length-2) {
        //   sums[index] = '实际得分';
        //   return;
        // }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
        }
      });

      return sums;
    },
    loadQuery() {
      this.$api.Evaluate.GetDetailByGroupId({ groupId: this.groupId }).then(res => {
        this.form = res;
      });
    },
    loadScoreQuery() {
      this.$api.Evaluate.GetResScoreByDep({ groupId: this.groupId }).then(res => {
        this.tableData = res.itemList;
        this.depScoreList = res.itemList[0].depScoreList;
      });
    },
    sendMessage() {
      this.flag1 = true;
    },
    // 保存评价信息
    onSubmit() {
      this.$refs.formSearch.validate(valid => {
        if (valid) {
          this.$message.success("发送成功");
          this.flag1 = false;
        }
      });

      // console.log(11, this.form2);
      // this.$api.Evaluate.SubmitEvaluate(this.form2).then((res) => {
      //   console.log(res);
      //   if (res.success) {
      //     this.$message.success("保存成功");
      //   }
      // });
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
