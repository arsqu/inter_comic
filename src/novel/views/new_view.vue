<template>
  <div :class="['viewLayout', { black: isDark, [bgColor]: bgColor }]">
    <!-- 工具栏头 -->
    <div class="translateBox">
      <div class="totalNum">Total {{ chapterList.length }} chapters</div>
      <div :class="['chapterBox', !translate ? 'offsetL' : '']">
        <ul class>
          <li
            v-for="(item, idx) in chapterList"
            :key="idx"
            @click="viewDetl(item, idx)"
            :class="{ active: currentIdx == idx }"
          >
            <span :class="{ payItem: item.is_free }">{{
              $t("column.chapter") + " " + item.order_no
            }}</span>
            <span v-if="item.is_free" class="lock"
              >{{ price }}{{ $t("common.priceUnit") }}</span
            >
          </li>
        </ul>
      </div>
      <div :class="['top_bar bg', translate ? 'offset' : '']">
        <div class="top_title">
          <div class="top_detl_txt">
            <span class="top_icon" @click="reBack">
              <img :src="require('x/image/icon/prev.png')" alt="prev" />
            </span>
            <span class="chapter over_ellipsis">{{ chapter }}</span>
            <span class="calc_chapter"
              >{{ currentIdx + 1 }} / {{ chapterList.length }}</span
            >
          </div>
        </div>
        <div class="top_tools">
          <router-link :to="{ name: 'main' }">
            <img :src="require('x/image/icon/home_view.png')" alt="" />
          </router-link>
        </div>
      </div>
      <div
        :class="['imgBox', translate ? 'offset' : '']"
        :style="{ fontSize: showFont + 'px' }"
      >
        <div class="img_text">{{ content }}</div>
      </div>
      <!-- 目录章节 -->
      <a href="javascript:;" class="viewChapter" @click="toDetl">
        <img :src="require('x/image/icon/list.png')" alt="home" />
      </a>
    </div>
    <div class="bottom_bar">
      <div class="top_tools">
        <a href="javascript:;" @click="viewPrev">
          <img :src="require('x/image/icon/prev.png')" alt="" />
        </a>
        <a href="javascript:;" class="fontBox">
          <!-- :modal="false" -->
          <mt-popup
            class="cs_popup"
            v-model="popupVisible"
            popup-transition="popup-fade"
          >
            <img
              @click="changeFont(0)"
              :src="require('x/image/icon/font_down.png')"
              alt=""
            />
            <img
              @click="changeFont(1)"
              :src="require('x/image/icon/font_up.png')"
              alt=""
            />
          </mt-popup>
          <img
            @click="switchFont"
            :src="require('x/image/icon/font_size.png')"
            alt="prev"
          />
        </a>
        <a href="javascript:;" @click="switchMode" v-show="!isDark">
          <img :src="require('x/image/icon/daytime.png')" />
        </a>
        <a href="javascript:;" @click="switchMode" v-show="isDark">
          <img :src="require('x/image/icon/night.png')" />
        </a>
        <a href="javascript:;" class="switchBox">
          <mt-popup
            class="cs_popup"
            v-model="switchPopup"
            popup-transition="popup-fade"
          >
            <div class="skinBox">
              <span class="lt_beige" @click="changeBg('beige')"></span>
              <span class="lt_white" @click="changeBg('white')"></span>
              <span class="lt_blue" @click="changeBg('blue')"></span>
              <span class="lt_green" @click="changeBg('green')"></span>
            </div>
          </mt-popup>
          <img :src="require('x/image/icon/picture.png')" @click="switchBg" />
        </a>
        <a href="javascript:;" @click="viewNext">
          <img :src="require('x/image/icon/next.png')" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      box: null, // 文本容器
      originFont: 16, // 文本初始大小
      maxFont: 24, //  文本最大像素
      showFont: null, // 文本显示的大小
      bgColor: "", // 背景色
      isDark: "", // 白天、夜间模式
      switchPopup: false, // popup
      popupVisible: false, // 切换字体popup
      id: null,
      bookId: null,
      autoImg: "",
      body: null,
      translate: false, //chapter列表
      prev: null, //id
      prevIdx: null, //下标
      prevChapter: {}, //上一章
      next: null,
      nextIdx: null,
      nextChapter: {},
      current: null,
      currentIdx: null,
      timer: null,
      content: "",
      price: "", //章节价格
      imgList: [], //漫画列表
      //默认显示500章
      page: {
        offset: 0,
        limit: 500,
        total: 0
      },
      chapterList: [], //所有章节
      chapter: "" // 漫画名
    };
  },
  created() {
    var route = this.$route.params; //路由参数
    this.id = route.id;
    this.autoImg = this.$config.autoImg.chapterView;
    this.body = document.getElementsByTagName("body")[0];
    this.bookId = route.bookId; //漫画id
    this.review();
  },
  mounted() {
    // console.log("view_mounted");
    this.box = document.getElementsByClassName("imgBox")[0];
    this.price = localStorage.getItem("price") || "";
    this.isDark = parseInt(localStorage.getItem("isDark")) || "";
    this.bgColor = localStorage.getItem("bgColor") || "";
    this.showFont = localStorage.getItem("showFont") || null;
  },
  methods: {
    getAttr(el, style) {
      if (!el || typeof el == "string") {
        return;
      }
      return window.getComputedStyle(el)[style];
    },
    // 改变背景色
    changeBg(color) {
      this.bgColor = color;
      this.isDark = null;
      localStorage.setItem("bgColor", color);
      localStorage.removeItem("isDark");
      this.switchPopup = false;
    },
    // 切换背景
    switchBg() {
      this.switchPopup = !this.switchPopup;
    },
    // 调整字体大小
    switchFont() {
      this.popupVisible = !this.popupVisible;
    },
    // 切换模式
    switchMode() {
      console.log("黑底白底背景");
      this.isDark = !this.isDark;
      this.bgColor = null;
      localStorage.removeItem("bgColor");
      localStorage.setItem("isDark", this.isDark ? 1 : 0);
    },
    // 改变字体
    changeFont(control) {
      var base,
        box = this.box;
      base = control ? 2 : -2;
      var px = parseFloat(this.getAttr(box, "fontSize")) + base;
      px =
        px > this.maxFont
          ? (this.$util.Toast(this.$t("view.tips.maxFont")), this.maxFont)
          : px < this.originFont
          ? (this.$util.Toast(this.$t("view.tips.minFont")), this.originFont)
          : px;
      box.style.fontSize = px + "px";
      localStorage.setItem("showFont", px);
    },
    //选择章节
    viewDetl(item, idx) {
      //付费
      if (item.is_free) {
        this.$util.Toast("view.tips.pay");
        this.showBox(item, idx);
        return;
      }
      this.translate = false;
      this.$router.push({
        name: "new_view",
        params: { id: item.id, bookId: this.bookId }
      });
    },
    review() {
      this.getBookDetl();
      var route = this.$route.params,
        local = localStorage,
        bookId = local.getItem("bookId"); //章节已缓存的漫画Id
      //漫画不同时更新章节
      if (this.bookId != bookId) {
        this.getAllChapter(); //复制链接访问时刷新,防止读缓存
      } else {
        var chapterList = local.getItem("cache_chapter");
        chapterList =
          typeof chapterList == "string"
            ? JSON.parse(chapterList)
            : chapterList;
        if (chapterList) {
          console.log("刷新chapter");
          this.$set(this, "chapterList", chapterList);
        } else {
          this.chapterList = [];
        }
        this.translate = false;
        console.log(this.translate);
        this.matchChapter();
      }
    },
    //请求所有章节
    getAllChapter() {
      // console.log("当前所有章节");
      var opt = Object.assign({}, this.page);
      var mediaId = (opt.mediaId = this.bookId);
      localStorage.setItem("bookId", this.bookId); //无论是否成功都视为更新漫画
      //漫画章节
      this.$api
        .getData("getAllChapter", opt)
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            var data = res.data,
              list = data.list;
            this.chapterList = [];
            this.$set(this, "chapterList", list);
            localStorage.setItem("cache_chapter", JSON.stringify(list));
            this.matchChapter(); //匹配上下章
          }
        })
        .catch(err => {
          console.log("server error");
        });
    },
    //匹配章节
    matchChapter() {
      var list = this.chapterList;
      for (var i = 0; i < list.length; i++) {
        //匹配相同章节
        if (list[i].id == this.id) {
          if (i - 1 > -1) {
            this.$set(this, "prevChapter", list[i - 1]);
            this.prev = list[i - 1].id;
            this.prevIdx = i - 1;
          }
          if (i + 1 < list.length) {
            this.$set(this, "nextChapter", list[i + 1]);
            this.next = list[i + 1].id;
            this.nextIdx = i + 1;
          }
          this.current = list[i].id;
          this.currentIdx = i;
          console.log(this.prev, this.next);
          break;
        }
      }
    },
    //返回上一层
    reBack() {
      if (this.translate) {
        this.translate = false;
        return;
      }
      // var params = this.$route.params;
      // this.$router.push({
      //   name: "new_detl",
      //   params: { id: params.bookId }
      // });
      this.$router.history.go(-1);
    },
    // 支付
    showBox(opt, idx) {
      console.log(opt, idx);
      this.$bus.$emit("comic", {
        bookId: this.bookId,
        chapterId: opt.id,
        chapterIdx: idx,
        title: opt.title,
        orderNo: opt.order_no,
        price: this.price
      });
      //已登录
      if (localStorage.getItem("isLogin")) {
        this.$bus.$emit("isLogin", 1);
      } else {
        // console.log("isLogin", 0);
        this.$bus.$emit("isLogin", 0);
      }
      var autoBuy = localStorage.getItem("autoBuy") || false;
      //自动购买
      if (autoBuy) {
        this.$bus.$emit("recharge", "autoBuy");
      } else {
        this.$bus.$emit("recharge", 1);
      }
    },
    //查看上一章
    viewPrev() {
      var bookId = this.bookId,
        id = this.id;
      var chapterList = localStorage.getItem("cache_chapter");
      this.chapterList =
        typeof chapterList == "string" ? JSON.parse(chapterList) : chapterList;
      var prevIdx = this.currentIdx - 1,
        prev = this.chapterList[prevIdx];
      if (prevIdx < 0) {
        this.$util.Toast("view.tips.first");
        return;
      }
      if (prev && prev.is_free) {
        this.$util.Toast("view.tips.pay");
        this.showBox(prev, prevIdx);
        return;
      }
      this.$router.push({
        name: "new_view",
        params: { id: prev.id, bookId }
      });
    },
    //查看下一章
    viewNext() {
      var bookId = this.bookId,
        id = this.id;
      var chapterList = localStorage.getItem("cache_chapter");
      this.chapterList =
        typeof chapterList == "string" ? JSON.parse(chapterList) : chapterList;
      var nextIdx = this.currentIdx + 1,
        next = this.chapterList[nextIdx];
      if (nextIdx >= this.chapterList.length) {
        this.$util.Toast("view.tips.last");
        return;
      }
      if (next && next.is_free) {
        this.$util.Toast("view.tips.pay");
        this.showBox(next, nextIdx);
        return;
      }
      this.$router.push({
        name: "new_view",
        params: { id: next.id, bookId }
      });
    },
    //获取漫画图文
    getBookDetl() {
      // console.log(this.id);
      if (this.id) {
        this.$api.getChapter({ id: this.id }).then(res => {
          // console.log(res);
          // console.log(this.prev, this.next);
          if (res.code == 1) {
            var data = res.data.detail;
            this.$set(this, "content", data.content);
            this.chapter = this.$t("column.chapter") + " " + data.order_no;
            // console.log(data);
          }
        });
      }
    },
    //返回章节页
    toDetl() {
      this.translate = !this.translate;
      // var params = this.$route.params;
      // this.$router.push({
      //   name: "new_detl",
      //   params: { id: params.bookId }
      // });
    }
  },
  watch: {
    $route(to, from) {
      var route = this.$route.params; //路由参数
      if (to.name == "new_view") {
        //章节id不同时更新
        if (route.id != this.id) {
          this.id = route.id;
          this.review();
        }
      }
    }
  }
};
</script>

