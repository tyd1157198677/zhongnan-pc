<template>
  <div>
    <!-- <div class="pub">历史延期记录</div> -->
    <div class="pub">计划变更</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="时间变更" name="时间变更">
        <div class="tits">
          <el-button v-if="showbut" type="danger" size="mini" @click="editInfo">编辑计划</el-button>
          <el-button v-if="showbut" type="danger" size="mini" @click="mesto">短信提醒</el-button>
        </div>
        <table class="layui-table el-table__body mt-3">
          <tbody>
            <tr>
              <!-- <td style="width: 20%" class="right">报名截止时间：</td>
          <td style="width: 30%">
            {{ baseInfo.signUpEndDate ? baseInfo.signUpEndDate : "--" }}
          </td> -->
              <td style="width: 20%" class="right">计划发标日期：</td>
              <td style="width: 30%">
                {{ baseInfo.bidSendDate ? baseInfo.bidSendDate : "--" }}
              </td>
              <td style="width: 20%" class="right">答疑截止时间：</td>
              <td style="width: 30%">
                {{ baseInfo.qaEndTime ? baseInfo.qaEndTime : "--" }}
              </td>
            </tr>
            <tr>
              <td style="width: 20%" class="right">计划回标时间：</td>
              <td style="width: 30%">
                {{ baseInfo.backEndTime ? baseInfo.backEndTime : "--" }}
              </td>
              <td style="width: 20%" class="right">计划开标时间：</td>
              <td style="width: 30%">
                {{ baseInfo.bidOpenTime ? baseInfo.bidOpenTime : "--" }}
              </td>
              <!-- <td style="width: 20%" class="right">计划定标时间：</td>
          <td style="width: 30%">{{ baseInfo.bidEndDate ? baseInfo.bidEndDate : "--" }}</td> -->
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="招标计划变更" name="招标计划变更">
        <el-collapse v-model="activeNames1">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="el-icon-menu" style="color: #787b84"></i><span class="infonametits">基本信息</span>
            </template>
            <el-form :rules="rules" ref="base" :model="base" label-width="130px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="招标计划名称：" prop="planName">
                    <el-input style="width: 300px" v-if="submitButton" v-model="base.planName" placeholder="请输入招标计划名称"></el-input>
                    <el-input style="width: 300px" v-else v-model="base.planName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="招标计划编号：" prop="planCode">
                    <el-input style="width: 300px" v-if="submitButton" v-model="base.planCode" placeholder="请输入招标计划编号"></el-input>
                    <el-input style="width: 300px" v-else v-model="base.planCode" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="招标专业：" prop="bidCateName">
                    <el-input
                      v-if="submitButton"
                      style="width: 300px"
                      v-model="base.bidCateName"
                      placeholder="请选择招标专业"
                      @focus="categoryVisible = true"
                    ></el-input>
                    <el-input style="width: 300px" v-else v-model="base.bidCateName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="招标方式：" prop="purchaseType">
                    <el-select v-if="submitButton" v-model="base.purchaseType" size="small" style="width: 300px">
                      <el-option v-for="item in purchaseTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                    </el-select>
                    <el-select v-model="base.purchaseType" disabled size="small" v-else style="width: 300px">
                      <el-option v-for="item in purchaseTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22" style="margin-top: 20px">
                  <el-form-item label="说明：">
                    <el-input
                      v-if="submitButton"
                      v-model="base.desc"
                      type="textarea"
                      placeholder="请输入说明"
                      style="width: 100%"
                    ></el-input>
                    <el-input v-model="base.desc" v-else type="textarea" disabled placeholder="请输入说明" style="width: 100%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div>
                <el-button
                  style="float: right; margin-bottom: 10px"
                  :loading="loading"
                  type="primary"
                  class="buttoncss"
                  size="small"
                  v-if="submitButton"
                  @click="onSubmitto('base')"
                  >保存信息</el-button
                >
              </div>
            </el-form>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <i class="el-icon-menu" style="color: #787b84"></i><span class="infonametits">招标组长</span>
            </template>
            <div class="fromborder">
              <el-row>
                <div style="margin-bottom: 10px">
                  <span style="color: #dc3545">*组长只能选择一位</span>
                  <el-button
                    type="primary"
                    v-if="submitButton"
                    size="small"
                    :loading="loading"
                    style="float: right; margin-bottom: 10px"
                    @click="onAdd"
                    >更换成员</el-button
                  >
                </div>
                <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="zuzhangdata">
                  <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                  <el-table-column label="姓名" prop="userName" align="center">
                    <!-- <template slot-scope="scope">
                      <span>{{ scope.row.userName }}</span>
                    </template> -->
                  </el-table-column>
                  <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
                </el-table>
              </el-row>
            </div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <i class="el-icon-menu" style="color: #787b84"></i><span class="infonametits">招标单项计划</span>
            </template>
            <div>
              <el-table
                empty-text="无符合条件的记录"
                stripe
                border
                style="margin-top: 10px"
                element-loading-text="请稍候,数据正在加载中..."
                :data="tableData"
              >
                <el-table-column type="index" width="50" label="序号" align="center" prop="num"> </el-table-column>
                <el-table-column prop="bidWorkType" label="项目工程" width="150"> </el-table-column>
                <el-table-column prop="workDesc" label="工作结果">
                  <!-- <template slot-scope="scope"> -->
                  <!-- <el-input v-model="scope.row.workDesc" placeholder="请输入工作结果" @change="changeInput"></el-input> -->
                  <!-- <span v-else>{{ scope.row.workDesc }}</span> -->
                  <!-- </template> -->
                </el-table-column>
                <el-table-column label="责任人" width="120" prop="userName" align="center">
                  <template slot-scope="scope">
                    <el-select
                      v-if="submitButton"
                      ref="select"
                      v-model="scope.row.userName"
                      filterable
                      remote
                      reserve-keyword
                      :remote-method="remoteMethod"
                      placeholder="请输入关键词"
                      :loading="loading1"
                      @focus="setEmpty"
                      @change="handle($event, scope.$index)"
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
                        <el-option :label="item.userName" :value="item.userGuid"> </el-option>
                      </el-tooltip>
                    </el-select>
                    <el-select v-model="scope.row.userName" disabled v-else></el-select>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="责任人" width="180" prop="userName" align="center" v-if="!showsubmit">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column> -->
              </el-table>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div style="height: 30px; margin-top: 10px">
          <span style="color: red">{{ pageMessage }}</span>
          <el-button
            type="primary"
            :loading="loading"
            v-if="submitButton"
            class="buttoncss"
            size="small"
            style="float: right; margin-top: 10px; margin-bottom: 10px"
            @click="substr"
            >提交</el-button
          >
        </div>
        <div style="margin-top: 10px">
          <el-form v-if="showmark" v-loading="loading">
            <el-form-item label="审批意见：" prop="remark" style="margin-top: 20px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 4 }"
                placeholder="请输入审批意见"
                v-model="remark"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" v-if="showPassButton" type="primary" style="float: right; margin-top: 10px" @click="omsubmit"
                >通过</el-button
              >
              <el-button
                size="mini"
                v-if="showRefuseButton"
                type="primary"
                style="float: right; margin-top: 10px; margin-right: 10px"
                @click="bohui"
                >驳回</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top: 10px" v-if="tablelist.length > 0">
          <el-row>
            <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tablelist">
              <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
              <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
              <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
              <el-table-column prop="creationTime" width="180" label="待办时间" align="center">
                <template slot-scope="scope"
                  ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
                >
              </el-table-column>
              <el-table-column prop="dealTime" width="180" label="处理时间" align="center">
                <template slot-scope="scope"
                  ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
                >
              </el-table-column>
              <el-table-column prop="status" width="80" label="结果" align="center"> </el-table-column>
              <el-table-column label="意见/备注" prop="comments" align="center" show-overflow-tooltip> </el-table-column>
            </el-table>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="dialogVisible" width="60%" title="编辑信息">
      <!-- <shi-jian :info="baseInfo" ref="detail" @onCancle="dialogVisible = false" @onSubmit="onEditSave" /> -->
      <el-row class="pt-3 pl-3 pr-3 mx-auto">
        <el-form ref="form" label-width="130px" size="small" :model="form" :rules="rules" class="m-3">
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划发标日期" prop="bidSendDate">
                <el-date-picker type="date" v-model="form.bidSendDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="答疑截止时间" prop="qaEndTime">
                <el-date-picker
                  type="datetime"
                  v-model="form.qaEndTime"
                  value-format="yyyy-MM-dd HH:mm"
                  format="yyyy-MM-dd HH:mm"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划回标时间" prop="backEndTime">
                <el-date-picker
                  type="datetime"
                  v-model="form.backEndTime"
                  value-format="yyyy-MM-dd HH:mm"
                  format="yyyy-MM-dd HH:mm"
                  placeholder="选择时间"
                  @change="same"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划开标时间" prop="bidEndDate">
                <el-date-picker
                  type="datetime"
                  v-model="form.bidOpenTime"
                  value-format="yyyy-MM-dd HH:mm"
                  format="yyyy-MM-dd HH:mm"
                  placeholder="选择时间"
                  @change="same2"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="right">
              <el-button type="primary" size="small" :loading="loadingSave" @click="onSubmit('form')">保存信息</el-button>
              <el-button size="small" @click="dialogVisible = false">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleto" title="短信通知投标联系人" width="70%">
      <el-button style="float: right; margin-bottom: 10px" size="small" type="primary" @click="tosend(selectList)">确认发送</el-button>
      <el-table stripe border :data="todatalist" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
        <el-table-column prop="comFullName" label="投标方名称" align="left"> </el-table-column>
        <el-table-column prop="personName" width="180" label="联系人姓名" align="center"> </el-table-column>
        <el-table-column prop="mobilePhone" width="180" label="手机号" align="center"> </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="categoryVisible" title="选择招标专业">
      <categoryTree @itemClick="onChangeCategory" />
    </el-dialog>
    <el-dialog :visible.sync="dialogVisiblecause" title="填写修改计划原因">
      <el-row class="pt-3 pl-3 pr-3 mx-auto" :loading="loading">
        <el-form label-width="100px" size="small" :rules="rules" class="m-3">
          <el-row>
            <el-col :span="24">
              <el-form-item label="修改原因" prop="cause">
                <el-input type="textarea" v-model="cause" placeholder="请输入修改计划的原因"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="right">
              <el-button size="small" :loading="loading" @click="dialogVisiblecause = false">取消</el-button>
              <el-button type="primary" :loading="loading" size="small" @click="onSubmitcause()">确定并提交</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </el-dialog>
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
  </div>
