// 在施项目业绩汇总表（用于后补使用）
<!--  -->
<template>
  <div class="">
    <div class="btns">
      <el-button v-if="isEdit == 1" type="primary" size="mini" @click="downLoad">下载模板</el-button>
      <el-upload
        v-if="isEdit == 1"
        style="margin:0 10px"
        class="upload"
        action="#"
        multiple
        :show-file-list="false"
        :http-request="uploadFile"
      >
        <el-button type="primary" size="small">导入数据</el-button>
      </el-upload>
      <el-button v-if="isEdit == 1" type="primary" size="mini" @click="add">新增</el-button>
    </div>

    <table class="layui-table el-table__body">
      <thead>
        <tr>
          <th
            v-for="(ths, thIndex) in tableHeader"
            :key="thIndex"
            v-text="ths.Name"
            style="    background-color: lightgray;
    color: #333333;"
          ></th>
          <th
            v-if="isEdit == 1"
            style="    background-color: lightgray;
    color: #333333;"
          >
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trs, idx) in tableBodyData" :key="idx">
          <td v-for="(td, i) in trs.Colunm" :key="i">{{ td.Text }}</td>
          <td v-if="isEdit == 1">
            <i class="el-icon-delete" @click="deleteRow6(trs.Id)"></i>
            <i style="margin-left:10px" class="el-icon-edit" @click="editRow6(trs.Colunm, trs.Id)"></i>
          </td>
        </tr>
      </tbody>
    </table>

    <el-dialog width="80%" :title="`${type}单位在施项目业绩汇总表（用于后补使用)`" :visible.sync="dialogVisible6">
      <el-form label-position="right" ref="saveSupForm6" size="small" label-width="145px" :model="formSearch6">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(formItem, index) in formList" :key="index">
            <el-form-item :label="formItem.item.itemTitle" prop="abbr">
              <el-input
                class="line"
                v-model="formItem.item.defaultValue"
                :placeholder="formItem.item.defaultValue"
                show-word-limit
                :maxlength="formItem.item.maxLength"
                v-if="formItem.item.itemType == '单行文本' || formItem.item.itemType == '多行文本' || formItem.item.itemType == '文本标题'"
              ></el-input>
              <div v-if="formItem.item.itemType == '单选'">
                <el-radio-group v-model="formItem.item.selectValue">
                  <el-radio v-for="item in formItem.item.selectorNameValue" :label="item.selectorName" :key="item.selectorName">{{
                    item.selectorName
                  }}</el-radio>
                </el-radio-group>
              </div>
              <div v-if="formItem.item.itemType == '多选'">
                <el-checkbox-group v-model="formItem.item.selectValue">
                  <el-checkbox v-for="item in formItem.item.selectorNameValue" :label="item.selectorName" :key="item.selectorName">
                    {{ item.selectorName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-if="formItem.item.itemType == '下拉'">
                <el-select class="select1" v-model="formItem.item.selectValue" placeholder="请选择">
                  <el-option
                    v-for="item in formItem.item.selectorNameValue"
                    :key="item.selectorName"
                    :label="item.selectorName"
                    :value="item.selectorName"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="float-right">
              <el-button type="primary" :loading="loading" @click="save6">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["type", "url"],
  components: {},
  data() {
    return {
      isEdit: 0, // 1:编辑，2：详情
      loading: false,
      api: process.env.VUE_APP_API_URL,
      dialogVisible6: false,
      uploadData: {},
      header: { Authorization: "Bearer " + this.$store.state.token }, // 请求头的规则，用你们后台给你的就是
      base: {
        masterId: this.$route.query.id,
        projectCount: 0,
        buildArea: 0,
        cooperateRatio: 0,
        typeRatio: 0,
      },

      tableHeader: [],
      tableBodyData: [],
      formSearch6: {},

      formList: [], // 动态表单数组

      supQuaFormMasterId: "", // 表格行id，编辑删除用到
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    let isCanEdit = sessionStorage.getItem('isCanEdit')
    this.id = this.$route.query.id;
    //  这里不考虑是否是详情和编辑，只考虑 isCanEdit为false时，表示没编辑权限
    if(isCanEdit == 'false'){
      this.isEdit = 2
    }else{
      this.isEdit = 1;
      // this.isEdit = this.$route.query.type;
    }
    this.GetQuaMessage();
    this.GetSupQuaFormList_PersionList();
    this.GetSupQuaFormList_Persion();
  },
  methods: {
    onInput0_100(e) {
      this.$message.closeAll();
      // 验证是否是纯数字
      let isNumber = /^\d*$/.test(e.target.value);
      // 过滤非数字
      e.target.value = e.target.value.replace(/\D/g, "");
      if (!isNumber || e.target.value < 0 || e.target.value > 100) {
        this.$message.warning("只能输入0-100的整数");
      }
      e.target.value = (e.target.value >= 0 && e.target.value <= 100 && e.target.value.match(/^\d*/g)[0]) || null;
    },

    //公司基本信息
    async GetQuaMessage() {
      let res = await this.$http.get("/SupQua/GetQuaMessage", { params: { masterId: this.id } });
      let base = res.data.result;
      this.base.projectCount = base.projectCount;
      this.base.buildArea = base.buildArea;
      this.base.cooperateRatio = base.cooperateRatio;
      this.base.typeRatio = base.typeRatio;
    },

    //获取总、分公司代表业绩（含实际承包人）
    async GetSupQuaFormList_PersionList() {
      this.$http
        .get("/SupQua/GetSupQuaFormList_PersionList", {
          params: {
            masterId: this.$route.query.id,
            type: "用于候补使用",
          },
        })
        .then(res => {
          this.tableHeader = res.data.Title;
          this.tableBodyData = res.data.Vaule;
        });
    },
    // 获取动态表单
    async GetSupQuaFormList_Persion() {
      this.$http
        .get("/SupQua/GetSupQuaFormList_Persion", {
          params: {
            masterId: this.$route.query.id,
            type: "用于候补使用",
          },
        })
        .then(res => {
          this.formList = res.data;
        });
    },

    add() {
      this.supQuaFormMasterId = "";
      this.dialogVisible6 = true;
    },
    // 导出模板
    downLoad() {
      window.open(
        `${process.env.VUE_APP_API_URL}/api/SupplierQua/GetExportTempletSupQuaFormList_Persion?masterId=${this.$route.query.id}`,
        "_blank"
      );
    },

    // 保存业绩信息
    save() {
      this.$http.post("/SupQua/UpdateSupQuaCaseInfoReport", this.base).then(res => {
        let data = res.data;
        if (data.success) {
          this.$message.success(data.message);
        } else {
          this.$message.error(data.message);
        }
      });
    },

    // 保存表单信息
    save6() {
      let st = this.formList;
      let arr = st.map(item => {
        return {
          itemId: item.item.id,
          id: item.id,
          itemSelectorId:
            item.itemType == "单选" || item.itemType == "多选" || item.itemType == "下拉"
              ? item.selectValue
              : ["00000000-0000-0000-0000-000000000000"],
          value: item.item.defaultValue,
        };
      });
      let obj = {
        supQuaFormMasterId: this.supQuaFormMasterId || "", // 新增或编辑id
        masterId: this.$route.query.id,
        type: "用于候补使用",
        formValues: arr,
      };
      this.$http.post("/SupQua/SaveSupQuaFormList_Persion", obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.dialogVisible6 = false;
          this.GetSupQuaFormList_PersionList();
          this.$message.success(data.message);
          this.GetSupQuaFormList_Persion();
        } else {
          this.$message.error(data.message);
        }
      });
    },

    deleteRow6(Id) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupQua/DeleteSupQuaFormList_Persion", { id: Id }).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetSupQuaFormList_PersionList();
          } else {
            this.$msg.error(res.data.message);
          }
        });
      });
    },
    editRow6(row, id) {
      this.formList.map((item, index) => {
        item.item.defaultValue = row[index].Text;
        return item;
      });
      this.supQuaFormMasterId = id;
      this.dialogVisible6 = true;
    },

    uploadFile(item) {
      const fileObj = item.file;
      const from = new FormData(); // FormData 对象
      from.append("file", fileObj);
      from.append("masterId", this.$route.query.id);
      from.append("type", "用于候补使用");
      this.$http.post("/SupQua/UpExcelSaveSupQuaFormList_Persion", from).then(res => {
        if (res.data.result.success) {
          this.$msg.success(res.data.result.message);
          this.GetSupQuaFormList_PersionList();
        } else {
          this.$msg.error(res.data.result.message);
        }
      });
    },
    // submitUpload() {
    //   Object.assign(this.uploadData, { masterId: this.$route.query.id });
    //   this.$refs.upload.submit();
    //   //   this.dialogVisible = false;
    // },
  },
};
</script>
<style lang="scss" scoped>
.btns {
  display: flex;
  margin: 10px 0;
  justify-content: flex-end;
}
.between {
  display: flex;
  justify-content: space-between;
}
</style>
