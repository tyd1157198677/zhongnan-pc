<template>
  <el-main>
    <div class="pub">招标计划信息</div>
    <peo-user style="width: 100%" />
    <div class="pub">基本信息</div>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right">竞争性判断原因：</td>
          <td>{{ form1.reason }}</td>
          <td class="right">计划定标日期：</td>
          <td>{{ form1.bidEndDate }}</td>
        </tr>
        <tr>
          <td class="right">计划定标日期：</td>
          <td colspan="3">{{ form1.desc }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pub">选择供方</div>
    <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column label="供应商名称" prop="comFullName" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.comFullName }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="所属专业" prop="depName" align="center"> </el-table-column>
      <el-table-column label="注册资金" prop="depName" align="center"> </el-table-column>
      <el-table-column label="合作状态" prop="depName" align="center"> </el-table-column>
      <el-table-column label="合作等级" prop="depName" align="center"> </el-table-column> -->
      <el-table-column label="供方联系人" width="150" align="center">
        <el-table-column label="姓名" width="150" align="center" prop="personName">
          <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.personName"></el-input>
          </template> -->
        </el-table-column>
        <el-table-column label="手机" width="150" align="center" prop="mobilePhone">
          <!-- <template slot-scope="scope">
            <el-input maxlength="11" minlength="11" v-model="scope.row.mobilePhone" placeholder="请输入正确的手机号"></el-input>
          </template> -->
        </el-table-column>
        <el-table-column label="职务" width="150" align="center" prop="workAs">
          <!-- <template slot-scope="scope">
            <el-input placeholder="请输入职务" v-model="scope.row.workAs"></el-input>
          </template> -->
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="pub">采购小组成员</div>
    <!-- <el-button type="primary" v-if="showedit" style="margin-left:10px;margin-bottom:10px;float:right" size="small" @click="onadd('C')"
      >添加商务评委</el-button
    >
    <el-button type="primary" v-if="showedit" style="margin-left:10px;margin-bottom:10px;float:right" size="small" @click="onadd('B')"
      >添加技术评委</el-button
    >
    <el-button type="primary" v-if="showedit" style="margin-left:10px;margin-bottom:10px;float:right" size="small" @click="onAdd('A')"
      >添加招标组长</el-button
    > -->
    <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="zuzhangdata">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column label="姓名" prop="userName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="bidRole" align="center"> </el-table-column>
      <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
      <!-- <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete" title="删除" @click="onDelete(scope.row)"></i>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="pub">相关附件</div>
    <div>
      <el-row>
        <div class="sts">
          <!-- <div style="color:red">必须上传施工方案模板</div> -->
          <div>
            <!-- <el-upload
              style="display:inline-block;float:right"
              action="#"
              multipl
              :show-file-list="false"
              :headers="header"
              :http-request="headeuploadFile"
              :file-list="UploadfileList"
            >
              <el-button
                size="small"
                style="margin-bottom:10px;float:right"
                :loading="loadingfile"
                type="primary"
                title="请上传.rar|.zip格式文件   文件最大100M"
                >上传施工方案模板</el-button
              >
            </el-upload> -->
            <!-- <el-button
              v-if="showedit"
              style="margin-bottom:10px;float:right;margin-right:10px"
              :loading="loadingfile"
              type="primary"
              size="small"
              @click="onUploadPreview"
              >上传附件</el-button
            > -->
          </div>
        </div>
        <el-table
          empty-text="无符合条件的记录"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="files"
          style="margin-bottom:50px"
        >
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
          <!-- <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <i class="el-icon-delete" v-if="showedit" title="删除" @click="onDeletefile(scope.row)"></i>
              <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
            </template>
          </el-table-column> -->
        </el-table>
      </el-row>
    </div>
    <!-- <div class="pub">提交信息</div>
    <div class="alert alert-primary" role="alert" style="margin-top:10px;">
      <p class="h7"><i class="el-icon-star-on"></i>满足如下条件才能提交审批：</p>
      <p class="h7">1、保存方案基本信息</p>
      <p class="h7">2、添加邀请供方</p>
      <p class="h7">3、添加招标小组成员（最多1个招标组长、至少1个技术评委、至少1个商务评委）</p>
      <p class="h7">4、上传相关附件</p>
    </div>
    <div class="card mt-3" v-show="checkResult.length > 0">
      <div class="card-header">不符合提交条件，原因：</div>
      <div class="card-body">
        <div>{{ checkResult }}</div>
      </div>
    </div>
    <div style="margin-top:10px;margin-bottom:85px" v-if="showedit">
      <div class="float-right">
        <el-button type="primary" v-if="showsub" v-loading="subloading" @click="onSubmitto" size="small">提交</el-button>
      </div>
    </div> -->
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
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
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
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
    <chose-user2 ref="choseUser2" @itemClick="onUserAdd" />
  </el-main>
