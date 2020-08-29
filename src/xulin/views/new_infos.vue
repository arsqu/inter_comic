<template>
  <div class="userList">
    <div class="info_bg">
      <span
        class="back icon_fill"
        v-if="!$config.showTabbar"
        @click="reBack"
      ></span>
      <template v-if="!isLogin">
        <router-link
          tag="button"
          class="infoBtn btn_def btn_radius"
          :to="{ name: $config.Router.login }"
          >{{ $t("login.login") }}</router-link
        >
        <div class="loginTxt">{{ $t("userInfo.tips.toLogin") }}</div>
      </template>
      <div class="info_box" v-show="isLogin">
        <div class="info_img">
          <img :src="require('x/image/def_avatar.png')" />
          <div class="login_name">{{ uname }}</div>
        </div>
        <div class="infoTop">
          <span>{{ $t("detl.hasMoney") }}：</span>
          <div class="balance">{{ money }} {{ $t("common.priceUnit") }}</div>
        </div>
        <div class="infoTop">
          <span>{{ $t("userInfo.rCode") }}：</span>
          <div class="balance">{{ rcode }}</div>
        </div>
      </div>
    </div>
    <div class="infoList">
      <ul class="icon_info">
        <router-link
          class="icon_item profile"
          tag="li"
          :to="{ name: 'info_detl' }"
          v-show="isLogin"
        >
          <span>{{ $t("userInfo.info") }}</span>
        </router-link>
        <li class="icon_item recharge" tag="li" @click="recharge">
          <span>{{ $t("common.recharge") }}</span>
        </li>
        <li
          v-show="isLogin"
          class="icon_item withdraw"
          @click="showWithdrawBox"
        >
          <span>{{ $t("paidRecord.title") }}</span>
        </li>
        <router-link
          class="icon_item withdraw_record"
          tag="li"
          :to="{ name: 'paid_record' }"
          v-show="isLogin"
        >
          <span>{{ $t("paidRecord.record") }}</span>
        </router-link>
        <router-link
          class="icon_item feedback"
          tag="li"
          :to="{ name: 'feedback' }"
        >
          <span>{{ $t("userInfo.feedback") }}</span>
        </router-link>
      </ul>
    </div>
    <div class="label_box">
      <router-link :to="{ name: 'guide' }">Terms and Conditions</router-link>
      <router-link :to="{ name: 'policy' }">Privacy Policy</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
      <router-link :to="{ name: 'refund' }"
        >Refund and Cancellation Policy</router-link
      >
    </div>
    <div class="logOut btn_def" v-show="isLogin" @click="logOut">
      {{ $t("common.singOut") }}
    </div>
    <!-- 语言选择框 -->
    <mt-popup v-model="popupVisible" position="bottom" class="cus_popup">
      <div class="langList">
        <ul>
          <!-- <li>当前语言:{{locale}}</li> -->
          <li
            v-for="(item, key, idx) in this.$config.lang"
            :key="idx"
            @click="selLang(key)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </mt-popup>

    <mt-popup
      v-model="withVisible"
      class="cus_popup"
      position="right"
      popup-transition="popup-fade"
    >
      <div class="rateTxt">
        {{ $t("recharge.payRate") }}
        <span v-if="isLogin" class="unit link_span"
          >1{{ currency }} : {{ exchangeRate
          }}{{ $t("common.priceUnit") }}</span
        >
      </div>
      <a href="javascript:;" class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">{{ $t("paidRecord.OutType") }}</span>
          </div>
          <div class="mint-cell-value">
            <mt-radio v-model="withOpt.OutType" :options="OutType"></mt-radio>
          </div>
        </div>
      </a>
      <mt-field
        v-show="!showType"
        :label="$t('paidRecord.formList.phone')"
        :placeholder="$t('paidRecord.formList.phone')"
        type="tel"
        v-model="withOpt.phone"
      ></mt-field>
      <mt-field
        v-show="showType"
        :label="$t('paidRecord.formList.account')"
        :placeholder="$t('paidRecord.formList.account')"
        type="text"
        v-model="withOpt.account"
      ></mt-field>
      <mt-field
        v-show="showType"
        :label="$t('paidRecord.formList.ifsc')"
        :placeholder="$t('paidRecord.formList.ifsc')"
        v-model="withOpt.ifsc"
      ></mt-field>
      <mt-field
        :label="$t('paidRecord.formList.money')"
        :placeholder="$t('paidRecord.formList.money')"
        :state="outCoinError"
        v-model="withOpt.outCoin"
        type="number"
      ></mt-field>
      <div class="prompt_txt">{{ msg }}</div>
      <div class="mt-5 mb-5">
        <cs-button
          round
          :size="'large'"
          :disabled="disabled"
          :title="$t('post.txt')"
          :isComplete="isComplete"
          :func="postBtn"
        />
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      msg: "",
      OutType: ["bank", "wallet"],
      isComplete: false,
      disabled: false,
      exchangeRate: "",
      currency: "",
      // 语言框
      popupVisible: false,
      outCoinError: "",
      withVisible: false,
      isCur: 1,
      isLogin: false,
      tabList: [],
      withOpt: {
        OutType: "bank",
        phone: "",
        account: "",
        ifsc: "",
        outCoin: ""
      },
      uname: "",
      rcode: "",
      money: "",
      loadState: false //接口请求状态
    };
  },
  components: {},
  created() {
    // console.log("created");
    this.rcode = localStorage.getItem("rcode");
    this.tabList = this.$t("userInfo.tabList");
  },
  mounted() {
    console.log("update_mounted");
    this.loadData();
    this.getCurrency();
    this.checkLogin(); //本地状态判断是否登录
  },
  computed: {
    showType() {
      var opt = this.withOpt;
      if (opt.OutType == "bank") {
        opt.phone = "";
        return true;
      } else {
        opt.ifsc = "";
        opt.account = "";
        return false;
      }
    }
  },
  methods: {
    // 货币比率
    getCurrency() {
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
    selLang(lang) {
      if (lang) {
        this.$i18n.locale = lang;
        this.$util.Toast("tips.lang");
      }
      this.popupVisible = false;
      // this.$bus.$emit("isLangBox", false);
    },
    changeLang() {
      this.popupVisible = true;
      // this.$bus.$emit("isLangBox", true);
    },
    showWithdrawBox() {
      if (this.isLogin) {
        this.withVisible = true;
        console.log("已登录");
      } else {
        this.withVisible = false;
        console.log("未登录");
      }
    },
    //提交表单
    postBtn() {
      var msg = "";
      if (this.isComplete) {
        this.msg = this.$t("login.tips.wait");
        return;
      }
      var param = this.withOpt;
      console.log(param.money);
      if (!param.outCoin) {
        this.msg = this.$t("paidRecord.tips.money");
        this.outCoinError = "error";
        return;
      }
      this.outCoinError = "";
      if (param.OutType == "wallet") {
        if (!param.phone) {
          this.msg = this.$t("paidRecord.tips.phone");
          return;
        }
      } else if (param.OutType == "bank") {
        if (!param.ifsc || !param.account) {
          this.msg = this.$t("paidRecord.tips.empty");
          return;
        }
      } else {
      }
      this.msg = "";
      this.getMoney(param);
    },
    // 提现
    getMoney(d) {
      if (d) {
        this.isComplete = true;
        this.$api
          .postDataN("withdraw.payOut", Qs.stringify(d))
          .then(res => {
            this.isComplete = false;
            if (res.code == 1) {
              this.withVisible = false;
              this.$util.Toast(this.$t("paidRecord.response")[res.code]);
            } else if (res.code == 2 || res.code == 3) {
              console.log("提示框");
              this.$util.Toast(this.$t("paidRecord.response")[res.code]);
            } else {
              this.$util.Toast(this.$t("paidRecord.response")["err"]);
            }
          })
          .catch(err => {
            this.$util.Toast(this.$t("paidRecord.response")["err"]);
            this.isComplete = false;
          });
      }
    },
    reBack() {
      this.$router.go(-1);
    },
    logOut() {
      this.$api
        .getDataN("logout")
        .then(res => {
          if (res.code == 1) {
            this.isLogin = false;
            this.$util.clearItem();
            this.$router.go(0);
          }
          // this.$toast("退出成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkLogin() {
      this.isLogin = false;
      if (localStorage.getItem("isLogin")) {
        console.log("已登录");
        this.isLogin = true;
      } else {
        console.log("未登录");
        // localStorage.setItem("loginUrl", this.$route.fullPath);
      }
    },
    recharge() {
      // this.$router.push({ name: "recharge" });
      this.$router.push({ name: this.$config.Router.charging });
    },
    loadData() {
      this.$api
        .getDataN("hasMoney")
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            var data = res.data;
            data.upass = "";
            localStorage.setItem("money", data.money);
            localStorage.setItem("uname", data.uname || data.unick);
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            this.money = data.money;
            this.uname = data.uname || data.unick;
          } else if (res.code == 401) {
            //服务器登录状态是否过期
            this.isLogin = false;
            // localStorage.setItem("loginUrl", this.$route.fullPath);
            this.$util.clearItem();
          }
        })
        .catch(err => {
          this.isLogin = false;
          this.$util.clearItem();
        });
    }
  }
};
</script>

