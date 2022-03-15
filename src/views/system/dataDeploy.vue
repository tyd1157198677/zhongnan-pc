<template>
  <div>
    <div class="top">
      <div class="right1" style="float: right; margin-bottom: 10px">
        <!-- <el-form-item label="参数分类"> -->
        <!-- <el-select v-model="content" size="small" style="margin-right:10px" placeholder="请选择参数分类" @change="change">
          <el-option label="请选择" value=""></el-option>
          <el-option label="供方注册" value="gongfangzhuce"></el-option>
          <el-option label="供方考察" value="gongfangkaocha"></el-option>
          <el-option label="履约评价" value="lvyuepingjia"></el-option>
          <el-option label="招采过程" value="zhaocaiguocheng"></el-option>
        </el-select> -->
        <el-select v-model="value" size="small" placeholder="请选择参数分类" @change="handleChange">
          <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
        <!-- </el-form-item> -->
        <!-- <el-button type="primary" size="small" @click="search1(value)">搜索</el-button> -->
      </div>
    </div>
    <el-table
      height="510"
      style="width: 100%"
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="tableData1"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" width="150" align="center"> </el-table-column>
      <!-- <el-table-column prop="CateName" label="参数分类" align="center" width="140"> </el-table-column> -->
      <el-table-column prop="sysConfigCate" label="参数名称" align="left"> </el-table-column>
      <el-table-column prop="configDesc" label="说明" align="left" min-width="250"> </el-table-column>
      <el-table-column label="参数值" width="300" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.configValue"></el-input>
          <!-- oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}" -->
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="120" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isEnable" active-color="#409eff" inactive-color="#dcdfe6"> </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="保存" width="80" align="center">
        <template slot-scope="scope">
          <i class="el-icon-circle-check" @click="submit(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "configuration",
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
        parentId: "",
        cateCode: "",
        cateName: "",
        cateOrder: "",
        cateDesc: "",
      },
      tableData1: [
        {
          sysConfigCate: "",
          configValue: "",
          isEnable: "",
          // CateName: '',
        },
      ],
      tableDataclassify: [
        {
          id: "",
          parentId: "",
          cateCode: "",
          cateName: "",
          cateOrder: "",
          cateDesc: "",
        },
      ],
      tableDataAptitude: [
        {
          id: "",
          parentId: "",
          cateCode: "",
          cateName: "",
          cateOrder: "",
          cateDesc: "",
        },
      ],
      tableDataAddress: [
        {
          id: "",
          parentId: "",
          cateCode: "",
          cateName: "",
          cateOrder: "",
          cateDesc: "",
        },
      ],
      orderList: [],
      // items: '',
      loading: false,
      isEnable: "",
      pageSize: 15,
      currentPage: 1,
      totalCount: 0,
      rules: {
        cateCode: { required: true, message: "请输入编号", trigger: "blur" },
        cateName: { required: true, message: "请输入名称", trigger: "blur" },
        cateOrder: { required: true, message: "请输入显示顺序", trigger: "blur" },
      },
    };
  },
  created() {
    this.getList1();
  },
  mounted() {
    this.GetTempReportDowns();
  },
  methods: {
    handleClick(e) {
      this.getList1();
    },
    // async GetSysTreeCateType() {
    //   let res = await this.$http.get("/SysTreeCate/GetSysTreeCateType");
    //   this.roleList1 = res.data;
    //   this.value = res.data.length > 0 ? res.data[0].text : "";
    //   this.GetList();
    // },
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
        parentId: opt.parentId,
        cateCode: "",
        cateName: "",
        cateOrder: "",
        cateDesc: "",
      };
    },
    saveadd() {
      this.$refs.zidian.validate((valid) => {
        if (valid) {
          this.$http
            .post("/SysTreeCate/AddChildCate", {
              ...this.zidian,
            })
            .then((res) => {
              res.status == 200
                ? this.$message.success(res.message || res.data.message)
                : this.$message.error(res.message || res.data.message);
              this.dialogFormVisiblezidianxin = false;
              this.getListClassify();
              this.getListAptitude();
              this.getListAddress();
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
            .post("/SysTreeCate/UpdateCateInfo", {
              ...this.zidian,
            })
            .then((res) => {
              res.status == 200
                ? this.$message.success(res.message || res.data.message)
                : this.$message.error(res.message || res.data.message);
              this.dialogFormVisiblezidian = false;
              this.getListClassify();
              this.getListAptitude();
              this.getListAddress();
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
    // pageChange(page) {
    //   this.pageSize = page._pageSize;
    //   this.currentPage = page._currentPage;
    //   this.GetList();
    // },
    // clickLeft(item1, index) {
    //   this.indexactive = index;
    //   this.value1 = item1.text;
    //   this.GetList();
    // },
    search(val) {
      // this.GetMenuTree()
    },
    handleChange(val) {
      this.value = val;
      this.getList1();
    },
    saveRolses(val) {
      this.SaveOrder();
    },
    deletes(val) {
      // this.GetMenuTree()
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
    height: 100%;
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
