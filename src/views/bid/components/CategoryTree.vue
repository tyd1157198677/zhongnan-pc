<template>
  <div style="padding-right: 10px">
    <div class="card">
      <!-- <div class="card-header">
        招标专业
      </div> -->
      <ul class="list-group list-group-flush">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable class="p-2"> </el-input>
        <el-tree
          node-key="id"
          :default-expanded-keys="keys1"
          default-expand-all
          style="height: 400px; overflow: scroll"
          ref="tree"
          :data="datas"
          :props="defaultProps"
          highlight-current
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        ></el-tree>
      </ul>
    </div>
  </div>
</template>
<script>
import "@/assets/css/supplier.css";

export default {
  name: "CategorytTree",
  data() {
    return {
      filterText: "",
      keys1: [],
      datas: [],
      defaultProps: {
        children: "children",
        label: "cateName",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.$http.get("/SysTreeCate/GetBidCateTree").then((res) => {
      // res.forEach((r) => {
      //   this.formatTreeData(r);
      // });
      console.log(res);
      this.keys1 = res.data.map((v) => (v = v.id));
      this.datas = res.data;
    });
  },
  methods: {
    handleNodeClick(data) {
      this.$emit("itemClick", data);
      // if (data.isLast) {
      //   this.$emit("itemClick", data);
      // } else {
      //   this.$message.warning("只能选择最后一级！");
      // }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.cateName.indexOf(value) !== -1;
    },
  },
};
</script>
<style scoped>
.cat-subcategory {
  left: 189px;
}

.list-group-item {
  height: 40px;
  line-height: 40px;
  position: relative;
  display: block;
  padding: 0rem 1.25rem;
  background-color: #fff;
  border-bottom: 0px solid;
}

.list-group-item-bottom {
  position: relative;
  display: block;

  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