</template>

<script>
import ShiJian from "./shiJian";
import { parseTime } from "@/util";
import categoryTree from "../components/CategoryTree";
import choseUser from "@/components/choseUser";
export default {
  components: { ShiJian, categoryTree, choseUser },
  props: ["id"],
  data() {
    return {
      showmark: false,
      remark: "",
      showPassButton: false,
      showRefuseButton: false,
      tablelist: [],
      showtablelist: false,
      pageMessage: "",
      options: [],
      loading: false,
      loading1: false,
      submitButton: false,
      categoryVisible: false,
      dialogVisiblecause: false,
      cause: "",
      zuzhangdata: [{ userName: "" }],
      tableData: [],
      base: {
        purchaseType: "",
        planCode: "",
        bidCateName: "",
        desc: "",
        planName: "",
        id: "",
      },
      purchaseType: "",
      purchaseTypes: [],
      phoneList: [],
      activeName: "时间变更",
      activeNames1: ["1", "2", "3"],
      mobilePhone: "",
      form: {
        bidSendDate: new Date(),
        qaEndTime: new Date(),
        backEndTime: new Date(),
        bidEndDate: new Date(),
        bidOpenTime: new Date(),
      },
      baseInfo: {},
      showbut: false,
      dialogVisible: false,
      dialogVisibleto: false,
      loadingSave: false,
      todatalist: [],
      rules: {
        signUpEndDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        bidSendDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        backEndTime: [{ required: true, message: "请选择日期", trigger: "blur" }],
        qaEndTime: [{ required: true, message: "请选择日期", trigger: "blur" }],
        bidEndDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        standardContractFlag: [{ required: true, message: "请选择", trigger: "blur" }],
        bidOpenType: [{ required: true, message: "请选择", trigger: "blur" }],
        bidPriceType: [{ required: true, message: "请选择", trigger: "blur" }],
        examMethod: [{ required: true, message: "请选择日期", trigger: "blur" }],
        techPercent: [{ required: true, message: "请输入技术权重", trigger: "blur" }],
        businessPercent: [{ required: true, message: "请输入商务权重", trigger: "blur" }],
        techQualifyScore: [{ required: true, message: "请输入技术合格分", trigger: "blur" }],
        businessExamType: [{ required: true, message: "请选择商务评标方式", trigger: "blur" }],
      },
    };
  },
  computed: {},
  mounted() {
    this.CheckCanEditToolBar();
    this.GetPlanChangePage();
    // this.GetNewLogList_PlanChange();
  },
  methods: {
    parseTime,
    tomethgopostpone() {
      this.CheckCanEditToolBar();
      this.GetPlanChangePage();
      // this.GetNewLogList_PlanChange();
    },
    GetLiandoPlanAllDropDown() {
      this.$http.get("/LiandoPlan/GetLiandoPlanAllDropDown").then((res) => {
        this.purchaseTypes = res.data.purchaseType;
        this.purchaseType = res.data.length > 0 ? res.data[0].value : null;
      });
    },
    onChangeCategory(category) {
      this.base.bidCateId = category.id;
      this.base.bidCateName = category.cateName;
      this.categoryVisible = false;
    },
    onAdd() {
      this.type = 1;
      this.$refs.choseUser.openfnc();
    },
    onUserAdd(id) {
      const obj = {
        bidModeId: this.id,
        userId: id.userGuid,
        // id: this.zuzhangdata.id,
      };
      this.loading = true;
      this.$http.post("/LiandoBidMaster/UpdateLeader", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.loading = false;
          this.GetPlanChangePage();
        } else {
          this.loading = false;
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    async GetPlanChangePage() {
      this.$http.get("/LiandoBidMaster/GetPlanChangePage", { params: { bidModeId: this.id } }).then((res) => {
        this.GetLiandoPlanAllDropDown();
        this.tableData = res.data.workList;
        this.zuzhangdata = [res.data.leader];
        this.base = res.data.base;
        this.pageMessage = res.data.pageMessage;
        this.submitButton = res.data.submitButton;
        this.masterId = res.data.masterId;
        this.tablelist = res.data.logData.logs;
        if (res.data.logData == null || res.data.logData === []) {
          this.showtablelist = false;
        } else {
          this.showtablelist = true;
        }
        // this.showPassButton = res.data.auditButton.showPassButton;
        // this.showRefuseButton = res.data.auditButton.showRefuseButton;
        if (res.data.auditButton.showPassButton) {
          this.showPassButton = true;
        } else {
          this.showPassButton = false;
        }
        if (res.data.auditButton.showRefuseButton) {
          this.showRefuseButton = true;
        } else {
          this.showRefuseButton = false;
        }
        if (res.data.auditButton.showRefuseButton == false && res.data.auditButton.showPassButton == false) {
          this.showmark = false;
        } else {
          this.showmark = true;
        }
      });
    },
    handle(val, index) {
      let str = this.options.find((v) => v.userGuid == val);
      this.tableData.forEach((v, i) => {
        if (i == index) {
          v.userGuid = val;
          v.userName = str.userName;
        }
      });
      this.addsave();
    },
    addsave() {
      let arr = this.tableData.map((v) => {
        return {
          id: v.id,
          // workDesc: v.workDesc,
          // endDate: v.endDate,
          userId: v.userGuid,
        };
      });
      this.$http.post("/LiandoBidMaster/SaveBidWorkList04", arr).then((res) => {
        if (!res.status == 200) {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        } else {
          this.$msg.success(res.data.message);
          this.GetPlanChangePage();
        }
      });
    },
    onSubmitto() {
      this.$refs.base.validate((valid) => {
        if (valid) {
          // this.base.id = this.bases.id;
          this.loading = true;
          this.$http.post("/LiandoBidMaster/SavePlanBaseInfo01", this.base).then((res) => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.GetPlanChangePage();
              this.loading = false;
            } else {
              this.loading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        }
      });
    },
    setEmpty() {
      this.options = [];
    },
    remoteMethod(query) {
      console.log(query);
      if (query !== "") {
        this.loading1 = true;
        this.GetSearchUserList21(query);
        this.loading1 = false;
      } else {
        this.options = [];
      }
    },
    GetSearchUserList21(val) {
      this.$http.get("/IdmUserInfo/GetSearchUserList21", { params: { keyWords: val } }).then((res) => {
        this.options = res.data;
        console.log(this.options);
      });
    },
    substr() {
      this.dialogVisiblecause = true;
      this.cause = "";
    },
    onSubmitcause() {
      this.$confirm("确定要提交招标计划吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.cause == "" || this.cause == null) {
          this.$alert("请填写原因", {
            confirmButtonText: "确定",
          });
        } else {
          this.loading = true;
          this.$http
            .post("/LiandoBidMaster/SubmitPlanChange", {
              bidModeId: this.id,
              masterId: "00000000-0000-0000-0000-000000000000",
              cause: this.cause,
            })
            .then((res) => {
              if (res.data.success) {
                this.$message.success(res.data.message);
                this.dialogVisiblecause = false;
                this.loading = false;
                this.GetPlanChangePage();
              } else {
                this.dialogVisiblecause = false;
                this.loading = false;
                this.$alert(res.data.message, {
                  confirmButtonText: "确定",
                });
              }
            });
        }
      });
    },
    omsubmit() {
      this.$confirm("确认要通过审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.remark == "") {
          let obj = {
            bidModeId: this.id,
            masterId: this.masterId,
            remark: this.remark,
            isOk: 0,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_PlanChange_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.GetPlanChangePage();
              // this.GetNewLogList_PlanChange();
            } else {
              this.loading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        } else {
          this.$message({
            message: "请先输入审批意见",
            type: "error",
          });
        }
      });
    },
    bohui() {
      this.$confirm("确认要驳回审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.remark == "") {
          let obj = {
            bidModeId: this.id,
            masterId: this.masterId,
            remark: this.remark,
            isOk: -1,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_PlanChange_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.GetPlanChangePage();
              // this.GetNewLogList_PlanChange();
            } else {
              this.loading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        } else {
          this.$message({
            message: "请先输入审批意见",
            type: "error",
          });
        }
      });
    },
    tosend(val) {
      this.$confirm("确认要发送短信吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (val.length > 0) {
          let phoneList = val.map((item) => item.mobilePhone);
          let todata = {
            phoneList: phoneList,
            bidModeId: this.id,
          };
          this.$http.post("/BidSend/SendSupplierMsg1001", todata).then((res) => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.dialogVisibleto = false;
            } else {
              // this.$message.error(res.data.message);
              this.dialogVisibleto = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        }
      });
    },
    mesto() {
      this.dialogVisibleto = true;
      this.GetSendSupplierContact1001();
    },
    GetSendSupplierContact1001() {
      this.$http.get("/BidSend/GetSendSupplierContact1001", { params: { bidModeId: this.id } }).then((res) => {
        this.todatalist = res.data;
      });
    },
    handleSelectionChange(val, row) {
      this.selectList = val;
    },
    editInfo() {
      this.dialogVisible = true;
      this.loadingSave = false;
      this.form.bidSendDate = this.baseInfo.bidSendDate;
      this.form.qaEndTime = this.baseInfo.qaEndTime;
      this.form.backEndTime = this.baseInfo.backEndTime;
      this.form.bidOpenTime = this.baseInfo.bidOpenTime;
    },
    onEditSave() {
      this.dialogVisible = false;
      this.$emit("onCancle");
      this.GetBidDate1001();
    },
    CheckCanEditToolBar() {
      this.$http.get("/BidCheckCenter/CheckCanEditToolBar40", { params: { bidModeId: this.id } }).then((res) => {
        this.GetBidDate1001();
        if (res.data.success) {
          this.showbut = true;
        } else {
          this.showbut = false;
        }
      });
    },
    GetBidDate1001() {
      this.$http.get("/BidMaster/GetBidDate1001", { params: { bidModeId: this.id } }).then((res) => {
        this.baseInfo = res.data;
        if (this.baseInfo.bidSendDate == "-") {
          this.baseInfo.bidSendDate = "";
        }
        if (this.baseInfo.qaEndTime == "-") {
          this.baseInfo.qaEndTime = "";
        }
        if (this.baseInfo.backEndTime == "-") {
          this.baseInfo.backEndTime = "";
        }
        if (this.baseInfo.bidOpenTime == "-") {
          this.baseInfo.bidOpenTime = "";
        }
        console.log();

        //  let arr = [res.data.bidSendDate, res.data.qaEndTime, res.data.backEndTime, res.data.bidEndDate];
        // this.ulList.forEach((item, index) => {
        //   item.value = arr[index];
        // });
      });
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let obj = {
            bidSendDate: parseTime(this.form.bidSendDate, "yyyy-MM-dd"),
            bidQaEndDate: parseTime(this.form.qaEndTime, "yyyy-MM-dd hh:mm"),
            bidBackDate: parseTime(this.form.backEndTime, "yyyy-MM-dd hh:mm"),
            bidOpenDate: parseTime(this.form.bidOpenTime, "yyyy-MM-dd hh:mm"),
            bidModeId: this.id,
          };
          this.loadingSave = true;
          this.$http.post("/BidDate/ModifyPlanTime", obj).then((res) => {
            this.loadingSave = false;
            if (res.data.success) {
              this.$message({
                message: res.data.message,
                type: "success",
                duration: 1000,
                offset: 50,
              });
              // this.$refs.form.clearValidate();
              this.dialogVisible = false;
              this.GetBidDate1001();
              this.$emit("GetBidDate1001");
            } else {
              // this.$message.error(res.data.message);
              this.$message({
                message: res.data.message,
                type: "error",
                duration: 1000,
                offset: 50,
              });
            }
          });
        }
      });
    },
    same() {
      this.form.bidOpenTime = this.form.backEndTime;
    },
    same2() {
      this.form.backEndTime = this.form.bidOpenTime;
    },
  },
};
</script>

