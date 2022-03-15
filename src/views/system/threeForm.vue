<!--  -->
<template>
  <el-main>
    <div class="right1" style="margin: 10px 0; margin-top: 0">
      <div class="tit">
        {{ "题目：" + title }}
      </div>
      <div>
        <el-button size="small" type="primary" @click="back">返回</el-button>
        <el-button size="small" type="primary" @click="saveMoudle">保存选项</el-button>
      </div>
    </div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr v-for="i in 10" :key="i">
          <td>
            <el-input v-model="formList[i - 1].selectorName" placeholder="请填写" maxlength="200" show-word-limit></el-input>
          </td>
        </tr>
      </tbody>
    </table>
  </el-main>
</template>

<script>
import finalScoreVue from "../Evaluate/finalScore.vue";
export default {
  components: {},
  data() {
    return {
      id: "",
      title: "",
      loading: false,
      formList: [
        { selectorName: "" },
        { selectorName: "" },
        { selectorName: "" },
        { selectorName: "" },
        { selectorName: "" },
        { selectorName: "" },
        { selectorName: "" },
        { selectorName: "" },
        { selectorName: "" },
        { selectorName: "" },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.id = this.$route.query.id;
    this.title = this.$route.query.name;
  },
  mounted() {
    this.GetFormItemList();
  },
  methods: {
    async GetFormItemList() {
      let obj = {
        itemId: this.id,
      };
      let res = await this.$http.get("/FormItem/GetSelector", { params: obj });
      if (res.data.length > 0) {
        res.data.forEach((item, i) => {
          this.formList[i].selectorId = item.id;
          this.formList[i].selectorName = item.selectorText;
        });
      }
    },
    back() {
      window.history.back();
    },
    async saveMoudle() {
      let obj = {
        itemId: this.id,
        selectorNames: this.formList,
      };
      let res = await this.$http.post("/FormItem/SaveSelector", obj);
      if (res.data.success) {
        this.$message.success(res.data.message);
        this.GetFormItemList();
      } else {
        this.$message.warning(res.data.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  border: 0px solid #fff !important;
  border-bottom: 1px solid #ccc !important;
  border-radius: 0% !important;
}
.right1 {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  .tit {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
