<template>
  <div style="margin:0px auto 10px;margin-bottom: 65px;width:90%;">
    <div style="display:flex;justify-content:space-between;padding:10px">
      <span class="headername">景观-供应商考察报告</span>
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
        <div class="table-top-title" style="margin-bottom: 10px">考察接洽人员</div>
        <edit2></edit2>
      </el-row>

      <el-row class="pt-3 pl-3 pr-3 mx-auto mh" v-for="(item, index) in formList" :key="index">
        <div class="table-top-title" style="margin-bottom: 10px">{{ item.order }}.{{ item.title }}</div>
        <form-details :dataArr="item.allModuleDynamicForm" :basetype="basetype"></form-details>
      </el-row>
      <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
        <div class="table-top-title" style="margin-bottom: 10px">{{ formList.length + 1 }}.考察附件（考察照片及考察报告）</div>
        <edit3></edit3>
      </el-row>
    </div>

    <!-- <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">12.考察附件（考察照片及考察报告）</div>
      <edit33></edit33>
    </el-row>

    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">考察项目情况（如考察多个项目）</div>
      <porjectinfo :pagetype="this.basetype"></porjectinfo>
    </el-row>
    
    <el-divider></el-divider> -->
  </div>
</template>

<script>
import resonModule from "@/views/common/resonModule";
import edit1 from "../comp/invesEdit1";
import edit2 from "@/views/common/invesEdit2";
import edit3 from "../comp/invesEdit3";
import formDetails from "@/views/common/formDetails";
import porjectinfo from "../components/projectInfo";
import kaochaUpload from "../comp/kaochaUpload";

export default {
  components: {
    resonModule,
    edit1,
    edit2,
    edit3,
    formDetails,
    porjectinfo,
    kaochaUpload,
  },
  data() {
    return {
      baseGuid: "", // 企业基本id
      loading: false,
      basetype: "项目招标考察_材料设备",
      formList: [],
      imageUrl: process.env.VUE_APP_API_URL, // 跨域地址
      printscreenUrl: "",
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
    // daYin() {
    //   const printContent = this.$refs.print;
    //   // 获取dom 宽度 高度
    //   const width = printContent.clientWidth;
    //   const height = printContent.clientHeight;
    //   // 创建一个canvas节点
    //   const canvas = document.createElement("canvas");

    //   const scale = 4; // 定义任意放大倍数，支持小数；越大，图片清晰度越高，生成图片越慢。
    //   canvas.width = width * scale; // 定义canvas 宽度 * 缩放
    //   canvas.height = height * scale; // 定义canvas高度 *缩放
    //   canvas.style.width = width * scale + "px";
    //   canvas.style.height = height * scale + "px";
    //   canvas.getContext("2d").scale(scale, scale); // 获取context,设置scale

    //   const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动轴滚动的长度
    //   const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft; // 获取水平滚动轴的长度

    //   htmlcanvas(printContent, {
    //     canvas,
    //     backgroundColor: null,
    //     useCORS: true,
    //     allowTaint: true,
    //     windowHeight: document.body.scrollHeight,
    //     scrollX: -scrollLeft, // 解决水平偏移问题，防止打印的内容不全
    //     scrollY: -scrollTop,
    //   })
    //     .then(canvas => {
    //       const url = canvas.toDataURL("image/png");
    //       this.$print({
    //         printable: url,
    //         type: "image",
    //         documentTitle: "", // 标题
    //         style: "@page{size:auto;margin: 0cm 1cm 0cm 1cm;}", // 去除页眉页脚
    //       });
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // },
    daYin() {
      this.$print(this.$refs.print);
    },
    GetModuleDynamicFormAll() {
      this.$http
        .get("/InvesLianDoFromNew/GetModuleDynamicFormAll", {
          params: {
            masterId: this.$route.query.id,
            dynamicModule: "项目招标考察_材料设备",
          },
        })
        .then(res => {
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
<style>
/* @media print {
  html,
  body {
    height: inherit;
  }
} */
</style>
