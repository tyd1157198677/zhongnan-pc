<!--  -->
<!--  -->
<template>
  <div class="">
    <!-- 111 -->
    <!-- <el-empty description="链接跳转中1"></el-empty> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.regexp();
  },
  methods: {
    regexp() {
      let obj = {
        loginId: "120525",
        todoId: "E463162B-975A-41B6-893D-3859525547D5",
      };
      this.$axios.post("/api/TokenAuth/UserLoginByOaTodo", obj).then(res => {
        let data = res.data.result;
        let userGuid = this.$store.state.userGuid;
        console.log(res);
        if (data.userGuid == userGuid) {
          this.$router.push({
            path: data.gotoUrl.substr(2),
          });
        } else {
          this.$message.error("不是本人不可查看待办");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
