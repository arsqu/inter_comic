<template>
  <div class="recharge_box" @keyup.13="recharge">
    <div>
      <input type="text" v-model="money" :placeholder="$t('recharge.rechargeMoney')" />
      <button type="button" @click="recharge">{{$t('recharge.recharge')}}</button>
    </div>
    <div class="recharge_txt">
      <!-- {{symbol}} -->
      <span>{{$t('recharge.tips')}}:</span>
      <br />
      1. {{$t('recharge.payRate')}}
      <span
        v-if="isLogin"
        class="unit"
      >1{{currency}}:{{exchangeRate}}{{$t('detl.coins')}}</span>
      <br />2.
      <span>{{$t('recharge.info.1')}}</span>
      <br />
      3. {{$t('recharge.info.2')}}
      <br />
      4. {{$t('recharge.info.3')}}
      <div class="login_tips" v-if="!isLogin">
        <router-link :to="{name:'login'}">{{$t('login.login')}}</router-link>
      </div>
    </div>
    <div class="paybox" v-show="payBox">
      <div class="payfor">
        <!-- <p>是否继续充值?</p> -->
        <p>{{$t('recharge.payTips.txt')}}</p>
        <a
          class="pay_txt"
          @click="payfor"
          :href="payUrl"
          target="_blank"
        >{{$t('recharge.payTips.pay')}}</a>
        <span class="pay_txt" @click="cancel">{{$t('recharge.payTips.cancel')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      payUrl: "", //支付url
      payBox: false, //支付框
      isLogin: false,
      money: "", //充值金额
      symbol: "",
      exchangeRate: "", //兑换比例
      currency: "", //单位
      timer: null,
      isComplete: false
    };
  },
  created() {
    this.$bus.$emit("navBar", this.$t("recharge.recharge"));
    var isLogin = localStorage.getItem("isLogin");
    this.post = true;
    if (!isLogin) {
      this.post = false;
      this.isLogin = false;
      this.$toast(this.$t("tips.toLogin"));
      //   this.$router.push({ name: "login" });
      return;
    }
    this.isLogin = true;
  },
  activated() {
    // console.log("app_activated");
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$api
        .getDataN("currencyUnit")
        .then(res => {
          if (res.code == 1) {
            var data = res.data;
            this.symbol = data.currency;
            this.exchangeRate = data.proportion;
            this.currency = data.currency;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查询余额
    hasMoney() {
      this.$api.getDataN("hasMoney").then(res => {
        // console.log(res);
        if (res.code == 1) {
          var data = res.data;
          localStorage.setItem("money", data.money);
        }
      });
    },
    payfor() {
      this.payBox = false;
    },
    cancel() {
      this.payBox = false;
    },
    recharge() {
      // console.log("充值");
      var money = +this.money,
        reg = /\d+/; //校验数字格式
      if (!this.post) {
        this.$toast(this.$t("tips.toLogin"));
        this.$router.push({ name: "login" });
        return;
      }
      this.payBox = false;
      if (money && reg.test(money)) {
        this.$toast(this.$t("recharge.loading"));
        this.$api
          .postDataN("recharge", Qs.stringify({ money }))
          .then(res => {
            // console.log(res);
            // window.open("https://p-y.tm/hQ-sDbJ");
            var msg = "",
              status = "";
            if (res.code == 1) {
              // msg = this.$t("recharge.rechargeStatus.success");
              status = "success";
              var data = res.data;
              this.payBox = true;
              this.payUrl = data.shortUrl || data.longUrl;
              var ch = localStorage.getItem("wap_ch") || "none";
              _hmt.push(["_trackEvent", "recharge_" + ch, status]); //充值成功数
              clearTimeout(this.timer);
              this.timer = setTimeout(this.hasMoney(), 2000);
            } else {
              msg = this.$t("recharge.rechargeStatus.err");
              status = "error";
              _hmt.push(["_trackEvent", "recharge_" + ch, status]); //充值失败数
            }
            this.$toast(msg);
          })
          .catch(err => {
            status = "error";
            this.$toast(this.$t("response.err"));
            _hmt.push(["_trackEvent", "recharge_" + ch, status]); //充值失败数
          });
      } else {
        this.money = "";
        // this.$toast("只允许输入整数");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.recharge_box
  .paybox
    position fixed
    z-index 100
    width 100%
    .payfor
      width 60%
      margin 0 auto
      border 2px solid #ddd
      padding 20px 10px 40px 10px
      -moz-box-shadow 2px 2px 5px #333333
      -webkit-box-shadow 2px 2px 5px #333333
      box-shadow 2px 2px 6px 0px #d7d7d7
      border-radius 3px
      font-size 28px
      text-align center
      .pay_txt
        display inline-block
        padding 10px 20px
        border-radius 5px
        margin 0 30px
        cursor pointer
        box-sizing border-box
      &>p
        margin 40px 0
        color #666
        font-size 32px
      &>a
        background #EA0010
        color #fff
        display inline-block
      &>span
        background #E3E3E3
        color #666
  .recharge_txt
    padding 20px 25px
    font-size 30px
    color #666
    .login_tips>a
      color red
      font-size 35px
      padding 10px
      text-decoration underline
      display block
      text-align center
    span
      &:first-child
        color #de0000
        font-size 35px
    .unit
      color #fd5c63
      font-weight bold
      font-size 46px
  & > div
    &:first-child
      width 100%
      display flex
      text-align center
      font-size 0
      width 100%
      padding-top 5%
  input
    width 80%
    height 80px
    font-size 30px
    padding-left 25px
    border-color #999
    color #666
    border 1px solid #ddd
  button
    width 20%
    height 80px
    background #fd5c63
    color #fff
    border 0 none
    outline 0 none
</style>