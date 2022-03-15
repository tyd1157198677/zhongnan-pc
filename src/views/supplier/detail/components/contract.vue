<template>
  <div>
    <div class="table-top-title" style="margin-bottom: 10px">{{ supplierName }}</div>
    <div style="margin-bottom: 10px; text-align: right">
      <el-button type="primary" size="small" @click="selectSupVisible = true">新增合同</el-button>
    </div>
    <el-table v-loading="loading" :data="companyList" border :header-cell-style="{ background: '#42212108' }">
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="conName" label="合同名称" align="left" :min-width="200"> </el-table-column>
      <el-table-column prop="conCode" label="合同编号" align="center" width="100"> </el-table-column>
      <el-table-column prop="projectName" label="所属项目" align="center" width="200"> </el-table-column>
      <el-table-column prop="conDate" label="签订日期" align="center" width="120"> </el-table-column>
      <el-table-column prop="workAs" label="已付款比例" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ (scope.row.paidConValue / scope.row.conValue).toFixed(2) * 100 }}%</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="合同经办人" align="center" width="100"> </el-table-column>
      <el-table-column prop="monthlyXpenses" label="月度费用确认单" align="center" width="120"> </el-table-column>
      <el-table-column prop="monthlyScore" label="履约评估" align="center" width="100"> </el-table-column>
      <!-- <el-table-column prop="openAccountNum" label="是否主要联系人" align="center" width="120"> </el-table-column> -->
    </el-table>
    <pagination :total="page.total" :current-page="page.index" :pageSize="page.size" @pageChange="pageChange" />
    <el-dialog width="80%" title="新增合同" :visible.sync="selectSupVisible">
      <el-form style="margin-top: 30px" :rules="rules" label-position="top" label-width="130px" :model="form2" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="供方名称">
              <el-input v-model="supplierName" disabled> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属项目" prop="projectName">
              <el-input
                placeholder="请选择项目或期区名称"
                style="width: 100%"
                v-model.trim="form2.projectName"
                @focus="subJectAdd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="conName" label="合同名称">
              <el-input v-model="form2.conName" placeholder="请输入合同名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="conCate" label="合同分类">
              <el-input v-model="form2.conCate" placeholder="请输入合同分类"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item prop="conCode" label="合同编号">
              <el-input v-model="form2.conCode" @blur="isDefriend(form2.conCode)" placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="conDate" label="合同签订日期">
              <el-date-picker style="width: 100%" type="date" v-model="form2.conDate" value-format="yyyy-MM-dd" placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="startTime" label="合同开始时间">
              <el-date-picker style="width: 100%" type="date" v-model="form2.startTime" value-format="yyyy-MM-dd" placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="endTime" label="合同结束时间">
              <el-date-picker type="date" style="width: 99%" v-model="form2.endTime" value-format="yyyy-MM-dd" placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item prop="userGuid" label="经办人">
              <el-select
                style="width: 100%"
                v-model="form2.userGuid"
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethod"
                placeholder="请输入关键词"
                :loading="loading1"
                @focus="options = []"
              >
                <el-tooltip
                  :open-delay="500"
                  v-for="item in options"
                  :key="item.value"
                  class="item"
                  effect="dark"
                  :content="item.title"
                  placement="left"
                >
                  <el-option :label="item.userName" :value="item.userGuid"> </el-option>
                </el-tooltip>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="conValue" label="合同总金额">
              <el-input :min="0" type="number" v-model.number="form2.conValue" placeholder="请输入合同总金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="paidConValue" label="已付款金额">
              <el-input :min="0" type="number" v-model.number="form2.paidConValue" placeholder="请输入已付款金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="月度不含税金额">
              <el-input :min="0" type="number" v-model.number="form2.monthNoTaxValue" placeholder="请输入月度不含税金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="月度含税金额">
              <el-input :min="0" type="number" v-model.number="form2.monthHaveTaxValue" placeholder="请输入月度含税金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同状态">
              <el-select v-model="form2.state" style="width: 100%">
                <el-option label="履行中" value="履行中"></el-option>
                <el-option label="已完成" value="已完成"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form2.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <div style="text-align: right; margin-top: 10px">
              <el-button type="primary" size="small" @click="quxiao">取消</el-button>
              <el-button type="primary" size="small" @click="submit">提交</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <subJectTree title="项目" :level="2" ref="subJectTree" @itemClick="subJectTree"></subJectTree>
    <!-- <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="95%">
      <gongFang @itemClick="onSelectSups" />
    </el-dialog> -->
  </div>
