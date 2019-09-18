<template>
  <!-- 详情页 -->
  <div class="comic_detl">
    <div class="comic_info">
      <!-- 高斯 -->
      <div class="comic_gaussian">
        <gaussian :autoSize="autoSize" />
      </div>
      <!-- 漫画详情 -->
      <div class="comic_box">
        <div class="comic_pic">
          <img :src.sync="bookList.show_img||''" />
        </div>
        <div class="comic_info_list">
          <p class="c_tit">{{bookList.title}}</p>
          <p class="c_mar">
            <span
              :class="['c_state',bookList.is_over==0?'':'done']"
            >{{$t('index.rankList.isOver')[bookList.is_over]}}</span>
          </p>
          <p class="c_mar">
            <span>{{$t('detl.auth')}} :</span>
            <span class="c_auth">{{bookList.artist||$t('show.unknown')}}</span>
          </p>
          <p class="c_mar">
            <span>{{$t('index.update')}} :</span>
            <span class="c_read">{{$t('index.date')[bookList.week_no-1]||''}}</span>
          </p>
          <p class="c_mar">
            <span>{{$t('detl.country')}} :</span>
            <span class="c_auth">{{bookList.area||$t('show.unknown')}}</span>
          </p>
          <!-- <p class="c_mar">
            <span>{{$t('detl.read')}} :</span>
            <span class="c_read">{{bookList.read||'0'}}</span>
          </p>-->
        </div>
      </div>
    </div>
    <!-- 导航详情 -->
    <div class="comic_desc">
      <div class="navbar_list">
        <ul class="tabBar">
          <li
            v-for="(item,idx) in tabList"
            :class="{active:isCur == (idx + 1)}"
            @click="toggleTab(idx)"
            v-bind:key="idx"
          >
            <a href="javascript:;">{{item.title}}</a>
          </li>
        </ul>
      </div>
      <div class="container_item">
        <div class="cont" v-show="isCur == 1">
          <div class="cont_detl">
            <p>{{$t('column.summary')}}</p>
            <p class="cont_desc">{{bookList.info||$t('column.noDesc')}}</p>
          </div>
          <!-- 详情推荐 -->
          <div class="comic_recommend">
            <!-- <app-list :bookList="bookDetl"/> -->
          </div>
        </div>
        <!-- 目录 -->
        <div class="cont" v-show="isCur == 2">
          <div class="cont_book_list">
            <loading :loadState="loadState" />
            <template v-if="!loadState">
              <category :bookList="bookList" :catalogue="catalogue" />
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部功能栏 -->
    <div class="book_fixed">
      <span class="book_txt">{{$t('column.chapter')+''+orderNo}} {{readTxt||$t('column.noTitle')}}</span>
      <span class="book_tool">
        <span v-if="params.id" @click="viewDetl">{{$t('column.footer')}}</span>
      </span>
    </div>
  </div>
</template>

<script>
const column = () => import("./module/column");
const gaussian = () => import("./module/gaussian");
const category = () => import("./module/category");
import Qs from "qs";

