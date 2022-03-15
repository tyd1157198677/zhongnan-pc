<template>
  <div style="margin:0px auto 10px;margin-bottom: 65px;width:90%;">
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">考察主题信息</div>
      <el-form ref="form" :inline="true" label-width="130px" :model="form" :rules="rules" class="m-3">
        <el-row>
          <el-form-item label="考察主题" prop="masterName">
            <el-input v-model="form.masterName" style="width:650px;"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="适用范围" prop="scope">
            <el-input v-model="form.scope" style="width:650px;"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="考察分类" prop="supCateName">
            <el-input v-model="form.supCateName">
              <el-button slot="append" icon="el-icon-search" @click="flag1 = true"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="考察目的" prop="invesReason">
            <el-select v-model="form.invesReason" @change="onSelectedDrug">
              <el-option v-for="item in dropDownGroup.invesReason" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考察打分模板" prop="tempId">
            <el-select v-model="form.tempId" @change="tempChange">
              <el-option
                v-for="item in options2"
                :key="item.value.toLocaleLowerCase()"
                :label="item.text"
                :value="item.value.toLocaleLowerCase()"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="考察报告类型" prop="reportType">
            <el-select v-model="form.reportType">
              <el-option v-for="item in dropDownGroup.reportType" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="考察开始日期" prop="startDate">
            <el-date-picker type="date" v-model="form.startDate" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
          <el-form-item label="考察结束日期" prop="endDate">
            <el-date-picker type="date" v-model="form.endDate" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
        </el-row>
        <!--<el-row>-->
        <!---->
        <!--</el-row>-->
        <el-row>
          <el-form-item label="考察报告编辑人" prop="editUserName">
            <el-input v-model="form.editUserName">
              <el-button slot="append" icon="el-icon-search" @click="flag2 = true"></el-button>
            </el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="showFlag">
          <el-form-item label="招标项目名称" prop="bidProjectName">
            <el-input v-model="form.bidProjectName" style="width:650px;"></el-input>
          </el-form-item>
        </el-row>
        <el-row class="right" style="width:90%">
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">暂存信息</el-button>
            <el-button size="small" @click="onCancle">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>

    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">待考察供方</div>
      <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData" v-loading="loading">
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column align="left" prop="comFullName" label="供应商名称"></el-table-column>
        <el-table-column prop="supCateNames" label="供应商分类"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="small" @click="addGongFang" style="float: right;margin-top: 10px;">添加供方</el-button>
    </el-row>

    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">考察参与人员信息</div>
      <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData2" v-loading="loading">
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="depName" label="参与部门"></el-table-column>
        <el-table-column prop="personNames" label="人员"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <i @click="addPeople(scope.row)" class="el-icon-circle-plus" title="新增" style="margin-left:5px" />
            <i @click="delete2(scope.row.depId)" class="el-icon-delete" title="清空" style="margin-left:5px" />
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="small" @click="tiJiao" style="float: right;margin-top: 10px;">提交考察信息</el-button>
    </el-row>

    <!--<el-dialog :visible.sync="flag1" title="选择考察分类">-->
    <!--<kind-nav @itemClick="onChangeKind"/>-->
    <!--</el-dialog>-->
    <el-dialog :visible.sync="flag1" title="选择考察分类">
      <project-tree @itemClick="onChangeKind" />
    </el-dialog>

    <el-dialog :visible.sync="flag2" title="选择考察报告编辑人" width="70%">
      <user @itemClick="onChangeUser" />
    </el-dialog>

    <el-dialog :visible.sync="flag3" title="选择供方" width="70%">
      <gongFang @itemClick="onChangeGongFang" />
    </el-dialog>

    <el-dialog :visible.sync="flag4" title="选择人员" width="70%">
      <user2 @itemClick="onChangeUser2" />
    </el-dialog>

    <el-divider></el-divider>
  </div>
</template>

