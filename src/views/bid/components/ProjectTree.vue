<template>
  <div style="padding-right: 10px" class="aside-wraper">
    <el-aside :width="sysTreeCateTypeW" :class="open ? 'type-list' : ''" :style="{ height: open ? '680px' : '0px' }">
      <div class="SideNavbtn" @click="slideNave()">
        <el-tooltip class="item" effect="dark" :content="open ? '收起' : '展开'" placement="top">
          <i class="color666" :class="open ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
        </el-tooltip>
      </div>
      <div v-if="open">
        <div class="card-header">
          {{ title }}
        </div>
        <!-- <ul class="list-group list-group-flush"> -->
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable class="p-2"> </el-input>
        <!-- style="height: 680px; overflow: scroll;" -->
        <el-tree
          class="el-scrollbar"
          ref="tree"
          :data="projects"
          :props="defaultProps"
          highlight-current
          node-key="id"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :default-expanded-keys="defaultShowNodes"
          @node-click="handleNodeClick"
          style="width:300px;overflow:scroll"
        >
          <!-- <div class="custom-tree-node" slot-scope="{ node }">
            <el-tooltip class="item" effect="dark" :content="node.label" placement="top">
              <div class="sp">{{ node.label }}</div>
            </el-tooltip>
          </div> -->
        </el-tree>
        <!-- </ul> -->
      </div>
    </el-aside>
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
      default: "请选择项目",
    },
    /**
     * 可选择的项目类型
     */
    selectOrgType: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * 默认展开的项目类型
     */
    expandedOrgType: {
      type: Array,
      default: () => {
        return ["区域", "总部", "城市"];
      },
    },
  },
  name: "ProjectTree",
  data() {
    return {
      sysTreeCateTypeW: "10px", // 项目树宽度
      sysTreeCateType: [], // 项目树
      orgTypeNode: null, // 声明选择节点
      ComName: "", //项目名字
      open: false, // 侧边导航是否显示
      filterText: "",
      defaultProps: {
        children: "children",
        label: "projectShortName",
      },
      projects: [],
      defaultShowNodes: [],
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    // projects: {
    //   handler() {
    //     // 默认展开： 区域、城市、项目节点
    //     let ids = [];
    //     this.projects.forEach(p => {
    //       ids = this.getDefaultExpandedKeys(this.expandedOrgType, p);
    //     });
    //     this.defaultShowNodes = ids;
    //   },
    //   deep: true,
    // },
  },
  created() {
    // this.loading = true;
    this.$api.ProjectMaster.GetProjectTree().then(res => {
      // this.loading = false;
      this.projects = res;
      this.$nextTick(() => {
        this.defaultShowNodes = [res[0].id, res[0].children[0].id];
      });
    });
  },
  mounted(){
    // this.$nextTick(function() {
    //   this.$on('slideNave', function() {
    //     alert('我是子组件方法');
    //   });
    // });
  },
  methods: {
    // 测导航显示隐藏
    slideNave() {
      let that = this;
      that.open = !that.open;
      if (!that.open) {
        that.sysTreeCateTypeW = "25px";
      } else {
        that.sysTreeCateTypeW = "300px";
      }
      this.$emit("slideNave", this.open);
    },
    handleNodeClick(data) {
      // this.$nextTick(() => {
      //获取指定的div盒
      // let targetbox = document.getElementsByClassName("is-current");
      //获取这个div盒的高度位置
      // console.log(targetbox[0].offsetTop);
      //将滚动条定位到这个高度位置
      // document.documentElement.scrollTop = targetbox.offsetTop;
      // });
      if (data.orgType == "组织") {
        this.$message.error("只能选择项目和区期");
      } else {
        this.$emit("itemClick", data);
      }
      // if (this.selectOrgType.length > 0) {
      //   const { orgType } = data;
      //   if (this.selectOrgType.indexOf(orgType) < 0) {
      //     this.$message.error(`只能选择${this.selectOrgType.join("和")}`);
      //   } else {
      //     this.$emit("itemClick", data);
      //   }
      // } else {
      //   this.$emit("itemClick", data);
      // }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.projectFullName.indexOf(value) !== -1;
    },
    /**
     * 获取指定orgType的所有id
     */
    getDefaultExpandedKeys(orgTypes, node) {
      let ids = [];
      const { orgType, id } = node;
      if (orgTypes.indexOf(orgType) > -1) {
        ids.push(id);
      }
      if (node.children) {
        node.children.forEach(c => {
          const subIds = this.getDefaultExpandedKeys(orgTypes, c);
          ids = ids.concat(subIds);
        });
      }
      return ids;
    },
  },
};
</script>
<style scoped></style>
<style lang="scss" scoped>
.cat-subcategory {
  left: 189px;
}

::v-deep .list-group-item {
  height: 40px;
  line-height: 40px;
  position: relative;
  display: block;
  padding: 0rem 1.25rem;
  background-color: #fff;
  /* border-bottom: 0px solid; */
}
.list-group-item-bottom {
  position: relative;
  display: block;
  padding: 0rem 1.25rem;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.125); */
}
.aside-wraper {
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
  .SideNavbtn {
    position: absolute;
    right: 8%;
    top: 5px;
    z-index: 100;
    padding-left: 20px;
  }

  /*列表样式*/
  .type-list {
    border: 1px solid #ebeef5;
    width: 100%;
    height: 100%;
    background: #fff;
  }
}
.sp {
  width: 200px;
  white-space: nowrap; //不换行
  overflow: hidden; //超出隐藏
  text-overflow: ellipsis;
}
// el-tree {
//   display: inline-block;
//   min-width: 100%;
// }
// ::v-deep .el-tree-node {
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   overflow: hidden;
// }
::v-deep .el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
  width: 200px;
}
::v-deep.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}
</style>
