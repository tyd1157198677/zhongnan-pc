<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <showplan-menu />
      </el-col>
    </el-row>
    <el-row id="page_main">
      <el-col :span="4">
        <plan-menu />
      </el-col>
      <el-col :span="20" style="margin-bottom: 50px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>招标入围</el-breadcrumb-item>
          <el-breadcrumb-item>入围单位</el-breadcrumb-item>
        </el-breadcrumb>
        <statusList></statusList>
        <el-tabs v-model="activeName" @tab-click="handleTabClick" type="card" style="margin-top: 10px">
          <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.text" :name="item.value"></el-tab-pane>
          <div :loading="loadfing">
            <div>
              <span style="color: red" v-if="this.returnValue1 != '' || this.returnValue1 != null">{{ returnValue1 }}</span>
              <el-button
                :loading="loadfing"
                type="primary"
                style="float: right; margin-left: 10px; margin-bottom: 10px"
                size="small"
                @click="savePerson"
                >保存联系人</el-button
              >
              <el-button
                :loading="loadfing"
                type="primary"
                style="float: right; margin-bottom: 10px"
                size="small"
                @click="add"
                v-if="subbut1"
                >提交入围审批</el-button
              >
            </div>
            <div style="margin-top: 10px; margin-bottom: 10px">
              <el-table
                empty-text="无符合条件的记录"
                stripe
                border
                element-loading-text="请稍候,数据正在加载中..."
                :data="tableData"
                v-loading="loadfing"
              >
                <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>

                <el-table-column prop="comFullName" label="供应商名称" align="left" min-width="250" fixed> </el-table-column>
                <!-- <el-table-column prop="comMainName" label="承接主体名称" min-width="250" align="left" fixed> </el-table-column> -->
                <el-table-column prop="sectionName" label="标段名称" align="center" width="200"> </el-table-column>
                <el-table-column
                  prop="bidSignUpType"
                  label="供方来源#明确推荐人及渠道"
                  :render-header="renderheader"
                  align="center"
                  width="140"
                >
                </el-table-column>
                <el-table-column label="资格预审" width="120" prop="yushen" align="center">
                  <template slot-scope="scope">
                    <el-link
                      type="primary"
                      style="color: #409eff; text-decoration: none"
                      @click="jumpSuppInfo1(scope.row)"
                      v-if="scope.row.havaQua"
                    >
                      查看详情
                    </el-link>
                  </template>
                </el-table-column>
                <el-table-column label="考察" width="120" prop="kaocha" align="center">
                  <template slot-scope="scope">
                    <el-link
                      type="primary"
                      style="color: #409eff; text-decoration: none"
                      @click="jumpSuppInfo2(scope.row)"
                      v-if="scope.row.havaInves"
                    >
                      查看详情
                    </el-link>
                  </template>
                </el-table-column>
                <el-table-column label="投标联系人" width="150" align="center">
                  <el-table-column label="姓名" width="150" align="center" prop="userName1">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.userName1"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="手机" width="150" align="center">
                    <template slot-scope="scope">
                      <el-input maxlength="11" minlength="11" v-model="scope.row.mobilePhone1" placeholder="请输入正确的手机号"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="邮箱" width="150" align="center" prop="email1">
                    <template slot-scope="scope">
                      <el-input placeholder="请输入正确的邮箱" v-model="scope.row.email1"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <!-- <el-table-column label="商务洽谈联系人" width="150"  align="center">
              <el-table-column label="姓名" width="150" align="center" prop="userName2">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.userName2"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="手机" width="150" align="center" prop="mobilePhone2">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.mobilePhone2"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="邮箱" width="150" align="center" prop="email2">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.email2"></el-input>
                </template>
              </el-table-column>
            </el-table-column> -->
                <el-table-column label="操作" width="80" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-delete" title="删除" @click="delete1(scope.row)" style="margin-right: 10px" v-if="subbut"></i>
                    <!--<i class="el-icon-s-custom" title="查看投标单位联系人信息" @click="people(scope.row)" style="margin-right:10px"></i>-->
                  </template>
                </el-table-column>
              </el-table>
              <div style="float: right; color: red">同时对所有标段的供应商在OA系统发起入围审批</div>
            </div>
          </div>
          <!-- </el-tab-pane>
          <el-tab-pane label="补录入围" name="补录入围"> -->
          <!-- <div style="margin-top:10px" >
            <el-select placeholder="请选择标段" @change="dropDownChange" v-model="biaoDuan">
              <el-option v-for="item in dropDown" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" v-if="seebut" style="float: right;margin-bottom:10px" size="small" @click="addbulu"
              >提交入围审批</el-button
            >
            <el-button type="primary" v-if="seebut" style="float: right;margin-right: 10px;margin-bottom:10px" size="small" @click="save"
              >补录供应商</el-button
            >
          </div> -->
          <!-- <div style="margin-top: 10px;">
            <el-table
              empty-text="无符合条件的记录"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tablebululist"
              v-loading="loading"
            >
              <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>

              <el-table-column prop="comFullName" label="供应商名称" align="center" min-width="250" fixed> </el-table-column>
              <el-table-column prop="comMainName" label="承接主体名称" min-width="250" align="center" fixed> </el-table-column>
              <el-table-column prop="sectionName" label="标段名称" align="center" width="200"> </el-table-column>
              <el-table-column prop="bidSignUpType" label="供方来源" align="center" width="120"> </el-table-column>
              <el-table-column label="资格预审" width="120" prop="yushen" align="center">
                <template slot-scope="scope">
                  <el-link
                    type="primary"
                    style="color:#409eff;text-decoration: none"
                    @click="jumpSuppInfo1(scope.row)"
                    v-if="scope.row.havaQua"
                  >
                    查看详情
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column label="考察" width="120" prop="kaocha" align="center">
                <template slot-scope="scope">
                  <el-link
                    type="primary"
                    style="color:#409eff;text-decoration: none"
                    @click="jumpSuppInfo2(scope.row)"
                    v-if="scope.row.havaInves"
                  >
                    查看详情
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column label="投标联系人" width="150" align="center">
                <el-table-column label="姓名" width="150" align="center" prop="userName1">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.userName1"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="手机" width="150" align="center" prop="mobilePhone1">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.mobilePhone1"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="邮箱" width="150" align="center" prop="email1">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.email1"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-delete" title="删除" @click="delete1(scope.row)" style="margin-right:10px" v-if="seebut"></i>
                </template>
              </el-table-column>
            </el-table>
            <div style="float:right;color:red">同时对所有标段的所有供应商发起入围</div>
          </div> -->
          <!-- </el-tab-pane> -->
        </el-tabs>
        <div style="margin-top: 20px" v-if="showtable">
          <el-row>
            <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tablerizhi">
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
      </el-col>
    </el-row>
    <el-dialog :visible.sync="selectSupVisible" title="补录供应商" width="60%">
      <div>
        <supplier-list @itemClick="onSelectSups" />
      </div>
    </el-dialog>
    <el-dialog width="70%" title="供应商联系人" :visible.sync="dialogVisible">
      <el-button type="primary" style="float: right; margin-bottom: 10px" size="small" @click="addPerson" v-if="showButton">添加</el-button>
      投标联系人
      <el-table
        empty-text="无符合条件的记录"
        style="margin-bottom: 10px"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData2"
        v-loading="loading"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="personName" label="姓名" align="center"> </el-table-column>
        <el-table-column label="座机" prop="phone" align="center"></el-table-column>
        <el-table-column label="手机号" prop="mobilePhone" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"> </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <i class="el-icon-delete" title="删除" @click="deletePerson1(scope.$index)" v-if="showButton"></i>
            <i class="el-icon-edit" title="编辑" @click="editPerson1(scope.$index, scope.row)" style="margin-right: 10px"></i>
          </template>
        </el-table-column>
      </el-table>

      <!-- 商务洽谈联系人
      <el-table
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData3"
        v-loading="loading"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="personName" label="姓名" align="center"> </el-table-column>
        <el-table-column label="座机" prop="phone" align="center"></el-table-column>
        <el-table-column label="手机号" prop="mobilePhone" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"> </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <i class="el-icon-delete" title="删除" @click="deletePerson2(scope.$index)"></i>
            <i class="el-icon-edit" title="编辑" @click="editPerson2(scope.$index, scope.row)" style="margin-right:10px"></i>
          </template>
        </el-table-column>
      </el-table> -->
    </el-dialog>

    <el-dialog width="50%" title="供应商联系人" :visible.sync="dialogVisible2">
      <el-form :model="form" ref="form" size="small" label-width="150px" class="mt-2">
        <el-form-item label="联系人类型" prop="personType" required="true">
          <el-select v-model="form.personType" placeholder="请选择">
            <el-option label="投标联系人" value="投标联系人"></el-option>
            <!-- <el-option label="商务洽谈联系人" value="商务洽谈联系人"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="personName" required="true">
          <el-input v-model="form.personName" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="联系人座机号" prop="phone">
          <el-input v-model="form.phone" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号" prop="mobilePhone">
          <el-input v-model="form.mobilePhone" style="width: 200px" @input="phoneChange"></el-input>
        </el-form-item>
        <el-form-item label="联系人职务" prop="email">
          <el-input v-model="form.email" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right" size="small" @click="onSubmit2">保存信息</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
