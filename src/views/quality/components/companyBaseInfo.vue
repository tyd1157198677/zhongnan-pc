<template>
  <div>
    <div style="display: flex;justify-content: flex-end;padding-right:10px;">
      <div v-show="isEdit == 1">
        <b style="font-size:16px;"> 供应商是否可编辑资格预审信息： </b>
        <el-radio-group class="r_group" @change="handleEdit" style="margin-top:8px;font-size:20px;" v-model="base.supCanEdit">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div>
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td class="right">总公司单位名称：</td>
            <td colspan="7"><span>{{ base.comFullName }}</span></td>
          </tr>
          <tr>
            <td class="right"> 成立时间：</td>
            <td class="center">{{ base.registDate }}</td>
            <td class="right"> 注册资金：</td>
            <td class="center">
              <span v-if="base.regCapital + base.regCapitalType == NaN"></span>
              <span v-else>{{ base.regCapital + base.regCapitalType }}</span>
            </td>
            <td class="right">企业性质：</td>
            <td class="center">{{ base.companyType }}</td>
            <td class="right">资质：</td>
            <td class="center tdLine" :title="base.certificates">
              <div class="diandiandian">{{ base.certificates }}</div>
            </td>
          </tr>
          <tr>
            <td class="right">办公地址：</td>
            <td colspan="7"> {{ base.address }}</td>
          </tr>
          <tr>
            <td class="right">主营范围：</td>
            <td colspan="7">
              <span>{{ base.businessDomain }}</span>
              <!-- <span v-if="isEdit == 2 && !base.supCanEdit">{{ base.businessDomain }}</span> -->
              <!-- <el-input
                v-if="isEdit == 1"
                v-model="base.businessDomain"
                placeholder="如总包、桩基、门窗、幕墙、消防、市政、电力、景观工程等"
              ></el-input> -->
            </td>
          </tr>
          <tr>
            <td class="right">主营区域：</td>
            <td colspan="7"> {{ base.businessAreas }}</td>
          </tr>
          <tr>
            <td colspan="8">
              <el-input type="textarea" :rows="2" v-model="base.supplierInfoDesc" placeholder="请输入公司基本介绍"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="btns">
        <el-button v-if="isEdit == 1" type="primary" size="mini" @click="save1">暂存信息</el-button>
      </div>
    </div>

    <div>
      <el-form label-position="center" ref="saveSupForm" size="small" class="border p-2 mb-2 mt-2" :model="formSearch">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="资格预审主题:">
              <el-input
                maxlength="30"
                show-word-limit
                placeholder="针对我司哪个城市项目哪个分部分项工程组织进行的资格预审，如**城市**地区**期区/批次**工程(必填)"
                v-if="isEdit == 1"
                v-model="formSearch.masterName"
              />
              <span v-else>{{ formSearch.masterName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所属专业:" prop="supCateName">
              <el-input
                placeholder="请选择所属专业(必填)"
                v-if="isEdit == 1"
                ref="supCateName"
                v-model="formSearch.supCateName"
                @focus="categoryVisible = true"
              />
              <span v-else>{{ formSearch.supCateName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="项目:">
              <el-input placeholder="请选择项目" v-if="isEdit == 1" v-model="formSearch.projectName" @focus="subJectAdd" />
              <span v-else>{{ formSearch.projectName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="供应商推荐人:" prop="userName">
              <el-input placeholder="请选择供应商推荐人" v-if="isEdit == 1" ref="userName" v-model="formSearch.userName" @focus="onAdd" />
              <span v-else>{{ formSearch.userName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所属城市:" prop="cityName">
              <el-input placeholder="请选择所属城市(必填)" v-if="isEdit == 1" ref="city" v-model="formSearch.cityName" @focus="cityAdd" />
              <span v-else>{{ formSearch.cityName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="资格预审结果:">
              <el-select  v-if="isEdit == 1" v-model="formSearch.QuaResult" >
                <el-option label="请选择" value=""></el-option>
                <el-option label="通过" value="通过"></el-option>
                <el-option label="未通过" value="未通过"></el-option>
              </el-select>
              <span v-else>{{formSearch.QuaResult}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btns">
        <el-button v-if="isEdit == 1" type="primary" size="mini" @click="save9">暂存信息</el-button>
      </div>
    </div>

    <el-dialog :visible.sync="categoryVisible">
      <!-- title="选择招标专业" -->
      <category-tree @itemClick="onChangeCategory" />
    </el-dialog>
    <!-- title="选择招标专业" -->
    <lianXiRen :id="baseGuid" ref="lianXiRen" />
    <!-- <el-dialog title="选择所属城市" :visible.sync="categoryVisibleCity"> -->
    <city-tree :cityId="formSearch.cityId" ref="cityTree" @itemClick="cityTree"></city-tree>
    <!-- </el-dialog> -->
    <user-select title="供应商推荐" ref="userSelect" @itemClick="onUserAdd"></user-select>
    <subJectTree title="项目" :level="2" ref="subJectTree" @itemClick="subJectTree"></subJectTree>

  </div>
</template>

<script>
import lianXiRen from "@/views/bid/components/lianXiRen";
import UserSelect from "@/views/bid/components/UserSelect";
import cityTree from "@/views/bid/components/cityList";
import subJectTree from "@/views/bid/components/subJectTree";
import CategoryTree from "@/views/bid/components/CategoryTree";

export default {
  components: {
    lianXiRen,
    UserSelect,
    cityTree,
    subJectTree,
    CategoryTree,

  },
  data() {
    return {
      id:'',
      baseGuid:'',
      isEdit: 0, // 1:编辑，2：详情
      base: {
        supCanEdit: false,
        supplierInfoDesc: "",
        businessDomain: "",
      },

      formSearch: {
        masterName: "",
        projectId: "",
        userId: "",
        categoryId: "",
        cityId: [],
        supCateName: "",
        cityName: "",
        userName: "",
        projectName: "",
        QuaResult: "",
      },

      categoryVisible:false,

    };
  },
  beforeMount() {
    this.id = this.$route.query.id;
    this.isEdit = this.$route.query.type;
  },
  mounted(){
    this.GetQuaMessage();
  },
  methods: {
    //公司基本信息
    async GetQuaMessage() {
      let res = await this.$http.get("/SupQua/GetQuaMessage", { params: { masterId: this.id } });
      res.data.result.registDate = res.data.result.registDate ? res.data.result.registDate.split("T")[0] : "";
      this.base = res.data.result;
      this.achFile = res.data.result.achFile;
      this.baseGuid = res.data.result.supId;

      this.formSearch.projectId = this.base.projectId;
      this.formSearch.projectName = this.base.projectName;
      this.formSearch.masterName = this.base.masterName;
      this.formSearch.userId = this.base.userId;
      this.formSearch.userName = this.base.userName;
      this.formSearch.QuaResult = this.base.quaResult;

      this.formSearch.cityId = this.base.cityList.map(item => item.id);
      this.formSearch.cityName = this.base.cityList.map(item => item.cityName).toString();

      this.formSearch.supCateName = this.base.categoryName;
      this.formSearch.categoryId = this.base.categoryId;
    },
    handleEdit() {
      this.$http.post("/SupQua/OpenSupplierWrite", { id: this.id, SupCanEdit: this.base.supCanEdit }).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetQuaMessage();
        } else {
          this.$message.error(res.data.message);
        }
      });
      if (this.base.supCanEdit) {
        this.$refs.lianXiRen.open();
      }
    },
    // 对接公司信息保存
    save1() {
      let obj = {
        masterId: this.id,
        supplierInfoDesc: this.base.supplierInfoDesc,
      };
      if (this.base.supplierInfoDesc) {
        this.$http.post("/SupQua/SaveSupplierInfoDesc", obj).then(res => {
          let data = res.data;
          if (data.success) {
            this.$message.success(data.message);
            this.GetQuaMessage();
          } else {
            this.$message.error(data.message);
          }
        });
      } else {
        this.$message.warning("请输入公司基本介绍");
      }
    },
    

    // 保存 资格预审主题、及专业
    save9() {
      let formSearch = this.formSearch;
      if (formSearch.supCateName == "") {
        this.$message.warning("请选择专业！");
      } else if (formSearch.masterName == "") {
        this.$message.warning("请填写资格预审主体名称！");
      } else if (formSearch.cityName == "") {
        this.$message.warning("请选择所属城市！");
      } else {
        let obj = {
          masterId: this.id,
          masterName: formSearch.masterName,
          categoryId: formSearch.categoryId,
          projectId: formSearch.projectId,
          userId: formSearch.userId,
          cityCode: formSearch.cityId,
          quaResult: formSearch.QuaResult,
        };
        this.$http.post("/SupQua/SubmitSupplierQua", obj).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetQuaMessage();
          } else {
            this.$msg.error(res.data.message);
          }
        });
      }
    },

    onUserAdd(user) {
      this.formSearch.userId = user.userGuid;
      this.$refs.userSelect.close();
      this.formSearch.userName = user.userName;
    },
    cityTree(city) {
      // console.log(city);
      this.formSearch.cityId = city.map(item => item.cityId);
      this.formSearch.cityName = city.map(item => item.cityName).toString();
      this.$refs.cityTree.close();
    },
    subJectTree(sub) {

      if(sub.orgType ==="组织"){
        this.$confirm(`《${sub.projectShortName}》是组织类型,不符合要求,请重新选择!`, '提示', {
          showCancelButton:false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        return
      }

      this.formSearch.projectId = sub.id;
      this.formSearch.projectName = sub.projectFullName;
      this.$refs.subJectTree.close();
    },
    onChangeCategory(category) {
      this.formSearch.supCateName = category.cateName;
      this.formSearch.categoryId = category.id;
      this.categoryVisible = false;
    },
    cityAdd() {
      this.$refs.cityTree.open();
    },
    onAdd() {
      this.$refs.userSelect.open();
    },
    subJectAdd() {
      this.$refs.subJectTree.open();
    },



  },
};
</script>

<style scoped>
.btns {
  margin: 10px 0;
  text-align: right;
}
</style>
