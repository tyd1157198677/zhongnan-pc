<template>
  <div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="center" colspan="10" style="color: #333; font-size: 16px"><strong>一、供方评价</strong></td>
        </tr>
        <tr>
          <td class="center" colspan="2">评价周期</td>
          <td class="center" colspan="8">
            <el-date-picker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="value1"
              style="width: 50%"
              type="daterange"
              range-separator="-"
            >
              start-placeholder="开始日期" end-placeholder="结束日期" >
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="center" colspan="2">乙方名称</td>
          <td class="center" colspan="8"></td>
        </tr>
        <tr>
          <td class="center" colspan="2">评价内容</td>
          <td class="center" colspan="6">评价结果（具体事项可注明日期及位置）</td>
          <td class="center">扣款及奖励金额</td>
          <td class="center">备注</td>
        </tr>
        <tr>
          <td class="center" rowspan="6">服务结果</td>
          <td class="center">神秘客暗访</td>
          <td class="left" colspan="6">
            上一月度神秘客暗访得分<el-input v-model.number="dataval[0]" class="line" style="width: 100px"></el-input
            >分，低于90分，每下降1分，扣除200元
          </td>
          <td class="center">
            <el-input v-model.number="val1" class="line" style="width: 100px" />
            <!-- {{ dataval[0] && parseInt(dataval[0]) < 90 ? (90 - parseInt(dataval[0])) * 500 : 0 }} -->
          </td>
          <td class="center" rowspan="6">依据合同条款执行</td>
        </tr>
        <tr>
          <td class="center">第三方 满意度</td>
          <td class="left" colspan="6">
            上一月度神秘客暗访得分<el-input v-model.number="dataval[2]" class="line" style="width: 100px"></el-input
            >分，低于85分，每下降1分，扣除200元。
          </td>
          <td class="center">
            <el-input class="line" style="width: 100px" v-model.number="val3" />
            <!-- {{ dataval[1] && parseInt(dataval[1]) < 85 ? (85 - parseInt(dataval[1])) * 500 : "-" }} -->
          </td>
        </tr>
        <tr>
          <td class="center" rowspan="2">安全 事故</td>
          <td class="left" colspan="6">
            1、本月度发生轻微伤害事故<el-input class="line" style="width: 100px" v-model.number="dataval[4]"></el-input
            >起，扣除服务费5000元，从第2起按1.5倍增扣
          </td>
          <td class="center">
            <el-input class="line" style="width: 100px" v-model.number="dataval[5]" />
            <!-- {{
              parseInt(dataval[2]) && parseInt(dataval[2]) == 1
                ? 5000
                : parseInt(dataval[2]) && parseInt(dataval[2]) > 1
                ? (parseInt(dataval[2]) - 1) * 1.5 * 5000
                : "-"
            }} -->
          </td>
        </tr>
        <tr>
          <td class="left" colspan="6">
            2、本月度发生一般及以上生产安全事故<el-input v-model.number="dataval[6]" class="line" style="width: 100px"></el-input
            >起，扣除1个月服务费但不低于5万元/次。
          </td>
          <td class="center">
            <el-input class="line" style="width: 100px" v-model.number="dataval[7]" />
          </td>
        </tr>
        <tr>
          <td class="center" rowspan="2">投诉 与表扬</td>
          <td class="left" colspan="6">
            1、本月度受到业主安全类投诉（有效）<el-input class="line" style="width: 100px" v-model.number="dataval[8]"></el-input
            >起，每起扣除100元；
          </td>
          <td class="center">
            <el-input class="line" style="width: 100px" v-model.number="dataval[9]" />
          </td>
        </tr>
        <tr>
          <td class="left" colspan="6">
            2、本月度受到业主书面表扬（有效）<el-input
              class="line"
              style="width: 100px"
              v-model.number="dataval[10]"
            />起，每起奖励100元（乙方须发放至受表扬员工），每月奖励上限不超过人民币2000元。
          </td>
          <td class="center">
            <el-input class="line" style="width: 100px" v-model.number="dataval[11]" />
          </td>
        </tr>
        <tr>
          <td class="center" rowspan="2" colspan="2">出勤考核</td>
          <td class="left" colspan="6">
            1、本月应出勤总工时<el-input class="line" style="width: 100px" v-model.number="dataval[12]" />小时，实际出勤工时<el-input
              class="line"
              style="width: 100px"
              v-model.number="dataval[13]"
            />小时，缺勤工时<el-input class="line" style="width: 100px" v-model.number="dataval[14]" />小时，日均工时费用<el-input
              class="line"
              style="width: 100px"
              v-model.number="dataval[15]"
            />元/小时
          </td>
          <td class="center"><el-input class="line" style="width: 100px" v-model.number="dataval[16]" /></td>
          <td class="center" rowspan="2">依据合同条款执行</td>
        </tr>
        <tr>
          <td class="left" colspan="6">
            2、本月旷工<el-input class="line" style="width: 100px" v-model.number="dataval[17]" />起，每人次扣除服务费500元；
          </td>
          <td class="center"><el-input class="line" style="width: 100px" v-model.number="dataval[18]" /></td>
        </tr>
        <tr>
          <td class="center" colspan="2">员工资质</td>
          <td class="left" colspan="6">
            1、本月不符合任职要求员工<el-input class="line" style="width: 100px" v-model.number="dataval[19]" />人次，每人次扣除200元；
          </td>
          <td class="center"><el-input class="line" style="width: 100px" v-model.number="dataval[20]" /></td>
          <td class="center">
            <el-input class="line" style="width: 100px" v-model.number="dataval[21]" />
          </td>
        </tr>
        <tr>
          <td class="center" rowspan="7">服务过程考核</td>
          <td class="center">绿化基础业务品质</td>
          <td class="left" colspan="6">
            本月度绿化服务月度专项检查得分<el-input class="line" style="width: 100px" v-model.number="dataval[22]" />分，<br />
            1：检查结果＞85分（含），不扣减；，<br />
            2：检查结果80（含）-85分，每次扣除乙方服务费人民币500元；，<br />
            3：检查结果75（含）-80分，每次扣除乙方服务费人民币1000元；，<br />
            4：检查结果＜75分，每次扣除乙方服务费人民币2000元；，<br />
            5：检查结果连续两个月＜70分，追加扣除乙方服务费人民币2000元。
          </td>
          <td class="center"><el-input class="line" style="width: 100px" v-model.number="dataval[23]" /></td>
          <td class="center"><el-input class="line" v-model="dataval[24]" /></td>
        </tr>
        <tr>
          <td class="center" rowspan="6">员工违规 行为考核</td>
          <td class="left" colspan="6">1、乙方向甲方工作人员行贿的，扣除乙方一个月服务费作为违约金。</td>
          <td class="center"><el-input class="line" style="width: 100px" v-model.number="dataval[25]" /></td>
          <td class="center"><el-input class="line" v-model="dataval[26]" /></td>
        </tr>
        <tr>
          <td class="left" colspan="6">2、乙方员工向甲方业主索要财物、搬弄是非或散布谣言的，每出现1次，每次扣除乙方服务费人民币2000元。</td>
          <td class="center"><el-input class="line" style="width: 100px" v-model.number="dataval[27]" /></td>
          <td class="center"><el-input class="line" v-model="dataval[28]" /></td>
        </tr>
        <tr>
          <td class="left" colspan="6">
            3、乙方员工盗窃、私拿甲方业主或员工物品的；乙方员工恐吓、威胁甲方业主或员工，与甲方业主或员工发生肢体冲突的，扣除服务费5000元，从第2起按1.5倍增扣；
          </td>
          <td class="center"><el-input class="line" style="width: 100px" v-model.number="dataval[29]" /></td>
          <td class="center"><el-input class="line" v-model="dataval[30]" /></td>
        </tr>
        <tr>
          <td class="left" colspan="6">4、乙方员工殴打甲方业主或员工的，致使造成轻微伤及以上的，扣除月度服务费的50%但不低于5万元/次。</td>
          <td class="center"><el-input class="line" style="width: 100px" v-model.number="dataval[31]" /></td>
          <td class="center"><el-input class="line" v-model="dataval[32]" /></td>
        </tr>
        <tr>
          <td class="left" colspan="6">5、乙方员工酗酒上岗、睡岗、擅自脱岗/离岗，每出现一起，扣除乙方服务费人民币2000元；</td>
          <td class="center"><el-input class="line" style="width: 100px" v-model.number="dataval[33]" /></td>
          <td class="center"><el-input class="line" v-model="dataval[34]" /></td>
        </tr>
        <tr>
          <td class="left" colspan="6">6、乙方员工在公共场所睡觉，聚岗聊天未造其他后果的。每出现一起，扣除乙方服务费人民币500元。</td>
          <td class="center"><el-input class="line" style="width: 100px" v-model.number="dataval[35]" /></td>
          <td class="center"><el-input class="line" v-model="dataval[36]" /></td>
        </tr>
        <tr>
          <td class="center" colspan="2">违约扣款合计</td>
          <td class="left" colspan="8">总计金额：<el-input class="line" style="width: 150px" v-model.number="dataval[37]" />元</td>
        </tr>
        <tr>
          <td class="center" colspan="10" style="color: #333; font-size: 16px"><strong>二、费用确认</strong></td>
        </tr>
        <tr>
          <td class="center" colspan="2">本月合同应付 含税金额</td>
          <td class="left" colspan="8">
            (合同约定月度应支付服务费)<el-input class="line" style="width: 150px" v-model.number="dataval[38]" />
          </td>
        </tr>
        <tr>
          <td class="center" colspan="2">本月供方评价 违约扣款金额</td>
          <td class="left" colspan="8">
            （执行供方总体评价金额）<el-input class="line" style="width: 150px" v-model.number="dataval[39]" />
          </td>
        </tr>
        <tr>
          <td class="center" colspan="2">本月合同实付 含税金额</td>
          <td class="left" colspan="8">
            （月服务费标准减去供方总体评价金额）<el-input class="line" style="width: 150px" v-model.number="dataval[40]" />
          </td>
        </tr>
        <tr>
          <td class="center" colspan="2">本月合同实付 不含税金额</td>
          <td class="left" colspan="8">
            (（本月合同实付含税金额/1.06）
            <el-input class="line" style="width: 150px" v-model.number="dataval[41]" />
          </td>
        </tr>
        <tr>
          <td class="center" colspan="2">甲方代表确认</td>
          <td class="left" colspan="8">
            <div>
              <div class="line1" style="width: 150px" />
            </div>
            <div style="text-align: right; margin-right: 100px; margin-top: 10px">
              <div class="line1" style="width: 100px" />
              年
              <div class="line1" style="width: 100px" />
              月
              <div class="line1" style="width: 100px" />
              日
            </div>
          </td>
        </tr>
        <tr>
          <td class="center" colspan="2">乙方代表确认</td>
          <td class="left" colspan="8">
            <div>
              <div class="line1" style="width: 150px" />
            </div>
            <div style="text-align: right; margin-right: 100px; margin-top: 10px">
              <div class="line1" style="width: 100px" />
              年
              <div class="line1" style="width: 100px" />
              月
              <div class="line1" style="width: 100px" />
              日
            </div>
          </td>
        </tr>
        <tr>
          <td class="left" colspan="10">
            备注： <br />考核以《绿化服务外包合同》、《服务质量考核细则》及其他相关附件为依据。<br />
            1、本表格为受控文件，根据需要可以增加行，不能更改布局、填写内容和格式。<br />
            2、检查时采用纸质填写，甲乙双方签字确认后复印一式三份，一份交乙方作为结算依据，一份交服务中心出纳作为核对依据，一份（原件）由项目环境岗保存。
          </td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: right; margin-top: 10px">
      <el-button type="primary" size="small" @click="submit" v-if="isShow">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["isShow"],
  data() {
    return {
      dataval: [],
      value1: [],
      number: "",
      loading: false,
      id: this.$route.query.id,
      groupId: this.$route.query.groupId,
    };
  },
  mounted() {
    this.getListClassify();
  },
  computed: {
    ...mapState("menu", { registerMenu: "menus" }),
    val1() {
      return this.dataval[0] && parseInt(this.dataval[0]) < 90 ? (90 - parseInt(this.dataval[0])) * 200 : 0;
    },
    val3() {
      return this.dataval[2] && parseInt(this.dataval[2]) < 85 ? (85 - parseInt(this.dataval[2])) * 200 : 0;
    },
  },
  methods: {
    async getListClassify() {
      // if ((type = 1)) {
      this.loading = true;
      this.$http.get("/StartEvaluate/GetMonthEvalContent?groupId=" + this.groupId).then((res) => {
        if (res.status == 200) {
          this.loading = false;
          this.dataval = res.data.result;
          if (res.data.result.length > 0) {
            let start =
              res.data.result[42].indexOf("T") > -1
                ? res.data.result[42].substring(0, res.data.result[42].indexOf("T")).split("-")
                : res.data.result[42].split("-");
            let end =
              res.data.result[43].indexOf("T") > -1
                ? res.data.result[43].substring(0, res.data.result[43].indexOf("T")).split("-")
                : res.data.result[43].split("-");
            this.value1 = [
              new Date(Number(start[0]), Number(start[1]), Number(start[2])),
              new Date(Number(end[0]), Number(end[1]), Number(end[2])),
            ];
          }

          // this.arrData.push(new Date(res.data.result[55]));
          // console.log(new Date(res.data.result[55]));
          // this.arrData.push(new Date(res.data.result[56]));
        }
      });

      // }
    },
    submit() {
      let data = this.dataval;
      this.dataval[1] = this.val1;
      this.dataval[3] = this.val3;
      let isOk = true;
      if (this.value1 == "") {
        isOk = false;
        this.$message.error("请选择评价周期");
        return false;
      }
      for (let index = 0; index < 42; index++) {
        if (
          !this.dataval[index] &&
          this.dataval[index] != 0 &&
          index != 21 &&
          index != 24 &&
          index != 26 &&
          index != 28 &&
          index != 30 &&
          index != 32 &&
          index != 34 &&
          index != 36
        ) {
          isOk = false;
          this.$message.error("请填写完整再提交");
          return false;
        }
      }

      if (isOk) {
        this.$confirm("确定提交吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.dataval.forEach((e) => {
            e = !e || e == null ? "" : e;
          });
          this.dataval[42] = this.value1[0];
          this.dataval[43] = this.value1[1];
          let obj = {
            id: this.groupId,
            startTime: this.value1[0],
            endTime: this.value1[1],
            defaultdeductionTotal: this.dataval[37], //违约扣款合计
            payableTaxcontainingAmount: this.dataval[38], //本月合同应付含税金额
            defaultDeduction: this.dataval[39], //本月合同应付含税金额
            actualTaxcontainingAmount: this.dataval[40], //本月合同实付含税金额
            exclusiveOfTax: this.dataval[41], //本月合同实付不含税金额
            monthEvalContent: this.dataval,
          };
          this.$http.post("/StartEvaluate/SubmitMonthEvaluate", obj).then((res) => {
            if (res.data.success) {
              this.$message.success("保存成功");
              this.getListClassify();
              this.$emit("isShowBtn");
            }
          });
        });
      }
    },
  },
};
</script>

<style scoped>
.layui-table td,
.layui-table th,
.layui-table-col-set,
.layui-table-fixed-r,
.layui-table-grid-down,
.layui-table-header,
.layui-table-page,
.layui-table-tips-main,
.layui-table-tool,
.layui-table-total,
.layui-table-view,
.layui-table[lay-skin="line"],
.layui-table[lay-skin="row"] {
  border-color: #666;
}
.layui-table {
  border-top-color: #666;
  border-right-color: #666;
}
::v-deep .line .el-input__inner {
  border: 0px solid #fff !important;
  border-bottom: 1px solid #666 !important;
  border-radius: 0% !important;
  /* vertical-align: bottom; */
  padding-bottom: 0px !important;
}
.line1 {
  height: 40px;
  display: inline-block;
  border-bottom: 1px solid #666 !important;
}
</style>