</template>

<script>
import gongFang from "@/views/invest/components/storageList2";
import subJectTree from "@/views/bid/components/subJectTree";
export default {
  components: {
    gongFang,
    subJectTree,
    Pagination: () => import("@/components/Pagination.vue"),
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      page: {
        size: 15,
        index: 1,
        total: 0,
      },
      form2: {
        projectName: "",
        projectId: "",
        conName: "",
        conCode: "",
        conValue: null,
        userGuid: "",
        conDate: "",
        startTime: "",
        endTime: "",
        monthNoTaxValue: null,
        paidConValue: null,
        monthHaveTaxValue: null,
        state: "履约中",
        remark: "",
      },
      rules: {
        projectName: [{ required: true, message: "请选择所属项目", trigger: "change" }],
        conName: [{ required: true, message: "请输入合同名称", trigger: "change" }],
        conCode: [{ required: true, message: "请输入合同编号", trigger: "change" }],
        conCate: [{ required: true, message: "请输入合同分类", trigger: "change" }],
        conValue: [{ required: true, message: "请输入合同总金额", trigger: "change" }],
        userGuid: [{ required: true, message: "请选择经办人", trigger: "change" }],
        startTime: [{ required: true, message: "选择时间", trigger: "change" }],
        conDate: [{ required: true, message: "选择时间", trigger: "change" }],
        endTime: [{ required: true, message: "选择时间", trigger: "change" }],
        paidConValue: [{ required: true, message: "请输入已付款金额", trigger: "change" }],
        // monthHaveTaxValue: [{ required: true, message: "请输入月度含税金额", trigger: "change" }],
      },
      supplierName: "",
      selectSupVisible: false,
      loading: false,
      loading1: false,
      companyList: [],
      options: [],
    };
  },
  mounted() {
    this.getInfo();
    this.companyDataList();
  },
  methods: {
    getInfo() {
      this.$api.SupBaseInfo.GetOneSupBaseInfoById(this.id).then((res) => {
        this.supplierName = res.comFullName;
      });
    },
    GetSearchUserList21(val) {
      this.$http.get("/IdmUserInfo/GetSearchUserList21", { params: { keyWords: val } }).then((res) => {
        this.options = res.data;
      });
    },
    subJectAdd() {
      this.$refs.subJectTree.open();
    },
    isDefriend(v) {
      let index = this.companyList.findIndex((e) => v == e.conCode);
      if (index != -1) {
        this.$message.error("合同编号不能重复！");
      }
    },
    subJectTree(sub) {
      this.form2.projectId = sub.id;
      this.form2.projectName = sub.projectFullName;
      this.$refs.subJectTree.close();
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading1 = true;
        this.GetSearchUserList21(query);
        this.loading1 = false;
      } else {
        this.options = [];
      }
    },
    pageChange(page) {
      this.page.size = page._pageSize;
      this.page.index = page._currentPage;
      this.companyDataList();
    },
    quxiao() {
      this.$refs.ruleForm.resetFields();
      this.form2.monthNoTaxValue = null;
      this.form2.monthHaveTaxValue = null;
      this.selectSupVisible = false;
    },

    submit() {
      let index = this.companyList.findIndex((e) => this.form2.conCode == e.conCode);
      if (index != -1) {
        this.$message.error("合同编号不能重复！");
        return false;
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.form2.supplierId = this.id;
          this.$http.post("/Contract/InsterProjectContract", this.form2).then((res) => {
            if (res.data.success) {
              this.quxiao();
              this.companyDataList();
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
      //   window.location.href = process.env.VUE_APP_API_URL + url;
    },

    companyDataList() {
      let obj = {
        SearchType: 0,
        SkipCount: (this.page.index - 1) * this.page.size,
        MaxResultCount: this.page.size,
        SupplierId: this.id,
      };
      this.loading = true;
      this.$http.get("/Contract/GetProjectContractList", { params: obj }).then((res) => {
        res.data.items.forEach((e) => {
          e.conDate = e.conDate.substring(0, e.conDate.indexOf("T"));
        });
        this.companyList = res.data.items;
        this.page.total = res.data.totalCount;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}

.layui-table {
  width: 100%;
  background-color: #fff;
  color: #666;
  border-top: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}

.layui-table td,
.layui-table th {
  position: relative;
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}

.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: rgba(0, 0, 0, 0.03);
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
::v-deep .el-form--label-top .el-form-item__label {
  padding: 0;
  height: 30px;
}
</style>
