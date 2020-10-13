<template>
  <div class="shareLink">
    <div class="head_img">
      <img :src="require('x/image/share_code.png')" alt="" />
      <div class="content_box">
        <div class="text_head">Lets's Share</div>
        <div class="reffer_code">
          <template v-if="isLogin">
            <span>{{ $t("userInfo.rCode") }}:</span> {{ code }}</template
          >
          <router-link v-else :to="{ name: $config.Router.login }">{{
            $t("userInfo.seemore")
          }}</router-link>
        </div>
        <div class="prompt_txt">Tips: {{ $t("shareLink.share") }}</div>
        <div class="mt-2 text-center">
          <div class="form_item" v-if="isLogin">
            <div class="form_icon OTP phone">
              <div class="phoneCode">
                <span>{{ $t("shareLink.link") }}</span>
              </div>
              <input class="code" type="text" v-model="link" />
              <span
                class="btn_primary btn_def btn_copy"
                :data-clipboard-text="link"
              >
                Copy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: "",
      code: "",
      isLogin: false,
      clipboard: null,
      showLink: false
    };
  },
  mounted() {
    this.clipboard = this.clipboard || new this.$clipboard(".btn_copy");
    this.clipboard.on("success", e => {
      e.clearSelection();
      this.$toast("Copied!");
      this.destroy();
    });
    this.clipboard.on("error", function(e) {
      this.$toast(e.action);
      this.destroy();
    });
    this.getMoney();
  },
  methods: {
    getMoney() {
      var l = localStorage;
      this.$api
        .getDataN("hasMoney")
        .then(res => {
          if (res.code == 1) {
            this.isLogin = true;
            var data = res.data;
            l.setItem("rcode", data.ucode);
            l.setItem("money", data.money);
            l.setItem("uname", data.uname || data.unick);
            l.setItem("userInfo", JSON.stringify(data));
            this.code = data.ucode;
            this.shareLink();
          } else if (res.code == 401) {
            l.setItem("loginUrl", this.$route.fullPath);
            this.$util.clearItem();
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    destroy() {
      this.clip && this.clip.destroy();
    },
    shareLink() {
      this.link =
        location.protocol + "//" + location.hostname + "?code=" + this.code;
      console.log(this.link);
      this.showLink = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/mixins/sharelink.styl'
 .form_item
  height 80px
  .form_icon
    height 100%
    display flex
    &.phone
      .phoneCode
        display flex
        align-items center
        border-right 0
        border-radius 50px 0 0 50px
        height 100%
        font-size 26px
        font-weight bold
        &>span
          width 100%
          display inline-block
          padding 2px 10px 2px 15px
    input
      background #fff
      padding 0 15px
      font-size 25px
      height 100%
      outline 0 none
      color #555
      transition all .4s ease
      border-right 0 none
      border-left 0 none
      -webkit-appearance none

.shareLink
  height calc(100% - 110px)
  position absolute
.reffer_code
  padding-bottom 20px
  font-size 35px
  text-align center
.text_head
  color #333
  text-align center
  font-weight bold
  margin-bottom 25px
.btn_copy
  width 180px
  border-radius 0 50px 50px 0
  text-align center
  font-size 28px
.link_href
  transition all .6s linear
  font-size 35px
  color #3e3e3e
.share_btn
  width 150px
  border-radius 10px
.head_img
  position relative
  height 100%
  .content_box
    width calc(100% - 80px)
    padding 40px 35px
    box-shadow 0 3px 3px 3px #EDEDED
    position absolute
    bottom 15%
    margin 10px 40px
    // margin-bottom -15%
    border-radius 30px
    background #fff
    .prompt_txt
      font-size 35px
      color #cdcdcd
</style>
