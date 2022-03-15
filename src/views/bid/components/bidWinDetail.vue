<template>
  <el-main>
    <el-row id="page_main">
      <el-button style="float:right;margin-bottom:10px" type="primary" size="small" v-if="showzhuan" @click="onAdd">转发</el-button>
      <el-col :span="24" style="margin-bottom:50px">
        <el-collapse v-model="activeNames" class="mt-0 mb-0">
          <el-collapse-item :name="index" v-for="(item, index) in tabs" :key="index">
            <template slot="title">
              <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">{{ item.label }}</span>
            </template>
            <div class="mt-2">
              <component :is="item.component" :id="baseId" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="2" />
  </el-main>
</template>

<script>
/**
 * 招标采购-详情
 */
import bus from "@/util/bus";
import step1 from "./dingBiaoComponents/faQiDingBiao2";
import step2 from "./dingBiaoComponents/faQiDingBiao2_1";
import step3 from "./dingBiaoComponents/faQiDingBiao2_2";
import step4 from "./dingBiaoComponents/tongZhiShu2";
import step5 from "./dingBiaoComponents/ziLiao2";
import choseUser from "@/components/choseUser";
export default {
  name: "detail",
  components: { choseUser },
  inject: ["reload"],
  data() {
    return {
      tabs: [],
      activeNames: [],
      showzhuan: false,
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
    bidModeId() {
      return this.$route.query.id;
    },
  },
  mounted() {
    this.tabs = [
      { label: "基本信息", name: "step1", component: step1 },
      { label: "评标情况", name: "step2", component: step2 },
      { label: "相关附件", name: "step3", component: step3 },
      { label: "通知书", name: "step4", component: step4 },
      { label: "交底资料", name: "step5", component: step5 },
    ];
    this.activeNames = this.tabs.map((e, i) => i);
    this.CheckUserTransAuth1001();
  },
  created: function() {
    //this.$emit('header', true);
    //this.$emit('footer', true);
    bus.$emit("hideNav");
  },
  methods: {
    CheckUserTransAuth1001() {
      console.log(this.baseId);
      this.$http.get("/BidWin/CheckUserTransAuth1001", { params: { bidModeId: this.bidModeId } }).then(res => {
        if (res.data.success) {
          this.showzhuan = true;
        } else {
          this.showzhuan = false;
        }
      });
    },
    onAdd() {
      this.$refs.choseUser.openfnc();
    },
    onUserAdd(id) {
      const obj = {
        bidModeId: this.bidModeId,
        acceptUserGuid: id.map(v => v.userGuid),
      };
      this.$http.post("/BidWin/SaveTransmit1001", obj).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.CheckUserTransAuth1001();
        }
      });
    },
  },
};
</script>

<style scoped>
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}
::v-deep.el-collapse-item__header {
  border-left: 4px solid #409eff;
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: rgba(0, 0, 0, 0.03);
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
</style>
