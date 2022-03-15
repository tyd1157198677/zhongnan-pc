<template>
  <div class="homepage">
    <div class="customer-and-info mr-b">
      <div class="today-info-list box" style="display: block; width: 100%">
        <div>
          <h3 class="tit">
            <div style="width: 100%">
              1.今日供方招采情况统计
              <el-date-picker @change="edittime" v-model="startTime" style="width: 150px" type="date" placeholder="选择结束日期">
              </el-date-picker>
              <el-date-picker v-model="endTime" @change="edittime" style="width: 150px" type="date" placeholder="选择开始日期">
              </el-date-picker>
            </div>
          </h3>
        </div>
        <div style="display: flex; justify-content: space-around">
          <div class="today-info-item">
            <img src="@/assets/home/todoTotal.png" alt />
            <strong>{{ noAuditSupCount }}</strong>
            <span>注册供方未审核</span>
          </div>
          <div class="today-info-item">
            <img src="@/assets/home/todoTotal.png" alt />
            <strong>{{ auditSupCount }}</strong>
            <span>注册供方已审核数量</span>
          </div>
          <!-- <div class="today-info-item">
            <img src="@/assets/home/todoTotal.png" alt />
            <strong>{{ supQuaCount }}</strong>
            <span>资格预审供方数量</span>
          </div> -->
          <!-- <div class="today-info-item">
            <img src="@/assets/home/issuesTotal.png" alt />
            <strong>0</strong>
            <span>入库供方数量</span>
          </div> -->
          <div class="today-info-item">
            <img src="@/assets/home/todoTotal.png" alt />
            <strong>{{ invesCount }}</strong>
            <span>考察供方数量</span>
          </div>
          <div class="today-info-item">
            <img src="@/assets/home/todoTotal.png" alt />
            <strong>{{ bidSendCount }}</strong>
            <span>发标数量</span>
          </div>
          <div class="today-info-item">
            <img src="@/assets/home/todoTotal.png" alt />
            <strong>{{ bidEndCount }}</strong>
            <span>定标数量</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-chart-wrap mr-b">
      <div class="box">
        <h3 class="tit">
          2.黑名单
          <!-- <span style="color:darkred;" v-if="this.newsListblack.totalCount == '' || this.newsListblack.totalCount == null">(0)</span>
          <span style="color:darkred;" v-else>({{ newsListblack.totalCount }})</span>
          <span class="more" @click="moreblack">更多></span> -->
        </h3>
        <div class="news-list-box chart-box" style="padding: 10px">
          <vueSeamlessScroll :data="newsListblack" class="seamless" :class-option="classOption" style="height: 23vh">
            <ul>
              <li v-for="(item, index) in newsListblack" :key="index">
                <!-- <p style="width:100px">{{ index }}</p> -->
                <p style="padding: 3px; color: #26499d" @click="linkToblack(item.blackId, 2)">{{ item.supName }}</p>
              </li>
            </ul>
          </vueSeamlessScroll>
          <!-- <el-table :data="newsListblack" border style="width: 100%;overflow: auto;height:23vh">
            <el-table-column prop="comMainName" label="承接主体名称" align="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <div @click="linkToblack(scope.row.id, 2)" style="cursor: pointer;">
                  <span style="padding:3px;color:#26499d">{{ scope.row.comMainName }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="incident" label="发生事件" align="center" width="200px"> </el-table-column>
          </el-table> -->
        </div>
      </div>
      <div class="box">
        <h3 class="tit">
          3.我的待办
          <span style="color: darkred" v-if="this.newsList.totalCount == '' || this.newsList.totalCount == null">(0)</span>
          <span style="color: darkred" v-else>({{ newsList.totalCount }})</span>
          <span class="more" @click="more">更多></span>
        </h3>
        <div class="news-list-box chart-box" style="padding: 10px">
          <el-table :data="newsList" border style="width: 100%; overflow: auto; height: 23vh">
            <!-- <el-table-column label="序号" type="index" width="50px"></el-table-column> -->
            <el-table-column prop="todoTitle" label="待办名称" align="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <div @click="linkTo(scope.row)" style="cursor: pointer">
                  <span style="padding: 3px; color: #26499d">({{ scope.row.todoMessageCate }}) {{ scope.row.todoTitle }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="todoTime" label="待办时间" align="center" width="150px"> </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="line-chart box" style="margin: 20px 0">
        <h3 class="tit">4.供方合作情况统计</h3>
        <div class="piechart" ref="quality-peichart" id="qualitypeichart"></div>
        <div class="piechart" ref="security-piechart"></div>
      </div>
      <div class="box" style="margin: 20px 0">
        <h3 class="tit">5.招标专业数量统计</h3>
        <div ref="bottom-bar-chart-box" class="chart-box"></div>
      </div>
      <div class="box" style="margin: 20px 0">
        <h3 class="tit">6.供方概况统计分析</h3>
        <div ref="bottom-line-chart-box" class="chart-box"></div>
      </div>
      <div class="line-chart box" style="margin: 20px 0">
        <h3 class="tit">7.招标方式统计</h3>
        <div ref="line-chart-box" class="chart-box"></div>
      </div>
      <!-- <div class="box">
        <h3 class="tit">供方履约统计分析</h3>
        <div ref="bar-chart-box-l" class="chart-box"></div>
      </div> -->
    </div>
    <div class="customer-and-info mr-b">
      <div class="today-info-list box" style="display: block; width: 100%">
        <div>
          <h3 class="tit">8.招标进程</h3>
        </div>
        <div class="news-list-box chart-box" style="padding: 10px">
          <el-table :data="dataList" border style="width: 100%; overflow: auto; height: 157px">
            <el-table-column align="left" label="项目或期区名称" min-width="120px">
              <template slot-scope="scope">
                <span>{{ scope.row.projectName }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" min-width="150px" label="招标计划名称">
              <template slot-scope="scope">
                <!-- <el-link type="primary" style="color:#26499d;text-decoration: none" @click="goto(scope.row.bidModeId)">{{
                  scope.row.planName
                }}</el-link> -->
                <span>{{ scope.row.planName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="经办人" width="120">
              <template slot-scope="scope">
                <span :max-lines="2">{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="60" label="入围">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.selectInStatus2 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.selectInStatus2 == '进行中' || scope.row.selectInStatus2 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.selectInStatus2 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.selectInStatus2 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.selectInStatus2 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
                <el-button
                  v-if="scope.row.selectInStatus2 == '黄色预警'"
                  type="warning"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.selectInStatus2 == '红色预警'"
                  type="danger"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" width="60" label="发标">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.sendStatus3 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.sendStatus3 == '进行中' || scope.row.sendStatus3 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.sendStatus3 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.sendStatus3 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.sendStatus3 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
                <el-button
                  v-if="scope.row.sendStatus3 == '黄色预警'"
                  type="warning"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.sendStatus3 == '红色预警'"
                  type="danger"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" width="60" label="回标">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.backStatus5 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.backStatus5 == '进行中' || scope.row.backStatus5 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.backStatus5 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.backStatus5 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.backStatus5 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
                <el-button
                  v-if="scope.row.backStatus5 == '黄色预警'"
                  type="warning"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.backStatus5 == '红色预警'"
                  type="danger"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" width="60" label="开标">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.openStatus6 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.openStatus6 == '进行中' || scope.row.openStatus6 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.openStatus6 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.openStatus6 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.openStatus6 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" width="60" label="评标">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.examStatus8 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.examStatus8 == '进行中' || scope.row.examStatus8 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.examStatus8 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.examStatus8 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.examStatus8 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
                <el-button
                  v-if="scope.row.examStatus8 == '黄色预警'"
                  type="warning"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.examStatus8 == '红色预警'"
                  type="danger"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" width="60" label="定标">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.endStatus9 == '未开始'"
                  type="info"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.endStatus9 == '进行中' || scope.row.endStatus9 == '正常'"
                  type="success"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button v-if="scope.row.endStatus9 == '已完成'" type="success" icon="el-icon-check" circle size="mini"></el-button>
                <i v-if="scope.row.endStatus9 == '已逾期'" class="el-icon-warning"></i>
                <el-button v-if="scope.row.endStatus9 == '逾期完成'" type="danger" icon="el-icon-check" circle size="mini"></el-button>
                <el-button
                  v-if="scope.row.endStatus9 == '黄色预警'"
                  type="warning"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
                <el-button
                  v-if="scope.row.endStatus9 == '红色预警'"
                  type="danger"
                  circle
                  size="mini"
                  style="width: 15px; height: 15px"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            style="margin-bottom: 10px"
            :total="totalCount"
            :current-page="currentPage"
            :pageSize="page_size"
            @pageChange="pageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/util";
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
} from "@/views/getChartOption.ts";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  inject: ["reload"],
  components: {
    Pagination: () => import("@/components/Pagination.vue"),
    vueSeamlessScroll,
  },
  data() {
    return {
      dataList: [],
      currentPage: 1,
      page_size: 15,
      totalCount: 10,
      input: "",
      TempType3: "",
      TempType2: "",
      TempType1: "",
      TempType: "",
      noAuditSupCount: "",
      auditSupCount: "",
      supQuaCount: "",
      invesCount: "",
      bidSendCount: "",
      bidEndCount: "",

      tableData: [
        {
          UserName: "中建一局",
          Telephone: "010-89898989",
        },
        {
          UserName: "河北建工集团",
          Telephone: "010-89898989",
        },
        {
          UserName: "中铁二局",
          Telephone: "010-89898989",
        },
        {
          UserName: "南通建工",
          Telephone: "010-89898989",
        },
      ],
      scoring1: [
        {
          value: 210,
          name: "优秀",
        },
        {
          value: 235,
          name: "良好",
        },
        {
          value: 274,
          name: "合格",
        },
        {
          value: 235,
          name: "不合格",
        },
        {
          value: 274,
          name: "候选",
        },
      ],
      scoring2: [
        {
          value: 210,
          name: "意向",
        },
        {
          value: 235,
          name: "无意向",
        },
      ],
      totalCount: 4,
      currentPage: 1,
      img: require("@/assets/logo.png"),
      currentPageSize: 10,
      newsList: [],
      newsListblack: [],
      date: "",
      endTime: "",
      startTime: "",
      timedTasksCollector: "",
    };
  },
  computed: {
    classOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 10, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  mounted() {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.GetSupplierReport1();
    this.GetSupplierReport2();
    this.GetSupplierReport3();
    this.getblackList();
    this.startTime = this.getNowFormatDate();
    this.endTime = this.getNowFormatDate1();
    //质量问题数统计

    //安全问题数统计

    // //深化设计统计
    // this.getRosePieOption("GetEchartDES", this.$refs["deepdesign-piechart"], "深化设计");
    // //RFI问题追踪
    // this.getRosePieOption("GetEchartRFI", this.$refs["problem-piechart"], "RFI");
    //安全问题近7天
    this.getLineOption("GetEchartIssuesMonth", this.$refs["line-chart-box"]);
    //安全问题数统计（承包商）
    // this.getBarOption("GetEchartSafetyCooper", this.$refs["bar-chart-box-l"], "x");
    //获取安全问题统计块状图
    // this.getChunkChartOption("GetSafetyRating", this.$refs["bar-chart-box-r"]);
    //质量问题近7天
    this.getLineOptiontwo("GetEchartQUAMonth", this.$refs["bottom-line-chart-box"]);
    //质量问题各等级数据统计
    this.getBarOption("GetEchartPMELevel", this.$refs["bottom-bar-chart-box"], "y");
    //获取底部左侧字符云
    // this.getTextCloudOption("GetQUAKeyword", this.$refs["l-text-chart"], [25, 110, 250]);
    //获取底部右侧字符云
    // this.getTextCloudOption("GetQSKeyword", this.$refs["r-text-chart"], [25, 67, 119]);
    this.getnewsList();

    // this.activated();
    this.GetUserList();
    this.$http.post("/UserSession/HomeSetAuth1001").then((res) => {});
  },
  beforeRouteLeave(to, from, next) {
    next();
    if (this.timedTasksCollector) {
      clearInterval(this.timedTasksCollector);
      this.timedTasksCollector = null;
    }
  },

  methods: {
    parseTime,
    // todo() {
    //   this.$router.push({
    //     name: "oatodo",
    //   });
    // },
    // activated() {
    //   if (this.$route.path.indexOf("/index") > -1) {
    //     this.timedTasksCollector = setInterval(() => {
    //       this.getnewsList();
    //     }, 5000);
    //   }
    // },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate() - 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getNowFormatDate1() {
      var date1 = new Date();
      var seperator1 = "-";
      var year = date1.getFullYear();
      var month = date1.getMonth() + 1;
      var strDate = date1.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    edittime() {
      this.GetSupplierReport1to();
    },
    handleDetail(row) {
      this.$router.push({
        name: "TodoListDetail",
        query: {
          id: row.id,
        },
      });
      // console.log(row);
    },
    more() {
      this.$router.push({
        path: "/user/todoList",
      });
    },
    moreblack() {
      this.$router.push({
        path: "/supplier/backlist",
      });
    },
    GetSupplierReport1() {
      this.$http
        .get("/DivideReport/GetSupplierReport1", {
          params: {
            masterId: this.masterId,
            startTime: this.getNowFormatDate(),
            endTime: this.getNowFormatDate1(),
          },
        })
        .then((res) => {
          this.noAuditSupCount = res.data.noAuditSupCount;
          this.auditSupCount = res.data.auditSupCount;
          this.supQuaCount = res.data.supQuaCount;
          this.invesCount = res.data.invesCount;
          this.bidSendCount = res.data.bidSendCount;
          this.bidEndCount = res.data.bidEndCount;
        });
    },
    GetSupplierReport1to() {
      this.$http
        .get("/DivideReport/GetSupplierReport1", {
          params: {
            masterId: this.masterId,
            startTime: parseTime(this.startTime, "yyyy-MM-dd"),
            endTime: parseTime(this.endTime, "yyyy-MM-dd"),
          },
        })
        .then((res) => {
          this.noAuditSupCount = res.data.noAuditSupCount;
          this.auditSupCount = res.data.auditSupCount;
          this.supQuaCount = res.data.supQuaCount;
          this.invesCount = res.data.invesCount;
          this.bidSendCount = res.data.bidSendCount;
          this.bidEndCount = res.data.bidEndCount;
        });
    },
    GetSupplierReport2() {
      this.$http.get("/DivideReport/GetSupplierReport4_1", { params: { masterId: this.masterId } }).then((res) => {
        this.scoring1 = res.data;
        if (res.status == 200) {
          this.scoring1 = res.data;
          this.getRannulusPieOption(this.scoring1, this.$refs["quality-peichart"], "供方等级统计分析");
        } else {
          this.getRannulusPieOption(this.scoring1, this.$refs["quality-peichart"], "供方等级统计分析");
        }
      });
    },
    GetSupplierReport3() {
      this.$http.get("/DivideReport/GetSupplierReport4_2", { params: { masterId: this.masterId } }).then((res) => {
        if (res.status == 200) {
          this.scoring2 = res.data;
          this.getRannulusPieOption(this.scoring2, this.$refs["security-piechart"], "合作层级统计分析");
        } else {
          this.getRannulusPieOption(this.scoring2, this.$refs["security-piechart"], "合作层级统计分析");
        }
      });
    },
    async getnewsList() {
      let obj = {
        IsCompleted: false,
        TodoTitle: this.content,
        TodoBusinessCate: this.value,
      };
      let res = await this.$http.get("/SysTodo/GetUserTodoList", { params: obj });
      if (res.status == 200) {
        this.newsList = res.data.result.items;
        this.newsList.totalCount = res.data.result.totalCount;
      }
    },
    async getblackList() {
      let res = await this.$http.get("/DivideReport/GetBlackSupListReport2");
      if (res.status == 200) {
        this.newsListblack = res.data; // this.tableData.id = res.data.result.item.id; // this.comMainName = res.data.result.items.comMainName; // this.newsListblack.totalCount = res.data.result.totalCount;
      }
    },
    async GetUserList() {
      let obj = {
        // Id: this.id,
        // ProjectId: this.orgTypeGuid,
        // PurchaseType: this.PurchaseType,
        // ProjectName: this.ProjectName,
        // PlanName: this.PlanName,
        // UserName: this.UserName,
        // MyAuth: this.MyAuth,
        // BidLevel: this.BidLevel,
        SkipCount: (this.currentPage - 1) * this.page_size,
        MaxResultCount: this.page_size,
      };
      let res = await this.$http.get("/DivideReport/GetProcessList", { params: obj });
      this.totalCount = res.data.result.totalCount;
      this.dataList = res.data.result.items;
    },
    pageChange(page) {
      this.page_size = page._pageSize;
      this.currentPage = page._currentPage;
      this.GetUserList();
    },
    linkTo(row) {
      let url = row.linkUrl.substr(2);
      sessionStorage.setItem("todoId", row.id);
      sessionStorage.setItem("bidModeId", row.recordGuid);
      let routeData = this.$router.resolve({ path: url });
      if (row.isRead) {
        // this.$router.push({ path: url });
        window.open(routeData.href, "_blank");
      } else {
        this.$http.post("/SysTodo/SetRead", { id: row.id }).then((res) => {
          if (res.data.success) {
            // this.$message.success(res.data.message);
            // this.$router.push({ path: url });
            window.open(routeData.href, "_blank");
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
      // this.SaveOrder();
    },
    linkToblack(id, type) {
      this.$router.push({
        path: "/supplier/backlistadd",
        query: { id, type },
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
      // let result = [];
      this.$http.get("/DivideReport/GetSupplierReport7", { params: { masterId: this.masterId } }).then((res) => {
        console.log(res.data);
        if (url == "GetEchartIssuesMonth") {
          const option = exportLineOption(res.data);
          this.renderChart(dom, option);
          //   [
          //   { 日期: "集团招标", 项目金额: 40, 项目数量: 31 },
          //   { 日期: "项目招标", 项目金额: 60, 项目数量: 31 },
          // ];
        }
      });
    },
    async getLineOptiontwo(url, dom) {
      // const result = (await this.$http.get(url)).data.result;

      this.$http.get("/DivideReport/GetSupplierReport6", { params: { type: 1 } }).then((res) => {
        if (url == "GetEchartQUAMonth") {
          console.log(1234);
          console.log(res.data);
          const option = exportLineOptiontwo(res.data);
          this.renderChart(dom, option);
        }
      });
    },

    /**
     * 获取柱状图option
     */
    async getBarOption(url, dom, type) {
      // const result = (await this.$http.get(url)).data.result;
      this.$http.get("/DivideReport/GetSupplierReport5", { params: {} }).then((res) => {
        if (url == "GetEchartPMELevel") {
          let obj = {
            x: exportXBarOption,
            y: exportYBarOption,
          };
          const option = obj[type](res.data);
          this.renderChart(dom, option);
        }
      });
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

  destroyed() {
    window.removeEventListener("resize", this.initEchart, 20);
  },
};
</script>
<style lang="scss" scoped>
.seamless {
  width: 100%;
  height: calc(100% - 16px);
  overflow: hidden;
}
.homepage {
  // width: 88%;
  margin: 0px auto 10vh;
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
::v-deep [class^="el-icon-"].el-icon-check {
  color: #fff;
  font-size: 12px;
}
.iconText {
  margin: 0 5px;
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
    display: flex;
    justify-content: space-between;
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
  color: #46515c;
  font-size: 16px;
  line-height: 50px;
  letter-spacing: 1px;
  margin: 0;
  padding-left: 20px;
  border-bottom: 1px solid #efeeee;
  box-sizing: border-box;
}
.customer-and-info {
  display: flex;
  height: 220px;
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: space-between;
  > div {
    width: calc(100% / 2 - 10px);
    height: 295px;
  }
  .text-cloud-box {
    padding: 20px;
    box-sizing: border-box;
    .l-text-chart {
      background: rgba(176, 202, 251, 0.1);
    }
    > div {
      width: 100%;
      height: 100%;
    }
  }
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
  border-bottom: 0px solid #ebeef5;
}
::v-deep .el-table th {
  border-bottom: 0px solid #ebeef5;
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
</style>