<style scoped>
.imgBox {
  font-size: 16px; /* no */
}
.viewLayout .fontBox >>> .v-modal,
.viewLayout .switchBox >>> .v-modal {
  opacity: 0 !important;
}
</style>

<style lang="stylus" scoped>
.calc_chapter
  color #fff
  padding-left 50px

.translateBox,.imgBox
  background inherit
.viewChapter
  position fixed
  right 0
  line-height 1
  background #555
  border-radius 50% 0 0 50%
  top 50%
  text-align center
  margin-top -20px
  width 64px
  height 64px
  img
    vertical-align middle
    height 60%
    width 60%
.fontBox,.switchBox
  position relative
  .cs_popup
    position: absolute;
    top: -75px;
    transform translate3d(-50%,-50%,0)
    border-radius 15px
    width 200px
    display flex
    padding 0 15px
    box-shadow: 0 0 8px 2px #40A9FF;
    &:before
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border: solid transparent;
      border-width: 15px;
      border-top-color: #fff;
      position: absolute;
      bottom: -28px;
      left 50%;
      margin-left -15px
    img
      padding 20px 15px
      width 85px
.switchBox
  .cs_popup
    top: -90px;
    transform translate3d(-60%,-50%,0)
    width 500px
    &:before
      left 60%
  .skinBox
    padding 10px
    display flex
    justify-content: space-around;
    width: 100%;
    span
      display inline-block
      width 100px
      height 100px
      border 5px solid #fff
      border-radius 5px
      &.lt_beige
        background #E6E0D0
      &.lt_white
        background #F7F6F2
      &.lt_blue
        background #CAE2EF
      &.lt_green
        background #A6BC9C

