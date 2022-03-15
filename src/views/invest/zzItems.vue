<template>
  <div style="margin:0px auto 10px;margin-bottom: 65px;width:90%;">
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <el-select v-model="form.supplierId">
        <el-option
          v-for="item in dropDownGroup.supplierList"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        ></el-option>
      </el-select>
      <!--<div class="table-top-title">考察打分</div>-->
      <!--<el-form-->
        <!--ref="form"-->
        <!--:inline="true"-->
        <!--label-width="130px"-->
        <!--:model="form"-->
        <!--class="m-3">-->
        <!--<el-row>-->
          <!--<el-form-item label="选择供应商" prop="supplierId">-->
            <!--<el-select v-model="form.supplierId">-->
              <!--<el-option-->
                <!--v-for="item in dropDownGroup.supplierList"-->
                <!--:key="item.value"-->
                <!--:label="item.text"-->
                <!--:value="item.value"-->
              <!--&gt;</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-form-item label="考察主题" prop="masterName">-->
            <!--<el-input v-model="form.masterName" style="width:650px;" readonly="true"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-form-item label="打分人" prop="editUserName">-->
            <!--<el-input v-model="dropDownGroup.personName" readonly="true"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-form-item label="供应商名称" prop="scope">-->
            <!--<el-input v-model="form.scope" style="width:650px;"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-row>-->
      <!-- </el-form> -->
    </el-row>

    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px;">{{form.masterName}}（{{dropDownGroup.personName}}）</div>
      <el-table
        empty-text="暂无数据"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData"
        v-loading="loading"
        max-height="500"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="standard" label="评审项" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <strong>{{scope.row.wdName}}-{{scope.row.zbName}}</strong>
            <br>
            <span>{{ scope.row.standard }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="scoreDesc" label="评估结果" width="180">
          <template slot-scope="scope">
            <el-select v-model="scope.row.scoreDesc">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title">描述</div>
      <el-input type="textarea" placeholder="请输入内容" v-model="remark2"></el-input>
      <el-button type="primary" size="small" @click="tiJiao" style="float: right;margin-bottom: 10px;margin-top: 10px;">提交考察信息</el-button>
    </el-row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading:false,
        tableData:[],
        showFlag:false,
        dropDownGroup: {},
        form: {
          supplierId: "",
          masterName: "",
          personId:"",
          scoreItemList:[],
          remark:""
        },
        remark2:"",
        num2:0,
        max:1,
        options:[{
          value: '通过',
          label: '不通过'
        }, {
          value: '通过',
          label: '不通过'
        },]
      }
    },
    mounted() {
      this.init(0)
    },
    methods: {
      init(i){
        this.loading = true;
        var personId = this.$route.query.personId || this.GetQueryValue("personId");
        this.$api.invest.ShowZzItemForPerson({personId:personId}).then(res => {
          this.loading = false;
          this.dropDownGroup = res;
          this.form.supplierId = this.dropDownGroup.supplierList[0].value
          this.max = this.dropDownGroup.supplierList.lenght;
          this.form.masterName = res.masterName
          this.tableData = res.zzItemList
        });
      },
      GetQueryValue(variable) {
        let s = window.location.search.substring(1);
        var vars = s.split("&");
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] == variable) {
            return pair[1];
          }
        }
        return false;
      },
      tiJiao(){
        var t = []
        var f = 0;
        for(var i=0;i<this.tableData.length;i++){
          if(!this.tableData[i].scoreDesc){
            f++;
            break;
          }
          var j = {}
          j.id=this.tableData[i].itemId;
          j.itemId = this.tableData[i].itemId
          j.scoreDesc = this.tableData[i].scoreDesc
          j.giveScore = 0
          t.push(j)
        }
        if(f>0){
          this.$confirm("请完成所有打分项后再提交", "提示", {
            confirmButtonText: "确定",
            type: "warning",
          }).then(() => {
            return
          }).catch(() => {
            return
          });
        }else{
          this.$confirm("提交后不能修改，确认要提交吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.$api.invest.SavePersonScoreAndZzScore({personId:this.$route.query.personId,supplierId:this.form.supplierId,scoreItemList:t,remark:this.remark2}).then(res => {
              if(res.success) {
                this.$message.success(res.message);
                if(this.num2+1<this.max){
                  this.num2 = this.num2+1
                  this.init(this.num2)
                }else{
                  this.$router.push({
                    path: '/user/todoList'
                  })
                }
              } else {
                this.$message.error(res.message)
              }
            })
          }).catch(() => {
            this.$msg({ type: "info", message: "已取消", });
          });
        }
      },
    }
  }
</script>


<style scoped>
  .el-select, .el-input {
    width: 16rem;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  .mh {
    /*min-height:500px;*/
  }
</style>
