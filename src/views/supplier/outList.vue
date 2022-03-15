<template>
  <el-main>
    <el-row>
      <!-- <el-row id="page_main" style="display: flex"> -->
      <!-- <el-col :span="4">
        <kind-nav @itemClick="onChangeKind" />
      </el-col> -->
      <el-card>
        <el-col>
          <!-- <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>供方信息</el-breadcrumb-item>
          <el-breadcrumb-item>未入库供方</el-breadcrumb-item>
        </el-breadcrumb> -->
          <el-form label-position="top" label-width="120px" :model="formSearch" size="small">
            <el-row :gutter="8">
              <el-col :span="3">
                <!-- <el-form-item label="企业名称："> -->
                <el-input v-model="formSearch.ComShortName" placeholder="供方名称"></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <!-- <el-col :span="8">
              <el-form-item label="承接主体名称：">
                <el-input v-model="formSearch.ComMainName"></el-input>
              </el-form-item>
            </el-col> -->
              <!-- <el-col :span="3">
                <el-form-item label="业务区域：">
                <el-select v-model="formSearch.BusinessArea">
                  <el-option label="业务区域" value=""></el-option>
                  <el-option
                    v-for="item in dropDownGroup.businessAreas"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="3">
                <el-form-item label="供应商类型：">
                <el-select v-model="formSearch.BusinessCate">
                  <el-option label="供方类型" value=""></el-option>
                  <el-option
                    v-for="item in dropDownGroup.businessCates"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="3">
                <!-- <el-form-item label="供方状态："> -->
                <el-select v-model="formSearch.CooperStatus">
                  <el-option label="供方状态" value=""></el-option>
                  <el-option v-for="item in auditUserList1" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="供方来源："> -->
                <el-select v-model="formSearch.SupplierFrom">
                  <el-option label="供方来源" value=""></el-option>
                  <el-option
                    v-for="item in dropDownGroup.supplierFrom"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <!-- <el-col :span="3"> -->
              <!-- <el-form-item label="总部所在省："> -->
              <!-- <el-select v-model="formSearch.Province" @change="loadCity">
                  <el-option label="总部所在省" value=""></el-option>
                  <el-option v-for="item in province" :key="item.cateName" :label="item.cateName" :value="item.cateName"> </el-option>
                </el-select> -->
              <!-- </el-form-item> -->
              <!-- </el-col> -->
              <el-col :span="3">
                <el-input v-model="formSearch.City" placeholder="总部所在市"></el-input>
                <!-- <el-form-item label="总部所在市：	"> -->
                <!-- <el-select v-model="formSearch.City">
                  <el-option label="总部所在市" value=""></el-option>
                  <el-option v-for="item in city" :key="item.cateName" :label="item.cateName" :value="item.cateName"> </el-option>
                </el-select> -->
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="审批权限："> -->
                <el-select v-model="formSearch.MyAuthFlag">
                  <el-option label="审批权限" value=""></el-option>
                  <el-option label="我审核的" value="true"> </el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="纳税人类型："> -->
                <el-select v-model="formSearch.SupTaxType">
                  <el-option label="纳税人类型" value=""></el-option>
                  <el-option v-for="item in dropDownGroup.supTaxType" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="供方分类："> -->
                <el-input
                  v-model.trim="formSearch.SupCateNames"
                  clearable
                  style="color: #333"
                  placeholder="供方分类"
                  @focus="openCategoryTree"
                >
                </el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="企业性质："> -->
                <el-select v-model="formSearch.CompanyType">
                  <el-option label="供方性质" value=""></el-option>
                  <el-option
                    v-for="item in dropDownGroup.companyTypes"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
            </el-row>
            <el-row :gutter="12" style="margin-top: 10px">
              <!--            <el-col :span="8">-->
              <!--              <el-form-item label="副营分类：">-->
              <!--                <el-input v-model="formSearch.SupSubCateNames"></el-input>-->
              <!--              </el-form-item>-->
              <!--            </el-col>-->

              <el-col :span="6">
                <!-- <el-form-item label="注册资金："> -->
                <el-row :gutter="9">
                  <el-col :span="11"><el-input v-model="formSearch.RegCapitalMin" placeholder="注册资金(小值)"></el-input></el-col>
                  <el-col :span="2"><div style="line-height: 35px">-</div></el-col>
                  <el-col :span="11"><el-input v-model="formSearch.RegCapitalMax" placeholder="注册资金(大值)"></el-input></el-col>
                  <!-- <el-col :span="8">
                    <el-select v-model="formSearch.RegCapitalType">
                      <el-option label="单位" value=""></el-option>
                      <el-option
                        v-for="item in dropDownGroup.regCapitalType"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col> -->
                </el-row>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <el-input
                  placeholder="请选择注册区域"
                  style="width: 100%"
                  v-model.trim="formSearch.orgName"
                  @focus="$refs.subJectTree.open()"
                ></el-input>
                <!-- <el-form-item label="审核人："> -->
                <!-- <el-select v-model="formSearch.AuditUserGuid" placeholder="审核人">
                  <el-option label="审核人" value=""></el-option>
                  <el-option v-for="(item, index) in auditUserList" :key="index" :label="item.userName" :value="item.userGuid"></el-option>
                </el-select> -->
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="审核人："> -->
                <el-select v-model="formSearch.CooperStatus" placeholder="考察结果" @change="onSubmit">
                  <el-option label="考察结果" value=""></el-option>
                  <el-option label="未提交" value="未提交"></el-option>
                  <el-option label="未审核" value="未审核"></el-option>
                  <el-option label="待考察" value="待考察"></el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="营业范围："> -->
                <el-input v-model="formSearch.BusinessDomain" placeholder="营业范围"></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="9">
                <el-button style="float: right; margin-left: 10px" type="primary" size="small" @click="onSubmitsearch(1)">搜索</el-button>
                <el-button style="float: right" type="primary" size="small" @click="onSubmitsearch(0)">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            style="margin-top: 10px"
            empty-text="无符合条件的记录"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
          >
            <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
            <el-table-column align="left" prop="comFullName" label="供方名称" fixed min-width="450">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  style="margin-left: 10px; color: #409eff; text-decoration: none"
                  @click="jumpSuppInfo(scope.row.id)"
                  >{{ scope.row.comFullName }}</el-link
                >
              </template>
            </el-table-column>
            <!-- <el-table-column prop="comMainName" label="承接主体名称" width="450">
            <template slot-scope="scope">
              <i class="el-icon-search"></i>
              <el-link type="primary" style="margin-left: 10px;color:#409eff;text-decoration: none" @click="jumpSuppInfo(scope.row.id)">{{
                scope.row.comMainName
              }}</el-link>
            </template>
          </el-table-column> -->
            <el-table-column label="注册机构" width="120" align="center" show-overflow-tooltip>
              <template slot-scope="scope"> {{ scope.row.orgName }}</template>
            </el-table-column>
            <el-table-column prop="supCateNames" width="220" label="供方分类" align="center"></el-table-column>
            <el-table-column label="供方来源" width="120" align="center" show-overflow-tooltip>
              <template slot-scope="scope"> {{ scope.row.supplierFrom }}</template>
            </el-table-column>
            <el-table-column prop="auditUserName" width="100" label="审核人" align="center"></el-table-column>
            <el-table-column prop="regStatus" width="120" label="供方状态" align="center"></el-table-column>
            <el-table-column label="操作" width="100" align="center" fixed="right">
              <template slot-scope="scope">
                <i class="el-icon-delete" @click="deletes(scope.row.id)" v-if="scope.row.isEditUser"></i>
                <i class="el-icon-edit" @click="edit(scope.row)" style="margin-left: 10px" v-if="scope.row.isEditUser"></i>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination-detail"
            background
            prev-text="上一页"
            next-text="下一页"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.index"
            :page-sizes="[10, 15, 20]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next"
            :total="page.total"
          >
          </el-pagination>
        </el-col>
      </el-card>
    </el-row>
    <category-tree ref="categoryTree" @select="categoryTreeSelect" :max="1"></category-tree>
    <subJectTree title="项目" :level="1" ref="subJectTree" :fromType="'zhaobiao'" @itemClick="subJectTree"></subJectTree>
  </el-main>
