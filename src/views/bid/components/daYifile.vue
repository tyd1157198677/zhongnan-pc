<!--  -->
<template>
  <div class="">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" v-for="(item, index) in dataList2" :key="index" style="margin-top:20px">
        <template slot="title">
          <span class="infonametits"
            >主体名称：{{ item.answerName
            }}<span v-if="item.auditStatus != null || item.auditStatus != ''">(审批状态：{{ item.auditStatus }})</span></span
          >
        </template>
        <el-table
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          v-loading="subloading"
          :data="item.answerMainFileList"
        >
          <el-table-column type="index" width="70" label="序号" align="center"> </el-table-column>
          <el-table-column label="文件名称" prop="fileName" align="left"> </el-table-column>
          <el-table-column label="文件大小" width="150" prop="showFileSize" align="center"> </el-table-column>
          <el-table-column label="文件类型" width="150" prop="fileExtName" align="center"> </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <i class="el-icon-download" title="下载" @click="downLoad(scope.row.fileId)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    publicUpload: () => import("@/components/publicUpload.vue"),
  },
  props: ["id"],
  data() {
    return {
      header: { Authorization: "Bearer " + this.$store.state.token },
      showholder: false,
      showhold: true,
      activeNames: ["1"],
      valuehold1: "",
      valuehold2: "",
      loading2: false,
      showmarkwaibu: false,
      ideaRemarkwaibu: "",
      showPassButtonwaibu: false,
      showRefuseButtonwaibu: false,
      loadingwaibu: false,
      auditButton: false,
      subloading: false,
      tableList: [],
      dataList: [],
      dataList1: [],
      rules: {
        answerName: [{ required: true, message: "答疑主体名称不能为空", trigger: "change" }],
        supplierIds: [{ required: true, message: "请勾选要答复的投标方", trigger: "change" }],
        file: [{ required: true, message: "文件不能为空", trigger: "change" }],
      },
      loading1: "",
      dataList2: [],
      dataList3: [],
      supplierNameList: "",
      file: [],
      newData: {
        supplierIds: [],
        answerName: "",
        file: [],
      },
      tableshenpi: [],
      tableif: false,
      status: "",
      type: 0,
      msg: "请勾选表格！",
      selectExplainId: "",
      tit: "",
      tableif3: false,
      bidOpenDate: "",
      warnTitle: "",
      supplierId: "",
      isShowBtn: false,
      loading: false,
      dialogVisible: false,
      dialogVisible1: false,
      uploadData: {},
      fileType: [".xls", ".xlsx", ".rar", ".zip", ".doc", ".docx"],
      condition: "允许文件类型：.xls, .xlsx .rar, .zip, .doc, .docx,  最大20 兆",
      obj: {},
      getUploadUrl1: "/api/services/app/LiandoBidSupQs/BidAnswerAttach",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.CheckUserProcessPageAuth();
  },

  methods: {
    parseTime,
    tomethgodayifile() {
      this.CheckUserProcessPageAuth();
    },
    CheckUserProcessPageAuth() {
      this.$http.get("/BidCheckCenter/CheckUserProcessPageAuth", { params: { baseId: this.id } }).then(res => {
        if (res.data.success) {
          if (!res.data.returnValue1) {
            this.GetAnswerMaster001();
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

    GetAnswerMaster001() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/BidSupplierQs/GetAnswerMainList1001", { params: obj }).then(res => {
        this.dataList2 = res.data;
        // this.answerName = res.data.answerName;
        // this.auditStatus = res.data.auditStatus;
      });
    },
    downLoad(fileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad009?fileId=" + fileId);
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
}
.bst {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  span {
    font-weight: 600;
    font-size: 15px;
  }
}
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}
</style>
