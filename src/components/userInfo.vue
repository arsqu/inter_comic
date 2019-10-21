<template>
  <div class="userList">
    <div class="info_bg">
      <div class="info_box">
        <div class="info_img">
          <img src="/static/img/icon/default_head.png" />
        </div>
        <div class="infoList">
          <div class="toLogin" v-if="!isLogin" @click="toLogin">{{$t('login.login')}}</div>
          <template v-else>
            <div class="login_name">{{uname}}</div>
            <div class="balance">{{$t('detl.hasMoney')}}：{{money}}</div>
          </template>
        </div>
        <div class="rechargeBtn">
          <span @click="recharge">{{$t('recharge.recharge')}}</span>
        </div>
      </div>
      <div class="logout" v-if="isLogin" @click="logOut">{{$t('login.logout')}}</div>
      <router-link class="suggest" tag="div" :to="{name:'suggest'}">{{$t('userInfo.suggestions')}}</router-link>
    </div>
    <div class="tabTurn">
      <span
        @click="toggle(idx)"
        :class="[isCur==idx?'active':'']"
        v-for="(item,idx) in tabList"
        :key="idx"
      >{{item}}</span>
    </div>
    <div class="tabBox">{{$t('userInfo.tips')}}</div>
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
      //用户信息
      uname: "",
      money: "",
      loadState: false //接口请求状态
    };
  },
  components: {},
  created() {
    // console.log("created");
    this.tabList = this.$t("userInfo.tabList");
    this.init();
  },
  mounted() {
    console.log("update_mounted");
    this.loadData();
    this.checkLogin(); //本地状态判断是否登录
  },
  computed: {},
  methods: {
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
        localStorage.setItem("loginUrl", this.$route.fullPath);
      }
    },
    toLogin() {
      this.$router.push({ name: "login" });
    },
    recharge() {
      this.$router.push({ name: "recharge" });
    },
    init() {
      this.sendMsg("navBar", this.tabList[this.isCur]);
    },
    toggle(idx) {
      this.isCur = idx;
      this.sendMsg("navBar", this.tabList[idx]);
    },
    sendMsg(key, data) {
      //组件通信
      this.$bus.$emit(key, data);
    },
    loadData() {
      this.$api.getDataN("hasMoney").then(res => {
        // console.log(res);
        if (res.code == 1) {
          var data = res.data;
          localStorage.setItem("money", data.money);
          localStorage.setItem("uname", data.uname);
          this.money = data.money;
          this.uname = data.uname;
        } else if (res.code == 401) {
          //服务器登录状态是否过期
          this.isLogin = false;
          localStorage.setItem("loginUrl", this.$route.fullPath);
          this.$util.clearItem();
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.info_bg
  padding 8% 25px
  background #f5f5f5
  .logout
    font-size 30px
    color #666
    width 130px
    margin-top 10px
    color #ee7676
    font-weight bold
    text-decoration underline
    text-align center
  .info_box
    display flex
    align-items center
    .info_img
      width 130px
      height 130px
      margin-right 30px
      img
        width 100%
        height 100%
        border-radius 50%
    .infoList
      font-size 30px
      color #333
      margin-right 30px
      &>div
        margin-bottom 5px
      .toLogin
        color #fff
        padding 15px 25px
        background #ee7676
        font-size 28px
        border-radius 10px
      .balance
        color #e55c3f
        font-size 30px
    .rechargeBtn
      text-align right
      flex 1
      span
        background #ee7676
        padding 15px
        font-size 28px
        border-radius 10px
        color #fff
        display inline-block
        cursor pointer
  .suggest
    font-size 32px
    text-align right
    color #db5f5f
    cursor pointer
    font-weight bold
    text-decoration underline
.tabTurn
  font-size 30px
  color #333
  span
    width 50%
    color #666
    transition all .3s ease
    display inline-block
    text-align center
    padding 15px 0
    border-bottom 3px solid #ddd
    &:first-child
      border-right 1px solid #ddd
    &.active
      border-bottom-color #e55c3f
      color #e55c3f
.tabBox
  font-size 30px
  color #666
  text-align center
  padding 10px
</style>