</template>
<script>
export default {
  components: {
    KindNav: () => import("./components/KindNav"),
    CategoryTree: () => import("@/views/supplier/components/CategoryTreeOne"),
    subJectTree: () => import("./components/subJectTreeZc"),
  },
  data() {
    return {
      userGuid: "",
      dropDownGroup: {},
      province: [],
      city: [],
      auditUserList: [],
      auditUserList1: [
        { text: "未提交", value: "未提交" },
        { text: "待考察", value: "待考察" },
        { text: "考察合格", value: "考察合格" },
        { text: "考察不合格", value: "考察不合格" },
      ],
      formSearch: {
        MyAuthFlag: "",
        AuditUserGuid: "",
        ComShortName: "",
        ComMainName: "",
        comMainName: "",
        BusinessArea: "",
        BusinessCate: "",
        BusinessDomain: "",
        Province: "",
        City: "",
        SupTaxType: "",
        SupCateNames: "",
        SupSubCateNames: "",
        SupSubCateName: "",
        CompanyType: "",
        RegCapitalMax: "",
        RegCapitalMin: "",
        RegCapitalType: "",
        SupplyType: "",
        Brand: "",
        CooperStatus: "",
        RegStatus: "",
        SupplierFrom: "",
        CooperStatus: "",
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      tableData: [],
      loading: false,
    };
  },
  created() {
    this.loadQueryForm();
    this.userGuid = localStorage.getItem("userGuid");
    this.GetAuditUserList();
  },
  methods: {
    GetAuditUserList() {
      let obj = {
        auditType: "供方入库审批人",
      };
      this.$http.get("/SupAuditUser/GetAuditUserList", { params: obj }).then((res) => {
        this.auditUserList = Array.from(new Set(res.data));
      });
    },
    subJectTree(sub) {
      this.formSearch.orgName = sub.comName;
      this.$refs.subJectTree.close();
      this.onSubmit();
    },
    loadQueryForm() {
      this.$http.get("/SupBaseInfo/GetBaseInfoDropDown").then((res) => {
        this.dropDownGroup = res.data;
        this.onSubmit();
      });
    },
    /**
     * 打开分类选择
     */
    openCategoryTree() {
      this.$refs.categoryTree.open([]);
    },
    categoryTreeSelect(val) {
      let str = val.map((v) => v.cateName).toString();
      this.formSearch.SupCateNames = str;
      this.onSubmit();
    },
    onSubmitsearch(i) {
      if (i == 1) {
        this.page.index = 1;
        this.onSubmit();
      } else {
        for (let item in this.formSearch) {
          this.formSearch[item] = "";
        }
      }
    },
    onSubmit() {
      let that = this;
      this.loading = true;
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      // console.log(this.formSearch.SupplierFrom);
      // this.$api.SupBaseInfo.SupplierStockOutList(this.formSearch, this.page.index, this.page.size)
      this.$http
        .get("/SupBaseInfo/SupplierOtherList", { params: this.formSearch })
        .then((res) => {
          that.page.total = res.data.result.totalCount;
          that.tableData = res.data.result.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onChangeKind(kind) {
      this.formSearch.SupCateNames = kind;
      this.onSubmit();
    },
    jumpSuppInfo(id) {
      this.$router.push({ path: `/supplier/detail/${id}`, query: { istodo: true } });
      // let routeData = this.$router.resolve({ path: `/supplier/detail/${id}`, query: { istodo: true } });
      // window.open(routeData.href, "_blank");
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.onSubmit();
    },
    handleCurrentChange(val) {
      this.page.index = val;
      this.onSubmit();
    },
    edit(row) {
      this.$router.push({
        path: "./specialedit",
        query: {
          id: row.id,
          //   comFullName: row.comFullName,
          //  comMainName: row.comMainName,
          //  comShortName: row.comShortName,
          //  id: row.id,
          //  supCateNames:row.supCateNames,
          //  supCateTags: row.supCateTags
        },
      });
    },
    /**
     * 加载省
     */
    // loadProvince() {
    //   this.$api.SupBaseInfo.GetAddress("").then((res) => {
    //     this.province = res;
    //   });
    // },
    /**
     * 加载市
     */
    // loadCity(province) {
    //   this.page.index = 1;
    //   //获取省份id
    //   let provinceId = "";
    //   this.province.forEach((item) => {
    //     if (item.cateName === province) {
    //       provinceId = item.id;
    //     }
    //   });
    //   if (provinceId) {
    //     this.$api.SupBaseInfo.GetAddress(provinceId).then((res) => {
    //       this.city = res;
    //     });
    //   } else {
    //     this.city = [];
    //   }
    // },
    deletes(id) {
      this.$confirm("删除后将不能恢复，确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupBaseInfo/DeleteUserRegInfo", { id: id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.onSubmit();
        });
      });
    },
  },
};
</script>

<style scoped>
.el-select {
  width: 100%;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
.el-link.is-underline:hover:after {
  border-bottom: 0px solid #ffffff;
}
</style>
