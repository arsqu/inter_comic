<template>
  <div class="top_fixed">
    <div
      :class="[
        isMain ? 'def_bar' : 'bg',
        { zIndex },
        'top_bar',
        $route.name == 'about' ? 'black' : ''
      ]"
    >
      <div class="top_logo">
        <!-- <span class="icon_logo" v-show="loader">Mangaline</span> -->
        <span class="icon_logo" v-if="$route.name == 'main'">
          <template v-if="$project.share">
            <img class="logo" :src="iconFile + '/logo.png'" />
          </template>
          <!-- <span v-else>{{siteName}}</span> -->
          <img class="logo" :src="require('x/image/logo/logo_1.png')" />
        </span>
        <div class="top_detl_txt" v-else>
          <span class="icon_back" @click="reBack"></span>
          <!-- 默认标题为路由title,需要自定义的标题不设路由title -->
          <span class="comicTxt over_ellipsis">{{
            $route.meta.title || customTxt
          }}</span>
        </div>
      </div>
      <!-- <div class="top_tools">
        <router-link :to="{ name: 'search' }">
          <img :src="iconFile + '/search_bg.png'" alt="userInfo" />
        </router-link>
      </div> -->
      <div class="top_tools">
        <!-- <span v-show="showHome" @click="selLanguage">
          <img :src="iconFile + '/language_bg.png'" alt="language" />
        </span> -->
        <div v-if="isMain">
          <router-link :to="{ name: 'ranking' }" :tag="'span'">
            <img :src="require('x/image/icon/rank.png')" />
          </router-link>
          <router-link :to="{ name: 'new_week' }" :tag="'span'">
            <img :src="require('x/image/icon/update.png')" />
          </router-link>
          <router-link :to="{ name: 'new_infos' }">
            <img :src="require('x/image/icon/account_active.png')" />
          </router-link>
        </div>
        <!-- ="!isMain" -->
        <div v-else>
          <router-link :to="{ name: 'main' }" v-show="!isMain">
            <img :src="require('x/image/icon/home_view.png')" alt="home" />
          </router-link>
        </div>
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
    isMain: Boolean,
    zIndex: Boolean,
    customTxt: String
  },
  created() {},
  mounted() {
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
.black
  background #363839
/*页头*/
.logo
  width 90px
  height 90px
.top_fixed
  height 110px
.top_bar
  height 110px
  position fixed
  z-index 20
  top 0
  left 0
  right 0
  width 100%
  font-size 30px
  padding 0 25px
  display flex
  align-items center
  &.zIndex
    z-index 101
  .top_logo, .top_detl_txt
    font-weight bold
    font-size 48px
  .top_logo
    flex 1
    width 100%
    overflow hidden
    .icon_logo
      padding-left 40px
    .top_detl_txt
      color #fff
      padding-left 10px
      display flex
      text-align center
      align-items center
      .comicTxt
        // width 85%
        width 100%
        vertical-align middle
        display inline-block
  .top_tools
    display flex
    position relative
    a, span
      margin 0 15px
      width 56px
      height 56px
      vertical-align middle
      display inline-block
    img
      width 100%
      height 100%
.icon_back
  color #fff
  border-color #fff
//背景色
.top_bar.bg .top_logo
  .top_detl_txt
    color #fff
  .comicTxt
    font-weight normal
</style>
