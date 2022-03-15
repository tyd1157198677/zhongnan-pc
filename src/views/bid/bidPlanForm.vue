<template>
  <el-main style="width:88%;margin-top:10px">
    <div class="table-top-title">{{ title }}招采计划</div>
    <el-form ref="form" :inline="true" label-width="150px" size="small" :model="form" :rules="rules" class="m-3">
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属项目" prop="projectName">
            <el-input v-model="form.projectName" readonly>
              <el-button slot="append" icon="el-icon-search" @click="projectVisible = true"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招采计划分类" prop="planCate">
            <el-select v-model="form.planCate">
              <el-option v-for="item in dropDownGroup.planCate" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招标计划名称" prop="planName">
            <el-input v-model="form.planName" placeholder="请输入2-50个字"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="招标方式" prop="purchaseType">
            <el-select v-model="form.purchaseType">
              <el-option v-for="item in dropDownGroup.purchaseType" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招标层级" prop="bidLevel">
            <el-select v-model="form.bidLevel">
              <el-option v-for="item in dropDownGroup.bidLevel" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招标专业" prop="bidCateName">
            <el-input v-model="form.bidCateName" readonly>
              <el-button slot="append" icon="el-icon-search" @click="categoryVisible = true"></el-button>
            </el-input>
            <!-- <el-select v-model="form.bidCateId">
                            <el-option
                                v-for="item in dropDownGroup.bidLevel"
                                :key="item.value"
                                :label="item.text"
                                :value="item.value"
                            ></el-option>
                        </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合约规划金额(元)" prop="planMoney">
            <el-input v-model.number="form.planMoney"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
            <el-form-item label="招标控制价(元)" prop="limitMoney">
              <el-input v-model.number="form.limitMoney"></el-input>
            </el-form-item>
          </el-col> -->
        <!-- <el-col :span="8">
          <el-form-item label="确认日期" prop="confirmDate">
            <el-date-picker type="date" v-model="form.confirmDate" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="发标日期" prop="bidSendDate">
            <el-date-picker type="date" v-model="form.bidSendDate" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="计划开工日期" prop="bidOpenDate">
            <el-date-picker type="date" v-model="form.bidOpenDate" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划竣工日期" prop="bidEndDate">
            <el-date-picker type="date" v-model="form.bidEndDate" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
        </el-col>

        <!-- <el-form-item label="经办人">
                        <el-select v-model="form.editUserName">
                            <el-option
                                v-for="item in dropDownGroup.purchaseType"
                                :key="item.value"
                                :label="item.text"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item> -->
        <el-col :span="8">
          <el-form-item label="需求部门" prop="depName">
            <el-select v-model="form.depName">
              <el-option
                v-for="item in dropDownGroup.purchaseDepartment"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" class="right">
          <el-form-item>
            <!-- <el-button type="primary" size="small" :loading="loading" v-if="showSubmitApply" @click="onSubmitApply">提交审核</el-button> -->
            <el-button type="primary" size="small" :loading="loadingSave" @click="onSubmit">保存信息</el-button>
            <el-button size="small" @click="onCancle">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="projectVisible" :modal="false">
      <project-tree
        title="请选择项目或分期"
        :selectOrgType="['项目', '分期']"
        :expandedOrgType="['总部', '区域']"
        @itemClick="onChangeProject"
      />
    </el-dialog>

    <el-dialog :visible.sync="categoryVisible" title="选择招标专业" :modal="false">
      <category-tree @itemClick="onChangeCategory" />
    </el-dialog>
  </el-main>
</template>

