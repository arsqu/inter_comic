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
          <!-- <router-link :to="{name:'weekList'}"> -->
          <router-link :to="{name:'new_week'}">
            <!-- <i class="icon icon_update"></i> -->
            <span class="nav_icon">
              <img src="/static/img/icon_new/clock.png" alt="update" />
            </span>
            <span class="nav_txt">{{$t('index.update')}}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'ranking'}">
            <!-- <i class="icon icon_rank"></i> -->
            <span class="nav_icon">
              <img src="/static/img/icon_new/rank.png" alt="ranking" />
            </span>
            <span class="nav_txt">{{$t('index.rank')}}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 推荐栏 -->
    <div class="push_item">
      <column :autoImg="this.$config.autoImg.column" :bookList="bookList" />
      <loading :loadState="loadState"></loading>
    </div>
  </div>
</template>

<script>
const swiper = () => import("./module/swiper");
const column = () => import("./module/column");

export default {
  data() {
    return {
      bannerList: [], //广告图
      bookList: [], //首页详情
      loadState: true //滚动加载提示
    };
  },
  created() {},
  mounted() {
    var href = this.$route.fullPath,
      idx = href.indexOf("?ch="),
      ch = href.slice(idx + 4);
    if (ch) localStorage.setItem("wap_ch", "ch" + ch); //渠道号
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
/*公共导航*/
.swiper_box
  height 435px
.nav_list
  background url('/static/img/banner_bottom.png') no-repeat
  position relative
  z-index 10
  width 100%
  height 80px
  margin-top -80px
  background-size 100% 80px
  display flex
  text-align center
  li
    width 50%
    height 80px
    line-height 80px
    font-size 28px
    background #fff
    outline 0 none
    margin-top 40px
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
  padding-top 45px
</style>



