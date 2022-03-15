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
      <div class="btn1">
        <div style="margin-right: 10px">
          <el-button type="danger" v-if="showback" size="mini" :loading="loadingback" @click="openM()">撤销</el-button>
          <el-button
            v-for="item in btnList"
            :key="item.text"
            :type="text == item.text ? 'success' : 'info'"
            size="mini"
            @click="btnClick(item.text)"
            >{{ item.text }}</el-button
          >
        </div>
        <el-button type="danger" icon="el-icon-s-home" size="mini" style="color：#fff;padding:4px" @click="onlast"></el-button>
        <el-button type="danger" icon="el-icon-refresh" size="mini" style="color：#fff;padding:4px" @click="refreshto"></el-button>
      </div>
      <div class="ul">
        <div class="for" v-for="(item, index) in ulList" :key="index">
          <div class="tit">
            <span>{{ item.title }}</span>
          </div>
          <div class="values">
            <!-- <span v-if="item.title === '答疑截止' || item.title === '计划开标'">{{ parseTime(item.value, "yyyy-MM-dd hh:mm") }}</span> -->
            <!-- <span v-else>{{ parseTime(item.value, "yyyy-MM-dd") }}</span> -->
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
      <bulu-com ref="buluCom" v-if="text == '补录单位'" :id="id"></bulu-com>
      <post-pone ref="postpone" v-if="text == '计划变更'" :id="id" :baseInfo="info" @GetBidDate1001="GetBidDate1001"></post-pone>
      <bufaFile ref="bufaFile" v-if="text == '补发文件'" :id="id"></bufaFile>
      <buLu ref="buLu" v-if="text == '补录供方'" :id="id"></buLu>
      <fei-biao ref="feibiao" v-if="text == '废标'" :id="id"></fei-biao>
      <liu-biao ref="liubiao" v-if="text == '流标'" :id="id"></liu-biao>
      <!-- <qi-biao v-if="text == '弃标'" :id="id"></qi-biao> -->
      <jinDuCenter ref="jinDuCenter" v-if="text == '进度中心'" :id="id"></jinDuCenter>
      <guoChengLog ref="guoChengLog" v-if="text == '过程日志'" :id="id"></guoChengLog>
      <touBiaoTest ref="touBiaoTest" v-if="text == '投标检测'" :id="id"></touBiaoTest>
      <!-- <fang-an v-if="text == '招标文件'" :id="id"></fang-an> -->
      <ji-hua ref="jihua" v-if="text == '招标计划'" :id="id"></ji-hua>
      <de-sign ref="sheji" v-if="text == '设计文件及答疑'" :id="id"></de-sign>
      <eng-in ref="gongcheng" v-if="text == '工程文件及答疑'" :id="id"></eng-in>
      <zhao-biao ref="zhaobiao" v-if="text == '招标文件'" :id="id" @GetBidMasterPageShow="GetBidMasterPageShow"></zhao-biao>
      <ruWeiSubmit ref="ruWeiSubmit" v-if="text == '入围单位'" :id="id"></ruWeiSubmit>
      <fa-biao ref="fabiao" v-if="text == '发标'" :id="id"></fa-biao>
      <da-yi ref="dayi" v-if="text == '答疑'" :id="id"></da-yi>
      <da-yifile ref="dayifile" v-if="text == '答疑文件'" :id="id"></da-yifile>
      <hui-biao ref="huibiao" v-if="text == '回标'" :id="id"></hui-biao>
      <kai-biao ref="kaibiao" v-if="text == '开标'" :id="id"></kai-biao>
      <cheng-qing ref="chengqing" v-if="text == '澄清'" :id="id"></cheng-qing>
      <cheng-qing-han ref="chengqinghan" v-if="text == '澄清函'" :id="id"></cheng-qing-han>
      <ping-biao ref="pingbiao" v-if="text == '评标'" :id="id"></ping-biao>
      <ding-biaozw ref="dingbiao" v-if="text == '定标'" :id="id"></ding-biaozw>
      <ding-biaolx ref="dingbiao" v-if="text == '定标'" :id="id"></ding-biaolx>
      <ding-biaojc ref="dingbiao" v-if="text == '定标'" :id="id"></ding-biaojc>
    </el-main>
  </el-container>
