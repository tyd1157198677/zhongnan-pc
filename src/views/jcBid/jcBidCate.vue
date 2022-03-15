<template>
  <el-main
    ><div>
      <el-card>
        <div class="mt-2">
          <el-table
            style="margin-top: 10px"
            height="500"
            empty-text="无符合条件的记录"
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column label="目录" align="left">
              <template slot-scope="scope">
                <span>{{ scope.row.mulu }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.miaoshu }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.leixing }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="planName" label="招标计划名称" min-width="250" show-overflow-tooltip fixed>
              <template slot-scope="scope">
                <el-link type="primary" style="color:#409eff;text-decoration: none" @click="onAddBidPlan1(scope.row)">{{
                  scope.row.planName
                }}</el-link>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </el-card>

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
          id: 1,
          mulu: "外檐工程",
          miaoshu: "",
          leixing: "",
          children: [
            {
              id: 11,
              mulu: "保温材料供货（如甲供）",
              miaoshu: "单次预算达到30万以上由集团总公司集中采购",
              leixing: "集中采购",
            },
            {
              id: 12,
              mulu: "保温材料供货（如甲供）",
              miaoshu: "单次预算达到30万以上由集团总公司集中采购",
              leixing: "集中采购",
            },
            {
              id: 13,
              mulu: "保温材料供货（如甲供）",
              miaoshu: "单次预算达到30万以上由集团总公司集中采购",
              leixing: "集中采购",
            },
            {
              id: 14,
              mulu: "保温材料供货（如甲供）",
              miaoshu: "单次预算达到30万以上由集团总公司集中采购",
              leixing: "集中采购",
            },
            {
              id: 15,
              mulu: "保温材料供货（如甲供）",
              miaoshu: "单次预算达到30万以上由集团总公司集中采购",
              leixing: "集中采购",
            },
          ],
        },
        {
          id: 2,
          mulu: "精装修类",
          miaoshu: "",
          leixing: "",
          children: [
            {
              id: 21,
              mulu: "保温材料供货（如甲供）",
              miaoshu: "单次预算达到30万以上由集团总公司集中采购",
              leixing: "集中采购",
            },
            {
              id: 22,
              mulu: "保温材料供货（如甲供）",
              miaoshu: "单次预算达到30万以上由集团总公司集中采购",
              leixing: "集中采购",
            },
            {
              id: 23,
              mulu: "保温材料供货（如甲供）",
              miaoshu: "单次预算达到30万以上由集团总公司集中采购",
              leixing: "集中采购",
            },
            {
              id: 24,
              mulu: "保温材料供货（如甲供）",
              miaoshu: "单次预算达到30万以上由集团总公司集中采购",
              leixing: "集中采购",
            },
            {
              id: 25,
              mulu: "保温材料供货（如甲供）",
              miaoshu: "单次预算达到30万以上由集团总公司集中采购",
              leixing: "集中采购",
            },
          ],
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
    del() {},
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
