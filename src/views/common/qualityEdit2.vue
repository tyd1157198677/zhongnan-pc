<template>
  <div>
    <div class="btn1" v-if="isEdit==1">
      <div>{{ message }}</div>
      <el-button type="primary" size="mini" @click="addGongFang">新增联系人</el-button>
    </div>
     <el-table
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="tableData2"
      v-loading="loading"
    >
      <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column prop="personName" label="姓名"></el-table-column>
      <el-table-column prop="workAs" label="职务"> </el-table-column>
      <el-table-column prop="mobile" label="联系方式" > </el-table-column>
      <el-table-column prop="email" label="邮箱" > </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope"  v-if="isEdit==1">
          <i @click="edit1(scope.row)" class="el-icon-edit" title="编辑" style="margin-left:5px" />
          <i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="flag" title="接洽人员信息" width="80%">
      <el-form label-position="right" class="m-3" ref="formgongfang" size="small" label-width="120px" :model="formgongfang" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="personName">
              <el-input v-model="formgongfang.personName" placeholder="请输入分联系人姓名" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="职务" prop="workAs" >
              <el-select v-model="formgongfang.workAs" placeholder="请选择" style="width:100%">
                <el-option label="董事长" value="董事长"></el-option>
                <el-option label="总经理-总公司" value="总经理-总公司"></el-option>
                <el-option label="经营部负责人-总公司" value="经营部负责人-总公司"></el-option>
                <el-option label="项目现场负责人" value="项目现场负责人"></el-option>
                <el-option label="实际承包人（如有）" value="实际承包人"></el-option>
                <el-option label="总经理-分公司" value="总经理-分公司"></el-option>
                <el-option label="经营部负责人——分公司" value="经营部负责人—分公司"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="formgongfang.mobile" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="座机">
              <el-input v-model="formgongfang.phone" placeholder="请输入座机" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱">
              <el-input v-model="formgongfang.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
<!--          <el-col :span="8">-->
<!--            <el-form-item label="是否主要联系人">-->
<!--              <el-select v-model="formgongfang.isHeadPerson" placeholder="请选择">-->
<!--                <el-option label="是" :value="true"></el-option>-->
<!--                <el-option label="否" :value="false"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="24" class="right" style="margin-bottom:20px">
            <el-button type="primary" size="small" class="buttoncss" @click="saveadd('formgongfang')" style="float:right">保存信息</el-button>
            <el-button type="default" size="small" class="buttoncss" @click="flag = false" style="float:right;margin-right:10px">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
<!--      <el-form-->
<!--        ref="formgongfang"-->
<!--        :inline="true"-->
<!--        label-width="100px"-->
<!--        :model="formgongfang"-->
<!--        :rules="rules"-->
<!--        class="m-3">-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="联系人姓名" prop="personName">-->
<!--              <el-input v-model="formgongfang.personName"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="职务" prop="workAs">-->
<!--              <el-input v-model="formgongfang.workAs"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="联系方式" prop="mobile">-->
<!--              <el-input v-model="formgongfang.mobile" maxlength="11"-->
<!--                    ></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="邮箱" prop="email">-->
<!--              <el-input v-model="formgongfang.email"  type="email"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="24" class="right" style="margin-bottom:20px">-->
<!--          <el-button type="primary" size="small" class="buttoncss" @click="saveadd('formgongfang')" style="float:right">保存信息</el-button>-->
<!--            <el-button type="default" size="small" class="buttoncss" @click="flag = false" style="float:right;margin-right:10px">取消</el-button>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-form>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },

  },
    data() {
        return {
          isEdit: 0, // 1:编辑，2：详情
          tableData2:[],
          loading: false,
          flag:false,
          formgongfang:{
            id:'',
            masterId:this.$route.query.id,
            personName: "",
            mobile: "",
            phone:"",
            email: "",
            workAs:"",
          },
          rules: {
            personName: [
              { required: true, message: '请输入联系人',trigger: 'blur' },
            ],
            mobile: [
              { required: true, message: '请输入手机号',trigger: 'blur' },
              { pattern: /^1[3-9]\d{9}$/, message: "手机号格式错误",trigger: "blur"},
            ],
             email:[
               { required: true, message: '请输入邮箱号',trigger: 'blur' },
            //  {validator:(rule,value,callback)=>{
            //    if (value === '') {
            //       callback(new Error('请输入邮箱号'));
            //     }
            //  else {
            //     let reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            //       if(!reg.test(value)){
            //           callback(new Error('请输入正确的邮箱格式！'));
            //      }
	          //    }
            //  },trigger: "blur"}
            ],
            workAs: [
              { required: true,message: '请输入职务', trigger: 'blur' }
            ]
          }
        }
    },
    beforeMount(){
      this.isEdit = this.$route.query.type;
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
      saveadd(){
         this.$refs.formgongfang.validate(valid => {
        if (valid) {
          this.$http.post("/InvesLianDoMaster/SaveInvesContactInfo",this.formgongfang).then(res => {
            if(res.status ==200) {
              this.$message.success(res.data.message);
              this.getList()
              this.flag = false;
              this.clear();
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      });
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
<style scoped>
.btn1 {
  background: #ffe793;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  padding-left: 10px;
  font-size: 15px;
}
</style>
