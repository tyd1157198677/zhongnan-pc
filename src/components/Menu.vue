<template>
  <div>
    <el-row class="row">
      <div class="nav1">
        <el-col :span="24" class="pl-1 pr-1" style="width: 95%; margin: 0 auto; float: none">
          <div class="nav-lf">
            <img class="img" src="@/assets/logofff.png" height="40" width="90" />
            <div class="lines">|</div>
            <div v-for="item in registerMenu" :key="item.index" class="nva-list" :class="{ active: item.name == activeFirst }">
              <a @click="firstMenuClick(item.index, item.pid)">{{ item.name }}</a>
            </div>
          </div>
          <div class="infor">
            <div class="nav-rt">
              <el-button
                icon="el-icon-download"
                circle
                size="mini"
                style="margin-right: 20px"
                title="查看操作手册"
                @click="showfujian"
              ></el-button>
              <!-- <el-link
                type="primary"
                style="color: #fff; margin-right: 20px; font-size: 14px; display: inline-block"
                class="el-icon-download"
                >操作手册</el-link
              > -->
              <!-- <span class="el-icon-download" style="color: #fff; margin-right: 20px" title="下载操作手册"></span> -->
              <el-dropdown>
                <span class="el-dropdown-link" style="color: #fff; font-size: 16px">
                  {{ userName }}<i class="el-icon-caret-bottom el-icon--right" style="color: #fff"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center; margin-top: 0px">
                  <div @click="changePsd" style="cursor: pointer">修改密码</div>
                  <div @click="loginOut" style="cursor: pointer">退出系统</div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row class="row">
      <el-col :span="24">
        <div class="navtwo navtwo-a">
          <ul>
            <li v-for="menu in subMenu" :key="menu.index" :index="menu.index" :class="{ active: menu.index == activeSub }">
              <a @click="firstMenuClick(menu.index, menu.pid)">{{ menu.name }}</a>
              <!--              <template v-if="index != subMenu.length - 1"> |</template>-->
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="userForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-col :span="24">
          <el-form-item prop="oldPassword" label="旧密码">
            <el-input v-model="userForm.oldPassword" type="password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="newPassword" label="新密码">
            <el-input v-model="userForm.newPassword" type="password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="resPassWord" label="请再次输入">
            <el-input v-model="userForm.resPassWord" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 合同信息
 */
