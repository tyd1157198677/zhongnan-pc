<template>
  <!-- <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item name="1"> -->
  <!-- <template slot="title">
        <span class="infonametits">分公司信息</span>
      </template> -->
  <el-table v-loading="loading" :data="companyList" border :header-cell-style="{ background: '#42212108' }">
    <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
    <el-table-column prop="subCompanyName" label="分公司名称" align="center" :min-width="200"> </el-table-column>
    <el-table-column prop="businessCode" label="统一社会信用代码" align="center" width="200"> </el-table-column>
    <el-table-column prop="personName" label="联系人姓名" align="center" width="100"> </el-table-column>
    <el-table-column prop="mobilePhone" label="联系人电话" align="center" width="120"> </el-table-column>
    <el-table-column prop="workAs" label="联系人职务" align="center" width="100"> </el-table-column>
    <el-table-column prop="bankOpenName" label="开户名称" align="center" width="100"> </el-table-column>
    <el-table-column prop="bankName" label="开户银行" align="center" width="200"> </el-table-column>
    <el-table-column prop="bankAccount" label="银行账号" align="center" width="200"> </el-table-column>
    <el-table-column prop="openAccountNum" label="银行行号" align="center" width="200"> </el-table-column>
    <el-table-column label="营业执照" align="center" width="80">
      <template slot-scope="scope">
        <i class="el-icon-download" v-if="scope.row.fileUrl" title="下载" @click="downLoad(scope.row.fileUrl)"></i>
      </template>
    </el-table-column>
  </el-table>
  <!-- </el-collapse-item>
  </el-collapse> -->
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      loading: false,
      activeNames: ["1"],
      companyList: [],
    };
  },
  mounted() {
    this.companyDataList();
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    downLoad(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
    },
    companyDataList() {
      this.loading = true;
      this.$http.get("/SupSubCompany/GetSupSubCompaniesList", { params: { baseGuid: this.id } }).then((res) => {
        this.companyList = res.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}

.layui-table {
  width: 100%;
  background-color: #fff;
  color: #666;
  border-top: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}

.layui-table td,
.layui-table th {
  position: relative;
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}

.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: rgba(0, 0, 0, 0.03);
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
</style>
