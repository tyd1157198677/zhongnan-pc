<template>
  <el-main>
    <div>
      <el-card style="margin-bottom:60px">
        <div slot="header" class="clearfix flex between middle">
          <el-page-header @back="$router.back(-1)" :content="navBarName"></el-page-header>
        </div>
        <div>
          <el-form ref="neweditform" :model="neweditform" class="form_dialog" label-width="150px" @opened="opendfnc" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="neweditform.title" autocomplete="off" style="width:200px" placeholder="请输入标题"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="noticeType" label="内容分类">
                  <el-select v-model="neweditform.noticeType" size="small" placeholder="请选择内容分类">
                    <el-option v-for="item in noticeType" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="isShow" label="是否展示">
                  <el-select v-model="neweditform.isShow" placeholder="请选择是否">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="noticeShowType" label="显示类型">
                  <el-select v-model="neweditform.noticeShowType" size="small" placeholder="请选择显示类型">
                    <el-option v-for="item in noticeShowType" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="startDate" label="有效期（开始日期）">
                  <el-date-picker v-model="neweditform.startDate" type="date" placeholder="选择有效期（开始日期）"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="endDate" label="有效期（结束日期）">
                  <el-date-picker v-model="neweditform.endDate" type="date" placeholder="选择有效期（结束日期）"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="10px" class="explain" prop="content">
                  <quill-editor v-model="neweditform.content" ref="myQuillEditor" :options="editorOption"> </quill-editor>
                  <!-- 富文本编辑器中图片改为存储链接地址，不转base64了 -->
                  <!-- <editor :serviceUrl="uploadUrl" :content="content" @getEditorData="content = $event"></editor> -->
                  <!-- <textarea id="demo" style="display: none;" v-html="content"></textarea> -->
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-button type="primary" size="small" style="float:right;" @click="submitForm">保 存</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!-- <div>
                <div style="color:red;float:left;margin-left:20px">*</div>
                <span style="float:left;">标题</span>
              </div>
              <el-col :span="5">
                <el-form-item prop="title" class="input">
                  <el-input
                    v-model="neweditform.title"
                    autocomplete="off"
                    style="float:left;margin-top:25px;width:200px;margin-left:-40px"
                    placeholder="请输入标题"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <div>
                  <div style="color:red;float:left;margin-left:20px">*</div>
                  <span style="float:left;">内容分类</span>
                </div>
                <el-form-item prop="noticeType" class="input">
                  <el-select
                    v-model="neweditform.noticeType"
                    size="small"
                    style="float:left;margin-top:25px;width:200px;margin-left:-70px"
                    placeholder="请选择内容分类"
                  >
                    <el-option v-for="item in noticeType" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <div>
                  <div style="color:red;float:left;margin-left:20px">*</div>
                  <span style="float:left;">是否展示</span>
                </div>
                <el-form-item prop="isShow" class="input">
                  <el-select
                    v-model="neweditform.isShow"
                    placeholder="请选择是否"
                    style="float:left;margin-top:25px;width:200px;margin-left:-70px"
                  >
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <div>
                  <div style="color:red;float:left;margin-left:20px">*</div>
                  <span style="float:left;">显示类型</span>
                </div>
                <el-form-item prop="noticeShowType" class="input">
                  <el-select
                    v-model="neweditform.noticeShowType"
                    size="small"
                    style="float:left;margin-top:25px;width:200px;margin-left:-70px"
                    placeholder="请选择显示类型"
                  >
                    <el-option v-for="item in noticeShowType" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
          <!-- </el-row> -->
          <!-- <el-row>
              <el-col :span="5">
                <div>
                  <div style="color:red;float:left;margin-left:20px">*</div>
                  <span style="float:left;">有效期（开始日期）</span>
                </div>
                <el-form-item prop="startDate">
                  <el-date-picker
                    style="float:left;margin-left:15px;width:200px;"
                    v-model="neweditform.startDate"
                    type="date"
                    placeholder="选择有效期（开始日期）"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <div>
                  <div style="color:red;float:left;margin-left:70px">*</div>
                  <span style="float:left;">有效期（结束日期）</span>
                </div>
                <el-form-item prop="endDate">
                  <el-date-picker
                    v-model="neweditform.endDate"
                    style="float:left;margin-left:65px;width:200px;"
                    type="date"
                    placeholder="选择有效期（结束日期）"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="400px" class="explain" prop="content">
                  <quill-editor v-model="neweditform.content" ref="myQuillEditor" :options="editorOption"> </quill-editor>
                   富文本编辑器中图片改为存储链接地址，不转base64了 -->
          <!-- <editor :serviceUrl="uploadUrl" :content="content" @getEditorData="content = $event"></editor> -->
          <!-- <textarea id="demo" style="display: none;" v-html="content"></textarea> -->
          <!-- </el-form-item>
              </el-col>
            </el-row> -->
        </div>
      </el-card>
    </div>
  </el-main>
