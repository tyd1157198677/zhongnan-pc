<!--  -->
<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--<span>评标进度</span>-->
        <el-button @click="refre" style="float:right;margin-left:10px;margin-bottom:10px" type="primary" size="mini">刷新得分</el-button>
        <el-button @click="refreping" v-if="refscore" style="float:right;margin-left:10px;margin-bottom:10px" type="primary" size="mini"
          >重新评标</el-button
        >
      </div>
      <div class="text item">
        <el-table
          empty-text="暂无数据"
          ref="tabRef"
          stripe
          border
          :cell-style="cellStyle"
          :header-cell-style="cellStyle1"
          element-loading-text="请稍候,数据正在加载中..."
          :data="bidWinShowSupplierList.supplierList"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="排名" align="center"> </el-table-column>
          <el-table-column show-overflow-tooltip label="投标方名称" min-width="160">
            <template slot-scope="scope">
              <el-link
                type="primary"
                style="color:#409eff;text-decoration: none;padding-right:10px"
                @click="jumpDetail(scope.row.supplierId)"
                >{{ scope.row.supplierName }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in bidWinShowSupplierList.indexTitle" :key="index" align="center" :label="item">
            <el-table-column align="center" label="技术得分" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.scoreData[index].tScore }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="商务得分" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.scoreData[index].bScore }}</span>
              </template>
            </el-table-column> -->
          </el-table-column>
          <!-- <el-table-column label="最新得分" align="center" style="background:#8888" :index="4">
            <el-table-column align="center" :index="4" label="技术得分" width="100" prop="newTScore"> </el-table-column> -->
          <!-- <el-table-column align="center" :index="4" label="商务得分" width="100" prop="newBScore"> </el-table-column> -->
          <!-- <el-table-column align="center" :index="4" label="综合得分" width="100" prop="newFinalScore"> </el-table-column> -->
          <!-- </el-table-column> -->
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 30px;">
      <div>
        <div style="margin:20px"><strong>打分结果</strong></div>
        <div class="text item">
          <el-table
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tabledatalist.supplierScoreDetail"
            v-loading="loading"
          >
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <el-table-column align="left" label="投标方名称" prop="comFullName"> </el-table-column>
            <el-table-column width="150" align="center" label="状态" prop="status"> </el-table-column>
            <el-table-column
              width="100"
              v-for="(item, index) in tabledatalist.personNameList"
              :key="index"
              :label="item.text"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.supplierScore[index] }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="100" align="center" label="平均分" prop="avgScore"> </el-table-column> -->
          </el-table>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 30px;">
      <!-- <div slot="header" class="clearfix"> -->
      <!-- <span style="margin-right:5px">评标意见</span> -->
      <div style="margin-top:10px;margin-bottom:10px;margin-left:20px;"><strong>评标意见</strong></div>
      <el-table empty-text="暂无数据" stripe border :data="resultlist">
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column width="200" align="center" label="评委" prop="personName"> </el-table-column>
        <el-table-column width="300" align="center" label="投标方名称" prop="comFullName"> </el-table-column>
        <el-table-column align="left" label="评标意见" prop="resultDesc"> </el-table-column>
      </el-table>
      <!-- </div> -->
    </el-card>
    <el-card class="box-card" style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span style="margin-right:5px">技术评委对投标方的打分明细 </span>
        <el-select v-model="value" @change="handleChange" style="width:400px">
          <el-option v-for="item in supplierLists" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
        <span style="color:red;margin-left:10px">{{ this.pageMessage }}</span>
        <span style="float:right"><span>得分：</span>{{ this.finalScore }}</span>
      </div>
      <div class="text item">
        <el-table
          empty-text="暂无数据"
          ref="tabRef2"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tablelist.scoreItemList"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column width="200" align="center" label="维度名称" prop="wdName"> </el-table-column>
          <el-table-column width="250" align="left" label="指标名称" prop="zbName"> </el-table-column>
          <el-table-column align="left" label="打分标准" prop="itemDesc"> </el-table-column>
          <el-table-column width="100" align="center" label="满分" prop="fullScore"> </el-table-column>
          <el-table-column width="100" v-for="(item, index) in tablelist.personNameList" :key="index" align="center" :label="item">
            <template slot-scope="scope">
              <span>{{ scope.row.personScoreList[index] }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center" label="平均分" prop="avgScore"> </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["id", "activeName1"],
  data() {
    return {
      bidWinShowSupplierList: {},
      sectionList: [],
      tabledatalist: {
        personNameList: [],
        supplierScoreDetail: [],
      },
      tableList: {},
      tableList2: {},
      supplierLists: [],
      tablelist: [
        {
          personNameList: [],
          scoreItemList: [],
        },
      ],
      refscore: false,
      resultlist: [],
      pageMessage: "",
      finalScore: "",
      value: "",
      activeName: "首次评标",
      activeName2: "1",
      supplierId: "",
      loading: false,
      dialogVisible: false,
      uploadData: {},
      fileType: [".xls", ".xlsx"],
      condition: "允许文件类型：.xls|.xlsx 格式 最大：10 兆",
      obj: {},
      getUploadUrl1: "/api/FileUpload/BidAnswerAttach",
    };
  },
  computed: {},
  watch: {
    activeName1() {
      this.GetBidExamResult();
    },
  },
  created() {},
  mounted() {
    //this.GetSupplierQuestionPageShow1();
    this.GetBidExamResult();
  },
  methods: {
    tomethgopingbiaocomp() {
      this.GetBidExamResult();
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let len = row.scoreData.length;
      if (columnIndex == len * 1 + 2 + 1 || columnIndex == len * 1 + 3 + 1 || columnIndex == len * 1 + 4 + 1) {
        //指定坐标rowIndex ：行，columnIndex ：列
        return "background:#dff0d8"; //rgb(105,0,7)
      } else {
        return "";
      }
    },
    cellStyle1({ row, column, rowIndex, columnIndex }) {
      if (column.index == 4) {
        //指定坐标rowIndex ：行，columnIndex ：列
        return "background:#dff0d8"; //rgb(105,0,7)
      } else {
        return "";
      }
    },
    GetSupplierQuestionPageShow1() {
      this.loading = true;
      this.$http.get("/BidExam/BidExamSectionPageShow", { params: { bidModeId: this.id } }).then(res => {
        this.loading = false;
        this.sectionList = res.data.bidExamSectionList;
        this.activeName1 = res.data.thisSectionId == 0 ? "" : res.data.thisSectionId;
        this.GetSupplierQuestionPageShow();
      });
    },
    GetSupplierQuestionPageShow() {
      this.loading = true;
      this.$http.get("/BidExam/BidExamSectionPageShow", { params: { bidModeId: this.id, sectionId: this.activeName1 } }).then(res => {
        this.tableList = res.data;
        this.loading = false;
      });
    },
    GetExamDescList1001() {
      this.$http.get("/BidExamScore/GetExamDescList1001", { params: { bidModeId: this.id, sectionId: this.activeName1 } }).then(res => {
        this.resultlist = res.data;
      });
    },
    GetExplainExamPageShow() {
      this.loading = true;
      let obj = {
        bidModeId: this.id,
        sectionId: this.activeName1,
      };
      this.$http.get("/BidExplain/GetExplainExamPageShow", { params: obj }).then(res => {
        this.tableList2 = res.data;
        // this.activeName2 = res.data.length > 0 ? res.data.map(v => v.explainIndex) : [];
        this.loading = false;
      });
    },
    CheckCanReScore1001() {
      this.$http.get("/BidCheckCenter/CheckCanReScore1001", { params: { bidModeId: this.id, sectionId: this.activeName1 } }).then(res => {
        if (res.data.success) {
          this.refscore = true;
        } else {
          this.refscore = false;
        }
      });
    },
    refreping() {
      this.$confirm("确认要重新评标吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          bidModeId: this.id,
          sectionId: this.activeName1,
        };
        this.$http.post("/ExamCenter/ReExamScore1001", obj).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.GetBidExamResult();
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    refre() {
      this.$http.get("/BidExamScore/RefreshScore", { params: { bidModeId: this.id, sectionId: this.activeName1 } }).then(res => {
        if (res.data.success) {
          this.GetBidExamResult();
          this.$message.success(res.data.message);
        } else {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    GetScoreDetailDropDown() {
      let obj = {
        bidModeId: this.id,
        sectionId: this.activeName1,
      };
      this.$http.get("/BidExamScore/GetScoreDetailDropDown", { params: obj }).then(res => {
        this.supplierLists = res.data.supplierList;
        // if(res.data.length > 0) {
        //   this.value = res.data.supplierList[0].value;
        // }
        this.value = res.data.supplierList.length > 0 ? res.data.supplierList[0].value : "";
        console.log(res.data.supplierList[0].value);
        this.Gettablelist();
        this.GetExamDescList1001();
        this.CheckCanReScore1001();
        this.GetSupplierScoreStat1001();
      });
    },
    GetSupplierScoreStat1001() {
      let obj = {
        bidModeId: this.id,
        sectionId: this.activeName1,
      };
      this.$http.get("/BidExamScore/GetSupplierScoreStat1001", { params: obj }).then(res => {
        this.tabledatalist = res.data;
      });
    },
    Gettablelist() {
      let obj = {
        bidModeId: this.id,
        sectionId: this.activeName1,
        supplierId: this.value,
      };
      this.$http.get("/BidExamScore/GetPersonSupplierTechScore", { params: obj }).then(res => {
        this.finalScore = res.data.finalScore;
        this.pageMessage = res.data.pageMessage;
        this.tablelist = res.data;
      });
    },
    handleChange() {
      this.Gettablelist();
    },
    openType(type) {
      this.$confirm(type == "A" ? "确认要启动技术评标吗?" : "确认要启动商务技术评标吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (this.activeName == "首次评标") {
            let obj = {
              bidModeId: this.id,
              sectionId: this.activeName1,
            };
            let res = await this.$http.post(type == "A" ? "/BidExam/StartExamTech" : "/BidExam/StartBusinessTech", obj);
            if (res.data.success) {
              this.activeName = "评标进度";
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            let obj = {
              explainId: this.tableList2.explainId,
              explainType: type,
              bidModeId: this.id,
              sectionId: this.activeName1,
              // tempId: this.tableList2.explainId,
            };
            let res = await this.$http.post(type == "A" ? "/BidExam/StartExplainTechExam" : "/BidExam/StartExplainBusinessExam", obj);
            if (res.data.success) {
              this.activeName = "评标进度";
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          }
        })
        .catch(err => {
          this.$msg({ type: "info", message: err.Error });
        });
    },
    endType(type, id) {
      this.$confirm(type == "A" ? "确认要完成技术评标吗?" : "确认要关闭商务技术评标吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let obj = {
          bidModeId: this.id,
          sectionId: this.activeName1,
        };
        let res = await this.$http.post(
          type == "B" ? "/BidExam/CompleteExam" : "/BidExamScore/CompletedFirstTech",
          type == "B" ? { id } : obj
        );
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetSupplierQuestionPageShow();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    GetBidExamResult() {
      if (!this.activeName1) {
        return;
      }
      this.$http.get("/BidExam/GetBidExamResult", { params: { bidModeId: this.id, SectionId: this.activeName1 } }).then(res => {
        this.loading = false;
        this.bidWinShowSupplierList = res.data;
        this.bidWinShowSupplierList.indexTitle = ["首次开标"];
        this.GetScoreDetailDropDown();
      });
    },
    handleClick(e) {
      if (e.name == "首次评标") {
        this.GetSupplierQuestionPageShow();
      } else if (e.name == "澄清评标") {
        this.GetExplainExamPageShow();
      } else if (e.name == "评标结果") {
        this.GetBidExamResult();
      }
    },
    handleClick1(e) {
      if (this.activeName == "首次评标") {
        this.GetSupplierQuestionPageShow();
      } else if (this.activeName == "澄清评标") {
        this.GetExplainExamPageShow();
      } else if (this.activeName == "评标结果") {
        this.GetBidExamResult();
      }
    },
    downLoad(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
    },
    /**
     * 查看详情
     */
    jumpDetail(id) {
      window.open(`#/bid/bidModeDetail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.pub {
  border-left: 3px solid #21468c;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background: #f4f4f4;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}
.sp {
  margin: 0 15px;
  font-size: 14px;
}
.top {
  margin: 10px;
  display: flex;
}
span {
  font-weight: 600;
}
</style>
