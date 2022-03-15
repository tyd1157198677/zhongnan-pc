<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="24" style="padding-right: 10px">
        <el-form label-position="right" label-width="120px" :model="formSearch" size="small">
          <el-row :gutter="12">
            <el-col :span="3">
              <!-- <el-form-item label="主题名称："> -->
              <el-input placeholder="主题名称" v-model="formSearch.masterName"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="供应商名称："> -->
              <el-input placeholder="供应商名称" v-model="formSearch.supplierName"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="承接主体名称：">
                <el-input placeholder="请输入承接主体名称" v-model="formSearch.Desc"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="3">
              <!-- <el-form-item label="企业性质："> -->
              <el-select @change="handleChange" v-model="formSearch.CompanyType">
                <el-option label="企业性质" value=""></el-option>
                <el-option v-for="item in dropDownGroup.companyType" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="资格预审结果："> -->
              <el-select @change="handleChange" v-model="formSearch.AuditStatus">
                <el-option label="资格预审结果" value=""></el-option>
                <el-option v-for="item in dropDownGroup.quaResult" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="供应商分类："> -->
              <el-input placeholder="供应商分类" v-model="formSearch.cateName"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="权限："> -->
              <el-select v-model="formSearch.myAuth" @change="handleChange">
                <el-option label="权限" value=""></el-option>
                <el-option label="我经办的" value="true"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <el-button v-if="isShowFaQibtn" style="float: right; margin-left: 10px" type="primary" size="small" @click="add"
                >发 起</el-button
              >
              <el-button type="primary" style="float: right; margin-left: 10px" size="small" @click="loadQueryFormsearch">搜索</el-button>
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
          <el-table-column type="index" width="50" label="序号" align="center" fixed="left"> </el-table-column>
          <el-table-column label="资格预审主题" show-overflow-tooltip header-align="center" width="320" fixed="left">
            <template slot-scope="scope">
              <el-link
                :title="scope.row.masterName"
                type="primary"
                style="color: #409eff; text-decoration: none"
                @click="jumpSuppInfo(scope.row)"
                >{{ scope.row.masterName }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="supplierName" label="供应商名称" align="left" width="350"> </el-table-column>
          <!-- <el-table-column prop="comMainName" label="承接主体名称" align="center" width="350"> </el-table-column> -->
          <!-- <el-table-column align="center" label="注册资金" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.regCapital + scope.row.regCapitalType }}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="cateName" label="所属专业" align="center" width="200"> </el-table-column>
          <el-table-column label="结果" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.quaResult }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.auditStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="经办人" align="center" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <!--<i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />-->
              <i
                v-if="scope.row.auditStatus == '草稿' && scope.row.userGuid == userGuid"
                class="el-icon-edit"
                title="编辑"
                @click="edit(scope.row)"
              />
              <i
                style="margin-left: 10px"
                v-if="scope.row.auditStatus == '草稿' && scope.row.userGuid == userGuid"
                class="el-icon-delete"
                title="删除"
                @click="deleterow(scope.row)"
              />
              <!-- <i class="el-icon-tickets" title="查看详情" style="margin:0 10px" @click="edit(scope.row, 2)" /> -->
              <!-- <el-switch
                title="开启资格预审"
                active-color="#409eff"
                inactive-color="#409eff"
                @change="handleEdit(scope.row)"
                v-model="scope.row.supCanEdit"
              >
              </el-switch> -->
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
      </el-col>
    </el-row>
    <el-dialog width="40%" title="发起资格预审" :visible.sync="dialogVisible">
      <el-button slot="append" icon="el-icon-search" @click="selectSupVisible = true"></el-button>
      <el-row>
        <el-form ref="formgongfang" label-width="130px">
          <el-row>
            <el-form-item label="资格预审主题">
              <el-input
                maxlength="30"
                show-word-limit
                v-model="zhuTi"
                placeholder="针对我司哪个城市项目哪个分部分项工程组织进行的资格预审，如**城市**地区**期区/批次**工程"
                style="margin-bottom: 10px"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="供应商名称">
              <el-input v-model="supplierName" disabled>
                <el-button slot="append" icon="el-icon-search" @click="selectSupVisible = true"></el-button>
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="类型" prop="type">
              <el-select v-model="leixing">
                <el-option v-for="item in investTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
        <el-col :span="24">
          <div class="float-right" style="margin-top: 10px">
            <el-button type="primary" :loading="loading" @click="save">保存</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="95%">
      <gongFang @itemClick="onSelectSups" />
      <!-- <supplier-list @itemClick="onSelectSups" /> -->
    </el-dialog>
  </el-main>
