<template>
  <mt-loadmore
    :top-method="loadTop"
    :bottom-method="loadBottom"
    @top-status-change="handleTopChange"
  >
    <div class="box_list">
      <div class="com_lists" v-for="n in 10" v-bind:key="n" @click="tar_detail">
        <div class="com_img">
          <img src="http://img60.ddimg.cn/digital/product/82/76/1901118276_ii_cover.jpg" alt>
        </div>
        <div class="com_desc">
          <p class="com_tit">平凡的世界（全三册){{n}}</p>
          <p class="com_tit over_hide">茅盾文学奖皇冠上的明珠，激励亿万读者的不朽经典。</p>
        </div>
        <div>
          <p class="btn btn_def">获取</p>
          <p class="d_tit">App内购买项目</p>
        </div>
      </div>
    </div>
    <div slot="top" class="mint-loadmore-top">
      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
  </mt-loadmore>
</template>

<script>
export default {
  data() {
    return {
      topStatus: ""
    };
  },
  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      this.allLoaded = true; // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    tar_detail() {
      //跳转详情页
      console.log(1);
      this.$router.push({
        name: "ebook",
        params: {
          key: "ebook"
        }
      });
    }
  }
};
</script>

<style scoped>
.box_list {
  padding: 0.65rem;
  padding-bottom: 50px;
}

.com_lists {
  display: flex;
  padding: 0.5rem 0;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
}

.com_lists .com_desc {
  padding: 0.3rem 0.65rem;
  width: 45%;
}

.com_img > img {
  width: 75px;
  height: 75px;
  border: 0 none;
  border-radius: 8px;
}

.com_desc {
  text-align: left;
  align-items: center;
}

.com_lists .com_tit {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  color: #4b566a;
  padding: 0.15rem 0;
}

.com_lists .com_tit:first-child {
  font-size: 18px;
  font-weight: bold;
}

.com_lists .com_tit:last-child {
  color: #a2a2a2;
  font-size: 13px;
}

.d_tit {
  font-size: 12px;
  color: #999;
  padding: 5px 0;
}
</style>


