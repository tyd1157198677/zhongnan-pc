<template>
  <div class="homepage">
    <div class="customer-and-info mr-b">
      <div>
        <el-row>
          <el-col :span="24">
            <div><img src="~@/assets/banner02.jpg" /></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bottom-chart-wrap mr-b">
      <el-row>
        <el-col :span="16">
          <h3 class="tit">招采公公告 <span style="color: darkred"> (10)</span><span class="more">更多></span></h3>
          <div class="news-list-box chart-box" style="padding: 10px">
            <el-table :data="newsList" border style="width: 100%; overflow: auto">
              <el-table-column prop="UserName" label="公告名称"></el-table-column>
              <el-table-column prop="landGetjibie" label="发布时间" align="center" width="120px"> </el-table-column>
              <el-table-column prop="heightLimite" label="报名截止时间" align="center" width="150px"> </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="8">
          <el-col :span="24" style="margin-top: -10px; text-align: center">
            <el-col :span="12">
              <el-button type="primary" size="small" style="width: 90%">供方注册</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" size="small" style="width: 90%">供方登录</el-button>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <div style="background: #f4f4f4; padding: 5px; cursor: pointer">
                <p class="align-center"><img src="/Images/icons/notice.png" width="32" height="32" /></p>
                <p class="align-center">注册须知</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="background: #f4f4f4; padding: 5px; cursor: pointer">
                <p class="align-center"><img src="/Images/icons/notice.png" width="32" height="32" /></p>
                <p class="align-center">注册须知</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="background: #f4f4f4; padding: 5px; cursor: pointer">
                <p class="align-center"><img src="/Images/icons/notice.png" width="32" height="32" /></p>
                <p class="align-center">注册须知</p>
              </div>
            </el-col>
          </el-col>
          <el-col :span="24">
            <div class="news-list-box chart-box" style="padding: 10px">
              <el-table :data="tableData" border style="width: 100%; overflow: auto">
                <el-table-column prop="UserName" label="最新通知"></el-table-column>
                <el-table-column prop="landGetjibie" label="发布时间" align="center" width="120px"> </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <h3 class="tit">政策法规 <span style="color: darkred"> (10)</span><span class="more">更多></span></h3>
          <div class="news-list-box chart-box" style="padding: 10px">
            <el-table :data="scoring1" border style="width: 100%; overflow: auto">
              <el-table-column prop="UserName" label="公告名称"></el-table-column>
              <el-table-column prop="landGetjibie" label="发布时间" align="center" width="120px"> </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="8" style="margin-top: 0">
          <h3 class="tit">意见反馈</h3>
          <div>
            <img src="~@/assets/Group.png" />
          </div>
          <div style="font-size: 14px; padding: 10px 0">意见反馈邮箱： tangdehua@wisevictor.com</div>
          <div style="font-size: 14px">技术支持电话： 189 1184 2971</div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="相关方列表" :visible.sync="dialogFormVisible">
      <el-card class="box-card" shadow="never" :body-style="{ padding: '15px' }">
        <div class="InformationAuthor">
          <el-row class="toolbox">
            <el-input placeholder="请输入相关方名称" v-model="input" clearable style="width: 25%"> </el-input>
            <el-button>搜索</el-button>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="tableData" border style="width: 100%; height: 500px">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="UserName" label="相关方名称"> </el-table-column>
                <el-table-column prop="Telephone" label="联系方式"> </el-table-column>
              </el-table>
              <div class="paginationClass" style="margin-top: 10px">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 50, 100]"
                  :total="totalCount"
                  :pager-count="5"
                  :page-size="1"
                  layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import {
  exportMultipleRingOption,
  exportRosePieOption,
  exportLineOption,
  exportXBarOption,
  exportYBarOption,
  exportLineOptiontwo,
  exportTextCloudOption,
  problomList,
  exportChunkChartOption,
} from "@/views/getChartOption.js";
import bus from "@/util/bus";
export default {
  data() {
    return {
      dialogFormVisible: false,
      input: "",
      TempType3: "",
      TempType2: "",
      TempType1: "",
      TempType: "",
      tableData: [
        {
          UserName: "2021年供应商大会通知",
          landGetjibie: "2021-04-19",
        },
        {
          UserName: "2021年供应商大会通知",
          landGetjibie: "2021-04-19",
        },
        {
          UserName: "2021年供应商大会通知",
          landGetjibie: "2021-04-19",
        },
        {
          UserName: "2021年供应商大会通知",
          landGetjibie: "2021-04-19",
        },
        {
          UserName: "2021年供应商大会通知",
          landGetjibie: "2021-04-19",
        },
        {
          UserName: "2021年供应商大会通知",
          landGetjibie: "2021-04-19",
        },
      ],
      scoring1: [
        {
          UserName: "建筑业企业资质管理规定",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "工程咨询行业管理办法",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "建筑工程设计招标投标管理办法",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "电子招标投标办法-第一章 总 则 ",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "电子招标投标办法-第二章 电子招标投标交易平台",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
      ],
      scoring2: [
        {
          value: 210,
          name: "集团级",
        },
        {
          value: 235,
          name: "区域级",
        },
        {
          value: 274,
          name: "城市级",
        },
        {
          value: 235,
          name: "项目级",
        },
      ],
      totalCount: 4,
      currentPage: 1,
      img: require("@/assets/logo.png"),
      currentPageSize: 10,
      // newsList: problomList,
      newsList: [
        {
          UserName: "2020-2022年无形资产专利评估服务招标公告",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "2020-2022年无形资产专利评估服务招标公告",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "2020-2022年无形资产专利评估服务招标公告",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "2020-2022年无形资产专利评估服务招标公告",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "2020-2022年无形资产专利评估服务招标公告",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "2020-2022年无形资产专利评估服务招标公告",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "2020-2022年无形资产专利评估服务招标公告",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
        {
          UserName: "2020-2022年无形资产专利评估服务招标公告",
          landGetjibie: "2020-04-01",
          heightLimite: "2020-04-01 12:25",
        },
      ],
    };
  },
  mounted() {
    bus.$emit("showNav");
    //质量问题数统计
    this.getRannulusPieOption(this.scoring1, this.$refs["quality-peichart"], "供方等级统计分析");
    //安全问题数统计
    this.getRannulusPieOption(this.scoring2, this.$refs["security-piechart"], "合作层级统计分析");
    // //深化设计统计
    // this.getRosePieOption('GetEchartDES', this.$refs['deepdesign-piechart'], '深化设计')
    // //RFI问题追踪
    // this.getRosePieOption('GetEchartRFI', this.$refs['problem-piechart'], 'RFI')
    //安全问题近7天
    this.getLineOption("GetEchartIssuesMonth", this.$refs["line-chart-box"]);

    //安全问题数统计（承包商）
    this.getBarOption("GetEchartSafetyCooper", this.$refs["bar-chart-box-l"], "x");
    //获取安全问题统计块状图
    // this.getChunkChartOption('GetSafetyRating', this.$refs['bar-chart-box-r'])
    //质量问题近7天
    this.getLineOptiontwo("GetEchartQUAMonth", this.$refs["bottom-line-chart-box"]);
    //质量问题各等级数据统计
    this.getBarOption("GetEchartPMELevel", this.$refs["bottom-bar-chart-box"], "y");
    //获取底部左侧字符云
    this.getTextCloudOption("GetQUAKeyword", this.$refs["l-text-chart"], [25, 110, 250]);
    //获取底部右侧字符云
    this.getTextCloudOption("GetQSKeyword", this.$refs["r-text-chart"], [25, 67, 119]);
  },
  computed: {},
  methods: {
    handleDetail(row) {
      this.$router.push({
        name: "TodoListDetail",
        query: {
          id: row.id,
        },
      });
      // console.log(row);
    },
    lookList() {
      this.dialogFormVisible = false;
    },
    handleClick() {
      this.$router.push({
        name: "TodoList",
      });
    },
    /**
     * 获取圆环图option
     */
    async getRannulusPieOption(result, dom, name) {
      // const result = (await this.$http.get(url)).data.result;
      // let result = []
      // if (url == 'GetEchartQUATotal') {
      //   result = [
      //     {
      //       value: 210,
      //       name: '优秀'
      //     },
      //       {
      //         value: 235,
      //         name: '良好'
      //       },
      //       {
      //         value: 274,
      //         name: '合格'
      //       },
      //       {
      //         value: 235,
      //         name: '不合格'
      //       },
      //       {
      //         value: 274,
      //         name: '候选'
      //       },
      //   ]
      // } else if (url == 'GetEchartSafetyStatus') {
      //   result = [
      //     { value: '16354', name: '总计出现问题' },
      //     { value: '15474', name: '总计关闭问题' },
      //     { value: '0', name: '本周出现问题' },
      //     { value: '0', name: '本周关闭问题' },
      //     { value: '880', name: 'Open问题' }
      //   ]
      // }
      const option = exportMultipleRingOption(result, name);
      this.renderChart(dom, option);
    },
    /**
     * 获取玫瑰图option
     */
    async getRosePieOption(url, dom, name) {
      // const result = (await this.$http.get(url)).data.result;
      let result = [];
      if (url == "GetEchartDES") {
        result = [
          { value: "802", name: "关闭" },
          { value: "18", name: "BBH" },
          { value: "88", name: "PCM" },
          { value: "90", name: "LDI" },
          { value: "88", name: "GD" },
        ];
      } else if (url == "GetEchartRFI") {
        result = [
          { value: "844", name: "关闭" },
          { value: "0", name: "BBH" },
          { value: "17", name: "PCM" },
          { value: "13", name: "LDI" },
        ];
      }
      const option = exportRosePieOption(result, name);
      this.renderChart(dom, option);
    },

    /**
     * 获取折线图option
     */
    async getLineOption(url, dom) {
      // const result = (await this.$http.get(url)).data.result;
      let result = [];
      if (url == "GetEchartIssuesMonth") {
        result = [
          { 日期: "邀请招标", 项目金额: 40, 项目数量: 31 },
          { 日期: "直接委托", 项目金额: 50, 项目数量: 41 },
          { 日期: "竞争性谈判", 项目金额: 60, 项目数量: 31 },
          { 日期: "集采使用", 项目金额: 30, 项目数量: 21 },
          { 日期: "竞争性谈判", 项目金额: 20, 项目数量: 11 },
        ];
      }

      const option = exportLineOption(result);
      this.renderChart(dom, option);
    },
    async getLineOptiontwo(url, dom) {
      // const result = (await this.$http.get(url)).data.result;
      let result = [];
      if (url == "GetEchartQUAMonth") {
        result = [
          { 日期: "咨询类", 本月入库: 40, 本月处罚: 31 },
          { 日期: "服务类", 本月入库: 50, 本月处罚: 41 },
          { 日期: "施工类", 本月入库: 60, 本月处罚: 31 },
          { 日期: "材料设备类", 本月入库: 30, 本月处罚: 21 },
        ];
      }

      const option = exportLineOptiontwo(result);
      this.renderChart(dom, option);
    },
    /**
     * 获取块状图option
     */
    async getChunkChartOption(url, dom) {
      // const result = (await this.$http.get(url)).data.result;
      let result = {
        data: [
          {
            严重的偶尔的: 3802,
            严重的很可能的: 3854,
            严重的很少的: 784,
            严重的频繁的: 505,
            临界的偶尔的: 5545,
            临界的很可能的: 990,
            临界的很少的: 392,
            临界的频繁的: 193,
            可忽略的偶尔的: 58,
            可忽略的很可能的: 20,
            可忽略的很少的: 151,
            可忽略的频繁的: 4,
            灾难的偶尔的: 29,
            灾难的很可能的: 28,
            灾难的很少的: 47,
            灾难的频繁的: 24,
          },
        ],
        xData: ["很少的", "偶尔的", "很可能的", "频繁的"],
        yData: ["可忽略的", "临界的", "严重的", "灾难的"],
      };
      const option = exportChunkChartOption(result);
      this.renderChart(dom, option);
    },

    /**
     * 获取柱状图option
     */
    async getBarOption(url, dom, type) {
      // const result = (await this.$http.get(url)).data.result;
      let result = [];
      if (url == "GetEchartSafetyCooper") {
        result = {
          code: 0,
          count: 0,
          data: [
            { cooperCount: 80, cooperName: "90分以上" },
            { cooperCount: 70, cooperName: "80-90分" },
            { cooperCount: 60, cooperName: "60-79分" },
            { cooperCount: 50, cooperName: "59分以下" },
          ],
          msg: "",
        };
      } else if (url == "GetEchartPMELevel") {
        result = [
          { value: "10", name: "暂停" },
          { value: "11", name: "除名" },
          { value: "3", name: "黑名单" },
        ];
      }
      let obj = {
        x: exportXBarOption,
        y: exportYBarOption,
      };
      const option = obj[type](result);
      this.renderChart(dom, option);
    },

    /**
     * 获取字符云option
     */
    async getTextCloudOption(url, dom, colorarr) {
      // const result = (await this.$http.get(url)).data.result;
      let result = [];
      if (url == "GetQUAKeyword") {
        result = [
          { value: "1", name: "成品保护" },
          { value: "3", name: "构件变形" },
        ];
      } else if (url == "GetQSKeyword") {
        result = [
          { value: "3598", name: "用电安全" },
          { value: "823", name: "化学品安全" },
          { value: "3043", name: "高风险作业包括登高吊装起吊受限空间作业等" },
          { value: "2241", name: "设备设施安全" },
          { value: "616", name: "个人防护用品" },
          { value: "35", name: "挂牌上锁" },
          { value: "115", name: "特种设备安全" },
          { value: "1387", name: "不安全行为" },
          { value: "3207", name: "其他包括安全标识等" },
          { value: "507", name: "消防安全可燃物管理" },
          { value: "334", name: "消防安全动火作业管理" },
          { value: "116", name: "消防安全易燃易爆化学品管理" },
          { value: "78", name: "消防安全用电管理" },
          { value: "112", name: "消防安全临时消防设施管理" },
          { value: "117", name: "消防安全其他" },
        ];
      }
      let option = exportTextCloudOption(result, colorarr);
      this.renderChart(dom, option);
    },
    /**
     * 渲染统计图
     */
    renderChart(dom, option) {
      let c = this.$echarts.init(dom);
      c.setOption(option, true);
    },
    //分页功能
    handleSizeChange: function (val) {
      this.currentPageSize = val;
      // this.loadTodoList();
      // this.getiTPMasterList();
    },
    handleCurrentChange: function (val) {
      this.currentPage = val;
      // this.loadTodoList();
      // this.getiTPMasterList();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-col-8 {
  width: 30.33333%;
  margin-left: 2%;
  margin-top: 20px;
}
.homepage {
  // width: 88%;
  margin: 0px auto 20vh;
}
::v-deep .el-carousel__container {
  position: relative;
  height: 19vw;
}
::v-deep .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
.more {
  float: right;
  cursor: pointer;
  padding-right: 25px;
  font-size: 14px;
  color: #5f99f9;
}
.dabtime {
  float: right;
  padding-right: 10px;
  padding-top: 4px;
}
::v-deep .el-divider__text,
.el-link {
  font-weight: 600;
  font-size: 15px;
}
::v-deep .el-link.el-link--default {
  color: #ffb403;
}
::v-deep .el-main {
  width: 100%;
  margin: -20px auto 0;
}
::v-deep .el-col-3 {
  width: 14.2%;
  margin-bottom: 15px;
}
::v-deep .el-carousel__indicator--horizontal {
  display: inline-block;
  padding: 12px 4px;
  opacity: 0;
}
.home {
  .logo {
    width: 90%;
    height: 85px;
  }
  .el-main {
    width: 100%;
    margin: -20px auto 0;
  }
}
.home {
  height: auto;
  .el-main[data-v-60e59358] {
    // width: 88%;
    margin: -20px auto 0;
  }
  .homeHeader {
    // position: absolute;
    // left: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    background-color: #ffb403;
    border-radius: 4px;
    margin: 10px 0;
    color: #ffffff;
  }
  .cardWrap {
    //display: flex;
    //justify-content: space-between;
    border-radius: 10px;
    overflow: auto;
    .iconWrap {
      width: 50%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #ffffff;
      font-size: 30px;
    }
    .textWrap {
      width: 50%;
      background: #f2f2f2;
      height: 60px;
      line-height: 25px;
      padding-top: 5px;
      display: flex;
      flex-direction: column;
      text-align: center;
      color: #ffb403;
      box-sizing: border-box;
      h4 {
        margin: 0;
        font-size: 18px;
      }
      p {
        margin: 0;
      }
    }
  }
  .homeTips {
    padding: 10px 10px;
    background-color: #f2f2f2;
    border-radius: 4px;
    border-left: 5px solid #ffb403;
    margin: 10px 0;
  }
}
//bmw
.box {
  box-shadow: 0 0 5px #d8d8d8;
  background: rgba(254, 254, 254, 1);
  border-radius: 6px;
  position: relative;
}
.chart-box {
  width: 100%;
  height: calc(100% - 50px);
}
.mr-b {
  margin-bottom: 20px;
}
.tit {
  color: darkred;
  font-size: 16px;
  line-height: 50px;
  letter-spacing: 1px;
  margin: 0;
  font-weight: bolder;
  padding-left: 20px;
  border-bottom: 1px solid #efeeee;
  box-sizing: border-box;
}
.customer-and-info {
  display: flex;
  height: 140px;
  justify-content: space-between;
  .customer {
    height: 100%;
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    .customer-cli {
      display: block;
      cursor: pointer;
      font-size: 14px;
      width: 95px;
      line-height: 30px;
      border-radius: 16px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      background: #5f99f9;
      transition: 0.3s;
    }
    .customer-cli:hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }
  .today-info-list {
    display: flex;
    width: calc(100% - 200px - 30px);
    justify-content: space-between;
    .today-info-item {
      display: flex;
      width: 20%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #1d3048;
      margin-top: 10px;
      > img {
        width: 60px;
      }
      > strong {
        font-size: 36px;
        padding: 5px 0;
      }
      > span {
        font-size: 14px;
      }
    }
  }
}
.pie-chartlist-wrap {
  width: 100%;
  display: flex;
  height: 270px;
  > div {
    width: 25%;
    height: 100%;
  }
}
//安全生产
.s-box {
  height: 100%;
  width: 320px;
  .s-box-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #313b49;
    > span {
      padding: 15px 0;
      font-size: 18px;
    }
    > div {
      > strong {
        font-size: 48px;
        margin-right: 15px;
      }
      > span {
        font-weight: 400;
        font-size: 17px;
        position: relative;
        top: -4px;
      }
    }
  }
}
//我的待办
.news-list {
  width: 320px;
  height: 100%;
  .news-list-box {
    padding: 16px 25px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .news-list-total {
      width: 273px;
      width: 100%;
      height: 58px;
      background: rgba(160, 196, 255, 1);
      margin: 0 auto;
      display: flex;
      justify-content: center;
      color: #5a626d;
      align-items: center;
      span {
        font-size: 14px;
        padding: 0px 50px 0 25px;
      }
      strong {
        font-size: 32px;
        margin-top: -3px;
      }
    }
    .news-list-content {
      text-align: left;
      height: 100%;
      width: 100%;
      ul {
        padding: 10px 0;
        margin: 0;
        box-sizing: border-box;
        li {
          color: #5a626d;
          list-style: none;
          margin-bottom: 10px;
          transition: 1s;
          cursor: pointer;
          &:hover {
            color: #4688f8;
          }
          strong {
            font-size: 14px;
            margin-bottom: 3px;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
          }
          span {
            font-size: 12px;
          }
        }
      }
      > span {
        transition: 1s;
        color: #5a626d;
        cursor: pointer;
        &:hover {
          color: #4688f8;
          font-weight: bold;
        }
      }
    }
  }
}
.center-box {
  display: flex;
  justify-content: space-between;
  height: 618px;
  .center-con-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 320px - 30px);
    height: 100%;
    .center-top-box {
      display: flex;
      justify-content: space-between;
      height: 295px;
      .line-chart {
        height: 100%;
        width: calc(100% - 320px - 30px);
      }
    }
    .bar-chart {
      height: 295px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .bar-chart-l {
        width: calc(100% - 50% - 30px);
        height: 100%;
      }
      .bar-chart-r {
        width: 50%;
        height: 100%;
      }
    }
  }
}

.bottom-chart-wrap {
  //display: flex;
  //justify-content: space-between;
  //flex-wrap: wrap;
  //align-content: space-between;
  //> div {
  //  width: calc(100% / 2 - 10px);
  //  height: 295px;
  //}
  //.text-cloud-box {
  //  padding: 20px;
  //  box-sizing: border-box;
  //  .l-text-chart {
  //    background: rgba(176, 202, 251, 0.1);
  //  }
  //  > div {
  //    width: 100%;
  //    height: 100%;
  //  }
  //}
}

.video-list-wrap {
  height: 330px;
  width: 100%;
  .video-list-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .video-content {
      width: 69%;
      display: flex;
      // justify-content: space-between;
      .video-wrap {
        width: 33%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 10px;
        flex-wrap: wrap;
        justify-content: space-around;
        video {
          outline: none;
        }
        span {
          color: #46515c;
          font-size: 17px;
        }
      }
    }
  }
  .video-info-list {
    font-size: 16px;
    width: 30%;
    height: 100%;
    font-weight: 100;
    padding: 5px 15px;
    box-sizing: border-box;
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        transition: 1s;
        line-height: 36px;
        color: #5a626d;
        cursor: pointer;
        &:hover {
          color: #4688f8;
        }
        img {
          vertical-align: text-top;
          margin-right: 15px;
        }
      }
    }
    > span {
      transition: 1s;
      color: #5a626d;
      display: block;
      text-align: right;
      cursor: pointer;
      position: absolute;
      right: 26px;
      top: 16px;
      &:hover {
        color: #4688f8;
        font-weight: bold;
      }
    }
  }
}

