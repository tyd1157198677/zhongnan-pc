<template>
  <div>
    <div class="btn1" style="justify-content: flex-end;background:#fff;">
      <el-button v-if="isEdit == 1" type="primary" size="mini" @click="addRow()">新增考察项目情况</el-button>
    </div>
    <div class="tableWrap">
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <th class="center" v-for="(item, index) in titleList" :key="index" style="width:100px">{{ item.Name }}</th>
            <th v-if="isEdit == 1" class="center" style="width:100px">操作</th>
          </tr>
          <tr v-for="(it, idx) in dataList" :key="idx">
            <td class="left" v-for="(i, x) in it.Colunm" :key="x">{{ i.Text }}</td>
            <td v-if="isEdit == 1" class="center" style="width:100px">
              <i class="el-icon-delete" @click="deleteRow(it.Id)"></i>
              <i style="margin-left:10px" class="el-icon-edit" @click="editRow(it.Id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <el-dialog width="80%" :title="dialogTitle" :visible.sync="dialogVisible6">
      <el-form label-position="right" ref="saveSupForm6" size="small" label-width="145px" :model="formSearch6">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(formItem, index) in formList" :key="index">
            <el-form-item :label="formItem.itemTitle" prop="abbr">
              <el-input
                class="line"
                v-model="formItem.formValue"
                :placeholder="formItem.defaultValue"
                show-word-limit
                :maxlength="formItem.maxLength"
                v-if="formItem.itemType == '单行文本' || formItem.itemType == '多行文本' || formItem.itemType == '文本标题'"
              ></el-input>
              <div v-if="formItem.itemType == '单选'">
                <el-radio-group v-model="formItem.formValue">
                  <el-radio v-for="item in formItem.selectorNameValue" :label="item.selectorName" :key="item.selectorName">{{
                    item.selectorName
                  }}</el-radio>
                </el-radio-group>
              </div>
              <div v-if="formItem.itemType == '多选'">
                <el-checkbox-group v-model="formItem.selectValue">
                  <el-checkbox v-for="item in formItem.selectorNameValue" :label="item.selectorName" :key="item.selectorName">
                    {{ item.selectorName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-if="formItem.itemType == '下拉'">
                <el-select class="select1" v-model="formItem.selectValue" placeholder="请选择">
                  <el-option
                    v-for="item in formItem.selectorNameValue"
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
  name: "projectInfo",
  props: ["pagetype"],
  data() {
    return {
      isEdit: 0, // 1:编辑，2：详情
      dialogTitle: "",

      titleList: [],
      dataList: [],

      dialogVisible6: false,
      formSearch6: {},
      formList: [], // 动态表单数组
      loading: false,
      rowId: "", // 编辑时 行id
    };
  },
  computed: {},
  mounted() {
    this.isEdit = this.$route.query.type;
    this.getInvesMasterForm9List();
  },
  methods: {
    // 获取列表接口
    getInvesMasterForm9List() {
      this.$http
        .get("/InvesLianDoMaster/GetInvesMasterForm9List", {
          params: {
            masterId: this.$route.query.id,
            type: "供方考察_门窗",
          },
        })
        .then(res => {
          this.titleList = res.data.Title;
          this.dataList = res.data.Vaule;
        });
    },
    // 点击编辑、获取详情接口
    getInvesMasterForm9ById(id) {
      this.$http.get("/InvesLianDoMaster/GetInvesMasterForm9ById", { params: { id: id } }).then(res => {
        const arr = JSON.parse(JSON.stringify(res.data.result.allModuleDynamicForm));

        this.formList = arr.map(item => {
          item.selectValue = item.selectorNameValue
            .filter(e => e.selected)
            .map(s => {
              return s.selectorName;
            });
          return item;
        });

        this.dialogVisible6 = true;
      });
    },
    // 新增  获取空表单 详情接口
    getInvesMasterNullForm9ById() {
      this.$http
        .get("/InvesLianDoMaster/GetInvesMasterNullForm9ById", {
          params: {
            masterId: this.$route.query.id,
          },
        })
        .then(res => {
          const arr = JSON.parse(JSON.stringify(res.data.result.allModuleDynamicForm));
          this.formList = arr.map(item => {
            item.selectValue = item.selectorNameValue
              .filter(e => e.selected)
              .map(s => {
                return s.selectorName;
              });
            return item;
          });
          this.dialogVisible6 = true;
        });
    },
    //
    deleteRow(id) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/InvesLianDoMaster/DeleteInvesMasterForm9", { id: id }).then(res => {
          console.log("删除", res);
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.getInvesMasterForm9List();
          } else {
            this.$msg.error(res.data.message);
          }
        });
      });
    },
    editRow(id) {
      this.rowId = id;
      this.dialogTitle = "编辑考察项目情况";
      this.getInvesMasterForm9ById(id);
    },
    addRow() {
      this.rowId = "";
      this.dialogTitle = "新增考察项目情况";
      this.getInvesMasterNullForm9ById();
    },

    // 保存表单信息
    save6() {
      let st = this.formList;
      let arr = st.map(item => {
        return {
          itemId: item.itemId,
          id: item.id,
          inputValues: item.itemType == "多选" ? item.selectValue : [item.formValue],
        };
      });
      let obj = {
        id: this.rowId || "", // 新增或编辑id
        masterId: this.$route.query.id,
        itemValues: arr,
      };
      this.$http.post("/InvesLianDoMaster/SaveInvesMasterForm9", obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.dialogVisible6 = false;
          this.getInvesMasterForm9List();
          this.$message.success(data.message);
        } else {
          this.$message.error(data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn1 {
  width: 100%;
  background: #ffe793;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  padding-left: 10px;
  font-size: 15px;
}
.tableWrap {
  width: 100%;
  max-height: 350px;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
