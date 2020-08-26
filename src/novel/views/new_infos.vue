<template>
  <div class="userList">
    <div class="info_bg">
      <div class="info_box">
        <div class="info_img" @click="routerGo">
          <img :src="require('x/image/def_avatar.png')" />
          <!-- <router-link tag="div" :to="{ name: $config.Router.login }"> -->
          <div class="not_login" v-if="!isLogin">
            <span>{{ $t("login.logText[1]") }}</span>
            <div class="loginTxt">{{ $t("userInfo.tips.toLogin") }}</div>
          </div>
          <div v-else class="login_name">{{ uname }}</div>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
    <div class="infoList">
      <ul class="icon_info">
        <!-- <router-link
          class="icon_item profile"
          tag="li"
          :to="{ name: 'info_detl' }"
          v-show="isLogin"
        >
          <span>{{ $t("userInfo.info") }}</span>
        </router-link> -->
        <router-link
          class="icon_item balance"
          tag="li"
          :to="{ name: $config.Router.charging }"
        >
          <span>{{ $t("detl.hasMoney") }}</span>
          <span v-if="!isLogin" class="balance">{{
            $t("userInfo.seemore")
          }}</span>
          <span v-else class="balance"
            >{{ money }} {{ $t("common.priceUnit") }}</span
          >
        </router-link>
        <li class="icon_item share">
          <span>{{ $t("userInfo.rCode") }}</span>
          <span v-if="!isLogin" class="balance">{{
            $t("userInfo.seemore")
          }}</span>
          <div v-else class="balance">{{ rcode }}</div>
        </li>
        <router-link
          class="icon_item recharge"
          tag="li"
          :to="{ name: $config.Router.charging }"
        >
          <span>{{ $t("common.recharge") }}</span>
        </router-link>
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
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
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
    reBack() {
      this.$router.go(-1);
    },
    routerGo() {
      var name = this.$config.Router.login;
      if (this.isLogin) name = "info_detl";
      console.log(this.isLogin);
      this.$router.push({ name });
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
            localStorage.setItem("unick", data.unick);
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
  /* color: #fff; */
  color: #333;
  font-weight: bold;
  font-size: 38px;
  padding-left: 35px;
  width: 78%;
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
.not_login
  padding-left 50px
  position relative
  span
    display block
    color #333
    text-align left
  .loginTxt
    text-align left
    color #d9d9d9

.info_img
  position relative
  &>div
    flex 1
  &:after
    position absolute
    width 28px
    height 28px
    border-top 5px solid transparent
    border-right 5px solid transparent
    position absolute
    right 0
    top 50%
    margin-top -8px
    margin-right 8px
    transform rotate(45deg)
    border-color #d9d9d9
    content ''
    display block

.label_box
  position fixed
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
.mt-5
  margin-top 5%
.balance
  display inline-block
  font-size 30px
  color #d9d9d9
  text-align center
  padding 15px 25px
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
        width 22%
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
    // box-shadow 0 0 5px #ddd
    padding 0 10px
    display flex
    flex-wrap: wrap;
    .icon_item
      width calc(50% - 20px)
      color #333
      font-size 40px
      height 330px
      position relative
      display flex
      justify-content center
      flex-direction column
      border 1px solid #F4F4F4
      margin 10px 10px
      border-radius 10px
      span
        text-align center
      &.disabled
        opacity .5
      &:before
        content ''
        width 120px
        height 120px
        display block
        text-align center
        margin 0 auto 20px
        // position absolute
      &.profile:before
        background url('/static/img/icon_new/profile.png')
        background-size 100%
      &.balance:before
        background url('~x/image/icon/balance.png')
        background-size 100%
      &.share:before
        background url('~x/image/icon/share.png')
        background-size 100%
      &.recharge:before
        background url('~x/image/icon/wallet.png')
        background-size 100%
      &.feedback:before
        background url('~x/image/icon/feedback.png')
        background-size 100%
      &.readRecord:before
        background url('/static/img/icon_new/readRecord.png')
        width 50px
        height 50px
        margin-top -25px
        margin-left 15px
        background-size 100%
      &.collection:before
        background url('/static/img/icon_new/collection.png')
        width 45px
        height 45px
        margin-top -22.5px
        margin-left 17.5px
        background-size 100%
      &:last-child
        border-bottom 0 none
</style>
