<template>
  <div class="userBox">
    <div class="userLogo">
      <span class="back" @click="reBack"></span>
      <!-- <img src="/static/img/login.png" /> -->
      <img src="/static/img/login/uugai.com-1573702886176.png" />
      <div class="over_pic"></div>
    </div>
    <div class="contentBox">
      <div class="userTab">
        <span
          :class="{active:isCur == idx}"
          @click="toggleTab(idx)"
          v-for="(item,idx) in tabs"
          :key="idx"
        >{{item}}</span>
        <!-- <span :class="{active:isCur == 0}">{{$t('login.register')}}</span>
        <span :class="{active:isCur == 1}">{{$t('login.login')}}</span>-->
      </div>
      <div class="userForm">
        <div class="login_info">
          <!-- 登录 -->
          <div class="form_box">
            <div @keyup.13="login" v-show="isCur == 1">
              <div class="form_item">
                <div class="form_icon account">
                  <input
                    type="text"
                    v-model="uname"
                    autocomplete="uname"
                    :placeholder="$t('login.phone')"
                  />
                </div>
              </div>
              <div class="form_item">
                <div class="form_icon password">
                  <input
                    type="password"
                    v-model="upass"
                    autocomplete="upass"
                    :placeholder="$t('login.pass')"
                  />
                </div>
              </div>
              <div class="login_btn">
                <cs-button
                  round
                  :type="'danger'"
                  :size="'large'"
                  :title="$t('login.login')"
                  :isComplete="toLogin"
                  :func="login"
                />
                <!-- <span class="login" @click="login">{{$t('login.login')}}</span> -->
              </div>
            </div>
            <!-- 注册 -->
            <div @keyup.13="register" v-show="isCur == 0">
              <div class="form_item">
                <div class="form_icon account">
                  <input
                    type="text"
                    v-model="rname"
                    autocomplete="uname"
                    :placeholder="$t('register.account')"
                  />
                </div>
              </div>
              <div class="form_item">
                <div class="form_icon OTP">
                  <input
                    class="code"
                    type="text"
                    v-model="code"
                    autocomplete="code"
                    :placeholder="$t('register.code')"
                  />
                  <span>
                    <img @click="refresh" :src="codeSrc" />
                  </span>
                </div>
              </div>
              <div class="form_item">
                <div class="form_icon password">
                  <input
                    type="password"
                    v-model="rpass"
                    autocomplete="upass"
                    :placeholder="$t('register.pass')"
                  />
                </div>
              </div>
              <div class="login_btn">
                <cs-button
                  class="register"
                  round
                  :type="'danger'"
                  :size="'large'"
                  :color="'#F0656B'"
                  :title="$t('register.btnTxt')"
                  :isComplete="toRegister"
                  :func="register"
                />
                <!-- <span class="register" @click="register">{{$t('register.btnTxt')}}</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      tabs: [this.$t("login.register"), this.$t("login.login")],
      codeSrc: "",
      uname: "",
      upass: "",
      rname: "",
      code: "",
      rpass: "",
      toLogin: false,
      toRegister: false,
      isCur: 1 //默认显示登录
    };
  },
  created() {
    var url = process.env.SERVER_JAVA;
    if (url) this.codeSrc = url + "/ulogin/code?math=" + Math.random();
  },
  activated() {
    // console.log("app_activated");
  },
  mounted() {},
  methods: {
    toggleTab(idx) {
      this.isCur = idx;
    },
    //刷新
    refresh() {
      this.codeSrc = this.codeSrc.replace(
        /\?math\=.+/,
        "?math=" + Math.random()
      );
    },
    clearData() {
      this.rname = "";
      this.rpass = "";
      this.code = "";
    },
    //注册
    register() {
      if (this.toRegister) {
        this.$util.Toast("login.tips.wait");
        return;
      }
      if (!this.rname || !this.rpass || !this.code) {
        this.$util.Toast("login.tips.empty");
        return;
      }
      this.toRegister = true;
      // this.code = this.code.toUpperCase();
      var local = localStorage;
      var ch = local.getItem("wap_ch") || "none";
      this.$api
        .postDataN(
          "register",
          Qs.stringify({
            uname: this.rname,
            upass: this.rpass,
            cid: 1,
            code: this.code.toUpperCase()
          })
        )
        .then(res => {
          var msg = "",
            status = "";
          // console.log(res);
          if (res.code == 1) {
            var data = res.data;
            msg = "register.status.success";
            status = "success";
            local.setItem("uname", data.uname);
            local.setItem("money", data.money);
            local.setItem("isLogin", 1);
            this.isCur = 1;
            this.uname = data.uname;
            this.clearData();
            // this.$router.push({ name: this.$config.Router.login });
            this.$util.statistics("register_" + ch, status); //统计代码
          } else if (res.code == 3) {
            msg = "register.status.warn";
            status = "error";
          } else if (res.code == 4) {
            msg = "register.status.repeat";
          } else {
          }
          this.$util.Toast(msg);
          this.toRegister = false;
        })
        .catch(err => {
          this.$util.Toast("register.status.err");
          this.toRegister = false;
          console.log(err);
        });
    },
    //设置登录状态
    setCache(data) {
      this.$emit("isLogin", 1); //登录成功
      // var d = 7;
      // d = new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * d);
      // document.cookie = "isLogin=" + 1 + ";expires=" + d;
      localStorage.setItem("isLogin", "1");
      localStorage.setItem("money", data.money);
      localStorage.setItem("uname", data.uname);
    },
    //登录
    login() {
      if (this.toLogin) {
        this.$util.Toast("login.tips.wait");
        return;
      }
      //账号密码不为空
      if (!this.uname || !this.upass) {
        this.$util.Toast("login.tips.empty");
        return;
      }
      this.toLogin = true;
      this.$util.Toast("login.tips.load");
      this.$api
        .postDataN(
          "login",
          Qs.stringify({ uname: this.uname, upass: this.upass })
        )
        .then(res => {
          // console.log(res);
          var msg = "";
          if (res.code == 1) {
            var data = res.data;
            msg = "login.status.success";
            // console.log("登录成功");
            this.$bus.$emit("isLogin", "1");
            this.setCache(data);
            var path = localStorage.getItem("loginUrl");
            if (!path || path == "/userCtrl.html") path = "/";
            this.$router.replace({ path });
          } else msg = "login.status.err";
          this.$util.Toast(msg);
          this.toLogin = false;
        })
        .catch(err => {
          this.toLogin = false;
          console.log(err);
        });
    },
    reBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.userBox
  background #f4fdff
  height 100%
  width 100%
  position absolute
  .userLogo
    text-align center
    //background-image linear-gradient(to right, #9bebeb, #6fe9d9, #7fe1d5, #aef0e2)
    background-image linear-gradient(to right, #fd5c63, #e7646a, #f25f65, #ee6d72)
    height 35%
    img
      height 100%
      width auto
      display block
      margin 0 auto
    .over_pic
      background url('/static/img/banner_top.png') no-repeat
      position relative
      z-index 10
      width 100%
      height 30px
      margin-top -28px
      background-size 100% 100%
      display flex
      text-align center
  .contentBox
    .userTab
      display flex
      justify-content center
      align-items flex-end
      span
        margin 0 25px
        color #666
        padding 10px 25px
        font-size 30px
        &.active
          font-size 45px
          font-weight bold
          color #666
    .userForm
      margin 0 60px
      background #fff
      padding 80px 55px 120px
      border-radius 15px
      box-shadow 0 0 15px #ddd
      .form_item
        margin-bottom 30px
        position relative
        input
          width 100%
          border 0 none
          background #fff
          padding 0 15px
          font-size 25px
          padding-left 80px
          height 85px
          outline 0 none
          border-radius 45px
          color #555
          transition all .4s ease
          box-shadow 0 0 15px #ddd
          &.code
            box-sizing border-box
            width 70%
            border-radius 20px 0 0 20px
        span
          width 30%
          display inline-block
          vertical-align bottom
          img
            height 85px
            vertical-align middle
        input:focus
          box-shadow 0 0 10px #4bc461
        .form_icon
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
          &.OTP
            font-size 0
          &.OTP:before
            background url('/static/img/icon_new/otp.png')
            background-size 100%
          &.account:before
            background url('/static/img/icon_new/account.png')
            background-size 100%
          &.password:before
            background url('/static/img/icon_new/password.png')
            background-size 100%
      .login_btn
        margin-top 10%
        text-align center
        span
          display inline-block
          border-radius 40px
          padding 15px 0
          text-align center
          font-size 35px
          border 2px solid #fd5c63
        .login
          color #fff
          width 100%
          background #fd5c63
        .register
          color #fd5c63
          width 100%
          border 2px solid #fd5c63
          background #fff
</style>