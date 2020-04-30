<template>
  <div class="userList">
    <span class="back" @click="reBack"></span>
    <div class="info_bg">
      <!-- <div class="infoBtn" v-show="!isLogin"> -->
      <router-link
        tag="div"
        v-show="!isLogin"
        class="infoBtn"
        :to="{name:$config.Router.login}"
      >{{$t('login.login')}}</router-link>
      <!-- </div> -->
      <div class="info_box" v-show="isLogin">
        <div class="info_img">
          <img src="/static/img/icon_new/iAccount.png" />
          <div class="login_name">{{uname}}</div>
        </div>
        <div class="infoTop">
          <div class="balance">{{$t('detl.hasMoney')}}：{{money}} {{$t('common.priceUnit')}}</div>
        </div>
        <div class="infoTop">
          <div class="balance">{{$t('userInfo.rCode')}}：{{rcode}}</div>
        </div>
        <!-- <div v-if="rcode" class="rCode">
          <span>{{$t('userInfo.rCode')}}</span>
          <div class="balance">{{rcode}}</div>
        </div>-->
      </div>
    </div>
    <div class="infoList">
      <ul class="icon_info">
        <router-link class="icon_item profile" tag="li" :to="{name:'info_detl'}" v-show="isLogin">
          <span>{{$t('userInfo.info')}}</span>
        </router-link>
        <li class="icon_item recharge" tag="li" @click="recharge">
          <span>{{$t('common.recharge')}}</span>
        </li>
        <router-link class="icon_item feedback" tag="li" :to="{name:'feedback'}">
          <span>{{$t('userInfo.feedback')}}</span>
        </router-link>
      </ul>
      <ul class="icon_info mt-5">
        <li class="icon_item disabled disable_txt readRecord">
          <span>{{$t('userInfo.tabList[0]')}}</span>
        </li>
        <li class="icon_item disabled disable_txt collection">
          <span>{{$t('userInfo.tabList[1]')}}</span>
        </li>
      </ul>
    </div>
    <div class="logOut" v-show="isLogin" @click="logOut">{{$t('common.singOut')}}</div>
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
            localStorage.setItem("uname", data.unick);
            localStorage.setItem("userInfo", JSON.stringify(data));
            this.money = data.money;
            this.uname = data.unick;
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
  color: #fff;
  font-size: 33px;
  padding-left: 25px;
  width: 77%;
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
pad()
  padding 50px
.mt-5
  margin-top 10%
.userList
  position absolute
  background #f9f9f9
  top 0
  left 0
  right 0
  bottom 0
.balance
  border 2px solid #fbecec
  color #fff
  display inline-block
  border-radius 20px
  margin-top 25px
  font-size 30px
  padding 8px 25px
.infoBtn
  font-size 35px
  cursor pointer
  border-radius 50px
  color #666
  background #fc4058
  color #fff
  padding 25px 0
  margin 0 150px
  text-align center
.logOut
  font-size 35px
  cursor pointer
  border-radius 50px
  background #fb8a8a
  color #fff
  //position absolute
  position fixed
  bottom 5%
  height 80px
  line-height 80px
  margin 0 50px
  width calc(100% - 100px)
  text-align center
.info_bg
  padding 18% 50px
  background-image linear-gradient(to right, #FD63A1, #FF708B, #FF7582, #FE875D)
  .info_box
    display flex
    flex-direction column
    justify-content center
    padding 0 40px
    .rCode
      display flex
      align-items center
      margin-top 25px
      font-size 30px
      color #fff
      .balance
        margin-top 0
        border 0 none
        color #fff
    .info_img
      display flex
      align-items center
      width 100%
      img
        width 23%
        height 100%
        border-radius 50%
    .infoTop
      font-size 30px
      display flex
      justify-content space-between
.infoList
  pad()
  padding-bottom calc(5% + 160px)
  //background #F9F9F9
  .icon_info
    background #fff
    box-shadow 0 0 5px #ddd
    border-radius 25px
    padding 0 30px
    &:first-child
      margin-top -20%
    .icon_item
      padding 35px 15px 35px 100px
      color #333
      font-size 40px
      position relative
      border-bottom 1px solid #eee
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
        background url('/static/img/icon_new/arrow_right.png')
        background-size 100%
      &.profile:before
        background url('/static/img/icon_new/profile.png')
        background-size 100%
      &.recharge:before
        background url('/static/img/icon_new/recharge.png')
        background-size 100%
      &.feedback:before
        background url('/static/img/icon_new/feedback.png')
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


