<template>
  <el-main>
    <el-row id="page_main">
      <div class="panel panel-default">
        <div class="panel-heading center" style="font-size: 16px;font-weight: bold">
          {{ info.noticeTitle }}
        </div>
        <div class="panel-body border p-3">
          <!--<div class="clearfx" style="text-align: center;">-->
                <!--招标单位：{{info.bidBody}}-->
            <!--</div>-->
          <div class="clearfx" style="line-height: 28px; padding: 10px;">
            <b>1、招标内容：</b><br />
            <div class="gg-content" v-html="info.liandoContent">
              <!--{{info.liandoContent}}-->
              <!--<div class="row-main">-->
                <!--<div class="row-in">1.1</div>-->
                <!--<div class="row-content">所属项目：{{ info.projectName }}</div>-->
              <!--</div>-->
              <!--<div class="row-main">-->
                <!--<div class="row-in">1.2</div>-->
                <!--<div class="row-content">项目位置：{{ info.projectAddress }}</div>-->
              <!--</div>-->
              <!--<div class="row-main">-->
                <!--<div class="row-in">1.3</div>-->
                <!--<div class="row-content">招标分类：{{ info.bidCateName }}</div>-->
              <!--</div>-->
              <!--<div class="row-main">-->
                <!--<div class="row-in">1.4</div>-->
                <!--<div class="row-content">项目计划开始日期：{{ info.startDate }}</div>-->
              <!--</div>-->
              <!--<div class="row-main">-->
                <!--<div class="row-in">1.5</div>-->
                <!--<div class="row-content">项目简介：{{ info.projectDesc }}</div>-->
              <!--</div>-->
              <!--<div class="row-main">-->
                <!--<div class="row-in">1.6</div>-->
                <!--<div class="row-content">招标范围：{{ info.bidScope }}</div>-->
              <!--</div>-->
              <!--<div class="row-main">-->
                <!--<div class="row-in">1.7</div>-->
                <!--<div class="row-content">计划工期：{{ info.projectTimeSpan }} 个月</div>-->
              <!--</div>-->
              <!-- <div class="row-main">
                <div class="row-in">1.8</div>
                <div class="row-content">付款方式：{{ info.payType }}</div>
              </div> -->
            </div>
            <b>2、入围标准：</b><br />
            <div class="gg-content" v-html="info.liandoRequire">
              <!--<div class="row-main">-->
                <!--<div class="row-in">2.1</div>-->
                <!--<div class="row-content">注册资金（不低于）：{{ info.regCapitalMin }} (万元)</div>-->
              <!--</div>-->
              <!--<div class="row-main">-->
                <!--<div class="row-in">2.2</div>-->
                <!--<div class="row-content">既往业绩要求：{{ info.caseRequire }}</div>-->
              <!--</div>-->
              <!--<div class="row-main">-->
                <!--<div class="row-in">2.3</div>-->
                <!--<div class="row-content">项目经理团队要求：{{ info.managerRequire }}</div>-->
              <!--</div>-->
            </div>
            <b>3、时间安排：</b><br />
            <div class="gg-content">报名截止时间：{{ info.signUpEndDate }}<br /></div>
            <b>4、联系人信息：</b><br />
            <div class="gg-content">
              <ul>
                <li>姓名：{{ info.personName }}</li>
                <li>电话：{{ info.mobilePhone }}</li>
                <li>地址：{{ info.contactAddress }}</li>
                <li>邮箱：{{ info.personEmail }}</li>
              </ul>
            </div>
            <b>5、报名提交材料：</b><br />
            <div class="gg-content" v-html="info.requireFile">
            </div>
            <!--<b>6、附件信息：</b><br />-->
            <!--<div class="gg-content">-->
              <!--<ul>-->
                <!--<li v-for="(item, index) in info.noticeAttachList" :key="index">-->
                  <!--{{ index + 1 }}、 {{ item.attachName }} <a class="btn btn-primary btn-sm" target="_blank" :href="getFileUrl(item.attachUrl)">下载</a>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </el-row>
  </el-main>
</template>

<script>
import bus from '@/util/bus';
export default {
  data() {
    return {
      baseId: "",
      info: {},
    };
  },
  created() {
    bus.$emit('hideNav');
    let baseId = this.$route.params.baseId;
    if (baseId) {
      this.baseId = baseId;
      this.onSubmit();
    }
  },
  methods: {
    onSubmit() {
      this.$api.BidNotice.ShowNotice(this.baseId).then(res => {
        this.info = res;
        this.$set(this.info, 'requireFile', this.info.requireFile.replace(/\n/g, '<br>'));
        console.log(this.info)
      });
    },
    getFileUrl(attachUrl) {
      return `${process.env.VUE_APP_API_URL}/${attachUrl}`;
    },
  },
};
</script>

<style scope>
.panel-default {
  border-color: #dddddd;
}
.panel {
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}
.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.panel-default > .panel-heading {
  color: #333333;
  background-color: #f5f5f5;
  border-color: #dddddd;
}
.panel-body {
  padding: 15px;
}

.gg-content {
    padding-left: 20px;
}

.row-main {
    float: left;
    width: 100%;
}

.row-in {
    float: left;
    width: 35px;
}

.row-content {
    float: left;
    width: 90%;
}
</style>