</template>
<script src="../../../public/static/layui.js"></script>
<script src="../../../public/static/lay/modules/layedit.js"></script>
<script>
import editor from "@/components/LLLveu-quill-editor";
export default {
  components: { editor },
  data() {
    return {
      value: "",
      notice: "",
      noticeShow: "",
      noticeType: [],
      noticeShowType: [],
      neweditform: {
        id: "",
        title: "",
        noticeType: "",
        noticeShowType: "",
        isShow: true,
        startDate: "",
        endDate: "",
        content: "",
      },
      formLabelWidth: "200px",
      editorOption: {
        placeholder: "输入文本...",
        theme: "snow", // 主题
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
              ["blockquote", "code-block"], // 引用，代码块
              [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ list: "ordered" }, { list: "bullet" }], // 列表
              [{ script: "sub" }, { script: "super" }], // 上下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              [{ direction: "rtl" }], // 文本方向
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              [{ align: [] }], // 对齐方式
              ["clean"], // 清除字体样式
              ["image", "video"], // 上传图片、上传视频
            ],
          },
        },
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        noticeType: [{ required: true, message: "请选择内容分类", trigger: "change" }],
        noticeShowType: [{ required: true, message: "请选择显示类型", trigger: "change" }],
        isShow: [{ required: true, message: "请选择是否展示", trigger: "change" }],
        startDate: [{ required: true, message: "请选择开始日期", trigger: "blur" }],
        endDate: [{ required: true, message: "请选择结束日期", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  created() {},
  computed: {
    navBarName() {
      const barName = "";
      return barName;
    },
  },
  mounted() {
    this.neweditform = this.$route.query.row ? this.$route.query.row : {};
    this.GetTodoBusinessCate();
    this.neweditform.date = this.getNowFormatDate();
    this.neweditform.date1 = this.getNowFormatDate1();
  },
  methods: {
    opendfnc() {
      // alert('生成layui富文本编辑器')
      //layui富文本编辑器
      var that = this;
      layui.use("layedit", function() {
        var layedit = layui.layedit;

        layedit.set({
          uploadImage: {
            url: that.layuiUploadUrl, //接口url
            type: "post", //默认post
            base_api: api.common_api, //修改了layedit.js文件【搜索uploadImage 在src前加了api.base_api，因为传done回调函数不生效】
          },
        });
        // console.log(that);
        that.layeditIndex = layedit.build("demo", {
          tool: [
            "strong", //加粗
            "italic", //斜体
            "underline", //下划线
            "del", //删除线
            "|", //分割线
            "left", //左对齐
            "center", //居中对齐
            "right", //右对齐
            "link", //超链接
            "unlink", //清除链接
            "face", //表情
            "image", //插入图片
            // ,'help' //帮助
          ],
        });
      });
    },
    //处理默认选中当前日期
    // getNowTime() {
    //    var now = new Date();
    //    var year = now.getFullYear(); //得到年份
    //    var month = now.getMonth(); //得到月份
    //    var date = now.getDate(); //得到日期
    //    month = month + 1;
    //    month = month.toString().padStart(2, "0");
    //    date = date.toString().padStart(2, "0");
    //    var defaultDate = `${year}-${month}-${date}`;
    //    console.log(defaultDate)
    //    return defaultDate;
    //    this.$set(this.neweditform, "startDate", defaultDate);
    // },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
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
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear() + 5;
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    async GetTodoBusinessCate() {
      let res = await this.$http.get("/SysNotice/GetNoticePageDropDown");
      this.noticeType = res.data.noticeType;
      this.noticeShowType = res.data.noticeShowType;
      this.value = res.data.length > 0 ? res.data[0].value : "";
    },
    submitForm() {
      this.$refs.neweditform.validate(valid => {
        if (valid) {
          this.$http.post("SysNotice/InsertOrUpdateNotice", this.neweditform).then(res => {
            if (res.data.success) {
              this.$message.success("保存成功");
              this.neweditform = "";
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#demo {
  min-height: 6rem;
}
.rolse {
  height: 620px;
  margin-bottom: 90px;
  display: flex;
  flex-flow: row; /*伸缩项目单行排列*/
  // overflow: auto;
  .left {
    width: 230px;
    height: 100%;
    border: 1px solid #ccc;
    .item {
      width: 100%;
      height: 40px;
      display: flex;
      /*实现垂直居中*/
      align-items: center;
      /*实现水平居中*/
      justify-content: center;
      text-align: justify;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      //   font-weight: 550;
      font-size: 14px;
    }
  }
  .right {
    width: auto;
    height: 100%;
    border: 1px solid #ccc;
    flex: 1;
    // overflow: auto;
    margin-left: 10px;
    .top {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .left1 {
        padding-left: 20px;
        display: flex;
      }
      .right1 {
        padding-right: 10px;
      }
    }
  }
}
::v-deep .right1 {
  .el-input {
    width: 200px !important;
  }
}
::v-deep .ql-container {
  min-height: 25rem;
}
.quill-editor {
  line-height: normal;
}
</style>
