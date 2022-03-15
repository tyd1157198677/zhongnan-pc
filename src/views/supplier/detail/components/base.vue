<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1" class="ss">
      <template slot="title">
        <span class="infonametits">{{ userBaseInfo.comFullName }}(简称: {{ userBaseInfo.comShortName }})</span>
      </template>
      <div>
        <div class="tender-process">
          <ul>
            <li>
              <i class="icon" :class="{ on: userBaseInfo.cooperStatus == '未提交' }"><span>未提交</span></i>
            </li>
            <li>
              <i class="icon" :class="{ on: userBaseInfo.cooperStatus == '待考察' }"><span>待考察</span></i>
            </li>
            <li>
              <i class="icon" :class="{ on: userBaseInfo.cooperStatus == '考察合格' }"><span>考察合格</span></i>
            </li>
            <li>
              <i class="icon" :class="{ on: userBaseInfo.cooperStatus == '考察不合格' }"><span>考察不合格</span></i>
            </li>
            <li>
              <i class="icon" :class="{ on: userBaseInfo.cooperStatus == '核心' }"><span>核心</span></i>
            </li>
            <li>
              <i class="icon" :class="{ on: userBaseInfo.cooperStatus == '优选' }"><span>优选</span></i>
            </li>
            <li>
              <i class="icon" :class="{ on: userBaseInfo.cooperStatus == '可选' }"><span>可选</span></i>
            </li>
            <li>
              <i class="icon" :class="{ on: userBaseInfo.cooperStatus == '淘汰' }"><span>淘汰</span></i>
            </li>
            <li>
              <i class="icon" :class="{ on: userBaseInfo.cooperStatus == '黑名单' }"><span>黑名单</span></i>
            </li>
          </ul>
        </div>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right" style="width: 150px">用户名：</td>
              <td>
                {{ userBaseInfo.loginId }}
              </td>
              <td class="right" style="width: 150px">注册日期：</td>
              <td>
                {{ userBaseInfo.creationTime }}
              </td>
              <td class="right" style="width: 180px">统一社会信用代码：</td>
              <td>
                <a
                  :href="
                    'https://www.creditchina.gov.cn/xinyongfuwu/tongyishehuixinyongdaimachaxunzhuanlan/shehuixinyongdaimachaxun/index.html?index=1&amp;keyword=' +
                    userBaseInfo.businessCode
                  "
                  target="_blank"
                  title="查一查企业注册信息"
                  ><span class="glyphicon glyphicon-search"></span>{{ userBaseInfo.businessCode }}</a
                >
              </td>
              <td class="right" style="width: 150px">入库日期：</td>
              <td>
                {{ userBaseInfo.storageDate }}
              </td>
            </tr>

            <tr>
              <td class="right">纳税人类型：</td>
              <td>
                {{ userBaseInfo.supTaxType == null || userBaseInfo.supTaxType == "NULL" ? "--" : userBaseInfo.supTaxType }}
              </td>
              <td class="right">主营分类：</td>
              <td>{{ userBaseInfo.supCateNames }}</td>
              <td class="right">副营分类：</td>
              <td>{{ userBaseInfo.supSubCateNames }}</td>
              <td class="right">企业网址：</td>
              <td>
                {{ userBaseInfo.homePage }}
              </td>
            </tr>
            <tr>
              <td class="right">法人代表：</td>
              <td>
                {{ userBaseInfo.legalPerson }}
              </td>
              <td class="right">总部地区：</td>
              <td>{{ userBaseInfo.province }}{{ userBaseInfo.city }}</td>
              <td class="right">注册人姓名：</td>
              <td>
                {{ userBaseInfo.regPersonName }}
              </td>
              <td class="right">注册人手机号：</td>
              <td>
                {{ userBaseInfo.regMobilePhone }}
              </td>
            </tr>
            <tr>
              <td class="right">注册人邮箱：</td>
              <td>
                {{ userBaseInfo.regEmail }}
              </td>
              <td class="right">注册资金：</td>
              <td>{{ userBaseInfo.regCapital }}万元</td>
              <td class="right">企业成立日期：</td>
              <td>
                {{ userBaseInfo.registDate }}
              </td>
              <td class="right">注册状态：</td>
              <td>{{ userBaseInfo.regStatus }}</td>
            </tr>
            <tr>
              <td class="right">企业通信地址：</td>
              <td>
                {{ userBaseInfo.address }}
              </td>
              <td class="right">通过体系认证：</td>
              <td>
                <div>
                  {{ userBaseInfo.qualityName }}
                </div>
              </td>
              <td class="right">企业性质：</td>
              <td>
                {{ userBaseInfo.companyType }}
              </td>
              <td class="right">企业注册地址：</td>
              <td>
                {{ userBaseInfo.registerAddr }}
              </td>
            </tr>
            <tr>
              <td class="right">营业范围：</td>
              <td colspan="3">
                <div style="overflow: auto; max-height: 100px">
                  {{ userBaseInfo.businessDomain }}
                </div>
              </td>
              <td class="right">主要业务城市：</td>
              <td>
                <div style="overflow: auto; max-height: 100px">
                  {{ userBaseInfo.authCityName + [] }}
                </div>
              </td>
              <td class="right">注册机构：</td>
              <td>
                {{ userBaseInfo.orgName }}
              </td>
            </tr>
            <tr>
              <td class="right">相关说明：</td>
              <td colspan="7">
                {{ userBaseInfo.remarks }}
              </td>
            </tr>
            <tr v-if="userBaseInfo.supplierFrom == '直委供方'">
              <td class="right">审核人：</td>
              <td colspan="3">
                {{ userBaseInfo.auditUserName }}
              </td>
              <td class="right">提交人：</td>
              <td colspan="3">
                {{ userBaseInfo.creatorUserName }}
              </td>
            </tr>
            <tr v-else>
              <td class="right">审核人：</td>
              <td colspan="7">
                {{ userBaseInfo.auditUserName }}
              </td>
            </tr>
            <!-- <tr>
              <td class="right">开户银行：</td>
              <td>
                {{ userBaseInfo.bankName }}
              </td>
              <td class="right">银行账号：</td>
              <td>
                {{ userBaseInfo.bankAccount }}
              </td>
              <td class="right">银行行号：</td>
              <td colspan="3">
                {{ userBaseInfo.openAccountNum }}
              </td>
            </tr>
            <tr v-if="showother">
              <td class="right">供货类型：</td>
              <td>
                {{ userBaseInfo.supplyType }}
              </td>
              <td class="right">品牌名称：</td>
              <td>
                {{ userBaseInfo.brand }}
              </td>
            </tr> -->
            <tr v-if="showother">
              <td class="right">管理人员数量（人）：</td>
              <td>
                {{ userBaseInfo.managePersonCount }}
              </td>
              <td class="right">安装人员数量（人）：</td>
              <td>
                {{ userBaseInfo.installPersonCount }}
              </td>
            </tr>
            <tr v-if="showother">
              <td class="right">生产人员数量（人）：</td>
              <td>
                {{ userBaseInfo.productPersonCount }}
              </td>
              <td class="right">高级职称人员数量（人）：</td>
              <td>
                {{ userBaseInfo.professPersonCount }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      activeNames: ["1", "2", "3"],
      userBaseInfo: {},
      showother: false,
    };
  },
  methods: {
    getOneSupBaseInfoById() {
      this.$api.SupBaseInfo.GetOneSupBaseInfoById(this.id)
        .then((res) => {
          this.userBaseInfo = res;
          this.userBaseInfo.registDate = !this.userBaseInfo.registDate ? "" : dayjs(this.userBaseInfo.registDate).format("YYYY年MM月DD日");
          this.userBaseInfo.creationTime = dayjs(this.userBaseInfo.creationTime).format("YYYY年MM月DD日");
          if (this.userBaseInfo.storageDate) {
            this.userBaseInfo.storageDate = dayjs(this.userBaseInfo.storageDate).format("YYYY年MM月DD日");
          }
          if (this.userBaseInfo.businessCate && this.userBaseInfo.businessCate.indexOf("材料设备类") > -1) {
            this.showother = true;
          }
        })
        .finally(() => {
          this.getSupOtherInfo();
        });
    },
    /**
     * 其他信息
     */
    getSupOtherInfo() {
      this.$api.SupBaseInfo.GetSupOtherInfo(this.id)
        .then((res) => {
          this.$set(this.userBaseInfo, "cerNames", res.cerNames);
          this.$set(this.userBaseInfo, "qualityName", res.qualityName);
          this.$set(this.userBaseInfo, "managePersonCount", res.managePersonCount);
          this.$set(this.userBaseInfo, "productPersonCount", res.productPersonCount);
          this.$set(this.userBaseInfo, "installPersonCount", res.installPersonCount);
          this.$set(this.userBaseInfo, "professPersonCount", res.professPersonCount);
        })
        .finally(() => {});
    },
    // 计算序号
    indexMethod(index) {
      return index + 1;
    },
  },
  mounted() {
    this.getOneSupBaseInfoById();
  },
};
</script>

