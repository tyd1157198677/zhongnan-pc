<!--  -->
<template>
  <el-main>
    <div class="right1" style="margin:10px 0;margin-top:0">
      <div class="tit">
        {{ "模块名称：" + title }}
      </div>
      <div>
        <el-button size="small" type="primary" @click="$router.back(-1)">返回</el-button>
        <el-button size="small" type="primary" @click="addMoudle">新增模块</el-button>
      </div>
    </div>
    <el-table
      height="510"
      style="width:100%"
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="tableData"
      v-loading="loading"
    >
      <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
      <el-table-column prop="itemTitle" label="题目" header-align="center" align="left"> </el-table-column>
      <el-table-column prop="itemType" label="题目类型" align="center" width="140"> </el-table-column>
      <el-table-column prop="groupNumber" label="分组编号" align="center" width="120"> </el-table-column>
      <el-table-column prop="maxLength" label="最大长度" align="center" width="120"> </el-table-column>
      <!-- <el-table-column prop="defaultValue" label="默认值" align="center" width="120"> </el-table-column>
      <el-table-column prop="itemDesc" label="备注" align="center" width="120"> </el-table-column>
      <el-table-column prop="afterLineFlag" label="末尾换行" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.afterLineFlag ? "换行" : "不换行" }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <i title="修改" class="el-icon-edit" @click="edit1(scope.row)"></i>
          <i title="删除" class="el-icon-delete" style="margin:0 10px" @click="deletes(scope.row)"></i>
          <i
            v-if="scope.row.itemType == '单选' || scope.row.itemType == '多选' || scope.row.itemType == '下拉'"
            title="编辑选项"
            class="el-icon-circle-check"
            @click="weiHuSubject(scope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="50%" :title="form.id == '' ? '新增' : '编辑'" :visible.sync="dialogFormVisiblezidianxin">
      <el-form ref="form" label-width="150px" size="small" :model="form" class="m-3" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="题目类型" prop="itemType">
              <el-select v-model="form.itemType" style="width:100%" :disabled="form.id == '' ? false : true">
                <el-option v-for="item in optionList" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分组编号" prop="groupNumber">
              <el-input-number style="width:100%" v-model="form.groupNumber" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="默认值">
              <el-input v-model="form.defaultValue" placeholder="请输入模块名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="允许最大长度">
              <el-input-number style="width:100%" v-model="form.maxLength" :min="1"> </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="末尾存在换行">
              <el-select v-model="form.afterLineFlag" style="width:100%">
                <el-option label="不存在" :value="false"></el-option>
                <el-option label="存在" :value="true"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="showOrder">
              <el-input-number style="width:100%" v-model="form.showOrder" type="number" :min="1"> </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="列表标题" prop="tableTitle">
              <el-input style="width:100%" v-model="form.tableTitle" placeholder="请输入列表标题"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否展示标题">
              <el-select v-model="form.isShowTableTitle" style="width:100%">
                <el-option label="否" :value="false"></el-option>
                <el-option label="是" :value="true"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="字段标题">
              <el-input
                type="textarea"
                :rows="2"
                v-model="form.itemTitle"
                placeholder="请输入字段标题"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input type="textarea" :rows="2" v-model="form.itemDesc" placeholder="备注" maxlength="200" show-word-limit> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="margin-bottom:20px;text-align:right">
            <el-button type="primary" size="small" @click="saveadd()">保存</el-button>
            <el-button size="small" @click="dialogFormVisiblezidianxin = false">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
import finalScoreVue from "../Evaluate/finalScore.vue";
export default {
  components: {},
  data() {
    return {
      rules: {
        itemType: { required: true, message: "请选择题目类型", trigger: "blur" },
        groupNumber: { required: true, message: "请输入分组编号", trigger: "blur" },
        maxLength: { required: true, message: "请输入最大字符长度", trigger: "blur" },
        afterLineFlag: { required: true, message: "请选择", trigger: "blur" },
        showOrder: { required: true, message: "请输入显示顺序", trigger: "blur" },
      },
      id: "",
      title: "",
      loading: false,
      dialogFormVisiblezidianxin: false,
      optionList: [],
      tableData: [],
      form: {
        id: "",
        cateId: "",
        itemType: "",
        groupNumber: 1,
        defaultValue: "",
        itemTitle: "",
        maxLength: 1,
        itemDesc: "",
        afterLineFlag: false,
        showOrder: 1,
        tableTitle: "",
        isShowTableTitle: true,
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.id = this.$route.query.id;
    this.title = this.$route.query.name;
  },
  mounted() {
    this.GetFormItemList();
  },
  methods: {
    async GetFormItemList() {
      let obj = {
        CateId: this.id,
      };
      let res = await this.$http.get("/FormItem/GetFormItemList", { params: obj });
      this.tableData = res.data;
    },
    async SaveFormCategory() {
      let res = await this.$http.post("/FormItem/SaveFormItem", this.form);
      if (res.data.success) {
        this.$message.success(res.data.message);
        this.dialogFormVisiblezidianxin = false;
        this.GetFormItemList();
      } else {
        this.$message.warning(res.data.message);
      }
    },
    saveadd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.SaveFormCategory();
        }
      });
    },

    //获取模块下拉
    async GetDynamicModuleDropDown() {
      let res = await this.$http.get("/FormItem/GetItemTypeDropDowns");
      this.optionList = res.data.result;
    },
    async AddItemInitForm() {
      let obj = {
        CateId: this.id,
      };
      let res = await this.$http.get("/FormItem/AddItemInitForm", { params: obj });
      let form = this.form;
      form.groupNumber = res.data.groupNumber;
      form.maxLength = res.data.maxLength;
      form.showOrder = res.data.showOrder;
    },
    //新增模块
    addMoudle() {
      let form = this.form;
      form.id = "";
      form.cateId = this.id;
      form.itemType = "";
      form.defaultValue = "";
      form.itemTitle = "";
      form.itemDesc = "";
      form.tableTitle = "";
      form.isShowTableTitle = true;
      this.GetDynamicModuleDropDown();
      this.AddItemInitForm();
      this.dialogFormVisiblezidianxin = true;
    },
    //编辑
    edit1(row) {
      let form = this.form;
      this.GetDynamicModuleDropDown();
      form.id = row.id;
      form.cateId = this.id;
      form.groupNumber = row.groupNumber;
      form.maxLength = row.maxLength;
      form.showOrder = row.showOrder;
      form.itemType = row.itemType;
      form.defaultValue = row.defaultValue;
      form.itemTitle = row.itemTitle;
      form.tableTitle = row.tableTitle;
      form.isShowTableTitle = row.isShowTableTitle;
      form.itemDesc = row.itemDesc;
      this.dialogFormVisiblezidianxin = true;
    },
    //删除
    deletes(row) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$http.post("/FormItem/DeleteFormById", { id: row.id });
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetFormItemList();
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
    back() {
      window.history.back();
    },
    weiHuSubject(row) {
      this.$router.push({
        name: "threeForm",
        query: {
          id: row.id,
          name: row.itemTitle,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0 10px;
}
.right1 {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  .tit {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