<script>
import ProjectTree from "./components/ProjectTree";
import KindNav from "./components/KindNav";
import user from "./components/user";
import user2 from "./components/user2";
import gongFang from "./components/storageList";
export default {
  components: {
    KindNav,
    user,
    gongFang,
    user2,
    ProjectTree,
  },
  data() {
    return {
      loading: false,
      depName: "",
      depGuid: "",
      masterId: "",
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      tableData: [],
      tableData2: [],
      showFlag: false,
      options1: [],
      options2: [],
      dropDownGroup: {},
      projectVisible: false,
      categoryVisible: false,
      options: [
        {
          value: "资源扩充",
          label: "资源扩充",
        },
        {
          value: "项目招标",
          label: "项目招标",
        },
      ],
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
      },
      rules: {
        reportType: [{ required: true, message: "请选择报告类型", trigger: "change" }],
        masterName: [{ required: true, message: "请填写主题名称", trigger: "blur" }],
        scope: [{ required: true, message: "请填写适用范围", trigger: "blur" }],
        supCateName: [{ required: true, message: "请选择考察分类", trigger: "change" }],
        invesReason: [{ required: true, message: "请选择考察目的", trigger: "change" }],
        tempId: [{ required: true, message: "请选择考察打分模版", trigger: "change" }],
        startDate: [{ required: true, message: "请选择开始日期", trigger: "change" }],
        endDate: [{ required: true, message: "请选择结束日期", trigger: "change" }],
        editUserName: [{ required: true, message: "请选择考察报告编辑人", trigger: "change" }],
      },
    };
  },
  mounted() {
    // this.$http.get('/InvesMaster/GetAllDropDown').then(res=>{
    //   console.log(res);
    // })
    this.$http.get("/InvesMaster/GetAllDropDown").then(res => {
      // this.$api.InvesMaster.GetAllDropDown().then(res => {
      this.dropDownGroup = res.data;
    });
    this.$api.invest.GetSupplierCategoryTree().then(res => {
      this.options1 = res;
    });
    this.$api.invest.GetInvesTempletList().then(res => {
      this.options2 = res;

      var row = this.$route.query.row;
      if (row) {
        if (row.id) {
          this.form = row;
          if (this.form.invesReason == "项目招标") {
            this.showFlag = true;
          }
          this.masterId = row.id;
          this.getGongFang();
          this.getPeople();
        }
      }
    });
  },
  methods: {
    tempChange(value) {
      // this.tempId =
    },
    delete2(id) {
      this.$confirm("此操作将永久清空该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.ClearDepartmentPerson({ masterId: this.masterId, depGuid: id }).then(res => {
            if (res.success) {
              this.$message.success(res.message);
              this.getPeople();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    onChangeUser2(row) {
      var p = {
        masterId: this.masterId,
        userGuid: row.userGuid,
        depName: this.depName,
        depGuid: this.depGuid,
      };
      this.$api.invest.SaveInvesPerson(p).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.getPeople();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getPeople() {
      this.$api.invest.GetInvesDepartmentPerson({ masterId: this.masterId, tempId: this.form.tempId }).then(res => {
        this.tableData2 = res;
      });
    },
    addPeople(row) {
      this.flag4 = true;
      this.depGuid = row.depId;
      this.depName = row.depName;
    },
    delete1(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.DeleteInvesSupplierById({ id: id }).then(res => {
            if (res.success) {
              this.$message.success("删除成功");
              this.getGongFang();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    getGongFang() {
      this.$api.invest.GetInvesSupplierList({ masterId: this.masterId }).then(res => {
        this.tableData = res;
      });
    },
    addGongFang() {
      this.flag3 = true;
    },
    onChangeGongFang(id) {
      this.$api.invest.SaveInvesSupplier2({ masterId: this.masterId, supplierId: id }).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.getGongFang();
        } else {
          this.$message.error(res.message);
        }
      });
      // this.$http.post("/InvesSupplier/SaveInvesSupplier", {masterId:this.masterId,supplierId:id}).then(res => {
      //   if(res.success) {
      //     this.$message.success(res.message)
      //     this.getGongFang();
      //   } else {
      //     this.$message.error(res.message)
      //   }
      // });
    },
    onChangeKind(kind) {
      this.form.supCate = kind.id;
      this.form.supCateName = kind.cateName;
      this.flag1 = false;
    },
    onChangeUser(kind) {
      this.form.editUser = kind.userGuid;
      this.form.editUserName = kind.userName;
      this.flag2 = false;
    },
    onSelectedDrug(item) {
      if (item == "项目招标") {
        this.showFlag = true;
      } else {
        this.showFlag = false;
      }
    },
    // loadQueryForm() {
    //     this.$api.BidPlan.GetBidPlanDropDown().then(res => {
    //         this.dropDownGroup = res;
    //     });
    // },
    loadForm() {
      this.$api.BidPlan.GetOneBidPlanById(this.form.id).then(res => {
        this.form = res;
      });
    },
    onChangeProject(project) {
      this.form.projectId = project.id;
      this.form.projectName = project.projectFullName;
      this.projectVisible = false;
    },
    onChangeCategory(category) {
      console.log(category);
      this.form.bidCateId = category.id;
      this.form.bidCateName = category.cateName;
      this.categoryVisible = false;
    },
    onSubmit() {
      if (this.form.invesReason == "项目招标") {
        if (!this.form.bidProjectName) {
          this.$message.error("请填写招标项目名称");
          return;
        }
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.invest.SaveInvesMaster(this.form).then(res => {
            if (res.success) {
              this.$message.success("保存成功");
              this.masterId = res.returnValue1;
              this.tempId = this.form.tempId;
              this.getPeople();
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    onCancle() {
      this.$router.push({
        path: "/invest/myStartInvest",
      });
    },
    tiJiao() {
      this.$confirm("提交后不能修改，确认要提交考察信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.SubmitInves({ id: this.masterId }).then(res => {
            if (res.success) {
              this.$message.success(res.message);
              this.$router.push({
                path: "/invest/myStartInvest",
              });
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
  },
};
</script>

<style scoped>
.el-select,
.el-input {
  width: 16rem;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>
