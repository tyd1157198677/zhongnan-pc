<template>
  <div>
    <div>
      <!-- <el-row class="pt-3 pl-3 pr-3 mx-auto mh"> -->
      <div v-if="!isshow">
        <div style="margin-bottom: 10px; position: relative">
          <div class="table-top-title" style="margin-bottom: 10px">考察信息</div>
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(audit, 1)"
            v-if="btnStatus"
            style="position: absolute; top: 5px; right: 0px"
            >发起考察</el-button
          >
        </div>

        <el-table
          style="width: 100%"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData1"
        >
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column label="考察专业" align="center">
            <template slot-scope="scope">
              <!-- <el-link type="primary" style="margin-left: 10px; color: #409eff; text-decoration: none" @click="jumpSuppInfo1(scope.row)"> -->
              {{ scope.row.cateName }}
              <!-- </el-link> -->
            </template>
          </el-table-column>
          <el-table-column prop="supCateName" label="考察日期" width="150" align="center">
            <template slot-scope="scope">
              {{ scope.row.invesDate }}
            </template>
          </el-table-column>
          <el-table-column label="考察形式" width="120" align="center">
            <template slot-scope="scope">
              {{ scope.row.invesForm }}
            </template>
          </el-table-column>
          <el-table-column label="考察区域" width="150" align="center">
            <template slot-scope="scope">
              {{ scope.row.invesOrgName }}
            </template>
          </el-table-column>

          <el-table-column prop="startUserName" label="参与人员" align="center">
            <template slot-scope="scope">
              {{ scope.row.userName }}
            </template>
          </el-table-column>
          <el-table-column prop="invesResult" label="考察结果" width="120" align="center">
            <template slot-scope="scope">
              {{ !scope.row.invesResult ? "不通过" : "通过" }}
            </template>
          </el-table-column>
          <el-table-column prop="groupInvesStatus" label="审批状态" width="120" align="center"> </el-table-column>

          <el-table-column label="备注" align="center">
            <template slot-scope="scope">
              {{ scope.row.remark }}
            </template>
          </el-table-column>
          <el-table-column prop="invesResult" label="下载附件" width="80" align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.fileId" class="el-icon-download" title="下载" @click="download(scope.row.fileId)"></i>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <i class="el-icon-zoom-in" title="删除" @click="lookDetail(scope.row)"></i>
              <i v-if="scope.row.canEdit" class="el-icon-delete" title="删除" @click="onDelete(scope.row.id)"></i>
              <i v-if="scope.row.canEdit" @click="handleEdit(scope.row, 2)" class="el-icon-edit" title="编辑" style="margin-left: 15px" />
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="totalCount1" :current-page="currentPage1" :pageSize="pageSize1" @pageChange="pageChange1" />
      </div>

      <el-form v-else ref="formName" :model="audit" :rules="rules" label-width="100px">
        <div class="fromborder">
          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="8">
              <el-form-item label="考察日期：" prop="invesDate">
                <el-date-picker type="date" style="width: 100%" v-model="audit.invesDate" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="参与人员：" prop="userName">
                <el-input v-model.trim="audit.userName" disabled>
                  <el-button slot="append" icon="el-icon-search" @click="onAdd"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="考察专业：" prop="cateName">
                <el-input v-model.trim="audit.cateName" disabled>
                  <el-button slot="append" icon="el-icon-search" @click="openSubCategoryTree"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="考察区域：" prop="invesOrgName">
                <el-input
                  placeholder="请选择考察区域："
                  style="width: 100%"
                  v-model.trim="audit.invesOrgName"
                  @focus="subJectAdd()"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="考察形式：" prop="invesForm">
                <el-select style="width: 100%" v-model="audit.invesForm" placeholder="请选择考察形式">
                  <el-option
                    v-for="item in invesFormList"
                    :key="item.invesFormName"
                    :label="item.invesFormName"
                    :value="item.invesFormName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="考察结果：">
                <el-radio-group v-model="audit.invesResult" style="margin-top: 5px">
                  <el-radio :label="1">通过</el-radio>
                  <el-radio :label="0">不通过</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 2 }"
                  placeholder="请输入备注说明"
                  v-model="audit.remark"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="考察附件：">
                <!-- <el-form-item label="考察附件：" prop="attachId"> -->
                <el-upload
                  ref="imgUpload"
                  class="upload-demo"
                  :before-upload="beforeUpload"
                  :http-request="imageChange"
                  action="#"
                  :file-list="fileList"
                  :on-change="handleChange"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <!-- <div slot="tip" class="el-upload__tip" style="display: inline-block; margin-left: 10px">
                      <el-link
                        style="color: #409eff; margin-right: 10px"
                        v-for="item in invesFormList"
                        type="primary"
                        :key="item.invesFormName"
                        :href="getFileUrl(item.invesFormUrl)"
                        >下载{{ item.invesFormName }}</el-link
                      >
                    </div> -->
                  <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包、图片，单文件最大200M</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <div style="text-align: right">
              <el-button type="info" size="small" @click="isshow = !isshow">取 消</el-button>
              <el-button type="primary" size="small" @click="pass('formName')">提 交</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <!-- </el-row> -->
      <el-dialog title="考察详情" :visible.sync="dialogTableVisible" width="70%">
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right" style="width: 120px">供方名称:</td>
              <td colspan="3" @click="jumpSuppInfo(neweditform.baseGuid)" class="setColor">{{ neweditform.supName }}</td>
              <td class="right" style="width: 120px">考察日期:</td>
              <td colspan="3">
                {{ neweditform.invesDate == "0001-01-01T00:00:00" ? "" : parseTime(neweditform.invesDate, "yyyy-MM-dd") }}
              </td>
              <td class="right" style="width: 120px">考察专业:</td>
              <td colspan="3">{{ neweditform.cateName }}</td>
              <td class="right" style="width: 100px">考察结果:</td>
              <td colspan="3">{{ neweditform.invesResult == 1 ? "通过" : "不通过" }}</td>
            </tr>

            <tr>
              <td class="right" style="width: 120px">参与人员:</td>
              <td colspan="3">
                {{ neweditform.userName }}
              </td>
              <td class="right">考察区域:</td>
              <td colspan="3">{{ neweditform.invesOrgName }}</td>
              <td class="right" style="width: 120px">考察形式</td>
              <td colspan="3">
                {{ neweditform.invesForm }}
              </td>
              <td class="right">备注:</td>
              <td colspan="3">{{ neweditform.remark }}</td>
            </tr>
          </tbody>
        </table>
        <rizhi v-if="dialogTableVisible" :id="rizhiId" :urlRizhi="urlRizhi"></rizhi>
        <!-- <processtring :type="'供方考察'" ref="processtring"></processtring> -->
      </el-dialog>
      <category-tree ref="subCategoryTree" @select="subCategoryTreeSelect"></category-tree>
      <chose-user ref="choseUser" @itemClick="onUserAdd" :type="2" />
      <subJectTree title="项目" :level="1" ref="subJectTree" :fromType="'zhaobiao'" @itemClick="subJectTree"></subJectTree>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    categoryTree: () => import("@/views/supplier/components/CategoryTree"),
    choseUser: () => import("@/components/choseUser"),
    Pagination: () => import("@/components/Pagination.vue"),
    subJectTree: () => import("../../components/subJectTreeZc"),
    rizhi: () => import("@/components/rizhi.vue"),
  },
  data() {
    return {
      urlRizhi: "/WflowApproveLogsAppServices/EB_GetSupInvesList",
      audit: {
        id: "",
        baseGuid: "",
        invesDate: "",
        invesResult: 1,
        remark: "",
        cateName: "",
        userName: "",
        invesForm: "",
        invesOrg: "",
        invesOrgName: "",
        userId: [],
        cateId: [],
        attachId: "",
      },
      rizhiId: "",
      currentPage1: 1,
      pageSize1: 15,
      totalCount1: 0,
      neweditform: {},
      tableData1: [],
      isshow: false,
      dialogTableVisible: false,
      fileList: [],
      invesFormList: [],
      rules: {
        invesDate: [{ required: true, message: "请选择日期", trigger: "change" }],
        userName: [{ required: true, message: "请选择参与人员", trigger: ["change"] }],
        invesOrgName: [{ required: true, message: "请选择考察区域", trigger: ["change"] }],
        cateName: [{ required: true, message: "请选择考察专业", trigger: ["change"] }],
        invesForm: [{ required: true, message: "请选择考察形式", trigger: ["change"] }],
        attachId: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.$refs.imgUpload.fileList.length == 0) {
                //this.$refs.imgUpload 这个打印一下就知道要的判断条件
                callback(new Error("请上传附件照"));
              } else {
                callback();
              }
            },
            // message: "请上传营业执照",
            trigger: "change",
          },
        ],
      },
      btnStatus: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    this.isshow = false;
    this.getList1();
    this.GetSupInvesForm();
    this.getBtnStaus();
  },
  methods: {
    parseTime,
    subJectTree(sub) {
      console.log(sub);
      this.audit.invesOrg = sub.id;
      this.audit.invesOrgName = sub.comName;
      this.$refs.subJectTree.close();
    },
    subJectAdd() {
      this.$refs.subJectTree.open();
    },
    async getBtnStaus() {
      let res = await this.$http.get("/UserAuth/CheckStartInvesAuth");
      this.btnStatus = res.data.success;
    },
    download(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/UploadFileById?fileId=" + id);
    },
    getFileUrl(file) {
      return `${process.env.VUE_APP_API_URL}${file}`;
    },
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = [".doc", ".docx", ".rar", ".zip", ".png", ".jpg", ".pdf"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件格式有误");
        return false;
      }
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    imageChange(param, type) {
      let formData = new FormData();
      formData.append("file", param.file);
      formData.append("baseGuid", this.id);
      this.$axios
        .post("/api/FileUpload/SupplierInvesFile", formData)
        .then((res) => {
          if (res.data.success) {
            this.audit.attachId = res.data.returnValue1;
            this.$message.success(res.data.message);
            this.$refs.formName.clearValidate("attachId");
          }
        })
        .catch((err) => {
          this.$message.warning(err.data.message);
        });
    },
    pass() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          if (this.audit.invesForm == "免考察报告") {
            if (!this.audit.remark) {
              this.$message.warning("请填写备注说明!");
              return false;
            }
          } else {
            if (!this.audit.attachId) {
              this.$message.warning("请上传考察附件!");
              return false;
            }
          }
          this.$confirm("确定要提交吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.loading = true;
            this.audit.baseGuid = this.id;
            this.$http
              .post("/SupInvesAppServices/SaveSupInves", this.audit)
              .then((res) => {
                if (res.data.success) {
                  this.$msg.success("保存成功");
                  this.getList1();
                  this.isshow = !this.isshow;
                }
              })
              .finally(() => {
                this.loading = false;
              });
          });
        }
      });
    },
    openSubCategoryTree() {
      this.$refs.subCategoryTree.open();
    },
    async getList1() {
      let obj = {
        baseId: this.id,
        SkipCount: (this.currentPage1 - 1) * this.pageSize1,
        MaxResultCount: this.pageSize1,
      };
      this.loading = true;
      let res = await this.$http.get("/SupInvesAppServices/GetSupInvesInfoList", { params: obj });
      if (res.data.success) {
        this.totalCount1 = res.data.result.totalCount;
        this.tableData1 = res.data.result.items;
        this.tableData1.forEach((e) => {
          e.cateName = e.cateName.toString();
          e.userName = e.userName.toString();
          e.invesDate = parseTime(e.invesDate, "yyyy-MM-dd");
        });
      }
    },
    async GetSupInvesForm() {
      let res = await this.$http.get("/SupInvesAppServices/GetSupInvesForm");
      if (res.data.success) {
        this.invesFormList = res.data.result.invesFormList;
      }
    },
    subCategoryTreeSelect(val) {
      this.audit.cateId = val.map((e) => e.id);
      this.audit.cateName = val.map((e) => e.cateName) + [];
    },
    onUserAdd(id) {
      console.log(id);
      this.audit.userId = id.map((e) => e.userGuid);
      this.audit.userName = id.map((e) => e.userName).toString();
    },
    onAdd() {
      this.$refs.choseUser.openfnc();
    },
    pageChange1(page) {
      this.pageSize1 = page._pageSize1;
      this.currentPage1 = page._currentPage1;
      this.getList1();
    },
    onDelete(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupInvesAppServices/DelSupInves", { id }).then((res) => {
          if (res.data.success) {
            this.getList1();
          } else {
            this.$message.error(res.message);
          }
        });
      });
    },
    lookDetail(row) {
      this.neweditform = row;
      this.rizhiId = row.id;
      this.dialogTableVisible = true;
      console.log(row);
    },

    handleEdit(row, i) {
      if (i == 1) {
        this.fileList = [];
        Object.keys(row).forEach((key) => {
          //通过循环判断对象里面的类型来赋初始值
          row[key] = typeof row[key] == "string" ? "" : typeof row[key] == "object" ? [] : 1;
        });
      } else {
        this.fileList = [{ name: row.fileName }];
        // row。
        Object.keys(row).forEach((key) => {
          //通过循环判断对象里面的类型来赋初始值
          this.audit[key] = row[key];
        });
      }
      this.isshow = !this.isshow;
    },
  },
};
</script>

<style scoped>
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
  background-color: #f5f7fa;
}
</style>
