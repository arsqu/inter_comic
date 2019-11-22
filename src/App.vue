<template>
  <div id="app">
    <!-- v-if 会导致页面重绘 -->
    <!-- $route.name!='userCtrl' -->
    <template
      v-if="
      $route.name!='login'&&
      $route.name!='register'&&
      $route.name!='new_info'&&
      $route.name!='406'"
    >
      <Header
        v-show="headShow"
        :showBgIcon="showBgIcon"
        :showHome="showHome"
        :loader="loader"
        :comicTxt="comicTxt"
      />
      <!-- container -->
      <div class="page_layout" :class="{opac:loading}">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
      <!-- modal -->
      <div :class="['page_modal',isLanguage?'lang':'']" v-show="isModal" @click="closeModal"></div>
      <!-- payfor Chapter -->
      <chapterBox
        :isLogin="isLogin"
        :isRecharge="isRecharge"
        :hasMoney="hasMoney"
        :checkList="checkList"
        :chapterInfo="chapterInfo"
        @closeModal="closeModal"
        @checkChange="checkChange"
        @btnFunc="btnFunc"
      />
      <!-- select language -->
      <div class="langList" v-show="isLanguage">
        <ul>
          <!-- <li>当前语言:{{locale}}</li> -->
          <li v-for="(item,key,idx) in lang" :key="idx" @click="changeWords(key)">{{item}}</li>
        </ul>
      </div>
      <!-- loading -->
      <div class="page_loading" v-show="loading">
        <img src="/static/img/whole_page.gif" />
      </div>
      <!-- download app -->
      <div class="downloadApp" v-if="closeApp">
        <i class="close" @click="close"></i>
        <img src="/static/img/win-logo.png" alt />
        <div class="down_txt">
          <p class>Mangeline</p>
          <p class>{{$t('common.download')}}</p>
        </div>
        <a :href="$config.downUrl" class="down_btn">{{$t('common.install')}}</a>
      </div>
      <!-- <app-tabbar/> -->
      <!-- backTop -->
      <div class="backTop" @click="scrollTop"></div>
    </template>
    <router-view v-else />
  </div>
</template>

<style lang="stylus">
.downloadApp
  background #fff
  box-shadow 0 0 12px #c9bebe
  position fixed
  bottom 0
  display flex
  width 100%
  z-index 99
  padding 20px 20px 20px 25px
  align-items center
  justify-content center
  i.close
    background url('/static/img/icon_new/s_close.png') no-repeat
    height 40px
    width 40px
    z-index 10
    cursor pointer
    background-size 100%
    margin-right 25px
  img
    width 13%
  .down_txt
    font-size 28px
    color #252525
    padding-top 10px
    flex 1
    padding 10px 20px
    p:last-child
      padding-top 10px
      color #666
  .down_btn
    width 150px
    height 60px
    line-height 60px
    text-align center
    top 15px
    display inline-block
    right 10px
    background #FD113A
    border 2px solid #212121
    border-radius 15px
    font-size 13px
    color #F8F8F9
</style>

