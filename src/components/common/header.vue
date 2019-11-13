<template>
  <!-- 页头 -->
  <div class="top_fixed">
    <div class="top_bar">
      <div class="top_title">
        <div class="top_logo">
          <div>
            <span class="icon_logo" v-show="loader">Mangaline</span>
          </div>
          <div class="top_detl_txt" v-show="!loader">
            <span class="icon_back" @click="reBack"></span>
            <span class="comicTxt over_ellipsis">{{comicTxt}}</span>
          </div>
        </div>
      </div>
      <div class="top_tools">
        <span v-show="showHome" @click="changeWords">
          <img src="/static/img/icon_new/language.png" alt="language" />
        </span>
        <router-link :to="{name:'search'}" v-show="$route.name!='search'">
          <img src="/static/img/icon_new/search.png" alt="search" />
        </router-link>
        <router-link :to="{name:'main'}" v-show="!showHome">
          <img src="/static/img/icon_new/home.png" alt="home" />
        </router-link>
        <router-link :to="{name:'userInfo'}" v-show="showHome">
          <img src="/static/img/icon_new/user.png" alt="userInfo" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    loader: Boolean,
    showHome: Boolean,
    comicTxt: String
  },
  created() {},
  methods: {
    reBack() {
      this.$router.go(-1);
    },
    //切换语言
    changeWords() {
      this.$bus.$emit("isLanguage", 1);
    }
  }
};
</script>

<style lang="stylus" scoped>
/* 页头 */
.top_fixed
  height 100px
.top_bar
  height 100px
  position fixed
  z-index 20
  top 0
  left 0
  right 0
  width 100%
  background #fff
  font-size 30px
  padding 0 25px
  display flex
  align-items center
  .top_title
    width 90%
    overflow hidden
    .top_logo, .top_detl_txt
      font-weight bold
      font-size 38px
      font-family 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
    .top_logo
      color orange
      .icon_logo
        padding-left 40px
      .top_detl_txt
        color #555
        padding-left 10px
        display flex
        align-items center
        .comicTxt
          width 85%
          vertical-align middle
          display inline-block
        .icon_back
          z-index 100
          border-top 4px solid transparent
          border-right 4px solid transparent
          border-color orange
          height 30px
          width 30px
          vertical-align middle
          transform rotate(-135deg)
          display inline-block
  .top_tools
    display flex
    position relative
    a, span
      margin 0 15px
      width 45px
      height 45px
      display inline-block
    img
      width 100%
      height 100%
</style>


