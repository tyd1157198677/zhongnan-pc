<template>
  <el-main>
    <!-- <el-row id="page_main">
      <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>特殊供方录入（政府垄断类特殊供方录入，如：自来水公司、天然气公司等）</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row> -->
    <el-row>
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td style="width: 20%" class="right">供方名称：</td>
            <td style="width: 30%">{{ neweditform.comFullName }}</td>
            <td style="width: 20%" class="right">供方简称：</td>
            <td style="width: 30%">{{ neweditform.comShortName }}</td>
          </tr>
          <tr>
            <!-- <td style="width: 20%" class="right">承接主体名称：</td>
                <td style="width: 30%">{{neweditform.comMainName}}</td> -->
            <td style="width: 20%" class="right">供方分类：</td>
            <td style="width: 80%">{{ neweditform.supCateNames }}</td>
          </tr>
          <tr>
            <td style="width: 20%" class="right">分类标签：</td>
            <td style="width: 30%" :colspan="3">{{ neweditform.supCateTags }}</td>
          </tr>
        </tbody>
      </table>
    </el-row>
    <el-row>
      <el-row class="mt-1 right">
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
    <el-row>
      <el-col :span="24">
        <!-- <el-form-item> -->
        <el-button type="primary" @click="onSubmit" size="small" style="float:right;margin-top:20px">提交信息</el-button>
        <!-- </el-form-item> -->
      </el-col>
    </el-row>
    <el-dialog title="新增联系人" :visible.sync="dialogVisible" width="60%">
      <el-form ref="userForm" :model="userForm" :rules="userRules" label-width="130px" size="small" class="form">
        <div class="fromborder">
          <div class="alert alert-warning" role="alert">请提供不少于1个联系人信息。</div>
          <div class="formwidth">
            <el-form-item label="姓名" prop="personName">
              <el-input v-model="userForm.personName" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="职务" prop="workAs">
              <el-input v-model="userForm.workAs" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="座机" prop="phone">
              <el-input v-model="userForm.phone" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="userForm.mobile" style="width:200px" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="是否主要联系人" prop="isHeadPerson">
              <el-switch v-model="userForm.isHeadPerson" style="width:200px"></el-switch>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
              <el-input v-model="userForm.desc" type="textarea" rows="5"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-row>
          <el-col :span="24" class="right" style="margin-bottom:20px">
            <el-button type="primary" size="small" class="buttoncss" @click="submit('userForm')" style="float:right">保存联系人</el-button>
            <el-button type="default" size="small" class="buttoncss" @click="onCancle" style="float:right;margin-right:10px"
              >取消</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </el-main>
</template>
<script>
export default {
  name: "lianxiren",
  // props: {
  // baseGuid: {
  //   type: String,
  //   required: true,
  // },
  // },
  data() {
    return {
      neweditform: {
        comFullName: "",
        comShortName: "",
        comMainName: "",
        supCategoryIds: [],
        id: "",
        supCateNames: "",
        mobile: "",
      },
      tableData: [
        {
          id: "",
          fileName: "",
        },
      ],
      dialogVisible: false,
      activeNames: ["1"],
      lianxirenlist: [],
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
      loading: false,
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
    baseGuid() {
      return this.$route.query.id;
    },
    // baseGuid() {
    //   return this.$route.query.id;
    // },
    // regBaseInfo() {
    //         const { baseGuid } = this.$route.params
    //         return baseGuid && baseGuid.length > 0
    //     },
    supCategoryName() {
      return this.supCategory.map(v => v.cateName).join(";");
    },
  },
  mounted() {
    this.lianxirenDataList();
    // this.neweditform.id = this.$route.query.id;
    this.getList();
  },
  methods: {
    // checkPhone(rule, value, callback) {
    //         if (!value) {
    //             return callback(new Error('请输入手机号'));
    //         } else {
    //             if (mobile(value)) {
    //                 callback();
    //             } else {
    //                 return callback(new Error('请输入正确的手机号'));
    //             }
    //         }
    //     },
    getList() {
      let obj = {
        baseGuid: this.baseGuid,
      };
      console.log(this.baseGuid);
      this.$http.get("/SupBaseInfo/GetOneUserRegSupplier", { params: obj }).then(res => {
        this.neweditform = res.data;
      });
    },
    lianxirenDataList() {
      this.$http
        .get("/SupContacter/GetSupplierContacters", { params: { baseGuid: this.baseGuid } })
        .then(res => {
          this.lianxirenlist = res.data;
        })
        .finally(() => {});
    },
    submit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.userForm.baseGuid = this.baseGuid;
          this.$http.post("/SupContacter/SaveSupContacter", this.userForm).then(res => {
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
    add() {
      // this.$http.get("/SupContacter/GetContractCount",{params: {baseGuid: this.baseGuid}}).then(res => {
      //     console.log(res.data);
      //     console.log(this.baseGuid);
      //     const count = res.data;
      //     if(count >= 5) {
      //         this.$msg.error('最多可添加5个联系人！')
      //     } else {
      this.dialogVisible = true;
      this.$refs.userForm.resetFields();
      // }
      // })
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
        this.$http.post("/SupContacter/DeleteSupContacterById", { id: opt.id }).then(res => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.lianxirenDataList();
        });
      });
    },
    onSubmit() {
      this.$confirm("您确认要提交信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupBaseInfo/SubmitUserRegInfo", { id: this.baseGuid }).then(res => {
          if (res.status == 200) {
            this.$msg.success(res.data.message);
            this.$router.push({
              path: "./specialSupEdit",
              // query: { id: this.id }
            });
          } else {
            this.$msg.error(res.data.message);
          }
        });
      });
    },

    /**
     * 取消修改
     */
    onCancle() {
      this.dialogVisible = false;
    },
    init(id) {
      this.resetForm();
      if (id) {
        this.$api.SupContacter.GetOneSupContacterById(id).then(res => {
          Object.assign(this.userForm, res);
        });
      }
    },
    loadForm() {
      this.$api.SupContacter.GetOneSupContacterById(this.userForm.id).then(res => {
        this.userForm = res;
      });
    },
    /**
     * 重置
     */
    resetForm() {
      this.$refs.userForm.resetFields();
      this.userForm = {
        id: "",
        baseGuid: "",
        personName: "",
        phone: "",
        mobile: "",
        email: "",
        workAs: "",
        isHeadPerson: false,
        desc: "",
      };
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
  },
};
</script>
