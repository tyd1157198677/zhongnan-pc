<template>
  <el-main>
    <div style="overflow: hidden">
      <div class="top">
        <div class="right1" style="float: left; margin-bottom: 10px">
          <el-input v-model="ComName" style="margin-right: 10px" placeholder="供应商名称" clearable />
          <!-- <el-input v-model="ComName" style="margin-right:10px" placeholder="请输入承接主体名称" clearable /> -->
          <el-input v-model="keyWords" style="margin-right: 10px" placeholder="执行原因" clearable />
        </div>
        <div style="float: right">
          <el-button v-if="isShowFaQibtn" type="primary" size="small" @click="add()">新增</el-button>
          <el-button type="primary" size="small" @click="search()">搜索</el-button>
        </div>
      </div>
      <el-table
        height="605px"
        empty-text="暂无数据"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData"
        v-loading="loading"
      >
        <el-table-column type="index" label="序号" width="50" align="center" fixed="left"> </el-table-column>
        <el-table-column prop="comFullName" label="供应商名称" align="left" min-width="200" fixed="left"> </el-table-column>
        <!-- <el-table-column prop="comMainName" label="承接主体名称" align="left" min-width="200" fixed="left">
          <template slot-scope="scope">
            <el-link type="primary" style="color:#409eff;text-decoration: none" @click="edit(scope.row.id, 2)">
              <i class="el-icon-search" style="padding-right: 5px;"></i>{{ scope.row.comMainName }}
            </el-link>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="area" label="区域" align="center" width="110">
          <template slot-scope="scope">
            <Span>{{ scope.row.area }}</Span>
          </template>
        </el-table-column> -->
        <el-table-column prop="comShortName" label="项目名称" align="left" min-width="150">
          <template slot-scope="scope">
            <span v-for="item in scope.row.supBackProjectList" :key="item.projectGuid">{{ item.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="supType" label="所属专业" align="center" min-width="110"> </el-table-column>
        <!-- <el-table-column prop="desc" label="原因描述" align="left" width="150"> </el-table-column> -->
        <!-- <el-table-column prop="incident" label="发生事件" align="left"> </el-table-column> -->
        <el-table-column prop="startDate" label="执行开始日期" width="110" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.startDate | startDate }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="执行结束日期" width="110" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.endDate }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="经办人" width="80" align="center"> </el-table-column>
        <el-table-column prop="auditStatus" label="状态" width="100" align="center">
          <!-- <template slot-scope="scope"> -->
          <!-- <span style="padding: 5px" :type="scope.row.isCompleted == 'false' ? 'false' : 'true'">
                  {{ scope.row.isCompleted == "已处理" ? "已处理" : "未处理" }}
                </span> -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <i
              title="删除"
              class="el-icon-delete"
              @click="deletes(scope.row.id)"
              v-if="(scope.row.auditStatus == '草稿' || scope.row.auditStatus == '驳回') && scope.row.userGuid == userId"
            ></i>
            <i
              title="编辑"
              class="el-icon-edit"
              @click="edit(scope.row.id, 1)"
              style="margin-left: 10px"
              v-if="(scope.row.auditStatus == '草稿' || scope.row.auditStatus == '驳回') && scope.row.userGuid == userId"
            ></i>
            <i
              class="el-icon-upload2"
              title="提交"
              @click="tijiao(scope.row.id)"
              style="margin-left: 10px"
              v-if="(scope.row.auditStatus == '草稿' || scope.row.auditStatus == '驳回') && scope.row.userGuid == userId"
            ></i>
            <i
              class="el-icon-search"
              title="查看"
              @click="edit(scope.row.id, 2)"
              style="margin-left: 10px"
              v-if="scope.row.auditStatus == '审批中' || scope.row.auditStatus == '审批完成'"
            ></i>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="totalCount" :current-page="currentPage" :pageSize="pageSize" @pageChange="pageChange1" />
    </div>
  </el-main>
</template>

<script>
import { dateFormat } from "@/util/validate";
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      ComName: "",
      keyWords: "",
      userId: "",
      options: [],
      activeName: "用户登录日志",
      indexactive: 0,
      userName1: "",
      UserName: "",
      userName2: "",
      contentlayout: "",
      tableData: [
        {
          supBackProjectList: [],
          conFullName: "",
          comMainName: "",
          startDate: "",
          endDate: "",
          userName: "",
          auditStatus: "",
          id: "",
          userGuid: "",
        },
      ],
      comFullName: "",
      comMainName: "",
      userName: "",
      value: "",
      optionValue: "",
      options: [],
      orderList: [],
      items: "",
      loading: false,
      isEnable: "",
      pageSize: 15,
      currentPage: 1,
      totalCount: 10,
      userGuid: "",
      isShowFaQibtn: false,
    };
  },
  created() {
    this.userId = sessionStorage.getItem("userGuid");
    console.log(this.userId);
    this.getList();
    this.$http.post("/RoleMenu/GetUserRoleButtonList", ["BACKLIST001"], {}).then((res) => {
      this.isShowFaQibtn = res.data.indexOf("BACKLIST001") > -1 ? true : false;
    });
  },
  computed: {
    baseGuid() {
      return this.$route.query.baseGuid;
    },
  },
  filters: {
    //格式化日期
    startDate(time) {
      return dateFormat(time, "yyyy-MM-dd");
    },
    endDate(time) {
      return dateFormat(time, "yyyy-MM-dd");
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let obj = {
        id: this.id,
        // ComName: this.CComName,
        ComName: this.ComName,
        KeyWords: this.keyWords,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
      };
      this.loading = true;
      this.$http.get("/SupBackList/GetSupBackListList", { params: obj }).then((res) => {
        this.tableData = res.data.result.items;
        this.totalCount = res.data.result.totalCount;
        this.loading = false;
      });
    },
    async search() {
      this.currentPage = 1;
      this.getList();
    },
    pageChange1(page) {
      this.pageSize = page._pageSize;
      this.currentPage = page._currentPage;
      this.getList();
    },
    add() {
      this.$router.push({
        path: "/supplier/backlistadd",
        query: { type: 1 },
      });
    },
    edit(id, type) {
      this.$router.push({
        path: "/supplier/backlistadd",
        query: { id, type },
      });
    },
    jumpSuppInfo(id) {
      // window.open(`#/supplier/backlistdetail?id=/${id}`);
      window.open("#/supplier/backlistdetail?id=" + id);
    },
    // jumpSuppInfo(row){
    //   this.$router.push({
    //         path: "./backlistdetail",
    //         query: { row: row }
    //       });
    // },
    deletes(id) {
      this.$confirm("删除后将不能恢复，确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupBackList/DeleteSupBackListById", { id: id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.getList();
        });
      });
    },
    tijiao(id) {
      this.$confirm("提交后将不能修改，确认要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupBackList/SubmitSupplierBack", { id: id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.getList();
        });
      });
    },
    showdet(id) {
      this.$router.push({
        path: "/supplier/showdet",
        query: { id },
      });
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
::v-deep .right1 {
  .el-input {
    width: 200px !important;
  }
}
</style>
