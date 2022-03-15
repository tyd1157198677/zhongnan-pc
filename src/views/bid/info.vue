<!--  -->
<template>
  <div class="" style="margin-bottom:90px">
    <el-main>
      <div style="margin: 10px 0;text-align:right">
        <el-button size="mini" @click="$router.back(-1)">返回</el-button>
      </div>
      <div class="pub">基本信息</div>
      <el-form label-width="150px">
        <div>
          <el-table
            empty-text="无符合条件的记录"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="files"
            v-loading="loading"
          >
            <el-table-column type="index" width="90" label="序号" align="center"> </el-table-column>
            <el-table-column label="标题" prop="todoTitle" align="center"> </el-table-column>
            <el-table-column label="接收人" prop="userName" width="150" align="center"> </el-table-column>
            <el-table-column label="发送时间" prop="creationTime" width="200" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="状态" prop="isCompleted" align="center"> </el-table-column> -->
            <el-table-column label="处理时间" prop="doTime" width="200" align="center"> </el-table-column>
          </el-table>
        </div>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import { parseTime } from "@/util";
export default {
  components: {},
  data() {
    return {
      type: this.$route.query.type,
      textarea: "",
      loading: "",
      files: [],
    };
  },
  computed: {
    bidModeId() {
      return this.$route.query.bidModeId;
    },
  },
  watch: {},
  methods: {
    onDelete(row) {},
    downLoad(row) {},
    submiteva(row) {},
  },
  created() {},
  mounted() {
    console.log(this.type);
    this.getList1();
  },
  methods: {
    parseTime,
    getList1() {
      this.$http.get("/LiandoBidMaster/GetTodoList", { params: { bidModeId: this.bidModeId, type: this.type } }).then(res => {
        this.files = res.data;
      });
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
.btns {
  text-align: right;
  margin: 10px 0;
}
</style>