import { mapState, mapMutations } from "vuex";
import bus from "@/util/bus";
export default {
  inject: ["reload"],
  data() {
    return {
      subMenu: [],
      activeFirst: "",
      activeSub: "",
      dialogFormVisible: false,
      userForm: {
        oldPassword: "",
        newPassword: "",
        baseGuid: "",
        resPassWord: "",
        yzm: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 20, message: "长度不超过20个字", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 20, message: "长度不超过20个字", trigger: "blur" },
        ],
        resPassWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 20, message: "长度不超过20个字", trigger: "blur" },
          { validator: this.yizhi, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapState("menu", { registerMenu: "menus", oriMenus: "oriMenus" }),
    ...mapState({
      userName: "userName",
    }),
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        // if (to.path.indexOf("/user/todoList") != -1) {
        let currRouteId = this.$route.path;

        const m = this.oriMenus.find((x) => x.menuUrl.indexOf(currRouteId) > -1) || this.oriMenus[0];
        // console.log(m);
        this.renderColor(m.id, m.parentId);
      }
    },
  },
  mounted() {
    this.reload();
    let currRouteId = this.$route.path;
    const m = this.oriMenus.find((x) => x.menuUrl.indexOf(currRouteId) > -1) || this.oriMenus[0];
    this.renderColor(m.id, m.parentId);
    // this.$http
    //   .get(
    //     "/SysTodo/GetPcUrlByTodoId?todoId=" + "ae346e0b3db1317a84c3a46eec91b00a"
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
  methods: {
    //registerMenu:一级航数组
    //menu:二级导航数组
    renderColor(id, pid) {
      bus.$on("changeSub", (val, val1) => {
        //取  Bus.$on
        this.activeSub = val;
      });
      let menu = this.registerMenu.find((x) => x.index == id);
      let path = this.$route.path;
      let subMenu;
      if (!menu) {
        menu = this.registerMenu.find((x) => x.index == pid);
        subMenu = menu.subMenus.find((x) => x.index == id);
      }
      if (menu.subMenus && menu.subMenus.length > 0) {
        if (!subMenu) {
          subMenu = menu.subMenus[0];
        }
      }
      //招标入围和招标计划判断导航
      if (
        path.indexOf("/bid/bidMode") != -1 ||
        path.indexOf("/bid/bidrequireshowdet") != -1 ||
        path.indexOf("/bid/bidPlanAdd") != -1 ||
        path.indexOf("/bid/supInAudit") != -1 ||
        path.indexOf("/bid/supplierInDetail") != -1 ||
        path.indexOf("/bid/supplierInChose") != -1 ||
        path.indexOf("/bid/processDetailjianyi") != -1 ||
        path.indexOf("/bid/yibanzhaobiao") != -1
      ) {
        this.activeFirst = "招标采购";
        menu = this.registerMenu.find((x) => x.name == "招标采购");
        // setTimeout(() => {
        if (path.indexOf("/bid/yibanzhaobiao") != -1 || path.indexOf("/bid/bidMode6") != -1) {
          this.activeSub = menu.subMenus.find((v) => v.name == "招标方案").index;
        } else if (
          path.indexOf("/bid/supInAudit") != -1 ||
          path.indexOf("/bid/supplierInChose") != -1 ||
          path.indexOf("/bid/supplierInDetail") != -1
        ) {
          this.activeSub = menu.subMenus.find((v) => v.name == "入围单位").index;
        } else if (path.indexOf("processDetailjianyi") != -1) {
          // this.activeSub = menu.subMenus.find((v) => v.name == "定标查询").index;
          // this.activeSub = menu.subMenus.find((v) => v.name == "招标过程").index;
        } else {
          this.activeSub = menu.subMenus.find((v) => v.name == "招标计划").index;
        }
        // }, 100);
      } else if (
        path.indexOf("/Evaluate/contractForm") != -1 ||
        path.indexOf("/Evaluate/detail") != -1 ||
        path.indexOf("Evaluate/myEvaluateDetail") != -1 ||
        path.indexOf("/Evaluate/baoan") != -1
      ) {
        this.activeFirst = "履约评价";
        menu = this.registerMenu.find((x) => x.name == "履约评价");
        this.activeSub = menu.subMenus.find((v) => v.name == "合同列表").index;
      } else if (
        path.indexOf("/invest/zhuangji/edit") != -1 ||
        path.indexOf("/supplier/specialedit") != -1 ||
        path.indexOf("/invest/zongbao/edit") != -1 ||
        path.indexOf("/invest/dianli/edit") != -1 ||
        path.indexOf("/invest/jingzhuang/edit") != -1 ||
        path.indexOf("/invest/menchuang/edit") != -1 ||
        path.indexOf("/invest/muqiang/edit") != -1 ||
        path.indexOf("/invest/shizheng/edit") != -1 ||
        path.indexOf("/supplier/specialSupEdit") != -1 ||
        path.indexOf("/supplier/noInvesList") != -1 ||
        path.indexOf("backlistadd") != -1 ||
        path.indexOf("/supplier/detail") != -1 ||
        path.indexOf("/invest/xiaofang/edit") != -1
      ) {
        this.activeFirst = "供方信息";
        menu = this.registerMenu.find((x) => x.name == "供方信息");
        if (path.indexOf("/supplier/specialedit") != -1) {
          this.activeSub = menu.subMenus.find((v) => v.name == "未入库供方").index;
        }
        if (path.indexOf("/backlistadd") != -1) {
          this.activeSub = menu.subMenus.find((v) => v.name == "黑名单").index;
        }
        // if (path.indexOf("/supplier/detail") != -1) {
        // this.activeSub = menu.subMenus.find((v) => v.name == "已入库供方").index;
        // }
        if (path.indexOf("/supplier/specialSupEdit") != -1) {
          // this.activeSub = menu.subMenus.find((v) => v.name == "直委供方").index;
          this.activeSub = menu.subMenus.find((v) => v.name == "特殊供方").index;
        }
        if (path.indexOf("/supplier/noInvesList") != -1) {
          this.activeSub = menu.subMenus.find((v) => v.name == "待考察供方").index;
        }
      } else if (
        path.indexOf("/quality/zongbao/edit") != -1 ||
        path.indexOf("/quality/zhuangji/edit") != -1 ||
        path.indexOf("/quality/dianli/edit") != -1 ||
        path.indexOf("/quality/jingzhuang/edit") != -1 ||
        path.indexOf("/quality/menchuang/edit") != -1 ||
        path.indexOf("/quality/muqiang/edit") != -1 ||
        path.indexOf("/quality/shizheng/edit") != -1 ||
        path.indexOf("/quality/xiaofang/edit") != -1
      ) {
        this.activeFirst = "供方信息";
        menu = this.registerMenu.find((x) => x.name == "供方信息");
        this.activeSub = menu.subMenus.find((v) => v.name == "资格预审").index;
      } else if (path.indexOf("supInvesAudit") != -1) {
        this.activeFirst = "待办中心";
        menu = this.registerMenu.find((x) => x.name == "待办中心");
        this.activeSub = menu.subMenus.find((v) => v.name == "我的待办").index;
      } else {
        this.activeFirst = menu.name;
        this.activeSub = subMenu.index;
      }
      this.subMenu = menu.subMenus;
      if (subMenu) {
        return subMenu;
      }
      return menu;
    },
    firstMenuClick(id, pid) {
      // bus.$on("activeSub", (val, val1) => {    //取  Bus.$on
      // console.log(3333,val,val1,id,pid)
      //   id = val;
      // });
      let menu = this.renderColor(id, pid);
      if (menu) {
        this.$router.push(menu.route);
        // if (menu.route.path.indexOf("views") > -1) {
        //   let a = menu.route.path.split(".vue")[0];
        //   menu.route.path = a.split("views")[1];
        //   console.log(menu.route);
        //   this.$router.push(menu.route);
        // } else {
        //   this.$router.push(menu.route);
        // }
      }
    },
    showfujian() {
      // this.dialogVisiblefujian = true;
      // const url = "http://bidserver.hrdservice.com/UploadFile/供应商注册操作手册.pdf";
      const url = process.env.VUE_APP_API_URL + "/UploadFile/招采系统操作手册.pdf";
      window.open(url, "_blank");
      // this.src = url;
    },
    loginOut() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("logout");
        this.$router.push("/Login");
        sessionStorage.clear();
        localStorage.clear();
      });
    },
    changePsd() {
      this.dialogFormVisible = true;
      let userForm = this.userForm;
      userForm.oldPassword = "";
      userForm.newPassword = "";
      //  userForm.baseGuid= "";
      userForm.resPassWord = "";
      //  userForm.yzm= "";
    },
    submitForm(userForm) {
      if (this.userForm.newPassword != this.userForm.resPassWord) {
        return this.$msg.error("密码不一致");
      } else {
        this.$confirm("确定要修改密码吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$refs[userForm].validate((valid) => {
            if (valid) {
              let obj = {
                oldPassword: this.userForm.oldPassword,
                newPassword: this.userForm.newPassword,
              };
              this.$http.post("/IdmUserInfo/ModifyPassword", obj).then((res) => {
                if (!res.data.success) {
                  return this.$msg.error(res.data.message);
                } else {
                  this.dialogFormVisible = false;
                  this.$msg.success(res.data.message);
                }
              });
              // this.$api.SupLoginInfo.ModifyPassword(this.userForm)
              //   .then(() => {
              //     this.$msg.success("保存成功");
              //     //执行退出
              //     // this.$store.dispatch("logout");
              //     // this.$router.push("/Login");
              //   })
              //   .finally(() => {});
            }
          });
        });
      }
    },
    yizhi(rule, value, callback) {
      if (this.resPassWord === this.newPassword) {
        callback();
      } else {
        return callback(new Error(""));
      }
    },
  },
};
</script>

