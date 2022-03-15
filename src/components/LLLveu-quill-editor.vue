<template>
  <div>
    <el-upload
      :headers="getHeader"
      :with-credentials="true"
      :multiple="multiple"
      :limit="limit"
      class="quill-upload"
      :action="serviceUrl"
      style="display: none;width:0"
      :show-file-list="false"
      :on-success="success"
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <quill-editor style="width:800px" ref="myQuillEditor" :content="content" v-model="editorData" :options="editorOption"></quill-editor>
  </div>
</template>
<script>
  // import { api } from '@/config'

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "editor",
  components: { quillEditor },
  props: ["serviceUrl", "getHeader", "content", "limit", "multiple"],
  data() {
    return {
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
            handlers: {
              // 重写点击组件上的图片按钮要执行的代码
              image: function(value) {
                console.log(value);
                document.querySelector(".quill-upload .el-icon-upload").click();
              },
            },
          },
        },
      },
      editorData: "",
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      this.$emit("beforeAvatarUpload", file);
    },
    success(res, file, fileList) {
      console.log(file, fileList);
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let vm = this;
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.success === true) {
        // 获取光标所在位置
        const pos = quill.selection.savedRange.index; //这个得注意下，网上很多都是不对的
        // 插入图片到光标位置
        // quill.insertEmbed(pos, "image", api.base_api + res.returnValue);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        vm.$Message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
  },
  watch: {
    serviceUrl(val) {
      this.serviceUrl = val;
    },
    getHeader(val) {
      this.getHeader = val;
    },
    editorData(val) {
      console.log(val);
      this.$emit("getEditorData", this.editorData);
    },
    content(val) {
      this.content = val;
    },
  },
};
</script>
