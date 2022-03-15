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
    <div class="pub">招标事项</div>
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
    <div v-if="isShowBtn">
      <div>
        <div class="pub">邀请单位</div>
        <!-- v-if="xuQiuForm.purchaseType != '战采招标'" -->
        <el-card style="margin-bottom: 10px">
          <el-table
            style="margin-top: 10px"
            empty-text="无符合条件的记录"
            stripe
            element-loading-text="请稍候,数据正在加载中..."
            :data="yaoqingList"
          >
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <!-- <el-table-column prop="majorType" label="分类" align="center" width="80"> </el-table-column> -->
            <el-table-column label="供方名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.projectName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否报名" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.contractStartTime, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="主营分类" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.contractEndTime, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="供方状态" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.taxPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="考察合格区域" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.noTaxPrice }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div>
        <div class="pub">报名单位</div>
        <!-- v-if="xuQiuForm.purchaseType != '战采招标'" -->
        <el-card style="margin-bottom: 10px">
          <el-table
            style="margin-top: 10px"
            empty-text="无符合条件的记录"
            stripe
            element-loading-text="请稍候,数据正在加载中..."
            :data="baomingList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <!-- <el-table-column prop="majorType" label="分类" align="center" width="80"> </el-table-column> -->
            <el-table-column label="供方名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.projectName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="主营分类" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.contractEndTime, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="供方状态" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.taxPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="考察合格区域" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.noTaxPrice }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
    <div>
      <div class="box">
        <div class="pub">
          入围单位<span style="color: red; margin-left: 10px">{{
            xuQiuForm.purchaseType != "直接委托" ? "(至少添加三名供应商)" : "(只能添加一名供应商)"
          }}</span>
        </div>
        <el-button v-if="!isShowBtn" type="primary" style="position: absolute; right: 0; top: 4px" size="small" @click="flag3 = true"
          >添加供应商</el-button
        >
      </div>

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
          <!-- <el-input style="width: 100%" placeholder="备注" v-model.trim="scope.row.remark" @blur="saveDesc(scope.row)"> </el-input> -->
          <!-- </template> -->
          <!-- </el-table-column> -->
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <i class="el-icon-delete ml-2" title="删除" @click="deleteRow(scope.row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
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
    <el-input
      v-if="!isShowBtn && showPassButton"
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 6 }"
      placeholder="请输入入围情况说明"
      v-model="comments"
      style="width: 100%"
    ></el-input>
    <div v-if="showPassButton" class="botstyle">
      <div style="color: red">招标计划审批完成后才能提交入围</div>
      <div>
        <el-button size="mini" type="primary" @click="omsubmit(0)">保存</el-button>
        <el-button size="mini" type="primary" @click="omsubmit(1)">提交审批</el-button>
      </div>
    </div>

    <el-dialog :visible.sync="flag3" title="选择供方" width="70%">
      <gongFang @itemClick="onChangeGongFang" :purchaseType="xuQiuForm.purchaseType" />
    </el-dialog>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    gongFang: () => import("@/views/invest/components/storageList"),
  },
  data() {
    return {
      url: "/PurchasePlan/WorkFlowRun",
      bidLevel: [],
      depNames: [],
      purchaseTypes: [],
      rizhiList: [],
      yaoqingList: [],
      baomingList: [],
      ruweiList: [],
      flag3: false,
      planId: "",
      showtitle: "",
      comments: "",
      index: 0,
      isShowBtn: false,
      showPassButton: false,
      showRefuseButton: false,
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
    this.EB_GetPlanChangeList();
    this.GetBidModeSupplierList1001();
  },
  methods: {
    parseTime,
    getdetail() {
      this.$http.get("/PurchasePlan/EB_GetPlanDetailById", { params: { id: this.$route.query.id } }).then((res) => {
        this.xuQiuForm = res.data;
        if (res.data.purchaseType == "询价比选" || res.data.purchaseType == "直接委托") {
          this.isShowBtn = false;
        } else {
          this.isShowBtn = true;
        }
      });
      this.$http.get("/ModeMasterAppServices/GetSupplierInMaster", { params: { bidModeId: this.$route.query.bidModeId } }).then((res) => {
        this.comments = res.data;
        //  console.log(res.data);
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      // this.multipleSelection = val;
    },
    onChangeGongFang(id) {
      let obj = {
        bidModeId: this.$route.query.bidModeId,
        ids: [id],
      };
      this.$http.post("/ModeMasterAppServices/InsterSupplierIn002", obj).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.GetBidModeSupplierInList();
          // this.flag3 = false;
        } else {
          this.$confirm(res.data.message, "提示", {
            confirmButtonText: "确定",
            type: "warning",
          });
        }
      });
    },
    saveDesc(row) {
      if (!row.remark) {
        return false;
      }
      let obj = {
        id: row.id,
        remark: row.remark,
      };
      this.$http.post("/ModeMasterAppServices/SaveRemark", obj).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.GetBidModeSupplierInList();
        } else {
          this.$confirm(res.data.message, "提示", {
            confirmButtonText: "确定",
            type: "warning",
          });
        }
      });
    },
    deleteRow(id) {
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          id,
        };
        this.$http.post("/ModeMasterAppServices/delSupplierIn", obj).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetBidModeSupplierInList();
          } else {
            this.$confirm(res.data.message, "提示", {
              confirmButtonText: "确定",
              type: "warning",
            });
          }
        });
      });
    },

    EB_GetPlanChangeList() {
      this.$http.get("/WflowApproveLogsAppServices/EB_GetSupInList", { params: { bidModeId: this.$route.query.bidModeId } }).then((res) => {
        this.rizhiList = res.data;
      });
    },
    // 邀请单位列表
    GetBidModeSupplierList1001() {
      this.$http
        .get("/ModeMasterAppServices/GetBidModeSupplierList1001", { params: { BaseId: this.$route.query.bidModeId } })
        .then((res) => {
          this.yaoqingList = res.data;
        });
      this.GetBidModeSupplierList1002();
      this.GetBidModeSupplierInList();
    },
    // 报名单位列表
    GetBidModeSupplierList1002() {
      this.$http
        .get("/ModeMasterAppServices/GetBidModeSupplierList1002", { params: { BaseId: this.$route.query.bidModeId } })
        .then((res) => {
          this.baomingList = res.data;
        });
    },
    // 入围单位列表
    GetBidModeSupplierInList() {
      this.$http.get("/ModeMasterAppServices/GetBidModeSupplierInList", { params: { BaseId: this.$route.query.bidModeId } }).then((res) => {
        this.ruweiList = res.data;
      });
    },
    // 是否显示按钮
    CheckShowStartBid1001() {
      this.$http.get("/ModeMasterAppServices/CheckUserSupInRole", { params: { bidModeId: this.$route.query.bidModeId } }).then((res) => {
        this.showPassButton = res.data.success;
      });
    },
    onDownload(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidCommonFileDownLoad099?fileId=" + id);
    },
    omsubmit(i) {
      // if (this.xuQiuForm.purchaseType == "直接委托" || this.xuQiuForm.purchaseType == "询价比选") {
      //   if (!this.comments) {
      //     this.$message.warning("请输入总体说明");
      //     return false;
      //   }
      // }
      if (i == 0) {
        let obj = {
          bidModeId: this.$route.query.bidModeId,
          remark: this.comments,
        };
        this.$http.post("/ModeMasterAppServices/SaveRemark", obj).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
          }
        });
      } else {
        this.$confirm("确认要提交审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj1 = {
            bidModeId: this.$route.query.bidModeId,
            remark: this.comments,
          };
          this.$http.post("/ModeMasterAppServices/SaveRemark", obj1).then((res) => {
            if (!res.data.success) {
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
              return;
            }
          });
          let obj = {
            id: this.$route.query.bidModeId,
          };
          this.$http.post("/ModeMasterAppServices/SubmitSupInAudit", obj).then((res) => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.CheckShowStartBid1001();
              this.EB_GetPlanChangeList();
              this.$router.push({
                path: `/bid/supplierInDetail`,
                query: {
                  id: this.$route.query.id,
                  bidModeId: this.$route.query.bidModeId,
                },
              });
            } else {
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
  },
};
</script>

<style scoped>
.botstyle {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
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
