<template>
  <div>
    <el-row id="page_main">
      <!--<el-col :span="4"> <kind-nav @itemClick="onChangeKind"/></el-col>-->
      <el-col :span="24" style="margin-bottom: 50px">
        <!-- <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>供方信息</el-breadcrumb-item>
          <el-breadcrumb-item>已入库供方</el-breadcrumb-item>
        </el-breadcrumb> -->
        <el-form label-position="right" label-width="200px" :model="formSearch" size="small" class="border p-2 mt-0">
          <el-row>
            <el-col :span="12">
              <el-form-item label="供方名称或承接主体名称：">
                <el-input v-model="formSearch.ComShortName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: 10px">
              <!--<el-button type="primary" size="small" @click="showAdvans = !showAdvans">{{-->
              <!--showAdvans ? "隐藏高级搜索" : "高级搜索"-->
              <!--}}</el-button>-->
              <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!--<el-row class="float-right mb-1 mt-1">-->
        <!---->
        <!--</el-row>-->
        <el-table
          empty-text="无符合条件的记录"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tableData"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column prop="comFullName" label="供方名称">
            <template slot-scope="scope">
              <!-- <i class="el-icon-search"></i> -->
              <el-link type="primary" @click="jumpSuppInfo(scope.row.id)">{{ scope.row.comFullName }}</el-link>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="comMainName" label="承接主体名称"> </el-table-column> -->
          <el-table-column prop="supCateNames" label="供方分类"> </el-table-column>
          <!--<el-table-column prop="supSubCateNames" label="副营分类"> </el-table-column>-->
          <!--<el-table-column label="注册资金" width="100">-->
          <!--<template slot-scope="scope"> {{ scope.row.regCapital+scope.row.regCapitalType }}</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="总部地区" width="150">-->
          <!--<template slot-scope="scope"> {{ `${scope.row.province?scope.row.province:''}${-->
          <!--scope.row.city?scope.row.city:''}` }}</template>-->
          <!--</el-table-column>-->
          <el-table-column label="选择" align="center" width="80">
            <template slot-scope="scope">
              <i @click="add(scope.row)" class="el-icon-success" title="添加" style="margin-left: 5px" />
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
//import KindNav from "../../supplier/components/KindNav";
export default {
  components: {
    //KindNav,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      showAdvans: false,
      dropDownGroup: {},
      province: [],
      city: [],
      formSearch: {
        ComShortName: "",
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
  },
  methods: {
    add(row) {
      this.$emit("itemClick", row);
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
    onSubmit() {
      if (this.loading) {
        return;
      }
      this.tableData = [];
      let that = this;
      this.loading = true;
      console.log(this.formSearch);
      this.$api.SupBaseInfo.SupplierAuthStockInList(this.formSearch, this.page.index, this.page.size)
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
</style>
