<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <showplan-menu />
      </el-col>
    </el-row>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采计划</el-breadcrumb-item>
          <el-breadcrumb-item v-if="showmessage"
            >提交计划<span style="color: red">({{ message }})</span></el-breadcrumb-item
          >
          <el-breadcrumb-item v-else>提交计划</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-alert :title="msg" type="warning" v-if="!isCanEdit" :closable="false"> </el-alert> -->
        <!-- <div v-else> -->
        <div>
          <div style="margin-top: 10px">
            <span><b>会签成员</b></span>
            <el-button
              type="primary"
              v-loading="subloading"
              v-if="showsubmit"
              size="small"
              style="float: right; margin-bottom: 10px"
              @click="onAdd"
              title="添加其他会签人员"
              >添加人员</el-button
            >
          </div>
          <el-form :model="form" :rules="rules" ref="form" size="small" :inline="true" label-width="120px" class="mt-2">
            <div>
              <el-row>
                <el-table
                  empty-text="无符合条件的记录"
                  stripe
                  border
                  element-loading-text="请稍候,数据正在加载中..."
                  :data="huiqiandata"
                  v-loading="loading"
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
              </el-row>
            </div>
          </el-form>
          <div class="alert alert-primary" role="alert" style="margin-top: 10px">
            <p class="h7"><i class="el-icon-star-on"></i>提交招标计划必要条件：</p>
            <p class="h7">1、保存基本信息</p>
            <p class="h7">2、添加招标组长</p>
            <p class="h7">3、每个标段至少添加1位商务组成员</p>
            <p class="h7">4、每个标段至少添加3位技术评委</p>
            <p class="h7">5、招标单项计划必须添加完成所有人员及完成时间</p>
            <!-- <p class="h7">6、必须上传施工方案模板</p> -->
            <!-- <p class="h7">5、必须上传承诺函模板</p>
          <p class="h7">6、添加入围标准</p> -->
          </div>
          <div class="card mt-3" v-show="checkResult.length > 0">
            <div class="card-header">不符合提交条件，原因：</div>
            <div class="card-body">
              <!-- <el-alert
                v-for="(item, index) in checkResult"
                :key="index"
                :title="item.messageDesc"
                :type="item.messageResult ? 'success' : 'error'"
                class="mt-2"
                :closable="false"
                show-icon
              >
              </el-alert> -->
              <div>{{ checkResult }}</div>
            </div>
          </div>
          <div v-if="showmo">
            <span style="color: red">提交后自动发送待办通知会签人员</span>
          </div>
          <div style="margin-top: 10px">
            <div class="float-right">
              <el-button type="primary" v-if="showsubmit" v-loading="subloading" @click="onSubmit" size="small">提交招标计划</el-button>
            </div>
            <!-- <template v-else>
            <template v-if="status">
              <div class="float-right">
                <el-button type="primary" size="small" @click="onSubmit">提交计划</el-button>
              </div>
            </template> -->
            <!-- <template v-else>
              <div class="alert alert-light border" role="alert">
                <p class="h6">您填写的方案未达到提交条件，原因如下：</p>
                <span v-for="(item, index) in checkList" :key="index">
                  <div class="alert" :class="{ 'alert-success': item.success, 'alert-danger': !item.success }" role="alert">
                    <i :class="{ 'el-icon-success': item.success, 'el-icon-error': !item.success }"></i> {{ item.desc }}
                  </div>
                </span>
              </div>
            </template> -->
            <!-- </template> -->
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- <user-select ref="userSelect" :selUser="selectUser" @itemClick="onUserAdd"></user-select> -->
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
  </el-main>
</template>

<script>
/**
 * 招标采购-采购小组成员
 */
