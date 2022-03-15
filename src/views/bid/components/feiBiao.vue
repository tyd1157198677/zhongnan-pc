<!-- 废标 -->
<template>
  <div class="" style="padding-top: 10px">
    <el-tabs v-model="activeName1" @tab-click="handleClick" type="card">
      <!-- <div v-if="showbut"> -->
      <el-tab-pane v-for="item in sectionList" :key="item.sectionName" :label="item.sectionName" :name="item.sectionId"> </el-tab-pane>
      <!-- </div> -->
      <!-- <el-tab-pane label="已废标" name="已废标">
        <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="feibiaodata">
          <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
          <el-table-column prop="sectionName" label="标段" align="center"> </el-table-column>
          <el-table-column prop="comFullName" label="投标方" align="center"> </el-table-column>
          <el-table-column prop="userName" label="经办人" align="center"> </el-table-column>
          <el-table-column prop="creationTime" label="经办时间" align="center">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane> -->
      <el-tab-pane label="已弃标" name="已弃标">
        <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="qibiaodata">
          <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
          <el-table-column prop="sectionName" label="标段" align="center"> </el-table-column>
          <el-table-column prop="comFullName" label="投标方" align="center"> </el-table-column>
          <el-table-column prop="userName" label="经办人" align="center"> </el-table-column>
          <el-table-column prop="creationTime" label="经办时间" align="center">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div v-if="activeName1 != '已弃标'">
      <el-table
        empty-text="暂无数据"
        ref="tabRef1"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData"
        v-loading="loading"
        @select="select"
        @row-click="rowClick"
        @select-all="rowClickAll"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :selectable="checkSelectable"> </el-table-column>
        <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
        <el-table-column label="投标方">
          <template slot-scope="scope">
            <span>{{ scope.row.comFullName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="投标方状态" align="center"> </el-table-column>
      </el-table>
      <div v-if="showBid">
        <div v-if="sectionList.length > 0 && tableData.length > 0">
          <p style="margin-top: 10px">废标原因：</p>
          <el-input v-model="remark" type="textarea" show-word-limit></el-input>
          <div class="sumBtn">
            <div style="color: red">每次只能勾选一个投标方</div>
            <div>
              <el-button type="danger" size="mini" @click="submit" v-loading="loading1">提交审批</el-button>
            </div>
          </div>
        </div>
      </div>
      <el-collapse v-model="activeNames" style="margin-top: 50px">
        <el-collapse-item :name="item.comFullName" v-for="(item, index) in tableList" :key="index" style="margin-top: 20px">
          <template slot="title">
            <span class="infonametits">{{ item.comFullName }}</span>
          </template>
          <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="[item]" v-loading="loading">
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <el-table-column label="供应商名称" align="left" prop="comFullName"> </el-table-column>
            <el-table-column label="经办人" align="center" width="100" prop="userName"></el-table-column>
            <el-table-column label="标段名称" align="center" width="100" prop="sectionName"> </el-table-column>
            <el-table-column label="经办时间" align="center" width="200" prop="creationTime">
              <template slot-scope="scope"
                ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column>
          </el-table>

          <div style="margin-top: 30px">
            <el-form v-if="item.showPassButton || item.showRefuseButton" v-loading="loading">
              <el-form-item label="审批意见：" prop="ideaRemark" style="margin-top: 20px">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 4 }"
                  placeholder="请输入审批意见"
                  v-model="item.remark"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="mini"
                  v-if="item.showPassButton"
                  type="primary"
                  style="float: right; margin-top: 10px"
                  @click="omsubmit(item)"
                  >通过</el-button
                >
                <el-button
                  size="mini"
                  v-if="item.showRefuseButton"
                  type="primary"
                  style="float: right; margin-top: 10px; margin-right: 10px"
                  @click="bohui(item)"
                  >驳回</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div style="margin-top: 50px" v-if="item.logs.length > 0">
            <div slot="header" class="clearfix">
              <span>审批日志({{ item.auditStatus }})</span>
            </div>
            <div class="text item">
              <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="item.logs">
                <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
                <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
                <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
                <el-table-column prop="creationTime" width="180" label="待办时间" align="center">
                  <template slot-scope="scope"
                    ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
                  >
                </el-table-column>
                <el-table-column prop="dealTime" width="180" label="处理时间" align="center">
                  <template slot-scope="scope"
                    ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
                  >
                </el-table-column>
                <el-table-column prop="status" width="80" label="结果" align="center"> </el-table-column>
                <el-table-column prop="comments" label="意见/备注" align="center"> </el-table-column>
              </el-table>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {},
  props: ["id"],
  data() {
    return {
      remark: "",
      activeName1: "",
      tableData: [],
      multipleSelection: {
        supplierId: "",
      },
      activeNames: [],
      tableif: false,
      status: "",
      showbut: false,
      showBid: true,
      sectionList: [],
      tableList: [],
      feibiaodata: [],
      qibiaodata: [],
      loading: false,
      loading1: false,
      tableshenpi: [],
      selectData: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.CheckCanBidCancel40();
    this.BidActionButton06();
    // this.GetNewLogList_Abolish();
  },
  methods: {
    parseTime,
    tomethgofeibiao() {
      this.CheckCanBidCancel40();
      this.BidActionButton06();
      // this.GetNewLogList_Abolish();
    },
    checkSelectable(row) {
      return row.canAbolish;
    },
    BidActionButton06() {
      this.$http.get("/BidActionButton/BidActionButton06", { params: { bidModeId: this.id } }).then((res) => {
        if (res.data.success) {
          this.showBid = true;
        } else {
          this.showBid = false;
        }
      });
    },
    // GetBidCancelList1() {
    //   this.loading = true;
    //   this.$http.get("/BidCancel/GetBidCancelList", { params: { bidModeId: this.id, cancelType: "废标" } }).then(res => {
    //     this.feibiaodata = res.data;
    //   });
    // },
    GetBidCancelList2() {
      this.loading = true;
      this.$http.get("/BidCancel/GetBidCancelList", { params: { bidModeId: this.id, cancelType: "弃标" } }).then((res) => {
        this.qibiaodata = res.data;
      });
    },
    GetBidCancelList3() {
      this.loading = true;
      this.$http.get("/BidCancel/GetBidCancelListNew", { params: { bidModeId: this.id, secitonId: this.activeName1 } }).then((res) => {
        this.tableList = res.data.data;
        this.activeNames = res.data.data.map((v) => v.comFullName);
        (this.masterId = res.data.data).map((v) => v.masterId).join();
        console.log(this.masterId);
        res.data.data.forEach((e) => {
          e.remark = "";
        });
      });
    },
    GetBidAbolishPageShow1() {
      this.$http.get("/BidCancel/GetBidAbolishPageShow", { params: { bidModeId: this.id } }).then((res) => {
        // res.data.sectionList.push(
        //   { sectionName: "已废标", sectionId: "已废标" },
        //   { sectionName: "已弃标", sectionId: "已弃标" }
        // );
        this.sectionList = res.data.sectionList;
        this.activeName1 = res.data.thisSectionId;
        this.GetBidAbolishPageShow();
        this.GetBidCancelList3();
      });
    },
    GetBidAbolishPageShow() {
      this.loading = true;
      this.$http.get("/BidCancel/GetBidAbolishPageShow", { params: { bidModeId: this.id, secitonId: this.activeName1 } }).then((res) => {
        // this.sectionList = res.data.sectionList;
        // res.data.sectionList.push(
        //   { sectionName: "已废标", sectionId: "" },
        //   { sectionName: "已弃标", sectionId: "" }
        // );
        this.tableData = res.data.supplierList;
        this.loading = false;
      });
    },
    // GetNewLogList_Abolish() {
    //   this.$http.get("/WorkFlowStart/GetNewLogList_Abolish", { params: { bidModeId: this.id } }).then(res => {
    //     // if (res.data.logs.length > 0) {
    //     this.tableshenpi = res.data.logs;
    //     this.status = res.data.status;
    //     if (res.data.logs.length > 0 || res.data.logs == null) {
    //       this.tableif = true;
    //     } else {
    //       this.tableif = false;
    //     }
    //     // }
    //   });
    // },
    CheckCanBidCancel40() {
      this.$http.get("/BidCheckCenter/CheckCanBidCancel40", { params: { bidModeId: this.id } }).then((res) => {
        if (res.data.success) {
          this.GetBidAbolishPageShow1();
          // this.activeName1 = this.activeName1;
        } else {
          this.activeName1 = "已弃标";
          this.sectionList == [];
        }
      });
    },
    omsubmit(item) {
      if (!item.remark) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
      } else {
        this.$confirm("确认要通过废标审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            bidModeId: this.id,
            masterId: item.masterId,
            remark: item.remark,
            isOk: 0,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_Abolish_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.GetBidAbolishPageShow();
              this.GetBidCancelList3();
            } else {
              this.loading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    bohui(item) {
      if (!item.remark) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
      } else {
        this.$confirm("确认要驳回废标审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            bidModeId: this.id,
            masterId: item.masterId,
            remark: item.remark,
            isOk: -1,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_Abolish_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.GetBidAbolishPageShow();
              this.GetBidCancelList3();
            } else {
              this.loading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    handleClick(e) {
      // if (e.label == "已废标") {
      //   this.GetBidCancelList1();
      // } else
      if (e.label == "已弃标") {
        this.GetBidCancelList2();
      } else {
        this.GetBidAbolishPageShow();
        this.GetBidCancelList3();
      }
    },
    rowClickAll() {
      this.$refs.tabRef1.clearSelection();
    },
    rowClick(row) {
      const selectData = this.selectData;
      this.$refs.tabRef1.clearSelection();
      if (selectData.length == 1) {
        selectData.forEach((item) => {
          // 判断 如果当前的一行被勾选, 再次点击的时候就会取消选中
          if (item == row) {
            this.$refs.tabRef1.toggleRowSelection(row, false);
          }
          // 不然就让当前的一行勾选
          else {
            this.$refs.tabRef1.toggleRowSelection(row, true);
          }
        });
      } else {
        this.$refs.tabRef1.toggleRowSelection(row, true);
      }
    },

    async select(selection, row) {
      await this.$refs.tabRef1.clearSelection(); // 执行完清空操作在进行下面的勾选
      if (selection.length === 0) return;
      this.$refs.tabRef1.toggleRowSelection(row, true);
    },

    handleSelectionChange(val) {
      this.selectData = val; //表格选中数据接收
      if (val.length > 0) {
        this.multipleSelection.supplierId = val[0].supplierId;
      } else {
        this.multipleSelection.supplierId = "";
      }
    },
    submit() {
      if (!this.remark) {
        this.$alert("请填写废标原因", {
          confirmButtonText: "确定",
        });
      } else if (!this.multipleSelection.supplierId) {
        this.$alert("请勾选要废标的投标方！", {
          confirmButtonText: "确定",
        });
      } else {
        this.$confirm("确认要提交审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            thisSectionId: this.activeName1,
            supplierId: this.multipleSelection.supplierId,
            remark: this.remark,
          };
          this.loading1 = true;
          this.$http.post("/BidCancel/SubmitBidAbolish", obj).then((res) => {
            if (res.data.success) {
              this.loading1 = false;
              this.$message.success(res.data.message);
              this.GetBidAbolishPageShow();
              this.GetBidCancelList3();
              // this.GetNewLogList_Abolish();
              this.remark = "";
            } else {
              this.$message.error(res.data.message);
              this.loading1 = false;
            }
          });
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sumBtn {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
