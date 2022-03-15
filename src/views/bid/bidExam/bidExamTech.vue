<!--  -->
<template>
  <div style="margin: 0px auto 10px; margin-bottom: 65px; width: 88%">
    <div style="height: 40px">
      <!-- <span
        ><strong>{{ showmessage }}</strong></span
      > -->
      <el-select v-model="value" @change="handleChange" style="width: 400px">
        <el-option v-for="item in supplierLists" :key="item.value" :label="item.text" :value="item.value"> </el-option>
      </el-select>
      <i
        class="el-icon-s-operation"
        style="float: right; margin-left: 10px; margin-top: 10px; font-size: 28px"
        title="点击查看招标过程"
        @click="goto"
      ></i>
      <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
      <!-- <i class="el-icon-s-home" style="float:right;margin-left:10px;" title="点击进入首页" @click="gohome"></i> -->
    </div>
    <div class="pub">{{ this.title }}</div>
    <!-- <div class="top">
      <span>标段名：{{ tableList.sectionName }}</span>
      <span class="sp1">评标类型：{{ tableList.examType }}</span>
    </div> -->
    <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableList1" v-loading="loading">
      <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
      <el-table-column label="评审项" align="left" header-align="center">
        <template slot-scope="scope">
          <div>
            <strong>{{ scope.row.itemTitle }}</strong>
          </div>
          <div class="text">{{ scope.row.itemDesc }}</div>
        </template>
      </el-table-column>
      <el-table-column label="满分" align="center" prop="fullScore" width="80"></el-table-column>
      <el-table-column label="得分" align="center" width="200" v-if="canEdit">
        <template slot-scope="scope">
          <el-input-number
            size="small"
            v-model="scope.row.score"
            :precision="2"
            :step="0.5"
            :min="0"
            :max="scope.row.fullScore"
            placeholder="请打分"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="得分" align="center" width="200" v-if="!canEdit">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.giveScore }}</span> -->
          <el-input-number
            disabled
            size="small"
            v-model="scope.row.giveScore"
            :precision="2"
            :step="0.5"
            :min="0"
            :max="scope.row.fullScore"
            placeholder="请打分"
          ></el-input-number>
        </template>
      </el-table-column>
    </el-table>
    <div class="redColor">
      <span class="red1">如果得分低于总分的60%必需填写说明</span>
      <span>
        <span style="margin-right: 20px"
          >总分：<span class="red1">{{ full }}</span
          ><span>分</span></span
        >
        <span v-if="canEdit"
          >得分：<span class="red1 spt">{{ total }}</span
          ><span>分</span></span
        >
        <span v-if="!canEdit"
          >得分：<span class="red1 spt">{{ giveScoretotal }}</span
          ><span>分</span></span
        >
      </span>
    </div>
    <el-input v-if="canEdit" show-word-limit style="margin-top: 10px" type="textarea" placeholder="" v-model="resultDesc"> </el-input>
    <el-input style="margin-top: 10px" type="textarea" show-word-limit v-if="!canEdit" v-model="resultDesc"></el-input>
    <el-button type="danger" size="mini" v-if="canEdit" @click="submitResult" style="float: right; margin: 10px 0">提交评标结果</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value: "",
      bjurl: require("@/assets/gohome.png"),
      recordId: "",

      todoId: "",
      showmessage: "",
      title: "",
      resultDesc: "",
      canEdit: false,
      loading: false,
      supplierLists: [],
      tableList: {
        // sectionName: "标段一",
        // supplierName: "测试供应商",
        // ExamType: "评技术标",
        // examItemList: [
        //   { itemTitle: "测试标题1", itemDesc: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试", fullScore: 10 },
        //   { itemTitle: "测试标题2", itemDesc: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试", fullScore: 20 },
        // ],
      },
      tableList1: [],
    };
  },
  computed: {
    full() {
      return this.tableList1.map((row) => row.fullScore).reduce((acc, cur) => cur + acc, 0);
      // .toFixed(2);
    },
    total() {
      return this.tableList1.map((row) => (!row.score ? 0 : row.score)).reduce((acc, cur) => cur + acc, 0);
      // .toFixed(2);
    },
    giveScoretotal() {
      return this.tableList1.map((row) => (!row.giveScore ? 0 : row.giveScore)).reduce((acc, cur) => cur + acc, 0);
      // .toFixed(2);
    },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
  },
  watch: {},
  created() {},
  mounted() {
    this.examMasterId = this.$route.query.examMasterId;
    // this.recordId = this.$route.query.recordId || this.GetQueryValue("recordId");
    this.todoId = this.$route.query.todoId;
    this.GetExamScorePageShow1001();
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
    goto() {
      window.open("#/bid/processDetail?id=" + this.bidModeId);
      console.log(this.bidModeId);
    },
    GetExamScorePageShow1001() {
      let obj = {
        examMasterId: this.examMasterId,
      };
      this.$http.get("/BidExam/GetExamScorePageShow1001", { params: obj }).then((res) => {
        this.supplierLists = res.data.supplierDropDown;
        // this.value = res.data.supplierDropDown.length > 0 ? res.data.supplierDropDown[0].value : "";
        if (this.value == "") {
          this.value = res.data.thisSupplierId;
        }
        // if (res.data.thisComFullName != "") {
        //   // this.comFullName = res.data.thisComFullName;
        //   this.$alert("当前选中【" + res.data.thisComFullName + "】进行打分", {
        //     confirmButtonText: "关闭",
        //   });
        // }
        this.recordId = res.data.recordId;
        this.bidModeId = res.data.bidModeId;
        this.GetExamScorePageShow1002();
      });
    },
    handleChange() {
      this.GetExamScorePageShow1002();
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then((res) => {
        this.showmessage = res.data;
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
    // GetExamScorePageShow() {
    //   this.$http.get("/BidExam/GetExamScorePageShow", { params: { recordId: this.recordId } }).then(res => {
    //     this.tableList = res.data;
    //     this.canEdit = res.data.canEdit;
    //     this.resultDesc = res.data.resultDesc;
    //     this.title = res.data.title;
    //     this.pageMessage = res.data.pageMessage;
    //     this.tableList1 = this.tableList.examItemList
    //       ? this.tableList.examItemList.map(item => {
    //           return {
    //             ...item,
    //             score: item.fullScore / 2,
    //           };
    //         })
    //       : [];
    //   });
    // },
    GetExamScorePageShow1002() {
      this.$http
        .get("/BidExam/GetExamScorePageShow1002", { params: { examMasterId: this.examMasterId, supplierId: this.value } })
        .then((res) => {
          this.tableList = res.data;
          this.canEdit = res.data.canEdit;
          this.resultDesc = res.data.resultDesc;
          this.title = res.data.title;
          this.pageMessage = res.data.pageMessage;
          this.tableList1 = this.tableList.examItemList
            ? this.tableList.examItemList.map((item) => {
                return {
                  ...item,
                  score: item.fullScore / 2,
                };
              })
            : [];
        });
    },
    // GetUserNextExamTodo() {
    //   this.$http.get("/BidExam/GetUserNextExamTodo", { params: { deviceType: "pc" } }).then(res => {
    //     if (res.data.returnValue1 != "") {
    //       this.returnValue1 = res.data.returnValue1.substr(2);
    //       console.log(this.returnValue1);
    //       this.$confirm("还有未处理的技术评标，是否现在处理?", "提示", {
    //         confirmButtonText: "确定",
    //         cancelButtonText: "取消",
    //         type: "warning",
    //       }).then(() => {
    //         this.$router
    //           .push({
    //             path: this.returnValue1,
    //           })
    //           // this.GetExamScorePageShow();
    //           .finally(() => {
    //             this.recordId = this.$route.query.recordId;
    //             console.log(this.recordId);
    //             this.GetExamScorePageShow();
    //           });
    //       });
    //     }
    //   });
    // },
    //提交评审
    submitResult() {
      console.log(this.resultDesc);
      console.log(this.total / this.full);
      if (this.total / this.full < 0.6) {
        if (this.resultDesc == null || this.resultDesc == "") {
          this.$alert("低于总分的60%必须填写说明后再提交！", "提示", {
            confirmButtonText: "确定",
            type: "warning",
          });
        } else {
          this.$confirm("提交后不能修改，确定要提交吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let tableList = this.tableList1;
            let arr = tableList.map((item) => {
              return {
                id: item.id,
                giveScore: !item.score ? 0 : item.score,
              };
            });
            let obj = {
              examMasterId: this.tableList.examMasterId,
              bidModeId: this.tableList.bidModeId,
              sectionId: this.tableList.sectionId,
              supplierId: this.tableList.supplierId,
              supplierName: this.tableList.supplierName,
              personRecordGuid: this.tableList.personRecordGuid,
              tempId: this.tableList.tempId,
              examItemScores: arr,
              resultDesc: this.resultDesc,
              todoId: this.todoId,
            };
            this.$http.post("/BidExam/SubmitExamScore ", obj).then((res) => {
              if (res.data.success) {
                this.$message.success(res.data.message);
                this.GetExamScorePageShow1001();
                if (this.pageMessage != "") {
                  this.$alert(pageMessage, "提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                  });
                }
                // this.GetUserNextExamTodo();
                // window.history.back();
              } else {
                this.$alert(res.data.message, "提示", {
                  confirmButtonText: "确定",
                  type: "warning",
                });
                this.GetExamScorePageShow1001();
              }
            });
          });
        }
      } else {
        this.$confirm("提交后不能修改，确定要提交吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let tableList = this.tableList1;
          let arr = tableList.map((item) => {
            return {
              id: item.id,
              giveScore: !item.score ? 0 : item.score,
            };
          });
          let obj = {
            examMasterId: this.tableList.examMasterId,
            bidModeId: this.tableList.bidModeId,
            sectionId: this.tableList.sectionId,
            supplierId: this.tableList.supplierId,
            supplierName: this.tableList.supplierName,
            personRecordGuid: this.tableList.personRecordGuid,
            tempId: this.tableList.tempId,
            examItemScores: arr,
            resultDesc: this.resultDesc,
            todoId: this.todoId,
          };
          this.$http.post("/BidExam/SubmitExamScore ", obj).then((res) => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.GetExamScorePageShow1001();
              if (this.pageMessage != "") {
                this.$alert(pageMessage, "提示", {
                  confirmButtonText: "确定",
                  type: "warning",
                });
              }
              // this.GetUserNextExamTodo();
              // window.history.back();
            } else {
              this.$alert(res.data.message, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              });
              this.GetExamScorePageShow1001();
            }
          });
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.redColor {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  .red1 {
    color: red;
  }
  .spt {
    display: inline-block;
    width: 30px;
  }
}
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
  margin-top: 10px;
  margin-bottom: 10px;
  float: right;
  cursor: pointer;
}
</style>
