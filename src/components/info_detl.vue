<template>
  <div class="userList">
    <!-- <div class="avatar">
      <img src="/static/img/icon_new/iAccount.png" />
    </div> -->
    <div class="infoDetl">
      <div class="label_form avatar">
        <label class="label_txt">{{ $t("infoDetl.avatar") }}</label>
        <div class="label_item">
          <img :src="require('x/image/def_avatar.png')" />
        </div>
      </div>
      <div class="label_form">
        <label class="label_txt">{{ $t("infoDetl.uname") }}</label>
        <div class="label_item">{{ userInfo.uname || userInfo.unick }}</div>
        <!-- <div class="label_item">{{ userInfo.uname }}</div> -->
      </div>
      <div class="label_form">
        <label class="label_txt">{{ $t("infoDetl.balance") }}</label>
        <div class="label_item">
          {{ userInfo.money }} {{ $t("common.priceUnit") }}
        </div>
      </div>
      <div class="label_form">
        <label class="label_txt">{{ $t("infoDetl.code") }}</label>
        <div class="label_item">{{ userInfo.ucode }}</div>
      </div>
      <div class="label_form">
        <label class="label_txt">{{ $t("infoDetl.mail") }}</label>
        <div class="label_item">{{ userInfo.mail }}</div>
      </div>
      <div class="label_form">
        <label class="label_txt">{{ $t("infoDetl.phone") }}</label>
        <div class="label_item">{{ userInfo.ph }}</div>
      </div>
      <div class="label_form">
        <label class="label_txt">{{ $t("infoDetl.gender") }}</label>
        <div class="label_item">
          {{ $t("infoDetl.genderType")[userInfo.sex] }}
        </div>
      </div>
    </div>
    <div class="infoDetl">
      <div class="label_form">
        <label class="label_txt">{{ $t("infoDetl.func.autoBuy") }}</label>
        <div class="label_item">
          <mt-switch v-model="value" @change="switchBtn"></mt-switch>
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
      value: false,
      isLogin: false,
      userInfo: {}
    };
  },
  components: {},
  created() {
    this.value = localStorage.getItem("autoBuy") ? true : false;
  },
  mounted() {
    console.log("update_mounted");
    this.checkLogin(); //本地状态判断是否登录
  },
  computed: {},
  methods: {
    switchBtn(v) {
      if (v) {
        localStorage.removeItem("autoBuy");
      } else {
        localStorage.setItem("autoBuy", 1);
      }
    },
    reBack() {
      this.$router.go(-1);
    },
    checkLogin() {
      this.isLogin = false;
      if (localStorage.getItem("isLogin")) {
        console.log("已登录");
        this.isLogin = true;
        var userInfo = localStorage.getItem("userInfo");
        this.userInfo = userInfo ? JSON.parse(userInfo) : "";
      } else {
        console.log("未登录");
        this.$router.push({ name: $config.Router.login });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.userList
  //height calc(100vh - 100px)
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  margin-top 110px
  background #f7f7f7
.avatar
  background #fff
  display block
  text-align center
  padding 50px 0
  img
    width 150px
.infoDetl
  margin-top 20px
.label_form
  background #fff
  display flex
  align-items center
  font-size 35px
  padding 25px
  border-top 2px solid #f7f7f7
  .label_txt
    color #333
    text-align left
    width 30%
  .label_item
    color #ccc
    width 70%
    display flex
    justify-content flex-end
    align-items center
</style>