<script>
import ProjectTree from "./components/ProjectTree";
import CategoryTree from "./components/CategoryTree";
import bus from "@/util/bus";
export default {
  inject: ["reload"],
  components: { ProjectTree, CategoryTree },
  data() {
    return {
      title: this.$route.query.tit,
      dropDownGroup: {},
      projectVisible: false,
      categoryVisible: false,
      loadingSave: false,
      loading: false,
      form: {
        id: "",
        projectId: "",
        projectName: "",
        planCate: "",
        planName: "",
        purchaseType: "",
        bidLevel: "",
        bidCateId: "",
        bidCateName: "",
        planMoney: 0,
        limitMoney: 0,
        confirmDate: "",
        bidSendDate: "",
        bidOpenDate: "",
        bidEndDate: "",
        depName: "",
      },
      rules: {
        projectName: [{ required: true, message: "请选择项目", trigger: "blur" }],
        planCate: [{ required: true, message: "请选择招采计划分类", trigger: ["blur", "change"] }],
        planName: [
          { required: true, message: "请填写名称", trigger: ["blur"] },
          { min: 1, max: 50, message: "最多50字", trigger: "blur" },
        ],
        purchaseType: [{ required: true, message: "请选择采购方式", trigger: ["blur", "change"] }],
        bidLevel: [{ required: true, message: "请选择招标层级", trigger: ["blur", "change"] }],
        bidCateName: [{ required: true, message: "请选择招标专业", trigger: ["blur", "change"] }],
        planMoney: [
          { required: true, message: "请填写合约规划金额", trigger: ["blur"] },
          { type: "number", message: "必须是数字" },
        ],
        limitMoney: [
          { required: true, message: "请填招标控制价", trigger: ["blur"] },
          { type: "number", message: "必须是数字" },
        ],
        confirmDate: [{ required: true, message: "请填写确认日期", trigger: ["blur"] }],
        bidOpenDate: [{ required: true, message: "请填写计划开工日期", trigger: ["blur"] }],
        bidEndDate: [{ required: true, message: "请填写计划竣工日期", trigger: ["blur"] }],
        depName: [{ required: true, message: "请选择需求部门", trigger: ["blur", "change"] }],
      },
    };
  },
  computed: {
    showSubmitApply() {
      return this.form.planStatus === "草稿";
    },
  },
  mounted() {
    // bus.$emit("hideNav");
    const id = this.$route.query.id;
    if (id) {
      this.form.id = id;
      this.loadForm();
    }
    this.loadQueryForm();
  },
  methods: {
    // init(mode, id) {
    //   this.resetForm();
    //   if (mode === "edit") {
    //     this.form.id = id;
    //     this.title = "编辑";
    //     this.loadForm();
    //   }
    //   if (mode === "add") {
    //     this.title = "新增";
    //     this.$refs["form"].resetFields();
    //   }
    // },
    loadQueryForm() {
      this.$api.BidPlan.GetBidPlanDropDown().then(res => {
        this.dropDownGroup = res;
      });
    },
    loadForm() {
      this.$api.BidPlan.GetOneBidPlanById(this.form.id).then(res => {
        this.form = res;
      });
    },
    onChangeProject(project) {
      this.form.projectId = project.id;
      this.form.projectName = project.projectFullName;
      this.projectVisible = false;
    },
    onChangeCategory(category) {
      console.log(category);
      this.form.bidCateId = category.id;
      this.form.bidCateName = category.cateName;
      this.categoryVisible = false;
    },
    resetForm() {
      this.form = {
        id: "",
        projectId: "",
        projectName: "",
        planCate: "",
        planName: "",
        purchaseType: "",
        bidLevel: "",
        bidCateId: "",
        bidCateName: "",
        planMoney: 0,
        limitMoney: 0,
        confirmDate: "",
        bidSendDate: "",
        bidOpenDate: "",
        bidEndDate: "",
        depName: "",
      };
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadingSave = true;
          this.$api.BidPlan.InsertOrUpdateBidPlan(this.form).then(res => {
            if (res.success) {
              this.$message.success("保存成功");
              const id = res.returnValue1;
              this.loadingSave = false;
              this.$refs["form"].clearValidate();
              this.$emit("onSubmit", res);
              //this.$router.back(-1);
              //window.open(`#/bid/bidPlanShow?id=${id}`);
              this.$router.replace({
                path: "/bid/bidPlanShow",
                query: { id },
              });
            } else {
              // this.$message.error(res.message);
              this.$alert(res.message, {
                confirmButtonText: '确定',
              });
            }
          });
        }
      });
    },
    onCancle() {
      this.$refs["form"].clearValidate();
      this.$router.push({
        path: "/bid/bidPlan",
      });
    },
    onSubmitApply() {
      this.$confirm("您确认要提交信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        this.$api.BidPlan.SubmitPlan(this.form.id)
          .then(() => {
            this.$msg.success("提交成功");
          })
          .finally(() => {
            this.loading = false;
            this.reload();
          });
      });
    },
  },
};
</script>

<style scoped>
.el-select,
.el-input {
  width: 13rem;
}

.el-form-item {
  margin-bottom: 10px;
}

.mh {
  min-height: 500px;
}

.el-main {
  width: 100%;
}
</style>