.susbox {
  width: 200px;
  height: auto;
  position: fixed;
  right: 0;
  bottom: 100px;
  background: #fefefe;
  .susbox-tit {
    color: #46515c;
    font-weight: 100;
    font-size: 16px;
    line-height: 44px;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #efeeee;
  }
  > div {
    text-align: center;
  }
  > span {
    position: absolute;
    cursor: pointer;
  }
  .susbox-close-btn {
    right: 2px;
    top: 7px;
  }
  .show-susbox {
    left: -34px;
    top: 3px;
    transition: 1s;
  }
  .hidebtn {
    opacity: 0;
  }
}

.fade-out {
  animation: moveout 1.5s ease 1;
  animation-fill-mode: forwards;
}
@keyframes moveout {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(200px);
  }
}

.fade-in {
  animation: movein 1.5s ease 1;
  animation-fill-mode: forwards;
}
@keyframes movein {
  from {
    transform: translateX(200px);
  }
  to {
    transform: translateX(0);
  }
}
.piechart {
  width: 50%;
  height: 100%;
  float: left;
}
::v-deep .el-table--border td {
  border-right: 0px solid #ebeef5;
}
::v-deep .el-table--border th {
  border-right: 0px solid #ebeef5;
}
::v-deep .el-table th {
  padding: 5px 0;
  background-color: #fff;
  color: #333333;
}
::v-deep .el-table td {
  padding: 5px 0;
}
::v-deep .el-table td {
  border-bottom: 1px dotted #cccccc;
  padding: 5px 0;
}
::v-deep .el-table th {
  border-bottom: 1px solid #ebeef5;
}
::v-deep .el-table--border {
  border: 0px solid #ebeef5;
}
::v-deep .el-table--border::after {
  width: 0px;
}
::v-deep .el-table::before {
  height: 0px;
}
::v-deep .el-table .cell {
  line-height: 30px;
}
</style>
