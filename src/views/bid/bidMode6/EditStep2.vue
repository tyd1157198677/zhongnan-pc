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
            >招标小组<span style="color: red">({{ message }})</span></el-breadcrumb-item
          >
          <el-breadcrumb-item v-else>招标小组</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-alert :title="msg" type="warning" v-if="!isCanEdit" :closable="false"> </el-alert> -->
        <div>
          <!-- <div> -->
          <el-tabs type="card" v-model="activeName" style="margin-top: 10px">
            <el-tab-pane label="招标组长" name="招标组长"> </el-tab-pane>
            <el-tab-pane label="商务组成员" name="商务组成员"> </el-tab-pane>
            <el-tab-pane label="技术组成员" name="技术组成员"> </el-tab-pane>
          </el-tabs>
          <div v-if="activeName == '招标组长'">
            <div class="fromborder">
              <el-row>
                <div style="margin-bottom: 10px">
                  <span style="color: #dc3545">*组长只能选择一位</span>
                  <el-button type="primary" size="small" style="float: right; margin-bottom: 10px" v-if="showsubmit" @click="onAdd"
                    >添加成员</el-button
                  >
                </div>
                <el-table
                  empty-text="无符合条件的记录"
                  stripe
                  border
                  element-loading-text="请稍候,数据正在加载中..."
                  :data="zuzhangdata"
                  v-loading="loading"
                >
                  <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                  <el-table-column label="姓名" prop="userName" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.userName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
                  <el-table-column label="操作" width="80" align="center" v-if="showsubmit">
                    <template slot-scope="scope">
                      <i class="el-icon-delete" title="删除" @click="onDelete(scope.row)"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </div>
          </div>
          <div v-else>
            <el-select style="margin-bottom: 10px" v-model="biaoduanvalue" size="small" placeholder="请选择标段" @change="handleChange">
              <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value"> </el-option>
            </el-select>
            <shang-wu ref="shangwu" v-if="activeName == '商务组成员'" :biaoduanvalue="biaoduanvalue"></shang-wu>
            <ji-shu ref="jishu" v-if="activeName == '技术组成员'" :biaoduanvalue="biaoduanvalue"></ji-shu>
          </div>
        </div>
      </el-col>
    </el-row>
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
  </el-main>
</template>

<script>
/**
 * 招标采购-计划节点
 */
import shangWu from "./shangWu.vue";
import jiShu from "./jiShu.vue";
import planMenu from "../components/PlanMenuDemo.vue";
import showplanMenu from "../components/showplanMenu.vue";
import choseUser from "@/components/choseUser";
export default {
  name: "Step2",
  components: { planMenu, showplanMenu, choseUser, shangWu, jiShu },
  inject: ["reload"],
  data() {
    return {
      type: 1,
      msg: "",
      showsubmit: false,
      isCanEdit: false,
      activeName: "招标组长",
      message: "",
      showmessage: false,
      value: "",
      biaoduanvalue: "",
      options: [],
      loading: false,
      loadingshangwu: false,
      loadingjishu: false,
      zuzhangdata: [],
      flag2: false,
      form: {
        id: "",
        baseId: "",
        modeConfirmDate: "",
        supplierInvesDate: "",
        dwgFileDate: "",
        listEditDate: "",
        bidSendDate: "",
        bidOpenDate: "",
        bidEndDate: "",
      },
    };
  },
  computed: {
    planId() {
      return this.$route.params.baseId;
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
    // this.getBaseInfo()
  },
  mounted() {
    // this.form = this.$route.query.row ? this.$route.query.row : {};
    // this.getzuzhangList();
    // this.getSelectionlist();
    this.CheckCanEditPlan01();
    this.getzuzhangList();
    this.getSelectionlist();
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
    async getSelectionlist() {
      let res = await this.$http.get("/LiandoPlan/GetSectionDropDown03", { params: { planId: this.planId } });
      this.biaoduanvalue = res.data.length > 0 ? res.data[0].value : "";
      this.options = res.data;
      this.getzuzhangList();
    },
    handleChange() {
      switch (this.activeName) {
        case "招标组长":
          this.getzuzhangList();
          break;
        case "商务组成员":
          setTimeout(() => {
            this.$refs.shangwu.getshangwuList();
          }, 200);
          break;
        case "技术组成员":
          setTimeout(() => {
            this.$refs.jishu.getjishuList();
          }, 200);
          break;
      }
    },
    onAdd() {
      this.type = 1;
      this.$refs.choseUser.openfnc();
    },
    onUserAdd(id) {
      const obj = {
        planId: this.planId,
        userGuid: id.userGuid,
        sectionId: this.biaoduanvalue,
      };
      this.$http.post("/LiandoPlan/SaveBidLeader03", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.getzuzhangList();
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    getzuzhangList() {
      // this.loading = true;
      this.$http
        .get("/LiandoPlan/GetBidLeader03", { params: { planId: this.planId } })
        // console.log(this.planId);
        .then((res) => {
          // console.log(res);
          // this.loading = false;
          if (res.data.id == "00000000-0000-0000-0000-000000000000") {
            this.zuzhangdata = [];
          } else {
            this.zuzhangdata = [res.data];
          }
        });
    },
    onDelete(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoPlan/DeleteUser03", { id: opt.id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.getzuzhangList();
        });
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
::v-deep .el-table__header-wrapper .el-checkbox {
  display: none;
}
</style>
