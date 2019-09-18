<template>
  <div class="imgLayout">
    <!-- 工具栏头 -->
    <!-- <span class="comicTxt">{{chapter}}</span> -->
    <div class="top_bar" v-show="headShow">
      <div class="top_title">
        <div class="top_detl_txt">
          <span class="top_icon" @click="reBack">
            <img src="/static/img/icon/prev.png" alt="prev" />
          </span>
          <span class="chapter">{{chapter}}</span>
        </div>
      </div>
      <div class="top_tools">
        <router-link :to="{name:'main'}">
          <img src="/static/img/icon/home_view.png" alt="home" />
        </router-link>
      </div>
    </div>
    <div class="imgBox">
      <div class="img_item" v-for="(item,idx) in imgList" :key="idx">
        <!-- lazyload组件 -->
        <img v-lazy="item" :key="item" />
      </div>
    </div>
    <div class="bottom_bar" v-show="headShow">
      <div class="top_tools">
        <!-- <router-link :to="{name:'chapter',id:id}"> -->
        <a href="javascript:;" @click="toDetl">
          <img src="/static/img/icon/list.png" alt="home" />
        </a>
        <!-- </router-link> -->
        <a href="javascript:;" @click="viewPrev">
          <img src="/static/img/icon/prev.png" alt="prev" />
        </a>
        <a href="javascript:;" @click="viewNext">
          <img src="/static/img/icon/next.png" alt="next" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      bookId: null,
      prev: null,
      prevChapter: {},
      prevIdx: null,
      next: null,
      nextChapter: {},
      nextIdx: null,
      now: null,
      timer: null,
      comicDetl: {},
      imgList: [],
      page: {
        offset: 0,
        limit: 500,
        total: 0
      },
      chapterList: [],
      chapter: "",
      headShow: false
    };
  },
  beforeRouteLeave(to, from, next) {
    // 隐藏导航栏
    if (to.name != "view") {
      this.$bus.$emit("navBar", { show: true });
      window.removeEventListener("click", this.showTools); //点击展示工具栏
    }
    next();
  },
  created() {
    var route = this.$route.params; //路由参数
    this.id = route.id;
    this.bookId = route.bookId; //路由下的漫画id
    this.review();
  },
  mounted() {
    console.log("view_mounted");
    // console.log(route);
    window.addEventListener("click", this.showTools); //点击展示工具栏
  },
  methods: {
    review() {
      this.getBookDetl(); //更新漫画
      var route = this.$route.params, //路由参数
        local = localStorage,
        bookId = local.getItem("bookId"); //漫画历史记录id
      // console.log(this.bookId, bookId);
      //漫画不同时更新章节
      if (this.bookId != bookId) {
        this.getAllChapter();
      } else {
        var chapterList = local.getItem("cache_chapter");
        if (chapterList) {
          this.$set(
            this,
            "chapterList",
            typeof chapterList == "string"
              ? JSON.parse(chapterList)
              : chapterList
          );
        } else {
          this.chapterList = chapterList = [];
        }
        this.matchChapter(this.chapterList);
      }
    },
    //请求所有章节
    getAllChapter() {
      console.log("当前所有章节");
      var opt = Object.assign({}, this.page);
      var mediaId = (opt.mediaId = this.bookId);
      localStorage.setItem("bookId", this.bookId); //无论是否成功都视为更新漫画
      this.$api
        .getData("getAllChapter", opt)
        .then(res => {
          if (res.code == 1) {
            var data = res.data,
              list = data.list;
            this.chapterList = [];
            this.$set(this, "chapterList", list);
            localStorage.setItem("cache_chapter", JSON.stringify(list));
            // this.loadState = false;
            this.matchChapter(list); //匹配上下章
          }
          // this.$bus.$emit("loading", false); //关闭loading
        })
        .catch(err => {
          // this.loadState = false;
          console.log("server error");
          // this.$bus.$emit("loading", false); //关闭loading
        });
    },
    //匹配章节
    matchChapter(list) {
      // console.log(list);
      for (var i = 0; i < list.length; i++) {
        //匹配相同章节
        if (list[i].id == this.id) {
          if (i - 1 > -1) {
            this.$set(this, "prevChapter", list[i - 1]);
            this.prev = list[i - 1].is_free ? false : list[i - 1].id;
            this.prevIdx = i;
          }
          if (i + 1 < list.length) {
            this.$set(this, "nextChapter", list[i + 1]);
            this.next = list[i + 1].is_free ? false : list[i + 1].id;
            this.nextIdx = i;
          }
          this.now = list[i].id;
          console.log(this.prev, this.next);
          break;
        }
      }
    },
    //点击出现工具栏
    showTools(e) {
      e = e || event;
      this.headShow = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.headShow = false;
      }, 2000);
    },
    //返回上一层
    reBack() {
      // this.$router.push({
      //   name: "new_detl",
      //   params: { id: this.bookId, title: "1" }
      // });
      // var path = localStorage.getItem("loginUrl");
      // if (path.indexOf("new_detl") != -1) {
      //   this.$router.push({ path });
      //   return;
      // }
      this.$router.history.go(-1);
    },
    showBox(opt, idx) {
      // console.log(this.id, idx);
      var price = localStorage.getItem("price");
      this.$bus.$emit("comic", {
        bookId: this.bookId,
        chapterId: opt.id,
        chapterIdx: idx,
        title: opt.title,
        orderNo: opt.order_no,
        price
      });
      //已登录
      if (localStorage.getItem("isLogin")) {
        this.$bus.$emit("isLogin", 1);
      } else {
        // console.log("isLogin", 0);
        this.$bus.$emit("isLogin", 0);
      }
      this.$bus.$emit("recharge", 1);
    },
    //查看上一章
    viewPrev() {
      var bookId = this.bookId,
        id = this.id;
      if (this.prev == false) {
        this.$toast(this.$t("view.tips.pay"));
        this.showBox(this.prevChapter, this.prevIdx);
        return;
      }
      // console.log(this.prevIdx);
      if (this.prev !== null && this.prev !== "" && this.prevIdx != 0) {
        this.$router.push({
          name: "view",
          params: { id: this.prev, bookId }
        });
      } else {
        this.$toast("view.tips.first");
      }
      console.log("prev");
    },
    //查看下一章
    viewNext() {
      var bookId = this.bookId,
        id = this.id;
      if (this.next == false) {
        this.$toast(this.$t("view.tips.pay"));
        this.showBox(this.nextChapter, this.nextIdx);
        return;
      }
      if (
        this.next !== null &&
        this.next !== "" &&
        this.nextIdx != this.chapterList.length
      ) {
        // console.log("查看下一章", id, bookId);
        this.$router.push({
          name: "view",
          params: { id: this.next, bookId }
        });
      } else {
        this.$toast(this.$t("view.tips.last"));
      }
      console.log("next");
    },
    //获取漫画详情
    getBookDetl() {
      // console.log(this.id);
      if (this.id) {
        this.$api.getChapter({ id: this.id }).then(res => {
          // console.log(res);
          console.log(this.prev, this.next);
          if (res.code == 1) {
            var data = res.data.detail;
            var imgList = data.content.split(",");
            this.$set(this, "comicDetl", data);
            this.$set(this, "imgList", imgList);
            this.chapter = this.$t("column.chapter") + " " + data.order_no;
            // console.log(data);
          }
        });
        this.$bus.$emit("navBar", { show: false });
      }
    },
    //返回章节页
    toDetl() {
      var path = localStorage.getItem("detl");
      this.$router.push({ path });
    }
  },
  watch: {
    $route(to, from) {
      var route = this.$route.params; //路由参数
      if (to.name == "view") {
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

<style scoped>
.imgLayout {
  margin-top: -100px;
  cursor: pointer;
}

/* 页头 */
.top_bar {
  height: 120px;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(11, 11, 11, 0.85);
  font-size: 30px;
  padding: 0 25px;
  align-items: center;
  display: flex;
}

.bottom_bar {
  height: 100px;
  position: fixed;
  z-index: 20;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(11, 11, 11, 0.85);
  font-size: 30px;
  padding: 0 25px;
  align-items: center;
  display: flex;
}

.bottom_bar .top_tools {
  display: flex;
  flex: 1;
  justify-content: space-around;
  height: 100%;
  align-items: center;
}

.chapter {
  font-size: 35px;
  padding-left: 45px;
  color: #999;
}

.top_icon {
  margin: 0 10px;
  width: 45px;
  cursor: pointer;
  height: 45px;
  display: inline-block;
}

.top_icon img {
  vertical-align: bottom;
}

.top_title {
  width: 90%;
}

.top_tools {
  width: 10%;
}

.top_logo,
.top_detl_txt {
  font-weight: bold;
  font-size: 35px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.top_logo {
  color: orange;
}

.top_detl_txt {
  color: #555;
}

.top_tools a {
  /* margin: 0 10px;
  width: 45px;
  height: 45px;
  display: inline-block; */
  margin: 0 10px;
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top_tools img {
  width: 55%;
  height: 55%;
  cursor: pointer;
}

.icon_logo {
  padding-left: 40px;
}

.icon_back {
  z-index: 100;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 50%;
  margin-top: -30px;
}

.icon_back:after {
  border-top: 4px solid transparent;
  border-right: 4px solid transparent;
  border-color: orange;
  position: absolute;
  height: 30px;
  width: 30px;
  margin-top: 15px;
  content: "";
  transform: rotate(-135deg);
}

.comicTxt {
  padding-left: 55px;
  width: 90%;
  color: #999;
  font-size: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}

/* 漫画容器 */
.imgBox {
  position: relative;
}

.img_item img[lazy="loading"],
.img_item img[lazy="error"] {
  width: 100%;
  height: 300px;
}

.img_item img[lazy="loading"] {
  /* background: url(http://static.u17i.com/m/mobile2017/images/loading.gif) */
  background: url(/static/img/loading_bicyle.gif) no-repeat center;
  background-size: 6rem;
}

.img_item img[lazy="error"] {
  background: url(/static/img/loading_bicyle.gif) no-repeat center;
  background-size: 6rem;
}
</style>


