<template>
  <el-container class="detail">
    <el-main>
      <div class="pub1">{{ !projectName || !xuQiuForm.planName ? "--" : projectName + xuQiuForm.planName }}</div>
      <el-card class="box-card">
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right" style="width: 160px">所属组织:</td>
              <td colspan="3">{{ xuQiuForm.depName }}</td>
              <!-- <td class="right" style="width: 150px">招标计划名称:</td>
              <td colspan="3">{{ xuQiuForm.planName }}</td> -->
              <td class="right" style="width: 170px">招标层级:</td>
              <td colspan="3">{{ xuQiuForm.bidLevel }}</td>
              <td class="right" style="width: 130px">招标方式:</td>
              <td colspan="3">{{ xuQiuForm.purchaseType }}</td>
              <td class="right" style="width: 150px">计划定标日期:</td>
              <td colspan="3">{{ parseTime(xuQiuForm.bidEndDate, "yyyy-MM-dd") }}</td>
            </tr>
            <tr>
              <td class="right">含税总限价（元）:</td>
              <td colspan="3">{{ xuQiuForm.taxPrice }}</td>
              <td class="right">不含税总限价（元）:</td>
              <td colspan="3">{{ xuQiuForm.noTaxPrice }}</td>
              <td class="right">经办人:</td>
              <td colspan="7">{{ xuQiuForm.editUserName }}</td>
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
      <div class="pub1">招标事项</div>
      <el-card class="box-card">
        <el-table
          v-if="xuQiuForm.bidCateName == '保洁服务' || xuQiuForm.bidCateName == '绿化养护' || xuQiuForm.bidCateName == '保安服务'"
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
          <el-table-column label="每日最低出勤人数" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.personMin }}</span>
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
          <el-table-column label="招标时长" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.timeLength }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购月度含税总限价（元）" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.monthTaxPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购月度不含税总限价（元）" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.monthNoTaxPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购含税总限价（元）" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.taxPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购不含税总限价（元）" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.noTaxPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="人均不含税单价" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.unitNoTaxPrice }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-else
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
      </el-card>
      <yibanzhaobiaoEdit v-if="showdetailOrEdit" @CheckBidWinSubmit1001="CheckEditButton"></yibanzhaobiaoEdit>
      <yibanzhaobiaoDetail v-else></yibanzhaobiaoDetail>
    </el-main>
  </el-container>
</template>

<script>
import { parseTime } from "@/util";
import wangEditor from "wangeditor";
import $ from "jquery";
export default {
  components: {
    choseUser: () => import("@/components/choseUser"),
    gongFang: () => import("@/views/invest/components/storageList"),
    rizhi: () => import("@/components/rizhi.vue"),
    yibanzhaobiaoEdit: () => import("./components/yibanzhaobiaoEdit"),
    yibanzhaobiaoDetail: () => import("./components/yibanzhaobiaoDetail"),
  },
  data() {
    return {
      projectName: "",
      texts: "",
      xuQiuForm: {},
      reasons: [],
      supplierOption: [],
      loading: false,
      showdetailOrEdit: false,
    };
  },
  created() {
    this.bidModeId = this.$route.query.bidModeId;
  },
  mounted() {
    this.CheckEditButton();
    this.getdetail();
  },
  methods: {
    parseTime,
    getdetail() {
      this.$http
        .get("/ZhiWeiPurchaseAppServices/GetPurchasePlanById", { params: { BidModeId: this.$route.query.bidModeId } })
        .then((res) => {
          this.xuQiuForm = res.data;
          this.projectName = this.xuQiuForm.detailList.length > 0 ? this.xuQiuForm.detailList[0].projectName : "";
        });
    },
    CheckEditButton() {
      this.$http.get("/ModeMasterAppServices/CheckEditButton", { params: { planId: this.$route.query.id } }).then((res) => {
        this.showdetailOrEdit = res.data.success;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
}
.detail {
  padding: 10px;
  margin: 0 auto;
}
.bacDis {
  background: #d9d6d6;
  display: flex;
  justify-content: space-between;
  div {
    line-height: 40px;
    padding-left: 10px;
    font-size: 15px;
    font-weight: 600;
  }
}
::v-deep .el-form-item__label {
  height: 20px;
  line-height: 20px;
}
.pub1 {
  border-left: 3px solid #ea5514;
  height: 40px;
  line-height: 40px;
  background: #d9d6d6;
  padding-left: 10px;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
}
::v-deep .el-collapse-item__header {
  border-left: 3px solid #ea5514;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: #d9d6d6;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
  position: relative;
  .pub {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 30px;
  }
}
</style>
