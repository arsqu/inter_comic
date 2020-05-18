<template>
  <div id="app">
    <!-- v-if 会导致页面重绘 -->
    <!-- {{$route.name}}  -->
    <!-- $route.name!='new_info'&& -->
    <template
      v-if="
      $route.name!='login'&&
      $route.name!='register'&&
      $route.name!='406'&&
      $route.name!='404'"
    >
      <Header
        v-show="headShow"
        :showBgIcon="showBgIcon"
        :showHome="showHome"
        :zIndex="zIndex"
        :loader="loader"
        :comicTxt="comicTxt"
      />
      <!-- container -->
      <div
        class="page_layout"
        :class="[{opac:loading},{showTab:$config.showTabbar && $config.hideTab.indexOf($route.name) == -1}]"
      >
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
      <!-- modal -->
      <cs-modal :isModal="isModal" @closeModal="closeModal"></cs-modal>
      <langBox :isLangBox="isLangBox" />
      <chapterBox
        :isLogin="isLogin"
        :hasMoney="hasMoney"
        :isRecharge="isRecharge"
        :checkList="checkList"
        :chapterInfo="chapterInfo"
        @checkChange="checkChange"
        @btnFunc="btnFunc"
      />
      <!-- 下载app -->
      <div class="downloadApp" v-if="showApp && $config.showDownload">
        <i class="close" @click="close"></i>
        <img src="/static/img/win-logo.png" alt />
        <div class="down_txt">
          <p class>Mangeline</p>
          <p class>{{$t('common.download')}}</p>
        </div>
        <a :href="$config.downUrl" class="down_btn">{{$t('common.install')}}</a>
      </div>
      <!-- loading -->
      <div class="page_loading" v-show="loading">
        <img src="/static/img/whole_page.gif" />
      </div>
      <!-- backTop -->
      <div class="backTop" @click="scrollTop"></div>
      <TabBar v-if="$config.showTabbar && $config.hideTab.indexOf($route.name) == -1" />
    </template>
    <router-view v-else />
    <!--  v-if="
    $route.name =='main'|| $route.name == 'bookmark'"-->
  </div>
</template>

