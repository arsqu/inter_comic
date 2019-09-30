<template>
  <div class="page-swipe">
    <template>
      <p v-show="loadState" class="page-infinite-loading">
        <mt-spinner type="triple-bounce" class="r_loading" />
        <!-- 加载中... -->
      </p>
    </template>
    <mt-swipe :auto="3000">
      <mt-swipe-item class="slide" v-for="(item,idx) in bannerList" :key="idx">
        <div class="def_view">
          <img v-lazy="item.group_img" @click="tar_href(item.id,item.title)" />
          <!-- <img :src="item.group_img||''" @click="tar_href(item.id,item.title)" /> -->
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    loadState: Boolean,
    bannerList: {
      type: Array,
      default: []
    }
  },
  mounted() {
    // console.log(this.bannerList);
  },
  methods: {
    tar_href(id, title) {
      console.log("跳转详情页");
      if (id) {
        this.$router.push({ name: "new_detl", params: { id, title } });
      }
    }
  }
};
</script>

<style scoped>
.page-swipe {
  position: relative;
}

.page-swipe .mint-swipe {
  height: 435px;
  color: #fff;
  font-size: 30px;
}

.page-infinite-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #333;
  z-index: 10;
  transform: translate(-50%, -80%);
}

.def_view img {
  height: 100%;
  cursor: pointer;
}


</style>


