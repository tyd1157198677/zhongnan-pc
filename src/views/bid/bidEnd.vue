<template>
  <el-main>
    <el-container>
      <!--左边分类-->
      <!-- <project-tree @itemClick="onChangeProject" @slideNave="slideNave" /> -->
      <el-card class="box-card" shadow="never" :body-style="{ padding: '15px' }">
        <el-form label-position="right" label-width="150px" :model="formSearch" size="small">
          <el-row :gutter="12">
            <el-col :span="3">
              <!-- <el-form-item label="项目或期区名称："> -->
              <el-input v-model="projectName" placeholder="所属组织" clearable></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="招标计划名称："> -->
              <el-input v-model="planName" placeholder="招标计划名称" clearable></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="中标单位："> -->
              <el-input v-model="supplierName" placeholder="中标单位" clearable></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="招标方式："> -->
              <el-select v-model="purchaseType" @change="selectChange">
                <!-- <el-option label="全部" value=""></el-option> -->
                <el-option v-for="item in purchaseTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="招标经办人："> -->
              <el-input v-model="bidUserName" placeholder="招标经办人" clearable></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <!-- <el-col :span="8">
                <el-form-item label="需求提出人：">
                  <el-input v-model="editUserName" placeholder="请输入需求提出人"></el-input>
                </el-form-item>
              </el-col> -->
            <!-- <el-col :offset="5" :span="3" class="text-right"> </el-col> -->
            <el-col :span="9">
              <el-button type="primary" size="small" style="float: right" @click="onsubmit()">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="text-right" style="margin-top: 10px"></div>
        <div class="mt-2">
          <el-table
            empty-text="无符合条件的记录"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
            v-loading="loading"
          >
            <el-table-column type="index" width="50" fixed label="序号" align="center"> </el-table-column>
            <el-table-column prop="projectName" fixed label="所属组织" min-width="250">
              <template slot-scope="scope">
                <span>{{ scope.row.projectName }}</span></template
              >
            </el-table-column>
            <el-table-column prop="planName" fixed label="招标计划名称" min-width="250" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  style="color: #409eff; text-decoration: none"
                  @click="jumpDetail(scope.row.bidModeId, scope.row.winMasterId, scope.row.purchaseType)"
                  >{{ scope.row.planName }}</el-link
                >
              </template>
            </el-table-column>
            <el-table-column prop="purchaseType" label="招标方式" align="center"> </el-table-column>
            <el-table-column prop="bidUserName" label="招标经办人" align="center" width="100"></el-table-column>
            <el-table-column prop="bidEndDate" label="定标日期" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.bidEndDate, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="supplierName" label="中标单位" align="left" width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="winPrice" label="含税中标金额" align="center" width="120"></el-table-column>
            <!-- <el-table-column prop="completedStatus" label="工期状态" align="center" width="150"> </el-table-column> -->
          </el-table>
          <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
        </div>
      </el-card>
    </el-container>
  </el-main>
</template>
<script>
import ProjectTree from "./components/ProjectTree";
import { parseTime } from "@/util";
export default {
  components: {
    ProjectTree,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      dropDownGroup: {},
      dialogVisible: false,
      pageSize: 15,
      formSearch: {},
      orgTypeGuid: "",
      projectName: "",
      planName: "",
      depName: "",
      supplierName: "",
      purchaseType: "",
      purchaseTypes: [],
      bidUserName: "",
      editUserName: "",
      activeName: "",
      siginUpList: [],
      tableData: [],
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      loading: false,
    };
  },
  created() {
    this.$http.post("/UserSession/BidWinSetAuth1001").then((res) => {});
    let baseId = this.$route.params.baseId;
    if (baseId) {
      this.formSearch.BaseId = baseId;
    }
  },
  mounted() {
    this.GetPurchaseType01();
  },
  methods: {
    parseTime,
    GetPurchaseType01() {
      this.$http.get("/BidMaster/GetPurchaseType01").then((res) => {
        this.purchaseTypes = res.data;
        this.purchaseType = res.data.length > 0 ? res.data[0].value : "";
        this.GetPlanList();
      });
    },
    GetPlanList() {
      let obj = {
        ProjectId: this.orgTypeGuid,
        ProjectName: this.projectName,
        PlanName: this.planName,
        SupplierName: this.supplierName,
        PurchaseType: this.purchaseType,
        BidUserName: this.bidUserName,
        EditUserName: this.editUserName,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
      };
      this.loading = true;
      this.$http
        .get("/BidWin/GetBidWinList", { params: obj })
        .then((res) => {
          // if (res.data.result.items) {
          //   res.data.result.items.forEach(item => {
          //     item.confirmDate = this.timeFormatSeconds(item.confirmDate);
          //   });
          // }
          this.tableData = res.data.result.items;
          this.page.total = res.data.result.totalCount;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    selectChange() {
      this.page.index = 1;
      this.GetPlanList();
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.GetPlanList();
    },
    onsubmit() {
      this.page.index = 1;
      this.GetPlanList();
    },
    showSignUpList(baseId) {
      this.dialogVisible = true;
      this.getBidNoticeSignUpList(baseId);
    },
    getBidNoticeSignUpList(baseId) {
      this.$api.BidNotice.GetBidNoticeSignUpList(baseId).then((res) => {
        this.siginUpList = res;
        if (this.siginUpList && this.siginUpList.length > 0) {
          this.activeName = this.siginUpList[0].sectionId;
        }
      });
    },
    slideNave(data) {
      this.open = data;
      console.log(this.open);
    },
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
    /**
     * 选择项目
     */
    // onChangeProject(project) {
    //   this.orgTypeGuid = project.id;
    //   this.page.index = 1;
    //   this.GetPlanList();
    // },
    // 选择区域树
    selectedType(s) {
      // 判断是否为分期节点
      let that = this;
      let judgePart = false;
      if (!that.sysTreeCateType[0].children.length) {
        judgePart = false;
      } else {
        // 判断一二三级节点
        const childStatus = that.sysTreeCateType[0].children.some((m) => {
          return m.id === s.parentId;
        });
        judgePart = !(s.id === that.sysTreeCateType[0].id || s.parentId === that.sysTreeCateType[0].id || childStatus);
      }
      that.orgTypeNode = s;
      that.orgTypeGuid = s.id;
      that.orgTypeNode.judgePart = judgePart;
      // console.log(s.orgType);
      if (that.orgTypeGuid && s.orgType === "分期") {
        this.page.index = 1;
        that.GetPlanList();
      }
    },
    /**
     * 查看详情
     */
    jumpDetail(bidModeId, winMasterId, type) {
      if (type == "邀请招标") {
        // this.$router.push({ name: "dingBiaoInfo" });
        window.open(`#/workFlow/pc/${"bidWin"}?bidModeId=${bidModeId}&masterId=${winMasterId}`);
        // window.open(`#/bid/noticeDetail/${id}`);
      }
      if (type == "直接委托" || type == "询价比选" || type == "竞争性谈判" || type == "零星采购") {
        this.$router.push({ path: "/bid/processDetailjianyi?id=" + bidModeId + "&isShowheader=" + true });
        // window.open("#/bid/processDetailjianyi?id=" + bidModeId);
      }
      // if (type == "直接委托") {
      //   window.open(`#/bid/dingbiaoZw?bidModeId=${bidModeId}`);
      // }
      // if (type == "竞争性谈判") {
      //   window.open(`#/bid/dingbiaoLx?bidModeId=${bidModeId}`);
      // }
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

.dropdown-item {
  padding: 0.25rem 1rem !important;
}
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
</style>
