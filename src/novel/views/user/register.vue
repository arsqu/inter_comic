<template>
  <div class="userBox">
    <div class="userLogo">
      <span class="back" @click="reBack"></span>
      <div class="logo">Registered</div>
    </div>
    <div class="contentBox">
      <div class="userForm">
        <!-- <div class="loginTxt">{{ $t("login.login") }}</div> -->
        <h5
          v-if="$project.register.showPhone"
          class="link_span mb-3"
          @click="toggleType"
        >
          {{ $t("register.toggle")[type] }}
        </h5>
        <div class="login_info">
          <!-- 登录 -->
          <div class="form_box">
            <form>
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
                <div v-show="!type && !$project.register.simple">
                  <div class="form_item">
                    <div class="form_icon OTP eamil">
                      <input
                        type="text"
                        v-model="email"
                        autocomplete="eamil"
                        :class="['code', { error: emailStatus['email'] }]"
                        :placeholder="$t('register.valid.email')"
                      />
                      <span
                        :class="[showValidEmail ? '' : 'valid', 'btn_primary']"
                        @click="getMail"
                      >
                        <a href="javascript:;" v-show="showValidEmail">{{
                          $t("register.valid.sendEmail")
                        }}</a>
                        <a href="javascript:;" v-show="timeValidEmail">{{
                          timeLast
                        }}</a>
                      </span>
                    </div>
                  </div>
                  <div class="form_item">
                    <div class="form_icon ecode">
                      <input
                        type="text"
                        v-model="ecode"
                        autocomplete="ecode"
                        :class="{ error: emailStatus.ecode }"
                        :placeholder="$t('register.valid.ecode')"
                      />
                    </div>
                  </div>
                </div>
                <div v-show="type">
                  <div class="form_item">
                    <div class="form_icon OTP phone">
                      <div class="phoneCode">
                        <i @click="changeCode">{{ defPhone }}</i>
                      </div>
                      <input
                        class="code"
                        type="text"
                        v-model="phone"
                        autocomplete="phone"
                        :placeholder="$t('register.valid.phone')"
                      />
                      <span
                        :class="[showValidPhone ? '' : 'valid', 'btn_primary']"
                        @click="getPhone"
                      >
                        <a href="javascript:;" v-show="showValidPhone">{{
                          $t("register.valid.sendSms")
                        }}</a>
                        <a href="javascript:;" v-show="timeValidPhone">{{
                          phoneTimeLast
                        }}</a>
                      </span>
                      <!-- <span class="btn_primary">
                        <a
                          :href="
                            'sms:' +
                              mPhone +
                              '?&body=3rdmg_' +
                              (Math.random() + 1)
                          "
                          >{{ $t("register.valid.sendSms") }}</a
                        >
                      </span> -->
                    </div>
                  </div>
                  <div class="form_item">
                    <div class="form_icon ecode">
                      <input
                        type="text"
                        v-model="pecode"
                        autocomplete="ecode"
                        :placeholder="$t('register.valid.ecode')"
                      />
                      <!-- :class="{ error: emailStatus.ecode }" -->
                    </div>
                  </div>
                  <div class="tips_info">{{ $t("register.tips.sendSms") }}</div>
                </div>
                <div class="form_item">
                  <div class="form_icon password">
                    <input
                      type="password"
                      v-model="upass"
                      autocomplete="password"
                      :class="{ error: emailStatus.password }"
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
                      v-model="icode"
                      autocomplete="invitation"
                      :placeholder="$t('register.valid.icode')"
                    />
                  </div>
                </div>
                <div class="form_item">
                  <div class="form_icon gender">
                    <mt-radio
                      v-model="gender"
                      :title="$t('register.valid.gender')"
                      :options="genderI18n"
                    ></mt-radio>
                  </div>
                </div>
                <div class="login_btn mt-5">
                  <cs-button
                    round
                    :nativeType="'button'"
                    :type="'danger'"
                    :size="'large'"
                    :title="$t('register.btnTxt')"
                    :isComplete="toRegister"
                    :func="register"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="label_txt mt-2">
            {{ $t("register.toLogin") }}
            <router-link
              :to="{ name: $config.Router.login }"
              replace
              tag="span"
              class="link_span"
              >{{ $t("login.login") }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <ul class="codeList">
        <li
          v-for="(item, idx) in phoneCode"
          :key="idx"
          @click="setPhoneCode(item.code)"
        >
          + {{ item.code }}
        </li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import Qs from "qs";
import phoneCode from "@/util/phoneCode";
export default {
  data() {
    return {
      type: 1, //注册
      mPhone: "8800212873", // 短信发送的位置
      toRegister: false, //防止按钮频繁点击
      showValidEmail: true, // 邮箱验证
      timeValidEmail: false,
      showValidPhone: true, // 手机验证
      timeValidPhone: false,
      popupVisible: false, // 弹出手机区码
      phoneCode: [],
      genderI18n: [], //性别
      sendSMS: false, //发送短信
      timeLast: "", //剩余时间
      phoneTimeLast: "", //手机验证码剩余时间
      /* phone */
      smsCode: "", //短信码
      phone: "", //手机号
      pTimer: null,
      /* email */
      email: "",
      ecode: "", //邮箱码
      pecode: "", // 手机码
      timer: null,
      /* common */
      uname: "",
      upass: "",
      age: "",
      gender: "",
      icode: "", //推荐码
      defPhone: "91",
      // 错误提示
      emailStatus: {
        email: false,
        password: false
      }
    };
  },
  created() {
    this.genderI18n = this.$t("register.gender");
    this.phoneCode = phoneCode;
    console.log(this.$project);
  },
  activated() {
    // console.log("app_activated");
  },
  mounted() {},
  methods: {
    clearData() {
      this.smsCode = "";
      this.uname = "";
      this.upass = "";
      this.email = "";
      this.phone = "";
      this.ecode = "";
      this.age = "";
      this.gender = "";
      this.icode = "";
    },
    //选择手机区码
    changeCode() {
      // this.popupVisible = true;
      console.log("changeCode");
    },
    //设置手机区码
    setPhoneCode(val) {
      this.popupVisible = false;
      console.log(val);
      this.defPhone = val;
    },
    //注册方式
    toggleType() {
      this.type = !this.type ? 1 : 0;
    },
    //获取验证码
    getCode() {
      var type = this.type;
      var opt = {
        cid: 1
      };
      if (!this.type) {
        opt.mail = this.email;
        opt.type = "mail";
      } else {
        // opt.ph = this.phone;
        opt.ph = this.defPhone + this.phone;
        opt.type = "ph";
      }
      this.$api
        .postDataN("register.getCode", Qs.stringify(opt))
        .then(res => {
          var msg = "",
            status = {
              1: "send",
              4: "repeat",
              5: "expires",
              6: "wait"
            };
          msg = "register.status." + status[res.code];
          console.log(res);
          if (res.code == 1) {
            // this.smsCode = res.phcode;
          } else if (res.code == 4) {
            // 邮箱注册时
            if (!this.type) {
              clearInterval(this.timer);
              this.showValidEmail = true;
              this.timeValidEmail = false;
            } else {
              clearInterval(this.pTimer);
              this.showValidPhone = true;
              this.timeValidPhone = false;
            }
          } else {
          }
          this.$util.Toast(msg);
        })
        .catch(err => {
          if (!this.type) {
            // clearInterval(this.timer);
            // this.showValidEmail = true;
            // this.timeValidEmail = false;
          }
        });
    },
    //手机短信发送
    getPhone() {
      var time = 60;
      if (this.timeValidPhone) {
        console.log("无法点击");
        return;
      }
      var reg = /^\d+$/; //邮箱格式
      if (!this.phone || !reg.test(this.phone)) {
        this.$util.Toast("register.valid.phoneErr");
        return;
      }
      this.getCode();
      this.showValidPhone = false;
      this.timeValidPhone = true;
      this.pTimer && clearInterval(this.pTimer);
      this.phoneTimeLast = time + "s";
      this.pTimer = setInterval(_ => {
        time--;
        this.phoneTimeLast = time + "s";
        if (time == -1) {
          clearInterval(this.pTimer);
          time = 60;
          this.showValidPhone = true;
          this.timeValidPhone = false;
        }
      }, 1000);
    },
    //邮箱验证码
    getMail() {
      var time = 60;
      if (this.timeValidEmail) {
        console.log("无法点击");
        return;
      }
      var reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/; //邮箱格式
      if (!this.email || !reg.test(this.email)) {
        console.log("邮箱验证失败");
        this.$util.Toast("register.valid.emailErr");
        return;
      }
      this.getCode();
      this.showValidEmail = false;
      this.timeValidEmail = true;
      this.timer && clearInterval(this.timer);
      this.timeLast = time + "s";
      this.timer = setInterval(_ => {
        time--;
        this.timeLast = time + "s";
        if (time == -1) {
          clearInterval(this.timer);
          time = 60;
          this.showValidEmail = true;
          this.timeValidEmail = false;
        }
      }, 1000);
    },
    //注册
    register() {
      if (this.toRegister) {
        this.$util.Toast("login.tips.wait");
        return;
      }
      if (!this.uname || !this.upass) {
        this.$util.Toast("login.tips.empty");
        return;
      }
      // 是否开启简易注册流程
      if (!this.$project.register.simple) {
        if (this.type == 0) {
          var reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/; //邮箱格式
          if (!this.email || !reg.test(this.email)) {
            console.log("邮箱验证失败");
            this.$util.Toast("register.valid.emailErr");
            return;
          }
          //邮箱码
          if (!this.ecode) {
            this.$util.Toast("register.valid.ecodeEmpty");
            return;
          }
        } else {
          //手机码
          var reg = /^\d+$/; //手机格式
          if (!this.phone || !reg.test(this.phone)) {
            console.log("手机验证失败");
            this.$util.Toast("register.valid.phoneErr");
            return;
          }
          //手机码
          if (!this.pecode) {
            this.$util.Toast("register.valid.ecodeEmpty");
            return;
          }
        }
      }
      this.toRegister = true;
      var l = localStorage,
        ch = l.getItem("wap_ch");
      var opt = {
        cid: 1, // 国别,印度固定为1(根据运营项目所在国家变动)
        upass: this.upass
      };
      // unick 为用户名,uname 为账号,简易注册下传账号,否则传用户名
      if (this.$project.register.simple) {
        opt.uname = this.uname;
      } else {
        opt.unick = this.uname;
      }
      this.gender &&
        (opt.sex = this.genderI18n.indexOf(this.gender) == 0 ? "m" : "w");
      this.age && (opt.birthday = this.age);
      this.icode && (opt.ycode = this.icode);
      // ch ? (opt.chCode = ch);
      if (!ch) {
        // (001 网站 002 apk包)
        ch = localStorage.getItem("isApp") ? "ch002" : "ch001";
      }
      opt.chCode = ch;
      if (this.type == 0) {
        opt.mail = this.email;
        opt.code = this.ecode;
        opt.type = "mail";
      } else {
        opt.ph = this.defPhone + this.phone;
        // opt.code = this.smsCode;
        opt.code = this.pecode;
        opt.type = "ph";
      }
      var autoLogin = process.env.ENV_CONFIG == "mangaCh";
      this.$api
        .postDataN("register.create", Qs.stringify(opt))
        .then(res => {
          var msg = "", //注册状态
            //提示信息
            tips = {
              1: "success",
              4: "repeat",
              7: "expired",
              8: "warn"
            };
          console.log(res.code);
          if (res.code == 1) {
            var data = res.data;
            status = "success";
            l.setItem("uname", data.uname || data.unick);
            l.setItem("money", data.money);
            this.uname = data.uname || data.unick;
            this.clearData();
            // 只有mangaline时自动登录
            if (autoLogin) {
              this.toLogin(opt);
            }
            this.$router.replace({ name: this.$config.Router.login });
          } else if (res.code == 4) {
            this.phone = "";
          } else if (res.code == 7) {
            status = "error";
          } else {
          }
          msg = "register.status." + tips[res.code];
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
      this.$bus.$emit("isLogin", "firstLogin"); //登录成功
      localStorage.setItem("isLogin", 1);
      localStorage.setItem("money", data.money);
      localStorage.setItem("uname", data.uname || data.unick);
    },
    toLogin(opt) {
      console.log("登录");
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
            // this.$router.push()
            // // 登录后自动跳转登录前的页面
            var path = localStorage.getItem("loginUrl");
            if (!path || path == "/login.html" || path == "/register.html")
              path = "/";
            this.$router.replace({ path });
          } else msg = "login.status.err";
          this.$util.Toast(msg);
          // this.toLogin = false;
        })
        .catch(err => {
          // this.toLogin = false;
          this.$util.Toast("login.status.err");
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
.back
  top auto
  margin-left 10px
.codeList
  overflow scroll !important
  height 300px
  padding 10px 25px
  li
    padding-bottom 3px
.valid
  background #b5b5b5
// 选择区号
.userBox >>> .mint-popup-bottom
  top 50%
  right auto
  bottom auto
  left 50%
  width 70%
  margin-top -150px
  // radio,checkList横向布局
.gender >>> .mint-radiolist,.gender >>> .mint-checklist
  display flex
  align-items center
  height 100%
  .mint-radiolist-title,.mint-checklist-title
    color #333
    font-size 35px
  .mint-radiolist-label,.mint-checklist-label
    padding 0
    font-size 30px
  & .mint-radio-label
      color #ccc
.userBox
  background #fff
  height 100%
  width 100%
  position absolute
  .userLogo
    position relative
    text-align center
    display flex
    align-items center
    justify-content center
    height 100px
    background #40A9FF
    .logo
      color: #fff;
      bottom: 100px;
      width: 100%;
  .contentBox
    margin-top 5%
  .label_txt
    font-size 28px
    text-align center
    color #ccc
  .tips_info
    font-size 27px
    padding 0 10px
    margin-bottom 30px
  .link_span
    font-size 30px
    text-align center
    text-decoration underline
  .userForm
    margin 0 60px
    .head_txt
      text-align center
      font-size 45px
      padding-bottom 30px
    .form_item
      margin-bottom 25px
      height 80px
      position relative
      .form_icon
        height 100%
        font-size 0
        position relative
        &.phone
          input //send sms
            padding-left 100px
            border-radius 0
            border-left 0
          .phoneCode
            width 80px
            display inline-block
            box-shadow 0 0 15px #ddd
            height 100%
            font-size 26px
            font-weight bold
            font-style normal
            position absolute
            top 0
            left 0
            i
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)
        &>span
          width 30%
          display inline-block
          height 100%
          line-height 80px
          border-radius 55px
          font-size 28px
          text-align center
          word-break break-all
          vertical-align top
          &.valid a
            color #fff
      input
        &.code
          box-sizing border-box
          width 70%
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
        &.OTP
          font-size 0
          a
            color #fff
        &.eamil:before
          background url('~x/image/icon/email.png')no-repeat center
          background-size contain
        &.phone:before
          content none
        &.account:before
          background url('~x/image/icon/account.png')no-repeat center
          background-size contain
        &.password:before
          background url('~x/image/icon/password.png')no-repeat center
          background-size contain
        &.age:before
          background url('~x/image/icon/age.png')no-repeat center
          background-size contain
        &.invitation:before
          background url('~x/image/icon/invitation.png')no-repeat center
          background-size contain
</style>
