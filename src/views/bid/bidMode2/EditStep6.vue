<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu-other />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>提交方案</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="alert alert-primary" role="alert" style="margin: 10px">
          <p class="h6"><i class="el-icon-star-on"></i>提交方案必要条件：</p>
          <p class="h6">1、保存方案基本信息</p>
          <p class="h6">2、保存计划节点</p>
          <p class="h6">3、添加采购小组成员</p>
          <p class="h6">4、必须邀请供方</p>
        </div>
        <div style="margin: 10px">
          <template v-if="status">
            <div class="float-right">
              <el-button type="primary" size="small" @click="onSubmit">提交方案</el-button>
            </div>
          </template>
          <template v-else>
            <div class="alert alert-light border" role="alert">
              <p class="h6">您填写的方案未达到提交条件，原因如下：</p>
              <span v-for="(item, index) in checkList" :key="index">
                <div class="alert" :class="{ 'alert-success': item.success, 'alert-danger': !item.success }" role="alert">
                  <i :class="{ 'el-icon-success': item.success, 'el-icon-error': !item.success }"></i> {{ item.desc }}
                </div>
              </span>
            </div>
          </template>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
/**
 * 招标采购-提交方案
 */
import PlanMenuOther from "../components/PlanMenuOther";
import { mapState } from "vuex";

export default {
  name: "Step9",
  components: { PlanMenuOther },
  inject: ["reload"],
  data() {
    return {
      status: false,
      checkList: [],
      form: {},
      rules: {},
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
    if (this.baseId) {
      this.check();
    }
  },
  mounted() {},
  methods: {
    check() {
      this.$api.BidModeMasterOther.CheckSubmitZhiWei(this.baseId).then((res) => {
        this.status = res.success;
        this.checkList = res.checkItemList;
      });
    },
    onSubmit() {
      this.$api.BidModeMasterOther.SubmitBidModeZhiWei(this.baseId).then((res) => {
        if (res.success) {
          this.$message.success("保存成功");
        } else {
          this.$message.error(res.message || "保存失败");
        }
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 2% 0 120px;
  height: 100%;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: #ffffff;
  position: relative;
  /* width: 88%; */
  border-radius: 10px 10px 0 0;
  overflow: auto;
}

.buttoncss {
  float: right;
  margin-top: 12px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}

/deep/ .el-input {
  width: 300px;
}
</style>
