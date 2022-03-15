<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu-other />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招采方案</el-breadcrumb-item>
          <el-breadcrumb-item>标段信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="form" :rules="rules" ref="form" size="small" class="mt-2">
          <div class="fromborder">
            <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="form.tableData">
              <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
              <el-table-column prop="planName" label="招标计划名称"> </el-table-column>
              <el-table-column prop="sectionName" label="标段名称" width="400">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.' + scope.$index + '.sectionName'" :rules="rules.sectionName">
                    <el-input v-model.trim="scope.row.sectionName"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="排序编号" width="120">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.' + scope.$index + '.sectionOrder'" :rules="rules.sectionOrder">
                    <el-input v-model.number="scope.row.sectionOrder"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
        <div class="float-right mr-2">
          <el-button type="primary" class="buttoncss" size="small" @click="onSubmit">保存信息</el-button>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
/**
 * 招标采购-标段信息
 */
import PlanMenuOther from "../components/PlanMenuOther";
import { mapState } from "vuex";

export default {
  name: "Step3",
  components: { PlanMenuOther },
  inject: ["reload"],
  data() {
    return {
      form: {
        tableData: [],
      },
      loading: false,
      rules: {
        sectionName: [
          { required: true, message: "请输入标段名称", trigger: "blur" },
          { min: 1, max: 50, message: "不超过50个字", trigger: "blur" },
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
      this.$api.BidModeSection.GetBidModeSectionList(this.baseId).then((res) => {
        this.form.tableData = res;
      });
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
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
            } else {
              this.$message.error(res.message);
            }
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
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
</style>
