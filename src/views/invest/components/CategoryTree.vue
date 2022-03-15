<template>
  <el-dialog :visible.sync="show" width="60%" top="75">
    <el-row>
      <el-col :span="10">
        <div class="card">
          <div class="card-body">
            <div class="card-title">选择供应商分类</div>
            <el-input size="small" class="mb-1" clearable placeholder="输入关键字筛选" v-model="filterText"> </el-input>
            <div style="overflow: scoller">
              <el-tree
                ref="tree"
                :data="fromData"
                node-key="id"
                class="tree"
                :expand-on-click-node="false"
                :props="defaultProps"
                :auto-expand-parent="true"
                :highlight-current="true"
                :filter-node-method="filterNode"
                show-checkbox
                check-strictly
              >
              </el-tree>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button @click="add" size="small" type="primary" class="ml-5 mt-5" circle><i class="el-icon-d-arrow-right"></i></el-button>
        <el-button @click="remove" size="small" type="primary" class="ml-5 mt-5" circle><i class="el-icon-d-arrow-left"></i></el-button>
      </el-col>
      <el-col :span="10">
        <div class="card">
          <div class="card-body">
            <div class="card-title">已选供应商分类</div>
            <div style="height: 32px"></div>
            <el-tree
              ref="toTree"
              :data="toData"
              node-key="id"
              class="tree"
              :expand-on-click-node="false"
              :props="defaultProps"
              :auto-expand-parent="true"
              :highlight-current="true"
            >
            </el-tree>
          </div>
        </div>
      </el-col>
    </el-row>

    <div slot="footer" class="mt-0">
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
    open() {
      this.show = true;
      this.toData = [];
    },
    /**
     * 加载资质数据
     */
    fetchTreeData() {
      this.$api.SupplierTree.GetSupplierCategoryTree().then((res) => {
        res.forEach((r) => {
          this.formatTreeData(r);
        });
        this.fromData = res;
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
    /**
     * 添加
     */
    add() {
      let newData = [];
      const ckNodes = this.$refs.tree.getCheckedNodes();
      ckNodes.forEach((c) => {
        const node = this.toData.filter((t) => t.id === c.id);
        if (node.length === 0) {
          newData.push(c);
        }
      });
      const count = this.toData.length + newData.length;
      if (count > this.max) {
        this.$msg.warning(`最多选择${this.max}个`);
      } else {
        this.toData = this.toData.concat(newData);
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    /**
     * 移除
     */
    remove() {
      let keys = this.$refs.toTree.getCheckedKeys();
      keys.forEach((k) => {
        this.toData.forEach((t, i) => {
          if (t.id === k) {
            this.toData.splice(i, 1);
          }
        });
      });
    },
    // 确定
    doSubmit() {
      this.show = false;
      this.$emit("select", this.toData);
    },
  },
};
</script>

<style scoped>
.tree {
  height: 260px;
  overflow: scroll;
}

.el-dialog__body {
  padding: 10px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

/deep/ [class^="el-icon-"],
[class*=" el-icon-"] {
  cursor: pointer;
  color: #ffffff;
  font-size: 18px;
  text-transform: none;
}
</style>
