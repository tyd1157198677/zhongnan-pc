<template>
    <div>
      <table class="layui-table el-table__body">
        <tbody>
        <tr>
          <td style="width: 15%" class="right">单位名称：</td><td style="width: 85%">{{ form.comFullName }}</td>
          <td></td>
          <td></td>
          <!-- <td style="width: 15%" class="right">承接主体名称：</td><td style="width: 35%">{{ form.comMainName }}</td> -->
        </tr>
        <tr>
          <td class="right">注册地址：</td><td>{{ form.registerAddr }}</td>
          <td class="right">办公地址：</td><td>{{ form.address }}</td>
        </tr>
        <tr>
          <td class="right">考察分类：</td>
          <td>
            {{ form.supCateName }}
            <!--<el-input v-model="form.supCateName">-->
              <!--<el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
            <!--</el-input>-->
          </td>
          <td class="right">资质等级：</td>
          <td>
            <!-- {{ form.cerNames }} -->
            {{ziZhiName}}
            <!--<el-input v-model="this.ziZhiName">-->
              <!--<el-button slot="append" icon="el-icon-search" @click="flag2=true"></el-button>-->
            <!--</el-input>-->
          </td>
        </tr>

        <tr>
          <td class="right">合作意愿：</td>
          <td>
            {{ form.cooperStatus }}
            <!--<el-select v-model="form2.cooperStatus">-->
              <!--<el-option label="请选择" value=""></el-option>-->
              <!--<el-option label="强烈" value="强烈"></el-option>-->
              <!--<el-option label="一般" value="一般"></el-option>-->
            <!--</el-select>-->
          </td>
          <td class="right">考察结果：</td>
          <td>
            {{ form.invesResult }}
            <!--<el-select v-model="form2.invesResult">-->
              <!--<el-option label="请选择" value=""></el-option>-->
              <!--<el-option label="合格" value="合格"></el-option>-->
              <!--<el-option label="不合格" value="不合格"></el-option>-->
            <!--</el-select>-->
          </td>
        </tr>

        <tr>
          <td class="right">考察项目类型：</td>
          <td>
            {{ form.projectType }}
            <!--<el-select v-model="form2.projectType">-->
              <!--<el-option-->
                <!--v-for="item in projectTypes"-->
                <!--:key="item"-->
                <!--:label="item"-->
                <!--:value="item"-->
              <!--&gt;</el-option>-->
            <!--</el-select>-->
          </td>

          <td class="right">考察主题：</td>
          <td>
            {{ form.masterName }}
            <!--<el-input v-model="form.masterName"></el-input>-->
          </td>
        </tr>
        </tbody>
      </table>

      <!--<el-button type="primary" size="small" @click="tiJiao" style="float: right;margin-top: 10px;margin-right: 10px;">保存考察主题信息</el-button>-->
      <el-dialog :visible.sync="flag1" title="选择考察分类" >
        <project-tree @itemClick="onChangeKind"/>
      </el-dialog>
      <el-dialog :visible.sync="flag2" title="选择资质">
        <zi-zhi @itemClick="onChangeKind2"/>
      </el-dialog>
    </div>
</template>

<script>
  import ProjectTree from "../components/ProjectTree";
  import ziZhi from "../components/ziZhi";
export default {
  components: {
    ProjectTree,ziZhi
  },
    data() {
        return {
          projectType:'',
          loading: false,
          masterId:'',
          flag1:false,
          flag2:false,
          projectTypes:[],
            form: {
              id: "",
              creatorUserId: 0,
              reportType: "",
              startUserName: "",
              masterName: "",
              supCate: "",
              supCateName: "",
              cerNames: "",
              tempId: "",
              tempName: "",
              editUser: "",
              editUserName: "",
              startDate: "",
              endDate: "",
              scope: "",
              remark: "",
              invesReason: "",
              invesStatus: "",
              bidProjectName: ""
            },
          form2: {
            id: "",
            supGuid: "",
            supCate: "",
            projectType: "",
            cooperStatus: "",
            invesResult: "",
            cerIds: [],
          },
          ziZhi:"",
          ziZhiName:""
        }
    },
    mounted() {
      var id = this.$route.query.id
      this.form2.supGuid = this.$route.query.supGuid
      this.$api.invest.GetLianDoInvesMasterProjectType().then(res => {
        this.projectTypes = res;
      })
      this.$api.invest.GetSupplierCertificate({masterId:id}).then(res => {
        if(res.length>0){
          this.ziZhiName = res[0].text
        }
      })
      this.$api.invest.GetLianDoInvesSupplierById({id:id}).then(res => {
        this.form = res;
      })
    },
    methods: {
      
      tiJiao(){
        this.$confirm("确认要提交考察信息吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.form2.cerIds=[this.ziZhi];
          this.$api.invest.SaveLianDoInvesMaster(this.form2).then(res => {
            if(res.success) {
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$msg({ type: "info", message: "已取消删除", });
        });

      },
      onChangeKind(kind) {
        this.form.supCate = kind.id
        this.form.supCateName = kind.cateName
        this.form2.supCate = kind.id
        this.flag1 = false
      },
      onChangeKind2(kind) {
        this.ziZhi = kind.id
        this.ziZhiName = kind.cerNames
        this.flag2 = false
      },
    }
}
</script>
</style>
