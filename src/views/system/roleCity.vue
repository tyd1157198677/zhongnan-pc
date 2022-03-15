<template>
  <!--应用权限设置页面-->
  <el-container>
    <!--右边列表-->
    <div style="width: 100%;overflow: hidden">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card class="box-card" shadow="never" :body-style="{ padding: '10px', height: '510px' }" style="margin-left:5px">
            <el-row slot="header" type="flex" justify="space-between" align="middle">
              <div class="headertitle">已设人员</div>
              <div class="flex between">
                <el-input type="text" style="width: 150px;margin-right: 10px" placeholder="请输入城市名称" clearable v-model="cityName">
                </el-input>
                <el-input type="text" style="width: 150px;margin-right: 10px" placeholder="请输入人员姓名" clearable v-model="userName">
                </el-input>

                <el-select v-model="value2" placeholder="请选择层级" style="width: 130px;">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <el-button size="small" class="m-l-15" @click="leftsearchfnc()">搜索</el-button>
              </div>
            </el-row>
            <el-table
              :data="fileListyi"
              v-loading="loading"
              border
              stripe
              height="450"
              :row-style="{ height: '41px' }"
              :cell-style="{ padding: '6px' }"
              :header-cell-style="tableHeaderColor"
              style="width: 100%"
              row-key="id"
              ref="tableleft"
            >
              <el-table-column label="序号" align="center" width="70" type="index"> </el-table-column>
              <el-table-column label="姓名" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="城市" align="center">
                <template slot-scope="scope" style="text-align: left">
                  <span>{{ scope.row.cityName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="层级" align="center" prop="level"></el-table-column>
              <el-table-column label="操作" align="center" width="130">
                <template slot-scope="scope">
                  <!--<span><i icon="el-icon-delete"></i></span>-->
                  <el-button type="text" @click="postDelete(scope.row.id)" title="删除" icon="el-icon-delete"></el-button>
                  <span><i icon="el-icon-document-copy"></i></span>
                  <el-button type="text" @click="copy2(scope.row.id)" title="复制" icon="el-icon-document-copy"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pagination
              :total="lefttotalCount"
              :current-page="leftCurrentPage"
              :pageSize="leftpagesize"
              :pageSizes="[5, 10, 20, 50]"
              @pageChange="leftpageChange"
            />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card m-l-15" shadow="never" :body-style="{ padding: '10px', height: '510px' }">
            <el-row slot="header" type="flex" justify="space-between" align="middle">
              <div class="headertitle">新增人员</div>
              <div class="flex between">
                <el-input type="text" style="width: 90%" placeholder="请输入内容" clearable v-model="searchPersonNew"> </el-input>
                <el-button size="small" class="m-l-15" @click="rightsearchfnc(searchPersonNew)">搜索</el-button>
              </div>
            </el-row>
            <el-table
              :data="fileListNew"
              v-loading="loading"
              border
              stripe
              height="450"
              :row-style="{ height: '41px' }"
              :cell-style="{ padding: '6px' }"
              :header-cell-style="tableHeaderColor"
              style="width: 100%"
              row-key="id"
              ref="tablenew"
            >
              <el-table-column label="序号" align="center" width="70" type="index"></el-table-column>
              <el-table-column label="姓名" align="center" width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="所属单位" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.orgName }}-{{ scope.row.deptFullName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="登录名" align="center" width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.loginId }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="70">
                <template slot-scope="scope">
                  <el-button type="text" @click="posAdd(scope.row.userGuid, scope.row.userName)" icon="el-icon-setting"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页-->
            <pagination
              :total="righttotalCount"
              :current-page="rightCurrentPage"
              :pageSize="rightpagesize"
              :pageSizes="[5, 10, 20, 50]"
              @pageChange="rightpageChange"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog width="78%" title="选择城市" :visible.sync="dialogVisible">
      <div style="height: 400px;overflow: auto">
        <div v-for="(item, index) in typeMind" :key="index" :value="value">
          <div style="margin-bottom:10px;">
            <b>{{ item.provinceName }}</b>
            <el-checkbox v-if="index != 0" :v-model="index" @change="handleCheckAllChange(index)" style="margin-left: 30px;"
              >全选</el-checkbox
            >
          </div>
          <el-checkbox-group v-model="citys" size="mini">
            <el-checkbox-button v-for="e in item.cityList" :label="e.value" :key="e.value">{{ e.text }}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        层级：
        <el-select v-model="value3" placeholder="请选择层级" style="width: 130px;margin-right: 10px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm()" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="30%" title="复制权限" :visible.sync="dialogVisible2">
      <el-input
        type="text"
        style="width: 300px;margin-right: 10px"
        placeholder="请填写目标用户登录名"
        clearable
        v-model="loginName"
      ></el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm2()" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { validateUpperCase } from "../../util/validate";

export default {
  name: "parameterSettings",
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "集团",
          label: "集团",
        },
        {
          value: "项目",
          label: "项目",
        },
      ],
      m: [],
      value3: "",
      value2: "",
      cityName: "",
      userName: "",
      citys: [],
      text: "",
      value: "",
      provinceName: "",
      city: "",
      citysheng: "",
      citymore: "",
      province: "",
      indexactive: 0,
      dialogVisible: false,
      dialogVisible2: false,
      loading: true, // 表格状态
      searchPerson: "", // 搜索已设人员
      searchPersonNew: "", // 搜索新增人员
      fileListyi: [
        {
          userName: "",
        },
      ], // 已设人员列表
      fileListNew: [
        {
          userGuid: "",
        },
      ], // 新增人员列表
      disabledleft: true,
      disablednew: true,
      tablemultipleSelection: [], // 已设人员选中的
      tablemultipleSelectionNew: [], // 新增人员选中的
      leftCurrentPage: 1, // 默认页数
      lefttotalCount: 0,
      leftpagesize: 10,
      rightCurrentPage: 1, // 右侧默认页数
      righttotalCount: 0,
      rightpagesize: 10,
      currentRow: "", // 编辑权限当前行
      userId: "",
      typeMind: [],
      typeMinds: [],
      procity: [],
      provinceList: [],
      checkAll: false,
      userGuid2: "",
      loginName: "",
      // userRoleNamesSubStan: JSON.parse(this.$store.state.userRoleNamesSubStan), // 登录用户权限
    };
  },
  mounted() {
    this.getPageNewPerson();
    this.getPageParameter();
  },
  computed: {
    // 按多少条数据获取
    count() {
      if (this.files_count !== 10) {
        return this.files_count;
      }
      return this.$store.state.pageCount;
    },
  },
  methods: {
    openM(msg) {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [h("span", null, msg), h("i", { style: "color: teal" }, "")]),
      }).then(action => {});
    },
    submitForm2() {
      this.$http.post("/SupAuth/AuthCopy", { id: this.userGuid2, loginId: this.loginName }).then(res => {
        // this.openM(res.data.message);
        this.$alert(res.data.message, {
          confirmButtonText: "确定",
        }).then(res => {
          this.dialogVisible2 = false;
          this.getPageParameter();
        });
      });
    },
    copy2(id) {
      this.dialogVisible2 = true;
      this.userGuid2 = id;
      this.loginName = "";
    },
    handleCheckAllChange(index) {
      var list = this.typeMind[index].cityList;
      var c = [];
      if (this.checkAll) {
        for (var i = 0; i < this.citys; i++) {
          var flag = 0;
          for (var j = 0; j < list.length; j++) {
            if (this.citys[i] == list[j].value) {
              flag++;
            }
          }
          if (flag == 0) {
            c.push(this.citys[i]);
          }
        }
        this.citys = c;
        this.checkAll = false;
      } else {
        for (var i = 0; i < list.length; i++) {
          this.citys.push(list[i].value);
        }
        this.checkAll = true;
      }
    },
    // 新增人员列表
    getPageNewPerson() {
      this.loading = true;
      const obj = {
        SkipCount: (this.rightCurrentPage - 1) * this.rightpagesize,
        MaxResultCount: this.rightpagesize,
        SubCompanyCode: this.subCompanyCode,
        UserNameMobileEmail: this.searchPersonNew,
      };
      this.$http
        .get("/IdmUserInfo/GetUserList", {
          params: obj,
        })
        .then(res => {
          this.righttotalCount = res.data.result.totalCount;
          this.fileListNew = res.data.result.items;
          this.loading = false;
        });
    },

    /*
     * 自定表格头部样式
     */
    tableHeaderColor() {
      return "background-color: #d3d3d3;color: #333;";
    },
    /*
     * 删除某一条数据
     */
    async postDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$http.post("/SupAuth/RemoveUserAuth", { id: id }).then(res => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.getPageParameter();
        });
      });
    },
    /*
     * 新增某一条数据
     */
    posAdd(userGuid, userName) {
      this.dialogVisible = true;
      this.cityId = "";
      this.citys = [];
      this.value3 = "";
      // this.$http.get("/SupAuth/GetSupUserCityList", { params: { userGuid } }).then(res => {
      //   if (res.data.length > 0) {
      //     this.citys = res.data.map(item => item.cityId);
      //   }
      // });

      this.$http.get("/SysTreeCate/GetAddressListForSelect").then(res => {
        let obj = [{ provinceName: "", cityList: res.data.cityList }];
        this.typeMind = obj.concat(res.data.provinceList);
        this.m = res.data.provinceList;
        this.userGuid = userGuid;
      });
    },
    submitForm() {
      console.log(this.citys);
      // if (!this.value3) {
      //   this.$message.error("请选择层级");
      //   return;
      // }
      let arr = [];
      this.typeMind.forEach(item => {
        item.cityList.forEach(v => {
          arr.push(v);
        });
      });
      let arr1 = arr.filter(n => {
        return this.citys.indexOf(n.value) != -1;
      });
      let arr2 = arr1.map(item => {
        return {
          cityId: item.value,
          cityName: item.text,
        };
      });
      this.$http
        .post("/SupAuth/SaveUserCityAuth", {
          userGuid: this.userGuid,
          userName: this.userName,
          cityInfos: arr2,
          level: this.value3,
        })
        .then(res => {
          res.status == 200 ? this.$message.success(res.message || res.data.message) : this.$message.error(res.message || res.data.message);

          this.dialogVisible = false;
          this.userName = this.fileListyi.userName;
          console.log(this.userName);
          this.getPageNewPerson();
          this.getPageParameter();
        });
    },
    // 已设人员列表
    getPageParameter() {
      this.loading = true;
      // this.userName = this.fileListyi.userName;
      const obj = {
        SkipCount: (this.leftCurrentPage - 1) * this.leftpagesize,
        MaxResultCount: this.leftpagesize,
        UserName: this.userName,
        cityName: this.cityName,
        level: this.value2,
      };
      this.$http
        .get("/SupAuth/GetSupAuthUserList", {
          params: obj,
        })
        .then(res => {
          // this.lefttotalCount = res.data.totalCount;
          this.fileListyi = res.data.result.items;
          this.lefttotalCount = res.data.result.totalCount;
          this.loading = false;
        });
    },
    // 已设人员搜索
    leftsearchfnc() {
      this.leftCurrentPage = 1; // 默认页数
      this.leftpagesize = 10;
      this.getPageParameter();
    },
    // 新增人员搜索
    rightsearchfnc() {
      this.rightCurrentPage = 1;
      this.rightpagesize = 10;
      // this.rightCurrentPage = 1;
      this.getPageNewPerson();
    },
    // 已设人员分页
    leftpageChange(page) {
      this.leftpagesize = page._pageSize;
      this.leftCurrentPage = page._currentPage;
      this.getPageParameter();
    },
    // 新增人员分页
    rightpageChange(page) {
      this.rightpagesize = page._pageSize;
      this.rightCurrentPage = page._currentPage;
      this.getPageNewPerson();
    },
  },
};
</script>

