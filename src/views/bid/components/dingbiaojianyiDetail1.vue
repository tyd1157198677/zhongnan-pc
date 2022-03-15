<template>
  <div>
    <div class="pub">
      <span>入围单位</span>
    </div>
    <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="supplierList">
      <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
      <el-table-column label="供应商名称" prop="supplierName"> </el-table-column>
      <el-table-column label="主营专业" prop="supCateNames" align="center"> </el-table-column>
      <el-table-column label="注册资金" prop="regCapital" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.regCapital + scope.row.regCapitalType }}
        </template>
      </el-table-column>
      <el-table-column label="报价总金额(含税)" prop="amount" align="center" width="130"> </el-table-column>
      <el-table-column label="报价总金额(不含税)" prop="amountNoTax" align="center" width="150"> </el-table-column>
      <el-table-column label="商务联系人" align="center">
        <el-table-column label="姓名" prop="personName" align="center" width="100"> </el-table-column>
        <el-table-column label="手机号" prop="mobilePhone" align="center" width="130"> </el-table-column>
        <el-table-column label="职务" prop="workAs" align="center" width="130"> </el-table-column>
      </el-table-column>
    </el-table>
    <div class="pub">中标单位</div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right" style="width: 130px">中标单位:</td>
          <td colspan="3">{{ form1.supplierName }}</td>
          <td class="right" style="width: 180px">含税中标金额（元）:</td>
          <td colspan="3">{{ form1.winPrice }}</td>
          <td class="right" style="width: 180px">不含税中标金额（元）:</td>
          <td colspan="3">{{ form1.excludingTaxPrice }}</td>
        </tr>
        <tr>
          <td class="right">相关说明:</td>
          <td colspan="11">{{ form1.desc }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pub">
      <span>相关附件</span>
    </div>
    <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="fileslist">
      <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
      <el-table-column label="文件名称" prop="fileName" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.fileName + scope.row.fileExtName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件大小" prop="fileSize" align="center"> </el-table-column>
      <el-table-column label="上传日期" prop="creationTime" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传人" prop="userName" align="center"> </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
        </template>
      </el-table-column>
    </el-table>
    <public-shenpi
      class="no-print"
      :type="'定标'"
      :id="$route.query.id"
      :urlSubmit="urlSubmit"
      :urlRizhi="urlRizhi"
      :showBtnUrl="showBtnUrl"
    ></public-shenpi>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    publicShenpi: () => import("@/components/publicShenpi.vue"),
  },
  data() {
    return {
      urlSubmit: "/BidWin/WorkFlowRun",
      urlRizhi: "/WflowApproveLogsAppServices/EB_GetSimpleWinList",
      showBtnUrl: "/BidWin/CheckShowAuditButton",
      id: "",
      data: {},
      rules: {
        supplierName: [{ required: true, message: "中标单位不能为空", trigger: "change" }],
        winPrice: [{ required: true, message: "中标金额不能为空", trigger: "change" }],
        excludingTaxPrice: [{ required: true, message: "中标不含税金额不能为空", trigger: "change" }],
      },
      selectSupVisible: false,
      dialogVisible: false,
      subloading: false,
      checkResult: "",
      texts: "",
      form: {},
      reasons: [],
      form1: {
        supplierName: "",
        supplierId: "",
        winPrice: "",
        excludingTaxPrice: "",
        desc: "",
      },
      tabs: [],
      fileList: [],
      fileslist: [],
      zuzhangdata: [],
      activeNames: [],
      supplierList: [],
      loading: false,
      uploadData: {
        FileName: "",
      },
      file: {},
      api: process.env.VUE_APP_API_URL,
      UploadfileList: [],
      loadingfile: false,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  created() {
    this.bidModeId = this.$route.query.id;
  },
  mounted() {
    this.getList2();
    this.getScaleing();
    this.GetBidModeSupplierList1001();
  },
  methods: {
    parseTime,
    getScaleing() {
      this.$http.get("/ZhiWeiPurchaseAppServices/getScaleing?bidModeId=" + this.bidModeId).then((res) => {
        this.form1 = res.data;
      });
    },
    getList2() {
      this.$http.get("/BidWin/GetBidWinAttachList01?bidModeId=" + this.bidModeId).then((res) => {
        this.fileslist = res.data;
      });
    },
    //获取已添加供方列表
    GetBidModeSupplierList1001() {
      this.$http.get("/BidModeSupplier/GetBidModeSupplierList1001", { params: { baseId: this.bidModeId } }).then((res) => {
        this.supplierList = res.data.result;
      });
    },
    onDownload(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + id);
    },
    handlechange(val) {
      this.texts = this.tempList.find((e) => e.fileName == val).fileExt;
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
}
::v-deep .el-form-item__label {
  height: 20px;
  line-height: 20px;
}
.pub {
  border-left: 3px solid #ea5514;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: #d9d6d6;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}
</style>
