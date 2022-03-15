<!--  -->
<template>
  <el-main>
    <el-card style="margin-bottom: 10px">
      <div class="">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane label="供方外网" name="供方外网"></el-tab-pane>
          <el-tab-pane label="招采内网" name="招采内网"></el-tab-pane>
        </el-tabs>
        <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData" v-loading="loading">
          <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
          <el-table-column prop="menuCode" label="菜单编号" align="center" width="140">
            <template slot-scope="scope">
              <el-input v-model="scope.row.menuCode" v-if="scope.row.isShow"></el-input>
              <span v-if="!scope.row.isShow">{{ scope.row.menuCode }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="menuName" label="菜单名称" align="center" width="140">
            <template slot-scope="scope">
              <el-input v-model="scope.row.menuName" v-if="scope.row.isShow"></el-input>
              <span v-if="!scope.row.isShow">{{ scope.row.menuName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="systemName" label="标签名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.systemName" v-if="scope.row.isShow"></el-input>
              <span v-if="!scope.row.isShow">{{ scope.row.systemName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="menuDesc" label="链接地址" align="center" min-width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.menuDesc" v-if="scope.row.isShow"></el-input>
              <span v-if="!scope.row.isShow">{{ scope.row.menuDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="menuLevel" label="菜单层级" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.menuLevel" v-if="scope.row.isShow"></el-input>
              <span v-if="!scope.row.isShow">{{ scope.row.menuLevel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="显示顺序" width="100" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.menuOrder" @change="handleChange(scope.row)"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="edit(scope.row)" style="margin-right:10px"></i>
            <i class="el-icon-delete" @click="deletes(scope.row)"></i>
          </template>
        </el-table-column> -->
        </el-table>
        <pagination :total="totalCount" :current-page="currentPage" :pageSize="pageSize" @pageChange="pageChange" />
      </div>
    </el-card>
  </el-main>
</template>

<script>
export default {
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      activeName: "供方外网",
      tableData: [],
      pageSize: 15,
      currentPage: 1,
      totalCount: 0,
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetMenuList();
  },
  methods: {
    // 获取列表
    async GetMenuList() {
      let obj = {
        SystemName: this.activeName,
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize,
      };
      let res = await this.$http.get("/SysMenu/GetMenuList", { params: obj });
      if (res.status == 200) {
        this.totalCount = res.data.totalCount;
        this.tableData = res.data.items;
        this.tableData.forEach((item) => {
          item.isShow = false;
        });
      }
    },
    handleClick(e) {
      this.currentPage = 1;
      this.GetMenuList();
    },
    pageChange(page) {
      this.pageSize = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetMenuList();
    },
    async SaveOrder(val) {
      let res = await this.$http.post("/SysMenu/SaveOrder", val);
      this.GetMenuList();
    },
    edit(val) {
      //   val.isShow = true;
      // this.GetMenuTree()
    },
    handleChange(val) {
      //   console.log(val);
      this.SaveOrder([val]);
    },
    deletes(val) {
      // this.GetMenuTree()
    },
  },
};
</script>
<style lang="scss" scoped></style>
