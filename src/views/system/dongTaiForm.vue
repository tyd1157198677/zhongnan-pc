<!--  -->
<template>
  <div class="firft">
    <div class="rolse">
      <el-aside width="230px">
        <div class="left">
          <div
            :style="{ background: indexactive == index ? '#409eff' : '#fff', color: indexactive == index ? '#FFF' : '' }"
            @click="clickLeft(item1, index)"
            class="item"
            v-for="(item1, index) in roleList1"
            :key="item1.value1"
          >
            {{ item1.text }}
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="right">
          <div class="right1">
            <el-button size="small" type="primary" @click="addMoudle">新增模块</el-button>
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
            <el-table-column prop="code" label="模块编号" align="center" width="140"> </el-table-column>
            <el-table-column prop="name" label="模块名称" align="center">
              <template slot-scope="scope">
                <el-link type="primary" style="color: #409eff; text-decoration: none" icon="el-icon-search" @click="lookChild(scope.row)">{{
                  scope.row.name
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="valueMode" label="存值模式" align="center" width="120"> </el-table-column>
            <el-table-column prop="level" label="模块层级" align="center" width="120"> </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <i title="修改" class="el-icon-edit" @click="edit1(scope.row)"></i>
                <i title="删除" class="el-icon-delete" style="margin: 0 10px" @click="deletes(scope.row)"></i>
                <i title="新增子类" class="el-icon-circle-plus-outline" @click="addChild(scope.row)"></i>
                <i title="维护题目" style="margin-left: 10px" class="el-icon-circle-check" @click="weiHuSubject(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="totalCount" :current-page="currentPage" :pageSize="pageSize" @pageChange="pageChange" />
        </div>
      </el-main>
      <el-dialog width="40%" :title="form.id == '' ? '新增' : '编辑'" :visible.sync="dialogFormVisiblezidianxin">
        <el-form ref="form" label-width="100px" size="small" :model="form" class="m-3" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属模块" prop="dynamicModule">
                <el-select v-model="form.dynamicModule" style="width: 100%">
                  <el-option v-for="item in optionList" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="模块编号" prop="code">
                <el-input v-model="form.code" placeholder="请输入编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="模块名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入模块名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示顺序" prop="showOrder">
                <el-input-number style="width: 100%" v-model="form.showOrder" placeholder="请输入显示顺序" :min="1"> </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="存值模式" prop="valueMode">
                <el-select style="width: 100%" v-model="form.valueMode" placeholder="请选择存值模式">
                  <el-option label="单值模式" value="单值模式"></el-option>
                  <el-option label="列表模式" value="列表模式"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.desc" rows="2" placeholder="备注" type="textarea" maxlength="200" show-word-limit> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="margin-bottom: 20px; text-align: right">
              <el-button type="primary" size="small" @click="saveadd()">保存</el-button>
              <el-button size="small" @click="dialogFormVisiblezidianxin = false">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      rules: {
        dynamicModule: { required: true, message: "请输入所属模块", trigger: "blur" },
        code: { required: true, message: "请输入编号", trigger: "blur" },
        name: { required: true, message: "请输入模块名称", trigger: "blur" },
        // level: { required: true, message: "请输入层级", trigger: "blur" },
        showOrder: { required: true, message: "请输入显示顺序", trigger: "blur" },
      },
      roleList1: [],
      tableData: [],
      optionList: [],
      form: {
        id: "",
        parentId: "",
        dynamicModule: "",
        code: "",
        name: "",
        valueMode: "单值模式",
        // level: Number,
        showOrder: Number,
        desc: "",
      },
      loading: false,
      dialogFormVisiblezidianxin: false,
      activeName: "",
      value: "",
      indexactive: 0,
      pageSize: 15,
      currentPage: 1,
      totalCount: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetSysTreeCateType();
  },
  methods: {
    async GetSysTreeCateType() {
      let res = await this.$http.get("/FormCategory/GetDynamicModuleDropDown");
      this.roleList1 = res.data;
      this.value = res.data.length > 0 ? res.data[0].text : "";
      this.GetList();
    },
    async GetList(Level, ParentId) {
      let obj = {
        DynamicModule: this.value,
        Level,
        ParentId,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
      };
      this.loading = true;
      let res = await this.$http.get("/FormCategory/GetFormCategoryList", { params: obj });
      if (res.data.success) {
        this.loading = false;
        this.tableData = res.data.result.items;
        this.totalCount = res.data.result.totalCount;
      }
    },
    clickLeft(item1, index) {
      this.indexactive = index;
      this.value = item1.text;
      this.GetList();
    },
    lookChild(row) {
      this.GetList(row.level, row.id);
    },
    async SaveFormCategory() {
      let res = await this.$http.post("/FormCategory/SaveFormCategory", this.form);
      if (res.data.success) {
        this.$message.success(res.data.message);
        this.dialogFormVisiblezidianxin = false;
        this.GetList();
      } else {
        this.$message.warning(res.data.message);
      }
    },
    //获取模块下拉
    async GetDynamicModuleDropDown() {
      let res = await this.$http.get("/FormCategory/GetDynamicModuleDropDown");
      this.optionList = res.data;
    },
    //新增模块
    addMoudle() {
      let form = this.form;
      form.id = "";
      form.parentId = "";
      form.dynamicModule = "";
      form.code = "";
      form.name = "";
      form.showOrder = 1;
      form.desc = "";
      (form.valueMode = "单值模式"), this.GetDynamicModuleDropDown();
      this.dialogFormVisiblezidianxin = true;
    },
    //新增子类
    addChild(row) {
      let form = this.form;
      form.parentId = row.id;
      form.showOrder = 2;
      form.id = "";
      form.dynamicModule = "";
      form.code = "";
      form.name = "";
      form.desc = "";
      (form.valueMode = "单值模式"), this.GetDynamicModuleDropDown();
      this.dialogFormVisiblezidianxin = true;
    },
    saveadd() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.SaveFormCategory();
        }
      });
    },
    //编辑
    edit1(row) {
      let form = this.form;
      form.id = row.id;
      form.parentId = row.parentId;
      form.dynamicModule = row.dynamicModule;
      form.code = row.code;
      form.name = row.name;
      form.showOrder = row.showOrder;
      form.desc = row.desc;
      form.valueMode = row.valueMode;
      this.GetDynamicModuleDropDown();
      this.dialogFormVisiblezidianxin = true;
    },
    //删除
    async deletes(row) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$http.post("/FormCategory/DeleteFormCategoryById", { id: row.id });
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetList();
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },

    weiHuSubject(row) {
      this.$router.push({
        name: "wuHuSubject",
        query: {
          id: row.id,
          name: row.name,
        },
      });
    },
    pageChange(page) {
      this.pageSize = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetList();
    },
  },
};
</script>
<style lang="scss" scoped>
.rolse {
  height: 620px;
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

    .right1 {
      text-align: right;
      margin: 10px;
    }
  }
}
::v-deep .el-dialog__body {
  padding: 0 10px;
}
</style>
