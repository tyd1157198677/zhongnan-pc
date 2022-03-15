<template>
  <el-row>
    <el-col :span="24" class="pr-2">
      <el-menu :default-active="$route.name" class="border" v-if="showdep">
        <el-menu-item
          v-for="(menu, index) in planMenuDemo"
          :key="menu.route"
          :index="menu.route"
          :class="{ 'border-bottom': index < planMenuDemo.length }"
          style="height:40px"
          @click="firstMenuClick(menu.index, menu.route)"
        >
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </el-menu>
      <el-menu :default-active="$route.name" class="border" v-if="showdepno">
        <el-menu-item
          v-for="(menu, index) in planMenuDemo1"
          :key="menu.route"
          :index="menu.route"
          :class="{ 'border-bottom': index < planMenuDemo1.length }"
          style="height:40px"
          @click="firstMenuClick(menu.index, menu.route)"
        >
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "planMenuDemo",
  data() {
    return {
      planMenuDemo: [],
      planMenuDemo1: [],
      showdepno: true,
      showdep: false,
    };
  },
  computed: {
    planId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else if (this.$route.params.id) {
        return this.$route.params.id;
      } else {
        return this.id;
      }
    },
  },
  created() {
    this.GetMasterByPlanId01();
  },
  mounted() {
    this.planMenuDemo = [
      // {
      //   route: "/bid/bidMode7/EditStep1",
      //   icon: "el-icon-menu",
      //   name: "招标计划",
      // },
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
      // {
      //   route: "/bid/bidMode7/EditStep1",
      //   icon: "el-icon-menu",
      //   name: "招标计划",
      // },
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
    // firstMenuClick(id, menuUrl) {
    //   // const { baseId } = this.$route.query.row.id;
    //   let to = menuUrl;
    //   // if(baseId) {
    //   //     to += `/${baseId}`
    //   // }
    //   this.$router.push({
    //     path: to,
    //     query: { id: this.$route.query.id },
    //   });
    firstMenuClick(id, menuUrl) {
      const { baseId } = this.$route.params;
      let to = menuUrl;
      if (baseId) {
        to += `/${baseId}`;
      }
      this.$router.push({
        path: to,
        // query: { id: this.$route.query.id },
      });
    },
    GetMasterByPlanId01() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then(res => {
        if (res.deposit == 0 || res.deposit == "" || res.deposit == null) {
          this.showdep = false;
          this.showdepno = true;
        } else {
          this.showdep = true;
          this.showdepno = false;
        }
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