modal()
  position fixed
  z-index 20
  width 100%
  left 0
  right 0
  // background rgba(11, 11, 11, .85)
  font-size 30px
  padding 0 25px
  align-items center
  display flex
.totalNum
  font-size 30px
  background #f1f1f1
  padding 20px 35px
trans()
  transition all .4s ease
.viewLayout
  font-family microsoft yahei,'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
  overflow hidden
  // background #F7F5F0
  &.beige
    background #e6e0d0
  &.white
    background #f7f6f2
  &.blue
    background #cae2ef
  &.green
    background #a6bc9c
  &.black
    background #010101
    color #555
    .chapterBox li
      background #333
      color #7d7a7a
    .cs_popup
      // background #7f8082
      background #989997
      &:before
        border-top-color #989997

    .chapter
      color #50545b
    .bottom_bar,.top_bar
      background #181914
    .top_tools img,.top_icon img
      opacity .6
  .chapterBox
    position fixed
    // width auto
    width 55%
    transform: translate3d(0%, 0, 0);
    height 100%
    // padding-bottom 180px
    padding-bottom calc(70px + 90px)
    overflow-y scroll
    transition all .4s ease
    opacity 1
    ul
      font-size 30px
      li
        padding 25px
        color #333
        font-weight normal
        background inherit
        &.active:before
          content ''
          width 30px
          height 30px
          vertical-align middle
          padding-right 10px
          display inline-block
          background url('~x/image/icon/location.png')no-repeat
          background-size contain
        span
          vertical-align middle
        .lock
          color #fff
          font-size 28px
          padding 3px 5px
          margin-left 15px
          border-radius 8px
        span.payItem:not(.lock):before
          content ""
          display inline-block
          width 40px
          margin-right 10px
          vertical-align sub
          height 40px
          background url('~x/image/icon/lock.png')no-repeat
          background-size contain
  .offsetL
    // width 0
    left 0
    overflow hidden
    transform: translate3d(-100%, 0, 0);
    opacity 0
