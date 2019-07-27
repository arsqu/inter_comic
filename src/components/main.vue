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
    if (!this.$route.meta.isBack) {
      return;
    }
    this.sendMsg();
  },
  beforeRouteEnter(to, from, next) {
    console.log("进入路由");
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    init() {
      // this.getBanner(); //获取广告
      this.getData(); //首页媒体类目
    },
    sendMsg() {
      this.$bus.$emit("loading", false); //关闭loading加载效果
    },
    //轮播图
    getBanner() {
      // var pic = localStorage.getItem("bannerPic"); //获取轮播图的缓存数据
      // if (!pic) {
      //轮播图缓存
      this.$api.getBanner().then(res => {
        var arr = res;
        console.log(res);
        if (res.List && res.List.length > 0) {
          this.bannerList = res.List;
        }
        setTimeout(() => {
          //模拟1s延迟请求
          if (this.bannerList.length == 0) {
            this.bannerList = arr; //没有则填充
          }
          localStorage.setItem("bannerPic", JSON.stringify(arr)); //缓存轮播图
        }, 1000);
      });
      // } else {
      //   //读取轮播图缓存
      //   me.bannerList = JSON.parse(pic);
      // }
    },
    //图书数据
    getData() {
      //测试banner图数据
      /*
      this.$axios.post("/test/getCateGory").then(res => {
        var data = res.data;
        data = data.data ? data.data : data;
        //测试数据
        data.unshift({
          GroupName: "banner",
          GroupId: 0,
          List: [
            { group_img: "http://dummyimage.com/102" },
            { group_img: "http://dummyimage.com/103" },
            { group_img: "http://dummyimage.com/104" },
            { group_img: "http://dummyimage.com/105" },
            { group_img: "http://dummyimage.com/106" },
            { group_img: "http://dummyimage.com/107" }
          ]
        });
        this.bannerList =
          data.slice(0, 1)[0].List.length > 0 ? data.slice(0, 1)[0].List : [];
        if (data[1]) {
          this.bookList = data.slice(1);
        }
        //图书栏
        this.loadState = false; //关闭loading效果
      });
      */
      this.$api.getCateGory().then(res => {
        console.log(res);
        if (res.code == 1) {
          var data = res.data;
          if (data.length > 0) {
            // console.log(data);
            this.bannerList = data[0].List.length > 0 ? data[0].List : [];
            // console.log(this.bannerList);
            if (data[1]) {
              var bookList = data.slice(1);
              this.bookList = this.exchangeName(bookList);
              // this.bookList = data.slice(1);
              console.log(this.bookList);
            }
          }
        }
        this.loadState = false; //关闭loading效果
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
  z-index: 2;
  width: 100%;
  height: 1rem;
  margin-top: -1rem;
  background-size: 100% 1rem;
  display: flex;
  text-align: center;
}

.nav_list > li {
  display: flex;
}

.nav_list a {
  display: flex;
  cursor: pointer;
  align-items: center;
}

.nav_list li {
  width: 50%;
  height: 80px;
  font-size: 28px;
  justify-content: center;
  align-items: center;
  background: #fff;
  outline: 0 none;
  margin-top: 0.5rem;
}

.nav_list .nav_icon,
.nav_list .nav_icon img {
  display: inline-block;
  width: 50px;
  height: 50px;
}

.nav_list .nav_txt {
  margin: 0 20px;
}

.push_box .push_column {
  padding: 25px;
  margin: 25px 0;
}

/* 推荐栏 */
.push_item {
  margin-top: 1rem;
}
</style>