import PlanMenu from "../components/PlanMenuDemo.vue";
// import UserSelect from "../components/UserSelect";
import UserSelect from "../components/UserSelect2";
import choseUser from "@/components/choseUser";
import { mapState } from "vuex";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step2",
  components: { PlanMenu, showplanMenu, UserSelect, choseUser },
  inject: ["reload"],
  data() {
    return {
      subloading: false,
      showmo: false,
      showmessage: false,
      showsubmit: false,
      value: "",
      msg: "",
      isCanEdit: false,
      huiqiandata: [
        {
          userGuid: "",
        },
      ],
      checkResult: [],
      loading: false,
      rols: [],
      // bidPersonExam: [],
      bidRole: "",
      // infos: [],
      selectUser: [],
      message: "",
      form: {
        id: "",
        baseId: "",
        modeConfirmDate: "",
        supplierInvesDate: "",
        dwgFileDate: "",
        listEditDate: "",
        bidSendDate: "",
        bidOpenDate: "",
        bidEndDate: "",
      },
      rules: {
        bidPersonExam: [{ required: true, message: "请选择评标类型", trigger: "change" }],
        bidRole: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
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
    this.gethuiqianList();
  },
  mounted() {
    // if (this.baseId) {
    //   this.getPersonalRole(this.baseId);
    // };
    this.CheckCanEditPlan01();
    this.gethuiqianList();
    this.getSelectionlist();
  },
  methods: {
    CheckCanEditPlan01() {
      this.$http.get("/LiandoPlan/CheckCanEditPlan01?planId=" + this.planId).then((res) => {
        this.isCanEdit = res.data.success;
        this.msg = res.data.message;
        if (res.data.success) {
          this.showsubmit = true;
          this.showmessage = false;
        } else {
          this.showsubmit = false;
          if (res.data.message != "" || res.data.message != null) {
            this.showmessage = true;
            this.message = res.data.message;
          } else {
            this.showmessage = false;
          }
        }
      });
    },
    onAdd() {
      this.$refs.choseUser.openfnc();
    },
    getSelectionlist() {
      this.$http.get("/LiandoPlan/GetSectionDropDown03", { params: { planId: this.planId } }).then((res) => {
        this.value = res.data.length > 0 ? res.data[0].value : "";
        // this.options = res.data;
      });
    },
    onUserAdd(id) {
      const obj = {
        planId: this.planId,
        userGuid: id.userGuid,
        sectionId: this.value,
      };
      this.$http.post("/LiandoPlan/SaveAuditUser06", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.gethuiqianList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    onSubmit() {
      this.$confirm("确定要提交招标计划吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.subloading = true;
        this.$http.post("/LiandoPlan/SubmitBidPlan", { id: this.planId }).then((res) => {
          if (res.data.success == false) {
            console.log(res.data.success);
            this.checkResult = res.data.message;
            this.subloading = false;
            // this.$router.push({
            //   name: "../../bidPlanDemo",
            // });
            // this.$msg.success(res.data.message)
            // this.loginShow = true
          } else {
            this.masterId = res.data.returnValue1;
            this.$http.post("/LiandoPlan/StartEngineeringFile", { planId: this.planId, masterId: this.masterId }).then((res) => {});
            // this.$msg.success(res.data.message);
            this.subloading = false;
            if (res.data.message == "提交成功") {
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              }).then(() => {
                this.$router.push({
                  path: "/bid/bidPlanDemo",
                });
              });
            } else {
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
              this.subloading = false;
            }
            this.showmo = true;
            this.checkResult.length = 0;
          }
        });
      });
    },
    gethuiqianList() {
      // this.loading = true;
      this.$http.get("/LiandoPlan/GetAuditUser05", { params: { planId: this.planId } }).then((res) => {
        // this.loading = false;
        this.huiqiandata = res.data;
      });
    },
    // savehuiqian(){
    //    const obj =  {
    //       planId: this.planId,
    //       sectionId: this.sectionId,
    //       userGuid: this.userGuid,
    //   };
    //   this.$http.post("/LiandoPlan/SaveAuditUser06",obj).then(res => {
    //     this.$message.success(res.data.message)
    //     this.gethuiqianList();
    //   });
    // },
    onDelete(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoPlan/DeleteUser03", { id: opt.id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.gethuiqianList();
        });
      });
    },
    // getPersonalRole(id) {
    //   this.loading = true;
    //   this.$api.BidPerson.GetBidModePersonDropDown()
    //     .then(res => {
    //       this.rols = res.bidPersonRole;
    //       this.bidPersonExam = res.bidPersonExam;
    //     })
    //     .then(() => {
    //       this.getBidModePersonList();
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //     });
    // },
    // getBidModePersonList() {
    //   this.$api.BidPerson.GetBidModePersonList(this.baseId).then(res => {
    //     this.infos = res;
    //   });
    // },
    // onAdd() {
    //   this.$refs.userSelect.open();
    // },
    // onSaveUserRole() {
    // if(!this.bidPersonExam == "" || this.bidRole == "") {
    //   this.$message({
    //           message: "请先选择评价类型和角色",
    //           type: "error",
    //           });
    // } else {
    // const rols = this.infos.map(x => {
    //   return {
    //     userGuid: x.userGuid,
    //     bidRole: x.bidRole,
    //     bidPersonExam: x.bidPersonExam,
    //   };
    // });
    //   this.$api.BidPerson.SaveBidPersonRoles(this.baseId, rols).then(res => {
    //     this.$message.success('保存成功')
    //     this.getBidModePersonList();
    //   });
    //   // }
    // },
    // onUserAdd(user) {
    //   this.$api.BidPerson.SaveSinglePerson(this.baseId, user.userGuid).then(res => {
    //     if(res.success) {
    //       this.$message.success('添加成功')
    //       this.getBidModePersonList();
    //     }
    //   });
    // }
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

::v-deep .el-table__header-wrapper .el-checkbox {
  display: none;
}
</style>
