<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <showplan-menu />
      </el-col>
    </el-row>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采计划</el-breadcrumb-item>
          <el-breadcrumb-item v-if="showmessage"
            >标段信息<span style="color: red">({{ message }})</span></el-breadcrumb-item
          >
          <el-breadcrumb-item v-else>标段信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-alert :title="msg" type="warning" v-if="!isCanEdit" :closable="false"> </el-alert> -->
        <div>
          <!-- <div> -->
          <div class="float-right mr-2" style="margin-bottom: 10px">
            <!-- <el-button type="primary" class="buttoncss" size="small" v-if="showsubmit" @click="onSubmit" style="margin-left:10px"
              >保存标段信息</el-button
            > -->
            <el-button type="primary" class="buttoncss" size="small" v-if="showsubmit" @click="hebingBD">新增标段</el-button>
            <!-- <el-button type="primary" class="buttoncss" size="small" @click="hebingBD" style="margin-right:10px">合并标段</el-button> -->
          </div>
          <el-form ref="form" size="small" class="mt-2">
            <div class="fromborder">
              <el-table
                empty-text="无符合条件的记录"
                stripe
                border
                element-loading-text="请稍候,数据正在加载中..."
                :data="tableData"
                v-loading="loading"
              >
                <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                <el-table-column prop="projectName" label="项目或期区名称"> </el-table-column>
                <el-table-column prop="planName" label="招标计划名称"> </el-table-column>
                <el-table-column prop="sectionType" label="标段名称" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sectionName" v-if="showsubmit" @input="onSubmit"></el-input>
                    <el-input v-model="scope.row.sectionName" v-else disabled @input="onSubmit"></el-input>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="sectionType" label="标段类型"> </el-table-column> -->
                <el-table-column label="排序序号" width="120" align="center">
                  <template slot-scope="scope">
                    <el-input type="number" v-if="showsubmit" :min="1" v-model="scope.row.sectionOrder" @input="onSubmit"></el-input>
                    <el-input type="number" v-else disabled :min="1" v-model="scope.row.sectionOrder" @input="onSubmit"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="删除" width="80" align="center" v-if="showsubmit">
                  <template slot-scope="scope">
                    <i class="el-icon-delete" title="删除" @click="deleterow(scope.row.id)"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="选择招标计划作为标段" :visible.sync="dialogFormVisible" width="80%">
      <!-- <el-form label-position="right" label-width="150px" size="small">
        <el-form-item label="项目或期区名称："> -->
      <div>
        <el-button type="primary" style="float: right; margin-left: 10px; margin-bottom: 10px" size="small" @click="sousuo">搜索</el-button>

        <!-- </el-form-item>
        <el-form-item label="招标计划名称："> -->
        <el-input
          v-model="PlanName"
          style="width: 200px; float: right; margin-left: 10px; margin-bottom: 10px"
          placeholder="请输入招标计划名称"
          clearable
        ></el-input>
        <el-input
          v-model="projectName"
          style="width: 200px; float: right; margin-left: 10px; margin-bottom: 10px"
          placeholder="请输入项目或期区名称"
          clearable
        ></el-input>
      </div>
      <!-- </el-form-item>
      </el-form> -->
      <el-table height="370" empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData1">
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="projectName" min-width="150" label="项目或期区名称" show-overflow-tooltip>
          <template slot-scope="scope"
            ><span class="sp"> {{ scope.row.projectName }}{{ scope.row.subProjectName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="planName" label="招标计划名称" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="sp">{{ scope.row.planName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bidEndDate" label="计划完成日期" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.bidEndDate, "yyyy-MM-dd") }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="confirmDate" label="项目需求日期" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.confirmDate, "yyyy-MM-dd") }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="bidUserName" label="招标经办人" align="center" width="100"></el-table-column>
        <el-table-column prop="purchaseType" label="采购方式" align="center" width="100"></el-table-column>
        <!-- <el-table-column prop="planStatus" label="状态" align="center" width="90"> </el-table-column> -->
        <el-table-column label="选择" align="center" width="80">
          <template slot-scope="scope">
            <i class="el-icon-circle-check" title="选择" @click="selectSup(scope.row.id)"></i>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAction">取 消</el-button>
        <el-button type="primary" @click="submitForm()">保 存</el-button>
      </div> -->
    </el-dialog>
  </el-main>
</template>

<script>
/**
 * 招标采购-标段信息
 */
import PlanMenu from "../components/PlanMenuDemo.vue";
import { mapState } from "vuex";
import { parseTime } from "@/util";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step3",
  components: { PlanMenu, showplanMenu, Pagination: () => import("@/components/Pagination.vue") },
  inject: ["reload"],
  data() {
    return {
      msg: "",
      message: "",
      showmessage: false,
      isCanEdit: false,
      showsubmit: false,
      tableData: [],
      tableData1: [],
      projectName: "",
      PlanName: "",
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      loading: false,
      dialogFormVisible: false,
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
  },
  mounted() {
    this.CheckCanEditPlan01();
    this.getBaseInfo();
  },
  methods: {
    parseTime,
    renderheader(h, { column, $index }) {
      return h("span", {}, [h("span", {}, column.label.split("#")[0]), h("br"), h("span", {}, column.label.split("#")[1])]);
    },
    CheckCanEditPlan01() {
      this.$http.get("/LiandoPlan/CheckCanEditPlan01?planId=" + this.baseId).then((res) => {
        this.isCanEdit = res.data.success;
        this.msg = res.data.message;
        if (res.data.success) {
          this.showsubmit = true;
          this.showmessage = false;
        } else {
          this.showsubmit = false;
          if (res.data.message != "" || res.data.message != null) {
            this.showmessage = true;
            this.message = res.data.message;
          } else {
            this.showmessage = false;
          }
        }
      });
    },
    getBaseInfo() {
      this.$http.get("/LiandoPlan/GetBidModeSection02", { params: { planId: this.baseId } }).then((res) => {
        this.tableData = res.data;
      });
      // this.$api.BidModeMaster.GetBidModeSearchDropDown().then(res => {
      //   this.dropDownGroup = res.bidInviteType;
      // });
    },
    GetSelectPlanList02() {
      let obj = {
        // id: "",
        PurchaseType: "邀请招标",
        ProjectName: this.projectName,
        PlanName: this.PlanName,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
      };
      this.$http.get("/LiandoPlan/GetSelectPlanList02", { params: obj }).then((res) => {
        this.tableData1 = res.data.result.items;
        this.page.total = res.data.result.totalCount;
      });
      this.$api.BidModeMaster.GetBidModeSearchDropDown().then((res) => {
        this.dropDownGroup = res.bidInviteType;
      });
    },
    sousuo() {
      this.page.index = 1;
      this.GetSelectPlanList02();
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.GetSelectPlanList02();
    },
    //新增
    hebingBD() {
      this.GetSelectPlanList02();
      this.dialogFormVisible = true;
    },
    //选择计划
    selectSup(id, type) {
      let obj = {
        thisPlanId: this.baseId,
        addPlanId: id,
      };
      this.$http.post("/LiandoPlan/AddSection02", obj).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.dialogFormVisible = false;
          this.getBaseInfo();
        } else {
          // this.$message.error(res.data.message);
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    deleterow(id) {
      this.$confirm("确认要删除当前标段吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoPlan/DeleteSection02", { id }).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.getBaseInfo();
          } else {
            // this.$message.error(res.data.message);
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    onSubmit() {
      let obj = this.tableData.map((t) => {
        return {
          id: t.id,
          sectionName: t.sectionName,
          sectionOrder: t.sectionOrder,
        };
      });
      this.$http.post("/LiandoPlan/SaveSectionInfo02", obj).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.getBaseInfo();
        } else {
          // this.$message.error(res.data.message);
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 2% 0 120px;
  height: 100%;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: #ffffff;
  position: relative;
  /* width: 88%; */
  border-radius: 10px 10px 0 0;
  overflow: auto;
}

.buttoncss {
  float: right;
  margin-top: 12px;
}
/* .fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
} */
</style>
