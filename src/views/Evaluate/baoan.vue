<template>
  <el-main style="margin-bottom: 120px">
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
          <td class="left">{{ form.conDate }}</td>
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
    <baoan :isShow="isShow" style="margin-top: 10px" v-if="majorType == '保安类'" @isShowBtn="isShowBtn"></baoan>
    <baojie :isShow="isShow" style="margin-top: 10px" v-if="majorType == '保洁类'" @isShowBtn="isShowBtn"></baojie>
    <lvhua :isShow="isShow" style="margin-top: 10px" v-if="majorType == '绿化类'" @isShowBtn="isShowBtn"></lvhua>
  </el-main>
</template>
<script>
import { dateFormat } from "@/util/validate";
export default {
  components: {
    baoan: () => import("./components/baoAnmodle.vue"),
    baojie: () => import("./components/baojieModle.vue"),
    lvhua: () => import("./components/lvhuaModle.vue"),
  },
  data() {
    return {
      formSearch: {
        IsStart: true,
        isCompleted: "",
        SupplierName: "",
        ConName: "",
        TempId: "",
        MainId: "",
        SkipCount: 0,
        MaxResultCount: 10,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      id: this.$route.query.id,
      groupId: this.$route.query.groupId,
      majorType: "",
      form: {},
      tempData: [], //履约模板
      tableData: [],
      evalData: [],
      loading: false,
      isShow: false,
    };
  },
  filters: {
    //格式化日期
    formateTime(time) {
      return dateFormat(time, "yyyy-MM-dd");
    },
  },
  created() {
    this.loadQuery();
  },
  methods: {
    loadQuery() {
      let obj = {
        SkipCount: 0,
        MaxResultCount: 10,
        id: this.id,
      };
      this.$api.Evaluate.GetProjectContractList(obj).then((res) => {
        this.form = res.items[0];
        this.form.conDate = this.form.conDate.substring(0, this.form.conDate.indexOf("T"));
      });
      this.isShowBtn();
    },
    isShowBtn() {
      this.$http.get("/StartEvaluate/GetEvaluateGroupById?groupId=" + this.groupId).then((res) => {
        if (res.status == 200) {
          this.majorType = res.data.majorType;
          this.isShow = !res.data.state || res.data.state == "供应商驳回" ? true : false;
        }
      });
    },
    //得分详情
    jumpDetail(id) {
      // window.open(`#/Evaluate/scoreDetail?id=${id}`)
      this.$router.push({
        name: "Evaluate-scoreDetail",
        query: {
          id: id,
        },
      });
    },
    deleate(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.Evaluate.DelEvaluate({ id: id }).then((res) => {
            if (res.success) {
              this.$message.success("删除成功");
              this.loadQueryForm();
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
.el-select {
  width: 100%;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
</style>