import PlanMenu from "../components/PlanMenuDemoru.vue";
import SupplierList from "@/components/SupplierList";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step3",
  components: { PlanMenu, showplanMenu, SupplierList, statusList: () => import("@/components/statusList.vue") },
  data() {
    return {
      form: {
        planId: "",
        supplierId: "",
        personType: "",
        personName: "",
        phone: "",
        mobilePhone: "",
        email: "",
      },
      tablerizhi: [],
      returnValue1: "",
      subbut1: false,
      subbut: false,
      tabsList: [],
      seebut: false,
      selectSupVisible: false,
      supplierId: "",
      dialogVisible2: false,
      dialogVisible: false,
      tableData3: [],
      tableData2: [],
      tablebululist: [],
      biaoDuan2: "",
      // planId: "",
      biaoDuan: "",
      dropDown: [],
      activeName: "",
      selectSupVisible: false,
      tableData: [],
      value: "",
      form: {},
      loadfing: false,
      showtable: false,
      tableIdList: [],
      loading: false,
      x: true,
      showButton: true,
      type: 0,
      index1: -1,
      msg2: "",
      flag2: true,
    };
  },
  computed: {
    planId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else if (this.$route.params.id) {
        return this.$route.params.id;
      } else if (this.$route.params.baseId) {
        return this.$route.params.baseId;
      } else {
        return this.$route.query.baseId;
      }
    },
  },
  created: function () {
    // this.planId = this.$route.query.id;
    // this.GetSectionDropDown02();
  },
  mounted() {
    this.GetSupplierInMasterIndex1001();
    this.GetSupplierInviteList02();
    this.GetNewLogList_SupplierIn();
    // this.CheckShowSubmitIn1001();
    this.GetSectionDropDown02();
    this.CheckAddSupplierIn();
    this.CheckCanEdit();
    this.GetSectionDropDown02();
  },
  methods: {
    parseTime,
    renderheader(h, { column, $index }) {
      return h("span", {}, [h("span", {}, column.label.split("#")[0]), h("br"), h("span", {}, column.label.split("#")[1])]);
    },
    GetSupplierInMasterIndex1001() {
      this.$http.get("/LiandoSupplierIn/GetSupplierInMasterIndex1001", { params: { planId: this.planId } }).then((res) => {
        this.tabsList = res.data;
        this.activeName = this.tabsList.length > 0 ? this.tabsList[0].value : "";
        this.GetSupplierInviteList02();
        this.CheckShowSubmitIn1001();
      });
    },
    GetNewLogList_SupplierIn() {
      this.$http
        .get("/WorkFlowStart/GetNewLogList_SupplierIn", { params: { planId: this.planId, masterId: this.masterId } })
        .then((res) => {
          this.tablerizhi = res.data.logs;
          if (res.data.logs.length > 0) {
            this.showtable = true;
          } else {
            this.showtable = false;
          }
        });
    },
    jumpSuppInfo1(row) {
      window.open("/#/quality/qualitylistEdit?id=" + row.quaId + "&type=1");
    },
    jumpSuppInfo2(row) {
      window.open("/#/invest/showInvest?id=" + row.invesId + "&supGuid=" + row.supplierId);
    },
    CheckCanEdit() {
      this.$api.supIn.CheckCanEdit({ planId: this.planId }).then((res) => {
        if (!res.success) {
          this.showButton = false;
          // this.openM(res.message);
          // this.$message.error(res.message);
        }

        //   this.$api.supIn.CheckStartSupplierInAudit41({ planId: this.planId }).then(res => {
        //     if (!res.success) {
        //       this.showButton = false;
        //       this.flag2 = false;
        //     }
        //     this.msg2 = res.message;
        //   });
      });
    },
    // GetSectionDropDown02() {
    //   this.$api.supIn.GetSectionDropDown02({ planId: this.planId }).then(res => {
    //     if (res.length > 0) {
    //       this.biaoDuan = res[0].value;
    //     }
    //   });
    // },
    save() {
      this.selectSupVisible = true;
    },
    onSelectSups(sup) {
      var forms = { planId: this.planId, bidSignUpType: "补录入围", sectionId: this.biaoDuan, supplierId: sup.id };
      this.$http.post("/LiandoSupplierIn/SaveSupplier02_2", forms).then((res) => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          // this.GetSupplierInList03_2();
          this.GetSupplierInviteList02();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    change(val) {
      if (!/^1[34578]\d{9}$/.test(val)) {
        this.$message.error("请输入正确的手机号码");
      }
    },
    savePerson() {
      for (var i = 0; i < this.tableData.length; i++) {
        if (!/^1[34578]\d{9}$/.test(this.tableData[i].mobilePhone1)) {
          this.$message.error("请输入正确的手机号码");
          return false;
        }
      }
      let arr = this.tableData.map((v) => {
        return {
          id: v.id,
          userName1: v.userName1,
          mobilePhone1: v.mobilePhone1,
          email1: v.email1,
        };
      });
      this.$api.supIn.SaveSupplierPersonRow03(arr).then((res) => {
        if (res.success) {
          if (res.success) {
            this.$message.success(res.message);
            this.GetSupplierInviteList02();
          } else {
            this.$message.error(res.message);
          }
        }
      });
    },
    phoneChange() {
      this.form.mobilePhone = this.form.mobilePhone.replace(/[^\d]/g, "");
      if (this.form.mobilePhone.length > 11) {
        this.form.mobilePhone = this.form.mobilePhone.substr(0, 11);
      }
      var reg = /^1[3456789]\d{9}$/;
      if (this.form.mobilePhone.length >= 11 && !reg.test(this.form.mobilePhone)) {
        this.$message.error("请输入正确的手机号码格式");
        // this.$alert("请输入正确的手机号码格式", {
        //   confirmButtonText: "确定",
        // });
      }
    },
    handleTabClick(tab, event) {
      this.GetSupplierInviteList02();
      this.CheckShowSubmitIn1001();
    },
    CheckShowSubmitIn1001() {
      this.$http
        .get("/BidCheckCenter/CheckShowSubmitIn1001", { params: { planId: this.planId, submitIndex: this.activeName } })
        .then((res) => {
          this.returnValue1 = res.data.returnValue1;
          this.masterId = res.data.returnValue2;
          if (res.data.returnValue3 == "True") {
            this.subbut = true;
          } else {
            this.subbut = false;
          }
          if (res.data.success) {
            this.subbut1 = true;
          } else {
            this.subbut1 = false;
          }
          if (this.masterId != "" || this.masterId != null) {
            this.GetNewLogList_SupplierIn();
          }
        });
    },
    openM(msg) {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [h("span", null, msg), h("i", { style: "color: teal" }, "")]),
      }).then((action) => {});
    },
    deletePerson1(index) {
      console.log(index);
      this.index1 = index;
      this.type = 1;
      this.del3();
    },
    deletePerson2(index) {
      this.index1 = index;
      this.type = 2;
      this.del3();
    },
    del3() {
      var a = [];
      for (var i = 0; i < this.tableData2.length; i++) {
        if (i == this.index1 && this.type == 1) {
        } else {
          a.push(this.tableData2[i]);
        }
      }
      for (var i = 0; i < this.tableData3.length; i++) {
        if (i == this.index1 && this.type == 2) {
        } else {
          this.$message.error(2);
          a.push(this.tableData3[i]);
        }
      }
      this.$api.supIn.SaveSupplierPerson03(a).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
          this.GetBidSupplierPerson03(this.form.supplierId);
          this.dialogVisible2 = false;
        } else {
          this.$message.error(res.message);
          this.dialogVisible2 = false;
        }
      });
    },
    editPerson1(index, row) {
      this.form = row;
      this.index1 = index;
      this.type = 1;
      this.dialogVisible2 = true;
    },
    editPerson2(index, row) {
      this.form = row;
      this.index1 = index;
      this.type = 2;
      this.dialogVisible2 = true;
    },
    onSubmit2() {
      if (!this.form.personType || !this.form.personName) {
        this.$message.error("必填项不能为空");
        return;
      }
      if (!this.form.phone && !this.form.mobilePhone) {
        this.$message.error("手机号和座机号至少填写一个");
        return;
      }
      if (this.form.mobilePhone.length != 11 && !this.form.phone) {
        this.$message.error("手机号必须是11位");
        return;
      }

      var a = [];
      if (this.type != 0) {
        for (var i = 0; i < this.tableData2.length; i++) {
          if (i == this.index1 && this.type == 1) {
            a.push(this.form);
          } else {
            a.push(this.tableData2[i]);
          }
        }
        for (var i = 0; i < this.tableData3.length; i++) {
          if (i == this.index1 && this.type == 2) {
            a.push(this.form);
          } else {
            a.push(this.tableData3[i]);
          }
        }
      } else {
        this.form.planId = this.planId;
        this.form.supplierId = this.supplierId;

        for (var i = 0; i < this.tableData2.length; i++) {
          a.push(this.tableData2[i]);
        }
        for (var i = 0; i < this.tableData3.length; i++) {
          a.push(this.tableData3[i]);
        }
        a.push(this.form);
      }

      this.$api.supIn.SaveSupplierPerson03(a).then((res) => {
        this.type = 0;
        this.index = -1;
        if (res.success) {
          this.$message.success(res.message);
          this.GetBidSupplierPerson03(this.form.supplierId);
          this.dialogVisible2 = false;
        } else {
          this.$message.error(res.message);
          this.dialogVisible2 = false;
        }
      });
    },
    addPerson() {
      this.form = {
        id: "",
        planId: "",
        supplierId: "",
        personType: "",
        personName: "",
        phone: "",
        mobilePhone: "",
        email: "",
      };
      this.dialogVisible2 = true;
    },
    people(row) {
      this.supplierId = row.id;
      this.dialogVisible = true;
      this.GetBidSupplierPerson03(row.id);
    },
    GetBidSupplierPerson03(id) {
      this.tableData2 = [];
      this.tableData3 = [];
      this.$api.supIn.GetBidSupplierPerson03({ planId: this.planId, supplierId: id }).then((res) => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].personType == "投标联系人") {
            this.tableData2.push(res[i]);
          } else {
            this.tableData3.push(res[i]);
          }
        }
      });
    },
    add() {
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].mobilePhone1) {
          if (this.tableData[i].mobilePhone1.length != 11) {
            this.$message.error("手机号为11位，请检查");
            return false;
          }
        }
      }
      let arr = this.tableData.map((v) => {
        return {
          id: v.id,
          userName1: v.userName1,
          mobilePhone1: v.mobilePhone1,
          email1: v.email1,
        };
      });
      this.$api.supIn.SaveSupplierPersonRow03(arr).then((res) => {
        if (res.success) {
          if (res.success) {
            // this.$message.success(res.message);
            this.GetSupplierInviteList02();
            this.CheckCanEdit();
          } else {
            // this.$message.error(res.message);
          }
        }
      });
      this.$confirm("确定要提交入围审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loadfing = true;
          this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res1) => {
            if (res1.planId == "00000000-0000-0000-0000-000000000000") {
              this.$message.error("请先完善入围相关信息");
            } else {
              this.$api.supIn.SubmitSupplierIn({ id: this.planId }).then((res) => {
                if (res.success) {
                  this.$message.success(res.message);
                  this.loadfing = false;
                  this.GetSupplierInviteList02();
                  this.CheckCanEdit();
                  this.CheckShowSubmitIn1001();
                  this.GetNewLogList_SupplierIn();
                } else {
                  this.loadfing = false;
                  this.$message.error(res.message);
                }
              });
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消操作" });
        });
    },
    addbulu() {
      for (var i = 0; i < this.tablebululist.length; i++) {
        if (this.tablebululist[i].mobilePhone1) {
          if (this.tablebululist[i].mobilePhone1.length != 11) {
            this.$message.error("手机号为11位，请检查");
            return false;
          }
        }
      }
      let arr = this.tablebululist.map((v) => {
        return {
          id: v.id,
          userName1: v.userName1,
          mobilePhone1: v.mobilePhone1,
          email1: v.email1,
        };
      });
      this.$api.supIn.SaveSupplierPersonRow03(arr).then((res) => {
        if (res.success) {
          if (res.success) {
            // this.$message.success(res.message);
            // this.GetSupplierInList03_2();
          } else {
            // this.$message.error(res.message);
          }
        }
      });
      this.$confirm("确定要提交入围审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("/LiandoSupplierIn/SubmitSupplierIn_2", { id: this.planId }).then((res) => {
            if (res.data.success) {
              this.$message.success(res.data.message);
              this.CheckAddSupplierIn();
              // this.GetSupplierInList03_2();
            } else {
              this.$message.error(res.data.message);
              this.CheckAddSupplierIn();
              // this.GetSupplierInList03_2();
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消操作" });
        });
    },
    CheckAddSupplierIn() {
      this.$http.get("/BidCheckCenter/CheckAddSupplierIn", { params: { id: this.planId } }).then((res) => {
        if (res.data.success) {
          this.seebut = true;
        } else {
          this.seebut = false;
        }
      });
    },
    dropDownChange(e) {
      this.biaoDuan = e;
    },
    GetSupplierInviteList02() {
      this.$api.supIn.GetSupplierInList03({ planId: this.planId, submitIndex: this.activeName }).then((res) => {
        this.tableData = res;
      });
    },
    GetSectionDropDown02() {
      this.$api.supIn.GetSectionDropDown02({ planId: this.planId }).then((res) => {
        this.dropDown = res;
        if (res.length > 0) {
          this.biaoDuan = res[0].value;
        }
        // this.GetSupplierInList03_2();
      });
    },
    dropDownChange(e) {
      this.biaoDuan = e;
      // this.GetSupplierInList03_2();
    },
    // GetSupplierInList03_2() {
    //   this.$http.get("/LiandoSupplierIn/GetSupplierInList03_2", { params: { planId: this.planId } }).then(res => {
    //     this.tablebululist = res.data;
    //   });
    // },
    // GetSectionDropDown02() {
    //   this.$api.supIn.GetSectionDropDown02({ planId: this.planId }).then(res => {
    //     this.dropDown = res;
    //     if (res.length > 0) {
    //       this.biaoDuan = res[0].value;
    //     }
    //     this.GetSupplierInviteList02();
    //   });
    // },
    // handleClick(tab, event) {
    //   this.GetSupplierInviteList02();
    // },
    delete1(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.supIn.DeleteSupplierIn03({ id: row.id }).then((res) => {
            if (res.success) {
              this.$message.success(res.message);
              this.GetSupplierInviteList02();
              this.GetSupplierInList03_2();
            } else {
              this.$message.error(res.message);
              this.GetSupplierInviteList02();
              this.GetSupplierInList03_2();
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },

    test() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res) => {
        if (res.planId == "00000000-0000-0000-0000-000000000000") {
          this.$message.error("请先完善入围相关信息");
          this.x = true;
        } else {
          this.x = false;
        }
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
/* .fromborder {
    border: solid 1px #e6e6e6;
    padding: 12px 24px 12px 12px;
  } */
::v-deep .el-table__body-wrapper {
  z-index: 2;
}
</style>
