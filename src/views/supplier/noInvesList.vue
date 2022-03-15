<template>
  <el-main>
    <el-row style="display: flex">
      <!-- <el-col :span="4"> <kind-nav @itemClick="onChangeKind" /></el-col> -->
      <el-card class="box-card" shadow="never" :body-style="{ padding: '15px 15px 0 15px' }">
        <el-col style="padding: 0 10px">
          <!-- <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>供方信息</el-breadcrumb-item>
          <el-breadcrumb-item>已入库供方</el-breadcrumb-item>
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
                  <el-option
                    v-for="item in dropDownGroup.cooperStatus"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
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
              <el-col :span="3">
                <!-- <el-form-item label="总部所在省："> -->
                <el-select v-model="formSearch.Province" @change="loadCity">
                  <el-option label="总部所在省" value=""></el-option>
                  <el-option v-for="item in province" :key="item.cateName" :label="item.cateName" :value="item.cateName"> </el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="总部所在市：	"> -->
                <el-select v-model="formSearch.City">
                  <el-option label="总部所在市" value=""></el-option>
                  <el-option v-for="item in city" :key="item.cateName" :label="item.cateName" :value="item.cateName"> </el-option>
                </el-select>
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
            </el-row>
            <el-row :gutter="12" style="margin-top: 10px">
              <!--            <el-col :span="8">-->
              <!--              <el-form-item label="副营分类：">-->
              <!--                <el-input v-model="formSearch.SupSubCateNames"></el-input>-->
              <!--              </el-form-item>-->
              <!--            </el-col>-->
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
              <el-col :span="6">
                <!-- <el-form-item label="注册资金："> -->
                <el-row :gutter="9">
                  <el-col :span="7"><el-input v-model="formSearch.RegCapitalMin" placeholder="注册资金(小值)"></el-input></el-col>
                  <el-col :span="1">-</el-col>
                  <el-col :span="7"><el-input v-model="formSearch.RegCapitalMax" placeholder="注册资金(大值)"></el-input></el-col>
                  <el-col :span="8">
                    <el-select v-model="formSearch.RegCapitalType">
                      <el-option label="单位" value=""></el-option>
                      <el-option
                        v-for="item in dropDownGroup.regCapitalType"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="审核人："> -->
                <el-select v-model="formSearch.AuditUserGuid" placeholder="审核人">
                  <el-option label="审核人" value=""></el-option>
                  <el-option v-for="(item, index) in auditUserList" :key="index" :label="item.userName" :value="item.userGuid"></el-option>
                </el-select>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3">
                <!-- <el-form-item label="营业范围："> -->
                <el-input v-model="formSearch.BusinessDomain" placeholder="营业范围"></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="9">
                <el-button style="float: right" type="primary" size="small" @click="onSubmitsearch">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!-- <el-row class="float-right mb-1 mt-1">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="showAdvans = !showAdvans">{{
              showAdvans ? "隐藏高级搜索" : "高级搜索"
            }}</el-button>
            
          </el-col>
        </el-row> -->
          <el-table
            style="margin-top: 10px"
            empty-text="无符合条件的记录"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
            v-loading="loading"
          >
            <el-table-column type="index" width="80" label="序号" align="center" fixed> </el-table-column>
            <el-table-column align="left" prop="comFullName" label="供方名称" fixed min-width="300px">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  style="margin-left: 10px; color: #409eff; text-decoration: none"
                  @click="jumpSuppInfo(scope.row.id)"
                  >{{ scope.row.comFullName }}</el-link
                >
              </template>
            </el-table-column>
            <!-- <el-table-column prop="" label="承接主体名称" width="300px">
            <template slot-scope="scope">
              <i class="el-icon-searchcomMainName"></i>
              <el-link type="primary" style="margin-left: 10px;color:#409eff;text-decoration: none" @click="jumpSuppInfo(scope.row.id)">{{
                scope.row.comMainName
              }}</el-link>
            </template>
          </el-table-column> -->
            <el-table-column show-overflow-tooltip label="注册机构" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.orgName }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="供方分类" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.supCateNames }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="supCateNames" label="专业分类"> </el-table-column>
          <el-table-column label="合作项目">
            <template>联东U谷·科创中心</template>
          </el-table-column> -->

            <!--          <el-table-column prop="supSubCateNames" label="副营分类"> </el-table-column>-->
            <el-table-column label="注册资金" align="center">
              <template slot-scope="scope"> {{ scope.row.regCapital + scope.row.regCapitalType }}</template>
            </el-table-column>
            <el-table-column label="合作状态" align="center">
              <template slot-scope="scope"> {{ scope.row.cooperStatus }}</template>
            </el-table-column>
            <!-- <el-table-column label="履约评价" width="120" align="center">
            <template slot-scope="scope"> {{ scope.row.zgCount }}</template>
          </el-table-column>
          <el-table-column label="考察次数" width="80" align="center">
            <template slot-scope="scope"> {{ scope.row.kcCount }}</template>
          </el-table-column>
          <el-table-column label="投标次数" width="80" align="center">
            <template slot-scope="scope"> {{ scope.row.bidCount }}</template>
          </el-table-column>
          <el-table-column label="中标次数" width="80" align="center">
            <template slot-scope="scope"> {{ scope.row.winCount }}</template>
          </el-table-column>
          <el-table-column label="评估次数" width="80" align="center">
            <template slot-scope="scope"> {{ scope.row.evalCount }}</template>
          </el-table-column> -->
            <el-table-column label="注册时间" align="center">
              <template slot-scope="scope"> {{ scope.row.creationTime }}</template>
            </el-table-column>
            <!-- <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope"> -->
            <!--<i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />-->
            <!-- <i v-if="!scope.row.haveSubCompany" @click="handleEdit(scope.row)" class="el-icon-open" title="开启资格预审" style="margin-left:15px" /> -->
            <!--
            </template>
          </el-table-column> -->
          </el-table>
          <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
        </el-col>
      </el-card>
    </el-row>
    <category-tree ref="categoryTree" @select="categoryTreeSelect" :max="1"></category-tree>
  </el-main>
