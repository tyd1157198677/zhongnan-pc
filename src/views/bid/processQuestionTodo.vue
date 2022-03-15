<!--  -->
<template>
  <el-main>
    <el-card style="margin-bottom:60px">
      <div>
        <span
          ><strong>{{ showmessage }}</strong></span
        >
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
        <!-- <i class="el-icon-s-home" style="float:right;margin-left:10px;" title="点击进入首页" @click="gohome"></i> -->
      </div>
      <div>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right">项目名称：</td>
              <td>
                {{ form.projectName }}
              </td>
              <td class="right">期区：</td>
              <td>
                {{ form.subProjectName }}
              </td>
            </tr>
            <tr>
              <td class="right">招标计划名称(计划系统)：</td>
              <td>
                {{ form.otherPlanName }}
              </td>
              <td class="right">计划完成日期(计划系统)：</td>
              <td>
                {{ parseTime(form.bidEndDate, "yyyy-MM-dd") }}
              </td>
            </tr>
            <tr>
              <td class="right">招标计划名称：</td>
              <td>
                {{ form.planName }}
              </td>
              <td class="right">招标层级：</td>
              <td>
                {{ form.bidLevel }}
              </td>
            </tr>
            <tr>
              <td class="right">招标经办人：</td>
              <td>
                {{ form.bidUserName }}
              </td>
              <td class="right">入围经办人：</td>
              <td>
                {{ form.supplierUserName }}
              </td>
            </tr>
            <tr>
              <td class="right">总裁三室经办人：</td>
              <td>
                <span style="margin-right:10px">{{ form.presidentUserName }}</span
                ><span style="margin-right:10px">{{ form.presidentAltUserName }}</span
                ><span style="margin-right:10px">{{ form.presidentOtherUserName }}</span>
              </td>
              <td class="right">审计经办人：</td>
              <td>
                <span style="margin-right:10px">{{ form.auditUserName }}</span
                ><span style="margin-right:10px">{{ form.auditAlternativesUserName }}</span>
              </td>
            </tr>
            <tr>
              <td class="right">项目需求日期：</td>
              <td>
                {{ parseTime(form.confirmDate, "yyyy-MM-dd") }}
              </td>
              <td class="right">建筑面积：</td>
              <td>{{ form.jzSquire }}㎡</td>
            </tr>
            <tr>
              <td class="right">项目需求原因：</td>
              <td>{{ form.requireDesc }}</td>
              <td class="right">招标计划编号：</td>
              <td>{{ form.planCode }}</td>
            </tr>
            <tr>
              <td class="right">招标专业：</td>
              <td>
                {{ form.bidCateName }}
              </td>
              <td class="right">招标方式：</td>
              <td>{{ form.purchaseType }}</td>
            </tr>
            <tr>
              <td class="right">说明：</td>
              <td colspan="3">
                {{ form.desc }}
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top:20px">
          <div v-for="(item, index) in dataList" :key="index">
            <div class="flex1">
              <strong>
                {{ index + 1 }}. <span>标题：{{ item.content }}</span>
                <span style="margin:0 20px">文件类型：{{ item.questionFile.fileName }}</span>
                <span>提问时间：{{ timeFormatSeconds(item.questionFile.creationTime) }}</span>
              </strong>
              <div>
                <el-button type="primary" size="mini" @click="downLoadDaYiFile(item.questionFile.fileUrl)">下载疑问文件</el-button>
                <el-button type="primary" size="mini" @click="upLoadDaYiFile">上传答疑文件</el-button>
              </div>
            </div>
            <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="item.answerFile"
              v-loading="loading"
            >
              <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
              <el-table-column prop="fileName" min-width="150" label="文件名称" align="center"> </el-table-column>
              <el-table-column prop="userName" width="150" label="上传人" align="center"> </el-table-column>
              <el-table-column label="上传时间" align="center">
                <template slot-scope="scope">
                  <span scope.row>
                    {{ timeFormatSeconds(scope.row.creationTime) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-download" style="margin-right:10px" @click="onDonwLoad(scope.row.fileUrl)"></i>
                  <i class="el-icon-delete" @click="delete1(scope.row.id)"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" size="mini" @click="submit">提 交</el-button>
        </div>
        <el-dialog width="40%" title="上传文件" :visible.sync="dialogVisible">
          <el-form class="mt-0" size="small" style="padding: 20px" element-loading-text="上传中请稍等···" v-loading="loading">
            <el-form-item label="选择文件">
              <el-upload
                class="upload-demo"
                ref="upload"
                :data="uploadData"
                :on-change="handleChange"
                :fileList="fileList"
                :action="getUploadUrl()"
                :on-success="onUploadSuccess4"
                :multiple="false"
                :auto-upload="false"
                :headers="header"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload2">上传</el-button>
                <div slot="tip" class="el-upload__tip">允许文件类型：.xls,.xlsx 最大：20 兆</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-card>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {},
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      dialogVisible: false,
      loading: false,
      form: {},
      showmessage: "",
      uploadData: {},
      fileList: [],
      dataList: [],
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  computed: {
    baseId() {
      return this.$route.query.bidModeId;
    },
    qsId() {
      return this.$route.query.qsId;
    },
    navBarName() {
      const barName = "";
      return barName;
    },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
  },
  watch: {},
  created() {
    this.todoId = this.$route.query.todoId;
  },
  mounted() {
    this.GetBidMasterByModeId();
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
  },
  methods: {
    parseTime,
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/services/app/LiandoBidMaster/AnswerQuestionFile";
    },
    gohome() {
      this.$router.push({
        path: "/index",
      });
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then(res => {
        this.showmessage = res.data;
      });
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    //上传答疑文件
    upLoadDaYiFile() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.upload.clearFiles();
      });
    },
    // 评标模板导入成功
    onUploadSuccess4(response, file, fileList) {
      if (response.success) {
        this.$message.success(response.message);
        this.GetQustionList();
        this.loading = false;
        this.dialogVisible = false;
      } else {
        this.loading = false;
        this.$message.error(response.message);
      }
    },
    // 评标模板的导入
    submitUpload2() {
      this.loading = true;
      Object.assign(this.uploadData, { BidModeId: this.baseId, qsId: this.qsId });
      this.$refs.upload.submit();
    },
    timeFormatSeconds(time) {
      var d = time ? new Date(time) : new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var hours = d.getHours();
      var min = d.getMinutes();
      var seconds = d.getSeconds();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      if (hours < 0) hours = "0" + hours;
      if (min < 10) min = "0" + min;
      if (seconds < 10) seconds = "0" + seconds;

      return year + "-" + month + "-" + day + " " + hours + ":" + min + ":" + seconds;
    },
    GetQustionList() {
      this.$http.get("/LiandoBidMaster/GetQustionList", { params: { bidModeId: this.baseId, qsId: this.qsId } }).then(res => {
        this.dataList = res.data;
      });
    },
    /**
     * 查询当前方案基本信息/LiandoPlan/GetOnePlanInfoById01
     */
    getBaseInfo(baseId) {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: baseId } }).then(res => {
        this.form = res.data;
      });
    },
    onDonwLoad(file) {
      window.open(`${process.env.VUE_APP_API_URL}/${file}`, "_blank");
    },
    downLoadDaYiFile(file) {
      window.open(`${process.env.VUE_APP_API_URL}/${file}`, "_blank");
    },
    delete1(fileId) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("/LiandoBidMaster/DelAnswerFile", { qsId: this.qsId, fileId }).then(res => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.GetQustionList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .finally(() => {});
    },
    GetBidMasterByModeId() {
      this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.baseId } }).then(res => {
        this.getBaseInfo(res.data.planId);
        this.GetQustionList();
      });
    },

    //提交
    submit() {
      this.$http.post("/LiandoBidMaster/SubmitAnswerFile", { id: this.qsId }).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetQustionList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.btns {
  text-align: right;
  margin: 10px 0;
}
.flex1 {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.el-icon-s-home {
  color: #409eff;
}
::v-deep .clearfix::after {
  content: none;
}
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 20px;
  float: right;
  cursor: pointer;
}
</style>
