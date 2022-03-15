<template>
  <el-main>
    <el-card style="margin-bottom: 60px">
      <el-form ref="xuQiu" :model="xuQiuForm" :rules="rules">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item prop="purchaseType">
              <span slot="label">
                <span>招标方式</span>
              </span>
              <el-popover placement="bottom-end" width="700" trigger="click">
                <img :src="urlbg" width="100%" />
                <div class="setTop" slot="reference">(查看说明)</div>
              </el-popover>
              <!-- <div class="setTop" @click="lookPic">(查看帮助)</div> -->
              <!-- <div slot="label">招标方式</div> -->
              <el-select style="width: 100%" v-model="xuQiuForm.purchaseType" @change="handleChange" size="small">
                <!-- <el-option label="请选择" :value="null"></el-option> -->
                <el-option v-for="item in purchaseTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="招标计划名称" prop="planName">
              <el-input style="width: 100%" placeholder="请输入招标计划名称" v-model.trim="xuQiuForm.planName"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="招标层级" prop="bidLevel">
              <el-select :disabled="disableds" style="width: 100%" v-model.trim="xuQiuForm.bidLevel" @change="handlebidLevel">
                <el-option v-for="item in bidLevel" :key="item.value" :label="item.text" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="招标专业" prop="bidCateName">
              <el-input
                style="width: 100%"
                v-model="xuQiuForm.bidCateName"
                placeholder="请选择招标专业"
                @focus="categoryVisible = true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="需求部门" prop="depName">
              <el-select style="width: 100%" v-model.trim="xuQiuForm.depName">
                <el-option v-for="item in depNames" :key="item.value" :label="item.text" :value="item.text"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="相关说明" prop="requireDesc">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model.trim="xuQiuForm.requireDesc"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="计划采购日期" prop="bidEndDate">
              <el-date-picker
                style="width: 100%"
                type="date"
                v-model.trim="xuQiuForm.bidEndDate"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" v-if="!disableds">
            <el-form-item label="含税总限价（元）" prop="taxPrice">
              <el-input disabled style="width: 100%" type="number" v-model.trim="xuQiuForm.taxPrice" :min="1" :precision="2"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="!disableds">
            <el-form-item label="不含税总限价（元）" prop="noTaxPrice">
              <el-input disabled style="width: 100%" type="number" v-model.trim="xuQiuForm.noTaxPrice" :min="1" :precision="2"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div v-if="!disableds">
          <el-row
            class="right"
            v-if="
              xuQiuForm.bidCateName != '' &&
              xuQiuForm.purchaseType != '' &&
              xuQiuForm.purchaseType != '询价比选' &&
              xuQiuForm.purchaseType != '直接委托' &&
              xuQiuForm.purchaseType != '竞争性谈判' &&
              xuQiuForm.purchaseType != '零星采购'
            "
          >
            <el-button type="primary" size="small" @click="newAdd" style="margin-bottom: 10px">新增项目</el-button>
          </el-row>
          <div v-if="!xuQiuForm.bidCateName"></div>
          <el-table
            v-else-if="xuQiuForm.bidCateName == '保洁服务' || xuQiuForm.bidCateName == '绿化养护' || xuQiuForm.bidCateName == '保安服务'"
            empty-text="无符合条件的记录"
            stripe
            element-loading-text="请稍候,数据正在加载中..."
            :data="xuQiuForm.detailList"
            :header-cell-style="{ background: 'transparent' }"
          >
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <!-- <el-table-column prop="majorType" label="分类" align="center" width="80"> </el-table-column> -->
            <el-table-column
              label="项目名称"
              align="center"
              min-width="200"
              v-if="
                xuQiuForm.purchaseType != '询价比选' &&
                xuQiuForm.purchaseType != '直接委托' &&
                xuQiuForm.purchaseType != '零星采购' &&
                xuQiuForm.purchaseType != '竞争性谈判'
              "
            >
              <template slot-scope="scope">
                <el-input
                  placeholder="请选择项目名称"
                  style="width: 100%"
                  v-model.trim="scope.row.projectName"
                  @focus="subJectAdd(scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="每日最低出勤人数" align="center" min-width="200">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  :min="1"
                  placeholder="每日最低出勤人数"
                  style="width: 100%"
                  v-model.trim="scope.row.personMin"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="合同起始时间" align="center" width="200">
              <template slot-scope="scope">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  v-model.trim="scope.row.contractStartTime"
                  value-format="yyyy-MM-dd"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="合同截止时间" align="center" width="200">
              <template slot-scope="scope">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  v-model.trim="scope.row.contractEndTime"
                  value-format="yyyy-MM-dd"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="招标时长" align="center" width="200">
              <template slot-scope="scope">
                <el-input style="width: 100%" type="number" v-model.trim="scope.row.timeLength" :min="1" :precision="2" @blur="change">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="采购月度含税总限价（元）" align="center" width="200">
              <template slot-scope="scope">
                <el-input style="width: 100%" type="number" v-model.trim="scope.row.monthTaxPrice" :min="1" :precision="2" @blur="change">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="采购月度不含税总限价（元）" align="center" width="220">
              <template slot-scope="scope">
                <el-input style="width: 100%" type="number" v-model.trim="scope.row.monthNoTaxPrice" :min="1" :precision="2" @blur="change">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="采购含税总限价（元）" align="center" width="200">
              <template slot-scope="scope">
                <el-input style="width: 100%" type="number" v-model.trim="scope.row.taxPrice" :min="1" :precision="2" @blur="change">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="采购不含税总限价（元）" align="center" width="200">
              <template slot-scope="scope">
                <el-input style="width: 100%" type="number" v-model.trim="scope.row.noTaxPrice" :min="1" :precision="2" @blur="change">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="人均不含税单价" align="center" width="200">
              <template slot-scope="scope">
                <el-input style="width: 100%" type="number" v-model.trim="scope.row.unitNoTaxPrice" :min="1" :precision="2" @blur="change">
                </el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            v-else
            empty-text="无符合条件的记录"
            stripe
            element-loading-text="请稍候,数据正在加载中..."
            :data="xuQiuForm.detailList"
            :header-cell-style="{ background: 'transparent' }"
          >
            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
            <!-- <el-table-column prop="majorType" label="分类" align="center" width="80"> </el-table-column> -->
            <el-table-column
              label="机构名称"
              align="center"
              v-if="
                xuQiuForm.purchaseType != '询价比选' &&
                xuQiuForm.purchaseType != '直接委托' &&
                xuQiuForm.purchaseType != '零星采购' &&
                xuQiuForm.purchaseType != '竞争性谈判'
              "
            >
              <template slot-scope="scope">
                <el-input
                  placeholder="请选择机构名称"
                  style="width: 100%"
                  v-model.trim="scope.row.projectName"
                  @focus="subJectAdd(scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="合同起始时间" align="center">
              <template slot-scope="scope">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  v-model.trim="scope.row.contractStartTime"
                  value-format="yyyy-MM-dd"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="合同截止时间" align="center">
              <template slot-scope="scope">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  v-model.trim="scope.row.contractEndTime"
                  value-format="yyyy-MM-dd"
                  placeholder="选择时间"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="含税总限价（元）" align="center">
              <template slot-scope="scope">
                <el-input style="width: 100%" type="number" v-model.trim="scope.row.taxPrice" :min="1" :precision="2" @blur="change">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="不含税总限价（元）" align="center">
              <template slot-scope="scope">
                <el-input style="width: 100%" type="number" v-model.trim="scope.row.noTaxPrice" :min="1" :precision="2" @blur="change">
                </el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-row class="right" style="margin-top: 10px">
          <el-button type="primary" size="small" @click="saveto(false)">保存</el-button>
        </el-row>
      </el-form>
      <div class="bt">
        <div style="color: red">
          请先保存信息后再上传附件<span v-if="tips">{{ "," + tips }}</span>
        </div>
        <el-button :disabled="!id ? true : false" type="primary" size="small" @click="dialogVisible = true">上传附件</el-button>
      </div>
      <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="fileslist">
        <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
        <el-table-column label="文件名称" prop="fileName" align="left">
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
        <el-table-column label="上传人" prop="creatorUserName" align="center"> </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <i class="el-icon-download ml-2" title="下载" @click="onDownload(scope.row.id)"></i>
            <i v-if="scope.row.submitStatus != '审批完成'" class="el-icon-delete ml-2" title="删除" @click="deletes(scope.row.id)"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="right" style="margin-top: 10px">
        <el-button size="small" @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" size="small" @click="saveto(true)">提交</el-button>
      </el-row>
      <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisible" style="z-index: 999999">
        <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loading">
          <el-form-item label="文件名称" required>
            <el-input style="width: 100%" v-model="uploadData.FileName" placeholder="请输入文件名称"></el-input>
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
              <div slot="tip" class="el-upload__tip">只能上传pdf、office、压缩包、图片，单文件最大200M</div>
            </el-upload>
            <el-button v-loading="loading" style="margin-left: 10px; float: right" size="small" type="success" @click="submitUpload"
              >上传</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="categoryVisible" title="选择招标专业">
        <categoryTree @itemClick="onChangeCategory" />
      </el-dialog>
      <subJectTree
        title="项目"
        :level="1"
        :bidLevel="xuQiuForm.bidLevel"
        ref="subJectTree"
        :fromType="'zhaobiao'"
        @itemClick="subJectTree"
      ></subJectTree>
      <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
    </el-card>
  </el-main>
