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
        <!-- :infinite-scroll-disabled="loading" -->
        <!-- infinite-scroll-immediate-check="false" -->
        <div class="update_list" v-show="isDay == (idx+1)" v-for="(item,idx) in date" :key="idx">
          <app-list :boxList="boxT['d'+(idx+1)]" :rankState="false" />
        </div>
      </div>
    </div>
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
      abc: 0,
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
  },
  mounted() {
    // console.log("update_mounted");
    // this.getUpdate();
  },
  activated() {
    console.log("activated");
    this.scrollState["d" + this.isDay] = false;
    this.sendMsg("navBar", this.$t("index.updateHead"));
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to, from);
    this.scrollState["d" + this.isDay] = true;
    next();
  },
  computed: {
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
      this.date = this.$t("index.week");
      this.defData(); // 初始化时间
      this.sendMsg("navBar", this.$t("index.updateHead"));
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
    sendMsg(key, data) {
      //组件通信
      this.$bus.$emit(key, data);
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
      //点击tab查看时走缓存
      if (cache.indexOf(d) != -1 && !isScroll) {
        return;
      }
      //数据加载中
      if (this.loadState) {
        // console.log("异步请求中...禁止操作");
        return;
      }
      cache.push(d);
      var page = this.page["d" + d], //分页参数
        opt = Object.assign({}, page);
      opt.week = d;
      this.loadState = true;
      var key = "d" + d;
      this.$api
        .getData("weekList", opt)
        .then(res => {
          // console.log(res);
          //请求成功时
          if (res.code == 1) {
            var data = res.data;
            if (this.boxT[key].length == 0) {
              this.$set(this.boxT, [key], data.list);
            } else {
              //数组变化时更新
              if (this.boxT["d" + d].length < data.total) {
                this.boxT[key] = this.boxT[key].concat(data.list);
              } else {
                //内容超出停止滚动
                this.$set(this.scrollState, [key], true); //停止滚动
                this.loadState = false;
                return;
              }
              // console.log(page);
            }
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
          this.loadState = false;
          this.$set(this.scrollState, [key], true);
          console.log(err);
          console.log("server error");
          // console.log("关闭滚动");
        });
    }
  }
};
</script>

<style scoped>
.update_time {
  background: #fff;
  width: 100%;
  position: fixed;
  top: 100px;
  z-index: 10;
}

.update_box {
  padding-top: 80px;
}

.update_time > ul {
  display: flex;
  font-size: 30px;
  color: #999;
  padding: 0 25px;
  border-bottom: 3px solid #f3f3f3;
}

.update_time li {
  position: relative;
  flex: 1;
  background: #fff;
  text-align: center;
  height: 80px;
  line-height: 80px;
}

.update_time li.active {
  background: #f7f7f7;
  color: #ffa500;
  font-size: 32px;
}

.update_time li.active:after {
  content: "";
  display: block;
  border-top: 3px solid #ffa500;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.update_list {
  padding: 10px;
  /* background: #f3f3f3; */
}
</style>


