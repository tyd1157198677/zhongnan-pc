<!--  -->
<template>
  <div class="">
    <el-table
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="resonBase"
      v-loading="loading"
      :show-header="false"
      :height="type1 == 2 ? resonBase.length * 32 + 1 : resonBase.length > 7 ? 350 : resonBase.length * 49"
    >
      <el-table-column align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.itemTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left">
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.itemType != '多选'">{{ scope.row.formValue }}</span>
            <span v-else>{{ scope.row.selectValue.toString() }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["type"],
  components: {},
  data() {
    return {
      id: this.$route.query.id,
      resonBase: [],
      arr: [
        "/InvesLianDoDynamicForm/GetModuleDynamicForm1",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm2",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm3",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm4",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm5",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm6",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm7",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm8",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm9",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm10",
        "/InvesLianDoDynamicForm/GetModuleDynamicForm11",
      ],
      loading: false,
    };
  },
  computed: {
    type1() {
      return this.$route.query.type;
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.GetModuleDynamicForm1();
  },
  methods: {
    //实际承包人基本情况（如有）信息
    GetModuleDynamicForm1() {
      this.$http.get(this.arr[this.type], { params: { masterId: this.id } }).then(res => {
        // let type = this.type;
        // if (type == 2) {
        res.data.forEach(item => {
          item.selectValue = item.selectorNameValue
            .filter(e => e.selected)
            .map(s => {
              return s.selectorName;
            });
        });
        // }
        this.resonBase = res.data;
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
