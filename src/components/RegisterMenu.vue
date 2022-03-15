<template>
  <div>
    <div>
      <el-menu class="border" mode="horizontal" :default-active="activeFirst">
        <el-menu-item
          class="border-bottom"
          v-for="menu in registerMenu"
          :key="menu.index"
          :index="menu.index"
          @click="firstMenuClick(menu.index, menu.pid)"
        >
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <el-menu class="navtwo" mode="horizontal" :default-active="activeSub">
      <el-menu-item v-for="menu in subMenu" :key="menu.index" :index="menu.index" @click="firstMenuClick(menu.index, menu.pid)">
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RegisterMenu",
  data() {
    return {
      subMenu: [],
      activeFirst: "",
      activeSub: "",
    };
  },
  computed: {
    ...mapState("menu", { registerMenu: "menus", oriMenus: "oriMenus" }),
  },
  created() {
    let currRouteId = this.$route.name;

    const m = this.oriMenus.find(x => x.id == currRouteId) || this.oriMenus[0];
    this.renderColor(m.id, m.parentId);

    // if (this.registerMenu && this.registerMenu.length > 0) {
    //   const m = this.registerMenu[0];
    //   this.renderColor(m.index, m.pid);
    // }
  },
  methods: {
    renderColor(id, pid) {
      let menu = this.registerMenu.find(x => x.index == id);
      let subMenu;
      if (!menu) {
        menu = this.registerMenu.find(x => x.index == pid);
        subMenu = menu.subMenus.find(x => x.index == id);
      }
      if (menu.subMenus && menu.subMenus.length > 0) {
        if (!subMenu) {
          subMenu = menu.subMenus[0];
        }
      }
      this.activeFirst = menu.index;
      this.subMenu = menu.subMenus;
      if (subMenu) {
        this.activeSub = subMenu.index;
        return subMenu;
      }
      return menu;
    },
    firstMenuClick(id, pid) {
      // console.log("firstMenuClick:", id, pid);
      let menu = this.renderColor(id, pid);
      // console.log("firstMenuClick,menu:", menu);
      if (menu) {
        this.$router.push(menu.route);
      }
    },
  },
};
</script>

<style scoped less>
.navtwo .el-menu-item {
  font-size: 14px;
}
::v-deep .el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
  position: relative;
  -webkit-box-sizing: border-box;
  white-space: nowrap;
  list-style: none;
}
</style>
