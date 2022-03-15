<!--  -->
<template>
  <div>
    <statusList :planId="planId" v-if="show"></statusList>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <div style="float:left"><strong>首次入围</strong></div> -->
        <span>{{ this.mes }}</span>
        <el-button type="primary" style="float:right;margin-left:10px" size="small" @click="goto(planId)">查看入围明细</el-button>
        <el-select placeholder="请选择标段" @change="dropDownChange" v-model="activeName2" style="float: right;">
          <el-option v-for="item in supplierList" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </div>
      <!-- <el-tabs v-model="activeName" type="card" style="margin-top: 10px;"> -->

      <div class="text item">
        <el-table
          empty-text="暂无数据"
          :row-class-name="status_change"
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
          <el-table-column align="left" label="供应商名称" min-width="250" fixed>
            <template slot-scope="scope">
              <el-link type="primary" @click="jumpDetail(scope.row.supplierId)">{{ scope.row.comFullName }}</el-link>
            </template>
          </el-table-column>
          <!-- <el-table-column label="入围方式" prop="supplierFrom" align="center" width="150" fixed></el-table-column> -->
          <el-table-column label="状态" prop="status" align="center" width="150" fixed></el-table-column>
          <el-table-column label="登录名" prop="supplierLoginId" align="center" width="120" fixed></el-table-column>
          <el-table-column label="投标联系人" align="center">
            <el-table-column label="姓名" width="100" align="center" prop="userName1"> </el-table-column>
            <el-table-column label="手机" width="120" align="center" prop="mobilePhone1"> </el-table-column>
            <el-table-column label="邮箱" width="180" align="center" prop="email1"> </el-table-column>
          </el-table-column>
          <el-table-column label="商务洽谈联系人" align="center">
            <el-table-column label="姓名" width="100" align="center" prop="userName2"> </el-table-column>
            <el-table-column label="手机" width="120" align="center" prop="mobilePhone2"> </el-table-column>
            <el-table-column label="职务" width="180" align="center" prop="workAs"> </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane label="补录入围" name="补录入围" v-if="this.tablebululist.length > 0"> -->
    </el-card>
    <!-- <el-card style="margin-top:10px" v-if="this.tablebululist.length > 0">
      <div style="margin:10px"><strong>补录入围</strong></div>
      <div class="text item">
        <el-table
          empty-text="暂无数据"
          :row-class-name="status_change"
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tablebululist"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
          <el-table-column label="供应商名称" min-width="250" fixed>
            <template slot-scope="scope">
              <el-link type="primary" @click="jumpDetail(scope.row.supplierId)">{{ scope.row.comFullName }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="入围方式" prop="supplierFrom" align="center" width="150" fixed></el-table-column>
          <el-table-column label="状态" prop="status" align="center" width="150" fixed></el-table-column>
          <el-table-column label="登录名" prop="supplierLoginId" align="center" width="120" fixed></el-table-column>
          <el-table-column label="投标联系人" align="center">
            <el-table-column label="姓名" width="100" align="center" prop="userName1"> </el-table-column>
            <el-table-column label="手机" width="120" align="center" prop="mobilePhone1"> </el-table-column>
            <el-table-column label="邮箱" width="180" align="center" prop="email1"> </el-table-column>
          </el-table-column>
          <el-table-column label="商务洽谈联系人" align="center">
            <el-table-column label="姓名" width="100" align="center" prop="userName2"> </el-table-column>
            <el-table-column label="手机" width="120" align="center" prop="mobilePhone2"> </el-table-column>
            <el-table-column label="职务" width="180" align="center" prop="workAs"> </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </el-card> -->
    <!--<el-tabs v-model="activeName2" type="card" @tab-click="tabsClick">-->
    <!--<el-tab-pane v-for="item in supplierList" :key="item.sectionId" :label="item.text" :name="item.value"> </el-tab-pane>-->
    <!--</el-tabs>-->
    <!--<div v-if="meg" style="margin-bottom:10px;color:red">{{ this.mes }}</div>-->
    <!--<el-button type="primary" style="margin-bottom:10px;float:right" size="small" @click="goto(planId)">查看入围明细</el-button>-->
  </div>
</template>

<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
    statusList: () => import("@/components/statusList.vue"),
  },
  props: ["id"],
  data() {
    return {
      meg: false,
      show: false,
      mes: "",
      planId: "",
      activeName2: "",
      loading: false,
      tableData: [],
      supplierList: [],
      tablebululist: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.CheckUserProcessPageAuth();
  },
  methods: {
    tomethgoruWeiSubmit() {
      this.CheckUserProcessPageAuth();
    },
    status_change({ row }) {
      if (row.status == "已废标" || row.status == "已弃标") {
        return "table-info-row";
      }
      return "";
    },
    CheckUserProcessPageAuth() {
      this.$http.get("/BidCheckCenter/CheckUserProcessPageAuth", { params: { baseId: this.id } }).then(res => {
        if (res.data.success) {
          if (!res.data.returnValue1) {
            this.getList();
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
    GetSupplierInPageShow() {
      this.$http
        .get("/LiandoBidMaster/GetLiandoSupplierInListForProcess", { params: { bidModeId: this.id, sectionId: this.activeName2 } })
        .then(res => {
          this.tableData = res.data.supplierList;
          this.planId = res.data.planId;
          this.$nextTick(() => {
            this.show = true;
          });
          if (res.data.success == false) {
            this.meg = true;
            this.mes = res.data.message;
          } else {
            this.meg = false;
          }
        });
    },
    GetLiandoSupplierInListForProcess_2() {
      this.$http
        .get("/LiandoBidMaster/GetLiandoSupplierInListForProcess_2", { params: { bidModeId: this.id, sectionId: this.activeName2 } })
        .then(res => {
          this.tablebululist = res.data.supplierList;
        });
    },
    dropDownChange() {
      this.GetSupplierInPageShow();
      this.GetLiandoSupplierInListForProcess_2();
    },
    goto() {
      window.open("#/bid/bidMode7/detail?id=" + this.planId);
    },
    getList() {
      this.$http.get("/LiandoBidMaster/GetSectionList", { params: { baseId: this.id } }).then(res => {
        this.supplierList = res.data;
        if (res.data.length > 0) {
          this.activeName2 = res.data[0].value;
          this.GetSupplierInPageShow();
          this.GetLiandoSupplierInListForProcess_2();
        }
      });
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
    tabsClick(e) {
      this.GetSupplierInPageShow();
      this.GetLiandoSupplierInListForProcess_2();
    },
  },
};
</script>
<style lang="scss" scoped>
// ::v-deep.el-dialog__body {
//   padding: 20px !important;
// }
</style>
<style>
.el-table .table-info-row {
  background-color: #ffffcc;
}
.el-card__header {
  height: 60px;
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
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
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
</style>
