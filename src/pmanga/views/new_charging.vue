<template>
  <div class="new_charging">
    <!-- <div class="balance" v-if="isLogin">
      <span class="pb-2">{{ $t("common.balance") }}</span>
      <span>{{ balance }}</span>
    </div> -->
    <div class="bgBox">
      <div class="bg_circle"></div>
      <span class="back" @click="reBack"></span>
      <div class="logo">
        <router-link v-if="!isLogin" :to="{ name: $config.Router.login }">{{
          $t("login.login")
        }}</router-link>
        <template v-else
          ><span class="pb-2">{{ $t("common.balance") }}</span
          ><br />
          <span>{{ balance }} {{ $t("common.priceUnit") }}</span></template
        >
      </div>
      <!-- <div class="over_pic"></div> -->
    </div>
    <!-- recharge -->
    <div class="recharge_box" @keyup.13="askRecharge">
      <div v-show="showInput" :class="[{ inpBox: isLogin }, 'mb-2']">
        <input
          type="text"
          v-model="money"
          @input="clearVal"
          :placeholder="$t('recharge.rechargeMoney')"
        />
        <span v-if="isLogin" class="currency">{{ currency }}</span>
      </div>
      <!-- topUp -->
      <div class="topUpBox pb-5">
        <ul class="topUpList">
          <li
            :class="{ active: isCur == idx }"
            v-for="(item, idx) in topUpList"
            :key="idx"
            @click="setVal(idx, item)"
          >
            <span> {{ currency }}{{ item }}</span>
            <span v-if="isLogin"
              >{{ exchangeRate * item }} {{ $t("common.priceUnit") }}</span
            >
          </li>
          <li
            :class="{ active: isCur == 6 }"
            @click="_ => (this.showInput = true)"
          >
            <span>customize</span>
          </li>
        </ul>
      </div>
      <!-- button -->
      <!-- recharge -->
      <cs-button
        round
        :size="'large'"
        :title="$t('common.pay')"
        :isComplete="post"
        :func="askRecharge"
      />
      <!-- tipsBox -->
      <div class="recharge_txt">
        <span class="tips">{{ $t("recharge.tips") }}:</span>
        <br />
        1. {{ $t("recharge.payRate") }}
        <span v-if="isLogin" class="unit link_span"
          >1{{ currency }}:{{ exchangeRate }}{{ $t("common.priceUnit") }}</span
        >
        <br />2.
        <span>{{ $t("recharge.info.1") }}</span>
        <br />
        3. {{ $t("recharge.info.2") }}
        <br />
        4. {{ $t("recharge.info.3") }}
        <div class="login_tips" v-if="!isLogin">
          <router-link class="link_span" :to="{ name: $config.Router.login }">{{
            $t("login.login")
          }}</router-link>
        </div>
      </div>
      <!-- 显示的支付框 -->
      <div class="paybox" v-show="payment">
        <div class="payfor">
          <p v-html="$t('recharge.payTips.txt')"></p>
          <span
            :class="[isLoad ? 'opa' : '', 'pay_txt pay btn_primary']"
            @click="askToPay"
          >
            <span class="load_pic" v-show="isLoad">
              <img src="/static/img/oval.svg" alt />
            </span>
            &nbsp;{{ $t("recharge.payTips.pay") }}
          </span>
          <span class="pay_txt" @click="cancel">{{
            $t("recharge.payTips.cancel")
          }}</span>
        </div>
      </div>
      <!-- true -->
      <div class="paybox" v-show="payBox">
        <div class="payfor">
          <p v-html="$t('recharge.payTips.txt')"></p>
          <span
            :class="[isLoad ? 'opa' : '', 'pay_txt pay btn_primary']"
            @click="payfor"
          >
            <span class="load_pic" v-show="isLoad">
              <img src="/static/image/oval.svg" alt />
            </span>
            &nbsp;{{ $t("recharge.payTips.pay") }}
          </span>
          <span class="pay_txt" @click="cancel">{{
            $t("recharge.payTips.cancel")
          }}</span>
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
      showInput: false, // 自定义充值金额
      paytm: "paytm",
      topUpList: this.$project.topUpList, //充值金额
      isCur: -1, //选中充值金额
      payBox: false, //支付框
      payment: false, //确认并支付
      isLogin: false,
      balance: "", //余额
      money: "", //充值金额
      exchangeRate: "", //兑换比例
      currency: "", //单位
      timer: null,
      btnTimer: null, //按钮延迟提示
      isLoad: false,
      post: false //是否可充值
    };
  },
  created() {
    this.hasMoney();
    this.checkLogin();
  },
  mounted() {
    this.init();
  },
  methods: {
    reBack() {
      this.$router.go(-1);
    },
    clearVal() {
      this.isCur = -1;
    },
    //填充输入框
    setVal(idx, val) {
      this.isCur = idx;
      this.money = val;
    },
    checkLogin() {
      var isLogin = localStorage.getItem("isLogin");
      this.isLogin = true;
      //未登录
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
            this.exchangeRate = data.proportion;
            this.currency = data.currency;
          } else if (res.code == 401) {
            this.isLogin = false;
            localStorage.setItem("loginUrl", this.$route.fullPath);
            this.$util.clearItem();
          }
          // console.log(res);
        })
        .catch(err => {
          this.isLogin = false;
          // console.log(err);
        });
    },
    //查询余额
    hasMoney() {
      this.$api.getDataN("hasMoney").then(res => {
        // console.log(res);
        if (res.code == 1) {
          var data = res.data;
          localStorage.setItem("money", data.money);
          this.isLogin = true;
          this.balance = data.money;
        } else {
          this.isLogin = false;
        }
      });
    },
    askRecharge() {
      if (!this.isLogin) {
        this.$util.Toast("tips.toLogin");
        this.$router.push({ name: this.$config.Router.login });
        return;
      }
      //提示框已经打开
      if (this.payment) {
        return;
      }
      var money = +this.money,
        reg = /^\d+$/;
      //校验充值金额
      if (!(money && reg.test(money))) {
        this.money = "";
        console.dir("金额错误");
        return;
      }
      this.payment = true;
    },
    // 弹窗询问后支持
    askToPay() {
      this.$util.Toast("recharge.loading");
      var ch = localStorage.getItem("wap_ch") || "none";
      if (this.isLoad) {
        console.log("请10s后再操作");
        // this.$util.Toast("recharge.rechargeStatus.wait");
        return;
      }
      // this.$util.Toast("recharge.payTips.openUrl");
      this.isLoad = true;
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(_ => {
        this.isLoad = false;
        this.$util.Toast("recharge.payTips.toLong");
      }, 10 * 1000);
      var opt = {
        money: this.money
      };
      ch && (opt.chCode = ch);
      this.$api
        .postDataN("recharge", Qs.stringify(opt))
        .then(res => {
          // console.log(res);
          var msg = "",
            status = "";
          if (res.code == 1) {
            status = "success";
            var data = res.data;
            if (data.code == 200) {
              this.payReady(data.webPage, 1);
              // this.payBox = true; //是否确认支付
            }
            this.$util.closeToast();
          } else {
            msg = "recharge.rechargeStatus.err";
            status = "error";
            this.$util.Toast(msg);
          }
          this.timer && clearTimeout(this.timer);
          this.isLoad = false;
        })
        .catch(err => {
          status = "error";
          this.timer && clearTimeout(this.timer);
          this.isLoad = false;
          // var form ='<html><head><title>Merchant Check Out Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><input type="hidden" name="code" value="200"><form method="post" action="https://securegw.paytm.in/order/process" name="paytm"><table border="1"><tbody><input type="hidden" name="CALLBACK_URL" value="http://pay.q-av.com/paytm/callback">                ↵               <input type="hidden" name="CHANNEL_ID" value="WAP">↵                ↵               <input type="hidden" name="CHECKSUMHASH" value="U//YaL/5JlqKL9Ggr3zxSiZDn&#43;Auh/y&#43;k1LyZuK&#43;11KToT6qWOE0PbkH24D3hQ6BbNTf/7Hj3jdQBoUTdY2pxwhlGchItMKnHahAuz4Fpz8=">↵                ↵               <input type="hidden" name="CUST_ID" value="10990">↵                ↵               <input type="hidden" name="INDUSTRY_TYPE_ID" value="Retail109">↵                ↵               <input type="hidden" name="MERC_UNQ_REF" value="10448">↵                ↵               <input type="hidden" name="MID" value="KRISTR66279147368735">↵                ↵               <input type="hidden" name="ORDER_ID" value="A0001_201912091147003SW6">↵                ↵               <input type="hidden" name="TXN_AMOUNT" value="1.00">↵                ↵               <input type="hidden" name="WEBSITE" value="DEFAULT">↵                ↵            </tbody>↵         </table>\<script type="text/javascript"\>document.paytm.submit();\<\/script\></form></body></html>';
          // this.payReady(form, 1);
          this.$util.Toast("response.err");
        });
    },
    payfor() {
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
      var forms = document.forms["paytm"];
      if (forms.length > 0) {
        forms.submit(); //跳转paytm页面
        return;
      }
      console.dir("没有表单", document.forms);
    },
    cancel() {
      this.payBox = false;
      this.payment = false;
      this.isLoad = false;
    },
    payReady(form, autoSubmit) {
      // console.log(form);
      var el = document.getElementById("pay1");
      if (!el) {
        var div = document.createElement("div");
        div.setAttribute("id", "pay1");
        div.style.display = "none";
        div.innerHTML = form;
        document.body.appendChild(div);
      } else el.innerHTML = form;
      if (autoSubmit) document.forms["paytm"].submit(); //点击后直接支付
    },
    // 直接支付
    recharge() {
      // console.log("充值");
      if (!this.isLogin) {
        this.$util.Toast("tips.toLogin");
        this.$router.push({ name: this.$config.Router.login });
        return;
      }
      var money = +this.money,
        reg = /^\d+$/;
      this.payBox = false;
      if (!(money && reg.test(money))) {
        this.money = "";
        return;
      }
      if (this.post) {
        // console.log("频繁点击");
        this.$util.Toast("recharge.loading");
        return;
      }
      this.$util.Toast("recharge.loading");
      var ch = localStorage.getItem("wap_ch") || "none";
      this.post = true;
      this.btntimer && clearTimeout(this.btntimer);
      this.btntimer = setTimeout(_ => {
        // console.log("请求超时");
        this.$util.Toast("recharge.payTips.toLong");
        this.post = false; //允许再次请求支付
      }, 10 * 1000); //10s后提示
      var opt = { money };
      ch && (opt.chCode = ch);
      console.log(opt);
      this.$api
        .postDataN("recharge", Qs.stringify(opt))
        .then(res => {
          // console.log(res);
          this.btntimer && clearTimeout(this.btntimer);
          var msg = "",
            status = "";
          if (res.code == 1) {
            // msg = "recharge.rechargeStatus.success";
            status = "success";
            var data = res.data;
            if (data.code == 200) {
              this.payReady(data.webPage);
              this.payBox = true; //是否确认支付
            }
            this.$util.closeToast();
            //跳转支付页
            // clearTimeout(this.timer);
            // this.timer = setTimeout(this.hasMoney, 2000);
          } else {
            msg = "recharge.rechargeStatus.err";
            status = "error";
            this.$util.Toast(msg);
          }
          this.post = false;
        })
        .catch(err => {
          status = "error";
          this.btntimer && clearTimeout(this.btntimer);
          this.$util.Toast("response.err");
          this.post = false;
          // this.payBox = true;
          // var form =
          //   "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'><html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method='post' action='https://securegw.paytm.in/theia/processTransaction' name='f1'><input type='hidden' name='CALLBACK_URL' value='https://testapi.pay.goldenmob.com/trans/callback/paytm/status'><input type='hidden' name='CHANNEL_ID' value='WAP'><input type='hidden' name='CUST_ID' value='10052'><input type='hidden' name='INDUSTRY_TYPE_ID' value='Retail'><input type='hidden' name='MID' value='KRISTR39074830433502'><input type='hidden' name='ORDER_ID' value='1571317166919'><input type='hidden' name='TXN_AMOUNT' value='100'><input type='hidden' name='WEBSITE' value='WEBPROD'><input type='hidden' name='CHECKSUMHASH' value='6z6GmgmiDjDcxkY9YDLOboBO1I90RLWAkKON/Zm3EX7j3SFp56Wlf4S1TzbGZYcZDpKRLugkCP9LnQzblrSuNsqyzl/IMbfQWD1RCU0Jh/Q='></form>\<script type='text/javascript'\>document.f1.submit();\<\/script></body></html>";
          // this.payReady(form);
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
topUpH = 80px
.bgBox
  background url('~x/image/bg.png')repeat-x
  background-size contain
  position relative
  text-align center
  height 30vh
  .bg_circle
    // background url('~x/image/bg_circle.png')repeat-x
    background-size contain
    width: 100%;
    height: 100%;
  .logo
    position: absolute;
    bottom: 100px;
    color #fff
    width: 100%;
    a
      color: #fff;
.paybox >>> .special
  color #f46b71
.new_charging >>> .mint-button-icon
  vertical-align middle
.new_charging >>> .mint-button-text
  vertical-align text-bottom
.load_pic
  width 35px
  height 35px
  line-height 35px
  text-align center
  float left
  background-repeat no-repeat
  background-position center
  img
    vertical-align middle
.pay_txt.opa
  opacity .5
.recharge_box
  padding 0 30px
.new_charging
  .balance
    display flex
    flex-direction column
    align-items center
.recharge_box .inpBox input
  width 85%
  border-radius 50px 0 0 50px
  -webkit-appearance none
.recharge_box
  .topUpList
    display flex
    // padding 20px 0
    flex-wrap wrap
    font-size 35px
    //justify-content space-around
    text-align center
    li
      width calc(100% / 3 - 20px)
      color #888
      margin 10px
      padding 20px 0
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span
        display block
        width 100%
        &:first-child
          font-weight bold
          padding-bottom 15px
  input
    width 100%
    height topUpH
    font-size 30px
    padding-left 25px
    color #666
    border 1px solid #ddd /*no*/
    outline 0 none
    transition all .4s ease
  .currency
    border 2px solid #eee
    border-left 0
    color #666
    height topUpH
    width topUpH
    font-size 30px
    line-height 80px
    width 15%
    border-radius 0 10px 10px 0
  .btn_charging
    width 100%
  .paybox
    position fixed
    z-index 100
    width calc(100% - 60px)
    top 50%
    margin-top -25%
    .payfor
      background #fff
      width 80%
      margin 0 auto
      border 2px solid #ddd
      padding 5px 30px 40px
      box-shadow 2px 2px 6px 0 #d7d7d7
      border-radius 15px
      font-size 28px
      text-align center
      .pay_txt
        display inline-block
        padding 13px 20px
        border-radius 5px
        margin 0 30px
        cursor pointer
        box-sizing border-box
      &>p
        margin 40px 0
        line-height 45px
        font-size 35px
        text-align left
        padding 0 25px
      &>.pay
        // background #ee4e59
        // color #fff
        display inline-block
      // &>span
      //   background #E3E3E3
  .recharge_txt
    padding 30px 25px
    font-size 30px
    color #cdcdcd
    & .tips
      font-weight bold
    .login_tips>a
      font-size 35px
      padding 10px
      text-decoration underline
      display block
      text-align center
    span
      &:first-child
        font-size 35px
    .unit
      // color #fd5c63
      font-weight bold
      font-size 46px
  & > div
    &:first-child
      width 100%
      align-items center
      display flex
      text-align center
      font-size 0
      width 100%
      // padding-top 5%
</style>