<style lang="scss" scoped>
.pub {
  border-left: 3px solid #21468c;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background: #f4f4f4;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
}
.rolse {
  height: 700px;
  margin-right: 10px;
  padding-bottom: 100px;
  display: flex;

  .left {
    width: 100%;
    height: 100%;
    overflow: auto;
    flex: 2;
    border: 1px solid #ccc;

    .item {
      width: 100%;
      height: 40px;
      display: flex;
      /*实现垂直居中*/
      align-items: center;
      /*实现水平居中*/
      justify-content: center;
      text-align: justify;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      //   font-weight: 550;
      font-size: 14px;
    }
  }
}
::v-deep .el-button--danger {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
::v-deep .el-button--danger:focus,
.el-button--danger:hover {
  color: #fff;
  background-color: #5e83da;
  border-color: #5e83da;
}
.detail {
  // width: 88%;
  //   height: 700px;
  padding: 10px;
  padding-bottom: 90px;
  margin: 0 auto;
  .title {
    height: 40px;
    line-height: 40px;
    background: #293040;
    display: flex;
    justify-content: flex-start;
    .item {
      width: 100px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      //   font-weight: 550;
      font-size: 14px;
    }
  }

  .btn {
    display: flex;
    justify-content: flex-end;
  }
  .ul {
    display: flex;
    background: #dff0d8;

    text-align: center;
    // line-height: 60px;
    color: #58915b;

    .for {
      width: 16.7%;
      border-right: 1px solid #ccc;
      padding: 10px 0;
      div {
        height: 20px;
        line-height: 20px;
        span {
          text-align: center;
        }
      }
    }
  }
  .tits {
    display: flex;
    justify-content: flex-end;
    /*margin-top: 30px;*/
  }
  .content {
    margin-top: 6px;
    .pub {
      border-left: 3px solid #21468c;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      background: #f4f4f4;
      margin-top: 6px;
      font-size: 13px;
      font-weight: 600;
    }
  }
}
::v-deep.el-textarea__inner {
  height: 100px;
}
::v-deep.el-dialog__body {
  padding: 0;
}
.score {
  float: right;
  margin-top: 10px;
}
</style>
