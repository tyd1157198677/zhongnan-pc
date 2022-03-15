<!--  -->
<template>
  <div class="userwidth">
    <el-container>
      <!--左边分类-->
      <!-- <project-tree @itemClick="onChangeProject" @slideNave="slideNave" /> -->
      <el-card class="box-card" shadow="never" :body-style="{ padding: '15px' }">
        <!-- <div style="display: flex; line-height: 15px; float: right; margin-top: 15px">
          <span class="iconText">未开始:</span>
          <el-button type="info" circle size="mini" style="width: 15px; height: 15px"></el-button>
          <span class="iconText">进行中:</span>
          <el-button type="success" circle size="mini" style="width: 15px; height: 15px"></el-button>
          <span class="iconText">已完成:</span>
          <div class="tit tit1">
            <i class="el-icon-check"></i>
          </div>
          
          <span class="iconText">逾期完成:</span>
          <div class="tit tit2">
            <i class="el-icon-check"></i>
          </div>
          <span class="iconText">黄色预警:</span>
          <el-button type="warning" circle size="mini"></el-button>
          <span class="iconText">红色预警:</span>
          <el-button type="danger" circle size="mini"></el-button>
          <span class="iconText">正常:</span>
          <el-button type="success" circle size="mini" style="width: 15px; height: 15px"></el-button>
        </div> -->
        <!-- <div style="height: 40px"></div> -->
        <el-form label-position="right" style="padding-top: 15px !important" label-width="150px" size="small" class="border p-2 mt-0">
          <el-row :gutter="12">
            <el-col :span="3">
              <!-- <el-form-item label="项目或期区名称："> -->
              <el-input v-model="ProjectName" placeholder="所属组织" clearable> </el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="招标计划名称："> -->
              <el-input v-model="PlanName" placeholder="招标计划名称" clearable></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="招标方式："> -->
              <el-select
                v-model="PurchaseType"
                size="small"
                style="margin-right: 10px; margin-bottom: 10px"
                placeholder="招标方式"
                @change="selectChange"
              >
                <el-option v-for="item in tabsList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>

            <el-col :span="3">
              <!-- <el-form-item label="招标经办人："> -->
              <el-input v-model="UserName" placeholder="招标经办人" clearable></el-input>
              <!-- </el-form-item> -->
            </el-col>

            <!-- <el-col :span="3"> -->
            <!-- <el-select v-model="BidLevel" @change="selectChange"> -->
            <!-- <el-option label="招标层级" value=""></el-option> -->
            <!-- <el-option label="集团" value="集团"></el-option> -->
            <!-- <el-option label="项目" value="项目"></el-option> -->
            <!-- </el-select> -->
            <!-- </el-col> -->
            <el-col :span="3">
              <!-- <el-form-item label="权限："> -->
              <el-select v-model="MyAuth" @change="selectChange">
                <el-option label="选择权限" value=""></el-option>
                <el-option label="我经办的" :value="1"></el-option>
                <el-option label="我参与的" :value="2"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="small" @click="search()">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>

        <!-- <div style="text-align:right"> -->
        <!-- <el-select v-model="optionValue" placeholder="请选择" style="width:200px;" @change="handleChange">
                <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value"> </el-option>
              </el-select> -->

        <!-- <el-input v-model="ModeName" style="width:200px;margin:0 10px" placeholder="请输入方案名称" />
          <el-input v-model="UserName" style="width:200px;margin-right:10px" placeholder="请输入经办人" />
          
        </div> -->
        <div class="card-cont" style="margin-top: 10px">
          <el-table
            stripe
            ref="tablebleref"
            v-loading="loading"
            empty-text="无符合条件的记录"
            element-loading-text="请稍候,数据正在加载中..."
            :data="dataList"
            style="width: 100%; margin-bottom: 10px; z-index: 99"
            row-key="subjectCode"
            border
            :cell-style="{ padding: '5px 0' }"
          >
            <template slot="empty">
              <span style="margin: 50% auto">暂无数据</span>
            </template>
            <el-table-column label="序号" width="60" type="index" align="center"> </el-table-column>
            <el-table-column align="left" label="所属组织" min-width="120px">
              <template slot-scope="scope">
                <span>{{ scope.row.projectName }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" min-width="150px" label="招标计划名称">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  style="color: #409eff; text-decoration: none"
                  @click="goto(scope.row.bidModeId, scope.row.purchaseType)"
                  >{{ scope.row.planName }}</el-link
                >
                <!-- <span class="sp">{{ scope.row.modeName }}</span> -->
              </template>
            </el-table-column>
            <el-table-column align="center" label="招标方式" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.purchaseType }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="招标经办人" width="120">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="60" label="报名">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.signUpStatus1 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width:15px;height:15px"
                ></el-button>
                <el-button
                  v-if="scope.row.signUpStatus1 == '进行中'"
                  type="success"
                  circle
                  size="mini"
                  style="width:15px;height:15px"
                ></el-button>
                <el-button v-if="scope.row.signUpStatus1 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.signUpStatus1 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.signUpStatus1 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button> -->
            <!-- <span :max-lines="2">{{ scope.row.orgName }}</span> -->
            <!-- </template>
            </el-table-column> -->
            <el-table-column align="center" width="60" label="入围">
              <template slot-scope="scope">
                <!-- <div class=""></div> -->
                <el-button
                  v-if="scope.row.selectInStatus2 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.selectInStatus2 == '进行中' || scope.row.selectInStatus2 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.selectInStatus2 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.selectInStatus2 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.selectInStatus2 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
                <el-button
                  v-if="scope.row.selectInStatus2 == '黄色预警'"
                  type="warning"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.selectInStatus2 == '红色预警'"
                  type="danger"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" width="60" label="发标">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.sendStatus3 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.sendStatus3 == '进行中' || scope.row.sendStatus3 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.sendStatus3 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.sendStatus3 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.sendStatus3 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
                <el-button
                  v-if="scope.row.sendStatus3 == '黄色预警'"
                  type="warning"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.sendStatus3 == '红色预警'"
                  type="danger"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="60" label="答疑">
              <template slot-scope="scope">
                <el-button v-if="scope.row.qaStatus4 == '未开始'" type="info" circle size="mini" style="width:15px;height:15px"></el-button>
                <el-button
                  v-if="scope.row.qaStatus4 == '进行中'"
                  type="success"
                  circle
                  size="mini"
                  style="width:15px;height:15px"
                ></el-button>
                <el-button v-if="scope.row.qaStatus4 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.qaStatus4 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.qaStatus4 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
              </template>
            </el-table-column> -->
            <el-table-column align="center" width="60" label="回标">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.backStatus5 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.backStatus5 == '进行中' || scope.row.backStatus5 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.backStatus5 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.backStatus5 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.backStatus5 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
                <el-button
                  v-if="scope.row.backStatus5 == '黄色预警'"
                  type="warning"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.backStatus5 == '红色预警'"
                  type="danger"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" width="60" label="开标">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.openStatus6 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.openStatus6 == '进行中' || scope.row.openStatus6 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.openStatus6 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.openStatus6 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.openStatus6 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="60" label="澄清">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.bidExplainStatus7 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width:15px;height:15px"
                ></el-button>
                <el-button
                  v-if="scope.row.bidExplainStatus7 == '进行中'"
                  type="success"
                  circle
                  size="mini"
                  style="width:15px;height:15px"
                ></el-button>
                <el-button
                  v-if="scope.row.bidExplainStatus7 == '已完成'"
                  type="success"
                  icon="el-icon-check"
                  circle
                  size="mini"
                ></el-button>
                <i v-if="scope.row.bidExplainStatus7 == '已逾期'" class="el-icon-warning"></i>
                <el-button
                  v-if="scope.row.bidExplainStatus7 == '逾期完成'"
                  type="danger"
                  icon="el-icon-check"
                  circle
                  size="mini"
                ></el-button>
              </template>
            </el-table-column> -->
            <el-table-column align="center" width="60" label="评标">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.examStatus8 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.examStatus8 == '进行中' || scope.row.examStatus8 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.examStatus8 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.examStatus8 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.examStatus8 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
                <el-button
                  v-if="scope.row.examStatus8 == '黄色预警'"
                  type="warning"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.examStatus8 == '红色预警'"
                  type="danger"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" width="60" label="定标">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.endStatus9 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.endStatus9 == '进行中' || scope.row.endStatus9 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.endStatus9 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.endStatus9 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.endStatus9 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
                <el-button
                  v-if="scope.row.endStatus9 == '黄色预警'"
                  type="warning"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.endStatus9 == '红色预警'"
                  type="danger"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="100" label="详细过程">
              <template slot-scope="scope">
                <el-link>
                  <i class="el-icon-pie-chart" @click="goto(scope.row.bidModeId)"></i>
                </el-link>
              </template>
            </el-table-column> -->
          </el-table>
          <pagination :total="totalCount" :current-page="currentPage" :pageSize="page_size" @pageChange="pageChange" />
        </div>
      </el-card>
      <!-- </el-main> -->
    </el-container>
  </div>
