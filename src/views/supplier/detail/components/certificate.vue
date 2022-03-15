<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="infonametits">资质证书</span>
        </template>
        <el-table v-loading="loading" :data="zzList" ref="multipleTable" border>
          <el-table-column prop="id" label="序号" type="index" width="80" :index="indexMethod" align="center"></el-table-column>
          <el-table-column prop="cerName" label="资质名称" align="center"> </el-table-column>
          <el-table-column prop="outDate" label="有效期" align="center"> </el-table-column>
          <el-table-column label="下载" align="center" width="100">
            <template slot-scope="scope">
              <i size="small" class="el-icon-download" title="下载" @click="downLoad(scope.row.filePath + scope.row.fileReName)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span class="infonametits">附件</span>
        </template>
        <el-table v-loading="loading" :data="dataList" ref="multipleTable" border>
          <el-table-column prop="id" label="序号" type="index" width="80" :index="indexMethod" align="center"></el-table-column>
          <el-table-column prop="attachName" label="文件名称" align="center"> </el-table-column>
          <el-table-column prop="allowExtName" label="文件格式" align="center"> </el-table-column>
          <el-table-column prop="attachDesc" label="文件说明" align="center"> </el-table-column>
          <el-table-column label="下载" align="center" width="100">
            <template slot-scope="scope">
              <i
                size="small"
                v-if="scope.row.haveFile"
                class="el-icon-download"
                title="下载"
                @click="downLoad(scope.row.filePath + scope.row.fileReName)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <img :src="url" alt="" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      activeNames: ["1", "2"],
      zzList: [],
      dataList: [],
      loading: false,
      dialogVisible: false,
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    downLoad(url) {
      // this.url = process.env.VUE_APP_API_URL + url;
      // this.dialogVisible = true;
      window.open(process.env.VUE_APP_API_URL + url, "_blank");
    },
    /**
     * 获取列表
     */
    fetchDataList() {
      this.loading = true;
      this.$api.SupCertificate.GetSupplierCertificates(this.id)
        .then((res) => {
          this.zzList = res;
        })
        .finally(() => {
          this.loading = false;
        });

      this.$api.SupAttach.GetUploadAttach(this.id)
        .then((res) => {
          this.dataList = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 计算序号
    indexMethod(index) {
      return index + 1;
    },
    /**
     * 获取下拉数据
     */
    getSupCaseFormDropDown() {
      this.$api.SupBaseInfo.GetSupCaseFormDropDown()
        .then((res) => {
          this.downInfo = res;
          console.log(res);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formattProjectStatus(row) {
      const [status] = this.downInfo.projectStatus.filter((p) => p.value === row.projectStatus);
      if (status) {
        return status.text;
      } else {
        return "未知";
      }
    },
  },
  mounted() {
    this.fetchDataList();
  },
};
</script>

<style scoped>
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}

.layui-table {
  width: 100%;
  background-color: #fff;
  color: #666;
  border-top: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}

.layui-table td,
.layui-table th {
  position: relative;
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}

.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: rgba(0, 0, 0, 0.03);
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
</style>
