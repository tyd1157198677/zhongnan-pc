<!--  -->
<template>
  <el-main>
    <div class="" style="padding-bottom: 100px">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="角色信息" name="角色信息"></el-tab-pane>
        <el-tab-pane label="角色菜单" name="角色菜单"></el-tab-pane>
        <el-tab-pane label="角色用户" name="角色用户"></el-tab-pane>
        <el-tab-pane label="角色权限" name="角色权限"></el-tab-pane>
        <!-- <el-tab-pane label="供方审核人" name="供方审核人"></el-tab-pane> -->
        <el-tab-pane label="城市负责人" name="城市负责人"></el-tab-pane>
        <el-tab-pane label="项目角色" name="项目角色"></el-tab-pane>
        <el-tab-pane label="公司角色" name="公司角色"></el-tab-pane>
        <!-- <el-tab-pane label="总裁三室经办人" name="总裁三室经办人"></el-tab-pane> -->
        <el-tab-pane label="供方审核人岗位配置" name="供方审核人岗位配置"></el-tab-pane>
      </el-tabs>
      <el-card style="margin-bottom: 10px" v-if="activeName == '角色信息'">
        <div class="firft">
          <el-select style="float: left; margin-bottom: 10px" v-model="roleType" @change="reatype">
            <el-option label="全部" value=""></el-option>
            <el-option label="普通角色" value="普通角色"></el-option>
            <el-option label="审批角色" value="审批角色"></el-option>
          </el-select>
          <el-button size="small" type="primary" @click="addRolses" style="float: right; margin-bottom: 10px">新增角色</el-button>
          <el-table
            height="500"
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
            v-loading="loading"
          >
            <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
            <el-table-column prop="roleName" label="角色名称" align="center"> </el-table-column>
            <el-table-column prop="roleLevel" label="角色层级" align="center"> </el-table-column>
            <el-table-column prop="roleType" label="角色类型" align="center"> </el-table-column>
            <el-table-column label="显示顺序" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.roleOrder" @change="handleChange(scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <i v-if="scope.row.roleType != '审批角色'" class="el-icon-edit" @click="edit(scope.row)" style="margin-right: 10px"></i>
                <i v-if="scope.row.roleType != '审批角色'" class="el-icon-delete" @click="deletes(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <role-meange v-if="activeName == '角色用户'"></role-meange>
      <role-author v-if="activeName == '角色权限'"></role-author>
      <role-menu v-if="activeName == '角色菜单'"></role-menu>
      <role-auditor v-if="activeName == '供方审核人'"></role-auditor>
      <role-city v-if="activeName == '城市负责人'"></role-city>
      <rolesub v-if="activeName == '项目角色'"></rolesub>
      <rolecom v-if="activeName == '公司角色'"></rolecom>
      <threeRoom v-if="activeName == '总裁三室经办人'"></threeRoom>
      <postConfig v-if="activeName == '供方审核人岗位配置'"></postConfig>
    </div>
    <el-dialog :title="text" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-col :span="24">
          <el-form-item prop="roleName" label="角色名称">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="roleLevel" label="角色层级">
            <el-input v-model="ruleForm.roleLevel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="roleOrder" label="角色排序">
            <el-input v-model="ruleForm.roleOrder"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  components: {
    roleMeange: () => import("./roleMeange.vue"),
    roleMenu: () => import("./roleMenu.vue"),
    roleAuditor: () => import("./roleAuditor.vue"),
    roleCity: () => import("./roleCity.vue"),
    rolesub: () => import("./rolesub.vue"),
    rolecom: () => import("./rolecom.vue"),
    threeRoom: () => import("./threeRoom"),
    roleAuthor: () => import("./roleAuthor.vue"),
    postConfig: () => import("./postConfig.vue"),
  },
  data() {
    return {
      activeName: "角色信息",
      tableData: [],
      loading: false,
      dialogFormVisible: false,
      text: "",
      roleType: "",
      ruleForm: {
        roleOrder: "",
        roleName: "",
        roleLevel: "",
        id: "",
      },
      rules: {
        roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        roleOrder: [{ required: true, message: "请输入角色排序", trigger: "blur" }],
        roleLevel: [{ required: true, message: "请输入角色层级", trigger: "blur" }],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetRoleList();
  },
  methods: {
    ///api/services/app/Role/GetOneById 根据id获取角色信息 id:{}
    ///api/services/app/Role/GetUserRoles 根据UserGuid获取用户角色 userGuid:{}
    reatype() {
      this.GetRoleList();
    },
    async GetRoleList() {
      this.loading = true;
      let res = await this.$http.get("/Role/GetRoleList", { params: { RoleType: this.roleType } });
      if (res.status == 200) {
        this.loading = false;
        this.tableData = res.data;
      }
    },
    handleClick(e) {
      //   this.currentPage = 1;
      //   this.GetMenuList();
    },
    handleChange(val) {
      let obj = [
        {
          id: val.id,
          roleOrder: val.roleOrder,
        },
      ];
      this.$http.post("/Role/SaveRoleOrder", obj).then((res) => {
        res.status == 200 ? this.$message.success(res.message || res.data.message) : this.$message.error(res.message || res.data.message);
        this.GetRoleList();
      });
      ///api/services/app/Role/SaveRoleOrder 保存排序

      //   this.GetMenuList();
    },
    edit(val) {
      console.log(val);
      this.text = "编辑角色信息";
      this.dialogFormVisible = true;
      this.ruleForm.roleName = val.roleName;
      this.ruleForm.roleOrder = val.roleOrder;
      this.ruleForm.roleLevel = val.roleLevel;
      this.ruleForm.id = val.id;
      // this.GetMenuTree()
    },
    deletes(val) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/Role/DeleteRole", { id: val.id }).then((res) => {
          res.status == 200 ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.GetRoleList();
        });
      });
    },
    addRolses() {
      this.ruleForm.roleName = "";
      this.ruleForm.roleOrder = "";
      this.ruleForm.roleLevel = "";
      this.ruleForm.id = "";
      this.text = "新增角色信息";
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/Role/InsertOrUpdateRole", this.ruleForm).then((res) => {
            res.status == 200
              ? this.$message.success(res.message || res.data.message)
              : this.$message.error(res.message || res.data.message);
            this.dialogFormVisible = false;
            this.GetRoleList();
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