</template>

<script>
/**
 * 招标采购-详情
 */
// import bus from "@/util/bus";
// import step1 from "./components/step1";
// import step2 from "./components/step2";
// import step3 from "./components/step3";
// import step4 from "./components/step4";
// import step5 from "./components/step5";
import SupplierList from "@/components/SupplierList";
import { parseTime } from "@/util";
import choseUser from "@/components/choseUser";
import choseUser2 from "@/components/choseUser2";
export default {
  name: "detail",
  components: { choseUser, choseUser2, SupplierList, peoUser: () => import("@/components/peoUser.vue") },
  inject: ["reload"],
  data() {
    return {
      showedit: false,
      tableData: [
        {
          mobilePhone: "",
        },
      ],
      showsub: false,
      reasons: [],
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
    id() {
      return this.$route.query.id;
    },
    bidModeId() {
      return this.$route.query.bidModeId;
    },
  },
  mounted() {
    this.GetOnePlanById();
    this.CheckPurchaseModeLxEdit3001();
    this.GetLxReasonDropDownList3001();
    this.getzuzhangList();
    this.GetPurchaseLxSupplierList3001();
    this.getList();
    this.CheckCanSubmit3001();
    // this.tabs = [
    //   { label: "基本信息", name: "step1", component: step1 },
    //   { label: "计划节点", name: "step2", component: step2 },
    //   { label: "供应商信息", name: "step3", component: step3 },
    //   { label: "采购小组成员", name: "step4", component: step4 },
    //   { label: "相关文件", name: "step5", component: step5 },
    // ];
    // this.activeNames = this.tabs.map((e, i) => i);
  },
  created: function() {
    //this.$emit('header', true);
    //this.$emit('footer', true);
    // bus.$emit("hideNav");
  },
  methods: {
    parseTime,
    CheckPurchaseModeLxEdit3001() {
      this.$http.get("/PurchaseModeLx/CheckPurchaseModeLxEdit3001", { params: { bidModeId: this.bidModeId } }).then(res => {
        if (res.data.success) {
          this.showedit = true;
        } else {
          this.showedit = false;
        }
      });
    },
    GetOnePlanById() {
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.id } }).then(res => {
        this.form = res.data;
      });
    },
    add() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.id }).then(res => {
        this.selectSupVisible = true;
        // }
      });
    },
    CheckCanSubmit3001() {
      this.$http.get("/PurchaseModeLx/CheckCanSubmit3001", { params: { bidModeId: this.bidModeId } }).then(res => {
        if (res.data.success) {
          this.showsub = true;
        } else {
          this.showsub = false;
        }
      });
    },
    savePerson() {
      for (var i = 0; i < this.tableData.length; i++) {
        if (!/^1[3-9]\d{9}$/.test(this.tableData[i].mobilePhone)) {
          this.$message.error("请输入正确的手机号码");
          return false;
        }
      }
      let arr = this.tableData.map(v => {
        return {
          bidModeId: this.bidModeId,
          supplierId: v.supplierId,
          personName: v.personName,
          mobilePhone: v.mobilePhone,
          workAs: v.workAs,
        };
      });
      this.$http.post("/PurchaseModeLx/SaveSupplierPersonLx3001", arr).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetPurchaseLxSupplierList3001();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    onDelete(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoPlan/DeleteUser03", { id: opt.id }).then(res => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.getzuzhangList();
        });
      });
    },
    onDeletefile(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/BidAttach/DeleteBidAttachById", { id: opt.id }).then(res => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.getList();
        });
      });
    },
    onDeleteData(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .post("/PurchaseModeLx/PurchaseLxDeleteSupplier3001", { supplierId: opt.supplierId, bidModeId: this.bidModeId })
          .then(res => {
            res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
            this.GetPurchaseLxSupplierList3001();
          });
      });
    },
    GetPurchaseLxSupplierList3001() {
      this.$http.get("/PurchaseModeLx/GetPurchaseLxSupplierList3001", { params: { bidModeId: this.bidModeId } }).then(res => {
        this.tableData = res.data;
      });
    },
    getzuzhangList() {
      this.$http.get("/LiandoPlan/GetAllBidUserList1001", { params: { planId: this.id } }).then(res => {
        this.zuzhangdata = res.data;
      });
    },
    onAdd(showtype) {
      this.type = 1;
      this.$refs.choseUser.openfnc();
      this.showtype = showtype;
    },
    onadd(showtype) {
      this.$refs.choseUser2.openfnc();
      this.showtype = showtype;
    },
    onUserAdd(id) {
      if (this.showtype == "A") {
        const obj = {
          planId: this.id,
          userGuid: id.userGuid,
          sectionId: this.sectionId,
        };
        this.$http.post("/LiandoPlan/SaveBidLeader03", obj).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.getzuzhangList();
          }
        });
      }
      if (this.showtype == "B") {
        const obj = {
          planId: this.id,
          userGuidList: id.map(v => v.userGuid),
          sectionId: this.sectionId,
        };
        this.$http.post("/LiandoPlan/SaveTechUserList03", obj).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.getzuzhangList();
          }
        });
      }
      if (this.showtype == "C") {
        const obj = {
          planId: this.id,
          userGuidList: id.map(v => v.userGuid),
          sectionId: this.sectionId,
        };
        this.$http.post("/LiandoPlan/SaveBusinessUserList03", obj).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.getzuzhangList();
          }
        });
      }
    },
    onSelectSups(sup) {
      console.log(111);
      this.$http.post("/PurchaseModeLx/PurchaseLxSaveSupplier3001", { bidModeId: this.bidModeId, supplierId: sup.id }).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetPurchaseLxSupplierList3001();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    submitUpload() {
      Object.assign(this.uploadData, { planId: this.id, FileName: this.uploadData.FileName });
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
      from.append("planId", this.id);
      this.loadingfile = true;
      this.$axios
        .post("/api/FileUpload/BidProcessAttach4", from)
        .then(res => {
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
        .catch(err => {
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
        this.getList();
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
    getList() {
      this.$http.get("/LiandoPlan/GetPlanAttachList05", { params: { planId: this.id } }).then(res => {
        this.files = res.data;
      });
    },
    GetLxReasonDropDownList3001() {
      this.$http.get("/PurchaseModeLx/GetLxReasonDropDownList3001").then(res => {
        this.reasons = res.data;
        this.form1.reason = res.data.length > 0 ? res.data[0].value : "";
        this.GetPurchaseModeLx3001();
      });
    },
    GetPurchaseModeLx3001() {
      this.$http.get("/PurchaseModeLx/GetPurchaseModeLx3001", { params: { bidModeId: this.bidModeId } }).then(res => {
        this.form1 = res.data;
        this.sectionId = res.data.sectionId;
      });
    },
    onSubmit() {
      this.$refs.form1.validate(valid => {
        if (valid) {
          this.form1.bidModeId = this.bidModeId;
          this.$http.post("/PurchaseModeLx/SavePurchaseBaseLx3001", this.form1).then(res => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.GetPurchaseModeLx3001();
            } else {
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              });
            }
          });
        } else {
          this.$msg.warning("请填写完必填项!");
        }
      });
    },
    onSubmitto() {
      this.$confirm("确定要提交招标方案吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.subloading = true;
        this.$http.post("/PurchaseModeLx/SubmitBidMode3001", { id: this.bidModeId }).then(res => {
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
            // this.masterId = res.data.returnValue1;
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
