<template>
    <div>
      <table class="layui-table el-table__body">
        <tbody>
        <tr>
          <td style="width: 15%" class="right">单位名称：</td><td style="width: 35%">{{ form.comFullName }}</td>
          <td></td>
          <td></td>
          <!-- <td style="width: 15%" class="right">承接主体名称：</td><td style="width: 35%">{{ form.comMainName }}</td> -->
        </tr>
        <tr>
          <td class="right">注册地址：</td><td>{{ form.registerAddr }}</td>
          <td class="right">办公地址：</td><td>{{ form.address }}</td>
        </tr>

        <tr>
          <td style="width: 15%" class="right">注册资金：</td><td style="width: 35%">{{ form.regCapital }}{{form.regCapitalType}}</td>
          <td style="width: 15%" class="right">成立时间：</td><td style="width: 35%">{{form2.registDate}}</td>
        </tr>
        <tr>
          <td class="right">企业性质：</td>
          <td colspan="3"> {{form.companyType}}</td>
        </tr>
        <tr>
          <td class="right"><i style="margin-right: 4px;color: red">*</i>考察分类：</td>
          <td v-if="isEdit==1" @click="flag1=true">
            <el-input v-model="form.supCateName" :disabled="true">
              <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>
            </el-input>
          </td>
          <td v-else>{{form.supCateName}}</td>
          <td class="right">资质等级：</td>
          <td v-if="isEdit==1" @click="flag2=true">
            <el-input v-model="this.ziZhiName" :disabled="true">
              <el-button slot="append" icon="el-icon-search" @click="flag2=true"></el-button>
            </el-input>
          </td>
          <td v-else>{{this.ziZhiName}}</td>
        </tr>

        <tr>
          <td class="right"><i style="margin-right: 4px;color: red">*</i>合作意愿：</td>
          <td>
            <el-select v-model="form2.cooperStatus" :disabled="isEdit==2">
              <el-option
                v-for="item in table1.cooperStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
<!--              <el-option label="请选择" value=""></el-option>-->
<!--              <el-option label="强烈" value="强烈"></el-option>-->
<!--              <el-option label="一般" value="一般"></el-option>-->
            </el-select>
          </td>
          <td class="right"><i style="margin-right: 4px;color: red">*</i>考察结果：</td>
          <td>
            <el-select v-model="form2.invesResult" :disabled="isEdit==2">
              <el-option
                v-for="item in table1.invesResult"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
<!--              <el-option label="请选择" value=""></el-option>-->
<!--              <el-option label="合格" value="合格"></el-option>-->
<!--              <el-option label="不合格" value="不合格"></el-option>-->
            </el-select>
          </td>
        </tr>
        <tr v-if="form2.invesResult == '考察未通过'">
          <td class="right" >未通过原因：</td>
          <td colspan="3"  v-if="isEdit==1">
            <el-input v-model="form2.loseReason" ></el-input>
          </td>
          <td v-else>{{form2.loseReason}}</td>
        </tr>
        <tr>
          <td class="right"><i style="margin-right: 4px;color: red">*</i>考察项目类型：</td>
          <td>
            <el-select v-model="form2.projectType" :disabled="isEdit==2">
              <el-option
                v-for="item in table1.projectType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td class="right"><i style="margin-right: 4px;color: red">*</i>考察主题：</td>
          <td v-if="isEdit==1">
            <el-input v-model="form.masterName" :disabled="isEdit==2"></el-input>
          </td>
          <td v-else>{{form.masterName}}</td>
        </tr>
        <tr>
          <td class="right">意向城市：</td>
          <td colspan="3" v-if="isEdit==1">
            <el-input placeholder="请选择意向城市" ref="city" v-model="form2.wantCities" @focus="cityAdd" :disabled="isEdit==2" />
          </td>
          <td v-else>{{form2.wantCities}}</td>
        </tr>

        </tbody>
      </table>
      <el-button v-if="isEdit==1" type="primary" size="small" @click="tiJiao" style="float: right;margin-top: 10px;margin-right: 10px;">保存考察主题信息</el-button>
      <el-dialog :visible.sync="flag1" title="选择考察分类" width="35%" height="400px;">
        <project-tree @itemClick="onChangeKind"/>
      </el-dialog>
      <el-dialog :visible.sync="flag2" title="选择资质" width="35%">
        <zi-zhi @itemClick="onChangeKind2"/>
      </el-dialog>
      <city-tree :cityId="[]"  ref="cityTree" @itemClick="cityTree"></city-tree>
    </div>