<style scoped>
.row {
  margin: 0px;
  border: 0px;
}

.nav1 {
  height: 52px;
  width: 100%;
  padding: 0;
  background-color: #ea5514;
  font-size: 0;
}

.nav-lf {
  display: flex;
  /* float: left; */
}
.lines {
  height: 30px;
  width: 30px;
  margin-top: 13px;
  border-right: 1px solid #fff;
  margin-right: 10px;
}
.nav1 .active {
  background-color: #e5e5e5;
}

.nav1 .active a {
  color: #293040;
}

.nva-list a {
  color: #fff;
  display: block;
}

.nva-list a:hover {
  color: #293040;
}
.img {
  line-height: 52px;
  margin-top: 6px;
  /* color: #fff;
  background: #fff; */
}
.nva-list {
  height: 52px;
  line-height: 52px;
  color: #fff;
  display: inline-block;
  padding: 0px 15px;
  cursor: pointer;
  font-size: 16px;
  -webkit-transition: all 0.6s ease;
  -moz-transition: all 0.6s ease;
  transition: all 0.6s ease;
}

.nav1 .nva-list:hover {
  color: #293040;
  background-color: #e5e5e5;
}

.nav-rt {
  margin-left: 5px;
  cursor: pointer;
  position: relative;
}

.infor {
  float: right;
  color: #fff;
  line-height: 55px;
}

.open .dropdown-menu {
  display: block;
}

.open > .dropdown-menu {
  display: block;
}

.dropdown-menu {
  font-size: 12px;
}

.dropdown-menu {
  position: absolute;
  top: 80%;
  left: 0;
  z-index: 10001;
  display: none;
  float: left;
  min-width: 110px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  list-style: none;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
  text-align: initial;
}

.dropdown-menu > li > a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.428571429;
  color: #333333;
  white-space: nowrap;
}

.navtwo .active {
  color: #ea5514;
  font-weight: bolder;
  font-size: 15px;
  border-bottom: 3px solid #ea5514;
  /*#21841D;*/
  background: #fff;
  height: 41px;
}
.navtwo {
  padding: 0px;
  font-size: 14px;
}
.navtwo ul {
  margin: 0 auto;
  /*padding: 0px;*/
  padding-left: 0px;
  border-bottom: 2px solid #ddd;
  line-height: 52px;
  height: 52px;
  width: 1200px;
}
.navtwo.navtwo-a ul {
  margin: 0px auto 10px;
  display: block;
  width: 95%;
}
.navtwo ul .active a  {
  color: #ea5514 !important;
  font-weight: bolder;
  text-decoration: none;
}
.navtwo li {
  list-style-type: none;
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
  font-size: 15px;
}

.boder-b {
  border-bottom: 1px solid #e5e5e5;
}

.clear {
  clear: both;
}

.navtwo ul li a {
  color: #000000;
  text-decoration: none;
}

.navtwo ul li a:hover {
  color: #ea5514;
}

.navtwo ul .active a {
  color: #ea5514 !important;
  text-decoration: none;
}
</style>
