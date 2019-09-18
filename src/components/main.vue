<template>
  <div class="main_page">
    <!-- 轮播图 -->
    <div class="swiper_box">
      <app-swiper :loadState="loadState" :bannerList="bannerList" />
    </div>
    <!-- 导航栏 -->
    <div class="navbar">
      <ul class="nav_list">
        <li>
          <router-link :to="{name:'weekList'}">
            <span class="nav_icon">
              <img src="/static/img/icon/update.png" alt="update" />
            </span>
            <span class="nav_txt">{{$t('index.update')}}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'ranking'}">
            <span class="nav_icon">
              <img src="/static/img/icon/ranking_1.png" alt="ranking" />
            </span>
            <span class="nav_txt">{{$t('index.rank')}}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 推荐栏 -->
    <div class="push_item">
      <app-column :bookList="bookList" />
      <loading :loadState="loadState"></loading>
    </div>
  </div>
</template>

<script>
const swiper = () => import("./module/swipe");
const column = () => import("./module/column");

export default {
  data() {
    return {
      bannerList: [], //广告图
      bookList: [], //首页详情
      loadState: true //滚动加载提示
    };
  },
  mounted() {
    this.init(); //初始化
  },
  activated() {
    console.log("缓存触发");
    this.$bus.$emit("navBar", false); //关闭loading加载效果
    this.$bus.$emit("loading", false); //关闭loading加载效果
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log("进入路由");
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   next();
  // },
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
              this.bannerList = list.length > 0 ? list : [];
              if (data[1]) {
                var bookList = data.slice(1);
                this.bookList = this.exchangeName(bookList);
                // console.log(this.bookList);
              }
            }
            this.loadState = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    exchangeName(book) {
      var opt = {
        推荐: "recommend",
        最新: "latest",
        新作: "new",
        热门: "hot",
        精选: "selected"
      };
      for (var i = 0; i < book.length; i++) {
        book[i].GroupName = this.$t("index.module." + opt[book[i].GroupName]);
      }
      return book;
    }
  },
  components: {
    //轮播和类目组件
    "app-swiper": swiper,
    "app-column": column
  }
};
</script>

<style scoped>
/* 公共导航 */
.nav_list {
  background: url("/static/img/banner_bottom.png") no-repeat;
  position: relative;
  z-index: 10;
  width: 100%;
  height: 80px;
  margin-top: -80px;
  background-size: 100% 80px;
  display: flex;
  text-align: center;
}

.nav_list li {
  width: 50%;
  height: 80px;
  line-height: 80px;
  font-size: 28px;
  background: #fff;
  outline: 0 none;
  margin-top: 40px;
}

.nav_list .nav_icon {
  vertical-align: middle;
}

.nav_list .nav_icon,
.nav_list .nav_icon img {
  display: inline-block;
  width: 50px;
  height: 50px;
}

.nav_list .nav_txt {
  margin: 0 20px;
  vertical-align: middle;
}

.push_box .push_column {
  padding: 25px;
  margin: 25px 0;
}

/* 推荐栏 */
.push_item {
  background: #fbf5f5;
  padding-top: 45px;
  /* margin-top: 15px; */
}
</style>



