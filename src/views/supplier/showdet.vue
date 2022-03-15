<template>
  <el-main style="padding-bottom: 60px">
    <el-card>
      <div slot="header" class="clearfix flex between middle">
        <el-page-header @back="$router.back(-1)" :content="neweditform.comMainName"></el-page-header>
      </div>
      <el-form label-position="top" ref="neweditform" :model="neweditform" :rules="rules1">
        <el-row style="margin-bottom: 10px">
          <table class="layui-table el-table__body">
            <tbody>
              <tr>
                <td class="right" style="width: 150px">供应商名称:</td>
                <td colspan="3">{{ neweditform.comFullName }}</td>
              </tr>
              <tr>
                <td class="right">项目名称:</td>
                <td colspan="3">{{ proJectName }}</td>
              </tr>
              <tr>
                <!-- <td class="right">区域：</td>
                <td>{{ neweditform.area }}</td> -->
                <td class="right">黑名单开始日期：</td>
                <td>
                  {{ neweditform.startDate == "0001-01-01T00:00:00" ? "" : parseTime(neweditform.startDate, "yyyy-MM-dd") }}
                </td>
                <td class="right">类别：</td>
                <td>{{ neweditform.supType }}</td>
              </tr>
              <!-- <tr>
                <td class="right">原因描述:</td>
                <td colspan="5">{{ neweditform.desc }}</td>
              </tr>
              <tr>
                <td class="right">发生事件:</td>
                <td colspan="5">{{ neweditform.incident }}</td>
              </tr> -->
              <tr>
                <td class="right">备注:</td>
                <td colspan="3">{{ neweditform.remark }}</td>
              </tr>
            </tbody>
          </table>
        </el-row>
        <el-row v-if="isShowPerson">
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tablelist">
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="联系人" prop="personName" align="center"></el-table-column>
            <el-table-column label="职务" prop="workAs" align="center"></el-table-column>
            <el-table-column label="联系方式" prop="mobile" align="center"></el-table-column>
          </el-table>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData">
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="文件名字" prop="fileShowName" align="center"> </el-table-column>
            <el-table-column label="文件类型" prop="fileExtName" align="center"> </el-table-column>
            <el-table-column label="文件大小" prop="showFileSize" align="center"> </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <span
                  class="el-icon-download"
                  @click="downLoad(scope.row.filePath + scope.row.fileReName)"
                  style="margin-right: 10px"
                ></span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <el-row style="margin-bottom: 40px">
          <el-col :span="24" class="right" v-if="neweditform.showAudit">
            <el-input style="margin: 10px 0" v-model="reson" type="textarea" placeholder="请填写意见"></el-input>
            <el-button size="small" type="danger" @click="submits(false)">驳回</el-button>
            <el-button type="primary" size="small" @click="submits(true)">同意</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="95%">
        <gongFang @itemClick="onSelectSups" />
      </el-dialog>
      <el-dialog :visible.sync="dialogFormVisible" title="选择附件" width="60%">
        <el-row>
          <div class="float-right mb-2" style="margin-top: 10px">
            <el-button type="primary" size="small" @click="onUploadPreview">上传新附件</el-button>
          </div>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData">
            <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
            <el-table-column label="文件名字" prop="fileShowName" align="center"> </el-table-column>
            <el-table-column label="文件类型" width="80" prop="fileExtName" align="center"> </el-table-column>
            <el-table-column label="文件大小" width="80" prop="showFileSize" align="center"> </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <span
                  class="el-icon-download"
                  @click="downLoad(scope.row.filePath + scope.row.fileReName)"
                  style="margin-right: 10px"
                ></span>
                <i class="el-icon-delete" title="删除" @click="onDelete(scope.row.id, 2)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-dialog>
      <el-dialog v-if="dialogVisible" width="40%" title="上传附件" :visible.sync="dialogVisible">
        <el-form>
          <el-form-item label="文件名称">
            <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
          </el-form-item>
          <el-form-item label="选择文件">
            <el-upload
              class="upload-demo"
              ref="upload"
              :multiple="false"
              :data="uploadData"
              :action="getUploadUrl()"
              :on-change="beforeUpload"
              :on-success="onUploadSuccess"
              :auto-upload="false"
              :headers="header"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传</el-button>
              <div slot="tip" class="el-upload__tip">文件格式：.png|.jpg|.pdf| 最大：10 兆</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog width="40%" title="添加人员" :visible.sync="dialogVisiblepeo">
        <el-form :rules="rules" ref="peoform" :model="peoform" label-width="120px">
          <el-form-item label="联系人：" prop="personName">
            <el-input style="width: 200px" v-model="peoform.personName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="mobile">
            <el-input style="width: 200px" maxlength="11" v-model="peoform.mobile"></el-input>
          </el-form-item>
          <el-form-item label="职务：" prop="workAs">
            <el-input style="width: 200px" v-model="peoform.workAs"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="dialogVisiblepeo = false">取消</el-button>
          <el-button type="primary" size="mini" @click="onSubmit('peoform')">保 存</el-button>
        </div>
      </el-dialog>
    </el-card>
    <subJectTree title="项目" :level="2" ref="subJectTree" @itemClick="subJectTree"></subJectTree>
  </el-main>
