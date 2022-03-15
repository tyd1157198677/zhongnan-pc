<template>
  <el-main class="main">
    <!-- <div style="float:right;margin-top:7px;margin-bottom:-35px;">
        <el-button size="small" type="primary" @click="goback">返回</el-button>
      </div> -->
    <el-tabs v-model="activeName" class="mytabs">
      <el-tab-pane v-for="(item, index) in towMenu" :key="index" :label="item.label" :name="item.name" style="width: 99%">
        <component v-if="activeName == item.name" :is="item.component" :id="id" />
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import AppBase from "./components/base";
import lianxiren from "./components/lianxiren";
import bank from "./components/bank";
import company from "./components/company";
import contract from "./components/contract";
import post from "./components/post";
import certificate from "./components/certificate";
import assess from "./components/assess";
import daylog from "./components/daylog";
import audit from "./components/audit";
import history from "./components/history";
import handle from "./components/handle";
import  operation from "./components/operation";

export default {
  data() {
    return {
      towMenu: [],
      activeName: "bases",
      id: "",
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log(to);
  //   console.log(from);
  // },

  created() {
    // this.$emit("header", false);
    // this.$emit("footer", false);
  },
  mounted() {
    let istodo = this.$route.query.istodo;
    this.id = this.$route.params.id;
    if (istodo) {
      this.towMenu = [
        { label: "基本信息", name: "bases", component: AppBase },
        { label: "联系人信息", name: "lianxiren", component: lianxiren },
        { label: "银行信息", name: "bank", component: bank },
        { label: "既往业绩", name: "post", component: post },
        { label: "资质及证书", name: "certificate", component: certificate },
        { label: "供应商审核", name: "audit", component: audit },
      ];
      this.$api.SupBaseInfo.GetOneSupBaseInfoById(this.id).then((res) => {
        if (res.regStatus == "审批完成") {
          this.towMenu.push({ label: "考察信息", name: "daylog", component: daylog });
        }
      });
    } else {
      this.towMenu = [
        { label: "基本信息", name: "bases", component: AppBase },
        { label: "联系人信息", name: "lianxiren", component: lianxiren },
        { label: "银行信息", name: "bank", component: bank },
        { label: "既往业绩", name: "post", component: post },
        { label: "资质及证书", name: "certificate", component: certificate },
        { label: "供应商审核", name: "audit", component: audit },
        { label: "合同及评估", name: "contract", component: contract },
        { label: "考察信息", name: "daylog", component: daylog },
        // { label: "合同及履约", name: "assess", component: assess },
        { label: "历史投标", name: "history", component: history },
        { label: "常用操作", name: "handle", component: handle },
      ];
    }
    if (this.id) {
      // this.towMenu.splice(1, 0, { label: "分公司信息", name: "company", component: company });
      this.$http.get("/SupSubCompany/GetSupSubCompaniesList", { params: { baseGuid: this.id } }).then((res) => {
        if (res.data.length > 0) {
          //在第二的位置插入一条
          this.towMenu.splice(1, 0, { label: "分公司信息", name: "company", component: company });
        }
      });
      this.$http.get("/UserAuth/CheckUserOperationRole").then((res) => {
        if(res.data.success){
          this.towMenu.splice(10, 0, { label: "运维日志", name: " operation", component:  operation });
        }
      });
    }
  },
  methods: {
    goback() {
      this.$router.push({
        path: "../storageList",
        // query: { id: this.id }
      });
    },
    sendInfo(buer) {
      console.log(buer);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh);
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 10px 10px 0 0;
  padding: 0 10px 0 10px;
}
.mytabs {
  width: 100%;
}
.infobtn {
  position: absolute;
  right: 8.5%;
  z-index: 1;
  margin-bottom: -35px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: 0px;
  margin-left: 0px;
}
</style>
