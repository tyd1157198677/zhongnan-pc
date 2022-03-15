<template>
  <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="files">
    <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
    <el-table-column label="附件名称" prop="fileName" align="center"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-link style="margin-left:10px;" type="success" :href="getFileUrl(scope.row)">下载</el-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      files: [],
    };
  },
  created() {
    if (this.id) {
      this.getBidModeAttachList(this.id);
    }
  },
  methods: {
    getBidModeAttachList(baseId) {
      this.$api.BidModeMaster.GetBidModeAttachList(baseId).then(res => {
        this.files = res;
      });
    },
    getFileUrl(file) {
      return `${process.env.VUE_APP_API_URL}/${file.filePath}${file.fileReName}`;
    },
  },
};
</script>

<style></style>
