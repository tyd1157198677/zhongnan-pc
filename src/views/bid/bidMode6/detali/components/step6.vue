<template>
  <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="files">
    <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
    <el-table-column label="附件名称" prop="fileName"> </el-table-column>
    <el-table-column label="附件大小" prop="showFileSize" align="center" width="120"> </el-table-column>
    <el-table-column label="附件类型" prop="fileExtName" align="center" width="120"> </el-table-column>
    <!-- <el-table-column label="上传人" prop="bidProcessName"> </el-table-column> -->
    <el-table-column label="上传日期" prop="uploadDate" align="center" width="150">
      <template slot-scope="scope">
        <span>{{ parseTime(scope.row.uploadDate, "yyyy-MM-dd") }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100" align="center">
      <!-- <template slot-scope="scope">
                <el-link style="margin-left:10px;" type="success" :href="getFileUrl(scope.row)">下载</el-link>
              </template> -->
      <template slot-scope="scope">
        <i class="el-icon-download" @click="downLoad(scope.row.id)"></i>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { parseTime } from "@/util";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      files: [],
      persons: [],
      rols: [],
      bidPersonExam: [],
    };
  },
  computed: {
    planId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.id;
      }
    },
  },
  created() {
    // this.planId = sessionStorage.getItem("bidModeId");
  },
  // created() {
  //   if (this.id) {
  //     this.getPersons(this.id);
  //   }
  // },
  mounted() {
    this.getPersons();
  },
  methods: {
    parseTime,
    // getbidModeId() {
    //   this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then(res => {
    //     console.log(this.bidModeId);
    //     this.planId = res.data.planId;
    //     console.log(this.planId);
    //     this.getPersons();
    //   });
    // },
    getFileUrl(file) {
      return `${process.env.VUE_APP_API_URL}/${file.filePath}${file.fileReName}`;
    },
    downLoad(id) {
      // window.location.href = process.env.VUE_APP_API_URL + url;
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad006?fileId=" + id);
    },
    getPersons() {
      this.$http.get("/LiandoPlan/GetPlanAttachList05", { params: { planId: this.planId } }).then(res => {
        this.files = res.data;
      });
    },
  },
};
</script>

<style></style>
