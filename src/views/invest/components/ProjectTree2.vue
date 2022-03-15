<template>
  <div style="padding-right: 10px;">
    <div class="card">
        <!--<div class="card-header">-->
            <!--{{ title }}-->
        <!--</div>-->
        <ul class="list-group list-group-flush">
            <el-input
              placeholder="输入关键字"
              v-model="filterText"
              clearable
              class="p-2">
            </el-input>

            <el-tree
  class="filter-tree"
  :data="projects"
  :props="defaultProps"
  default-expand-all
  :filter-node-method="filterNode"
  ref="tree">
  <span>{{projects}}</span>
</el-tree>
        </ul>
    </div>
  </div>
</template>
<script>
import "@/assets/css/supplier.css";
export default {
  props: {
    /**
     * 标题
     */
    title: {
      type: String,
      default: "请选择项目"
    },
    /**
     * 可选择的项目类型
     */
    selectOrgType: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * 默认展开的项目类型
     */
    expandedOrgType: {
      type: Array,
      default: () => {
        return ['区域', '总部', '城市']
      }
    }
  },
  name: "ProjectTree",
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'cateName'
      },
      // projects: [],
      projects: [{
          label: '总经理',
          children: [{
            label: '郭爽',
          }]
        }, {
          label: '跟进人',
          children: [{
            label: '徐静',
          }, {
            label: '张伟',
          }]
        }],
      defaultShowNodes: []
    };
  },
 watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },

  created() {
    // this.$api.ProjectMaster.GetProjectTree().then((res) => {
    //   this.projects = res;
    // });
    // this.$api.SupplierTree.GetSupplierCategoryTree().then((res) => {
    //   this.projects = res;
    // });
  },
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
    // filterChange(){
    //   // 这里每当输入的数据有变化就触发原生的过滤节点这个函数
    //   this.$refs.tree.filter(this.filterText);
    // },
    sou(){
      this.$api.SupplierTree.GetSupplierCategoryTree().then((res) => {
        this.projects = res;
      });
    },
    append(data) {
      this.$emit("itemClick", data);
    },
    handleNodeClick(data) {
      if(this.selectOrgType.length > 0) {
        const { orgType } = data;
        if(this.selectOrgType.indexOf(orgType) < 0) {
          this.$message.error(`只能选择${this.selectOrgType.join('和')}`)
        } else {
          this.$emit("itemClick", data);  
        }
      } else {
        this.$emit("itemClick", data);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.cateName.indexOf(value) !== -1;
    },
    /**
     * 获取指定orgType的所有id
     */
    getDefaultExpandedKeys(orgTypes, node) {
      let ids = []
      const { orgType, id } = node
      if(orgTypes.indexOf(orgType) > -1) {
        ids.push(id)
      }
      if(node.children) {
        node.children.forEach(c => {
          const subIds = this.getDefaultExpandedKeys(orgTypes, c)
          ids = ids.concat(subIds)
        })
      }
      return ids
    }
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
  padding: 0rem 1.25rem;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0,0,0,.125);
}
 .custom-tree-node {
   flex: 1;
   display: flex;
   align-items: center;
   justify-content: space-between;
   font-size: 14px;
   padding-right: 20px;
 }
</style>