<style lang="scss" scoped>
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
::v-deep.el-tabs__header .el-tabs__item:first-child {
  margin-left: 0px;
}
::v-deep.el-tabs--border-card > .el-tabs__header {
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  margin: 0;
  border-top: none;
}
::v-deep.el-card__header {
  padding: 10px 10px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
::v-deep.el-tabs__item.is-active {
  background: #fff !important;
  color: #409eff !important;
  margin-right: 1px;
}
::v-deep.el-tabs__header .el-tabs__item {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border: 1px solid #e4e7ed;
  margin-top: 0px;
  color: #333;
  margin-bottom: -1px;
}
::v-deep.el-tabs--border-card {
  background: #ffffff;
  border: 0px solid #dcdfe6;
}
::v-deep.el-tabs--border-card > .el-tabs__content {
  padding: 15px 0;
  overflow: inherit;
}
::v-deep.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
::v-deep.el-table th,
.el-table td {
  padding: 6px 0;
}
.el-table--group,
.el-table--border {
  border: 1px solid #ebeef5;
  height: 630px;
}
.type-list .list-ul .ul-li[data-v-44a1129a] {
  cursor: pointer;
  width: 90%;
}
::v-deep.type-list .list-ul .ul-li[data-v-44a1129a]:hover {
  width: 90%;
  height: 40px;
  padding-left: 15px;
  cursor: pointer;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
  background-color: rgb(211, 211, 211);
}
::v-deep.el-pager li {
  padding: 0 4px;
  background: #ffffff;
  vertical-align: top;
  display: inline-block;
  font-size: 13px;
  min-width: 24.5px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  margin: 0;
}
.type-list[data-v-44a1129a] {
  border: 1px solid #ebeef5;
  width: 100%;
  height: 100%;
  background: #fff;
}
.headertitle {
  padding-bottom: 5px;
  margin-top: -5px;
  font-size: 14px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/*分页样式*/
.paginationClass {
  width: 100%;
  text-align: right;
  padding: 15px 0;
}
.border-card {
  .el-table th,
  .el-table td {
    padding: 6px 0;
  }
}
/*列表样式*/
.type-list {
  border: 1px solid #ebeef5;
  width: 100%;
  height: 100%;
  background: #fff;
  .list-ul {
    width: 100%;
    .active-class {
      background: #409eff !important;
      color: #fff;
    }
    .ul-li {
      width: 90%;
      height: 40px;
      font-size: 14px;
      padding-left: 15px;
      line-height: 40px;
      border-bottom: 1px solid #ebeef5;
    }
    .ul-li:hover {
      width: 90%;
      height: 40px;
      padding-left: 15px;
      cursor: pointer;
      line-height: 40px;
      border-bottom: 1px solid #ebeef5;
      background-color: rgb(211, 211, 211);
    }
  }
}
.batch-set-button {
  position: absolute;
  top: -40px;
  right: 0;
  color: #ffffff;
  background-color: #409eff;
  border-color: #409eff;
}
::v-deep.tab_body {
  min-height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  border: 0px solid #e4e7ed;
  border-top: none;
}
::v-deep .el-checkbox-button--mini .el-checkbox-button__inner {
  border: 1px solid #eee;
}
::v-deep .el-checkbox-button.is-checked .el-checkbox-button__inner {
  box-shadow: 0px 0 0 #ccc;
}
</style>
