<template>
  <el-main>
    <el-card style="margin-bottom: 60px">
      <!-- <div slot="header" class="clearfix flex between middle">
        <el-page-header @back="$router.back(-1)" :content="navBarName"> </el-page-header> -->
      <div>
        <span
          ><strong>{{ showmessage }}</strong></span
        >
        <i class="el-icon-s-operation" style="float: right; margin-left: 10px; font-size: 28px" title="点击查看招标过程" @click="goto"></i>
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
      <div v-for="(item, index) in daYiFileList" :key="index" style="margin-top: 40px">
        <el-row>
          <el-col :span="4"
            ><span style="width: 200px"><strong>标题：</strong>{{ item.content }}</span></el-col
          >
          <el-col :span="6"
            ><span style="width: 200px"><strong>答复人：</strong>{{ item.toUserName }}</span></el-col
          >
          <!-- <el-col :span="6">
            <span style="width:200px"><strong>备注信息：</strong>{{ item.remark }}</span></el-col
          > -->
          <el-col :span="2">
            <span style="width: 200px"><strong>状态：</strong>{{ item.auditStatus }}</span></el-col
          >
          <el-col :span="6"><el-button v-if="sho"></el-button></el-col>
        </el-row>
        <!-- <el-row>
                <el-col :span="4"
                  ><span style="width:200px"><strong>标题：</strong>{{ item.content }}</span></el-col
                >
                <el-col :span="4"
                  ><span style="width:200px"><strong>相关人员：</strong>{{ item.toUserName }}</span></el-col
                >
                <el-col :span="4">
                  <span style="width:200px"><strong>上传人：</strong>{{ item.userName }}</span></el-col
                >
                <el-col :span="5">
                  <span style="width:200px"><strong>上传时间：</strong>{{ parseTime(item.creationTime, "yyyy-MM-dd hh:mm") }}</span></el-col
                >
                <el-col :span="3"><i class="el-icon-download" @click="onDonwLoad(item.id)"></i></el-col>
                <el-col :span="4"
                  ><el-button
                    style="float:right;margin-bottom:10px"
                    type="primary"
                    size="mini"
                    v-if="showdayibutton"
                    v-loading="loading2"
                    @click="tijiao2()"
                    >提交答疑</el-button
                  ></el-col
                >
              </el-row> -->

        <el-table empty-text="暂无数据" :key="index" stripe border element-loading-text="请稍候,数据正在加载中..." :data="item.fileList">
          <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
          <el-table-column prop="fileName" min-width="150" label="文件名称" align="center"> </el-table-column>
          <el-table-column prop="fileExtName" label="文件类型" align="center"> </el-table-column>
          <el-table-column prop="showFileSize" width="150" label="文件大小" align="center"> </el-table-column>
          <el-table-column label="上传时间" align="center">
            <template slot-scope="scope">
              <span scope.row>
                {{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <i class="el-icon-download" @click="onDonwLoad(scope.row.fileId)"></i>
              <!-- <i class="el-icon-delete" @click="deletedayi(scope.row.fileId)"></i> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- </div> -->

      <div>
        <el-form v-if="showmark" v-loading="loading" :rules="rulesrizhi">
          <el-form-item label="审批意见：" prop="ideaRemark" style="margin-top: 20px">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 4 }"
              v-if="showhold"
              :placeholder="valuehold1"
              v-model="ideaRemark"
              style="width: 100%"
            ></el-input>
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 4 }"
              v-if="showholder"
              :placeholder="valuehold2"
              v-model="ideaRemark"
              style="width: 100%"
            ></el-input>
            <div style="color: red; margin: 10px 0">如对某条答疑有意见，请填写审批意见</div>
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
      <div style="margin-top: 20px">
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
      msg: "",
      showholder: false,
      showhold: true,
      valuehold1: "",
      valuehold2: "",
      showmessage: "",
      isCanEdit: false,
      radio: true,
      showRefuseButton: false,
      showPassButton: false,
      showmark: false,
      tabledata: [],
      tablelist: [],
      daYiFileList: [],
      FileName: "",
      remark: "",
      ideaRemark: "",
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      tableData: "",
      loading: false,
      sho: false,
      uploadData: {},
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rulesrizhi: {
        // ideaRemark: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
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
    // this.CheckCanEditPlan01();
    // this.getList();
    // this.getlist();
    this.getbidModeId();
    this.GetInsideQusList();
    this.GetInsideQustionAuditPage();
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
    goto() {
      window.open("#/bid/processDetail?id=" + this.bidModeId);
      console.log(this.bidModeId);
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
    getbidModeId() {
      this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then((res) => {
        console.log(this.bidModeId);
        this.planId = res.data.planId;
        console.log(this.planId);
        this.getlist();
      });
    },
    getlist() {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then((res) => {
        this.form = res.data;
      });
    },
    // GetInsideQustionAuditPage() {
    //   this.$http
    //     .get("/LiandoBidMaster/GetInsideQustionAuditPage", { params: { bidModeId: this.bidModeId, master: this.masterId } })
    //     .then(res => {
    //       this.daYiFileList = res.data;
    //     });
    // },
    // GetQustionList() {
    //   this.$http.get("/LiandoBidMaster/GetQustionList?bidModeId=" + this.id).then(res => {
    //     this.daYiFileList = res.data;
    //   });
    // },
    GetInsideQustionAuditPage() {
      this.$http
        .get("/LiandoBidMaster/GetInsideQustionAuditPage", { params: { bidModeId: this.bidModeId, masterId: this.masterId } })
        .then((res) => {
          this.daYiFileList = res.data.fileList;
          // this.ideaRemark = res.data.ideaRemark;
          if (res.data.ideaRemark != "" || res.data.ideaRemark != null) {
            this.showhold = true;
            this.showholder = false;
            this.valuehold1 = res.data.ideaRemark;
          } else {
            this.showhold = false;
            this.showholder = true;
            this.valuehold2 = "请输入审批意见";
          }
          console.log(res.data);
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
    download(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
    },

    onDonwLoad(fileId) {
      // window.open(`${process.env.VUE_APP_API_URL}/${file.fileUrl}`, "_blank");
      // window.location.href = process.env.VUE_APP_API_URL + url;
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidCommonFileDownLoad099?fileId=" + fileId);
    },
    GetInsideQusList() {
      this.$http.get("/WflowApproveLogsAppServices/GetInsideQusList", { params: { MasterId: this.masterId } }).then((res) => {
        this.tablelist = res.data;
      });
    },
    omsubmit() {
      this.$confirm("确认要通过审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.ideaRemark == "") {
          let obj = {
            bidModeId: this.bidModeId,
            masterId: this.masterId,
            remark: this.ideaRemark,
            isOk: 0,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_InsideQus_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.getbidModeId();
              this.GetInsideQustionAuditPage();
              this.GetInsideQusList();
              console.log(res.data.status);
            } else {
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
        if (!this.ideaRemark == "") {
          let obj = {
            bidModeId: this.bidModeId,
            masterId: this.masterId,
            remark: this.ideaRemark,
            isOk: -1,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_InsideQus_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.getbidModeId();
              this.GetInsideQustionAuditPage();
              this.GetInsideQusList();
            } else {
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
