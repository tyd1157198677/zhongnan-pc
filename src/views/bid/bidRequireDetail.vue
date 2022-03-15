<template>
  <el-main>
    <el-card style="margin-bottom:60px">
      <div>
        <span
          ><strong>{{ showmessage }}</strong></span
        >
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
        <!-- <i class="el-icon-s-home" style="float:right;margin-left:10px;" title="点击进入首页" @click="gohome"></i> -->
      </div>
      <div>
        <table class="layui-table el-table__body mt-3">
          <tbody>
            <tr>
              <td style="width: 20%" class="right">项目或期区名称：</td>
              <td style="width: 30%">
                {{ this.data1.projectName }}
              </td>
              <td style="width: 20%" class="right">招标层级：</td>
              <td style="width: 30%">
                {{ this.data1.bidLevel }}
              </td>
            </tr>
            <tr>
              <td style="width: 20%" class="right">项目需求日期：</td>
              <td style="width: 30%" v-if="this.data1.confirmDate">
                {{ this.data1.confirmDate.substring(0, 10) }}
              </td>
              <td style="width: 30%" v-if="!this.data1.confirmDate">
                {{ this.data1.confirmDate }}
              </td>
              <td style="width: 20%" class="right">建筑面积：</td>
              <td style="width: 30%" colspan="3">{{ this.data1.jzSquire }}m²</td>
            </tr>
            <tr>
              <td style="width: 20%" class="right">招标计划名称：</td>
              <td style="width: 30%">
                {{ this.data1.planName }}
              </td>
              <td style="width: 20%" class="right">需求负责人：</td>
              <td style="width: 30%">
                {{ this.data1.editUserName }}
              </td>
            </tr>
            <tr>
              <td style="width: 20%" class="right">项目需求原因：</td>
              <td style="width: 30%" colspan="3">
                {{ this.data1.requireDesc }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <el-button type="primary" style="float:right;margin-top:10px;margin-bottom:10px" size="small" @click="showdai" v-if="isShowFaQibtn"
          >发送待办</el-button
        >
      </div>
      <el-form
        v-if="isShowFaQibtn"
        ref="tableData"
        style="margin-top:60px;justify-content: space-between;"
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
                  query => {
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
                    <span style="float: right;  font-size: 13px" v-if="item.desc">
                      (<span style="color: red;">{{ item.desc }}</span
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
                  query => {
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
                    <span style="float: right;  font-size: 13px" v-if="item.desc">
                      (<span style="color: red;">{{ item.desc }}</span
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
                style="margin-right:10px"
                :disabled="!show3"
                v-model="tableData1.user3.userName1"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  query => {
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
                    <span style="float: right;  font-size: 13px" v-if="item.desc">
                      (<span style="color: red;">{{ item.desc }}</span
                      >)
                    </span>
                  </el-option>
                </el-tooltip>
              </el-select>
              <el-select
                style="margin-right:10px;margin-top:10px"
                :disabled="!show3"
                v-model="tableData1.user3.userName2"
                v-if="zongbeiyi"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  query => {
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
                    <span style="float: right;  font-size: 13px" v-if="item.desc">
                      (<span style="color: red;">{{ item.desc }}</span
                      >)
                    </span>
                  </el-option>
                </el-tooltip>
              </el-select>
              <el-select
                style="margin-top:10px"
                :disabled="!show3"
                v-model="tableData1.user3.userName3"
                v-if="zongbeier"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  query => {
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
                    <span style="float: right;  font-size: 13px" v-if="item.desc">
                      (<span style="color: red;">{{ item.desc }}</span
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
                style="margin-right:10px"
                :disabled="!show4"
                v-model="tableData1.user4.userName1"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  query => {
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
                    <span style="float: right;  font-size: 13px" v-if="item.desc">
                      (<span style="color: red;">{{ item.desc }}</span
                      >)
                    </span>
                  </el-option>
                </el-tooltip>
              </el-select>
              <el-select
                style="margin-top:10px"
                :disabled="!show4"
                v-if="shenbeiyi"
                v-model="tableData1.user4.userName2"
                filterable
                remote
                reserve-keyword
                :remote-method="
                  query => {
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
                    <span style="float: right;  font-size: 13px" v-if="item.desc">
                      (<span style="color: red;">{{ item.desc }}</span
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
    <el-card>
      <span style="margin:10px"><strong>历史分工:</strong></span>
      <div>
        <template>
          <el-tag v-for="(item, index) in historylist" :key="index" style="width:200px;margin: 10px">{{ item }}</el-tag>
        </template>
      </div>
    </el-card>
    <el-dialog width="30%" title="发送待办" :visible.sync="dialogVisible">
      <div>
        <template>
          <el-tag v-for="(item, index) in tabslist" :key="index" style="width:150px;margin-bottom:10px;margin-right:10px">{{
            item
          }}</el-tag>
        </template>
      </div>
      <el-form>
        <el-form-item>
          <el-button type="primary" style="float:right" size="small" @click="sendtodo">确认发送</el-button>
          <el-button size="small" style="float:right;margin-right:10px;" @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
import choseUser from "@/components/choseUser";
export default {
  name: "Step1",
  components: {
    choseUser,
  },
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      data1: {},
      showmessage: "",
      historylist: [],
      planId: "",
      msg: "",
      options: [],
      isCanEdit: false,
      radio: true,
      designCode: "",
      todoId: "",
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
      select: false,
      tableData: [],
      tableData1: {
        user1: {},
        user2: {},
        user3: {},
        user4: {},
      },
      tabslist: [],
      loading: false,
      form: [],
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rules: {},
      oldUserId1: "",
      oldUserId2: "",
    };
  },
  created: function() {
    this.planId = this.$route.query.id;
    this.todoId = this.$route.query.todoId;
    this.$http.post("/RoleMenu/GetUserRoleButtonList", ["DIVIDESENDTODO"], {}).then(res => {
      this.isShowFaQibtn = res.data.indexOf("DIVIDESENDTODO") > -1 ? true : false;
    });
  },
  computed: {
    // navBarName() {
    //   const barName = "";
    //   return barName;
    // },
  },
  mounted() {
    this.getTable();
    this.GetLiandoPlanAllDropDown();
    this.GetDivideHistory();
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
  },
  methods: {
    parseTime,

    getTable() {
      this.$http.get("/LiandoPlanRequire/GetOneRequireById", { params: { id: this.planId } }).then(res => {
        console.log(res.data.result);
        this.data1 = res.data.result;
      });
    },
    Gettagslist() {
      this.$http.get("/LiandoPlan/GetTodoPersonList?planId=" + this.planId).then(res => {
        this.tabslist = res.data;
      });
    },
    GetDivideHistory() {
      this.$http.get("/LiandoPlan/GetDivideHistory?planId=" + this.planId).then(res => {
        this.historylist = res.data;
      });
    },
    gohome() {
      this.$router.push({
        path: "/index",
      });
    },
    GetTodoTitleById1001() {
      console.log(this.todoId);
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then(res => {
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
      this.$http.post("LiandoPlan/AddPlanManager", obj).then(res => {
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
      this.$http.get("/BidDivide/GetPlanDivide02", { params: obj }).then(res => {
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
        this.oldUserId1 = res.data.result[3].userGuid1;
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
        // this.tableData.userGuid = res.data.userGuid;
        // if (res.data[4].length === undefined) {
        //   this.tableData1.user5 = res.data.result[4];
        // }
        // console.log(res.data[4].length);
        // if (!res.data[4].length == undefined) {
        //   this.tableData1.user5 = res.data[4];
        //   // this.oldUserId2 = res.data[4].userGuid;
        //   console.log(1);
        // }
        // if (this.tableData1.user4.userName == "" || this.tableData1.user4.userName == null) {
        //   this.select = false;
        // } else {
        //   this.select = true;
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
        console.log(this.planId);
        this.$http.get("/LiandoPlan/SendDivideTodo", { params: { planId: this.planId } }).then(res => {
          if (res.data.success) {
            if (this.tabslist.length > 0) {
              this.$alert(res.data.message, {
                confirmButtonText: "关闭",
              });
              this.dialogVisible = false;
            } else {
              this.$alert("暂无人员发送", {
                confirmButtonText: "确定",
              });
              this.dialogVisible = false;
            }
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
      this.$http.get("/IdmUserInfo/GetSearchUserList22", { params: { keyWords: val, type } }).then(res => {
        this.loading1 = false;
        this.options = res.data;
        // console.log(this.title);
        // if (this.title === null) {
        //   this.item.title == "暂无";
        // }
      });
    },
    GetLiandoPlanAllDropDown() {
      this.$http.get("/LiandoPlan/GetLiandoDivideWorkList").then(res => {
        this.show1 = res.data.find(v => v.value == 1);
        this.show2 = res.data.find(v => v.value == 2);
        this.show3 = res.data.find(v => v.value == 3);
        this.show4 = res.data.find(v => v.value == 4);
        this.roleList = res.data;
        console.log(this.show1);
        console.log(this.show2);
        console.log(this.show3);
        console.log(this.show4);
      });
      this.$http.get("/LiandoPlan/GetLiandoPlanAllDropDown").then(res => {
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
      this.$http.post("LiandoPlan/AddPlanManager", obj).then(res => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanDivide();
          this.GetDivideHistory();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
      // console.log(this.tableData);
    },
    handle1(val, type, planId) {
      // this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then(res => {
      //   this.form = res.data;
      //   this.auditUserGuid = res.data.auditUserGuid;
      //   console.log(this.auditUserGuid);
      // });

      const obj = {
        userId: val,
        planId: this.planId,
        type,
        oldUserId: this.oldUserId1,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then(res => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanDivide();
          this.GetDivideHistory();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
      // console.log(this.tableData);
    },
    handle2(val, type, planId) {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then(res => {
        this.auditAlternativesUserGuid = res.data.auditAlternativesUserGuid;
        const obj = {
          userId: val,
          planId: this.planId,
          type,
          oldUserId: this.auditAlternativesUserGuid,
        };
        this.$http.post("LiandoPlan/AddPlanManager", obj).then(res => {
          if (res.data.success) {
            this.$message.success("添加成功");
            this.GetPlanDivide();
            this.GetDivideHistory();
            this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then(res => {});
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    handle3(val, type, planId) {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then(res => {
        this.presidentUserGuid = res.data.presidentUserGuid;
        const obj = {
          userId: val,
          planId: this.planId,
          type,
          oldUserId: this.presidentUserGuid,
        };
        this.$http.post("LiandoPlan/AddPlanManager", obj).then(res => {
          if (res.data.success) {
            this.$message.success("添加成功");
            this.GetPlanDivide();
            this.GetDivideHistory();
            this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then(res => {});
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    handle4(val, type, planId) {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then(res => {
        this.presidentAltUserGuid = res.data.presidentAltUserGuid;
        const obj = {
          userId: val,
          planId: this.planId,
          type,
          oldUserId: this.presidentAltUserGuid,
        };
        this.$http.post("LiandoPlan/AddPlanManager", obj).then(res => {
          if (res.data.success) {
            this.$message.success("添加成功");
            this.GetPlanDivide();
            this.GetDivideHistory();
            this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then(res => {});
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    handle5(val, type, planId) {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then(res => {
        this.presidentOtherUserGuid = res.data.presidentOtherUserGuid;
        const obj = {
          userId: val,
          planId: this.planId,
          type,
          oldUserId: this.presidentOtherUserGuid,
        };
        this.$http.post("LiandoPlan/AddPlanManager", obj).then(res => {
          if (res.data.success) {
            this.$message.success("添加成功");
            this.GetPlanDivide();
            this.GetDivideHistory();
            this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then(res => {});
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    goto() {
      this.$router.push({
        path: "/bid/divideWork",
      });
    },
  },
};
</script>
<style scoped>
::v-deep .clearfix::after {
  content: none;
}
.el-icon-s-home {
  color: #409eff;
}
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 20px;
  float: right;
  cursor: pointer;
}
</style>
