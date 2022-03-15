<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <showplan-menu />
      </el-col>
    </el-row>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>发起入围</el-breadcrumb-item>
          <el-breadcrumb-item>投标承诺函</el-breadcrumb-item>
        </el-breadcrumb>
        <statusList></statusList>
        <div role="alert">
          <!-- <el-tabs v-model="activeName" type="card" style="margin-top: 10px;">
            <el-tab-pane label="首次入围" name="首次入围"> -->
          <div style="color: red; margin-top: 10px">招标专业为{{ this.tableData1.cateName }},需上传：{{ this.string1 }}</div>
          <el-table
            empty-text="无符合条件的记录"
            stripe
            border
            style="margin-top: 10px"
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
            v-loading="loading"
          >
            <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
            <el-table-column prop="comFullName" min-width="250" align="left" fixed label="供应商名称"> </el-table-column>
            <!-- <el-table-column prop="comMainName" min-width="250" align="left" fixed label="承接主体名称"> </el-table-column> -->
            <el-table-column prop="" width="150" align="center" label="上传截止时间"> </el-table-column>
            <el-table-column prop="tbFilePath" label="投标承诺函" width="150" align="center">
              <template slot-scope="scope">
                <i v-if="scope.row.tbFilePath" class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row.tbFileId)"></i>
                <i
                  v-if="scope.row.tbFilePath"
                  style="margin-left: 10px"
                  class="el-icon-delete"
                  title="删除"
                  @click="deletes(scope.row.tbFileId)"
                ></i>
                <i v-if="!scope.row.tbFilePath">未上传</i>
              </template>
            </el-table-column>
            <el-table-column prop="rzFilePath" label="融资走款承诺函" width="150" align="center">
              <template slot-scope="scope">
                <i v-if="scope.row.rzFilePath" class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row.rzFileId)"></i>
                <i
                  v-if="scope.row.rzFilePath"
                  style="margin-left: 10px"
                  class="el-icon-delete"
                  title="删除"
                  @click="deletes(scope.row.rzFileId)"
                ></i>
                <i v-if="!scope.row.rzFilePath">未上传</i>
              </template>
            </el-table-column>
            <el-table-column prop="msFilePath" label="承接模式承诺函" width="150" align="center">
              <template slot-scope="scope">
                <i v-if="scope.row.msFilePath" class="el-icon-download ml-2" title="下载" @click="onDonwLoad(scope.row.msFileId)"></i>
                <i
                  v-if="scope.row.msFilePath"
                  style="margin-left: 10px"
                  class="el-icon-delete"
                  title="删除"
                  @click="deletes(scope.row.msFileId)"
                ></i>
                <i v-if="!scope.row.msFilePath">未上传</i>
              </template>
            </el-table-column>
            <!--<el-table-column label="操作" width="80" align="center">-->
            <!--<template slot-scope="scope">-->
            <!--<i class="el-icon-download ml-2" title="下载" @click="down(scope.row)"></i>-->
            <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
          <!-- </el-tab-pane>
          </el-tabs> -->
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="新增" width="35%">
      <el-form :model="form" :rules="rules" ref="form" size="small" class="mt-2" label-width="120px">
        <div>
          <el-form-item label="公司名称" prop="projectName">
            <el-input v-model="form.projectName" style="width: 200px"></el-input>
          </el-form-item>
          <!-- <el-form-item label="承接主体名称" prop="planName">
            <el-input v-model="form.planName" style="width:200px"></el-input>
          </el-form-item> -->
          <el-form-item label="附件名称" prop="sectionName">
            <el-input v-model="form.sectionName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="上传" prop="yushen">
            <el-button>上传</el-button>
          </el-form-item>
          <el-form-item label="证明文件" prop="kaocha">
            <el-input v-model="form.sectionType1" style="width: 200px"></el-input>
          </el-form-item>
          <div slot="footer" style="float: right; margin-top: -20px">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="onSubmit" size="small">确 定</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
/**
 * 招标采购-采购小组成员
 */
