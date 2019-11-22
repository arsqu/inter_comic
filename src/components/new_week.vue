<template>
  <!-- 更新列表 -->
  <div class="weekList">
    <!-- tab -->
    <div class="update_time">
      <ul>
        <li
          v-for="(item,idx) in date"
          :key="idx"
          :class="{active:isDay == (idx + 1)}"
          @click="updateTab(idx + 1)"
        >{{item}}</li>
      </ul>
    </div>
    <!-- 展示区 -->
    <div class="update_box">
      <div
        class="push_column scroll_tab"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isScroll"
        infinite-scroll-distance="20"
      >
        <div v-show="isDay == (idx+1)" v-for="(item,idx) in date" :key="idx">
          <listMore :autoImg="autoImg" :boxList="boxT['d'+(idx+1)]" />
        </div>
      </div>
    </div>
    <!-- 提示信息 -->
    <div class="scroll_tips">
      <loading :loadState="loading" />
      <template v-if="!loading">
        <div
          v-if="boxT['d'+isDay]&&boxT['d'+isDay].length == 0"
          class="prompt_week"
        >{{$t('tips.notupdate')}}</div>
        <div v-else class="prompt_week">{{$t('tips.end')}}</div>
      </template>
    </div>
  </div>
</template>

<script>
const listMore = () => import("./module/listMore");
export default {
  data() {
    return {
      autoImg: "",
      cache: [], //缓存
      date: [], //一周
      boxT: {}, //所有列表
      scrollState: {}, //滚动状态
      page: {}, //分页
      isDay: "", //第几天
      loading: true, //接口请求状态
      loadState: false //禁止短时间多次请求
    };
  },
  components: {
    listMore
  },
  created() {
    // console.log("created");
    this.init();
    this.autoImg = this.$config.autoImg.list;
  },
  mounted() {
    // console.log("update_mounted");
    // this.getUpdate();
  },
  activated() {
    console.log("activated");
    this.scrollState["d" + this.isDay] = false;
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to, from);
    this.scrollState["d" + this.isDay] = true; //离开时关闭滚动
    next();
  },
  computed: {
    // 当日滚动状态
    isScroll: function() {
      return this.scrollState["d" + this.isDay];
    }
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    },
    init() {
      this.isDay = new Date().getDay();
      this.isDay = this.isDay || 7;
      this.date = this.$t("index.week");
      this.defData(); // 数据初始化
      // this.loadMore();
    },
    defData() {
      this.date.forEach((res, i) => {
        this.$set(this.boxT, ["d" + (i + 1)], []);
        this.$set(this.scrollState, ["d" + (i + 1)], false);
        this.$set(this.page, ["d" + (i + 1)], {
          offset: 0,
          limit: 12,
          total: 0
        });
      });
    },
    //更新标签选中状态
    updateTab(idx) {
      this.isDay = idx;
      this.getUpdate();
      this.scrollTop();
    },
    loadMore() {
      // console.log("测试滚动");
      this.getUpdate(1);
    },
    //周更新
    getUpdate(isScroll) {
      var cache = this.cache,
        d = this.isDay;
      // console.log("isScroll:", isScroll);
      console.log(this.loading);
      if (cache.indexOf(d) != -1 && !isScroll) {
        this.loading = false;
        //console.log("缓存中存在,则点击不刷新,滚动时刷新");
        return;
      }
      if (this.loadState) {
        console.log("数据请求中...");
        return;
      }
      var key = "d" + d,
        page = this.page[key],
        opt = Object.assign({}, page);
      cache.push(d);
      opt.week = d;
      this.loadState = true;
      this.loading = true;
      this.$api
        .getData("weekList", opt)
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            var data = res.data;
            //首次更新数据
            if (this.boxT[key].length == 0) {
              this.$set(this.boxT, [key], data.list);
            } else {
              if (this.boxT[key].length < data.total) {
                this.boxT[key] = this.boxT[key].concat(data.list);
                console.log("拼接");
              }
            }
            if (data.list.length < 12) {
              this.loading = false;
              this.$set(this.scrollState, [key], true); //停止滚动
              console.log("停止滚动条", this.scrollState[key]);
            }
            //更新分页参数
            this.$set(this.page, [key], {
              limit: 12,
              offset: data.offset + data.limit,
              total: data.total
            });
          } else {
            this.$set(this.scrollState, [key], true); //停止滚动
            this.loading = false;
          }
          this.loadState = false; //请求结束
        })
        .catch(err => {
          this.loadState = false;
          this.loading = false;
          this.$set(this.scrollState, [key], true);
          // console.log("server error");
          // console.log("关闭滚动");
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.weekList
  padding 10px
.update_time
  background #fff
  width 100%
  position fixed
  top 100px
  z-index 10
  ul
    display flex
    font-size 30px
    color #999
    padding 0 25px
    border-bottom 3px solid #f3f3f3
    li
      position relative
      flex 1
      background #fff
      text-align center
      height 80px
      line-height 80px
    li.active
      background #f7f7f7
      color #ffa500
      font-size 32px
    li.active:after
      content ''
      display block
      border-top 8px solid #ffa500
      position absolute
      bottom -8px
      width 100%
.update_box
  padding-top 85px
</style>


