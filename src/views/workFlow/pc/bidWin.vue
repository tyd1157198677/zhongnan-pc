<template>
  <el-main>
    <el-card style="margin-bottom: 60px">
      <!-- <div slot="header" class="clearfix flex between middle">
        <el-page-header @back="$router.back(-1)" :content="navBarName"> </el-page-header> -->
      <div>
        <span
          ><strong>{{ showmessage }}</strong></span
        >

        <el-button style="float: right; margin-left: 10px" type="primary" size="small" v-if="showzhuan" @click="onAdd">转发</el-button>
        <i class="el-icon-s-operation" style="float: right; margin-left: 10px; font-size: 28px" title="点击查看招标过程" @click="goto"></i>
        <!-- <i class="el-icon-s-home" style="float:right;margin-left:10px" title="点击进入首页" @click="gohome"></i> -->
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
        <!-- <el-button style="float:right;margin-right:10px" type="primary" size="small" @click="onAdd">转发</el-button> -->
      </div>
      <!-- </div> -->
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
      <div style="margin-top: 10px">
        <el-tabs v-model="activeName" @tab-click="tabsClick">
          <el-tab-pane label="定标" name="1">
            <div>
              <el-row :gutter="20" style="margin-bottom: 10px; margin-top: 20px">
                <el-col :span="12">招标过程及背景描述：</el-col>
                <el-col :span="12">主要商务条款：</el-col>
              </el-row>
            </div>
            <div>
              <el-row :gutter="24">
                <el-col :span="12">
                  <!-- <div id="demo1" class="bac"></div> -->
                  <div class="bac" v-html="form1.winDesc"></div>
                </el-col>
                <el-col :span="12">
                  <!-- <div id="demo2"></div> -->
                  <div class="bac" v-html="form1.businessDesc"></div>
                </el-col>
              </el-row>
            </div>
            <div class="pub">评标情况</div>
            <el-table
              v-if="show1"
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="table1.winSupplierList"
            >
              <el-table-column label="序号" width="80" type="index" align="center"> </el-table-column>
              <el-table-column show-overflow-tooltip label="投标方名称">
                <template slot-scope="scope">
                  <el-link
                    type="primary"
                    style="color: #409eff; text-decoration: none; padding-right: 10px"
                    @click="jumpDetail(scope.row.supplierId)"
                    >{{ scope.row.comFullName }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column width="100" align="center" label="技术得分" prop="techScore"> </el-table-column>
              <el-table-column width="150" label="最终报价" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.latestAmount }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              v-if="show2"
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="table2.winSupplierList"
            >
              <el-table-column label="序号" width="80" type="index" align="center"> </el-table-column>
              <el-table-column show-overflow-tooltip label="投标方名称">
                <template slot-scope="scope">
                  <el-link
                    type="primary"
                    style="color: #409eff; text-decoration: none; padding-right: 10px"
                    @click="jumpDetail(scope.row.supplierId)"
                    >{{ scope.row.comFullName }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column width="100" align="center" label="技术得分" prop="techScore"> </el-table-column>
              <el-table-column width="150" label="最终报价" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.latestAmount }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              v-if="show3"
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="table3.winSupplierList"
            >
              <el-table-column label="序号" width="80" type="index" align="center"> </el-table-column>
              <el-table-column show-overflow-tooltip label="投标方名称">
                <template slot-scope="scope">
                  <el-link
                    type="primary"
                    style="color: #409eff; text-decoration: none; padding-right: 10px"
                    @click="jumpDetail(scope.row.supplierId)"
                    >{{ scope.row.comFullName }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column width="100" align="center" label="技术得分" prop="techScore"> </el-table-column>
              <el-table-column width="150" label="最终报价" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.latestAmount }}</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-table
              ref="multipleTable3"
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="table3"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column width="150" align="center" :label="table3.sectionName" prop="index"> </el-table-column>
              <el-table-column show-overflow-tooltip label="投标方名称">
                <template slot-scope="scope">
                  <el-link
                    class="sp"
                    type="primary"
                    style="color:#409eff;text-decoration: none;padding-right:10px"
                    icon="el-icon-search"
                    @click="jumpDetail(scope.row.supplierId)"
                    >{{ scope.row.comFullName }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column width="150" align="center" label="综合得分" prop="finalScore"> </el-table-column>
              <el-table-column width="150" label="最终报价" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.latestAmount }}</span>
                </template>
              </el-table-column>
            </el-table> -->

            <div class="pub">中标单位</div>
            <el-table
              ref="multipleTable4"
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="table4"
            >
              <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
              <!-- <el-table-column width="150" align="center" label="排名" prop="index"> </el-table-column> -->
              <el-table-column show-overflow-tooltip label="投标方名称">
                <template slot-scope="scope">
                  <el-link
                    class="sp"
                    type="primary"
                    style="color: #409eff; text-decoration: none; padding-right: 10px"
                    icon="el-icon-search"
                    @click="jumpDetail(scope.row.supplierId)"
                    >{{ scope.row.comFullName }}
                  </el-link>
                </template>
              </el-table-column>
              <!-- <el-table-column width="150" label="最终报价" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.latestAmount }}</span>
                </template>
              </el-table-column> -->
              <el-table-column width="150" label="中标金额" align="center" prop="finalWinPrice">
                <template slot-scope="scope">
                  <span>{{ scope.row.finalWinPrice }}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pub">相关附件</div>

            <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="dingfile">
              <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
              <el-table-column label="附件名称" min-width="160" align="center" prop="fileName"> </el-table-column>
              <el-table-column label="附件类型" align="center" prop="fileExtName"> </el-table-column>
              <el-table-column align="center" label="附件大小" prop="fileSize"> </el-table-column>
              <el-table-column align="center" label="上传日期" prop="creationTime">
                <template slot-scope="scope">
                  <font>{{ scope.row.creationTime.substring(0, 10) }}</font>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120">
                <template slot-scope="scope">
                  <i class="el-icon-download" title="下载" @click="onDonwLoad3(scope.row.id)"></i>
                  <!-- <i class="el-icon-delete ml-2" @click="deleteRow(scope.row)" v-if="scope.row.submitStatus != '已提交' && showButton"></i> -->
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="通知书及感谢信" name="2">
            <div class="pub">中标单位</div>
            <el-row>
              <!-- <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="table1"> -->
              <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="table4">
                <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
                <el-table-column width="120" align="center" label="标段名称" prop="sectionName"> </el-table-column>
                <el-table-column align="left" label="供应商名称">
                  <template slot-scope="scope">
                    <el-link
                      class="sp"
                      type="primary"
                      style="color: #409eff; text-decoration: none; padding-right: 10px"
                      icon="el-icon-search"
                      @click="jumpDetail(scope.row.supplierId)"
                      >{{ scope.row.comFullName }}
                    </el-link>
                  </template>
                </el-table-column>
                <el-table-column width="150" label="中标金额" align="center" prop="finalWinPrice">
                  <template slot-scope="scope">
                    <span>{{ scope.row.finalWinPrice }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="相关附件">
                  <el-table-column label="报价附件" align="center" width="120">
                    <template slot-scope="scope">
                      <i
                        class="el-icon-download ml-2"
                        title="下载"
                        @click="onDonwLoad3(scope.row.priceFileId)"
                        v-if="scope.row.priceFilePath"
                      ></i>
                    </template>
                  </el-table-column>

                  <el-table-column label="中标通知书" align="center" width="120">
                    <template slot-scope="scope">
                      <i
                        class="el-icon-download ml-2"
                        title="下载"
                        @click="onDonwLoad3(scope.row.noticeFileId)"
                        v-if="scope.row.noticeFilePath"
                      ></i>
                    </template>
                  </el-table-column>
                  <el-table-column label="其它" align="center" width="120">
                    <template slot-scope="scope">
                      <i
                        class="el-icon-download"
                        title="下载"
                        @click="onDonwLoad3(scope.row.otherFileId)"
                        v-if="scope.row.otherFilePath"
                      ></i>
                    </template>
                  </el-table-column>
                  <el-table-column label="盖章文件" align="center" width="120">
                    <template slot-scope="scope">
                      <i class="el-icon-download" title="下载" @click="onDonwLoad3(scope.row.sealId)" v-if="scope.row.sealUrl"></i>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-row>
            <div class="pub">未中标单位</div>
            <el-row>
              <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tablewei">
                <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                <el-table-column width="150" align="center" label="标段名称" prop="sectionName"> </el-table-column>
                <el-table-column align="left" min-width="350" label="供应商名称">
                  <template slot-scope="scope">
                    <el-link
                      class="sp"
                      type="primary"
                      style="color: #409eff; text-decoration: none; padding-right: 10px"
                      icon="el-icon-search"
                      @click="jumpDetail(scope.row.supplierId)"
                      >{{ scope.row.comFullName }}
                    </el-link>
                  </template>
                </el-table-column>

                <el-table-column label="感谢信" align="center" width="150">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-download ml-2"
                      title="下载"
                      @click="onDonwLoad3(scope.row.thanksFileId)"
                      v-if="scope.row.thanksFilePath"
                    ></i>
                  </template>
                </el-table-column>
                <el-table-column label="盖章文件" align="center" width="150">
                  <template slot-scope="scope">
                    <i class="el-icon-download ml-2" title="下载" @click="onDonwLoad3(scope.row.sealId)" v-if="scope.row.sealUrl"></i>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="交底资料" name="3">
            <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="uploadList">
              <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
              <el-table-column label="附件名称" min-width="160" align="center" prop="fileName"> </el-table-column>
              <el-table-column label="附件类型" align="center" prop="fileExtName"> </el-table-column>
              <el-table-column align="center" label="附件大小" prop="fileSize"> </el-table-column>
              <el-table-column align="center" label="上传日期" prop="creationTime">
                <template slot-scope="scope">
                  <font>{{ scope.row.creationTime.substring(0, 10) }}</font>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120">
                <template slot-scope="scope">
                  <i class="el-icon-download" title="下载" @click="onDonwLoad3(scope.row.id)"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div>
        <el-form v-if="showmark && showIndex == activeName" v-loading="loading" :rules="rulesrizhi">
          <el-form-item label="审批意见：" prop="remark" style="margin-top: 20px">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 4 }"
              placeholder="请输入审批意见"
              v-model="remark"
              style="width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" v-if="showPassButton" type="primary" style="float: right; margin-top: 10px" @click="omsubmit"
              >通过</el-button
            >
            <el-button
              size="mini"
              v-if="showRefuseButton"
              type="primary"
              style="float: right; margin-top: 10px; margin-right: 10px"
              @click="bohui"
              >驳回</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 10px">
        <el-row>
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tablelistbuzhou">
            <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
            <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
            <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
            <el-table-column prop="creationTime" width="180" label="待办时间" align="center">
              <template slot-scope="scope"
                ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column>
            <el-table-column prop="dealTime" width="180" label="处理时间" align="center">
              <template slot-scope="scope"
                ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column>
            <el-table-column prop="status" width="80" label="结果" align="center"> </el-table-column>
            <el-table-column label="意见/备注" prop="comments" align="center" show-overflow-tooltip> </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-card>
    <el-dialog width="90%" title="技术评委对投标方的打分明细" :visible.sync="dialogVisibleshow">
      <div>
        <span style="float: right"><span>得分：</span>{{ finalScore }}</span>
      </div>
      <div class="text item">
        <el-table
          empty-text="暂无数据"
          ref="tabRef2"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="tablelist.scoreItemList"
          v-loading="loading"
        >
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column width="200" align="center" label="维度名称" prop="wdName"> </el-table-column>
          <el-table-column width="250" align="left" label="指标名称" prop="zbName"> </el-table-column>
          <el-table-column align="left" label="打分标准" prop="itemDesc"> </el-table-column>
          <el-table-column width="100" align="center" label="满分" prop="fullScore"> </el-table-column>
          <el-table-column width="100" v-for="(item, index) in tablelist.personNameList" :key="index" align="center" :label="item">
            <template slot-scope="scope">
              <span>{{ scope.row.personScoreList[index] }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center" label="平均分" prop="avgScore"> </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="2" />
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
import wangEditor from "wangeditor";
import choseUser from "@/components/choseUser";
export default {
  inject: ["reload"],
  components: { choseUser, peoUser: () => import("@/components/peoUser.vue") },
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      form: {},
      showzhuan: false,
      form1: {},
      msg: "",
      tablelist: [
        {
          personNameList: [],
          scoreItemList: [],
        },
      ],
      tablelistbuzhou: "",
      finalScore: "",
      activeName: "1",
      showIndex: "1",
      isCanEdit: false,
      radio: true,
      showRefuseButton: false,
      showPassButton: false,
      showmark: false,
      tabledata: [],
      uploadList: [],
      dingfile: [],
      table4: [],
      table2: [],
      tablewei: [],
      // table2: {},
      table1: [],
      table3: [],
      // table1: {},
      show1: false,
      show2: false,
      show3: false,
      tablesectionName: "",
      dialogVisibleshow: false,
      FileName: "",
      showmessage: {},
      remark: "",
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      tableData: "",
      loading: false,
      // loading1: false,
      uploadData: {},
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rulesrizhi: {
        // remark: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
      },
      rules: {},
    };
  },
  computed: {
    // bidModeId() {
    //   return this.$route.params.bidModeId;
    // },
    navBarName() {
      const barName = "";
      return barName;
    },
    bidModeId() {
      if (this.$route.query.bidModeId) {
        return this.$route.query.bidModeId;
      } else {
        return this.id;
      }
    },
    masterId() {
      return this.$route.query.masterId;
    },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
    // baseId() {
    //   return this.$route.params.baseId;
    // },
  },
  created: function () {
    this.$emit("header", false);
    this.$emit("footer", false);
    this.todoId = this.$route.query.todoId;

    // this.todoId = sessionStorage.getItem("todoId");
    // this.bidModeId = sessionStorage.getItem("bidModeId");
  },
  mounted() {
    // this.CheckCanEditPlan01();
    // this.getList();
    // this.getlist();
    this.GetOnePlanById();
    this.GetWinAuditPageShow();
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
  },
  methods: {
    parseTime,
    create1() {
      const editor = new wangEditor(`#demo1`);
      editor.config.onchange = (newHtml) => {
        this.form1.winDesc = newHtml;
      };
      editor.config.menus = [];
      editor.create();
      this.editor = editor;
    },
    create2() {
      const editor1 = new wangEditor(`#demo2`);
      editor1.config.onchange = (newHtml) => {
        this.c = newHtml;
      };
      editor1.config.menus = [];
      editor1.create();
      this.editor1 = editor1;
    },
    addHtml(res) {
      this.form1.winDesc = "";
      if (res != "") {
        for (var i = 0; i < res.length; i++) {
          if (i != 0) {
            this.form1.winDesc += "<br>";
          }
          this.form1.winDesc += res[i];
        }
      }
      this.editor.txt.html(this.form1.winDesc);
    },
    GetBidContent1001() {
      this.$http.get("/BidWin/GetBidContent1001", { params: { bidModeId: this.bidModeId } }).then((res) => {
        this.addHtml(res.data);
      });
    },
    gotoshow(supplierId) {
      this.dialogVisibleshow = true;
      this.Gettablelist(supplierId);
    },
    Gettablelist(supplierId) {
      let obj = {
        bidModeId: this.bidModeId,
        sectionId: this.sectionId,
        supplierId: supplierId,
      };
      this.$http.get("/BidExamScore/GetPersonSupplierTechScore", { params: obj }).then((res) => {
        this.finalScore = res.data.finalScore;
        this.pageMessage = res.data.pageMessage;
        this.tablelist = res.data;
      });
    },
    onAdd() {
      this.$refs.choseUser.openfnc();
    },
    onUserAdd(id) {
      const obj = {
        bidModeId: this.bidModeId,
        acceptUserGuid: id.map((v) => v.userGuid),
      };
      this.$http.post("/BidWin/SaveTransmit1001", obj).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.CheckUserTransAuth1001();
        }
      });
    },
    GetOnePlanById() {
      this.$http.get("/PurchasePlan/GetOneRequireById", { params: { id: this.bidModeId } }).then((res) => {
        this.form = res.data;
      });
    },
    CheckUserTransAuth1001() {
      this.$http.get("/BidWin/CheckUserTransAuth1001", { params: { bidModeId: this.bidModeId } }).then((res) => {
        if (res.data.success) {
          this.showzhuan = true;
        } else {
          this.showzhuan = false;
        }
      });
    },
    timeFormatSeconds(time) {
      var d = time ? new Date(time) : new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      // var hours = d.getHours();
      // var min = d.getMinutes();
      // var seconds = d.getSeconds();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      // if (hours < 0) hours = "0" + hours;
      // if (min < 10) min = "0" + min;
      // if (seconds < 10) seconds = "0" + seconds;

      return year + "-" + month + "-" + day;
    },
    onDonwLoad2(id) {
      // window.open(process.env.VUE_APP_API_URL + file.filePath + file.fileReName);
      window.location.href = process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidOpenDownLoad002?fileId=" + id;
    },
    onDonwLoad3(id) {
      // window.open(process.env.VUE_APP_API_URL + file.filePath + file.fileReName);
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + id);
    },
    onDonwLoad(file, index) {
      var path = "";
      if (index == 1) {
        path = file.priceFilePath;
      } else if (index == 2) {
        path = file.noticeFilePath;
      } else if (index == 3) {
        path = file.thanksFilePath;
      } else if (index == 4) {
        path = file.otherFilePath;
      } else if (index == 5) {
        path = file.sealUrl;
      }
      window.open(process.env.VUE_APP_API_URL + path);
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
    goto() {
      window.open("#/bid/processDetail?id=" + this.bidModeId);
      console.log(this.bidModeId);
    },
    getbidModeId() {
      this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then((res) => {
        console.log(this.bidModeId);
        this.planId = res.data.planId;
        console.log(this.planId);
        this.getlist();
      });
    },
    getlist() {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then((res) => {
        // this.form = res.data;
      });
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then((res) => {
        this.showmessage = res.data;
      });
    },
    getListjiaodi() {
      this.$api.supIn.GetBidWinAttachList03({ bidModeId: this.bidModeId }).then((res) => {
        this.uploadList = res;
      });
    },
    getListtongzhizhong() {
      this.$api.supIn.GetThanksSupplierList02({ bidModeId: this.bidModeId }).then((res) => {
        // this.table1 = res;
        this.table4 = res;
      });
    },
    getListtpngzhibuzhong() {
      this.$api.supIn.GetNoThanksSupplierList02({ bidModeId: this.bidModeId }).then((res) => {
        this.tablewei = res;
      });
    },
    getListdingfile() {
      this.$api.supIn.GetBidWinAttachList01({ bidModeId: this.bidModeId }).then((res) => {
        this.dingfile = res;
      });
    },
    getInfo() {
      this.$api.supIn.GetBidWinMaster01({ bidModeId: this.bidModeId }).then((res) => {
        this.form1 = res;
        console.log(this.form1.businessDesc);
        this.form1.winDesc = res.winDesc;
        this.form1.businessDesc = res.businessDesc;
        // this.editor1.txt.html(res.businessDesc);
        // this.editor.txt.html(res.winDesc);
        if (this.form1.bidWinDate) {
          this.form1.bidWinDate = this.form1.bidWinDate.substring(0, 10);
        }
      });
    },
    // getzhong() {
    //   this.$api.supIn.GetSectionSupplier01({ bidModeId: this.bidModeId }).then(res => {
    //     this.sectionId = res[0].sectionId;
    //     this.table1 = res[0].winSupplierList;
    //     this.tablesectionName = "排名（" + res[0].sectionName + ")";
    //   });
    // },
    getList1() {
      this.$api.supIn.GetSectionSupplier01({ bidModeId: this.bidModeId }).then((res) => {
        for (var i = 0; i < res.length; i++) {
          if (i == 0) {
            this.show1 = true;
            this.table1 = res[i];
            var sf1 = [];
            this.table1.winSupplierList.forEach((row) => {
              row.sectionId = this.table1.sectionId;
              if (row.selectFlag) {
                sf1.push(row);
              }
              this.sectionId = row.sectionId;
            });
            // this.toggleSelection1(sf1);
          }
          if (i == 1) {
            this.show2 = true;
            this.table2 = res[i];
            var sf1 = [];
            this.table2.winSupplierList.forEach((row) => {
              row.sectionId = this.table2.sectionId;
              if (row.selectFlag) {
                sf1.push(row);
              }
              this.sectionId = row.sectionId;
            });
            // this.toggleSelection2(sf1);
          }
          if (i == 2) {
            this.show3 = true;
            this.table3 = res[i];
            var sf1 = [];
            this.table3.winSupplierList.forEach((row) => {
              row.sectionId = this.table3.sectionId;
              if (row.selectFlag) {
                sf1.push(row);
              }
              this.sectionId = row.sectionId;
            });
            // this.toggleSelection3(sf1);
          }
        }
      });
    },
    GetWinAuditPageShow() {
      this.$http.get("/BidWin/GetWinAuditPageShow", { params: { bidModeId: this.bidModeId, masterId: this.masterId } }).then((res) => {
        this.activeName = res.data.showTab + "";
        this.showIndex = res.data.showTab + "";
        if (res.data.isDel == true) {
          this.$alert("该流程已关闭", {
            confirmButtonText: "确定",
          }).then(() => {
            this.$router.push({
              path: "/user/todoList",
            });
          });
        } else {
          this.GetBidWinList();
          this.getListjiaodi();
          this.getListtongzhizhong();
          this.getListtpngzhibuzhong();
          this.getListdingfile();
          this.getInfo();
          // this.create1();
          // this.create2();
          // this.$nextTick(() => {
          //   document.querySelectorAll(".placeholder")[0].innerHTML = "请输入招标过程及背景描述";
          //   document.querySelectorAll(".placeholder")[1].innerHTML = "请输入主要商务条款";
          // });
          // this.GetBidContent1001();
          this.getbidModeId();
          // this.getzhong();
          this.getList1();
          this.CheckUserTransAuth1001();
        }

        if (res.data.showPassButton) {
          this.showPassButton = true;
        } else {
          this.showPassButton = false;
        }
        if (res.data.showRefuseButton) {
          this.showRefuseButton = true;
        } else {
          this.showRefuseButton = false;
        }
        if (!res.data.showRefuseButton && !res.data.showPassButton) {
          this.showmark = false;
        } else {
          this.showmark = true;
        }
      });
    },
    tabsClick(val) {
      this.GetBidWinList();
    },
    GetBidWinList() {
      this.$http.get("/WorkFlowStart/GetNewLogList_BidWin", { params: { bidModeId: this.bidModeId, tab: this.activeName } }).then((res) => {
        this.tablelistbuzhou = res.data.logs;
      });
    },
    omsubmit() {
      this.$confirm("确认要通过定标审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.remark == "") {
          let obj = {
            bidModeId: this.bidModeId,
            masterId: this.masterId,
            remark: this.remark,
            isOk: 0,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_BidWin_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.getbidModeId();
              this.GetWinAuditPageShow();
              this.GetBidWinList();
            } else {
              this.loading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        } else {
          this.$message({
            message: "请先输入审批意见",
            type: "error",
          });
        }
      });
    },
    bohui() {
      this.$confirm("确认要驳回定标审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.remark == "") {
          let obj = {
            bidModeId: this.bidModeId,
            masterId: this.masterId,
            remark: this.remark,
            isOk: -1,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_BidWin_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.getbidModeId();
              this.GetWinAuditPageShow();
              this.GetBidWinList();
            } else {
              this.loading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        } else {
          this.$message({
            message: "请先输入审批意见",
            type: "error",
          });
        }
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
.bac {
  /* background: #ccc !important; */
  height: 250px;
  overflow-y: auto;
  border: 1px solid #c7c7c7;
}
</style>
<style>
.w-e-text-container {
  z-index: 1 !important;
}
.w-e-toolbar {
  z-index: 1 !important;
}
.w-e-text {
  overflow-y: hidden;
}
</style>