</template>
<script>
export default {
  components: {
    KindNav: () => import("./components/KindNav"),
    Pagination: () => import("@/components/Pagination.vue"),
    CategoryTree: () => import("@/views/supplier/components/CategoryTreeOne"),
  },
  data() {
    return {
      showAdvans: false,
      auditUserList: [],
      dropDownGroup: {},
      province: [],
      city: [],
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
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.onSubmit();
    },
    loadQueryForm() {
      this.loadProvince();
      this.$api.SupBaseInfo.GetBaseInfoDropDown(this.formSearch, this.page.index, this.page.size).then((res) => {
        this.dropDownGroup = res;
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
    /**
     * 加载省
     */
    loadProvince() {
      this.$api.SupBaseInfo.GetAddress("").then((res) => {
        this.province = res;
      });
    },

    /**
     * 加载市
     */
    loadCity(province) {
      this.page.index = 1;
      //获取省份id
      let provinceId = "";
      this.province.forEach((item) => {
        if (item.cateName === province) {
          provinceId = item.id;
        }
      });
      if (provinceId) {
        this.$api.SupBaseInfo.GetAddress(provinceId).then((res) => {
          this.city = res;
        });
      } else {
        this.city = [];
      }
    },
    onSubmitsearch() {
      this.page.index = 1;
      this.onSubmit();
    },
    onSubmit() {
      if (this.loading) {
        return;
      }
      this.tableData = [];
      let that = this;
      this.loading = true;
      console.log(this.formSearch);
      this.$api.SupBaseInfo.SupplierToBeInvestigatedList(this.formSearch, this.page.index, this.page.size)
        .then((res) => {
          console.log(res);
          that.page.total = res.totalCount;
          that.tableData = res.items;
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
      window.open(`#/supplier/detail/${id}`);
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
