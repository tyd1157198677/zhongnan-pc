<template>
  <div class="page_footer" id="page_footer">
    <div class="center_container">
      <div class="com_info">
        <p style="font-size: 13px">
          <span class="glyphicon glyphicon-registration-mark"></span><span>江苏中南物业服务有限公司 招采系统</span
          ><span>Jiangsu Zoina Property Service CO., LTD. All rights reserved. 沪ICP备2021029541号-2</span>
        </p>
        <!-- <p>
          <i> <span class="glyphicon glyphicon-envelope"></span>通讯地址：北京通州经海7路联东商务中心 </i>
          <i> <span class="glyphicon glyphicon-phone-alt"></span>服务及监督电话：010-80806886 <i> </i></i>
        </p> -->
        <i><i> </i></i>
      </div>
      <i><i> </i></i>
    </div>
    <i><i> </i></i>
  </div>
</template>

<script>
export default {
  name: "app-footer",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.page_footer {
  height: 43px;
}
.footer {
  // border-top: 2px solid #409eff;
  // padding: 20px 0;
  // color: #888;
  // line-height: 24px;

  height: 50px;
  width: 100%;
  margin-top: 10px;
  position: fixed;
  background: #ea5514;
  bottom: 0;
  z-index: 999999;
  color: #fff;

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
</style>
