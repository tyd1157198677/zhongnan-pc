<template>
  <div style="margin:0px auto 10px;margin-bottom: 65px;width:90%;">
    <div style="display:flex;justify-content:space-between;padding:10px">
      <span class="headername">电力专业-供应商考察报告</span>
      <div>
        <el-button type="primary" size="mini" @click="$router.back(-1)">返回</el-button>
        <el-button type="primary" size="mini" @click="daYin">打印</el-button>
        <kaochaUpload style="display: inline-block;margin-left:10px" :obj="obj"></kaochaUpload>
      </div>
    </div>
    <div ref="print">
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
      <!-- <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">项目经理</div>
      <edit4></edit4>
    </el-row> -->
      <el-row class="pt-3 pl-3 pr-3 mx-auto mh" v-for="(item, index) in formList" :key="index">
        <div class="table-top-title" style="margin-bottom: 10px">{{ item.order }}.{{ item.title }}</div>
        <form-details :dataArr="item.allModuleDynamicForm" :basetype="basetype"></form-details>
      </el-row>
      <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
        <div class="table-top-title" style="margin-bottom: 10px">17.考察附件（考察照片及考察报告）</div>
        <edit3></edit3>
      </el-row>
      <el-divider></el-divider>
      <div>
        <p style="margin-bottom: 0.5rem;">备注：</p>
        <p style="margin-bottom: 0.5rem;">1、项目经理（非挂证）：为直属承包项目管理模式下，委派的长期驻场项目第一负责人；</p>
        <p style="margin-bottom: 0.5rem;">2、驻场项目负责人（非挂证）：为非直属承包项目管理模式下，委派的长期驻场项目第一负责人；</p>
      </div>
    </div>
  </div>
</template>

<script>
import resonModule from "@/views/common/resonModule";
import formDetails from "@/views/common/formDetails";
import edit1 from "../comp/invesEdit1";
import edit2 from "@/views/common/invesEdit2";
import edit3 from "../comp/invesEdit3";
import kaochaUpload from "../comp/kaochaUpload";
import edit4 from "../comp/invesEdit4";
export default {
  components: {
    resonModule,
    formDetails,
    edit1,
    edit2,
    edit3,
    edit4,
    kaochaUpload,
  },
  data() {
    return {
      baseGuid: "", // 企业基本id
      basetype: "供方考察_电力",
      loading: false,
      formList: [],
      obj: {},
    };
  },
  beforeMount() {
    this.baseGuid = this.$route.query.id;
  },
  mounted() {
    this.obj = { MasterId: this.$route.query.id };
    this.GetModuleDynamicFormAll();
  },
  methods: {
    daYin() {
      this.$print(this.$refs.print);
    },
    GetModuleDynamicFormAll() {
      this.$http
        .get("/InvesLianDoFromNew/GetModuleDynamicFormAll", {
          params: {
            masterId: this.$route.query.id,
            dynamicModule: "供方考察_电力",
          },
        })
        .then(res => {
          console.log("供方考察_电力", res);
          res.data.forEach(item => {
            item.allModuleDynamicForm.forEach(e => {
              e.selectValue = [];
            });
          });
          this.formList = res.data;
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
