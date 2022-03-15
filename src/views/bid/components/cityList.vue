<template>
  <el-dialog width="70%" title="选择城市" :visible.sync="dialogVisible">
    <div style="height: 400px;overflow: auto">
      <div v-for="(item, index) in typeMind" :key="index">
        <div style="margin-bottom:10px;">
          <b>{{ item.provinceName }}</b>
        </div>
        <el-checkbox-group v-model="citys" size="mini">
          <el-checkbox-button v-for="e in item.cityList" :label="e.value" :key="e.value">{{ e.text }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm()" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ["cityId"],
  data() {
    return {
      typeMind: [],
      citys: [],
      dialogVisible: false,
    };
  },
  mounted() {
    this.fetchDepTree();
  },
  methods: {
    open() {
      this.dialogVisible = true;
      this.fetchDepTree();
    },
    close() {
      this.dialogVisible = false;
    },
    /**
     * 加载部门树
     */
    fetchDepTree() {
      this.$http.get("/SysTreeCate/GetAddressListForSelect").then(res => {
        let obj = [{ provinceName: "", cityList: res.data.cityList }];
        this.typeMind = obj.concat(res.data.provinceList);
        if (this.cityId.length > 0) {
          this.cityId.forEach(i => {
            this.citys.push(i);
          });
        }
      });
    },
    submitForm() {
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
      this.$emit("itemClick", arr2);
    },
  },
};
</script>

<style scoped>
::v-deep .el-checkbox-button--mini .el-checkbox-button__inner {
  border: 1px solid #eee;
}
::v-deep .el-checkbox-button.is-checked .el-checkbox-button__inner {
  box-shadow: 0px 0 0 #ccc;
}
</style>
