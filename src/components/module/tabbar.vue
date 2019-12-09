<template>
  <mt-tabbar class="cusTab" fixed v-model="selected">
    <mt-tab-item id="Main" @click.native="toggleTab('Main')">
      <img slot="icon" src="/static/img/icon_new/main_act.png" v-show="!o.isMain" />
      <img slot="icon" src="/static/img/icon_new/main.png" v-show="o.isMain" />
      Mangaline
    </mt-tab-item>
    <mt-tab-item id="Storage" @click.native="toggleTab('Storage')">
      <img slot="icon" src="/static/img/icon_new/mark_act.png" v-show="!o.isStorage" />
      <img slot="icon" src="/static/img/icon_new/mark.png" v-show="o.isStorage" />
      Library
    </mt-tab-item>
    <mt-tab-item id="Info" @click.native="toggleTab('Info')">
      <img slot="icon" src="/static/img/icon_new/info_act.png" v-show="!o.isInfo" />
      <img slot="icon" src="/static/img/icon_new/info.png" v-show="o.isInfo" />
      Me
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  name: "app-tabbar",
  data() {
    return {
      o: {
        isMain: !1,
        isStorage: !0,
        isInfo: !0
      },
      def: "Main", //默认显示
      selected: ""
    };
  },
  methods: {
    //清空状态
    clear(state) {
      for (var k in this.o) this.$set(this.o, k, !0);
    },
    tarPush(state) {
      console.log(state);
      switch (state) {
        case "Main":
          this.selected = "Main";
          if (this.$route.name != "main") {
            this.$router.push({ name: "main" });
          }
          break;
        case "Storage":
          this.selected = "Storage";
          if (this.$route.name != "bookmark") {
            this.$router.push({ name: "bookmark" });
          }
          break;
        case "Info":
          this.selected = "Info";
          if (this.$route.name != "new_info") {
            this.$router.push({ name: "new_info" });
          }
          break;
      }
    },
    //切换图标并路由跳转
    toggleTab(state) {
      this.tarPush(state); //路由跳转传值
      if (state) {
        if (state != "Info") sessionStorage.setItem("currentIdx", state);
        this.clear(state);
        if (this.o["is" + state]) this.$set(this.o, ["is" + state], !1);
      }
    },
    //默认选中tabbar
    defTab() {
      var state = sessionStorage.getItem("currentIdx");
      //能读取时直接取下标默认选中,不能读取时,取首页
      if (state) {
        this.clear(state);
        this.selected = state;
        if (this.o["is" + state]) this.$set(this.o, ["is" + state], !1);
        this.tarPush(state);
      } else {
        state = this.def;
        sessionStorage.setItem("currentIdx", state);
      }
    }
  },
  created() {
    console.log("tabbar初始化");
    this.defTab();
  }
};
</script>

<style lang="stylus" scoped>
.cusTab >>> .mint-tab-item.is-selected
  color #FF8D75
</style>

