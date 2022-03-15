<template>
    <div>
      <el-table
        empty-text="暂无数据"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="resonBase"
        v-loading="loading"
        :show-header="false"
      >
        <el-table-column align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.itemTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left">
          <template slot-scope="scope">
            {{scope.row.formValue}}
              <!--<el-input-->
                <!--v-model="scope.row.formValue"-->
                <!--v-if="scope.row.itemType == '单行文本' || scope.row.itemType == '多行文本' || scope.row.itemType == '文本标题'"-->
              <!--&gt;</el-input>-->
              <!--<el-radio-group v-if="scope.row.itemType == '单选'" v-model="scope.row.formValue">-->
                <!--<el-radio v-for="item in scope.row.selectorNameValue" :label="item.selectorName" :key="item.selectorName">{{-->
                  <!--item.selectorName-->
                  <!--}}</el-radio>-->
              <!--</el-radio-group>-->
              <!--<el-checkbox-group v-model="scope.row.formValue" v-if="scope.row.itemType == '多选'">-->
                <!--<el-checkbox v-for="item in scope.row.selectorNameValue" :label="item.selectorName" :key="item.selectorName">-->
                  <!--{{ item.selectorName }}-->
                <!--</el-checkbox>-->
              <!--</el-checkbox-group>-->
              <!--<el-select v-if="scope.row.itemType == '下拉'" v-model="scope.row.formValue" placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="item in scope.row.selectorNameValue"-->
                  <!--:key="item.selectorName"-->
                  <!--:label="item.selectorName"-->
                  <!--:value="item.selectorName"-->
                <!--&gt;-->
                <!--</el-option>-->
              <!--</el-select>-->
          </template>
        </el-table-column>
      </el-table>

      <report></report>
      <!--<el-button type="primary" size="small" @click="tableshows" style="margin-right: 10px;float:right;margin-top: 10px;">暂存信息</el-button>-->
    </div>
</template>

<script>
  import report from "./invesEdit5_1";
export default {
  components: {
    report
  },
    data() {
        return {
          id: this.$route.query.id,
          loading: false,
          resonBase: [],
        }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList(){
        this.$api.invest.GetModuleDynamicForm2({masterId:this.$route.query.id}).then(res => {
          res.forEach(item => {
            if (item.itemType == "单选" || item.itemType == "下拉") {
              if (item.selectorNameValue.length > 0 && item.defaultValue) {
                item.textValue = item.selectorNameValue.find(e => e.selectorId == item.textValue).selectorText;
              }
            } else if (item.itemType == "多选") {
              if (item.selectorNameValue) {
                let arr = item.selectorNameValue.filter(e => item.selectValue.indexOf(e.selectorId) > -1);
                item.selectValue = arr.map(s => s.selectorText).toString();
              }
            }
          });
          this.resonBase = res;
        })
      },
      addGongFang(){
        this.flag = true;
      },
      tableshows(){
        var arr = [];
        for(var i=0;i<this.resonBase.length;i++){
          var item = this.resonBase[i];
          var p = {
            itemId: item.itemId,
            inputValues:[item.formValue]
          }
          arr.push(p);
        }
          this.$api.invest.SaveInvesLianDoForm({masterId:this.id,itemValues:arr}).then(res => {
            if(res.success) {
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message)
            }
          })
      },
      delete1(id){
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$api.invest.SaveInvesContactInfo(this.formgongfang).then(res => {
            if(res.success) {
              this.$message.success(res.message);
              this.getList()
              this.flag = false;
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$msg({ type: "info", message: "已取消删除", });
        });
      },
      edit1(row){
        this.flag = true;
        this.formgongfang = row;
      },
      clear(){
        this.formgongfang={
          personName: "",
            mobile: "",
            phone:"",
            email: "",
            masterId:this.$route.query.id,
            workAs:"",
        }
      },
    }
}
</script>
</style>
