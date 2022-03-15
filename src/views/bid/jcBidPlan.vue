<template>
  <el-main>
    <div class="userwidth" style="padding-bottom: 90px">
      <el-container>
        <!--左边分类-->
        <!-- <project-tree @itemClick="onChangeProject" @slideNave="slideNave" /> -->
        <el-card class="box-card" shadow="never" :body-style="{ padding: '15px 15px 0 15px' }">
          <el-form label-position="right" label-width="150px" :model="formSearch" size="small">
            <el-row :gutter="12">
              <el-col :span="3">
                <!-- <el-form-item label="项目或期区名称："> -->
                <el-select v-model="formSearch.purchaseType" placeholder="所属区域" @change="selectChange">
                  <el-option label="所属区域" value=""> </el-option>
                  <el-option v-for="item in purchaseTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="招标计划名称："> -->
                <el-input v-model="formSearch.planName" placeholder="项目名称" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="招标专业名称："> -->
                <el-input v-model="formSearch.bidCateName" placeholder="招标专业" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="需求部门："> -->
                <el-input v-model="formSearch.bidCateName" placeholder="经办人" clearable></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="选择权限："> -->
                <el-select v-model="formSearch.myAuth" placeholder="状态" @change="selectChange">
                  <el-option label="状态" value=""></el-option>
                  <el-option label="未处理" value="true"></el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
              </el-col>
              <el-col :span="6">
                <div class="text-right">
                  <el-button type="primary" size="small" @click="onAddBidPlan">新增集采需求</el-button>
                  <el-button type="primary" size="small" @click="shengcheng">生成招采计划</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>

          <el-row class="mb-1 mt-1"> </el-row>
          <div class="mt-2">
            <el-table
              key="s1"
              height="500"
              empty-text="无符合条件的记录"
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
              <el-table-column label="所属区域" width="150" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.quyu }}</span>
                </template>
              </el-table-column>
              <el-table-column label="项目名称" min-width="250px">
                <template slot-scope="scope">
                  <span>{{ scope.row.xiangmu }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="planName" label="招标计划名称" min-width="250" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-link type="primary" style="color:#409eff;text-decoration: none" @click="onAddBidPlan1(scope.row)">{{
                    scope.row.planName
                  }}</el-link>
                </template>
              </el-table-column> -->
              <el-table-column label="招标专业" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.zhuanye }}</span>
                </template>
              </el-table-column>
              <el-table-column label="经办人" width="100" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.jingban }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="需求部门" width="120" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.depName }}</span>
                </template>
              </el-table-column> -->
              <el-table-column label="经办日期" width="150" align="center">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.jingbanri, "yyyy-MM-dd") }}</span>
                </template>
              </el-table-column>
              <el-table-column label="需求日期" width="150" align="center">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.xuqiu, "yyyy-MM-dd") }}</span>
                </template>
              </el-table-column>
              <el-table-column label="处理状态" width="100" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.zhuangtai }}</span>
                </template>
              </el-table-column>
              <el-table-column label="招标进度" width="100" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.jindu }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="100" fixed="right">
                <template slot-scope="scope">
                  <div>
                    <i style="margin-right: 10px" title="删除" class="el-icon-delete" @click="del(scope.row.id)"></i>
                    <i title="提交" class="el-icon-edit" @click="edit(scope.row)"></i>
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
                <el-form-item label="区域" prop="projectName">
                  <el-select style="width: 100%" v-model.trim="xuQiuForm.quyu">
                    <!-- <el-option label="上海区域" value=""></el-option> -->
                    <el-option v-for="item in depNames" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目" prop="projectName">
                  <el-select style="width: 100%" v-model.trim="xuQiuForm.xiangmu">
                    <!-- <el-option label="中南世纪城" value=""></el-option> -->
                    <el-option v-for="item in depNames" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="招标专业" prop="bidCateName">
                  <el-input
                    style="width: 100%"
                    v-model="xuQiuForm.bidCateName"
                    placeholder="请选择招标专业"
                    @focus="categoryVisible = true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目需求日期" prop="bidEndDate">
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
              <el-col :span="6">
                <el-form-item label="招标计划名称" prop="planName">
                  <el-input style="width: 100%" placeholder="请输入招标计划名称" v-model.trim="xuQiuForm.planName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="含税合约总金额" prop="planMoney">
                  <el-input style="width: 100%" type="number" v-model.trim="xuQiuForm.planMoney" :min="1" :precision="2"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="不含税合约总金额" prop="planMoney1">
                  <el-input style="width: 100%" type="number" v-model.trim="xuQiuForm.planMoney2" :min="1" :precision="2"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="需求部门" prop="depName">
                  <el-select style="width: 100%" v-model.trim="xuQiuForm.depName">
                    <el-option v-for="item in depNames" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="requireDesc">
                  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model.trim="xuQiuForm.requireDesc"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="right" :gutter="24">
              <el-form-item>
                <el-button size="small" @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" size="small" @click="save">保存</el-button>
                <el-button type="primary" size="small" @click="saveto">提交</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-dialog>
        <el-dialog width="60%" title="选择经办人员" :visible.sync="dialogVisiblename">
          <div class="zuzhi">请从组织架构中选择人员</div>
        </el-dialog>
        <el-dialog :visible.sync="categoryVisible" title="选择招标专业">
          <categoryTree @itemClick="onChangeCategory" />
        </el-dialog>
        <subJectTree title="项目" :level="2" ref="subJectTree" @itemClick="subJectTree"></subJectTree>
        <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
      </el-container>
    </div>
  </el-main>
