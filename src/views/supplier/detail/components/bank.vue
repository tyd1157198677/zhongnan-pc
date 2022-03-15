<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="infonametits">银行信息</span>
        </template>
        <el-table :data="datalist" ref="multipleTable" border>
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column prop="bankOpenName" label="开户名称" align="center"> </el-table-column>
          <el-table-column prop="bankName" label="开户银行" align="center"> </el-table-column>
          <el-table-column prop="bankAccount" label="银行账号" align="center"> </el-table-column>
          <el-table-column prop="openAccountNum" label="银行行号" align="center"> </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "bank",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      datalist: [],
      activeNames: ["1"],
    };
  },
  mounted() {
    this.getBank();
  },
  methods: {
    getBank() {
      this.$http
        .get("/SupBankInfo/GetSupBankList", { params: { baseGuid: this.$route.params.id } })
        .then((res) => {
          this.datalist = res.data.supBanks;
        })
        .finally(() => {});
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
