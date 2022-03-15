<template>
  <el-main>
    <el-card style="margin-bottom: 60px">
      <table class="layui-table el-table__body">
        <tbody>
          <tr>
            <td class="right" style="width: 130px">需求部门:</td>
            <td colspan="3">{{ xuQiuForm.depName }}</td>
            <td class="right" style="width: 130px">招标计划名称:</td>
            <td colspan="3">{{ xuQiuForm.planName }}</td>
            <td class="right" style="width: 130px">招标层级:</td>
            <td colspan="3">{{ xuQiuForm.bidLevel }}</td>
            <td class="right" style="width: 130px">招标方式:</td>
            <td colspan="3">{{ xuQiuForm.purchaseType }}</td>
          </tr>
          <tr>
            <td class="right">计划定标日期:</td>
            <td colspan="3">
              {{ parseTime(xuQiuForm.bidEndDate, "yyyy-MM-dd") }}
            </td>
            <td class="right">含税总限价（元）:</td>
            <td colspan="3">{{ xuQiuForm.taxPrice }}</td>
            <td class="right">不含税总限价（元）:</td>
            <td colspan="3">{{ xuQiuForm.noTaxPrice }}</td>
            <td class="right">经办人:</td>
            <td colspan="3">{{ xuQiuForm.userName }}</td>
          </tr>
          <tr>
            <td class="right">相关说明:</td>
            <td colspan="15">
              {{ xuQiuForm.requireDesc }}
            </td>
          </tr>
        </tbody>
      </table>
      <el-table
        empty-text="无符合条件的记录"
        stripe
        element-loading-text="请稍候,数据正在加载中..."
        :data="xuQiuForm.detailList"
        :header-cell-style="{ background: 'transparent' }"
      >
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <!-- <el-table-column prop="majorType" label="分类" align="center" width="80"> </el-table-column> -->
        <el-table-column label="项目或期区名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="含税总限价（元）" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.taxPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="不含税总限价（元）" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.noTaxPrice }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-main>
</template>

<script>
import { parseTime } from "@/util";
export default {
  data() {
    return {
      bidLevel: [],
      depNames: [],
      purchaseTypes: [],
      categoryVisible: false,
      planId: "",
      showtitle: "",
      index: 0,
      xuQiuForm: {
        id: "",
        depName: "",
        planName: "",
        bidLevel: "",
        purchaseType: "",
        bidEndDate: "",
        bidCateId: "",
        bidCateName: "",
        requireDesc: "",
        isSubmit: true,
        taxPrice: 0,
        noTaxPrice: 0,
        detailList: [],
      },
    };
  },
  computed: {
    bidModeId() {
      return this.$route.params.bidModeId;
    },
    // planId() {
    //   return this.$route.params.planId;
    // },
    // todoId() {
    //   return this.$route.query.todoId;
    // },
  },
  created: function () {},
  mounted() {
    this.planId = this.$route.query.id;
    this.todoId = this.$route.query.todoId;
    this.getdetail();
  },
  methods: {
    parseTime,
    getdetail() {
      this.$http.get("/ZhiWeiPurchaseAppServices/GetPurchasePlanById", { params: { BidModeId: this.$route.query.id } }).then((res) => {
        this.xuQiuForm = res.data;
      });
    },
    saveto(isSubmit) {
      this.$confirm("您确认要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$refs.xuQiu.validate((valid) => {
          if (valid) {
            this.xuQiuForm.isSubmit = isSubmit;
            this.xuQiuForm.detailList = this.xuQiuForm.detailList.map((e) => {
              return {
                projectId: e.projectId,
                taxPrice: parseInt(e.taxPrice),
                noTaxPrice: parseInt(e.noTaxPrice),
              };
            });
            this.$http.post("/PurchasePlan/SavePurchasePlan", this.xuQiuForm).then((res) => {
              if (res.data.success) {
                this.$msg.success(res.data.message);
                this.$router.go(-1);
              } else {
                this.$confirm(res.data.message, "提示", {
                  confirmButtonText: "确定",
                  type: "warning",
                });
              }
            });
          } else {
            this.$msg.warning("请填写完必填项!");
          }
        });
      });
    },
    onUserAdd(id) {
      this.xuQiuForm.bidUserGuid = id.userGuid;
      this.xuQiuForm.bidUserName = id.userName;
    },
    subJectTree(sub) {
      this.xuQiuForm.detailList[this.index].projectId = sub.id;
      this.xuQiuForm.detailList[this.index].projectName = sub.projectFullName;
      this.$refs.subJectTree.close();
    },
    subJectAdd(index) {
      this.index = index;
      this.$refs.subJectTree.open();
    },
    onChangeCategory(category) {
      this.xuQiuForm.bidCateId = category.id;
      this.xuQiuForm.bidCateName = category.cateName;
      this.categoryVisible = false;
    },
  },
};
</script>

<style scoped></style>
