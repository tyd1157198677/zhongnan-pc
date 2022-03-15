<template>
  <el-main style="margin-bottom: 120px" class="pt-3">
    <div class="table-top-title" style="margin-bottom: 10px">评价详情</div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="center" colspan="4">
            {{ form.tempName }}
          </td>
        </tr>
        <tr>
          <td class="right">被考评供方：</td>
          <td colspan="3">
            {{ form.supplierName }}
          </td>
        </tr>
        <tr>
          <td class="right">合同信息：</td>
          <td colspan="3">
            {{ form.conName }}
          </td>
        </tr>
        <tr>
          <td class="right">发起人：</td>
          <td>
            {{ form.creatorUserName }}
          </td>
          <td class="right">评审状态：</td>
          <td>
            {{ form.isCompleted ? "已结束" : "打分中" }}
          </td>
        </tr>
        <tr>
          <td class="right">发起日期：</td>
          <td>
            {{ form.creationTime | formateTime }}
          </td>
          <td class="right">结束日期：</td>
          <td>{{ form.endTime | formateTime }}</td>
        </tr>
        <tr>
          <td class="right">规定参与部门：</td>
          <td colspan="3">{{ form.allDepNames }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4">
      <el-table
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData"
        :header-cell-style="{ background: 'transparent' }"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="userName" label="评审人" align="center"> </el-table-column>
        <el-table-column prop="depName" label="评审部门" align="center"> </el-table-column>
        <el-table-column prop="isCompleted" label="评审状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.isCompleted ? "已完成" : "未完成" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fullScore" label="满分" align="center"> </el-table-column>
        <el-table-column prop="score" label="得分" align="center">
          <template slot-scope="scope">
            <el-link
              v-if="scope.row.isCompleted != false"
              type="primary"
              icon="el-icon-search"
              style="margin-left: 10px; color: #409eff; text-decoration: none"
              @click="handleDetail(scope.row.id)"
              >{{ scope.row.score }}</el-link
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <i
              v-if="!scope.row.isCompleted && form.canUpdate"
              @click="handleDelete(scope.row.id)"
              class="el-icon-delete"
              title="删除人员"
              style="margin-left: 5px"
            />
            <i v-if="scope.row.isCompleted" class="el-icon-picture" @click="handlePreview(scope.row.id)" title="评价预览" />
          </template>
        </el-table-column>
      </el-table>
      <el-button
        v-if="!form.isCompleted && form.canUpdate"
        @click="openSelect"
        size="small"
        type="primary"
        style="float: right"
        class="mt-3"
      >
        编辑评审人
      </el-button>
      <el-button
        v-if="!form.isCompleted && form.canUpdate"
        @click="handleUrge"
        size="small"
        type="primary"
        style="float: right"
        class="mt-3 mr-3"
      >
        催办
      </el-button>
      <el-button
        v-if="form.isCompleted && form.canUpdate"
        @click="handleReset"
        size="small"
        type="primary"
        style="float: right"
        class="mt-3"
      >
        重新评审
      </el-button>
    </div>
    <!-- <el-dialog :visible.sync="flag2" title="履约评价选择评审人" width="70%"> -->
    <user-select
      ref="userSelect"
      @itemClick="getTempList"
      :selectUser="[]"
      :deptData="deptData"
      :groupId="groupId"
      :deptId="deptId"
      class="pb-3"
    />
    <!-- </el-dialog> -->
    <!-- 查看得分详情 -->
    <el-dialog @closed="close" :visible.sync="detailForm.dialog" title="得分详情" width="70%" style="margin-bottom: 75px">
      <review-detail v-if="dialog1" :id="detailForm.id" />
    </el-dialog>
    <!-- 评价预览 -->
    <el-dialog :visible.sync="dialog" title="评价预览" width="70%" style="margin-bottom: 75px">
      <!-- <preview :id="previewForm.id" ref="ref1" /> -->
      <el-table
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData1"
        max-height="500"
        :header-cell-style="{ background: 'transparent' }"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column label="评审指标">
          <template slot-scope="scope">
            <span>
              <strong>{{ scope.row.wdName }} - {{ scope.row.zbName }}</strong>
              <br />
              <span>{{ scope.row.standard }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fullScore" label="范围" align="center" width="100"> </el-table-column>
        <el-table-column prop="gradeScore" label="评审得分" align="center" width="100"> </el-table-column>
      </el-table>
    </el-dialog>
  </el-main>
</template>

<script>
import { dateFormat } from "@/util/validate";
export default {
  components: {
    UserSelect: () => import("./components/UserSelect"),
    tempList: () => import("./components/tempList"),
    reviewDetail: () => import("./reviewDetail"),
    Preview: () => import("./preview"),
  },
  data() {
    return {
      groupId: this.$route.query.id,
      form: {},
      tableData: [],
      tableData1: [],
      tempId: "",
      tempData: [], //履约模板
      roleData: [], //评审分类
      evalData: [], //评价主体
      deptData: [],
      flag1: false,
      flag2: false,
      showTemp: false,
      deptId: "",
      detailForm: {
        dialog: false,
      },
      dialog: false,
      dialog1: false,
    };
  },
  mounted() {
    this.loadQuery();
    this.getTempList();
  },
  filters: {
    //格式化日期
    formateTime(time) {
      return dateFormat(time, "yyyy-MM-dd");
    },
  },
  methods: {
    loadQuery() {
      this.$api.Evaluate.GetDetailByGroupId({ groupId: this.groupId }).then((res) => {
        this.form = res;
        this.tempId = res.tempId;
        //查询部门信息
        let data = {
          tempMasterId: this.tempId,
          // tempMasterId: '0104deac-ee3d-49b7-8a16-a67c00b7b33a',
          groupId: this.groupId,
        };
        this.$api.Evaluate.GetTempDepartment(data).then((res) => {
          this.deptData = res;
        });
      });
    },
    //重新评审
    handleReset(id) {
      this.$api.Evaluate.AgainEvaluate({ id: this.groupId }).then((res) => {
        if (res.success) {
          this.$message.success("已重新发起打分");
          this.loadQuery();
          this.getTempList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //催办
    handleUrge() {
      this.$api.Evaluate.UrgePerson({ id: this.groupId }).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
          this.loadQuery();
          this.getTempList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleDetail(id) {
      this.detailForm.dialog = true;
      this.dialog1 = true;
      this.detailForm.id = id;
      // window.open(`#/Evaluate/reviewDetail?id=${id}`);
    },
    close() {
      this.detailForm.dialog = false;
      this.dialog1 = false;
      this.detailForm.id = "";
      // window.open(`#/Evaluate/reviewDetail?id=${id}`);
    },
    handlePreview(id) {
      this.getList(id);
      this.dialog = true;
    },
    handleDelete(id) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.Evaluate.DelEvalPerson({ id: id })
          .then((res) => {
            if (res.success) {
              this.$msg.success("删除成功");
              this.getTempList();
            }
          })
          .finally(() => {});
      });
    },
    //评审人员信息
    getTempList(id) {
      let data = {
        groupId: this.groupId,
      };
      this.$api.Evaluate.GetEvalPersonSorceList(data).then((res) => {
        this.tableData = res;
      });
    },
    getList(evalPersonId) {
      let data = {
        evalPersonId,
      };
      this.$api.Evaluate.GetEvaluateGradeDetail(data).then((res) => {
        this.tableData1 = res.persionEvaluate;
      });
    },
    openSelect(val) {
      this.deptId = val.depId;
      this.$refs.userSelect.open();
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
