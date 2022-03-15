<template>
  <el-container class="detail">
    <el-main>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div>招标小组成员</div>
          </template>
          <el-table key="1" empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="reasons">
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="角色名称" prop="bidRole"> </el-table-column>
            <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
            <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
            <!-- <el-table-column label="所属组织" prop="bidProcessName"> </el-table-column> -->
            <el-table-column label="所属组织" prop="orgName" align="center"> </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div>入围单位</div>
          </template>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="supplierList">
            <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
            <el-table-column label="供应商名称" prop="supplierName"> </el-table-column>
            <el-table-column label="主营专业" prop="supCateNames" align="center"> </el-table-column>
            <el-table-column label="注册资金" prop="regCapital" align="center" width="120">
              <template slot-scope="scope">
                {{ scope.row.regCapital + scope.row.regCapitalType }}
              </template>
            </el-table-column>

            <el-table-column label="商务联系人" align="center">
              <el-table-column label="姓名" align="center" width="130" prop="personName"> </el-table-column>
              <el-table-column label="手机号" align="center" width="170" prop="mobilePhone"> </el-table-column>
              <el-table-column label="职务" align="center" width="130" prop="workAs"> </el-table-column>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div>报名相关信息</div>
          </template>
          <el-card class="box-card">
            <table class="layui-table el-table__body">
              <tbody>
                <tr>
                  <td class="right" style="width: 150px">投标保证金（元）:</td>
                  <td colspan="3">{{ form1.deposit }}</td>
                  <td class="right" style="width: 150px">是否发布公告:</td>
                  <td colspan="3">{{ form1.isShow ? "发布" : "不发布" }}</td>
                  <td class="right" style="width: 170px" v-if="isShow">报名截止时间:</td>
                  <td colspan="3" v-if="isShow">{{ parseTime(form1.signUpEndDate, "yyyy-MM-dd") }}</td>
                  <td class="right" style="width: 140px" v-if="isShow">公告标题:</td>
                  <td colspan="3" v-if="isShow">{{ form1.noticeTitle }}</td>
                </tr>
                <tr v-if="isShow">
                  <td class="right">公告时间:</td>
                  <td colspan="3">{{ parseTime(form1.showDate, "yyyy-MM-dd") }}</td>
                  <td class="right">招标联系人姓名:</td>
                  <td colspan="3">{{ form1.personName }}</td>
                  <td class="right">招标联系人电话:</td>
                  <td colspan="3">{{ form1.mobilePhone }}</td>
                  <td class="right">招标联系人邮箱:</td>
                  <td colspan="3">{{ form1.personEmail }}</td>
                </tr>
              </tbody>
            </table>
            <el-form label-position="top" ref="form1" v-show="isShow">
              <el-row :gutter="10" style="margin-top: 10px">
                <el-col :span="12">
                  <el-form-item label="招标公告内容">
                    <div id="demo1"></div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="入围标准">
                    <div id="demo2"></div>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="报名提交材料">
                    <div id="demo3"></div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="bacDis" v-if="isShow">
              <div>招标公告附件</div>
            </div>
            <el-table
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="fileslist"
              v-if="isShow"
            >
              <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
              <el-table-column label="文件名称" align="left">
                <template slot-scope="scope">
                  <span>{{ scope.row.fileName + scope.row.fileExtName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="文件大小" prop="showFileSize" align="center"> </el-table-column>
              <el-table-column label="上传日期" prop="creationTime" align="center">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd") }}</span>
                </template>
              </el-table-column>
              <el-table-column label="上传人" prop="creatorUserName"> </el-table-column>
              <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-collapse-item>
      </el-collapse>
      <public-shenpi
        :type="'定标'"
        :id="$route.query.id"
        :urlSubmit="urlSubmit"
        :urlRizhi="urlRizhi"
        :showBtnUrl="showBtnUrl"
      ></public-shenpi>
    </el-main>
  </el-container>
</template>

<script>
import { parseTime } from "@/util";
import wangEditor from "wangeditor";
import $ from "jquery";
import gongFang from "@/views/invest/components/storageList";
export default {
  components: {
    choseUser: () => import("@/components/choseUser"),
    gongFang,
    rizhi: () => import("@/components/rizhi.vue"),
    publicShenpi: () => import("@/components/publicShenpi.vue"),
  },
  data() {
    return {
      urlSubmit: "/ModeMasterAppServices/WorkFlowRun",
      urlRizhi: "/WflowApproveLogsAppServices/EB_GetBidMasterList",
      showBtnUrl: "/ModeMasterAppServices/CheckShowAuditButton",
      typ1: "招标组长",
      projectName: "",
      form: {},
      reasons: [],
      supplierList: [],
      activeNames: ["1", "2", "3", "4"],
      form1: {},
      fileslist: [],
      loading: false,
      isShow: false,
      tempList: {},
      editor: null,
      editorData: "",
      editor2: null,
      editorData2: "",
      editor3: null,
      editorData3: "",
      planId: "",
      bidModeId: "",
    };
  },
  created() {
    this.bidModeId = this.$route.query.bidModeId;
    this.planId = this.$route.query.id;
  },
  mounted() {
    this.GetBidModePersonList1001();
    this.GetBidModeSupplierList1001();

    this.GetNoticeByPlanId05();
    this.getList2();
    this.$nextTick(() => {
      setTimeout(() => {
        $(".w-e-text").css("min-height", "180px");
        $(".w-e-text-container").css("height", "180px");
      }, 500);

      this.create1();
      this.create2();
      this.create3();
    });
  },
  methods: {
    parseTime,
    create1() {
      const editor = new wangEditor(`#demo1`);
      editor.config.onchange = (newHtml) => {
        this.editorData = newHtml;
      };
      editor.config.menus = [];
      editor.create();
      this.editor = editor;
    },
    create2() {
      const editor = new wangEditor(`#demo2`);
      editor.config.onchange = (newHtml) => {
        this.editorData2 = newHtml;
      };
      editor.config.menus = [];
      editor.create();
      this.editor2 = editor;
    },
    create3() {
      const editor = new wangEditor(`#demo3`);
      editor.config.onchange = (newHtml) => {
        this.editorData3 = newHtml;
      };
      editor.config.menus = [];
      editor.create();
      this.editor3 = editor;
    },
    onDownload(id) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidCommonFileDownLoad099?fileId=" + id, "_blank");
    },
    //获取公告信息
    GetNoticeByPlanId05() {
      this.$http.get("/ModeMasterAppServices/GetNoticeByPlanId05", { params: { planId: this.planId } }).then((res) => {
        this.form1 = res.data;
        if (this.form1.isShow == null || !this.form1.isShow) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
        if (res.data.planId != "00000000-0000-0000-0000-000000000000") {
          this.editor.txt.html(this.form1.liandoContent);
          this.editor2.txt.html(this.form1.liandoRequire);
          this.editor3.txt.html(this.form1.requireFile);
        } else {
          this.$http.get("/ModeMasterAppServices/GetNoticeTemplet05", { params: { planId: this.planId } }).then((res1) => {
            this.addHtml(res1.data);
          });
        }
      });
    },
    addHtml(res) {
      for (var i = 0; i < res.liandoContent.length; i++) {
        if (i != 0) {
          this.editorData += "<br>";
        }
        this.editorData += res.liandoContent[i];
      }
      this.editor.txt.html(this.editorData);
      for (var i = 0; i < res.liandoRequire.length; i++) {
        if (i != 0) {
          this.editorData2 += "<br>";
        }
        this.editorData2 += res.liandoRequire[i];
      }
      this.editor2.txt.html(this.editorData2);

      for (var i = 0; i < res.requireFile.length; i++) {
        if (i != 0) {
          this.editorData3 += "<br>";
        }
        this.editorData3 += res.requireFile[i];
      }
      this.editor3.txt.html(this.editorData3);
    },

    //获取人员列表
    GetBidModePersonList1001() {
      this.$http.get("/BidModePerson/GetBidModePersonList1001", { params: { baseId: this.bidModeId } }).then((res) => {
        this.reasons = res.data;
      });
    },
    //获取已添加供方列表
    GetBidModeSupplierList1001() {
      this.$http.get("/ModeMasterAppServices/GetBidModeSupplierList1001", { params: { baseId: this.bidModeId } }).then((res) => {
        this.supplierList = res.data.result;
      });
    },

    getList2() {
      this.$http.get("/ModeMasterAppServices/GetNoticeFileList?planId=" + this.planId).then((res) => {
        this.fileslist = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
}
.detail {
  padding: 10px;
  margin: 0 auto;
}
.bacDis {
  background: #d9d6d6;
  display: flex;
  justify-content: space-between;
  div {
    line-height: 40px;
    padding-left: 10px;
    font-size: 15px;
    font-weight: 600;
  }
}
::v-deep .el-form-item__label {
  height: 20px;
  line-height: 20px;
}

::v-deep .el-collapse-item__header {
  border-left: 3px solid #ea5514;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background: #d9d6d6;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
  position: relative;
  .pub {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 30px;
  }
}
</style>
