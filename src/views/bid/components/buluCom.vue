<!-- 补录单位 -->
<template>
  <div class="">
    <div>
      <div style="margin-top:10px;height:1px">
        <el-select v-model="sectionId" style="float:right" @change="sectionNameChange()" size="small" placeholder="请选择招标方式：">
          <el-option v-for="item in sectionDropDownList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
      </div>

      <div v-for="(item, index) in dataList" :key="index">
        <div class="pub" style="margin-top:50px">{{ item.title }}</div>
        <el-table
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          v-loading="loading"
          :data="item.supplierList"
        >
          <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
          <el-table-column label="供应商名称" min-width="250" prop="comFullName" align="left"> </el-table-column>
          <el-table-column label="状态" width="100" prop="status" align="center"> </el-table-column>
          <el-table-column label="登录名" width="180" prop="supplierLoginId" align="center"> </el-table-column>
          <el-table-column label="投标联系人" align="center">
            <el-table-column label="姓名" width="100" prop="userName1" align="center"> </el-table-column>
            <el-table-column label="手机" width="150" prop="mobilePhone1" align="center"> </el-table-column>
            <el-table-column label="邮箱" width="150" prop="email1" align="center"> </el-table-column>
          </el-table-column>
          <el-table-column label="商务洽谈联系人" align="center">
            <el-table-column label="姓名" width="100" prop="userName2" align="center"> </el-table-column>
            <el-table-column label="手机" width="150" prop="mobilePhone2" align="center"> </el-table-column>
            <el-table-column label="邮箱" width="150" prop="email2" align="center"> </el-table-column>
          </el-table-column>
        </el-table>
        <div style="margin-top:10px;">
          <el-button
            type="primary"
            v-if="item.showOpenBusinessButton"
            v-loading="loading"
            style="float:right;margin-left:10px;margin-bottom:10px"
            @click="bidOpening('B', item.addMasterId)"
            size="small"
            >开商务标</el-button
          >
          <el-button
            type="primary"
            v-if="item.showOpenTechButton"
            v-loading="loading"
            style="float:right;margin-left:10px;margin-bottom:10px"
            @click="bidOpening('A', item.addMasterId)"
            size="small"
            >开技术标</el-button
          >
          <el-button
            type="primary"
            v-if="item.showSendButton"
            v-loading="loading"
            style="float:right;margin-left:10px;margin-bottom:10px"
            @click="fabiao(item.addMasterId)"
            size="small"
            >发标</el-button
          >
          <el-button
            type="primary"
            v-if="item.showModifyPlanButton"
            v-loading="loading"
            style="float:right;margin-left:10px;margin-bottom:10px"
            @click="edittime(item.addMasterId)"
            size="small"
            >计划变更</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog width="50%" :visible.sync="dialogVisible1" title="发标时间">
      <el-form ref="form" :model="form" :rules="rulesform" :loading="loading">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="答疑截止时间：">
              <el-date-picker
                style="width:200px"
                type="datetime"
                v-model="form.qaEndDate"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
                @change="same"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回标截止时间：">
              <el-date-picker
                style="width:200px"
                type="datetime"
                v-model="form.backEndDate"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划开标时间：">
              <el-date-picker
                style="width:200px"
                type="datetime"
                v-model="form.openDate"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="mask">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog width="50%" :visible.sync="dialogVisible2" title="修改时间">
      <el-form ref="ouform" :model="ouform" :rules="rulesouform" :loading="loading">
        <el-row>
          <el-col :span="8">
            <el-form-item label="答疑截止时间：">
              <el-date-picker
                style="width:200px"
                type="datetime"
                v-model="ouform.qaEndDate"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回标截止时间：">
              <el-date-picker
                style="width:200px"
                type="datetime"
                v-model="ouform.backEndDate"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划开标时间：">
              <el-date-picker
                style="width:200px"
                type="datetime"
                v-model="ouform.openDate"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="makeSure()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {},
  props: ["id"],
  data() {
    return {
      form: {
        qaEndDate: "",
        backEndDate: "",
        openDate: "",
      },
      ouform: {
        qaEndDate: "",
        backEndDate: "",
        openDate: "",
      },
      rulesform: {
        qaEndDate: [{ required: true, message: "请选择答疑截止时间", trigger: "blur" }],
        backEndDate: [{ required: true, message: "请选择回标截止时间", trigger: "blur" }],
        openDate: [{ required: true, message: "请选择计划开标时间", trigger: "blur" }],
      },
      rulesouform: {
        qaEndDate: [{ required: true, message: "请选择答疑截止时间", trigger: "blur" }],
        backEndDate: [{ required: true, message: "请选择回标截止时间", trigger: "blur" }],
        openDate: [{ required: true, message: "请选择计划开标时间", trigger: "blur" }],
      },
      loading: "",
      dialogVisible1: false,
      dialogVisible2: false,
      dataList: [],
      sectionDropDownList: [],
      sectionId: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetSectionDropDownList();
  },
  methods: {
    parseTime,
    // 获取标段下拉，默认选中第一条
    GetSectionDropDownList() {
      this.$http
        .get("/DocBackCenter/GetDocBackCenterPageShow01", {
          params: {
            bidModeId: this.id,
          },
        })
        .then(res => {
          // 标段下拉数据
          if (res.data.sectionDropDownList && res.data.sectionDropDownList.length) {
            this.sectionDropDownList = res.data.sectionDropDownList;
            this.sectionId = res.data.sectionDropDownList[0].value;
            this.CreateAddSupplier1001();
            // this.GetLiandoSupplierInAddMasterList1001();
          } else {
            this.sectionDropDownList = [];
          }
        });
    },
    CreateAddSupplier1001() {
      this.$http
        .post("/BidAddSupplier/CreateAddSupplier1001", {
          bidModeId: this.id,
          sectionId: this.sectionId,
        })
        .then(res => {
          if (res.data.success) {
            this.GetLiandoSupplierInAddMasterList1001();
          }
        });
    },
    sectionNameChange() {
      this.GetLiandoSupplierInAddMasterList1001();
    },
    GetLiandoSupplierInAddMasterList1001() {
      this.$http
        .get("LiandoBidMaster/GetLiandoSupplierInAddMasterList1001", { params: { bidModeId: this.id, sectionId: this.sectionId } })
        .then(res => {
          this.dataList = res.data;
          this.addMasterId = res.data.addMasterId;
        });
    },
    GetAddDate1001() {
      this.$http.get("/BidAddSupplier/GetAddDate1001", { params: { addMasterId: this.addMasterId } }).then(res => {
        this.ouform = res.data;
      });
    },
    same() {
      if (this.form.backEndDate == "" || this.form.backEndDate == null) {
        this.form.backEndDate = this.form.qaEndDate;
      } else {
        this.form.backEndDate = this.form.backEndDate;
      }
      if (this.form.openDate == "" || this.form.openDate == null) {
        this.form.openDate = this.form.qaEndDate;
      } else {
        this.form.openDate = this.form.openDate;
      }
    },
    fabiao(addMasterId) {
      this.dialogVisible1 = true;
      this.addMasterId = addMasterId;
    },
    mask() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm("发标后将不能撤回，确定要执行发标吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let obj = {
              // ...this.form,
              qaEndTime: parseTime(this.form.qaEndDate, "yyyy-MM-dd hh:mm"),
              backEndTime: parseTime(this.form.backEndDate, "yyyy-MM-dd hh:mm"),
              openTime: parseTime(this.form.openDate, "yyyy-MM-dd hh:mm"),
              sectionId: this.sectionId,
              addMasterId: this.addMasterId,
              bidModeId: this.id,
            };
            this.loading = true;
            this.$http.post("/BidAddSupplier/SendToAddSupplier1001", obj).then(res => {
              if (res.data.success) {
                this.loading = false;
                this.dialogVisible1 = false;
                this.$message.success(res.data.message);
                this.GetLiandoSupplierInAddMasterList1001();
              } else {
                this.loading = false;
                this.dialogVisible1 = false;
                this.$alert(res.data.message, {
                  confirmButtonText: "确定",
                });
              }
            });
          });
        }
      });
    },
    edittime(addMasterId) {
      this.dialogVisible2 = true;
      this.addMasterId = addMasterId;
      this.GetAddDate1001();
    },
    makeSure() {
      this.$confirm("确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          addMasterId: this.addMasterId,
          qaEndDate: parseTime(this.ouform.qaEndDate, "yyyy-MM-dd hh:mm"),
          backEndDate: parseTime(this.ouform.backEndDate, "yyyy-MM-dd hh:mm"),
          openDate: parseTime(this.ouform.openDate, "yyyy-MM-dd hh:mm"),
        };
        this.loading = true;
        this.$http.post("/BidAddSupplier/UpdateBidAddDate1001", obj).then(res => {
          if (res.data.success) {
            this.dialogVisible2 = false;
            this.$message.success(res.data.message);
            this.GetLiandoSupplierInAddMasterList1001();
            this.loading = false;
          } else {
            this.loading = false;
            this.dialogVisible2 = false;
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
        // .catch(err => {
        //   this.$message.error("请求失败！");
        //   this.loading = false;
        // });
      });
      // .catch(() => {
      //   this.$msg({ type: "info", message: "已取消" });
      //   this.loading = false;
      // });
    },
    // 开标
    bidOpening(openType, addMasterId) {
      this.$confirm("确认要开标吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          sectionId: this.sectionId,
          bidModeId: this.id,
          addMasterId,
          openType,
          rowId: this.id,
        };
        this.loading = true;
        this.$http.post("/BidOpen/SubmitOpenBidType1001", obj).then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.GetLiandoSupplierInAddMasterList1001();
            this.loading = false;
          } else {
            this.loading = false;
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.pub {
  // border-left: 3px solid #21468c;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background: #f4f4f4;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
}
::v-deep .el-main {
  overflow: hidden;
}
</style>
<style>
.el-main {
  overflow: hidden;
}
</style>
