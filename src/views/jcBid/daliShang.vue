<template>
  <div>
      <el-card>
          <el-form label-position="right" :model="formSearch" size="small">
            <el-row :gutter="12">
              <el-col :span="3">
                <!-- <el-form-item label="项目或期区名称："> -->
                <el-input v-model="formSearch.projectName" placeholder="专业名称" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="招标计划名称："> -->
                <el-input v-model="formSearch.planName" placeholder="品牌" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <!-- <el-col :span="3">
              <el-select v-model="formSearch.purchaseType" placeholder="招标方式" @change="selectChange">
                <el-option label="招标方式" value=""> </el-option>
                <el-option v-for="item in purchaseTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
              </el-select>
            </el-col> -->
              <el-col :span="3">
                <!-- <el-form-item label="招标专业名称："> -->
                <el-input v-model="formSearch.bidCateName" placeholder="品牌主体名称" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="需求部门："> -->
               <el-input v-model="formSearch.bidCateName" placeholder="代理商名称" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="12">
                <div class="text-right">
                  <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
                  <el-button type="primary" size="small" @click="add">二维码分享</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <div class="mt-2">
            <el-table
              style="margin-top:10px"
              height="500"
              empty-text="无符合条件的记录"
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData"
            >
              <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
              <el-table-column label="所属专业" align="center" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.zhuanye }}</span>
                </template>
              </el-table-column>
              <el-table-column label="品牌名称" align="center" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.pinpai }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="planName" label="招标计划名称" min-width="250" show-overflow-tooltip fixed>
              <template slot-scope="scope">
                <el-link type="primary" style="color:#409eff;text-decoration: none" @click="onAddBidPlan1(scope.row)">{{
                  scope.row.planName
                }}</el-link>
              </template>
            </el-table-column> -->
              <el-table-column label="品牌主体名称" min-width="250" align="left">
                <template slot-scope="scope">
                  <span>{{ scope.row.pinpaizhuti }}</span>
                </template>
              </el-table-column>
              <el-table-column label="代理商名称" min-width="250" align="left">
                <template slot-scope="scope">
                  <span>{{ scope.row.dailishang }}</span>
                </template>
              </el-table-column>
              <el-table-column label="负责城市" align="center" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.chengshi }}</span>
                </template>
              </el-table-column>
              <el-table-column label="联系人姓名" align="center" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.xingming }}</span>
                </template>
              </el-table-column>
              <el-table-column label="电话" align="center" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.dianhua }}</span>
                </template>
              </el-table-column>
              <el-table-column label="职务" align="center" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.zhiwu }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageAChange" />
          </div>
        </el-card>
  </div>
