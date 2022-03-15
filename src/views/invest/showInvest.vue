<template>
  <div style="margin:0px auto 10px;margin-bottom: 65px;width:90%;">
    <!-- <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <el-button size="small" @click="goto" style="float: right;">返回</el-button>
      <el-button type="primary" size="small" style="float: right;margin: 10px;">暂存信息</el-button>
      <el-button type="primary" size="small" @click="tiJiao" style="float: right;margin-top: 10px;">提交考察信息</el-button>
    </el-row> -->
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">1.供应商基本信息</div>
      <edit1></edit1>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">2.供应商人员信息</div>
      <edit2></edit2>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">3.供应商重要指标</div>
      <improtantDynamic :type="0"></improtantDynamic>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">4.承接模式及劳务分包模式</div>
      <improtantDynamic :type="1"></improtantDynamic>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">5.单位概况及业绩</div>
      <improtantDynamic :type="2"></improtantDynamic>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">6.考察附件（考察照片及考察报告）</div>
      <edit3></edit3>
    </el-row>

    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">7.项目经理</div>
      <edit4></edit4>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">8.背调结果</div>
      <edit5></edit5>
    </el-row>

    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <!-- <el-button size="small" @click="goto" style="float: right;margin-top: 10px;">返回</el-button> -->
      <!--<el-button type="primary" size="small" style="float: right;margin: 10px;">暂存信息</el-button>-->
      <!--<el-button type="primary" size="small" @click="tiJiao" style="float: right;margin-top: 10px;">提交考察信息</el-button>-->
    </el-row>

    <el-dialog :visible.sync="flag1" title="选择考察分类">
      <project-tree @itemClick="onChangeKind" />
    </el-dialog>

    <el-dialog :visible.sync="flag2" title="选择考察报告编辑人" width="70%">
      <user @itemClick="onChangeUser" />
    </el-dialog>
    <el-dialog :visible.sync="flag3" title="选择供方" width="70%">
      <el-form ref="formgongfang" :inline="true" label-width="100px" :model="formgongfang" :rules="rules" class="m-3">
        <el-row>
          <el-col :span="8">
            <el-form-item label="对接人" prop="personName">
              <el-input v-model="formgongfang.personName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="mobile">
              <el-input v-model="formgongfang.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formgongfang.email">
                <!--                      <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="right">
          <el-form-item>
            <el-button type="primary" size="small" @click="tableshows">暂存信息</el-button>
            <el-button size="small" @click="flag3 = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="flag4" title="选择人员" width="70%">
      <user2 @itemClick="onChangeUser2" />
    </el-dialog>

    <el-divider></el-divider>
  </div>
</template>

<script>
import ProjectTree from "./components/ProjectTree";
import user from "./components/user";
import user2 from "./components/user2";
import edit1 from "./comp2/invesEdit1";
import edit2 from "./comp2/invesEdit2";
import edit3 from "./comp2/invesEdit3";
import edit4 from "./comp2/invesEdit4";
import edit5 from "./comp2/invesEdit5";
import improtantDynamic from "./comp2/improtantDynamic2";
export default {
  components: {
    user,
    user2,
    ProjectTree,
    edit1,
    edit2,
    edit3,
    edit4,
    edit5,
    improtantDynamic,
  },
  data() {
    return {
      loading: false,
      value1: "",
      depName: "",
      depGuid: "",
      masterId: "",
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      // tableshow:true,
      fileList: [],

      tableData: [],
      tableDatalianx: [
        {
          comFullName: "张根",
          supCateNames: "15231113633",
          email: "472378@qq.com",
        },
      ],
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
      formgongfang: {
        personName: "",
        mobile: "",
        email: "",
      },
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
    this.getPeople();
    //this.getPhotoList();
    this.$api.invest.GetAllDropDown().then(res => {
      this.dropDownGroup = res;
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
    // 上传图片
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/InvesImageUpload";
    },
    beforeAvatarUploadphoto() {
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = [".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件格式有误");
        return false;
      }
      const isLt = file.size / 1024 / 1024 < 5;
      if (!isLt) {
        this.$message.error("上传文件大小不能超过5兆");
        return false;
      }
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    handleAvatarSuccess() {
      if (response.success) {
        this.$message.success(response.message);
        this.getPhotoList();
      } else {
        this.$message.error(response.message);
      }
    },
    submitUpload() {
      Object.assign(this.uploadData, {}, { masterId: this.masterId, FileName: this.fileName });
      // this.$refs.upload.submit();
    },
    getPhotoList() {
      this.$http.get("/InvesAttach/GetInvesImageList", { masterId: this.masterId }).then(res => {
        this.tableDataphoto = res.data;
      });
    },
    deletephoto(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.get("InvesLianDoMaster/DeleteInvesImage", { id }).then(res => {
            if (res.success) {
              this.$message.success("删除成功");
              this.getPhotoList();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    tableshows() {
      // this.tableshow = false
      this.flag3 = false;
      this.$refs.formgongfang.validate(valid => {
        if (valid) {
          this.$http.post("InvesLianDoMaster/SaveInvesContactInfo", this.formgongfang).then(res => {
            if (res.data.success) {
              this.$message.success("保存成功");
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    add() {
      this.$router.push({
        path: "/invest/InvestDemo",
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // tempChange(value){
    //   this.tempId =
    // },
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
      // this.$http.get("/SysConfig/GetSysConfigList", { params: obj })
      this.$http.get("/InvesLianDoMaster/GetInvesContactList", { masterId: this.masterId }).then(res => {
        this.tableData2 = res.data;
      });
    },
    addPeople(row) {
      this.flag4 = true;
      this.depGuid = row.depId;
      this.depName = row.depName;
    },
    delete1(id) {
      // this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      //   this.$http.get("InvesLianDoMaster/DeleteInvesSupplierById",{id}).then(res => {
      //     if(res.success) {
      //       this.$message.success('删除成功');
      //       this.getGongFang();
      //     } else {
      //       this.$message.error(res.message)
      //     }
      //   })
      // }).catch(() => {
      //   this.$msg({ type: "info", message: "已取消删除", });
      // });
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
    loadQueryForm() {
      this.$api.BidPlan.GetBidPlanDropDown().then(res => {
        this.dropDownGroup = res;
      });
    },
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

    goto() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select,
.el-input {
  width: 16rem;
}

.el-form-item {
  margin-bottom: 10px;
}

.mh {
  /*min-height:500px;*/
}
::v-deep .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 20px;
  padding: 5px 12px 0 0;
  box-sizing: border-box;
}
</style>
