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
    <!-- payBox -->
    <div class="paybox" v-show="payBox">
      <div class="payfor">
        <p>{{$t('recharge.payTips.txt')}}</p>
        <!-- :href="payUrl" -->
        <!-- target="_blank" -->
        <!-- <a class="pay_txt" @click="payfor" href="javascrjpt:;">{{$t('recharge.payTips.pay')}}</a> -->
        <span :class="[isLoad?'opa':'','pay_txt pay']" @click="payfor">
          <span class="load_pic" v-show="isLoad">
            <img src="/static/img/oval.svg" alt />
          </span>
          &nbsp;{{$t('recharge.payTips.pay')}}
        </span>
        <span class="pay_txt" @click="cancel">{{$t('recharge.payTips.cancel')}}</span>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.load_pic
  width 35px
  height 35px
  line-height 35px
  text-align center
  float left
  background-repeat no-repeat
  background-position center
.pay_txt.opa
  opacity .5
</style>

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
      isLoad: false,
      post: false //是否可充值
    };
  },
  created() {
    this.$bus.$emit("navBar", this.$t("recharge.recharge"));
    this.checkLogin();
  },
  activated() {
    // console.log("app_activated");
  },
  mounted() {
    this.init();
  },
  methods: {
    pay() {
      location.href = this.payUrl;
    },
    checkLogin() {
      var isLogin = localStorage.getItem("isLogin");
      this.isLogin = true;
      if (!isLogin) {
        this.isLogin = false;
        this.$util.Toast("tips.toLogin");
        localStorage.setItem("loginUrl", this.$route.fullPath);
        // this.$router.push({ name: "login" });
      }
    },
    init() {
      this.$api
        .getDataN("currencyUnit")
        .then(res => {
          if (res.code == 1) {
            var data = res.data;
            this.symbol = data.currency;
            this.exchangeRate = data.proportion;
            this.currency = data.currency;
          } else if (res.code == 401) {
            this.isLogin = false;
            localStorage.setItem("loginUrl", this.$route.fullPath);
            this.$util.clearItem();
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
      // console.log(document.f1);
      // document.d1.submit();
      if (this.isLoad) {
        console.log("请3s后再操作");
        // this.$util.Toast("recharge.rechargeStatus.wait");
        return;
      }
      this.$util.Toast("recharge.payTips.openUrl");
      this.isLoad = true;
      console.log(this.isLoad);
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(_ => {
        this.isLoad = false;
      }, 3000);
      document.f1.submit();
    },
    cancel() {
      this.payBox = false;
      this.isLoad = false;
    },
    payReady(form) {
      // console.log(form);
      var el = document.getElementById("pay1");
      if (!el) {
        var div = document.createElement("div");
        div.setAttribute("id", "pay1");
        div.style.display = "none";
        div.innerHTML = form;
        document.body.appendChild(div);
      } else el.innerHTML = form;
    },
    recharge() {
      // console.log("充值");
      var money = +this.money,
        reg = /^\d+$/; //校验数字格式
      if (!this.isLogin) {
        this.$util.Toast("tips.toLogin");
        this.$router.push({ name: "login" });
        return;
      }
      this.payBox = false;
      if (!(money && reg.test(money))) {
        this.money = "";
        return;
      }
      if (this.post) {
        console.log("频繁点击");
        return;
      }
      this.$util.Toast("recharge.loading");
      var ch = localStorage.getItem("wap_ch") || "none";
      this.post = true;
      this.$api
        .postDataN("recharge", Qs.stringify({ money }))
        .then(res => {
          // console.log(res);
          // window.open("https://p-y.tm/hQ-sDbJ");
          var msg = "",
            status = "";
          if (res.code == 1) {
            // msg = "recharge.rechargeStatus.success";
            status = "success";
            var data = res.data;
            if (data.code == 200) {
              this.payReady(data.webPage);
              this.payBox = true;
              var payUrl = (this.payUrl = data.shortUrl || data.longUrl);
            }
            this.$util.closeToast();
            //跳转支付页
            // this.$router.push({
            //   name: "payfor",
            //   params: { payUrl }
            // });
            // location.href = data.shortUrl || data.longUrl;
            // clearTimeout(this.timer);
            // this.timer = setTimeout(this.hasMoney, 2000);
          } else {
            msg = "recharge.rechargeStatus.err";
            status = "error";
            this.$util.Toast(msg);
          }
          this.post = false;
          this.$util.statistics("recharge_" + ch, status); //统计充值数
        })
        .catch(err => {
          status = "error";
          this.$util.Toast("response.err");
          this.post = false;
          // this.payBox = true;
          // var form =
          //   "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'><html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method='post' action='https://securegw.paytm.in/theia/processTransaction' name='f1'><input type='hidden' name='CALLBACK_URL' value='https://testapi.pay.goldenmob.com/trans/callback/paytm/status'><input type='hidden' name='CHANNEL_ID' value='WAP'><input type='hidden' name='CUST_ID' value='10052'><input type='hidden' name='INDUSTRY_TYPE_ID' value='Retail'><input type='hidden' name='MID' value='KRISTR39074830433502'><input type='hidden' name='ORDER_ID' value='1571317166919'><input type='hidden' name='TXN_AMOUNT' value='100'><input type='hidden' name='WEBSITE' value='WEBPROD'><input type='hidden' name='CHECKSUMHASH' value='6z6GmgmiDjDcxkY9YDLOboBO1I90RLWAkKON/Zm3EX7j3SFp56Wlf4S1TzbGZYcZDpKRLugkCP9LnQzblrSuNsqyzl/IMbfQWD1RCU0Jh/Q='></form>\<script type='text/javascript'\>document.f1.submit();\<\/script></body></html>";
          // this.payReady(form);
          // this.payUrl =
          //   "https://paytm.business/link/invoice/payment/LL_16193955";
          // this.$router.push({
          //   name: "payfor",
          //   // params: { payUrl: "https://p-y.tm/JjSW-LN" }
          //   params: { payForm: "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'><html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method='post' action='https://securegw.paytm.in/theia/processTransaction' name='f1'><input type='hidden' name='CALLBACK_URL' value='https://testapi.pay.goldenmob.com/trans/callback/paytm/status'><input type='hidden' name='CHANNEL_ID' value='WAP'><input type='hidden' name='CUST_ID' value='10052'><input type='hidden' name='INDUSTRY_TYPE_ID' value='Retail'><input type='hidden' name='MID' value='KRISTR39074830433502'><input type='hidden' name='ORDER_ID' value='1571305488062'><input type='hidden' name='TXN_AMOUNT' value='100'><input type='hidden' name='WEBSITE' value='WEBPROD'><input type='hidden' name='CHECKSUMHASH' value='40uH5/ouo6mc/AmckZfepqAoD7yvGEeM/8/n4MkJoLSWchbjrz94CmNqhTKE4gCb8yIUrWuMCpO0GLDlGdkrWD0dNZQQnUbUMF/7/KbYImU='></form>\<script type='text/javascript'\>document.f1.submit();\<\/script\></body></html>" }
          // });
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.indicatorBox
  -webkit-transition opacity .2s linear
  transition opacity .2s linear
  .indicatorItem
    top 50%
    left 50%
    position fixed
    -webkit-transform translate(-50%, -50%)
    transform translate(-50%, -50%)
    border-radius 5px
    background rgba(0, 0, 0, .7)
    color #fff
    box-sizing border-box
    text-align center
    .spinner
      border-top-color rgb(204, 204, 204)
      border-left-color rgb(204, 204, 204)
      border-bottom-color rgb(204, 204, 204)
      height 32px
      width 32px
      -webkit-animation mint-spinner-rotate .8s infinite linear
      animation mint-spinner-rotate .8s infinite linear
      border 4px solid transparent
      border-radius 50%
.recharge_box
  div>button
    width 20%
    height 80px
    background #fd5c63
    color #fff
    font-size 28px
    border 0 none
    outline 0 none
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
      &>.pay
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
    color #666
    border 1px solid #ddd
    // box-shadow 0 4px 9px rgba(0,0,0,.23)
</style>