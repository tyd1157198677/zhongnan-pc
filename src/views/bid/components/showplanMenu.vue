<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button type="primary" @click="gotoanpai">招标安排</el-button>
          <el-button type="primary" @click="gotoruwei">招标入围</el-button>
        </el-button-group>
        <peo-user style="width:100%;margin-top:10px" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PlanMenu from "../components/PlanMenuDemo.vue";
import PlanMenuru from "../components/PlanMenuDemoru.vue";
export default {
  name: "planMenuDemo",
  components: { PlanMenu, PlanMenuru, peoUser: () => import("@/components/peoUser.vue") },
  data() {
    return {
      id: this.$route.query.id,
      planMenu: [],
      active: "招标安排",
      planMenuDemo: [],
      planMenuDemo1: [],
      showdepno: true,
      showdep: false,
    };
  },
  computed: {
    // id() {
    //   if (this.$route.query.id) {
    //     return this.$route.query.id;
    //   } else {
    //     return this.id;
    //   }
    // },
  },
  created() {},
  mounted() {
    this.planMenu = [
      {
        route: "/bid/bidMode6/EditStep1",
        icon: "el-icon-menu",
        name: "基本信息",
      },
      {
        route: "/bid/bidMode6/EditStep3",
        icon: "el-icon-menu",
        name: "标段信息",
      },
      {
        route: "/bid/bidMode6/EditStep2",
        icon: "el-icon-menu",
        name: "招标小组",
      },

      {
        route: "/bid/bidMode6/EditStep4",
        icon: "el-icon-menu",
        name: "招标单项计划",
      },
      {
        route: "/bid/bidMode6/EditStep5",
        icon: "el-icon-menu",
        name: "相关附件",
      },
      {
        route: "/bid/bidMode6/EditStep6",
        icon: "el-icon-menu",
        name: "提交计划",
      },
      // {
      //     route:"/bid/bidMode1/EditStep7",
      //     icon:"el-icon-menu",
      //     name:"招标公告"
      // },
      // {
      //     route:"/bid/bidMode1/EditStep8",
      //     icon:"el-icon-menu",
      //     name:"相关附件"
      // },
      // {
      //     route:"/bid/bidMode1/EditStep9",
      //     icon:"el-icon-menu",
      //     name:"提交方案"
      // }
    ];
    this.planMenuDemo = [
      {
        route: "/bid/bidMode7/EditStep1",
        icon: "el-icon-menu",
        name: "招标计划",
      },
      {
        route: "/bid/bidMode7/EditStep2",
        icon: "el-icon-menu",
        name: "入围基本信息",
      },
      {
        route: "/bid/bidMode7/EditStep7",
        icon: "el-icon-menu",
        name: "招标公告",
      },
      {
        route: "/bid/bidMode7/EditStep3",
        icon: "el-icon-menu",
        name: "邀请单位",
      },
      {
        route: "/bid/bidMode7/EditStep8",
        icon: "el-icon-menu",
        name: "相关附件",
      },
      {
        route: "/bid/bidMode7/EditStep4",
        icon: "el-icon-menu",
        name: "入围单位",
      },

      {
        route: "/bid/bidMode7/EditStep5",
        icon: "el-icon-menu",
        name: "投标保证金",
      },
      {
        route: "/bid/bidMode7/EditStep6",
        icon: "el-icon-menu",
        name: "投标承诺函",
      },
      {
        route: "/bid/bidMode7/EditStep9",
        icon: "el-icon-menu",
        name: "退还保证金审批",
      },
      {
        route: "/bid/bidMode7/EditStep10",
        icon: "el-icon-menu",
        name: "退还保证金确认",
      },
    ];
    this.planMenuDemo1 = [
      {
        route: "/bid/bidMode7/EditStep1",
        icon: "el-icon-menu",
        name: "招标计划",
      },
      {
        route: "/bid/bidMode7/EditStep2",
        icon: "el-icon-menu",
        name: "入围基本信息",
      },
      {
        route: "/bid/bidMode7/EditStep7",
        icon: "el-icon-menu",
        name: "招标公告",
      },
      {
        route: "/bid/bidMode7/EditStep3",
        icon: "el-icon-menu",
        name: "邀请单位",
      },
      {
        route: "/bid/bidMode7/EditStep8",
        icon: "el-icon-menu",
        name: "相关附件",
      },
      {
        route: "/bid/bidMode7/EditStep4",
        icon: "el-icon-menu",
        name: "入围单位",
      },

      // {
      //   route: "/bid/bidMode7/EditStep5",
      //   icon: "el-icon-menu",
      //   name: "投标保证金",
      // },
      {
        route: "/bid/bidMode7/EditStep6",
        icon: "el-icon-menu",
        name: "投标承诺函",
      },
      // {
      //   route: "/bid/bidMode7/EditStep9",
      //   icon: "el-icon-menu",
      //   name: "退还保证金审批",
      // },
      // {
      //   route: "/bid/bidMode7/EditStep10",
      //   icon: "el-icon-menu",
      //   name: "退还保证金确认",
      // },
    ];
  },
  methods: {
    gotoanpai() {
      const { baseId } = this.$route.params;
      // this.$router.push({
      //   path: "#/bid/bidMode6/EditStep1/" + this.id,
      // });
      this.$router.push({
        path: `/bid/bidMode6/EditStep3/` + baseId,
        // query: {
        //   baseId: baseId,
        // },
      });
    },
    gotoruwei() {
      const { baseId } = this.$route.params;
      // this.$router.push({
      //   path: "#/bid/bidMode7/EditStep1/" + this.id,
      // });
      this.$router.push({
        path: `/bid/bidMode7/EditStep2/` + baseId,
        // query: {
        //   baseId: baseId,
        // },
      });
    },
    firstMenuClick(id, menuUrl) {
      const { baseId } = this.$route.params;
      let to = menuUrl;
      if (baseId) {
        to += `/${baseId}`;
      }
      this.$router.push({
        path: to,
      });
    },
  },
};
</script>

<style scoped less>
.el-menu-item {
  font-size: 14px;
  font-weight: 400;
}

.el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
  position: relative;
  -webkit-box-sizing: border-box;
  white-space: nowrap;
  list-style: none;
}
</style>
