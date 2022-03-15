<template>
  <el-main>
    <el-row id="page_main">
      <el-col :span="24" style="padding-right: 10px">
        <el-form label-position="right" label-width="120px" :model="formSearch" size="small">
          <el-row :gutter="12">
            <el-col :span="3">
              <!-- <el-form-item label="供应商名称："> -->
              <el-input v-model="formSearch.comFullName" placeholder="供应商名称"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="承接主体名称：">
                <el-input v-model="formSearch.comMainName"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="3">
              <!-- <el-form-item label="考察分类："> -->
              <el-input v-model="formSearch.supCateName" placeholder="考察分类"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3">
              <!-- <el-form-item label="考察结果："> -->
              <el-select v-model="formSearch.invesResult">
                <!-- <el-option label="考察结果" value=""></el-option> -->
                <el-option v-for="item in table1.invesResult" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="3"> </el-col>
            <el-col :span="15">
              <el-button v-if="isShowFaQibtn" style="float: right; margin-left: 10px" type="primary" size="small" @click="add"
                >发起考察</el-button
              >
              <el-button type="primary" size="small" style="float: right; margin-left: 10px" @click="loadQueryFormsearch">搜索</el-button>
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
          <el-table-column prop="masterName" label="考察主题" header-align="center" width="250" fixed="left">
            <template slot-scope="scope">
              <!-- <i class="el-icon-search"></i> -->
              <el-link type="primary" style="color: #409eff; text-decoration: none" @click="jumpSuppInfo(scope.row)">{{
                scope.row.masterName
              }}</el-link>
            </template>
          </el-table-column>

          <el-table-column prop="comFullName" align="left" label="供应商名称" width="300"> </el-table-column>
          <!-- <el-table-column prop="comMainName" align="center" label="承接主体名称" width="300"> </el-table-column> -->
          <!--<el-table-column prop="注册资金" label="注册资金" align="center" width="120">-->
          <!--<template slot-scope="scope">-->
          <!--{{ scope.row.regCapital + scope.row.regCapitalType }}-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column prop="typeStr" label="考察分类" align="center" width="110"> </el-table-column>
          <el-table-column prop="startUserName" label="发起人" align="center"> </el-table-column>
          <el-table-column prop="invesResult" label="考察结果" align="center" width="120"> </el-table-column>
          <el-table-column prop="auditStatus" label="状态" align="center"></el-table-column>
          <el-table-column prop="wantCities" label="意向城市" align="center" width="110" show-overflow-tooltip=""></el-table-column>
          <el-table-column label="操作" align="center" width="80" fixed="right">
            <template slot-scope="scope">
              <i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left: 5px" v-if="scope.row.canEdit" />
              <i @click="handleEdit(scope.row)" class="el-icon-edit" title="编辑" style="margin-left: 15px" v-if="scope.row.canEdit" />
              <!--<i @click="add" class="el-icon-picture" title="预览" style="margin-left:15px" />-->
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
      </el-col>
    </el-row>

    <el-dialog :visible.sync="flag1" title="发起考察" width="500px">
      <el-form ref="formgongfang" label-width="100px" :model="formgongfang">
        <div style="color: #21468c">
          考场主题备注：针对我司哪个城市项目哪个分部分项工程组织进行的现场考察，如**城市**地区**期区/批次**工程
        </div>
        <el-row>
          <el-form-item label="考察主题" prop="masterName">
            <el-input
              v-model="formgongfang.masterName"
              placeholder="针对我司哪个城市项目哪个分部分项工程组织进行的现场考察，如**城市**地区**期区/批次**工程"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item align="left" label="供应商名称" prop="name">
            <el-input v-model="formgongfang.name" disabled>
              <el-button slot="append" icon="el-icon-search" @click="flag2 = true"></el-button>
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="招标层级">
            <el-select v-model="bidLevel">
              <el-option label="集团" value="集团"></el-option>
              <el-option label="项目" value="项目"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="考察表类型" prop="type">
            <el-select v-model="formgongfang.type">
              <el-option
                v-for="item in bidLevel == '集团' ? investTypes : investTypes1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
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
      flag1: false,
      flag2: false,
      formgongfang: {
        masterName: "",
        supGuid: "",
        name: "",
        type: "", // 类型
      },
      formSearch: {
        StartUserName: "",
        MasterName: "",
        ReporType: "",
        SupName: "",
        TempName: "",
        SkipCount: 0,
        MaxResultCount: 10,
      },
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      value1: "",
      bidLevel: "集团", //招标层级
      codeList: [],
      tableData: [],
      isShowFaQibtn: false,
      loading: false,
      userGuid: "",
      table1: {},
      investTypes: [
        { label: "总包考察评审表", value: "供方考察_总包" },
        { label: "电力考察评审表", value: "供方考察_电力" },
        { label: "精装考察评审表", value: "供方考察_精装" },
        { label: "门窗考察评审表", value: "供方考察_门窗" },
        { label: "幕墙考察评审表", value: "供方考察_幕墙" },
        { label: "市政考察评审表", value: "供方考察_市政" },
        { label: "消防考察评审表", value: "供方考察_消防" },
        { label: "桩基考察评审表", value: "供方考察_桩基" },
      ],
      investTypes1: [
        { label: "材料设备考察评审表", value: "项目招标考察_材料设备" },
        { label: "监理考察评审表", value: "项目招标考察_监理" },
        { label: "景观考察评审表", value: "项目招标考察_景观" },
        { label: "设计考察评审表", value: "项目招标考察_设计" },
      ],
    };
  },
  created() {
    this.userGuid = localStorage.getItem("userGuid");
    this.$api.invest.GetLianDoInvesDropDown().then((res) => {
      this.table1 = res;
    });
    this.$http.post("/RoleMenu/GetUserRoleButtonList", ["INVES001"], {}).then((res) => {
      this.codeList = res.data;
      this.isShowFaQibtn = res.data.indexOf("INVES001") > -1 ? true : false;
    });
    this.loadQueryForm();
  },
  methods: {
    getPath(type) {
      let path = "";
      switch (type) {
        case "供方考察_总包":
          path = "zongbao";
          break;
        case "供方考察_电力":
          path = "dianli";
          break;
        case "供方考察_精装":
          path = "jingzhuang";
          break;
        case "供方考察_门窗":
          path = "menchuang";
          break;
        case "供方考察_幕墙":
          path = "muqiang";
          break;
        case "供方考察_市政":
          path = "shizheng";
          break;
        case "供方考察_消防":
          path = "xiaofang";
          break;
        case "供方考察_桩基":
          path = "zhuangji";
          break;
        case "项目招标考察_材料设备":
          path = "fileShebei";
          break;
        case "项目招标考察_监理":
          path = "jianli";
          break;
        case "项目招标考察_景观":
          path = "jingguan";
          break;
        case "项目招标考察_设计":
          path = "sheji";
          break;
        default:
          // 没有类型，可能是以前的旧数据，暂时跳转到总包页
          path = "zongbao";
          break;
      }
      return path;
    },
    jumpSuppInfo(row) {
      let path = this.getPath(row.type);
      this.$router.push({
        path: `/invest/${path}/details`,
        query: {
          id: row.id,
          supGuid: row.supGuid,
          type: 2, // 1:编辑，2：详情
        },
      });
    },
    onChangeGongFang(row) {
      this.formgongfang.supGuid = row.id;
      this.formgongfang.name = row.comFullName;
      this.flag2 = false;
    },
    save1() {
      if (this.formgongfang.masterName == "") {
        this.$message.warning("请输入主题");
        return false;
      } else if (this.formgongfang.name == "") {
        this.$message.warning("请选择供应商");
        return false;
      } else if (this.formgongfang.type == "") {
        this.$message.warning("请选择类型");
        return false;
      }
      let path = this.getPath(this.formgongfang.type);
      this.$api.invest.CreateInvesMaster(this.formgongfang).then((res) => {
        if (res.success) {
          this.$router.push({
            path: `/invest/${path}/edit`,
            query: {
              id: res.returnValue1,
              supGuid: this.formgongfang.supGuid,
              type: 1, // 1:编辑，2：详情
            },
          });
        } else {
          this.$message.error(res.message);
        }
        // 原来代码
        // if (res.success) {
        //   this.$router.push({
        //     path: "/invest/invesEdit",
        //     query: { id: res.returnValue1, supGuid: this.formgongfang.supGuid },
        //   });
        // } else {
        //   this.$message.error(res.message);
        // }
      });
    },
    add() {
      this.formgongfang.masterName = "";
      this.formgongfang.name = "";
      this.flag1 = true;
      // this.$refs.formgongfang.resetFields();
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.loadQueryForm();
    },
    loadQueryFormsearch() {
      this.page.index = 1;
      this.loadQueryForm();
    },
    loadQueryForm() {
      this.loading = true;
      this.formSearch.SkipCount = (this.page.index - 1) * this.page.size;
      this.formSearch.MaxResultCount = this.page.size;
      this.$api.invest.GetLianDoInvesSupplierList(this.formSearch).then((res) => {
        this.loading = false;
        this.tableData = res.items;
        this.page.total = res.totalCount;
      });
    },
    handleEdit(row) {
      // eslint-disable-next-line no-unused-vars
      let path = this.getPath(row.type);
      this.$router.push({
        path: `/invest/${path}/edit`,
        query: {
          id: row.id,
          supGuid: row.supGuid,
          type: 1, // 1:编辑，2：详情
        },
      });
      // window.open(`#/invest/report1?masterId=`+row.id+'&supGuid='+row.supGuid);
    },
    delete1(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.DeleteInvesMaster({ id: id }).then((res) => {
            if (res.success) {
              this.$message.success(res.message);
              this.loadQueryForm();
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
