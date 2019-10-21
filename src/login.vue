<template>
  <div class="login_box">
    <div class="top_logo">
      <span class="back" @click="reBack"></span>
      <img src="/static/img/login.png" />
    </div>
    <div class="login_info" @keyup.13="login">
      <form>
        <div class="form_box">
          <div class="form_item">
            <input
              type="text"
              v-model="uname"
              autocomplete="uname"
              :placeholder="$t('login.phone')"
            />
          </div>
          <div class="form_item">
            <input
              type="password"
              v-model="upass"
              autocomplete="upass"
              :placeholder="$t('login.pass')"
            />
          </div>
        </div>
        <div class="login_btn">
          <span class="register" @click="register">{{$t('login.register')}}</span>
          <span class="login" @click="login">{{$t('login.login')}}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      isComplete: false,
      uname: "",
      upass: ""
    };
  },
  created() {
    // this.getMsg("navBar");
  },
  activated() {
    // console.log("app_activated");
  },
  mounted() {},
  methods: {
    reBack() {
      this.$router.go(-1);
    },
    register() {
      this.$router.push({ name: "register" });
    },
    setCache(data) {
      this.$emit("isLogin", 1); //登录成功
      localStorage.setItem("isLogin", "1");
      localStorage.setItem("money", data.money);
      localStorage.setItem("uname", data.uname);
    },
    login() {
      if (this.isComplete) {
        this.$util.Toast("login.tips.wait");
        return;
      }
      if (!this.uname || !this.upass) {
        this.$util.Toast("login.tips.empty");
        return;
      }
      this.isComplete = true;
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
            if (!path) path = "/";
            this.$router.push({ path });
          } else msg = "login.status.err";
          this.$util.Toast(msg);
          this.isComplete = false;
        })
        .catch(err => {
          this.isComplete = false;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.back
  z-index 100
  border-top 3px solid transparent
  border-right 3px solid transparent
  border-color #fff
  height 30px
  width 30px
  vertical-align middle
  -webkit-transform rotate(-135deg)
  transform rotate(-135deg)
  display inline-block
  position absolute
  left 5%
  top 3%
  padding 15px
.login_info
  padding 0 60px
.form_item
  margin-bottom 30px
  input
    width 100%
    border 0 none
    background #f5f5f5
    padding 0 20px
    height 100px
    outline 0 none
    border-radius 45px
    color #555
.login_btn
  margin-top 10%
  span
    display inline-block
    width 40%
    border-radius 40px
    padding 15px 0
    border 2px solid #fd5c63
    text-align center
    font-size 35px
  .register
    color #fd5c63
    float left
  .login
    color #fff
    background #fd5c63
    float right
</style>