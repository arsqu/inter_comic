<template>
  <!-- 页头 -->
  <div class="top_bar">
    <div class="top_title">
      <div class="top_logo">
        <div>
          <span class="icon_logo" v-show="loader">Manga</span>
        </div>
        <div class="top_detl_txt" v-show="!loader">
          <span class="icon_back" @click="reBack"></span>
          <span class="comicTxt">{{comicTxt}}</span>
        </div>
      </div>
    </div>
    <!-- <div>{{$route.name}}</div> -->
    <div class="top_tools">
      <router-link :to="{name:'search'}">
        <img src="/static/img/icon/search.png" alt="search" />
      </router-link>
      <router-link :to="{name:'main'}">
        <img src="/static/img/icon/home.png" alt="home" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    loader: Boolean,
    comicTxt: String
  },
  methods: {
    reBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
/* 页头 */
.top_bar {
  height: 100px;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #fff;
  font-size: 30px;
  padding: 0 15px;
  display: flex;
  align-items: center;
}

.top_title {
  flex: 1;
}

.top_logo,
.top_detl_txt {
  font-weight: bold;
  font-size: 38px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.top_logo {
  color: orange;
}

.top_detl_txt {
  color: #555;
  padding-left: 10px;
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
}

.icon_logo {
  padding-left: 40px;
}

.icon_back {
  z-index: 100;
}

.icon_back:after {
  border-top: 4px solid transparent;
  border-right: 4px solid transparent;
  border-color: orange;
  height: 30px;
  width: 30px;
  content: "";
  transform: rotate(-135deg);
  display: inline-block;
}

.comicTxt {
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
</style>


