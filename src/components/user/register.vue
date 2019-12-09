<template>
  <div class="userBox">
    <span class="back" @click="reBack"></span>
    <div class="userForm">
      <h5 class="head_txt">{{$t('common.register')}}</h5>
      <h5 class="link_span mb-3" @click="toggleType">{{$t('register.toggle')[type]}}</h5>
      <!-- 注册 -->
      <div @keyup.13="register">
        <form>
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
          <!-- 邮箱注册 -->
          <div v-show="!type">
            <div class="form_item">
              <div class="form_icon OTP eamil">
                <input
                  type="text"
                  v-model="email"
                  autocomplete="eamil"
                  :class="['code',{error:emailStatus['email']}]"
                  :placeholder="$t('register.valid.email')"
                />
                <span :class="{valid:showValidEmail}" @click="getMail">
                  <span v-show="showValidEmail">{{$t('register.valid.sendEmail')}}</span>
                  <span v-show="timeValidEmail">{{timeLast}}</span>
                </span>
              </div>
            </div>
            <div class="form_item">
              <div class="form_icon ecode">
                <input
                  type="text"
                  v-model="ecode"
                  autocomplete="ecode"
                  :class="{error:emailStatus.ecode}"
                  :placeholder="$t('register.valid.ecode')"
                />
              </div>
            </div>
          </div>
          <!-- 手机注册 -->
          <div v-show="type">
            <div class="form_item">
              <div class="form_icon OTP phone">
                <div class="phoneCode">
                  <i @click="changeCode">+{{defPhone}}</i>
                </div>
                <input
                  class="code"
                  type="text"
                  v-model="phone"
                  autocomplete="phone"
                  :placeholder="$t('register.valid.phone')"
                />
                <span class="valid">
                  <a
                    :href="'sms:'+mPhone+'?&body=3rdmg_'+(Math.random()+1)"
                  >{{$t('register.valid.sendSms')}}</a>
                </span>
              </div>
            </div>
            <div class="tips_info">{{$t('register.tips.sendSms')}}</div>
            <!-- <div class="form_item">
            <div class="form_icon OTP phone">
              <input
                class="code"
                type="text"
                v-model="phone"
                autocomplete="phone"
                :placeholder="$t('register.valid.phone')"
              />
              <span :class="{valid:showValidPhone}" @click="getPhone">
                <span v-show="showValidPhone">{{$t('register.valid.sendPhone')}}</span>
                <span v-show="timeValidPhone">{{phoneTimeLast}}</span>
              </span>
            </div>
            </div>-->
            <!-- <div class="form_item">
            <div class="form_icon OTP">
              <input
                class="code"
                type="text"
                v-model="smsCode"
                autocomplete="smsCode"
                :placeholder="$t('register.valid.smsCode')"
              />
              <span class="valid">
                <a :href="'sms:'+mPhone+'?body=3rdmg'">Send</a>
              </span>
            </div>
            </div>-->
          </div>
          <div class="form_item">
            <div class="form_icon password">
              <input
                type="password"
                v-model="upass"
                autocomplete="password"
                :class="{error:emailStatus.password}"
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
              <mt-radio v-model="gender" :title="$t('register.valid.gender')" :options="genderI18n"></mt-radio>
            </div>
          </div>
          <div class="login_btn">
            <cs-button
              class="register"
              round
              :nativeType="'button'"
              :type="'danger'"
              :size="'large'"
              :color="'#F0656B'"
              :title="$t('register.btnTxt')"
              :isComplete="toRegister"
              :func="register"
            />
          </div>
        </form>
      </div>
      <div class="label_txt">
        {{$t('register.toLogin')}}
        <router-link
          :to="{name:$config.Router.login}"
          replace
          tag="span"
          class="link_span"
        >{{$t('login.login')}}</router-link>
      </div>
    </div>
    <!-- pop-transition="popup-fade" -->
    <!-- <div id="test">{{phoneCode}}</div> -->
    <mt-popup v-model="popupVisible" position="bottom">
      <ul class="codeList">
        <li
          v-for="(item,idx) in phoneCode"
          :key="idx"
          @click="setPhoneCode(item.code)"
        >{{item.code}}</li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import Qs from "qs";