</template>
<script>
import { parseTime } from "@/util";
import bus from "@/util/bus";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
    daliShang: () => import("./daliShang.vue"),
  },
  data() {
    return {
      categoryVisible: false,
      purchaseTypes: [],
      depNames: [],
      bidLevels: [],
      dropDownGroup: {},
      isShowFaQibtn: false,
      dialogVisiblename: false,
      addPlanLoading: false,
      detailVisible: false,
      dialogVisible: false,
      activeName: "品牌主体",
      supplierSignUpList: [],
      formSearch: {
        myAuth: "",
        ProjectId: "",
        projectName: "",
        planName: "",
        monthSpan: "",
        purchaseType: "",
        depName: "",
        bidCateName: "",
        bidCateId: "",
        bidLevel: "",
      },
      rules: {
        projectName: [{ required: true, message: "项目或期区名称不能为空", trigger: "change" }],
        bidLevel: [{ required: true, message: "层级不能为空", trigger: "blur" }],
        bidEndDate: [{ required: true, message: "日期不能为空", trigger: "blur" }],
        depName: [{ required: true, message: "需求部门不能为空", trigger: "blur" }],
        planName: [{ required: true, message: "招标计划名称不能为空", trigger: "blur" }],
        bidCateName: [{ required: true, message: "招标专业不能为空", trigger: "change" }],
        purchaseType: [{ required: true, message: "招标方式不能为空", trigger: "blur" }],
        bidUserName: [{ required: true, message: "经办人不能为空", trigger: "blur" }],
        planMoney: [{ required: true, message: "合约规划金额不能为空", trigger: "blur" }],
        jzSquire: [{ required: true, message: "建筑面积不能为空", trigger: "blur" }],
      },
      showtitle: "",
      xuQiuForm: {
        bidEndDate: "",
        purchaseType: "",
        id: "",
        projectId: "",
        projectName: "",
        bidCateName: "",
        bidCateId: "",
        depName: "",
        bidLevel: "",
        planMoney: "0",
        jzSquire: "0",
        planName: "",
        requireDesc: "",
        bidUserName: "",
      },
      tableData: [
        {
          zhuanye: "卫浴",
          pinpai: "科勒",
          pinpaizhuti: "科勒（中国）有限公司",
          chengshi: "广州",
          xingming: "唐德华",
          dianhua: "18900009898",
          zhiwu: "总经理",
          dailishang:"广州科勒贸易有限公司",
        },
        {
          zhuanye: "卫浴",
          pinpai: "科勒",
          pinpaizhuti: "科勒（中国）有限公司",
          chengshi: "广州",
          xingming: "唐德华",
          dianhua: "18900009898",
          zhiwu: "总经理",
          dailishang:"广州科勒贸易有限公司",
        },
        {
          zhuanye: "卫浴",
          pinpai: "科勒",
          pinpaizhuti: "科勒（中国）有限公司",
          chengshi: "广州",
          xingming: "唐德华",
          dianhua: "18900009898",
          zhiwu: "总经理",
          dailishang:"广州科勒贸易有限公司",
        },
        {
          zhuanye: "卫浴",
          pinpai: "科勒",
          pinpaizhuti: "科勒（中国）有限公司",
          chengshi: "广州",
          xingming: "唐德华",
          dianhua: "18900009898",
          zhiwu: "总经理",
          dailishang:"广州科勒贸易有限公司",
        },
        {
          zhuanye: "卫浴",
          pinpai: "科勒",
          pinpaizhuti: "科勒（中国）有限公司",
          chengshi: "广州",
          xingming: "唐德华",
          dianhua: "18900009898",
          zhiwu: "总经理",
          dailishang:"广州科勒贸易有限公司",
        },
        {
          zhuanye: "卫浴",
          pinpai: "科勒",
          pinpaizhuti: "科勒（中国）有限公司",
          chengshi: "广州",
          xingming: "唐德华",
          dianhua: "18900009898",
          zhiwu: "总经理",
          dailishang:"广州科勒贸易有限公司",
        },
        {
          zhuanye: "卫浴",
          pinpai: "科勒",
          pinpaizhuti: "科勒（中国）有限公司",
          chengshi: "广州",
          xingming: "唐德华",
          dianhua: "18900009898",
          zhiwu: "总经理",
          dailishang:"广州科勒贸易有限公司",
        },
        {
          zhuanye: "卫浴",
          pinpai: "科勒",
          pinpaizhuti: "科勒（中国）有限公司",
          chengshi: "广州",
          xingming: "唐德华",
          dianhua: "18900009898",
          zhiwu: "总经理",
          dailishang:"广州科勒贸易有限公司",
        },
        {
          zhuanye: "卫浴",
          pinpai: "科勒",
          pinpaizhuti: "科勒（中国）有限公司",
          chengshi: "广州",
          xingming: "唐德华",
          dianhua: "18900009898",
          zhiwu: "总经理",
          dailishang:"广州科勒贸易有限公司",
        },
        {
          zhuanye: "卫浴",
          pinpai: "科勒",
          pinpaizhuti: "科勒（中国）有限公司",
          chengshi: "广州",
          xingming: "唐德华",
          dianhua: "18900009898",
          zhiwu: "总经理",
          dailishang:"广州科勒贸易有限公司",
        },
      ],
      plans: [],
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      userGuid: "",
    };
  },
  created() {
    this.userName = localStorage.getItem("userName");
    this.userGuid = localStorage.getItem("userGuid");
    this.userGuid = this.userGuid.toUpperCase();
    this.$http.post("/RoleMenu/GetUserRoleButtonList", ["BIDREQUIRE001"], {}).then(res => {
      this.codeList = res.data;
      this.isShowFaQibtn = res.data.indexOf("BIDREQUIRE001") > -1 ? true : false;
    });
    bus.$emit("showNav");
  },
  mounted() {},
  methods: {
    parseTime,
    onAddBidPlan() {
      this.dialogVisible = true;
    },
    edit(row) {
      //   this.dialogVisible = true;
      //   this.xuQiuForm.bidUserName = row.bidUserName;
      //   this.xuQiuForm.bidUserGuid = row.bidUserGuid;
      //   this.xuQiuForm.planName = row.planName;
      //   this.xuQiuForm.projectName = row.projectName;
      //   this.xuQiuForm.bidCateId = row.bidCateId;
      //   this.xuQiuForm.bidCateName = row.bidCateName;
      //   this.xuQiuForm.depName = row.depName;
      //   this.xuQiuForm.bidLevel = row.bidLevel;
      //   this.xuQiuForm.purchaseType = row.purchaseType;
      //   this.xuQiuForm.id = row.id;
      //   this.xuQiuForm.projectId = row.projectId;
      //   this.xuQiuForm.planMoney = row.planMoney;
      //   this.xuQiuForm.jzSquire = row.jzSquire;
      //   this.xuQiuForm.requireDesc = row.requireDesc;
      //   this.xuQiuForm.bidEndDate = row.bidEndDate;
      this.$confirm("提交后将不能修改，确认要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {});
    },
    onAddBidPlan1() {},
    onSubmit() {},
    selectChange() {},
    pageAChange() {},
    del() {},
    save() {},
    saveto() {},
    add() {},
    onChangeCategory(category) {
      this.xuQiuForm.bidCateId = category.id;
      this.xuQiuForm.bidCateName = category.cateName;
      this.categoryVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
}
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
::v-deep .el-row {
  margin-right: 0px !important;
  margin-left: 0px !important;
}
</style>
<style scoped>
