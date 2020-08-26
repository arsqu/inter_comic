<template>
  <div class="userList">
    <div class="bgBox">
      <div class="bg_circle"></div>
      <div class="pt-3 profile_head">
        <span
          class="icon_back icon_fill"
          v-if="!$config.showTabbar"
          @click="reBack"
        ></span>
        <span>{{ $t("userInfo.info") }}</span>
        <img
          class="icon icon_language"
          @click="changeLang"
          :src="require('x/image/icon/language.png')"
          alt="language"
        />
      </div>
      <div class="logo">
        <div class="info_bg">
          <template v-if="!isLogin">
            <router-link
              tag="button"
              class="infoBtn btn_def btn_radius"
              :to="{ name: $config.Router.login }"
              >{{ $t("login.login") }}</router-link
            >
            <div class="loginTxt">{{ $t("userInfo.tips.toLogin") }}</div>
          </template>
          <div class="info_box" v-show="isLogin">
            <div class="info_img">
              <img :src="require('x/image/def_avatar.png')" />
              <div class="login_name">{{ uname }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLogin" class="infoBox">
        <div class="infoTop money">
          <span>{{ $t("detl.hasMoney") }}</span>
          <div class="balance">{{ money }} {{ $t("common.priceUnit") }}</div>
        </div>
        <div class="infoTop share">
          <span>{{ $t("userInfo.rCode") }}</span>
          <div class="balance">{{ rcode }}</div>
        </div>
      </div>
    </div>
    <div class="infoList">
      <ul class="icon_info">
        <router-link
          class="icon_item profile"
          tag="li"
          :to="{ name: 'info_detl' }"
          v-show="isLogin"
        >
          <span>{{ $t("userInfo.info") }}</span>
        </router-link>
        <li class="icon_item recharge" tag="li" @click="recharge">
          <span>{{ $t("common.recharge") }}</span>
        </li>
        <router-link
          class="icon_item feedback"
          tag="li"
          :to="{ name: 'feedback' }"
        >
          <span>{{ $t("userInfo.feedback") }}</span>
        </router-link>
      </ul>
    </div>
    <div class="label_box">
      <router-link :to="{ name: 'guide' }">Terms and Conditions</router-link>
      <router-link :to="{ name: 'policy' }">Privacy Policy</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
      <router-link :to="{ name: 'refund' }"
        >Refund and Cancellation Policy</router-link
      >
    </div>
    <div class="logOut btn_def" v-show="isLogin" @click="logOut">
      {{ $t("common.singOut") }}
    </div>
    <!-- 语言选择框 -->
    <mt-popup v-model="popupVisible" position="bottom" class="cus_popup">
      <div class="langList">
        <ul>
          <!-- <li>当前语言:{{locale}}</li> -->
          <li
            v-for="(item, key, idx) in this.$config.lang"
            :key="idx"
            @click="selLang(key)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      popupVisible: false,
      isCur: 1,
      isLogin: false,
      tabList: [],
      uname: "",
      rcode: "",
      money: "",
      loadState: false //接口请求状态
    };
  },
  components: {},
  created() {
    // console.log("created");
    this.rcode = localStorage.getItem("rcode");
    this.tabList = this.$t("userInfo.tabList");
  },
  mounted() {
    console.log("update_mounted");
    this.loadData();
    this.checkLogin(); //本地状态判断是否登录
  },
  computed: {},
  methods: {
    selLang(lang) {
      if (lang) {
        this.$i18n.locale = lang;
        this.$util.Toast("tips.lang");
      }
      this.popupVisible = false;
      // this.$bus.$emit("isLangBox", false);
    },
    changeLang() {
      this.popupVisible = true;
      // this.$bus.$emit("isLangBox", true);
    },
    reBack() {
      this.$router.go(-1);
    },
    logOut() {
      this.$api
        .getDataN("logout")
        .then(res => {
          if (res.code == 1) {
            this.isLogin = false;
            this.$util.clearItem();
            this.$router.go(0);
          }
          // this.$toast("退出成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkLogin() {
      this.isLogin = false;
      if (localStorage.getItem("isLogin")) {
        console.log("已登录");
        this.isLogin = true;
      } else {
        console.log("未登录");
        // localStorage.setItem("loginUrl", this.$route.fullPath);
      }
    },
    recharge() {
      // this.$router.push({ name: "recharge" });
      this.$router.push({ name: this.$config.Router.charging });
    },
    loadData() {
      this.$api
        .getDataN("hasMoney")
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            var data = res.data;
            data.upass = "";
            localStorage.setItem("money", data.money);
            localStorage.setItem("uname", data.uname || data.unick);
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            this.money = data.money;
            this.uname = data.uname || data.unick;
          } else if (res.code == 401) {
            //服务器登录状态是否过期
            this.isLogin = false;
            // localStorage.setItem("loginUrl", this.$route.fullPath);
            this.$util.clearItem();
          }
        })
        .catch(err => {
          this.isLogin = false;
          this.$util.clearItem();
        });
    }
  }
};
</script>

