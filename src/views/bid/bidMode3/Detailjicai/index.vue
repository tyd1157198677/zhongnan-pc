<template>
  <el-main>
    <div class="pub">招标计划信息</div>
    <peo-user style="width: 100%" />
    <div class="pub">选择供方</div>
    <el-button type="primary" style="float: right; margin-bottom: 10px" size="small" @click="add">添加</el-button>
    <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="zuzhangdata">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column label="供应商名称" prop="userName" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属专业" prop="depName" align="center"> </el-table-column>
      <el-table-column label="注册资金" prop="depName" align="center"> </el-table-column>
      <el-table-column label="合作状态" prop="depName" align="center"> </el-table-column>
      <el-table-column label="合作等级" prop="depName" align="center"> </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete" title="删除" @click="onDelete(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <div class="pub">相关附件</div>
    <div>
      <el-row>
        <div class="sts">
          <!-- <div style="color:red">必须上传施工方案模板</div> -->
          <div>
            <!-- <el-upload
                style="display:inline-block"
                action="#"
                multipl
                :show-file-list="false"
                :headers="header"
                :http-request="headeuploadFile"
                :file-list="UploadfileList"
              >
                <el-button size="small" :loading="loadingfile" type="primary" title="请上传.rar|.zip格式文件   文件最大100M"
                  >上传施工方案模板</el-button
                >
              </el-upload> -->
            <el-button style="margin-bottom: 10px; float: right" :loading="loadingfile" type="primary" size="small" @click="onUploadPreview"
              >上传附件</el-button
            >
          </div>
        </div>
        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="files">
          <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
          <el-table-column label="附件名称" prop="fileName"> </el-table-column>
          <el-table-column label="附件大小" prop="showFileSize" align="center" width="120"> </el-table-column>
          <el-table-column label="附件类型" prop="fileExtName" align="center" width="120"> </el-table-column>
          <!-- <el-table-column label="上传人" prop="bidProcessName"> </el-table-column> -->
          <el-table-column label="上传日期" prop="uploadDate" align="center" width="150">
            <!-- <template slot-scope="scope">
                  <span>
                  {{scope.row.creationTime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}
                  </span>
                  </template>  -->
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <i class="el-icon-delete" v-if="showsubmit" title="删除" @click="onDelete(scope.row)"></i>
              <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <div class="pub">提交信息</div>
    <div class="alert alert-primary" role="alert" style="margin-top: 10px">
      <p class="h7"><i class="el-icon-star-on"></i>提交招标计划必要条件：</p>
      <p class="h7">1、保存方案基本信息</p>
      <p class="h7">2、添加采购小组成员</p>
      <p class="h7">3、必须邀请供方</p>
    </div>
    <div class="card mt-3" v-show="checkResult.length > 0">
      <div class="card-header">不符合提交条件，原因：</div>
      <div class="card-body">
        <div>{{ checkResult }}</div>
      </div>
    </div>
    <div style="margin-top: 10px; margin-bottom: 50px">
      <div class="float-right" style="margin-bottom: 50px">
        <el-button type="primary" v-loading="subloading" @click="onSubmitto" size="small">提交</el-button>
      </div>
    </div>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loadingfile">
        <el-form-item label="文件名称">
          <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="true"
            :data="uploadData"
            :filelist="fileList"
            :action="getUploadUrl()"
            :on-change="beforeUpload"
            :on-success="onUploadSuccess"
            :auto-upload="false"
            :headers="header"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传</el-button>
            <div slot="tip" class="el-upload__tip">文件格式：.doc|.docx|.xls|.xlsx|.ppt|.pptx|.pdf|.rar|.zip | 最大：50 兆</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="60%">
      <div>
        <!--<font style="color: red;margin-left: 60px;">*</font>请选择标段-->
        <!--<el-select placeholder="请选择标段" v-model="biaoDuan2" style="margin-left: 60px;">-->
        <!--<el-option  v-for="item in dropDown" :key="item.value" :label="item.text" :value="item.value"></el-option>-->
        <!--</el-select>-->
        <supplier-list @itemClick="onSelectSups" />
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
/**
 * 招标采购-详情
 */
import SupplierList from "@/components/SupplierList";
import { parseTime } from "@/util";

export default {
  name: "detail",
  components: { SupplierList, peoUser: () => import("@/components/peoUser.vue") },
  inject: ["reload"],
  data() {
    return {
      tabs: [],
      activeNames: [],
      rules: {},
      selectSupVisible: false,
      dialogVisible: false,
      subloading: false,
      checkResult: "",
      form: {},
      form1: {},
      tabs: [],
      fileList: [],
      files: [],
      zuzhangdata: [],
      activeNames: [],
      loading: false,
      uploadData: {
        id: "",
        planId: "",
        FileName: "",
      },
      UploadfileList: [],
      loadingfile: false,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  computed: {
    baseId() {
      return this.$route.params.baseId;
    },
  },
  mounted() {
    this.GetOnePlanById();
  },
  created: function () {
    //this.$emit('header', true);
    //this.$emit('footer', true);
    // bus.$emit("hideNav");
  },
  methods: {
    parseTime,
    GetOnePlanById() {
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.baseId } }).then((res) => {
        this.form = res.data;
      });
    },
    add() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res) => {
        // if (res.planId == "00000000-0000-0000-0000-000000000000") {
        //   this.$message.error("请先完善入围相关信息");
        // } else {
        this.selectSupVisible = true;
        this.biaoDuan2 = "";
        // }
      });
    },
    onSelectSups(sup) {
      var forms = { planId: this.planId, bidSignUpType: this.activeName, sectionId: this.biaoDuan, supplierId: sup.id };
      this.$api.supIn.SaveSupplier02(forms).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    submitUpload() {
      Object.assign(this.uploadData, { planId: this.planId, FileName: this.uploadData.FileName });
      console.log(this.planId);
      this.loadingfile = true;
      this.$refs.upload.submit();
    },
    onUploadPreview() {
      this.dialogVisible = true;
      this.uploadData.FileName = "";
      this.fileList = [];
      // this.$refs.upload.clearFiles();
    },
    headeuploadFile(item) {
      let that = this;
      const fileObj = item.file;
      const from = new FormData(); // FormData 对象
      from.append("file", fileObj);
      from.append("planId", this.planId);
      this.loadingfile = true;
      this.$axios
        .post("/api/FileUpload/BidProcessAttach4", from)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            that.$message.success(res.data.message);
            this.loadingfile = false;
            this.getList();
          } else {
            // that.$msg.error(res.data.message);
            this.loadingfile = false;
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          // console.log(err);
          this.$alert(err.data.message, {
            confirmButtonText: "确定",
          });
        });
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidModeAttachUpload";
    },
    onDownload(id) {
      // window.open(`${process.env.VUE_APP_API_URL}/${file.filePath}${file.fileReName}`, "_blank");
      // console.log("down file,", file);
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad006?fileId=" + id);
    },
    beforeUpload(file) {
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData = {
        FileName: name.substring(0, index),
      };
      console.log(this.uploadData.FileName);
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success == true) {
        this.$message.success(response.message);
        this.getList(this.planId);
        this.dialogVisible = false;
        this.loadingfile = false;
      }
      if (response.success == false) {
        this.loadingfile = false;
        this.$alert(response.message, {
          confirmButtonText: "确定",
        });
      }
    },
    onSubmit() {},
    onSubmitto() {
      this.$confirm("确定要提交招标计划吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.subloading = true;
        this.$http.post("/LiandoPlan/SubmitBidPlan", { id: this.planId }).then((res) => {
          if (res.data.success == false) {
            console.log(res.data.success);
            this.checkResult = res.data.message;
            this.subloading = false;
            // this.$router.push({
            //   name: "../../bidPlanDemo",
            // });
            // this.$msg.success(res.data.message)
            // this.loginShow = true
          } else {
            this.masterId = res.data.returnValue1;
            this.$http.post("/LiandoPlan/StartEngineeringFile", { planId: this.planId, masterId: this.masterId }).then((res) => {});
            // this.$msg.success(res.data.message);
            this.subloading = false;
            if (res.data.message == "提交成功") {
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              }).then(() => {
                this.$router.push({
                  path: "/bid/bidPlanDemo",
                });
              });
            } else {
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
              this.subloading = false;
            }
            this.showmo = true;
            this.checkResult.length = 0;
          }
        });
      });
    },
  },
};
</script>

<style scoped>
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
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}

.el-collapse-item__header {
  border-left: 4px solid #409eff;
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: rgba(0, 0, 0, 0.03);
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
</style>
