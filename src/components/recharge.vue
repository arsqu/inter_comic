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
        class="unit"
      >1{{currency}}:{{exchangeRate}}{{$t('detl.coins')}}</span>
      <br />2.
      <span>{{$t('recharge.info.1')}}</span>
      <br />
      3. {{$t('recharge.info.2')}}
      <br />
      4. {{$t('recharge.info.3')}}
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      money: "",
      symbol: "",
      exchangeRate: "",
      currency: "",
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
      this.$toast(this.$t("tips.toLogin"));
      //   this.$router.push({ name: "login" });
      // return;
    }
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
    recharge() {
      // console.log("充值");
      var money = +this.money,
        reg = /\d+/; //校验数字格式
      if (!this.post) {
        this.$toast(this.$t("tips.toLogin"));
        this.$router.push({ name: "login" });
        return;
      }
      if (money && reg.test(money)) {
        this.$toast(this.$t("recharge.loading"));
        this.$api
          .postDataN("recharge", Qs.stringify({ money }))
          .then(res => {
            // console.log(res);
            // window.open("https://p-y.tm/hQ-sDbJ");
            var msg = "";
            if (res.code == 1) {
              msg = this.$t("recharge.rechargeStatus.success");
              var data = res.data;
              var ch = localStorage.getItem("wap_ch") || "none";
              _hmt.push(["_trackEvent", "recharge_" + ch]); //充值成功数
              clearTimeout(this.timer);
              this.timer = setTimeout(this.hasMoney(), 2000);
              window.open(data.shortUrl);
              // var price = +localStorage.getItem("money");
            } else msg = this.$t("recharge.rechargeStatus.err");
            this.$toast(msg);
          })
          .catch(err => {
            this.$toast(this.$t("response.err"));
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
  .recharge_txt 
    padding 20px 25px
    font-size 30px
    color #666
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