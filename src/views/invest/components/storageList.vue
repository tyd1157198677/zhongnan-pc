<template>
  <el-row>
    <el-col :span="24">
      <el-form label-width="120px" :model="formSearch" size="small" class="border p-2 mt-0">
        <el-row :gutter="10">
          <el-col :span="7">
            <el-form-item label="供方名称：">
              <el-input v-model="formSearch.ComShortName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="总部所在市：	">
              <el-input v-model="formSearch.City"></el-input>
              <!-- <el-select v-model="formSearch.City">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in city" :key="item.cateName" :label="item.cateName" :value="item.cateName"> </el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="供应商类型：">
              <el-select v-model="formSearch.BusinessCate">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in dropDownGroup.businessCates" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3" class="text-left">
            <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
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
        v-loading="loading"
      >
        <!--<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>-->
        <el-table-column prop="comFullName" label="供方名称" width="300">
          <template slot-scope="scope">
            <!-- <i class="el-icon-search"></i> -->
            <el-link type="primary" @click="jumpSuppInfo(scope.row.id)">{{ scope.row.comFullName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="supCateNames" label="主营分类"> </el-table-column>
        <el-table-column prop="supSubCateNames" label="副营分类"> </el-table-column>
        <el-table-column label="注册资金" width="100">
          <template slot-scope="scope"> {{ scope.row.regCapital + scope.row.regCapitalType }}</template>
        </el-table-column>
        <el-table-column label="总部地区" width="150">
          <template slot-scope="scope">
            {{ `${scope.row.province ? scope.row.province : ""}${scope.row.city ? scope.row.city : ""}` }}</template
          >
        </el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <i @click="add(scope.row)" class="el-icon-circle-plus" title="添加" style="margin-left: 5px" />
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
    </el-col>
  </el-row>
</template>
<script>
//import KindNav from "../../supplier/components/KindNav";
export default {
  props: ["type", "purchaseType"],
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
        PurchaseType: "",
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
      if (this.type == 1) {
        this.$emit("itemClick", row);
      } else {
        this.$emit("itemClick", row.id);
      }
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
      this.tableData = [];
      let that = this;
      this.loading = true;
      this.formSearch.PurchaseType = this.purchaseType;
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

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
::v-deep .el-dialog__body {
  padding-top: 0px !important;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
</style>
