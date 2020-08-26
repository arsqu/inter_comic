<template>
  <!-- 弹出框 -->
  <div :class="['recharge', isRecharge ? 'show' : '']">
    <!-- <mt-popup v-model="isRecharge" position="bottom" class="recharge cus_popup"> -->
    <img
      class="close"
      @click="closeModal"
      :src="require('x/image/icon/close.png')"
    />
    <div class="rechargeDetl">
      <div>
        <span>
          {{ $t("column.chapter") }} {{ chapterInfo.orderNo }} &lt;{{
            chapterInfo.title
          }}&gt;
          <template v-show="!isLogin">
            <br />
            <span class="pay_tip link_span">{{ $t("detl.payRead") }}</span>
          </template>
        </span>
      </div>
      <div class="pay_money">
        {{ $t("detl.chapterPrice") }}
        <span class="link_span"
          >{{ chapterInfo.price }}{{ $t("common.priceUnit") }}</span
        >
      </div>
      <!-- account balance -->
      <div class="has_money" v-show="isLogin">
        ({{ $t("detl.hasMoney") }}:{{ hasMoney }})
      </div>
      <div class="pay_txt" v-show="!isLogin">{{ $t("detl.loginRead") }}</div>
      <div>
        <mt-checklist
          v-model="checkList"
          :options="[$t('pay.autoBuy')]"
          @change="checkChange"
        ></mt-checklist>
      </div>
      <div class="login_btn btn_def" @click="btnFunc">
        {{ btnTxt[chapterInfo.txtIdx] }}
      </div>
    </div>
    <!-- </mt-popup> -->
  </div>
</template>

<script>
export default {
  props: {
    checkList: Array,
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
    // console.log(this.chapterInfo);
  },
  activated() {
    console.log("activated");
  },
  methods: {
    btnFunc() {
      this.$emit("btnFunc", 1);
    },
    checkChange(val) {
      this.$emit("checkChange", val);
    },
    closeModal() {
      this.$emit("closeModal", 1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.cus_popup
  width 100%
.recharge
  & >>> .mint-checklist-title
    margin 0
  background #fff
  z-index -1
  position fixed
  width 100%
  height auto
  bottom -100%
  //width 0
  transform translate3d(0, 100%, 0)
  transition all .5s ease
  &.show
    transform translate3d(0, 0, 0)
    height auto
    z-index 10000
    bottom 0
    // position fixed
    // width 100%
  & > .close
    width 45px
    height 45px
    position absolute
    right 15px
    top 15px
    cursor pointer
  .rechargeDetl
    font-size 16px
    text-align center
    padding-top 60px
    .pay_tip
      // color #fd5c63
      margin-top 10px
      display inline-block
    & > div
      &:first-child
        color #252525
        font-size 33px
    .pay_money
      color #333
      font-size 30px
      padding-top 15px
      & > span
        font-size 40px
        // color #fd5c63
    .has_money
      font-size 28px
      padding-top 20px
      color #666
    .pay_txt
      color #888
      font-size 30px
      padding 20px 0
    .login_btn
      height 100px
      line-height 100px
      font-size 30px
      // background #fd5c63
      // color #fff
      margin-top 40px
</style>
