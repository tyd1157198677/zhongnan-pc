import Vue from "vue";
import VueRouter from "vue-router";
import hooks from "./hook.js";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: (to) => {
      console.log(to);
      // 根据当前token状态和当前菜单列表状态，判断首页应该跳转到哪里
      const needLogin = to.matched.some((item) => item.meta.requireAuth !== false);
      if (needLogin && !store.state.token) {
        return { name: "Login" };
      } else {
        if (store.state.token && store.state.menu.menus && store.state.menu.menus.length == 0) {
          return { name: "Login" };
        }
        return { name: "home" };
      }
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/supplier/storageList.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/Login1",
    name: "Login1",
    component: () => import("@/views/Login1.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/supplier/detail/:id",
    name: "/supplier/detail/index",
    component: () => import("@/views/supplier/detail/index.vue"),
  },
  {
    path: "/homeInex",
    name: "HomeInex",
    component: () => import("../views/HomeInex.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  /** 招标采购 - OA待办跳转页面 */
  // {
  //   path: "/todo/oatoDo/",
  //   name: "oatodo",
  //   component: () => import("../views/todo/oatoDo.vue"),
  // },
  {
    path: "/oatodo/",
    name: "oatodo",
    component: () => import("../views/oatodo.vue"),
  },
  {
    path: "/loginDD/",
    name: "loginDD",
    component: () => import("../views/loginDD.vue"),
  },
  /** 招标采购 - 待办 - 列表 */
  {
    path: "/bid/processDesignTodo/",
    name: "bid-processDesignTodo",
    component: () => import("../views/bid/processDesignTodo.vue"),
  },
  /** 招标采购 - 待办 - 列表 */
  {
    path: "/bid/processProgrammeTodo/",
    name: "bid-processProgrammeTodo",
    component: () => import("../views/bid/processProgrammeTodo.vue"),
  },
  /** 招标采购 - 待办 - 列表 */
  {
    path: "/bid/bidDivideDetail/",
    name: "bid-bidDivideDetail",
    component: () => import("../views/bid/bidDivideDetail.vue"),
  },
  /** 招标采购 - 待办 - 列表 */
  {
    path: "/bid/bidDepositConfirm/",
    name: "bid-bidDepositConfirm",
    component: () => import("../views/bid/bidDepositConfirm.vue"),
  },
  /** 招标采购 - 待办 - 列表 */
  {
    path: "/bid/bidSupplierIn/",
    name: "bid-bidSupplierIn",
    component: () => import("../views/bid/bidSupplierIn.vue"),
  },
  /** 招标采购 - 待办 - 列表 */
  {
    path: "/bid/bidDepositBack/",
    name: "bid-bidDepositBack",
    component: () => import("../views/bid/bidDepositBack.vue"),
  },
  /** 招标采购 - 待办 - 列表 */
  {
    path: "/bid/supplierDivideDetail/",
    name: "bid-supplierDivideDetail",
    component: () => import("../views/bid/supplierDivideDetail.vue"),
  },
  /** 招标采购 - 待办 - 列表 */
  {
    path: "/bid/supplierUploadFileTodo1/",
    name: "bid-supplierUploadFileTodo1",
    component: () => import("../views/bid/supplierUploadFileTodo1.vue"),
  },
  /** 招标采购 - 分工待办 - 列表 */
  {
    path: "/bid/bidRequireDetail/",
    name: "bid-bidRequireDetail",
    component: () => import("../views/bid/bidRequireDetail.vue"),
  },
  /** 招标采购 - 分工待办 - 列表 */
  {
    path: "/bid/bidrequireshowdet/",
    name: "bid-bidrequireshowdet",
    component: () => import("../views/bid/bidrequireshowdet.vue"),
  },
  /** 招标采购 - 入围单位 -审批页面 */
  {
    path: "/bid/supInAudit/",
    name: "bid-supInAudit",
    component: () => import("../views/bid/supInAudit.vue"),
  },
  /** 招标采购 - 入围单位 -详情页面 */
  {
    path: "/bid/supplierInDetail/",
    name: "bid-supplierInDetail",
    component: () => import("../views/bid/supplierInDetail.vue"),
  },
  /** 招标采购 - 入围单位 -提交审批 */
  {
    path: "/bid/supplierInChose/",
    name: "bid-supplierInChose",
    component: () => import("../views/bid/supplierInChose.vue"),
  },
  /** 招标采购 - 考察信息 -审批页面 */
  {
    path: "/bid/supInvesAudit/",
    name: "bid-supInvesAudit",
    component: () => import("../views/bid/supInvesAudit.vue"),
  },
  {
    path: "/bid/bidProcessDemo/",
    name: "bid-bidProcessDemo",
    component: () => import("../views/bid/bidProcessDemo.vue"),
  },
  /** 招标采购 -技术标 */
  {
    path: "/bid/processTechDetail/",
    name: "bid-processTechDetail",
    component: () => import("../views/bid/processTechDetail.vue"),
  },
  /** 招标采购 - 商务标 */
  {
    path: "/bid/processBusinessDetail/",
    name: "bid-processBusinessDetail",
    component: () => import("../views/bid/processBusinessDetail.vue"),
  },
  /** 招标采购 - 设计 */
  {
    path: "/bid/designDetail/",
    name: "bid-designDetail",
    component: () => import("../views/bid/designDetail.vue"),
  },
  /** 招标采购 - 工程 */
  {
    path: "/bid/engDetail/",
    name: "bid-engDetail",
    component: () => import("../views/bid/engDetail.vue"),
  },
  /** 招标采购 - 待办 - 列表 */
  {
    path: "/bid/notice/",
    name: "bid-notice",
    component: () => import("../views/bid/notice.vue"),
  },
  /** 招标采购 - 招采计划 - 列表 */
  {
    path: "/bid/bidPlan",
    name: "bid-bidPlan",
    component: () => import("../views/bid/bidPlan.vue"),
  },
  {
    path: "/bid/dingbiaoZw",
    name: "bid-dingbiaoZw",
    component: () => import("../views/bid/dingbiaoZw.vue"),
  },
  {
    path: "/bid/dingbiaoLx",
    name: "bid-dingbiaoLx",
    component: () => import("../views/bid/dingbiaoLx.vue"),
  },
  /** 招标采购 - 招采计划 - 添加或修改 */
  {
    path: "/bid/bidPlanForm",
    name: "bid-bidPlanForm",
    component: () => import("../views/bid/bidPlanForm.vue"),
  },
  /** 招标采购 - 招采计划 - 详情 */
  {
    path: "/bid/bidPlanShow",
    name: "bid-bidPlanShow",
    component: () => import("../views/bid/bidPlanShow.vue"),
  },
  /** 招标采购 - 招采计划 - 新增 */
  {
    path: "/bid/bidPlanAdd",
    name: "bid-bidPlanAdd",
    component: () => import("../views/bid/bidPlanAdd.vue"),
  },
  /** 招标采购 - 招采计划 - 新增 */
  {
    path: "/bid/processDetailjianyi",
    name: "bid-processDetailjianyi",
    component: () => import("../views/bid/processDetailjianyi.vue"),
  },
  /** 招标采购 - 招标分工 - 详情 */
  {
    path: "/bid/divideWork",
    name: "bid-divideWork",
    component: () => import("../views/bid/divideWork.vue"),
  },
  {
    path: "/jcBid/addtract",
    name: "jcBid-addtract",
    component: () => import("../views/jcBid/addtract.vue"),
  },
  {
    path: "/jcBid/showtract",
    name: "jcBid-showtract",
    component: () => import("../views/jcBid/showtract.vue"),
  },
  /** 招标采购 - 入围分工 - 详情 */
  {
    path: "/bid/divideSupplier",
    name: "bid-divideSupplier",
    component: () => import("../views/bid/divideSupplier.vue"),
  },
  /** 招标采购 - 招采方案 - 基本信息 */
  {
    path: "/bid/bidMode1/EditStep1/:baseId?",
    name: "/bid/bidMode1/EditStep1",
    component: () => import("../views/bid/bidMode1/EditStep1.vue"),
  },
  /** 招标采购 - 招采方案 - 计划节点 */
  {
    path: "/bid/bidMode1/EditStep2/:baseId?",
    name: "/bid/bidMode1/EditStep2",
    component: () => import("../views/bid/bidMode1/EditStep2.vue"),
  },
  /** 招标采购 - 招采方案 - 标段信息 */
  {
    path: "/bid/bidMode1/EditStep3/:baseId?",
    name: "/bid/bidMode1/EditStep3",
    component: () => import("../views/bid/bidMode1/EditStep3.vue"),
  },
  /** 招标采购 - 招采方案 - 入围标准 */
  {
    path: "/bid/bidMode1/EditStep4/:baseId?",
    name: "/bid/bidMode1/EditStep4",
    component: () => import("../views/bid/bidMode1/EditStep4.vue"),
  },
  /** 招标采购 - 招采方案 - 邀请供方 */
  {
    path: "/bid/bidMode1/EditStep5/:baseId?",
    name: "/bid/bidMode1/EditStep5",
    component: () => import("../views/bid/bidMode1/EditStep5.vue"),
  },
  /** 招标采购 - 招采方案 - 采购小组成员 */
  {
    path: "/bid/bidMode1/EditStep6/:baseId?",
    name: "/bid/bidMode1/EditStep6",
    component: () => import("../views/bid/bidMode1/EditStep6.vue"),
  },
  /** 招标采购 - 招采方案 - 招标公告 */
  {
    path: "/bid/bidMode1/EditStep7/:baseId?",
    name: "/bid/bidMode1/EditStep7",
    component: () => import("../views/bid/bidMode1/EditStep7.vue"),
  },
  /** 招标采购 - 招采方案 - 相关附件 */
  {
    path: "/bid/bidMode1/EditStep8/:baseId?",
    name: "/bid/bidMode1/EditStep8",
    component: () => import("../views/bid/bidMode1/EditStep8.vue"),
  },
  /** 招标采购 - 招采方案 - 提交方案 */
  {
    path: "/bid/bidMode1/EditStep9/:baseId?",
    name: "/bid/bidMode1/EditStep9",
    component: () => import("../views/bid/bidMode1/EditStep9.vue"),
  },
  /** 招标采购 - 招采方案 - 基本信息 */
  {
    path: "/bid/bidMode6/EditStep1/:baseId?",
    name: "/bid/bidMode6/EditStep1",
    component: () => import("../views/bid/bidMode6/EditStep1.vue"),
  },
  /** 招标采购 - 招采方案 - 计划节点 */
  {
    path: "/bid/bidMode6/EditStep2/:baseId?",
    name: "/bid/bidMode6/EditStep2",
    component: () => import("../views/bid/bidMode6/EditStep2.vue"),
  },
  /** 招标采购 - 招采方案 - 标段信息 */
  {
    path: "/bid/bidMode6/EditStep3/:baseId?",
    name: "/bid/bidMode6/EditStep3",
    component: () => import("../views/bid/bidMode6/EditStep3.vue"),
  },
  /** 招标采购 - 招采方案 - 入围标准 */
  {
    path: "/bid/bidMode6/EditStep4/:baseId?",
    name: "/bid/bidMode6/EditStep4",
    component: () => import("../views/bid/bidMode6/EditStep4.vue"),
  },
  /** 招标采购 - 招采方案 - 邀请供方 */
  {
    path: "/bid/bidMode6/EditStep5/:baseId?",
    name: "/bid/bidMode6/EditStep5",
    component: () => import("../views/bid/bidMode6/EditStep5.vue"),
  },
  /** 招标采购 - 招采方案 - 邀请供方 */
  {
    path: "/bid/yibanzhaobiao",
    name: "/bid/yibanzhaobiao",
    component: () => import("../views/bid/yibanzhaobiao.vue"),
  },
  /** 招标采购 - 招采方案 - 采购小组成员 */
  {
    path: "/bid/bidMode6/EditStep6/:baseId?",
    name: "/bid/bidMode6/EditStep6",
    component: () => import("../views/bid/bidMode6/EditStep6.vue"),
  },
  /** 招标采购 - 招采方案 - 招标公告 */
  {
    path: "/bid/bidMode6/EditStep7/:baseId?",
    name: "/bid/bidMode6/EditStep7",
    component: () => import("../views/bid/bidMode6/EditStep7.vue"),
  },
  /** 招标采购 - 招采方案 - 相关附件 */
  {
    path: "/bid/bidMode6/EditStep8/:baseId?",
    name: "/bid/bidMode6/EditStep8",
    component: () => import("../views/bid/bidMode6/EditStep8.vue"),
  },
  /** 招标采购 - 招采方案 - 提交方案 */
  {
    path: "/bid/bidMode6/EditStep9/:baseId?",
    name: "/bid/bidMode6/EditStep9",
    component: () => import("../views/bid/bidMode6/EditStep9.vue"),
  },
  {
    path: "/bid/bidMode6/shangWu/:baseId?",
    name: "/bid/bidMode6/shangWu",
    component: () => import("../views/bid/bidMode6/shangWu.vue"),
  },
  {
    path: "/bid/bidMode6/jiShu/:baseId?",
    name: "/bid/bidMode6/jiShu",
    component: () => import("../views/bid/bidMode6/jiShu.vue"),
  },
  {
    path: "/bid/bidModeDetailYq/:baseId?",
    name: "bidModeDetailYq",
    component: () => import("../views/bid/bidMode6/detali/index.vue"),
  },
  /** 招标采购 - 招采方案 - 基本信息 */
  {
    path: "/bid/bidMode7/EditStep1/:baseId?",
    name: "/bid/bidMode7/EditStep1",
    component: () => import("../views/bid/bidMode7/EditStep1.vue"),
  },
  /** 招标采购 - 招采方案 - 计划节点 */
  {
    path: "/bid/bidMode7/EditStep2/:baseId?",
    name: "/bid/bidMode7/EditStep2",
    component: () => import("../views/bid/bidMode7/EditStep2.vue"),
  },
  /** 招标采购 - 招采方案 - 标段信息 */
  {
    path: "/bid/bidMode7/EditStep3/:baseId?",
    name: "/bid/bidMode7/EditStep3",
    component: () => import("../views/bid/bidMode7/EditStep3.vue"),
  },
  /** 招标采购 - 招采方案 - 入围标准 */
  {
    path: "/bid/bidMode7/EditStep4/:baseId?",
    name: "/bid/bidMode7/EditStep4",
    component: () => import("../views/bid/bidMode7/EditStep4.vue"),
  },
  /** 招标采购 - 招采方案 - 邀请供方 */
  {
    path: "/bid/bidMode7/EditStep5/:baseId?",
    name: "/bid/bidMode7/EditStep5",
    component: () => import("../views/bid/bidMode7/EditStep5.vue"),
  },
  /** 招标采购 - 招采方案 - 采购小组成员 */
  {
    path: "/bid/bidMode7/EditStep6/:baseId?",
    name: "/bid/bidMode7/EditStep6",
    component: () => import("../views/bid/bidMode7/EditStep6.vue"),
  },
  /** 招标采购 - 招采方案 - 招标公告 */
  {
    path: "/bid/bidMode7/EditStep7/:baseId?",
    name: "/bid/bidMode7/EditStep7",
    component: () => import("../views/bid/bidMode7/EditStep7.vue"),
  },

  /** 招标采购 - 招采方案 - 相关附件 */
  {
    path: "/bid/bidMode7/EditStep8/:baseId?",
    name: "/bid/bidMode7/EditStep8",
    component: () => import("../views/bid/bidMode7/EditStep8.vue"),
  },
  /** 招标采购 - 招采方案 - 提交方案 */
  {
    path: "/bid/bidMode7/EditStep9/:baseId?",
    name: "/bid/bidMode7/EditStep9",
    component: () => import("../views/bid/bidMode7/EditStep9.vue"),
  },
  {
    path: "/bid/bidMode7/EditStep10/:baseId?",
    name: "/bid/bidMode7/EditStep10",
    component: () => import("../views/bid/bidMode7/EditStep10.vue"),
  },
  /** 招标采购 - 招采方案 - 基本信息 */
  {
    path: "/bid/bidMode7/EditStep1/:baseId?",
    name: "/bid/bidMode7/EditStep1",
    component: () => import("../views/bid/bidMode7/EditStep1.vue"),
  },
  /** 招标采购 - 招采方案 - 计划节点 */
  // {
  //   path: "/bid/bidMode7/EditStep2/:baseId?",
  //   name: "/bid/bidMode7/EditStep2",
  //   component: () => import("../views/bid/bidMode7/EditStep2.vue"),
  // },
  /** 招标采购 - 招采方案 - 标段信息 */
  {
    path: "/bid/bidMode7/EditStep3/:baseId?",
    name: "/bid/bidMode7/EditStep3",
    component: () => import("../views/bid/bidMode7/EditStep3.vue"),
  },
  /** 招标采购 - 招采方案 - 入围标准 */
  {
    path: "/bid/bidMode7/EditStep4/:baseId?",
    name: "/bid/bidMode7/EditStep4",
    component: () => import("../views/bid/bidMode7/EditStep4.vue"),
  },
  /** 招标采购 - 招采方案 - 邀请供方 */
  {
    path: "/bid/bidMode7/EditStep5/:baseId?",
    name: "/bid/bidMode7/EditStep5",
    component: () => import("../views/bid/bidMode7/EditStep5.vue"),
  },
  /** 招标采购 - 招采方案 - 采购小组成员 */
  {
    path: "/bid/bidMode7/EditStep6/:baseId?",
    name: "/bid/bidMode7/EditStep6",
    component: () => import("../views/bid/bidMode7/EditStep6.vue"),
  },
  /** 招标采购 - 招采方案 - 招标公告 */
  {
    path: "/bid/bidMode7/EditStep7/:baseId?",
    name: "/bid/bidMode7/EditStep7",
    component: () => import("../views/bid/bidMode7/EditStep7.vue"),
  },
  /** 招标采购 - 招采方案 - 相关附件 */
  {
    path: "/bid/bidMode7/EditStep8/:baseId?",
    name: "/bid/bidMode7/EditStep8",
    component: () => import("../views/bid/bidMode7/EditStep8.vue"),
  },
  /** 招标采购 - 招采方案 - 提交方案 */
  {
    path: "/bid/bidMode7/EditStep9/:baseId?",
    name: "/bid/bidMode7/EditStep9",
    component: () => import("../views/bid/bidMode7/EditStep9.vue"),
  },
  /** 招标采购 - 招采方案 - 基本信息 */
  {
    path: "/bid/bidMode7/EditStep1/:baseId?",
    name: "/bid/bidMode7/EditStep1",
    component: () => import("../views/bid/bidMode7/EditStep1.vue"),
  },
  /** 招标采购 - 招采方案 - 计划节点 */
  // {
  //   path: "/bid/bidMode7/EditStep2/:baseId?",
  //   name: "/bid/bidMode7/EditStep2",
  //   component: () => import("../views/bid/bidMode7/EditStep2.vue"),
  // },
  /** 招标采购 - 招采方案 - 标段信息 */
  {
    path: "/bid/bidMode7/EditStep3/:baseId?",
    name: "/bid/bidMode7/EditStep3",
    component: () => import("../views/bid/bidMode7/EditStep3.vue"),
  },
  /** 招标采购 - 招采方案 - 入围标准 */
  {
    path: "/bid/bidMode7/EditStep4/:baseId?",
    name: "/bid/bidMode7/EditStep4",
    component: () => import("../views/bid/bidMode7/EditStep4.vue"),
  },
  /** 招标采购 - 招采方案 - 邀请供方 */
  {
    path: "/bid/bidMode7/EditStep5/:baseId?",
    name: "/bid/bidMode7/EditStep5",
    component: () => import("../views/bid/bidMode7/EditStep5.vue"),
  },
  /** 招标采购 - 招采方案 - 采购小组成员 */
  {
    path: "/bid/bidMode7/EditStep6/:baseId?",
    name: "/bid/bidMode7/EditStep6",
    component: () => import("../views/bid/bidMode7/EditStep6.vue"),
  },
  /** 招标采购 - 招采方案 - 招标公告 */
  {
    path: "/bid/bidMode7/EditStep7/:baseId?",
    name: "/bid/bidMode7/EditStep7",
    component: () => import("../views/bid/bidMode7/EditStep7.vue"),
  },
  /** 招标采购 - 招采方案 - 相关附件 */
  {
    path: "/bid/bidMode7/EditStep8/:baseId?",
    name: "/bid/bidMode7/EditStep8",
    component: () => import("../views/bid/bidMode7/EditStep8.vue"),
  },
  /** 招标采购 - 招采方案 - 提交方案 */
  {
    path: "/bid/bidMode7/EditStep9/:baseId?",
    name: "/bid/bidMode7/EditStep9",
    component: () => import("../views/bid/bidMode7/EditStep9.vue"),
  },
  /** 招标采购 - 招采方案 - 详情 */
  {
    path: "/bid/bidModeDetailZw/",
    name: "bidModeDetailZw",
    component: () => import("../views/bid/bidMode1/Detail/index.vue"),
  },
  /** 招标采购 - 招采方案 - 详情 */
  {
    path: "/bid/bidModeDetailzhijie/",
    name: "bidModeDetailzhijie",
    component: () => import("../views/bid/bidMode1/Detailzhijie/index.vue"),
  },
  {
    path: "/bid/bidModeDetaillingxing/",
    name: "bidModeDetaillingxing",
    component: () => import("../views/bid/bidMode2/Detaillingxing/index.vue"),
  },
  {
    path: "/bid/bidModeDetailjicai/",
    name: "bidModeDetailjicai",
    component: () => import("../views/bid/bidMode3/Detailjicai/index.vue"),
  },
  /** 待办-废标 - 详情 */
  {
    path: "/workFlow/pc/abolish",
    name: "abolish",
    component: () => import("../views/workFlow/pc/abolish.vue"),
  },
  /** 待办-发标 - 详情 */
  {
    path: "/workFlow/pc/send",
    name: "send",
    component: () => import("../views/workFlow/pc/send.vue"),
  },
  /** 待办-流标 - 详情 */
  {
    path: "/workFlow/pc/sectionCancel",
    name: "sectionCancel",
    component: () => import("../views/workFlow/pc/sectionCancel.vue"),
  },
  /** 待办-工程文件 - 详情 */
  {
    path: "/workFlow/pc/engineeringFile",
    name: "engineeringFile",
    component: () => import("../views/workFlow/pc/engineeringFile.vue"),
  },
  /** 待办-内部文件 - 详情 */
  {
    path: "/workFlow/pc/insideQus",
    name: "insideQus",
    component: () => import("../views/workFlow/pc/insideQus.vue"),
  },
  /** 待办-招标计划 - 详情 */
  {
    path: "/workFlow/pc/PlanChange",
    name: "PlanChange",
    component: () => import("../views/workFlow/pc/PlanChange.vue"),
  },
  /** 待办-答疑 - 详情 */
  {
    path: "/workFlow/pc/supQus",
    name: "supQus",
    component: () => import("../views/workFlow/pc/supQus.vue"),
  },
  /** 待办-定标 - 详情 */
  {
    path: "/workFlow/pc/bidWin",
    name: "bidWin",
    component: () => import("../views/workFlow/pc/bidWin.vue"),
  },
  /** 待办-定标 - 详情 */
  {
    path: "/workFlow/pc/uploadSealFile",
    name: "uploadSealFile",
    component: () => import("../views/workFlow/pc/uploadSealFile.vue"),
  },
  /** 待办-澄清 - 详情 */
  {
    path: "/workFlow/pc/supExplain",
    name: "supExplain",
    component: () => import("../views/workFlow/pc/supExplain.vue"),
  },
  /** 招标采购 - 招采方案 - 详情 */

  {
    path: "/invest/InvestForm",
    name: "invest-InvestForm",
    component: () => import("../views/invest/InvestForm.vue"),
  } /** 招标采购 - 招采公告 - 详情 */,
  {
    path: "/invest/InvestFormDemo",
    name: "invest-InvestFormDemo",
    component: () => import("../views/invest/InvestFormDemo.vue"),
  } /** 招标采购 - 招采公告 - 详情 */,
  {
    path: "/bid/noticeDetail/:baseId?",
    name: "bidnoticeDetail",
    component: () => import("../views/bid/noticeDetail.vue"),
  },
  //定标详情
  {
    path: "/bid/dingBiaoInfo",
    name: "dingBiaoInfo",
    component: () => import("../views/bid/dingBiaoInfo.vue"),
  },
  {
    path: "/bid/processDetail",
    name: "processDetail",
    component: () => import("../views/bid/processDetail.vue"),
  },
  {
    path: "/bid/processDetailzw",
    name: "processDetailzw",
    component: () => import("../views/bid/processDetailzw.vue"),
  },
  {
    path: "/bid/processDetaillx",
    name: "processDetaillx",
    component: () => import("../views/bid/processDetaillx.vue"),
  },
  {
    path: "/bid/processDetailjc",
    name: "processDetailjc",
    component: () => import("../views/bid/processDetailjc.vue"),
  },
  {
    path: "/bid/info",
    name: "info",
    component: () => import("../views/bid/info.vue"),
  },
  // {
  //   path: "/bid/info2",
  //   name: "info2",
  //   component: () => import("../views/bid/info2.vue"),
  // },
  {
    path: "/invest/scoreItems",
    name: "invest-scoreItems",
    component: () => import("../views/invest/scoreItems.vue"),
  },
  {
    path: "/invest/zzItems",
    name: "invest-zzItems",
    component: () => import("../views/invest/zzItems.vue"),
  },
  {
    path: "/invest/editReport1",
    name: "invest-editReport1",
    component: () => import("../views/invest/editReport1.vue"),
  },
  {
    path: "/invest/editReport2",
    name: "invest-editReport2",
    component: () => import("../views/invest/editReport2.vue"),
  },
  {
    path: "/invest/editReport3",
    name: "invest-editReport3",
    component: () => import("../views/invest/editReport3.vue"),
  },
  /** 招标采购 - 招采方案-直接委托 - 基本信息 */
  {
    path: "/bid/bidMode2/EditStep1/:baseId?",
    name: "/bid/bidMode2/EditStep1",
    component: () => import("../views/bid/bidMode2/EditStep1.vue"),
  },
  /** 招标采购 - 招采方案-直接委托 - 计划节点 */
  {
    path: "/bid/bidMode2/EditStep2/:baseId?",
    name: "/bid/bidMode2/EditStep2",
    component: () => import("../views/bid/bidMode2/EditStep2.vue"),
  },
  /** 招标采购 - 招采方案-直接委托 - 采购小组成员 */
  {
    path: "/bid/bidMode2/EditStep3/:baseId?",
    name: "/bid/bidMode2/EditStep3",
    component: () => import("../views/bid/bidMode2/EditStep3.vue"),
  },
  /** 招标采购 - 招采方案-直接委托 - 选择供方 */
  {
    path: "/bid/bidMode2/EditStep4/:baseId?",
    name: "/bid/bidMode2/EditStep4",
    component: () => import("../views/bid/bidMode2/EditStep4.vue"),
  },
  /** 招标采购 - 招采方案-直接委托 - 附件信息 */
  {
    path: "/bid/bidMode2/EditStep5/:baseId?",
    name: "/bid/bidMode2/EditStep5",
    component: () => import("../views/bid/bidMode2/EditStep5.vue"),
  },
  /** 招标采购 - 招采方案-直接委托 - 提交方案 */
  {
    path: "/bid/bidMode2/EditStep6/:baseId?",
    name: "/bid/bidMode2/EditStep6",
    component: () => import("../views/bid/bidMode2/EditStep6.vue"),
  },
  /** 招标采购 - 招采方案-直接委托 - 详情 */
  {
    path: "/bid/bidModeDetailLx/",
    name: "bidModeDetailLx",
    component: () => import("../views/bid/bidMode2/Detail/index.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 基本信息 */
  {
    path: "/bid/bidMode3/EditStep1/:baseId?",
    name: "/bid/bidMode3/EditStep1",
    component: () => import("../views/bid/bidMode3/EditStep1.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 计划节点 */
  {
    path: "/bid/bidMode3/EditStep2/:baseId?",
    name: "/bid/bidMode3/EditStep2",
    component: () => import("../views/bid/bidMode3/EditStep2.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 采购小组成员 */
  //  {
  //     path: "/bid/bidMode3/EditStep3/:baseId?",
  //     name: "/bid/bidMode3/EditStep3",
  //     component: () => import("../views/bid/bidMode3/EditStep3.vue"),
  // },
  /** 招标采购 - 招采方案-竞争性谈判 - 选择供方 */
  {
    path: "/bid/bidMode3/EditStep3/:baseId?",
    name: "/bid/bidMode3/EditStep3",
    component: () => import("../views/bid/bidMode3/EditStep3.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 相关附件 */
  {
    path: "/bid/bidMode3/EditStep4/:baseId?",
    name: "/bid/bidMode3/EditStep4",
    component: () => import("../views/bid/bidMode3/EditStep4.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 提交方案 */
  {
    path: "/bid/bidMode3/EditStep5/:baseId?",
    name: "/bid/bidMode3/EditStep5",
    component: () => import("../views/bid/bidMode3/EditStep5.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 详情 */
  {
    path: "/bid/bidModeDetailJc/",
    name: "bidModeDetailJc",
    component: () => import("../views/bid/bidMode3/Detail/index.vue"),
  },
  /** 招标采购 - 招采方案-集采使用 - 基本信息 */
  {
    path: "/bid/bidMode4/EditStep1/:baseId?",
    name: "/bid/bidMode4/EditStep1",
    component: () => import("../views/bid/bidMode4/EditStep1.vue"),
  },
  /** 招标采购 - 招采方案-集采使用 - 计划节点 */
  {
    path: "/bid/bidMode4/EditStep2/:baseId?",
    name: "/bid/bidMode4/EditStep2",
    component: () => import("../views/bid/bidMode4/EditStep2.vue"),
  },
  /** 招标采购 - 招采方案-集采使用 - 标段信息 */
  {
    path: "/bid/bidMode4/EditStep3/:baseId?",
    name: "/bid/bidMode4/EditStep3",
    component: () => import("../views/bid/bidMode4/EditStep3.vue"),
  },
  /** 招标采购 - 招采方案-集采使用 - 采购小组成员 */
  {
    path: "/bid/bidMode4/EditStep4/:baseId?",
    name: "/bid/bidMode4/EditStep4",
    component: () => import("../views/bid/bidMode4/EditStep4.vue"),
  },
  /** 招标采购 - 招采方案-集采使用 - 集采供应商 */
  {
    path: "/bid/bidMode4/EditStep5/:baseId?",
    name: "/bid/bidMode4/EditStep5",
    component: () => import("../views/bid/bidMode4/EditStep5.vue"),
  },
  /** 招标采购 - 招采方案-集采使用 - 相关附件 */
  {
    path: "/bid/bidMode4/EditStep6/:baseId?",
    name: "/bid/bidMode4/EditStep6",
    component: () => import("../views/bid/bidMode4/EditStep6.vue"),
  },
  /** 招标采购 - 招采方案-集采使用 - 提交方案 */
  {
    path: "/bid/bidMode4/EditStep7/:baseId?",
    name: "/bid/bidMode4/EditStep7",
    component: () => import("../views/bid/bidMode4/EditStep7.vue"),
  },
  /** 招标采购 - 招采方案-集采使用 - 详情 */
  {
    path: "/bid/bidModeDetail4/:baseId?",
    name: "bidModeDetail4",
    component: () => import("../views/bid/bidMode4/Detail/index.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 基本信息 */
  {
    path: "/bid/bidMode5/EditStep1/:baseId?",
    name: "/bid/bidMode5/EditStep1",
    component: () => import("../views/bid/bidMode5/EditStep1.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 计划节点 */
  {
    path: "/bid/bidMode5/EditStep2/:baseId?",
    name: "/bid/bidMode5/EditStep2",
    component: () => import("../views/bid/bidMode5/EditStep2.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 采购小组成员 */
  {
    path: "/bid/bidMode5/EditStep3/:baseId?",
    name: "/bid/bidMode5/EditStep3",
    component: () => import("../views/bid/bidMode5/EditStep3.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 选择供方 */
  {
    path: "/bid/bidMode5/EditStep4/:baseId?",
    name: "/bid/bidMode5/EditStep4",
    component: () => import("../views/bid/bidMode5/EditStep4.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 附件信息 */
  {
    path: "/bid/bidMode5/EditStep5/:baseId?",
    name: "/bid/bidMode5/EditStep5",
    component: () => import("../views/bid/bidMode5/EditStep5.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 提交方案 */
  {
    path: "/bid/bidMode5/EditStep6/:baseId?",
    name: "/bid/bidMode5/EditStep6",
    component: () => import("../views/bid/bidMode5/EditStep6.vue"),
  },
  /** 招标采购 - 招采方案-竞争性谈判 - 详情 */
  {
    path: "/bid/bidModeDetail5/:baseId?",
    name: "bidModeDetail5",
    component: () => import("../views/bid/bidMode5/Detail/index.vue"),
  },
  /** 招标采购 - 待办-技术评标打分 */
  {
    path: "/bid/bidExam/bidExamTech/:recordId?",
    name: "bidExamTech",
    component: () => import("../views/bid/bidExam/bidExamTech.vue"),
  },

  /** 招标采购 - 待办-商务评标打分 */
  {
    path: "/bid/bidExam/bidExamBusiness/:recordId?",
    name: "bidExamBusiness",
    component: () => import("../views/bid/bidExam/bidExamBusiness.vue"),
  },
  /** 招标采购 - 待办弃标 - 详情 */
  {
    path: "/bid/bidCancelAudit/",
    name: "bidCancelAudit",
    component: () => import("../views/bid/bidCancelAudit.vue"),
  },
  // 招标分工待办
  {
    path: "/bid/processQuestionTodo",
    name: "processQuestionTodo",
    component: () => import("@/views/bid/processQuestionTodo.vue"),
  },
  // 招标分工待办
  {
    path: "/bid/divideWorkTodo/:baseId",
    name: "divideWorkTodo",
    component: () => import("@/views/bid/divideWorkTodo.vue"),
  },
  /** 履约评价 - 评价主体 - 新增 */
  {
    path: "/Evaluate/EvaluateForm",
    name: "Evaluate-EvaluateForm",
    component: () => import("../views/Evaluate/EvaluateForm.vue"),
  },
  /** 履约评价 - 合同信息 - 新增 */
  {
    path: "/Evaluate/contractForm",
    name: "contractForm",
    component: () => import("../views/Evaluate/contractForm.vue"),
  },
  /** 履约评价 - 合同信息 - 新增 */
  {
    path: "/Evaluate/detail",
    name: "detail",
    component: () => import("../views/Evaluate/detail.vue"),
  },
  /** 履约评价 - 合同信息 - 新增 */
  {
    path: "/Evaluate/baoan",
    name: "baoan",
    component: () => import("../views/Evaluate/baoan.vue"),
  },
  /** 履约评价 - 我发起的评价 - 详情 */
  {
    path: "/Evaluate/myEvaluateDetail",
    name: "Evaluate-myEvaluateDetail",
    component: () => import("../views/Evaluate/myEvaluateDetail.vue"),
  },
  /** 履约评价 - 评审信息 - 详情 */
  {
    path: "/Evaluate/reviewDetail",
    name: "Evaluate-reviewDetail",
    component: () => import("../views/Evaluate/reviewDetail.vue"),
  },
  /** 履约评价 - 评审信息 - 评价预览 */
  {
    path: "/Evaluate/preview",
    name: "Evaluate-preview",
    component: () => import("../views/Evaluate/preview.vue"),
  },
  /** 履约评价 - 评审信息 - 得分详情 */
  {
    path: "/Evaluate/scoreDetail",
    name: "Evaluate-scoreDetail",
    component: () => import("../views/Evaluate/scoreDetail.vue"),
  },
  /** 履约评价 - 评审信息 - 评分页面 */
  {
    path: "/Evaluate/submit",
    name: "Evaluate-submit",
    component: () => import("../views/Evaluate/submit.vue"),
  },
  {
    path: "/invest/investProgress",
    name: "invest-investProgress",
    component: () => import("../views/invest/investProgress.vue"),
  },
  {
    path: "/quality/qualitylist",
    name: "quality-qualitylist",
    component: () => import("../views/quality/qualitylist.vue"),
  },
  {
    path: "/quality/qualitylistEdit",
    name: "qualitylistEdit",
    component: () => import("../views/quality/qualitylistEdit.vue"),
  },
  /** 资格预审 - 总包 -创建、编辑*/
  {
    path: "/quality/zongbao/edit",
    name: "quality-zongbao-edit",
    component: () => import("../views/quality/zongbao/edit.vue"),
  },
  /** 资格预审 - 总包 - 详情*/
  {
    path: "/quality/zongbao/details",
    name: "quality-zongbao-details",
    component: () => import("../views/quality/zongbao/details.vue"),
  },
  /** 资格预审 - 电力 -创建、编辑*/
  {
    path: "/quality/dianli/edit",
    name: "quality-dianli-edit",
    component: () => import("../views/quality/dianli/edit.vue"),
  },
  /** 资格预审 - 电力 - 详情*/
  {
    path: "/quality/dianli/details",
    name: "quality-dianli-details",
    component: () => import("../views/quality/dianli/details.vue"),
  },
  /** 资格预审 - 精装 -创建、编辑*/
  {
    path: "/quality/jingzhuang/edit",
    name: "quality-jingzhuang-edit",
    component: () => import("../views/quality/jingzhuang/edit.vue"),
  },
  /** 资格预审 - 精装 - 详情*/
  {
    path: "/quality/jingzhuang/details",
    name: "quality-jingzhuang-details",
    component: () => import("../views/quality/jingzhuang/details.vue"),
  },
  /** 资格预审 - 门窗 -创建、编辑*/
  {
    path: "/quality/menchuang/edit",
    name: "quality-menchuang-edit",
    component: () => import("../views/quality/menchuang/edit.vue"),
  },
  /** 资格预审 - 门窗 - 详情*/
  {
    path: "/quality/menchuang/details",
    name: "quality-menchuang-details",
    component: () => import("../views/quality/menchuang/details.vue"),
  },
  /** 资格预审 - 幕墙 -创建、编辑*/
  {
    path: "/quality/muqiang/edit",
    name: "quality-muqiang-edit",
    component: () => import("../views/quality/muqiang/edit.vue"),
  },
  /** 资格预审 - 幕墙 - 详情*/
  {
    path: "/quality/muqiang/details",
    name: "quality-muqiang-details",
    component: () => import("../views/quality/muqiang/details.vue"),
  },
  /** 资格预审 - 市政 -创建、编辑*/
  {
    path: "/quality/shizheng/edit",
    name: "quality-shizheng-edit",
    component: () => import("../views/quality/shizheng/edit.vue"),
  },
  /** 资格预审 - 市政 - 详情*/
  {
    path: "/quality/shizheng/details",
    name: "quality-shizheng-details",
    component: () => import("../views/quality/shizheng/details.vue"),
  },
  /** 资格预审 - 消防 -创建、编辑*/
  {
    path: "/quality/xiaofang/edit",
    name: "quality-xiaofang-edit",
    component: () => import("../views/quality/xiaofang/edit.vue"),
  },
  /** 资格预审 - 消防 - 详情*/
  {
    path: "/quality/xiaofang/details",
    name: "quality-xiaofang-details",
    component: () => import("../views/quality/xiaofang/details.vue"),
  },
  /** 资格预审 - 桩基 -创建、编辑*/
  {
    path: "/quality/zhuangji/edit",
    name: "quality-zhuangji-edit",
    component: () => import("../views/quality/zhuangji/edit.vue"),
  },
  /** 资格预审 - 桩基 - 详情*/
  {
    path: "/quality/zhuangji/details",
    name: "quality-zhuangji-details",
    component: () => import("../views/quality/zhuangji/details.vue"),
  },
  {
    path: "/invest/investlist",
    name: "invest-investlist",
    component: () => import("../views/invest/investlist.vue"),
  },
  {
    path: "/invest/report1",
    name: "invest-report1",
    component: () => import("../views/invest/report1.vue"),
  },
  {
    path: "/invest/invesEdit",
    name: "invest-invesEdit",
    component: () => import("../views/invest/invesEdit.vue"),
  },
  {
    path: "/invest/showInvest",
    name: "invest-showInvest",
    component: () => import("../views/invest/showInvest.vue"),
  },
  /** 供方考察 - 总包现场考察评审表 -创建、编辑*/
  {
    path: "/invest/zongbao/edit",
    name: "invest-zongbao-edit",
    component: () => import("../views/invest/zongbao/edit.vue"),
  },
  /** 供方考察 - 总包现场考察评审表 -详情*/
  {
    path: "/invest/zongbao/details",
    name: "invest-zongbao-details",
    component: () => import("../views/invest/zongbao/details.vue"),
  },
  /** 供方考察 - 电力现场考察评审表 -创建、编辑*/
  {
    path: "/invest/dianli/edit",
    name: "invest-dianli-edit",
    component: () => import("../views/invest/dianli/edit.vue"),
  },
  /** 供方考察 - 电力现场考察评审表 -详情*/
  {
    path: "/invest/dianli/details",
    name: "invest-dianli-details",
    component: () => import("../views/invest/dianli/details.vue"),
  },
  /** 供方考察 - 精装现场考察评审表 -创建、编辑*/
  {
    path: "/invest/jingzhuang/edit",
    name: "invest-jingzhuang-edit",
    component: () => import("../views/invest/jingzhuang/edit.vue"),
  },
  /** 供方考察 - 精装现场考察评审表 -详情*/
  {
    path: "/invest/jingzhuang/details",
    name: "invest-jingzhuang-details",
    component: () => import("../views/invest/jingzhuang/details.vue"),
  },
  /** 供方考察 - 门窗现场考察评审表 -创建、编辑*/
  {
    path: "/invest/menchuang/edit",
    name: "invest-menchuang-edit",
    component: () => import("../views/invest/menchuang/edit.vue"),
  },
  /** 供方考察 - 门窗现场考察评审表 -详情*/
  {
    path: "/invest/menchuang/details",
    name: "invest-menchuang-details",
    component: () => import("../views/invest/menchuang/details.vue"),
  },
  /** 供方考察 - 幕墙现场考察评审表 -创建、编辑*/
  {
    path: "/invest/muqiang/edit",
    name: "invest-muqiang-edit",
    component: () => import("../views/invest/muqiang/edit.vue"),
  },
  /** 供方考察 - 幕墙现场考察评审表 -详情*/
  {
    path: "/invest/muqiang/details",
    name: "invest-muqiang-details",
    component: () => import("../views/invest/muqiang/details.vue"),
  },
  /** 供方考察 - 市政现场考察评审表 -创建、编辑*/
  {
    path: "/invest/shizheng/edit",
    name: "invest-shizheng-edit",
    component: () => import("../views/invest/shizheng/edit.vue"),
  },
  /** 供方考察 - 市政现场考察评审表 -详情*/
  {
    path: "/invest/shizheng/details",
    name: "invest-shizheng-details",
    component: () => import("../views/invest/shizheng/details.vue"),
  },
  /** 供方考察 - 消防现场考察评审表 -创建、编辑*/
  {
    path: "/invest/xiaofang/edit",
    name: "invest-xiaofang-edit",
    component: () => import("../views/invest/xiaofang/edit.vue"),
  },
  /** 供方考察 - 消防现场考察评审表 -详情*/
  {
    path: "/invest/xiaofang/details",
    name: "invest-xiaofang-details",
    component: () => import("../views/invest/xiaofang/details.vue"),
  },
  /** 供方考察 - 桩基现场考察评审表 -创建、编辑*/
  {
    path: "/invest/zhuangji/edit",
    name: "invest-zhuangji-edit",
    component: () => import("../views/invest/zhuangji/edit.vue"),
  },
  /** 供方考察 - 桩基现场考察评审表 -详情*/
  {
    path: "/invest/zhuangji/details",
    name: "invest-zhuangji-details",
    component: () => import("../views/invest/zhuangji/details.vue"),
  },
  /** 供方考察 - 材料设备考察评审表 -创建、编辑*/
  {
    path: "/invest/fileShebei/edit",
    name: "invest-fileShebei-edit",
    component: () => import("../views/invest/fileShebei/edit.vue"),
  },
  {
    path: "/invest/fileShebei/details",
    name: "invest-fileShebei-details",
    component: () => import("../views/invest/fileShebei/details.vue"),
  },
  /** 供方考察 - 景观考察评审表 -创建、编辑*/
  {
    path: "/invest/jingguan/edit",
    name: "invest-jingguan-edit",
    component: () => import("../views/invest/jingguan/edit.vue"),
  },
  {
    path: "/invest/jingguan/details",
    name: "invest-jingguan-details",
    component: () => import("../views/invest/jingguan/details.vue"),
  },
  /** 供方考察 - 监理考察评审表 -创建、编辑*/

  {
    path: "/invest/jianli/details",
    name: "invest-jianli-details",
    component: () => import("../views/invest/jianli/details.vue"),
  },
  {
    path: "/invest/jianli/edit",
    name: "invest-jianli-edit",
    component: () => import("../views/invest/jianli/edit.vue"),
  },
  /** 供方考察 - 设计考察评审表 -创建、编辑*/
  {
    path: "/invest/sheji/edit",
    name: "invest-sheji-edit",
    component: () => import("../views/invest/sheji/edit.vue"),
  },
  {
    path: "/invest/sheji/details",
    name: "invest-sheji-details",
    component: () => import("../views/invest/sheji/details.vue"),
  },
  {
    path: "/system/wuHuSubject",
    name: "wuHuSubject",
    component: () => import("../views/system/wuHuSubject.vue"),
  },
  {
    path: "/system/projectEdit",
    name: "system-projectEdit",
    component: () => import("../views/system/projectEdit.vue"),
  },
  {
    path: "/system/threeForm",
    name: "threeForm",
    component: () => import("../views/system/threeForm.vue"),
  },
  {
    path: "/system/noticeFile",
    name: "system-noticeFile",
    component: () => import("../views/system/noticeFile.vue"),
  },
  {
    path: "/supplier/backlistadd",
    name: "supplier-backlistadd",
    component: () => import("../views/supplier/backlistadd.vue"),
  },
  {
    path: "/supplier/showdet",
    name: "supplier-showdet",
    component: () => import("../views/supplier/showdet.vue"),
  },
  {
    path: "/supplier/backlistdetail",
    name: "supplier-backlistdetail",
    component: () => import("../views/supplier/backlistdetail.vue"),
  },
  {
    path: "/supplier/fileList",
    name: "supplier-fileList",
    component: () => import("../views/supplier/fileList.vue"),
  },
  {
    path: "/supplier/specialadd",
    name: "supplier-specialadd",
    component: () => import("../views/supplier/specialadd.vue"),
  },
  {
    path: "/supplier/specialedit",
    name: "supplier-specialedit",
    component: () => import("../views/supplier/specialedit.vue"),
  },
  {
    path: "/supplier/backGroundEdit",
    name: "supplier-backGroundEdit",
    component: () => import("../views/supplier/backGroundEdit.vue"),
  },
  {
    path: "/supplier/backGroundEdit1",
    name: "supplier-backGroundEdit1",
    component: () => import("../views/supplier/backGroundEdit1.vue"),
  },
  {
    path: "/supplier/backGroundadd",
    name: "supplier-backGroundadd",
    component: () => import("../views/supplier/backGroundadd.vue"),
  },
  {
    path: "/supplier/jtbackGroundadd",
    name: "supplier-jtbackGroundadd",
    component: () => import("../views/supplier/JtbackGroundadd.vue"),
  },
  {
    path: "/supplier/backgroundJiTuanEdit",
    name: "supplier-backgroundJiTuanEdit",
    component: () => import("../views/supplier/backgroundJiTuanEdit.vue"),
  },
  {
    path: "/supplier/backgroundJiTuanEdit1",
    name: "supplier-backgroundJiTuanEdit1",
    component: () => import("../views/supplier/backgroundJiTuanEdit1.vue"),
  },
  {
    path: "/bid/bidMode7/detail",
    name: "/bid/bidMode7/EditStep1",
    component: () => import("../views/bid/bidMode7/Detail/index.vue"),
  },
  {
    path: "/bid/bidWinDetail",
    name: "/bid/bidWinDetail",
    component: () => import("../views/bid/components/bidWinDetail.vue"),
  },
  {
    path: "/report/divideStat",
    name: "/report/divideStat",
    component: () => import("../views/report/divideStat.vue"),
  },
  {
    path: "/report/bidCateStat",
    name: "/report/bidCateStat",
    component: () => import("../views/report/bidCateStat.vue"),
  },
  {
    path: "/report/bidProjectStat",
    name: "/report/bidProjectStat",
    component: () => import("../views/report/bidProjectStat.vue"),
  },
  {
    path: "/report/bidSupplierInStat",
    name: "/report/bidSupplierInStat",
    component: () => import("../views/report/bidSupplierInStat.vue"),
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  routes,
});
for (const key in hooks) {
  router.beforeEach(hooks[key].bind(router));
}
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});

export default router;
