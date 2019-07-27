<template>
  <div id="app">
    <!-- v-if 会导致页面重绘 -->
    <app-header v-show="headShow" :loader="loader" :comicTxt="comicTxt" />
    <!-- 渲染内容 -->
    <div class="page_layout" :class="{opac:loading}">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <!-- 底部固定栏 -->
    <!-- <app-tabbar/> -->
    <!-- 回到顶部 -->
    <div class="backTop" @click="scrollTop"></div>
  </div>
</template>

<script>
// import TabBar from "./components/tabbar";
const Header = () => import("@/components/common/header");
// import Header from "./components/common/header";
export default {
  data() {
    return {
      comicTxt: "", //标题文字
      loading: false, //页面加载效果
      headShow: true, //是否显示header
      loader: true //网站路由标题或主标题切换
    };
  },
  components: {
    "app-header": Header
    // "app-tabbar": TabBar
  },
  created() {
    // this.getMsg("navBar");
    this.init();
  },
  activated() {
    // console.log("app_activated");
  },
  mounted() {
    // console.log("app_mounted");
    window.addEventListener("scroll", this.showBtn); //监听滚动显示按钮
  },
  methods: {
    init() {
      this.getMsg(); //请求数据
    },
    showBtn() {
      //返回顶部
      if (this.$route.name == "view") {
        return;
      }
      var d = document,
        el = d.documentElement || d.body,
        sTop = el.scrollTop,
        sHet = el.scrollHeight;
      var btn = d.getElementsByClassName("backTop")[0];
      if (sTop / sHet >= 0.2) {
        //20%的距离
        if (btn.className.indexOf("show") == -1) btn.className += " show";
      } else btn.className = btn.className.replace(/\s?show/g, "");
    },
    //接收eventBus 变化
    getMsg() {
      var me = this;
      // 接收子组件通信
      this.$bus.$on("navBar", data => {
        //view组件浏览时隐藏header
        if (typeof data == "object" && data.hasOwnProperty("show")) {
          me.headShow = data.show;
          return;
        }
        //切换标题
        if (data) {
          me.loader = false; //head显示网站logo或文字
          me.comicTxt = data; //子组件的名字
        }
        // console.log(data);
      });
      //页面loading效果
      this.$bus.$on("loading", data => {
        // console.log("loading:" + data);
        me.loading = data;
      });
    },
    scrollTop() {
      window.scrollTo(0, 0);
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to, from);
      // console.log("路由变化");
      this.loader = true; //路由变化时重置标题
    }
  }
};
</script>

<style scoped>
#app {
  height: 100%;
}

.opac {
  opacity: 0.6;
}

.page_layout {
  transition: opacity 0.6s ease-out;
  margin-top: 100px;
  padding-bottom: 100px;
}

/* 回到顶部 */
.backTop {
  border: 1px solid #ddd;
  position: fixed;
  display: none;
  z-index: 100;
  width: 80px;
  height: 80px;
  background: #fff;
  right: 25px;
  bottom: 5%;
  transition: all 0.2s linear;
  opacity: 1;
}

.backTop:after {
  border-top: 2px solid transparent;
  border-right: 2px solid transparent;
  border-color: #666;
  position: absolute;
  left: 50%;
  top: 50%;
  height: 20px;
  width: 20px;
  margin-top: -4px;
  margin-left: -10px;
  transform: rotate(-45deg);
  content: "";
}

.backTop.show {
  display: block;
  bottom: 10%;
  opacity: 1;
}
</style>

