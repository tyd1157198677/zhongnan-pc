<template>
  <div class="">
    <el-select placeholder="请选择标段" @change="dropDownChange" v-model="biaoDuan" style="margin-top:10px">
      <el-option v-for="item in dropDown" :key="item.value" :label="item.text" :value="item.value"></el-option>
    </el-select>
    <el-tabs v-model="activeName" style="margin-top:10px">
      <el-tab-pane label="启动评标" name="首次评标">
        <div></div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="margin-right:20px" v-if="pageMessage">{{ pageMessage }}</span>
            <span style="margin-right:20px">技术得分占比：{{ tableList.techPercent }};</span>
            <span style="margin-right:20px">商务得分占比：{{ tableList.businessPercent }};</span>
            <span style="margin-right:20px" v-if="tableList.techMinScore">技术最低分：{{ tableList.techMinScore }};</span>
            <span style="margin-right:20px">评标办法：{{ tableList.examMethod }};</span>
            <el-button
              type="danger"
              size="mini"
              @click="tiJiao1"
              style="float: right;margin-left: 10px;"
              v-if="buttonFlag.openBusinessButton"
              >启动商务评标</el-button
            >
            <el-button type="danger" size="mini" @click="tiJiao2" style="float: right;" v-if="buttonFlag.openTechButton"
              >启动技术评标</el-button
            >
            <el-button type="danger" size="mini" @click="tiJiao3" style="float: right;" v-if="buttonFlag.closeTechButton"
              >完成技术评标</el-button
            >
          </div>
          <div class="text item">
            <el-table
              :row-class-name="selectedRow"
              empty-text="暂无数据"
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="table1"
              v-loading="loading"
              ref="t1"
            >
              <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
              <el-table-column label="标段" align="center" prop="sectionName"> </el-table-column>
              <el-table-column label="类型" align="center" prop="masterType"> </el-table-column>
              <el-table-column label="技术标" align="center" prop="techStatus"> </el-table-column>
              <el-table-column label="商务标" align="center" prop="businessStatus"></el-table-column>
              <el-table-column label="计划开标日期" align="center" prop="openDate"></el-table-column>
              <!--<el-table-column label="查看明细" align="center">-->
              <!--<template slot-scope="scope">-->
              <!--<el-radio @change="getList2(scope.row.rowId)" v-model="selectedRowId" :label="scope.row.rowId" style="color:#409eff;"-->
              <!--&gt;查看明细</el-radio-->
              <!--&gt;-->
              <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
          </div>
        </el-card>

        <!--<div style="width:100%">-->
        <!--<div style="width:100%">-->
        <!--<div-->
        <!--style="height:40px;color:#E6A23C;width:100%;margin-bottom:10px;padding:8px 16px;border-radius:4px;background-color:#fdf6ec"-->
        <!--&gt;-->
        <!--{{ pageMessage }}-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div>-->
        <!--&lt;!&ndash; <br />-->
        <!--<br />-->
        <!--<br /> &ndash;&gt;-->
        <!--<span>技术得分占比：{{ tableList.techPercent }};&nbsp&nbsp&nbsp </span>-->
        <!--<span>商务得分占比：{{ tableList.businessPercent }};&nbsp&nbsp&nbsp </span>-->
        <!--<span v-if="tableList.techMinScore">技术最低分：{{ tableList.techMinScore }};&nbsp&nbsp&nbsp </span>-->
        <!--<span>评标办法：{{ tableList.examMethod }};&nbsp&nbsp&nbsp </span>-->
        <!--<el-button-->
        <!--type="danger"-->
        <!--size="mini"-->
        <!--@click="tiJiao1"-->
        <!--style="float: right;margin-left: 10px;margin-bottom: 10px;"-->
        <!--v-if="buttonFlag.openBusinessButton"-->
        <!--&gt;启动商务评标</el-button-->
        <!--&gt;-->
        <!--<el-button type="danger" size="mini" @click="tiJiao2" style="float: right;margin-bottom: 10px;" v-if="buttonFlag.openTechButton"-->
        <!--&gt;启动技术评标</el-button-->
        <!--&gt;-->
        <!--<el-button type="danger" size="mini" @click="tiJiao3" style="float: right;margin-bottom: 10px;" v-if="buttonFlag.closeTechButton"-->
        <!--&gt;完成技术评标</el-button-->
        <!--&gt;-->
        <!--</div>-->

        <!--<el-table-->
        <!--:row-class-name="selectedRow"-->
        <!--empty-text="暂无数据"-->
        <!--border-->
        <!--element-loading-text="请稍候,数据正在加载中..."-->
        <!--:data="table1"-->
        <!--v-loading="loading"-->
        <!--ref="t1"-->
        <!--&gt;-->
        <!--<el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>-->
        <!--<el-table-column label="标段" align="center" prop="sectionName"> </el-table-column>-->
        <!--<el-table-column label="类型" align="center" prop="masterType"> </el-table-column>-->
        <!--<el-table-column label="技术标" align="center" prop="techStatus"> </el-table-column>-->
        <!--<el-table-column label="商务标" align="center" prop="businessStatus"></el-table-column>-->
        <!--<el-table-column label="计划开标日期" align="center" prop="openDate"></el-table-column>-->
        <!--&lt;!&ndash; <el-table-column label="查看明细" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<el-radio @change="getList2(scope.row.rowId)" v-model="selectedRowId" :label="scope.row.rowId" style="color:#409eff;"-->
        <!--&gt;查看明细</el-radio-->
        <!--&gt;-->
        <!--</template>-->
        <!--</el-table-column> &ndash;&gt;-->
        <!--</el-table>-->

        <el-card class="box-card" style="margin-top: 30px;">
          <div slot="header" class="clearfix">
            <span>技术评标成员</span>
            <el-button type="danger" size="mini" @click="add1" style="float: right;margin-bottom: 10px;" v-if="table2.canEdit"
              >新增</el-button
            >
          </div>
          <div class="text item">
            <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="table2.personList"
              v-loading="loading"
            >
              <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
              <el-table-column label="姓名" align="center" prop="personName"> </el-table-column>
              <el-table-column label="登录名" align="center" prop="loginId"> </el-table-column>
              <el-table-column label="部门" align="center" prop="depName"> </el-table-column>
              <el-table-column label="类型" align="center" prop="bidPersonExam"></el-table-column>
              <el-table-column label="操作" align="center" width="80" v-if="table2.canEdit">
                <template slot-scope="scope">
                  <i class="el-icon-delete ml-2" @click="deleteRow(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <el-card class="box-card" style="margin-top: 30px;">
          <div slot="header" class="clearfix">
            <span>评标进度</span>
          </div>
          <div class="text item">
            <historyMoudle v-bind:id="id" ref="historyMoudle" :selectId2="biaoDuan"></historyMoudle>
          </div>
        </el-card>

        <!--<div class="pub">技术评标成员</div>-->
        <!--<el-button type="danger" size="mini" @click="add1" style="float: right;margin-bottom: 10px;" v-if="table2.canEdit">新增</el-button>-->
        <!--<el-table-->
        <!--empty-text="暂无数据"-->
        <!--stripe-->
        <!--border-->
        <!--element-loading-text="请稍候,数据正在加载中..."-->
        <!--:data="table2.personList"-->
        <!--v-loading="loading"-->
        <!--&gt;-->
        <!--<el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>-->
        <!--<el-table-column label="姓名" align="center" prop="personName"> </el-table-column>-->
        <!--<el-table-column label="登录名" align="center" prop="loginId"> </el-table-column>-->
        <!--<el-table-column label="部门" align="center" prop="depName"> </el-table-column>-->
        <!--<el-table-column label="类型" align="center" prop="bidPersonExam"></el-table-column>-->
        <!--<el-table-column label="操作" align="center" width="80" v-if="table2.canEdit">-->
        <!--<template slot-scope="scope">-->
        <!--<i class="el-icon-delete ml-2" @click="deleteRow(scope.row)"></i>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--</el-table>-->

        <!--<div class="pub">评标进度</div>-->
        <!--<historyMoudle v-bind:id="id" :selectId2="biaoDuan"></historyMoudle>-->
      </el-tab-pane>
      <el-tab-pane label="评标结果" name="评标结果">
        <ping-biao-comp ref="pingbiaocomp" :id="id" :activeName1="biaoDuan"></ping-biao-comp>
      </el-tab-pane>
    </el-tabs>

    <div v-if="activeName == '首次评标'"></div>

    <div v-if="activeName == '评标结果'"></div>
    <el-dialog width="40%" title="上传文件" :visible.sync="dialogVisible">
      <public-upload
        @fatherMethod="GetSupplierQuestionPageShow"
        :fileType="fileType"
        :url="getUploadUrl1"
        :condition="condition"
        :obj="obj"
        :maxValue="10"
      ></public-upload>
    </el-dialog>

    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
    <!--<el-dialog width="40%" title="上传文件" :visible.sync="dialogVisible">-->
    <!---->
    <!--</el-dialog>-->
  </div>
