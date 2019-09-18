<template>
  <div class="rankingList">
    <div class="ranking_type">
      <div class="rank_item">
        <template v-for="(item,key) in group">
          <template v-for="(detl,i) in item">
            <!-- <div :key="idx+i">{{key+i}}</div> -->
            <span
              :class="{active:isHover[0]+ isHover[1] == key+i}"
              v-if="detl"
              @click="rankBook(key,i)"
              :key="key+i"
            >{{detl}}</span>
          </template>
        </template>
      </div>
    </div>
    <div class="ranking_detl">
      <!-- infinite-scroll-immediate-check="false" -->
      <div
        class="scroll_tab"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isScroll"
        infinite-scroll-distance="15"
      >
        <template v-for="(item,key) in group">
          <template v-for="(detl,i) in item">
            <div
              class="update_list"
              v-if="detl"
              v-show="isHover[0]+ isHover[1] == key+i"
              :key="key+i"
            >
              <!-- rankState为排序序号 -->
              <app-list :boxList="boxT[key+i]" :rankState="true" />
            </div>
          </template>
        </template>
      </div>
      <div class="scroll_tips">
        <loading :loadState="loadState" />
        <template v-if="!loadState">
          <div
            v-if="boxT[isHover[0]+isHover[1]]&&boxT[isHover[0]+isHover[1]].length == 0"
            class="prompt_week"
          >{{$t('tips.notHave')}}</div>
          <div v-else class="prompt_week">{{$t('tips.end')}}</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
const listModule = () => import("./module/listModule");
export default {
  data() {
    return {
      // isScroll: false,
      group: {
        flag: [],
        isOver: [],
        payTyp: []
      },
      cache: [], //缓存
      boxT: {}, //排行数据存放区
      scrollState: {}, //滚动状态
      page: {}, //分页
      isHover: "", //当前点击项
      loadState: false //加载状态
    };
  },
  components: {
    "app-list": listModule
  },
  created() {
    this.init();
    // console.log("rank_created");
  },
  mounted() {
    // console.log($t);
    // this.isHover = ["flag", "1"]; //默认选中第一条
    // this.init();
    // console.log("rank_mounted");
  },
  activated() {
    console.log("activated");
    this.scrollState[this.isHover.join("")] = false;
    this.sendMsg("navBar", this.$t("index.updateHead"));
  },
  beforeRouteLeave(to, from, next) {
    this.scrollState[this.isHover.join("")] = true;
    next();
  },
  computed: {
    isScroll: function() {
      return this.scrollState[this.isHover.join("")];
    }
  },
  methods: {
    init() {
      this.isHover = ["flag", "1"]; //默认选中第一条
      this.group = {
        flag: this.$t("index.rankList.flag"),
        isOver: this.$t("index.rankList.isOver"),
        payTyp: this.$t("index.rankList.payTyp")
      };
      this.defData(); //数据初始化
      this.sendMsg("navBar", this.$t("index.rankHead"));
      // this.loadMore();
    },
    //初始值
    defData() {
      for (var k in this.group) {
        this.group[k].forEach((res, idx) => {
          if (res) {
            this.$set(this.boxT, [k + idx], []);
            this.$set(this.scrollState, [k + idx], false);
            this.$set(this.page, [k + idx], {
              offset: 0,
              limit: 10,
              total: 0
            });
          }
        });
      }
    },
    //组件通信
    sendMsg(key, data) {
      this.$bus.$emit(key, data);
    },
    //选择标签
    rankBook(key, i) {
      //console.log(item);
      this.isHover = [key, i];
      //判断是否已请求
      this.getRank();
    },
    loadMore() {
      // console.log("测试滚动");
      this.getRank(1);
    },
    //获取排行
    getRank(isScroll) {
      var state = this.isHover,
        k = state[0],
        idx = state[1],
        key = k + idx;
      var cache = this.cache,
        group = this.group;
      //缓存记录
      if (!isScroll && cache.indexOf(key) != -1) {
        return;
      }
      if (this.loadState) {
        console.log("异步请求中...禁止操作");
        return;
      }
      cache.push(k + idx);
      // console.log(cache);
      var page = this.page[key],
        opt = Object.assign({}, page);
      opt[k] = idx;
      this.loadState = true; //loading加载效果
      // console.log("请求数据");
      this.$api
        .getCusRank(k, opt)
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            var data = res.data;
            if (this.boxT[key].length == 0) {
              this.$set(this.boxT, [key], data.list);
            } else {
              if (this.boxT[key].length < data.total) {
                this.boxT[key] = this.boxT[key].concat(data.list);
              } else {
                this.$set(this.scrollState, [key], true);
                this.loadState = false;
                return;
              }
            }
            this.$set(this.page, [key], {
              limit: 10,
              offset: data.offset + data.limit,
              total: data.total
            });
          } else {
            this.$set(this.scrollState, [key], true); //停止滚动
          }
          this.loadState = false;
          // console.log(this.boxT, page);
        })
        .catch(err => {
          this.loadState = false;
          this.$set(this.scrollState, [key], true);
          console.log(err);
          console.log("server error");
          // console.log("关闭滚动");
        });
      // //测试mock
      // this.$axios.post("/test/ranking", page).then(res => {
      //   // console.log(page);
      //   if (res.status == 200) {
      //     var data = res.data;
      //     data = data.data ? data.data : data;
      //     if (this.boxT[key].length == 0) {
      //       this.$set(this.boxT, [key], data);
      //     } else {
      //       this.boxT[key] = this.boxT[key].concat(data);
      //     }
      //     ++page.idx;
      //     this.$set(this.page, [key], {
      //       idx: page.idx,
      //       limit: 10,
      //       offset: 10 * page.idx,
      //       total: 0
      //     });
      //     this.loadState = false;
      //   }
      // });
    }
  }
};
</script>

<style scoped>
.ranking_type {
  background: #fff;
}

.ranking_detl {
  padding: 20px;
}

.ranking_type .rank_item {
  font-size: 30px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 30px;
}

.ranking_type .rank_item span {
  width: 33.3%;
  text-align: center;
  margin: 15px 0;
  border-right: 1px solid #ddd;
}

.ranking_type .rank_item span.active {
  color: orange;
}

.ranking_type .rank_item span:nth-child(3n) {
  border-right: 0 none;
}
</style>


