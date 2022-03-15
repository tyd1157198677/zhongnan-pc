// 拟派驻场项目负责人来公司前的履历
<template>
    <div>
      <i v-if="isEdit==1" class="el-icon-circle-plus" @click="addGongFang" style="float: right;margin-right: 10px;margin-bottom: 3px;font-size: 28px;"></i>
      <el-table
        empty-text="暂无数据"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData2"
        v-loading="loading"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="column1" label="单位名称"></el-table-column>
        <el-table-column prop="column2" label="职位"> </el-table-column>
        <el-table-column prop="column3" label="年限" > </el-table-column>
        <el-table-column prop="column4" label="城市" > </el-table-column>
        <el-table-column prop="column5" label="参与过几个项目" > </el-table-column>
        <el-table-column prop="column6" label="项目类型" > </el-table-column>
        <el-table-column label="操作" align="center" v-if="isEdit==1">
          <template slot-scope="scope">
            <i @click="edit1(scope.row)" class="el-icon-edit" title="编辑" style="margin-left:5px" />
            <i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="flag" :title="dailogTitle" width="50%">
        <el-form
          ref="formgongfang"
          :inline="true"
          label-width="130px"
          :model="formgongfang"
          :rules="rules"
          class="m-3">
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位名称" prop="column1">
                <el-input v-model="formgongfang.column1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职位" prop="column2">
                <el-input v-model="formgongfang.column2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row> 
            <el-col :span="12">
              <el-form-item label="年限" prop="column3">
                <el-input v-model="formgongfang.column3" maxlength="11"
                      ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="城市" prop="column4">
                <el-input v-model="formgongfang.column4"  type="email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row> 
            <el-col :span="12">
              <el-form-item label="参与过几个项目" prop="column5">
                <el-input v-model="formgongfang.column5" maxlength="11"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目类型" prop="column5">
                <el-input v-model="formgongfang.column6" maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="right" style="margin-bottom:20px">
            <el-button type="primary" size="small" class="buttoncss" @click="saveadd('formgongfang')" style="float:right">暂存信息</el-button>
              <el-button type="default" size="small" class="buttoncss" @click="flag = false" style="float:right;margin-right:10px">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>

const TABLE_MAJOR_TYPE = '拟派驻场项目负责人来公司前的履历'

export default {
  name:'lvli',
  props:['type'],
  data() {
      return {
        isEdit: 0, // 1:编辑，2：详情
        dailogTitle:"",
        tableData2:[],
        loading: false,
        flag:false,
        formgongfang:{
          id:'',
          masterId:this.$route.query.id,
          type:'',
          column1: "",
          column2: "",
          column3: "",
          column4: "",
          column5: "",
          column6: "",
        },
        rules: {
          column1: [
            { required: true, message: '必填项',trigger: 'blur' },
          ],
          column2: [
            { required: true, message: '必填项',trigger: 'blur' },
          ],
          column3: [
            { required: true, message: '必填项',trigger: 'blur' },
          ],
          column4: [
            { required: true, message: '必填项',trigger: 'blur' },
          ],
          column5: [
            { required: true, message: '必填项',trigger: 'blur' },
          ],
          column6: [
            { required: true, message: '必填项',trigger: 'blur' },
          ],
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
    getList() {
      this.$http
        .get("/InvesLianDoMaster/GetInvesMajorTypeList", {
          params: {
            masterId: this.$route.query.id,
            type: this.type,
            tableMajorType: TABLE_MAJOR_TYPE
          },
        })
        .then(res => {
          this.tableData2 = res.data;
        });
    },
    addGongFang(){
      this.clear()
      this.dailogTitle = "新增"
      this.flag = true;
    },
    saveadd(){
        this.$refs.formgongfang.validate(valid => {
      if (valid) {
        this.formgongfang.tableMajorType = TABLE_MAJOR_TYPE
        this.formgongfang.type = this.type
        this.$http.post("/InvesLianDoMaster/SaveInvesMajorTypeTable",this.formgongfang).then(res => {
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
        this.$http.post("/InvesLianDoMaster/DeleteInvesMajorTypeTable",{id:id}).then(res => {
          if(res.status ==200) {
            this.$message.success(res.data.message);
            this.getList()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$msg({ type: "info", message: "已取消删除", });
      });
    },
    edit1(row){
      this.dailogTitle = "编辑"
      this.flag = true;
      this.formgongfang = row;
    },
    clear(){
      this.formgongfang={
        masterId:this.$route.query.id,
        type:this.type,
        column1: "",
        column2: "",
        column3: "",
        column4: "",
        column5: "",
        column6: "",
      }
    },
  }
}
</script>


