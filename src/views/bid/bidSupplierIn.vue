<template>
  <el-main>
    <el-card style="margin-bottom: 60px">
      <!-- <div slot="header" class="clearfix flex between middle">
        <el-page-header @back="$router.back(-1)" :content="navBarName"> </el-page-header> -->
      <div>
        <span
          ><strong>{{ showmessage }}</strong></span
        >
        <el-button
          size="small"
          type="primary"
          v-if="jumpButton"
          style="float: right; margin-left: 10px; margin-bottom: 10px"
          @click="linkTo"
          >编辑入围信息</el-button
        >
        <!-- <i class="el-icon-s-operation" style="float:right;margin-left:10px;font-size: 28px;" title="点击查看招标过程" @click="goto"></i> -->
        <!-- <i class="el-icon-s-home" style="float:right;margin-left:10px" title="点击进入首页" @click="gohome"></i> -->
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
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
              <td>{{ form.requireDesc }}</td>
              <td class="right">招标计划编号：</td>
              <td>{{ form.planCode }}</td>
            </tr>
            <tr>
              <td class="right">招标专业：</td>
              <td>
                {{ form.bidCateName }}
              </td>
              <td class="right">招标方式：</td>
              <td>{{ form.purchaseType }}</td>
            </tr>
            <tr>
              <td class="right">说明：</td>
              <td colspan="3">
                {{ form.desc }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-top: 20px">
        <table class="layui-table el-table__body mt-3">
          <tbody>
            <tr>
              <td style="width: 20%" class="right">投标保证金（元）：</td>
              <td style="width: 30%">
                {{ this.formru.deposit }}
              </td>
              <td style="width: 20%" class="right">收款银行：</td>
              <td style="width: 30%">
                {{ this.formru.bankName }}
              </td>
            </tr>
            <tr>
              <td style="width: 20%" class="right">收款账号：</td>
              <td style="width: 30%">
                {{ this.formru.bankAccount }}
              </td>
              <td style="width: 20%" class="right">分行信息：</td>
              <td style="width: 30%">
                {{ this.formru.bankAddress }}
              </td>
            </tr>

            <tr>
              <td style="width: 20%" class="right">收取单位：</td>
              <td style="width: 30%">
                {{ this.formru.level }}
              </td>
              <td style="width: 20%" class="right">招标专业：</td>
              <td style="width: 30%">
                {{ this.formru.cateName }}
              </td>
            </tr>
            <tr>
              <td style="width: 20%" class="right">入围标准：</td>
              <td style="width: 30%" colspan="3">
                {{ this.formru.desc }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-top: 10px">
        <el-row>
          <el-table empty-text="暂无数据" border element-loading-text="请稍候,数据正在加载中..." :data="tableData" v-loading="loading">
            <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
            <el-table-column label="供应商名称" min-width="250" prop="comFullName" align="left" fixed> </el-table-column>
            <el-table-column label="资格预审" width="150" align="center">
              <template slot-scope="scope">
                <el-link
                  v-if="scope.row.haveQua"
                  type="primary"
                  style="color: #409eff; text-decoration: none"
                  @click="jumpSuppInfo1(scope.row)"
                >
                  {{ scope.row.quaMasterName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="考察" width="150" align="center">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  style="color: #409eff; text-decoration: none"
                  @click="jumpSuppInfo2(scope.row)"
                  v-if="scope.row.haveInves"
                >
                  {{ scope.row.invesMasterName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="背调" width="150" align="center">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  style="color: #409eff; text-decoration: none"
                  @click="jumpSuppInfo3(scope.row)"
                  v-if="scope.row.haveBack"
                >
                  {{ scope.row.backMasterName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="status" align="center" width="150" fixed></el-table-column>
            <el-table-column label="登录名" prop="supplierLoginId" align="center" width="120" fixed></el-table-column>
            <el-table-column label="投标联系人" align="center">
              <el-table-column label="姓名" width="100" align="center" prop="userName1"> </el-table-column>
              <el-table-column label="手机" width="120" align="center" prop="mobilePhone1"> </el-table-column>
              <el-table-column label="邮箱" width="180" align="center" prop="email1"> </el-table-column>
            </el-table-column>
          </el-table>
        </el-row>
      </div>

      <div style="margin-top: 10px">
        <el-form v-if="showmark" v-loading="loading" :rules="rulesrizhi">
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
      <div style="margin-top: 10px">
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
    </el-card>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  inject: ["reload"],
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      form: [],
      formru: [],
      msg: "",
      showmessage: "",
      jumpButton: false,
      isCanEdit: false,
      radio: true,
      tabledata: [],
      tableData: [],
      showPassButton: false,
      showRefuseButton: false,
      showmark: false,
      tablelist: [],
      FileName: "",
      remark: "",
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      loading: false,
      // loading1: false,
      uploadData: {},
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rulesrizhi: {
        // remark: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
      },
      rules: {},
    };
  },
  computed: {
    // bidModeId() {
    //   return this.$route.params.bidModeId;
    // },
    navBarName() {
      const barName = "";
      return barName;
    },
    bidModeId() {
      if (this.$route.query.bidModeId) {
        return this.$route.query.bidModeId;
      } else {
        return this.id;
      }
    },
    masterId() {
      return this.$route.query.masterId;
    },
    planId() {
      return this.$route.query.planId;
    },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
    // baseId() {
    //   return this.$route.params.baseId;
    // },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.todoId = this.$route.query.todoId;
    // this.todoId = sessionStorage.getItem("todoId");
    // this.bidModeId = sessionStorage.getItem("bidModeId");
  },
  mounted() {
    this.GetOnePlanById();
    this.GetMasterByPlanId01();
    this.GetSupplierByMasterId();
    this.GetNewLogList_SupplierIn();
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
  },
  methods: {
    parseTime,
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
    jumpSuppInfo1(row) {
      // window.open("/#/quality/qualitylistEdit?id=" + row.quaId + "&type=2");
      let path = "";
      switch (row.quaMasterType) {
        case "资格预审_总包":
          path = "zongbao";
          break;
        case "资格预审_电力":
          path = "dianli";
          break;
        case "资格预审_精装":
          path = "jingzhuang";
          break;
        case "资格预审_门窗":
          path = "menchuang";
          break;
        case "资格预审_幕墙":
          path = "muqiang";
          break;
        case "资格预审_市政":
          path = "shizheng";
          break;
        case "资格预审_消防":
          path = "xiaofang";
          break;
        case "资格预审_桩基":
          path = "zhuangji";
          break;
        default:
          // 没有类型，可能是以前的旧数据，暂时跳转到总包页
          path = "zongbao";
          break;
      }
      window.open(`/#/quality/${path}/details?id=` + row.quaId + "&type=2");
      // this.$router.push({
      //   path: `/quality/${path}/details`,
      //   query: {
      //     id: row.id,
      //     type: 2, // 1:编辑，2：详情
      //   },
      // });
    },
    jumpSuppInfo2(row) {
      // window.open("/#/invest/showInvest?id=" + row.invesId + "&supGuid=" + row.supplierId);
      // let path = this.getPath(row.type);
      let path = "";
      switch (row.invesMasterType) {
        case "供方考察_总包":
          path = "zongbao";
          break;
        case "供方考察_电力":
          path = "dianli";
          break;
        case "供方考察_精装":
          path = "jingzhuang";
          break;
        case "供方考察_门窗":
          path = "menchuang";
          break;
        case "供方考察_幕墙":
          path = "muqiang";
          break;
        case "供方考察_市政":
          path = "shizheng";
          break;
        case "供方考察_消防":
          path = "xiaofang";
          break;
        case "供方考察_桩基":
          path = "zhuangji";
          break;
        case "项目招标考察_材料设备":
          path = "fileShebei";
          break;
        case "项目招标考察_监理":
          path = "jianli";
          break;
        case "项目招标考察_景观":
          path = "jingguan";
          break;
        case "项目招标考察_设计":
          path = "sheji";
          break;
        default:
          // 没有类型，可能是以前的旧数据，暂时跳转到总包页
          path = "zongbao";
          break;
      }
      window.open(`/#/invest/${path}/details?id=` + row.invesId + "&supGuid=" + row.supplierId + "&type=2");
      // this.$router.push({
      //   path: `/invest/${path}/details`,
      //   query: {
      //     id: row.id,
      //     supGuid: row.supGuid,
      //     type: 2, // 1:编辑，2：详情
      //   },
      // });
    },
    jumpSuppInfo3(row) {
      // window.open("/#/supplier/backGroundEdit?id=" + row.invesId + "&name=" + row.comMainName + "&type=2");
      if (row.backbidLevel == "项目") {
        window.open(`/#/supplier/backGroundEdit1?id=` + row.backId + "&name=" + row.comMainName + "&type=2");
      } else {
        window.open(`/#/supplier/backgroundJiTuanEdit1?id=` + row.backId + "&name=" + row.comMainName + "&type=2");
      }
      //  this.$router.push({
      //   path: row.backbidLevel == "项目" ? "/supplier/backGroundEdit" : "/supplier/backgroundJiTuanEdit",
      //   query: { id: row.id, type: 2, name: row.comMainName },
      // });
    },
    linkTo() {
      let to = "/bid/bidMode7/EditStep1";
      // if (baseId) {
      //   to += `/${baseId}`;
      // }
      this.$router.push({
        path: to,
        query: {
          id: this.planId,
        },
      });
    },
    goto() {
      window.open("#/bid/processDetail?id=" + this.bidModeId);
      console.log(this.bidModeId);
    },
    // getbidModeId() {
    //   this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then(res => {
    //     console.log(this.bidModeId);
    //     this.planId = res.data.planId;
    //     console.log(this.planId);
    //     this.getlist();
    //   });
    // },
    GetOnePlanById() {
      this.$http.get("/LiandoSupplierIn/GetOnePlanById", { params: { planId: this.planId } }).then((res) => {
        this.form = res.data.result;
      });
    },
    GetMasterByPlanId01() {
      this.$http.get("/LiandoSupplierIn/GetMasterByPlanId01", { params: { planId: this.planId } }).then((res) => {
        this.formru = res.data;
      });
    },
    GetSupplierByMasterId() {
      this.$http.get("/LiandoSupplierIn/GetSupplierByMasterId", { params: { masterId: this.masterId } }).then((res) => {
        this.tableData = res.data.supplierList;
        this.jumpButton = res.data.jumpButton;
        if (res.data.showPassButton) {
          this.showPassButton = true;
        } else {
          this.showPassButton = false;
        }
        if (res.data.showRefuseButton) {
          this.showRefuseButton = true;
        } else {
          this.showRefuseButton = false;
        }
        if (res.data.showRefuseButton == false && res.data.showPassButton == false) {
          this.showmark = false;
        } else {
          this.showmark = true;
        }
      });
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then((res) => {
        this.showmessage = res.data;
      });
    },
    GetNewLogList_SupplierIn() {
      this.$http.get("/WorkFlowStart/GetNewLogList_SupplierIn", { params: { planId: this.planId } }).then((res) => {
        this.tablelist = res.data.logs;
      });
    },
    omsubmit() {
      if (!this.remark) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
      } else {
        this.$confirm("确认要通过审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            planId: this.planId,
            bidModeId: this.bidModeId,
            masterId: this.masterId,
            remark: this.remark,
            isOk: 0,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_SupplierIn_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.GetSupplierByMasterId();
              this.GetNewLogList_SupplierIn();
            } else {
              this.loading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    bohui() {
      if (!this.remark) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
      } else {
        this.$confirm("确认要驳回审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            planId: this.planId,
            bidModeId: this.bidModeId,
            masterId: this.masterId,
            remark: this.remark,
            isOk: -1,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_SupplierIn_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.GetSupplierByMasterId();
              this.GetNewLogList_SupplierIn();
            } else {
              this.loading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    gohome() {
      this.$router.push({
        path: "/index",
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
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 20px;
  float: right;
  cursor: pointer;
}
</style>