<script>
import Qs from "qs";
// import TabBar from "./components/tabbar";
const Header = () => import("@/components/common/header");
const TabBar = () => import("@/components/module/tabbar");
const langBox = () => import("@/components/module/langBox");
const chapterBox = () => import("@/components/module/chapterBox");
export default {
  components: {
    Header,
    TabBar,
    chapterBox,
    langBox
  },
  data() {
    return {
      locale: "",
      showApp: false,
      //章节详情
      chapterInfo: {
        title: "",
        txtIdx: "",
        orderNo: "",
        price: ""
      },
      checkList: [], //是否自动购买
      catalogue: [], //章节列表
      timer: null, //支付成功延迟获取金额
      zIndex: null,
      bookId: null,
      showHome: false,
      topMask: false,
      chaperId: null,
      chapterIdx: null,
      hasMoney: 0, //余额
      isLogin: false, //是否登录
      isLangBox: false, //遮罩
      isRecharge: false, //弹出框
      comicTxt: "", //标题文字
      loading: false, //页面加载效果

      headShow: true, //是否显示header
      showBgIcon: false, //白色图标
      loader: true //网站路由标题或主标题切换
    };
  },
  created() {},
  mounted() {
    this.init();
    console.log(this.$route);
    // console.log("app_mounted");
    window.removeEventListener("scroll", this.showBtn); //监听滚动显示按钮
    window.addEventListener("scroll", this.showBtn); //监听滚动显示按钮
  },
  methods: {
    // 获取参数
    getParam() {},
    //关闭
    close() {
      console.log("close");
      this.showApp = false;
    },
    //勾选自动支付
    checkChange(val) {
      if (val) {
        this.checkList = true;
        return;
      }
      this.checkList = false;
    },
    //功能按钮
    btnFunc() {
      console.log("功能按钮");
      var txtIdx = this.chapterInfo.txtIdx,
        isLogin = localStorage.getItem("isLogin"),
        checkList = this.checkList;
      localStorage.removeItem("autoBuy");
      if (this.checkList) {
        localStorage.setItem("autoBuy", 1);
      }
      //当前会直接跳转登录页
      if (txtIdx == 0 || !isLogin) {
        localStorage.setItem("loginUrl", this.$route.fullPath);
        this.$router.push({ name: this.$config.Router.login });
        //充值
      } else if (txtIdx == 1) {
        this.$router.push({ name: this.$config.Router.charging });
        this.closeModal();
        //支付
      } else if (txtIdx == 2) {
        // console.log(this.price, this.chaperId, this.mediaId);
        var opt = {
          chaperId: this.chapterId,
          mediaId: this.bookId,
          money: this.chapterInfo.price
        };
        // console.log(this.chapterInfo.price);
        //购买章节
        this.$api.postDataN("buyChapter", Qs.stringify(opt)).then(res => {
          console.log(res);
          var msg = "";
          var data = res.data;
          if (res.code == 1) {
            // this.$toast(res.msg);
            clearTimeout(this.timer);
            this.timer = setTimeout(this.getMoney, 500); //查看余额
            this.unlock();
            msg = "detl.payStatus.success";
            console.log("购买成功");
          } else if (res.code == 103) {
            //余额不足
            // this.$router.push({ name: "recharge" });
            this.$router.push({ name: this.$config.Router.charging });
            this.getMoney(); //查看余额
            msg = "detl.payStatus.error";
          } else if (res.code == 102) {
            //已购买
            this.unlock();
            msg = "detl.payStatus.warning";
          }
          this.closeModal();
          this.$util.Toast(msg);
        });
      } else {
      }
    },
    init() {
      this.getMsg(); //请求数据
      this.el = document.documentElement || document.body;
      this.btn = document.getElementsByClassName("backTop")[0];
    },
    unlock() {
      // console.log(this.chapterId, this.chapterIdx);
      this.$bus.$emit("chapter", {
        chapterId: this.chapterId,
        chapterIdx: this.chapterIdx,
        is_free: 0
      });
      var catalogue = localStorage.getItem("cache_chapter");
      catalogue = catalogue ? JSON.parse(catalogue) : null;
      console.log("解锁");
      if (catalogue) {
        //手动修改状态
        catalogue[this.chapterIdx].is_free = 0;
        localStorage.setItem("cache_chapter", JSON.stringify(catalogue));
      }
    },
    //关闭重置
    closeModal() {
      console.log("close");
      this.isModal = false;
      this.isLangBox = false;
      this.isRecharge = false;
    },
    //返回顶部
    showBtn() {
      // console.log(this.$route.name);
      // 浏览漫画时不显示
      if (this.$route.name == "new_view") {
        return;
      }
      var sTop = this.el.scrollTop,
        sHet = this.el.scrollHeight;
      //超出20%显示返回顶部按钮
      if (sTop / sHet >= 0.2) {
        this.scroll = sTop / sHet;
        // this.$set(this, "scroll", sTop / sHet);
        if (this.btn.className.indexOf("show") == -1)
          this.btn.className += " show";
      } else this.btn.className = this.btn.className.replace(/(^| )show/g, "");
    },
    getMoney(price) {
      this.$api.getDataN("hasMoney").then(res => {
        // console.log(res);
        if (res.code == 1) {
          var data = res.data;
          localStorage.setItem("money", data.money);
          this.hasMoney = data.money;
          if (price && data.money >= price) {
            this.$set(this.chapterInfo, "txtIdx", 2);
          }
        }
      });
    },
    showModal(cb) {
      cb();
      this.isModal = true;
    },
    //接收eventBus 变化
    getMsg() {
      // 页头
      this.$bus.$on("navBar", data => {
        // console.log("onnavBar", data);
        // 切换标题
        this.loader = true;
        if (data) {
          this.loader = false; //header  显示网站logo或文字
          this.comicTxt = data; //header 标题
        }
      });
      // 页面loading效果
      this.$bus.$on("loading", data => {
        // console.log("onloading", data);
        this.loading = data;
      });
      // 语言框
      this.$bus.$on("isLangBox", data => {
        if (data) {
          this.showModal(() => {
            this.zIndex = data;
            this.isLangBox = data;
          });
          return;
        }
        this.isLangBox = data;
        this.zIndex = data;
        this.isModal = false;
      });
      //查看付费章节
      this.$bus.$on("recharge", data => {
        console.log("onrecharge", data);
        this.checkList = true;
        if (data == 1) {
          this.showModal(() => {
            this.isRecharge = true;
          });
        } else if (data == "autoBuy") {
          console.log("自动购买");
          this.btnFunc();
        }
      });
      // 查看漫画
      this.$bus.$on("comic", data => {
        console.log("oncomic", data);
        this.bookId = data.bookId;
        this.chapterId = data.chapterId;
        this.chapterIdx = data.chapterIdx;
        this.chapterInfo = Object.assign({}, this.chapterInfo, {
          title: data.title,
          orderNo: data.orderNo,
          price: data.price
        });
      });
      //是否登录
      this.$bus.$on("isLogin", data => {
        console.log("onisLogin", data);
        if (data) {
          //已登录
          this.isLogin = true;
          this.$set(this.chapterInfo, "txtIdx", 1); //更新按钮状态
          var money = +localStorage.getItem("money");
          this.hasMoney = money;
          var price = this.chapterInfo.price;
          if ((money == 0 || money < price) && data != "firstLogin") {
            //余额不足检查是否充值
            this.getMoney(price);
          } else if (money >= price) {
            //支付
            this.$set(this.chapterInfo, "txtIdx", 2);
          } else {
          }
          return;
        }
        this.isLogin = false;
        this.$set(this.chapterInfo, "txtIdx", 0);
      });
    },
    scrollTop() {
      window.scrollTo(0, 0);
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to, from);
      var route = this.$route,
        config = this.$config;
      this.showHome = false;
      this.showBgIcon = false;
      this.headShow = true;
      this.loader = true;
      this.showApp = false;
      // console.log("watch", route.name);
      var name = route.name, //路由名
        txt = route.meta.title; //标题名
      //显示网站名
      if (name == "main") {
        this.showHome = true;
      }
      console.log(name);
      // console.log("watch", name);
      if (config.isDown.indexOf(name) != -1) {
        this.showApp = true;
      }
      if (config.headerShow.indexOf(name) != -1) {
        this.headShow = false;
      }
      if (config.colorIcon.indexOf(name) != -1) {
        this.showBgIcon = true;
      }
      if (config.customTxt.indexOf(name) == -1) {
        this.loader = false;
        this.comicTxt = txt;
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
.cusTab
  height 110px
.page_layout
  transition opacity .6s ease-out
  &.showTab
    padding-bottom 124px /*110 + 7*2*/
//loading加载中
.page_loading
  position absolute
  top 0
  left 0
  bottom 0
  right 0
  z-index 10
  background #fff
  img
    width 250px
    height 250px
    position absolute
    top 50%
    left 50%
    margin -125px 0 0 -125px
</style>