</template>

<script>
import bus from "@/util/bus";
import { parseTime } from "@/util";
import BuLu from "./components/buLu.vue";
export default {
  components: {
    postPone: () => import("./components/postPone"),
    bufaFile: () => import("./components/bufaFile"),
    buLu: () => import("./components/buLu"),
    feiBiao: () => import("./components/feiBiao"),
    liuBiao: () => import("./components/liuBiao"),
    jinDuCenter: () => import("./components/jinDuCenter"),
    guoChengLog: () => import("./components/guoChengLog"),
    touBiaoTest: () => import("./components/touBiaoTest"),
    guoChengBaseInfo: () => import("./components/guoChengBaseInfo"),
    fangAn: () => import("./components/fangAn"),
    jiHua: () => import("./components/jiHua"),
    zhaoBiao: () => import("./components/zhaoBiao"),
    ruWeiSubmit: () => import("./components/ruWeiSubmit"),
    faBiao: () => import("./components/faBiao"),
    daYi: () => import("./components/daYi"),
    daYifile: () => import("./components/daYifile"),
    huiBiao: () => import("./components/huiBiao"),
    kaiBiao: () => import("./components/kaiBiao"),
    chengQing: () => import("./components/chengQing"),
    chengQingHan: () => import("./components/chengQingHan"),
    pingBiao: () => import("./components/pingBiao"),
    dingBiaozw: () => import("./components/dingBiaozw"),
    dingBiaolx: () => import("./components/dingBiaolx"),
    dingBiaojc: () => import("./components/dingBiaojc"),
    qiBiao: () => import("./components/qiBiao"),
    deSign: () => import("./components/deSign"),
    engIn: () => import("./components/engIn"),
    buluCom: () => import("./components/buluCom"),
  },
  // PingBiaoYiinject: ["reload"],
  data() {
    return {
      // id: "d5e5ba3e-0e90-4084-9077-66af1837fc56",
      id: this.$route.query.id,
      // tabto: this.$route.query.tab,
      indexactive: Number,
      info: {},
      loadingback: false,
      showback: false,
      isBidbutton: false,
      text: "",
      titleList: [
        { text: "招标计划", icon: "" },
        { text: "设计文件及答疑", icon: "" },
        { text: "工程文件及答疑", icon: "" },
        { text: "招标文件", icon: "" },
        { text: "入围单位", icon: "" },
        { text: "发标", icon: "" },
        { text: "答疑", icon: "" },
        { text: "答疑文件", icon: "" },
        { text: "回标", icon: "" },
        { text: "开标", icon: "" },
        { text: "澄清", icon: "" },
        { text: "澄清函", icon: "" },
        { text: "评标", icon: "" },
        { text: "定标", icon: "" },
      ],
      btnList: [
        { text: "补录单位" },
        { text: "计划变更" },
        { text: "补发文件" },
        // { text: "补录供方" },
        { text: "废标" },
        { text: "流标" },

        { text: "过程日志" },
        // { text: "弃标" },
        // { text: "投标检测" },
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
    bus.$emit("hideNav");
    this.$http.get("/BidCheckCenter/CheckUserProcessPageAuth", { params: { baseId: this.id } }).then((res) => {
      if (res.data.success) {
        if (!res.data.returnValue1) {
          this.GetBidMasterPageShow();
          this.GetBidDate1001();
        } else {
          this.$router.push({
            path: res.data.returnValue1,
          });
          this.GetBidDate1001();
        }
      } else {
        this.$router.push({
          path: "/bid/notice/",
        });
      }
    });
    this.$http.get("/UserSession/GetUserProcessAuth", { params: { bidModeId: this.id } }).then((res) => {
      this.titleList = [];
      for (var i = 0; i < res.data.length; i++) {
        var a = {};
        a.text = res.data[i];
        a.icon = "";
        this.titleList.push(a);
      }
      let indexactive = sessionStorage.getItem("indexactive");
      let tab = this.$route.query.tab;
      let arr = this.titleList.map((v) => v.text);
      if (!tab) {
        if (indexactive == null || indexactive == -1) {
          if (arr.indexOf("招标文件") > -1) {
            sessionStorage.setItem("indexactive", 1);
            this.indexactive = 1;
            this.tabto == "招标文件";
            this.text = "招标文件";
            this.titleList[indexactive].text = "招标文件";
          } else if (arr.indexOf("设计文件及答疑") > -1) {
            sessionStorage.setItem("indexactive", 1);
            this.indexactive = 1;
            this.text = "设计文件及答疑";
            this.titleList[indexactive].text = "设计文件及答疑";
          } else if (arr.indexOf("工程文件及答疑") > -1) {
            sessionStorage.setItem("indexactive", 1);
            this.indexactive = 1;
            this.text = "工程文件及答疑";
            this.titleList[indexactive].text = "工程文件及答疑";
          } else if (arr.indexOf("澄清函") > -1) {
            sessionStorage.setItem("indexactive", 2);
            this.indexactive = 2;
            this.text = "澄清函";
            this.titleList[indexactive].text = "澄清函";
          }

          // this.text = "招采方案";

          // if (this.tab == "docback") {
          //   sessionStorage.setItem("indexactive", 5);
          //   this.indexactive = 5;
          //   this.text = "回标";
          //   this.titleList[indexactive].text = "回标";
          // }
          // if (this.tab == "explain") {
          //   sessionStorage.setItem("indexactive", 7);
          //   this.indexactive = 7;
          //   this.text = "澄清";
          //   this.titleList[indexactive].text = "澄清";
          // }
        } else {
          this.indexactive = indexactive;
          this.text = this.titleList[indexactive].text;
        }
      } else {
        let index = arr.findIndex((v) => v == tab);
        console.log(index);
        sessionStorage.setItem("indexactive", index);
        this.indexactive = index;
        this.text = tab;
        this.titleList[index].text = tab;
      }

      // this.CheckUserProcessPageAuth();
    });
    this.GetBidMasterPageShow();
    this.CheckBidUserAuth();
  },
  methods: {
    parseTime,
    // CheckUserProcessPageAuth() {

    // },
    CheckBidUserAuth() {
      this.$http.get("/BidCheckCenter/CheckBidUserAuth", { params: { baseId: this.id } }).then((res) => {
        if (res.data.success) {
          this.showback = true;
        } else {
          this.showback = false;
        }
      });
    },
    openM() {
      // if (this.titleList[1].text == "招标文件") {
      //   this.tabto == "招标文件";
      // }
      // console.log(this.titleList[1].text);
      // console.log(this.tabto);
      if (this.tabto == undefined) {
        const h = this.$createElement;
        this.$msgbox({
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          title: "提示",
          message: h("p", null, [
            h("span", null, "撤销【"),
            h("i", "招标文件"),
            h("span", null, "】节点，撤销后将不可恢复，确定要执行撤销操作吗？"),
          ]),
        })
          .then(() => {
            this.goback();
          })
          .catch(() => {
            this.$msg({ type: "info", message: "已取消撤销" });
          });
      } else {
        const h = this.$createElement;
        this.$msgbox({
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          title: "提示",
          message: h("p", null, [
            h("span", null, "撤销【"),
            h("i", this.tabto),
            h("span", null, "】节点，撤销后将不可恢复，确定要执行撤销操作吗？"),
          ]),
        })
          .then(() => {
            this.goback();
          })
          .catch(() => {
            this.$msg({ type: "info", message: "已取消撤销" });
          });
      }
    },
    goback() {
      // this.$confirm("撤销【this.tabto】节点，撤销后将不可恢复，确定要执行撤销操作吗?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      // this.openM().then(() => {
      this.loadingback = true;
      if (this.tabto == undefined) {
        this.$http.post("/BidProcessReturn/ProcessCancelAll1000", { bidModeId: this.id, processName: "招标文件" }).then((res) => {
          if (res.data.success == false) {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
            this.loadingback = false;
          } else {
            this.loadingback = false;
            this.$refs.zhaobiao.tomethgozhaobiao();
          }
        });
      } else {
        this.$http.post("/BidProcessReturn/ProcessCancelAll1000", { bidModeId: this.id, processName: this.tabto }).then((res) => {
          if (res.data.success == false) {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
            this.loadingback = false;
          } else {
            console.log(this.tabto);
            this.loadingback = false;
            if (this.tabto == "发标") {
              this.$refs.fabiao.tomethgofabiao();
            }
            if (this.tabto == "答疑") {
              this.$refs.dayi.tomethgodayi();
            }
            if (this.tabto == "答疑文件") {
              this.$refs.dayifile.tomethgodayifile();
            }
            if (this.tabto == "回标") {
              this.$refs.huibiao.tomethgohuibiao();
            }
            if (this.tabto == "开标") {
              this.$refs.kaibiao.tomethgokaibiao();
            }
            if (this.tabto == "澄清") {
              this.$refs.chengqing.tomethgochengqing();
            }
            if (this.tabto == "评标") {
              this.$refs.pingbiao.tomethgopingbiao();
            }
            if (this.tabto == "定标") {
              this.$refs.dingbiao.tomethgodingbiao();
            }
            this.$message.success(res.data.message);
          }
        });
      }

      // });
    },
    GetUserProcessAuth() {},
    onlast() {
      this.$router.push({
        path: "/bid/bidProcessDemo",
      });
    },
    GetBidMasterPageShow() {
      this.$http.get("/BidMaster/GetBidMasterPageShow", { params: { bidModeId: this.id } }).then((res) => {
        this.info = res.data.baseInfo;
        let info = res.data.baseInfo;
        // let arr = [info.bidSendDate, info.bidQaEndDate, info.bidOpenDate, info.bidEndDate];
        // this.ulList.forEach((item, index) => {
        //   item.value = arr[index];
        // });
        // if (res.data.isBidUser) {
        //   this.isBidbutton = true;
        // } else {
        //   this.isBidbutton = false;
        // }
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
    refreshto: function () {
      if (this.text == "废标") {
        this.$refs.feibiao.tomethgofeibiao();
      }
      if (this.text == "流标") {
        this.$refs.liubiao.tomethgoliubiao();
      }
      if (this.text == "过程日志") {
        this.$refs.guoChengLog.tomethgoguoChengLog();
      }
      if (this.text == "补发文件") {
        this.$refs.bufaFile.tomethgobufaFile();
      }
      if (this.text == "计划变更") {
        this.$refs.postpone.tomethgopostpone();
      }
      if (this.text == "补录单位") {
        this.$refs.buluCom.tomethgobuluCom();
      }
      if (this.text == "招标计划") {
        this.$refs.jihua.tomethgojihua();
      }
      if (this.text == "招标文件") {
        this.$refs.zhaobiao.tomethgozhaobiao();
      }
      if (this.text == "入围单位") {
        this.$refs.ruWeiSubmit.tomethgoruWeiSubmit();
      }
      if (this.text == "发标") {
        this.$refs.fabiao.tomethgofabiao();
      }
      if (this.text == "答疑") {
        this.$refs.dayi.tomethgodayi();
      }
      if (this.text == "答疑文件") {
        this.$refs.dayifile.tomethgodayifile();
      }
      if (this.text == "回标") {
        this.$refs.huibiao.tomethgohuibiao();
      }
      if (this.text == "开标") {
        this.$refs.kaibiao.tomethgokaibiao();
      }
      if (this.text == "澄清") {
        this.$refs.chengqing.tomethgochengqing();
      }
      if (this.text == "评标") {
        this.$refs.pingbiao.tomethgopingbiao();
      }
      if (this.text == "定标") {
        this.$refs.dingbiao.tomethgodingbiao();
      }
      if (this.text == "澄清函") {
        this.$refs.chengqinghan.tomethgochengqinghan();
      }
      if (this.text == "工程文件及答疑") {
        this.$refs.gongcheng.tomethgogongcheng();
      }
      if (this.text == "设计文件及答疑") {
        this.$refs.sheji.tomethgosheji();
      }
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
    // 延期流标切换
    btnClick(val) {
      this.text = val;
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
</style>
