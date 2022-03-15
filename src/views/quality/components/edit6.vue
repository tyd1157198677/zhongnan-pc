<!--  -->
<template>
  <div class="">
    <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><b>10.大宗材料采买及劳务合作情况</b></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="btns" v-if="type == 1">
      <el-button type="primary" size="mini" @click="downLoad">下载模板</el-button>
      <el-upload style="margin:0 10px" class="upload" action="#" multiple :show-file-list="false" :http-request="uploadFile">
        <el-button type="primary" size="small">导入数据</el-button>
      </el-upload>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="大宗材料采买" name="first">
        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="data1">
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column label="类别" align="center">
            <template slot-scope="scope"
              ><span class="sp"> {{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="名牌" align="center">
            <template slot-scope="scope">
              <span class="sp">{{ scope.row.plate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="companyName" label="单位名称" align="center" min-width="200" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="tel" label="联系方式" align="center" width="150"></el-table-column>
          <el-table-column prop="settleType" label="账期及结算方式" align="center" width="150"> </el-table-column>
          <el-table-column prop="remark" label="合作年限" align="center" width="100"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="劳务合作" name="second">
        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="data2">
          <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
          <el-table-column label="类别" show-overflow-tooltip>
            <template slot-scope="scope"
              ><span class="sp"> {{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="长期合作几套班组" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="sp">{{ scope.row.class }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="班组长姓名" align="center" width="150"> </el-table-column>
          <el-table-column prop="tel" label="联系方式" align="center" width="100"></el-table-column>
          <el-table-column prop="settleType" label="结算方式" align="center" width="90"> </el-table-column>
          <el-table-column prop="remark" label="合作年限" align="center" width="90"> </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
    },
    url: {
      type: String,
    },
    url1: {
      type: String,
    },
  },
  components: {},
  data() {
    return {
      activeName: "first",
      data1: [],
      data2: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.GetSupQuaLaborList_Index();
    this.GetSupQuaPurchaseList();
  },
  methods: {
    downLoad() {
      if (this.activeName == "first") {
        console.log(1);
        window.location.href = process.env.VUE_APP_API_URL + this.url;
      } else {
        window.location.href = process.env.VUE_APP_API_URL + this.url1;
      }
    },
    uploadFile(item) {
      const fileObj = item.file;
      const from = new FormData(); // FormData 对象
      from.append("file", fileObj);
      from.append("masterId", this.$route.query.id);
      if (this.activeName == "first") {
        this.$http.post("/SupQua/LeadSupQuaPurchase", from).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetSupQuaPurchaseList();
          } else {
            this.$msg.error(res.data.message);
          }
        });
      } else {
        this.$http.post("/SupQua/LeadSupQuaWorkTogether", from).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetSupQuaWorkTogetherList();
          } else {
            this.$msg.error(res.data.message);
          }
        });
      }
    },
    handleTabClick() {
      if (this.activeName == "first") {
        this.GetSupQuaPurchaseList();
      } else {
        this.GetSupQuaWorkTogetherList();
      }
    },
    async GetSupQuaLaborList_Index() {
      let res = await this.$http.get("/SupQua/GetSupQuaLaborList_Index", { params: { masterId: this.$route.query.id } });
      //   console.log(res);
      //   res.data.forEach(item => {
      //     if (item.item.itemType == "单选" || item.item.itemType == "下拉") {
      //       if (item.selectorList.length > 0 && item.textValue) {
      //         item.textValue = item.selectorList.find(e => e.selectorId == item.textValue).selectorText;
      //       }
      //     } else if (item.item.itemType == "多选") {
      //       if (item.selectorList) {
      //         let arr = item.selectorList.filter(e => item.selectValue.indexOf(e.selectorId) > -1);
      //         item.selectValue = arr.map(s => s.selectorId);
      //       }
      //     }
      //   });
      this.laoWuStyleList = res.data;
    },
    //获取大宗材料采买列表
    async GetSupQuaPurchaseList() {
      let res = await this.$http.get("/SupQua/GetSupQuaPurchaseList", { params: { masterId: this.$route.query.id } });
      this.data1 = res.data;
    },
    //获取劳务合作列表
    async GetSupQuaWorkTogetherList() {
      let res = await this.$http.get("/SupQua/GetSupQuaWorkTogetherList", { params: { masterId: this.$route.query.id } });
      this.data2 = res.data;
    },

    save3() {
      let arr = this.laoWuStyleList.map(item => {
        return {
          itemId: item.item.id,
          itemSelectorId:
            item.item.itemType == "单行文本" || item.item.itemType == "多行文本"
              ? ["00000000-0000-0000-0000-000000000000"]
              : item.item.itemType == "多选"
              ? item.selectValue
              : [item.textValue],
          value: item.item.itemType == "单行文本" || item.item.itemType == "多行文本" ? item.textValue : "",
        };
      });
      let obj = {
        masterId: this.id,
        formValues: arr,
      };
      this.$http.post("/SupQua/SaveSupQuaLaborList_Persion", obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.$message.success(data.message);
          this.GetSupQuaLaborList_Index();
        } else {
          this.$message.error(data.message);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .line .el-input__inner {
  border: 0px solid #fff !important;
  border-bottom: 1px solid #ccc !important;
  border-radius: 0% !important;
}
::v-deep .select1.el-select {
  width: 100% !important;
}
.btns {
  display: flex;
  margin: 10px 0;
  justify-content: flex-end;
}
.center {
  text-align: center;
}
</style>