</template>
<script>
import ProjectTree from "./components/ProjectTree";
import subJectTree from "@/views/bid/components/subJectTree";
import bus from "@/util/bus";
import categoryTree from "./components/CategoryTree";
import dayjs from "dayjs";
import { parseTime } from "@/util";
import choseUser from "@/components/choseUser";
export default {
  components: {
    ProjectTree,
    subJectTree,
    categoryTree,
    choseUser,
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
        projectName: [{ required: true, message: "项目或期区名称不能为空", trigger: "blur" }],
        bidLevel: [{ required: true, message: "层级不能为空", trigger: "blur" }],
        bidEndDate: [{ required: true, message: "日期不能为空", trigger: "blur" }],
        depName: [{ required: true, message: "需求部门不能为空", trigger: "blur" }],
        planName: [{ required: true, message: "招标计划名称不能为空", trigger: "blur" }],
        bidCateName: [{ required: true, message: "招标专业不能为空", trigger: "blur" }],
        purchaseType: [{ required: true, message: "招标方式不能为空", trigger: "blur" }],
        bidUserName: [{ required: true, message: "经办人不能为空", trigger: "blur" }],
        planMoney: [{ required: true, message: "合约规划金额不能为空", trigger: "blur" }],
        // jzSquire: [{ required: true, message: "建筑面积不能为空", trigger: "blur" }],
      },
      showtitle: "",
      xuQiuForm: {
        bidEndDate: "",
        purchaseType: "",
        id: "",
        quyu: "",
        xiangmu: "",
        projectId: "",
        projectName: "",
        bidCateName: "",
        bidCateId: "",
        depName: "",
        bidLevel: "",
        planMoney: "0",
        planMoney2: "0",
        jzSquire: "0",
        planName: "",
        requireDesc: "",
        bidUserName: "",
      },
      tableData: [
        {
          quyu: "华东区域",
          xiangmu: "中南世纪城",
          zhuanye: "安保",
          jingban: "张志阳",
          jingbanri: "2021-08-01",
          xuqiu: "2021-10-19",
          zhuangtai: "未处理",
          jindu: "未开始",
        },
        {
          quyu: "华东区域",
          xiangmu: "中南世纪城",
          zhuanye: "安保",
          jingban: "张志阳",
          jingbanri: "2021-08-01",
          xuqiu: "2021-10-19",
          zhuangtai: "未处理",
          jindu: "未开始",
        },
        {
          quyu: "华东区域",
          xiangmu: "中南世纪城",
          zhuanye: "安保",
          jingban: "张志阳",
          jingbanri: "2021-08-01",
          xuqiu: "2021-10-19",
          zhuangtai: "未处理",
          jindu: "未开始",
        },
        {
          quyu: "华东区域",
          xiangmu: "中南世纪城",
          zhuanye: "安保",
          jingban: "张志阳",
          jingbanri: "2021-08-01",
          xuqiu: "2021-10-19",
          zhuangtai: "未处理",
          jindu: "未开始",
        },
        {
          quyu: "华东区域",
          xiangmu: "中南世纪城",
          zhuanye: "安保",
          jingban: "张志阳",
          jingbanri: "2021-08-01",
          xuqiu: "2021-10-19",
          zhuangtai: "未处理",
          jindu: "未开始",
        },
        {
          quyu: "华东区域",
          xiangmu: "中南世纪城",
          zhuanye: "安保",
          jingban: "张志阳",
          jingbanri: "2021-08-01",
          xuqiu: "2021-10-19",
          zhuangtai: "未处理",
          jindu: "未开始",
        },
        {
          quyu: "华东区域",
          xiangmu: "中南世纪城",
          zhuanye: "安保",
          jingban: "张志阳",
          jingbanri: "2021-08-01",
          xuqiu: "2021-10-19",
          zhuangtai: "未处理",
          jindu: "未开始",
        },
        {
          quyu: "华东区域",
          xiangmu: "中南世纪城",
          zhuanye: "安保",
          jingban: "张志阳",
          jingbanri: "2021-08-01",
          xuqiu: "2021-10-19",
          zhuangtai: "未处理",
          jindu: "未开始",
        },
        {
          quyu: "华东区域",
          xiangmu: "中南世纪城",
          zhuanye: "安保",
          jingban: "张志阳",
          jingbanri: "2021-08-01",
          xuqiu: "2021-10-19",
          zhuangtai: "未处理",
          jindu: "未开始",
        },
        {
          quyu: "华东区域",
          xiangmu: "中南世纪城",
          zhuanye: "安保",
          jingban: "张志阳",
          jingbanri: "2021-08-01",
          xuqiu: "2021-10-19",
          zhuangtai: "未处理",
          jindu: "未开始",
        },
      ],
      plans: [],
      // currTab: "未处理",
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      userGuid: "",
    };
  },
  created() {
    // this.$emit("header", false);
    // this.$emit("footer", false);
    this.userName = localStorage.getItem("userName");
    this.userGuid = localStorage.getItem("userGuid");
    this.userGuid = this.userGuid.toUpperCase();
    this.$http.post("/RoleMenu/GetUserRoleButtonList", ["BIDREQUIRE001"], {}).then((res) => {
      this.codeList = res.data;
      this.isShowFaQibtn = res.data.indexOf("BIDREQUIRE001") > -1 ? true : false;
    });
    bus.$emit("showNav");
  },
  mounted() {
    this.GetPlanEditDropDowns();
  },
  methods: {
    parseTime,
    renderheader(h, { column, $index }) {
      return h("span", {}, [h("span", {}, column.label.split("#")[0]), h("br"), h("span", {}, column.label.split("#")[1])]);
    },
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
    onAdd() {
      this.type = 1;
      this.$refs.choseUser.openfnc();
    },
    GetPlanEditDropDowns() {
      this.$http.get("/PurchasePlan/GetPlanEditDropDowns").then((res) => {
        this.bidLevels = res.data.bidLevel;
        this.formSearch.bidLevel = res.data.length > 0 ? res.data[0].value : "";
        this.purchaseTypes = res.data.purchaseType;
        this.formSearch.purchaseType = res.data.length > 0 ? res.data[0].value : "";
        this.depNames = res.data.depName;
        this.formSearch.depName = res.data.length > 0 ? res.data[0].value : "";
        this.GetPlanRequireList();
      });
    },
    GetPlanEditDropDowns1() {
      this.$http.get("/PurchasePlan/GetPlanEditDropDowns").then((res) => {
        this.bidLevels = res.data.bidLevel;
        this.formSearch.bidLevel = res.data.length > 0 ? res.data[0].value : "";
        this.purchaseTypes = res.data.purchaseType;
        this.formSearch.purchaseType = res.data.length > 0 ? res.data[0].value : "";
        this.depNames = res.data.depName;
        this.formSearch.depName = res.data.length > 0 ? res.data[0].value : "";
      });
    },
    onUserAdd(id) {
      // const obj = {
      //   planId: this.xuQiuForm.id ? this.xuQiuForm.id : "00000000-0000-0000-0000-000000000000",
      //   userGuid: id.userGuid,
      //   sectionId: "00000000-0000-0000-0000-000000000000",
      // };
      // this.$http.post("/LiandoPlan/SaveBidLeader03", obj).then(res => {
      //   if (res.data.success) {
      //     // this.$message.success("添加成功");
      //     this.getzuzhangList();
      //   } else {
      //     // this.$alert(res.data.message, {
      //     //   confirmButtonText: "确定",
      //     // });
      //   }
      // });
      this.xuQiuForm.bidUserGuid = id.userGuid;
      this.xuQiuForm.bidUserName = id.userName;
    },
    subJectTree(sub) {
      this.xuQiuForm.projectId = sub.id;
      this.xuQiuForm.projectName = sub.projectFullName;
      this.$refs.subJectTree.close();
    },
    subJectAdd() {
      this.$refs.subJectTree.open();
    },
    onChangeCategory(category) {
      this.xuQiuForm.bidCateId = category.id;
      this.xuQiuForm.bidCateName = category.cateName;
      this.categoryVisible = false;
    },
    onAddBidPlan1(row) {
      // window.open(`#/bid/${"liandoBidPlanDetail"}?id=${id}`);
      // this.$router.push({
      //   path: "./bidrequireshowdet",
      //   query: { id: row.id },
      // });
      this.$router.push({
        path: `/bid/bidrequireshowdet?id=` + row.id,
      });
    },
    GetPlanRequireList() {
      let obj = {
        MyAuth: this.formSearch.myAuth,
        BidCateName: this.formSearch.bidCateName,
        DepName: this.formSearch.depName,
        PurchaseType: this.formSearch.purchaseType,
        ProjectName: this.formSearch.projectName,
        PlanName: this.formSearch.planName,
        // RequireDoStatus: this.currTab,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
      };
      this.$http.get("/PurchasePlan/GetPurchasePlanList", { params: obj }).then((res) => {
        if (res.data.success) {
          res.data.result.items.forEach((item) => {
            item.confirmDate = !item.confirmDate ? "" : this.timeFormatSeconds(item.confirmDate);
            // item.bidEndDate = this.timeFormatSeconds(item.bidEndDate);
          });
          //   this.tableData = res.data.result.items;
          // this.showColor = res.data.result.items.showColor;
          this.page.total = res.data.result.totalCount;
        }
      });
    },
    status_change({ row }) {
      if (row.showColor) {
        return "table-info-row";
      }
      return "";
    },
    selectChange() {
      this.page.index = 1;
      this.GetPlanRequireList();
    },
    pageAChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.GetPlanRequireList();
    },
    onSubmit() {
      this.page.index = 1;
      this.GetPlanRequireList();
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

    // onChangeProject(project) {
    //   this.formSearch.ProjectId = project.id;
    //   this.formSearch.projectName = project.projectShortName;
    //   this.GetPlanRequireList();
    // },

    handleTabClick() {
      this.formSearch.projectName = "";
      this.formSearch.planName = "";
      this.page.index = 1;
      this.page.size = 15;
      this.GetPlanRequireList();
    },
    /**
     * 编辑计划
     */
    edit(row) {
      this.showtitle = "编辑集采计划";
      this.dialogVisible = true;
      this.xuQiuForm = row;
      this.GetPlanEditDropDowns1();
      this.$http.get("/PurchasePlan/GetPurchasePlanById", { params: { planId: row.id } }).then((res) => {
        // this.xuQiuForm = res.data;
        // this.xuQiuForm.bidUserName = res.data.bidUserName;
        // this.xuQiuForm.bidUserGuid = res.data.bidUserGuid;
        // this.xuQiuForm.planName = res.data.planName;
        // this.xuQiuForm.projectName = res.data.projectName;
        // this.xuQiuForm.bidCateId = res.data.bidCateId;
        // this.xuQiuForm.bidCateName = res.data.bidCateName;
        // this.xuQiuForm.depName = res.data.depName;
        // this.xuQiuForm.bidLevel = res.data.bidLevel;
        // this.xuQiuForm.purchaseType = res.data.purchaseType;
        // this.xuQiuForm.id = res.data.id;
        // this.xuQiuForm.projectId = res.data.projectId;
        // this.xuQiuForm.planMoney = res.data.planMoney;
        // this.xuQiuForm.jzSquire = res.data.jzSquire;
        // this.xuQiuForm.requireDesc = res.data.requireDesc;
        // this.xuQiuForm.bidEndDate = res.data.bidEndDate;
      });
    },
    queRen(row) {
      let buer = parseTime(row.bidEndDate, "yyyy-MM-dd") == parseTime(row.confirmDate, "yyyy-MM-dd") ? true : false;
      if (!row.jzSquire) {
        this.$message({
          message: "请先输入建筑面积",
          type: "error",
        });
      } else if (!row.bidLevel) {
        this.$message({
          message: "请选择招标层级",
          type: "error",
        });
      } else {
        if (!buer && !row.requireDesc) {
          this.$message({
            message: "请输入需求原因",
            type: "error",
          });
        } else {
          this.$confirm("提交后将不能修改，确认要提交吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let obj = {
              id: row.id,
              bidLevel: row.bidLevel,
              confirmDate: row.confirmDate,
              requireDesc: row.requireDesc,
              jzSquire: row.jzSquire,
            };
            this.$http.post("/LiandoPlanRequire/SubmitPlanRequire", obj).then((res) => {
              if (res.data.success) {
                this.$msg.success(res.data.message);
                this.GetPlanRequireList();
              } else {
                this.$alert(res.data.message, {
                  confirmButtonText: "确定",
                });
              }
            });
          });
        }
      }
    },
    onEditSave() {
      this.dialogVisible = false;
    },
    onCancle() {
      this.detailVisible = false;
    },
    /**
     * 删除计划
     */
    del(id) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = { id };
        this.$http.post("/PurchasePlan/DeletePurchasePlan", obj).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetPlanRequireList();
          } else {
            // this.$msg.warning(res.data.message);
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    shengcheng() {
      this.$alert("生成成功", {
        confirmButtonText: "确定",
      });
    },
    /**
     * 添加或修改招标计划
     */
    onAddBidPlan() {
      this.xuQiuForm.planName = "";
      this.xuQiuForm.projectName = "";
      this.xuQiuForm.bidCateName = "";
      this.xuQiuForm.depName = "";
      this.xuQiuForm.bidLevel = "";
      this.xuQiuForm.purchaseType = "";
      this.xuQiuForm.id = "";
      this.xuQiuForm.projectId = "";
      this.xuQiuForm.planMoney = "";
      this.xuQiuForm.jzSquire = "";
      this.xuQiuForm.requireDesc = "";
      this.xuQiuForm.bidEndDate = "";
      this.xuQiuForm.bidCateId = "";
      this.showtitle = "新增集采计划";
      this.dialogVisible = true;
      // this.xuQiuForm = {};
      this.xuQiuForm.bidUserName = this.userName;
      this.xuQiuForm.bidUserGuid = this.userGuid;
      this.GetPlanEditDropDowns();
      // this.$nextTick(() => {
      //   this.$refs.xuQiu.resetFields();
      // });
      //   this.$router.push({
      //     path: "/bid/bidMode6/EditStep1",
      //   });
    },
    save() {
      this.$refs.xuQiu.validate((valid) => {
        if (valid) {
          this.$http.post("/PurchasePlan/SavePurchasePlan", this.xuQiuForm).then((res) => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.GetPlanRequireList();
              this.dialogVisible = false;
            } else {
              // this.$msg.warning(res.data.message);
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              });
            }
          });
        } else {
          this.$msg.warning("请填写完必填项!");
        }
      });

      //   this.$router.push({
      //     path: "/bid/bidMode6/EditStep1",
      //   });
    },
    saveto() {
      this.$confirm("您确认要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$refs.xuQiu.validate((valid) => {
          if (valid) {
            this.xuQiuForm.isSubmit = true;
            this.$http.post("/PurchasePlan/SavePurchasePlan", this.xuQiuForm).then((res) => {
              if (res.data.success) {
                this.$msg.success(res.data.message);
                this.GetPlanRequireList();
                this.dialogVisible = false;
              } else {
                // this.$msg.warning(res.data.message);
                this.$confirm(res.data.message, "提示", {
                  confirmButtonText: "确定",
                  type: "warning",
                });
              }
            });
          } else {
            this.$msg.warning("请填写完必填项!");
          }
        });
      });

      //   this.$router.push({
      //     path: "/bid/bidMode6/EditStep1",
      //   });
    },
  },
};
</script>

<style scoped>
.el-select {
  width: 100%;
}
/* ::v-deep .el-select,
::v-deep .el-input {
  width: 100%;
} */

.dropdown-menu {
  width: 6rem;
  min-width: 3rem !important;
}
.zuzhi {
  text-align: center;
  padding: 30px 0 50px;
  font-size: 18px;
  color: #21468c;
}

.dropdown-item {
  padding: 0.25rem 1rem !important;
}
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
/* ::v-deep .el-input__inner {
  height: 30px;
} */
::v-deep .el-input__icon {
  line-height: 32px;
}
/* ::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  z-index: 1;
} */
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
::v-deep .el-form-item__label {
  margin-bottom: -4px;
}
</style>
<style>
.el-table .table-info-row {
  background-color: #ffffcc;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
