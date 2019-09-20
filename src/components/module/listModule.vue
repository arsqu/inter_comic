<template>
  <div class="list_module">
    <template v-if="boxList">
      <template v-if="boxList.length>0">
        <div
          class="com_lists"
          v-for="(item,idx) in boxList"
          :key="idx"
          @click="tar_detail(item.id,item.title)"
        >
          <div class="com_img">
            <img v-lazy="item.show_img" :key="item.show_img" />
          </div>
          <div class="com_desc">
            <p class="com_tit">{{item.title}}</p>
            <p class="com_tit com_week">
              <!-- {{$t('show.week')}} {{$t('index.date')[item.week_no-1]}} {{$t('show.update')}} -->
              {{$t('show.case')}} {{$t('index.date')[item.week_no-1]}} {{$t('show.update')}}
            </p>
            <p class="com_tit">{{item.info}}</p>
          </div>
          <div
            :class="['com_rank',idx<=2?'spec spec_'+idx:'']"
            v-show="rankState"
          >{{idx+1>9?idx+1:'0'+(idx+1)}}</div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "app-list",
  data() {
    return {};
  },
  props: {
    boxList: Array,
    loadState: Boolean,
    rankState: Boolean
  },
  activated() {},
  created() {
    // console.log("listModule_created");
  },
  mounted() {
    // console.log(this.boxList);
    // console.log("listMoudle_mounted");
  },
  methods: {
    loadMore() {
      console.log("测试滚动");
    },
    //跳转详情页
    tar_detail(id, title) {
      this.$router.push({ name: "new_detl", params: { id, title } });
    }
  },
  watch: {}
};
</script>

<style scoped>
.com_lists {
  display: flex;
  align-items: center;
  background: #fff;
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #eee;
  position: relative;
}

.com_lists .com_desc {
  padding: 10px 30px;
  width: auto;
}

.com_img > img {
  width: 155px;
  height: 200px;
  border: 0 none;
  border-radius: 4px;
}

.com_lists .com_desc {
  text-align: left;
  align-items: center;
}

.com_lists .com_tit {
  overflow: hidden;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 2;
  word-break: break-all;
  color: #4b566a;
  padding: 5px 0;
}

.com_lists .com_week {
  font-size: 28px;
}

.com_lists .com_tit:first-child {
  font-size: 32px;
  padding-right: 35px;
  font-weight: bold;
}

.com_lists .com_tit:last-child {
  color: #a2a2a2;
  font-size: 30px;
}

.d_tit {
  font-size: 12px;
  color: #999;
  padding: 5px 0;
}

.com_lists .com_rank {
  position: absolute;
  color: #999;
  z-index: 10;
  right: 10px;
  top: 10px;
  font-size: 30px;
  border-radius: 30px;
  padding: 10px;
  background: #eee;
}

.com_lists .com_rank.spec {
  background: #ffc107;
  color: #fff;
  border-radius: 30px;
  padding: 10px;
}

.com_lists .com_rank.spec_0 {
  background: #fe7100;
}
.com_lists .com_rank.spec_1 {
  background: #ff9900;
}
</style>


