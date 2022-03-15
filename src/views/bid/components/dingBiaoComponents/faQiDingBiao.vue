<!--  -->
<template>
  <div class="">
    <!-- <div class="pub">基本信息</div> -->
    <el-card>
      <div style="padding:10px">
        <div slot="header" class="clearfix">
          <div style="margin:10px 20px 30px 20px"><strong>基本信息</strong></div>
          <div style="border-bottom:2px solid #EBEEF5;margin:-10px"></div>
        </div>
        <div>
          <el-row :gutter="20" style="margin-bottom:10px;margin-top:20px">
            <el-col :span="12">招标过程及背景描述：</el-col>
            <el-col :span="12">主要商务条款：</el-col>
          </el-row>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="12">
              <div v-if="showButton" id="demo1" class="bac"></div>
              <div class="bac" v-if="!showButton" v-html="form.winDesc"></div>
              <!-- <div id="demo1" v-if="form.winDesc == ''"></div>
              <el-input v-else type="textarea" :rows="2" placeholder="请填写招标过程及背景描述" v-model="form.winDesc"></el-input> -->
            </el-col>
            <el-col :span="12">
              <div class="bac" v-if="showButton" id="demo2"></div>
              <div class="bac" v-if="!showButton" v-html="form.businessDesc"></div>
              <!-- <el-input type="textarea" :rows="2" placeholder="请填写主要商务条款" v-model="form.businessDesc"></el-input> -->
            </el-col>
          </el-row>
        </div>
        <!-- <table class="layui-table el-table__body mt-3">
        <tbody>
          <tr>
            <td class="right">招标过程及背景描述：</td>
            <td colspan="3">
              <el-input type="textarea" :rows="2" placeholder="请填写招标过程及背景描述" v-model="form.winDesc"></el-input>
            </td>
          </tr>
          <tr>
            <td class="right">主要商务条款：</td>
            <td colspan="3">
              <el-input type="textarea" :rows="2" placeholder="请填写主要商务条款" v-model="form.businessDesc"></el-input>
            </td>
          </tr>
        </tbody>
      </table> -->
        <div class="bottom" style="text-align:right;margin:10px">
          <el-button type="danger" size="small" @click="save1" v-if="showButton">保存基本信息</el-button>
          <!-- <el-button type="danger" size="small" @click="save1">保存基本信息</el-button> -->
        </div>
      </div>
    </el-card>
    <el-card style="margin-top:10px">
      <div slot="header" class="clearfix">
        <div style="margin:0 20px 0 10px"><strong>评标情况</strong></div>
      </div>
      <!-- <div class="pub">评标情况</div> -->
      <div class="text item">
        <el-table
          ref="multipleTable1"
          v-if="this.show1"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="table1.winSupplierList"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          @select="select1"
          @select-all="selectAll1"
        >
          <el-table-column type="selection" width="50" v-if="showButton"></el-table-column>
          <!-- <el-table-column width="150" align="center" :label="table1.sectionName" prop="index"> </el-table-column> -->
          <el-table-column label="序号" width="80" type="index" align="center"> </el-table-column>
          <el-table-column show-overflow-tooltip label="投标方名称">
            <template slot-scope="scope">
              <el-link
                type="primary"
                style="color:#409eff;text-decoration: none;padding-right:10px"
                @click="jumpDetail(scope.row.supplierId)"
                >{{ scope.row.comFullName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center" label="技术得分" prop="techScore"> </el-table-column>
          <!-- <el-table-column width="100" align="center" label="商务得分" prop="businessScore"> </el-table-column>
          <el-table-column width="100" align="center" label="综合得分" prop="finalScore">
            <template slot-scope="scope">
              <el-link type="primary" style="color:#409eff;text-decoration: none;padding-right:10px" @click="gotoshow(scope.row.supplierId)"
                >{{ scope.row.finalScore }}
              </el-link>
            </template>
          </el-table-column> -->
          <el-table-column width="150" label="最终报价" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.latestAmount }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column width="150" label="中标金额" align="center" prop="winAmount">-->
          <!--<template slot-scope="scope">-->
          <!--<el-input v-model="scope.row.winAmount"></el-input>-->
          <!--</template>-->
          <!--</el-table-column>-->
        </el-table>

        <el-table
          ref="multipleTable2"
          v-if="this.show2"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="table2.winSupplierList"
          v-loading="loading"
          @selection-change="handleSelectionChange2"
          @select="select2"
          @select-all="selectAll2"
        >
          <el-table-column type="selection" width="50" v-if="showButton"></el-table-column>
          <!-- <el-table-column width="150" align="center" :label="table2.sectionName" prop="index"> </el-table-column> -->
          <el-table-column label="序号" width="80" type="index" align="center"> </el-table-column>
          <el-table-column show-overflow-tooltip label="投标方名称">
            <template slot-scope="scope">
              <el-link
                type="primary"
                style="color:#409eff;text-decoration: none;padding-right:10px"
                @click="jumpDetail(scope.row.supplierId)"
                >{{ scope.row.comFullName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center" label="技术得分" prop="techScore"> </el-table-column>
          <!-- <el-table-column width="100" align="center" label="商务得分" prop="businessScore"> </el-table-column>
          <el-table-column width="100" align="center" label="综合得分" prop="finalScore">
            <template slot-scope="scope">
              <el-link type="primary" style="color:#409eff;text-decoration: none;padding-right:10px" @click="gotoshow(scope.row.supplierId)"
                >{{ scope.row.finalScore }}
              </el-link>
            </template>
          </el-table-column> -->
          <el-table-column width="150" label="最终报价" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.latestAmount }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column width="150" label="中标金额" align="center" prop="winAmount">-->
          <!--<template slot-scope="scope">-->
          <!--<el-input v-model="scope.row.winAmount"></el-input>-->
          <!--</template>-->
          <!--</el-table-column>-->
        </el-table>

        <el-table
          ref="multipleTable3"
          v-if="this.show3"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="table3.winSupplierList"
          v-loading="loading"
          @selection-change="handleSelectionChange3"
          @select="select3"
          @select-all="selectAll3"
        >
          <el-table-column type="selection" width="50" v-if="showButton"></el-table-column>
          <!-- <el-table-column width="150" align="center" :label="table3.sectionName" prop="index"> </el-table-column> -->
          <el-table-column label="序号" width="80" type="index" align="center"> </el-table-column>
          <el-table-column show-overflow-tooltip label="投标方名称">
            <template slot-scope="scope">
              <el-link
                type="primary"
                style="color:#409eff;text-decoration: none;padding-right:10px"
                @click="jumpDetail(scope.row.supplierId)"
                >{{ scope.row.comFullName }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center" label="技术得分" prop="techScore"> </el-table-column>
          <!-- <el-table-column width="100" align="center" label="商务得分" prop="businessScore"> </el-table-column>
          <el-table-column width="100" align="center" label="综合得分" prop="finalScore">
            <template slot-scope="scope">
              <el-link type="primary" style="color:#409eff;text-decoration: none;padding-right:10px" @click="gotoshow(scope.row.supplierId)"
                >{{ scope.row.finalScore }}
              </el-link>
            </template>
          </el-table-column> -->
          <el-table-column width="150" label="最终报价" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.latestAmount }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column width="150" label="中标金额" align="center" prop="winAmount">-->
          <!--<template slot-scope="scope">-->
          <!--<el-input v-model="scope.row.winAmount"></el-input>-->
          <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
        <div style="margin:20px;margin-left:30px"><strong>中标单位</strong></div>
        <!-- <div class="pub">中标单位</div> -->
        <el-table
          ref="multipleTable4"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="table4"
          v-loading="loading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
          <!-- <el-table-column width="150" align="center" label="排名" prop="index"> </el-table-column> -->
          <el-table-column show-overflow-tooltip label="投标方名称">
            <template slot-scope="scope">
              <el-link
                type="primary"
                style="color:#409eff;text-decoration: none;padding-right:10px"
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
          <el-table-column width="150" label="中标金额" align="center" prop="winAmount">
            <template slot-scope="scope">
              <el-input v-if="showButton" v-model="scope.row.winAmount"></el-input>
              <span v-else>{{ scope.row.winAmount }}</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="bottom" style="text-align:right;margin:10px">
          <el-button type="danger" size="small" @click="save2" v-if="showButton">保存中标单位</el-button>
        </div>
      </div>
    </el-card>
    <el-card style="margin-top:10px">
      <div slot="header" class="clearfix">
        <!-- <div class="pub">相关附件</div> -->
        <div style="margin:5px 20px 0 10px">
          <strong>相关附件</strong>
          <el-button type="danger" size="small" @click="upload4" style="margin-left: 10px;float:right" v-if="showButton"
            >导入文件</el-button
          >
          <el-button type="danger" size="small" @click="upload3" style="margin-left: 10px;float:right" v-if="showButton"
            >上传附件</el-button
          >
        </div>
      </div>
      <div class="text item">
        <el-table
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="uploadList"
          v-loading="loading"
        >
          <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
          <el-table-column label="附件名称" min-width="160" align="left" prop="fileName"> </el-table-column>
          <el-table-column label="附件类型" align="center" prop="fileExtName"> </el-table-column>
          <el-table-column align="center" label="附件大小" prop="fileSize"> </el-table-column>
          <el-table-column align="center" label="上传日期" prop="creationTime">
            <template slot-scope="scope">
              <font>{{ scope.row.creationTime.substring(0, 10) }}</font>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <i class="el-icon-download" title="下载" @click="onDonwLoad(scope.row.id)"></i>
              <i class="el-icon-delete ml-2" @click="deleteRow(scope.row)" v-if="scope.row.submitStatus != '已提交' && showButton"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <div class="bottom" style="text-align:right;margin:10px">
      <el-button type="danger" size="small" @click="quxiao" v-if="quxiaobut"> 取消定标</el-button>
      <el-button type="danger" v-loading="loadingding" size="small" @click="save4" v-if="showButton"> 提交定标审批</el-button>
    </div>
    <div style="margin-top:50px" v-if="tableif2">
      <span>审批日志</span>
      <!-- <div style="float:right;color:red">{{ status2 }}</div> -->
      <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableshenpi2">
        <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
        <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
        <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
        <el-table-column prop="creationTime" width="200" label="待办时间" align="center">
          <template slot-scope="scope"
            ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
          >
        </el-table-column>
        <el-table-column prop="dealTime" width="200" label="处理时间" align="center">
          <template slot-scope="scope"
            ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
          >
        </el-table-column>
        <el-table-column prop="status" width="100" label="结果" align="center"> </el-table-column>
        <el-table-column prop="comments" label="意见/备注" align="center"> </el-table-column>
      </el-table>
    </div>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible" style="z-index:999999">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
        <el-form-item label="文件名称" required>
          <el-input v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="false"
            :action="api + '/api/FileUpload/BidWinAttachUpload1'"
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包，最大200M</div>
          </el-upload>
          <el-button v-loading="loading" style="margin-left: 10px;float: right" size="small" type="success" @click="submitUpload"
            >上传</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog width="70%" title="导入文件" :visible.sync="dialogVisible2">
      <el-table
        ref="multipleTable5"
        empty-text="暂无数据"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="table5"
        v-loading="loading"
        @selection-change="handleSelectionChange4"
      >
        <el-table-column type="selection" width="60" label="序号" align="center"> </el-table-column>
        <el-table-column width="100" align="center" label="标段名称" prop="sectionName"> </el-table-column>
        <el-table-column label="供应商名称" align="left" prop="comFullName"></el-table-column>
        <el-table-column width="150" label="文件名称" align="left" prop="fileName"></el-table-column>
        <el-table-column width="100" label="文件类型" align="center" prop="fileExtName"></el-table-column>
        <el-table-column width="100" label="文件大小" align="center" prop="fileSize"></el-table-column>
        <el-table-column width="100" label="下载" align="center">
          <template slot-scope="scope">
            <i class="el-icon-download" title="下载" @click="onDonwLoad2(scope.row.fileId)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin-top: 10px;">
        <el-button v-loading="loading" size="small" type="danger" @click="submitUpload2">导入</el-button>
      </div>
    </el-dialog>
    <el-dialog width="90%" title="技术评委对投标方的打分明细" :visible.sync="dialogVisibleshow">
      <div>
        <span style="float:right"><span>得分：</span>{{ finalScore }}</span>
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
  </div>
</template>

<script>
import wangEditor from "wangeditor";
import { parseTime } from "@/util";
export default {
  props: ["dataF"],
  data() {
    return {
      form: {
        winDesc: "",
        businessDesc: "",
      },
      tablelist: [
        {
          personNameList: [],
          scoreItemList: [],
        },
      ],
      finalScore: "",
      activeName: "1",
      dialogVisible: false,
      dialogVisible2: false,
      table1: {},
      table2: {},
      table3: {},
      table4: [],
      table5: [],
      bidModeId: "",
      dialogVisibleshow: false,
      quxiaobut: false,
      show1: false,
      show2: false,
      show3: false,
      formwinDesc: "",
      showButton1: false,
      tableshenpi2: [],
      tableif2: false,
      saveTable1: [],
      saveTable2: [],
      saveTable3: [],
      saveTable4: [],
      uploadData: {
        FileName: "",
      },
      desc: "",
      editor: null,
      editor1: null,
      loadingding: false,
      file: {},
      fileList: [],
      loading: false,
      api: process.env.VUE_APP_API_URL,
      showButton: true,
      showButton2: false,
      uploadList: [],
    };
  },
  created() {
    this.bidModeId = this.$route.query.id;
    if (!this.dataF.showButton1) {
      this.showButton = false;
    } else {
      this.$api.supIn.BidActionButton12({ bidModeId: this.bidModeId }).then(res => {
        if (!res.success) {
          this.showButton = false;
        }
      });
    }
    if (this.dataF.showCancelButton) {
      this.showButton2 = true;
    }

    this.getList1();
    this.getList2();
    this.CheckBidWin();
    this.CheckShowCancelWinButton51();
  },
  mounted() {
    this.GetNewLogList_BidWin();
    this.CheckBidWin();
    this.getInfo();
    // w-e-text-container
  },
  methods: {
    tomethgofaqi() {
      this.getList1();
      this.getList2();
      this.CheckBidWin();
      this.CheckShowCancelWinButton51();
      this.GetNewLogList_BidWin();
      this.CheckBidWin();
      this.getInfo();
    },
    create1() {
      const editor = new wangEditor(`#demo1`);
      editor.config.onchange = newHtml => {
        this.form.winDesc = newHtml;
      };
      editor.config.menus = [];
      editor.create();
      this.editor = editor;
    },
    create2() {
      const editor1 = new wangEditor(`#demo2`);
      editor1.config.onchange = newHtml => {
        this.form.businessDesc = newHtml;
      };
      editor1.config.menus = [];
      editor1.create();
      this.editor1 = editor1;
    },
    addHtml(res) {
      this.form.winDesc = "";
      if (res != "") {
        for (var i = 0; i < res.length; i++) {
          if (i != 0) {
            this.form.winDesc += "<br>";
          }
          this.form.winDesc += res[i];
        }
      }
      this.editor.txt.html(this.form.winDesc);
    },
    handleSelectionChange4(val) {
      this.saveTable4 = val;
    },
    GetBidContent1001() {
      this.$http.get("/BidWin/GetBidContent1001", { params: { bidModeId: this.bidModeId } }).then(res => {
        this.addHtml(res.data);
      });
    },
    getInfo() {
      this.$api.supIn.GetBidWinMaster01({ bidModeId: this.bidModeId }).then(res => {
        // this.form = res;
        this.form.businessDesc = res.businessDesc;
        this.form.winDesc = res.winDesc;
        console.log(this.form.winDesc);
        this.editor1.txt.html(res.businessDesc);
        if (res.winDesc == "" || res.winDesc == null) {
          this.GetBidContent1001();
        } else {
          this.editor.txt.html(res.winDesc);
        }
      });
    },
    select1(selection, row) {
      if (selection.length > 1) {
        let del_row = selection.shift();
        this.$refs.multipleTable1.toggleRowSelection(del_row, false);
      }
    },
    selectAll1(selection) {
      if (selection.length > 1) {
        selection.length = 1;
      }
    },
    select2(selection, row) {
      if (selection.length > 1) {
        let del_row = selection.shift();
        this.$refs.multipleTable2.toggleRowSelection(del_row, false);
      }
    },
    selectAll2(selection) {
      if (selection.length > 1) {
        selection.length = 1;
      }
    },
    select3(selection, row) {
      if (selection.length > 1) {
        let del_row = selection.shift();
        this.$refs.multipleTable3.toggleRowSelection(del_row, false);
      }
    },
    selectAll3(selection) {
      if (selection.length > 1) {
        selection.length = 1;
      }
    },
    submitUpload2() {
      this.$confirm("确认要执行当前操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //var a = [];
        var a2 = "";
        for (var i = 0; i < this.saveTable4.length; i++) {
          //var b = {}
          //b.FileIds = this.saveTable4[i].fileId
          //a.push(b)
          a2 += "FileIds=" + this.saveTable4[i].fileId + "&";
        }
        this.$api.supIn.DoImportFile008(a2.substring(0, a2.length - 1)).then(res => {
          if (res.success) {
            this.dialogVisible2 = false;
            this.getList2();
          }
        });
      });
    },
    onDonwLoad2(fileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidOpenDownLoad002?fileId=" + fileId);
      // window.location.href = process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + id;
    },
    parseTime,

    upload4() {
      this.dialogVisible2 = true;

      this.$api.supIn.GetImportFileList({ bidModeId: this.bidModeId }).then(res => {
        this.table5 = res;
      });
    },
    // CheckBidWin(){
    //   this.$http.get("/BidCheckCenter/CheckBidWin",{params: { bidModeId: bidModeId }}).then(res => {
    //       this.data = res;
    //       if (!this.data.showButton1) {
    //       this.showButton = false;
    //     }
    //     if (this.data.showCancelButton) {
    //       this.showButton2 = true;
    //     }
    //     });
    // },
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
      this.$http.get("/BidExamScore/GetPersonSupplierTechScore", { params: obj }).then(res => {
        this.finalScore = res.data.finalScore;
        this.pageMessage = res.data.pageMessage;
        this.tablelist = res.data;
      });
    },
    quxiao() {
      this.$confirm("取消后已经编制的定标数据将被删除，确认要执行当前操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.CancelBidWin04({ id: this.bidModeId }).then(res => {
          if (res.success) {
            this.getInfo();
            this.getList1();
            this.getList2();
            this.GetNewLogList_BidWin();
            this.CheckShowCancelWinButton51();
            this.showButton = true;
            this.showButton2 = false;
          } else {
            this.CheckShowCancelWinButton51();
            this.$alert(res.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    onDonwLoad(id) {
      // window.open(process.env.VUE_APP_API_URL + file.filePath + file.fileReName);
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidWinFileDownLoad005?fileId=" + id);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      this.file = file;
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData = {
        FileName: name.substring(0, index),
      };
      console.log(this.uploadData.FileName);
    },
    submitUpload() {
      if (!this.uploadData.FileName) {
        this.$message.error("请填写文件名称");
        return;
      }
      this.loading = true;
      let f = new FormData();
      f.append("BidModeId", this.bidModeId);
      f.append("FileName", this.uploadData.FileName);
      f.append("fileBix", this.file.raw);
      this.$api.supIn.BidWinAttachUpload1(f).then(res => {
        this.loading = false;
        if (res.success) {
          this.$refs.upload.clearFiles();
          this.$message.success(res.message);
          this.dialogVisible = false;
          this.getList2();
        } else {
          this.loading = false;
          this.$message.error(res.message);
        }
      });
    },
    GetNewLogList_BidWin() {
      this.$http.get("/WorkFlowStart/GetNewLogList_BidWin", { params: { bidModeId: this.bidModeId, tab: 1 } }).then(res => {
        // if (res.data.logs.length > 0) {
        this.tableshenpi2 = res.data.logs;
        this.status2 = res.data.status;
        if (res.data.logs.length > 0 || res.data.logs == null) {
          this.tableif2 = true;
        } else {
          this.tableif2 = false;
        }
        // }
      });
    },
    upload3() {
      this.dialogVisible = true;
      this.uploadData.FileName = "";
    },
    getList2() {
      this.$api.supIn.GetBidWinAttachList01({ bidModeId: this.bidModeId }).then(res => {
        this.uploadList = res;
      });
    },
    CheckBidWin() {
      this.$http.get("/BidCheckCenter/CheckBidWin", { params: { bidModeId: this.bidModeId } }).then(res => {
        this.showButton1 = res.data.showButton1;
        this.showButton = res.data.showButton1;
        this.showButton2 = res.data.showButton2;
        if (this.showButton == true) {
          this.create1();
          this.create2();
          this.$nextTick(() => {
            document.querySelectorAll(".placeholder")[0].innerHTML = "请输入招标过程及背景描述";
            document.querySelectorAll(".placeholder")[1].innerHTML = "请输入主要商务条款";
          });
        }
      });
    },
    CheckShowCancelWinButton51() {
      this.$http.get("/BidCheckCenter/CheckShowCancelWinButton51", { params: { bidModeId: this.bidModeId } }).then(res => {
        if (res.data.success) {
          this.quxiaobut = true;
        } else {
          this.quxiaobut = false;
        }
      });
    },
    save2() {
      var a = [];
      // for (var i = 0; i < this.saveTable1.length; i++) {
      //   var item = this.saveTable1[i];
      //   var b = {};
      //   b.sectionId = this.table1.sectionId;
      //   b.supplierId = item.supplierId;
      //   b.amount = item.winAmount;
      //   a.push(b);
      // }
      // for (var i = 0; i < this.saveTable2.length; i++) {
      //   var item = this.saveTable2[i];
      //   var b = {};
      //   b.sectionId = this.table2.sectionId;
      //   b.supplierId = item.supplierId;
      //   b.amount = item.winAmount;
      //   a.push(b);
      // }
      // for (var i = 0; i < this.saveTable3.length; i++) {
      //   var item = this.saveTable3[i];
      //   var b = {};
      //   b.sectionId = this.table3.sectionId;
      //   b.supplierId = item.supplierId;
      //   b.amount = item.winAmount;
      //   a.push(b);
      // }
      for (var i = 0; i < this.table4.length; i++) {
        var item = this.table4[i];
        var b = {};
        b.sectionId = item.sectionId;
        b.supplierId = item.supplierId;
        b.amount = item.winAmount;
        a.push(b);
      }
      if (a.length == 0) {
        this.$msg.error("最少勾选一条数据");
        return;
      }
      this.$api.supIn.SaveWinSupplierList01(a).then(res => {
        if (res.success) {
          this.$msg.success(res.message);
          this.getList1();
        } else {
          this.$msg.error(res.message);
        }
      });
    },
    handleSelectionChange(val) {
      this.saveTable1 = val;
      this.change4();
    },
    handleSelectionChange2(val) {
      this.saveTable2 = val;
      this.change4();
    },
    handleSelectionChange3(val) {
      this.saveTable3 = val;
      this.change4();
    },
    change4() {
      this.table4 = [];
      if (this.saveTable1.length > 0) {
        for (var i = 0; i < this.saveTable1.length; i++) {
          this.table4.push(this.saveTable1[i]);
          console.log(this.table4);
        }
      }
      if (this.saveTable2.length > 0) {
        for (var i = 0; i < this.saveTable2.length; i++) {
          this.table4.push(this.saveTable2[i]);
        }
      }
      if (this.saveTable3.length > 0) {
        for (var i = 0; i < this.saveTable3.length; i++) {
          this.table4.push(this.saveTable3[i]);
        }
      }
    },
    getList1() {
      this.$api.supIn.GetSectionSupplier01({ bidModeId: this.bidModeId }).then(res => {
        for (var i = 0; i < res.length; i++) {
          if (i == 0) {
            this.show1 = true;
            this.table1 = res[i];
            this.table1.sectionName = "排名（" + this.table1.sectionName + ")";
            var sf1 = [];
            //this.table1.winSupplierList[0].selectFlag = true;
            this.table1.winSupplierList.forEach(row => {
              row.sectionId = this.table1.sectionId;
              if (row.selectFlag) {
                sf1.push(row);
              }
              this.sectionId = row.sectionId;
            });
            this.toggleSelection1(sf1);
          }
          if (i == 1) {
            this.show2 = true;
            this.table2 = res[i];
            this.table2.sectionName = "排名（" + this.table2.sectionName + ")";
            var sf1 = [];
            this.table2.winSupplierList.forEach(row => {
              row.sectionId = this.table2.sectionId;
              if (row.selectFlag) {
                sf1.push(row);
              }
              this.sectionId = row.sectionId;
            });
            this.toggleSelection2(sf1);
          }
          if (i == 2) {
            this.show3 = true;
            this.table3 = res[i];
            this.table3.sectionName = "排名（" + this.table3.sectionName + ")";
            var sf1 = [];
            this.table3.winSupplierList.forEach(row => {
              row.sectionId = this.table3.sectionId;
              if (row.selectFlag) {
                sf1.push(row);
              }
              this.sectionId = row.sectionId;
            });
            this.toggleSelection3(sf1);
          }
        }
      });
    },
    toggleSelection1(rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable1.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable1.clearSelection();
        }
      });
    },
    toggleSelection2(rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable2.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable2.clearSelection();
        }
      });
    },
    toggleSelection3(rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable3.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable3.clearSelection();
        }
      });
    },
    save1() {
      this.form.bidModeId = this.bidModeId;
      this.$api.supIn.SaveBidWinMaster01(this.form).then(res => {
        if (res.success) {
          this.$msg.success(res.message);
          this.getInfo();
        } else {
          this.$msg.error(res.message);
        }
      });
      // } else {
      //   this.$msg.error("请填写完整带*的必填项再保存");
      //   return;
      // }
    },

    deleteRow(row) {
      this.$confirm("当前操作不可恢复，确认要执行当前操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.DeleteBidWinAttach({ id: row.id }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.getList2();
          } else {
            this.$msg.error(res.message);
          }
        });
      });
    },
    save4() {
      this.$confirm("提交后不能修改，确定要提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loadingding = true;
        this.$api.supIn.SubmitWin01({ id: this.bidModeId }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.showButton = false;
            this.loadingding = false;
            this.getInfo();
            this.getList1();
            this.getList2();
            this.GetNewLogList_BidWin();
            this.CheckShowCancelWinButton51();
          } else {
            //this.$msg.error(res.message)
            this.CheckShowCancelWinButton51();
            this.openM(res.message);
            this.loadingding = false;
          }
        });
      });
    },
    openM(msg) {
      const h = this.$createElement;
      this.$msgbox({
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "关闭",
        title: "消息",
        message: h("p", null, [h("span", null, msg), h("i", { style: "color: teal" }, "")]),
      }).then(action => {});
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
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
::v-deep .el-table__header-wrapper .el-checkbox {
  display: none;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card__body {
  padding: 0px;
}

.bac {
  // background: #ccc !important;
  height: 250px;
  overflow-y: auto;
  border: 1px solid #c7c7c7;
}
.el-card__header {
  height: 60px;
  /*padding: 18px 20px;*/
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
::v-deep .el-card__body {
  padding: 0px;
}
</style>
<style>
.el-dialog__body {
  padding: 20px;
  padding-bottom: 50px;
}
.w-e-text-container {
  z-index: 1 !important;
}
.w-e-text {
  overflow-y: hidden;
}
.w-e-toolbar {
  z-index: 1 !important;
}
.el-card__body {
  padding: 0px;
}
</style>
