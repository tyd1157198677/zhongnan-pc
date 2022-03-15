<template>
  <el-main>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="考察打分模板" name="考察模板"
          ><div class="rolse">
            <el-aside width="230px">
              <div class="left">
                <div
                  :style="{ background: indexactive == index ? '#409eff' : '#fff', color: indexactive == index ? '#FFF' : '' }"
                  @click="clickLeft(item, index)"
                  class="item"
                  v-for="(item, index) in roleList1"
                  :key="item.id"
                >
                  {{ item.tempName }}
                </div>
              </div>
            </el-aside>
            <el-main
              ><el-row>
                <el-col :span="24" class="btns">
                  <el-button type="primary" style="margin-right: 5px" size="small" :loading="translationLoad" @click="SaveItemOrder"
                    >保存排序</el-button
                  >
                </el-col>
              </el-row>
              <div class="right">
                <el-table
                  empty-text="暂无数据"
                  height="100%"
                  style="width: 100%"
                  stripe
                  border
                  element-loading-text="请稍候,数据正在加载中..."
                  :data="tableData"
                  v-loading="loading"
                >
                  <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
                  <el-table-column label="打分说明" align="left" prop="wdName">
                    <template slot-scope="scope">
                      <div style="font-weight: 600; width: 100%">{{ scope.row.wdName }}-{{ scope.row.zbName }}</div>
                      <div style="font-weight: 500">
                        <span :title="scope.row.standard">{{ scope.row.standard }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="zbType" label="指标类型" align="center" width="100"> </el-table-column>
                  <el-table-column prop="fullScore" label="满分" align="center" width="100"> </el-table-column>
                  <el-table-column label="参与部门" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.depNames }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="显示顺序" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.itemOrder"
                        :placeholder="'请输入显示顺序'"
                        oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
                      >
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-edit" @click="edit(scope.row)" title="编辑"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-main>
            <el-dialog title="编辑打分项" :visible.sync="dialogFormVisible">
              <el-form ref="importFromData" :model="importFromData" label-width="80px">
                <el-row>
                  <el-col :span="21" :offset="1">
                    <el-form-item label="维度名称" prop="wdName">
                      <el-input v-model="importFromData.wdName" placeholder="请输入维度名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="21" :offset="1">
                    <el-form-item label="指标名称" prop="zbName">
                      <el-input v-model="importFromData.zbName" placeholder="请输入指标名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="21" :offset="1">
                    <el-form-item label="参考标准" prop="standard">
                      <el-input type="textarea" :rows="2" v-model="importFromData.standard" placeholder="请输入参考标准"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="指标类型" prop="zbType">
                      <el-select v-model="importFromData.zbType" placeholder="请选择指标类型" size="small">
                        <el-option label="打分指标" value="打分指标"></el-option>
                        <el-option label="资质评估" value="资质评估"></el-option>
                      </el-select>
                      <!--                    <el-input v-model="options.zbType" placeholder="请输入指标类型"></el-input>-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="显示顺序" prop="itemOrder">
                      <el-input
                        v-model="importFromData.itemOrder"
                        placeholder="请输入显示顺序"
                        oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="满分" prop="fullScore">
                      <el-input
                        v-model="importFromData.fullScore"
                        placeholder="请输入满分"
                        oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="21" :offset="1">
                    <el-form-item label="参与部门">
                      <el-checkbox-group v-model="checkedList">
                        <el-checkbox v-for="item in tempDepList" :label="item.depId" :key="item.depId">{{ item.depName }}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="submitForm" size="small" :loading="loading">确 定</el-button>
              </div>
            </el-dialog>
          </div></el-tab-pane
        >
        <el-tab-pane label="履约评价模板" name="履约评价模板"
          ><div class="rolse">
            <el-aside width="230px">
              <div class="left">
                <div
                  :style="{ background: indexactive == index ? '#409eff' : '#fff', color: indexactive == index ? '#FFF' : '' }"
                  @click="clickLeft(item, index)"
                  class="item"
                  v-for="(item, index) in roleList1"
                  :key="item.id"
                >
                  {{ item.tempName }}
                </div>
              </div>
            </el-aside>
            <el-main>
              <el-row>
                <el-col :span="24" class="btns">
                  <el-button type="primary" style="margin-right: 5px" size="small" :loading="translationLoad" @click="SaveItemOrder"
                    >保存排序</el-button
                  >
                </el-col>
              </el-row>
              <div class="right">
                <el-table
                  empty-text="暂无数据"
                  height="100%"
                  style="width: 100%"
                  stripe
                  border
                  element-loading-text="请稍候,数据正在加载中..."
                  :data="tableData"
                  v-loading="loading"
                >
                  <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
                  <el-table-column label="打分说明" align="left">
                    <template slot-scope="scope">
                      <div style="font-weight: 600; width: 100%">{{ scope.row.wdName }}-{{ scope.row.zbName }}</div>
                      <div style="font-weight: 500">
                        <span :title="scope.row.standard">{{ scope.row.standard }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <!--                <el-table-column prop="zbType" label="指示类型" align="center" width="100"> </el-table-column>-->
                  <el-table-column prop="fullScore" label="满分" align="center" width="100"> </el-table-column>
                  <el-table-column label="参与部门" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.depNames }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="显示顺序" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.itemOrder"
                        :placeholder="'请输入显示顺序'"
                        oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-edit" @click="edit1(scope.row)" title="编辑"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-main>
            <el-dialog title="编辑打分项" :visible.sync="dialogFormVisible1">
              <el-form ref="importFromData1" :model="importFromData1" label-width="80px">
                <el-row>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="维度名称" prop="wdName">
                      <el-input v-model="importFromData1.wdName" placeholder="请输入维度名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="指标名称" prop="zbName">
                      <el-input v-model="importFromData1.zbName" placeholder="请输入指标名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="21" :offset="1">
                    <el-form-item label="参考标准" prop="standard">
                      <el-input v-model="importFromData1.standard" placeholder="请输入参考标准"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="显示顺序" prop="itemOrder">
                      <el-input
                        v-model="importFromData1.itemOrder"
                        placeholder="请输入显示顺序"
                        oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="满分" prop="fullScore">
                      <el-input
                        v-model="importFromData1.fullScore"
                        placeholder="请输入满分"
                        oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="21" :offset="1">
                    <el-form-item label="参与部门">
                      <el-checkbox-group v-model="checkedList">
                        <el-checkbox v-for="item in tempDepList1" :label="item.depId" :key="item.depId">{{ item.depName }}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false" size="small">取 消</el-button>
                <el-button type="primary" @click="submitForm1" size="small" :loading="loading">确 定</el-button>
              </div>
            </el-dialog>
          </div></el-tab-pane
        >
      </el-tabs>
    </div>
  </el-main>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible1: false,
      activeName: "考察模板",
      importFromData: {},
      importFromData1: {},
      tempDepList: [
        {
          depId: "",
          isChecked: "",
          depName: "",
        },
      ],
      tempDepList1: [
        {
          depId: "",
          isChecked: "",
          depName: "",
        },
      ],
      translationLoad: false,
      roleList1: [],
      checkedList: [],
      checkedData: [],
      indexactive: 0,
      content: "", //搜索内容
      tableData: [],
      orderList: [],
      loading: false,
      value: "",
      itemId: "",
      pageSize: 15,
      currentPage: 1,
      totalCount: 0,
    };
  },
  mounted() {
    this.GetSysTreeCateType();
    // this.gettempDepList();
  },
  methods: {
    /**
     * 保存排序
     */
    async SaveItemOrder() {
      try {
        this.translationLoad = true;
        console.log(this.tableData);
        const arr = this.tableData.map((s) => {
          return {
            itemid: s.id,
            // itemid: s.itemid,
            itemOrder: s.itemOrder,
          };
        });
        await this.$http.post("/TempMaster/SaveItemOrder", arr);
        this.translationLoad = false;
        this.$message.success("保存排序成功");
        await this.GetList();
      } catch (e) {
        this.translationLoad = false;
        this.$message.error(e.data.message);
      }
    },
    async GetSysTreeCateType() {
      let res = await this.$http.get("/TempMaster/GetTempList", { params: { tempCate: this.activeName } });
      this.roleList1 = res.data;
      this.value = res.data.length > 0 ? res.data[0].id : "";
      this.GetList();
    },
    async GetList() {
      let obj = {
        masterId: this.value,
      };
      this.loading = true;
      let res = await this.$http.get("/TempMaster/GetTempItemList", { params: obj });
      this.loading = false;
      // if (res.status == 200) {
      this.tableData = res.data;
      // }
    },
    clickLeft(item, index) {
      this.indexactive = index;
      this.value = item.id;
      this.GetList();
    },
    handleClick(e) {
      this.indexactive = 0;
      this.GetSysTreeCateType();
    },
    saveRolses(val) {
      this.SaveOrder();
    },
    edit(opt) {
      // this.importFromData.id = opt.id;
      // this.importFromData.masterId = opt.masterId;
      // this.importFromData.wdName = opt.wdName;
      // this.importFromData.zbName = opt.zbName;
      // this.importFromData.standard = opt.standard;
      // this.importFromData.zbType = opt.zbType;
      // this.importFromData.fullScore = opt.fullScore;
      // // this.importFromData.depName = this.checkedList;
      // this.importFromData.itemOrder = opt.itemOrder;
      this.$http
        .get("/TempMaster/ShowTempItem", {
          params: {
            itemId: opt.id,
          },
        })
        .then((res) => {
          this.tempDepList = res.data.tempDepList;
          this.importFromData = res.data.tempItemInfo;
          if (this.tempDepList.length !== 0) {
            let arr = this.tempDepList.filter((item) => item.isChecked);
            this.checkedList = arr.map((e) => e.depId);
            console.log(this.checkedList);
          }
          // this.tempDepList.depNames = res.data.tempDepList;
          // this.importFromData = res.data.tempItemInfo;
        });
      this.$nextTick(() => {
        this.dialogFormVisible = true;
      });
      // this.GetList();
    },
    // gettempDepList() {
    //   this.depId = [];
    //   this.tempDepList = [];
    // },
    submitForm() {
      // console.log(this.checkedList);
      this.dialogFormVisible = false;
      this.$http
        .post("/TempMaster/SaveTempItem", {
          tempItemInfo: this.importFromData,
          tempDepList: this.tempDepList,
        })
        .then((res) => {
          this.loading = false;
          if (res.data.success) {
            this.$message.success(res.data.message);
            // this.importFromData = this.tableData.find(s => {
            //   return s.itemId === this.importFromData.id;
            // });
            this.GetList();
          }
        });
      // .catch(e => {
      //   this.$msg.error(e.data.message);
      //   this.loading = false;
      // });
    },
    edit1(opt) {
      // this.importFromData1.id = opt.id;
      // this.importFromData1.masterId = opt.masterId;
      // this.importFromData1.wdName = opt.wdName;
      // this.importFromData1.zbName = opt.zbName;
      // this.importFromData1.standard = opt.standard;
      // this.importFromData1.zbType = opt.zbType;
      // this.importFromData1.fullScore = opt.fullScore;
      // this.importFromData1.itemOrder = opt.itemOrder;
      this.$http
        .get("/TempMaster/ShowTempItem", {
          params: {
            itemId: opt.id,
          },
        })
        .then((res) => {
          this.tempDepList1 = res.data.tempDepList;
          this.importFromData1 = res.data.tempItemInfo;
          if (this.tempDepList1.length !== 0) {
            let arr = this.tempDepList1.filter((item) => item.isChecked);
            this.checkedList = arr.map((e) => e.depId);
            console.log(this.checkedList);
          }
        });
      this.$nextTick(() => {
        this.dialogFormVisible1 = true;
      });
    },
    submitForm1() {
      this.dialogFormVisible1 = false;
      console.log(this.importFromData1);
      console.log(this.tempDepList1);
      this.$http
        .post("/TempMaster/SaveTempItem", {
          tempItemInfo: this.importFromData1,
          tempDepList: this.tempDepList1,
        })
        .then((res) => {
          this.loading = false;
          if (res.data.success) {
            this.$message.success(res.data.message);
            // this.importFromData1 = this.tableData.find(s => {
            //   return s.id === this.importFromData1.id;
            // });
            this.GetList();
          }
        });
    },
    deletes(val) {},
  },
};
</script>
<style lang="scss" scoped>
.rolse {
  height: 700px;
  padding-bottom: 100px;
  display: flex;
  .left {
    width: 100%;
    height: 100%;
    overflow: auto;
    flex: 2;
    border: 1px solid #ccc;
    .item {
      width: 100%;
      height: 40px;
      display: flex;
      /*实现垂直居中*/
      align-items: center;
      /*实现水平居中*/
      justify-content: center;
      text-align: justify;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      //   font-weight: 550;
      font-size: 14px;
    }
  }
  ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #409eff;
  }
  .btns {
    margin-bottom: 15px;
    text-align: right;
    margin-right: 5px;
  }
  /*::v-deep .el-main {*/
  /*  overflow: hidden;*/
  /*}*/
  .right {
    height: 92%;
    border: 1px solid #ccc;
    flex: 1;
    // overflow: auto;
    margin-left: 10px;
    .top {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .left1 {
        padding-left: 20px;
        display: flex;
      }
      .right1 {
        padding-right: 10px;
      }
    }
  }
}
</style>
