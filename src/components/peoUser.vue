<template>
  <el-main>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right">项目名称：</td>
          <td colspan="3">{{ form.planName }}</td>
          <td class="right">招标计划名称：</td>
          <td colspan="3">{{ form.projectName }}</td>
        </tr>
        <tr>
          <td class="right">招标层级：</td>
          <td>
            {{ form.bidLevel }}
          </td>
          <td class="right">招标方式：</td>
          <td>
            {{ form.purchaseType }}
          </td>
          <td class="right">计划定标日期：</td>
          <td>
            {{ parseTime(form.bidEndDate, "yyyy-MM-dd") }}
          </td>
          <td class="right">招标专业：</td>
          <td>
            {{ form.bidCateName }}
          </td>
        </tr>
        <tr>
          <td class="right">需求部门：</td>
          <td>
            {{ form.depName }}
          </td>
          <td class="right">合约规划金额：</td>
          <td>
            {{ form.planMoney }}
          </td>
          <td class="right">建筑面积：</td>
          <td>
            {{ form.jzSquire }}
          </td>
          <td class="right">经办人：</td>
          <td>
            {{ form.bidUserName }}
          </td>
        </tr>
        <tr>
          <td class="right">经办日期：</td>
          <td>
            {{ parseTime(form.creationTime, "yyyy-MM-dd") }}
          </td>
          <td class="right">招标进度：</td>
          <td>
            {{ form.planStatus }}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="right">备注：</td>
          <td colspan="7">
            {{ form.requireDesc }}
          </td>
        </tr>
      </tbody>
    </table>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  inject: ["reload"],
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      form: [],
      formru: [],
      msg: "",
      jumpButton: false,
      showmessage: "",
      isCanEdit: false,
      radio: true,
      showRefuseButton: false,
      showPassButton: false,
      showmark: false,
      tabledata: [],
      tablelist: [],
      FileName: "",
      remark: "",
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      loading: false,
      // loading1: false,
      uploadData: {},
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rulesrizhi: {
        // remark: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
      },
      rules: {},
    };
  },
  computed: {
    navBarName() {
      const barName = "";
      return barName;
    },
    bidModeId() {
      if (this.$route.query.bidModeId) {
        return this.$route.query.bidModeId;
      } else if (this.$route.params.bidModeId) {
        this.$route.params.bidModeId;
      } else {
        return this.id;
      }
    },
    masterId() {
      return this.$route.query.masterId;
    },
    planId() {
      return this.$route.query.planId;
    },
    id() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else if (this.$route.params.id) {
        return this.$route.params.id;
      } else {
        return this.$route.params.baseId;
      }
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.todoId = this.$route.query.todoId;
  },
  mounted() {
    this.GetOnePlanById();
  },
  methods: {
    parseTime,
    timeFormatSeconds(time) {
      var d = time ? new Date(time) : new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      // var hours = d.getHours();
      // var min = d.getMinutes();
      // var seconds = d.getSeconds();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      // if (hours < 0) hours = "0" + hours;
      // if (min < 10) min = "0" + min;
      // if (seconds < 10) seconds = "0" + seconds;

      return year + "-" + month + "-" + day;
    },
    GetOnePlanById() {
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.id } }).then((res) => {
        this.form = res.data;
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 2% 0 120px;
  height: 100%;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: #ffffff;
  position: relative;
  /* width: 88%; */
  border-radius: 10px 10px 0 0;
  /* overflow: auto; */
}

.buttoncss {
  float: right;
  margin-top: 12px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}
::v-deep .clearfix::after {
  content: none;
}
.el-icon-s-home {
  color: #409eff;
}
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 20px;
  float: right;
  cursor: pointer;
}
</style>
