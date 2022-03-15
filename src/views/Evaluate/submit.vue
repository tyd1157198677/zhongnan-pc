<template>
  <el-main style="margin-bottom: 120px" class="mt-3">
    <div class="table-top-title" style="margin-bottom: 10px">{{ form.supplierName }}-{{ form.conName }}</div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right">创建人：</td>
          <td>
            {{ form.creatorUserName }}
          </td>
          <td class="right">发起日期：</td>
          <td>
            {{ form.startTime | formateTime }}
          </td>
          <td class="right">评审模板：</td>
          <td>
            {{ form.tempName }}
          </td>
        </tr>
        <tr>
          <td class="right">评审人姓名：</td>
          <td>{{ form2.userName }}</td>
          <td class="right">评审人角色：</td>
          <td>{{ form2.depName }}</td>
          <td class="right">覆盖分值：</td>
          <td>{{ form2.score }} / {{ form2.sumScore }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4" v-if="!form.isCompleted">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-table
          empty-text="无符合条件的记录"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="ruleForm.tableData"
          :header-cell-style="{ background: 'transparent', 'text-align': 'center' }"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column prop="zbName" label="评审项">
            <template slot-scope="scope">
              <span>
                <strong>{{ scope.row.wdName }} - {{ scope.row.zbName }}</strong>
                <br />
                <span>{{ scope.row.standard }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="fullScore" label="满分" align="center" width="100"> </el-table-column>

          <el-table-column prop="gradeScore" label="得分" align="center" width="100">
            <template slot-scope="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.gradeScore'" :rules="rules.gradeScore">
                <el-input v-model.number="scope.row.gradeScore" @input="changeInput(scope.row)" class="min-input"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="itemRemark" label="备注" align="center" width="300">
            <template slot-scope="scope">
              <el-input :autosize="{ minRows: 2 }" v-model="scope.row.itemRemark"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <label class="mt-3">打分描述：</label>
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td>1.哪些方面不足需要提高：</td>
            <td colspan="3">
              <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="formData.badDesc"></el-input>
            </td>
          </tr>
          <tr>
            <td>2.哪些方面做的不错：</td>
            <td colspan="3">
              <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="formData.goodDesc"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="center m-4">
      <h5>评分已结束</h5>
    </div>

    <el-row>
      <el-button style="float:right;margin-top:10px" v-if="!form.isCompleted" type="primary" size="small" @click="onSubmit"
        >提交分数</el-button
      >
      <!-- <el-button size="small" @click="onCancle">取消</el-button> -->
    </el-row>
  </el-main>
</template>

<script>
import tempList from "./components/tempList";
import UserSelect from "./components/UserSelect";
import { dateFormat } from "@/util/validate";
export default {
  components: { tempList, UserSelect },
  data() {
    var checkNum = (rule, value, callback) => {
      let str = rule.field;
      let index = rule.field.indexOf(".");
      let index2 = str.replace(".", "@").indexOf(".");
      str = str.substring(index + 1, index2);
      let fullScore = this.ruleForm.tableData[str].fullScore;
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          if (!value) {
            callback(new Error("分数不能为空"));
          }
          callback(new Error("请输入数字值"));
        } else {
          if (value < 0) {
            callback(new Error("范围在0-255"));
          } else if (value > fullScore) {
            callback(new Error("范围在0-" + fullScore));
          } else {
            callback();
          }
        }
      }, 100);
    };
    return {
      form: {},
      form2: {},
      formData: {
        evalPersonId: "",
        // 997cf642-f72e-4a84-427f-08d8c80a2f3b
        depId: "",
        badDesc: "",
        goodDesc: "",
      },
      ruleForm: {
        tableData: [],
      },
      rules: {
        gradeScore: [{ validator: checkNum, trigger: "blur" }],
      },
      fullSocre: 0,
    };
  },
  filters: {
    //格式化日期
    formateTime(time) {
      return dateFormat(time, "yyyy-MM-dd");
    },
  },
  mounted() {
    this.formData.evalPersonId = this.$route.query.evalPersonId;
    this.getList();
  },
  methods: {
    changeInput(val) {
      this.fullSocre = val.fullScore;
    },
    // 保存评价信息
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$confirm("确定提交此评价?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              const rols = this.ruleForm.tableData.map(x => {
                return {
                  itemId: x.itemId,
                  score: x.gradeScore,
                  itemRemark: x.itemRemark,
                };
              });
              this.formData.itemRes = rols;
              this.$api.Evaluate.SubmitResult(this.formData).then(res => {
                console.log(res);
                console.log(res.returnValue1);
                this.returnValue1 = res.returnValue1.substr(2);
                console.log(this.returnValue1);
                if (res.success) {
                  if (!res.returnValue1) {
                    this.$message.success("提交成功");
                    // this.getList();
                    this.$router.push({
                      path: "/user/todoList",
                    });
                  } else {
                    this.$confirm("是否进行下一个履约评价打分?", "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning",
                    }).then(() => {
                      this.getList();
                      this.formData.badDesc = "";
                      this.formData.goodDesc = "";
                      this.$router
                        .push({
                          path: this.returnValue1,
                        })

                        .finally(() => {
                          this.formData.evalPersonId = this.$route.query.evalPersonId;
                          this.getList();
                        });
                    });
                  }
                }
              });
            })
            .catch(() => {
              this.$msg({ type: "info", message: "已取消" });
            });
        }
      });
    },
    close() {
      // window.close();
      this.$router.push({
        path: "/user/todoList",
      });
    },
    //详情
    getList(id) {
      let data = {
        evalPersonId: this.formData.evalPersonId,
      };
      this.$api.Evaluate.GetEvaluateGradeDetail(data).then(res => {
        console.log("res=", res);
        this.form = res.evaluateMes;
        this.form2 = res.persionMes;
        this.formData.depId = res.persionMes.depId;
        this.ruleForm.tableData = res.persionEvaluate;
        res.persionEvaluate.map((item, i) => {
          this.ruleForm.tableData[i].gradeScore = "";
        });
      });
    },
    onCancle() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.el-select,
.el-input {
  width: 16rem;
}

.min-input {
  width: 80px;
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
  padding-top: 5px;
  padding-bottom: 5px;
}
::v-deep .el-form-item {
  margin-bottom: 0px;
}
</style>
