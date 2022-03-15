<template>
    <div>
      <i v-if="type==3" class="el-icon-circle-plus" @click="addGongFang" style="float: right;margin-right: 10px;margin-bottom: 3px;font-size: 28px;"></i>
      <el-button v-if="type==4" size="mini" type="primary" @click="addGongFang" style="float: right;margin-bottom: 10px;">新增</el-button>
      <el-table
        empty-text="暂无数据"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="tableData2.tableValueList"
        v-loading="loading"
      >
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column v-for="(item,index) in tableData2.tableTitleList" :key="index" :label="item" align="center" :width="item.length>4?item.length*22:''">
            <template slot-scope="scope">
           <span>
               {{scope.row.itemValues[index]}}
           </span>
          </template>
             </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <i @click="edit1(scope.row.seNumber)" class="el-icon-edit" title="编辑" style="margin-left:5px" />
            <i @click="delete1(scope.row)" class="el-icon-delete" title="删除" style="margin-left:5px" />
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="flag" :title="title" width="60%">
            <improtantDynamic :tit='title' ref="beijing" :type='type' @getBeiJigList='getList' :seNumber='seNumber'></improtantDynamic>
      </el-dialog>
    </div>
</template>

<script>
import improtantDynamic from "./improtantDynamic";
export default {
  props:['type'],
     components: {
    improtantDynamic,
  },
    data() {
        return {
          title:'新增信息',
          tableData2:{},
          seNumber:Number,
          loading: false,
          flag:false,
          formgongfang:{
            personName: "",
            mobile: "",
            phone:"",
            email: "",
            masterId:this.$route.query.id,
            workAs:"",
            url:['InvesLianDoDynamicForm/GetFormValueTableList1','InvesLianDoDynamicForm/GetFormValueTableList2']
          }
        }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList(){
        this.$http.get(this.type==4?'InvesLianDoDynamicForm/GetFormValueTableList2':'InvesLianDoDynamicForm/GetFormValueTableList1',{params:{masterId:this.$route.query.id}}).then(res => {
          res.data.tableTitleList.splice(0,1)
          this.tableData2 = res.data;
          this.flag=false
        })
      },
      addGongFang(){
        this.seNumber=''
        this.title='新增信息'
          this.flag=true
          this.$nextTick(()=>{
        this.$refs.beijing.GetModuleDynamicForm1()
        })
      },
      delete1(row){
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            let obj={
                masterId: this.$route.query.id,
                cateId: this.tableData2.cateId,
                seNumber: row.seNumber
                }
          this.$http.post(this.type==3?'/FormValue/DeleteFormRowValue':'/FormValue/DeleteFormRowValue',obj).then(res => {
            if(res.data.success) {
              this.$message.success(res.data.message);
              this.getList()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }).catch(() => {
          this.$msg({ type: "info", message: "已取消删除", });
        });
      },
      edit1(seNumber){
        this.seNumber=seNumber
        this.title='编辑信息'
          this.flag=true
        this.$nextTick(()=>{
        this.$refs.beijing.GetModuleDynamicForm1()
        })
        
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
