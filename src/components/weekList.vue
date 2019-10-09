<template>
  <!-- 更新列表 -->
  <div class="weekList">
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
    <div class="update_box">
      <div
        class="scroll_tab"
        infinite-scroll-distance="15"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isScroll"
      >
        <div class="update_list" v-show="isDay == (idx+1)" v-for="(item,idx) in date" :key="idx">
          <app-list :autoImg="autoImg" :boxList="boxT['d'+(idx+1)]" :rankState="false" />
        </div>
      </div>
    </div>
    <!-- 提示信息 -->
    <div class="scroll_tips">
      <loading :loadState="loadState" />
      <template v-if="!loadState">
        <div
          v-if="boxT['d'+isDay]&&boxT['d'+isDay].length == 0"
          class="prompt_week"
        >{{$t('tips.notupdate')}}</div>
        <div v-else-if="isScroll" class="prompt_week">{{$t('tips.end')}}</div>
      </template>
    </div>
  </div>
</template>

<script>
const listModule = () => import("./module/listModule");
import Qs from "qs";
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
      loadState: false //接口请求状态
    };
  },
  components: {
    "app-list": listModule
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
    this.$bus.$emit("navBar", this.$t("index.updateHead"));
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
      this.$bus.$emit("navBar", this.$t("index.updateHead"));
      // this.loadMore();
    },
    defData() {
      this.date.forEach((res, i) => {
        this.$set(this.boxT, ["d" + (i + 1)], []);
        this.$set(this.scrollState, ["d" + (i + 1)], false);
        this.$set(this.page, ["d" + (i + 1)], {
          offset: 0,
          limit: 10,
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
    //关闭滚动
    closeScroll() {},
    //周更新
    getUpdate(isScroll) {
      var cache = this.cache,
        d = this.isDay;
      // console.log("isScroll:", isScroll);
      if (cache.indexOf(d) != -1 && !isScroll) {
        //console.log("缓存中存在,则点击不刷新,滚动时刷新");
        return;
      }
      //数据加载中
      if (this.loadState) {
        // console.log("请勿频繁操作");
        return;
      }
      var key = "d" + d,
        page = this.page[key],
        opt = Object.assign({}, page);
      if (this.boxT[key].length != 0 && this.boxT[key].length >= page.total) {
        this.$set(this.scrollState, [key], true); //停止滚动
        this.loadState = false;
        return;
      }
      cache.push(d);
      opt.week = d;
      this.loadState = true;
      this.$api
        .getData("weekList", opt)
        .then(res => {
          // console.log(res);
          //请求成功时
          if (res.code == 1) {
            var data = res.data;
            //首次更新数据
            if (this.boxT[key].length == 0) {
              this.$set(this.boxT, [key], data.list);
            } else {
              console.log("拼接");
              if (this.boxT["d" + d].length < data.total) {
                this.boxT[key] = this.boxT[key].concat(data.list);
              }
              // console.log(page);
            }
            //更新分页参数
            this.$set(this.page, [key], {
              limit: 10,
              offset: data.offset + data.limit,
              total: data.total
            });
          } else {
            // console.log("关闭滚动");
            this.$set(this.scrollState, [key], true); //停止滚动
            // console.log(this.scrollState);
          }
          this.loadState = false;
        })
        .catch(err => {
          this.$set(this.scrollState, [key], true);
          this.loadState = false;
          // console.log("server error");
          // console.log("关闭滚动");
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
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
      border-top 3px solid #ffa500
      position absolute
      bottom 0
      width 100%
.update_box
  padding-top 80px
  .update_list
    padding 10px
</style>


