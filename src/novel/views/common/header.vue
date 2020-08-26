<template>
  <!-- 页头 -->
  <div class="top_fixed">
    <!-- def_bar -->
    <div
      :class="[
        isMain ? 'bg' : 'bg',
        { zIndex },
        'top_bar',
        $route.name == 'about' ? 'black' : ''
      ]"
    >
      <div class="top_logo">
        <div class="icon_logo" v-if="$route.name == 'main'">
          <template v-if="$project.share">
            <img class="logo" :src="iconFile + '/logo.png'" />
          </template>
          <span v-else>{{ siteName }}</span>
          <div class="s_group" @keyup.13="searchVal">
            <div class="s_inp">
              <input
                class="s_key"
                type="search"
                maxlength="45"
                :placeholder="$t('search.txt')"
                v-model="val"
              />
            </div>
          </div>
        </div>
        <div class="top_detl_txt" v-else>
          <span class="icon_back" @click="reBack"></span>
          <span class="comicTxt over_ellipsis">{{
            $route.meta.title || customTxt
          }}</span>
          <!-- <span class="comicTxt over_ellipsis">{{ comicTxt }}</span> -->
        </div>
      </div>
      <div class="top_tools">
        <div v-show="$route.name == 'new_infos'">
          <a href="javascript:;" @click="changeLang"
            ><img :src="require('x/image/icon/language.png')"
          /></a>
        </div>
        <div v-if="isMain">
          <router-link :to="{ name: 'new_infos' }">
            <img :src="require('x/image/icon/account_bg.png')" />
          </router-link>
        </div>
        <div v-else>
          <router-link :to="{ name: 'main' }" v-show="!isMain">
            <img :src="require('x/image/icon/home_view.png')" alt="home" />
          </router-link>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      siteName: "",
      popupVisible: false,
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
    //搜索数据
    searchVal() {
      var val = this.val;
      if (val) {
        this.$router.push({ name: "search", params: { key: val } });
      }
      console.log(val);
    },
    changeLang() {
      this.popupVisible = true;
      // this.$bus.$emit("isLangBox", true);
    },
    selLang(lang) {
      if (lang) {
        this.$i18n.locale = lang;
        this.$util.Toast("tips.lang");
      }
      this.popupVisible = false;
      // this.$bus.$emit("isLangBox", false);
    },
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
.cus_popup
  width 100%
.langList
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
.black
  background #363839
/*页头*/
.logo
  width 45px
  height 45px
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
  &.bg span
    color #fff
  &.zIndex
    z-index 101
  .top_logo, .top_detl_txt
    font-weight bold
    font-size 48px
  .top_logo
    width 100%
    flex 1
    overflow hidden
    .icon_logo
      display flex
      align-items: center;
      justify-content: space-around;
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
// 搜索
.s_group
  display flex
  align-items center
  display inline-block
  position relative
  justify-content center
  margin-left 20px
  z-index 10
  .s_inp
    border-radius 30px
    height 60px
    flex 1
    line-height 60px
    background #fff
    width 100%
    padding-left 65px
    color #666
    .s_key
      border 0 none
      outline 0 none
      height 100%
      width 100%
      vertical-align top
      background transparent
   &:before
    content ''
    display inline-block
    width 45px
    height 45px
    background url('~x/image/icon/search.png')no-repeat
    background-size contain
    position absolute
    left 15px
    top 50%
    margin-top -22.5px
  .s_txt
    font-size 30px
    height 70px
    // color #666
    line-height 70px
    text-align center
    padding 0 10px
    border-radius 0 30px 30px 0
</style>