export default {
  data() {
    return {
      isCur: 1,
      id: null,
      loadState: false,
      params: {
        //路由参数
        id: null,
        title: ""
      },
      orderNo: "",
      price: "", //章节价格
      readTxt: "",
      //目录
      catalogue: [],
      //模糊框尺寸
      autoSize: {},
      tabList: [],
      page: {
        offset: 0,
        limit: 500,
        total: 0
      },
      //图书详情
      bookList: {},
      //推荐信息
      bookDetl: [
        //首页书单
        {
          type: "VIP专区",
          books: [
            {
              id: "1",
              src: "/static/img/book/test_2.jpg",
              title: "航海王",
              update: "更新 第842话"
            },
            {
              id: "2",
              src:
                "http://mhfm5tel.cdndm5.com/50/49920/20190506223857_320x246_38.jpg",
              title: "被勇者队伍开除的驭兽使、邂逅了最强种的猫耳少女",
              update: "更新 第842话"
            },
            {
              id: "3",
              src:
                "http://mhfm2tel.cdndm5.com/22/21224/20151216083500_180x240_22.jpg",
              title: "月光下的异世界之旅",
              update: "更新 第842话"
            },
            {
              id: "4",
              src:
                "http://mhfm1tel.cdndm5.com/34/33898/20161123163507_320x246_47.jpg",
              title: "异世界迷宫探索者",
              update: "更新 第842话"
            },
            {
              id: "5",
              src:
                "http://mhfm3tel.cdndm5.com/34/33771/20180727110326_180x240.jpg",
              title: "妖神记",
              update: "更新 第842话"
            },
            {
              id: "6",
              src: "/static/img/book/test_1.jpg",
              title: "一念时光6",
              update: "更新 第842话"
            }
          ]
        }
      ]
    };
  },
  components: {
    "app-list": column,
    gaussian,
    category
  },
  created() {
    this.tabList = [
      {
        title: this.$t("column.detl")
      },
      {
        title: this.$t("column.catalog")
      }
    ];
    localStorage.setItem("detl", this.$route.fullPath);
    // console.log("detl_created");
  },
  // beforeRouteEnter(to, from, next) {
  //   // if (from.name == "groupItem") {
  //   //   from.meta.keepAlive = true;
  //   // }
  //   console.log("进入");
  //   // console.log(from);
  //   if (localStorage.getItem("isLogin")) {
  //     console.log(this);
  //     // this.$bus.$emit("isLogin", 1); //关闭loading
  //   }
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  // console.log("离开");
  // console.log(to);
  // if (to.name == "groupItem") {
  //   to.meta.keepAlive = true;
  // }
  // console.log(from);
  // console.log(from.meta.keepAlive);
  // next();
  // },
  //缓存页
  activated() {
    var params = this.$route.params;
    // console.log("activated");
    this.isCur = this.from == "view" ? 2 : 1;
    if (params.id != this.bookId) {
      this.def();
      this.init();
      // console.log("update");
    } else {
      this.checkLogin();
      this.$bus.$emit("loading", false); //关闭loading加载效果
    }
    this.$bus.$emit("navBar", params.title); //同步漫画名
    // console.log("activated");
  },
  mounted() {
    // console.log("mounted");
    this.def();
    this.init();
  },
  destroyed() {
    // console.log('done');
    // this.$bus.$off("loading");
    // this.$bus.$off("navBar");
    // this.$bus.$off("isLogin"); //同步漫画名
  },
  methods: {
    //查看漫画详情
    viewDetl() {
      var opt = this.catalogue[0];
      // console.log(opt);
      var id = opt.id;
      if (opt && opt.is_free) {
        this.$bus.$emit("comic", {
          bookId: this.id,
          chapterId: opt.id,
          chapterIdx: 1,
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
        this.$bus.$emit("recharge", 1);
        return;
      }
      localStorage.setItem("bookId", this.id);
      this.$router.push({
        name: "view",
        params: { id, bookId: this.id }
      });
    },
    checkLogin() {
      if (!localStorage.getItem("isLogin")) {
        localStorage.setItem("loginUrl", this.$route.fullPath);
      }
    },
    //默认操作
    def() {
      var params = (this.params = this.$route.params);
      this.bookId = params.id;
      this.checkLogin();
    },
    //初始化
    init() {
      this.getSize(); //设置模糊层尺寸
      this.getAllChapter(); //获取图书目录
      this.getBookDetl(); //获取图书详情
    },
    //切换tab
    toggleTab(idx) {
      this.isCur = idx + 1;
    },
    getSize() {
      var el = document.getElementsByClassName("comic_info")[0],
        oWid = el.offsetWidth,
        oHet = el.offsetHeight;
      this.$set(this.autoSize, "wid", oWid);
      this.$set(this.autoSize, "het", oHet);
    },
    getChapter(opt) {
      this.loadState = true;
      return new Promise((resolve, reject) => {
        localStorage.setItem("cache_chapter", []);
        this.$api
          // .getDataN("getAllChapter", opt)
          .getData("getAllChapter", opt)
          // .postData("getAllChapter", opt)
          .then(res => {
            if (res.code == 1) {
              var data = res.data;
              // console.log(data.list);
              this.catalogue = [];
              this.loadState = false;
              // res.map(data => {
              //   data.is_free = data.isFree;
              //   data.order_no = data.orderNo;
              // });
              // this.$set(this, "catalogue", res);
              this.$set(this, "catalogue", data.list);
              localStorage.setItem("cache_chapter", JSON.stringify(data.list));
              // if (res.length > 0) {
              if (data.list.length > 0) {
                // var def = res[0];
                var def = data.list[0];
                this.readTxt = def.title;
                this.orderNo = def.order_no;
              }
              this.$bus.$emit("loading", false); //关闭loading
              resolve(res);
              return;
            }
            this.$bus.$emit("loading", false); //关闭loading
            resolve(false);
          })
          .catch(err => {
            this.loadState = false;
            console.log("server error");
            this.$bus.$emit("loading", false); //关闭loading
            reject(err);
          });
      });
    },
    getAllChapter() {
      var opt = Object.assign({}, this.page);
      var mediaId = (opt.mediaId = this.params.id);
      this.getChapter(opt)
        .then(res => {
          //没章节则不查询购买记录
          if (res.length == 0) {
            return;
          }
          if (res) {
            //已购买章节
            this.$api.getDataN("hasRecord", { mediaId }).then(buy => {
              if (buy.code == 1) {
                var buy = buy.data;
                if (buy.length > 0) {
                  this.catalogue.map((chapter, idx) => {
                    buy.map(has => {
                      if (chapter.id == has.chaperId) {
                        //已购买章节置为免费
                        this.$set(this.catalogue[idx], "is_free", 0);
                      }
                    });
                  });
                }
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      // this.$api.getAllChapter(opt).then(res => {
      //   if (res.code == 1) {
      //     // console.log(res);
      //     var data = res.data;
      //     if (this.catalogue.length == 0) {
      //       this.catalogue = data.list;
      //       if (data.list.length > 0) {
      //         this.readTxt = data.list[0].title;
      //       }
      //       // console.log(this.catalogue);
      //     } else {
      //       this.catalogue = [];
      //     }
      //   }
      // });
    },
    getBookDetl() {
      var params = this.params,
        id = params.id;
      if (!id) {
        return;
      }
      // console.log("请求数据");
      this.$api
        .getData("getDetail", { id })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            var data = res.data;
            // console.log(this.bookList);
            this.$set(this, "bookList", data.detail);
            this.price = data.detail.price;
            localStorage.setItem("price", this.price);
            //设置模糊框尺寸
            this.$set(this.autoSize, "src", data.detail.show_img);
          }
          this.$bus.$emit("loading", false); //关闭loading
        })
        .catch(err => {
          console.log("server error");
          this.$bus.$emit("loading", false); //关闭loading
        });
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (from.name == "view") this.from = "view";
        else this.from = "";
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.comic_detl {
  padding-bottom: 110px;
}

.cont_detl > p:first-child {
  font-weight: bold;
  color: #666;
  font-size: 18px; /*no*/
}

/* 图片信息 */
.comic_info {
  height: 400px;
  width: 100%;
  position: relative;
}

.comic_gaussian:after {
  content: "";
  height: 400px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
}

.comic_box {
  display: flex;
  height: 100%;
  align-items: flex-end;
  position: relative;
}

.comic_pic {
  width: 260px;
  height: 350px;
  margin: 0 0.75rem 0 1rem;
  background: #ccc
    url(data:image/png;base64,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)
    no-repeat 50% 50%;
  background-position: center center;
  /* background-size: 50% 50%; */
}

.comic_box .comic_info_list {
  font-size: 26px;
  height: 350px;
  padding-top: 40px;
  color: #fff;
  padding-right: 20px;
  flex: 1;
}

.comic_info_list .c_state {
  /* border: 2px solid #ddd; */
  padding: 5px 15px;
  border-radius: 10px;
  display: inline-block;
  background: #d5ae3f;
  color: #fff;
}

.c_state.done {
  background: #d37777;
}

.comic_pic img {
  height: 100%;
  width: 100%;
}

.comic_box .c_tit {
  font-size: 35px;
  margin-bottom: 20px;
  font-weight: bold;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
}

.comic_box .c_mar {
  margin-bottom: 10px;
}

.comic_gaussian {
  position: relative;
}

/* tab栏 */
.comic_desc {
  font-size: 25px;
  background: #fbf5f5;
  padding-bottom: 10px;
}

.comic_desc .tabBar {
  display: flex;
  background: #fff;
}

.navbar_list .tabBar .active a {
  color: #ffa500;
  height: 100%;
  display: inline-block;
  padding: 0 25px;
  border-bottom: 5px solid #ffa500;
  margin-top: 2.5px;
}

.comic_desc .tabBar li {
  font-size: 32px;
  width: 50%;
  height: 80px;
  cursor: pointer;
  line-height: 80px;
  border-bottom: 3px solid #f6f1f1;
  text-align: center;
  box-shadow: 0 5px 15px 0 #f6f1f1;
}

/* tab详情栏 */
.container_item {
  color: #555;
  /* border-bottom:5px solid #f8f8f8; */
}

.container_item .cont {
  padding: 30px 25px;
  background: #fff;
}

.container_item .detl > p:first-child {
  font-size: 35px;
}

.container_item .cont_desc {
  font-size: 30px;
  padding-top: 15px;
}

.comic_recommend >>> .push_column {
  padding: 0;
  margin-top: 50px;
}

.book_fixed {
  position: fixed;
  height: 100px;
  line-height: 100px;
  width: 100%;
  background: #f8f8f8;
  border-top: 2px solid #eee;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
}

.book_fixed span {
  height: 100%;
  display: block;
}

.book_fixed .book_txt {
  font-size: 30px;
  width: 60%;
  padding-left: 30px;
  text-align: left;
  color: #555;
  background: #fff;
}

.book_fixed .book_tool {
  width: 40%;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
  background: #ffa500;
  color: #fff;
}

.book_fixed .book_tool a {
  color: #fff;
}
</style>