</template>
<script>
import gongFang from "../invest/components/storageList2";
export default {
  components: {
    gongFang,
    Pagination: () => import("@/components/Pagination.vue"),
    SupplierList: () => import("@/components/SupplierList"),
  },
  data() {
    return {
      dropDownGroup: {},
      dialogVisible: false,
      selectSupVisible: false,
      supplierGuid: "",
      supplierName: "",
      zhuTi: "",
      formSearch: {
        masterName: "",
        supplierName: "",
        Desc: "",
        CompanyType: "",
        AuditStatus: "",
        cateName: "",
        SkipCount: 0,
        myAuth: "",
        MaxResultCount: 10,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      value1: "",
      codeList: [],
      tableData: [],
      isShowFaQibtn: false,
      loading: false,
      userGuid: "",
      index1: 1,

      leixing: "",
      investTypes: [
        { label: "总包资格预审", value: "资格预审_总包" },
        { label: "电力资格预审", value: "资格预审_电力" },
        { label: "精装资格预审", value: "资格预审_精装" },
        { label: "门窗资格预审", value: "资格预审_门窗" },
        { label: "幕墙资格预审", value: "资格预审_幕墙" },
        { label: "市政资格预审", value: "资格预审_市政" },
        { label: "消防资格预审", value: "资格预审_消防" },
        { label: "桩基资格预审", value: "资格预审_桩基" },
      ],
    };
  },
  created() {
    this.userGuid = localStorage.getItem("userGuid");
    this.loadQueryForm();
    this.SupQuaDropDown();
  },
  methods: {
    // 获取下拉
    SupQuaDropDown() {
      this.$http.get("/SupQua/SupQuaDropDown").then((res) => {
        this.dropDownGroup = res.data;
      });
      // 获取发起权限
      this.$http.post("/RoleMenu/GetUserRoleButtonList", ["QUA001"], {}).then((res) => {
        this.codeList = res.data;
        this.isShowFaQibtn = res.data.indexOf("QUA001") > -1 ? true : false;
      });
    },
    jumpSuppInfo(row) {
      let path = "";
      switch (row.type) {
        case "资格预审_总包":
          path = "zongbao";
          break;
        case "资格预审_电力":
          path = "dianli";
          break;
        case "资格预审_精装":
          path = "jingzhuang";
          break;
        case "资格预审_门窗":
          path = "menchuang";
          break;
        case "资格预审_幕墙":
          path = "muqiang";
          break;
        case "资格预审_市政":
          path = "shizheng";
          break;
        case "资格预审_消防":
          path = "xiaofang";
          break;
        case "资格预审_桩基":
          path = "zhuangji";
          break;
        default:
          // 没有类型，可能是以前的旧数据，暂时跳转到总包页
          path = "zongbao";
          break;
      }
      this.$router.push({
        path: `/quality/${path}/details`,
        query: {
          id: row.id,
          type: 2, // 1:编辑，2：详情
        },
      });
    },
    edit(row, i) {
      let path = "";
      switch (row.type) {
        case "资格预审_总包":
          path = "zongbao";
          break;
        case "资格预审_电力":
          path = "dianli";
          break;
        case "资格预审_精装":
          path = "jingzhuang";
          break;
        case "资格预审_门窗":
          path = "menchuang";
          break;
        case "资格预审_幕墙":
          path = "muqiang";
          break;
        case "资格预审_市政":
          path = "shizheng";
          break;
        case "资格预审_消防":
          path = "xiaofang";
          break;
        case "资格预审_桩基":
          path = "zhuangji";
          break;
        default:
          // 没有类型，可能是以前的旧数据，暂时跳转到总包页
          path = "zongbao";
          break;
      }
      sessionStorage.setItem("isCanEdit", row.isCanEdit); // 控制是否有权限编辑 《在施项目业绩汇总表（用于后补使用）》
      this.$router.push({
        path: `/quality/${path}/edit`,
        query: {
          id: row.id,
          type: 1, // 1:编辑，2：详情
        },
      });
    },
    deleterow(row) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupQua/DeleteSupQuaMaster", { id: row.id }).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.loadQueryForm();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    handleChange() {
      this.page.index = 1;
      this.index1 = 1;
      this.loadQueryForm();
    },
    add() {
      this.zhuTi = "";
      this.supplierName = "";
      this.leixing = "";
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.$http.post("/SupQua/OpenSupplierWrite", { id: row.id, SupCanEdit: row.supCanEdit }).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.loadQueryForm();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //选择公司
    onSelectSups(sup) {
      this.supplierGuid = sup.id;
      this.supplierName = sup.comFullName;
      this.selectSupVisible = false;
    },
    save() {
      if (this.zhuTi == "") {
        this.$message.warning("请输入主题");
        return;
      }
      if (this.supplierName == "") {
        this.$message.warning("请选择供应商");
        return;
      }
      if (this.leixing == "") {
        this.$message.warning("请选择类型");
        return;
      }
      let path = "";
      switch (this.leixing) {
        case "资格预审_总包":
          path = "zongbao";
          break;
        case "资格预审_电力":
          path = "dianli";
          break;
        case "资格预审_精装":
          path = "jingzhuang";
          break;
        case "资格预审_门窗":
          path = "menchuang";
          break;
        case "资格预审_幕墙":
          path = "muqiang";
          break;
        case "资格预审_市政":
          path = "shizheng";
          break;
        case "资格预审_消防":
          path = "xiaofang";
          break;
        case "资格预审_桩基":
          path = "zhuangji";
          break;
        default:
          // 没有类型，可能是以前的旧数据，暂时跳转到总包页
          path = "";
          break;
      }

      this.$http
        .post("/SupQua/CreateSupplierQuaMaster", {
          masterName: this.zhuTi,
          supplierGuid: this.supplierGuid,
          type: this.leixing,
        })
        .then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.$router.push({
              path: `/quality/${path}/edit`,
              query: {
                id: res.data.returnValue1,
                type: 1, // 1:编辑，2：详情
              },
            });
            // this.$router.push({
            //   path: "/quality/qualitylistEdit",
            //   query: {
            //     id: res.data.returnValue1,
            //     type: 1,
            //   },
            // });
          } else {
            this.$message.warning(res.data.message);
          }
        });

      this.dialogVisible = false;
    },
    pageChange(page) {
      // this.$set(this.page, "index", page._currentPage);
      // this.$set(this.page, "size", page._pageSize);
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.index1 = page._currentPage;
      this.loadQueryForm();
    },
    loadQueryFormsearch() {
      this.page.index = 1;
      this.index1 = 1;
      this.loadQueryForm();
    },
    loadQueryForm() {
      this.loading = true;
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      this.$http.get("/SupQua/GetGetQuaMasterList", { params: this.formSearch }).then((res) => {
        this.loading = false;
        this.tableData = res.data.items;
        this.page.total = res.data.totalCount;
        this.$set(this.page, "index", this.index1);
        // this.$refs.pagination.handleCurrentChange();
      });
    },

    delete1(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.SaveInvesMaster(this.form).then((res) => {
            if (res.success) {
              this.$message.success("保存成功");
              this.masterId = res.returnValue1;
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
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
