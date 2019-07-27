<template>
  <mt-tabbar fixed v-model="selected">
    <mt-tab-item id="首页" @click.native="toggleTab('Index')">
      <img slot="icon" src="/static/img/icon/act_gamepad.png" v-show="!s.isD">
      <img slot="icon" src="/static/img/icon/gamepad.png" v-show="s.isD">
      首页
    </mt-tab-item>
    <mt-tab-item id="书架" @click.native="toggleTab('Books')">
      <img slot="icon" src="/static/img/icon/act_book.png" v-show="!s.isB">
      <img slot="icon" src="/static/img/icon/book.png" v-show="s.isB">
      书架
    </mt-tab-item>
    <mt-tab-item id="我的" @click.native="toggleTab('Info')">
      <img slot="icon" src="/static/img/icon/act_video.png" v-show="!s.isM">
      <img slot="icon" src="/static/img/icon/video.png" v-show="s.isM">
      我的
    </mt-tab-item>
    <!-- <mt-tab-item id="测试" @click.native="toggleTab('Test')">
      <img slot="icon" src="/static/img/icon/act_news.png" v-show="!s.isT">
      <img slot="icon" src="/static/img/icon/news.png" v-show="s.isT">
      测试
    </mt-tab-item>-->
    <mt-tab-item id="测试" @click.native="toggleTab('Test')">
      <img slot="icon" src="/static/img/icon/act_news.png" v-show="!s.isT">
      <img slot="icon" src="/static/img/icon/news.png" v-show="s.isT">
      测试
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  name: "app-tabbar", //标签名
  data() {
    return {
      s: {
        //tabbar状态
        isD: !1,
        isB: !0,
        isM: !0,
        isT: !0
      },
      lists: [],
      selected: "Index" //首页默认值
    };
  },
  methods: {
    //清空状态
    clear(state) {
      for (var k in this.s) this.$set(this.s, k, !0);
    },
    //路由跳转时根据state字段区分
    tarPush(state) {
      var opt = {
        //传递的参数
        key: state,
        url: ""
      };
      console.log("路由跳转");
      // console.log(state);
      switch (state) {
        case "Index":
          opt.url = "game";
          this.$router.push({ name: "list", params: opt });
          break;
        case "Books":
          opt.url = "ebook";
          this.$router.push({ name: "recommend", params: opt });
          break;
        case "Info":
          opt.url = "info";
          this.$router.push({ name: "downFile", params: opt });
          break;
        case "Test":
          opt.url = "main";
          this.$router.push({ name: "main", params: opt });
          break;
      }
    },
    //切换图标并路由跳转
    toggleTab(state) {
      this.tarPush(state); //路由跳转传值
      if (state) {
        sessionStorage.setItem("currentIdx", state);
        this.clear(state);
        if (this.s["is" + state]) this.$set(this.s, ["is" + state], !1);
      }
    },
    //默认选中tabbar
    defTab() {
      var state = sessionStorage.getItem("currentIdx"); //能读取时直接取下标默认选中
      if (state) {
        this.clear(state);
        if (this.s["is" + state]) this.$set(this.s, ["is" + state], !1);
        console.log(state);
      } else {
        //不能读取时,取首页
        state = this.selected;
        sessionStorage.setItem("currentIdx", state);
        this.tarPush(state);
      }
    }
  },
  created() {
    console.log("tabbar初始化");
    this.defTab();
  },
  watch: {
    selected(nv, ov) {
      // console.log(nv, ov);
      // console.log(this.active);
      // this.active = nv;
    }
  }
};
</script>

<style scoped>
</style>

