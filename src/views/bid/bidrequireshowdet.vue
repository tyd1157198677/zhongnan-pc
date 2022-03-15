<template>
  <el-main>
    <chuantou></chuantou>
    <el-row style="margin-bottom: 10px">
      <div class="box">
        <div class="pub">招标计划名称-{{ xuQiuForm.planName }}</div>
        <!-- <el-button type="primary" size="mini" @click="daYin" style="position: absolute; right: 0; top: 4px">打印</el-button> -->
        <!-- <el-button type="primary" size="small" @click="faqi">发起招标</el-button> -->
        <el-button type="primary" style="position: absolute; right: 0; top: 4px" size="small" v-if="isShowBtn" @click="faqi"
          >发起招标</el-button
        >
      </div>
    </el-row>

    <div ref="print">
      <el-card style="margin-bottom: 10px">
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right" style="width: 130px">所属组织:</td>
              <td colspan="3">{{ xuQiuForm.depNameShow }}</td>
              <td class="right" style="width: 150px">招标专业:</td>
              <td colspan="3">{{ xuQiuForm.bidCateName }}</td>
              <td class="right" style="width: 170px">招标层级:</td>
              <td colspan="3">{{ xuQiuForm.bidLevel }}</td>
              <td class="right" style="width: 130px">招标方式:</td>
              <td colspan="3">{{ xuQiuForm.purchaseType }}</td>
            </tr>
            <tr v-if="xuQiuForm.purchaseType != '战采招标'">
              <td class="right">计划定标日期:</td>
              <td colspan="3">
                {{ parseTime(xuQiuForm.bidEndDate, "yyyy-MM-dd") }}
              </td>
              <td class="right">含税总限价（元）:</td>
              <td colspan="3">{{ xuQiuForm.taxPrice }}</td>
              <td class="right">不含税总限价（元）:</td>
              <td colspan="3">{{ xuQiuForm.noTaxPrice }}</td>
              <td class="right">经办人:</td>
              <td colspan="3">{{ xuQiuForm.editUserName }}</td>
            </tr>
            <tr v-else>
              <td class="right">计划定标日期:</td>
              <td colspan="3">
                {{ parseTime(xuQiuForm.bidEndDate, "yyyy-MM-dd") }}
              </td>
              <td class="right">经办人:</td>
              <td colspan="11">{{ xuQiuForm.editUserName }}</td>
            </tr>
            <tr>
              <td class="right">相关说明:</td>
              <td colspan="15">
                {{ xuQiuForm.requireDesc }}
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>
      <el-card style="margin-bottom: 10px" v-if="xuQiuForm.purchaseType != '战采招标'">
        <div v-if="xuQiuForm.bidCateName == '保洁服务' || xuQiuForm.bidCateName == '绿化养护' || xuQiuForm.bidCateName == '保安服务'">
          <el-table empty-text="无符合条件的记录" stripe element-loading-text="请稍候,数据正在加载中..." :data="xuQiuForm.detailList">
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <!-- <el-table-column prop="majorType" label="分类" align="center" width="80"> </el-table-column> -->
            <el-table-column label="所属组织" align="center" min-width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.projectName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="每日最低出勤人数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personMin }}</span>
              </template>
            </el-table-column>
            <el-table-column label="合同起始时间" align="center" width="130px">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.contractStartTime, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="合同截止时间" align="center" width="130px">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.contractEndTime, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="招标时长" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.timeLength }}</span>
              </template>
            </el-table-column>
            <el-table-column label="采购月度含税总限价（元）" align="center" width="130px">
              <template slot-scope="scope">
                <span>{{ scope.row.monthTaxPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="采购月度不含税总限价（元）" align="center" width="130px">
              <template slot-scope="scope">
                <span>{{ scope.row.monthNoTaxPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="采购含税总限价（元）" align="center" width="130px">
              <template slot-scope="scope">
                <span>{{ scope.row.taxPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="采购不含税总限价（元）" align="center" width="130">
              <template slot-scope="scope">
                <span>{{ scope.row.noTaxPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="人均不含税单价" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.unitNoTaxPrice }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <el-table
            style="margin-top: 10px"
            empty-text="无符合条件的记录"
            stripe
            element-loading-text="请稍候,数据正在加载中..."
            :data="xuQiuForm.detailList"
          >
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <!-- <el-table-column prop="majorType" label="分类" align="center" width="80"> </el-table-column> -->
            <el-table-column label="所属组织" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.projectName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="合同起始时间" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.contractStartTime, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="合同截止时间" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.contractEndTime, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="含税总限价（元）" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.taxPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="不含税总限价（元）" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.noTaxPrice }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <el-card style="margin-bottom: 10px" v-if="fileslist.length > 0">
        <el-table
          style="margin-top: 10px"
          empty-text="无符合条件的记录"
          stripe
          element-loading-text="请稍候,数据正在加载中..."
          :data="fileslist"
        >
          <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
          <el-table-column label="文件名称" prop="fileName" align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.fileName + scope.row.fileExtName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件大小" prop="showFileSize" align="center"> </el-table-column>
          <el-table-column label="上传日期" prop="creationTime" align="center">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上传人" prop="creatorUserName" align="center"> </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <processtring :type="'招标计划'" ref="processtring"></processtring>
      <!-- <public-shenpi :id="$route.query.id" :urlSubmit="url"></public-shenpi> -->
      <el-card v-if="rizhiList.length > 0">
        <el-row>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="rizhiList">
            <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
            <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
            <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>

            <el-table-column prop="dealTime" width="180" label="处理时间" align="center">
              <template slot-scope="scope"
                ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column>
            <el-table-column prop="status" width="80" label="结果" align="center"> </el-table-column>
            <el-table-column label="意见/备注" prop="comments" align="center" show-overflow-tooltip> </el-table-column>
          </el-table>
        </el-row>
      </el-card>
      <el-card v-if="showPassButton || showRefuseButton">
        <el-form>
          <el-form-item label="审批意见：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 4 }"
              placeholder="请输入审批意见"
              v-model="comments"
              style="width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="showPassButton" size="mini" type="primary" style="float: right; margin-top: 10px" @click="omsubmit(1)"
              >通过</el-button
            >
            <el-button
              v-if="showRefuseButton"
              size="mini"
              type="primary"
              style="float: right; margin-top: 10px; margin-right: 10px"
              @click="omsubmit(0)"
              >驳回</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    chuantou: () => import("@/components/chuantou.vue"),
    processtring: () => import("@/components/processTring.vue"),
  },
  data() {
    return {
      url: "/PurchasePlan/WorkFlowRun",
      bidLevel: [],
      depNames: [],
      purchaseTypes: [],
      rizhiList: [],
      categoryVisible: false,
      planId: "",
      showtitle: "",
      comments: "",
      index: 0,
      isShowBtn: false,
      showPassButton: false,
      showRefuseButton: false,
      fileslist: [],
      xuQiuForm: {
        id: "",
        depName: "",
        planName: "",
        bidLevel: "",
        purchaseType: "",
        bidEndDate: "",
        bidCateId: "",
        bidCateName: "",
        requireDesc: "",
        isSubmit: true,
        taxPrice: 0,
        noTaxPrice: 0,
        detailList: [],
      },
    };
  },
  computed: {},
  created: function () {},
  mounted() {
    this.planId = this.$route.query.id;
    this.todoId = this.$route.query.todoId;
    this.CheckShowStartBid1001();
    this.getdetail();
    this.getList2();
    this.EB_GetPlanChangeList();
  },
  methods: {
    daYin() {
      this.$print(this.$refs.print);
    },
    parseTime,
    getdetail() {
      this.$http.get("/PurchasePlan/EB_GetPlanDetailById", { params: { id: this.$route.query.id } }).then((res) => {
        this.xuQiuForm = res.data;
      });
    },
    getList2() {
      this.$http.get("/PurchasePlan/GetPlanFileList", { params: { planId: this.$route.query.id } }).then((res) => {
        this.fileslist = res.data;
      });
    },
    EB_GetPlanChangeList() {
      this.$http.get("/WflowApproveLogsAppServices/EB_GetPlanChangeList", { params: { masterId: this.$route.query.id } }).then((res) => {
        this.rizhiList = res.data;
      });
    },
    CheckShowStartBid1001() {
      this.$http.get("/PurchasePlan/CheckShowStartBid1001", { params: { planId: this.$route.query.id } }).then((res) => {
        this.isShowBtn = res.data.success;
      });
      this.$http.post("/PurchasePlan/CheckShowAuditButton", { masterId: this.$route.query.id }).then((res) => {
        this.showPassButton = res.data.showPassButton;
        this.showRefuseButton = res.data.showRefuseButton;
      });
    },
    onDownload(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidCommonFileDownLoad099?fileId=" + id);
    },
    omsubmit(i) {
      if (i == 0 && !this.comments) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
        return false;
      }
      let str = i == 0 ? "驳回" : "通过";
      this.$confirm("确认要" + str + "审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          audit: i,
          masterId: this.$route.query.id,
          comments: this.comments,
        };
        this.$http.post("/PurchasePlan/WorkFlowRun", obj).then((res) => {
          if (res.data.result.success) {
            this.$msg.success(res.data.result.message);
            this.CheckShowStartBid1001();
            this.EB_GetPlanChangeList();
            this.$refs.processtring.GetPlanRequireList();
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    faqi() {
      this.$confirm("您确认要发起招标吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = { id: this.$route.query.id };
        this.$http.post("/PurchasePlan/StartProcess", obj).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.isShowBtn = false;
            this.CheckShowStartBid1001();
            window.open("#/bid/processDetailjianyi?id=" + res.data.returnValue1);
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.box {
  position: relative;
}

.pub {
  border-left: 3px solid #ea5514;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: #cccbcb;
  font-size: 13px;
  font-weight: 600;
}
</style>
