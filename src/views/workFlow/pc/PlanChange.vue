<!--  -->
<template>
  <el-main>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title"> <i class="el-icon-menu" style="color: #787b84"></i><span class="infonametits">基本信息</span> </template>
        <div>
          <table class="layui-table el-table__body">
            <tbody>
              <tr>
                <td class="right">招标计划名称：</td>
                <td>{{ base.planName }}</td>
                <td class="right">招标计划编号：</td>
                <td>{{ base.planCode }}</td>
              </tr>
              <tr>
                <td class="right">招标专业：</td>
                <td>
                  {{ base.bidCateName }}
                </td>
                <td class="right">招标方式：</td>
                <td>{{ base.purchaseType }}</td>
              </tr>
              <tr>
                <td class="right">说明：</td>
                <td colspan="3">
                  {{ base.desc }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-collapse-item>
      <!-- <el-collapse-item name="2">
        <template slot="title"> <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">标段信息</span> </template>
        <div>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tabledata">
            <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column prop="projectName" label="项目或期区名称"> </el-table-column>
            <el-table-column prop="planName" label="招标计划名称"> </el-table-column>
            <el-table-column prop="sectionName" label="标段名称" width="200"></el-table-column>
            <el-table-column prop="sectionOrder" label="排序序号" width="120" align="center"></el-table-column>
          </el-table>
        </div>
      </el-collapse-item> -->
      <el-collapse-item name="3">
        <template slot="title"> <i class="el-icon-menu" style="color: #787b84"></i><span class="infonametits">招标小组</span> </template>
        <div>
          <!-- <el-tabs type="card" v-model="activeName" style="margin-top:10px"> -->
          <!-- <el-tab-pane label="招标组长" name="招标组长"> -->
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="zuzhangdata">
            <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
            <el-table-column label="标段" prop="sectionName" align="center"> </el-table-column>
            <el-table-column label="姓名" prop="userName" align="center"></el-table-column>
            <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
            <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
          </el-table>
          <!-- </el-tab-pane>
            <el-tab-pane label="商务组成员" name="商务组成员">
              <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="shangwudata">
                <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                <el-table-column label="标段" prop="sectionName" align="center"> </el-table-column>
                <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
                <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
                <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="技术组成员" name="技术组成员">
              <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="jishudata">
                <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                <el-table-column label="标段" prop="sectionName" align="center"> </el-table-column>
                <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
                <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
                <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs> -->
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
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
            <el-table-column prop="bidWorkType" label="项目工程" width="300" align="center"> </el-table-column>
            <el-table-column prop="workDesc" label="工作结果"> </el-table-column>
            <!-- <el-table-column prop="endDate" label="完成时限" width="200" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.endDate, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="责任人" width="180" prop="userName" align="center"> </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
      <!-- <el-collapse-item name="5">
        <template slot="title"> <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">相关附件</span> </template>
        <div>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="files">
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="附件名称" prop="fileName"> </el-table-column>
            <el-table-column label="附件大小" prop="showFileSize" align="center" width="120"> </el-table-column>
            <el-table-column label="附件类型" prop="fileExtName" align="center" width="120"> </el-table-column>
            <el-table-column label="上传日期" prop="uploadDate" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.uploadDate, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <i class="el-icon-download" @click="downLoad(scope.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item> -->
      <!-- <el-collapse-item name="6">
        <template slot="title"> <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">会签人员</span> </template>
        <div>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="huiqiandata">
            <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
            <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
            <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
          </el-table>
        </div>
      </el-collapse-item> -->
    </el-collapse>
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
    <div style="margin-top: 10px; margin-bottom: 100px">
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
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {},
  props: ["id"],
  data() {
    return {
      activeNames: ["1", "2", "3", "4", "5", "6"],
      base: {},
      loding: false,
      remark: "",
      showRefuseButton: false,
      showPassButton: false,
      showmark: false,
      tablelist: [],
      loading: false,
      tableData: [],
      tabledata: [],
      biaoduanvalue: "",
      options: [],
      activeName: "招标组长",
      zuzhangdata: [{}],
      shangwudata: [],
      jishudata: [],
      tableData2: [],
      files: [],
      huiqiandata: [
        {
          userGuid: "",
        },
      ],
    };
  },
  computed: {
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
  },
  watch: {},
  created() {},
  mounted() {
    this.GetPlanChangePage();
    this.GetNewLogList_PlanChange();
  },
  methods: {
    parseTime,
    async GetPlanChangePage() {
      this.$http
        .get("/LiandoBidMaster/GetPlanChangePage", { params: { bidModeId: this.bidModeId, masterId: this.masterId } })
        .then((res) => {
          this.tableData = res.data.workList;
          this.zuzhangdata = [res.data.leader];
          this.base = res.data.base;
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
    GetNewLogList_PlanChange() {
      this.$http
        .get("/WorkFlowStart/GetNewLogList_PlanChange", { params: { bidModeId: this.bidModeId, masterId: this.masterId } })
        .then((res) => {
          this.tablelist = res.data.logs;
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
            bidModeId: this.bidModeId,
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
              this.GetNewLogList_PlanChange();
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
            bidModeId: this.bidModeId,
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
              this.GetNewLogList_PlanChange();
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
</style>
<style>
.el-table .table-info-row {
  background-color: #ffffcc;
}
</style>
