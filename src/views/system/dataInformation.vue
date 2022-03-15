<template>
  <div>
    <div>
      <el-table
        :data="tableDataAddress"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        height="540"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="cateCode" label="编号"> </el-table-column>
        <el-table-column prop="cateName" label="名称"> </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="edit(scope.row)" style="margin-right: 10px"></i>
            <i class="el-icon-circle-plus-outline" @click="addRolses(scope.row)" title="新增子级"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog width="60%" :title="tit" :visible.sync="dialogFormVisiblezidian">
      <el-form :model="zidian" ref="zidian" label-width="100px" size="small" class="m-3" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="cateCode">
              <el-input v-model="zidian.cateCode" placeholder="请输入编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="cateName">
              <el-input v-model="zidian.cateName" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="cateOrder">
              <el-input
                v-model="zidian.cateOrder"
                placeholder="请输入显示顺序"
                oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="cateDesc">
              <el-input v-model="zidian.cateDesc" placeholder="请输入备注" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="right" style="margin-bottom: 20px">
            <el-button type="primary" size="small" @click="submitzidian('zidian')">保存</el-button>
            <el-button size="small" @click="dialogFormVisiblezidian = false">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "information",
  data() {
    return {
      dialogFormVisiblezidian: false,
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
      items: "",
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
  mounted() {
    this.getListAddress();
  },
  methods: {
    tabClick(e) {
      this.getListAddress();
    },
    async getListAddress() {
      let obj = {
        id: this.id,
        parentId: this.parentId,
      };
      this.loading = true;
      let res = await this.$http.get("/SysTreeCate/GetAddressTree", { params: obj });
      if (res.status == 200) {
        this.loading = false;
        this.tableDataAddress = res.data;
      }
    },
    addRolses(opt) {
      this.dialogFormVisiblezidian = true;
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
    edit(opt) {
      this.dialogFormVisiblezidian = true;
      this.zidian.id = opt.id;
      this.zidian.parentId = opt.parentId;
      this.zidian.cateCode = opt.cateCode;
      this.zidian.cateName = opt.cateName;
      this.zidian.cateDesc = opt.cateDesc;
      this.$http
        .get("/SysTreeCate/GetOneById", {
          params: {
            id: opt.id,
          },
        })
        .then((res) => {
          this.zidian.cateOrder = res.data.cateOrder;
        });
    },
    submitzidian() {
      this.$refs.zidian.validate((valid) => {
        if (valid) {
          this.$http
            .post(this.tit == "编辑" ? "/SysTreeCate/UpdateCateInfo" : "/SysTreeCate/AddChildCate", {
              ...this.zidian,
            })
            .then((res) => {
              res.status == 200
                ? this.$message.success(res.message || res.data.message)
                : this.$message.error(res.message || res.data.message);
              this.dialogFormVisiblezidian = false;
              this.getListAddress();
            });
        }
      });
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
