<template>
  <div>
    <el-tabs type="card" v-model="activeName" style="margin-top:10px">
      <el-tab-pane label="招标组长" name="招标组长">
        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="zuzhangdata">
          <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
          <el-table-column label="姓名" prop="userName" align="center"></el-table-column>
          <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="商务组成员" name="商务组成员">
        <!-- <el-select style="margin-bottom:10px" v-model="biaoduanvalue" size="small" placeholder="请选择标段" @change="handleChange">
          <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select> -->

        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="shangwudata">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column label="标段" prop="sectionName" align="center"> </el-table-column>
          <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
          <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
          <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="技术组成员" name="技术组成员">
        <!-- <el-select style="margin-bottom:10px" v-model="biaoduanvalue" size="small" placeholder="请选择标段" @change="handleChange">
          <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select> -->
        <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="jishudata">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column label="标段" prop="sectionName" align="center"> </el-table-column>
          <el-table-column label="姓名" prop="userName" align="center"> </el-table-column>
          <el-table-column label="登录名" prop="loginId" align="center"> </el-table-column>
          <el-table-column label="部门" prop="depName" align="center"> </el-table-column>
          <!-- <el-table-column label="评标类型" prop="bidPersonExam" align="center"> </el-table-column> -->
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/**
 * 招标采购-标段信息
 */
export default {
  name: "step3",
  components: {},
  props: ["id"],
  inject: ["reload"],
  data() {
    return {
      biaoduanvalue: "",
      options: [],
      activeName: "招标组长",
      zuzhangdata: [],
      shangwudata: [],
      jishudata: [],
      // loading: false,
    };
  },
  computed: {
    planId() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return this.id;
      }
    },
  },
  created: function() {
    // this.planId = sessionStorage.getItem("bidModeId");
  },
  mounted() {
    this.getzuzhangList();
    this.getshangwuList();
    this.getjishuList();
  },
  methods: {
    // getbidModeId() {
    //   this.$http.get("/LiandoBidMaster/GetBidMasterByModeId", { params: { bidModeId: this.bidModeId } }).then(res => {
    //     console.log(this.bidModeId);
    //     this.planId = res.data.planId;
    //     console.log(this.planId);
    //     // this.getSelectionlist();
    //     this.getzuzhangList();
    //   this.getshangwuList();
    //   this.getjishuList();
    //   });
    // },
    // async getSelectionlist() {
    //   let res = await this.$http.get("/LiandoPlan/GetSectionDropDown03", { params: { planId: this.planId } });
    //   this.biaoduanvalue = res.data.length > 0 ? res.data[0].value : "";
    //   this.options = res.data;

    // },
    handleChange() {
      switch (this.activeName) {
        case "招标组长":
          this.getzuzhangList();
          break;
        case "商务组成员":
          this.getshangwuList();
          break;
        case "技术组成员":
          this.getjishuList();
          break;
      }
    },
    getzuzhangList() {
      this.$http.get("/LiandoPlan/GetBidLeader03", { params: { planId: this.planId } }).then(res => {
        this.zuzhangdata = [res.data];
      });
    },
    getshangwuList() {
      this.$http.get("/LiandoPlan/GetBusinessUser03", { params: { planId: this.planId } }).then(res => {
        if (res.status == 200) {
          this.shangwudata = res.data;
        }
      });
    },
    getjishuList() {
      this.$http.get("/LiandoPlan/GetTechUser03", { params: { planId: this.planId } }).then(res => {
        if (res.status == 200) {
          this.jishudata = res.data;
        }
      });
    },
  },
};
</script>
