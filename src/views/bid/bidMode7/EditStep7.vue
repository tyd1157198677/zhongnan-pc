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
            >招标公告<span style="color: red; margin-left: 10px" v-if="msg2">({{ this.msg2 }})</span></el-breadcrumb-item
          >
        </el-breadcrumb>
        <statusList></statusList>
        <el-form :model="form" size="small" label-position="right" label-width="auto" ref="form" class="mt-2">
          <div class="fromborder">
            <el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="是否发布公告" prop="isShow">
                    <el-radio-group v-model="form.isShow" @change="change2($event)" v-if="this.showButton">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                    <el-radio-group v-model="form.isShow" @change="change2($event)" v-else>
                      <el-radio disabled :label="true">是</el-radio>
                      <el-radio disabled :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="报名截止时间" prop="signUpEndDate" v-if="this.showButton">
                    <el-date-picker
                      type="datetime"
                      v-model="form.signUpEndDate"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择时间"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="报名截止时间" prop="signUpEndDate" v-else>
                    <el-date-picker
                      disabled
                      type="datetime"
                      v-model="form.signUpEndDate"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择时间"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>

                <!--<el-col :span="8">-->
                <!--<el-form-item label="公告显示模式" prop="showType" required="true">-->
                <!--<el-select placeholder="请选择标段" v-model="form.showType">-->
                <!--<el-option  v-for="item in dropDown" :key="item" :label="item" :value="item"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--</el-col>-->

                <el-col :span="12">
                  <el-form-item label="公告开始显示日期" prop="showDate" class="fm-full-line" v-if="this.showButton">
                    <el-date-picker
                      type="date"
                      v-model="form.showDate"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      placeholder="选择时间"
                    ></el-date-picker>
                    <!--<el-select placeholder="请选择标段" v-model="isShow">-->
                    <!--<el-option lable="是" value="是" ></el-option>-->
                    <!--<el-option lable="否" value="否" ></el-option>-->
                    <!--</el-select>-->
                  </el-form-item>
                  <el-form-item label="公告开始显示日期" prop="showDate" class="fm-full-line" v-else>
                    <el-date-picker
                      disabled
                      type="date"
                      v-model="form.showDate"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      placeholder="选择时间"
                    ></el-date-picker>
                    <!--<el-select placeholder="请选择标段" v-model="isShow">-->
                    <!--<el-option lable="是" value="是" ></el-option>-->
                    <!--<el-option lable="否" value="否" ></el-option>-->
                    <!--</el-select>-->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-col :span="24">
                <el-form-item label="公告标题" prop="noticeTitle" class="fm-full-line" v-if="this.showButton">
                  <el-input v-model="form.noticeTitle" placeholder="请输入公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告标题" prop="noticeTitle" class="fm-full-line" v-else>
                  <el-input disabled v-model="form.noticeTitle" placeholder="请输入公告标题"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>

        <div class="table-top-title" style="margin-top: 10px">招标内容</div>
        <div id="demo1"></div>

        <div class="table-top-title" style="margin-top: 10px">入围标准</div>
        <div id="demo2"></div>

        <div class="table-top-title" style="margin-top: 10px">报名联系人</div>
        <table class="layui-table el-table__body" style="border: solid 1px #c9d8db">
          <tbody>
            <tr>
              <td style="width: 20%" class="left">联系人姓名</td>
              <td style="width: 30%">
                <el-input v-model="form.personName" v-if="this.showButton"></el-input>
                <el-input v-model="form.personName" v-else disabled></el-input>
              </td>

              <td style="width: 20%" class="left">座机号</td>
              <td style="width: 30%">
                <el-input v-model="form.phone" v-if="this.showButton"></el-input>
                <el-input v-model="form.phone" v-else disabled></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 20%" class="left">手机号</td>
              <td style="width: 30%">
                <el-input v-model="form.mobilePhone" v-if="this.showButton"></el-input>
                <el-input v-model="form.mobilePhone" v-else disabled></el-input>
              </td>

              <td style="width: 20%" class="left">邮箱</td>
              <td style="width: 30%">
                <el-input v-model="form.personEmail" v-if="this.showButton"></el-input>
                <el-input v-model="form.personEmail" v-else disabled></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 20%" class="left">地址</td>
              <td style="width: 30%" colspan="3">
                <el-input v-model="form.contactAddress" style="width: 100%" v-if="this.showButton"></el-input>
                <el-input v-model="form.contactAddress" v-else disabled style="width: 100%"></el-input>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="table-top-title" style="margin-top: 10px">报名提交材料</div>
        <div id="demo3"></div>
        <el-button type="primary" class="buttoncss" size="small" @click="saveForm1" v-if="this.showButton">保存</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
