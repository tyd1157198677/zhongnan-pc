<template>
  <el-main>
    <div>
      <el-button @click="back" type="primary" size="small" style="margin-bottom:10px">返回</el-button>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="infonametits">黑名单详情</span>
        </template>
        <table class="layui-table el-table__body">
          <tbody>
            <!-- <tr>
                <td style="width: 20%" class="right">承接主体名称：</td>
                <td style="width: 80%" :colspan="3">{{neweditform.comMainName}}</td>
            </tr> -->
            <tr>
              <td style="width: 20%" class="right">供应商名称：</td>
              <td style="width: 80%" :colspan="3">{{ neweditform.comFullName }}</td>
            </tr>
            <tr>
              <td style="width: 20%" class="right">黑名单开始日期：</td>
              <td style="width:30%">{{ neweditform.startDate }}</td>
              <td style="width: 20%" class="right">黑名单结束日期：</td>
              <td style="width:30%">{{ neweditform.endDate }}</td>
            </tr>
            <tr>
              <td style="width: 20%" class="right">原因描述：</td>
              <td style="width: 80%" :colspan="3">{{ neweditform.desc }}</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span class="infonametits">附件详情</span>
        </template>
        <el-table style="widtd:100%" empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData">
          <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
          <el-table-column label="文件类型" prop="fileExtName"> </el-table-column>
          <el-table-column label="文件大小" prop="showFileSize"> </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <span class="el-icon-download" @click="downLoad(scope.row.filePath + scope.row.fileReName)" style="margin-right:10px"></span>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </el-main>
</template>
<script>
import evaluateMain from "../Evaluate/evaluateMain.vue";
export default {
  components: { evaluateMain },
  data() {
    return {
      activeNames: ["1", "2"],
      neweditform: {
        comMainName: "",
        supGuid: "",
        comFullName: "",
        // supplierId: "",
        startDate: "",
        endDate: "",
        id: "",
        desc: "",
      },
      tableData: [
        {
          id: "",
          fileName: "",
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  mounted() {
    // this.neweditform = this.$route.query.id ? this.$route.query.id : {};
    // var row = this.$route.query.row
    // if(row){
    //   if(row.id){
    //     this.neweditform = row;
    //     }
    //     if(row.id){
    //         this.neweditform.id = row.id;
    //     }
    // }
    this.GetNoticeAttachList();
    this.getList();
  },
  methods: {
    downLoad(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
    },
    async getList() {
      let obj = {
        id: this.id,
      };
      let res = await this.$http.get("/SupBackList/GetSupBackListList", { params: obj });
      if (res.status == 200) {
        this.neweditform = res.data.result.items[0];
      }
    },
    back() {
      this.$router.push({
        path: "./backlist",
      });
    },
    GetNoticeAttachList() {
      let obj = {
        id: this.id,
      };
      let res = this.$http.get("/SupBackList/GetBackListAttach", { params: obj }).then(res => {
        console.log(res.data);
        if (res.status == 200) {
          this.tableData = res.data;
        }
      });
    },
  },
};
</script>
