<template>
  <div>
    <div class="four">
      <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          ><b>参与{{ pagetype }}人员信息（甲方）</b></el-breadcrumb-item
        >
      </el-breadcrumb>
      <div class="btn1" style="justify-content: flex-end; background: #fff">
        <el-button v-if="isEdit == 1" type="primary" size="mini" @click="add(4)">新增参与{{ pagetype }}人员</el-button>
      </div>
      <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="resonList" v-loading="loading">
        <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
        <el-table-column label="姓名" min-width="160" align="center" prop="username"> </el-table-column>
        <el-table-column label="是否主负责人" min-width="160" align="center" prop="mainMan">
          <template slot-scope="scope">
            <span v-if="scope.row.mainMan">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属组织" prop="dept"> </el-table-column>
        <el-table-column align="center" label="联系方式" prop="mobile"> </el-table-column>
        <el-table-column label="操作" align="center" width="80" v-if="isEdit == 1">
          <template slot-scope="scope">
            <i class="el-icon-delete" @click="deleteRow4(scope.row)"></i>
            <i style="margin-left: 10px" class="el-icon-edit" @click="editRow4(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog width="80%" :title="text" :visible.sync="dialogVisible4">
      <el-form label-position="right" ref="saveSupForm4" size="small" label-width="120px" :model="formSearch4" :rules="rules4">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="供应商推荐人" prop="userName">
              <el-input
                v-if="!isEditPerson"
                placeholder="请选择供应商推荐人"
                ref="userName"
                v-model="formSearch4.userName"
                @focus="onAdd"
              />
              <el-input v-else ref="userName" v-model="formSearch4.username" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门" prop="workAs">
              <el-input v-if="!isEditPerson" v-model="formSearch4.workAs" disabled />
              <el-input v-else v-model="formSearch4.dept" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机">
              <el-input
                v-model="formSearch4.mobile"
                placeholder="请输入手机号"
                @input="phoneChange"
                maxlength="11"
                onkeyup="value=value.replace(/[^\d]/g,'')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否主负责人">
              <el-select v-model="formSearch4.mainMan" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="float-right">
              <el-button type="primary" :loading="loading" @click="save4">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <user-select title="选择人员" ref="userSelect" @itemClick="onUserAdd"></user-select>
  </div>
</template>

<script>
import UserSelect from "@/views/bid/components/UserSelect";
export default {
  components: {
    UserSelect,
  },
  name: "resonModule",
  props: {
    supId: {
      type: String,
    },
    pagetype: {
      type: String,
    },
  },
  data() {
    return {
      isEdit: 0, // 1:编辑，2：详情
      text: "",
      resonList: [],
      loading: false,
      formSearch4: {
        id: "",
        baseGuid: "",
        personName: "",
        phone: "",
        mobile: "",
        userName: "",
        email: "",
        workAs: "",
        mainMan: true,
      },
      dialogVisible4: false,
      isEditPerson: false, // 是否编辑人员
      rules4: {
        personName: { required: true, message: "请输入联系人姓名", trigger: "blur" },
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        // workAs: { required: true, message: "请输入职务", trigger: "blur" },
      },
    };
  },
  mounted() {
    this.isEdit = this.$route.query.type;
    this.GetSupContacterList();
  },
  methods: {
    phoneChange() {
      this.formSearch4.mobile = this.formSearch4.mobile.replace(/[^\d]/g, "");
      if (this.formSearch4.mobile.length > 11) {
        this.formSearch4.mobile = this.formSearch4.mobile.substr(0, 11);
      }
      var reg = /^1[3456789]\d{9}$/;
      if (this.formSearch4.mobile.length >= 11 && !reg.test(this.formSearch4.mobile)) {
        // alert("请输入正确的手机号码格式");
        this.$alert("请输入正确的手机号码格式", {
          confirmButtonText: "确定",
        });
      }
    },
    onAdd() {
      this.$refs.userSelect.open();
    },
    onUserAdd(user) {
      this.formSearch4.userId = user.userGuid;
      this.$refs.userSelect.close();
      this.formSearch4.userName = user.userName;
      this.formSearch4.mobile = user.telephone;
      this.formSearch4.workAs = user.positionName;
    },
    add(i) {
      this.text = "新增人员信息";
      this.isEditPerson = false;
      let formSearch4 = this.formSearch4;
      formSearch4.id = "";
      formSearch4.baseGuid = this.supId;
      formSearch4.personName = "";
      formSearch4.phone = "";
      formSearch4.mobile = "";
      formSearch4.email = "";
      formSearch4.workAs = "";
      this.dialogVisible4 = true;
    },
    deleteRow4(row) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/InvesLianDoMaster/DelParticipants", { id: row.id }).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetSupContacterList();
          } else {
            this.$msg.error(res.data.message);
          }
        });
      });
    },
    editRow4(row) {
      this.isEditPerson = true;
      // dept: "工程部"
      // mainMan: false
      // masterId: "6d2a39f9-1028-4468-4774-08d946c77855"
      // mobile: null
      // type: "资格预审"
      // userId: "159bf1b4-2f6e-4e43-8753-404896ab3e79"
      // username: "李国基"

      this.formSearch4 = JSON.parse(JSON.stringify(row));
      this.dialogVisible4 = true;
    },
    //人员信息保存
    save4() {
      if (this.formSearch4.mobile.length != 11) {
        this.$alert("请先填写完整的手机号", {
          confirmButtonText: "确定",
        });
      } else {
        let obj = [
          {
            masterId: this.$route.query.id,
            userId: this.formSearch4.userId,
            mainMan: this.formSearch4.mainMan,
            mobile: this.formSearch4.mobile,
            type: this.pagetype,
          },
        ];
        this.$refs.saveSupForm4.validate((valid) => {
          if (valid) {
            this.$http.post("/InvesLianDoMaster/CreateParticipants", obj).then((res) => {
              let data = res.data;
              if (data.success) {
                this.$message.success(data.message);
                this.dialogVisible4 = false;
                this.GetSupContacterList();
              } else {
                this.$message.error(data.message);
              }
            });
          }
        });
      }
    },
    //获取人员信息列表
    async GetSupContacterList() {
      let res = await this.$http.get("/InvesLianDoMaster/GetParticipantsList", {
        params: {
          masterId: this.$route.query.id,
          type: this.pagetype,
        },
      });
      this.resonList = res.data;
    },
  },
};
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
