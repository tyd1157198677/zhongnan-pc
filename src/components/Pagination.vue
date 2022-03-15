<template>
  <div class="pagination">
    <span></span>
    <el-pagination
      v-if="type == 1"
      background
      layout="prev, pager, next"
      :pager-count="5"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <el-pagination
      v-else
      background
      prev-text="上一页"
      next-text="下一页"
      :pager-count="5"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="[10, 15, 20, 30, 50, 100]"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      :layout="layout"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 总页数
    type: {
      type: Number,
    },
    // 总页数
    total: {
      type: Number,
      default: 0,
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1,
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 15,
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
  },
  data() {
    return {
      page: {
        _pageSize: this.pageSize,
        _currentPage: this.currentPage,
      },
    };
  },
  methods: {
    //  每页多少条
    handleSizeChange(val) {
      //   console.log(val);
      this.page._pageSize = val;
      this.$emit("pageChange", this.page);
    },
    // 当前页码变化
    handleCurrentChange(val) {
      this.page._currentPage = val;
      this.$emit("pageChange", this.page);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep.pagination {
  height: 40px;
  padding: 5px 5px 5px 0;
  font-weight: 700;
  text-align: right;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
