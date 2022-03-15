<template>
    <div>
      <!--<i class="el-icon-circle-plus" @click="addGongFang" style="float: right;margin-right: 10px;margin-bottom: 3px;font-size: 28px;"></i>-->
      <el-table
        empty-text="暂无数据"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData2"
        v-loading="loading"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="personName" label="对接人"></el-table-column>
        <el-table-column prop="mobile" label="手机"> </el-table-column>
        <el-table-column prop="phone" label="座机"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="email" label="职务"> </el-table-column>
        <!--<el-table-column label="操作" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<i @click="edit1(scope.row)" class="el-icon-edit" title="编辑" style="margin-left:5px" />-->
            <!--<i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>

      <el-dialog :visible.sync="flag" title="供应商人员信息" width="50%">
        <el-form
          ref="formgongfang"
          :inline="true"
          label-width="100px"
          :model="formgongfang"
          class="m-3">
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人姓名" prop="personName">
                <el-input v-model="formgongfang.personName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="座机" prop="phone">
                <el-input v-model="formgongfang.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机" prop="mobile">
                <el-input v-model="formgongfang.mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="formgongfang.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="职务" prop="workAs">
                <el-input v-model="formgongfang.workAs"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="right">
            <el-form-item>
              <el-button type="primary" size="small" @click="tableshows">暂存信息</el-button>
              <el-button size="small" @click="flag = false">取消</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
          tableData2:[],
          loading: false,
          flag:false,
          formgongfang:{
            personName: "",
            mobile: "",
            phone:"",
            email: "",
            masterId:this.$route.query.id,
            workAs:"",
          }
        }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList(){
        this.$api.invest.GetInvesContactList({masterId:this.$route.query.id}).then(res => {
          this.tableData2 = res;
        })
      },
      addGongFang(){
        this.flag = true;
      },
      tableshows(){
          this.$api.invest.SaveInvesContactInfo(this.formgongfang).then(res => {
            if(res.success) {
              this.$message.success(res.message);
              this.getList()
              this.flag = false;
              this.clear();
            } else {
              this.$message.error(res.message)
            }
          })
      },
      delete1(id){
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$api.invest.DeleteSupContacterById({id:id}).then(res => {
            if(res.success) {
              this.$message.success(res.message);
              this.getList()
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$msg({ type: "info", message: "已取消删除", });
        });
      },
      edit1(row){
        this.flag = true;
        this.formgongfang = row;
      },
      clear(){
        this.formgongfang={
          personName: "",
            mobile: "",
            phone:"",
            email: "",
            masterId:this.$route.query.id,
            workAs:"",
        }
      },
    }
}
</script>
</style>
