<template>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="infonametits">近三年内与我司的业绩</span>
      </template>
      <el-table :data="myList" ref="multipleTable" border>
        <el-table-column prop="baseGuid" label="序号" type="index" width="80" :index="indexMethod" align="center"></el-table-column>
        <el-table-column prop="cooperName" label="合作企业名称" align="center"> </el-table-column>
        <el-table-column prop="projectName" label="合作项目名称" align="center"> </el-table-column>
        <el-table-column prop="startDate" label="合作开始日期" align="center"> </el-table-column>
        <el-table-column prop="endDate" label="合作结束日期" align="center"> </el-table-column>
        <el-table-column prop="contractValue" label="合同金额（万元）" align="center" width="150"> </el-table-column>
        <el-table-column prop="projectAddr" label="合作项目所在地" align="center"> </el-table-column>
        <el-table-column prop="projectStatus" label="合作项目状态" align="center" :formatter="formattProjectStatus"> </el-table-column>
        <el-table-column label="合同信息扫描件" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.fileUrl01" class="el-icon-download" title="下载" @click="onDonwLoad(scope.row.fileId01)"></i>
          </template>
        </el-table-column>
        <el-table-column label="合同已开发票" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.fileUrl02" class="el-icon-download" title="下载" @click="onDonwLoad(scope.row.fileId02)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span class="infonametits">近三年内其他公司的业绩</span>
      </template>
      <el-table :data="otherList" ref="multipleTable" border>
        <el-table-column prop="baseGuid" label="序号" type="index" width="80" :index="indexMethod" align="center"></el-table-column>
        <el-table-column prop="cooperName" label="合作企业名称" align="center"> </el-table-column>
        <el-table-column prop="projectName" label="合作项目名称" align="center"> </el-table-column>
        <el-table-column prop="startDate" label="合作开始日期" align="center"> </el-table-column>
        <el-table-column prop="endDate" label="合作结束日期" align="center"> </el-table-column>
        <el-table-column prop="contractValue" label="合同金额（万元）" align="center" width="150"> </el-table-column>
        <el-table-column prop="projectAddr" label="合作项目所在地" align="center"> </el-table-column>
        <el-table-column prop="projectStatus" label="合作项目状态" align="center" :formatter="formattProjectStatus"> </el-table-column>
        <el-table-column label="合同信息扫描件" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.fileUrl01" class="el-icon-download" title="下载" @click="onDonwLoad(scope.row.fileId01)"></i>
          </template>
        </el-table-column>
        <el-table-column label="合同已开发票" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.fileUrl02" class="el-icon-download" title="下载" @click="onDonwLoad(scope.row.fileId02)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
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
      downInfo: {},
      myList: [],
      otherList: [],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },

    dataList() {
      this.$http.get("/SupCaseInfo/GetSupCaseInfoList01?baseGuid=" + this.id).then((res) => {
        res.data.forEach((item) => {
          if (item.isThisCompany) {
            this.myList.push(item);
          } else {
            this.otherList.push(item);
          }
        });
      });
      // this.$api.SupBaseInfo.GetSupCaseInfoList(this.id)
      //   .then((res) => {
      //     console.log(res);
      //     res.forEach((item) => {
      //       if (item.isThisCompany) {
      //         this.myList.push(item);
      //       } else {
      //         this.otherList.push(item);
      //       }
      //     });
      // })
      // .finally(() => {});
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
      if (this.downInfo.projectStatus) {
        const [status] = this.downInfo.projectStatus.filter((p) => p.value === row.projectStatus);
        if (status) {
          return status.text;
        } else {
          return "未知";
        }
      }
      return "";
    },
    onDonwLoad(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/UploadFileById?fileId=" + id, "_blank");
    },
  },
  mounted() {
    this.getSupCaseFormDropDown();
    this.dataList();
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