<style scoped lang="scss">
.infonametits {
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  padding-left: 10px;
}
.tender-process ul {
  padding: 5px 0;
  margin-bottom: 20px;
  background: #f3f5f6;
  background: #ebe9e9;
  display: flex;
  justify-content: space-around;
}
li:nth-child(3),
li:nth-child(4) {
  span {
    line-height: 10px;
    margin-top: 15px;
  }
}
.tender-process li {
  width: 60px;
  text-align: center;
  span {
    display: inline-block;
    width: 40px;
    line-height: 15px;
  }
}
.tender-process li .icon {
  background: url(../../../../assets/iconb.png) no-repeat;
  color: rgb(122, 121, 121);
  width: 100%;
  height: 70px;
  line-height: 60px;
  text-align: center;
  background-size: 100%;
  font-style: normal;
  font-size: 13px;
  padding-right: 0px;
  display: inline-block;
  vertical-align: middle;
}
.tender-process li .on {
  background: url(../../../../assets/iconl.png) no-repeat;
  background-size: 100%;
  width: 60px;
  color: #fff;
}

.layui-table {
  width: 100%;
  background-color: #fff;
  color: #666;
  border-top: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}

.layui-table td,
.layui-table th {
  position: relative;
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}

.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: rgba(0, 0, 0, 0.03);
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
::v-deep .el-collapse-item__content {
  height: 800px;
  overflow: auto;
}
</style>
