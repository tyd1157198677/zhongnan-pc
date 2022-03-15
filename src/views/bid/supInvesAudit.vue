<template>
  <el-container class="home">
    <el-main class="main">
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td class="right" style="width: 120px">供方名称:</td>
            <td colspan="3" @click="jumpSuppInfo(neweditform.baseGuid)" class="setColor">{{ neweditform.supName }}</td>
            <td class="right" style="width: 120px">考察日期:</td>
            <td colspan="3">{{ neweditform.invesDate == "0001-01-01T00:00:00" ? "" : parseTime(neweditform.invesDate, "yyyy-MM-dd") }}</td>

            <td class="right" style="width: 120px">考察专业：</td>
            <td colspan="3">{{ neweditform.cateName }}</td>
            <td class="right" style="width: 100px">考察结果:</td>
            <td colspan="3">{{ neweditform.invesResult == 1 ? "通过" : "不通过" }}</td>
          </tr>

          <tr>
            <td class="right" style="width: 120px">参与人员：</td>
            <td colspan="3">
              {{ neweditform.userName }}
            </td>
            <td class="right">考察附件：</td>
            <td colspan="3" class="setColor" @click="download(neweditform.fileId)">{{ neweditform.fileName }}</td>
            <td class="right">备注:</td>
            <td colspan="7">{{ neweditform.remark }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="remark">
        <strong style="margin-right: 10px"> 总体说明:</strong>
        <span style="color: red">{{ remark }}</span>
      </div>
      <public-shenpi :type="'供方考察'" :id="masterId" :urlSubmit="urlSubmit" :urlRizhi="urlRizhi" :showBtnUrl="showBtnUrl">
        <div class="projectover" slot="tabDown">
          <!-- <el-form-item label="合作层级" style="margin-top: 20px"> -->
          <el-form-item label="合作层级" style="margin-top: 20px" v-if="selectLevel">
            <el-select v-model.trim="supLevel" placeholder="请选择层级" style="width: 100%" @change="handleChange">
              <el-option label="集团供应商" value="集团供应商"></el-option>
              <el-option label="区域供应商" value="区域供应商"></el-option>
              <el-option label="属地供应商" value="属地供应商"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </public-shenpi>
    </el-main>
  </el-container>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {
    publicShenpi: () => import("@/components/publicShenpi.vue"),
  },
  data() {
    return {
      towMenu: [],
      urlSubmit: "/SupInvesAppServices/WorkFlowRun_inves",
      supLevel: "集团供应商",
      remark: "",
      urlRizhi: "/WflowApproveLogsAppServices/EB_GetSupInvesList",
      showBtnUrl: "/SupInvesAppServices/CheckShowAuditButton",
      neweditform: {},
      selectLevel: false,
      supId: this.$route.query.supId,
      masterId: this.$route.query.masterId,
    };
  },
  created() {
    // this.$emit("header", false);
    // this.$emit("footer", false);
  },
  mounted() {
    this.getList1();
    this.CheckShowStartBid1001();
  },
  methods: {
    parseTime,
    async getList1() {
      let obj = {
        id: this.masterId,
      };
      let res = await this.$http.get("/SupInvesAppServices/GetSupInvesInfoList", { params: obj });
      if (res.data.success) {
        if (res.data.result.items.length > 0) {
          this.neweditform = res.data.result.items[0];
          this.neweditform.cateName = this.neweditform.cateName + [];
          this.neweditform.userName = this.neweditform.userName + [];
          this.$http.get("/ModeMasterAppServices/GetSupplierInMaster", { params: { masterId: this.masterId } }).then((res) => {
            this.remark = res.data;
          });
        }
      }
    },
    CheckShowStartBid1001() {
      this.$http.post(this.showBtnUrl, { masterId: this.masterId }).then((res) => {
        this.selectLevel = res.data.selectLevel;
        if (this.selectLevel) {
          this.handleChange();
        }
      });
    },
    handleChange() {
      this.$http.post("/SupInvesAppServices/SaveSupLevel", { supId: this.supId, supLevel: this.supLevel }).then((res) => {
        // this.selectLevel = res.data.selectLevel;
      });
    },
    jumpSuppInfo(id) {
      window.open(`#/supplier/detail/${id}`);
    },
    download(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/UploadFileById?fileId=" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: block;
  margin-bottom: 40px;
  margin: auto;
}

.main {
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  background: #ffffff;
  position: relative;
  border-radius: 10px 10px 0 0;
  overflow: visible;
  padding: 0 10px 0 10px;
}
.mytabs {
  width: 100%;
}
.setColor {
  cursor: pointer;
  color: #409eff;
}
.infobtn {
  position: absolute;
  right: 8.5%;
  z-index: 1;
  margin-bottom: -35px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: 0px;
  margin-left: 0px;
}
</style>
