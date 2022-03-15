<template>
  <el-dialog width="50%" height="80%" title="" :visible.sync="dialogVisible">
    <el-row>
      <el-col>
        <div class="card">
          <!-- <div class="card-header">
            请选择项目
          </div> -->
          <ul class="list-group list-group-flush">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable class="p-2"> </el-input>
            <!-- style="height: 680px; overflow: scroll;" -->
            <el-tree
              style="height:400px;overflow: scroll;"
              ref="tree1"
              :data="depData"
              node-key="id"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              :default-expanded-keys="multipleSelection"
              :props="defaultProps"
              :highlight-current="true"
              @node-click="handleNodeClick"
            >
            </el-tree>
          </ul>
        </div>
      </el-col>
    </el-row>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关 闭</el-button>
    </span> -->
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: "",
    level: Number,
  },
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      dialogVisible: false,
      multipleSelection: [],
      depData: [],
      defaultShowNodes: [],
      defaultProps: {
        children: "children",
        label: "comShortName",
      },
      loading: false,
      filterText: "",
      // 已选择的人员
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree1.filter(val);
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
  mounted() {},

  methods: {
    open() {
      this.dialogVisible = true;
      this.fetchDepTree();
    },
    close() {
      this.dialogVisible = false;
    },
    /**
     * 加载树
     */
    fetchDepTree() {
      this.$http
        .get("/IdmOrganizeInfo/GetOrganizeTree", {
          params: {
            haveProject: true,
            haveDepartment: true,
          },
        })
        .then(res => {
          this.depData = res.data;
          this.$nextTick(() => {
            this.multipleSelection = [res.data[0].id];
          });
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.subCompanyCode.indexOf(value) !== -1;
    },
    /**
     * 获取指定orgType的所有id
     */
    getDefaultExpandedKeys(orgTypes, node) {
      // console.log(this.orgTypes);
      // console.log(this,node);
      let ids = [];
      const { orgType, subCompanyCode } = node;
      if (orgTypes.indexOf(orgType) > -1) {
        ids.push(subCompanyCode);
      }
      if (node.children) {
        node.children.forEach(c => {
          const subIds = this.getDefaultExpandedKeys(orgTypes, c);
          ids = ids.concat(subIds);
        });
      }
      return ids;
    },
    handleNodeClick(data) {
      // console.log(data);
      if (!data.orgType == "部门") {
        // this.$message.warning("请选择项目或分期！");
        this.$alert("请选择部门！", {
          confirmButtonText: "确定",
        });
      } else {
        this.$emit("itemClick", data);
      }
    },
  },
};
</script>

<style scoped></style>
