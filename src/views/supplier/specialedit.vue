<template>
  <el-main>
    <el-row id="page_main">
      <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          >特殊供方录入（零星采购类、直委类、垄断类），特殊供方审批通过后，可进行零星采购、直接委托及询价比选</el-breadcrumb-item
        >
      </el-breadcrumb>
      <!-- <el-tabs type="card" style="margin-top: 10px" v-model="activeName">
        <el-tab-pane label="供方基本信息" name="供方基本信息"> -->

      <el-card class="box-card" shadow="never">
        <el-form
          label-position="right"
          ref="saveSupForm"
          size="small"
          style="overflow: hidden"
          label-width="150px"
          class="border p-2 mb-2 mt-2"
          :model="formSearch"
          :rules="rules"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="供方名称：" prop="comFullName">
                <el-input v-model="formSearch.comFullName" maxlength="50" placeholder="供方名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="主营分类：" prop="supCateNames">
                <el-input v-model="formSearch.supCateNames" placeholder="供方主营分类" @click.native="onOpenCategoryTree"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供方类型：" prop="directCause">
                <el-select style="width: 100%" v-model="formSearch.directCause" placeholder="请选择直委原因">
                  <el-option :value="item.value" v-for="item in directCauseList" :key="item.value" :label="item.text"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="主要业务城市：" prop="citys">
                <el-input v-model.trim="formSearch.citys" disabled style="width: 100">
                  <el-button slot="append" icon="el-icon-search" @click="posAdd"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册机构：" prop="orgId">
                <!-- <el-input v-model.trim="formSearch.orgId" disabled style="width: 100">
                  <el-button slot="append" icon="el-icon-search" @click="posAdd"></el-button>
                </el-input> -->
                <el-input
                  placeholder="请选择注册机构"
                  style="width: 100%"
                  v-model.trim="formSearch.orgName"
                  @focus="$refs.subJectTree.open()"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码：" prop="businessCode">
                <el-input v-model="formSearch.businessCode" maxlength="50" placeholder="统一社会信用代码或身份证号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="相关说明：" prop="remarks">
                <el-input type="textarea" v-model="formSearch.remarks" maxlength="1000" placeholder="相关说明"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="setSty">
                <span style="color: red; margin-left: 20px">先保存基本信息再添加财务信息及联系人信息（联系人非必填项）</span>
                <div class="text-right">
                  <el-button type="primary" @click="onSubmitsave" :loading="loading" size="small">保存信息</el-button>
                  <el-button v-if="baseGuid" type="primary" @click="onSubmit" size="small">提交信息</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <bank-info></bank-info>
      <el-card style="margin: 10px 0">
        <el-row>
          <el-row class="right">
            <el-col :span="24">
              <el-button type="primary" size="small" @click="add">新增联系人</el-button>
            </el-col>
          </el-row>
          <el-table :data="lianxirenlist" ref="multipleTable" border class="mt-1">
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
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                <i class="el-icon-edit" title="修改" @click="edit(scope.row)"></i>
                <i class="el-icon-delete ml-2" title="删除" @click="del(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <!-- </el-tab-pane>
        <el-tab-pane label="提交供方信息" name="提交供方信息"> -->
      </el-card>
      <!-- </el-tab-pane>
      </el-tabs> -->
      <el-dialog title="新增联系人" :visible.sync="dialogVisible" width="60%">
        <el-form ref="userForm" :model="userForm" :rules="userRules" label-width="130px" size="small" class="form">
          <div class="fromborder">
            <div class="alert alert-warning" role="alert">请提供不少于1个联系人信息。</div>
          </div>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="姓名" prop="personName">
                <el-input v-model="userForm.personName" style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职务" prop="workAs">
                <el-input v-model="userForm.workAs" style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="座机" prop="phone">
                <el-input v-model="userForm.phone" style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="userForm.mobile" style="width: 200px" maxlength="11" @input="phoneChange"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userForm.email" style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否主要联系人" prop="isHeadPerson">
                <el-switch v-model="userForm.isHeadPerson" style="width: 200px"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="desc">
                <el-input v-model="userForm.desc" type="textarea" rows="5"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="right" style="margin-bottom: 20px">
              <el-button type="primary" size="small" class="buttoncss" @click="submit('userForm')" style="float: right"
                >保存联系人</el-button
              >
              <el-button
                type="default"
                size="small"
                class="buttoncss"
                @click="dialogVisible = false"
                style="float: right; margin-right: 10px"
                >取消</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <el-dialog width="78%" title="选择主要业务城市" :visible.sync="dialogVisible1">
        <div style="height: 400px; overflow: auto">
          <div v-for="(item, index) in typeMind" :key="index">
            <div style="margin-bottom: 10px">
              <b>{{ item.provinceName }}</b>
              <el-checkbox v-if="index != 0" v-model="item.checkAll" @change="handleCheckAllChange(item)" style="margin-left: 30px"
                >全选</el-checkbox
              >
            </div>
            <el-checkbox-group v-model="item.checkList" size="mini" @change="handleCheckAllChange1(item)">
              <el-checkbox-button v-for="e in item.cityList" :label="e.value" :key="e.value">{{ e.text }}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
        </div>
      </el-dialog>
      <category-tree ref="categoryTree" :max="2" @select="onSelectedCategoryTree" />
      <subJectTree title="项目" :level="1" ref="subJectTree" :fromType="'zhaobiao'" @itemClick="subJectTree"></subJectTree>
    </el-row>
  </el-main>
