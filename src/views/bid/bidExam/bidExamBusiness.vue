<!--  -->
<template>
  <div style="margin: 0px auto 10px; margin-bottom: 65px; width: 88%">
    <div style="height: 40px">
      <span
        ><strong>{{ showmessage }}</strong></span
      >
      <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
      <!-- <i class="el-icon-s-home" style="float:right;margin-left:10px;" title="点击进入首页" @click="gohome"></i> -->
    </div>
    <div class="pub">{{ this.title }}</div>
    <div class="top">
      <span>标段名：{{ tableList.sectionName }}</span>
      <span class="sp1">供应商名称：{{ tableList.supplierName }}</span>
      <span class="sp1">评标类型：{{ tableList.examType }}</span>
    </div>
    <el-table
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="tableList.examItemList"
      v-loading="loading"
    >
      <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
      <el-table-column label="评审项">
        <template slot-scope="scope">
          <div>
            <strong>{{ scope.row.itemTitle }}</strong>
          </div>
          <div class="text">{{ scope.row.itemDesc }}</div>
        </template>
      </el-table-column>
      <el-table-column label="满分" align="center" prop="fullScore" width="80"></el-table-column>
      <el-table-column label="得分" align="center" width="200">
        <template slot-scope="scope">
          <el-input-number
            size="mini"
            v-model="scope.row.score"
            :precision="2"
            :step="0.5"
            :min="0"
            :max="scope.row.fullScore"
            placeholder="请打分"
          ></el-input-number>
        </template>
      </el-table-column>
    </el-table>
    <el-input show-word-limit style="margin-top: 10px" type="textarea" placeholder="请输入备注内容" v-model="resultDesc"> </el-input>
    <el-button type="danger" size="mini" @click="submitResult" style="float: right; margin: 10px 0">提交评标结果</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      recordId: "",
      todoId: "",
      showmessage: "",
      title: "",
      resultDesc: "",
      loading: false,
      tableList: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.recordId = this.$route.query.recordId || this.GetQueryValue("recordId");
    this.todoId = this.$route.query.todoId || this.GetQueryValue("todoId");
    this.GetExamScorePageShow();
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
  },
  methods: {
    gohome() {
      this.$router.push({
        path: "/index",
      });
    },
    //获取url里的值
    GetQueryValue(variable) {
      let s = window.location.search.substring(1);
      var vars = s.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then((res) => {
        this.showmessage = res.data;
      });
    },
    GetExamScorePageShow() {
      this.$http.get("/BidExam/GetExamScorePageShow", { params: { recordId: this.recordId } }).then((res) => {
        this.tableList = res.data;
        this.title = res.data.title;
        this.tableList.examItemList = this.tableList.examItemList.map((item) => {
          return {
            ...item,
            score: item.fullScore / 2,
          };
        });
      });
    },
    //提交评审
    submitResult() {
      this.$confirm("提交后不能修改，确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let tableList = this.tableList;
        let arr = tableList.examItemList.map((item) => {
          return {
            id: item.id,
            giveScore: item.score,
          };
        });
        let obj = {
          examMasterId: tableList.examMasterId,
          bidModeId: tableList.bidModeId,
          sectionId: tableList.sectionId,
          supplierId: tableList.supplierId,
          supplierName: tableList.supplierName,
          personRecordGuid: tableList.personRecordGuid,
          tempId: tableList.tempId,
          examItemScores: arr,
          resultDesc: this.resultDesc,
          todoId: this.todoId,
        };
        this.$http.post("/BidExam/SubmitExamScore ", obj).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            window.history.back();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.top {
  margin: 10px 0;
  .sp1 {
    margin: 0 15px;
  }
  span {
    font-weight: 600;
    font-size: 16px;
  }
}
strong {
  font-weight: 600;
  font-size: 14px;
}
.text {
  font-size: 13px;
}
.pub {
  border-left: 3px solid #21468c;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background: #f4f4f4;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
}
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 20px;
  float: right;
  cursor: pointer;
}
</style>