import phoneCode from "../../util/phoneCode";
export default {
  data() {
    return {
      type: 0, //注册
      mPhone: "8800212873",
      toRegister: false, //防止按钮频繁点击
      showValidEmail: true, //发送请求文字
      timeValidEmail: false, //倒计时文字
      showValidPhone: true, //发送请求文字
      timeValidPhone: false, //倒计时文字
      popupVisible: false, //显示手机区码
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
      this.popupVisible = true;
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
        opt.ph = this.phone;
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
          if (res.code == 1) {
            // this.smsCode = res.phcode;
          } else {
            // if (!this.type) {
            //   clearInterval(this.timer);
            //   this.showValidEmail = true;
            //   this.timeValidEmail = false;
            // }
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
        var reg = /^\d+$/; //邮箱格式
        if (!this.phone || !reg.test(this.phone)) {
          console.log("手机验证失败");
          this.$util.Toast("register.valid.phoneErr");
          return;
        }
      }
      this.toRegister = true;
      var local = localStorage;
      var ch = local.getItem("wap_ch") || "none";
      var opt = {
        cid: 1,
        unick: this.uname,
        upass: this.upass
      };
      if (this.gender) {
        opt.sex = this.genderI18n.indexOf(this.gender) == 0 ? "m" : "w";
      }
      if (this.age) {
        opt.birthday = this.age;
      }
      if (this.icode) {
        opt.ycode = this.icode;
      }
      if (this.type == 0) {
        opt.mail = this.email;
        opt.code = this.ecode;
        opt.type = "mail";
      } else {
        opt.ph = this.defPhone + this.phone;
        // opt.code = this.smsCode;
        opt.type = "ph";
      }
      this.$api
        .postDataN("register.create", Qs.stringify(opt))
        .then(res => {
          var msg = "", //统计注册状态
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
            local.setItem("uname", data.unick);
            local.setItem("money", data.money);
            this.uname = data.uname;
            this.clearData();
            // this.$router.push({ name: this.$config.Router.login });
            // this.$util.statistics("register_" + ch, status); //统计代码
          } else if (res.code == 4) {
            this.phone = "";
          } else if (res.code == 7) {
            status = "error";
          } else {
          }
          this.$util.statistics("register_" + ch, status); //统计注册成功失败数
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
    reBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.codeList
  overflow scroll !important
  height 300px
  padding 10px 25px
  color #666
.userBox >>> .mint-popup-bottom
  top 50%
  right auto
  bottom auto
  left 50%
  width 70%
  margin-top -150px
.gender >>> .mint-radiolist
  display flex
  align-items center
  height 100%
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
  .tips_info
    font-size 27px
    color #f16066
    padding 0 10px
    margin-bottom 30px
  .mb-3
    margin-bottom 30px
  .link_span
    font-size 30px
    text-align center
    text-decoration underline
    color #F16066
  .label_txt
    font-size 28px
    color #666
    padding-top 20px
    text-align center
  .userForm
    background #fff
    padding 60px 55px
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
    overflow-x hidden
    overflow-y auto
    .head_txt
      text-align center
      color #666
      font-size 45px
      padding-bottom 30px
    .head_tip
      text-align center
      color #666
      font-size 26px
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
            color #000
            font-size 26px
            font-weight bold
            font-style normal
            position absolute
            color #666
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
          border-radius 5px
          font-size 28px
          text-align center
          word-break break-all
          vertical-align top
          background #b5b5b5
          color #fff
          &.valid
            color #fff
            background #EF6268
            a
              color #fff
      input
        width 100%
        border 0 none
        background #fff
        padding 0 15px
        font-size 25px
        padding-left 80px
        height 100%
        outline 0 none
        border-radius 45px
        color #555
        transition all .4s ease
        box-shadow 0 0 15px #ddd
        -webkit-appearance none
        &.code
          box-sizing border-box
          width 70%
          border-radius 20px 0 0 20px
      img
        height 85px
        vertical-align middle
      input:focus
        border-radius 1px
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
        &.eamil:before
          background url('/static/img/icon_new/email.png')
          background-size 100%
        &.phone:before
          content none
          //background url('/static/img/icon_new/otp.png')
          //background-size 100%
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
  //.userBox .userForm
  //height 90%
  //.userBox .userForm .form_item input
  //height 70px
</style>