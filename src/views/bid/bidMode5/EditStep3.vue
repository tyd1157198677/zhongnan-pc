<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu-other />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>采购小组成员</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row>
          <div class="float-right mt-2">
            <el-button type="primary" size="small" @click="onAdd">添加成员</el-button>
            <el-button type="primary" size="small" @click="onSaveUserRole">保存角色</el-button>
          </div>
        </el-row>
        <div style="margin-top: 10px">
          <el-row>
            <el-table
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="infos"
              v-loading="loading"
            >
              <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
              <el-table-column label="评标类型" prop="bidPersonExam" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.bidPersonExam" placeholder="请选择">
                    <el-option v-for="item in bidPersonExam" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                  <el-link type="primary" style="margin-left: 10px" @click="jumpSuppInfo(scope.row.id)">{{
                    scope.row.comFullName
                  }}</el-link>
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
              <el-table-column label="角色">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.bidRole" placeholder="请选择">
                    <el-option v-for="item in rols" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                  <el-link type="primary" style="margin-left: 10px" @click="jumpSuppInfo(scope.row.id)">{{
                    scope.row.comFullName
                  }}</el-link>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-circle-close" title="删除" @click="onDelete(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>
        <user-select ref="userSelect" :selUser="selectUser" @itemClick="onUserAdd"></user-select>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
/**
 * 招标采购-采购小组成员
 */
import PlanMenuOther from "../components/PlanMenuOther";
import UserSelect from "../components/UserSelect";
import { mapState } from "vuex";

export default {
  name: "Step2",
  components: { PlanMenuOther, UserSelect },
  inject: ["reload"],
  data() {
    return {
      loading: false,
      rols: [],
      bidPersonExam: [],
      infos: [],
      selectUser: [],
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
  mounted() {
    if (this.baseId) {
      this.getPersonalRole(this.baseId);
    }
  },
  methods: {
    getPersonalRole(id) {
      this.loading = true;
      this.$api.BidPerson.GetBidModePersonDropDown()
        .then((res) => {
          this.rols = res.bidPersonRole;
          this.bidPersonExam = res.bidPersonExam;
        })
        .then(() => {
          this.getBidModePersonList();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getBidModePersonList() {
      this.$api.BidPerson.GetBidModePersonList(this.baseId).then((res) => {
        this.infos = res;
      });
    },
    onAdd() {
      this.$refs.userSelect.open();
    },
    onDelete(user) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.BidPerson.DeleteBidModePersonById(user.id).then((res) => {
          // this.getBidModePersonList();
          if (res.successCount == 0) {
            this.$message.success("删除成功");
            this.infos.splice(
              this.infos.findIndex((item) => item.id === user.id),
              1
            );
          }
        });
      });
    },
    onSaveUserRole() {
      const rols = this.infos.map((x) => {
        return {
          userGuid: x.userGuid,
          bidRole: x.bidRole,
          bidPersonExam: x.bidPersonExam,
        };
      });
      this.$api.BidPerson.SaveBidPersonRoles(this.baseId, rols).then((res) => {
        this.$message.success("保存成功");
        this.getBidModePersonList();
      });
    },
    onUserAdd(user) {
      let addUser = {
        baseId: "",
        bidPersonExam: "",
        bidRole: "",
        id: "",
        loginId: user.loginId,
        userGuid: user.userGuid,
        userName: user.userName,
      };
      this.$api.BidPerson.SaveSinglePerson(this.baseId, user.userGuid).then((res) => {
        if (res.success) {
          this.$message.success("添加成功");
          // this.getBidModePersonList();
          this.infos.push(addUser);
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
</style>
