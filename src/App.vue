<template>
  <div id="app">
    <!-- v-if 会导致页面重绘 -->
    <template v-if="$route.name!='login'&&$route.name!='register'">
      <Header v-show="headShow" :showHome="showHome" :loader="loader" :comicTxt="comicTxt" />
      <!-- 渲染内容 -->
      <div class="page_layout" :class="{opac:loading}">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
      <div class="page_modal" v-show="isModal" @click="closeModal"></div>
      <chapterBox
        :isLogin="isLogin"
        :isRecharge="isRecharge"
        :hasMoney="hasMoney"
        :chapterInfo="chapterInfo"
        @closeModal="closeModal"
        @btnFunc="btnFunc"
      />
      <!-- <app-tabbar/> -->
      <!-- 返回顶部 -->
      <div class="backTop" @click="scrollTop"></div>
    </template>
    <router-view v-else />
  </div>
</template>

<script>
// import TabBar from "./components/tabbar";
import Qs from "qs";
const Header = () => import("@/components/common/header");
const chapterBox = () => import("@/components/module/chapterBox");
export default {
  data() {
    return {
      chapterInfo: {
        title: "",
        txtIdx: "",
        orderNo: "",
        price: ""
      },
      bookId: null,
      showHome: false,
      chaperId: null,
      chapterIdx: null,
      hasMoney: 0, //余额
      isLogin: false, //是否登录
      isModal: false, //遮罩
      isRecharge: false, //弹出框
      comicTxt: "", //标题文字
      loading: false, //页面加载效果
      headShow: true, //是否显示header
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
  },
  activated() {
    // console.log("app_activated");
  },
  mounted() {
    this.init();
    // console.log("app_mounted");
    window.removeEventListener("scroll", this.showBtn); //监听滚动显示按钮
    window.addEventListener("scroll", this.showBtn); //监听滚动显示按钮
  },
  methods: {
    //功能按钮
    btnFunc() {
      var txtIdx = this.chapterInfo.txtIdx,
        isLogin = localStorage.getItem("isLogin");
      if (txtIdx == 0 || !isLogin) {
        localStorage.setItem("loginUrl", this.$route.fullPath);
        this.$router.push({ name: "login" });
      } else if (txtIdx == 1) {
        //recharge
        this.$router.push({ name: "recharge" });
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
            // var money = +localStorage.getItem("money");
            // localStorage.setItem("money", money - this.price);
            this.getMoney(); //查看余额
            this.unlock();
            // msg = "购买成功";
            msg = this.$t("detl.payStatus.success");
            console.log("购买成功");
          } else if (res.code == 103) {
            //余额不足
            this.$router.push({ name: "recharge" });
            this.getMoney(); //查看余额
            // msg = "余额不足";
            msg = this.$t("detl.payStatus.error");
          } else if (res.code == 102) {
            //已购买
            this.unlock();
            // msg = "已购买";
            msg = this.$t("detl.payStatus.warning");
          }
          this.closeModal();
          this.$toast(msg);
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
      this.$bus.$emit("chapter", {
        chapterId: this.chapterId,
        chapterIdx: this.chapterIdx,
        is_free: 0
      });
    },
    //关闭重置
    closeModal() {
      this.isModal = false;
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
        //view组件浏览时隐藏header
        if (typeof data == "object" && data.hasOwnProperty("show")) {
          me.headShow = data.show;
          return;
        }
        //切换标题
        me.loader = true;
        if (data) {
          me.loader = false; //head显示网站logo或文字
          me.comicTxt = data; //header名字
        }
      });
      //页面loading效果
      this.$bus.$on("loading", data => {
        // console.log('onloading',data);
        me.loading = data;
      });
      //查看付费章节
      this.$bus.$on("recharge", data => {
        // console.log("onrecharge", data);
        me.isModal = true;
        me.isRecharge = true;
      });
      this.$bus.$on("comic", data => {
        // console.log("oncomic", data);
        me.bookId = data.bookId;
        me.chapterId = data.chapterId;
        me.chapterIdx = data.chapterIdx;
        me.chapterInfo = Object.assign({}, me.chapterInfo, {
          title: data.title,
          orderNo: data.orderNo,
          price: data.price
        });
      });
      this.$bus.$on("showModal", data => {
        this.isModal = true;
      });
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
      // console.log("路由变化");
      this.showHome = false;
      var name = this.$router.history.current.name;
      if (name == "main") {
        this.showHome = true;
        // this.loader = true;
      }
    }
  }
};
</script>

<style scoped>
.opac {
  opacity: 0.6;
}

.page_layout {
  transition: opacity 0.6s ease-out;
  margin-top: 100px;
}

.page_modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.65);
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

