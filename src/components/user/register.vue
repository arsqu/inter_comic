<template>
  <div class="userBox">
    <span class="back" @click="reBack"></span>
    <div class="userForm">
      <h5 class="head_txt">{{$t('common.register')}}</h5>
      <!-- 注册 -->
      <div @keyup.13="register">
        <div class="form_item">
          <div class="form_icon account">
            <input
              type="text"
              v-model="uname"
              autocomplete="uname"
              :placeholder="$t('register.valid.uname')"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_icon OTP">
            <input
              class="code"
              type="text"
              v-model="email"
              autocomplete="eamil"
              :placeholder="$t('register.valid.email')"
            />
            <span :class="{valid:showValidEmail}" @click="getCode">
              <span v-show="showValidEmail">{{$t('register.valid.valiEmail')}}</span>
              <span v-show="timeValidEmail">{{}}</span>
            </span>
          </div>
        </div>
        <div class="form_item">
          <div class="form_icon ecode">
            <input
              type="text"
              v-model="ecode"
              autocomplete="upass"
              :placeholder="$t('register.valid.ecode')"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_icon password">
            <input
              type="password"
              v-model="upass"
              autocomplete="upass"
              :placeholder="$t('register.valid.pass')"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_icon age">
            <input
              type="number"
              v-model="age"
              autocomplete="age"
              :placeholder="$t('register.valid.age')"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_icon invitation">
            <input
              type="text"
              v-model="code"
              autocomplete="invitation"
              :placeholder="$t('register.valid.code')"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_icon gender">
            <mt-radio
              v-model="gender"
              :title="$t('register.valid.gender')"
              :options="$t('register.gender')"
            ></mt-radio>
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
        </div>
      </div>
      <router-link
        class="label_txt"
        tag="div"
        :to="{name:$config.Router.login}"
      >{{$t('login.toLogin')}}...</router-link>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      codeSrc: "",
      showValidEmail: true, //发送请求
      timeValidEmail: false, //倒计时
      uname: "",
      email: "",
      ecode: "",
      upass: "",
      age: "",
      gender: "",
      code: "",
      toRegister: false
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
    //验证码点击倒计时
    getCode(btn) {
      var timer = null;
      time = 60;
      // this.isShow
      // this.showValidEmail 
      // this.timeValidEmail
      last.className = last.className.replace(/(^| )s_hide/, "");
      code.className += " s_hide"; //隐藏
      timer && clearInterval(timer);
      last.innerHTML = time + "s";
      timer = setInterval(function() {
        time--;
        last.innerHTML = time + "s";
        if (time == -1) {
          clearInterval(timer);
          time = 60;
          code.className = code.className.replace(/(^| )s_hide/, "");
          last.className += " s_hide";
        }
      }, 1000);
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
    reBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.gender >>> .mint-radiolist
  display flex
  align-items center
  .mint-radiolist-title
    font-size 35px
  .mint-radiolist-label
    padding 0
    font-size 30px
    color #666
  .mint-radio-input:checked+.mint-radio-core
    background-color #F15F65
    border-color #F15F65
.userBox
  background #f4fdff
  height 100%
  width 100%
  background-image linear-gradient(to right, #fd5c63, #e7646a, #f25f65, #ee6d72)
  position absolute
  .label_txt
    font-size 28px
    color #666
    padding-top 20px
    text-align right
    text-decoration underline
  .userForm
    background #fff
    padding 80px 55px
    border-radius 15px
    box-shadow 0 0 15px #ddd
    position absolute
    top 0
    right 0
    left 0
    bottom 0
    margin auto
    width 90%
    height 85%
    .head_txt
      text-align center
      color #666
      font-size 45px
      padding-bottom 30px
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
      .form_icon>span
        width 30%
        display inline-block
        height 85px
        line-height 85px
        border-radius 5px
        font-size 25px
        text-align center
        word-break break-all
        vertical-align bottom
        &.valid
          color #fff
          background #EF6268
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
          background url('/static/img/icon_new/email.png')
          background-size 100%
        &.account:before
          background url('/static/img/icon_new/account.png')
          background-size 100%
        &.password:before
          background url('/static/img/icon_new/password.png')
          background-size 100%
        &.age:before
          background url('/static/img/icon_new/age.png')
          background-size 100%
        &.invitation:before
          background url('/static/img/icon_new/invitation.png')
          background-size 100%
    .login_btn
      margin-top 5%
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
@media (min-width: 768px) and (max-width: 1024px)
  .userBox .userForm
    height 90%
  .userBox .userForm .form_item input
    height 70px
</style>