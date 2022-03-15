<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>提交方案</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="alert alert-primary" role="alert" style="margin-top: 10px">
          <p class="h7"><i class="el-icon-star-on"></i>提交方案必要条件：</p>
          <p class="h7">1、保存方案基本信息</p>
          <p class="h7">2、添加采购小组成员</p>
          <p class="h7">3、保存招标方案公告</p>
          <p class="h7">4、如果是非公开报名方案，必须邀请供方</p>
          <p class="h7">5、必须上传承诺函模板</p>
          <p class="h7">6、添加入围标准</p>
        </div>
        <div style="margin-top: 10px">
          <div class="float-right" v-if="showCheckBtn">
            <el-button type="primary" @click="onCheck">检查是否符合提交条件</el-button>
          </div>
          <template v-else>
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
import PlanMenu from "../components/PlanMenu";
import { mapState } from "vuex";

export default {
  name: "Step9",
  components: { PlanMenu },
  inject: ["reload"],
  data() {
    return {
      status: false,
      showCheckBtn: true,
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
  },
  mounted() {},
  methods: {
    onCheck() {
      this.$api.BidModeMaster.CheckSubmit(this.baseId).then((res) => {
        this.showCheckBtn = false;
        this.status = res.success;
        this.checkList = res.checkItemList;
      });
    },
    onSubmit() {
      this.$confirm("您确认要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.BidModeMaster.SubmitBidMode(this.baseId).then((res) => {
          if (res.success) {
            this.$message.success("提交成功");
            this.jumpDetail(this.baseId);
          } else {
            this.$message.error(res.message || "提交失败");
          }
        });
      });
    },
    /**
     * 查看详情
     */
    jumpDetail(id) {
      window.open(`#/bid/bidModeDetail/${id}`);
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

.el-input {
  width: 300px;
}
.alert-primary {
  background-color: #dedede;
  border-color: #c1c1c1;
  color: #696969;
}
</style>
