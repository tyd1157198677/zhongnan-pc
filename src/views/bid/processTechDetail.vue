<template>
  <el-container class="detail">
    <el-main>
      <div class="title">
        <div
          :style="{ background: indexactive == index ? '#f13e46' : '' }"
          @click="clickLeft(item, index)"
          class="item"
          v-for="(item, index) in titleList"
          :key="item.id"
        >
          {{ item.text }}
        </div>
      </div>
      <div class="ul">
        <div class="for" v-for="(item, index) in ulList" :key="index">
          <div class="tit">
            <span>{{ item.title }}</span>
          </div>
          <div class="values">
            <!-- <span v-if="item.title === '答疑截止' || item.title === '计划开标'">{{ parseTime(item.value, "yyyy-MM-dd hh:mm") }}</span>
            <span v-else>{{ parseTime(item.value, "yyyy-MM-dd") }}</span> -->
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
      <!-- <zhao-biao v-if="text == '招标文件'" :id="id" @GetBidMasterPageShow="GetBidMasterPageShow"></zhao-biao> -->
      <ji-hua v-if="text == '招标计划'" :id="id"></ji-hua>
      <jishu v-if="text == '技术标'" :id="id"></jishu>
      <jishuscore v-if="text == '技术得分'" :id="id"></jishuscore>
      <!-- <shangwu v-if="text == '商务标'" :id="id"></shangwu> -->
    </el-main>
  </el-container>
</template>

<script>
import bus from "@/util/bus";
import { parseTime } from "@/util";
export default {
  components: {
    jishu: () => import("./components/jishu"),
    // shangwu: () => import("./components/shangwu"),
    guoChengBaseInfo: () => import("./components/guoChengBaseInfo"),
    zhaoBiao: () => import("./components/zhaoBiao"),
    jishuscore: () => import("./components/jishuscore"),
    jiHua: () => import("./components/jiHua"),
  },
  data() {
    return {
      id: this.$route.query.id,
      indexactive: Number,
      info: {},
      text: "",
      titleList: [
        // { text: "招采方案", icon: "" },
        { text: "招标计划", icon: "" },
        { text: "技术标", icon: "" },
        { text: "技术得分", icon: "" },
      ],
      ulList: [
        // { title: "报名截止(已截止)", value: "" },
        { title: "发标日期", value: "" },
        { title: "答疑截止", value: "" },
        // { title: "回标截止", value: "" },
        { title: "计划开标", value: "" },
        { title: "计划定标", value: "" },
      ],
    };
  },
  computed: {},
  mounted() {
    bus.$emit("hideNav");
    let tab = this.$route.query.tab;
    let indexactive = sessionStorage.getItem("indexactive");
    let arr = this.titleList.map((v) => v.text);
    if (!tab) {
      if (indexactive == null) {
        sessionStorage.setItem("indexactive", 1);
        this.indexactive = 1;
        this.text = "技术标";
      } else {
        this.indexactive = indexactive;
        this.text = this.titleList[indexactive].text;
      }
    } else {
      let index = arr.findIndex((v) => v == tab);
      sessionStorage.setItem("indexactive", index);
      this.indexactive = index;
      this.text = tab;
      this.titleList[index].text = tab;
    }

    this.GetBidMasterPageShow();
    this.GetBidDate1001();
  },
  methods: {
    parseTime,
    GetBidMasterPageShow() {
      this.$http.get("/BidMaster/GetBidMasterPageShow", { params: { bidModeId: this.id } }).then((res) => {
        this.info = res.data.baseInfo;
        let info = res.data.baseInfo;
        // let arr = [info.bidSendDate, info.bidQaEndDate, info.bidOpenDate, info.bidEndDate];
        // this.ulList.forEach((item, index) => {
        //   item.value = arr[index];
        // });
      });
    },
    GetBidDate1001() {
      this.$http.get("/bidMaster/GetBidDate1001", { params: { bidModeId: this.id } }).then((res) => {
        // this.showtime = res.data;
        let arr = [res.data.bidSendDate, res.data.qaEndTime, res.data.backEndTime, res.data.bidEndDate];
        this.ulList.forEach((item, index) => {
          item.value = arr[index];
        });
      });
    },
    postPone() {
      this.$router.push({
        path: "/bid/components/postPone",
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
  padding-bottom: 90px;
  margin: 0 auto;
  .title {
    height: 40px;
    line-height: 40px;
    background: #293040;
    display: flex;
    justify-content: flex-start;
    .item {
      width: 100px;
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
</style>
