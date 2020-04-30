<template>
  <div class="langList" v-show="isLangBox">
    <ul>
      <!-- <li>当前语言:{{locale}}</li> -->
      <li v-for="(item,key,idx) in lang" :key="idx" @click="selLang(key)">{{item}}</li>
    </ul>
  </div>
</template>

<script >
export default {
  data() {
    return {
      lang: {} //语言
      // showBox: false
    };
  },
  props: {
    isLangBox: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.lang = this.$config.lang;
  },
  mounted() {},
  methods: {
    selLang(lang) {
      if (lang) {
        this.$i18n.locale = lang;
        this.$util.Toast("tips.lang");
      }
      this.$bus.$emit("isLangBox", false);
    }
  }
};
</script>

<style lang="stylus" scoped>
.langList
  position fixed
  top 100px
  z-index 100
  width 100%
  background #fff
  font-size 28px
  padding 0 10px
  border-bottom 5px solid #ff8300
  li
    padding 25px 10px
    color #555
    border-top 1px solid #ddd
    &:first-child
      border-top 0 none
</style>