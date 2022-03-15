<!--  -->
<template>
  <el-main>
    <el-row id="page_main">
      <div style="text-align:right">
        <el-button type="primary" size="mini" @click="$router.back(-1)">返回</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>1.背调基本信息</b></el-breadcrumb-item>
        </el-breadcrumb>
        <table class="layui-table el-table__body">
          <tbody>
          <tr>
            <td class="right" style="width:180px">背调单位名称：</td>
            <td>
              <span>{{ base.supName }}</span>
            </td>
            <td class="right" style="width:180px">项目名称：</td>
            <td>
              <span v-if="type == 2">{{ base.projectName }}</span>
              <el-input v-else v-model="base.projectName" placeholder="请选择" @focus="subJectAdd"></el-input>
            </td>
            <td class="right" style="width:150px">项目地址：</td>
            <td>
              <span v-if="type == 2">{{ base.projectAddress }}</span>
              <el-input v-else v-model="base.projectAddress" placeholder="请填写"></el-input>
            </td>
            <td class="right" style="width:150px">背调时间：</td>
            <td>
              <span v-if="type == 2">{{ base.backGroundTime }}</span>
              <el-date-picker v-else type="date" v-model="base.backGroundTime" value-format="yyyy-MM-dd" placeholder="选择日期">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td class="right" style="width:150px">建设单位名称：</td>
            <td>
              <span v-if="type == 2">{{ base.buildCompanyName }}</span>
              <el-input v-else v-model="base.buildCompanyName" placeholder="请填写"></el-input>
            </td>
            <td class="right" style="width:150px">监理单位名称：</td>
            <td>
              <span v-if="type == 2">{{ base.guardCompanyName }}</span>
              <el-input v-else v-model="base.guardCompanyName" placeholder="请填写"></el-input>
            </td>
            <td class="right" style="width:150px">背调责任人姓名：</td>
            <td>
              <span v-if="type == 2">{{ base.chargeName }}</span>
              <el-input v-else v-model="base.chargeName" placeholder="请填写"></el-input>
            </td>
            <td class="right" style="width:150px">背调参与人姓名：</td>
            <td>
              <span v-if="type == 2">{{ base.playerName }}</span>
              <el-input v-else v-model="base.playerName" placeholder="请填写"></el-input>
            </td>
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          </tbody>
        </table>
        <div class="btns">
          <el-button v-if="type == 1" type="primary" size="mini" @click="save(1)">保存信息</el-button>
        </div>
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>2.背调方式</b></el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin-top:10px">
          <el-radio-group v-model="base.type" @change="save(2)">
            <el-radio label="现场背调">现场背调</el-radio>
            <el-radio label="电话背调">电话背调</el-radio>
            <el-radio label="默拜">默拜</el-radio>
          </el-radio-group>
        </div>
        <!-- <div class="btns">
          <el-button v-if="type == 1" type="primary" size="mini" @click="save(2)">保存信息</el-button>
        </div> -->
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>3.背调内容</b></el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="list"
          v-loading="loading"
          :show-header="false"
          :span-method="objectSpanMethod"
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
          <el-table-column align="left">
            <template slot-scope="scope">
              <div style=";margin-right:10px">
                <el-input
                  class="line"
                  v-model="scope.row.formValue"
                  :placeholder="scope.row.defaultValue"
                  v-if="scope.row.itemType == '单行文本' || scope.row.itemType == '多行文本'"
                ></el-input>

                <el-radio-group v-if="scope.row.itemType == '单选'" v-model="scope.row.formValue">
                  <el-radio v-for="item in scope.row.selectorNameValue" :label="item.selectorName" :key="item.selectorName">{{
                    item.selectorName
                    }}</el-radio>
                </el-radio-group>
                <el-checkbox-group v-model="scope.row.selectValue" v-if="scope.row.itemType == '多选'">
                  <el-checkbox v-for="item in scope.row.selectorNameValue" :label="item.selectorName" :key="item.selectorName">
                    {{ item.selectorName }}
                  </el-checkbox>
                </el-checkbox-group>
                <el-select v-if="scope.row.itemType == '下拉'" v-model="scope.row.formValue" placeholder="请选择">
                  <el-option
                    v-for="item in scope.row.selectorNameValue"
                    :key="item.selectorName"
                    :label="item.selectorName"
                    :value="item.selectorName"
                  >
                  </el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="btns">
          <el-button v-if="type == 1" type="primary" size="mini" @click="save(3)">保存信息</el-button>
          <el-button v-if="type == 1" type="primary" size="mini" @click="save(4)">提交审核</el-button>
        </div>
        <subJectTree title="项目" :level="2" ref="subJectTree" @itemClick="subJectTree"></subJectTree>
      </div>
    </el-row>
  </el-main>
</template>

<script>
  import subJectTree from "@/views/bid/components/subJectTree";
  export default {
    components: {
      subJectTree,
    },
    data() {
      return {
        base: {},
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
      subJectAdd() {
        this.$refs.subJectTree.open();
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
              projectId: base.projectId,
              buildCompanyName: base.buildCompanyName,
              guardCompanyName: base.guardCompanyName,
              projectAddress: base.projectAddress,
              backGroundTime: base.backGroundTime,
              backGroundName: base.backGroundName,
              backGroundPost: base.backGroundPost,
              backGroundTel: base.backGroundTel,
              managerName: base.managerName,
              managerTel: base.managerTel,
              chargeName: base.chargeName,
              playerName: base.playerName,
              dutyPersionName: base.dutyPersionName,
              joinPersionName: base.joinPersionName,
            };
            this.$http.post("/BackGroundResultGroupAppServices/EditBackGround1", obj).then(res => {
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
              type: this.base.type,
            };
            this.$http.post("/BackGroundResultGroupAppServices/EditBackGround2", obj1).then(res => {
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
            this.$http.post("/BackGroundResultGroupAppServices/SaveModuleDynamicForm", obj2).then(res => {
              if (res.data.success) {
                this.$msg.success(res.data.message);
                this.GetModuleDynamicForm();
              } else {
                this.$msg.warning(res.data.message);
              }
            });
            break;
          case 4:
            let obj3 = {
              id: this.$route.query.id,
            };
            this.$http.post("/BackGroundResultGroupAppServices/SubmitBackGround", obj3).then(res => {
              if (res.data.success) {
                this.$msg.success(res.data.message);
                this.$router.push({
                  path: "/supplier/backGroundResult",
                });
              } else {
                this.$msg.warning(res.data.message);
              }
            });
            break;
        }
      },
      //获取基本信息
      GetBackGroundById() {
        this.$http.get("/BackGroundResultGroupAppServices/GetBackGroundById", { params: { resId: this.$route.query.id } }).then(res => {
          this.base = res.data;
        });
      },
      GetModuleDynamicForm() {
        this.$http.get("/BackGroundResultGroupAppServices/GetModuleDynamicForm", { params: { masterId: this.$route.query.id } }).then(res => {
          res.data.forEach(item => {
            item.data.forEach(v => {
              v.title = item.title;
            });
          });
          this.list = res.data
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
          console.log(this.listitemValues);
          this.spanArr1 = this.spanArr.getSpanArr(this.list, "title");
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
</style>
