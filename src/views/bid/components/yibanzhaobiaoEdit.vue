<template>
  <el-container class="detail">
    <el-main>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div>招标小组成员</div>
            <div class="pub">
              <el-button type="primary" size="small" @click.stop="onAdd('招标组长', 1)">添加招标组长</el-button>
              <el-button type="primary" size="small" @click.stop="onAdd('技术评委', 1)">添加技术评委</el-button>
              <el-button type="primary" size="small" @click.stop="onAdd('商务评委', 1)">添加商务评委</el-button>
            </div>
          </template>
          <el-table key="1" empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="reasons">
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="角色名称" prop="bidRole"> </el-table-column>
            <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
            <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
            <!-- <el-table-column label="所属组织" prop="bidProcessName"> </el-table-column> -->
            <el-table-column label="所属组织" prop="orgName" align="center"> </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <i class="el-icon-delete ml-2" title="删除" @click="onDownload(scope.row.id, 1)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div>邀请供方</div>
            <div class="pub">
              <el-button type="primary" size="small" @click.stop="flag3 = true">添加供方</el-button>
              <el-button type="primary" size="small" @click.stop="saveSup">保存信息</el-button>
            </div>
          </template>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="supplierList">
            <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
            <el-table-column label="供应商名称" prop="supplierName"> </el-table-column>
            <el-table-column label="主营专业" prop="supCateNames" align="center"> </el-table-column>
            <el-table-column label="注册资金" align="center" width="120">
              <template slot-scope="scope">
                {{ scope.row.regCapital + scope.row.regCapitalType }}
              </template>
            </el-table-column>

            <el-table-column label="供方联系人" align="center">
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
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <i class="el-icon-delete ml-2" title="删除" @click="onDownload(scope.row.id, 2)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div>报名相关信息</div>
          </template>
          <div style="padding: 0 10px">
            <el-form label-position="top" ref="form1" :model="form1" :rules="rules">
              <el-row :gutter="12">
                <el-col :span="6">
                  <el-form-item label="投标保证金（元）" prop="deposit">
                    <el-input
                      style="width: 100%"
                      type="number"
                      placeholder="投标保证金"
                      v-model.trim="form1.deposit"
                      :min="1"
                      :precision="2"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否发布公告" prop="isShow">
                    <el-select style="width: 100%" v-model.trim="form1.isShow" @change="GetSupplierPrice1001" placeholder="是否发布公告">
                      <el-option label="是" :value="true"> </el-option>
                      <el-option label="否" :value="false"> </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="isShow">
                  <el-form-item label="报名截止时间">
                    <el-date-picker
                      class="dataPeker"
                      style="width: 100%"
                      type="date"
                      v-model.trim="form1.signUpEndDate"
                      value-format="yyyy-MM-dd"
                      placeholder="选择时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="isShow">
                  <el-form-item label="公告标题">
                    <el-input style="width: 100%" placeholder="公告标题" v-model.trim="form1.noticeTitle"> </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="isShow">
                  <el-form-item label="公告时间">
                    <el-date-picker
                      style="width: 100%"
                      type="date"
                      v-model.trim="form1.showDate"
                      value-format="yyyy-MM-dd"
                      placeholder="选择时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="isShow">
                  <el-form-item label="招标联系人姓名">
                    <el-input style="width: 100%" placeholder="招标联系人姓名" v-model.trim="form1.personName"> </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="isShow">
                  <el-form-item label="招标联系人电话">
                    <el-input
                      maxlength="11"
                      minlength="11"
                      @change="changes"
                      style="width: 100%"
                      placeholder="招标联系人电话"
                      v-model.trim="form1.mobilePhone"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="isShow">
                  <el-form-item label="招标联系人邮箱">
                    <el-input style="width: 100%" placeholder="招标联系人邮箱" v-model.trim="form1.personEmail"> </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-show="isShow">
                  <el-form-item label="招标内容">
                    <div id="demo1"></div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-show="isShow">
                  <el-form-item label="入围标准">
                    <div id="demo2"></div>
                  </el-form-item>
                </el-col>
                <el-col :span="24" v-show="isShow">
                  <el-form-item label="报名提交材料">
                    <div id="demo3"></div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="bacDis" v-if="isShow">
              <div>招标公告附件</div>
              <el-button type="primary" size="small" @click.stop="dialogVisible = true">上传附件</el-button>
            </div>
            <el-table
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="fileslist"
              v-if="isShow"
            >
              <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
              <el-table-column label="文件名称" align="left">
                <template slot-scope="scope">
                  <span>{{ scope.row.fileName + scope.row.fileExtName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="文件大小" prop="showFileSize" align="center"> </el-table-column>
              <el-table-column label="上传日期" prop="creationTime" align="center">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd") }}</span>
                </template>
              </el-table-column>
              <el-table-column label="上传人" prop="creatorUserName"> </el-table-column>
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
          </div>
          <div style="text-align: right; margin-top: 10px">
            <el-button type="primary" size="small" @click="onSubmitto(1)">保存报名信息</el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <div>提交信息</div>
          </template>
          <div style="padding-left: 10px">
            <div><strong>满足如下条件才能提交审批：</strong></div>
            <div style="color: red">
              1、保存方案基本信息；2、添加邀请供方；3、添加招标小组成员（至少1个招标组长、至少1个技术评委、至少1个商务评委）；4、上传相关附件
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div style="text-align: right; margin-top: 10px">
        <!-- <el-button type="primary" size="small" @click="onSubmitto(1)">保存定标信息</el-button> -->
        <el-button type="primary" size="small" :loading="subloading" @click="onSubmitto(2)">提交招标方案</el-button>
      </div>
      <rizhi :id="$route.query.id" :urlRizhi="urlRizhi"></rizhi>
      <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible" style="z-index: 999999">
        <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
          <el-form-item label="文件名称">
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
              <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包、图片，单文件最大200M</div>
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
    </el-main>
  </el-container>
</template>

<script>
import { parseTime } from "@/util";
import wangEditor from "wangeditor";
import $ from "jquery";
import gongFang from "@/views/invest/components/storageList";
export default {
  components: { choseUser: () => import("@/components/choseUser"), gongFang, rizhi: () => import("@/components/rizhi.vue") },
  data() {
    return {
      type: 1,
      urlRizhi: "/WflowApproveLogsAppServices/EB_GetBidMasterList",
      typ1: "招标组长",
      id: "",
      projectName: "",
      texts: "",
      data: {},
      rules: {
        deposit: [{ required: true, message: "投标保证金", trigger: "blur" }],
        isShow: [{ required: true, message: "请选择是否发布公告", trigger: "blur" }],
      },
      selectSupVisible: false,
      dialogVisible: false,
      subloading: false,
      flag3: false,
      form: {},
      xuQiuForm: {},
      reasons: [],
      supplierList: [],
      activeNames: ["1", "2", "3", "4", "5"],
      form1: {},
      fileList: [],
      fileslist: [],
      zuzhangdata: [],
      loading: false,
      isShow: false,
      tempList: {},
      editor: null,
      editorData: "",
      editor2: null,
      editorData2: "",
      editor3: null,
      editorData3: "",
      uploadData: {
        FileName: "",
      },
      file: {},
      planId: "",
      bidModeId: "",
      api: process.env.VUE_APP_API_URL,
      UploadfileList: [],
      loadingfile: false,
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  created() {
    this.bidModeId = this.$route.query.bidModeId;
    this.planId = this.$route.query.id;
  },
  mounted() {
    this.GetBidModePersonList1001();
    this.GetBidModeSupplierList1001();

    this.GetNoticeByPlanId05();
    this.getList2();
    // this.$nextTick(() => {
    // $(".w-e-toolbar").css("z-index", 1);
    // $(".w-e-text-container").css("z-index", 0);
    $(".w-e-text").css("min-height", "200px");
    $(".w-e-text-container").css("height", "150px");
    this.create1();
    this.create2();
    this.create3();
    // });
  },
  methods: {
    parseTime,
    create1() {
      const editor = new wangEditor(`#demo1`);
      editor.config.onchange = (newHtml) => {
        this.editorData = newHtml;
      };
      editor.config.menus = [];
      editor.create();
      this.editor = editor;
    },
    create2() {
      const editor = new wangEditor(`#demo2`);
      editor.config.onchange = (newHtml) => {
        this.editorData2 = newHtml;
      };
      editor.config.menus = [];
      editor.create();
      this.editor2 = editor;
    },
    create3() {
      const editor = new wangEditor(`#demo3`);
      editor.config.onchange = (newHtml) => {
        this.editorData3 = newHtml;
      };
      editor.config.menus = [];
      editor.create();
      this.editor3 = editor;
    },
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
      let obj = {
        bidModeId: this.bidModeId,
        bidPersonRole: this.type1,
        userGuid: id.userGuid,
      };
      this.$http.post("/BidModePerson/AddBidPerson1001", obj).then((res) => {
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

    //获取公告信息
    GetNoticeByPlanId05() {
      this.$http.get("/ModeMasterAppServices/GetNoticeByPlanId05", { params: { planId: this.planId } }).then((res) => {
        this.form1 = res.data;
        if (this.form1.isShow == null || !this.form1.isShow) {
          //   this.isShow = true;
          this.isShow = false;
        } else {
          this.isShow = true;
        }
        if (res.data.planId != "00000000-0000-0000-0000-000000000000") {
          this.editor.txt.html(this.form1.liandoContent);
          this.editor2.txt.html(this.form1.liandoRequire);
          this.editor3.txt.html(this.form1.requireFile);
        } else {
          this.$http.get("/ModeMasterAppServices/GetNoticeTemplet05", { params: { planId: this.planId } }).then((res1) => {
            this.addHtml(res1.data);
          });
        }
      });
    },
    addHtml(res) {
      for (var i = 0; i < res.liandoContent.length; i++) {
        if (i != 0) {
          this.editorData += "<br>";
        }
        this.editorData += res.liandoContent[i];
      }
      this.editor.txt.html(this.editorData);
      for (var i = 0; i < res.liandoRequire.length; i++) {
        if (i != 0) {
          this.editorData2 += "<br>";
        }
        this.editorData2 += res.liandoRequire[i];
      }
      this.editor2.txt.html(this.editorData2);

      for (var i = 0; i < res.requireFile.length; i++) {
        if (i != 0) {
          this.editorData3 += "<br>";
        }
        this.editorData3 += res.requireFile[i];
      }
      this.editor3.txt.html(this.editorData3);
    },
    onChangeGongFang(id) {
      let obj = {
        planId: this.planId,
        supplierId: id,
      };
      this.$http.post("/ModeMasterAppServices/SaveSupplier02", obj).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.GetBidModeSupplierList1001();
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
        // if (parseInt(this.supplierList[i].amount) <= parseInt(this.supplierList[i].amountNoTax)) {
        //   this.$msg.error("不含税中标金额不能大于含税中标金额");
        //   return false;
        // }
        if (!/^1[3456789]\d{9}$/.test(this.supplierList[i].mobilePhone)) {
          this.$message.error("请输入正确的手机号");
          return false;
        }
      }
      // if (rar) {
      let arr = this.supplierList.map((e) => {
        return {
          bidModeId: this.bidModeId,
          supplierId: e.supplierId,
          id: e.id,
          mobilePhone: e.mobilePhone,
          personName: e.personName,
          workAs: e.workAs,
        };
      });
      this.$http.post("/ModeMasterAppServices/SaveSupplierPersonList", arr).then((res) => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
          this.GetBidModeSupplierList1001();
        }
      });
      // }
    },

    //获取初始化定标信息
    GetSupplierPrice1001(val) {
      let obj = {
        planId: this.planId,
        isShow: val ? true : false,
      };
      this.$http.post("/ModeMasterAppServices/SaveShowNotice", obj).then();
      if (val) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },

    //获取人员列表
    GetBidModePersonList1001() {
      this.$http.get("/BidModePerson/GetBidModePersonList1001", { params: { baseId: this.bidModeId } }).then((res) => {
        this.reasons = res.data;
      });
    },
    //获取已添加供方列表
    GetBidModeSupplierList1001() {
      this.$http.get("/ModeMasterAppServices/GetBidModeSupplierList1001", { params: { baseId: this.bidModeId } }).then((res) => {
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
      f.append("planId", this.planId);
      f.append("FileName", this.uploadData.FileName);
      //   f.append("TempType", this.uploadData.TempType);
      f.append("file", this.file.raw);
      this.$axios
        .post("/api/FileUpload/BidNoticeAttachUpload", f)
        .then((res) => {
          this.loading = false;
          if (res.data.success) {
            this.uploadData.FileName = "";
            this.uploadData.TempType = "";
            this.$refs.upload.clearFiles();
            this.$message.success(res.data.message);
            this.loading = false;
            this.dialogVisible = false;
            this.getList2();
          } else {
            this.loading = false;
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err.data.message);
        });
    },
    getList2() {
      this.$http.get("/ModeMasterAppServices/GetNoticeFileList?planId=" + this.planId).then((res) => {
        this.fileslist = res.data;
      });
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
                ? "/ModeMasterAppServices/DeleteSupplierIn"
                : "/ModeMasterAppServices/DeleteBidWinAttach",
              obj
            )
            .then((res) => {
              if (res.data.success) {
                this.$msg.success(res.data.message);
                i == 1 ? this.GetBidModePersonList1001() : i == 2 ? this.GetBidModeSupplierList1001() : this.getList2();
              } else {
                // this.$msg.warning(res.data.message);
                this.$alert(res.data.message, {
                  confirmButtonText: "确定",
                });
              }
            });
        });
      } else {
        window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidCommonFileDownLoad099?fileId=" + id);
      }
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
    },

    onSubmitto(i) {
      if (i == 1) {
        this.form1.amount = parseInt(this.form1.deposit);
        this.form1.planId = this.planId;
        this.form1.liandoContent = this.editor.txt.html();
        this.form1.liandoRequire = this.editor2.txt.html();
        this.form1.requireFile = this.editor3.txt.html();
        this.$http.post("/ModeMasterAppServices/SaveLiandoNotice05", this.form1).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
          }
        });
      } else {
        this.$http.get("/ModeMasterAppServices/CheckBidMode?planId=" + this.planId).then((res) => {
          if (res.data.length > 0) {
            let str = "";
            for (let index = 0; index < res.data.length; index++) {
              const element = res.data[index];
              str += "<p style='color:red'>" + (index + 1) + ":" + element + "</p>";
            }
            this.$alert(str, "提示", {
              dangerouslyUseHTMLString: true,
            });
          } else {
            this.$confirm("确定要提交吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.$http.post("/ModeMasterAppServices/SubmitBidMode?", { id: this.planId }).then((res) => {
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
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
}
.detail {
  padding: 10px;
  margin: 0 auto;
}
.bacDis {
  background: #d9d6d6;
  display: flex;
  justify-content: space-between;
  div {
    line-height: 40px;
    padding-left: 10px;
    font-size: 15px;
    font-weight: 600;
  }
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
