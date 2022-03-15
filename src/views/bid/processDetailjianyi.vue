<template>
  <div class="detail">
    <el-card class="box-card" :body-style="{ padding: '15px 15px 0 15px' }">
      <chuantou></chuantou>
      <div ref="print">
        <div class="pub">
          {{ "招标计划名称--" + xuQiuForm.planName + "定标" }}
          <div class="no-print" v-if="isshowDetail"><el-button type="primary" size="mini" @click="daYin">打印</el-button></div>
        </div>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right" style="width: 130px">需求部门:</td>
              <td colspan="3">{{ xuQiuForm.depNameShow }}</td>
              <td class="right" style="width: 150px">招标专业:</td>
              <td colspan="3">{{ xuQiuForm.bidCateName }}</td>
              <td class="right" style="width: 170px">招标层级:</td>
              <td colspan="3">{{ xuQiuForm.bidLevel }}</td>
              <td class="right" style="width: 130px">招标方式:</td>
              <td colspan="3">{{ xuQiuForm.purchaseType }}</td>
            </tr>
            <tr>
              <td class="right">计划定标日期:</td>
              <td colspan="3">{{ parseTime(xuQiuForm.bidEndDate, "yyyy-MM-dd") }}</td>
              <td class="right">含税总限价（元）:</td>
              <td colspan="3">{{ xuQiuForm.taxPrice }}</td>
              <td class="right">不含税总限价（元）:</td>
              <td colspan="3">{{ xuQiuForm.noTaxPrice }}</td>
              <td class="right">经办人:</td>
              <td colspan="3">{{ xuQiuForm.editUserName }}</td>
            </tr>
            <tr>
              <td class="right">相关说明:</td>
              <td colspan="15">
                {{ xuQiuForm.requireDesc }}
              </td>
            </tr>
          </tbody>
        </table>
        <dingbiaojianyi-detail-1 v-if="xuQiuForm.purchaseType == '直接委托' && isshowDetail"></dingbiaojianyi-detail-1>
        <dingbiaojianyiDetail2 v-if="xuQiuForm.purchaseType == '竞争性谈判' && isshowDetail"></dingbiaojianyiDetail2>
        <dingbiaojianyiDetail3 v-if="xuQiuForm.purchaseType == '询价比选' && isshowDetail"></dingbiaojianyiDetail3>
        <dingbiaojianyiDetail4 v-if="xuQiuForm.purchaseType == '零星采购' && isshowDetail"></dingbiaojianyiDetail4>
        <ding-biaojy1
          @CheckBidWinSubmit1001="CheckBidWinSubmit1001"
          v-if="xuQiuForm.purchaseType == '直接委托' && !isshowDetail"
          ref="dingbiao1"
          :amount="xuQiuForm.taxPrice"
          :id="id"
        ></ding-biaojy1>
        <ding-biaojy2
          @CheckBidWinSubmit1001="CheckBidWinSubmit1001"
          v-if="xuQiuForm.purchaseType == '竞争性谈判' && !isshowDetail"
          ref="dingbiao2"
          :id="id"
        ></ding-biaojy2>
        <ding-biaojy3
          @CheckBidWinSubmit1001="CheckBidWinSubmit1001"
          v-if="xuQiuForm.purchaseType == '询价比选' && !isshowDetail"
          ref="dingbiao3"
          :id="id"
        ></ding-biaojy3>
        <ding-biaojy4
          @CheckBidWinSubmit1001="CheckBidWinSubmit1001"
          v-if="xuQiuForm.purchaseType == '零星采购' && !isshowDetail"
          ref="dingbiao4"
          :id="id"
          :purchaseType="xuQiuForm.purchaseType"
        ></ding-biaojy4>
      </div>
    </el-card>
  </div>
</template>

