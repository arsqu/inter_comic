<template>
  <div class="main_page">
    <!-- 轮播图 -->
    <div class="swiper_box">
      <swiper :loadState="loadState" :bannerList="bannerList" />
    </div>
    <!-- 导航栏 -->
    <div class="navbar">
      <ul class="nav_list">
        <li>
          <router-link :to="{ name: 'ranking' }">
            <span class="nav_icon">
              <img :src="require('x/image/icon/rank.png')" alt="ranking" />
            </span>
            <span class="nav_txt">{{ $t("index.rank") }}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'new_week' }">
            <span class="nav_icon">
              <img :src="require('x/image/icon/update.png')" alt="update" />
            </span>
            <span class="nav_txt">{{ $t("index.update") }}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'paid_book' }">
            <span class="nav_icon">
              <img :src="require('x/image/icon/free.png')" alt="ranking" />
            </span>
            <span class="nav_txt">{{ $t("index.free") }}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'cate_book' }">
            <span class="nav_icon">
              <img :src="require('x/image/icon/category.png')" alt="ranking" />
            </span>
            <span class="nav_txt">{{ $t("index.category") }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 推荐栏 -->
    <div class="push_item">
      <column :autoImg="this.$config.autoImg.column" :bookList="bookList" />
      <loading
        :loadState="loadState"
        :type="'double-bounce'"
        :color="'#26a2ff'"
      ></loading>
    </div>
    <!-- <div class="label_box">
      <router-link :to="{ name: 'guide' }">Terms and Conditions</router-link>
      <router-link :to="{ name: 'policy' }">Privacy Policy</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
      <router-link :to="{ name: 'refund' }"
        >Refund and Cancellation Policy</router-link
      >
    </div> -->
  </div>
</template>

<script>
const swiper = () => import("@/components/module/swiper");
const column = () => import("../components/module/column");
// const column = () => import("@/components/module/column");

export default {
  data() {
    return {
      href: location.href,
      bannerList: [], //广告图
      bookList: [], //首页详情
      loadState: true //滚动加载提示
    };
  },
  created() {},
  mounted() {
    var ch = this.$util.getQueryString("ch");
    if (ch) localStorage.setItem("wap_ch", ch); //渠道号
    this.init(); //初始化
  },
  activated() {
    console.log("缓存触发");
    console.log(this.$route.name);
    this.$bus.$emit("navBar", false);
    this.$bus.$emit("loading", false); //关闭loading加载效果
  },
  methods: {
    init() {
      this.getData(); //首页媒体类目
    },
    //图书数据
    getData() {
      this.$api
        .getData("getBookList")
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            var data = res.data;
            data = data.data ? data.data : data;
            // console.log(data);
            if (data.length > 0) {
              data.map(res => {
                (res.GroupId = res.groupId), (res.GroupName = res.groupName);
                res.List = res.list;
              });
              var list = data[0].List;
              this.bannerList = list.length > 0 ? list : []; //第一条数据为banner
              if (data[1]) {
                var bookList = data.slice(1);
                bookList.map(res => {
                  res.List = res.List.slice(0, 9); //栏目只显示9条数据
                });
                this.bookList = this.exchangeName(bookList);
              }
            }
            this.loadState = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //栏目文字顺序固定
    exchangeName(book) {
      var opt = {
        推荐: "recommend",
        热门: "hot",
        精选: "selected",
        新作: "new",
        最新: "latest"
      };
      for (var i = 0; i < book.length; i++) {
        // console.log(book[i]);
        book[i].GroupName = opt[book[i].GroupName];
      }
      return book;
    }
  },
  components: {
    swiper,
    column
  }
};
</script>

<style lang="stylus" scoped>
.swiper_box
  height 435px
.nav_list
  z-index 10
  width 100%
  display flex
  text-align center
  li
    width 50%
    height 100%
    font-size 28px
    padding 30px 0
    background #fff
    outline 0 none
    .nav_txt
      color #333
      font-size 28px
    .nav_icon
      margin 0 auto
      width 64px
      height 64px
      display block
      margin-bottom 15px
      vertical-align middle
      & img
        display inline-block
        width 100%
        height 100%
.push_box .push_column
  padding 25px
  margin 25px 0
/*推荐栏*/
.push_item
  background #fbf5f5
  padding-top 5px
.label_box
  position fixed
  z-index 1000
  bottom 0
  background #fff
  padding 12px
  border-top 2px solid #ddd
  font-size 0
  text-align center
  a
    color #cdcdcd
    padding 0 15px
    display inline-block
    font-size 28px
</style>
