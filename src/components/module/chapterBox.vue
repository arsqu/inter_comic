<template>
  <!-- 弹出框 -->
  <div v-show="isRecharge" :class="['recharge',isRecharge?'show':'']">
    <img class="close" @click="closeModal" src="/static/img/icon/win-cross.png" />
    <div class="rechargeDetl">
      <div>
        <span>
          {{$t('column.chapter')}} {{chapterInfo.orderNo}} &lt;{{chapterInfo.title}}&gt;
          <template
            v-show="!isLogin"
          >
            <br />
            <span class="pay_tip">{{$t('detl.payRead')}}</span>
          </template>
        </span>
      </div>
      <div class="pay_money">
        {{$t('detl.chapterPrice')}}
        <span>{{chapterInfo.price}}{{$t('detl.coins')}}</span>
      </div>
      <!-- account balance -->
      <div class="has_money" v-show="isLogin">({{$t('detl.hasMoney')}}:{{hasMoney}})</div>
      <div class="pay_txt" v-show="!isLogin">{{$t('detl.loginRead')}}</div>
      <div class="login_btn" @click="btnFunc">{{btnTxt[chapterInfo.txtIdx]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chapterInfo: Object,
    isRecharge: Boolean,
    isLogin: Boolean,
    hasMoney: Number
  },
  data() {
    return {
      btnTxt: []
    };
  },
  created() {
    this.btnTxt = this.$t("detl.btnTxt");
    this.init();
    // console.log(this.chapterInfo);
  },
  activated() {
    console.log("activated");
  },
  methods: {
    init() {},
    btnFunc() {
      this.$emit("btnFunc", 1);
    },
    closeModal() {
      this.$emit("closeModal", 1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.recharge 
  background #fff
  z-index 200
  position fixed
  bottom -100%
  width 100%
  transition all 0.4s ease
  &.show 
    bottom 0
  & > .close 
    width 30px
    height 30px
    position absolute
    right 15px
    top 15px
    cursor pointer
  .rechargeDetl 
    font-size 16px
    text-align center
    padding-top 60px
    .pay_tip 
      color #ec6029
    & > div 
      &:first-child
        color #252525
        font-size 33px
    .pay_money 
      color #333
      font-size 30px
      padding-top 35px
      & > span 
        font-size 40px
        color #fd5c63
    .has_money 
      font-size 26px
      padding-top 20px
      color #666
    .pay_txt 
      color #888
      font-size 30px
      padding 50px 0
    .login_btn 
      height 100px
      line-height 100px
      font-size 30px
      background #fd5c63
      color #fff
      margin-top 40px

</style>