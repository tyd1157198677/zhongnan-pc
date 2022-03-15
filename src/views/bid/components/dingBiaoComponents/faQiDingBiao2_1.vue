<!--  -->
<template>
  <div class="">
    <div class="pub">评标情况</div>

    <el-table
      ref="multipleTable1"
      v-if="this.show1"
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="table1.winSupplierList"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <!--<el-table-column type="selection" width="50"></el-table-column>-->
      <el-table-column width="150" align="center" :label="table1.sectionName" prop="index"> </el-table-column>
      <el-table-column show-overflow-tooltip label="投标方名称">
        <template slot-scope="scope">
          <el-link
            class="sp"
            type="primary"
            style="color:#409eff;text-decoration: none;padding-right:10px"
            icon="el-icon-search"
            @click="jumpDetail(scope.row.supplierId)"
            >{{ scope.row.comFullName }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="综合得分" prop="finalScore"> </el-table-column>
      <el-table-column width="150" label="最终报价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.latestAmount }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="150" label="中标金额" align="center" prop="winAmount">-->
      <!--<template slot-scope="scope">-->
      <!--<el-input v-model="scope.row.winAmount"></el-input>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <el-table
      ref="multipleTable2"
      v-if="this.show2"
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="table2.winSupplierList"
      v-loading="loading"
      @selection-change="handleSelectionChange2"
    >
      <!--<el-table-column type="selection" width="50"></el-table-column>-->
      <el-table-column width="150" align="center" :label="table2.sectionName" prop="index"> </el-table-column>
      <el-table-column show-overflow-tooltip label="投标方名称">
        <template slot-scope="scope">
          <el-link
            class="sp"
            type="primary"
            style="color:#409eff;text-decoration: none;padding-right:10px"
            icon="el-icon-search"
            @click="jumpDetail(scope.row.supplierId)"
            >{{ scope.row.comFullName }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="综合得分" prop="finalScore"> </el-table-column>
      <el-table-column width="150" label="最终报价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.latestAmount }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="150" label="中标金额" align="center" prop="winAmount">-->
      <!--<template slot-scope="scope">-->
      <!--<el-input v-model="scope.row.winAmount"></el-input>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <el-table
      ref="multipleTable3"
      v-if="this.show3"
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="table3.winSupplierList"
      v-loading="loading"
      @selection-change="handleSelectionChange3"
    >
      <!--<el-table-column type="selection" width="50"></el-table-column>-->
      <el-table-column width="150" align="center" :label="table3.sectionName" prop="index"> </el-table-column>
      <el-table-column show-overflow-tooltip label="投标方名称">
        <template slot-scope="scope">
          <el-link
            class="sp"
            type="primary"
            style="color:#409eff;text-decoration: none;padding-right:10px"
            icon="el-icon-search"
            @click="jumpDetail(scope.row.supplierId)"
            >{{ scope.row.comFullName }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="综合得分" prop="finalScore"> </el-table-column>
      <el-table-column width="150" label="最终报价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.latestAmount }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="150" label="中标金额" align="center" prop="winAmount">-->
      <!--<template slot-scope="scope">-->
      <!--<el-input v-model="scope.row.winAmount"></el-input>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <!--<div class="pub">中标单位</div>-->
    <!--<el-table-->
    <!--ref="multipleTable4"-->
    <!--empty-text="暂无数据"-->
    <!--stripe-->
    <!--border-->
    <!--element-loading-text="请稍候,数据正在加载中..."-->
    <!--:data="table4"-->
    <!--v-loading="loading"-->
    <!--@selection-change="handleSelectionChange"-->
    <!--&gt;-->
    <!--<el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>-->
    <!--<el-table-column width="150" align="center" label="排名" prop="index"> </el-table-column>-->
    <!--<el-table-column show-overflow-tooltip label="投标方名称">-->
    <!--<template slot-scope="scope">-->
    <!--<el-link-->
    <!--class="sp"-->
    <!--type="primary"-->
    <!--style="color:#409eff;text-decoration: none;padding-right:10px"-->
    <!--icon="el-icon-search"-->
    <!--@click="jumpDetail(scope.row.supplierId)"-->
    <!--&gt;{{ scope.row.comFullName }}-->
    <!--</el-link>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column width="150" label="最终报价" align="center">-->
    <!--<template slot-scope="scope">-->
    <!--<span>{{ scope.row.latestAmount }}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column width="150" label="中标金额" align="center" prop="winAmount">-->
    <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input v-model="scope.row.winAmount"></el-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</template>&ndash;&gt;-->
    <!--</el-table-column>-->
    <!--</el-table>-->

    <div class="bottom" style="text-align:right;margin:10px">
      <el-button type="danger" size="small" @click="save2" v-if="showButton">保存中标单位</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataF"],
  data() {
    return {
      form: {},
      activeName: "1",
      dialogVisible: false,
      table1: {},
      table2: {},
      table3: {},
      table4: [],
      bidModeId: "",
      show1: false,
      show2: false,
      show3: false,
      saveTable1: [],
      saveTable2: [],
      saveTable3: [],
      uploadData: {
        FileName: "",
      },
      file: {},
      fileList: [],
      loading: false,
      api: process.env.VUE_APP_API_URL,
      showButton: false,
      uploadList: [],
    };
  },
  created() {
    this.bidModeId = this.$route.query.id;

    // if (!this.dataF.showButton1) {
    //   this.showButton = false;
    // } else {
    //   this.$api.supIn.BidActionButton12({ bidModeId: this.bidModeId }).then(res => {
    //     if (!res.success) {
    //       this.showButton = false;
    //     }
    //   });
    // }

    //this.getInfo();
    this.getList1();
    //this.getList2();
  },
  methods: {
    onDonwLoad(file) {
      window.open(process.env.VUE_APP_API_URL + file.filePath + file.fileReName);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      this.file = file;
    },
    submitUpload() {
      if (!this.uploadData.FileName) {
        this.$message.error("请填写文件名称");
        return;
      }
      this.loading = true;
      let f = new FormData();
      f.append("BidModeId", this.bidModeId);
      f.append("FileName", this.uploadData.FileName);
      f.append("fileBix", this.file.raw);
      this.$api.supIn.BidWinAttachUpload1(f).then(res => {
        this.loading = false;
        if (res.success) {
          this.$refs.upload.clearFiles();
          this.$message.success(res.message);
          this.dialogVisible = false;
          this.getList2();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    upload3() {
      this.dialogVisible = true;
    },
    getList2() {
      this.$api.supIn.GetBidWinAttachList01({ bidModeId: this.bidModeId }).then(res => {
        this.uploadList = res;
      });
    },
    save2() {
      var a = [];
      // for (var i = 0; i < this.saveTable1.length; i++) {
      //   var item = this.saveTable1[i];
      //   var b = {};
      //   b.sectionId = this.table1.sectionId;
      //   b.supplierId = item.supplierId;
      //   b.amount = item.winAmount;
      //   a.push(b);
      // }
      // for (var i = 0; i < this.saveTable2.length; i++) {
      //   var item = this.saveTable2[i];
      //   var b = {};
      //   b.sectionId = this.table2.sectionId;
      //   b.supplierId = item.supplierId;
      //   b.amount = item.winAmount;
      //   a.push(b);
      // }
      // for (var i = 0; i < this.saveTable3.length; i++) {
      //   var item = this.saveTable3[i];
      //   var b = {};
      //   b.sectionId = this.table3.sectionId;
      //   b.supplierId = item.supplierId;
      //   b.amount = item.winAmount;
      //   a.push(b);
      // }
      for (var i = 0; i < this.table4.length; i++) {
        var item = this.table4[i];
        var b = {};
        b.sectionId = item.sectionId;
        b.supplierId = item.supplierId;
        b.amount = item.winAmount;
        a.push(b);
      }
      if (a.length == 0) {
        this.$msg.error("最少勾选一条数据");
        return;
      }
      this.$api.supIn.SaveWinSupplierList01(a).then(res => {
        if (res.success) {
          this.$msg.success(res.message);
          this.getList1();
        } else {
          this.$msg.error(res.message);
        }
      });
    },
    handleSelectionChange(val) {
      this.saveTable1 = val;
      this.change4();
    },
    handleSelectionChange2(val) {
      this.saveTable2 = val;
      this.change4();
    },
    handleSelectionChange3(val) {
      this.saveTable3 = val;
      this.change4();
    },
    change4() {
      this.table4 = [];
      if (this.saveTable1.length > 0) {
        for (var i = 0; i < this.saveTable1.length; i++) {
          this.table4.push(this.saveTable1[i]);
          console.log(this.table4);
        }
      }
      if (this.saveTable2.length > 0) {
        for (var i = 0; i < this.saveTable2.length; i++) {
          this.table4.push(this.saveTable2[i]);
        }
      }
      if (this.saveTable3.length > 0) {
        for (var i = 0; i < this.saveTable3.length; i++) {
          this.table4.push(this.saveTable3[i]);
        }
      }
    },
    getList1() {
      this.$api.supIn.GetSectionSupplier01({ bidModeId: this.bidModeId }).then(res => {
        for (var i = 0; i < res.length; i++) {
          if (i == 0) {
            this.show1 = true;
            this.table1 = res[i];
            this.table1.sectionName = "排名（" + this.table1.sectionName + ")";
            var sf1 = [];
            this.table1.winSupplierList[0].selectFlag = true;
            this.table1.winSupplierList.forEach(row => {
              row.sectionId = this.table1.sectionId;
              if (row.selectFlag) {
                sf1.push(row);
              }
            });
            this.toggleSelection1(sf1);
          }
          if (i == 1) {
            this.show2 = true;
            this.table2 = res[i];
            this.table2.sectionName = "排名（" + this.table2.sectionName + ")";
            var sf1 = [];
            this.table2.winSupplierList.forEach(row => {
              row.sectionId = this.table2.sectionId;
              if (row.selectFlag) {
                sf1.push(row);
              }
            });
            this.toggleSelection2(sf1);
          }
          if (i == 2) {
            this.show3 = true;
            this.table3 = res[i];
            this.table3.sectionName = "排名（" + this.table3.sectionName + ")";
            var sf1 = [];
            this.table3.winSupplierList.forEach(row => {
              row.sectionId = this.table3.sectionId;
              if (row.selectFlag) {
                sf1.push(row);
              }
            });
            this.toggleSelection3(sf1);
          }
        }
      });
    },
    toggleSelection1(rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable1.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable1.clearSelection();
        }
      });
    },
    toggleSelection2(rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable2.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable2.clearSelection();
        }
      });
    },
    toggleSelection3(rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable3.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable3.clearSelection();
        }
      });
    },
    save1() {
      if (this.form.contractDate) {
        this.form.bidModeId = this.bidModeId;
        this.$api.supIn.SaveBidWinMaster01(this.form).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
          } else {
            this.$msg.error(res.message);
          }
        });
      } else {
        this.$msg.error("请填写完整带*的必填项再保存");
        return;
      }
    },
    getInfo() {
      this.$api.supIn.GetBidWinMaster01({ bidModeId: this.bidModeId }).then(res => {
        this.form = res;
      });
    },
    deleteRow(row) {
      this.$confirm("当前操作不可恢复，确认要执行当前操作吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.DeleteBidWinAttach({ id: row.id }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.getList2();
          } else {
            this.$msg.error(res.message);
          }
        });
      });
    },
    save4() {
      this.$confirm("提交后不能修改，确定要提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.supIn.SubmitWin01({ id: this.bidModeId }).then(res => {
          if (res.success) {
            this.$msg.success(res.message);
            this.showButton = false;
            this.getInfo();
            this.getList1();
            this.getList2();
          } else {
            //this.$msg.error(res.message)
            this.openM(res.message);
          }
        });
      });
    },
    openM(msg) {
      const h = this.$createElement;
      this.$msgbox({
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "关闭",
        title: "消息",
        message: h("p", null, [h("span", null, msg), h("i", { style: "color: teal" }, "")]),
      }).then(action => {});
    },
    jumpDetail(id) {
      window.open(`#/supplier/detail/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.bgcolor {
  background: #e7f3fc;
}
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
