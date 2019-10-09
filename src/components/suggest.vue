<template>
  <div class="suggest">
    <!-- contryId  国家id  反馈内容content  联系方式  email 或者 phone -->
    <div class="form_box">
      <div class="form_item">
        <label></label>
        <textarea class="content" v-model="param.content" :placeholder="$t('suggest.tips.content')"></textarea>
      </div>
      <div class="form_item">
        <label for>{{$t('suggest.phone')}}</label>
        <input type="text" v-model="param.phone" :placeholder="$t('suggest.verify.require')" />
      </div>
      <div class="form_item">
        <label for>{{$t('suggest.email')}}</label>
        <input type="text" v-model="param.email" :placeholder="$t('suggest.verify.require')" />
      </div>
    </div>
    <div class="prompt_txt">{{msg}}</div>
    <div class="postBtn">
      <span @click="postBtn">{{$t('post.txt')}}</span>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      msg: "",
      param: {
        contryId: "1",
        content: "",
        userName: "",
        phone: "",
        email: ""
      },
      isComplete: false
    };
  },
  created() {
    this.$bus.$emit("navBar", this.$t("suggest.txt"));
  },
  activated() {
    // console.log("app_activated");
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    //提交表单
    postBtn() {
      var msg = "";
      if (this.isComplete) {
        this.msg = this.$t("login.tips.wait");
        return;
      }
      var param = this.param;
      if (!param.content) {
        this.msg = this.$t("suggest.verify.content");
        return;
      }
      if (!param.phone && !param.email) {
        this.msg = this.$t("suggest.verify.require");
        return;
      }
      this.feedBack();
    },
    //反馈
    feedBack() {
      this.isComplete = true;
      this.param.userName = localStorage.getItem("uname");
      this.$api
        .postDataN("suggest.post", Qs.stringify(this.param))
        .then(res => {
          if (res.code == 1) {
            this.msg = this.$t("post.success");
            this.param = {
              contryId: "1"
            };
            setTimeout(_ => {
              this.msg = "";
            }, 2000);
            return;
          }
          this.msg = this.$t("post.err");
          this.isComplete = false;
        })
        .catch(err => {
          this.msg = this.$t("post.err");
          this.isComplete = false;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.suggest
  width 100%
  height calc(100vh - 100px)
  padding 20px
  background #f8f8f8
  .form_box
    .form_item
      label
        display block
        color #666
        font-size 28px
        padding 10px 0 10px 10px
      input
        border 0 none
        width 100%
        padding 15px 10px
        outline 0 none
        border-radius 8px
    .content
      width 100%
      border 0 none
      padding 10px
      min-height 250px
      outline 0 none
      color #666
  .prompt_txt
    font-size 30px
    color #eb2727
  .postBtn
    width 100%
    position absolute
    bottom 10%
    text-align center
    span
      background #fd183d
      color #fff
      display inline-block
      border-radius 5px
      padding 30px 150px
      font-size 28px
</style>