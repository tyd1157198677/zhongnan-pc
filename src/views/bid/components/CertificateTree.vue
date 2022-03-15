<template>
  <div style="padding-right: 10px">
    <div class="card">
        <div class="card-header">
            {{ title }}
        </div>
        <ul class="list-group list-group-flush">
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              clearable
              class="p-2">
            </el-input>
            <el-tree 
              ref="tree"
              :data="datas" 
              :props="defaultProps" 
              highlight-current
              :loading="loading"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"></el-tree>
        </ul>
    </div>
  </div>
</template>
<script>
import "@/assets/css/supplier.css";
import debounce from 'debounce';

export default {
  name: "CertificateTree",
  props: {
    /**
     * 是否只有叶子节点可选择
     */
    selectLast: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '供方资质'
    }
  },
  data() {
    return {
      clickCount: 0,
      filterText: '',
      datas: [],
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'cateName'
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.loading = true
    this.$api.SupplierTree.GetSupplierCertificateTree().then((res) => {
      this.datas = res;
    }).finally(() => {
      this.loading = false
    });
  },
  methods: {
    handleNodeClick(data) {
      let ckEvent = false
      if(this.selectLast) {
        if(data.isLast || data.children.length == 0) {
          ckEvent = true
        }
      } else {
        ckEvent = true
      }

      this.clickCount++
      const click = debounce(() => {
        if(this.clickCount === 1 && ckEvent) {
          this.$emit("itemClick", data)
        }
        if(this.clickCount > 1 && ckEvent) {
          this.$emit("itemDbClick", data);
        }
        this.clickCount = 0
      }, 300)
      click()
    },
    filterNode(value, data) {
      if (!value) return true;      
      return data.cateName.indexOf(value) !== -1;
    }
  },
};
</script>
<style scoped>
.cat-subcategory {
  left: 189px;
}

/deep/ .list-group-item {
  position: relative;
  display: block;
  padding: .75rem 1.25rem;
  background-color: #fff;
  border-bottom: 0px solid;
}

.list-group-item-bottom {
  position: relative;
  display: block;
  padding: .75rem 1.25rem;
  background-color: #fff;
  border-bottom: 1px solid rgba(0,0,0,.125);
}
</style>