<style>
.login_name {
  /* ! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 2;
}
</style>

<style lang="stylus" scoped>

.cus_popup
  width 100%
.langList
  z-index 100
  width 100%
  background #fff
  font-size 28px
  padding 0 10px
  border-bottom 5px solid #ff8300
  li
    padding 25px 10px
    color #555
    border-top 1px solid #ddd
    &:first-child
      border-top 0 none

.profile_head
  color #fff
  display: flex;
  align-items: center;
  justify-content center
  position relative
  z-index 10
  padding-bottom 20px
.login_name
  font-size: 38px;
  width: 80%;
  color #fff
  margin 0 auto
  overflow: hidden;
  word-break: break-all;
.bgBox
  background url('~x/image/bg.png')repeat-x
  background-size contain
  position relative
  height auto
  min-height 360px
  .bg_circle
    background url('~x/image/bg_circle.png')repeat-x
    background-size contain
    width: 100%;
    height: 100%;
    position absolute
    z-index 1
  .logo
    width: 100%;
    position: relative;
    z-index: 10;
.icon_back
  left 20px
  position: absolute;
  top: 50%;
  margin-top: -15px
pad()
  padding 50px
.label_box
  position absolute
  bottom 0
  background #fff
  padding 12px
  border-top 2px solid #ddd
  font-size 0
  text-align center
  a
    color #cdcdcd
    padding 0 15px
    display inline-block
    font-size 28px
.loginTxt
  text-align center
  padding-top 10px
  color #fff
  font-size 30px
.mt-5
  margin-top 5%
.userList
  position absolute
  background #fff
  top 0
  left 0
  right 0
  bottom 0
.balance
  display inline-block
  font-size 28px
  color #ccc
.infoBtn
  font-size 35px
  margin 0 auto
  display block
  width 320px
.logOut
  font-size 35px
  position absolute
  bottom calc(110px + 30px)
  border-radius 50px
  width 90%
  left 50%
  margin-left -45%
.info_bg
  .info_box
    display flex
    flex-direction column
    justify-content center
    .info_img
      text-align center
      margin-bottom 30px
      width 100%
      img
        width 130px
        height 100%
        border-radius 50%
.infoBox
  display flex
  flex-direction row
  .infoTop
    font-size 30px
    width 50%
    display flex
    flex-direction column
    position relative
    padding-top 40px
    padding-left 120px
    &:before
      content ''
      display inline-block
      width 60px
      height 60px
      position: absolute;
      left: 40px;
      top 50%
      margin-top -10px
    &.money:before
      background url('~x/image/icon/wallet.png')no-repeat
      background-size: contain;
    &.share:before
      background url('~x/image/icon/share.png')no-repeat
      background-size: contain;
    span
      font-size 35px
      display inline-block
      color #343434
.icon_language
  position absolute
  right 15px
.infoList
  padding-top 30px
  padding-bottom calc(220px) //110+30+80
  .icon_info
    background #fff
    box-shadow 0 0 5px #ddd
    padding 0 30px
    .icon_item
      padding 35px 15px 35px 100px
      color #333
      font-size 40px
      position relative
      &.disabled
        opacity .5
      &:before
        content ''
        width 40px
        height 40px
        display inline-block
        position absolute
        top 50%
        left 0
        margin-top -20px
        margin-left 20px
      &:not(.disabled):after
        content ''
        width 50px
        height 50px
        display inline-block
        position absolute
        top 50%
        right 0
        margin-top -20px
        margin-left 20px
        background url('~x/image/icon/arrow_right.png')
        background-size 100%
      &.profile:before
        background url('~x/image/icon/profile.png')no-repeat
        background-size contain
      &.recharge:before
        background url('~x/image/icon/wallet.png')no-repeat
        background-size contain
      &.feedback:before
        background url('~x/image/icon/feedback.png')no-repeat
        background-size contain
      &:last-child
        border-bottom 0 none
</style>
