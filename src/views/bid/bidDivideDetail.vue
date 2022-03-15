<template>
  <el-main>
    <el-card style="margin-bottom: 60px">
      <!-- <div>
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
      </div> -->
      <!-- <div slot="header" class="clearfix flex between middle">
        <el-page-header @back="$router.back(-1)" :content="navBarName"></el-page-header> -->
      <div>
        <span
          ><strong>{{ showmessage }}</strong></span
        >
        <el-button type="primary" size="small" style="float: right; margin-left: 10px; margin-bottom: 10px" @click="goto"
          >编辑招标计划</el-button
        >
        <el-button type="primary" size="small" style="float: right; margin-left: 10px; margin-bottom: 10px" @click="gohome"
          >返回首页</el-button
        >
      </div>
      <!-- </div> -->
      <div>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right">项目名称：</td>
              <td>
                {{ form.projectName }}
              </td>
              <td class="right">期区：</td>
              <td>
                {{ form.subProjectName }}
              </td>
            </tr>
            <tr>
              <td class="right">招标计划名称(计划系统)：</td>
              <td>
                {{ form.otherPlanName }}
              </td>
              <td class="right">计划完成日期(计划系统)：</td>
              <td>
                {{ parseTime(form.bidEndDate, "yyyy-MM-dd") }}
              </td>
            </tr>
            <tr>
              <td class="right">招标计划名称：</td>
              <td>
                {{ form.planName }}
              </td>
              <td class="right">招标层级：</td>
              <td>
                {{ form.bidLevel }}
              </td>
            </tr>
            <tr>
              <td class="right">招标经办人：</td>
              <td>
                {{ form.bidUserName }}
              </td>
              <td class="right">入围经办人：</td>
              <td>
                {{ form.supplierUserName }}
              </td>
            </tr>
            <tr>
              <td class="right">总裁三室经办人：</td>
              <td>
                <span style="margin-right: 10px">{{ form.presidentUserName }}</span
                ><span style="margin-right: 10px">{{ form.presidentAltUserName }}</span
                ><span style="margin-right: 10px">{{ form.presidentOtherUserName }}</span>
              </td>
              <td class="right">审计经办人：</td>
              <td>
                <span style="margin-right: 10px">{{ form.auditUserName }}</span
                ><span style="margin-right: 10px">{{ form.auditAlternativesUserName }}</span>
              </td>
            </tr>
            <tr>
              <td class="right">项目需求日期：</td>
              <td>
                {{ parseTime(form.confirmDate, "yyyy-MM-dd") }}
              </td>
              <td class="right">建筑面积：</td>
              <td>{{ form.jzSquire }}㎡</td>
            </tr>
            <tr>
              <td class="right">项目需求原因：</td>
              <td colspan="3">{{ form.requireDesc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <el-button type="primary" v-if="showfen" style="float: right; margin-top: 10px; margin-bottom: 10px" size="small" @click="showdai"
          >发送待办</el-button
        >
      </div>
      <el-form
        ref="tableData"
        style="margin-top: 60px; justify-content: space-between"
        v-if="showfen"
        label-position="top"
        :inline="true"
        size="small"
      >
        <!-- <el-row v-for="item in tableData" :key="item.divideType"> -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="招标经办人">
              <el-select
                :disabled="!show1"
                v-model="tableData1.user1.userName1"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  (query) => {
                    remoteMethod(query, 1);
                  }
                "
                :loading="loading1"
                @focus="setEmpty"
                @change="handle($event, 1, tableData1.user1.userGuid1)"
              >
                <el-tooltip
                  :open-delay="500"
                  v-for="item in options"
                  :key="item.value"
                  class="item"
                  effect="dark"
                  :content="item.title"
                  placement="left"
                >
                  <el-option :label="item.userName" :value="item.userGuid">
                    <span style="float: left">{{ item.userName }}</span>
                    <span style="float: right; font-size: 13px" v-if="item.desc">
                      (<span style="color: red">{{ item.desc }}</span
                      >)
                    </span>
                  </el-option>
                </el-tooltip>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="入围经办人">
              <el-select
                :disabled="!show2"
                v-model="tableData1.user2.userName1"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  (query) => {
                    remoteMethod(query, 2);
                  }
                "
                :loading="loading1"
                @focus="setEmpty"
                @change="handle($event, 2, tableData1.user2.userGuid1)"
              >
                <el-tooltip
                  :open-delay="500"
                  v-for="item in options"
                  :key="item.value"
                  class="item"
                  effect="dark"
                  :content="item.title"
                  placement="left"
                >
                  <el-option :label="item.userName" :value="item.userGuid">
                    <span style="float: left">{{ item.userName }}</span>
                    <span style="float: right; font-size: 13px" v-if="item.desc">
                      (<span style="color: red">{{ item.desc }}</span
                      >)
                    </span>
                  </el-option>
                </el-tooltip>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总裁三室经办人">
              <el-select
                style="margin-right: 10px"
                :disabled="!show3"
                v-model="tableData1.user3.userName1"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  (query) => {
                    remoteMethod(query, 3);
                  }
                "
                :loading="loading1"
                @focus="setEmpty"
                @change="handle3($event, 3, tableData1.user3.userGuid1)"
              >
                <el-tooltip
                  :open-delay="500"
                  v-for="item in options"
                  :key="item.value"
                  class="item"
                  effect="dark"
                  :content="item.title"
                  placement="left"
                >
                  <el-option :label="item.userName" :value="item.userGuid">
                    <span style="float: left">{{ item.userName }}</span>
                    <span style="float: right; font-size: 13px" v-if="item.desc">
                      (<span style="color: red">{{ item.desc }}</span
                      >)
                    </span>
                  </el-option>
                </el-tooltip>
              </el-select>
              <el-select
                style="margin-right: 10; margin-top: 10px"
                :disabled="!show3"
                v-model="tableData1.user3.userName2"
                v-if="zongbeiyi"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  (query) => {
                    remoteMethod(query, 3);
                  }
                "
                :loading="loading1"
                @focus="setEmpty"
                @change="handle4($event, 3, tableData1.user3.userGuid2)"
              >
                <el-tooltip
                  :open-delay="500"
                  v-for="item in options"
                  :key="item.value"
                  class="item"
                  effect="dark"
                  :content="item.title"
                  placement="left"
                >
                  <el-option :label="item.userName" :value="item.userGuid">
                    <span style="float: left">{{ item.userName }}</span>
                    <span style="float: right; font-size: 13px" v-if="item.desc">
                      (<span style="color: red">{{ item.desc }}</span
                      >)
                    </span>
                  </el-option>
                </el-tooltip>
              </el-select>
              <el-select
                style="margin-top: 10px"
                :disabled="!show3"
                v-model="tableData1.user3.userName3"
                v-if="zongbeier"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  (query) => {
                    remoteMethod(query, 3);
                  }
                "
                :loading="loading1"
                @focus="setEmpty"
                @change="handle5($event, 3, tableData1.user3.userGuid3)"
              >
                <el-tooltip
                  :open-delay="500"
                  v-for="item in options"
                  :key="item.value"
                  class="item"
                  effect="dark"
                  :content="item.title"
                  placement="left"
                >
                  <el-option :label="item.userName" :value="item.userGuid">
                    <span style="float: left">{{ item.userName }}</span>
                    <span style="float: right; font-size: 13px" v-if="item.desc">
                      (<span style="color: red">{{ item.desc }}</span
                      >)
                    </span>
                  </el-option>
                </el-tooltip>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审计经办人">
              <el-select
                style="margin-right: 10px"
                :disabled="!show4"
                v-model="tableData1.user4.userName1"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  (query) => {
                    remoteMethod(query, 4);
                  }
                "
                :loading="loading1"
                @focus="setEmpty"
                @change="handle1($event, 4, tableData1.user4.userGuid1)"
              >
                <el-tooltip
                  :open-delay="500"
                  v-for="item in options"
                  :key="item.value"
                  class="item"
                  effect="dark"
                  :content="item.title"
                  placement="left"
                >
                  <el-option :label="item.userName" :value="item.userGuid">
                    <span style="float: left">{{ item.userName }}</span>
                    <span style="float: right; font-size: 13px" v-if="item.desc">
                      (<span style="color: red">{{ item.desc }}</span
                      >)
                    </span>
                  </el-option>
                </el-tooltip>
              </el-select>
              <el-select
                style="margin-top: 10px"
                :disabled="!show4"
                v-if="shenbeiyi"
                v-model="tableData1.user4.userName2"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  (query) => {
                    remoteMethod(query, 4);
                  }
                "
                placeholder="请选择"
                :loading="loading1"
                @focus="setEmpty"
                @change="handle2($event, 4, tableData1.user4.userGuid2)"
              >
                <el-tooltip
                  :open-delay="500"
                  v-for="item in options"
                  :key="item.value"
                  class="item"
                  effect="dark"
                  :content="item.title"
                  placement="left"
                >
                  <el-option :label="item.userName" :value="item.userGuid">
                    <span style="float: left">{{ item.userName }}</span>
                    <span style="float: right; font-size: 13px" v-if="item.desc">
                      (<span style="color: red">{{ item.desc }}</span
                      >)
                    </span>
                  </el-option>
                </el-tooltip>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
    </el-card>
    <el-dialog width="30%" title="发送待办" :visible.sync="dialogVisible">
      <div>
        <template>
          <el-tag v-for="(item, index) in tabslist" :key="index" style="width: 150px; margin-bottom: 10px; margin-right: 10px">{{
            item
          }}</el-tag>
        </template>
      </div>
      <el-form>
        <el-form-item>
          <el-button type="primary" style="float: right" size="small" @click="sendtodo">确认发送</el-button>
          <el-button size="small" style="float: right; margin-right: 10px" @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
import choseUser from "@/components/choseUser";
export default {
  inject: ["reload"],
  components: {
    choseUser,
  },
  data() {
    return {
      msg: "",
      select: false,
      options: [],
      isCanEdit: false,
      radio: true,
      designCode: "",
      todoId: "",
      showmessage: "",
      planId: "",
      FileName: "",
      selectSupVisible: false,
      haveSupplier: false,
      isShowFaQibtn: false,
      message: "",
      zongbeiyi: false,
      zongbeier: false,
      shenbeiyi: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      loading1: false,
      dialogVisible: false,
      tableData: [],
      tableData1: {
        user1: {},
        user2: {},
        user3: {},
        user4: {},
      },
      showfen: false,
      tabslist: [],
      loading: false,
      form: [],
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rules: {},
    };
  },
  computed: {
    bidModeId() {
      return this.$route.params.bidModeId;
    },
    // planId() {
    //   return this.$route.params.planId;
    // },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
  },
  created: function () {
    this.planId = this.$route.query.id;
    this.todoId = this.$route.query.todoId;
  },
  mounted() {
    this.GetLiandoPlanAllDropDown();
    this.GetUserRoleButtonList();
    this.getList();
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
  },
  methods: {
    parseTime,
    GetUserRoleButtonList() {
      this.$http.post("/RoleMenu/GetUserRoleButtonList", ["DIVIDESENDTODO"], {}).then((res) => {
        this.isShowFaQibtn = res.data.indexOf("DIVIDESENDTODO") > -1 ? true : false;
        if (res.data.length > 0) {
          this.showfen = true;
        } else {
          this.showfen = false;
        }
      });
    },
    // getbidModeId(){
    //   this.$http.get("/LiandoBidMaster/GetBidMasterByModeId",{params: {bidModeId: this.bidModeId}}).then(res => {
    //     this.planId = res.data.planId;
    //     console.log(this.planId);
    //     this.getList();
    //   })
    // },
    getList() {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then((res) => {
        this.form = res.data;
      });
    },
    Gettagslist() {
      this.$http.get("/LiandoPlan/GetTodoPersonList?planId=" + this.planId).then((res) => {
        this.tabslist = res.data;
      });
    },
    gohome() {
      this.$router.push({
        path: "/index",
      });
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then((res) => {
        this.showmessage = res.data;
      });
    },
    setEmpty() {
      this.options = [];
    },
    onUserAdd(id) {
      const obj = {
        planId: this.rowId,
        userId: this.userGuid,
        type: this.userType,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanDivide();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    GetPlanDivide() {
      let obj = {
        planId: this.planId,
      };
      this.$http.get("/BidDivide/GetPlanDivide02", { params: obj }).then((res) => {
        // if (res.data.result.items) {
        //   res.data.result.items.forEach(item => {
        //     item.confirmDate = this.timeFormatSeconds(item.confirmDate);
        //   });
        // }
        this.tableData = res.data.result;
        this.tableData1.user1 = res.data.result[0];
        this.tableData1.user2 = res.data.result[1];
        this.tableData1.user3 = res.data.result[2];
        this.tableData1.user4 = res.data.result[3];
        if (this.tableData1.user3.userName1 == "" || this.tableData1.user3.userName1 == null) {
          this.zongbeiyi = false;
        } else {
          this.zongbeiyi = true;
        }
        if (this.tableData1.user3.userName2 == "" || this.tableData1.user3.userName2 == null) {
          this.zongbeier = false;
        } else {
          this.zongbeier = true;
        }
        if (this.tableData1.user4.userName1 == "" || this.tableData1.user4.userName1 == null) {
          this.shenbeiyi = false;
        } else {
          this.shenbeiyi = true;
        }
        // if (res.data[4].length > 0) {
        //   console.log(this.tableData1.user4.userName);
        //   if (this.tableData1.user4.userName == "" || this.tableData1.user4.userName == null) {
        //     this.select = false;
        //   } else {
        //     this.select = true;
        //   }
        // }
      });
    },
    showdai() {
      this.dialogVisible = true;
      this.Gettagslist();
    },
    sendtodo() {
      this.$confirm("确定要给当前分配的经办人发送待办吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.get("/LiandoPlan/SendDivideTodo", { params: { planId: this.planId } }).then((res) => {
          if (res.data.success) {
            this.$alert("待办发送成功", {
              confirmButtonText: "关闭",
            });
            this.dialogVisible = false;
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
            this.dialogVisible = false;
          }
        });
      });
    },
    remoteMethod(query, type) {
      if (query !== "") {
        this.GetSearchUserList22(query, type);
      } else {
        this.options = [];
      }
    },
    GetSearchUserList22(val, type) {
      this.loading1 = true;
      this.$http.get("/IdmUserInfo/GetSearchUserList22", { params: { keyWords: val, type } }).then((res) => {
        this.loading1 = false;
        this.options = res.data;
        // console.log(this.title);
        // if (this.title === null) {
        //   this.item.title == "暂无";
        // }
      });
    },
    GetLiandoPlanAllDropDown() {
      this.$http.get("/LiandoPlan/GetLiandoDivideWorkList").then((res) => {
        this.show1 = res.data.find((v) => v.value == 1);
        this.show2 = res.data.find((v) => v.value == 2);
        this.show3 = res.data.find((v) => v.value == 3);
        this.show4 = res.data.find((v) => v.value == 4);
        this.roleList = res.data;
        console.log(this.show1);
        console.log(this.show2);
        console.log(this.show3);
        console.log(this.show4);
      });
      this.$http.get("/LiandoPlan/GetLiandoPlanAllDropDown").then((res) => {
        this.bidLevels = res.data.bidLevel;
        this.bidLevel = res.data.length > 0 ? res.data[0].value : "";
        this.planStatuss = res.data.planStatus;
        this.planStatus = res.data.length > 0 ? res.data[0].value : "";
        this.GetPlanDivide();
      });
    },
    handle(val, type, planId) {
      const obj = {
        userId: val,
        planId: this.planId,
        type,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanDivide();
          this.getList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
      // console.log(this.tableData);
    },
    handle1(val, type, planId) {
      const obj = {
        userId: val,
        planId: this.planId,
        type,
        oldUserId: this.form.auditUserGuid,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanDivide();
          this.getList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    handle2(val, type, planId) {
      const obj = {
        userId: val,
        planId: this.planId,
        type,
        oldUserId: this.form.auditAlternativesUserGuid,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanDivide();
          this.getList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
      // console.log(this.tableData);
    },
    handle3(val, type, planId) {
      const obj = {
        userId: val,
        planId: this.planId,
        type,
        oldUserId: this.form.presidentUserGuid,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanDivide();
          this.getList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    handle4(val, type, planId) {
      const obj = {
        userId: val,
        planId: this.planId,
        type,
        oldUserId: this.form.presidentAltUserGuid,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanDivide();
          this.getList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    handle5(val, type, planId) {
      const obj = {
        userId: val,
        planId: this.planId,
        type,
        oldUserId: this.form.presidentOtherUserGuid,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanDivide();
          this.getList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    goto() {
      this.$router.push({
        name: "/bid/bidMode6/EditStep1",
        params: {
          baseId: this.planId,
        },
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
::v-deep .clearfix::after {
  content: none;
}
.el-icon-s-home {
  color: #409eff;
}
</style>
