<template>
  <el-main style="margin-bottom: 120px" class="pt-3">
    <!-- <div class="table-top-title" style="margin-bottom: 10px">
      {{ form.supplierName }}-{{ form.conName }}(合同签订日期：){{ form.conDate | formateTime }}
    </div> -->
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right" style="width: 150px">所属项目：</td>
          <td class="left">{{ form.projectName }}</td>
          <td class="right" style="width: 120px">供方名称：</td>
          <td class="left">{{ form.supplierName }}</td>
          <td class="right" style="width: 150px">合同名称：</td>
          <td class="left">{{ form.conName }}</td>
        </tr>
        <tr>
          <td class="right">合同签订日期：</td>
          <td class="left">{{ form.conDate | formateTime }}</td>
          <td class="right">合同金额：</td>
          <td class="left">{{ form.conValue }}</td>
          <td class="right">合同执行状态：</td>
          <td class="left">{{ form.state }}</td>
        </tr>
        <tr>
          <td class="right">所属专业：</td>
          <td class="left">{{ form.conCate }}</td>
          <td class="right">项目经理：</td>
          <td class="left">{{ form.userName }}</td>
          <td class="right"></td>
          <td class="left"></td>
        </tr>
      </tbody>
    </table>
    <el-form style="margin-top: 30px; display: flex" label-width="130px" :model="form2" ref="ruleForm" :rules="rules">
      <!-- <el-row :gutter="10">
        <el-col :span="8"> -->
      <el-form-item prop="tempId" label="履约评价模板：" style="width: 33%">
        <el-select v-model="form2.tempId" @change="selectTemp" style="width: 100%">
          <el-option v-for="item in tempData" :label="item.tempName" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- </el-col>
        <el-col :span="8"> -->
      <el-form-item prop="startTime" label="开始评审时间：" style="width: 33%">
        <el-date-picker type="date" style="width: 100%" v-model="form2.startTime" value-format="yyyy-MM-dd" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <!-- </el-col>
        <el-col :span="8"> -->
      <el-form-item prop="endTime" label="结束评审时间：" style="width: 33%">
        <el-date-picker type="date" style="width: 100%" v-model="form2.endTime" value-format="yyyy-MM-dd" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <!-- </el-col>
      </el-row> -->
    </el-form>
    <el-row style="text-align: right; margin-top: 10px">
      <el-button style="margin-left: 10px" v-if="showTemp" type="primary" size="small" @click="jumpTemp">模板预览</el-button>
      <el-button style="margin-left: 10px" type="primary" size="small" @click="onSubmit">启动评价</el-button>
      <!-- <el-button size="small" @click="onCancle">取消</el-button> -->
    </el-row>
    <div class="mt-4" v-if="showTemp">
      <el-table
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData"
        :header-cell-style="{ background: 'transparent' }"
      >
        <el-table-column label="评审人员信息" header-align="center">
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column prop="depName" label="评审条线" align="center"> </el-table-column>
          <el-table-column prop="stage" label="已选评审人" align="center">
            <template slot-scope="scope">
              <el-tag v-for="(item, i) in scope.row.persionList" @close="clearUser(item)" closable :key="i" class="mr-3">
                {{ item.userName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="选择评审人" align="center" width="160">
            <template slot-scope="scope">
              <i size="mini" class="el-icon-search" @click="openSelect(scope.row)" style="font-size: 14px"> 选择评审人</i>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :visible.sync="flag1" title="模板预览" width="70%" style="margin-bottom: 75px">
      <temp-list :id="form2.tempId" class="pb-3" />
    </el-dialog>
    <user-select
      ref="userSelect"
      :selectUser="[]"
      :deptData="tableData"
      :groupId="form2.id"
      :selectId="depId"
      @itemClick="getTempList"
      class="pb-3"
    />
  </el-main>
</template>

<script>
import { mapState } from "vuex";
import tempList from "./components/tempList";
import UserSelect from "./components/UserSelect";
import bus from "@/util/bus";
import { dateFormat } from "@/util/validate";
export default {
  components: { tempList, UserSelect },
  data() {
    return {
      rules: {
        tempId: [{ required: true, message: "请选择履约评价模板", trigger: "change" }],
        examineType: [{ required: true, message: "请选择评审分类", trigger: "change" }],
        mainId: [{ required: true, message: "请选择评价主体", trigger: "change" }],
        startTime: [{ required: true, message: "请选择开始评审时间", trigger: "change" }],
        endTime: [{ required: true, message: "请选择结束评审时间", trigger: "change" }],
      },
      form: {},
      tableData: [],
      form2: {
        id: "",
        // tempMasterId: "",
        // groupId: "",
        contractId: "",
        examineType: "",
        tempId: "",
        mainId: "",
        startTime: "",
        endTime: "",
      },
      // tempId:'',
      userName: "",
      tempData: [], //履约模板
      roleData: [], //评审分类
      evalData: [], //评价主体
      flag1: false,
      flag2: false,
      showTemp: false,
      depId: "",
    };
  },
  computed: {
    ...mapState("menu", { registerMenu: "menus" }),
  },
  mounted() {
    // bus.$emit("hideNav");
    let localStorage = JSON.parse(window.sessionStorage.getItem("BiddingStoreAsync"));
    this.userName = localStorage.userName;
    this.form2.id = this.$route.query.groupId;
    this.form2.contractId = this.$route.query.contractId;
    this.loadQuery();
    // 评审分类下拉
    this.$api.Evaluate.GetBidPersonRole().then((res) => {
      this.roleData = res;
    });
    this.$api.Evaluate.GetTempMasterList().then((res) => {
      this.tempData = res;
    });
    // 评价主体下拉
    this.$api.Evaluate.GetEvalMainList({ isEnable: true }).then((res) => {
      this.evalData = res.items;
      this.form2.mainId = res.items.length > 0 ? res.items[0].id : "";
      // if (res.totalCount == 1) {
      //   this.form2.mainId = res.items[0].id;
      // }
    });
  },
  filters: {
    //格式化日期
    formateTime(time) {
      return dateFormat(time, "yyyy-MM-dd");
    },
  },
  methods: {
    loadQuery() {
      this.$api.Evaluate.GetProjectContractList({ id: this.$route.query.id }).then((res) => {
        this.form = res.items[0];
      });
    },
    // 保存评价信息
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let isflag = false;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].persionList.length > 0) {
              isflag = true;
            } else {
              isflag = false;
            }
          }
          if (isflag) {
            // this.form2.tempId = '0104deac-ee3d-49b7-8a16-a67c00b7b33a'
            this.$confirm("确定提交此评价信息?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.$api.Evaluate.SubmitEvaluate(this.form2).then((res) => {
                  if (res.success) {
                    this.$message.success("已发送待办请等待打分");
                    let menu = this.registerMenu.find((x) => x.name == "履约评价").subMenus;
                    let id = menu.find((x) => x.name == "我发起的评价").index;
                    bus.$emit("changeSub", id);
                    this.$router.replace({
                      path: "/Evaluate/myEvaluate",
                    });
                    setTimeout(function () {
                      window.close();
                    }, 500);
                  }
                });
              })
              .catch(() => {
                this.$msg({ type: "info", message: "已取消" });
              });
          } else {
            this.$message.error("请将各个评审部门的人员添加完后再提交！");
          }
        }
      });
    },
    //评审人员信息
    getTempList(id) {
      let data = {
        tempMasterId: this.form2.tempId,
        // tempMasterId: '0104deac-ee3d-49b7-8a16-a67c00b7b33a',
        groupId: this.form2.id,
      };
      this.$api.Evaluate.GetTempDepartment(data).then((res) => {
        this.tableData = res;
      });
    },
    openSelect(row) {
      this.depId = row.depId;
      this.$refs.userSelect.open();
    },
    selectTemp(val) {
      this.getTempList(val);
      if (val) {
        this.showTemp = true;
      }
    },
    jumpTemp() {
      this.flag1 = true;
    },
    onCancle() {
      // window.close();
      this.$router.go(-1);
    },
    clearUser(item) {
      this.$api.Evaluate.DelEvalPerson({ id: item.id }).then((res) => {
        if (res.success) {
          this.$message.success("删除成功");
          this.getTempList();
        }
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

.redicon::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