<script>
// import TabBar from "./components/tabbar";
import Qs from "qs";
const Header = () => import("@/components/common/header");
const chapterBox = () => import("@/components/module/chapterBox");
export default {
  data() {
    return {
      locale: "",
      closeApp: true,
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
      bookId: null,
      showHome: false,
      chaperId: null,
      lang: {},
      event: "", //上下章
      chapterIdx: null,
      hasMoney: 0, //余额
      isLanguage: false, //语言框
      isLogin: false, //是否登录
      isModal: false, //遮罩
      isRecharge: false, //弹出框
      comicTxt: "", //标题文字
      loading: false, //页面加载效果

      headShow: true, //是否显示header
      showBgIcon: false, //白色图标
      loader: true //网站路由标题或主标题切换
    };
  },
  components: {
    Header,
    chapterBox
    //"app-tabbar": TabBar
  },
  created() {
    // console.log("app_created");
    this.lang = this.$config.lang;
  },
  activated() {
    // console.log("app_activated");
  },
  mounted() {
    this.init();
    // console.log("app_mounted");
    // this.matchLang();
    window.removeEventListener("scroll", this.showBtn); //监听滚动显示按钮
    window.addEventListener("scroll", this.showBtn); //监听滚动显示按钮
  },
  methods: {
    //关闭
    close() {
      console.log("close");
      this.closeApp = false;
    },
    //勾选自动支付
    checkChange(val) {
      if (val) {
        this.checkList = true;
        return;
      }
      this.checkList = false;
    },
    //匹配语言
    matchLang() {
      var locale = (this.locale = this.$i18n.locale);
      for (var k in this.lang) {
        console.log(this.lang, locale);
        if (k == locale) {
          this.locale = this.lang[k];
          break;
        }
      }
    },
    //切换语言
    changeWords(lang) {
      if (lang) {
        this.$i18n.locale = lang;
        this.$util.Toast("tips.lang");
      }
      this.closeModal();
    },
    //功能按钮
    btnFunc() {
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
        // this.$router.push({ name: "login" });
      } else if (txtIdx == 1) {
        //recharge
        this.$router.push({ name: this.$config.Router.charging });
        // this.$router.push({ name: "recharge" });
        this.closeModal();
      } else if (txtIdx == 2) {
        // console.log(this.price, this.chaperId, this.mediaId);
        // return;
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
            // msg = "购买成功";
            msg = "detl.payStatus.success";
            console.log("购买成功");
          } else if (res.code == 103) {
            //余额不足
            // this.$router.push({ name: "recharge" });
            this.$router.push({ name: this.$config.Router.charging });
            this.getMoney(); //查看余额
            // msg = "余额不足";
            msg = "detl.payStatus.error";
          } else if (res.code == 102) {
            //已购买
            this.unlock();
            // msg = "已购买";
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
      this.isModal = false;
      this.isLanguage = false;
      this.isRecharge = false;
    },
    //返回顶部
    showBtn() {
      // 浏览漫画时不显示
      if (this.$route.name == "view") {
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
      } else this.btn.className = this.btn.className.replace(/\s?show/g, "");
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
    //接收eventBus 变化
    getMsg() {
      var me = this;
      // 页头
      this.$bus.$on("navBar", data => {
        // console.log("onnavBar", data);
        //切换标题
        me.loader = true;
        if (data) {
          me.loader = false; //head显示网站logo或文字
          me.comicTxt = data; //header名字
        }
        // console.log(me.headShow);
      });
      //页面loading效果
      this.$bus.$on("loading", data => {
        // console.log("onloading", data);
        me.loading = data;
      });
      //查看付费章节
      this.$bus.$on("recharge", data => {
        // console.log("onrecharge", data);
        this.checkList = true;
        if (data == 1) {
          me.isModal = true;
          me.isRecharge = true;
        } else if (data == "autoBuy") {
          // console.log("自动购买");
          this.btnFunc();
        }
      });
      this.$bus.$on("comic", data => {
        console.log("oncomic", data);
        me.bookId = data.bookId;
        me.chapterId = data.chapterId;
        me.chapterIdx = data.chapterIdx;
        me.chapterInfo = Object.assign({}, me.chapterInfo, {
          title: data.title,
          orderNo: data.orderNo,
          price: data.price
        });
      });
      //遮罩
      this.$bus.$on("showModal", data => {
        this.isModal = true;
      });
      this.$bus.$on("isLanguage", data => {
        // console.log(data);
        if (data) {
          this.isLanguage = true;
          this.isModal = true;
        } else this.isLanguage = false;
      });
      //是否登录
      this.$bus.$on("isLogin", data => {
        // console.log("onisLogin", data);
        if (data) {
          //已登录
          me.isLogin = true;
          this.$set(this.chapterInfo, "txtIdx", 1);
          var money = +localStorage.getItem("money");
          this.hasMoney = money;
          var price = this.chapterInfo.price;
          if (money == 0 || money < price) {
            //余额不足检查是否充值
            this.getMoney(price);
          } else if (money >= price) {
            //支付
            this.$set(this.chapterInfo, "txtIdx", 2);
          } else {
          }
          return;
        }
        me.isLogin = false;
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
      var route = this.$route;
      this.showHome = false;
      this.showBgIcon = false;
      this.headShow = true;
      this.loader = true;
      // this.closeApp = false;
      console.log("watch", this.closeApp);
      var name = route.name, //路由名
        txt = route.meta.title; //标题名
      //显示主页图标
      if (name == "main") {
        this.showHome = true;
      }
      //隐藏导航栏
      if (name == "new_view") {
        this.headShow = false;
      }
      //广告
      var banner = ["main"];
      if (banner.indexOf(name) == -1) {
        this.closeApp = false;
      }
      // 有底色的导航栏
      var showIcon = ["new_charging", "new_week", "feedback"];
      if (showIcon.indexOf(name) != -1) {
        this.showBgIcon = true;
      }
      //标题的文字
      var Unexpected = [
        "groupItem",
        "new_detl",
        "new_view",
        "new_info",
        "userCtrl",
        "login",
        "register",
        "main"
      ];
      if (Unexpected.indexOf(name) == -1) {
        this.loader = false;
        this.comicTxt = txt;
      }
      //显示广告
    }
  }
};
</script>

<style lang="stylus" scoped>
.opac
  opacity .6
.page_layout
  transition opacity .6s ease-out
//拟态框
.page_modal
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  margin auto
  z-index 100
  background-color rgba(0, 0, 0, .65)
  &.lang
    top 100px
/*language box*/
.langList
  position fixed
  top 100px
  z-index 100
  width 100%
  background #fff
  font-size 28px
  padding 0 10px
  border-bottom 5px solid #ff8300
  li
    padding 15px 10px
    color #555
    border-top 1px solid #ddd
    &:first-child
      border-top 0 none
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
/*backTop*/
.backTop
  border 1px solid #ddd
  position fixed
  z-index 100
  width 90px
  height 90px
  background #fff
  right 25px
  bottom 10%
  transition all .4s ease
  opacity 0
  border-radius 50%
  /*display: none;*/
  box-shadow 0 0 5px #f7f7f7
  &:after
    border-top 3px solid transparent
    border-right 3px solid transparent
    border-color #666
    position absolute
    left 50%
    top 50%
    height 20px
    width 20px
    margin-top -6px
    margin-left -10px
    transform rotate(-45deg)
    content ''
  &.show
    opacity 1
</style>