</template>

<script>
  import ProjectTree from "../components/ProjectTree";
  import ziZhi from "../components/ziZhi";
  import cityTree from "@/views/bid/components/cityList";
  import dayjs from "dayjs";
export default {
  components: {
    ProjectTree,ziZhi,cityTree
  },
    data() {
        return {
          isEdit: 0, // 1:编辑，2：详情 
          projectType:'',
          loading: false,
          masterId:'',
          flag1:false,
          flag2:false,
          cooperStatusall:[
            {
              value: '强烈',
              label: '强烈'
            }, {
              value: '一般',
              label: '一般'
            },
          ],
          invesResultall:[
            {
              value: '合格',
              label: '合格'
            }, {
              value: '不合格',
              label: '不合格'
            },
          ],
          projectTypes:[],
            form: {
              id: "",
              creatorUserId: 0,
              reportType: "",
              startUserName: "",
              masterName: "",
              supCate: "",
              supCateName: "",
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
              bidProjectName: "",
              projectType:"",
            },
          form2: {
            id: this.$route.query.id,
            supGuid: "",
            supCate: "",
            projectType: "",
            cooperStatus: "",
            invesResult: "",
            cerIds: [],
            masterName:'',
            loseReason:"",
            wantCities:''
          },
          ziZhi:"",
          ziZhiName:"",
          table1:{}
        }
    },
    mounted() {
      this.isEdit = this.$route.query.type;
      this.form2.supGuid = this.$route.query.supGuid
this.GetLianDoInvesSupplierById()
      this.$api.invest.GetSupplierCertificate({masterId:this.$route.query.id}).then(res => {
        if(res.length>0){
          this.ziZhiName = res[0].text
          this.ziZhi = res[0].value
        }
      })
this.$api.invest.GetLianDoInvesDropDown().then(res => {
        this.table1 = res;})
    },
    methods: {
      GetLianDoInvesSupplierById(){
        this.$api.invest.GetLianDoInvesSupplierById({id:this.$route.query.id}).then(res => {
          this.form = res;
          this.form2.cooperStatus = res.cooperStatus
          this.form2.invesResult = res.invesResult
          this.form2.supCate = res.supCate
          this.form2.wantCities = res.wantCities
          this.form2.projectType = res.projectType
          // this.form2.registDate = res.creationTime ? res.creationTime.split("T")[0] : "";
          this.form2.registDate = res.registDate ? dayjs(res.registDate).format("YYYY年MM月DD日"):'';
          this.form2.loseReason = res.loseReason;
      })
      },
      tiJiao(){
        if(!this.form2.supCate||!this.form2.cooperStatus||!this.form2.invesResult||!this.form.masterName||this.form2.projectType=='请选择'){
          this.$message.error("请将必填项写完整")
          return
        }
        console.log(this.form2.cooperStatus);
        if(this.ziZhi == ''){
          this.form2.cerIds=[];
        }else{
          this.form2.cerIds=[this.ziZhi];
        }
          this.form2.masterName = this.form.masterName
          this.$api.invest.SaveLianDoInvesMaster(this.form2).then(res => {
            if(res.success) {
              this.$message.success(res.message);
              this.GetLianDoInvesSupplierById()
            } else {
              this.$message.error(res.message)
            }
          })
      },
      cityAdd() {
      this.$refs.cityTree.open();
    },
    cityTree(city) {
      console.log(city);
      // this.formSearch.cityId = city.map(item => item.cityId);
      this.form2.wantCities = city.map(item => item.cityName).join("、");
      this.$refs.cityTree.close();
    },
      onChangeKind(kind) {
        this.form.supCate = kind.id
        this.form.supCateName = kind.cateName
        this.form2.supCate = kind.id
        this.flag1 = false
      },
      onChangeKind2(kind) {
        this.ziZhi = kind.id
        this.ziZhiName = kind.cateName
        this.flag2 = false
      },
    }
}
</script>
</style>
