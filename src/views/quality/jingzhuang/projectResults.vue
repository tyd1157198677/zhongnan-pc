// 项目业绩模块
<!--  -->
<template>
  <div class="">
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right" style="width:120px">在施项目个数</td>
          <td>
            <span v-if="isEdit == 2">{{ base.projectCount }}</span>
            <el-input
              style="width:85%"
              type="number"
              :min="0"
              v-else
              v-model="base.projectCount"
              placeholder="请填写在施项目个数"
              oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
            ></el-input>个
          </td>
          <td class="right" style="width:100px">建筑面积</td>
          <td>
            <span v-if="isEdit == 2">{{ base.buildArea }}</span>
            <el-input style="width:85%" type="number" v-else v-model="base.buildArea" :min="0" placeholder="请填写建筑面积"></el-input>㎡
          </td>
          <td class="right" style="width:190px">与知名地产公司合作占比</td>
          <td>
            <span v-if="isEdit == 2">{{ base.cooperateRatio }}</span>
            <el-input
              style="width:85%"
              type="number"
              :min="0"
              v-else
              v-model="base.cooperateRatio"
              placeholder="请填写与知名地产公司合作占比"
              @input.native="onInput0_100"
            ></el-input>%
          </td>
          <td class="right" style="width:190px">实际承包人承接模式占比</td>
          <td>
            <span v-if="isEdit == 2">{{ base.typeRatio }}%</span>
            <el-input
              style="width:85%"
              type="number"
              :min="0"
              v-else
              v-model="base.typeRatio"
              placeholder="请填写在实际承包人承接模式占比"
              @input.native="onInput0_100"></el-input> %
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <div class="between">
              <span>备注：</span>
              <span>
                <el-button v-if="isEdit == 1" type="primary" size="mini" @click="save">暂存信息</el-button>
              </span>
            </div>
            1、如果本次采取实际承包人承接模式，只需要填写实际承包人全国所有业绩；<br />
            2、如果本次采取直属承接模式，需要填写公司在我司邀请项目所在区域所有业绩。<br />
            3、如贵司采用公司或者分公司直属承包项目管理模式，则委派给我司驻场项目负责人目前全国所有在施业绩，均需要填写。
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btns">
      <el-button v-if="isEdit == 1" type="primary" size="mini" @click="downLoad">下载模板</el-button>
      <el-upload style="margin:0 10px" class="upload" action="#" multiple :show-file-list="false" :http-request="uploadFile">
        <el-button type="primary" size="small">导入数据</el-button>
      </el-upload>
      <el-button v-if="isEdit == 1" type="primary" size="mini" @click="add">新增</el-button>
    </div>
    <el-table :data="companyYeJi" stripe border v-loading="loading">
      <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
      <el-table-column label="施工单位名称" min-width="160" align="center" prop="abbr"> </el-table-column>
      <el-table-column align="center" min-width="160" label="项目名称" prop="partner" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="项目地址" prop="projectName"> </el-table-column>
      <el-table-column align="center" label="建设单位(简称万科/恒大)" prop="projectAddress"> </el-table-column>
      <el-table-column align="center" label="项目类型" prop="projectAddress"> </el-table-column>
      <el-table-column align="center" label="精装标准" prop="projectAddress"> </el-table-column>
      <el-table-column align="center" label="建筑面积（m2）" prop="formatAndMes"  width="130"> </el-table-column>
      <el-table-column align="center" label="合同金额(万元)" prop="contractAmount" width="120"> </el-table-column>
      <el-table-column align="center" label="合同开竣工时间" prop="projectStartTime" width="120"> </el-table-column>
      <el-table-column align="center" label="甲方联系人/联系方式" prop="proProcess" width="120"> </el-table-column>
      <el-table-column align="center" label="劳务工种/联系人/联系方式" prop="proProcess" width="120"> </el-table-column>
      <el-table-column align="center" label="现阶段进度" prop="comMainType" width="120"> </el-table-column>
      <el-table-column align="center" label="承接模式" prop="realContractor" width="100"> </el-table-column>
      <el-table-column v-if="isEdit == 1" label="操作" align="center" width="80">
        <template slot-scope="scope">
          <i class="el-icon-delete" @click="deleteRow6(scope.row)"></i>
          <i style="margin-left:10px" class="el-icon-edit" @click="editRow6(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="80%" title="总/分包单位在施项目业绩汇总表" :visible.sync="dialogVisible6">
      <el-form label-position="right" ref="saveSupForm6" size="small" label-width="145px" :model="formSearch6" :rules="rules6">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="地产简称" prop="abbr">
              <el-input v-model="formSearch6.abbr" placeholder="万科（如政府项目，写政府即可）" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目甲方" prop="partner">
              <el-input v-model="formSearch6.partner" placeholder="天津万科投资发展有限公司" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="formSearch6.projectName" placeholder="空港国际总部基地C地块住宅广场" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目地点" prop="projectAddress">
              <el-input v-model="formSearch6.projectAddress" placeholder="天津市东丽区通庆路与津滨路交口" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目业态" prop="formatAndMes">
              <el-input v-model="formSearch6.formatAndMes" placeholder="商品住宅/商业/写字楼/别墅/回迁房/经济适用房/产业园等" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑面积" prop="buildArea">
              <el-input v-model="formSearch6.buildArea" placeholder="12879.44" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同金额" prop="contractAmount">
              <el-input v-model="formSearch6.contractAmount" placeholder="8126900" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开工时间" prop="projectStartTime">
              <el-date-picker type="date" v-model="formSearch6.projectStartTime" value-format="yyyy-MM-dd" placeholder="2019.3.15">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="竣工时间" prop="projectEndTime">
              <el-date-picker type="date" v-model="formSearch6.projectEndTime" value-format="yyyy-MM-dd" placeholder="2020.5.15">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前项目进展" prop="proProcess">
              <el-input v-model="formSearch6.proProcess" placeholder="尚未进场/土方基坑阶段/主体阶段/外装阶段/竣工验收" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目承接模式" prop="comMainType">
              <el-select v-model="formSearch6.comMainType" placeholder="直属承接/内部承包/个人承包/合伙承包">
                <!-- <el-option label="请选择" value=""></el-option> -->
                <el-option v-for="item in typeList1" :key="item.text" :label="item.text" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际承包人" prop="realContractor">
              <el-input v-model="formSearch6.realContractor" placeholder="宫国占（如采用非公司直属承接时填写）" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目经理" prop="manager">
              <el-input v-model="formSearch6.manager" placeholder="宫国占（填写非挂证人员）" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方联系人" prop="aLiaisonMan">
              <el-input v-model="formSearch6.aLiaisonMan" placeholder="李亮" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方联系人电话" prop="aPhone">
              <el-input v-model="formSearch6.aPhone" placeholder="1392****456" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="混凝土联系人" prop="bLiaisonMan">
              <el-input v-model="formSearch6.bLiaisonMan" placeholder="李亮" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="混凝土联系人电话" prop="bPhone">
              <el-input v-model="formSearch6.bPhone" placeholder="1392****456" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="砌块联系人" prop="cLiaisonMan">
              <el-input v-model="formSearch6.cLiaisonMan" placeholder="李亮" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="砌块联系人电话" prop="cPhone">
              <el-input v-model="formSearch6.cPhone" placeholder="1392****456" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="木工联系人" prop="dLiaisonMan">
              <el-input v-model="formSearch6.dLiaisonMan" placeholder="李亮" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="木工联系人电话" prop="dPhone">
              <el-input v-model="formSearch6.dPhone" placeholder="1392****456" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="瓦工联系人" prop="fLiaisonMan">
              <el-input v-model="formSearch6.fLiaisonMan" placeholder="李亮" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="瓦工联系人电话" prop="fPhone">
              <el-input v-model="formSearch6.fPhone" placeholder="1392****456" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="钢筋工联系人" prop="eLiaisonMan">
              <el-input v-model="formSearch6.eLiaisonMan" placeholder="李亮" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="钢筋工联系人电话" prop="ePhone">
              <el-input v-model="formSearch6.ePhone" placeholder="1392****456" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input v-model="formSearch6.remark" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="float-right">
              <el-button type="primary" :loading="loading" @click="save6">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["type", "url"],
  components: {},
  data() {
    return {
      isEdit: 0, // 1:编辑，2：详情
      loading: false,
      api: process.env.VUE_APP_API_URL,
      dialogVisible6: false,
      uploadData: {},
      header: { Authorization: "Bearer " + this.$store.state.token }, // 请求头的规则，用你们后台给你的就是
      base: {
        masterId: this.$route.query.id,
        projectCount: 0,
        buildArea: 0,
        cooperateRatio: 0,
        typeRatio: 0,
      },
      typeList1: [],
      companyYeJi: [],
      formSearch6: {
        id: "",
        quaMasterId: this.$route.query.id,
        abbr: "",
        partner: "",
        projectName: "",
        projectAddress: "",
        formatAndMes: "",
        buildArea: 0,
        contractAmount: 0,
        projectStartTime: "",
        projectEndTime: "",
        proProcess: "",
        comMainType: "",
        realContractor: "",
        manager: "",
        aLiaisonMan: "",
        aPhone: "",
        bLiaisonMan: "",
        bPhone: "",
        cLiaisonMan: "",
        cPhone: "",
        dLiaisonMan: "",
        dPhone: "",
        eLiaisonMan: "",
        ePhone: "",
        fLiaisonMan: "",
        fPhone: "",
        remark: "",
      },
      rules6: {
        abbr: { required: true, message: "请输入地产简称", trigger: "blur" },
        partner: { required: true, message: "请输入项目甲方", trigger: "blur" },
        projectName: { required: true, message: "请输入项目名称", trigger: "blur" },
        projectAddress: { required: true, message: "请输入项目地点", trigger: "blur" },
        formatAndMes: { required: true, message: "请输入项目业态", trigger: "blur" },
        buildArea: { required: true, message: "请输入建筑面积", trigger: "blur" },
        contractAmount: { required: true, message: "请输入合同金额", trigger: "blur" },
        projectStartTime: { required: true, message: "请选择开工时间", trigger: "blur" },
        projectEndTime: { required: true, message: "请选择竣工时间", trigger: "blur" },
        proProcess: { required: true, message: "请输入当前项目进展", trigger: "blur" },
        comMainType: { required: true, message: "请选择项目承接模式", trigger: "change" },
        realContractor: { required: true, message: "请输入实际承包人", trigger: "blur" },
        manager: { required: true, message: "请输入项目经理", trigger: "blur" },
        aLiaisonMan: { required: true, message: "请输入甲方联系人", trigger: "blur" },
        aPhone: this.regFun("甲方"),
        bLiaisonMan: { required: true, message: "请输入混凝土联系人", trigger: "blur" },
        bPhone: this.regFun("混凝土"),
        cLiaisonMan: { required: true, message: "请输入砌块联系人", trigger: "blur" },
        cPhone: this.regFun("砌块"),
        dLiaisonMan: { required: true, message: "请输入木工联系人", trigger: "blur" },
        dPhone: this.regFun("入木"),
        eLiaisonMan: { required: true, message: "请输入钢筋工联系人", trigger: "blur" },
        ePhone: this.regFun("钢筋工"),
        fLiaisonMan: { required: true, message: "请输入瓦工联系人", trigger: "blur" },
        fPhone: this.regFun("瓦工"),
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.isEdit = this.$route.query.type;
    // this.GetQuaMessage();
    // this.GetSupQuaCaseInfoList();
  },
  methods: {
    onInput0_100(e) {
      this.$message.closeAll();
      // 验证是否是纯数字
      let isNumber = /^\d*$/.test(e.target.value);
      // 过滤非数字
      e.target.value = e.target.value.replace(/\D/g, "");
      if (!isNumber || e.target.value < 0 || e.target.value > 100) {
        this.$message.warning("只能输入0-100的整数");
      }
      e.target.value = (e.target.value >= 0 && e.target.value <= 100 && e.target.value.match(/^\d*/g)[0]) || null;
    },
    GetBidMasterDropDowns() {
      this.$http.get("/BidMaster/GetBidMasterDropDowns").then(res => {
        this.selectList = res.data;
      });
    },
    regFun(name) {
      return [
        { required: true, message: "请输入" + name + "联系人手机号码", trigger: "blur" },
        { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: "手机号格式错误",
          trigger: "blur",
        },
      ];
    },
    //公司基本信息
    async GetQuaMessage() {
      let res = await this.$http.get("/SupQua/GetQuaMessage", { params: { masterId: this.id } });
      let base = res.data.result;
      this.base.projectCount = base.projectCount;
      this.base.buildArea = base.buildArea;
      this.base.cooperateRatio = base.cooperateRatio;
      this.base.typeRatio = base.typeRatio;
    },

    //获取总、分公司代表业绩（含实际承包人
    async GetSupQuaCaseInfoList() {
      let res = await this.$http.get("/SupQua/GetSupQuaCaseInfoList", { params: { masterId: this.$route.query.id } });
      res.data.forEach(item => {
        item.projectStartTime = item.projectStartTime.split("T")[0];
        item.projectEndTime = item.projectEndTime.split("T")[0];
      });
      this.companyYeJi = res.data;
    },
    GetTakeOnType_SelectList() {
      this.$http.get("/SupQua/GetTakeOnType_SelectList").then(res => {
        this.typeList1 = res.data;
      });
    },
    add() {
      this.GetTakeOnType_SelectList();
      this.dialogVisible6 = true;
      this.$nextTick(() => {
        this.$refs["saveSupForm6"].resetFields();
      });
    },
    onUploadSuccess(response, file, fileList) {
      if (response.success) {
        this.$message.success(response.message);
        this.GetSupQuaCaseInfoList();
        // this.fileList = [];
        // this.$refs.upload.clearFiles();
        // this.$emit("fatherMethod", response);
      } else {
        this.$message.error(response.message);
      }
    },
    downLoad() {
      window.location.href = this.url;
    },
    exportInfo() {},
    save() {
      this.$http.post("/SupQua/UpdateSupQuaCaseInfoReport", this.base).then(res => {
        let data = res.data;
        if (data.success) {
          this.$message.success(data.message);
        } else {
          this.$message.error(data.message);
        }
      });
    },
    save6() {
      this.$refs.saveSupForm6.validate(valid => {
        if (valid) {
          this.$http.post("/SupQua/InsterSupQuaCaseInfo", this.formSearch6).then(res => {
            let data = res.data.result;
            if (data.success) {
              this.$message.success(data.message);
              this.GetSupQuaCaseInfoList();
              this.dialogVisible6 = false;
            } else {
              this.$message.error(data.message);
            }
          });
        }
      });
    },
    deleteRow6(row) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupQua/DelSupQuaCaseInfo", { id: row.id }).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetSupQuaCaseInfoList();
          } else {
            this.$msg.error(res.data.message);
          }
        });
      });
    },
    editRow6(row) {
      this.formSearch6 = row;
      this.GetTakeOnType_SelectList();
      this.dialogVisible6 = true;
    },
    uploadFile(item) {
      const fileObj = item.file;
      const from = new FormData(); // FormData 对象
      from.append("file", fileObj);
      from.append("masterId", this.$route.query.id);
      this.$http.post("/SupQua/LeadSupQuaCaseInfo", from).then(res => {
        if (res.data.result.success) {
          this.$msg.success(res.data.result.message);
          this.GetSupQuaCaseInfoList();
        } else {
          this.$msg.error(res.data.result.message);
        }
      });
    },
    // submitUpload() {
    //   Object.assign(this.uploadData, { masterId: this.$route.query.id });
    //   this.$refs.upload.submit();
    //   //   this.dialogVisible = false;
    // },
  },
};
</script>
<style lang="scss" scoped>
.btns {
  display: flex;
  margin: 10px 0;
  justify-content: flex-end;
}
.between {
  display: flex;
  justify-content: space-between;
}
</style>
