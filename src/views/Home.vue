<template>
  <el-container class="home">
    <!-- <el-header class="header" style="height: 200px;">
      <img class="bannerIndexImg topbg" ref="headerHeight" src="~@/assets/bannerIndex.png" alt="" />
      <div class="nav" ref="navHeight">
        <div class="flex container">
          <div class="nav_left">
            <img src="~@/assets/logoText.png" alt="" class="topbg" />
          </div>          
          <div class="flex average nav_right">
            <div class="text-center nav_right_btn">
              <img src="~@/assets/user_icon.png" alt="" />
              <p style="margin-left:10px;">
                {{ userName }}
              </p>
              <span @click="loginOut" title="退出登录">
                <i class="el-icon-switch-button" style="color: #fff;padding-left: 10px;"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <div class="container" style="padding-top:20px">
        <el-row :gutter="10">
          <el-col :span="24"> </el-col>
          <el-col :span="8">
            <el-card class="box-card">
              <el-row type="flex" justify="space-between" slot="header" class="clearfix">
                <span class="cardtitle">竞价主题信息</span>
                <el-button type="primary" size="small" @click="InsertOrUpdateBidExamMasterfnc" v-loading="bidExamMasterloading"
                  >保存</el-button
                >
              </el-row>
              <div class="forrmdiv">
                <span class="formtitle">招标项目名称：</span
                ><el-input class="formitem" size="small" v-model="obj.projectName" placeholder="请输入内容"></el-input>
              </div>
              <div class="forrmdiv">
                <span class="formtitle">技术占比（%）：</span
                ><el-input class="formitem" size="small" v-model="obj.techPercent" placeholder="请输入内容" type="number"></el-input>
              </div>
              <div class="forrmdiv">
                <span class="formtitle">商务占比（%）：</span
                ><el-input class="formitem" size="small" v-model="obj.businessPercent" placeholder="请输入内容" type="number"></el-input>
              </div>
              <div class="forrmdiv">
                <span class="formtitle">商务计分原则：</span
                ><el-select class="formitem" size="small" v-model="obj.businessScoreType" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </div>
              <div class="forrmdiv">
                <span class="formtitle">拟中标单位数量：</span
                ><el-input class="formitem" size="small" v-model="obj.endSupplierCount" placeholder="请输入内容"></el-input>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="box-card">
              <el-row type="flex" justify="space-between" slot="header" class="clearfix">
                <span class="cardtitle">技术评标小组成员</span>
                <el-button type="primary" size="small">添加茂信人员</el-button>
              </el-row>
              <el-table :data="technicalEvaluationtableData" stripe style="width: 100%" height="196">
                <el-table-column label="序号" type="index"> </el-table-column>
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column label="删除">
                  <template>
                    <i class="el-icon-delete" title="删除"></i>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="box-card">
              <el-row type="flex" justify="space-between" slot="header" class="clearfix">
                <span class="cardtitle">成本负责人</span>
                <el-button type="primary" size="small">添加茂信人员</el-button>
              </el-row>
              <el-table :data="tableData" stripe style="width: 100%" height="196">
                <el-table-column label="序号" type="index"> </el-table-column>
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column label="删除">
                  <template>
                    <i class="el-icon-delete" title="删除"></i>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top:10px;">
          <el-col :span="12">
            <el-card class="box-card">
              <el-row type="flex" justify="space-between" slot="header" class="clearfix">
                <span class="cardtitle">技术评标模板</span>
                <span>
                  <el-button type="primary" size="small">保存</el-button>
                  <el-button type="primary" size="small">导入</el-button>
                </span>
              </el-row>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="维度"> </el-table-column>
                <el-table-column prop="name" label="指标"> </el-table-column>
                <el-table-column prop="name" label="原则"> </el-table-column>
                <el-table-column prop="name" label="分值"> </el-table-column>
                <el-table-column label="删除">
                  <template>
                    <i class="el-icon-delete" title="删除"></i>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <el-row type="flex" justify="space-between" slot="header" class="clearfix">
                <span class="cardtitle">初始化供应商信息</span>
                <span>
                  <el-button type="primary" size="small">保存</el-button>
                </span>
              </el-row>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column label="序号" type="index"> </el-table-column>
                <el-table-column prop="name" label="供应商名称"> </el-table-column>
                <el-table-column prop="name" label="供应商简称"> </el-table-column>
                <el-table-column prop="name" label="报价人手机号"> </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-footer class="footer" height="auto">
      <div class="flex right container">
        <div class="text-right f-14">
          中国金茂上海公司 <br />
          京ICP备09058202号-3&nbsp;|&nbsp;京公网安备110102001149
        </div>
        <div class="tk-grid-3 text-right inline-block-middle footer_logo">
          <img src="~@/assets/636927520023769547.png" alt="" />
        </div>
      </div>
    </el-footer> -->
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.page {
  margin-top: 20px;
}
.home {
  .header {
    padding: 0;
    position: relative;
    font-size: 0;
    width: 100%;
    // height: 10vw;
    position: relative;
    overflow: hidden;
    .bannerIndexImg {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .topbg {
      width: 100%;
    }
    .logo {
      width: 30%;
      position: absolute;
      height: auto;
      left: 6%;
      top: 40%;
      z-index: 12;
    }
  }
  .nav {
    width: 100%;
    height: 200px;
    padding-top: 35px;
    background: rgba($color: #000000, $alpha: 0.7);
    color: #fff;
    position: absolute;
    bottom: 0;
    .nav_left {
      margin-right: 100px;
      padding-top: 5px;
    }
    .nav_mid {
      display: inline-flex;
    }
    .nav_right {
      width: 160px;
      color: #40b5ff;
      font-weight: 500;
      padding-top: 5px;
      .nav_right_btn {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #40b5ff;
        border-radius: 25px;
        height: 35px;
        &:before {
          content: "";
          display: inline-block;
          height: 50px;
          vertical-align: middle;
        }
        &:not(:last-child):after {
          content: "";
          display: inline-block;
          width: 1px;
          height: 40px;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -20px;
          background: #878787;
        }
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        p {
          line-height: 28px;
          font-size: 20px;
        }
      }
    }
  }
  .main {
    padding-top: 0;
    height: 100%;
    box-sizing: border-box;
    background: #ffffff;
    position: relative;
    top: -85px;
    // width: 88%;
    border-radius: 10px 10px 0 0;
    height: 646px;
    overflow: auto;
  }
  .footer {
    border-top: 2px solid #409eff;
    padding: 20px 0;
    color: #888;
    line-height: 24px;
    .footer_con {
      // width: 88%;
    }
    .footer_logo {
      margin-left: 30px;
      img {
        vertical-align: middle;
      }
    }
  }
}
::v-deep .el-card__header {
  padding: 6px;
}
.cardtitle {
  height: 32px;
  line-height: 32px;
}
.forrmdiv {
  margin: 6px 0;
  .formtitle {
    width: 38%;
    display: inline-block;
  }
  .formitem {
    width: 60%;
    display: inline-block;
  }
}
</style>
