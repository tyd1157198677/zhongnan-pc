<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="24">
        <el-form label-position="right" label-width="120px" :model="formSearch" size="small" class="border p-2 mt-2">
          <el-row>
            <el-col :span="6">
              <el-form-item label="供应商名称：">
                <el-input v-model="formSearch.SupName"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="承接主体名称：">
                <el-input v-model="formSearch.comMainName"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="背调主题：">
                <el-input v-model="formSearch.Title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态：">
                <el-select v-model="formSearch.Status">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="已提交" value="已提交"></el-option>
                  <el-option label="草稿" value="草稿"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row class="float-right mb-2 mt-2">
          <el-col :span="24">
            <el-button v-if="isShowFaQibtn" type="primary" size="small" @click="add">发起背调</el-button>
            <el-button type="primary" size="small" @click="search">搜索</el-button>
          </el-col>
        </el-row>
        <!--        <el-button type="primary" size="small" @click="loadQueryForm" style="float: right;margin-bottom: 10px;margin-top: 10px;">搜索</el-button>-->
        <!--        <el-button type="primary" size="small" @click="add">发起考察</el-button>-->
        <!--<el-row class="float-right mb-1 mt-1">-->
        <!--<el-col :span="24">-->
        <!--<el-button type="primary" size="small" @click="onSubmit">搜索</el-button>-->
        <!--<el-button type="primary" size="small" @click="add">新增</el-button>-->
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
          <el-table-column type="index" width="50" label="序号" align="center" fixed="left"> </el-table-column>
          <el-table-column prop="title" label="背调主题" header-align="center" width="250" fixed="left">
            <template slot-scope="scope">
              <!-- <i class="el-icon-search"></i> -->
              <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpSuppInfo(scope.row, 2)">{{
                scope.row.title
              }}</el-link>
            </template>
          </el-table-column>

          <el-table-column prop="supName" align="left" label="供应商名称" width="300"> </el-table-column>
          <!-- <el-table-column prop="comMainName" align="center" label="承接主体名称" width="300"> </el-table-column> -->
          <!-- <el-table-column prop="comMainName" label="承接主体名称" align="center" width="300"> </el-table-column> -->
          <el-table-column prop="userName" label="发起人" align="center"> </el-table-column>
          <el-table-column prop="bidLevel" label="招标层级" align="center" width="120"> </el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
          <!-- <el-table-column prop="wantCities" label="意向城市" align="center" width="110" show-overflow-tooltip=""></el-table-column> -->
          <el-table-column label="操作" align="center" width="80" fixed="right">
            <template slot-scope="scope">
              <i
                @click="delete1(scope.row.id)"
                class="el-icon-delete"
                title="删除"
                style="margin-left: 5px"
                v-if="userGuid == scope.row.userGuid && scope.row.status == '草稿'"
              />
              <i
                @click="jumpSuppInfo(scope.row, 1)"
                class="el-icon-edit"
                title="编辑"
                style="margin-left: 15px"
                v-if="userGuid == scope.row.userGuid && scope.row.status == '草稿'"
              />
              <!--<i @click="add" class="el-icon-picture" title="预览" style="margin-left:15px" />-->
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
      </el-col>
    </el-row>

    <el-dialog :visible.sync="flag1" title="发起背调" width="500px">
      <el-form ref="formgongfang" label-width="100px" :model="formgongfang" :rules="rules">
        <el-row>
          <el-form-item label="背调主题" prop="masterName">
            <el-input v-model="formgongfang.masterName" placeholder="如：XX项目背调"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="供应商名称" prop="name">
            <el-input v-model="formgongfang.name" disabled>
              <el-button slot="append" icon="el-icon-search" @click="flag2 = true"></el-button>
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="招标层级">
            <el-select v-model="formgongfang.bidLevel">
              <el-option label="集团" value="集团"></el-option>
              <el-option label="项目" value="项目"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="right">
          <el-form-item>
            <el-button type="primary" size="small" @click="save1">保存</el-button>
            <el-button size="small" @click="flag1 = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="flag2" title="选择供方" width="70%">
      <gongFang @itemClick="onChangeGongFang" />
    </el-dialog>
  </el-main>
</template>
<script>
import gongFang from "./components/storageList2";
export default {
  components: {
    gongFang,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      // Status: "",
      flag1: false,
      flag2: false,
      formgongfang: { masterName: "", bidLevel: "集团", name: "", supGuid: "" },
      rules: {
        masterName: [{ required: true, message: "请输入背调主题", trigger: "blur" }],
        name: [{ required: true, message: "请选择供应商", trigger: "blur" }],
      },
      formSearch: {
        SupName: "",
        Title: "",
        comMainName: "",
        // StartUserName: "",
        // MasterName: "",
        // ReporType: "",
        // SupName: "",
        Status: "",
        // TempName: "",
        SkipCount: 0,
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
      table1: {},
    };
  },
  created() {
    this.$api.invest.GetLianDoInvesDropDown().then((res) => {
      this.table1 = res;
    });
    this.$http.post("/RoleMenu/GetUserRoleButtonList", ["INVES001"], {}).then((res) => {
      this.codeList = res.data;
      this.isShowFaQibtn = res.data.indexOf("INVES001") > -1 ? true : false;
    });
    this.userGuid = localStorage.getItem("userGuid");
    console.log(this.userGuid);
    this.GetList();
  },
  methods: {
    jumpSuppInfo(row, i) {
      this.$router.push({
        path: row.bidLevel == "项目" ? "/supplier/backGroundEdit" : "/supplier/backgroundJiTuanEdit",
        query: { id: row.id, type: i, name: row.comMainName },
      });
    },
    onChangeGongFang(row) {
      this.formgongfang.supGuid = row.id;
      this.formgongfang.name = row.comFullName;
      this.flag2 = false;
    },
    save1() {
      this.$refs["formgongfang"].validate((valid) => {
        if (valid) {
          let obj = {
            supId: this.formgongfang.supGuid,
            title: this.formgongfang.masterName,
            bidLevel: this.formgongfang.bidLevel,
          };
          this.$http.post("/BackGroundResultAppServices/StartBackGround", obj).then((res) => {
            if (res.data.success) {
              this.flag1 = false;
              this.formgongfang = "";
              this.GetList();
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    add() {
      this.flag1 = true;
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.GetList();
    },
    search() {
      this.page.index = 1;
      this.GetList();
    },
    GetList() {
      this.loading = true;
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      // this.formSearch.Status = this.Status;
      this.$http.get("/BackGroundResultAppServices/GetList", { params: this.formSearch }).then((res) => {
        this.loading = false;
        this.tableData = res.data.items;
        this.page.total = res.data.totalCount;
      });
    },
    delete1(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("/BackGroundResultAppServices/DelBackGround", { id }).then((res) => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.GetList();
            } else {
              this.$message.error(res.data.message);
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
