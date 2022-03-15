<template>
  <div>
    <table class="layui-table el-table__body mt-3">
      <tbody>
      <tr>
        <td style="width: 20%" class="right">投标保证金（元）：</td>
        <td style="width: 30%">
          {{this.data1.deposit}}
        </td>
        <td style="width: 20%" class="right">收款银行：</td>
        <td style="width: 30%">
          {{this.data1.bankName}}
        </td>

      </tr>
      <tr>
        <td style="width: 20%" class="right">收款账号：</td>
        <td style="width: 30%">
          {{this.data1.bankAccount}}
        </td>
        <td style="width: 20%" class="right">分行信息：</td>
        <td style="width: 30%">
          {{this.data1.bankAddress}}
        </td>
      </tr>

      <tr>
        <td style="width: 20%" class="right">收取单位：</td>
        <td style="width: 30%">
          {{this.data1.level}}
        </td>
        <td style="width: 20%" class="right">招标专业：</td>
        <td style="width: 30%">
          {{this.data1.cateName}}
        </td>
      </tr>
      <tr>
        <td style="width: 20%" class="right">入围标准：</td>
        <td style="width: 30%" colspan="3">
          {{this.data1.desc}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  export default {
    name: "Step1",
    data() {
      return {
        data1:{},
        planId:""
      };
    },
    created: function() {
      this.planId=this.$route.query.id;
    },
    mounted(){
      this.$api.supIn.GetMasterByPlanId01({planId:this.planId}).then(res => {
          this.data1 = res;
      });
    },
    methods: {

    },
  };
</script>