</template>

<script>
import bus from "@/util/bus";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
    ProjectTree: () => import("./components/ProjectTree.vue"),
  },
  data() {
    return {
      value: "",
      sysTreeCateTypeW: "250px", // 项目树宽度
      sysTreeCateType: [], // 项目树
      boxTitle: "装配式建筑 — 组价明细",
      dialogFormpeople: false,
      returnValue: "",
      orgTypeGuid: "",
      content: "",
      activeName: "邀请招标",
      tabsList: [],
      dataList: [],
      PurchaseType: "",
      ProjectName: "",
      PlanName: "",
      UserName: "",
      MyAuth: "",
      BidLevel: "",
      depName: "",
      loading: false,
      ModeName: "", //方案名称
      UserName: "", //经办人
      PurchaseType: "", //采购方式
      options: [],
      optionValue: "",
      currentPage: 1,
      page_size: 15,
      totalCount: 10,
      open: true,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.$http.post("/UserSession/BidProcessSetAuth1001").then((res) => {});
  },
  mounted() {
    bus.$emit("showNav");
    this.GetPurchaseType();
  },

  methods: {
    GetPurchaseType() {
      this.$http.get("/BidMaster/GetPurchaseType01").then((res) => {
        this.tabsList = res.data;
        this.value = res.data.length > 0 ? res.data[0].value : "";
        this.GetUserList();
      });
    },
    goto(bidModeId, purchaseType) {
      // if (purchaseType == "邀请招标") {
      //   window.open("#/bid/processDetail?id=" + bidModeId);
      // }
      if (purchaseType == "直接委托" || purchaseType == "询价比选" || purchaseType == "竞争性谈判" || purchaseType == "零星采购") {
        // window.open("#/bid/processDetailjianyi?id=" + bidModeId);
        this.$router.push({ path: "/bid/processDetailjianyi?id=" + bidModeId });
      } else {
        window.open("#/bid/processDetail?id=" + bidModeId);
      }
      // if (purchaseType == "直接委托") {
      //   window.open("#/bid/processDetailzw?id=" + bidModeId);
      // }
      // if (purchaseType == "竞争性谈判") {
      //   window.open("#/bid/processDetaillx?id=" + bidModeId);
      // }
      // if (purchaseType == "集采使用") {
      //   window.open("#/bid/processDetailjc?id=" + bidModeId);
      // }
    },
    slideNave(data) {
      this.open = data;
      console.log(this.open);
    },
    async GetUserList() {
      let obj = {
        // Id: this.id,
        ProjectId: this.orgTypeGuid,
        PurchaseType: this.PurchaseType,
        ProjectName: this.ProjectName,
        PlanName: this.PlanName,
        UserName: this.UserName,
        MyAuth: this.MyAuth,
        BidLevel: this.BidLevel,
        SkipCount: (this.currentPage - 1) * this.page_size,
        MaxResultCount: this.page_size,
      };
      this.loading = true;
      let res = await this.$http.get("/BidMaster/GetBidMasterList", { params: obj });
      this.totalCount = res.data.result.totalCount;
      this.dataList = res.data.result.items;
      this.loading = false;
    },
    selectChange() {
      this.currentPage = 1;
      this.GetUserList();
    },
    handleClick(e) {
      this.currentPage = 1;
      //   this.GetMenuList();
    },
    search() {
      this.currentPage = 1;
      this.GetUserList();
    },
    handleChange(val) {
      this.currentPage = 1;
      this.GetUserList();
    },
    pageChange(page) {
      this.page_size = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetUserList();
    },
    // 测导航显示隐藏
    slideNave() {
      let that = this;
      that.open = !that.open;
      if (!that.open) {
        that.sysTreeCateTypeW = "25px";
      } else {
        that.sysTreeCateTypeW = "300px";
      }
    },
    // onChangeProject(project) {
    //   let that = this;
    //   that.orgTypeGuid = project.id;
    //   // if (that.orgTypeGuid && project.orgType === "分期") {
    //   that.currentPage = 1;
    //   that.GetUserList();
    //   // }
    //   // this.GetUserList();
    // },
    // 选择区域树
    selectedType(s) {
      // 判断是否为分期节点
      let that = this;
      let judgePart = false;
      if (!that.sysTreeCateType[0].children.length) {
        judgePart = false;
      } else {
        // 判断一二三级节点
        const childStatus = that.sysTreeCateType[0].children.some((m) => {
          return m.id === s.parentId;
        });
        judgePart = !(s.id === that.sysTreeCateType[0].id || s.parentId === that.sysTreeCateType[0].id || childStatus);
      }
      that.orgTypeNode = s;
      that.orgTypeGuid = s.id;
      that.orgTypeNode.judgePart = judgePart;
      // console.log(s.orgType);
      if (that.orgTypeGuid && s.orgType === "分期") {
        that.currentPage = 1;
        that.GetUserList();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.userwidth {
  // width: 88%;
  margin: 0 auto;
  margin-bottom: 90px;
}
.title {
  font-weight: 600;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-top: -5px;
}
/*::v-deep.el-table .warning_row {*/
/*  background: #dbe8f7;*/
/*}*/
// ::v-deep .el-tree {
//   height: 550px !important;
// }
::v-deep .el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #00a59f;
}
::v-deep .dialog-footer {
  text-align: right;
  padding-right: 35px;
}

::v-deep .el-card__header {
  display: block;
}
::v-deep .el-dialog {
  width: 35%;
}
::v-deep .btns {
  text-align: right;
}

/*列表样式*/
.type-list {
  border: 1px solid #ebeef5;
  width: 100%;
  height: 100%;
  background: #fff;
  .list-ul {
    width: 100%;
    .active-class {
      color: #fff;
    }
    .ul-li {
      width: 90%;
      height: 40px;
      cursor: pointer;
      padding-left: 15px;
      line-height: 40px;
      border-bottom: 1px solid #ebeef5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .ul-li:hover {
      width: 90%;
      height: 40px;
      padding-left: 15px;
      cursor: pointer;
      line-height: 40px;
      border-bottom: 1px solid #ebeef5;
      background-color: rgb(211, 211, 211);
    }
  }
}
::v-deep .el-table {
  font-size: 15px;
  font-weight: 540;
}
::v-deep [class^="el-icon-"].el-icon-check {
  color: #fff;
  font-size: 12px;
}
.iconText {
  margin: 0 5px;
}
.tit {
  width: 15px;
  height: 15px;
  background: #67c23a;
  display: flex;
  padding-top: 3px;
  border-radius: 50%;
}
.tit1 {
  background: #67c23a;
}
.tit2 {
  background: #f56c6c;
}
::v-deep .el-form-item {
  margin-bottom: 1px;
}
</style>
<!--<style lang="scss" scoped>-->

<!--::v-deep .el-col-19 {-->
<!--  width: 76%;-->
<!--}-->
<!--</style>-->
