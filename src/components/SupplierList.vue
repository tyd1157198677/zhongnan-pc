<template>
  <!-- <el-main> -->
  <el-row>
    <el-col :span="24">
      <el-form label-position="right" label-width="200px" :model="formSearch" size="small" class="border p-2 mt-2">
        <el-row>
          <el-col :span="12">
            <el-form-item label="供方名称：">
              <el-input v-model="formSearch.ComShortName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-button type="primary" size="small" @click="onSubmit" style="margin-left: 10px">搜索</el-button>
          </el-col>
          <!--<el-col :span="8">-->
          <!--<el-form-item label="业务区域：">-->
          <!--<el-select v-model="formSearch.BusinessArea">-->
          <!--<el-option label="全部" value=""></el-option>-->
          <!--<el-option-->
          <!--v-for="item in dropDownGroup.businessAreas"-->
          <!--:key="item.value"-->
          <!--:label="item.text"-->
          <!--:value="item.value"-->
          <!--&gt;</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
          <!--<el-form-item label="供应商类型：">-->
          <!--<el-select v-model="formSearch.BusinessCate">-->
          <!--<el-option label="全部" value=""></el-option>-->
          <!--<el-option-->
          <!--v-for="item in dropDownGroup.businessCates"-->
          <!--:key="item.value"-->
          <!--:label="item.text"-->
          <!--:value="item.value"-->
          <!--&gt;</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
        </el-row>
      </el-form>
      <!--<el-row class="float-right mb-1 mt-1">-->
      <!--<el-col :span="24">-->
      <!--<el-button type="primary" size="small" @click="onSubmit">搜索</el-button>-->
      <!--</el-col>-->
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
        <el-table-column prop="comFullName" label="供方名称"></el-table-column>
        <!-- <el-table-column prop="comMainName" label="承接主体名称"> </el-table-column> -->
        <el-table-column prop="cooperStatus" width="120" label="供方状态" align="center"> </el-table-column>
        <!--<el-table-column prop="businessArea" label="业务区域" width="100" align="center"> </el-table-column>-->
        <!--<el-table-column label="注册资金" width="120">-->
        <!--<template slot-scope="scope"> {{ scope.row.regCapital + scope.row.regCapitalType }}</template>-->
        <!--</el-table-column>-->
        <el-table-column label="选择" width="90" align="center">
          <template slot-scope="scope">
            <i class="el-icon-circle-check" title="选择" @click="selectSup(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
    </el-col>
  </el-row>
  <!-- </el-main> -->
</template>
<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  props: ["type"],
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
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.GetSupBaseInfoList();
    },
    loadQueryForm() {
      this.loadProvince();
      this.$api.SupBaseInfo.GetBaseInfoDropDown(this.formSearch, this.page.index, this.page.size).then((res) => {
        this.dropDownGroup = res;
        this.GetSupBaseInfoList();
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
      this.page.index = 1;
      this.GetSupBaseInfoList();
    },
    GetSupBaseInfoList() {
      if (this.loading) {
        return;
      }
      this.tableData = [];
      let that = this;
      this.loading = true;
      const { index, size } = this.page;
      // const query = {
      //   SkipCount: (index - 1) * size,
      //   MaxResultCount: size,
      //   ...this.formSearch,
      // };
      // this.$api.SupBaseInfo.GetSupBaseInfoList(query)
      this.$api.SupBaseInfo.SupplierAuthStockInList(this.formSearch, this.page.index, this.page.size)
        .then((res) => {
          that.page.total = res.totalCount;
          that.tableData = res.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onChangeKind(kind) {
      this.formSearch.SupCateNames = kind;
      this.GetSupBaseInfoList();
    },
    jumpSuppInfo(id) {
      window.open(`#/supplier/detail/${id}`);
    },
    selectSup(sup) {
      this.$emit("itemClick", sup);
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
