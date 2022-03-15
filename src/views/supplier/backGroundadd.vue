<!--  -->
<template>
  <el-main>
    <el-row id="page_main">
      <div style="text-align:right">
        <el-button type="primary" size="mini" @click="$router.back(-1)">返回</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>1.背调方式</b></el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin-top:10px">
          <el-radio-group v-model="base.type">
            <el-radio label="现场背调">现场背调</el-radio>
            <el-radio label="电话背调">电话背调</el-radio>
            <el-radio label="第三方">第三方</el-radio>
            <el-radio label="行业协会">行业协会</el-radio>
            <el-radio label="其他"
              >其他
              <!-- <el-input></el-input> -->
            </el-radio>
          </el-radio-group>
        </div>
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>2.背调渠道</b></el-breadcrumb-item>
        </el-breadcrumb>
        <table class="layui-table el-table__body" style="margin-top:10px;margin-bottom:10px">
          <tbody>
            <tr>
              <td class="right" style="width:90px">背调人：</td>
              <td>
                <el-input v-model="base.backGroundName" placeholder="请填写"></el-input>
              </td>
              <td class="right" style="width:110px">公司名称：</td>
              <td>
                <el-input v-model="base.backGroundCompany" placeholder="请填写"></el-input>
              </td>
              <td class="right" style="width:80px">职务：</td>
              <td>
                <el-input v-model="base.backGroundPost" placeholder="请填写"></el-input>
              </td>
              <td class="right" style="width:120px">联系方式</td>
              <td>
                <el-input v-model="base.backGroundTel" placeholder="请填写"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>3.背调项目</b></el-breadcrumb-item>
        </el-breadcrumb>
        <table class="layui-table el-table__body" style="margin-top:10px;margin-bottom:10px">
          <tbody>
            <tr>
              <td class="right" style="width:120px">项目名称：</td>
              <td>
                <el-input v-model="base.projectName" placeholder="请填写"></el-input>
              </td>
              <td class="right" style="width:120px">项目地址：</td>
              <td>
                <el-input v-model="base.projectAddress" placeholder="请填写"></el-input>
              </td>
              <td class="right" style="width:120px">建设单位：</td>
              <td>
                <el-input v-model="base.buildCompanyName" placeholder="请填写"></el-input>
              </td>
              <td class="right" style="width:120px">其他信息：</td>
              <td>
                <el-input v-model="base.projectOther" placeholder="请填写"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>4.背调内容</b></el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-table
          height="350"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="list"
          style="margin-top:10px;margin-bottom:10px"
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
        </el-table> -->
        <div style="margin-top:10px;margin-bottom:10px">
          <el-input type="textarea" v-model="base.itemValuestext" maxlength="250"></el-input>
        </div>
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>5.背调结果</b></el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin-top:10px">
          <el-radio-group v-model="base.backResultType">
            <el-radio label="没有问题">没有问题</el-radio>
            <el-radio label="有问题">有问题</el-radio>
            <el-radio label="其他">其他</el-radio>
          </el-radio-group>
        </div>
        <div style="margin-top:10px">
          <el-form>
            <el-form-item label="备注：">
              <el-input placeholder="请填写" v-model="base.backResultRemark" style="width:200px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btns">
          <el-button type="primary" size="mini" @click="save">保存信息</el-button>
        </div>
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
      dialogVisible: false,
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
    if (!this.$route.query.id) {
      // this.base=this.base
    }
  },
  methods: {
    //获取基本信息
    GetBackGroundById() {
      this.$http
        .get(
          "/BackGroundResultAppServices/GetBackGroundResultItemsById",
          !this.$route.query.id
            ? ""
            : {
                params: { Id: this.$route.query.id },
              }
        )
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
    },

    subJectTree(sub) {
      this.base.projectId = sub.id;
      this.base.projectName = sub.projectFullName;
      this.$refs.subJectTree.close();
    },
    save() {
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
      this.base.id = !this.$route.query.id ? "" : this.$route.query.id;
      this.base.itemValues = [];
      let obj2 = {
        id: !this.$route.query.id ? "" : this.$route.query.id,
        resId: this.$route.query.resId,
        type: !this.base.type ? "" : this.base.type,
        backGroundName: !this.base.backGroundName ? "" : this.base.backGroundName,
        backGroundCompany: !this.base.backGroundCompany ? "" : this.base.backGroundCompany,
        backGroundPost: !this.base.backGroundPost ? "" : this.base.backGroundPost,
        backGroundTel: !this.base.backGroundTel ? "" : this.base.backGroundTel,
        projectName: !this.base.projectName ? "" : this.base.projectName,
        projectAddress: !this.base.projectAddress ? "" : this.base.projectAddress,
        buildCompanyName: !this.base.buildCompanyName ? "" : this.base.buildCompanyName,
        projectOther: !this.base.projectOther ? "" : this.base.projectOther,
        backResultType: !this.base.backResultType ? "" : this.base.backResultType,
        backResultRemark: !this.base.backResultRemark ? "" : this.base.backResultRemark,
        itemValuestext: !this.base.itemValuestext ? "" : this.base.itemValuestext,
        itemValues: arr,
      };
      this.$http.post("/BackGroundResultAppServices/EditBackGroundItem", obj2).then(res => {
        if (res.data.success) {
          this.$msg.success(res.data.message);
        } else {
          this.$msg.warning(res.data.message);
        }
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