/**
 * 招标采购-招标公告
 */
import PlanMenu from "../components/PlanMenuDemoru.vue";
import wangEditor from "wangeditor";
import $ from "jquery";
import showplanMenu from "../components/showplanMenu.vue";
export default {
  name: "Step2",
  components: { PlanMenu, showplanMenu, statusList: () => import("@/components/statusList.vue") },
  data() {
    return {
      tablerizhi: [],
      isShow: "",
      editor: null,
      editorData: "",
      editor2: null,
      editorData2: "",
      editor3: null,
      editorData3: "",
      form: {
        planId: "",
        signUpEndDate: "",
        showType: "",
        noticeTitle: "",
        showDate: "",
        personName: "",
        mobilePhone: "",
        phone: "",
        personEmail: "",
        contactAddress: "",
        isShow: null,
      },
      // planId: "",
      dropDown: {},
      temp: {},
      x: true,
      showButton: true,
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

    this.$api.supIn.CheckCanEdit({ planId: this.planId }).then((res) => {
      if (!res.success) {
        this.showButton = false;
        // this.$message.error(res.message);
        // this.openM(res.message);
      }

      this.$api.supIn.CheckCanEditNotice41({ planId: this.planId }).then((res) => {
        if (!res.success) {
          this.showButton = false;
          this.flag2 = false;
        }
        this.msg2 = res.message;
      });
    });
  },
  mounted() {
    this.GetNoticeShowTypeDropDown05();
    this.GetNoticeByPlanId05();
    this.create1();
    this.create2();
    this.create3();
    $(".w-e-toolbar").css("z-index", 1000);
    $(".w-e-text-container").css("z-index", 1000);
    $(".w-e-text").css("min-height", "200px");
    $(".w-e-text-container").css("height", "200px");
  },
  methods: {
    change2(val) {
      this.$api.supIn.SaveShowNotice({ planId: this.planId, isShow: val }).then((res) => {
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
    saveForm1() {
      this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then((res1) => {
        if (res1.planId == "00000000-0000-0000-0000-000000000000") {
          this.$message.error("请先完善入围相关信息");
        } else {
          if (!this.form.showDate || !this.form.noticeTitle || !this.form.signUpEndDate) {
            this.$message.error("请将必填项填写完整");
            return;
          }
          if (this.form.mobilePhone) {
            if (this.form.mobilePhone.length != 11) {
              this.$message.error("手机号为11位");
              return;
            }
          }
          this.form.planId = this.planId;
          this.form.liandoContent = this.editor.txt.html();
          this.form.liandoRequire = this.editor2.txt.html();
          this.form.requireFile = this.editor3.txt.html();
          this.$api.supIn.SaveLiandoNotice05(this.form).then((res) => {
            if (res.success) {
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    GetNoticeByPlanId05() {
      this.$api.supIn.GetNoticeByPlanId05({ planId: this.planId }).then((res) => {
        if (res.planId != "00000000-0000-0000-0000-000000000000") {
          this.form = res;
          this.editor.txt.html(this.form.liandoContent);
          this.editor2.txt.html(this.form.liandoRequire);
          this.editor3.txt.html(this.form.requireFile);
          if (this.form.isShow) {
            this.isShow = "是";
          } else {
            this.isShow = "否";
          }
        } else {
          this.form.noticeTitle = res.noticeTitle;
          this.form.showDate = res.showDate;
          this.GetNoticeTemplet05();
        }
      });
    },
    GetNoticeShowTypeDropDown05() {
      this.$api.supIn.GetNoticeShowTypeDropDown05().then((res) => {
        this.dropDown = res;
      });
    },
    GetNoticeTemplet05() {
      this.$api.supIn.GetNoticeTemplet05({ planId: this.planId }).then((res) => {
        this.addHtml(res);
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
    // test() {
    //   this.$api.supIn.GetMasterByPlanId01({ planId: this.planId }).then(res => {
    //     if (res.planId == "00000000-0000-0000-0000-000000000000") {
    //       this.$message.error("请先完善入围相关信息");
    //       this.x = true;
    //     } else {
    //       this.x = false;
    //     }
    //   });
    // },
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
  margin-top: 10px;
}
.fromborder {
  border: solid 1px #c9d8db;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}

.el-input {
  width: 200px;
}

.el-form-item {
  margin-bottom: 10px;
}

.el-form-item__error {
  top: auto;
}

.fm-textarea {
  width: 100%;
}

.fm-textarea .el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  width: 80%;
}
.fm-full-line {
  width: 100%;
}
.fm-full-line .el-input {
  width: 100%;
}
.fm-full-line .el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  width: 80%;
}
::v-deep .el-form-item__error {
  position: initial;
}
</style>
