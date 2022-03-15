// 在施项目业绩汇总表（用于后补使用）
<template>
  <div>
      <div class="btns">
        <el-button v-if="isEdit == 1" size="mini" type="primary" @click="downLoadMoudle(base.achTempFileUrl)"> 下载模板</el-button>
        <el-button v-if="isEdit == 1" size="mini" type="primary" @click="upDownFile(2)"> 上传文件</el-button>
      </div>
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td class="right">
              文件名称：
            </td>
            <td class="center" colspan="2">
              {{ achFile.fileName ? achFile.fileName : "" }}
            </td>
            <td class="right">
              文件类型：
            </td>
            <td class="center">
              {{ achFile.fileExtName ? achFile.fileExtName : "" }}
            </td>
            <td class="center" style="width:80px" v-if="achFile.fileReName && achFile.fileUrl">
              <i class="el-icon-download" title="下载" @click="downLoad(achFile.fileUrl + achFile.fileReName)"></i>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {

  data(){
    return{
      id:'',
      isEdit:'',
      achFile: {},
    }
  },
  mounted(){
    this.id = this.$route.query.id;
    this.isEdit = this.$route.query.type;
    // this.GetQuaMessage()
  },
  methods:{
    async GetQuaMessage() {
      let res = await this.$http.get("/SupQua/GetQuaMessage", { params: { masterId: this.id } });
      this.achFile = res.data.result.achFile;
    },
    downLoadMoudle(url) {
      window.location.href = url;
      window.open(url, "_blank");
    },
    upDownFile(i) {

      this.fileType5 = [".xls", ".xlsx"];
      this.condition5 = "允许文件类型：.xls|.xlsx 格式 最大：10 兆。上传时自动删除原有文件";
      this.getUploadUrl2 = "/api/services/app/SupQua/UploadQuaAchievement";
      
      this.obj = { masterId: this.id };
      this.dialogVisible = true;
    },
    downLoad(url) {
      window.open(`${process.env.VUE_APP_API_URL}` + url, "_blank");
      // window.location.href = process.env.VUE_APP_API_URL + url;
    },
  }
}
</script>

<style scoped>
.btns {
  margin: 10px 0;
  text-align: right;
}
</style>