<template>
  <el-main>
    <div class="userwidth" style="padding-bottom: 90px">
      <el-container>
        <!--左边分类-->
        <!-- <project-tree @itemClick="onChangeProject" @slideNave="slideNave" /> -->
        <!-- <el-card class="box-card" shadow="never" :body-style="{ padding: '15px 15px 0 15px' }" style="margin-left: 10px"> -->
        <el-card class="box-card" shadow="never" :body-style="{ padding: '15px 15px 0 15px' }">
          <el-form label-position="right" label-width="150px" :model="formSearch" size="small" class="border p-2 mt-0">
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目或期区名称：">
                  <el-input v-model="ProjectName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标计划名称：">
                  <el-input v-model="PlanName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标经办人：">
                  <el-input v-model="BidUserName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="入围经办人：">
                  <el-input v-model="SupplierUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="总裁三室经办人：">
                  <el-input v-model="PresidentUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审计经办人：">
                  <el-input v-model="AuditUserName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="招标层级：">
                  <el-select v-model="bidLevel" @change="selectChange">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in bidLevels" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招标状态：">
                  <el-select v-model="planStatus" @change="selectChange">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in planStatuss" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="未分工经办人：">
                  <el-select v-model="UnDivideStatus" @change="selectChange">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="招标经办人" value="1"></el-option>
                    <el-option label="入围经办人" value="2"></el-option>
                    <el-option label="总裁三室经办人" value="3"></el-option>
                    <el-option label="审计经办人" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-row class="mb-1 mt-1">
            <el-col :span="12">
              &nbsp;
              <el-tag v-for="p in plans" :key="p.id" closable class="mr-2" @close="removePlan(p)" type="danger">
                {{ p.planName }}
              </el-tag>
            </el-col>
            <el-col :span="12" class="text-right">
              <!-- <el-button type="primary" size="small" @click="onAddBidPlan">新增招采计划</el-button> -->
              <!-- <el-button type="primary" size="small" @click="confirmAaddPlan" :loading="addPlanLoading">添加招采方案</el-button> -->
              <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
              <el-button type="primary" size="small" @click="showdai" v-if="isShowFaQibtn">发送待办</el-button>
            </el-col>
          </el-row>
          <div class="mt-2">
            <!-- <el-tabs v-model="currTab" type="card" @tab-click="handleTabClick">
              <el-tab-pane label="邀请招标" name="a"> -->
            <el-table
              height="480"
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData"
            >
              <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
              <el-table-column prop="projectName" label="项目或期区名称" show-overflow-tooltip min-width="250" fixed>
                <template slot-scope="scope">
                  <span>{{ scope.row.projectName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="planName" label="招标计划名称" min-width="250" show-overflow-tooltip fixed>
                <template slot-scope="scope">
                  <!-- <el-tooltip class="item" effect="dark" content="点击查看招标计划详细信息" placement="top" :open-delay = 500> -->
                  <el-link type="primary" style="color: #409eff; text-decoration: none" @click="onAddBidPlan(scope.row.id)">{{
                    scope.row.planName
                  }}</el-link>
                  <!-- </el-tooltip> -->
                </template>
              </el-table-column>
              <!-- <el-table-column prop="editUserName" label="需求负责人" align="center" width="120"> </el-table-column> -->
              <el-table-column prop="bidEndDate" label="计划完成日期#(计划系统)" :render-header="renderheader" align="center" width="120">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.bidEndDate, "yyyy-MM-dd") }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="confirmDate" label="项目需求日期" align="center" width="150"> </el-table-column>
              <el-table-column prop="requireDesc" label="需求原因" align="center" min-width="180px" show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="需求负责人" align="center" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.editUserName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="招标经办人" align="center" width="120">
                <template slot-scope="scope">
                  <!-- <span>{{ scope.row.supplierUserName }}</span> -->
                  <el-select
                    size="small"
                    v-if="show1 != undefined"
                    v-model="scope.row.bidUserName"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="
                      (query) => {
                        remoteMethod(query, 1);
                      }
                    "
                    placeholder="请输入"
                    :loading="loading1"
                    @focus="setEmpty"
                    @change="handle($event, 1, scope.row.id)"
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
                  <span v-else>{{ scope.row.bidUserName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="入围经办人" align="center" width="120">
                <template slot-scope="scope">
                  <!-- <span>{{ scope.row.supplierUserName }}</span> -->
                  <el-select
                    size="small"
                    v-if="show2 != undefined"
                    v-model="scope.row.supplierUserName"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="
                      (query) => {
                        remoteMethod(query, 2);
                      }
                    "
                    placeholder="请输入"
                    :loading="loading1"
                    @focus="setEmpty"
                    @change="handle($event, 2, scope.row.id)"
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
                  <span v-else>{{ scope.row.supplierUserName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="总裁三室经办人" align="center" min-width="350">
                <template slot-scope="scope">
                  <!-- <span>{{ scope.row.presidentUserName }}</span> -->
                  <el-select
                    style="width: 100px; margin-right: 10px"
                    size="small"
                    v-if="show3 != undefined"
                    v-model="scope.row.presidentUserName"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="
                      (query) => {
                        remoteMethod(query, 3);
                      }
                    "
                    placeholder="请输入"
                    :loading="loading1"
                    @focus="setEmpty"
                    @change="handle1($event, 3, scope.row.id, scope.row.presidentUserGuid)"
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
                  <span v-else style="margin-right: 10px">{{ scope.row.presidentUserName }}</span>
                  <el-select
                    style="width: 100px; margin-right: 10px"
                    size="small"
                    v-if="show3 != undefined && scope.row.presidentUserName != null"
                    v-model="scope.row.presidentAltUserName"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="
                      (query) => {
                        remoteMethod(query, 3);
                      }
                    "
                    placeholder="请输入"
                    :loading="loading1"
                    @focus="setEmpty"
                    @change="handle1($event, 3, scope.row.id, scope.row.presidentAltUserGuid)"
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
                  <span v-else style="margin-right: 10px">{{ scope.row.presidentAltUserName }}</span>
                  <el-select
                    style="width: 100px"
                    size="small"
                    v-if="show3 != undefined && scope.row.presidentAltUserName != null"
                    v-model="scope.row.presidentOtherUserName"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="
                      (query) => {
                        remoteMethod(query, 3);
                      }
                    "
                    placeholder="请输入"
                    :loading="loading1"
                    @focus="setEmpty"
                    @change="handle1($event, 3, scope.row.id, scope.row.presidentOtherUserGuid)"
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
                  <span v-else>{{ scope.row.presidentOtherUserName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="审计经办人" align="center" width="250">
                <template slot-scope="scope">
                  <!-- <span>{{ scope.row.auditUserName }}</span> -->
                  <el-select
                    style="width: 100px; margin-right: 10px"
                    size="small"
                    v-if="show4 != undefined"
                    v-model="scope.row.auditUserName"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="
                      (query) => {
                        remoteMethod(query, 4);
                      }
                    "
                    placeholder="请输入"
                    :loading="loading1"
                    @focus="setEmpty"
                    @change="handle1($event, 4, scope.row.id, scope.row.auditUserGuid)"
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
                  <span v-else style="margin-right: 10px">{{ scope.row.auditUserName }}</span>
                  <el-select
                    style="width: 100px"
                    size="small"
                    v-if="show4 != undefined && scope.row.auditUserName != null"
                    v-model="scope.row.auditAlternativesUserName"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="
                      (query) => {
                        remoteMethod(query, 5);
                      }
                    "
                    placeholder="请输入"
                    :loading="loading1"
                    @focus="setEmpty"
                    @change="handle1($event, 5, scope.row.id, scope.row.auditAlternativesUserGuid)"
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
                  <span v-else>{{ scope.row.auditAlternativesUserName }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                  <div>
                    <el-select
                      v-if="scope.row.showEditUserButton"
                      v-model="scope.row.userType"
                      placeholder="请选择"
                      @change="selectRole($event, scope.row)"
                    >
                      <el-option v-for="item in roleList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column> -->
            </el-table>
            <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
            <!-- </el-tab-pane> -->
            <!-- <el-tab-pane label="直接委托" name="b">
                <div>正在建设...</div>
              </el-tab-pane> -->
            <!-- </el-tabs> -->
          </div>
        </el-card>
        <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
      </el-container>
    </div>
    <el-dialog width="30%" title="发送待办" :visible.sync="dialogVisible">
      <div>
        <template>
          <el-tag v-for="item in tabslist" :key="item" style="width: 150px; margin-bottom: 10px; margin-right: 10px">{{ item }}</el-tag>
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
import ProjectTree from "./components/ProjectTree";
import choseUser from "@/components/choseUser";
import { groupBy } from "@/util";
import bus from "@/util/bus";
import { parseTime } from "@/util";
export default {
  components: {
    ProjectTree,
    choseUser,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      options: [],
      list: [],
      tabslist: [],
      bidLevel: "",
      dialogVisible: false,
      SupplierUserName: "",
      AuditUserName: "",
      PresidentUserName: "",
      bidLevels: [],
      roleList: [],
      planStatus: "",
      planStatuss: [],
      dropDownGroup: {},
      dialogVisiblename: false,
      addPlanLoading: false,
      detailVisible: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      loading1: false,
      userType: "",
      activeName: "1",
      rowId: "",
      BidUserName: "",
      UnDivideStatus: "",
      ProjectName: "",
      PlanName: "",
      BidLevel: "",
      HaveBidUser: "",
      formSearch: {
        Id: "",
        ProjectId: "",
        RequireDoStatus: "",
        PlanStatus: "",
        HaveSupplierUser: "",
        UnDivideStatus: "",
        SkipCount: 0,
        MaxResultCount: 15,
        // size: 15,
        // current: 1,
        // total: 0,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      type: 1,
      tableData: [
        {
          id: "",
        },
      ],
      plans: [],
      currTab: "a",
      isShowFaQibtn: false,
    };
  },
  created() {
    // this.$emit("header", false);
    // this.$emit("footer", false);/api/services/app/LiandoPlan/GetPlanList
    bus.$emit("showNav");
    // this.loadQueryForm();
    // this.GetPlanList();
    this.GetLiandoPlanAllDropDown();

    this.$http.post("/RoleMenu/GetUserRoleButtonList", ["DIVIDESENDTODO"], {}).then((res) => {
      this.isShowFaQibtn = res.data.indexOf("DIVIDESENDTODO") > -1 ? true : false;
    });
  },
  methods: {
    parseTime,
    renderheader(h, { column, $index }) {
      return h("span", {}, [h("span", {}, column.label.split("#")[0]), h("br"), h("span", {}, column.label.split("#")[1])]);
    },
    timeFormatSeconds(time) {
      var d = time ? new Date(time) : new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      // var hours = d.getHours();
      // var min = d.getMinutes();
      // var seconds = d.getSeconds();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      // if (hours < 0) hours = "0" + hours;
      // if (min < 10) min = "0" + min;
      // if (seconds < 10) seconds = "0" + seconds;

      return year + "-" + month + "-" + day;
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
        this.GetPlanList();
      });
    },
    selectChange() {
      this.page.index = 1;
      this.GetPlanList();
    },
    selectRole(val, row) {
      this.rowId = row.id;
      this.userType = val;
      this.$refs.choseUser.openfnc();
    },
    sendtodo() {
      this.$confirm("确定要给当前分配的经办人发送待办吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.get("/LiandoPlan/SendDivideTodo", { params: { planId: this.rowId } }).then((res) => {
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
    handle(val, type, planId) {
      const obj = {
        userId: val,
        planId,
        type,
      };
      this.oldUserId = val;
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
      // console.log(this.tableData);
    },
    handle1(val, type, planId, oldUserId) {
      console.log(val);
      console.log(oldUserId);
      const obj = {
        oldUserId,
        userId: val,
        planId,
        type,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
      // console.log(this.tableData);
    },
    remoteMethod(query, type) {
      console.log(query);
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
    setEmpty() {
      this.options = [];
    },
    showdai() {
      this.dialogVisible = true;
      this.Gettagslist();
    },
    Gettagslist() {
      this.$http.get("/LiandoPlan/GetTodoPersonList").then((res) => {
        this.tabslist = res.data;
      });
    },
    GetPlanList() {
      let obj = {
        Id: this.id,
        BidUserName: this.BidUserName,
        ProjectName: this.ProjectName,
        PlanName: this.PlanName,
        BidLevel: this.bidLevel,
        PlanStatus: this.planStatus,
        SupplierUserName: this.SupplierUserName,
        PresidentUserName: this.PresidentUserName,
        AuditUserName: this.AuditUserName,
        UnDivideStatus: this.UnDivideStatus,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
      };
      this.$http.get("/LiandoPlan/GetPlanDivideBidWorkList", { params: obj }).then((res) => {
        if (res.data.result.items) {
          res.data.result.items.forEach((item) => {
            item.confirmDate = this.timeFormatSeconds(item.confirmDate);
          });
        }
        this.tableData = res.data.result.items;
        this.tableData.id = res.data.result.items.id;
        this.page.total = res.data.result.totalCount;
        console.log(res);
      });
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.GetPlanList();
    },
    showSignUpListname1(id) {
      this.type = 1;
      this.rowId = id;
      this.$refs.choseUser.openfnc();
    },
    getBidNoticeSignUpList(baseId) {
      this.$api.BidNotice.GetBidNoticeSignUpList(baseId).then((res) => {
        this.siginUpList = res;
        if (this.siginUpList && this.siginUpList.length > 0) {
          this.activeName = this.siginUpList[0].sectionId;
        }
      });
    },
    loadQueryForm() {
      this.$api.BidPlan.GetBidPlanDropDown().then((res) => {
        this.dropDownGroup = res;
        this.onSubmit();
      });
    },
    onSubmit() {
      this.page.index = 1;
      this.GetPlanList();
    },
    onUserAdd(id) {
      const obj = {
        planId: this.rowId,
        userId: id.userGuid,
        type: this.userType,
      };
      this.$http.post("LiandoPlan/AddPlanManager", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.GetPlanList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    // slideNave(data) {
    //   this.open = data;
    //   console.log(this.open);
    // },
    // 测导航显示隐藏
    slideNave() {
      let that = this;
      that.open = !that.open;
      if (!that.open) {
        that.sysTreeCateTypeW = "25px";
      } else {
        that.sysTreeCateTypeW = "300px";
      }
    },
    onChangeProject(project) {
      // this.formSearch.ProjectId = project.id;
    },
    jumpDetail(id) {
      // window.open(`#/bid/bidPlanShow?id=${id}`);
      this.$router.push({
        path: "/bid/bidPlanShow",
        params: {
          baseId: id,
        },
      });
    },
    handleTabClick(tab, event) {
      // this.currTab = tab.name;
    },
    /**
     * 编辑计划
     */
    edit(id) {
      this.$router.push({
        name: "/bid/bidMode6/EditStep1",
        params: {
          baseId: id,
        },
      });
    },
    onEditSave() {
      this.detailVisible = false;
      this.onSubmit();
    },
    onCancle() {
      this.detailVisible = false;
    },
    /**
     * 删除计划
     */
    del(id) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.BidPlan.DeleteBidPlanById(id).then((res) => {
            if (res.success) {
              this.$msg.success("删除成功！");
              this.onSubmit();
            } else {
              // this.$msg.error(res.message);
              this.$msg.error("删除失败！");
            }
          });
        })
        .catch(() => {
          this.$msg.info("取消删除！");
        });
    },
    /**
     * 选择计划
     */
    selectPlan(row) {
      this.$router.push({
        path: "/bid/bidMode7/EditStep1",
        query: { row: row },
      });
    },
    /**
     * 清除计划
     */
    removePlan(plan) {
      this.plans.splice(this.plans.indexOf(plan), 1);
    },
    /**
     * 添加或修改招标计划
     */
    onAddBidPlan(id) {
      // window.open(`#/bid/${"bidModeDetail"}/${id}`);
      // this.$router.push({
      //   // path: "/bid/bidMode6/EditStep1",
      //   name: "bidModeDetail",
      //   params: {
      //     baseId: id,
      //   },
      // });
      // window.open(`#/bid/${"liandoBidPlanDetail"}/${id}`);
      window.open(`#/bid/${"liandoBidPlanDetail"}?id=${id}`);
    },
    confirmAaddPlan() {
      if (this.plans.length > 0) {
        this.$confirm("是否添加招采方案?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.addPlanToMode();
        });
      } else {
        this.$alert("请在操作列中选择一个或多个采购事项", "警告", {
          confirmButtonText: "确定",
          type: "warning",
        });
      }
    },
    /**
     * 添加招采方案
     */
    addPlanToMode() {
      const ids = this.plans.map((p) => p.id);
      this.addPlanLoading = true;
      this.$api.BidPlan.AddPlanToMode(ids)
        .then((res) => {
          if (res.success) {
            this.$msg.success("添加成功");
            this.plans.splice(0, this.plans.length);
            this.onSubmit();
          } else {
            this.$alert(res.message, "警告", {
              confirmButtonText: "确定",
              type: "warning",
            });
          }
        })
        .finally(() => {
          this.addPlanLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.el-select {
  width: 100%;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}

.dropdown-menu {
  width: 6rem;
  min-width: 3rem !important;
}
.zuzhi {
  text-align: center;
  padding: 30px 0 50px;
  font-size: 18px;
  color: #21468c;
}

.dropdown-item {
  padding: 0.25rem 1rem !important;
}
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
::v-deep .el-select__caret .el-input__icon {
  display: none !important;
}
::v-deep.el-icon-arrow-up:before {
  content: "\e6df";
}
</style>
