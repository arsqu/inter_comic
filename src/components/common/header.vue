<template>
  <!-- 页头 -->
  <div class="top_fixed">
    <div :class="[{zIndex},showBgIcon?'bg':'','top_bar']">
      <div class="top_logo">
        <!-- {{siteName}} -->
        <!-- <span class="icon_logo" v-show="loader">Mangaline</span> -->
        <span class="icon_logo" v-show="loader">
          <!-- <template v-if="$config.share"> -->
          <template v-if="$project.share">
            <img class="logo" :src="iconFile + '/logo.png'" />
          </template>
          <span v-else>{{siteName}}</span>
        </span>
        <div class="top_detl_txt" v-show="!loader">
          <span class="icon_back" @click="reBack"></span>
          <span class="comicTxt over_ellipsis">{{comicTxt}}</span>
        </div>
      </div>
      <div class="top_tools">
        <span v-show="showHome" @click="selLanguage">
          <img :src="iconFile+'/language.png'" alt="language" />
        </span>
        <router-link :to="{name:'search'}" v-show="$route.name!='search'">
          <img v-show="!showBgIcon" :src="iconFile+'/search.png'" alt="search" />
          <img v-show="showBgIcon" :src="iconFile+'/search_bg.png'" alt="search" />
        </router-link>
        <router-link :to="{name:'main'}" v-show="!showHome">
          <img v-show="!showBgIcon" :src="iconFile+'/home.png'" alt="home" />
          <img v-show="showBgIcon" :src="iconFile+'/home_bg.png'" alt="home" />
        </router-link>
        <!-- <router-link :to="{name:'new_info'}" v-show="showHome"> -->
        <router-link :to="{name:'new_infos'}" v-show="showHome">
          <img :src="iconFile+'/user.png'" alt="userInfo" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      siteName: "",
      iconFile: "/static/img/icon_new"
    };
  },
  props: {
    loader: Boolean,
    zIndex: Boolean,
    showBgIcon: Boolean,
    showHome: Boolean,
    comicTxt: String
  },
  created() {},
  mounted() {
    // var output = process.env.OUT_PUT;
    // var config = this.$config;
    // var siteName = config.siteDetl.siteName;
    // this.siteName = siteName || output;
    this.siteName = this.$project.siteName;
  },
  methods: {
    reBack() {
      this.$router.go(-1);
    },
    //切换语言
    selLanguage() {
      console.log("selLanguage");
      this.$bus.$emit("isLangBox", true);
    }
  }
};
</script>

<style lang="stylus" scoped>
/*页头*/
.logo
  width 45px
  height 45px
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
  &.zIndex
    z-index 101
  .top_logo, .top_detl_txt
    font-weight bold
    font-size 38px
  .top_logo
    width 90%
    overflow hidden
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
//背景色
.top_bar.bg .top_logo
  .top_detl_txt
    color #fff
  .comicTxt
    font-weight normal
  .icon_back
    border-color #fff !important
</style>