<script>
import bus from "@/util/bus";
import { parseTime } from "@/util";
export default {
  components: {
    jiHua: () => import("./components/jianyijihua"),
    dingBiaojy1: () => import("./components/dingbiaoJianyi1"), //直委
    dingBiaojy2: () => import("./components/dingbiaoJianyi2"), //竞争性谈判
    dingBiaojy3: () => import("./components/dingbiaoJianyi3"), //竞价必选
    dingBiaojy4: () => import("./components/dingbiaoJianyi4"), //竞价必选
    dingbiaojianyiDetail1: () => import("./components/dingbiaojianyiDetail1"), //直委情
    dingbiaojianyiDetail2: () => import("./components/dingbiaojianyiDetail2"), //竞争性谈判详情
    dingbiaojianyiDetail3: () => import("./components/dingbiaojianyiDetail3"),
    dingbiaojianyiDetail4: () => import("./components/dingbiaojianyiDetail4"),
    chuantou: () => import("@/components/chuantou.vue"),
  },
  data() {
    return {
      id: this.$route.query.id,
      indexactive: 0,
      loadingback: false,
      showback: false,
      isBidbutton: false,
      isshowDetail: false,
      text: "招标计划",
      projectName: "",
      titleList: [
        { text: "招标计划", icon: "" },
        { text: "定标", icon: "" },
      ],
      xuQiuForm: {
        id: "",
        depName: "",
        depNameShow: "",
        planName: "",
        bidLevel: "",
        purchaseType: "",
        bidEndDate: "",
        bidCateId: "",
        bidCateName: "",
        requireDesc: "",
        taxPrice: 0,
        noTaxPrice: 0,
        userName: 0,
      },
    };
  },
  computed: {
    tabto() {
      return this.$route.query.tab;
    },
  },
  created() {
    // this.tabto = this.$route.query.tab;
    // console.log(this.$route.query.tab);
  },
  mounted() {
    if (!this.$route.query.isShowheader) {
      // bus.$emit("hideNav");
    }
    this.getdetail();
  },
  methods: {
    parseTime,
    daYin() {
      this.$print(this.$refs.print);
    },
    CheckBidWinSubmit1001(st) {
      this.$http.get("/BidWin/CheckBidWinSubmit1001?bidModeId=" + this.$route.query.id).then((res) => {
        this.isshowDetail = res.data.success;
      });
    },
    CreateBidWinMaster1001() {
      this.$http.post("/BidWin/CreateBidWinMaster1001", { id: this.$route.query.id }).then((res) => {});
    },
    getdetail() {
      this.$http.get("/ZhiWeiPurchaseAppServices/GetPurchasePlanById", { params: { BidModeId: this.$route.query.id } }).then((res) => {
        this.xuQiuForm = res.data;
        this.projectName = this.xuQiuForm.detailList.length > 0 ? this.xuQiuForm.detailList[0].projectName : "";
        // if (res.data.purchaseType == "直接委托") {
        //   this.getScaleing();
        // } else {
        this.CheckBidWinSubmit1001();
        // }
        this.CreateBidWinMaster1001();
      });
    },

    // 页签切换
    clickLeft(val, i) {
      this.text = val.text;
      this.indexactive = i;
      sessionStorage.setItem("indexactive", i);
      let query = this.$router.history.current.query;
      let path = this.$router.history.current.path;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      newQuery.tab = val.text;
      setTimeout(() => {
        this.$router.push({ path, query: newQuery });
      }, 200);
    },
  },
};
</script>
<style lang="scss" scoped>
@media print {
  html,
  body {
    height: inherit;
  }
}
.rolse {
  height: 700px;
  margin-right: 10px;
  padding-bottom: 100px;
  display: flex;

  .left {
    width: 100%;
    height: 100%;
    overflow: auto;
    flex: 2;
    border: 1px solid #ccc;

    .item {
      width: 100%;
      height: 40px;
      display: flex;
      /*实现垂直居中*/
      align-items: center;
      /*实现水平居中*/
      justify-content: center;
      text-align: justify;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      //   font-weight: 550;
      font-size: 14px;
    }
  }
}
::v-deep .el-button--danger {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
::v-deep .el-button--danger:focus,
.el-button--danger:hover {
  color: #fff;
  background-color: #5e83da;
  border-color: #5e83da;
}
.detail {
  // width: 88%;
  padding: 10px;
  margin: 0 auto;
  .title {
    height: 40px;
    line-height: 40px;
    background: #293040;
    display: flex;
    justify-content: flex-start;
    .item {
      width: 120px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      //   font-weight: 550;
      font-size: 14px;
    }
  }

  .btn1 {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }
  .ul {
    display: flex;
    background: #dff0d8;
    text-align: center;
    color: #58915b;
    .for {
      // width: 16.7%;
      width: 25%;
      border-right: 1px solid #ccc;
      padding: 10px 0;
      div {
        height: 20px;
        line-height: 20px;
        span {
          text-align: center;
        }
      }
    }
  }
  .tits {
    display: flex;
    justify-content: flex-end;
    /*margin-top: 30px;*/
  }
  .content {
    margin-top: 6px;
    .pub {
      border-left: 3px solid #21468c;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      background: #f4f4f4;
      margin-top: 6px;
      font-size: 13px;
      font-weight: 600;
    }
  }
}
::v-deep.el-textarea__inner {
  height: 100px;
}
::v-deep.el-dialog__body {
  padding: 0;
}
.score {
  float: right;
  margin-top: 10px;
}
::v-deep .el-icon-refresh {
  color: #fff;
}
.pub {
  border-left: 3px solid #ea5514;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: #d9d6d6;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}
</style>
