<template>
  <div class="user">
    <el-row>
      <el-col :span="24" class="btns">
        <el-button type="primary" @click="addParameter" size="small">新增</el-button>
        <!-- <el-button type="primary" size="small" @click="SaveOrganizeOrder">保存排序</el-button> -->
      </el-col>
    </el-row>
    <!-- :expand-row-keys="mutionArr" -->
    <el-table
      stripe
      v-loading="loading"
      element-loading-text="请稍候,数据正在加载中..."
      :header-cell-style="tableHeaderColor"
      :data="tableData"
      height="600"
      row-key="id"
      :load="load"
      lazy
      border
      style="margin-bottom: 40px; font-size: 15px; font-weight: 540"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="comName" label="机构名称">
        <template slot-scope="scope">
          <span>{{ scope.row.comName }}</span>
          <!-- <span
            :style="{ color: scope.$index > 0 ? '#409eff' : '' }"
            @click="scope.$index > 0 ? GetSysTreeCateType(scope.row.subCompanyCode) : false"
            >{{ scope.row.comName }}</span
          > -->
        </template>
      </el-table-column>
      <el-table-column prop="subCompanyCode" align="center" label="机构编号" width="150">
        <template slot-scope="scope">
          <div style="text-align: center">{{ scope.row.subCompanyCode }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="orgType" align="center" label="机构层级" width="180">
        <template slot-scope="scope">
          <div style="text-align:center">{{ scope.row.orgType }}</div>
        </template>
      </el-table-column> -->
      <el-table-column label="排序" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.showOrder }}</span>
          <!-- <el-input -->
          <!-- placeholder="请输入排序" -->
          <!-- type="number" -->
          <!-- v-model="scope.row.showOrder" -->
          <!-- @input="SaveOrganizeOrder(scope.row.id, scope.row.showOrder)" -->
          <!-- :min="1" -->
          <!-- :max="9999" -->
          <!-- /> -->
        </template>
      </el-table-column>
      <!-- <el-table-column label="是否可用" align="center" width="180" prop="inuse"> -->
      <!-- <template slot-scope="scope"> -->
      <!-- <el-radio-group @change="handleEdituse(scope.row)" v-model="scope.row.isEnable"> -->
      <!-- <el-radio :label="true">可用</el-radio> -->
      <!-- <el-radio :label="false">不可用</el-radio> -->
      <!-- </el-radio-group> -->
      <!-- </template> -->
      <!-- </el-table-column> -->
      <!-- <el-table-column label="操作" align="center" width="100"> -->
      <!-- <template slot-scope="scope"> -->
      <!-- <i @click="handleEdit(scope.row)" class="el-icon-edit" title="编辑" style="margin-left: 15px" /> -->
      <!-- <i @click="DeleteIdmOrganizeInfoById(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left: 5px" /> -->
      <!-- </template> -->
      <!-- </el-table-column> -->
    </el-table>

    <!-- 新增编辑弹框 -->
    <el-dialog :title="boxTitle" :visible.sync="dialogFormVisible" :show-close="false">
      <el-form ref="ruleForm" :model="options" label-width="130px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称" prop="sComName">
              <el-input v-model="options.comName" placeholder="请输入机构名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构简称" prop="sComShortName">
              <el-input v-model="options.comShortName" placeholder="请输入机构简称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构编号" prop="subCompanyCode">
              <el-input
                v-model="options.subCompanyCode"
                oninput="value=value.replace(/[^\d]/g, '')"
                placeholder="请输入机构编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级编号" prop="parentCode">
              <el-input v-model="options.parentCode" placeholder="上级编号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="同级显示顺序" prop="showOrder">
              <el-input
                type="number"
                :min="1"
                v-model="options.showOrder"
                oninput="value=value.replace(/[^\d]/g, '')"
                placeholder="请输入同级显示顺序"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="机构类型" prop="orgType">
              <el-select v-model="options.orgType" placeholder="请选择机构类型">
                <el-option :label="item.text" :value="item.text" v-for="(item, index) in TorgTypeList" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->

          <!-- <el-col :span="12">
            <el-form-item label="上传图片" prop="imgUrl">
              <el-upload class="avatar-uploader" action="#" :show-file-list="false" :http-request="uploadFile">
                <img v-if="options.imgUrl" :src="http + options.imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="是否可用" prop="isEnable">
              <el-radio-group v-model="options.isEnable">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAction('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      mutionArr: [],
      // 弹窗数据
      boxTitle: "", // 定义弹框标题
      dialogFormVisible: false, // 弹窗
      ids: [],
      orders: [],
      loading: false,
      dialogVisible: false,
      http: process.env.VUE_APP_BASE_API,
      options: {
        id: "",
        comName: "",
        comShortName: "",
        subCompanyCode: "",
        comFullName: "",
        isEnable: true,
        orgType: "",
        parentCode: "0",
        fileId: "",
        imgUrl: "",
        showOrder: "",
      },
      showOrder: "",
      rules: {
        comName: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
        comShortName: [{ required: true, message: "请输入机构简称", trigger: "blur" }],
        subCompanyCode: [{ required: true, message: "请输入机构编号", trigger: "blur" }],
        showOrder: [{ required: true, message: "请输入同级显示顺序", trigger: "blur" }],
        isEnable: [{ required: true, message: "请选择是否可用", trigger: "change" }],
        // orgType: [{ required: true, message: "请选择机构类型", trigger: "change" }],
        parentCode: [{ required: true, message: "上级编号不能为空", trigger: "blur" }],
        // imgUrl: [{ required: true, message: "请上传文件", trigger: "change" }],
      },
      TorgTypeList: [],
    };
  },
  mounted() {
    this.GetSysTreeCateType("");
    // this.GetOrganizeTreeForBase()
  },

  methods: {
    tableHeaderColor() {
      return "background-color: #d3d3d3;color: #333;";
    },
    // 获取织机构类型
    async GetSysTreeCateType(subCompanyCode) {
      this.loading = true;
      let obj = { params: { ParentCode: subCompanyCode } };
      let res = await this.$http.get("/IdmOrganizeInfo/GetOrganizeTreeForBaseData", obj);
      this.tableData = res.data;
      this.loading = false;
      if (this.tableData.length > 0) {
        this.$nextTick(() => {
          document.getElementsByClassName("el-table__expand-icon")[0].click();
          this.mutionArr.push(this.tableData[0].id);
        });
      }
    },
    // 获取织机构类型
    async GetSysTreeCateType1(subCompanyCode) {
      let obj = { params: { ParentCode: subCompanyCode } };
      let res = await this.$http.get("/IdmOrganizeInfo/GetOrganizeTreeForBaseData", obj);
      return res.data;
    },
    load(tree, treeNode, resolve) {
      let obj = { params: { ParentCode: tree.subCompanyCode } };
      this.$http.get("/IdmOrganizeInfo/GetOrganizeTreeForBaseData", obj).then((res) => {
        // setTimeout(() => {
        resolve(res.data);
        // }, 1000);
      });
    },
    // 获取组织架构树列表
    GetOrganizeTreeForBase() {
      GetOrganizeTreeForBase().then((res) => {
        if (res) {
          this.tableData = res;
        }
      });
    },
    // 新增
    addParameter() {
      this.dialogFormVisible = true;
      this.boxTitle = "新增机构信息";
      this.options = {
        id: "",
        comName: "",
        comShortName: "",
        subCompanyCode: "",
        comFullName: "",
        isEnable: true,
        orgType: "",
        parentCode: "0",
        fileId: "",
        imgUrl: "",
        showOrder: "",
      };
    },
    // 编辑
    handleEdit(row) {
      console.log(row);
      // let that = this;
      const obj = {
        id: row.id,
      };
      this.dialogFormVisible = true;
      this.$http.get("/IdmOrganizeInfo/GetOneIdmOrganizeInfoById", { params: obj }).then((res) => {
        console.log(res.data);
        // that.dialogFormVisible = true;
        this.boxTitle = "编辑机构信息";
        this.options.id = res.data.id;
        this.options.comName = res.data.comName;
        this.options.comShortName = res.data.comShortName;
        this.options.subCompanyCode = res.data.subCompanyCode;
        this.options.comFullName = res.data.comFullName;
        this.options.showOrder = res.data.showOrder;
        this.options.isEnable = res.data.isEnable;
        this.options.orgLevel = res.data.orgLevel;
        this.options.orgType = res.data.orgType;
        this.options.imgUrl = res.data.imgUrl;
        this.options.parentCode = res.data.parentCode;
        // that.options = {
        //   id: res.id,
        //   comName: res.comName,
        //   comShortName: res.comShortName,
        //   subCompanyCode: res.subCompanyCode,
        //   comFullName: res.comFullName,
        //   showOrder: res.showOrder,
        //   isEnable: res.isEnable.toString(),
        //   orgLevel: res.orgLevel,
        //   orgType: res.orgType,
        //   imgUrl: res.imgUrl,
        //   parentCode: res.parentCode === "" ? 0 : res.parentCode,
        // };
      });
    },
    // 删除
    DeleteIdmOrganizeInfoById(id) {
      // const obj = {
      //   id: id,
      // };
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("/IdmOrganizeInfo/DeleteIdmOrganizeInfoById", { id: id }).then((res) => {
            // DeleteIdmOrganizeInfoById(obj).then(res => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.GetSysTreeCateType();
            } else {
              this.$msg.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.globalMessage = this.$msg({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    uploadFile(item) {
      const fileObj = item.file;
      const from = new FormData(); // FormData 对象
      from.append("file", fileObj);
      from.append("fileModule", 13);
      this.loading = true;
      //   UploadFile(from).then(res => {
      //     if (res.result.success) {
      //       this.options.fileId = res.result.fileId;
      //       this.options.imgUrl = res.result.fileUrl;
      //       this.$msg.success(res.result.message);
      //       this.loading = false;
      //     } else {
      //       this.loading = false;
      //       this.$msg.error(res.result.message);
      //     }
      //   });
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/IdmOrganizeInfo/InsertOrUpdateIdmOrganize", this.options).then((res) => {
            // InsertOrUpdateIdmOrganize(this.options).then(res => {
            console.log(this.options);
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.dialogFormVisible = false;
              this.$refs[formName].resetFields();
              // this.GetOrganizeTreeForBase();
              this.GetSysTreeCateType();
            } else {
              this.$msg.error(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消还原数据
    cancelAction(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      this.options = this.tableData.find((s) => {
        return s.id === this.options.id;
      }) || {
        comName: "",
        comShortName: "",
        subCompanyCode: "",
        comFullName: "",
        showOrder: "",
        isEnable: true,
        orgType: "",
        parentCode: "0",
      };
      this.boxTitle = "";
    },
    handleEdituse(row) {
      // this.$confirm("确认要将当前机构及所有子类采取同步设置吗?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      let obj = {
        subCompanyCode: row.subCompanyCode,
        inUse: row.isEnable,
      };
      this.$http.post("/IdmOrganizeInfo/SetOrganizeUse", obj).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          // this.GetSysTreeCateType();
        } else {
          this.$message.error(res.data.message);
        }
      });
      // })
    },
    // 保存排序
    SaveOrganizeOrder(id, showOrder) {
      // this.tableData.map(s => {
      //   this.orders.push(s.showOrder);
      //   this.ids.push(s.id);
      // });
      // this.tableData[0].children.map(s => {
      //   this.orders.push(s.showOrder);
      //   this.ids.push(s.id);
      // });
      // const obj = {
      //   id: this.ids,
      //   order: this.orders,
      // };
      // let arr = [];
      // for (var i = 0; i < this.tableData.length; i++) {
      let arr = this.tableData.map((v) => {
        return {
          id: id,
          order: showOrder,
        };
      });
      // this.$http.post("/IdmOrganizeInfo/SaveOrganizeOrder", { arr }).then(res => {
      this.$api.supIn.SaveOrganizeOrder(arr).then((res) => {
        console.log(res);
        if (res.success) {
          this.$msg.success(res.message);
          this.GetSysTreeCateType();
        }
      });
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.user {
  // padding: 10px 0;
  // width: 88%;
  margin: 0 auto;
}
::v-deep .el-table td {
  padding: 0px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
.btns {
  margin-bottom: 15px;
  text-align: right;
}
.icon {
  margin-right: 20px;
  color: #00a59f;
  cursor: pointer;
  font-size: 18px;
}
::v-deep .el-table_1_column_4 .cell {
  text-align: center;
}
::v-deep .el-upload {
  border: 1px dashed #d9d9d9 !important;
  width: 178px;
  height: 178px;
  border-radius: 6px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
::v-deep .el-table td,
.el-table th {
  padding: 0px 0;
}
::v-deep .el-input__inner {
  height: 30px;
}
</style>
