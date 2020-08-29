<template>
  <div class="rankingList">
    <!-- <div class="ranking_type">
      <div class="rank_item">
        <template v-for="(item, key) in group">
          <template v-for="(detl, i) in item">
            <span
              :class="{ active: isHover[0] + isHover[1] == key + i }"
              v-if="detl"
              @click="rankBook(key, i)"
              :key="key + i"
              >{{ detl }}</span
            >
          </template>
        </template>
      </div>
    </div> -->
    <div class="ranking_detl">
      <div
        class="scroll_tab"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isScroll"
        infinite-scroll-distance="15"
      >
        <template v-for="(item, key) in group">
          <template v-for="(detl, i) in item">
            <div
              class="update_list"
              v-if="detl"
              v-show="isHover[0] + isHover[1] == key + i"
              :key="key + i"
            >
              <!-- rankState:排序时是否显示序号 -->
              <listModule
                :autoImg="autoImg"
                :boxList="boxT[key + i]"
                :rankState="false"
              />
            </div>
          </template>
        </template>
      </div>
      <div class="scroll_tips">
        <loading
          :loadState="loading"
          :type="'double-bounce'"
          :color="'#26a2ff'"
        />
        <template v-if="!loading">
          <div
            v-if="
              boxT[isHover[0] + isHover[1]] &&
                boxT[isHover[0] + isHover[1]].length == 0
            "
            class="prompt_week"
          >
            {{ $t("tips.notHave") }}
          </div>
          <div v-else class="prompt_week">{{ $t("tips.nomore") }}</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
const listModule = () => import("../components/module/listModule");
export default {
  data() {
    return {
      group: {
        // flag: [],
        // isOver: [],
        payTyp: []
      },
      autoImg: "",
      cache: [], //缓存
      boxT: {}, //排行数据
      scrollState: {}, //滚动状态
      page: {},
      isHover: "", //当前点击项
      loadState: false,
      loading: true //接口请求状态
    };
  },
  components: {
    listModule
  },
  created() {
    this.init();
    this.autoImg = this.$config.autoImg.list;
    // console.log("rank_created");
  },
  mounted() {
    // console.log("rank_mounted");
  },
  activated() {
    console.log("activated");
    this.scrollState[this.isHover.join("")] = false;
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
      this.isHover = ["payTyp", "2"]; //默认选中
      //翻译后的文本数据
      this.group = {
        // flag: this.$t("index.rankList.flag"),
        // isOver: this.$t("index.rankList.isOver"),
        payTyp: [this.$t("index.rankList.payTyp")[1]]
      };
      this.defData(); //数据初始化
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
    //选择标签
    rankBook(key, i) {
      console.log(key, i);
      this.isHover = [key, i];
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
      // console.log(this.loading);
      //缓存记录
      if (cache.indexOf(key) != -1 && !isScroll) {
        // console.log("点击tab时有缓存不更新数据");
        this.loading = false;
        return;
      }
      if (this.loadState) {
        console.log("数据请求中...");
        return;
      }
      cache.push(key);
      var page = this.page[key],
        opt = Object.assign({}, page);
      opt[k] = idx; //查询参数
      this.loading = true;
      this.loadState = true;
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
              }
            }
            if (data.list.length < 10) {
              console.log("暂无更多数据");
              this.$set(this.scrollState, [key], true);
              this.loading = false;
            }
            this.$set(this.page, [key], {
              limit: 10,
              offset: data.offset + data.limit,
              total: data.total
            });
          } else {
            this.$set(this.scrollState, [key], true); //停止滚动
            this.loading = false;
          }
          this.loadState = false;
          // console.log(this.boxT, page);
        })
        .catch(err => {
          this.loading = false;
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

<style lang="stylus" scoped>
.ranking_type
  background #fff
.ranking_detl
  padding 15px
.ranking_type .rank_item
  display flex
  flex-wrap wrap
  justify-content space-around
  font-size 30px
  margin 0 20px
  color #333
  border-bottom 2px solid #cdcdcd
  span
    width calc(33.3% - 15px)
    text-align center
    padding 15px 0
    margin-bottom -2px
    color #333333
    &.active
      border-bottom 5px solid #f29b18
</style>
