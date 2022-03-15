<template>
  <div>
    <peo style="width: 100%" />
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  props: ["id"],
  components: { peoUser: () => import("@/components/peoUser.vue") },
  data() {
    return {
      form: {
        id: "",
        modeName: "",
        projectId: "",
        cashDeposit: 0,
        cashQuality: 0,
        haveManager: false,
        openRegistration: false,
        setUpFlag: false,
        jzSquare: 0,
        moneyPerSquare: 0,
        bidBody: "",
        bidScope: "",
        purchaseType: "",
        modeStatus: "",
        purchaseType: "",
        creationTime: "",
        bidInviteType: "",
      },
      // baseId: "",
    };
  },
  computed: {
    baseId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.id;
      }
    },
  },
  created() {
    // this.baseId = sessionStorage.getItem("bidModeId");
  },
  mounted() {
    this.GetOnePlanById();
  },
  methods: {
    parseTime,
    /**
     * 查询当前方案基本信息
     */
    // getbidModeId() {
    //   this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then(res => {
    //     console.log(this.bidModeId);
    //     this.baseId = res.data.planId;
    //     console.log(this.baseId);
    //     this.getBaseInfo();
    //   });
    // },
    GetOnePlanById() {
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.baseId } }).then(res => {
        this.form = res.data;
      });
    },
  },
};
</script>
