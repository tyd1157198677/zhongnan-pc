<template>
  <el-main>
    <el-card style="margin-bottom: 60px">
      <div>
        <span
          ><strong>{{ showmessage }}</strong></span
        >
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
      </div>
      <div>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right">供应商名称：</td>
              <td colspan="3">
                {{ form.comFullName }}
              </td>
            </tr>
            <tr>
              <td class="right">项目或期区名称：</td>
              <td>
                {{ form.projectName }}
              </td>
              <td class="right">招标计划名称：</td>
              <td>
                {{ form.planName }}
              </td>
            </tr>
            <tr>
              <td class="right">打款金额：</td>
              <td>
                {{ form.amount }}
              </td>
              <td class="right">{{ fileList[0].fileName }}：</td>
              <td>
                <i class="el-icon-download ml-2" title="下载文件" @click="onDonwLoad(fileList[0].fileId)"></i>
                <i class="el-icon-picture-outline" style="margin-left: 10px" title="预览文件" @click="showth(fileList[0].filePath)"></i>
              </td>
            </tr>
            <tr v-if="this.fileList[1]">
              <td class="right">
                <span v-if="this.fileList[1]">{{ fileList[1].fileName }}：</span>
              </td>
              <td>
                <i v-if="this.fileList[1]" class="el-icon-download ml-2" title="下载文件" @click="onDonwLoad(fileList[1].fileId)"></i>
                <i class="el-icon-picture-outline" style="margin-left: 10px" title="预览文件" @click="showth(fileList[1].filePath)"></i>
              </td>
              <td class="right">
                <span v-if="this.fileList[2]">{{ fileList[2].fileName }}：</span>
              </td>
              <td>
                <i v-if="this.fileList[2]" class="el-icon-download ml-2" title="下载文件" @click="onDonwLoad(fileList[2].fileId)"></i>
                <i class="el-icon-picture-outline" style="margin-left: 10px" title="预览文件" @click="showth(fileList[2].filePath)"></i>
              </td>
            </tr>
            <!-- <tr v-for="(item, index) in fileList" :key="index">
              <td class="right">{{ item.fileName }}：</td>
              <td>
                <i class="el-icon-download ml-2" title="下载" @click="onDonwLoad(item.fileId)"></i>
              </td>
              <td></td>
              <td></td>
            </tr> -->
          </tbody>
        </table>
      </div>
    </el-card>
    <div>
      <el-button style="float: right" size="small" type="primary" @click="gotoruwei(planId)">查看入围信息</el-button>
    </div>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  inject: ["reload"],
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      fileList: [
        {
          fileName: "",
          fileId: "",
        },
      ],
      showmessage: "",
      form: [],
      type: "",
      bidModeId: "",
      supplierId: "",
      planId: "",
    };
  },
  computed: {
    // bidModeId() {
    //   return this.$route.query.bidModeId;
    // },
    // supplierId() {
    //   return this.$route.query.supplierId;
    // },
    // type() {
    //   return this.$route.query.type;
    // },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
  },
  created: function () {
    // this.planId = this.$route.query.id;
    this.bidModeId = this.$route.query.bidModeId;
    this.supplierId = this.$route.query.supplierId;
    this.type = this.$route.query.type;
    this.todoId = this.$route.query.todoId;
  },
  mounted() {
    if (this.type == 1) {
      this.GetSupplierDepositTodoPage1001();
    }
    if (this.type == 2) {
      this.GetSupplierCnhTodoPage1001();
    }
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
  },
  methods: {
    parseTime,
    gotoruwei(planId) {
      this.$router.push({
        path: "/bid/bidMode7/EditStep1",
        query: { id: this.planId },
      });
    },
    showth(path) {
      window.open(process.env.VUE_APP_API_URL + path);
      //window.location.href = process.env.VUE_APP_API_URL + path;
    },
    onDonwLoad(fileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad007?fileId=" + fileId);
    },
    GetSupplierCnhTodoPage1001() {
      this.$http
        .get("/LiandoSupplierIn/GetSupplierCnhTodoPage1001", { params: { bidModeId: this.bidModeId, supplierId: this.supplierId } })
        .then((res) => {
          this.form = res.data;
          this.fileList = res.data.fileList;
        });
    },
    GetSupplierDepositTodoPage1001() {
      this.$http
        .get("/LiandoSupplierIn/GetSupplierDepositTodoPage1001", { params: { bidModeId: this.bidModeId, supplierId: this.supplierId } })
        .then((res) => {
          this.form = res.data;
          this.planId = res.data.planId;
          console.log(this.planId);
          this.fileList = res.data.fileList;
        });
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then((res) => {
        this.showmessage = res.data;
      });
    },
    gohome() {
      this.$router.push({
        path: "/index",
      });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 2% 0 120px;
  height: 100%;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: #ffffff;
  position: relative;
  /* width: 88%; */
  border-radius: 10px 10px 0 0;
  overflow: auto;
}

.buttoncss {
  float: right;
  margin-top: 12px;
}
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}
::v-deep .clearfix::after {
  content: none;
}
.el-icon-s-home {
  color: #409eff;
}
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 20px;
  float: right;
  cursor: pointer;
}
::v-deep .right {
  width: 200px;
}
</style>
