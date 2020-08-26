<template>
  <div class="main_page">
    <!-- 轮播图 -->
    <div class="swiper_box">
      <!-- 搜索框 -->
      <div class="s_group" @keyup.13="searchVal">
        <div class="s_inp">
          <!-- type="text" -->
          <input
            class="s_key"
            type="search"
            maxlength="45"
            :placeholder="$t('search.txt')"
            v-model="val"
          />
        </div>
        <!-- <span class="s_txt btn_primary" @click="searchVal">{{
          this.$t("search.search")
        }}</span> -->
      </div>
      <swiper :loadState="loadState" :bannerList="bannerList" />
    </div>
    <!-- 推荐栏 -->
    <div class="push_item">
      <column :autoImg="this.$config.autoImg.column" :bookList="bookList" />
      <loading :loadState="loadState"></loading>
    </div>
    <!-- 导航栏 -->
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
// const column = () => import("@/components/module/column");
const column = () => import("../components/module/column");

export default {
  data() {
    return {
      val: "",
      href: location.href,
      bannerList: [], //广告图
      bookList: [], //首页详情
      loadState: true //滚动加载提示
    };
  },
  created() {},
  mounted() {
    // var href = this.$route.fullPath,
    //   idx = href.indexOf("?ch="),
    //   ch = href.slice(idx + 4);
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
    //搜索数据
    searchVal() {
      var val = this.val;
      if (val) {
        this.$router.push({ name: "search", params: { key: val } });
      }
      console.log(val);
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
              var list = data[0].List;
              this.bannerList = list.length > 0 ? list : []; //第一条数据为banner
              if (data[1]) {
                var bookList = data.slice(1);
                bookList.map(res => {
                  res.List = res.List.slice(0, 9); //栏目只显示9条数据
                });
                this.$set(this, "bookList", this.exchangeName(bookList));
                console.log(this.bookList);
                // this.bookList = this.exchangeName(bookList);
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
.main_page
  padding-bottom 100px
.s_group
  margin 10px 30px
  display flex
  position absolute
  align-items center
  justify-content center
  // height 100%
  z-index 10
  width calc(100% - 60px)
  .s_inp
    border-radius 30px
    height 70px
    flex 1
    line-height 70px
    background #fff
    width calc(100% - 30px)
    padding-left 65px
    color #666
    opacity .85
    .s_key
      border 0 none
      outline 0 none
      height 100%
      width 100%
      vertical-align top
      background transparent
  &:before
    content ''
    z-index 10
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
    // margin-left 20px
/*公共导航*/
.swiper_box
  height 435px
  display flex
  align-items center
  position relative
.nav_list
  position relative
  z-index 10
  width 100%
  display flex
  text-align center
  li
    width 50%
    height 80px
    line-height 80px
    font-size 28px
    background #fff
    outline 0 none
    // margin-top 40px
    .nav_icon
      vertical-align middle
    .nav_icon, .nav_icon img
      display inline-block
      width 50px
      height 50px
.push_box .push_column
  padding 25px
  margin 25px 0
/*推荐栏*/
.push_item
  background #fbf5f5
  // padding-top 45px
// .label_box
//   position fixed
//   z-index 1000
//   bottom 0
//   background #fff
//   padding 12px
//   border-top 2px solid #ddd
//   font-size 0
//   text-align center
//   a
//     color #cdcdcd
//     padding 0 15px
//     display inline-block
//     font-size 28px
</style>
