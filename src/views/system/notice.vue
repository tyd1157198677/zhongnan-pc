<template>
  <el-main>
    <el-card style="margin-bottom: 10px">
      <div class="top">
        <div class="left1">
          <el-select v-model="notice" size="small" style="margin-right: 10px; margin-bottom: 10px" placeholder="请选择内容分类">
            <el-option v-for="item in noticeType" :key="item.value" :label="item.text" :value="item.value"> </el-option>
          </el-select>
          <el-select v-model="noticeShow" size="small" style="margin-right: 10px; margin-bottom: 10px" placeholder="请选择显示类型">
            <el-option v-for="item in noticeShowType" :key="item.value" :label="item.text" :value="item.value"> </el-option>
          </el-select>
          <el-input v-model="KeyWords" style="margin-right: 10px; width: 200px" placeholder="请输入标题或内容..." clearable />
          <el-button type="primary" size="small" @click="search()">搜索</el-button>
          <el-button size="small" type="primary" @click="addgong" style="float: right">新增</el-button>
        </div>
      </div>
      <el-table style="width: 100%" empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData">
        <el-table-column type="index" label="序号" width="80" align="center" fixed> </el-table-column>
        <el-table-column prop="title" label="公告标题" align="center" width="500" fixed> </el-table-column>
        <el-table-column prop="todoTitle" label="有效期" align="center" width="350">
          <template slot-scope="scope"> {{ scope.row.startDate }} - {{ scope.row.endDate }} </template>
        </el-table-column>
        <el-table-column prop="noticeType" label="内容类型" width="150" align="center"> </el-table-column>
        <el-table-column prop="noticeShowType" label="展示类型" width="180" align="center"></el-table-column>
        <el-table-column prop="creationTime" label="发布日期" width="150" align="center"></el-table-column>
        <el-table-column prop="isShow" label="是否展示" width="120" align="center">
          <template slot-scope="scope"
            ><span>{{ !scope.row.isShow ? "否" : "是" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template slot-scope="scope">
            <i class="el-icon-edit" title="修改" @click="edit(scope.row)" style="margin-right: 10px"></i>
            <i class="el-icon-delete" title="删除" @click="del1(scope.row)" style="margin-right: 10px"></i>
            <i class="el-icon-folder" title="附件" @click="folder(scope.row.id)"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog width="30%" title="上传附件" :visible.sync="dialogVisible">
        <el-form class="mt-0" size="small" style="padding: 20px">
          <el-form-item label="选择文件">
            <el-upload
              class="upload-demo"
              ref="upload1"
              :data="uploadData"
              :before-upload="beforeUpload1"
              :on-change="handleChange"
              :fileList="fileList"
              :action="getUploadUrl1()"
              :on-success="onUploadSuccess"
              :multiple="false"
              :auto-upload="false"
              :headers="header"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload()">上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-dialog>
      <pagination :total="totalCount" :current-page="currentPage" :pageSize="pageSize" @pageChange="pageChange1" />
    </el-card>
  </el-main>
</template>

<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      KeyWords: "",
      value: "",
      notice: "",
      noticeShow: "",
      noticeType: [],
      noticeShowType: [],
      fileName: "",
      fileList: [],
      dialogVisible: false,
      uploadData: {},
      activeName: "用户登录日志",
      indexactive: 0,
      userName1: "",
      UserName: "",
      userName2: "",
      contentlayout: "",
      tableData: [
        {
          id: "",
        },
      ],
      // noticeId: this.id,
      title: "",
      name: "",
      optionValue: "",
      options: [],
      orderList: [],
      items: "",
      loading: false,
      isEnable: "",
      pageSize: 15,
      currentPage: 1,
      totalCount: 10,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  created() {
    this.getList();
  },
  filters: {
    readTime(opt) {
      if (opt) {
        const date = new Date(opt);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.GetTodoBusinessCate();
    this.getList();
  },
  methods: {
    async GetTodoBusinessCate() {
      let res = await this.$http.get("/SysNotice/GetNoticePageDropDown");
      this.noticeType = res.data.noticeType;
      this.noticeShowType = res.data.noticeShowType;
      this.value = res.data.length > 0 ? res.data[0].value : "";
      this.getList();
    },
    async getList() {
      let obj = {
        id: this.id,
        KeyWords: this.KeyWords,
        NoticeType: this.notice,
        NoticeShowType: this.noticeShow,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
      };
      this.loading = true;
      let res = await this.$http.get("/SysNotice/GetSysNoticeTitleList", { params: obj });
      if (res.status == 200) {
        this.totalCount = res.data.result.totalCount;
        this.loading = false;
        this.tableData = res.data.result.items;
      }
    },
    // 上传
    getUploadUrl1() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/UploadSysNoticeAttach";
    },
    folder(id) {
      this.$router.push({
        path: "./noticeFile?id=",
        //  query: { id: noticeId }
        query: { id: id },
      });
    },
    beforeUpload1(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = [".doc", ".docx", ".pdf"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件格式有误");
        return false;
      }
      const isLt = file.size / 1024 / 1024 < 50;
      if (!isLt) {
        this.$message.error("上传文件大小不能超过" + 50 + "兆");
        return false;
      }
    },
    submitUpload(opt) {
      Object.assign(this.uploadData, {}, { NoticeId: this.id, FileName: this.fileName });
      this.$refs.upload1.submit();
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success) {
        this.$message.success(response.message);
        this.GetBidFileTempList();
        this.dialogVisible = false;
      } else {
        this.$message.error(response.message);
      }
      this.$refs.upload1.clearFiles();
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    //新增
    addgong() {
      this.$router.push({
        path: "/system/projectEdit",
      });
    },
    //编辑
    edit(row) {
      this.$router.push({
        path: "./projectEdit",
        query: { row: row },
      });
    },
    del1(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SysNotice/DeleteSysNoticeById", { id: opt.id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.getList();
        });
      });
    },
    handleChange1(val) {
      this.getList();
    },
    handleChange2(val) {
      this.getList();
    },
    handleChange() {
      this.getList();
    },
    async search() {
      this.getList();
    },
    pageChange1(page) {
      this.pageSize = page._pageSize;
      this.currentPage = page._currentPage;
      this.getList();
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
