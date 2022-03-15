<!--  -->
<template>
  <div class="">
    <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><b>8.劳务分包模式</b></el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="laoWuStyleList"
      v-loading="loading"
      :show-header="false"
    >
      <el-table-column align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.item.itemTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left">
        <template slot-scope="scope">
          <div v-if="type == 2">
            <span>{{ scope.row.item.itemType == "多选" ? scope.row.selectValue : scope.row.textValue }}</span>
          </div>
          <div v-else>
            <el-input
              class="line"
              v-model="scope.row.textValue"
              :placeholder="scope.row.item.defaultValue"
              v-if="scope.row.item.itemType == '单行文本' || scope.row.item.itemType == '多行文本' || scope.row.item.itemType == '文本标题'"
            ></el-input>
            <el-radio-group v-if="scope.row.item.itemType == '单选'" v-model="scope.row.textValue">
              <el-radio v-for="item in scope.row.selectorList" :label="item.selectorId" :key="item.selectorId">{{
                item.selectorText
              }}</el-radio>
            </el-radio-group>
            <el-checkbox-group v-model="scope.row.selectValue" v-if="scope.row.item.itemType == '多选'">
              <el-checkbox v-for="item in scope.row.selectorList" :label="item.selectorId" :key="item.selectorId">
                {{ item.selectorText }}
              </el-checkbox>
            </el-checkbox-group>
            <el-select v-if="scope.row.item.itemType == '下拉'" v-model="scope.row.textValue" placeholder="请选择">
              <el-option
                v-for="item in scope.row.selectorList"
                :key="item.selectorText"
                :label="item.selectorText"
                :value="item.selectorId"
              >
              </el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="btns">
      <el-button type="primary" size="mini" @click="save3" v-if="type == 1">暂存信息</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  components: {},
  data() {
    return {
      id: this.$route.query.id,
      laoWuStyleList: [],
      arr: [
        "/InvesLianDoDynamicForm/GetModuleDynamicForm1",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm2",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm3",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm4",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm5",
      ],
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetSupQuaLaborList_Index();
  },
  methods: {
    async GetSupQuaLaborList_Index() {
      let res = await this.$http.get("/SupQua/GetSupQuaLaborList_Index", { params: { masterId: this.$route.query.id } });
      //   console.log(res);
      //   res.data.forEach(item => {
      //     if (item.item.itemType == "单选" || item.item.itemType == "下拉") {
      //       if (item.selectorList.length > 0 && item.textValue) {
      //         item.textValue = item.selectorList.find(e => e.selectorId == item.textValue).selectorText;
      //       }
      //     } else if (item.item.itemType == "多选") {
      //       if (item.selectorList) {
      //         let arr = item.selectorList.filter(e => item.selectValue.indexOf(e.selectorId) > -1);
      //         item.selectValue = arr.map(s => s.selectorId);
      //       }
      //     }
      //   });
      this.laoWuStyleList = res.data;
    },

    save3() {
      let arr = this.laoWuStyleList.map(item => {
        return {
          itemId: item.item.id,
          itemSelectorId:
            item.item.itemType == "单行文本" || item.item.itemType == "多行文本"
              ? ["00000000-0000-0000-0000-000000000000"]
              : item.item.itemType == "多选"
              ? item.selectValue
              : [item.textValue],
          value: item.item.itemType == "单行文本" || item.item.itemType == "多行文本" ? item.textValue : "",
        };
      });
      let obj = {
        masterId: this.id,
        formValues: arr,
      };
      this.$http.post("/SupQua/SaveSupQuaLaborList_Persion", obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.$message.success(data.message);
          this.GetSupQuaLaborList_Index();
        } else {
          this.$message.error(data.message);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .line .el-input__inner {
  border: 0px solid #fff !important;
  border-bottom: 1px solid #ccc !important;
  border-radius: 0% !important;
}
::v-deep .select1.el-select {
  width: 100% !important;
}
.btns {
  margin: 10px 0;
  text-align: right;
}
</style>