</template>
<script>
import gongFang from "./components/storageList2";
import subJectTree from "@/views/bid/components/subJectTree";
import { parseTime } from "@/util";
export default {
  components: {
    gongFang,
    subJectTree,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      selectSupVisible: false,
      dialogFormVisible: false,
      dialogVisiblepeo: false,
      tablelist: [],
      typeList1: [],
      typeList: [],
      rules: {
        personName: [{ required: true, message: "请填写联系人", trigger: "blur" }],
        mobile: [
          { required: true, message: "请填写联系方式", trigger: "blur" },
          { min: 11, max: 11, message: "长度错误", trigger: "blur" },
        ],
        workAs: [{ required: true, message: "请填写职务", trigger: "blur" }],
      },
      rules1: {
        comFullName: [{ required: true, message: "请填写或者选择供应商名称", trigger: "blur" }],
        startDate: [{ required: true, message: "请选择黑名单开始日期", trigger: "blur" }],
      },
      peoform: {
        id: "",
        personName: "",
        mobile: "",
        workAs: "",
      },
      neweditform: {
        supBackProjectList: [],
        id: "",
      },
      uploadData: {
        FileName: "",
      },
      dialogVisible: false,
      tableData: [],
      reson: "",
      rowId: "",
      file: "",
      id: this.$route.query.id,
      FileName: "",
      form: {},
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  created() {},
  computed: {
    type() {
      return this.$route.query.type;
    },
    isShowPerson() {
      return !this.neweditform.supGuid ? false : true;
    },
    proJectName() {
      if (!this.neweditform.supBackProjectList) {
        return "";
      } else {
        return this.neweditform.supBackProjectList.length > 0
          ? this.neweditform.supBackProjectList.map((v) => v.projectName).toString()
          : "";
      }
    },
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
    this.GetNoticeAttachList();
    //编辑请求下拉
    if (this.type == 1) {
      this.GetTakeOnType();
    }
    //新增不请求基本数据
    if (this.id) {
      this.GetOneSupBackListById();
    }
  },
  methods: {
    parseTime,
    addpeo() {
      let str = this.peoform;
      str.id = "";
      str.personName = "";
      str.mobile = "";
      str.workAs = "";
      this.dialogVisiblepeo = true;
    },
    subJectTree(sub) {
      this.neweditform.supBackProjectList.push({ projectGuid: sub.id, projectName: sub.projectFullName });
      // this.neweditform.projectId = sub.id;
      // this.neweditform.projectName = sub.projectFullName;
      this.$refs.subJectTree.close();
    },
    subJectAdd() {
      this.$refs.subJectTree.open();
    },
    async GetOneSupBackListById() {
      let res = await this.$http.get("/SupBackList/GetOneSupBackListById", { params: { id: this.id } });
      this.neweditform = res.data;
      this.neweditform.startDate = this.neweditform.startDate == "0001-01-01T00:00:00" ? "" : this.neweditform.startDate;
      this.GetSupplierContacters();
    },
    async GetTakeOnType1() {
      let res = await this.$http.get("/SupAudit/GetSupProCateTagForAudit");
      this.typeList1 = res.data;
      this.leibiexiangmu = res.data.item.split(",");
    },
    async GetTakeOnType() {
      let res = await this.$http.get("/SupAudit/GetSupCateTagForAudit");
      this.typeList = res.data;
    },
    async GetSupplierContacters() {
      let res = await this.$http.get("/SupBackList/GetSupplierContacters?baseGuid=" + this.neweditform.supGuid);
      this.tablelist = res.data;
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            id: "",
            baseGuid: this.neweditform.supGuid,
            ...this.peoform,
          };
          this.$http.post("/SupBackList/SaveBlackContacter", obj).then((res) => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.dialogVisiblepeo = false;
              this.GetSupplierContacters();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    goback() {
      this.$router.push({
        path: "/supplier/backlist",
      });
    },
    //选择供应商
    onSelectSups(sup) {
      this.neweditform.supGuid = sup.id;
      this.neweditform.comFullName = sup.comFullName;
      this.$message.success("添加成功");
      this.selectSupVisible = false;
      // this.$api.BidModeSupplier.SaveSupplier({
      //   baseId: this.baseId,
      //   supplierId: sup.id,
      //   supGuid: sup.id,
      // }).then(res => {
      //   if (res.success) {
      //     this.$message.success("添加成功");
      //     this.neweditform.supGuid = sup.id;
      //     this.neweditform.comFullName = sup.comFullName;
      //     this.selectSupVisible = false;
      //   } else {
      //     this.$message.error(res.message);
      //   }
      // });
    },
    edit(row) {
      let { personName, mobile, workAs, id } = row;
      let str = this.peoform;
      str.id = id;
      str.personName = personName;
      str.mobile = mobile;
      str.workAs = workAs;
      this.dialogVisiblepeo = true;
    },
    saveadd() {
      this.$refs.neweditform.validate((valid) => {
        if (valid) {
          console.log(this.neweditform);
          this.$http.post("SupBackList/SaveSupBackList", this.neweditform).then((res) => {
            if (res.data.success) {
              this.$message.success("保存成功");
              this.id = res.data.returnValue2;
              this.neweditform.supGuid = res.data.returnValue1;
              this.$http.get("/SupBackList/GetOneSupBackListById", { params: { id: res.data.returnValue2 } }).then((res) => {
                this.neweditform = res.data;
                this.neweditform.startDate = this.neweditform.startDate == "0001-01-01T00:00:00" ? "" : this.neweditform.startDate;
                this.GetSupplierContacters();
              });
              // this.$router.push({
              //   path: "./backlist",
              // });
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    downLoad(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
    },
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/SupBackAttachUpload";
    },
    GetNoticeAttachList() {
      this.$http.get("/SupBackList/GetBackListAttach", { params: { id: this.id } }).then((res) => {
        if (res.status == 200) {
          this.tableData = res.data;
        }
      });
    },
    onUploadPreview() {
      this.dialogVisible = true;
      this.dialogFormVisible = false;
      this.uploadData = {};
    },
    beforeUpload(file) {
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData = {
        FileName: name.substring(0, index),
      };
      console.log(this.uploadData.FileName);
      if (this.FileName == "") {
        // return this.$msg.warning("请填写文件名字");
        this.FileName = this.uploadData.FileName;
      }
    },
    onDelete(id, type) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post(type == 2 ? "/SupBackList/DeleteAttach" : "/SupContacter/DeleteSupContacterById", { id: id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          type == 2 ? this.GetNoticeAttachList() : this.GetSupplierContacters();
        });
      });
    },
    submitUpload() {
      if (this.FileName == "") {
        // this.$msg.warning("请填写文件名字");
        this.FileName = this.uploadData.FileName;
      } else {
        Object.assign(this.uploadData, { BackId: this.neweditform.id, FileName: this.uploadData.FileName });
        this.$refs.upload.submit();
      }
    },
    onUploadSuccess(response, file, fileList) {
      this.$message.success("保存成功");
      this.GetNoticeAttachList();
      this.dialogVisible = false;
      this.dialogFormVisible = true;
    },
    fujian() {
      if (!this.neweditform.id) {
        this.$message({ message: "请先保存基本信息", type: "error" });
      } else {
        this.dialogFormVisible = true;
      }
    },
    submits(isok) {
      if (!isok && !this.reson) {
        this.$message.warning("请填写驳回原因！");
      } else {
        this.$confirm("提交后将不能更改，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            isok,
            id: this.id,
            desc: this.reson,
            todoId: this.$route.query.todoId,
          };
          this.$http.post("/SupBackList/AuditBack", obj).then((res) => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.$router.back(-1);
            } else {
              this.$message.error(res.data.message);
            }
          });
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep.el-form--label-top .el-form-item__label {
  padding: 0 !important;
}
::v-deep label {
  margin-bottom: 0px !important;
}
</style>
