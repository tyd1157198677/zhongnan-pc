<!--  -->
<template>
  <div class="">
    <el-table
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="newData"
      v-loading="loading"
      :show-header="false"
      :height="newData.length > 7 ? 350 : newData.length * 49"
    >
      <el-table-column align="left" width="500">
        <template slot-scope="scope">
          <span>{{ scope.row.itemTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left">
        <template slot-scope="scope">
          <!-- <div v-if="type == 2">
            <span>{{ scope.row.item.itemType == "多选" ? scope.row.selectValue : scope.row.textValue }}</span>
          </div> -->
          <div>
            <el-input
              class="line"
              v-model="scope.row.formValue"
              :placeholder="scope.row.defaultValue"
              show-word-limit
              :maxlength="scope.row.maxLength"
              v-if="scope.row.itemType == '单行文本' || scope.row.itemType == '多行文本' || scope.row.itemType == '文本标题'"
            ></el-input>
            <div v-if="scope.row.itemType == '单选'">
              <el-radio-group v-model="scope.row.formValue">
                <el-radio v-for="item in scope.row.selectorNameValue" :label="item.selectorName" :key="item.selectorName">{{
                  item.selectorName
                }}</el-radio>
              </el-radio-group>
            </div>
            <div v-if="scope.row.itemType == '多选'">
              <el-checkbox-group v-model="scope.row.selectValue">
                <el-checkbox v-for="item in scope.row.selectorNameValue" :label="item.selectorName" :key="item.selectorName">
                  {{ item.selectorName }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="scope.row.itemType == '下拉'">
              <el-select class="select1" v-model="scope.row.formValue" placeholder="请选择">
                <el-option
                  v-for="item in scope.row.selectorNameValue"
                  :key="item.selectorName"
                  :label="item.selectorName"
                  :value="item.selectorName"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="btns">
      <el-button type="primary" size="mini" @click="save3">暂存信息</el-button>
    </div>
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
  computed: {
    newData() {
      if (this.dataArr.length > 0) {
        const res = this.dataArr.map(item => {
          item.selectValue = item.selectorNameValue
            .filter(e => e.selected)
            .map(s => {
              return s.selectorName;
            });
          return item;
        });
        return res;
      } else {
        return [];
      }
    },
  },
  created() {},
  mounted() {
    // this.GetModuleDynamicForm1();
  },
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