import PlanMenu from "../components/PlanMenuDemoru.vue";
import UserSelect from "../components/UserSelect";
import { mapState } from "vuex";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step2",
  components: { PlanMenu, showplanMenu, UserSelect, statusList: () => import("@/components/statusList.vue") },
  inject: ["reload"],
  data() {
    return {
      dialogVisible: false,
      form: [],
      activeName: "首次入围",
      tableData: [],
      tableData2: [],
      loading: false,
      rols: [],
      tablerizhi: [],
      bidPersonExam: [],
      bidRole: "",
      infos: [],
      selectUser: [],
      rules: {
        bidPersonExam: [{ required: true, message: "请选择评标类型", trigger: "change" }],
        bidRole: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      // planId: "",
      string1: "",
      tableData1: {},
      x: true,
    };
  },
  computed: {
    planId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else if (this.$route.params.id) {
        return this.$route.params.id;
      } else if (this.$route.params.baseId) {
        return this.$route.params.baseId;
      } else {
        return this.$route.query.baseId;
      }
    },
  },
  created: function () {
    // this.planId = this.$route.query.id;
    this.GetRequiredAttach04();
    // this.$api.supIn.CheckCanEdit({ planId: this.planId }).then(res => {
    //   if (!res.success) {
    //     //this.showButton = false;
    //     this.openM(res.message);
    //   }
    // });
  },
  mounted() {
    this.GetSupplierPromission07();
    // this.GetSupplierPromission071();
  },
  methods: {
    openM(msg) {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [h("span", null, msg), h("i", { style: "color: teal" }, "")]),
      }).then((action) => {});
    },
    GetRequiredAttach04() {
      this.$api.supIn.GetRequiredAttach04({ planId: this.planId }).then((res) => {
        this.tableData1 = res;
        for (var i = 0; i < res.attachNameList.length; i++) {
          if (i != 0) {
            this.string1 += "、";
          }
          this.string1 += res.attachNameList[i];
        }
      });
    },
    onDonwLoad(id) {
      //window.open(process.env.VUE_APP_API_URL + path)
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad007?fileId=" + id);
      //window.location.href = process.env.VUE_APP_API_URL + path;
    },
    GetSupplierPromission07() {
      this.$api.supIn.GetSupplierPromission07({ planId: this.planId }).then((res) => {
        this.tableData = res;
      });
    },
    add() {
      this.dialogVisible = true;
    },
    // onDonwLoad(){
    //   this.dialogVisible = true;
    // },
    onSubmit() {
      this.dialogVisible = false;
    },
    getPersonalRole(id) {
      this.loading = true;
      this.$api.BidPerson.GetBidModePersonDropDown()
        .then((res) => {
          this.rols = res.bidPersonRole;
          this.bidPersonExam = res.bidPersonExam;
        })
        .then(() => {
          this.getBidModePersonList();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getBidModePersonList() {
      this.$api.BidPerson.GetBidModePersonList(this.baseId).then((res) => {
        this.infos = res;
      });
    },
    onAdd() {
      this.$refs.userSelect.open();
    },
    onDelete(user) {
      this.$api.BidPerson.DeleteBidModePersonById(user.id).then((res) => {
        this.getBidModePersonList();
      });
    },
    onSaveUserRole() {
      // if(!this.bidPersonExam == "" || this.bidRole == "") {
      //   this.$message({
      //           message: "请先选择评价类型和角色",
      //           type: "error",
      //           });
      // } else {
      const rols = this.infos.map((x) => {
        return {
          userGuid: x.userGuid,
          bidRole: x.bidRole,
          bidPersonExam: x.bidPersonExam,
        };
      });
      this.$api.BidPerson.SaveBidPersonRoles(this.baseId, rols).then((res) => {
        this.$message.success(res.message);
        this.getBidModePersonList();
      });
      // }
    },
    onUserAdd(user) {
      this.$api.BidPerson.SaveSinglePerson(this.baseId, user.userGuid).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
          this.getBidModePersonList();
        }
      });
    },
    deletes(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("/LIandoSupplierIn/DeleteSupplierInAttach04", { id: id }).then((res) => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.GetSupplierPromission07();
              // this.GetRequiredAttach04();
            } else {
              this.$message.error(res.data.message);
              this.GetSupplierPromission07();
              // this.GetRequiredAttach04();
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    test() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res) => {
        if (res.planId == "00000000-0000-0000-0000-000000000000") {
          this.$message.error("请先完善入围相关信息");
          this.x = true;
        } else {
          this.x = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 2% 0 120px;
  height: 100%;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: #ffffff;
  position: relative;
  /* width: 88%; */
  border-radius: 10px 10px 0 0;
  overflow: auto;
}

.buttoncss {
  float: right;
  margin-top: 12px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
</style>
