<template>
  <el-main>
    <el-card style="margin-bottom: 10px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="用户登录日志" name="用户登录日志">
          <div class="top">
            <div class="right1" style="float: right; margin-bottom: 10px">
              <el-input v-model="UserName1" style="margin-right: 10px" placeholder="请输入用户名或姓名" @input="handleChange1" clearable />
            </div>
          </div>
          <el-table
            style="width: 100%"
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData1"
            v-loading="loading"
          >
            <el-table-column type="index" label="序号" width="150" align="center"> </el-table-column>
            <el-table-column prop="userName" label="姓名" align="center"> </el-table-column>
            <el-table-column prop="loginId" label="登录名" align="center"> </el-table-column>
            <el-table-column prop="loginTime" label="登录时间" align="center"> </el-table-column>
            <el-table-column prop="ipAddress" label="IP地址" align="center"> </el-table-column>
            <el-table-column prop="browser" label="浏览器类型" align="center"> </el-table-column>
          </el-table>
          <pagination :total="totalCount1" :current-page="currentPage1" :pageSize="pageSize1" @pageChange="pageChange1" />
        </el-tab-pane>
        <el-tab-pane label="供应商登录日志" name="供应商登录日志">
          <div class="top">
            <div class="right1" style="float: right; margin-bottom: 10px">
              <el-input
                v-model="UserName2"
                style="margin-right: 10px"
                placeholder="请输入供应商名称或登录名"
                @input="handleChange2"
                clearable
              />
            </div>
          </div>
          <el-table
            style="width: 100%"
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData2"
            v-loading="loading"
          >
            <el-table-column type="index" label="序号" width="150" align="center"> </el-table-column>
            <el-table-column prop="userName" label="供应商" align="center"> </el-table-column>
            <el-table-column prop="loginId" label="登录名" align="center"> </el-table-column>
            <el-table-column prop="loginTime" label="登录时间" align="center"> </el-table-column>
            <el-table-column prop="ipAddress" label="IP地址" align="center"> </el-table-column>
            <el-table-column prop="browser" label="浏览器类型" align="center"> </el-table-column>
          </el-table>
          <pagination :total="totalCount2" :current-page="currentPage2" :pageSize="pageSize2" @pageChange="pageChange2" />
        </el-tab-pane>
        <el-tab-pane label="系统操作日志" name="系统操作日志">
          <div class="top">
            <div class="right1" style="float: right; margin-bottom: 10px">
              <el-input v-model="UserName3" style="margin-right: 10px" placeholder="请输入关键字" @input="handleChange3" clearable />
            </div>
          </div>
          <el-table
            style="width: 100%"
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData3"
            v-loading="loading"
          >
            <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
            <el-table-column prop="module1" label="模块" align="center" width="180"> </el-table-column>
            <el-table-column prop="userName" label="操作人" align="center" width="150"> </el-table-column>
            <el-table-column prop="desc" label="描述" align="left"> </el-table-column>
            <el-table-column prop="operatingTime" label="操作时间" align="center" width="180"> </el-table-column>
          </el-table>
          <pagination :total="totalCount3" :current-page="currentPage3" :pageSize="pageSize3" @pageChange="pageChange3" />
        </el-tab-pane>
        <el-tab-pane label="数据同步日志" name="数据同步日志">
          <div class="text-right">
            <el-date-picker v-model="StartDate" style="width: 200px" type="date" placeholder="选择开始日期"> </el-date-picker>
            <el-date-picker v-model="EndDate" style="width: 200px; margin: 0 10px" type="date" placeholder="选择结束日期"> </el-date-picker>
            <el-input v-model="KeyWords" style="width: 200px; margin-right: 10px" placeholder="请输入关键字" clearable />
            <el-button type="primary" size="small" @click="handleChange4">搜索</el-button>
          </div>
          <el-table
            style="width: 100%; margin-top: 10px"
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData4"
            v-loading="loading"
          >
            <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
            <el-table-column prop="synchModule" label="所属模块" align="center" width="180"> </el-table-column>
            <el-table-column prop="dataTitle" label="说明" align="left"> </el-table-column>
            <el-table-column prop="startTime" label="开始时间" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.startTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.endTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column>
            <el-table-column prop="dataCount" label="获取数量" align="center" width="100"> </el-table-column>
          </el-table>
          <pagination :total="totalCount4" :current-page="currentPage4" :pageSize="pageSize4" @pageChange="pageChange4" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      KeyWords: "",
      roleList1: [],
      activeName: "用户登录日志",
      indexactive: 0,
      userName1: "",
      UserName1: "",
      UserName2: "",
      UserName3: "",
      userName2: "",
      synchroModule: "",
      StartDate: "",
      EndDate: "",
      contentlayout: "",
      tableData1: [
        {
          userName: "",
          loginId: "",
          loginTime: "",
          ipAddress: "",
          browser: "",
        },
      ],
      tableData2: [
        {
          userName: "",
          loginId: "",
          loginTime: "",
          ipAddress: "",
          browser: "",
        },
      ],
      tableData3: [
        {
          module1: "",
          userName: "",
          desc: "",
          operatingTime: "",
        },
      ],
      tableData4: [],
      value: "",
      optionValue: "",
      options: [],
      orderList: [],
      items: "",
      loading: false,
      isEnable: "",
      pageSize1: 15,
      currentPage1: 1,
      totalCount1: 15,
      pageSize2: 15,
      currentPage2: 1,
      totalCount2: 15,
      pageSize3: 15,
      currentPage3: 1,
      totalCount3: 15,
      pageSize4: 15,
      currentPage4: 1,
      totalCount4: 15,
    };
  },
  created() {
    this.getList1();
    this.getList2();
    this.getList3();
    this.getList4();
  },
  mounted() {
    // this.StartDate = this.getNowFormatDate1();
    // this.EndDate = this.getNowFormatDate();
  },
  methods: {
    parseTime,
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getNowFormatDate1() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    async getList1() {
      let obj = {
        UserName: this.UserName1,
        SkipCount: (this.currentPage1 - 1) * this.pageSize1,
        MaxResultCount: this.pageSize1,
        // SkipCount: 0,
        // MaxResultCount: 9999,
        loginId: this.loginId,
      };
      this.loading = true;
      let res = await this.$http.get("/SysLoginLog/GetUserLoginLogList", { params: obj });
      if (res.status == 200) {
        this.totalCount1 = res.data.result.totalCount;
        this.loading = false;
        this.tableData1 = res.data.result.items;
      }
    },
    handleChange1(val) {
      this.getList1();
    },
    async getList2() {
      let obj = {
        UserName: this.UserName2,
        SkipCount: (this.currentPage2 - 1) * this.pageSize2,
        MaxResultCount: this.pageSize2,
      };
      this.loading = true;
      let res = await this.$http.get("/SysLoginLog/GetSupplierLoginLogList", { params: obj });
      if (res.status == 200) {
        this.totalCount2 = res.data.result.totalCount;
        this.loading = false;
        this.tableData2 = res.data.result.items;
      }
    },
    async getList3() {
      let obj = {
        KeyWords: this.UserName3,
        SkipCount: (this.currentPage3 - 1) * this.pageSize3,
        MaxResultCount: this.pageSize3,
      };
      this.loading = true;
      let res = await this.$http.get("/SysOperationLog/GetSysOperationLogList", { params: obj });
      if (res.status == 200) {
        this.totalCount3 = res.data.result.totalCount;
        this.loading = false;
        this.tableData3 = res.data.result.items;
      }
    },
    handleChange2(val) {
      this.getList2();
    },
    async getList4() {
      let obj = {
        KeyWords: this.KeyWords,
        StartDate: parseTime(this.StartDate, "yyyy-MM-dd"),
        EndDate: parseTime(this.EndDate, "yyyy-MM-dd"),
        SynchroModule: this.synchroModule,
        SkipCount: (this.currentPage4 - 1) * this.pageSize4,
        MaxResultCount: this.pageSize4,
      };
      this.loading = true;
      let res = await this.$http.get("/SysDataSynchro/GetSynchroMainList", { params: obj });
      if (res.status == 200) {
        this.totalCount4 = res.data.result.totalCount;
        this.loading = false;
        this.tableData4 = res.data.result.items;
      }
    },
    handleChange4(val) {
      this.getList4();
    },
    handleChange3() {
      this.getList3();
    },
    pageChange1(page) {
      this.pageSize1 = page._pageSize;
      this.currentPage1 = page._currentPage;
      this.getList1();
    },
    pageChange2(page) {
      this.pageSize2 = page._pageSize;
      this.currentPage2 = page._currentPage;
      this.getList2();
    },
    pageChange3(page) {
      this.pageSize3 = page._pageSize;
      this.currentPage3 = page._currentPage;
      this.getList3();
    },
    pageChange4(page) {
      this.pageSize4 = page._pageSize;
      this.currentPage4 = page._currentPage;
      this.getList4();
    },
  },
};
</script>

<style lang="scss" scoped>
.rolse {
  height: 620px;
  margin-bottom: 90px;
  display: flex;
  flex-flow: row; /*伸缩项目单行排列*/
  // overflow: auto;
  .left {
    width: 230px;
    height: 100%;
    border: 1px solid #ccc;
    .item {
      width: 100%;
      height: 40px;
      display: flex;
      /*实现垂直居中*/
      align-items: center;
      /*实现水平居中*/
      justify-content: center;
      text-align: justify;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      //   font-weight: 550;
      font-size: 14px;
    }
  }
  .right {
    width: auto;
    height: 100%;
    border: 1px solid #ccc;
    flex: 1;
    // overflow: auto;
    margin-left: 10px;
    .top {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .left1 {
        padding-left: 20px;
        display: flex;
      }
      .right1 {
        padding-right: 10px;
      }
    }
  }
}
</style>
