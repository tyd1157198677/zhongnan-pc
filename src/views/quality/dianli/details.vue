<template>
  <div style="margin:0px auto 10px;margin-bottom: 65px;width:90%;">
    <div style="text-align:right;margin-right:13px">
      <span class="headername">电力专业-资格预审表</span>
      <el-button type="primary" size="mini" @click="$router.back(-1)">返回</el-button>
    </div>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <resonModule :supId="baseGuid" pagetype="资格预审"></resonModule>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">公司基本信息</div>
      <company-base-info></company-base-info>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">在施项目业绩（含实际承包人)</div>
      <project-results :type="type"></project-results>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">联系人员情况</div>
      <edit2></edit2>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh" v-for="(item, index) in formList" :key="index">
      <div class="table-top-title" style="margin-bottom: 10px">{{ item.order }}.{{ item.title }}</div>
      <form-details :dataArr="item.allModuleDynamicForm" :basetype="type"></form-details>
    </el-row>

    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">在施项目业绩汇总表（用于后补使用）</div>
      <results-collect :type="type"></results-collect>
    </el-row>
    <el-divider></el-divider>
    <div>
      <p style="margin-bottom: 0.5rem;">备注：</p>
      <p style="margin-bottom: 0.5rem;">1、项目经理（非挂证）：为直属承包项目管理模式下，委派的长期驻场项目第一负责人；</p>
      <p style="margin-bottom: 0.5rem;">2、驻场项目负责人（非挂证）：为非直属承包项目管理模式下，委派的长期驻场项目第一负责人；</p>
    </div>
  </div>
</template>

<script>
import resonModule from "@/views/common/resonModule";
import formDetails from "@/views/common/formDetails";
import edit2 from "@/views/common/qualityEdit2";

import edit1 from "@/views/invest/comp/invesEdit1";
import companyBaseInfo from "@/views/quality/components/companyBaseInfo";

import projectResults from "@/views/quality/components/projectResults";
import resultsCollect from "@/views/quality/components/resultsCollect";

export default {
  components: {
    resonModule,
    formDetails,
    edit1,
    edit2,
    companyBaseInfo,
    projectResults,
    resultsCollect,
  },
  data() {
    return {
      type: "资格预审_电力",
      baseGuid: "", // 企业基本id
      loading: false,
      formList: [],
    };
  },
  beforeMount() {
    this.baseGuid = this.$route.query.id;
  },
  mounted() {
    this.GetModuleDynamicFormAll();
  },
  methods: {
    GetModuleDynamicFormAll() {
      this.$http
        .get("/InvesLianDoFromNew/GetModuleDynamicFormAll", {
          params: {
            masterId: this.$route.query.id,
            dynamicModule: "资格预审_电力",
          },
        })
        .then(res => {
          console.log("资格预审_电力", res);
          res.data.forEach(item => {
            item.allModuleDynamicForm.forEach(e => {
              e.selectValue = [];
            });
          });
          this.formList = res.data;
        });
    },
    tiJiao() {
      this.$confirm("提交后不能修改，确认要提交考察信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.SubmitInvesMaster({ id: this.$route.query.id }).then(res => {
            if (res.success) {
              this.$message.success(res.message);
              this.$router.go(-1);
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    quxiao() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.headername {
  text-align: left;
  padding-left: 1rem;
  color: #409eff;
  font-weight: 600;
  float: left;
}
.el-select,
.el-input {
  width: 16rem;
}

.el-form-item {
  margin-bottom: 10px;
}

.mh {
  /*min-height:500px;*/
}
::v-deep .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 20px;
  padding: 5px 12px 0 0;
  box-sizing: border-box;
}
</style>
