<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
            <span class="infonametits">联系人信息</span>
        </template>
        <el-table :data="lianxirenlist" ref="multipleTable" border>
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column prop="personName" label="姓名" align="center"> </el-table-column>
          <el-table-column prop="workAs" label="职务" align="center"> </el-table-column>
          <el-table-column prop="phone" label="座机" align="center"> </el-table-column>
          <el-table-column prop="mobile" label="手机号" align="center"> </el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"> </el-table-column>
          <el-table-column prop="isHeadPerson" label="主要联系人" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isHeadPerson">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="备注" align="center"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "lianxiren",
    props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeNames: ['1'],
      lianxirenlist: []
    }
  },
  mounted() {
    this.lianxirenDataList();
  },
  methods: {
    lianxirenDataList() {
      this.$api.SupContacter.GetSupplierContacters(this.id)
        .then(res => {
          this.lianxirenlist = res;
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
        border-top: 1px solid #EBEEF5;
        border-right: 1px solid #EBEEF5;
    }

    .layui-table td, .layui-table th {
        position: relative;
        padding: 9px 15px;
        min-height: 20px;
        line-height: 20px;
        font-size: 14px;
        border-left: 1px solid #EBEEF5;
        border-bottom: 1px solid #EBEEF5;
    }
    
    .el-collapse-item__header {
        display: flex;
        align-items: center;
        height: 48px;
        line-height: 48px;
        background-color: rgba(0,0,0,.03);
        color: #303133;
        cursor: pointer;
        border-bottom: 1px solid #EBEEF5;
        font-size: 13px;
        font-weight: 500;
        transition: border-bottom-color .3s;
        outline: 0;
    }
</style>
