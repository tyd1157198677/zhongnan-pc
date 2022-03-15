<!--  -->
<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title"> <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">基本信息</span> </template>
        <div>
          <table class="layui-table el-table__body">
            <tbody>
              <tr>
                <td class="right">项目名称：</td>
                <td colspan="3">{{ form.planName }}</td>
                <td class="right">招标计划名称：</td>
                <td colspan="3">{{ form.projectName }}</td>
              </tr>
              <tr>
                <td class="right">招标层级：</td>
                <td>
                  {{ form.bidLevel }}
                </td>
                <td class="right">招标方式：</td>
                <td>
                  {{ form.purchaseType }}
                </td>
                <td class="right">计划定标日期：</td>
                <td>
                  {{ parseTime(form.bidEndDate, "yyyy-MM-dd") }}
                </td>
                <td class="right">招标专业：</td>
                <td>
                  {{ form.bidCateName }}
                </td>
              </tr>
              <tr>
                <td class="right">需求部门：</td>
                <td>
                  {{ form.depName }}
                </td>
                <td class="right">合约规划金额：</td>
                <td>
                  {{ form.planMoney }}
                </td>
                <td class="right">建筑面积：</td>
                <td>
                  {{ form.jzSquire }}
                </td>
                <td class="right">经办人：</td>
                <td>
                  {{ form.bidUserName }}
                </td>
              </tr>
              <tr>
                <td class="right">经办日期：</td>
                <td>
                  {{ parseTime(form.creationTime, "yyyy-MM-dd") }}
                </td>
                <td class="right">招标进度：</td>
                <td>
                  {{ form.planStatus }}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="right">备注：</td>
                <td colspan="7">
                  {{ form.requireDesc }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title"> <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">标段信息</span> </template>
        <div>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tabledata">
            <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column prop="projectName" label="项目或期区名称"> </el-table-column>
            <el-table-column prop="planName" label="招标计划名称"> </el-table-column>
            <el-table-column prop="sectionName" label="标段名称" width="200"></el-table-column>
            <el-table-column prop="sectionOrder" label="排序序号" width="120" align="center"></el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title"> <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">招标小组</span> </template>
        <div>
          <el-tabs type="card" v-model="activeName" style="margin-top:10px">
            <el-tab-pane label="招标组长" name="招标组长">
              <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="zuzhangdata">
                <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
                <el-table-column label="标段" prop="sectionName" align="center"> </el-table-column>
                <el-table-column label="姓名" prop="userName" align="center"></el-table-column>
                <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
                <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="商务组成员" name="商务组成员">
              <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="shangwudata">
                <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                <el-table-column label="标段" prop="sectionName" align="center"> </el-table-column>
                <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
                <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
                <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="技术组成员" name="技术组成员">
              <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="jishudata">
                <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                <el-table-column label="标段" prop="sectionName" align="center"> </el-table-column>
                <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
                <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
                <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
                <!-- <el-table-column label="评标类型" prop="bidPersonExam" align="center"> </el-table-column> -->
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title"> <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">招标单项计划</span> </template>
        <div>
          <el-table
            empty-text="无符合条件的记录"
            stripe
            border
            style="margin-top:10px"
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData2"
          >
            <el-table-column type="index" width="50" label="序号" align="center" prop="num"> </el-table-column>
            <el-table-column prop="bidWorkType" label="项目工程" width="300" align="center"> </el-table-column>
            <el-table-column prop="workDesc" label="工作结果"> </el-table-column>
            <el-table-column prop="endDate" label="完成时限" width="200" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.endDate, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="责任人" width="180" prop="userName" align="center"> </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title"> <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">相关附件</span> </template>
        <div>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="files">
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="附件名称" prop="fileName"> </el-table-column>
            <el-table-column label="附件大小" prop="showFileSize" align="center" width="120"> </el-table-column>
            <el-table-column label="附件类型" prop="fileExtName" align="center" width="120"> </el-table-column>
            <!-- <el-table-column label="上传人" prop="bidProcessName"> </el-table-column> -->
            <el-table-column label="上传日期" prop="uploadDate" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.uploadDate, "yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <!-- <template slot-scope="scope">
                <el-link style="margin-left:10px;" type="success" :href="getFileUrl(scope.row)">下载</el-link>
              </template> -->
              <template slot-scope="scope">
                <i class="el-icon-download" @click="downLoad(scope.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
      <el-collapse-item name="6">
        <template slot="title"> <i class="el-icon-menu" style="color:#787b84"></i><span class="infonametits">会签人员</span> </template>
        <div>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="huiqiandata">
            <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
            <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
            <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { dateFormat } from "@/util/validate";
import { parseTime } from "@/util";
export default {
  components: {
    peoUser: () => import("@/components/peoUser.vue"),
  },
  props: ["id"],
  data() {
    return {
      activeNames: "1",
      form: {
        // id: "",
        // modeName: "",
        // projectId: "",
        // cashDeposit: 0,
        // cashQuality: 0,
        // haveManager: false,
        // openRegistration: false,
        // setUpFlag: false,
        // jzSquare: 0,
        // moneyPerSquare: 0,
        // bidBody: "",
        // bidScope: "",
        // purchaseType: "",
        // modeStatus: "",
        // purchaseType: "",
        // creationTime: "",
        // bidInviteType: "",
      },
      tabledata: [],
      biaoduanvalue: "",
      options: [],
      activeName: "招标组长",
      zuzhangdata: [],
      shangwudata: [],
      jishudata: [],
      tableData2: [],
      files: [],
      huiqiandata: [
        {
          userGuid: "",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getbidModeId();
  },
  methods: {
    parseTime,
    tomethgojihua() {
      this.getbidModeId();
    },
    getbidModeId() {
      this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.id } }).then(res => {
        this.planId = res.data.planId;
        this.GetOnePlanById();
        // this.getBaseInfo();
        this.getBaseInfo1();
        // this.getSelectionlist();
        this.getzuzhangList();
        this.getshangwuList();
        this.getjishuList();
        this.getList();
        this.getPersons();
        this.gethuiqianList();
      });
    },
    GetOnePlanById() {
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.planId } }).then(res => {
        this.form = res.data;
      });
    },
    // getBaseInfo() {
    //   let obj = {
    //     id: this.planId,
    //   };
    //   this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then(res => {
    //     if (res.status == 200) {
    //       this.form = res.data;
    //     }
    //   });
    // },
    getBaseInfo1() {
      this.$http.get("/LiandoPlan/GetBidModeSection02", { params: { planId: this.planId } }).then(res => {
        if (res.status == 200) {
          this.tabledata = res.data;
        }
      });
    },
    // async getSelectionlist() {
    //   let res = await this.$http.get("/LiandoPlan/GetSectionDropDown03", { params: { planId: this.planId } });
    //   this.biaoduanvalue = res.data.length > 0 ? res.data[0].value : "";
    //   this.options = res.data;

    // },
    handleChange() {
      switch (this.activeName) {
        case "招标组长":
          this.getzuzhangList();
          break;
        case "商务组成员":
          this.getshangwuList();
          break;
        case "技术组成员":
          this.getjishuList();
          break;
      }
    },
    getzuzhangList() {
      this.$http.get("/LiandoPlan/GetBidLeader03", { params: { planId: this.planId } }).then(res => {
        this.zuzhangdata = [res.data];
      });
    },
    getshangwuList() {
      this.$http.get("/LiandoPlan/GetBusinessUser03", { params: { planId: this.planId } }).then(res => {
        // if (res.data.success) {
        this.shangwudata = res.data;
        // }
      });
    },
    getjishuList() {
      this.$http.get("/LiandoPlan/GetTechUser03", { params: { planId: this.planId } }).then(res => {
        // if (res.data.success) {
        this.jishudata = res.data;
        // }
      });
    },
    getList() {
      this.$http.get("/LiandoPlan/GetBidWorkList04", { params: { planId: this.planId } }).then(res => {
        // if (res.status == 200) {
        this.tableData2 = res.data;
        // }
      });
    },
    downLoad(id) {
      // window.location.href = process.env.VUE_APP_API_URL + url;
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad006?fileId=" + id);
    },
    getPersons() {
      this.$http.get("/LiandoPlan/GetPlanAttachList05", { params: { planId: this.planId } }).then(res => {
        if (res.status == 200) {
          this.files = res.data;
        }
      });
    },
    gethuiqianList() {
      this.$http.get("/LiandoPlan/GetAuditUser05", { params: { planId: this.planId } }).then(res => {
        if (res.status == 200) {
          this.huiqiandata = res.data;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.pub {
  border-left: 3px solid #21468c;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background: #f4f4f4;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
}
</style>
<style>
.el-table .table-info-row {
  background-color: #ffffcc;
}
</style>
