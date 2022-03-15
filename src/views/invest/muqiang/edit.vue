<template>
  <div style="margin:0px auto 10px;margin-bottom: 65px;width:90%;">
    <div style="text-align:right;margin-right:13px">
      <span class="headername">幕墙专业-供应商考察报告</span>
      <el-button type="primary" size="mini" @click="$router.back(-1)">返回</el-button>
    </div>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <resonModule :supId="baseGuid" pagetype="供方考察"></resonModule>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">供应商基本信息</div>
      <edit1></edit1>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">考察接洽人员情况</div>
      <edit2></edit2>
    </el-row>

    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">门窗、型材生产加工厂情况</div>
      <edit3></edit3>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh" v-for="(item, index) in formList" :key="index">
      <div class="table-top-title" style="margin-bottom: 10px">{{ item.order }}.{{ item.title }}</div>
      <form-edit :dataArr="item.allModuleDynamicForm" :basetype="basetype"></form-edit>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">11.考察附件（考察照片及考察报告）</div>
      <edit33></edit33>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <el-button size="small" @click="quxiao" style="float: right;margin: 10px;">取消</el-button>
      <!--<el-button type="primary" size="small" style="float: right;margin: 10px;">暂存信息</el-button>-->
      <el-button type="primary" size="small" @click="tiJiao" style="float: right;margin-top: 10px;">提交考察信息</el-button>
    </el-row>

    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">考察项目情况（如考察多个项目）</div>
      <porjectinfo :pagetype="this.basetype"></porjectinfo>
    </el-row>

    <el-divider></el-divider>
    <div style="margin-bottom: 20px;">
      <p style="margin-bottom: 0.5rem;">备注：</p>
      <p style="margin-bottom: 0.5rem;">1、项目经理（非挂证）：为直属承包项目管理模式下，委派的长期驻场项目第一负责人；</p>
      <p style="margin-bottom: 0.5rem;">2、驻场项目负责人（非挂证）：为非直属承包项目管理模式下，委派的长期驻场项目第一负责人；</p>
    </div>
  </div>
</template>

<script>
import resonModule from "@/views/common/resonModule";
import edit1 from "../comp/invesEdit1";
import edit2 from "@/views/common/invesEdit2";
import edit3 from "./invesEdit3";
import formEdit from "@/views/common/formEdit";
import edit33 from "../comp/invesEdit3";
import porjectinfo from "../components/projectInfo";
export default {
  components: {
    resonModule,
    edit1,
    edit2,
    edit3,
    edit33,
    formEdit,
    porjectinfo,
  },
  data() {
    return {
      baseGuid: "", // 企业基本id
      loading: false,
      basetype: "供方考察_幕墙",
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
            dynamicModule: "供方考察_幕墙",
          },
        })
        .then(res => {
          console.log("供方考察_幕墙", res);
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
