const storeState = () => ({
  menus: [],
  oriMenus: [],
});

const mutations = {
  /**
   * 根据服务端拉取到的原始菜单列表初始化页面需要的菜单列表格式
   */
  init: (state, oriMenus) => {
    // console.log(state.menus)
    state.oriMenus = oriMenus || [];
    if (oriMenus && oriMenus.length > 0) {
      state.menus = initTree("00000000-0000-0000-0000-000000000000", oriMenus);
      localStorage.setItem("oriMenus", JSON.stringify(oriMenus));
      // console.log(state.menus);
      return;
    }
    state.menus = [];
  },
};

const initTree = function(pid, menus) {
  localStorage.setItem("menus", JSON.stringify(menus));
  let target = [];
  menus
    .filter(x => x.parentId == pid)
    .sort(function(x, y) {
      return x.menuOrder - y.menuOrder;
    })
    .forEach(x => {
      target.push({
        index: x.id,
        pid: x.parentId,
        route: { path: x.menuUrl.replace(/^\/#/, ""), cmp: x.menuDesc.replace(/^\.\.\/views/, "") },
        name: x.menuName,
        subMenus: initTree(x.id, menus),
      });
    });
  return target;
};

export default {
  namespaced: true,
  state: storeState,
  mutations,
};
