<!--  -->
<template>
  <el-main>
    <el-row id="page_main">
      <div style="text-align:right">
        <span class="headername">集团背调信息</span>
        <el-button type="primary" size="mini" @click="$router.back(-1)">返回</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>1.背调基本信息</b></el-breadcrumb-item>
        </el-breadcrumb>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right" style="width:150px">背调单位名称：</td>
              <td>
                <span>{{ $route.query.name }}</span>
              </td>
              <td class="right" style="width:150px">背调主题：</td>
              <td>
                <span v-if="type == 2">{{ base.backSubject }}</span>
                <el-input v-else v-model="base.backSubject" placeholder="请输入"></el-input>
              </td>
              <!-- <td class="right" style="width:150px">项目地址：</td>
            <td>
              <span v-if="type == 2">{{ base.projectAddress }}</span>
              <el-input v-else v-model="base.projectAddress" placeholder="请填写"></el-input>
            </td> -->
              <td class="right" style="width:120px">背调时间：</td>
              <td>
                <span v-if="type == 2">{{ parseTime(base.backGroundTime, "yyyy-MM-dd") }}</span>
                <el-date-picker v-else type="date" v-model="base.backGroundTime" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
              </td>
            </tr>
            <tr>
              <!-- <td class="right" style="width:150px">建设单位名称：</td>
            <td>
              <span v-if="type == 2">{{ base.buildCompanyName }}</span>
              <el-input v-else v-model="base.buildCompanyName" placeholder="请填写"></el-input>
            </td>
            <td class="right" style="width:150px">监理单位名称：</td>
            <td>
              <span v-if="type == 2">{{ base.guardCompanyName }}</span>
              <el-input v-else v-model="base.guardCompanyName" placeholder="请填写"></el-input>
            </td> -->
              <td class="right">背调责任人姓名：</td>
              <td>
                <span v-if="type == 2">{{ base.chargeName }}</span>
                <el-input v-else v-model="base.chargeName" placeholder="请填写"></el-input>
              </td>
              <td class="right">背调参与人姓名：</td>
              <td>
                <span v-if="type == 2">{{ base.playerName }}</span>
                <el-input v-else v-model="base.playerName" placeholder="请填写"></el-input>
              </td>
              <td class="right">备注：</td>
              <td>
                <span v-if="type == 2">{{ base.reamrk }}</span>
                <el-input v-else v-model="base.reamrk" placeholder="请填写"></el-input>
              </td>
            </tr>
            <!-- <tr>
            <td class="right" style="width:150px">背调对象姓名：</td>
            <td>
              <span v-if="type == 2">{{ base.backGroundName }}</span>
              <el-input v-else v-model="base.backGroundName" placeholder="请填写"></el-input>
            </td>
            <td class="right" style="width:150px">背调对象职务：</td>
            <td>
              <span v-if="type == 2">{{ base.backGroundPost }}</span>
              <el-input v-else v-model="base.backGroundPost" placeholder="请填写"></el-input>
            </td>
            <td class="right" style="width:150px">背调对象电话：</td>
            <td>
              <span v-if="type == 2">{{ base.backGroundTel }}</span>
              <el-input v-else v-model="base.backGroundTel" placeholder="请填写"></el-input>
            </td>
            <td></td>
            <td></td>
          </tr> -->
            <!-- <tr>
            <td class="right" style="width:150px">拟派项目经理姓名：</td>
            <td>
              <span v-if="type == 2">{{ base.managerName }}</span>
              <el-input v-else v-model="base.managerName" placeholder="请填写"></el-input>
            </td>
            <td class="right" style="width:150px">拟派项目经理电话：</td>
            <td>
              <span v-if="type == 2">{{ base.managerTel }}</span>
              <el-input v-else v-model="base.managerTel" placeholder="请填写"></el-input>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr> -->
          </tbody>
        </table>
        <div class="btns">
          <el-button v-if="type == 1" type="primary" size="mini" @click="save(1)">保存信息</el-button>
        </div>
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>2.背调渠道及情况</b></el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <el-button v-if="type == 1" @click="addxin()" style="float: right;margin-top:10px;margin-bottom:10px" size="mini" type="primary"
            >新增</el-button
          >
          <el-table
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData2"
            style="margin-bottom:20px"
            v-loading="loading"
          >
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <el-table-column prop="type" label="背调方式" align="center"></el-table-column>
            <el-table-column label="背调渠道" align="center">
              <el-table-column label="背调人" align="center" prop="backGroundName"></el-table-column>
              <el-table-column label="公司名称" align="center" prop="backGroundCompany"></el-table-column>
              <el-table-column label="职务" align="center" prop="backGroundPost"></el-table-column>
              <el-table-column label="电话" align="center" prop="backGroundTel"></el-table-column>
            </el-table-column>
            <el-table-column label="背调项目" align="center">
              <el-table-column label="项目名称" align="center" prop="projectName"></el-table-column>
              <el-table-column label="项目地址" align="center" prop="projectAddress"></el-table-column>
              <el-table-column label="建设单位" align="center" prop="buildCompanyName"></el-table-column>
            </el-table-column>
            <!-- <el-table-column prop="moblie" label="背调情况" align="center">
              <template slot-scope="scope">
                <el-link
                  class="sp el-icon-search"
                  type="primary"
                  style="color:#409eff;text-decoration: none"
                  @click="jumpDetail(scope.row.id)"
                  >{{ scope.row.projectOther }}</el-link
                >
                <span>{{ scope.row.projectOther }}</span>
              </template>
            </el-table-column> -->
            <el-table-column prop="backResultType" label="背调结果" align="center"> </el-table-column>
            <el-table-column prop="backResultRemark" label="备注" align="center"> </el-table-column>
            <el-table-column label="操作" align="center" :width="type == 1 ? 120 : 80">
              <template slot-scope="scope">
                <i v-if="type == 1" @click="edit1(scope.row.id)" class="el-icon-edit" title="编辑" />
                <i v-if="type == 1" @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin: 0 10px" />
                <i @click="jumpDetail(scope.row.id)" class="el-icon-search" title="查看详情"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>3.综合评价</b></el-breadcrumb-item>
        </el-breadcrumb>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right" style="width:110px">总体评价：</td>
              <td colspan="5">
                <span v-if="type == 2">{{ base.evaluate }}</span>
                <el-input
                  type="textarea"
                  v-else
                  v-model="base.evaluate"
                  placeholder="评价信息涵盖承接模式、质量调研、工期调研、劳务模式、项目经理能力、资金调研、恶性行为等方面的内容"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="right" style="width:110px">履约情况：</td>
              <td colspan="5">
                <span v-if="type == 2">{{ base.performance }}</span>
                <el-input v-else type="textarea" v-model="base.performance" placeholder="请填写"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btns">
          <el-button v-if="type == 1" type="primary" size="mini" @click="save(2)">保存信息</el-button>
        </div>
        <el-dialog title="背调内容" :visible.sync="dialogVisible">
          <el-table
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="list"
            v-loading="loading"
            :show-header="false"
            :span-method="objectSpanMethod"
            height="450"
          >
            <el-table-column align="center" width="130">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left">
              <template slot-scope="scope">
                <span>{{ scope.row.itemTitle }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="formValue"> </el-table-column>
          </el-table>
          <!--          <div style="margin-top:10px;margin-bottom:10px">-->
          <!--            <el-input v-model="itemValuestext" type="textarea" maxlength="1000"></el-input>-->
          <!--          </div>-->
        </el-dialog>
        <div class="btns" style="margin-top:30px">
          <!-- <el-button v-if="type == 1" type="primary" size="mini" @click="save(3)">保存信息</el-button> -->
          <el-button v-if="type == 1" type="primary" size="mini" @click="save(4)">提交审核</el-button>
        </div>
        <subJectTree title="项目" :level="2" ref="subJectTree" @itemClick="subJectTree"></subJectTree>
      </div>
    </el-row>
  </el-main>
</template>

<script>
import subJectTree from "@/views/bid/components/subJectTree";
import { parseTime } from "@/util";
export default {
  components: {
    subJectTree,
  },
  data() {
    return {
      dialogVisible: false,
      tableData2: [],
      base: {
        itemValuestext: "",
      },
      loading: false,
      spanArr1: [],
      type: this.$route.query.type,
      list: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetBackGroundById();
    this.GetModuleDynamicForm();
  },
  methods: {
    parseTime,
    jumpDetail(id) {
      this.$http
        .get("/BackGroundResultAppServices/GetBackGroundResultItemsById_Group", {
          params: { id },
        })
        .then(res => {
          this.base = res.data;
          res.data.itemValues.forEach(item => {
            item.data.forEach(v => {
              v.title = item.title;
            });
          });
          this.list = res.data.itemValues
            .map(e => {
              return e.data.map(v => {
                return v;
              });
            })
            .reduce((a, b) => {
              return a.concat(b);
            });

          this.list.forEach(item => {
            item.selectValue = [];
          });
          console.log(this.list);
          this.spanArr1 = this.spanArr.getSpanArr(this.list, "title");
        });
      this.dialogVisible = true;
    },
    addxin() {
      this.$router.push({
        path: "/supplier/jtbackGroundadd",
        query: {
          resId: this.$route.query.id,
        },
      });
    },
    edit1(id) {
      this.$router.push({
        path: "/supplier/jtbackGroundadd",
        query: {
          resId: this.$route.query.id,
          id,
        },
      });
    },
    subJectAdd() {
      this.$refs.subJectTree.open();
    },
    delete1(id) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/BackGroundResultAppServices/DelBackGroundItem", { id }).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetModuleDynamicForm();
          } else {
            this.$msg.warning(res.data.message);
          }
        });
      });
    },
    subJectTree(sub) {
      this.base.projectId = sub.id;
      this.base.projectName = sub.projectFullName;
      this.$refs.subJectTree.close();
    },
    save(i) {
      switch (i) {
        case 1:
          let base = this.base;
          let obj = {
            resId: this.$route.query.id,
            buildCompanyName: base.buildCompanyName,
            backSubject: base.backSubject,
            backGroundTime: base.backGroundTime,
            chargeName: base.chargeName,
            playerName: base.playerName,
            reamrk: base.reamrk,
          };
          this.$http.post("/BackGroundResultAppServices/EditBackGround1", obj).then(res => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
            } else {
              this.$msg.warning(res.data.message);
            }
          });
          break;
        case 2:
          let obj1 = {
            resId: this.$route.query.id,
            evaluate: this.base.evaluate,
            performance: this.base.performance,
          };
          this.$http.post("/BackGroundResultAppServices/EditBackGround2", obj1).then(res => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
            } else {
              this.$msg.warning(res.data.message);
            }
          });
          break;
        case 3:
          var arr = [];
          for (var i = 0; i < this.list.length; i++) {
            var item = this.list[i];
            var p = {
              id: item.id == "00000000-0000-0000-0000-000000000000" ? "" : item.id,
              itemId: item.itemId,
              inputValues: item.itemType == "多选" ? item.selectValue : [item.formValue],
            };
            arr.push(p);
          }
          let obj2 = {
            resId: this.$route.query.id,
            itemValues: arr,
          };
          this.$http.post("/BackGroundResultAppServices/SaveModuleDynamicForm", obj2).then(res => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
            } else {
              this.$msg.warning(res.data.message);
            }
          });
          break;
        case 4:
          this.$confirm("提交后将不能修改，确定要提交吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let obj3 = {
              id: this.$route.query.id,
            };
            this.$http.post("/BackGroundResultAppServices/SubmitBackGround", obj3).then(res => {
              if (res.data.success) {
                this.$msg.success(res.data.message);
                this.$router.push({
                  path: "/supplier/backGroundResult",
                });
              } else {
                this.$msg.warning(res.data.message);
              }
            });
          });
      }
    },
    //获取基本信息
    GetBackGroundById() {
      this.$http.get("/BackGroundResultAppServices/GetBackGroundById", { params: { resId: this.$route.query.id } }).then(res => {
        this.base = res.data;
      });
    },
    GetModuleDynamicForm() {
      this.$http.get("/BackGroundResultAppServices/GetBackGroundResultItemsList", { params: { resId: this.$route.query.id } }).then(res => {
        this.tableData2 = res.data;
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 页面列表上 表格合并行 -> 第几列(从0开始)
      // 需要合并多个单元格时 依次增加判断条件即可

      if (columnIndex === 0) {
        //       // 二维数组存储的数据 取出
        let _row = this.spanArr1[rowIndex];
        let _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#page_main {
  padding-bottom: 90px;
}
.btns {
  text-align: right;
  margin: 10px 0;
}
.headername {
  text-align: left;
  padding-left: 1rem;
  color: #409eff;
  font-weight: 600;
  float: left;
}
</style>
