<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="2">
        <template slot="title">
          <div>招标小组成员<span style="color: red; margin-left: 10px">(至少添加两名评委)</span></div>
          <div class="pub">
            <!-- <el-button type="primary" size="small" @click.stop="onAdd('招标组长', 1)">添加招标组长</el-button> -->
            <el-button type="primary" size="small" @click.stop="onAdd('技术评委', 2)">添加评委</el-button>
            <!-- <el-button type="primary" size="small" @click.stop="onAdd('商务评委', 1)">添加商务评委</el-button> -->
          </div>
        </template>
        <el-table key="1" empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="reasons">
          <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
          <el-table-column label="角色名称" prop="bidRole"> </el-table-column>
          <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
          <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
          <!-- <el-table-column label="所属组织" prop="bidProcessName"> </el-table-column> -->
          <el-table-column label="所属组织" prop="depName" align="center"> </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <i class="el-icon-delete ml-2" title="删除" @click="onDownload(scope.row.id, 1)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <div>入围供方</div>
          <div class="pub">
            <!-- <el-button type="primary" size="small" @click.stop="flag3 = true">添加供方</el-button> -->
            <el-button type="primary" size="small" @click.stop="saveSup">保存信息</el-button>
          </div>
        </template>
        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="supplierList">
          <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
          <el-table-column label="供应商名称" prop="supplierName"> </el-table-column>
          <el-table-column label="主营专业" prop="supCateNames" align="center"> </el-table-column>
          <el-table-column label="注册资金" align="center">
            <template slot-scope="scope">
              {{ scope.row.regCapital + scope.row.regCapitalType }}
            </template>
          </el-table-column>
          <el-table-column label="报价总金额(含税)" prop="amount" align="center" width="130">
            <template slot-scope="scope">
              <el-input
                style="width: 100%"
                type="number"
                placeholder="报价总金额(含税)"
                v-model.trim="scope.row.amount"
                :min="1"
                :precision="2"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="报价总金额(不含税)" prop="amountNoTax" align="center" width="150">
            <template slot-scope="scope">
              <el-input
                style="width: 100%"
                type="number"
                placeholder="报价总金额(不含税)"
                v-model.trim="scope.row.amountNoTax"
                :min="1"
                :precision="2"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="商务联系人" align="center">
            <el-table-column label="姓名" align="center" width="130">
              <template slot-scope="scope">
                <el-input style="width: 100%" placeholder="姓名" v-model.trim="scope.row.personName"> </el-input>
              </template>
            </el-table-column>
            <el-table-column label="手机号" align="center" width="170">
              <template slot-scope="scope">
                <el-input
                  maxlength="11"
                  minlength="11"
                  @change="changes"
                  style="width: 100%"
                  placeholder="手机号"
                  v-model.trim="scope.row.mobilePhone"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="职务" align="center" width="130">
              <template slot-scope="scope">
                <el-input style="width: 100%" placeholder="职务" v-model.trim="scope.row.workAs"> </el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <i class="el-icon-delete ml-2" title="删除" @click="onDownload(scope.row.id, 2)"></i>
            </template>
          </el-table-column> -->
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <div>相关附件</div>
          <div class="pub">
            <el-button type="primary" size="small" @click.stop="dialogVisible = true">上传附件</el-button>
          </div>
        </template>
        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="fileslist">
          <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
          <el-table-column label="文件名称" align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.fileName + scope.row.fileExtName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件大小" prop="fileSize" align="center"> </el-table-column>
          <el-table-column label="上传日期" prop="creationTime" align="center">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上传人" prop="userName"> </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id, 4)"></i>
              <i
                v-if="scope.row.submitStatus != '审批完成'"
                class="el-icon-delete ml-2"
                title="删除"
                @click="onDownload(scope.row.id, 3)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="1">
        <template slot="title">
          <div>中标单位</div>
        </template>
        <div class="mt-2">
          <el-form label-position="top" ref="form1" :model="form1" :rules="rules">
            <el-row :gutter="12">
              <el-col :span="8">
                <el-form-item label="中标单位" prop="supplierId">
                  <el-select style="width: 100%" v-model.trim="form1.supplierId" @change="GetSupplierPrice1001" placeholder="选择中标单位">
                    <el-option v-for="item in supplierOption" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="含税中标金额（元）" prop="amount">
                  <el-input
                    style="width: 100%"
                    type="number"
                    placeholder="含税中标金额（元）"
                    v-model.trim="form1.amount"
                    :min="1"
                    :precision="2"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="不含税中标金额（元）" prop="amountNoTax">
                  <el-input
                    style="width: 100%"
                    type="number"
                    placeholder="不含税中标金额（元）"
                    v-model.trim="form1.amountNoTax"
                    :min="1"
                    :precision="2"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="相关说明">
                  <el-input style="width: 100%" type="textarea" v-model.trim="form1.desc"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: right; margin-top: 10px">
      <el-button type="primary" size="small" @click="onSubmitto(1)">保存定标信息</el-button>
      <el-button type="primary" size="small" :loading="subloading" @click="onSubmitto(2)">提交定标审批</el-button>
    </div>
    <rizhi :id="$route.query.id" :urlRizhi="urlRizhi"></rizhi>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible" style="z-index: 999999">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
        <el-form-item label="文件名称" required>
          <el-select style="width: 100%" v-model.trim="uploadData.TempType" @change="handlechange">
            <el-option v-for="item in tempList" :key="item.value" :label="item.fileName" :value="item.fileName"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="uploadData.TempType == '其他附件'">
          <el-input style="width: 100%" placeholder="请填写文件名称" v-model.trim="uploadData.FileName"> </el-input>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="false"
            :action="api + '/api/FileUpload/BidWinAttachUpload1'"
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传{{ texts }}，单文件最大200M</div>
          </el-upload>
          <el-button v-loading="loading" style="margin-left: 10px; float: right" size="small" type="success" @click="submitUpload"
            >上传</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="type" />
    <el-dialog :visible.sync="flag3" title="选择供方" width="70%">
      <gongFang @itemClick="onChangeGongFang" />
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/util";
import gongFang from "@/views/invest/components/storageList";
export default {
  components: { choseUser: () => import("@/components/choseUser"), gongFang, rizhi: () => import("@/components/rizhi.vue") },
  data() {
    return {
      type: 2,
      urlRizhi: "/WflowApproveLogsAppServices/EB_GetSimpleWinList",
      typ1: "招标组长",
      id: "",
      texts: "",
      data: {},
      rules: {
        supplierId: [{ required: true, message: "中标单位不能为空", trigger: "blur" }],
        amount: [{ required: true, message: "中标金额不能为空", trigger: "blur" }],
        amountNoTax: [{ required: true, message: "中标不含税金额不能为空", trigger: "blur" }],
      },
      selectSupVisible: false,
      dialogVisible: false,
      subloading: false,
      flag3: false,
      form: {},
      reasons: [],
      supplierOption: [],
      supplierList: [],
      activeNames: ["1", "2", "3", "4"],
      form1: {
        supplierId: "",
        amount: null,
        amountNoTax: null,
        desc: "",
      },
      fileList: [],
      fileslist: [],
      zuzhangdata: [],
      loading: false,
      tempList: [],
      uploadData: {
        FileName: "",
        TempType: "",
      },
      file: {},
      api: process.env.VUE_APP_API_URL,
      UploadfileList: [],
      loadingfile: false,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  created() {
    this.bidModeId = this.$route.query.id;
  },
  mounted() {
    this.GetWinFileTempList();
    this.GetBidModePersonList1001();
    this.GetBidModeSupplierList1001();
    this.GetSupplierDropDown1001();
    this.GetExistBidWin1001();
    this.getList2();
  },
  methods: {
    parseTime,
    changes(val) {
      if (!/^1[3456789]\d{9}$/.test(val)) {
        this.$msg.error("请输入正确的手机号");
      }
    },
    onAdd(type1, type) {
      this.type = type;
      this.type1 = type1;
      this.$refs.choseUser.openfnc();
    },
    //添加人员
    onUserAdd(id) {
      let userGuid = id.map((e) => e.userGuid);
      let obj = {
        bidModeId: this.bidModeId,
        bidPersonRole: this.type1,
        userGuid,
      };
      this.$http.post("/BidModePerson/AddBidPerson1002", obj).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.GetBidModePersonList1001();
        } else {
          this.$confirm(res.data.message, "提示", {
            confirmButtonText: "确定",
            type: "warning",
          });
        }
      });
    },
    handlechange(val) {
      this.texts = this.tempList.find((e) => e.fileName == val).fileExt;
    },
    onChangeGongFang(id) {
      let obj = {
        baseId: this.bidModeId,
        supplierId: id,
      };
      this.$http.post("/BidModeSupplier/SaveSupplier1001", obj).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.GetBidModeSupplierList1001();
          this.GetSupplierDropDown1001();
          this.GetExistBidWin1001();
          // this.flag3 = false;
        } else {
          this.$confirm(res.data.message, "提示", {
            confirmButtonText: "确定",
            type: "warning",
          });
        }
      });
    },
    //保存供方信息
    saveSup() {
      for (var i = 0; i < this.supplierList.length; i++) {
        if (parseFloat(this.supplierList[i].amount) < parseFloat(this.supplierList[i].amountNoTax)) {
          this.$msg.error("不含税中标金额不能大于含税中标金额");
          return false;
        }
        if (!/^1[3456789]\d{9}$/.test(this.supplierList[i].mobilePhone)) {
          this.$message.error("请输入正确的手机号");
          return false;
        }
      }
      // if (rar) {
      let arr = this.supplierList.map((e) => {
        return {
          bidModeId: this.bidModeId,
          ...e,
        };
      });
      this.$http.post("/BidModeSupplier/SaveSupplierPersonList1001", arr).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.GetBidModeSupplierList1001();
        }
      });
      // }
    },
    //获取初始化的供应商下拉
    GetSupplierDropDown1001() {
      this.$http.get("/BidModeSupplier/GetSupplierDropDown1001?bidModeId=" + this.bidModeId).then((res) => {
        this.supplierOption = res.data;
      });
    },
    //获取初始化定标信息
    GetExistBidWin1001() {
      this.$http.get("/BidWin/GetExistBidWin1001?bidModeId=" + this.bidModeId).then((res) => {
        this.form1 = res.data;
        if (this.form1.supplierId == "00000000-0000-0000-0000-000000000000") {
          this.form1.supplierId = "";
        }
      });
    },
    //获取初始化定标信息
    GetSupplierPrice1001(supplierId) {
      this.$http.get("/BidModeSupplier/GetSupplierPrice1001?bidModeId=" + this.bidModeId + "&supplierId=" + supplierId).then((res) => {
        this.form1.amount = res.data.amount;
        this.form1.amountNoTax = res.data.amountNoTax;
      });
    },
    //获取模板下拉
    GetWinFileTempList() {
      this.$http.get("/BidFileConfig/GetWinFileTempList?bidModeId=" + this.bidModeId).then((res) => {
        this.tempList = res.data;
      });
    },
    //获取人员列表
    GetBidModePersonList1001() {
      this.$http.get("/BidModePerson/GetBidModePersonList1001", { params: { baseId: this.bidModeId } }).then((res) => {
        this.reasons = res.data;
      });
    },
    //获取已添加供方列表
    GetBidModeSupplierList1001() {
      this.$http.get("/BidModeSupplier/GetBidModeSupplierList1001", { params: { baseId: this.bidModeId } }).then((res) => {
        this.supplierList = res.data.result;
      });
    },

    submitUpload() {
      if (!this.uploadData.FileName && this.uploadData.TempType == "其他附件") {
        this.$message.error("请选择文件名称");
        return false;
      }
      this.loading = true;
      let f = new FormData();
      f.append("BidModeId", this.bidModeId);
      f.append("FileName", this.uploadData.TempType == "其他附件" ? this.uploadData.FileName : this.uploadData.TempType);
      f.append("TempType", this.uploadData.TempType);
      f.append("fileBix", this.file.raw);
      this.$api.supIn
        .BidWinAttachUpload1(f)
        .then((res) => {
          this.loading = false;
          if (res.success) {
            this.uploadData.FileName = "";
            this.uploadData.TempType = "";
            this.$refs.upload.clearFiles();
            this.$message.success(res.message);
            this.loading = false;
            this.dialogVisible = false;
            this.getList2();
          } else {
            this.loading = false;
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err.data.message);
        });
    },
    getList2() {
      this.$api.supIn.GetBidWinAttachList01({ bidModeId: this.bidModeId }).then((res) => {
        this.fileslist = res;
      });
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidWinAttachUpload1";
    },
    onDownload(id, i) {
      if (i < 4) {
        this.$confirm("您确认要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = { id };
          this.$http
            .post(
              i == 1
                ? "/BidModePerson/DeleteBidModePersonById1001"
                : i == 2
                ? "/BidModeSupplier/DeleteBidModeSupplier1001"
                : "/BidWin/DeleteBidWinAttach",
              obj
            )
            .then((res) => {
              if (res.data.success) {
                this.$msg.success(res.data.message);
                i == 1 ? this.GetBidModePersonList1001() : i == 2 ? this.GetBidModeSupplierList1001() : this.getList2();
                if (i == 2) {
                  this.GetSupplierDropDown1001();
                }
              } else {
                // this.$msg.warning(res.data.message);
                this.$alert(res.data.message, {
                  confirmButtonText: "确定",
                });
              }
            });
        });
      } else {
        window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + id);
      }

      //   window.open(process.env.VUE_APP_API_URL+file.filePath+file.fileReName)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success) {
        this.$message.success(response.message);
        this.dialogVisible = false;
        this.loading = false;
        this.BidActionButton14();
        this.getList2();
      } else {
        this.$message.error(response.message);
      }
    },
    beforeUpload(file) {
      this.file = file;
      //   let name = file.name;
      //   let index = name.lastIndexOf("\.");
      //   this.uploadData = {
      //     FileName: name.substring(0, index),
      //   };
      //   console.log(this.uploadData.FileName);
    },

    onSubmitto(i) {
      //   this.$emit("CheckBidWinSubmit1001", true);
      this.$refs.form1.validate((valid) => {
        if (valid) {
          if (parseFloat(this.form1.amountNoTax) > parseFloat(this.form1.amount)) {
            this.$alert("不含税中标金额不能大于含税中标金额", {
              confirmButtonText: "确定",
            });
          } else {
            let obj = {
              bidModeId: this.bidModeId,
              ...this.form1,
            };
            if (i == 1) {
              this.$http.post("/BidWin/SaveSimpleBidWin1001", obj).then((res) => {
                if (res.data.success) {
                  this.$msg.success(res.data.result.message);
                }
              });
            } else {
              this.$confirm("确定要提交吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }).then(() => {
                this.$http.post("/BidWin/SubmitSimpleBidWin1001", obj).then((res) => {
                  if (res.data.success) {
                    this.$msg.success(res.data.message);
                    this.$emit("CheckBidWinSubmit1001");
                  } else {
                    this.$confirm(res.data.message, "提示", {
                      confirmButtonText: "确定",
                      type: "warning",
                    });
                  }
                });
              });
            }
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
}
::v-deep .el-form-item__label {
  height: 20px;
  line-height: 20px;
}

::v-deep .el-collapse-item__header {
  border-left: 3px solid #ea5514;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: #d9d6d6;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
  position: relative;
  .pub {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 30px;
  }
}
</style>
