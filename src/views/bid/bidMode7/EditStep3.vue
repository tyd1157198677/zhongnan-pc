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
          <el-breadcrumb-item
            >邀请单位<span style="color: red; margin-left: 10px" v-if="msg2">({{ this.msg2 }})</span></el-breadcrumb-item
          >
        </el-breadcrumb>
        <statusList></statusList>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top: 10px">
          <el-tab-pane label="库内邀请" name="库内邀请"></el-tab-pane>
          <el-tab-pane label="库外寻源" name="库外寻源"></el-tab-pane>
          <el-tab-pane label="自主报名" name="自主报名"></el-tab-pane>
        </el-tabs>
        <el-select placeholder="请选择标段" @change="dropDownChange" v-model="biaoDuan">
          <el-option v-for="item in dropDown" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
        <el-button style="float: right; margin-left: 10px" v-if="seeshbut" type="primary" size="small" @click="SaveSupplierInDesc02"
          >保存备注</el-button
        >
        <el-button style="float: right" type="primary" v-if="seeshbut && showFlag" size="small" @click="add">添加供应商</el-button>

        <div style="margin-top: 10px">
          <div v-if="activeName == '自主报名'" style="float: right; color: red">供方通过招标公告报名的列表</div>
          <el-table
            empty-text="无符合条件的记录"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tableData"
            v-loading="loading"
            @selection-change="handleSelectionChange"
          >
            >
            <el-table-column type="selection" width="50" :selectable="checkboxInit" @selection-change="handleSelectionChange">
              <!-- <template slot-scope="scope">
                <span :disabled="scope.row.supplierStatus == '已入围' ? false : true"></span>
              </template> -->
            </el-table-column>
            <el-table-column type="index" width="50" label="序号" align="center" fixed> </el-table-column>
            <el-table-column prop="comFullName" align="left" min-width="250" label="供应商名称" fixed> </el-table-column>
            <!-- <el-table-column prop="comMainName" align="left" min-width="250" label="承接主体名称" fixed> </el-table-column> -->
            <el-table-column prop="supplierStatus" label="入围状态" align="center"> </el-table-column>
            <el-table-column label="备注" width="150" prop="supplierInDesc" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.supplierInDesc"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="资格预审" width="150" align="center">
              <template slot-scope="scope">
                <el-link
                  v-if="scope.row.haveQua"
                  type="primary"
                  style="color: #409eff; text-decoration: none"
                  @click="jumpSuppInfo1(scope.row)"
                >
                  {{ scope.row.quaMasterName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="考察" width="150" align="center">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  style="color: #409eff; text-decoration: none"
                  @click="jumpSuppInfo2(scope.row)"
                  v-if="scope.row.haveInves"
                >
                  {{ scope.row.invesMasterName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="背调" width="150" align="center">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  style="color: #409eff; text-decoration: none"
                  @click="jumpSuppInfo3(scope.row)"
                  v-if="scope.row.haveBack"
                >
                  {{ scope.row.backMasterName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <!--<i class="el-icon-delete" title="删除" @click="delete1(scope.row)" style="margin-right:10px" v-if="showButton"></i>-->
                <!--<i class="el-icon-s-promotion" title="发起资审" @click="zishen(scope.row)" style="margin-right:10px"></i>-->
                <!--<i class="el-icon-s-promotion" title="发起考察" @click="kaocha(scope.row)"></i>-->
                <el-dropdown style="width: 80px">
                  <span class="el-dropdown-link"> 选择操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <a
                        class="dropdown-item"
                        href="javascript:void(0)"
                        @click="delete1(scope.row)"
                        v-if="scope.row.supplierStatus != '已入围'"
                        >删除</a
                      >
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <a class="dropdown-item" href="javascript:void(0)" @click="zishen(scope.row)">发起资格预审</a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <a class="dropdown-item" href="javascript:void(0)" @click="kaocha(scope.row)">发起考察</a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <a class="dropdown-item" href="javascript:void(0)" @click="beidiao(scope.row)">发起背调</a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <a class="dropdown-item" href="javascript:void(0)" @click="zishen2(scope.row)">关联资格预审</a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <a class="dropdown-item" href="javascript:void(0)" @click="kaocha2(scope.row)">关联考察</a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <a class="dropdown-item" href="javascript:void(0)" @click="beidiao2(scope.row)">关联背调</a>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="float: left; color: red; margin-top: 15px">
          勾选入围单位并保存后，供应商进入左侧【入围单位】页签，在【入围单位页签】发起入围审批
        </div>
        <el-button type="primary" style="float: right; margin-top: 10px; margin-bottom: 10px" size="small" @click="add2" v-if="seeshbut"
          >保存入围单位</el-button
        >
      </el-col>
    </el-row>

    <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="60%">
      <div>
        <!--<font style="color: red;margin-left: 60px;">*</font>请选择标段-->
        <!--<el-select placeholder="请选择标段" v-model="biaoDuan2" style="margin-left: 60px;">-->
        <!--<el-option  v-for="item in dropDown" :key="item.value" :label="item.text" :value="item.value"></el-option>-->
        <!--</el-select>-->
        <supplier-list @itemClick="onSelectSups" />
      </div>
    </el-dialog>

    <el-dialog :visible.sync="flag1" title="发起考察" width="500px">
      <el-form ref="formgongfang" label-width="100px" :model="formgongfang">
        <el-row>
          <el-form-item label="考察主题" prop="masterName">
            <el-input
              v-model="formgongfang.masterName"
              placeholder="针对我司哪个城市项目哪个分部分项工程组织进行的现场考察，如**城市**地区**期区/批次**工程"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="供应商名称">
            <el-input v-model="name" disabled>
              <!--<el-button slot="append" icon="el-icon-search" @click="flag2 = true"></el-button>-->
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="招标层级">
            <el-select v-model="bidLevel">
              <el-option label="集团" value="集团"></el-option>
              <el-option label="项目" value="项目"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="考察表类型" prop="type">
            <el-select v-model="formgongfang.type">
              <el-option
                v-for="item in bidLevel == '集团' ? investTypes : investTypes1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="right">
          <el-form-item>
            <el-button type="primary" size="small" @click="save1">保存</el-button>
            <el-button size="small" @click="flag1 = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="flag" title="发起背调" width="500px">
      <el-form ref="formgongfangbeidiao" label-width="100px" :model="formgongfangbeidiao" :rules="rules">
        <el-row>
          <el-form-item label="背调主题" prop="bdmasterName">
            <el-input v-model="bdmasterName" placeholder="如：XX项目背调"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="供应商名称" prop="bdname">
            <el-input v-model="bdname" disabled>
              <el-button slot="append" icon="el-icon-search" @click="flag2 = true"></el-button>
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="招标层级">
            <el-select v-model="bdbidLevel">
              <el-option label="集团" value="集团"></el-option>
              <el-option label="项目" value="项目"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <!-- <el-row>
          <el-form-item label="招标层级">
            <el-select v-model="bidLevel">
              <el-option label="集团" value="集团"></el-option>
              <el-option label="项目" value="项目"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="考察表类型" prop="type">
            <el-select v-model="formgongfang.type">
              <el-option
                v-for="item in bidLevel == '集团' ? investTypes : investTypes1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row> -->
        <el-row class="right">
          <el-form-item>
            <el-button type="primary" size="small" @click="save3">保存</el-button>
            <el-button size="small" @click="flag = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog width="40%" title="发起资格预审" :visible.sync="dialogVisible2">
      <!--<el-button slot="append" icon="el-icon-search" @click="selectSupVisible = true"></el-button>-->
      <el-row>
        <el-form ref="formgongfang2" label-width="130px">
          <el-row>
            <el-form-item label="资格预审主题">
              <el-input
                show-word-limit
                v-model="zhuTi"
                placeholder="针对我司哪个城市项目哪个分部分项工程组织进行的资格预审，如**城市**地区**期区/批次**工程"
                style="margin-bottom: 10px"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="供应商名称">
              <el-input v-model="name" disabled> </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="类型" prop="type">
              <el-select v-model="leixing">
                <el-option v-for="item in investTypess" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
        <el-col :span="24">
          <div class="float-right" style="margin-top: 10px">
            <el-button type="primary" :loading="loading" @click="save2">保存</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog width="50%" :title="title3" :visible.sync="dialogVisible3">
      <el-form ref="form2" size="small" label-width="150px" class="mt-2">
        <el-form-item :label="title3 == '关联资格预审' ? '请选择资格预审' : title3 == '关联考察' ? '请选择考察' : '请选择背调'">
          <el-select v-model="selectId" placeholder="请选择">
            <el-option v-for="item in selects" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
          <el-form-item>
            <el-button type="primary" style="float: right" size="small" @click="onSubmit3">关联</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
import PlanMenu from "../components/PlanMenuDemoru.vue";
import SupplierList from "@/components/SupplierList";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step3",
  components: { PlanMenu, SupplierList, showplanMenu, statusList: () => import("@/components/statusList.vue") },
  data() {
    return {
      selectId: "",
      selects: [],
      tablerizhi: [],
      dialogVisible3: false,
      title3: "",
      bidLevel: "集团", //招标层级
      leixing: "",
      investTypess: [
        { label: "总包资格预审", value: "资格预审_总包" },
        { label: "电力资格预审", value: "资格预审_电力" },
        { label: "精装资格预审", value: "资格预审_精装" },
        { label: "门窗资格预审", value: "资格预审_门窗" },
        { label: "幕墙资格预审", value: "资格预审_幕墙" },
        { label: "市政资格预审", value: "资格预审_市政" },
        { label: "消防资格预审", value: "资格预审_消防" },
        { label: "桩基资格预审", value: "资格预审_桩基" },
      ],
      showFlag: true,
      biaoDuan2: "",
      // planId: "",
      biaoDuan: "",
      seeshbut: false,
      dropDown: [],
      activeName: "库内邀请",
      selectSupVisible: false,
      tableData: [],
      form: {},
      tableIdList: [],
      loading: false,
      x: true,
      multipleSelection: [],
      showButton: true,
      rules: {
        masterName: [{ required: true, message: "请输入背调主题", trigger: "blur" }],
        name: [{ required: true, message: "请选择供应商", trigger: "blur" }],
      },
      formgongfang: {
        masterName: "",
        supGuid: "",
        planId: "",
        name: "",
        type: "",
        bidLevel: "",
      },
      bdname: "",
      bdbidLevel: "",
      bdmasterName: "",
      formgongfangbeidiao: {
        masterName: "",
        name: "",
        bidLevel: "",
      },
      flag1: false,
      flag: false,
      name: "",
      zhuTi: "",
      backId: "",
      supplierGuid: "",
      dialogVisible2: false,
      msg2: "",
      flag2: true,
      rowObj: {},
      investTypes: [
        { label: "总包考察评审表", value: "供方考察_总包" },
        { label: "电力考察评审表", value: "供方考察_电力" },
        { label: "精装考察评审表", value: "供方考察_精装" },
        { label: "门窗考察评审表", value: "供方考察_门窗" },
        { label: "幕墙考察评审表", value: "供方考察_幕墙" },
        { label: "市政考察评审表", value: "供方考察_市政" },
        { label: "消防考察评审表", value: "供方考察_消防" },
        { label: "桩基考察评审表", value: "供方考察_桩基" },
      ],
      investTypes1: [
        { label: "材料设备考察评审表", value: "项目招标考察_材料设备" },
        { label: "监理考察评审表", value: "项目招标考察_监理" },
        { label: "景观考察评审表", value: "项目招标考察_景观" },
        { label: "设计考察评审表", value: "项目招标考察_设计" },
      ],
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
    this.GetSectionDropDown02();

    this.$api.supIn.CheckCanEdit({ planId: this.planId }).then((res) => {
      if (!res.success) {
        this.showButton = false;
        // this.openM(res.message);
        // this.$message.error(res.message);
      }

      this.$api.supIn.CheckCanInviteSupplier41({ planId: this.planId }).then((res) => {
        if (!res.success) {
          this.showButton = false;
          this.seeshbut = false;
          this.flag2 = false;
        } else {
          this.seeshbut = true;
        }
        this.msg2 = res.message;
      });
    });
  },
  mounted() {},
  methods: {
    //关联
    onSubmit3() {
      let title3 = this.title3;
      let url =
        title3 == "关联资格预审"
          ? "/LiandoSupplierIn/SaveSelectedQua"
          : title3 == "关联考察"
          ? "/LiandoSupplierIn/SaveSelectedInves"
          : "/LiandoSupplierIn/SaveSelectedBack";
      this.$http.post(url, { planId: this.planId, dropDownValue: this.selectId }).then((res) => {
        if (res.data.success) {
          this.dialogVisible3 = false;
          this.$message.success(res.data.message);
          this.GetSupplierInviteList02();
          if (title3 == "关联考察") {
            this.jumpSuppInfo(this.rowObj);
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getPath(type) {
      let path = "";
      switch (type) {
        case "供方考察_总包":
          path = "zongbao";
          break;
        case "供方考察_电力":
          path = "dianli";
          break;
        case "供方考察_精装":
          path = "jingzhuang";
          break;
        case "供方考察_门窗":
          path = "menchuang";
          break;
        case "供方考察_幕墙":
          path = "muqiang";
          break;
        case "供方考察_市政":
          path = "shizheng";
          break;
        case "供方考察_消防":
          path = "xiaofang";
          break;
        case "供方考察_桩基":
          path = "zhuangji";
          break;
        case "项目招标考察_材料设备":
          path = "fileShebei";
          break;
        case "项目招标考察_监理":
          path = "jianli";
          break;
        case "项目招标考察_景观":
          path = "jingguan";
          break;
        case "项目招标考察_设计":
          path = "sheji";
          break;
        default:
          // 没有类型，可能是以前的旧数据，暂时跳转到总包页
          path = "zongbao";
          break;
      }
      return path;
    },
    jumpSuppInfo(row) {
      let path = this.getPath(row.invesMasterType);
      this.$router.push({
        path: `/invest/${path}/details`,
        query: {
          id: this.selectId,
          supGuid: this.rowObj.supplierId,
          type: 2, // 1:编辑，2：详情
          show: 1,
        },
      });
    },
    //关联资格预审
    zishen2(row) {
      this.selectId = "";
      this.$api.supIn.GetSupplierQua({ supplierId: row.supplierId }).then((res1) => {
        if (res1.length == 0) {
          this.$message.error("未找到当前供应商的历史资格预审记录");
          // this.openM();
        } else {
          this.selects = res1;
          this.dialogVisible3 = true;
          this.title3 = "关联资格预审";
        }
      });
    },
    //关联考察
    kaocha2(row) {
      this.selectId = "";
      this.rowObj = {};
      this.$api.supIn.GetSupplierInves({ supplierId: row.supplierId }).then((res1) => {
        if (res1.length == 0) {
          // this.openM("未找到当前供应商的历史考察记录");
          this.$message.error("未找到当前供应商的历史资格预审记录");
        } else {
          this.selects = res1;
          this.selectId = row.invesId;
          this.dialogVisible3 = true;
          this.title3 = "关联考察";
          this.rowObj = row;
          console.log(this.rowObj);
        }
      });
    },
    beidiao2(row) {
      this.selectId = "";
      this.$http.get("/LiandoSupplierIn/GetSupplierBack?supplierId=" + row.supplierId).then((res1) => {
        if (res1.data.result.length == 0) {
          this.$message.error("未找到当前供应商的历史资格预审记录");
        } else {
          this.selects = res1.data.result;
          this.dialogVisible3 = true;
          this.title3 = "关联背调";
        }
      });
    },
    jumpSuppInfo1(row) {
      // window.open("/#/quality/qualitylistEdit?id=" + row.quaId + "&type=2");
      let path = "";
      switch (row.quaMasterType) {
        case "资格预审_总包":
          path = "zongbao";
          break;
        case "资格预审_电力":
          path = "dianli";
          break;
        case "资格预审_精装":
          path = "jingzhuang";
          break;
        case "资格预审_门窗":
          path = "menchuang";
          break;
        case "资格预审_幕墙":
          path = "muqiang";
          break;
        case "资格预审_市政":
          path = "shizheng";
          break;
        case "资格预审_消防":
          path = "xiaofang";
          break;
        case "资格预审_桩基":
          path = "zhuangji";
          break;
        default:
          // 没有类型，可能是以前的旧数据，暂时跳转到总包页
          path = "zongbao";
          break;
      }
      window.open(`/#/quality/${path}/details?id=` + row.quaId + "&type=2");
      // this.$router.push({
      //   path: `/quality/${path}/details`,
      //   query: {
      //     id: row.id,
      //     type: 2, // 1:编辑，2：详情
      //   },
      // });
    },
    jumpSuppInfo2(row) {
      // window.open("/#/invest/showInvest?id=" + row.invesId + "&supGuid=" + row.supplierId);
      // let path = this.getPath(row.type);
      let path = "";
      switch (row.invesMasterType) {
        case "供方考察_总包":
          path = "zongbao";
          break;
        case "供方考察_电力":
          path = "dianli";
          break;
        case "供方考察_精装":
          path = "jingzhuang";
          break;
        case "供方考察_门窗":
          path = "menchuang";
          break;
        case "供方考察_幕墙":
          path = "muqiang";
          break;
        case "供方考察_市政":
          path = "shizheng";
          break;
        case "供方考察_消防":
          path = "xiaofang";
          break;
        case "供方考察_桩基":
          path = "zhuangji";
          break;
        case "项目招标考察_材料设备":
          path = "fileShebei";
          break;
        case "项目招标考察_监理":
          path = "jianli";
          break;
        case "项目招标考察_景观":
          path = "jingguan";
          break;
        case "项目招标考察_设计":
          path = "sheji";
          break;
        default:
          // 没有类型，可能是以前的旧数据，暂时跳转到总包页
          path = "zongbao";
          break;
      }
      window.open(`/#/invest/${path}/details?id=` + row.invesId + "&supGuid=" + row.supplierId + "&type=2" + "&show=1");
      // this.$router.push({
      //   path: `/invest/${path}/details`,
      //   query: {
      //     id: row.id,
      //     supGuid: row.supGuid,
      //     type: 2, // 1:编辑，2：详情
      //   },
      // });
    },
    jumpSuppInfo3(row) {
      // window.open("/#/supplier/backGroundEdit?id=" + row.invesId + "&name=" + row.comMainName + "&type=2");
      if (row.backbidLevel == "项目") {
        window.open(`/#/supplier/backGroundEdit1?id=` + row.backId + "&name=" + row.comMainName + "&type=2");
      } else {
        window.open(`/#/supplier/backgroundJiTuanEdit1?id=` + row.backId + "&name=" + row.comMainName + "&type=2");
      }
      //  this.$router.push({
      //   path: row.backbidLevel == "项目" ? "/supplier/backGroundEdit" : "/supplier/backgroundJiTuanEdit",
      //   query: { id: row.id, type: 2, name: row.comMainName },
      // });
    },
    save2() {
      if (this.zhuTi == "") {
        this.$message.warning("请输入主题");
        return;
      } else if (this.leixing == "") {
        this.$message.warning("请选择类型");
        return;
      } else {
        let path = "";
        switch (this.leixing) {
          case "资格预审_总包":
            path = "zongbao";
            break;
          case "资格预审_电力":
            path = "dianli";
            break;
          case "资格预审_精装":
            path = "jingzhuang";
            break;
          case "资格预审_门窗":
            path = "menchuang";
            break;
          case "资格预审_幕墙":
            path = "muqiang";
            break;
          case "资格预审_市政":
            path = "shizheng";
            break;
          case "资格预审_消防":
            path = "xiaofang";
            break;
          case "资格预审_桩基":
            path = "zhuangji";
            break;
          default:
            // 没有类型，可能是以前的旧数据，暂时跳转到总包页
            path = "zongbao";
            break;
        }
        this.$http
          .post("/SupQua/CreateSupplierQuaMaster", {
            masterName: this.zhuTi,
            supplierGuid: this.supplierGuid,
            planId: this.planId,
            type: this.leixing,
          })
          .then((res) => {
            if (res.data.success) {
              this.dialogVisible2 = false;
              this.$message.success(res.data.message);
              // this.$router.push({
              //   path: "/quality/qualitylistEdit",
              //   query: {
              //     id: res.data.returnValue1,
              //     type: 1,
              //   },
              // });
              // this.$router.push({
              //   path: `/quality/${path}/edit`,
              //   query: {
              //     id: res.data.returnValue1,
              //     type: 1, // 1:编辑，2：详情
              //   },
              // });
              window.open(`/#/quality/${path}/edit?id=` + res.data.returnValue1 + "&type=1");
            } else {
              this.$message.warning(res.data.message);
            }
          });
      }
    },
    beidiao(row) {
      this.supplierGuid = row.supplierId;
      this.bdname = row.comFullName;
      // this.backId = row.backId;
      console.log(this.backId);
      this.zhuTi = "";
      this.flag = true;
    },
    save3() {
      this.$refs["formgongfangbeidiao"].validate((valid) => {
        if (valid) {
          let obj = {
            supId: this.supplierGuid,
            title: this.bdname,
            bidLevel: this.bdbidLevel,
            planId: this.planId,
          };
          this.$http.post("/BackGroundResultAppServices/StartBackGround", obj).then((res) => {
            if (res.data.success) {
              this.flag = false;
              this.$message.success(res.data.message);
              this.GetSupplierInviteList02();
              // this.backIds = this.backId;
              // this.backId = this.tableData.map(v => v.backId);
              // this.backId = this.tableData.backId;
              if (this.bdbidLevel == "项目") {
                // console.log(this.backIds);
                window.open(`/#/supplier/backGroundEdit1?id=` + res.data.returnValue1 + "&name=" + this.bdname + "&type=1");
              } else {
                window.open(`/#/supplier/backgroundJiTuanEdit1?id=` + res.data.returnValue1 + "&name=" + this.bdname + "&type=1");
              }
              this.bdmasterName = "";
              this.bdbidLevel = "";
              // #/supplier/backGroundEdit?id=128cd66f-11a4-453b-4c86-08d95bce3bdc&type=1&name=石家庄一
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    zishen(row) {
      this.supplierGuid = row.supplierId;
      this.zhuTi = "";
      this.leixing = "";
      this.name = row.comFullName;
      this.dialogVisible2 = true;
    },
    save1() {
      this.formgongfang.planId = this.planId;
      this.formgongfang.name = this.name;
      // let path = this.getPath(this.formgongfang.type);
      this.$api.invest.CreateInvesMaster(this.formgongfang).then((res) => {
        if (res.success) {
          this.flag1 = false;
          let path = "";
          switch (this.formgongfang.type) {
            case "供方考察_总包":
              path = "zongbao";
              break;
            case "供方考察_电力":
              path = "dianli";
              break;
            case "供方考察_精装":
              path = "jingzhuang";
              break;
            case "供方考察_门窗":
              path = "menchuang";
              break;
            case "供方考察_幕墙":
              path = "muqiang";
              break;
            case "供方考察_市政":
              path = "shizheng";
              break;
            case "供方考察_消防":
              path = "xiaofang";
              break;
            case "供方考察_桩基":
              path = "zhuangji";
              break;
            case "项目招标考察_材料设备":
              path = "fileShebei";
              break;
            case "项目招标考察_监理":
              path = "jianli";
              break;
            case "项目招标考察_景观":
              path = "jingguan";
              break;
            case "项目招标考察_设计":
              path = "sheji";
              break;
            default:
              // 没有类型，可能是以前的旧数据，暂时跳转到总包页
              path = "zongbao";
              break;
          }
          window.open(`/#/invest/${path}/edit?id=` + res.returnValue1 + "&supGuid=" + this.formgongfang.supGuid + "&type=1");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    kaocha(row) {
      this.formgongfang.masterName = "";
      this.formgongfang.planId = this.planId;
      this.formgongfang.supGuid = row.supplierId;
      this.name = row.comFullName;
      this.flag1 = true;
    },
    SaveSupplierInDesc02() {
      var a = [];
      for (var i = 0; i < this.tableData.length; i++) {
        var m = {};
        m.id = this.tableData[i].id;
        m.supplierDesc = this.tableData[i].supplierInDesc;
        a.push(m);
      }
      this.$api.supIn.SaveSupplierInDesc02(a).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
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
    checkboxInit(row, index) {
      if (row.canSelect == false) {
        return 0;
      } else {
        return 1;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onDelete(row) {
      this.$message.error("建设中");
    },
    add2() {
      this.$confirm("确定要将所选单位入围吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res1) => {
            if (res1.planId == "00000000-0000-0000-0000-000000000000") {
              this.$message.error("请先完善入围相关信息");
            } else {
              var ids = [];
              for (var i = 0; i < this.multipleSelection.length; i++) {
                ids.push(this.multipleSelection[i].id);
              }
              var forms = { planId: this.planId, ids: ids };
              this.$api.supIn.SaveSupplierIn02(forms).then((res) => {
                if (res.success) {
                  this.$message.success(res.message);
                  this.GetSupplierInviteList02();
                } else {
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
    dropDownChange(e) {
      this.biaoDuan = e;
      this.GetSupplierInviteList02();
    },
    GetSupplierInviteList02() {
      this.$api.supIn
        .GetSupplierInviteList02({ planId: this.planId, signUpType: this.activeName, sectionId: this.biaoDuan })
        .then((res) => {
          this.tableData = res;
          // this.backIds = res.map(v => v.backId).join();
        });
    },
    GetSectionDropDown02() {
      this.$api.supIn.GetSectionDropDown02({ planId: this.planId }).then((res) => {
        this.dropDown = res;
        if (res.length > 0) {
          this.biaoDuan = res[0].value;
        }
        this.GetSupplierInviteList02();
      });
    },
    handleClick(tab, event) {
      this.GetSupplierInviteList02();
      if (tab.label == "自主报名") {
        this.showFlag = false;
      } else {
        this.showFlag = true;
      }
    },
    add() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res) => {
        if (res.planId == "00000000-0000-0000-0000-000000000000") {
          this.$message.error("请先完善入围相关信息");
        } else {
          this.selectSupVisible = true;
          this.biaoDuan2 = "";
        }
      });
    },
    delete1(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.supIn.DeleteSupplierInvite02({ id: row.id }).then((res) => {
            if (res.success) {
              this.$message.success(res.message);
              this.GetSupplierInviteList02();
            } else {
              this.$message.error(res.message);
              this.GetSupplierInviteList02();
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    onSelectSups(sup) {
      var forms = { planId: this.planId, bidSignUpType: this.activeName, sectionId: this.biaoDuan, supplierId: sup.id };
      this.$api.supIn.SaveSupplier02(forms).then((res) => {
        if (res.success) {
          this.$message.success(res.message);
          this.GetSupplierInviteList02();
        } else {
          this.$message.error(res.message);
        }
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