</template>
<script>
import CategoryTree from "./components/CategoryTree";
import subJectTree from "./components/subJectTreeZc";
import bankInfo from "./components/bankInfo";
export default {
  components: {
    CategoryTree,
    subJectTree,
    bankInfo,
  },
  data() {
    return {
      activeName: "供方基本信息",
      dialogVisible: false,
      dialogVisible1: false,
      id: this.$route.query.id,
      supCateTags: [],
      typeMind: [],
      typeList: [],
      directCauseList: [],
      loading: false,
      lianxirenlist: [
        {
          id: "",
        },
      ],
      userForm: {
        id: "",
        baseGuid: "",
        personName: "",
        phone: "",
        mobile: "",
        email: "",
        workAs: "",
        isHeadPerson: false,
        desc: "",
      },
      formSearch: {
        orgName: "",
        comFullName: "",
        // comShortName: "",
        supCategoryIds: [],
        id: "",
        directCause: "",
        supCateNames: "",
        remarks: "",
        businessCode: "",
        citys: "",
        cityId: [],
        orgId: "",
      },
      supCategory: [],
      rules: {
        comFullName: { required: true, message: "请输入供方名称", trigger: "blur" },
        remarks: { required: true, message: "请输入相关说明", trigger: "blur" },
        citys: { required: true, message: "请选择服务城市", trigger: "blur" },
        supCateNames: { required: true, message: "请选择主营分类", trigger: ["click"] },
        businessCode: { required: true, message: "请输入统一社会信用代码或身份证号", trigger: "blur" },
        bankName: { required: true, message: "请输入银行全称", trigger: "blur" },
        bankAccount: { required: true, message: "请输入银行账号", trigger: "blur" },
        bankName: { required: true, message: "请输入银行全称", trigger: "blur" },
        directCause: { required: true, message: "请选择垄断类型", trigger: "change" },
        orgId: { required: true, message: "请选择注册机构", trigger: "change" },
      },
      userRules: {
        personName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 50, message: "长度不超过50个字", trigger: "blur" },
        ],
        loginId: [
          { required: true, message: "请输入登陆名", trigger: "blur" },
          { min: 1, max: 30, message: "长度不超过30个字", trigger: "blur" },
        ],
        email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1[3-9]\d{9}$/, message: "手机号格式错误", trigger: "blur" },
        ],
        workAs: [
          { required: true, message: "请输入职务", trigger: "blur" },
          { min: 1, max: 20, message: "长度不超过20个字", trigger: "blur" },
        ],
        isHeadPerson: [{ required: true, message: "请选择是否主要联系人", trigger: "blur" }],
      },
    };
  },
  computed: {
    // supCateNames() {
    //   return this.supCategory.map((v) => v.cateName).join(";");
    // },
    baseGuid() {
      return this.$route.query.id;
    },
  },
  mounted() {
    console.log(this.id);
    this.GetTakeOnType();
    this.lianxirenDataList();
    this.getOutList();
    // this.formSearch = this.$route.query.row ? this.$route.query.row : {};
    // this.baseGuid = this.$route.query.id;
  },
  methods: {
    subJectTree(sub) {
      this.formSearch.orgId = sub.id;
      this.formSearch.orgName = sub.comName;
      this.$refs.subJectTree.close();
    },
    getOutList() {
      let obj = {
        baseGuid: this.baseGuid,
      };
      console.log(this.baseGuid);
      this.$http.get("/SupBaseInfo/GetOneUserRegSupplier", { params: obj }).then((res) => {
        this.formSearch = res.data; // this.formSearch.supCateTags.foeEach(v => { //   if(v.typeList && v.typeList.length) { //     v.typeList.foeEach(sub => { //       sub.isCheck = false //     }) //   } // })
        this.formSearch.supCateTags = res.data.supCateTags;
        this.formSearch.supCategoryNames = res.data.supCateNames;
      });
    },
    onCancle() {
      this.dialogVisible = false;
    },
    /**
     * 删除
     */
    del(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupContacter/DeleteSupContacterById", { id: opt.id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.lianxirenDataList();
        });
      });
    },
    posAdd() {
      this.dialogVisible1 = true;
      this.$http.get("/SysTreeCate/GetAddressListForSelect").then((res) => {
        let obj = [{ provinceName: "特殊城市", cityList: res.data.cityList }];
        this.typeMind = obj.concat(res.data.provinceList).map((v) => {
          return {
            ...v,
            checkAll: false,
            checkList: [],
          };
        });
        this.typeMind.forEach((e) => {
          e.checkList = e.cityList
            .filter((n) => {
              return this.formSearch.cityId.indexOf(n.value) != -1;
            })
            .map((v) => v.value);
        });
      });
    },
    //全选
    handleCheckAllChange(item) {
      item.checkList = item.checkAll ? item.cityList.map((v) => v.value) : [];
    },
    //单个选的时候
    handleCheckAllChange1(item) {
      if (item.cityList.length != item.checkList.length) {
        item.checkAll = false;
      }
    },
    submitForm() {
      let arr = [];
      let arr1 = [];
      this.typeMind.forEach((item) => {
        item.checkList.forEach((v) => {
          arr.push(v);
        });
        item.cityList.forEach((v) => {
          arr1.push(v);
        });
      });

      if (arr.length > 10) {
        this.$message.warning("最多选十个！");
      } else {
        let arr2 = arr1
          .filter((n) => {
            return arr.indexOf(n.value) != -1;
          })
          .map((v) => v.text)
          .toString();
        console.log(arr);
        this.formSearch.cityId = arr;
        this.formSearch.citys = arr2;
        this.dialogVisible1 = false;
      }
      // console.log(arr2);
    },
    async GetTakeOnType() {
      let res = await this.$http.get("/SupAudit/GetSupCateTagForAudit");
      let res1 = await this.$http.get("/SupBaseInfo/GetDirectCause");
      this.typeList = res.data;
      this.directCauseList = res1.data;
    },
    phoneChange() {
      this.userForm.mobile = this.userForm.mobile.replace(/[^\d]/g, "");
      if (this.userForm.mobile.length > 11) {
        this.userForm.mobile = this.userForm.mobile.substr(0, 11);
      }
      var reg = /^1[3456789]\d{9}$/;
      if (this.userForm.mobile.length >= 11 && !reg.test(this.userForm.mobile)) {
        // alert("请输入正确的手机号码格式");
        this.$alert("请输入正确的手机号码格式", {
          confirmButtonText: "确定",
        });
      }
    },
    onSubmitsave() {
      // this.formSearch.supCategoryIds = this.supCategory.map((v) => v.id);
      let that = this;
      this.$refs.saveSupForm.validate((valid) => {
        if (valid) {
          that.loading = true;
          that.$http
            .post("/SupBaseInfo/SaveUserRegSupplierInfo", this.formSearch)
            .then((res) => {
              this.$message({
                type: "success",
                message: res.data.message,
              });
              this.id = res.data.returnValue1;
              this.activeName = "联系人信息";
              this.lianxirenDataList();
              this.getOutList();
            })
            .finally(() => {
              that.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    add() {
      if (!this.id == "") {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs["userForm"].resetFields();
        });
      } else {
        this.$message({
          message: "请先保存基本信息",
          type: "error",
        });
      }
    },
    edit(opt) {
      this.dialogVisible = true;
      this.userForm.id = opt.id;
      this.userForm.baseGuid = opt.baseGuid;
      this.userForm.personName = opt.personName;
      this.userForm.phone = opt.phone;
      this.userForm.mobile = opt.mobile;
      this.userForm.email = opt.email;
      this.userForm.workAs = opt.workAs;
      this.userForm.isHeadPerson = opt.isHeadPerson;
      this.userForm.desc = opt.desc;
    },
    submit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.userForm.baseGuid = this.id;
          this.$http.post("/SupContacter/SaveSupContacter", this.userForm).then((res) => {
            // if(this.personName > 5){
            //   this.$msg.error('最多保存5个联系人')
            // } else {
            if (!res.status == 200) {
              this.$msg.error(res.data.message);
            } else {
              this.$msg.success(res.data.message);
              this.dialogVisible = false;
              this.lianxirenDataList();
            }
            // }
          });
        }
      });
    },
    onSubmit() {
      this.$confirm("您确认要提交信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.id == "") {
          // alert("111");
          this.$http.post("/SupBaseInfo/SubmitUserRegInfo?baseGuid=" + this.id).then((res) => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.$router.replace({
                path: "/supplier/outList",
              });
            } else {
              this.$msg.error(res.data.message);
            }
          });
        } else {
          this.$message({
            message: "请先保存基本信息",
            type: "error",
          });
        }
      });
    },
    lianxirenDataList() {
      this.$http
        .get("/SupContacter/GetSupplierContacters", { params: { baseGuid: this.id } })
        .then((res) => {
          this.lianxirenlist = res.data;
        })
        .finally(() => {});
    },
    onOpenCategoryTree() {
      this.$refs.categoryTree.open();
    },
    onSelectedCategoryTree(v) {
      console.log(v);
      // this.supCategory = v;
      this.formSearch.supCateNames = v.map((v) => v.cateName).toString();
      this.formSearch.supCategoryIds = v.map((v) => v.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.setSty {
  display: flex;
  justify-content: space-between;
}
.pub {
  border-left: 3px solid #ea5514;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: #c2bfbf;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
}
</style>
