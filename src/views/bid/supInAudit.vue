<template>
  <el-main>
    <el-row style="margin-bottom: 10px">
      <div class="box">
        <div class="pub">招标计划名称-{{ xuQiuForm.planName }}</div>
      </div>
    </el-row>
    <el-card style="margin-bottom: 10px">
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td class="right" style="width: 130px">需求部门:</td>
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
    <div class="pub">招标事项</div>
    <el-card style="margin-bottom: 10px" v-if="xuQiuForm.purchaseType != '战采招标'">
      <div v-if="xuQiuForm.bidCateName == '保洁服务' || xuQiuForm.bidCateName == '绿化养护' || xuQiuForm.bidCateName == '保安服务'">
        <el-table empty-text="无符合条件的记录" stripe element-loading-text="请稍候,数据正在加载中..." :data="xuQiuForm.detailList">
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <!-- <el-table-column prop="majorType" label="分类" align="center" width="80"> </el-table-column> -->
          <el-table-column label="项目名称" align="center" min-width="150px">
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
          <el-table-column label="项目名称" align="center">
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
    <div>
      <div class="pub">入围单位</div>
      <el-card style="margin-bottom: 10px">
        <el-table
          key="tan1"
          style="margin-top: 10px"
          empty-text="无符合条件的记录"
          stripe
          element-loading-text="请稍候,数据正在加载中..."
          :data="ruweiList"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column label="供方名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.supplierName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="主营分类" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.supCateNames }}</span>
            </template>
          </el-table-column>
          <el-table-column label="供方状态" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.cooperStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="考察合格区域" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.invesArea }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="备注" align="center" width="200"> -->
          <!-- <template slot-scope="scope"> -->
          <!-- <span>{{ scope.row.remark }}</span> -->
          <!-- </template> -->
          <!-- </el-table-column> -->
        </el-table>
      </el-card>
    </div>
    <div v-if="remark">
      <div class="box">
        <div class="pub">入围情况说明</div>
      </div>
      <el-card style="margin-bottom: 10px">
        <div>
          <strong style="margin-right: 10px"> </strong>
          <span style="color: red; font-size: 15px" v-html="remark"></span>
        </div>
      </el-card>
    </div>
    <processtring :type="'入围'" ref="processtring"></processtring>
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
    <!-- <el-card> -->
    <el-card v-if="showPassButton || showRefuseButton">
      <el-form>
        <el-form-item label="审批意见：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="请输入审批意见"
            v-model="comments"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <!--  -->
          <el-button size="mini" v-if="showPassButton" type="primary" style="float: right; margin-top: 10px" @click="omsubmit(1)"
            >通过</el-button
          >
          <el-button
            size="mini"
            v-if="showRefuseButton"
            type="primary"
            style="float: right; margin-top: 10px; margin-right: 10px"
            @click="omsubmit(0)"
            >驳回</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    publicShenpi: () => import("@/components/publicShenpi.vue"),
    processtring: () => import("@/components/processTring.vue"),
  },
  data() {
    return {
      url: "/PurchasePlan/WorkFlowRun",
      rizhiList: [],
      ruweiList: [],
      comments: "",
      remark: "",
      showPassButton: false,
      showRefuseButton: false,
      xuQiuForm: {
        id: "",
        depNameShow: "",
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
  mounted() {
    this.planId = this.$route.query.id;
    this.todoId = this.$route.query.todoId;
    this.CheckShowStartBid1001();
    this.getdetail();
    this.EB_GetPlanChangeList();
    this.GetBidModeSupplierInList();
  },
  methods: {
    parseTime,
    getdetail() {
      this.$http
        .get("/ZhiWeiPurchaseAppServices/GetPurchasePlanById", { params: { BidModeId: this.$route.query.bidModeId } })
        .then((res) => {
          this.xuQiuForm = res.data;
        });
      this.$http.get("/ModeMasterAppServices/GetSupplierInMaster", { params: { bidModeId: this.$route.query.bidModeId } }).then((res) => {
        this.remark = res.data;
        //  console.log(res.data);
      });
    },
    EB_GetPlanChangeList() {
      this.$http.get("/WflowApproveLogsAppServices/EB_GetSupInList", { params: { masterId: this.$route.query.masterId } }).then((res) => {
        this.rizhiList = res.data;
      });
    },
    CheckShowStartBid1001() {
      this.$http.post("/ModeMasterAppServices/CheckShowAuditButton_SupIn", { masterId: this.$route.query.masterId }).then((res) => {
        this.showPassButton = res.data.showPassButton;
        this.showRefuseButton = res.data.showRefuseButton;
      });
    },
    // 入围单位列表
    GetBidModeSupplierInList() {
      this.$http.get("/ModeMasterAppServices/GetBidModeSupplierInList", { params: { BaseId: this.$route.query.bidModeId } }).then((res) => {
        this.ruweiList = res.data;
      });
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
          masterId: this.$route.query.masterId,
          comments: this.comments,
        };
        this.$http.post("/ModeMasterAppServices/WorkFlowRun_SupIn", obj).then((res) => {
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
