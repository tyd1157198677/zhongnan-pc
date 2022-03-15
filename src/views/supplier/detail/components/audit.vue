<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="infonametits">供应商审核</span>
        </template>
        <el-table
          style="width: 100%"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="auditDate" label="审批日期" width="200" align="center"> </el-table-column>
          <el-table-column prop="auditUserName" label="审核人" width="200" align="center"> </el-table-column>
          <el-table-column prop="supAuditResult" label="审批结果" align="center" width="200"> </el-table-column>
          <el-table-column prop="auditDesc" label="审批意见" align="left"> </el-table-column>
        </el-table>
        <!-- <div> -->
        <div v-if="msg">
          <el-form ref="formName" :model="audit" style="margin-top: 30px" :rules="rules" label-width="130px">
            <div class="fromborder">
              <!-- <div style="margin-bottom:10px">业务区域：</div>
            <el-input v-model="supCateTags" disabled style="width:200px">
              <el-button slot="append" icon="el-icon-search" @click="posAdd"></el-button>
            </el-input> -->
              <!-- <el-checkbox-group v-model="supCateTags">
                  <el-checkbox v-for="item in typeList" :key="item" :label="item">{{item}}</el-checkbox>
                </el-checkbox-group> -->
              <!-- </el-form-item> -->
              <!-- <el-form-item label="项目分类：">  -->
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="主营分类：" style="margin-top: 20px" prop="category">
                    <el-input v-model.trim="audit.category" disabled style="color: #333">
                      <el-button slot="append" icon="el-icon-search" @click="openCategoryTree"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="副营分类：" style="margin-top: 20px">
                    <el-input v-model.trim="audit.supSubCategory" disabled>
                      <el-button slot="append" icon="el-icon-search" @click="openSubCategoryTree"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item label="合作层级" style="margin-top: 20px">
                    <el-select v-model.trim="audit.supLevel" placeholder="请选择层级" style="width: 100%">
                      <el-option label="集团" value="集团"></el-option>
                      <el-option label="区域" value="区域"></el-option>
                      <el-option label="项目" value="项目"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col :span="24">
                  <el-form-item label="主要业务城市：" prop="citys">
                    <el-input v-model.trim="audit.citys" disabled style="width: 100">
                      <el-button slot="append" icon="el-icon-search" @click="posAdd"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="营业范围：" prop="businessDomain">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2 }"
                      placeholder="如：微信物联网、APP、小程序开发、大数据服务业务，智慧城市，电商"
                      v-model="audit.businessDomain"
                      style="width: 100%"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="审批意见：" prop="auditDesc">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2 }"
                      placeholder="请输入审批意见"
                      v-model="audit.auditDesc"
                      style="width: 100%"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="相关附件：">
                <el-upload
                  class="upload-demo"
                  :before-upload="beforeUpload"
                  :http-request="imageChange"
                  action="#"
                  :file-list="fileList"
                  :on-change="handleChange"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包、图片，单文件最大200M</div>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <div style="float: right; margin-right: 10px">
                  <el-button type="primary" size="small" @click="pass('formName', '通过')">通过</el-button>
                  <el-button type="primary" size="small" @click="pass('formName', '驳回')">驳回</el-button>
                  <el-button type="primary" size="small" @click="handleclick">转发</el-button>
                </div>
              </el-form-item>
            </div>
          </el-form>
          <category-tree ref="categoryTree" :max="1" @select="categoryTreeSelect"></category-tree>
          <category-tree ref="subCategoryTree" :max="2" @select="subCategoryTreeSelect"></category-tree>
          <el-dialog title="选择人员" :visible.sync="dialogFormVisible">
            <div>
              <el-button size="small" type="primary" style="float: right; margin-bottom: 10px" @click="searchper(person)">搜索</el-button>
              <el-input
                type="text"
                style="width: 30%; float: right; margin-right: 10px"
                placeholder="请输入内容"
                clearable
                v-model="person"
              >
              </el-input>
            </div>
            <el-table
              stripe
              ref="tablebleref"
              :default-expand-all="true"
              v-loading="loading"
              :data="dataList"
              style="width: 100%; margin-bottom: 10px; z-index: 99"
              row-key="subjectCode"
              border
              :cell-style="{ padding: '5px 0' }"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column label="序号" width="80" type="index"> </el-table-column>
              <el-table-column align="center" min-width="120px" label="人员姓名">
                <template slot-scope="scope">
                  <span :max-lines="2">{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="120px" label="登录名">
                <template slot-scope="scope">
                  <span :max-lines="2">{{ scope.row.loginId }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="120px" label="操作">
                <template slot-scope="scope">
                  <el-button icon="el-icon-circle-plus-outline" @click="pass('formName', '转发', scope.row.userGuid)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="totalCount" :current-page="currentPage" :pageSize="page_size" @pageChange="pageChange" />
          </el-dialog>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog width="78%" title="选择主要业务城市" :visible.sync="dialogVisible">
      <div style="height: 400px; overflow: auto">
        <div v-for="(item, index) in typeMind" :key="index">
          <div style="margin-bottom: 10px">
            <b>{{ item.provinceName }}</b>
            <el-checkbox v-if="index != 0" v-model="item.checkAll" @change="handleCheckAllChange(item)" style="margin-left: 30px"
              >全选</el-checkbox
            >
          </div>
          <el-checkbox-group v-model="item.checkList" size="mini" @change="handleCheckAllChange1(item)">
            <el-checkbox-button v-for="e in item.cityList" :label="e.value" :key="e.value">{{ e.text }}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {
    // publicUpload: () => import("@/components/publicUpload.vue"),
    Pagination: () => import("@/components/Pagination.vue"),
    CategoryTree: () => import("@/views/supplier/components/CategoryTree"),
  },
  data() {
    return {
      api: process.env.VUE_APP_API_URL,
      dialogVisible: false,
      dialogVisible2: false,
      rules: {
        category: [
          {
            required: true,
            // message: "请选择主营分类",
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请选择主营分类"));
              } else {
                let category = this.audit.category;
                let supSubCategory = this.audit.supSubCategory;
                if (supSubCategory.indexOf(category) > -1) {
                  callback(new Error("主营分类和副营分类不可重复"));
                  // this.$message({ message: "主营分类和副营分类不可重复", type: "warning" });
                } else {
                  callback();
                }
              }
            },
          },
        ],
        businessDomain: [{ required: true, message: "请填写营业范围", trigger: ["blur"] }],
        citys: [{ required: true, message: "请选择主要业务城市", trigger: ["blur"] }],
        auditDesc: [{ required: true, message: "请输入审批意见", trigger: ["blur"] }],
      },
      fileList: [],
      typeMind: [],
      value: "",
      activeNames: ["1"],
      supCateTags: [],
      proSupCateTags: [],
      typeList: [],
      typeList1: [],

      typeMindtype: [
        {
          provinceName: "一般物资类",
          cityList: [
            {
              text: "办公用品",
              value: "",
            },
            {
              text: "办公家具",
              value: "",
            },
            {
              text: "固定资产",
              value: "",
            },
            {
              text: "电子产品",
              value: "",
            },
            {
              text: "工程耗材",
              value: "",
            },
          ],
        },
        {
          provinceName: "服务采购类",
          cityList: [
            {
              text: "保安",
              value: "",
            },
            {
              text: "保洁",
              value: "",
            },
            {
              text: "绿化",
              value: "",
            },
            {
              text: "智能化",
              value: "",
            },
            {
              text: "电梯",
              value: "",
            },
          ],
        },
        {
          provinceName: "施工工程及维保物资类",
          cityList: [
            {
              text: "工程施工改造及土建物资",
              value: "",
            },
            {
              text: "电梯维保耗材",
              value: "",
            },
            {
              text: "消防耗材",
              value: "",
            },
            {
              text: "配电排水相关物资",
              value: "",
            },
          ],
        },
        {
          provinceName: "IT软件与实施类",
          cityList: [
            {
              text: "软件",
              value: "",
            },
            {
              text: "实施类软件",
              value: "",
            },
          ],
        },
        {
          provinceName: "商业企划物料类",
          cityList: [
            {
              text: "各类推广",
              value: "",
            },
            {
              text: "运营物料",
              value: "",
            },
            {
              text: "资产设备",
              value: "",
            },
          ],
        },
        {
          provinceName: "商业营销推广类",
          cityList: [
            {
              text: "各类推广活动",
              value: "",
            },
            {
              text: "营销制作的采购",
              value: "",
            },
          ],
        },
      ],
      person: "",
      tableData: [],
      dialogFormVisible: false,
      dataList: [],
      audit: {
        supGuid: "",
        newUserGuid: "",
        supCategoryIds: [],
        supSubCategoryIds: [],
        cityId: [],
        businessDomain: "",
        auditDesc: "",
        fileId: "",
        citys: "",
        category: "",
        supSubCategory: "",
        supLevel: "集团",
      },
      str: "",
      loading: false,
      msg: false,
      currentPage: 1,
      page_size: 15,
      totalCount: 10,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    loginId() {
      return this.$route.params.loginId;
    },
  },
  created() {
    this.limit();
    this.getList();
    this.GetUserList();
    // this.GetTakeOnType();
  },
  methods: {
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
        .post("/api/FileUpload/AuditSupplierFile", formData)
        .then((res) => {
          if (res.data.success) {
            this.audit.fileId = res.data.returnValue1;
            this.$message.success(res.data.message);
          }
        })
        .catch((err) => {
          this.$message.warning(err.data.message);
        });
    },
    async GetTakeOnType() {
      // let res = await this.$http.get("/SupAudit/GetSupCateTagForAudit");
      // this.typeList = res.data;
      // this.supCateTags = res.data.item.split(",");
      // this.takeOnType = res.data.takeOnType.split(",");
      // this.limit();
    },
    /**
     * 打开分类选择
     */
    openCategoryTree() {
      this.$refs.categoryTree.open();
    },
    openSubCategoryTree() {
      this.$refs.subCategoryTree.open();
    },
    categoryTreeSelect(val) {
      let str = val.map((v) => v.cateName).toString();
      this.audit.category = str;
      // console.log(typeof this.category);
      this.audit.supCategoryIds = val.map((v) => {
        return v.id;
      });
    },
    subCategoryTreeSelect(val) {
      let str = val.map((v) => v.cateName).toString();
      this.audit.supSubCategory = str;
      this.audit.supSubCategoryIds = val.map((v) => {
        return v.id;
      });
    },
    //全选
    handleCheckAllChange(item) {
      item.checkList = item.checkAll ? item.cityList.map((v) => v.value) : [];
    },
    //单个选的时候
    handleCheckAllChange1(item) {
      if (item.cityList.length != item.checkList.length) {
        item.checkAll = false;
      }
    },
    posAdd() {
      this.dialogVisible = true;
      this.$http.get("/SysTreeCate/GetAddressListForSelect").then((res) => {
        let obj = [{ provinceName: "特殊城市", cityList: res.data.cityList }];
        this.typeMind = obj.concat(res.data.provinceList).map((v) => {
          return {
            ...v,
            checkAll: false,
            checkList: [],
          };
        });
        this.typeMind.forEach((e) => {
          e.checkList = e.cityList
            .filter((n) => {
              return this.audit.cityId.indexOf(n.value) != -1;
            })
            .map((v) => v.value);
        });
      });
    },
    posAdd1() {
      this.dialogVisible2 = true;
    },
    submitForm() {
      let arr = [];
      let arr1 = [];
      this.typeMind.forEach((item) => {
        item.checkList.forEach((v) => {
          arr.push(v);
        });
        item.cityList.forEach((v) => {
          arr1.push(v);
        });
      });

      if (arr.length > 10) {
        this.$message.warning("最多选十个！");
      } else {
        let arr2 = arr1
          .filter((n) => {
            return arr.indexOf(n.value) != -1;
          })
          .map((v) => v.text)
          .toString();
        console.log(arr);
        this.audit.cityId = arr;
        this.audit.citys = arr2;
        this.dialogVisible = false;
      }
      // console.log(arr2);
    },

    limit() {
      this.$http.get("/SupAudit/CheckUserAuditAuth", { params: { supGuid: this.id } }).then((res) => {
        this.msg = res.data.success ? true : false;
        // this.msg = true;
        if (this.msg) {
          this.$api.SupBaseInfo.GetOneSupBaseInfoById(this.id).then((res) => {
            this.audit.category = res.supCateNames;
            this.audit.supSubCategory = res.supSubCateNames;
            this.audit.supCategoryIds = res.supCategoryIds;
            this.audit.supSubCategoryIds = res.supSubCategoryIds;
            this.audit.businessDomain = res.businessDomain;
            this.audit.auditDesc = res.auditDesc;
            this.audit.cityId = res.authCityId;
            this.audit.citys = res.authCityName.toString();
            this.audit.newUserGuid = res.userGuid;
            this.audit.supLevel = res.supLevel;
          });
          // this.$http.get("/SupAudit/GetSupLevelEnum").then((res) => {
          //   console.log(res);
          // });
        }
      });
    },
    async getList() {
      // let obj = {
      //   supGuid: this.baseGuid,
      // };
      this.loading = true;
      let res = await this.$http.get("/SupAudit/GetSupplierAuditLog", { params: { supGuid: this.id } });
      if (res.status == 200) {
        this.loading = false;
        this.tableData = res.data;
      }
    },
    submitPub(formName, val, newUserGuid) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确认要" + val + "吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let obj = {
              supGuid: this.id,
              supAuditResult: val,
              newUserGuid,
              supCategoryIds: this.audit.supCategoryIds,
              supSubCategoryIds: this.audit.supSubCategoryIds,
              cityId: this.audit.cityId,
              businessDomain: this.audit.businessDomain,
              auditDesc: this.audit.auditDesc,
              fileId: this.audit.fileId,
              supLevel: this.audit.supLevel,
            };
            this.$http.post("/SupAudit/SubmitAuditResult", obj).then((res) => {
              if (res.data.success) {
                this.$message.success(res.data.message);
                this.getList();
                this.msg = false;
                this.limit();
                this.dialogFormVisible = false;
              } else {
                this.$message({ message: res.data.message, type: "error" });
              }
            });
          });
        }
      });
    },
    handleclick() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = true;
        }
      });
    },
    pass(formName, val, newUserGuid) {
      this.submitPub(formName, val, newUserGuid);
      // let category = this.audit.category;
      // let supSubCategory = this.audit.supSubCategory;
      // if (supSubCategory.indexOf(category) > -1) {
      //   this.$message({ message: "主营分类和副营分类不可重复", type: "warning" });
      // } else {
      // if (val == "驳回") {
      // if (!this.audit.auditDesc) {
      // this.$message({ message: "请在审批意见栏填写驳回原因！", type: "warning" });
      // } else {
      // this.submitPub(formName, val, newUserGuid);
      // }
      // } else if (val == "转发") {
      // this.submitPub(formName, val, newUserGuid);
      // } else {
      // this.submitPub(formName, val, newUserGuid);
      // }
      // }
    },

    // 获取列表
    async GetUserList() {
      const obj = {
        UserNameMobileEmail: this.person,
        SkipCount: (this.currentPage - 1) * this.page_size,
        MaxResultCount: this.page_size,
      };
      let res = await this.$http.get("/IdmUserInfo/GetUserList", {
        params: obj,
      });

      this.dataList = res.data.result.items;
      this.totalCount = res.data.result.totalCount;
    },
    pageChange(page) {
      this.page_size = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetUserList();
    },
    searchper() {
      this.GetUserList();
    },
  },
};
</script>
<style scoped>
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
  background-color: #f5f7fa;
}
::v-deep .el-input.is-disabled .el-input__inner {
  color: #333;
}
::v-deep .el-upload__tip {
  display: inline-block;
  margin-left: 10px;
}
::v-deep .el-collapse-item__content {
  padding-bottom: 25px;
  font-size: 13px;
  color: #303133;
  height: 68vh;
  overflow: auto;
  line-height: 1.769230769230769;
}
</style>
