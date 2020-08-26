<template>
  <div class="userBox">
    <div class="userLogo">
      <span class="icon_back" @click="reBack"></span>
      <img class="logo" :src="require('x/image/bg.png')" />
      <div class="over_pic"></div>
    </div>
    <div class="contentBox">
      <div class="userForm">
        <div class="loginTxt">{{ $t("login.login") }}</div>
        <div class="login_info">
          <!-- 登录 -->
          <div class="form_box">
            <form>
              <div @keyup.13="login">
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
                <div class="login_btn mt-3">
                  <cs-button
                    round
                    :nativeType="'button'"
                    :type="'danger'"
                    :size="'large'"
                    :title="$t('login.logText[1]')"
                    :isComplete="toLogin"
                    :func="login"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <router-link
          tag="div"
          class="label_txt"
          replace
          :to="{ name: 'register' }"
          >{{ $t("register.toRegister") }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      dir: "",
      uname: "",
      upass: "",
      toLogin: false
    };
  },
  created() {},
  activated() {},
  mounted() {},
  methods: {
    //设置登录状态
    setCache(data) {
      this.$bus.$emit("isLogin", "firstLogin"); //登录成功
      localStorage.setItem("isLogin", 1);
      localStorage.setItem("money", data.money);
      localStorage.setItem("uname", data.uname || data.unick);
    },
    //登录
    login() {
      if (this.toLogin) {
        this.$util.Toast("login.tips.wait");
        return;
      }
      var uname = this.uname;
      if (!uname || !this.upass) {
        this.$util.Toast("login.tips.empty");
        return;
      }
      var opt = {
        upass: this.upass
      };
      // 简易流程使用账号登录否则使用邮箱或手机登录
      if (!this.$project.register.simple) {
        if (uname.indexOf("@") != -1) {
          var reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/; //邮箱格式
          if (!reg.test(this.uname)) {
            console.log("邮箱验证失败");
            this.$util.Toast("register.valid.emailErr");
            return;
          }
          opt.mail = this.uname;
        } else {
          var reg = /^\d+$/;
          if (!reg.test(this.uname)) {
            console.log("手机验证失败");
            this.$util.Toast("register.valid.phoneErr");
            return;
          }
          if (this.uname.length == 10) {
            opt.ph = "91" + this.uname;
          } else {
            opt.ph = this.uname;
          }
        }
      } else {
        opt.uname = this.uname;
      }
      this.toLogin = true;
      this.$util.Toast("login.tips.load");
      this.$api
        .postDataN("login", Qs.stringify(opt))
        .then(res => {
          // console.log(res);
          var msg = "";
          if (res.code == 1) {
            localStorage.setItem("token", res.tocken);
            var data = res.data;
            // 没有提供个人信息接口,登录时将推荐码存起来
            localStorage.setItem("rcode", data.ucode);
            msg = "login.status.success";
            // console.log("登录成功");
            this.setCache(data);
            // 登录后自动跳转登录前的页面
            var path = localStorage.getItem("loginUrl");
            if (!path || path == "/login.html" || path == "/register.html")
              path = "/";
            this.$router.replace({ path });
          } else msg = "login.status.err";
          this.$util.Toast(msg);
          this.toLogin = false;
        })
        .catch(err => {
          this.toLogin = false;
          this.$util.Toast("server error");
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
.icon_back
  left 30px
  position: absolute;
  top: 40px
  border-color #fff
  z-index 1000
.userBox
  background #fff
  height 100%
  width 100%
  position absolute
  .label_txt
    font-size 28px
    color #666
    padding-top 20px
    text-align center
    text-decoration underline
  .userLogo
    position relative
    background #de6d72
    text-align center
    height 35%
    .logo
      height 100%
      width auto
      display block
      margin 0 auto
    .over_pic
      background url('~x/image/banner_top.png') no-repeat
      position absolute
      z-index 10
      width 100%
      height 30px
      margin-top -28px
      background-size 100% 100%
      display flex
      bottom 0
      text-align center
  .contentBox
    margin-top: 5%;
    .userForm
      margin 0 60px
      background #fff
      padding 50px 55px 30px
      border-radius 15px
      box-shadow 0 0 15px #ddd
      .loginTxt
        text-align center
        color #666
        margin-bottom 30px
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
          -webkit-appearance none
          &:focus
            box-shadow 0 0 15px #4bc461
        span
          width 30%
          display inline-block
          vertical-align bottom
          img
            height 85px
            vertical-align middle
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
          &.account:before
            background url('~x/image/icon/account.png')
            background-size 100%
          &.password:before
            background url('~x/image/icon/password.png')
            background-size 100%
</style>
