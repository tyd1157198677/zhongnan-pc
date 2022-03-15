import store from "@/store";
// import { cloneDeep } from 'lodash'
export default {
  login(to, from, next) {
    if (to.name == "oatodo") {
      next();
    } else {
      let token = localStorage.getItem("accessToken");
      const needLogin = to.matched.some(item => item.meta.requireAuth !== false);
      // next("/oatodo/");
      if (needLogin && !token) {
        next("/Login");
      } else {
        if (to.path === "/" && store.state.token && store.state.menu.menus) {
          next("/home");
        } else {
          next();
        }
      }
    }
  },
  // authTicket (to, from, next) {
  //   if (!store.state.ticket) {
  //     let redirectUrl = window.location.href
  //     const urlParams = qs.parse(redirectUrl.split('?')[1])
  //     if (urlParams.ticket) {
  //       store.commit('setTicket', urlParams.ticket)
  //       next()
  //     } else {
  //       redirectUrl = encodeURIComponent(redirectUrl)
  //       window.location.href = `https://idmtest.chinajinmao.cn:8483/cas?service=${redirectUrl}`
  //       next(false)
  //     }
  //   } else {
  //     next()
  //   }
  // },
  // async menuAuth(to, from, next) {
  //   const needLogin = to.matched.some(item => item.meta.requireAuth);
  //   if (needLogin && store.state.token) {
  //     try {
  //       const hasAuth = store.state.hasAuth;
  //       if (!hasAuth) {
  //         await store.dispatch("getUserMenu");
  //       }
  //       const auth = store.state.menuList.some(item => item.menuUrl === to.path);
  //       const allowRead = to.meta.allowRead;
  //       if (to.path === "/home" && !auth) {
  //         const menu = store.state.menuList.reduce((prev, current) => {
  //           if (!prev.menuLevel) {
  //             return current;
  //           } else if (prev.menuLevel > current.menuLevel) {
  //             return current;
  //           } else {
  //             return prev;
  //           }
  //         }, {});
  //         next({
  //           path: menu.menuUrl,
  //           replace: true,
  //         });
  //       } else {
  //         // if (auth) {
  //         const arr = to.matched
  //           .filter(item => item.meta.menuCode)
  //           .map(item => {
  //             return store.state.menuList.find(menu => menu.menuCode === item.meta.menuCode);
  //           });
  //         store.commit("setParentId", arr);
  //         // }
  //         next();
  //       }
  //     } catch (e) {
  //       // console.log(e)
  //       store.commit("setToken", "");
  //       store.commit("setUserName", "");
  //       store.commit("setUserGuid", "");
  //       next({
  //         path: "/",
  //         replace: true,
  //       });
  //     }
  //   } else {
  //     next();
  //   }
  //   // addInfoAuth(to)
  // },
};
/**
 * 用户浏览页面记录
 * @date: 2020/5/22
 */
// function addInfoAuth(obj) {
//   if (!obj.meta.menuCode) {
//     return false
//   }
//   window.axios
//     .post('/api/services/app/SysViewLog/AddViewLogForPc', {
//       menuCode: obj.meta.menuCode,
//       menuUrl: obj.path
//     })
//     .then()
//     .catch(e => {
//       console.log(e)
//     })
// }
