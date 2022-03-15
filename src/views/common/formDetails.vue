<!--  -->
<template>
  <div class="">
    <!-- :height="dataArr.length > 7 ? 350 : dataArr.length * 49" -->
    <el-table
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="dataArr"
      v-loading="loading"
      :show-header="false"
    >
      <el-table-column align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.itemTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left">
        <template slot-scope="scope">
          <div>
            <div v-if="scope.row.itemType != '多选'">{{ scope.row.formValue }}</div>
            <div v-if="scope.row.itemType == '多选'">
              <span v-for="(it, i) in scope.row.selectorNameValue" :key="i">
                <span v-if="it.selected" style="margin-right:2em;">{{ it.selectorName }}</span>
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    // dataArr:[],
    dataArr: {
      type: Array,
      default: [],
    },
    type: {
      type: Number,
      default: 100,
    },
    basetype: {},
    seNumber: {},
    tit: {
      type: String,
    },
  },
  components: {},
  data() {
    return {
      id: this.$route.query.id,
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    save3() {
      let st = this.dataArr;
      let arr = st.map(item => {
        return {
          itemId: item.itemId,
          id: item.id,
          inputValues: item.itemType == "多选" ? item.selectValue : [item.formValue],
        };
      });
      let obj = {
        masterId: this.id,
        itemValues: arr,
        type: this.basetype,
      };
      this.$http
        .post(this.type == 3 ? "/InvesLianDoDynamicForm/SaveInvesLianDoForm" : "/FormValue/SaveInvesLianDoFormQuality", obj)
        .then(res => {
          let data = res.data;
          if (data.success) {
            this.$message.success(data.message);
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
