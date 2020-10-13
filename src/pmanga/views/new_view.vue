<template>
  <div class="viewLayout">
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
              <!-- <img src="/static/img/icon_new/prev.png" alt="prev" /> -->
              <img :src="require('x/image/icon/prev.png')" alt="prev" />
            </span>
            <span class="chapter over_ellipsis">{{ chapter }}</span>
            <span class="calc_chapter"
              >{{ nowChapter }} / {{ imgList.length }}</span
            >
          </div>
        </div>
        <div class="top_tools">
          <router-link :to="{ name: 'main' }">
            <img :src="require('x/image/icon/home_view.png')" />
          </router-link>
        </div>
      </div>
      <div :class="['imgBox', translate ? 'offset' : '']">
        <div class="img_item" v-for="(item, idx) in imgList" :key="idx">
          <img v-lazy="item + '?' + autoImg" :key="item" />
        </div>
      </div>
    </div>
    <div class="bottom_bar">
      <div class="top_tools">
        <a href="javascript:;" @click="viewPrev">
          <img :src="require('x/image/icon/prev.png')" alt="prev" />
        </a>
        <a href="javascript:;" @click="toDetl">
          <img :src="require('x/image/icon/list.png')" alt="home" />
        </a>
        <a href="javascript:;" @click="viewNext">
          <img :src="require('x/image/icon/next.png')" alt="next" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowChapter: 1,
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
    this.price = localStorage.getItem("price") || "";
    window.addEventListener("scroll", this.showChapterIdx);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.showChapterIdx);
  },
  methods: {
    // 当前浏览下标
    showChapterIdx() {
      var sH = document.documentElement.clientHeight,
        sT = document.documentElement.scrollTop || document.body.scrollTop;
      var box = document.querySelector(".imgBox").children;
      box = Array.prototype.slice.call(box);
      box.forEach((res, idx) => {
        // 当前图片和顶部的距离 < 已滚动距离 + 可视区 - 可视区一半
        if (res.offsetTop < sH + sT - sH / 2) {
          if (
            res.children &&
            res.children.length > 0 &&
            res.children[0].getAttribute("lazy") == "loaded"
          ) {
            this.nowChapter = idx + 1;
          }
        }
      });
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
            var imgList = data.content.split(",");
            this.$set(this, "imgList", imgList);
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
          // this.getBookDetl();
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
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
  padding 20px 35px
trans()
  transition all .3s ease

.calc_chapter
  color #fff
  padding-left 50px
.viewLayout
  font-family microsoft yahei,'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
  overflow hidden
  .chapterBox
    position fixed
    width 60%
    height 100%
    transform: translate3d(0%, 0, 0);
    padding-bottom 180px
    overflow-y scroll
    transition all .3s ease
    opacity 1
    ul
      font-size 30px
      padding-left 15px
      // text-align center
      li
        padding 25px
        color #333
        font-weight normal
        background #fff
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
    transform: translate3d(-100%, 0, 0);
    overflow hidden
    opacity 0
.offset
  position fixed!important
  transform translate3d(60%, 0, 0)
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
  // color #999
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
  position relative
  padding-bottom 90px
  box-shadow 0 0 10px 10px rgba(0, 0, 0, .3)
  trans()
.img_item
  cursor pointer
  text-align center
  img
    //width auto
    width 100%
  img[lazy='loading']
    width 100%
    // background url('/static/img/loading_bicyle.gif') no-repeat center
    background url('~x/image/loading_plane.gif') no-repeat center
    background-size 6rem
  img[lazy='error']
    width 100%
    background url('/static/img/loading_plane.gif') no-repeat center
    background-size 6rem
.img_item img[lazy='loading'], .img_item img[lazy='error']
  opacity 1
  height 300px
</style>
