<template>
  <div class="suggest">
    <!-- <div>
      <a href="sms:10086?body=测试">测试短信</a>
    </div> -->
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
      <!-- <mt-button class="btn_def" type="danger" size="large" :disabled="disabled" @click.native="postBtn">
        <span v-show="isComplete" class="icon_load1" slot="icon"></span>
        {{$t('post.txt')}}
      </mt-button>-->
      <cs-button
        round
        :type="'danger'"
        :size="'large'"
        :disabled="disabled"
        :title="$t('post.txt')"
        :isComplete="isComplete"
        :func="postBtn"
      />
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
        // userName: "",
        phone: "",
        email: ""
      },
      isComplete: false,
      disabled: false
    };
  },
  created() {},
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
      // this.param.userName = localStorage.getItem("uname");
      this.disabled = true;
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
          } else {
            this.msg = this.$t("post.err");
          }
          this.isComplete = false;
          this.disabled = false;
        })
        .catch(err => {
          this.msg = this.$t("post.err");
          this.disabled = false;
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
  position relative
  background #F9F9F9
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
        padding 5px 10px
        height 70px
        outline 0 none
        transition all .6s ease
        border-radius 10px
        box-shadow 0 0 6px #ddd
        &:focus
          box-shadow 0 0 6px #4bc461
    .content
      width 100%
      border 0 none
      padding 10px
      min-height 250px
      transition all .6s ease
      outline 0 none
      color #666
      box-shadow 0 0 6px #ddd
      &:focus
        box-shadow 0 0 6px #4bc461
  .prompt_txt
    font-size 30px
    color #eb2727
  .postBtn
    width calc(100% - 40px)
    position absolute
    bottom 12%
    &>span
      background #fd183d
      color #fff
      display inline-block
      border-radius 5px
      padding 30px 150px
      font-size 28px
</style>