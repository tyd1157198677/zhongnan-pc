<template>
  <el-main>
    <el-card>
      <div style="height:40px">
        <span
          ><strong>{{ showmessage }}</strong></span
        >
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
        <!-- <i class="el-icon-s-home" style="float:right;margin-left:10px;" title="点击进入首页" @click="gohome"></i> -->
      </div>
      <el-row id="page_main">
        <div class="panel-default">
          <div class="panel-heading center" style="font-size: 16px;font-weight: bold">{{ info.comFullName + info.modeName }}弃标审核</div>
          <table class="layui-table el-table__body">
            <tbody>
              <tr>
                <td class="center" colspan="2">投标方名称：</td>
                <td colspan="10">
                  {{ info.comFullName }}
                </td>
              </tr>
              <tr>
                <td class="center" colspan="2">投标方名称：</td>
                <td class="center" colspan="2">{{ info.modeName }}</td>
                <td class="right" colspan="2">标段名称：</td>
                <td class="center" colspan="2">{{ info.sectionName }}</td>
                <td class="right" colspan="2">申请日期：</td>
                <td class="center" colspan="2">{{ info.creationTime }}</td>
              </tr>
            </tbody>
          </table>
          <div style="margin:10px 0;text-align:right">
            <el-button size="small" type="primary" @click="downLoad(info.fileUrl)">下载附件</el-button>
            <el-button v-if="info.showRefuseButton" size="small" type="primary" style="margin-left:10px" @click="submit(0)">驳回</el-button>
            <el-button v-if="info.showPassButton" size="small" type="primary" @click="submit(1)">同意</el-button>
          </div>
        </div>
      </el-row>
    </el-card>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      bidCancelId: "",
      showmessage: "",
      info: {},
    };
  },
  created() {
    this.todoId = this.$route.query.todoId;
    this.bidCancelId = this.$route.query.bidCancelId;
    this.GetBidCancelAuditPageShow();
  },
  computed: {
    // todoId() {
    //   return this.$route.query.todoId;
    // },
  },
  mounted() {
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
  },
  methods: {
    gohome() {
      this.$router.push({
        path: "/index",
      });
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then(res => {
        this.showmessage = res.data;
      });
    },
    GetBidCancelAuditPageShow() {
      this.$http.get("/BidCancel/GetBidCancelAuditPageShow", { params: { bidCancelId: this.bidCancelId } }).then(res => {
        this.info = res.data;

        // this.$set(this.info, "requireFile", this.info.requireFile.replace(/\n/g, "<br>"));
        console.log(this.info);
      });
    },
    downLoad(url) {
      window.open(`${process.env.VUE_APP_API_URL}` + url, "_blank");
    },
    submit(a) {
      let obj = {
        bidCancelId: this.bidCancelId,
        result: a,
      };
      this.$http.post("/BidCancel/SubmitBidCancelAudit", obj).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetBidCancelAuditPageShow();
        } else {
          this.$message.error(res.data.message);
        }
        console.log(res);
      });
    },
  },
};
</script>

<style scope>
.panel-default {
  border-color: #dddddd;
}
.panel {
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}
.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.panel-default > .panel-heading {
  color: #333333;
  background-color: #f5f5f5;
  border-color: #dddddd;
}
.panel-body {
  padding: 15px;
}

.gg-content {
  padding-left: 20px;
}

.row-main {
  float: left;
  width: 100%;
}

.row-in {
  float: left;
  width: 35px;
}

.row-content {
  float: left;
  width: 90%;
}
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 20px;
  float: right;
  cursor: pointer;
}
</style>