.offset
  position fixed!important
  transform translate3d(55%, 0, 0)
.top_bar
  height 95px
  top 0
  modal()
  trans()
.bottom_bar
  height 90px
  bottom 0
  modal()
  .top_tools
    display flex
    flex 1
    justify-content space-around
    height 100%
    align-items center
  a
    justify-content center
.chapter
  font-size 35px
  padding-left 45px
  color #fff
.top_icon
  margin 0 10px
  width 45px
  cursor pointer
  height 45px
  display inline-block
  img
    vertical-align bottom
.top_title
  width 90%
.top_tools
  width 10%
  a
    margin 0 10px
    width 50px
    //height 100%
    display flex
    align-items center
  img
    width 100%
    height 100%
    cursor pointer
.top_logo, .top_detl_txt
  font-weight bold
  font-size 35px
  display flex
  align-items center
.top_logo
  color orange
.top_detl_txt
  color #555
.icon_logo
  padding-left 40px
.icon_back
  z-index 100
  width 60px
  height 60px
  position absolute
  top 50%
  margin-top -30px
  &:after
    border-top 4px solid transparent
    border-right 4px solid transparent
    border-color orange
    position absolute
    height 30px
    width 30px
    margin-top 15px
    content ''
    transform rotate(-135deg)
.comicTxt
  padding-left 55px
  width 90%
  color #999
  font-size 30px
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
  display inline-block
/*漫画容器*/
.imgBox
  padding-top 40px
  padding-bottom 120px
  position relative
  box-shadow 0 0 10px 10px rgba(0, 0, 0, .3)
  trans()
  .img_text
    padding 0 20px
    line-height 1.7
</style>
