<template>
  <el-main>
    <div class="">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="数据字典" name="数据字典"></el-tab-pane>
        <el-tab-pane label="供方分类" name="供方分类">
          <!-- <data-classify :type="0"></data-classify> -->
        </el-tab-pane>
        <!-- <el-tab-pane label="招标专业" name="招标专业"></el-tab-pane> -->
        <el-tab-pane label="供方资质" name="供方资质">
          <!-- <data-classify :type="1"></data-classify> -->
        </el-tab-pane>
        <el-tab-pane label="招标专业" name="招标专业">
          <!-- <data-classify :type="2"></data-classify> -->
        </el-tab-pane>
        <el-tab-pane label="地址信息" name="地址信息">
          <!-- <data-classify :type="3"></data-classify> -->
        </el-tab-pane>
        <el-tab-pane label="系统配置" name="系统配置">
          <!-- <data-deploy></data-deploy> -->
        </el-tab-pane>
        <el-tab-pane label="招采文件配置" name="招采文件配置">
          <!-- <data-file></data-file> -->
        </el-tab-pane>
        <el-tab-pane label="动态表单" name="动态表单">
          <!-- <dong-tai-form></dong-tai-form> -->
        </el-tab-pane>
        <!-- <el-tab-pane label="资格预审表单" name="资格预审表单"></el-tab-pane> -->
      </el-tabs>
      <div class="firft" v-if="activeName == '数据字典'">
        <div class="rolse">
          <el-aside width="230px">
            <div class="left">
              <div
                :style="{ background: indexactive == index ? '#409eff' : '#fff', color: indexactive == index ? '#FFF' : '' }"
                @click="clickLeft(item1, index)"
                class="item"
                v-for="(item1, index) in roleList1"
                :key="index"
              >
                {{ item1.text }}
              </div>
            </div>
          </el-aside>
          <el-main>
            <div class="right">
              <div class="top">
                <div class="left1">
                  <el-input v-model="content" style="margin-right: 10px" placeholder="请输入内容" clearable />
                  <el-button type="primary" size="small" @click="search(content)">搜索</el-button>
                </div>
                <div class="right1">
                  <el-button size="small" type="primary" @click="addRolses">新增参数</el-button>
                  <el-button size="small" type="primary" @click="saveRolses"> 保存排序</el-button>
                </div>
              </div>
              <el-table
                height="510"
                style="width: 100%"
                empty-text="暂无数据"
                stripe
                border
                element-loading-text="请稍候,数据正在加载中..."
                :data="tableData"
                v-loading="loading"
              >
                <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
                <!-- <el-table-column prop="cateModule" label="参数分类" align="center" width="140"> </el-table-column> -->
                <el-table-column prop="cateCode" label="参数编号" align="center" width="140"> </el-table-column>
                <el-table-column prop="cateName" label="名称" align="center"> </el-table-column>
                <el-table-column label="显示顺序" width="100" align="center" prop="cateOrder">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.cateOrder"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-edit" @click="edit(scope.row)" style="margin-right: 10px"></i>
                    <i class="el-icon-delete" @click="deletes(scope.row.id)"></i>
                  </template>
                </el-table-column>
              </el-table>
              <pagination :total="totalCount" :current-page="currentPage" :pageSize="pageSize" @pageChange="pageChange" />
            </div>
          </el-main>
        </div>
      </div>
    </div>
    <data-classify v-if="activeName == '供方分类'"></data-classify>
    <data-zizhi v-if="activeName == '供方资质'"></data-zizhi>
    <data-zhaozhuan v-if="activeName == '招标专业'"></data-zhaozhuan>
    <data-xinxi v-if="activeName == '地址信息'"></data-xinxi>
    <data-deploy v-if="activeName == '系统配置'"></data-deploy>
    <data-file v-if="activeName == '招采文件配置'"></data-file>
    <dong-tai-form v-if="activeName == '动态表单'"></dong-tai-form>
    <el-dialog width="60%" title="编辑" :visible.sync="dialogFormVisiblezidian">
      <el-form :model="zidian" ref="zidian" label-width="100px" size="small" class="m-3" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="参数编号" prop="cateCode">
              <el-input v-model="zidian.cateCode" placeholder="请输入参数编号"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="参数分类" prop="cateModule">
              <el-input v-model="zidian.cateModule" placeholder="请输入参数分类"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="名称" prop="cateName">
              <el-input v-model="zidian.cateName" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="cateOrder">
              <el-input
                v-model="zidian.cateOrder"
                placeholder="请输入显示顺序"
                oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="cateDesc">
              <el-input v-model="zidian.cateDesc" placeholder="请输入备注" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="right" style="margin-bottom: 20px">
            <el-button type="primary" size="small" @click="submitzidian('zidian')">保存</el-button>
            <el-button size="small" @click="dialogFormVisiblezidian = false">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog width="60%" title="新增" :visible.sync="dialogFormVisiblezidianxin">
      <el-form ref="zidian" label-width="100px" size="small" :model="zidian" class="m-3" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="参数编号" prop="cateCode">
              <el-input v-model="zidian.cateCode" placeholder="请输入参数编号"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="参数分类" prop="cateModule">
              <el-input v-model="zidian.cateModule" placeholder="请输入参数分类"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="名称" prop="cateName">
              <el-input v-model="zidian.cateName" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="cateOrder">
              <el-input
                v-model="zidian.cateOrder"
                placeholder="请输入显示顺序"
                oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="cateDesc">
              <el-input v-model="zidian.cateDesc" placeholder="请输入备注" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="right" style="margin-bottom: 20px">
            <el-button type="primary" size="small" @click="saveadd('zidian')">保存</el-button>
            <el-button size="small" @click="dialogFormVisiblezidianxin = false">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </el-main>