</template>

<script>
import ProjectTree from "./components/ProjectTree";
import subJectTree from "@/views/bid/components/subJectTree";
import categoryTree from "./components/CategoryTree";
import { parseTime } from "@/util";
import choseUser from "@/components/choseUser";
export default {
  components: {
    ProjectTree,
    subJectTree,
    categoryTree,
    choseUser,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  data() {
    return {
      bidLevel: [
        { text: "集团", value: "集团" },
        { text: "区域", value: "区域" },
        { text: "项目", value: "项目" },
      ],
      urlbg: require("@/assets/zhaobiaoStyle.png"),
      depNames: [],
      texts: "",
      purchaseTypes: [],
      fileList: [],
      fileslist: [],
      zuzhangdata: [],
      loading: false,
      tempList: [],
      uploadData: {
        FileName: "",
      },
      file: {},
      api: process.env.VUE_APP_API_URL,
      UploadfileList: [],
      loadingfile: false,
      header: { Authorization: "Bearer " + this.$store.state.token },
      dialogVisible: false,
      categoryVisible: false,
      rules: {
        depName: [{ required: true, message: "需求部门不能为空", trigger: "change" }],
        planName: [{ required: true, message: "招标计划名称不能为空", trigger: "blur" }],
        bidLevel: [{ required: true, message: "层级不能为空", trigger: "blur" }],
        purchaseType: [{ required: true, message: "招标方式不能为空", trigger: "change" }],
        bidEndDate: [{ required: true, message: "日期不能为空", trigger: "change" }],
        bidCateName: [{ required: true, message: "招标专业不能为空", trigger: "change" }],
        taxPrice: [{ required: true, message: "含税总限价", trigger: "blur" }],
        noTaxPrice: [{ required: true, message: "不含税总限价", trigger: "blur" }],
      },
      showtitle: "",
      tips: "",
      index: 0,
      id: this.$route.query.id,
      disableds: true,
      xuQiuForm: {
        id: "",
        depName: "",
        orgId: "",
        planName: "",
        bidLevel: "",
        purchaseType: "",
        bidEndDate: "",
        bidCateId: "",
        bidCateName: "",
        requireDesc: "",
        isSubmit: true,
        taxPrice: null,
        noTaxPrice: null,
        detailList: [
          {
            projectId: "",
            projectName: "",
            taxPrice: null,
            noTaxPrice: null,
          },
        ],
      },
    };
  },
  computed: {
    bidModeId() {
      return this.$route.params.bidModeId;
    },
    // planId() {
    //   return this.$route.params.planId;
    // },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
  },
  created: function () {
    this.planId = this.$route.query.id;
    this.todoId = this.$route.query.todoId;
  },
  mounted() {
    this.GetPlanEditDropDowns();
  },
  methods: {
    parseTime,
    newAdd() {
      this.xuQiuForm.detailList.push({
        projectId: "",
        projectName: "",
        taxPrice: null,
        noTaxPrice: null,
      });
    },
    lookPic() {
      alert(11);
    },
    getList2(planId) {
      this.$http.get("/PurchasePlan/GetPlanFileList", { params: { planId } }).then((res) => {
        this.fileslist = res.data;
      });
    },
    handlechange(val) {
      this.texts = this.tempList.find((e) => e.fileName == val).fileExt;
    },
    getdetail(id) {
      this.$http.get("/PurchasePlan/EB_GetPlanDetailById", { params: { id } }).then((res) => {
        this.xuQiuForm = res.data;
        this.tips = this.purchaseTypes.find((v) => v.value == res.data.purchaseType).tips;
        if (res.data.purchaseType == "战采招标" || !this.xuQiuForm.purchaseType) {
          this.disableds = true;
        } else {
          this.disableds = false;
        }
      });
    },
    change() {
      let arr = this.xuQiuForm.detailList.map((e) => e.taxPrice).reduce((x, y) => (!x ? 0 : parseFloat(x) + parseFloat(y)));
      let arr1 = this.xuQiuForm.detailList.map((e) => e.noTaxPrice).reduce((x, y) => (!x ? 0 : parseFloat(x) + parseFloat(y)));
      this.xuQiuForm.taxPrice = arr;
      this.xuQiuForm.noTaxPrice = arr1;
    },
    handlebidLevel() {
      this.xuQiuForm.detailList.forEach((e) => {
        e.projectId = "";
        e.projectName = "";
      });
    },
    handleChange(val) {
      this.tips = this.purchaseTypes.find((v) => v.value == val).tips;
      if (val == "战采招标") {
        this.disableds = true;
        // this.xuQiuForm.bidLevel = "集团";
      } else if (val == "集采招标") {
        this.disableds = false;
        // this.xuQiuForm.bidLevel = "";
        // this.bidLevel = [
        //   { text: "集团", value: "集团" },
        //   { text: "区域", value: "区域" },
        // ];
      } else {
        this.disableds = false;
        // this.xuQiuForm.bidLevel = "";
        // this.bidLevel = [
        //   { text: "集团", value: "集团" },
        //   { text: "区域", value: "区域" },
        //   { text: "项目", value: "项目" },
        // ];
      }

      if (
        this.xuQiuForm.purchaseType != "询价比选" ||
        this.xuQiuForm.purchaseType != "直接委托" ||
        this.xuQiuForm.purchaseType != "竞争性谈判"
      ) {
        this.xuQiuForm.detailList = [this.xuQiuForm.detailList[0]];
      }
    },
    GetPlanEditDropDowns() {
      this.$http.get("/PurchasePlan/GetPlanEditDropDowns").then((res) => {
        // this.bidLevel = res.data.bidLevel;
        // this.depNames = res.data.depName;
        this.purchaseTypes = res.data.purchaseType;
        if (this.id) {
          this.getdetail(this.id);
          this.getList2(this.id);
        }
      });
      this.$http.get("/PurchasePlan/GetLoginUserOrgDeopDownList").then((res) => {
        // this.bidLevel = res.data.bidLevel;
        this.depNames = res.data;
        if (!this.id) {
          if (this.depNames.length > 0) {
            this.xuQiuForm.depName = this.depNames[0].text;
          }
        }
      });
    },
    saveto(isSubmit) {
      console.log(this.xuQiuForm);
      this.$refs.xuQiu.validate((valid) => {
        if (valid) {
          if (!isSubmit) {
            for (var i = 0; i < this.xuQiuForm.detailList.length; i++) {
              if (parseFloat(this.xuQiuForm.detailList[i].taxPrice) < parseFloat(this.xuQiuForm.detailList[i].noTaxPrice)) {
                this.$msg.error("不含税总限价不能大于含税总限价");
                return false;
              }
            }
            this.xuQiuForm.isSubmit = isSubmit;
            this.xuQiuForm.orgId = this.depNames.find((e) => this.xuQiuForm.depName == e.text).value;
            this.xuQiuForm.detailList = this.xuQiuForm.detailList.map((e) => {
              return {
                projectId: this.xuQiuForm.orgId,
                projectName: this.xuQiuForm.text,
                taxPrice: parseFloat(e.taxPrice),
                noTaxPrice: parseFloat(e.noTaxPrice),
                contractStartTime: e.contractStartTime,
                contractEndTime: e.contractEndTime,
                personMin: parseFloat(e.personMin),
                timeLength: parseFloat(e.timeLength),
                monthTaxPrice: parseFloat(e.monthTaxPrice),
                monthNoTaxPrice: parseFloat(e.monthNoTaxPrice),
                unitNoTaxPrice: parseFloat(e.unitNoTaxPrice),
              };
            });
            if (this.xuQiuForm.purchaseType == "战采招标") {
              this.xuQiuForm.detailList = [];
            }
            this.$http.post("/PurchasePlan/SavePurchasePlan", this.xuQiuForm).then((res) => {
              if (res.data.success) {
                this.id = !this.$route.query.id ? res.data.returnValue1 : this.$route.query.id;
                this.$msg.success(res.data.message);
                this.getdetail(res.data.returnValue1);
              } else {
                this.$confirm(res.data.message, "提示", {
                  confirmButtonText: "确定",
                  type: "warning",
                });
              }
            });
          } else {
            this.$confirm("您确认要提交吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.xuQiuForm.isSubmit = isSubmit;
              this.xuQiuForm.orgId = this.depNames.find((e) => this.xuQiuForm.depName == e.text).value;
              this.xuQiuForm.detailList = this.xuQiuForm.detailList.map((e) => {
                return {
                  projectId: this.xuQiuForm.orgId,
                  projectName: this.xuQiuForm.text,
                  taxPrice: parseFloat(e.taxPrice),
                  noTaxPrice: parseFloat(e.noTaxPrice),
                  contractStartTime: e.contractStartTime,
                  contractEndTime: e.contractEndTime,
                  personMin: parseFloat(e.personMin),
                  timeLength: parseFloat(e.timeLength),
                  monthTaxPrice: parseFloat(e.monthTaxPrice),
                  monthNoTaxPrice: parseFloat(e.monthNoTaxPrice),
                  unitNoTaxPrice: parseFloat(e.unitNoTaxPrice),
                };
              });
              this.$http.post("/PurchasePlan/SavePurchasePlan", this.xuQiuForm).then((res) => {
                if (res.data.success) {
                  this.$msg.success(res.data.message);
                  this.$router.go(-1);
                } else {
                  this.$confirm(res.data.message, "提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                  });
                }
              });
            });
          }
        } else {
          this.$msg.warning("请填写完必填项!");
        }
      });
    },
    onUserAdd(id) {
      this.xuQiuForm.bidUserGuid = id.userGuid;
      this.xuQiuForm.bidUserName = id.userName;
    },
    subJectTree(sub) {
      // if (sub.orgType == "项目") {
      this.xuQiuForm.detailList[this.index].projectId = sub.id;
      this.xuQiuForm.detailList[this.index].projectName = sub.projectFullName;
      this.$refs.subJectTree.close();
      // } else {
      //   this.$message.error("请选择项目");
      // }
    },
    subJectAdd(index) {
      this.index = index;
      this.$refs.subJectTree.open();
    },
    onChangeCategory(category) {
      console.log(category);
      this.xuQiuForm.bidCateId = category.id;
      this.xuQiuForm.bidCateName = category.cateName;
      this.categoryVisible = false;
    },
    submitUpload() {
      if (!this.uploadData.FileName) {
        this.$message.error("请填写文件名称");
        return false;
      }
      this.loading = true;
      let f = new FormData();
      f.append("planId", this.id);
      f.append("FileName", this.uploadData.FileName);
      f.append("file", this.file.raw);
      this.$axios
        .post("/api/FileUpload/BidPlanUpload1", f)
        .then((res) => {
          this.loading = false;
          if (res.data.success) {
            this.$refs.upload.clearFiles();
            this.$message.success(res.data.message);
            this.uploadData.FileName = "";
            this.dialogVisible = false;
            this.loading = false;
            this.getList2(this.id);
          } else {
            this.loading = false;
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err.data.message);
        });
    },
    onDownload(id) {
      // window.open(process.env.VUE_APP_API_URL+file.filePath+file.fileReName)
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidCommonFileDownLoad099?fileId=" + id);
    },
    deletes(id) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = { id };
        this.$http.post("/PurchasePlan/DeleteBidPlanFiles", obj).then((res) => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.getList2(this.id);
          } else {
            // this.$msg.warning(res.data.message);
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    beforeRemove(file, fileList) {
      console.log(this.file);
      this.file = {};
      // return this.$confirm(`确定移除 ${file.name}？`);
    },

    beforeUpload(file) {
      this.file = file;
      let name = file.name;
      //   let index = name.lastIndexOf("\.");
      //   this.uploadData = {
      //     FileName: name.substring(0, index),
      //   };
    },
  },
};
</script>

<style scoped>
::v-deep .el-form-item__label {
  height: 20px;
  line-height: 20px;
}

.setTop {
  margin-left: 10px;
  color: #409eff;
  position: absolute;
  cursor: pointer;
  top: -10px;
  left: 70px;
}
.bt {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
</style>