</template>

<script>
import choseUser from "@/components/choseUser";
export default {
  components: {
    choseUser,
    publicUpload: () => import("@/components/publicUpload.vue"),
    // pingBiaoMoudle: () => import("./pingBiaoMoudle.vue"),
    historyMoudle: () => import("./historyMoudle.vue"),
    pingBiaoComp: () => import("./dingBiaoComponents/pingBiaoComp"),
  },
  props: ["id"],
  data() {
    return {
      bidWinShowSupplierList: {},
      sectionList: [],
      tableList: {},
      tableList2: {},
      supplierLists: [],
      tablelist: [
        {
          personNameList: [],
          scoreItemList: [],
        },
      ],
      pageMessage: "",
      finalScore: "",
      value: "",
      activeName: "首次评标",
      activeName1: "",
      activeName2: "1",
      supplierId: "",
      loading: false,
      dialogVisible: false,
      uploadData: {},
      fileType: [".xls", ".xlsx"],
      condition: "允许文件类型：.xls|.xlsx 格式 最大：10 兆",
      obj: {},
      getUploadUrl1: "/api/FileUpload/BidAnswerAttach",
      table1: [],
      dropDown: [],
      biaoDuan: "",
      selectedRowId: "",
      table2: {},
      dialogVisible2: false,
      buttonFlag: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.CheckUserProcessPageAuth();
  },
  methods: {
    tomethgopingbiao() {
      this.CheckUserProcessPageAuth();
      // if (this.activeName == "启动评标") {
      this.$refs.historyMoudle.tomethgohistoryMoudle();
      // }
      if (this.activeName == "评标结果") {
        this.$refs.pingbiaocomp.tomethgopingbiaocomp();
      }
    },
    CheckUserProcessPageAuth() {
      this.$http.get("/BidCheckCenter/CheckUserProcessPageAuth", { params: { baseId: this.id } }).then(res => {
        if (res.data.success) {
          if (!res.data.returnValue1) {
            this.getList1();
          } else {
            this.$router.push({
              path: res.data.returnValue1,
            });
          }
        } else {
          this.$router.push({
            path: "/bid/notice/",
          });
        }
      });
    },
    dropDownChange(val) {
      this.biaoDuan = val;
      this.getList1();
    },
    GetTempItem() {
      this.$http.get("/ExamCenter/GetBidExamCenterProcess01", { params: { bidModeId: this.id, sectionId: this.selectId2 } });
    },
    tiJiao1() {
      this.$confirm("确认要执行当前操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.StartBusinessExam30({ bidModeId: this.id, sectionId: this.biaoDuan, rowId: this.selectedRowId }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.getList1();
            this.GetTempItem();
          } else {
            this.$msg.error(res.message);
          }
        });
      });
    },
    tiJiao2() {
      this.$confirm("确认要执行当前操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.StartTechExam30({ bidModeId: this.id, sectionId: this.biaoDuan, rowId: this.selectedRowId }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.getList1();
            this.GetTempItem();
          } else {
            this.$msg.error(res.message);
          }
        });
      });
    },
    tiJiao3() {
      this.$confirm("确认要执行当前操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.CompletedFirstTech({ bidModeId: this.id, sectionId: this.biaoDuan }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.getList1();
            this.GetTempItem();
          } else {
            this.$msg.error(res.message);
          }
        });
      });
    },
    onUserAdd(id) {
      var obj = {
        userGuid: id.userGuid,
        sectionId: this.biaoDuan,
      };
      this.$api.supIn.SaveTechUser02(obj).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.getList2(this.selectedRowId);
        } else {
          this.$alert(res.message, {
            confirmButtonText: "确定",
          });
        }
      });
    },
    add1() {
      this.$refs.choseUser.openfnc();
    },
    deleteRow(row) {
      this.$confirm("当前操作不可恢复，确认要执行当前操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.DeleteTechPerson02({ id: row.id }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.getList2(row.selectedRowId);
          } else {
            this.$msg.error(res.message);
          }
        });
      });
    },
    getList2(rowId) {
      this.$http
        .get("ExamCenter/GetExamCenterPersonList01", { params: { bidModeId: this.id, sectionId: this.biaoDuan, rowId: rowId } })
        .then(res => {
          this.table2 = res.data;
          this.getButton();
        });
    },
    selectedRow({ row }) {
      if (row.rowId == this.selectedRowId) {
        return "table-main-row";
      }
      return "";
    },
    getList1() {
      this.$http.get("/ExamCenter/GetExamCenterPageMain01", { params: { bidModeId: this.id, sectionId: this.biaoDuan } }).then(res => {
        this.selectedRowId = res.data.openBidMainList[0].rowId;
        this.table1 = res.data.openBidMainList;
        this.dropDown = res.data.sectionDropDownList;
        if (!this.biaoDuan) {
          this.biaoDuan = this.dropDown[0].value;
        }
        this.getList2(this.selectedRowId);
        this.GetSupplierQuestionPageShow();
        this.GetScoreDetailDropDown();
        this.Gettablelist();
      });
    },
    getButton() {
      this.$api.supIn.BidActionButton20({ bidModeId: this.id, sectionId: this.biaoDuan, rowId: this.selectedRowId }).then(res => {
        this.buttonFlag = res;
      });
    },
    // GetSupplierQuestionPageShow1() {
    //   this.loading = true;
    //   this.$http.get("/BidExam/BidExamSectionPageShow", { params: { bidModeId: this.id} }).then(res => {
    //     this.loading = false;
    //     this.sectionList = res.data.bidExamSectionList;
    //     this.activeName1 = res.data.thisSectionId == 0 ? "" : res.data.thisSectionId;
    //     this.GetSupplierQuestionPageShow();
    //
    //   });
    // },
    GetSupplierQuestionPageShow() {
      this.loading = true;
      this.$http.get("/BidExam/BidExamSectionPageShow", { params: { bidModeId: this.id, sectionId: this.biaoDuan } }).then(res => {
        this.tableList = res.data;
        this.loading = false;
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

    refre() {
      this.$http.get("/BidExamScore/RefreshScore", { params: { bidModeId: this.id, sectionId: this.activeName1 } }).then(res => {
        if (res.data.success) {
          this.GetBidExamResult();
        }
      });
    },
    GetScoreDetailDropDown() {
      let obj = {
        bidModeId: this.id,
        sectionId: this.biaoDuan,
      };
      this.$http.get("/BidExamScore/GetScoreDetailDropDown", { params: obj }).then(res => {
        this.supplierLists = res.data.supplierList;
        // if(res.data.length > 0) {
        //   this.value = res.data.supplierList[0].value;
        // }
        this.value = res.data.supplierList.length > 0 ? res.data.supplierList[0].value : "";
        console.log(res.data.supplierList[0].value);
        this.Gettablelist();
      });
    },
    Gettablelist() {
      let obj = {
        bidModeId: this.id,
        sectionId: this.biaoDuan,
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
      this.$http.get("/BidExam/GetBidExamResult", { params: { bidModeId: this.id, SectionId: this.biaoDuan } }).then(res => {
        this.loading = false;
        this.bidWinShowSupplierList = res.data;
        this.GetScoreDetailDropDown();
      });
    },
    handleClick(e) {
      if (e.name == "首次评标") {
        //this.GetSupplierQuestionPageShow();
      } else if (e.name == "澄清评标") {
        this.GetExplainExamPageShow();
      } else if (e.name == "评标结果") {
        //this.GetBidExamResult();
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
::v-deep .el-card__body {
  padding: 0px;
}
</style>
<style>
.el-table .table-main-row {
  background-color: #ccffff;
}
.el-table .table-info-row {
  background-color: #ffffcc;
}
</style>

<style>
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
  /*padding: 18px 20px;*/
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
</style>