</template>
<script>
import DataClassify from "./dataClassify.vue";
import DataInquiry from "./dataInquiry";
export default {
  components: {
    DataInquiry,
    // sysLay: () => import("./sysLay.vue"),
    Pagination: () => import("@/components/Pagination.vue"),
    dataClassify: () => import("./dataClassify.vue"),
    dataDeploy: () => import("./dataDeploy.vue"),
    dataFile: () => import("./dataFile.vue"),
    dongTaiForm: () => import("./dongTaiForm.vue"),
    dataClassify: () => import("./dataClassify.vue"),
    dataZizhi: () => import("./dataZizhi.vue"),
    dataZhaozhuan: () => import("./dataZhaozhuan.vue"),
    dataXinxi: () => import("./dataXinxi.vue"),
    // dataInquiry: () => import("./dataInquiry.vue"),
  },
  data() {
    return {
      dialogFormVisiblezidian: false,
      dialogFormVisiblezidianxin: false,
      roleList1: [],
      activeName: "数据字典",
      indexactive: 0,
      content: "", //搜索内容
      contentlayout: "",
      tableData: [
        {
          id: "",
          parentId: "",
          cateCode: "",
          cateName: "",
          cateOrder: "",
          cateDesc: "",
          cateModule: "",
        },
      ],
      value: "",
      optionValue: "",
      options: [],
      zidian: {
        id: "",
        // treeCateType: "",
        parentId: "",
        cateCode: "",
        cateName: "",
        cateOrder: "",
        cateDesc: "",
        // cateModule: "",
      },
      tableData1: [
        {
          sysConfigCate: "",
          configValue: "",
          isEnable: "",
          // CateName: '',
        },
      ],
      orderList: [],
      items: "",
      loading: false,
      isEnable: "",
      pageSize: 15,
      currentPage: 1,
      totalCount: 0,
      rules: {
        cateCode: { required: true, message: "请输入参数编号", trigger: "blur" },
        cateName: { required: true, message: "请输入名称", trigger: "blur" },
        cateOrder: { required: true, message: "请输入显示顺序", trigger: "blur" },
        // cateModule: { required: true, message: "请输入参数分类", trigger: "blur" },
      },
    };
  },
  created() {
    // this.getList1();
    // this.getListClassify();
    // this.getListAptitude();
    // this.getListAddress();
  },
  mounted() {
    this.GetSysTreeCateType();
  },
  methods: {
    handleClick(e) {
      // this.GetList();
    },
    async GetSysTreeCateType() {
      let res = await this.$http.get("/SysTreeCate/GetSysTreeCateType");
      this.roleList1 = res.data;
      this.value = res.data.length > 0 ? res.data[0].text : "";
      this.GetList();
    },
    // async getListClassify() {
    //   let obj = {
    //     // TreeCateType: this.value,
    //     // SkipCount: (this.currentPage - 1) * this.pageSize,
    //     // MaxResultCount: this.pageSize,
    //   };
    //   this.loading = true;
    //   let res = await this.$http.get("/SupplierTree/GetSupplierCategoryTree", { params: obj });
    //   if (res.status == 200) {
    //     this.loading = false;
    //     this.tableDataclassify = res.data;
    //     // this.totalCount = res.data.result.totalCount;
    //     // this.tableDataclassify = res.data.result.items.map(item => {
    //     //   return {
    //     //     id: item.id,
    //     //     parentId: item.parentId,
    //     //   };
    //     // });
    //   }
    // },
    // async getListAptitude() {
    //   let obj = {
    //     id: this.id,
    //     parentId: this.parentId,
    //   };
    //   this.loading = true;
    //   let res = await this.$http.get("/SupplierTree/GetSupplierCertificateTree", { params: obj });
    //   if (res.status == 200) {
    //     this.loading = false;
    //     this.tableDataAptitude = res.data;
    //   }
    // },
    // async getListAddress() {
    //   let obj = {
    //     id: this.id,
    //     parentId: this.parentId,
    //   };
    //   this.loading = true;
    //   let res = await this.$http.get("/SysTreeCate/GetAddressTree", { params: obj });
    //   if (res.status == 200) {
    //     this.loading = false;
    //     this.tableDataAddress = res.data;
    //   }
    // },
    async GetList() {
      let obj = {
        TreeCateType: this.value,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
        CateName: this.content,
        id: this.id,
        parentId: this.parentId,
      };
      this.loading = true;
      let res = await this.$http.get("/SysTreeCate/GetList", { params: obj });
      if (res.status == 200) {
        this.loading = false;
        this.tableData = res.data.result.items;
        this.totalCount = res.data.result.totalCount;
        this.orderList = res.data.result.items.map((item) => {
          return {
            id: item.id,
            cateOrder: item.cateOrder,
          };
        });
      }
    },
    async GetTempReportDowns() {
      let res = await this.$http.get("/SysConfig/GetCateNameDorpDown");
      console.log(res);
      this.value = res.data.length > 0 ? res.data[0].value : "";
      this.options = res.data;
      this.getList1();
    },
    getList1() {
      let obj = {
        CateName: this.CateName,
        SysConfigCate: this.value == "请选择" ? "" : this.value,
        SkipCount: "0",
        MaxResultCount: "9999",
      };
      this.loading = true;
      this.$http.get("/SysConfig/GetSysConfigList", { params: obj }).then((res) => {
        if (res.status == 200) {
          this.loading = false;
          this.tableData1 = res.data;
        }
      });
    },
    async search1() {
      await this.getsearch(this.CateName);
    },
    async getsearch(CateName) {
      this.loading = true;
      this.getList1();
      this.tableData1 = res.data;
    },
    addRolses(opt) {
      this.dialogFormVisiblezidianxin = true;
      this.$nextTick(() => {
        this.$refs.zidian.clearValidate();
      });
      this.zidian = {
        id: "",
        // parentId: "00000000-0000-0000-0000-000000000000",
        cateCode: "",
        cateName: "",
        cateOrder: "",
        cateDesc: "",
        treeCateType: this.value,
        // cateModule: "",
      };
    },
    // addRolses(){},
    saveadd() {
      this.$refs.zidian.validate((valid) => {
        if (valid) {
          this.$http
            .post("/SysTreeCate/SaveDictionary", {
              ...this.zidian,
            })
            .then((res) => {
              if (res.status == 200) {
                this.$message.success(res.data.message);
                this.dialogFormVisiblezidianxin = false;
                this.GetList();
              } else {
                this.$message.error(res.data.message);
              }
              // ? this.$message.success(res.message || res.data.message)
              // : this.$message.error(res.message || res.data.message);
            });
        }
      });
    },
    edit(opt) {
      this.dialogFormVisiblezidian = true;
      this.zidian.id = opt.id;
      this.zidian.parentId = opt.parentId;
      this.zidian.cateCode = opt.cateCode;
      this.zidian.cateName = opt.cateName;
      this.zidian.cateOrder = opt.cateOrder;
      this.zidian.cateDesc = opt.cateDesc;
      // this.zidian.cateModule = opt.cateModule;
      this.$http.get("/SysTreeCate/GetOneById", {
        params: {
          id: opt.id,
        },
      });
    },
    submitzidian() {
      this.$refs.zidian.validate((valid) => {
        if (valid) {
          this.$http
            .post("/SysTreeCate/SaveDictionary", {
              ...this.zidian,
            })
            .then((res) => {
              res.status == 200
                ? this.$message.success(res.message || res.data.message)
                : this.$message.error(res.message || res.data.message);
              this.dialogFormVisiblezidian = false;
              this.GetList();
            });
        }
      });
    },
    submit(row) {
      const obj = {
        id: row.id,
        isEnable: row.isEnable,
        configValue: row.configValue,
      };
      this.$http.post("/SysConfig/SaveSysConfigValue", obj).then((res) => {
        if (res.data.success) {
          this.$message.success("保存成功");
          this.getList1();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // async SaveOrder() {
    //   let obj = this.orderList;
    //   let res = await this.$http.post("/SysTreeCate/SaveOrder", obj);
    //   this.GetList();
    // },
    pageChange(page) {
      this.pageSize = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetList();
    },
    clickLeft(item1, index) {
      this.indexactive = index;
      this.value = item1.text;
      this.GetList();
    },
    search(val) {
      this.GetList();
    },
    handleChange(val) {
      this.value = val;
      this.getList1();
    },
    // saveRolses(val) {
    //   this.SaveOrder();
    // },
    /**
     * 保存排序
     */
    async saveRolses() {
      try {
        const arr = this.tableData.map((item) => {
          return {
            id: item.id,
            cateOrder: item.cateOrder,
          };
        });
        await this.$http.post("/SysTreeCate/SaveOrder", arr);
        this.$message.success("保存排序成功");
        await this.GetList();
      } catch (e) {
        this.$message.error(e.data.message);
      }
    },
    deletes(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SysTreeCate/DeleteById", { id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.GetList();
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.rolse {
  height: 620px;
  margin-bottom: 90px;
  display: flex;
  flex-flow: row; /*伸缩项目单行排列*/
  // overflow: auto;
  .left {
    width: 230px;
    height: auto;
    border: 1px solid #ccc;
    .item {
      width: 100%;
      height: 40px;
      display: flex;
      /*实现垂直居中*/
      align-items: center;
      /*实现水平居中*/
      justify-content: center;
      text-align: justify;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      //   font-weight: 550;
      font-size: 14px;
    }
  }
  .right {
    width: auto;
    height: 100%;
    border: 1px solid #ccc;
    flex: 1;
    // overflow: auto;
    margin-left: 10px;
    .top {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .left1 {
        padding-left: 20px;
        display: flex;
      }
      .right1 {
        padding-right: 10px;
      }
    }
  }
}
</style>
