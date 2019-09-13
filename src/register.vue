<template>
  <div class="login_box">
    <div class="top_logo">
      <span class="back" @click="reBack"></span>
      <span>{{$t('register.register')}}</span>
    </div>
    <div class="login_info">
      <div class="form_box" @keyup.13="register">
        <form>
          <div class="form_item">
            <input
              type="text"
              v-model="uname"
              autocomplete="uname"
              :placeholder="$t('register.account')"
            />
          </div>
          <div class="form_item">
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
          <div class="form_item">
            <input
              type="password"
              v-model="upass"
              autocomplete="upass"
              :placeholder="$t('register.pass')"
            />
          </div>
        </form>
      </div>
      <div class="login_btn">
        <span class="register" @click="register">{{$t('register.btnTxt')}}</span>
        <p>
          <!-- 点击 获取验证码按钮 即表示阅读并同意掌阅漫画
          <br />《同意协议》-->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from "mint-ui";
import Qs from "qs";
export default {
  data() {
    return {
      codeSrc: "http://161.117.178.26:8080/ulogin/code?math=" + Math.random(),
      // codeSrc: "/java/ulogin/code?math=" + Math.random(), //测试环境
      // codeSrc: "/ulogin/code?math=" + Math.random(),
      uname: "",
      upass: "",
      code: "",
      isComplete: false
    };
  },
  created() {},
  activated() {
    // console.log("app_activated");
  },
  mounted() {
    // console.log("app_mounted");
  },
  methods: {
    reBack() {
      this.$router.go(-1);
    },
    //刷新
    refresh() {
      this.codeSrc = this.codeSrc.replace(
        /\?math\=.+/,
        "?math=" + Math.random()
      );
    },
    register() {
      if (this.isComplete) {
        this.$toast(this.$t("login.tips.wait"));
        return;
      }
      if (!this.uname || !this.upass || !this.code) {
        // this.$toast("账号密码验证码不能为空");
        this.$toast(this.$t("login.tips.empty"));
        return;
      }
      this.isComplete = true;
      this.$api
        .postDataN(
          "register",
          Qs.stringify({
            uname: this.uname,
            upass: this.upass,
            cid: 1,
            code: this.code
          })
        )
        .then(res => {
          var msg = "";
          if (res.code == 1) {
            var data = res.data;
            msg = $t("register.status.success");
            localStorage.setItem("uname", data.uname);
            localStorage.setItem("money", data.money);
            localStorage.setItem("isLogin", 1);
            this.$router.push({ name: "login" });
          } else if (res.code == 3) msg = this.$t("register.status.warn");
          //this.$toast("验证码错误");
          else if (res.code == 4) msg = this.$t("register.status.repeat");
          //this.$toast("请勿重复注册");
          else {
          }
          // console.log(res);
          this.isComplete = false;
        })
        .catch(err => {
          this.$toast($t("register.status.err"));
          this.isComplete = false;
          console.log(err);
        });
      console.log("post");
      console.log("register");
    }
  }
};
</script>

<style scoped>
.back {
  z-index: 100;
  border-top: 3px solid transparent;
  border-right: 3px solid transparent;
  border-color: orange;
  height: 30px;
  width: 30px;
  vertical-align: middle;
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
  display: inline-block;
  position: absolute;
  left: 5%;
  top: 3%;
  padding: 15px;
}

.login_box {
  padding: 0 60px;
}

.top_logo {
  padding: 60px 0;
  text-align: center;
  color: #666;
}

.form_item {
  margin-bottom: 30px;
  font-size: 0;
}

.form_item > input {
  width: 100%;
  border: 0 none;
  background: #f5f5f5;
  padding: 0 20px;
  height: 100px;
  outline: 0 none;
  border-radius: 45px;
  color: #555;
  vertical-align: middle;
}

.form_item > input.code {
  box-sizing: border-box;
  width: 70%;
  border-radius: 20px 0 0 20px;
}

.form_item span {
  width: 30%;
  display: inline-block;
  /* height: 100px; */
}

.form_item span img {
  height: 100px;
  vertical-align: middle;
}

.login_btn {
  margin-top: 10%;
}

.login_btn span.register {
  display: inline-block;
  width: 100%;
  border-radius: 40px;
  padding: 15px 0;
  border: 2px solid #fd5c63;
  text-align: center;
  font-size: 35px;
  color: #fff;
  background: #fd5c63;
}

.login_btn > p {
  font-size: 14px;
  color: #666;
  padding-top: 25px;
  text-align: center;
}
</style>