<style>
.login_name {
  color: #333;
  font-weight: bold;
  font-size: 28px;
  padding-left: 15px;
  width: 80%;
  overflow: hidden;
  display: -webkit-box;
  /* ! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 2;
  word-break: break-all;
}
</style>

<style lang="stylus" scoped>
// custom
.prompt_txt
  padding-top 20px
  font-size 30px
  text-align center
  color #eb2727
.rateTxt
  font-size 35px
  text-align center
.cus_popup
  width 100%
  padding 25px
  & >>> .mint-radiolist
    &>.mint-radiolist-title
      display none
    display flex
    & .mint-cell-wrapper
      padding 0
    & .mint-radiolist-label
      padding 0

.back
  position relative
  left 0
  top 0
pad()
  padding 50px
.label_box
  position absolute
  bottom 0
  background #fff
  padding 12px
  font-size 0
  text-align center
  a
    padding 0 15px
    display inline-block
    font-size 28px
.loginTxt
  text-align center
  padding-top 10px
  font-size 30px
.userList
  position absolute
  background #f9f9f9
  top 0
  left 0
  right 0
  bottom 0
.balance
  display inline-block
  font-size 35px
  color #333
  padding 15px 25px
.infoBtn
  font-size 35px
  margin 0 auto
  display block
  width 320px
.logOut
  font-size 35px
  cursor pointer
  background #ef6a6a
  color #fff
  position fixed
  bottom calc(110px + 30px)
  height 80px
  line-height 80px
  width 100%
  text-align center
.info_bg
  padding 5% 40px 2%
  background #fff
  .info_box
    display flex
    flex-direction column
    justify-content center
    .info_img
      display flex
      align-items center
      margin-bottom 30px
      width 100%
      img
        width 20%
        height 100%
        border-radius 50%
    .infoTop
      font-size 30px
      display flex
      align-items center
      span
        font-size 35px
        display inline-block
        color #343434
        flex 1
.infoList
  //pad()
  padding-top 30px
  //padding-bottom calc(220px + 30px) //110+30+80
  padding-bottom calc(220px) //110+30+80
  //padding-bottom calc(130px + 30px) //110+30+80
  .icon_info
    background #fff
    box-shadow 0 0 5px #ddd
    padding 0 30px
    .icon_item
      padding 35px 15px 35px 100px
      color #333
      font-size 40px
      position relative
      border-bottom 1px solid #EDEDED
      &.disabled
        opacity .5
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
      &:not(.disabled):after
        content ''
        width 40px
        height 40px
        display inline-block
        position absolute
        top 50%
        right 0
        margin-top -20px
        margin-left 20px
        background url('~x/image/icon/arrow_right.png')
        background-size 100%
      &.profile:before
        background url('~x/image/icon/profile.png')
        background-size 100%
      &.recharge:before
        background url('~x/image/icon/recharge.png')
        background-size 100%
      &.withdraw:before
        background url('~x/image/icon/withdraw.png')
        background-size 100%
      &.withdraw_record:before
        background url('~x/image/icon/withdraw_record.png')
        background-size 100%
      &.feedback:before
        background url('~x/image/icon/feedback.png')
        background-size 100%
      &:last-child
        border-bottom 0 none
</style>
