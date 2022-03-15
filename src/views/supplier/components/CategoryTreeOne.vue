<template>
  <el-dialog :visible.sync="show" width="50%" :show-close="false">
    <el-row>
      <el-col :span="24">
        <el-input size="small" class="mb-1" clearable placeholder="输入关键字筛选" v-model="filterText"> </el-input>
        <el-tree
          ref="tree"
          :data="fromData"
          node-key="id"
          class="tree"
          :expand-on-click-node="false"
          :props="defaultProps"
          :auto-expand-parent="true"
          :highlight-current="true"
          :default-expanded-keys="arrtree"
          :filter-node-method="filterNode"
          @check-change="handleCheckChange"
          show-checkbox
          check-strictly
        >
        </el-tree>
      </el-col>
    </el-row>

    <div slot="footer">
      <el-button @click="show = false" size="small">关闭</el-button>
      <el-button type="primary" @click="doSubmit()" size="small">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
 * 资质证书选择树
 */
export default {
  props: {
    /**
     * 最大选择个数
     */
    max: {
      type: Number,
      default: 9999999,
    },
  },
  data() {
    return {
      show: false,
      fromData: [],
      toData: [],
      arrtree: [],

      defaultProps: {
        children: "children",
        label: "cateName",
      },
      loading: false,
      filterText: "",
      rootId: "00000000-0000-0000-0000-000000000000",
    };
  },
  mounted() {
    this.fetchTreeData();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    open(arr) {
      this.show = true;
      if (arr.length > 0) {
        arr = arr.map((e) => {
          return e.id;
        });
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(arr);
          this.arrtree = arr;
        });
      } else {
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([]);
        });
      }
    },
    /**
     * 加载资质数据
     */
    fetchTreeData() {
      this.$http.get("/SupplierTree/GetSupplierCategoryTree").then((res) => {
        res.data.forEach((r) => {
          this.formatTreeData(r);
        });
        this.fromData = res.data;
      });
    },
    formatTreeData(node) {
      node.disabled = !node.isLast;
      if (node.children) {
        node.children.forEach((c) => {
          this.formatTreeData(c);
        });
      }
      return node;
    },
    /**
     * 筛选
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.cateName.indexOf(value) !== -1;
    },

    handleCheckChange(data, checked, indeterminate) {
      const ckNodes = this.$refs.tree.getCheckedNodes();
      const count = ckNodes.length;
      if (this.max == 1) {
        if (count > 1) {
          // this.$msg.error(`只能选择${this.max}个`);
          this.$refs.tree.setCheckedKeys([data.id]);
        }
      } else {
        if (count > this.max) {
          this.$msg.error(`只能选择${this.max}个`);
        }
      }
    },
    // 确定
    doSubmit() {
      const ckNodes = this.$refs.tree.getCheckedNodes();
      const count = ckNodes.length;
      if (count > this.max) {
        this.$msg.error(`只能选择${this.max}个`);
        return false;
        // this.$refs.tree.setCheckedKeys([ckNodes[1].id]);
      }
      this.show = false;
      this.$emit("select", ckNodes);
    },
  },
};
</script>

<style scoped>
.tree {
  height: 260px;
  overflow: auto;
}

::v-deep .el-dialog__body {
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  padding: 10px;
}
</style>
