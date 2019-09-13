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
// import { Toast } from "mint-ui";
import Qs from "qs";
export default {
  data() {
    return {
      money: "",
      symbol: "",
      exchangeRate: "",
      currency: "",
      isComplete: false
    };
  },
  created() {},
  created() {
    // this.$t("index.updateHead")
    this.$bus.$emit("navBar", "recharge");
  },
  activated() {
    // console.log("app_activated");
  },
  mounted() {
    this.init();
    // console.log("app_mounted");
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
    recharge() {
      // console.log("充值");
      var money = +this.money,
        reg = /\d+/; //校验数字格式
      if (money && reg.test(money)) {
        this.$api
          .postDataN("recharge", Qs.stringify({ money }))
          .then(res => {
            // console.log(res);
            // window.open("https://p-y.tm/hQ-sDbJ");
            var msg = "";
            if (res.code == 1) {
              msg = this.$t("recharge.rechargeStatus.success");
              var data = res.data;
              window.open(data.shortUrl);
              // var price = +localStorage.getItem("money");
              // localStorage.setItem("money", price + money);
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

<style scoped>
.recharge_box .unit {
  color: #fd5c63;
  font-weight: bold;
  font-size: 26px; /*no*/
}

.recharge_txt {
  padding: 20px 25px;
  font-size: 15px; /*no*/
  color: #666;
}

.recharge_txt span:first-child {
  color: #de0000;
  font-size: 18px; /*no*/
}

.recharge_box > div:first-child {
  width: 100%;
  display: flex;
  text-align: center;
  font-size: 0;
  width: 100%;
  padding-top: 5%;
}

.recharge_box input {
  width: 80%;
  height: 80px;
  font-size: 15px; /*no*/
  padding-left: 25px;
  border-color: #999;
  color: #666;
  border: 1px solid #ddd;
}

.recharge_box button {
  width: 20%;
  height: 80px;
  background: #fd5c63;
  color: #fff;
  border: 0 none;
  outline: 0 none;
}
</style>