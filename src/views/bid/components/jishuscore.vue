<!--  -->
<template>
  <div style="width:100%">
    <!--<el-tabs v-model="activeName2" type="card" @tab-click="tabsClick1">-->
    <!--<el-tab-pane v-for="item in supplierList" :key="item.id" :label="item.sectionName" :name="item.id"> </el-tab-pane>-->
    <!--</el-tabs>-->

    <el-select v-model="activeName2" @change="selectpage" style="float: right;margin-top:10px;width:20%">
      <el-option v-for="item in supplierList" :key="item.id" :label="item.sectionName" :value="item.id"> </el-option>
    </el-select>
    <el-tabs v-model="activeName" type="card" style="margin-top:10px" @tab-click="tabsClick">
      <el-tab-pane label="技术得分" name="技术得分">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!--<span>{{ pageMessage }}</span>-->
          </div>
          <div class="text item">
            <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableData.techScoreList"
              v-loading="loading"
            >
              <el-table-column label="排名" width="80" align="center" prop="sort"> </el-table-column>
              <el-table-column label="投标方" align="center" prop="comFullName"> </el-table-column>
              <el-table-column v-for="(item, index) in tableData.titleList" :key="item" :label="item" align="center" prop="finalScoreList">
                <template slot-scope="scope">
                  <span>{{ scope.row.finalScoreList[index] }}</span>
                </template>
              </el-table-column>
              <el-table-column label="查看明细" width="120" align="center" prop="finalScore">
                <template slot-scope="scope">
                  <el-radio @change="mingXi(scope.row)" v-model="selectedRowId" :label="scope.row.supplierId" style="color:#409eff;"
                    >查看明细</el-radio
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <el-card class="box-card" style="margin-top: 30px;">
          <div slot="header" class="clearfix">
            <span>明细表</span>
            <!--<el-select v-model="activeName2" @tab-click="tabsClick1" style="float: right;">-->
            <!--<el-option v-for="item in supplierList" :key="item.value" :label="item.text" :value="item.value"> </el-option>-->
            <!--</el-select>-->
          </div>
          <div class="text item">
            <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="table2.scoreItemList"
              v-loading="loading"
            >
              <el-table-column label="序号" width="50" type="index" align="center"> </el-table-column>
              <el-table-column label="指标及指标" show-overflow-tooltip align="left" prop="zbName">
                <template slot-scope="scope">
                  <span>{{ scope.row.wdName }}-{{ scope.row.zbName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="打分标准" show-overflow-tooltip align="left" prop="itemDesc">
                <template slot-scope="scope">
                  <span>{{ scope.row.itemDesc }}</span>
                </template>
              </el-table-column>
              <el-table-column label="满分" align="center" prop="fullScore" width="50"> </el-table-column>
              <el-table-column
                width="80"
                v-for="(item, index) in table2.personNameList"
                :key="item"
                :label="item"
                align="center"
                prop="finalScoreList"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.personScoreList[index] }}</span>
                </template>
              </el-table-column>
              <el-table-column label="平均分" align="center" prop="avgScore" width="70"> </el-table-column>
            </el-table>
          </div>
        </el-card>
        <!-- <div style="float:right;magin-left:10px" v-if="this.table2.finalScore != null">最后得分：{{ table2.finalScore }}</div>
        <div style="float:right;magin-left:10px" v-if="this.table2.myScore != null">我的打分：{{ table2.myScore }}</div> -->
      </el-tab-pane>
      <el-tab-pane label="评技术标" name="评技术标" v-if="showExamTab">
        <div>
          <div style="height:40px">
            <el-select v-model="value" @change="handleChange" style="width:400px">
              <el-option v-for="item in supplierLists" :key="item.value" :label="item.text" :value="item.value"> </el-option>
            </el-select>
          </div>
          <!-- <div class="pub">{{ this.title }}</div>
          <div class="top">
            <span>标段名：{{ tableList.sectionName }}</span>
            <span class="sp1">评标类型：{{ tableList.examType }}</span>
          </div> -->
          <el-table
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableList1"
            v-loading="loading"
          >
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
              <span style="margin-right:20px;"
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
          <el-input
            maxlength="500"
            v-if="canEdit"
            show-word-limit
            style="margin-top:10px"
            type="textarea"
            placeholder=""
            v-model="resultDesc"
          >
          </el-input>
          <el-input style="margin-top:10px" type="textarea" maxlength="500" show-word-limit v-if="!canEdit" v-model="resultDesc"></el-input>
          <el-button type="danger" size="mini" v-if="canEdit" @click="submitResult" style="float:right;margin:10px 0"
            >提交评标结果</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRowId: "",
      id: this.$route.query.id,
      sectionId: this.$route.query.sectionId,
      type: 0,
      activeName: "技术得分",
      value: "",
      tableList: [],
      tableList1: [],
      title: "",
      resultDesc: "",
      canEdit: false,
      loading: false,
      supplierLists: [],
      activeName1: "",
      activeName2: "",
      activeName3: [],
      pageMessage: "",
      titleList: [],
      loading: false,
      showExamTab: false,
      //       tableData: {
      //           titleList: ["BIAOTI"],
      // techScoreList: [{
      //     sort: "100",
      //     comFullName: "ahsjs",
      //     finalScoreList: ["首次开标"],
      //     finalScore: "100"
      // }]
      //       },
      tableData: {},
      tableList2: { openTechExplainList: [] },
      supplierList: [],
      table2: [],
    };
  },
  computed: {
    full() {
      return this.tableList1.map(row => row.fullScore).reduce((acc, cur) => cur + acc, 0);
    },
    total() {
      return this.tableList1.map(row => (!row.score ? 0 : row.score)).reduce((acc, cur) => cur + acc, 0);
    },
    giveScoretotal() {
      return this.tableList1.map(row => (!row.giveScore ? 0 : row.giveScore)).reduce((acc, cur) => cur + acc, 0);
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.type = this.$route.query.type;
    this.GetSupplierInPageShow1();
  },
  methods: {
    tabsClick(e) {
      if (this.activeName == "技术得分") {
        this.GetSupplierInPageShow1();
      } else {
        this.GetSupplierInPageShow2();
      }
    },
    mingXi(row) {
      this.$http
        .get("/BidExamScore/GetMySupplierTechScore", {
          params: { bidModeId: this.id, sectionId: row.sectionId, supplierId: row.supplierId },
        })
        .then(res => {
          this.table2 = res.data;
        });
    },
    GetSupplierInPageShow1() {
      this.$http.get("/BidOpen/GetOpenTechShowPage", { params: { bidModeId: this.id } }).then(res => {
        this.supplierList = res.data.sectionList;
        this.activeName2 = res.data.thisSectionId;
        this.GetExamTechFinalScore();
      });
    },
    GetSupplierInPageShow2() {
      this.$http.get("/BidOpen/GetOpenTechShowPage", { params: { bidModeId: this.id } }).then(res => {
        this.supplierList = res.data.sectionList;
        this.activeName2 = res.data.thisSectionId;
        this.GetExamTechFinalScore2();
      });
    },
    GetExamTechFinalScore() {
      this.$http.get("/BidExamScore/GetExamTechFinalScore", { params: { bidModeId: this.id, sectionId: this.activeName2 } }).then(res => {
        this.tableData = res.data;
        this.showExamTab = res.data.showExamTab;
        // this.pageMessage = res.data.pageMessage;
        if (res.data.techScoreList.length > 0) {
          this.selectedRowId = res.data.techScoreList[0].supplierId;
          this.mingXi(res.data.techScoreList[0]);
        }
      });
    },
    GetExamTechFinalScore2() {
      this.$http.get("/BidExamScore/GetExamTechFinalScore", { params: { bidModeId: this.id, sectionId: this.activeName2 } }).then(res => {
        this.tableData = res.data;
        this.examMasterId = res.data.examMasterId;
        if (res.data.techScoreList.length > 0) {
          this.selectedRowId = res.data.techScoreList[0].supplierId;
          this.mingXi(res.data.techScoreList[0]);
        }
        this.showExamTab = res.data.showExamTab;
        this.GetExamScorePageShow1001();
      });
    },
    GetExamScorePageShow1001() {
      let obj = {
        examMasterId: this.examMasterId,
      };
      this.$http.get("/BidExam/GetExamScorePageShow1001", { params: obj }).then(res => {
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
    GetExamScorePageShow1002() {
      this.$http
        .get("/BidExam/GetExamScorePageShow1002", { params: { examMasterId: this.examMasterId, supplierId: this.value } })
        .then(res => {
          this.tableList = res.data;
          this.canEdit = res.data.canEdit;
          this.resultDesc = res.data.resultDesc;
          this.title = res.data.title;
          this.pageMessage = res.data.pageMessage;
          this.tableList1 = this.tableList.examItemList
            ? this.tableList.examItemList.map(item => {
                return {
                  ...item,
                  score: item.fullScore / 2,
                };
              })
            : [];
        });
    },
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
            let arr = tableList.map(item => {
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
            this.$http.post("/BidExam/SubmitExamScore ", obj).then(res => {
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
          let arr = tableList.map(item => {
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
          this.$http.post("/BidExam/SubmitExamScore ", obj).then(res => {
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
    // GetExamTechFinalScore() {
    //   let obj = {
    //     bidModeId: this.id,
    //     sectionId: this.activeName2,
    //   };
    //   this.$http.get("", { params: obj }).then(res => {
    //     this.tableList2 = res.data;
    //     this.activeName3 = res.data.openTechExplainList.length > 0 ? res.data.map(v => v.explainIndex) : [];
    //     this.loading = false;
    //   });
    // },
    // jumpDetail(id) {
    //   window.open(`#/supplier/detail/${id}`);
    // },
    selectpage() {
      // this.GetSupplierInPageShow1();
      this.GetExamTechFinalScore();
      this.GetExamTechFinalScore2();
    },

    // tabsClick(e) {
    //   if (e.name == "首次开标") {
    //     this.GetSupplierInPageShow();
    //   } else {
    //     this.GetExplainHistory();
    //   }
    // },
    // tabsClick1(e) {
    //   if (this.activeName1 == "首次开标") {
    //     this.GetSupplierInPageShow();
    //   } else {
    //     this.GetExplainHistory();
    //   }
    // },
    // downLoad(url) {
    //   window.location.href = process.env.VUE_APP_API_URL + url;
    // },
  },
};
</script>
<style lang="scss" scoped>
// ::v-deep.el-dialog__body {
//   padding: 20px !important;
// }
::v-deep .el-card-body {
  padding: 0px;
}
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
::v-deep .el-tabs__header {
  width: 78%;
}
</style>

<style>
::v-deep .el-tabs__header {
  width: 78%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 0px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card__body {
  padding: 0px;
}

.box-card {
  /*width: 480px;*/
}
.el-card__header {
  height: 60px;
  width: 78%;
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
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
::v-deep .el-tabs--card > .el-tabs__header {
  width: 78%;
}
</style>
