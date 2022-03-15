<template>
  <div>
    <el-form :model="form" ref="form" size="small" :inline="true" label-width="120px" class="mt-2">
      <div class="fromborder">
        <el-row>
          <div style="margin-bottom: 10px">
            <span style="color: #dc3545">*每个标段至少添加3位技术标的评委，同一评委可出现在不同标段</span>
            <el-button type="primary" size="small" style="float: right; margin-bottom: 10px" v-if="showsubmit" @click="onAdd"
              >添加成员</el-button
            >
          </div>
          <el-table
            empty-text="无符合条件的记录"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="jishudata"
            v-loading="loadingjishu"
          >
            <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
            <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
            <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
            <el-table-column label="评标类型" prop="bidPersonExam" align="center">
              <template slot-scope="scope">
                <el-select v-if="showsubmit" v-model="scope.row.bidPersonExam" plassceholder="请选择" @change="onsave(scope.row)">
                  <el-option v-for="item in bidPersonExamss" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
                <el-select v-else disabled v-model="scope.row.bidPersonExam" plassceholder="请选择" @change="onsave(scope.row)">
                  <el-option v-for="item in bidPersonExamss" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
                <!-- <el-link type="primary" style="margin-left: 10px" @click="jumpSuppInfo(scope.row.id)">{{ scope.row.comFullName }}</el-link> -->
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center" v-if="showsubmit">
              <template slot-scope="scope">
                <i class="el-icon-delete" title="删除" @click="onDelete(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-form>
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="2" />
  </div>
</template>
<script>
/**
 * 招标采购-计划节点
 */
import jiShu from "./jiShu.vue";
import choseUser from "@/components/choseUser";
export default {
  name: "Step2",
  props: ["biaoduanvalue"],
  components: { choseUser },
  inject: ["reload"],
  data() {
    return {
      form: "",
      type: "",
      showsubmit: false,
      loading: false,
      loadingjishu: false,
      jishudata: [],
      bidPersonExamss: [],
    };
  },
  computed: {
    planId() {
      return this.$route.params.baseId;
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
    // this.getBaseInfo()
  },
  mounted() {
    this.getjishuList();
    this.getTechRole();
    this.CheckCanEditPlan01();
  },
  methods: {
    handleChange() {
      this.getjishuList();
    },
    CheckCanEditPlan01() {
      this.$http.get("/LiandoPlan/CheckCanEditPlan01?planId=" + this.planId).then((res) => {
        if (res.data.success) {
          this.showsubmit = true;
        } else {
          this.showsubmit = false;
        }
      });
    },
    getTechRole() {
      // this.loading = true;
      this.$http.get("/LiandoPlan/GetTechRoleDropDown03").then((res) => {
        this.bidPersonExam = res.data.length > 0 ? res.data[0].value : "";
        this.bidPersonExamss = res.data;
      });
    },
    onAdd() {
      this.$refs.choseUser.openfnc();
    },
    onUserAdd(id) {
      const obj = {
        planId: this.planId,
        userGuidList: id.map((v) => v.userGuid),
        sectionId: this.biaoduanvalue,
      };
      this.$http.post("/LiandoPlan/SaveTechUserList03", obj).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.getjishuList();
        }
      });
    },

    getjishuList() {
      // this.loadingjishu = true;
      this.$http.get("/LiandoPlan/GetTechUser03", { params: { planId: this.planId, sectionId: this.biaoduanvalue } }).then((res) => {
        // this.loadingjishu = false;
        this.jishudata = res.data;
      });
    },
    onDelete(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoPlan/DeleteUser03", { id: opt.id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.getjishuList();
        });
      });
    },
    onsave(opt) {
      this.$http.post("/LiandoPlan/SavePersonExam03", { id: opt.id, bidPersonExam: opt.bidPersonExam }).then((res) => {
        this.$message.success(res.data.message);
        this.getjishuList();
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
</style>
