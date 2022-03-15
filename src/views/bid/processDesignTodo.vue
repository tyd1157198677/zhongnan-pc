<template>
  <el-main>
    <el-card style="margin-bottom: 60px">
      <div>
        <span
          ><strong>{{ showmessage }}</strong></span
        >
        <el-image class="showhome" title="点击进入首页" :src="bjurl" fit="" @click="gohome"> </el-image>
        <!-- <i class="el-icon-s-home" style="float:right;margin-left:10px;" title="点击进入首页" @click="gohome"></i> -->
      </div>
      <div>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right">项目名称：</td>
              <td>
                {{ form.projectName }}
              </td>
              <td class="right">期区：</td>
              <td>
                {{ form.subProjectName }}
              </td>
            </tr>
            <tr>
              <td class="right">招标计划名称(计划系统)：</td>
              <td>
                {{ form.otherPlanName }}
              </td>
              <td class="right">计划完成日期(计划系统)：</td>
              <td>
                {{ parseTime(form.bidEndDate, "yyyy-MM-dd") }}
              </td>
            </tr>
            <tr>
              <td class="right">招标计划名称：</td>
              <td>
                {{ form.planName }}
              </td>
              <td class="right">招标层级：</td>
              <td>
                {{ form.bidLevel }}
              </td>
            </tr>
            <tr>
              <td class="right">招标经办人：</td>
              <td>
                {{ form.bidUserName }}
              </td>
              <td class="right">入围经办人：</td>
              <td>
                {{ form.supplierUserName }}
              </td>
            </tr>
            <tr>
              <td class="right">总裁三室经办人：</td>
              <td>
                <span style="margin-right: 10px">{{ form.presidentUserName }}</span
                ><span style="margin-right: 10px">{{ form.presidentAltUserName }}</span
                ><span style="margin-right: 10px">{{ form.presidentOtherUserName }}</span>
              </td>
              <td class="right">审计经办人：</td>
              <td>
                <span style="margin-right: 10px">{{ form.auditUserName }}</span
                ><span style="margin-right: 10px">{{ form.auditAlternativesUserName }}</span>
              </td>
            </tr>
            <tr>
              <td class="right">项目需求日期：</td>
              <td>
                {{ parseTime(form.confirmDate, "yyyy-MM-dd") }}
              </td>
              <td class="right">建筑面积：</td>
              <td>{{ form.jzSquire }}㎡</td>
            </tr>
            <tr>
              <td class="right">项目需求原因：</td>
              <td>{{ form.requireDesc }}</td>
              <td class="right">招标计划编号：</td>
              <td>{{ form.planCode }}</td>
            </tr>
            <tr>
              <td class="right">招标专业：</td>
              <td>
                {{ form.bidCateName }}
              </td>
              <td class="right">招标方式：</td>
              <td>{{ form.purchaseType }}</td>
            </tr>
            <tr>
              <td class="right">说明：</td>
              <td colspan="3">
                {{ form.desc }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-top: 20px">
        <div v-for="(item, index) in showdataList" :key="index">
          <div style="margin-top: 20px">
            <span style="margin-right: 10px">第{{ item.index }}次提交</span>
            <span style="color: red" v-if="item.returnMessage != '' || item.returnMessage != null">{{ item.returnMessage }}</span>
            <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="item.designCodeList"
              v-if="item.designCodeList.length > 0"
            >
              <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
              <el-table-column label="OA流程号" prop="designCode" align="center"> </el-table-column>
              <el-table-column prop="linkUrl" label="文件下载链接" align="center" width="200">
                <template slot-scope="scope">
                  <i @click="onup(scope.row.linkUrl)" class="el-icon-share"></i>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="linkUrl" label="操作" align="center" width="200">
                <template slot-scope="scope">
                  <i @click="deletego(scope.row.id)" v-if="scope.row.canDel" class="el-icon-delete"></i>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
      <div>
        <el-row v-if="sumitButton">
          <el-form style="margin-top: 20px">
            <el-form-item label="OA流程号：">
              <el-input
                clearable
                placeholder="请填写OA流程号"
                v-for="(item, index) in putList"
                :key="index"
                v-model="item.val"
                style="width: 150px; margin-right: 10px"
              ></el-input>
              <div style="display: inline-block">
                <el-input
                  style="width: 150px"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-if="!inputVisible && isShowAdd" type="primary" size="small" @click="showInput">新增流程号</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-col :span="24">
            <div class="float-right" style="margin-top: 10px">
              <el-button type="primary" v-if="sumitButton" size="small" @click="save">提交</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  inject: ["reload"],
  data() {
    return {
      bjurl: require("@/assets/gohome.png"),
      sumitButton: true,
      showmessage: "",
      showindex: "",
      showdataList: [],
      msg: "",
      showti: true,
      inputValue: "",
      inputVisible: false,
      isCanEdit: false,
      radio: true,
      designCode: "",
      designCodes: [],
      todoId: "",
      // bidModeId: "",
      planId: "",
      FileName: "",
      returnMessage: "",
      designCodeList: [],
      dialogVisible: false,
      selectSupVisible: false,
      haveSupplier: false,
      message: "",
      tableData: "",
      loading: false,
      form: [],
      putList: [{ val: "" }, { val: "" }, { val: "" }, { val: "" }, { val: "" }],
      uploadData: [
        {
          id: "",
          planId: "",
          FileName: "",
        },
      ],
      page: {
        size: 999,
        index: 1,
        total: 0,
      },
      rules: {},
    };
  },
  computed: {
    isShowAdd() {
      return this.putList.every((v) => v.val != "");
    },
    navBarName() {
      const barName = "";
      return barName;
    },
    // planId() {
    //   return this.$route.query.planId;
    // },
    bidModeId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.id;
      }
    },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
    index() {
      return this.$route.query.index;
    },
  },
  created: function () {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.todoId = this.$route.query.todoId;
    // this.todoId = sessionStorage.getItem("todoId");
    // this.bidModeId = sessionStorage.getItem("bidModeId");
  },
  mounted() {
    this.getbidModeId();
    this.GetGetDesignCode();
    console.log(this.isShowAdd);
    if (this.todoId != "" || this.todoId != null) {
      this.GetTodoTitleById1001();
    }
    // this.getList();
    // this.GetUserTodoList();
  },
  methods: {
    parseTime,
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.putList.push({ val: this.inputValue });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    onup(linkUrl) {
      window.open(linkUrl);
      console.log(linkUrl);
    },
    gohome() {
      this.$router.push({
        path: "/index",
      });
    },
    GetTodoTitleById1001() {
      this.$http.get("/SysTodo/GetTodoTitleById1001", { params: { todoId: this.todoId } }).then((res) => {
        this.showmessage = res.data;
      });
    },
    deletego(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("/LiandoBidMaster/DelDesignCode", { id }).then((res) => {
            if (res.data.success) {
              this.$msg.success(res.data.message);
              this.GetGetDesignCode();
            } else {
              this.$msg.warning(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    GetGetDesignCode() {
      let obj = {
        bidModeId: this.bidModeId,
        index: this.index,
      };
      this.$http.get("/LiandoBidMaster/GetGetDesignCode", { params: obj }).then((res) => {
        this.showdataList = res.data.dataList;
        // this.designCodeList = res.data.dataList.designCodeList;
        // this.returnMessage = res.data.dataList.returnMessage;
        // this.showindex = res.data.dataList.index;
        this.sumitButton = res.data.sumitButton;
        if (res.data.status == "已完成") {
          this.showti = false;
        } else {
          this.showti = true;
        }
        // this.designCodes = res.data.designCode.map(v => {
        //   return {
        //     name: v,
        //   };
        // });
        // console.log(this.designCode[0]);
        // this.urlLink = res.data.urlLink + this.designCode;
      });
    },
    getbidModeId() {
      this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then((res) => {
        console.log(this.bidModeId);
        this.planId = res.data.planId;
        console.log(this.planId);
        this.getList();
      });
    },
    getList() {
      this.$http.get("/LiandoPlan/GetOnePlanInfoById01", { params: { id: this.planId } }).then((res) => {
        this.form = res.data;
      });
    },
    save() {
      this.$confirm("提交后将不能修改，是否继续吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.index != "" || this.index != null) {
          let obj = {
            bidModeId: this.bidModeId,
            designCode: this.putList.map((v) => v.val),
            todoId: this.todoId,
            index: this.index,
          };
          this.$http.post("/LiandoBidMaster/UpdateDesignCode", obj).then((res) => {
            if (!res.data.success) {
              this.$msg.error(res.data.message);
            } else {
              this.$msg.success(res.data.message);
              this.GetGetDesignCode();
            }
          });
        } else {
          let obj1 = {
            bidModeId: this.bidModeId,
            designCode: this.putList.map((v) => v.val),
            todoId: this.todoId,
          };
          this.$http.post("/LiandoBidMaster/UpdateDesignCode", obj1).then((res) => {
            if (!res.data.success) {
              this.$msg.error(res.data.message);
            } else {
              this.$msg.success(res.data.message);
              this.GetGetDesignCode();
            }
          });
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
.fromborder {
  border: solid 1px #e6e6e6;
  padding: 12px 24px 12px 12px;
}
.formwidth {
  margin-left: 50px;
  width: 60%;
}
.el-icon-s-home {
  color: #409eff;
}
::v-deep .clearfix::after {
  content: none;
}
.showhome {
  width: 28px;
  height: 28px;
  margin-bottom: 20px;
  float: right;
  cursor: pointer;
}
</style>
