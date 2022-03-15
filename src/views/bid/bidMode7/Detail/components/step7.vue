<template>
  <div>
    <table class="layui-table el-table__body" style="margin-bottom: 10px">
      <tbody>
        <tr>
          <td style="width: 20%" class="right">报名截止时间：</td>
          <td style="width: 30%">
            {{ this.form.signUpEndDate }}
          </td>
          <td style="width: 20%" class="right">公告开始显示日期：</td>
          <td style="width: 30%">
            {{ this.form.showDate }}
          </td>
        </tr>
        <tr>
          <td style="width: 20%" class="right">公告标题：</td>
          <td style="width: 30%" colspan="3">
            {{ this.form.noticeTitle }}
          </td>
        </tr>
      </tbody>
    </table>

    <font style="font-size: 15px">招标内容</font>
    <div id="demo1" style="margin-bottom: 10px"></div>

    <font style="font-size: 15px">入围标准</font>
    <div id="demo2" style="margin-bottom: 10px"></div>

    <font style="font-size: 15px">报名联系人</font>
    <table class="layui-table el-table__body" style="border: solid 1px #c9d8db; margin-bottom: 10px">
      <tbody>
        <tr>
          <td style="width: 20%" class="left">联系人姓名</td>
          <td style="width: 30%">{{ this.form.personName }}</td>

          <td style="width: 20%" class="left">座机号</td>
          <td style="width: 30%">{{ this.form.phone }}</td>
        </tr>
        <tr>
          <td style="width: 20%" class="left">手机号</td>
          <td style="width: 30%">{{ this.form.mobilePhone }}</td>

          <td style="width: 20%" class="left">邮箱</td>
          <td style="width: 30%">{{ this.form.personEmail }}</td>
        </tr>
        <tr>
          <td style="width: 20%" class="left">地址</td>
          <td style="width: 30%">{{ this.form.contactAddress }}</td>
        </tr>
      </tbody>
    </table>

    <font style="font-size: 15px">报名提交材料</font>
    <div id="demo3"></div>
  </div>
</template>

<script>
/**
 * 招标采购-招标公告
 */
import wangEditor from "wangeditor";
import $ from "jquery";

export default {
  name: "Step2",
  data() {
    return {
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
        isShow: true,
        personName: "",
        mobilePhone: "",
        phone: "",
        personEmail: "",
        contactAddress: "",
      },
      planId: "",
      dropDown: {},
      temp: {},
      x: true,
    };
  },
  created: function () {
    this.planId = this.$route.query.id;
    this.GetNoticeShowTypeDropDown05();
    this.GetNoticeByPlanId05();
  },
  mounted() {
    this.create1();
    this.create2();
    this.create3();
    $(".w-e-toolbar").css("z-index", 1000);
    $(".w-e-text-container").css("z-index", 1000);
    $(".w-e-text").css("min-height", "200px");
    $(".w-e-text-container").css("height", "200px");
  },
  methods: {
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
      this.test();
      if (this.x) {
        return;
      }
      if (!this.show1 || !this.form.noticeTitle || !this.form.showType || !this.form.signUpEndDate) {
        this.$message.error("请将必填项填写完整");
        return;
      }
      if ((this.isShow = "是")) {
        this.form.isShow = true;
      } else {
        this.form.isShow = false;
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
      this.$api.supIn.GetNoticeTemplet05().then((res) => {
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
