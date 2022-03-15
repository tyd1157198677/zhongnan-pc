<template>
  <el-row>
    <el-col :span="24" class="pr-2">
      <el-menu :default-active="$route.name" class="border">
        <el-menu-item
          v-for="(menu, index) in planMenu"
          :key="menu.route"
          :index="menu.route"
          :class="{ 'border-bottom': index < planMenu.length }"
          style="height: 40px"
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
  name: "PlanMenuOther",
  data() {
    return {
      planMenu: [],
    };
  },
  mounted() {
    let pathName = this.$route.name;
    let index = pathName.lastIndexOf("E");
    pathName = pathName.substring(0, index);
    let bidModes = [];
    if (pathName == "/bid/bidMode4/") {
      bidModes = ["基本信息", "计划节点", "标段信息", "采购小组成员", "集采供应商", "相关附件", "提交方案"];
    } else if (pathName == "/bid/bidMode3/") {
      bidModes = ["基本信息", "计划节点",  "选择供方", "相关附件", "提交方案"];
    } else {
      bidModes = ["基本信息", "计划节点", "采购小组成员", "选择供方", "相关附件", "提交方案"];
    }
    bidModes.map((item, i) => {
      this.planMenu.push({
        route: pathName + "EditStep" + (i + 1),
        icon: "el-icon-menu",
        name: item,
      });
    });
  },
  methods: {
    firstMenuClick(id, menuUrl) {
      console.log(this.$route);
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