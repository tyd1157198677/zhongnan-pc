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
          <el-breadcrumb-item>招采计划</el-breadcrumb-item>
          <el-breadcrumb-item v-if="showmessage"
            >招标单项计划<span style="color: red">({{ message }})</span></el-breadcrumb-item
          >
          <el-breadcrumb-item v-else>招标单项计划</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-alert :title="msg" type="warning" v-if="!isCanEdit" :closable="false"> </el-alert> -->
        <!-- <div> -->
        <div>
          <!-- <el-button type="primary" class="buttoncss" size="small" style="margin-bottom:10px" @click="addsave">保存</el-button> -->
          <div v-if="showsubmit">
            <!-- <el-button type="primary" v-if="savebao" class="buttoncss" size="small" style="margin-bottom:10px" @click="addsave"
              >保存</el-button
            > -->
            <el-button type="primary" v-if="proru" class="buttoncss" size="small" style="margin-bottom: 10px" @click="daoru"
              >导入</el-button
            >
          </div>
          <el-table
            empty-text="无符合条件的记录"
            stripe
            border
            style="margin-top: 10px"
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
            v-loading="loading"
          >
            <el-table-column type="index" width="50" label="序号" align="center" prop="num"> </el-table-column>
            <el-table-column prop="bidWorkType" label="节点名称" width="150"> </el-table-column>
            <el-table-column prop="workDesc" label="工作结果">
              <template slot-scope="scope">
                <!-- v-if="showsubmit" -->
                <span v-if="showsubmit" placeholder="请输入工作结果">{{ scope.row.workDesc }}</span>
                <span v-else>{{ scope.row.workDesc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="endDate" label="完成日期" width="200" align="center">
              <template slot-scope="scope">
                <el-date-picker
                  @change="changeInput"
                  :disabled="showsubmit ? false : true"
                  v-model="scope.row.endDate"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择时限"
                ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="责任人" width="120" prop="userName" align="center" v-if="showsubmit">
              <template slot-scope="scope">
                <!-- <el-input v-model="scope.row.userName" placeholder="请输入内容"></el-input> -->
                <el-select
                  ref="select"
                  v-if="scope.row.bidWorkType == '施工方案' || scope.row.bidWorkType == '图纸'"
                  v-model="scope.row.userName"
                  filterable
                  remote
                  reserve-keyword
                  :remote-method="remoteMethod"
                  placeholder="请输入关键词"
                  :loading="loading1"
                  @focus="setEmpty"
                  @change="handle($event, scope.$index)"
                >
                  <el-tooltip
                    :open-delay="500"
                    v-for="item in options"
                    :key="item.value"
                    class="item"
                    effect="dark"
                    :content="item.title"
                    placement="left"
                  >
                    <el-option :label="item.userName" :value="item.userGuid"> </el-option>
                  </el-tooltip>
                </el-select>
                <!-- <el-input
                  v-model="scope.row.userName"
                  :disabled="true"
                  placeholder="请选择责任人"
                >
                  <el-button slot="append" icon="el-icon-search" @change="onAdd(scope.row.userName)"></el-button>
                </el-input> -->
                <span v-else>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="责任人" width="180" prop="userName" align="center" v-if="!showsubmit">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
  </el-main>
</template>

<script>
/**
 * 招标采购-入围标准
 */
import PlanMenu from "../components/PlanMenuDemo.vue";
import CertificateTree from "../components/CertificateTree";
import ProjectTree from "../../invest/components/ProjectTree2";
import showplanMenu from "../components/showplanMenu.vue";
import choseUser from "@/components/choseUser";
export default {
  name: "Step4",
  components: { PlanMenu, showplanMenu, CertificateTree, ProjectTree, choseUser },
  inject: ["reload"],
  data() {
    return {
      type: "",
      msg: "",
      showmessage: false,
      isCanEdit: false,
      loading: false,
      loading1: false,
      flag1: false,
      proru: false,
      savebao: true,
      showsubmit: false,
      id: "",
      tableData: [
        {
          id: this.id,
          workDesc: "",
          endDate: "",
          userName: "",
        },
      ],
      form: {
        id: "",
        baseId: "",
        cerInfos: [],
        regCapitalMin: 0,
        caseRequire: "",
        managerRequire: "",
        otherRequire: "",
      },
      message: "",
      value1: "",
      certificateVisible: false,
      options: [],
      list: [],
      /** 资质列表 */
      cers: [],
      rules: {
        caseRequire: [
          { required: true, message: "请输入既往业绩要求", trigger: "blur" },
          { min: 1, max: 1000, message: "不超过1000个字", trigger: "blur" },
        ],
        managerRequire: [
          { required: false, message: "请输入项目经理团队要求", trigger: "blur" },
          { min: 1, max: 1000, message: "不超过1000个字", trigger: "blur" },
        ],
        regCapitalMin: [
          { required: true, message: "请填写最低资金要求", trigger: ["blur"] },
          { type: "number", message: "必须是数字" },
        ],
      },
    };
  },
  computed: {
    planId() {
      return this.$route.params.baseId;
    },
  },

  created() {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.CheckCanEditPlan01();
    // this.GetSearchUserList21();
  },
  mounted() {
    this.getList();
    // this.$nextTick(() => {
    //   // 替换过滤函数
    //   this.$refs.select.validateOption = () => true;
    // });
  },
  methods: {
    CheckCanEditPlan01() {
      this.$http.get("/LiandoPlan/CheckCanEditPlan01?planId=" + this.planId).then((res) => {
        this.isCanEdit = res.data.success;
        this.msg = res.data.message;
        if (res.data.success) {
          this.showsubmit = true;
          this.showmessage = false;
        } else {
          this.showsubmit = false;
          if (res.data.message != "" || res.data.message != null) {
            this.showmessage = true;
            this.message = res.data.message;
          } else {
            this.showmessage = false;
          }
        }
      });
    },
    setEmpty() {
      this.options = [];
    },
    async getList() {
      let res = await this.$http.get("/LiandoPlan/GetBidWorkList04", { params: { planId: this.planId } });
      if (res.status == 200) {
        this.tableData = res.data;
        if (this.tableData != "") {
          this.proru = false;
          this.savebao = true;
        } else {
          this.proru = true;
          this.savebao = false;
        }
      }
    },
    addsave() {
      let arr = this.tableData.map((v) => {
        return {
          id: v.id,
          workDesc: v.workDesc,
          endDate: v.endDate,
          userGuid: v.userGuid,
        };
      });
      this.$http.post("/LiandoPlan/SaveBidWorkList04", arr).then((res) => {
        if (!res.status == 200) {
          // this.$msg.error(res.data.message);
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        } else {
          this.$msg.success(res.data.message);
          // this.dialogVisible = false;
          this.getList();
        }
      });
    },
    daoru() {
      this.$http.post("/LiandoPlan/CreatePlanWork04", { id: this.planId }).then((res) => {
        if (!res.status == 200) {
          // this.$msg.error(res.data.message);
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        } else {
          this.$msg.success(res.data.message);
          this.getList();
        }
      });
    },
    handle(val, index) {
      let str = this.options.find((v) => v.userGuid == val);
      this.tableData.forEach((v, i) => {
        if (i == index) {
          v.userGuid = val;
          v.userName = str.userName;
        }
      });
      this.addsave();
    },
    changeInput() {
      this.addsave();
    },
    onUserAdd(id) {
      console.log(id);
      const obj = {
        id: this.id,
        planId: this.planId,
        userGuid: id.userGuid,
      };
      this.$http.post("/LiandoPlan/SaveBidWorkPerson04", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.getList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    remoteMethod(query) {
      console.log(query);
      if (query !== "") {
        this.loading1 = true;
        this.GetSearchUserList21(query);
        this.loading1 = false;
      } else {
        this.options = [];
      }
    },
    // onAdd() {
    //   this.$http.get("/IdmUserInfo/GetSearchUserList21", { params: { keyWords: this.planId } });
    //   this.id = id;
    //   this.$refs.choseUser.openfnc();
    // },
    GetSearchUserList21(val) {
      this.$http.get("/IdmUserInfo/GetSearchUserList21", { params: { keyWords: val } }).then((res) => {
        this.options = res.data;
        console.log(this.options);
      });
    },

    onChangeKind(kind) {
      this.form.supCate = kind.id;
      this.form.supCateName = kind.cateName;
      this.form2.supCate = kind.id;
      this.flag1 = false;
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

.fromborder /deep/ [class^="el-icon-"],
[class*=" el-icon-"] {
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  text-transform: none;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 90%;
}
</style>
