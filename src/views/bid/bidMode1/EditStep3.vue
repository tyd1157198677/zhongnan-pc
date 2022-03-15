<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>标段信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="float-right mr-2" style="margin-bottom: 10px">
          <el-button
            v-if="form.tableData.length > 1"
            type="primary"
            class="buttoncss"
            size="small"
            @click="onSubmit"
            style="margin-left: 10px"
            >保存信息</el-button
          >
          <el-button type="primary" class="buttoncss" size="small" @click="hebingBD">合并标段</el-button>
        </div>
        <el-form :model="form" :rules="rules" ref="form" size="small" class="mt-2">
          <div class="fromborder">
            <el-table
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="form.tableData"
              v-loading="loading"
              @selection-change="handleSelectionChange"
            >
              <el-table-column v-if="form.tableData.length > 1" align="center" type="selection" width="55"></el-table-column>
              <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
              <el-table-column prop="projectName" label="项目名称"> </el-table-column>
              <el-table-column prop="planName" label="招标计划名称"> </el-table-column>
              <el-table-column prop="sectionName" label="标段名称" width="200">
                <template slot-scope="scope">
                  <!-- <el-form-item :prop="'tableData.' + scope.$index + '.sectionName'" :rules="rules.sectionName"> -->
                  <el-input v-model.trim="scope.row.sectionName"></el-input>
                  <!-- </el-form-item> -->
                </template>
              </el-table-column>
              <el-table-column prop="sectionType" label="标段类型"> </el-table-column>
              <el-table-column label="排序序号" width="120">
                <template slot-scope="scope">
                  <!-- <el-form-item :rules="rules.sectionOrder"> -->
                  <el-input v-model.number="scope.row.sectionOrder"></el-input>
                  <!-- </el-form-item> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog title="合并标段" :visible.sync="dialogFormVisible" width="40%">
      <el-form label-width="130px" :model="ruleForm" :rules="rule1" ref="form1">
        <el-form-item label="合并后标段名称:" prop="newName">
          <el-input v-model="ruleForm.newName" placeholder="请输入合并后标段名称" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAction">取 消</el-button>
        <el-button type="primary" @click="submitForm()">保 存</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
/**
 * 招标采购-标段信息
 */
import PlanMenu from "../components/PlanMenu";
import { mapState } from "vuex";

export default {
  name: "Step3",
  components: { PlanMenu },
  inject: ["reload"],
  data() {
    return {
      form: {
        tableData: [],
      },
      ruleForm: {
        newName: "",
      },
      tableIdList: [],
      loading: false,

      dialogFormVisible: false,
      rule1: {
        newName: [
          { required: true, message: "请输入新的标段名称", trigger: "blur" },
          { min: 1, max: 30, message: "不超过30个字", trigger: "blur" },
        ],
      },
      rules: {
        sectionName: [
          { required: true, message: "请输入标段名称", trigger: "blur" },
          { min: 1, max: 50, message: "不超过30个字", trigger: "blur" },
        ],
        sectionOrder: [
          { required: true, message: "请填写排序编号", trigger: ["blur"] },
          { type: "number", message: "必须是数字" },
        ],
      },
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
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      this.$api.BidModeSection.GetBidModeSectionList(this.baseId).then((res) => {
        this.loading = false;
        this.form.tableData = res;
      });
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.tableIdList = val.map((v) => {
        return v.id;
      });
      // console.log(this.tableIdList)
    },
    hebingBD() {
      if (this.tableIdList.length < 2) {
        return this.$message.warning("至少需要勾选两项才能合并标段！");
      } else {
        this.dialogFormVisible = true;
      }
    },
    submitForm() {
      this.$refs["form1"].validate((valid) => {
        if (valid) {
          this.$confirm("保存后将不能修改,确定执行此操作吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let obj = {
              sectionIds: this.tableIdList,
              sectionName: this.ruleForm.newName,
            };
            this.$http.post("/BidModeSection/SectionJoin", obj).then((res) => {
              if (res.data.success) {
                this.$message.success(res.data.message);
                this.dialogFormVisible = true;
                this.getTableData();
              } else {
                this.$message.error(res.data.message);
              }
            });
            // this.getTableData();;
          });
        }
      });

      // this.$api.BidModeSection.GetBidModeSectionList(this.baseId).then(res => {
      //   this.form.tableData = res;
      // });
    },
    // 取消还原数据
    cancelAction() {
      let that = this;
      that.dialogFormVisible = false;
      that.ruleForm.newName = "";
    },
    onSubmit() {
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      const data = this.form.tableData.map((t) => {
        return {
          id: t.id,
          sectionName: t.sectionName,
          sectionOrder: t.sectionOrder,
        };
      });
      this.$api.BidModeSection.SaveBidModeSection(data).then((res) => {
        if (res.success) {
          this.$message.success("保存成功");
          this.getTableData();
        } else {
          this.$message.error(res.message);
        }
      });
      //     }
      //   });
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
