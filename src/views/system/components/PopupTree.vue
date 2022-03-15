<template>
  <el-dialog width="50%" height="80%" title="供方审核岗位" :visible.sync="dialogVisible">
    <el-row>
      <el-col>
        <div class="card">
          <ul class="list-group list-group-flush">
            <el-tree
              v-if="dialogVisible"
              lazy
              :load="loadNode"
              v-loading="loading"
              style="height: 400px; overflow: scroll"
              ref="tree1"
              :data="depData"
              node-key="id"
              :expand-on-click-node="false"
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
  </el-dialog>
</template>
<script>
export default {
  props: {
    currentData: {
      type: Object,
      default: () => {},
    },
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
        isLeaf: "isEnable",
      },
      loading: false,
    };
  },
  methods: {
    loadNode(node, resolve) {
      console.log(node, "==node");
      let params = {};
      if (node.level === 0) {
        this.loading = true;
        params = {
          SubCompanyCode: 1000000000,
          ParentCode: 1,
        };
        // params = {
        //   SubCompanyCode: this.currentData.subCompanyCode,
        //   ParentCode: 1,
        // };
      } else {
        params = {
          SubCompanyCode: node.data.subCompanyCode,
          ParentCode: 0,
        };
      }
      // let obj = {
      //   params: {
      //     SubCompanyCode: 1000000000,
      //     ParentCode: 1,
      //   },
      // };
      // this.$http
      //   .get("/IdmOrganizeInfo/GetPositionInfo", obj)
      //   .then((res) => {
      this.$http
        .get("/IdmOrganizeInfo/GetPositionInfo", { params })
        .then((res) => {
          console.log(res, "==res");
          if (res.status === 200) {
            resolve(res.data);
          } else {
            resolve([]);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    open() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    handleNodeClick(data) {
      if (data.isEnable) {
        this.$emit("onChange", data);
      }
    },
  },
};
</script>

<style scoped></style>
