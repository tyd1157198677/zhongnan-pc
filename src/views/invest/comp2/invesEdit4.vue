<template>
  <div>
    <table class="layui-table el-table__body">
      <tbody>
      <tr>
        <td style="width: 13%" class="right">姓名：</td><td style="width: 20%">{{form.personName}}</el-input></td>

        <td style="width: 13%" class="right">性别：</td><td style="width: 20%">
        {{form.gender}}
        </td>
        <td style="width: 14%" class="right">年龄：</td><td style="width: 20%">{{form.age}}</td>
      </tr>
      <tr>
        <td style="width: 13%" class="right">从事建筑行业年限：</td><td style="width: 20%">{{form.workYear}}</td>
        <td style="width: 13%" class="right">从事项目负责人年限：</td><td style="width: 20%">{{form.manageYear}}</td>
        <td style="width: 14%" class="right">进入公司年限：</td><td style="width: 20%">{{form.companyYear}}</td>
      </tr>

      <tr>
        <td class="right" >现场项目负责人是否具有厂房业绩：</td>
        <td colspan="5">
          {{form.factoryExperience}}
          <!--<el-select v-model="form.factoryExperience" @change="selectChanged">-->
            <!--<el-option label="请选择" value=""></el-option>-->
            <!--<el-option label="是" :value=true></el-option>-->
            <!--<el-option label="否" :value=false></el-option>-->
          <!--</el-select>-->
        </td>
      </tr>
      <tr v-if="pagename == '供方考察_总包'">
        <td class="right" >历史业绩：</td>
        <td colspan="5">
          {{form.historicalAchievement}}
        </td>
      </tr>
      </tbody>
    </table>

    <!--<el-button type="primary" size="small" @click="tiJiao" style="float: right;margin-top: 10px;margin-right: 10px;">暂存信息</el-button>-->

    <div v-if="flag1" style="margin-top: 50px;">
      项目经理厂房业绩
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
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="serviceName" label="建设单位"> </el-table-column>
        <el-table-column prop="projectType" label="项目类型及结构类型"> </el-table-column>
        <el-table-column prop="workAs" label="职务"> </el-table-column>
        <el-table-column prop="contractValue" label="合同额"> </el-table-column>
        <el-table-column prop="constructionDate" label="施工时间"> </el-table-column>
        <el-table-column prop="projectDesc" label="工程概况"> </el-table-column>
        <!--<el-table-column label="操作" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<i @click="edit1(scope.row)" class="el-icon-edit" title="编辑" style="margin-left:5px" />-->
            <!--<i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>

      <el-dialog :visible.sync="flag" title="项目经理案例" width="50%">
        <el-form
          ref="formgongfang"
          :inline="true"
          label-width="100px"
          :model="formgongfang"
          class="m-3">
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="formgongfang.projectName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="建设单位" prop="serviceName">
                <el-input v-model="formgongfang.serviceName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目类型及结构类型" prop="projectType">
                <el-input v-model="formgongfang.projectType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职务" prop="workAs">
                <el-input v-model="formgongfang.workAs"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同额" prop="contractValue">
                <el-input v-model="formgongfang.contractValue"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="施工时间" prop="constructionDate">
                <el-input v-model="formgongfang.constructionDate"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="工程概况" prop="projectDesc">
                <el-input v-model="formgongfang.projectDesc"></el-input>
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
  </div>
</template>

<script>
  export default {
    props:[
      'pagename', // 只有 pagename == 供方考察_总包 ' 才显示历史业绩 HistoricalAchievement
    ], 
    data() {
      return {
        projectType:'',
        loading: false,
        masterId:'',
        flag1:false,
        flag:false,
        projectTypes:[],
        form: {
          id: "",
          masterId: "",
          personName: "",
          gender: "",
          age: "",
          workYear: 0,
          manageYear: 0,
          companyYear: 0,
          factoryExperience: true
        },
        tableData2:[],
        formgongfang:{
          id: "",
          masterId: "",
          projectName: "",
          serviceName: "",
          projectType: "",
          workAs: "",
          contractValue: "",
          constructionDate: "",
          projectDesc: ""
        }
      }
    },
    mounted() {
      var id = this.$route.query.id
      this.$api.invest.GetInvesManagerByMasterId({masterId:id}).then(res => {
        this.form = res;
        if(this.form.factoryExperience){
          this.form.factoryExperience = '是'
          this.flag1 = true;
        }else{
          this.form.factoryExperience = '否'
        }
      })
    },
    methods: {
      getcase(){
        var id = this.$route.query.id
        this.$api.invest.GetInvesManagerCaseList({MasterId:id}).then(res => {
          this.tableData2 = res;
        })
      },
      selectChanged(value){
        if(value){
          this.flag1 = true;
          this.getcase();
        }
      },
      tiJiao(){
        this.$confirm("确认要提交吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.form.masterId=this.$route.query.id;
          this.$api.invest.SaveInvesManager(this.form).then(res => {
            if(res.success) {
              this.$message.success(res.message);
              this.form.id = res.returnValue1
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$msg({ type: "info", message: "已取消", });
        });

      },

      addGongFang(){
        this.flag = true;
      },
      tableshows(){
        this.formgongfang.masterId = this.$route.query.id;
        this.$api.invest.SaveInvesManagerCase(this.formgongfang).then(res => {
          if(res.success) {
            this.$message.success(res.message);
            this.getcase()
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
          this.$api.invest.DeleteInvesManagerCaseById({id:id}).then(res => {
            if(res.success) {
              this.$message.success(res.message);
              this.getcase()
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
          id: "",
          masterId: "",
          projectName: "",
          serviceName: "",
          projectType: "",
          workAs: "",
          contractValue: "",
          constructionDate: "",
          projectDesc: ""
        }
      },
    }
  }
</script>
</style>
