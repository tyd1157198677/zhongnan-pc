<template>
  <div>
    <el-row>
      <div class="pub">招标计划信息</div>
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td class="right">项目名称：</td>
            <td colspan="3">{{ form.planName }}</td>
            <td class="right">招标计划名称：</td>
            <td colspan="3">{{ form.projectName }}</td>
          </tr>
          <tr>
            <td class="right">招标层级：</td>
            <td>
              {{ form.bidLevel }}
            </td>
            <td class="right">招标方式：</td>
            <td>
              {{ form.purchaseType }}
            </td>
            <td class="right">计划定标日期：</td>
            <td>
              {{ parseTime(form.bidEndDate, "yyyy-MM-dd") }}
            </td>
            <td class="right">招标专业：</td>
            <td>
              {{ form.bidCateName }}
            </td>
          </tr>
          <tr>
            <td class="right">需求部门：</td>
            <td>
              {{ form.depName }}
            </td>
            <td class="right">合约规划金额：</td>
            <td>
              {{ form.planMoney }}
            </td>
            <td class="right">建筑面积：</td>
            <td>
              {{ form.jzSquire }}
            </td>
            <td class="right">经办人：</td>
            <td>
              {{ form.bidUserName }}
            </td>
          </tr>
          <tr>
            <td class="right">经办日期：</td>
            <td>
              {{ parseTime(form.creationTime, "yyyy-MM-dd") }}
            </td>
            <td class="right">招标进度：</td>
            <td>
              {{ form.planStatus }}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="right">备注：</td>
            <td colspan="7">
              {{ form.requireDesc }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pub">基本信息</div>
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td class="right">直接委托原因：</td>
            <td>
              {{ form1.reason }}
            </td>
            <td class="right">委托供方：</td>
            <td>
              {{ form1.supplierName }}
            </td>
          </tr>
          <tr>
            <td class="right">供方联系人姓名：</td>
            <td>
              {{ form1.personName }}
            </td>
            <td class="right">供方联系人手机号：</td>
            <td>
              {{ form1.mobilePhone }}
            </td>
          </tr>
          <tr>
            <td class="right">供方联系人职务：</td>
            <td colspan="3">
              {{ form1.workAs }}
            </td>
          </tr>
          <tr>
            <td class="right">备注：</td>
            <td colspan="3">{{ form1.desc }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pub">采购小组成员</div>
      <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="zuzhangdata">
        <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
        <el-table-column label="姓名" prop="userName" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="bidRole" align="center"> </el-table-column>
        <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
      </el-table>
      <!-- <div class="pub">相关附件</div>
      <div>
        <el-row>
          <div class="sts">
            <div></div>
          </div>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="files">
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="附件名称" prop="fileName"> </el-table-column>
            <el-table-column label="附件大小" prop="showFileSize" align="center" width="120"> </el-table-column>
            <el-table-column label="附件类型" prop="fileExtName" align="center" width="120"> </el-table-column>
            <el-table-column label="上传日期" prop="uploadDate" align="center" width="150"> </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <i class="el-icon-delete" v-if="showedit" title="删除" @click="onDeletefile(scope.row)"></i>
                <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div> -->
    </el-row>
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
  </div>
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
// import step6 from "./components/step6";
// import step8 from "./components/step8";
import { parseTime } from "@/util";
import choseUser from "@/components/choseUser";
import choseUser2 from "@/components/choseUser2";
import SupplierList from "@/components/SupplierList";
export default {
  name: "detail",
  components: { choseUser, choseUser2, SupplierList, peoUser: () => import("@/components/peoUser.vue") },
  inject: ["reload"],
  props: ["id"],
  data() {
    return {
      rules: {
        showedit: false,
        bidEndDate: [{ required: true, message: "日期不能为空", trigger: "blur" }],
        reason: [{ required: true, message: "直接委托原因不能为空", trigger: "blur" }],
        personName: [{ required: true, message: "供方联系人姓名不能为空", trigger: "blur" }],
        mobilePhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        workAs: [{ required: true, message: "供方联系人职务不能为空", trigger: "blur" }],
        supplierName: [{ required: true, message: "委托供方不能为空", trigger: "change" }],
      },
      selectSupVisible: false,
      dialogVisible: false,
      subloading: false,
      checkResult: "",
      form: {},
      showsub: false,
      form1: {
        supplierName: "",
        bidModeId: "",
        supplierId: "",
        desc: "",
        reason: "",
        bidEndDate: "",
        personName: "",
        mobilePhone: "",
        workAs: "",
      },
      reasons: [],
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
    // id() {
    //   return this.$route.query.id;
    // },
    bidModeId() {
      return this.$route.query.bidModeId;
    },
  },
  mounted() {
    this.GetZwReasonDropDownList2001();
    // this.CheckPurchaseModeZwEdit2001();
    this.GetOnePlanById();

    this.CheckCanSubmit2001();
    this.getList();
    this.getzuzhangList();
    // this.tabs = [
    //   { label: "基本信息", name: "step1", component: step1 },
    //   { label: "计划节点", name: "step2", component: step2 },
    //   { label: "标段信息", name: "step3", component: step3 },
    //   { label: "入围标准", name: "step4", component: step4 },
    //   { label: "采购小组成员", name: "step6", component: step6 },
    //   { label: "相关文件", name: "step8", component: step8 },
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
    GetOnePlanById() {
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.planId } }).then(res => {
        this.form = res.data;
      });
    },
    CheckPurchaseModeZwEdit2001() {
      this.$http.get("/PurchaseModeZw/CheckPurchaseModeZwEdit2001", { params: { bidModeId: this.bidModeId } }).then(res => {
        if (res.data.success) {
          this.showedit = true;
        } else {
          this.showedit = false;
        }
      });
    },
    GetZwReasonDropDownList2001() {
      this.$http.get("/PurchaseModeZw/GetZwReasonDropDownList2001").then(res => {
        this.reasons = res.data;
        this.form1.reason = res.data.length > 0 ? res.data[0].value : "";
        this.GetPurchaseModeZw2001();
      });
    },
    GetPurchaseModeZw2001() {
      this.$http.get("/PurchaseModeZw/GetPurchaseModeZw2001", { params: { bidModeId: this.id } }).then(res => {
        this.form1 = res.data;
        this.planId = res.data.planId;
        this.GetOnePlanById();
        this.getList();
        this.getzuzhangList();
      });
    },
    onSelectSups(sup) {
      this.form1.supplierId = sup.id;
      this.form1.supplierName = sup.comFullName;
      this.selectSupVisible = false;
      // var forms = { planId: this.planId, bidSignUpType: this.activeName, sectionId: this.biaoDuan, supplierId: sup.id };
      // this.$api.supIn.SaveSupplier02(forms).then(res => {
      //   if (res.success) {
      //     this.$message.success(res.message);
      //     this.GetSupplierInviteList02();
      //   } else {
      //     this.$message.error(res.message);
      //   }
      // });
    },
    onSubmit() {
      this.$refs.form1.validate(valid => {
        if (valid) {
          this.form1.bidModeId = this.bidModeId;
          this.$http.post("/PurchaseModeZw/SavePurchaseBaseZw2001", this.form1).then(res => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.GetPurchaseModeZw2001();
              this.CheckCanSubmit2001();
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
            this.CheckCanSubmit2001();
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
            this.CheckCanSubmit2001();
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
            this.CheckCanSubmit2001();
          }
        });
      }
    },
    submitUpload() {
      Object.assign(this.uploadData, { planId: this.id, FileName: this.uploadData.FileName });
      console.log(this.id);
      this.loadingfile = true;
      this.$refs.upload.submit();
    },
    onUploadPreview() {
      this.dialogVisible = true;
      this.uploadData.FileName = "";
      this.fileList = [];
      this.$refs.upload.clearFiles();
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
            this.CheckCanSubmit2001();
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
        this.CheckCanSubmit2001();
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
      this.$http.get("/LiandoPlan/GetPlanAttachList05", { params: { planId: this.planId } }).then(res => {
        this.files = res.data;
      });
    },
    getzuzhangList() {
      this.$http.get("/LiandoPlan/GetAllBidUserList1001", { params: { planId: this.planId } }).then(res => {
        this.zuzhangdata = res.data;
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
    CheckCanSubmit2001() {
      this.$http.get("/PurchaseModeZw/CheckCanSubmit2001", { params: { bidModeId: this.bidModeId } }).then(res => {
        if (res.data.success) {
          this.showsub = true;
        } else {
          this.showsub = false;
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
        this.$http.post("/PurchaseModeZw/SubmitBidMode2001", { id: this.bidModeId }).then(res => {
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
::v-deep.el-collapse-item__header {
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
