<template>
  <div>
    <div class="top">
      <div class="left1">
        <el-select
          v-model="value"
          size="small"
          style="margin-right:10px;margin-bottom: 10px"
          placeholder="请选择模块"
          @change="handleChange"
        >
          <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
        <el-input v-model="fileName" style="margin-right:10px" placeholder="请输入文件固定名称..." clearable @input="handlechange" />
        <el-button type="primary" size="small" @click="search()">搜索</el-button>
        <el-button size="small" type="primary" @click="saveRolses" style="float: right" :loading="translationLoad">保存排序</el-button>
        <el-button size="small" type="primary" @click="addRolses" style="float: right">新增文件配置</el-button>
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
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column prop="configFileCate" label="所属模块" align="center"> </el-table-column>
      <el-table-column prop="fileName" label="文件名称" align="center"> </el-table-column>
      <el-table-column prop="fileExtName" label="允许文件类型" width="300" align="center"> </el-table-column>
      <el-table-column prop="maxFileSize" width="150" label="文件最大（兆）" align="center"> </el-table-column>
      <el-table-column prop="mustUpload" width="100" label="是否必填" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mustUpload ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="显示顺序" width="100" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.showOrder"></el-input>
          <!-- <el-input type="number" min="1" v-model="scope.row.showOrder"> </el-input> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="edit(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="titledia" :visible.sync="dialogFormVisible">
      <el-form ref="importFromData" :model="importFromData">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属模块" prop="configFileCate">
              <el-select v-model="importFromData.configFileCate" placeholder="请选择所属模块">
                <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件名称" prop="fileName">
              <el-input v-model="importFromData.fileName" placeholder="请输入文件名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="允许文件类型" prop="fileExtName">
              <el-input v-model="importFromData.fileExtName" placeholder="请输入文件类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件最大（兆）" prop="maxFileSize">
              <el-input v-model="importFromData.maxFileSize" placeholder="请输入兆数" type="number" :min="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否必填" prop="mustUpload">
              <el-select v-model="importFromData.mustUpload" placeholder="请选择是否必填">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="showOrder">
              <el-input v-model="importFromData.showOrder" type="number" min="1" placeholder="请选择显示顺序"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span style="float: left"
          ><div style="color: #f56c6c;float: left">*</div>
          允许文件的类型：.doc|.docx|.ppt|.pptx|.xls|.xlsx|.rar|.zip|.png|.jpg|.pdf</span
        >
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="small" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dataFile",
  data() {
    return {
      dialogFormVisible: false,
      translationLoad: false,
      options: [],
      titledia: "",
      value: "",
      loading: false,
      fileName: "",
      tableData: [],
      importFromData: {
        id: "",
        configFileCate: "",
        fileName: "",
        fileExtName: "",
        maxFileSize: Number,
        mustUpload: false,
        showOrder: Number,
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.GetFileCateDropDownList();
  },
  methods: {
    async GetFileCateDropDownList() {
      let res = await this.$http.get("/BidFileConfig/GetFileCateDropDownList");
      this.options = res.data;
      this.value = res.data.length > 0 ? res.data[0].value : "";
      this.getList();
    },
    async getList() {
      let obj = {
        ConfigFileCate: this.value,
        FileName: this.fileName,
      };
      this.loading = true;
      let res = await this.$http.get("/BidFileConfig/GetBidFileConfigList", { params: obj });
      if (res.status == 200) {
        this.loading = false;
        this.tableData = res.data;
        this.orderList = res.data.map(item => {
          return {
            id: item.id,
            showOrder: item.showOrder,
          };
        });
      }
    },
    async search() {
      this.getList();
    },
    handlechange() {
      this.getList();
    },
    handleChange(val) {
      this.value = val;
      this.getList();
    },
    /**
     * 保存排序
     */
    async saveRolses() {
      try {
        this.translationLoad = true;
        const arr = this.tableData.map(item => {
          return {
            id: item.id,
            showOrder: item.showOrder,
          };
        });
        await this.$http.post("/BidFileConfig/SaveConfigFileOrder", arr);
        this.translationLoad = false;
        this.$message.success("保存排序成功");
        await this.getList();
      } catch (e) {
        this.translationLoad = false;
        this.$message.error(e.data.message);
      }
    },
    addRolses() {
      this.dialogFormVisible = true;
      this.titledia = "新增文件配置";
      this.$nextTick(() => {
        this.$refs.importFromData.clearValidate();
      });
      this.importFromData = {
        id: "",
        configFileCate: "",
        fileName: "",
        fileExtName: "",
        maxFileSize: 0,
        mustUpload: false,
        showOrder: 1,
      };
    },
    edit(val) {
      this.titledia = "编辑文件配置";
      this.dialogFormVisible = true;
      this.importFromData.id = val.id;
      this.importFromData.configFileCate = val.configFileCate;
      this.importFromData.fileName = val.fileName;
      this.importFromData.fileExtName = val.fileExtName;
      this.importFromData.maxFileSize = val.maxFileSize;
      this.importFromData.mustUpload = val.mustUpload;
      this.importFromData.showOrder = val.showOrder;
    },
    submitForm() {
      this.$refs.importFromData.validate(valid => {
        if (valid) {
          this.$http.post("/BidFileConfig/InsertOrUpdateFileConfig", this.importFromData).then(res => {
            res.status == 200
              ? this.$message.success(res.message || res.data.message)
              : this.$message.error(res.message || res.data.message);
            this.dialogFormVisible = false;
            this.getList();
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
::v-deep .el-input {
  width: auto;
}
::v-deep .el-form-item__label {
  width: 120px !important;
}
</style>
