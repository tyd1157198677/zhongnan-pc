<template>
  <div class="fromborder">
    <div style="margin-bottom: 10px">
      <span style="color: #dc3545">*每个标段至少添加1位商务组成员</span>
      <el-button type="primary" size="small" style="float: right; margin-bottom: 10px" v-if="showsubmit" @click="onAdd">添加成员</el-button>
    </div>
    <el-table
      empty-text="无符合条件的记录"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="shangwudata"
      v-loading="loadingshangwu"
    >
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
      <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
      <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
      <el-table-column label="操作" width="80" align="center" v-if="showsubmit">
        <template slot-scope="scope">
          <i class="el-icon-delete" title="删除" @click="onDelete(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="2" />
  </div>
</template>
<script>
import choseUser from "@/components/choseUser";
export default {
  props: ["biaoduanvalue"],
  components: { choseUser },
  inject: ["reload"],
  data() {
    return {
      loading: false,
      loadingshangwu: false,
      showsubmit: false,
      shangwudata: [
        {
          baseId: "",
          userGuid: "",
          bidRole: "",
          bidPersonExam: "",
          sectionId: "",
          id: "",
        },
      ],
    };
  },
  computed: {
    planId() {
      return this.$route.params.baseId;
    },
  },
  created() {
    this.$emit("header", true);
    this.$emit("footer", true);
    // this.getBaseInfo()
  },
  mounted() {
    this.getshangwuList();
    this.CheckCanEditPlan01();
  },
  methods: {
    CheckCanEditPlan01() {
      this.$http.get("/LiandoPlan/CheckCanEditPlan01?planId=" + this.planId).then((res) => {
        if (res.data.success) {
          this.showsubmit = true;
        } else {
          this.showsubmit = false;
        }
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
      this.$http.post("/LiandoPlan/SaveBusinessUserList03", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.getshangwuList();
        }
      });
    },
    getshangwuList() {
      this.$http.get("/LiandoPlan/GetBusinessUser03", { params: { planId: this.planId, sectionId: this.biaoduanvalue } }).then((res) => {
        if (res.status == 200) {
          this.shangwudata = res.data;
        }
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
          this.getshangwuList();
        });
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
