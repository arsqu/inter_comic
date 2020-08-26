<template>
  <div class="userList">
    <div class="info_bg">
      <span
        class="back icon_fill"
        v-if="!$config.showTabbar"
        @click="reBack"
      ></span>
      <template v-if="!isLogin">
        <!-- btn_def -->
        <!-- <button></button> -->
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
        <div class="infoTop">
          <span>{{ $t("detl.hasMoney") }}：</span>
          <div class="balance">{{ money }} {{ $t("common.priceUnit") }}</div>
        </div>
        <div class="infoTop">
          <span>{{ $t("userInfo.rCode") }}：</span>
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
  color: #333;
  font-weight: bold;
  font-size: 28px;
  padding-left: 15px;
  width: 80%;
  overflow: hidden;
  display: -webkit-box;
  /* ! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 2;
  word-break: break-all;
}
</style>

<style lang="stylus" scoped>
.back
  position relative
  left 0
  top 0
pad()
  padding 50px
.label_box
  position absolute
  bottom 0
  background #fff
  padding 12px
  font-size 0
  text-align center
  a
    padding 0 15px
    display inline-block
    font-size 28px
.loginTxt
  text-align center
  padding-top 10px
  font-size 30px
.userList
  position absolute
  background #f9f9f9
  top 0
  left 0
  right 0
  bottom 0
.balance
  display inline-block
  font-size 35px
  color #333
  padding 15px 25px
.infoBtn
  font-size 35px
  margin 0 auto
  display block
  width 320px
.logOut
  font-size 35px
  cursor pointer
  background #ef6a6a
  color #fff
  position fixed
  bottom calc(110px + 30px)
  height 80px
  line-height 80px
  width 100%
  text-align center
.info_bg
  padding 5% 40px 2%
  background #fff
  .info_box
    display flex
    flex-direction column
    justify-content center
    .info_img
      display flex
      align-items center
      margin-bottom 30px
      width 100%
      img
        width 20%
        height 100%
        border-radius 50%
    .infoTop
      font-size 30px
      display flex
      align-items center
      span
        font-size 35px
        display inline-block
        color #343434
        flex 1
.infoList
  //pad()
  padding-top 30px
  //padding-bottom calc(220px + 30px) //110+30+80
  padding-bottom calc(220px) //110+30+80
  //padding-bottom calc(130px + 30px) //110+30+80
  .icon_info
    background #fff
    box-shadow 0 0 5px #ddd
    padding 0 30px
    .icon_item
      padding 35px 15px 35px 100px
      color #333
      font-size 40px
      position relative
      border-bottom 1px solid #EDEDED
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
        width 40px
        height 40px
        display inline-block
        position absolute
        top 50%
        right 0
        margin-top -20px
        margin-left 20px
        background url('~x/image/icon/arrow_right.png')
        background-size 100%
      &.profile:before
        background url('~x/image/icon/profile.png')
        background-size 100%
      &.recharge:before
        background url('~x/image/icon/recharge.png')
        background-size 100%
      &.feedback:before
        background url('~x/image/icon/feedback.png')
        background-size 100%
      &:last-child
        border-bottom 0 none
</style>
