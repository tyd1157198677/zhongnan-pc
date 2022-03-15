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
      :height="resonBase.length > 7 ? 350 : resonBase.length * 49"
    >
      <el-table-column align="left">
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
            <el-select class="select1" v-if="scope.row.itemType == '下拉'" v-model="scope.row.formValue" placeholder="请选择">
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
      <el-button type="primary" size="mini" @click="save3">暂存信息</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: 100,
    },
    seNumber: {},
    tit: {
      type: String,
    },
  },
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
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetModuleDynamicForm1();
  },
  methods: {
    //实际承包人基本情况（如有）信息
    GetModuleDynamicForm1() {
      let obj = { masterId: this.id };
      let obj1 = { masterId: this.id, seNumber: this.seNumber };
      this.$http.get(this.arr[this.type], { params: this.tit == "新增信息" ? obj : obj1 }).then(res => {
        // let type = this.type;
        // if (type == 2) {
        res.data.forEach(item => {
          item.selectValue = item.selectorNameValue
            .filter(e => e.selected)
            .map(s => {
              return s.selectorName;
            });
          //   console.log(item.selectValue);
          // if (item.item.itemType == "单选" || item.item.itemType == "下拉") {.selectorName
          //   if (item.selectorList.length > 0 && item.textValue) {
          //     item.textValue = item.selectorList.find(e => e.selectorId == item.textValue).selectorText;
          //   }
          // } else if (item.item.itemType == "多选") {
          //   if (item.selectorList) {
          //     let arr = item.selectorList.filter(e => item.selectValue.indexOf(e.selectorId) > -1);
          //     item.selectValue = arr.map(s => s.selectorText).toString();
          //   }
          // }
        });
        // }
        this.resonBase = res.data;
      });
    },
    save3() {
      let st = this.resonBase;
      let arr = st.map(item => {
        return {
          itemId: item.itemId,
          id: item.id,
          inputValues: item.itemType == "多选" ? item.selectValue : [item.formValue],
        };
      });
      console.log(arr);
      let obj = {
        masterId: this.id,
        itemValues: arr,
      };
      this.$http
        .post(this.type == 3 ? "/InvesLianDoDynamicForm/SaveInvesLianDoForm" : "/FormValue/SaveInvesLianDoFormQuality", obj)
        .then(res => {
          let data = res.data;
          if (data.success) {
            this.$message.success(data.message);
            if (this.type == 3 || this.type == 4) {
              this.$emit("getBeiJigList");
            } else {
              this.GetModuleDynamicForm1();
            }
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
