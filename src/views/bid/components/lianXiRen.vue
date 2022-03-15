<template>
  <div>
    <el-dialog width="70%" title="联系人信息" :visible.sync="dialogVisible">
      <el-table :data="lianxirenlist" ref="multipleTable" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :selectable="checkSelectable"> </el-table-column>
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column prop="personName" label="姓名" align="center"> </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center"> </el-table-column>
        <el-table-column prop="mobile" label="是否在职" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.inWork ? "在职" : "不在职" }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm(selectList)" size="small">确 定</el-button>
      </div>
    </el-dialog>
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
      lianxirenlist: [],
      dialogVisible: false,
    };
  },
  mounted() {
    // this.lianxirenDataList();
  },
  methods: {
    checkSelectable(row) {
      return row.inWork;
    },
    open() {
      this.dialogVisible = true;
      this.lianxirenDataList();
    },
    close() {
      this.dialogVisible = false;
    },
    lianxirenDataList() {
      this.$api.SupContacter.GetSupplierContacters(this.id)
        .then(res => {
          this.lianxirenlist = res;
        })
        .finally(() => {});
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    submitForm(val) {
      if (val.length > 0) {
        let personArr = val.map(item => item.id);
        let postData = {
          ids:personArr,
          masterId : this.$route.query.id
        }

        this.$http.post("/SupQua/SendMessageToSupplier", postData).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.dialogVisible = false;
          } else {
            this.$message.warning(res.data.message);
          }
        });
      } else {
        this.$message.warning("请选择联系人!");
      }
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
