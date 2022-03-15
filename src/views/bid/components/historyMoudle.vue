<!--  -->
<template>
  <div class="">
    <div>
      <!-- <div> -->
      <!-- <div v-if="tableList.length > 0"> -->
      <el-alert title="暂无数据" type="warning" v-if="tableList.length == 0" :closable="false"> </el-alert>
      <div>
        <el-table
          v-for="item in tableList"
          :key="item.title"
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="item.supplierList"
        >
          <el-table-column :label="item.title" align="center">
            <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
            <el-table-column label="供方名称" align="center" prop="comFullName"> </el-table-column>
            <el-table-column v-for="(item1, index) in item.userNameList" :key="index" :label="item1" align="center" prop="name1">
              <template slot-scope="scope">
                <span :style="{ color: scope.row.isCompleted[index] ? 'green' : 'red' }">{{
                  scope.row.isCompleted[index] ? "√" : "×"
                }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["id", "selectId2"],
  data() {
    return {
      title: "",
      tableList: [
        {
          userNameList: [],
        },
        // {
        //   title: "说明",
        //   userNameList: ["名字1"],
        //   supplierList: [
        //     {
        //       comFullName: "慧睿达",
        //       isCompleted: [true],
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {},
  watch: {
    selectId2() {
      this.GetTempItem();
    },
  },
  created() {},
  mounted() {
    this.GetTempItem();
  },
  methods: {
    GetTempItem() {
      if (!this.selectId2) {
        return;
      }
      this.$http.get("/ExamCenter/GetBidExamCenterProcess01", { params: { bidModeId: this.id, sectionId: this.selectId2 } }).then(res => {
        // console.log(res);
        this.tableList = res.data;
        // this.activeName = res.data.bidExamSectionList.length > 0 ? res.data.bidExamSectionList[0].sectionId : "";
      });
    },
    tomethgohistoryMoudle() {
      this.GetTempItem();
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
