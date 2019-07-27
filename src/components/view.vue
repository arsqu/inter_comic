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
        <!-- 通过 -->
        <!-- <img v-if="idx<=defIdx" :src="item"> -->
        <!-- <img v-else :data-src="item"> -->
      </div>
    </div>
    <div class="bottom_bar" v-show="headShow">
      <div class="top_tools">
        <!-- <router-link :to="{name:'chapter',id:id}"> -->
        <a href="javascript:;">
          <img src="/static/img/icon/list.png" alt="home" @click="reBack" />
        </a>
        <!-- </router-link> -->
        <a href="javascript:;">
          <img src="/static/img/icon/prev.png" alt="prev" @click="viewPrev" />
        </a>
        <a href="javascript:;">
          <img src="/static/img/icon/next.png" alt="next" @click="viewNext" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      comicDetl: {},
      imgList: [],
      chapter: "",
      headShow: true,
      defIdx: 3, //默认加载3页漫画
      scrollIdx: 0
    };
  },
  methods: {
    //初始化
    init() {
      this.getBooks();
    },
    //点击出现工具栏
    showTools() {
      //console.log("工具栏");
      this.headShow = true;
      var me = this;
      setTimeout(() => {
        me.headShow = false;
      }, 2000);
    },
    reBack() {
      this.$router.history.go(-1);
    },
    //查看上一章
    viewPrev() {
      console.log("prev");
    },
    //查看下一章
    viewNext() {
      console.log("next");
    },
    //漫画容器
    showComic() {
      var d = document,
        el = d.documentElement || d.body,
        sTop = el.scrollTop,
        sHet = el.scrollHeight;
      var elem = d.getElementsByClassName("imgBox")[0].children;
      this.scrollIdx = this.defIdx;
      var start = elem[this.scrollIdx].offsetTop; //默认显示的漫画距离顶部的距离
      //console.log(start);
      //console.log(sTop, start);
      //图片正常加载时,滚动距离元素150像素开始加载
      if (sTop > start - 150) {
        console.log("开始加载");
        this.scrollIdx++;
      }
      // console.log(sTop, sHet);
    },
    //获取漫画详情
    getBooks() {
      console.log("getBooks");
      if (this.id) {
        this.$api.getChapter({ id: this.id }).then(res => {
          console.log(res);
          if (res.code == 1) {
            var data = res.data.detail;
            var imgList = data.content.split(",");
            this.$set(this, "comicDetl", data);
            this.$set(this, "imgList", imgList);
            // this.chapter = "第" + data.order_no + "话";
            this.chapter = this.$t("column.chapter") + " " + data.order_no;
            console.log(data);
          }
        });
        this.$bus.$emit("navBar", { show: false });
      }
    }
  },
  created() {
    // console.log("view_created");
  },
  mounted() {
    // console.log("view_mounted");
    var route = this.$route.params; //路由参数
    this.id = route.id;
    this.init();
    window.addEventListener("click", this.showTools); //点击展示工具栏
  },
  beforeRouteLeave(to, from, next) {
    // console.log("离开当前路由");
    // console.log(to);
    //返回详情页时缓存
    // if (to.name == "new_detl") {
    //   to.meta.keepAlive = true;
    // } else {
    //   to.meta.keepAlive = false;
    // }
    console.log("缓存详情页");
    if (to.name != "view") {
      this.$bus.$emit("navBar", { show: true });
    }
    next();
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
  margin: 0 10px;
  width: 45px;
  height: 45px;
  display: inline-block;
}

.top_tools img {
  width: 100%;
  height: 100%;
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

/* .img_item {
  min-height: 400px;
} */

.img_item img[lazy="loading"] {
  width: 100%;
  height: 300px;
  background: url(http://static.u17i.com/m/mobile2017/images/loading.gif)
    no-repeat center;
  background-size: 3rem;
}

.img_item img[lazy="error"] {
  width: 100%;
  height: 300px;
  background: url(http://static.u17i.com/m/mobile2017/images/loading.gif)
    no-repeat center;
  background-size: 3rem;
}
</style>


