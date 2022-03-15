<!--  -->
<template>
  <div class="">
    <div style="text-align: right; margin: 10px 0">
      <el-button type="danger" v-if="showbut" size="mini" @click="addInfo">新增流标</el-button>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item :name="item.sectionName" v-for="(item, index) in tableList" :key="index" style="margin-top: 20px">
        <template slot="title">
          <span class="infonametits">{{ item.sectionName }}</span>
        </template>
        <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="[item]" v-loading="loading">
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column label="标段名称" width="220" align="center" prop="sectionName"> </el-table-column>
          <el-table-column label="经办人" align="center" width="100" prop="userName"></el-table-column>
          <el-table-column label="审批状态" align="center" width="100" prop="status"> </el-table-column>
          <el-table-column label="经办时间" align="center" width="200" prop="creationTime"> </el-table-column>
          <el-table-column label="流标原因" prop="reason"> </el-table-column>
        </el-table>

        <div style="margin-top: 30px">
          <el-form v-if="item.showPassButton || item.showRefuseButton" v-loading="loading">
            <el-form-item label="审批意见：" prop="ideaRemark" style="margin-top: 20px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 4 }"
                placeholder="请输入审批意见"
                v-model="item.remark"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                size="mini"
                v-if="item.showPassButton"
                type="primary"
                style="float: right; margin-top: 10px"
                @click="omsubmit(item)"
                >通过</el-button
              >
              <el-button
                size="mini"
                v-if="item.showRefuseButton"
                type="primary"
                style="float: right; margin-top: 10px; margin-right: 10px"
                @click="bohui(item)"
                >驳回</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top: 50px" v-if="item.logs.length > 0">
          <div slot="header" class="clearfix">
            <span>审批日志({{ item.status }})</span>
          </div>
          <div class="text item">
            <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="item.logs">
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
              <el-table-column prop="comments" label="意见/备注" align="center"> </el-table-column>
            </el-table>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 
    <div style="margin-top:10px">
      <el-form v-if="showmark" v-loading="loading" :rules="rulesrizhi">
        <el-form-item label="审批意见：" prop="remark" style="margin-top:20px">
          <el-input
            type="textarea"
             
            :autosize="{ minRows: 6, maxRows: 4 }"
            placeholder="请输入审批意见"
            v-model="remark"
            style="width:100%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" v-if="showPassButton" type="primary" style="float:right;margin-top:10px" @click="omsubmit">通过</el-button>
          <el-button size="mini" v-if="showRefuseButton" type="primary" style="float:right;margin-top:10px;margin-right:10px" @click="bohui"
            >驳回</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top:50px" v-if="tableif">
      <span>审批日志({{ status }})</span>
      <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableshenpi">
        <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
        <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
        <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
        <el-table-column prop="creationTime" width="200" label="待办时间" align="center">
          <template slot-scope="scope"
            ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
          >
        </el-table-column>
        <el-table-column prop="dealTime" width="200" label="处理时间" align="center">
          <template slot-scope="scope"
            ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
          >
        </el-table-column>
        <el-table-column prop="status" width="100" label="结果" align="center"> </el-table-column>
        <el-table-column prop="comments" label="意见/备注" align="center"> </el-table-column>
      </el-table>
    </div> -->
    <el-dialog width="40%" title="上传文件" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="标段名称：" prop="sectionId">
          <el-select v-model="form.sectionId" placeholder="请选择" style="width: 300px">
            <el-option v-for="item in setionList" :key="item.text" :label="item.text" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流标原因：" prop="remark">
          <el-input v-model="form.remark" style="width: 300px" type="textarea" maxlength="500"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-loading="loading1" style="float: right" size="small" @click="submit">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  props: ["id"],
  data() {
    return {
      tableList: [],
      activeNames: [],
      setionList: [],
      loading1: false,
      showbut: false,
      form: {
        sectionId: "",
        remark: "",
      },
      remark: "",
      tableif: false,
      tableshenpi: [],
      rules: {
        sectionId: [{ required: true, message: "请选择模板类型", trigger: "blur" }],
        remark: [{ required: true, message: "请输入流标原因", trigger: "blur" }],
      },
      loading: false,
      dialogVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetBidRunOffList();
    // this.GetNewLogList_SectionCancel();
    this.CheckCanBidCancel40();
  },
  methods: {
    parseTime,
    tomethgoliubiao() {
      this.GetBidRunOffList();
      this.CheckCanBidCancel40();
    },
    GetBidRunOffList() {
      this.loading = true;
      this.$http.get("/BidRunOff/GetBidRunOffList", { params: { bidModeId: this.id } }).then((res) => {
        res.data.data.forEach((e) => {
          e.remark = "";
        });
        this.tableList = res.data.data;
        this.activeNames = res.data.data.map((v) => v.sectionName);
        this.masterId = res.data.data.map((v) => v.id).join();
        this.loading = false;
        console.log(this.masterId);
      });
    },
    addInfo() {
      this.$http.get("/BidRunOff/GetRunOffDropDown", { params: { bidModeId: this.id } }).then((res) => {
        if (res.data.length > 0) {
          this.setionList = res.data;
          this.dialogVisible = true;
        } else {
          this.$message.warning("暂无需要流标的标段信息!");
        }
      });
    },
    omsubmit(item) {
      if (!item.remark) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
      } else {
        this.$confirm("确认要通过流标审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            bidModeId: this.id,
            masterId: item.id,
            remark: item.remark,
            isOk: 0,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_SectionCancel_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.GetBidRunOffList();
              this.CheckCanBidCancel40();
            } else {
              this.loading = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    bohui(item) {
      if (!item.remark) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
      } else {
        this.$confirm("确认要驳回流标审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            bidModeId: this.id,
            masterId: item.id,
            remark: item.remark,
            isOk: -1,
          };
          this.loading = true;
          this.$http.post("/WorkFlowStart/WF_Process_SectionCancel_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loading = false;
              this.$msg.success("操作成功");
              this.GetBidRunOffList();
              this.CheckCanBidCancel40();
            } else {
              this.loadingneibu = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    // GetNewLogList_SectionCancel() {
    //   this.$http.get("/WorkFlowStart/GetNewLogList_SectionCancel", { params: { bidModeId: this.id } }).then(res => {
    //     // if (res.data.logs.length > 0) {
    //     this.tableshenpi = res.data.logs;
    //     this.status = res.data.status;
    //     if (res.data.logs.length > 0 || res.data.logs == null) {
    //       this.tableif = true;
    //     } else {
    //       this.tableif = false;
    //     }
    //     // }
    //   });
    // },
    CheckCanBidCancel40() {
      this.$http.get("/BidCheckCenter/CheckCanBidCancel40", { params: { bidModeId: this.id } }).then((res) => {
        if (res.data.success) {
          this.showbut = true;
        } else {
          this.showbut = false;
        }
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm("操作后不能修改,确认要对所选标段进行流标申请吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let obj = {
              bidModeId: this.id,
              sectionId: this.form.sectionId,
              reason: this.form.remark,
            };
            this.loading1 = true;
            this.$http.post("/BidRunOff/SubmitBidRunOff", obj).then((res) => {
              this.dialogVisible = false;
              if (res.data.success) {
                this.$message.success(res.data.message);
                this.$refs.form.clearValidate();
                this.GetBidRunOffList();
                // this.GetNewLogList_SectionCancel();
                this.loading1 = false;
              } else {
                this.$message.error(res.data.message);
                this.loading1 = false;
              }
            });
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.pub {
  border-left: 3px solid #21468c;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  background: #f4f4f4;
  margin: 10px 0;
  font-size: 13px;
  font-weight: 600;
}
</style>
