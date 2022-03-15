<template>
  <el-main
    ><div>
      <el-card>
        <el-form label-position="right" :model="formSearch" size="small">
          <el-row :gutter="12">
            <el-col :span="3">
              <!-- <el-form-item label="项目或期区名称："> -->
              <el-input v-model="formSearch.projectName" placeholder="项目名称" clearable></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="招标计划名称："> -->
              <el-input v-model="formSearch.planName" placeholder="集采目录" clearable></el-input>
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
              <el-input v-model="formSearch.bidCateName" placeholder="经办人" clearable></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="需求部门："> -->
              <el-select v-model="formSearch.depName" placeholder="状态" @change="selectChange">
                <el-option label="状态" value=""> </el-option>
                <el-option v-for="item in depNames" :key="item.value" :label="item.text" :value="item.value"> </el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
            </el-col>
            <el-col :span="9">
              <div class="text-right">
                <el-button type="primary" size="small" @click="onAddBidPlan">新增</el-button>
                <el-button type="primary" size="small" @click="onAddBidPlan1">生成招采计划</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div class="mt-2">
          <el-table
            style="margin-top: 10px"
            height="500"
            empty-text="无符合条件的记录"
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
            <el-table-column label="层级" min-width="250px" fixed>
              <template slot-scope="scope">
                <span>{{ scope.row.projectName }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="planName" label="招标计划名称" min-width="250" show-overflow-tooltip fixed>
              <template slot-scope="scope">
                <el-link type="primary" style="color:#409eff;text-decoration: none" @click="onAddBidPlan1(scope.row)">{{
                  scope.row.planName
                }}</el-link>
              </template>
            </el-table-column> -->
            <el-table-column label="集采目录" width="120" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.purchaseType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="经办人" width="120" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.bidCateName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="经办日期" width="120" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.depName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="计划定标日期" width="150" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.bidEndDate, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="120" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.bidUserName }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="招标进度" width="120" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.planStatus }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" align="center" width="100" fixed="right">
              <template slot-scope="scope">
                <div>
                  <i style="margin-right: 10px" title="删除" class="el-icon-delete" @click="del(scope.row.id)"></i>
                  <i title="提交" class="el-icon-check" @click="edit(scope.row)"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageAChange" />
        </div>
      </el-card>
      <el-dialog width="80%" :title="showtitle" :visible.sync="dialogVisible">
        <el-form ref="xuQiu" :model="xuQiuForm" :rules="rules">
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="层级" prop="bidLevel">
                <el-select style="width: 100%" v-model.trim="xuQiuForm.bidLevel">
                  <el-option v-for="item in bidLevels" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域" prop="bidLevel">
                <el-select style="width: 100%" v-model.trim="xuQiuForm.bidLevel">
                  <el-option v-for="item in bidLevels" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="集采目录" prop="bidCateName">
                <el-input
                  style="width: 100%"
                  v-model="xuQiuForm.bidCateName"
                  placeholder="请选择集采目录"
                  @focus="categoryVisible = true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划定标日期" prop="bidEndDate">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  v-model.trim="xuQiuForm.bidEndDate"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="备注" prop="requireDesc">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model.trim="xuQiuForm.requireDesc"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="right" :gutter="24">
            <el-form-item>
              <el-button size="small" @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" size="small" @click="save">提交</el-button>
              <el-button type="primary" size="small" @click="saveto">保存</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="categoryVisible" title="选择集采目录">
        <categoryTree @itemClick="onChangeCategory" />
      </el-dialog>
    </div>
  </el-main>
</template>
<script>
import { parseTime } from "@/util";
import bus from "@/util/bus";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
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
      activeName: "1",
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
          projectName: "集团",
          purchaseType: "卫浴",
          bidCateName: "张志阳",
          depName: "2021-08-01",
          bidUserName: "审批中",
          bidEndDate: "2021-10-19",
        },
        {
          projectName: "集团",
          purchaseType: "卫浴",
          bidCateName: "张志阳",
          depName: "2021-08-01",
          bidUserName: "审批中",
          bidEndDate: "2021-10-19",
        },
        {
          projectName: "集团",
          purchaseType: "卫浴",
          bidCateName: "张志阳",
          depName: "2021-08-01",
          bidUserName: "审批中",
          bidEndDate: "2021-10-19",
        },
        {
          projectName: "集团",
          purchaseType: "卫浴",
          bidCateName: "张志阳",
          depName: "2021-08-01",
          bidUserName: "审批中",
          bidEndDate: "2021-10-19",
        },
        {
          projectName: "集团",
          purchaseType: "卫浴",
          bidCateName: "张志阳",
          depName: "2021-08-01",
          bidUserName: "审批中",
          bidEndDate: "2021-10-19",
        },
        {
          projectName: "集团",
          purchaseType: "卫浴",
          bidCateName: "张志阳",
          depName: "2021-08-01",
          bidUserName: "审批中",
          bidEndDate: "2021-10-19",
        },
        {
          projectName: "集团",
          purchaseType: "卫浴",
          bidCateName: "张志阳",
          depName: "2021-08-01",
          bidUserName: "审批中",
          bidEndDate: "2021-10-19",
        },
        {
          projectName: "集团",
          purchaseType: "卫浴",
          bidCateName: "张志阳",
          depName: "2021-08-01",
          bidUserName: "审批中",
          bidEndDate: "2021-10-19",
        },
        {
          projectName: "集团",
          purchaseType: "卫浴",
          bidCateName: "张志阳",
          depName: "2021-08-01",
          bidUserName: "审批中",
          bidEndDate: "2021-10-19",
        },
        {
          projectName: "集团",
          purchaseType: "卫浴",
          bidCateName: "张志阳",
          depName: "2021-08-01",
          bidUserName: "审批中",
          bidEndDate: "2021-10-19",
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
    this.$http.post("/RoleMenu/GetUserRoleButtonList", ["BIDREQUIRE001"], {}).then((res) => {
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
    save() {},
    saveto() {},
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
::v-deep .el-main {
  overflow: hidden;
}
::v-deep .el-row {
  margin-right: 0px;
  margin-left: 0px;
}
</style>
