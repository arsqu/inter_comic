<template>
  <div class="push_column">
    <!-- 搜索框 -->
    <div class="s_group" @keyup.13="searchVal">
      <div class="s_inp">
        <input class="s_key" type="text" :placeholder="$t('search.txt')" v-model="val" />
      </div>
      <span class="s_txt" @click="searchVal">{{txt}}</span>
    </div>
    <!-- 搜索结果 -->
    <div class="s_total" v-show="isShow">
      <ul>
        <li>
          {{txt}} :
          <span class="active s_words">{{keyword}}</span>
        </li>
        <li>
          {{$t('search.total')}} :
          <span class="active s_num">{{page.countAll}}</span>
        </li>
      </ul>
    </div>
    <!-- 搜索列表 -->
    <div class="push_column">
      <ul
        class="book_list scroll_tab"
        v-infinite-scroll="loadMore"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="isScroll"
        infinite-scroll-distance="20"
      >
        <template v-if="bookList.length>0">
          <listModule :autoImg="this.$config.autoImg.list" :boxList="bookList" :rankState="false" />
        </template>
      </ul>
      <loading :loadState="loading" />
      <!-- 加载结束后小于9条 -->
      <template v-if="!loading&&isShow">
        <div v-if="bookList.length<9" class="prompt_week">{{$t('tips.nomore')}}</div>
        <div class="prompt_week" v-else>{{$t('tips.end')}}</div>
      </template>
    </div>
  </div>
</template>

<script>
const listModule = () => import("./module/listModule");
export default {
  data() {
    return {
      keyword: "", //搜索关键词
      val: "", //查询数值
      txt: "", //translate
      isScroll: false,
      isShow: false, //搜索结果信息
      loadState: false,
      loading: false,
      page: {
        page: 1,
        count: 10,
        countAll: 0
      },
      bookList: []
    };
  },
  components: {
    listModule
  },
  beforeRouteLeave(to, from, next) {
    this.isScroll = true;
    next();
  },
  created() {},
  mounted() {
    this.txt = this.$t("search.search");
  },
  activated() {
    this.isScroll = false;
  },
  methods: {
    loadMore() {
      // console.log("滚动");
      this.getUpdate();
    },
    //搜索数据
    searchVal() {
      var val = this.val;
      if (this.val.length > 100) {
        this.val = "";
        // console.log(this.$t("search.tips.tolong"));
        this.$toast(this.$t("search.tips.tolong"));
        return;
      }
      if (val && val != this.keyword) {
        this.keyword = val;
        this.getUpdate(1);
      }
    },
    //更新数据
    getUpdate(key) {
      // this.$api.getSearch(this.val)
      if (this.loadState) {
        console.log("数据请求中...");
        // this.$toast("please wait...");
        return;
      }
      //每次查询将起始页置为1
      if (key) {
        this.$set(this.page, "page", 1);
        this.isScroll = false;
      }
      var opt = Object.assign(
        {},
        {
          page: this.page.page,
          count: this.page.count
        }
      ); //分页参数
      opt.text = this.val;
      opt.cid = 1;
      this.loadState = true;
      this.loading = true;
      this.$api
        .getDataN("search.get", opt)
        .then(res => {
          this.isShow = true;
          if (res.code == 1) {
            var page = res.page,
              data = res.data;
            //每次查询都重置参数
            if (key) {
              this.$set(this, "bookList", data);
            } else {
              if (this.bookList.length < page.countAll) {
                this.bookList = this.bookList.concat(data);
              }
            }
            console.log(data);
            // 首次请求小于10关闭滚动
            if (data.length < 10) {
              console.log("暂无更多数据");
              this.isScroll = true;
              this.loading = false;
            }
            // console.log("拼接");
            //更新分页参数
            this.$set(this, "page", {
              count: 10,
              page: ++page.page,
              countAll: page.countAll
            });
          } else {
            this.isScroll = true; //停止滚动
            this.loading = false;
          }
          this.loadState = false;
        })
        .catch(err => {
          this.isScroll = true;
          this.loading = false;
          this.loadState = false;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
/*重置*/
.push_column
  font-size 30px
  padding 10px
  background #fff
.s_group
  margin 10px 30px
  display flex
  .s_inp
    border-radius 30px
    height 70px
    flex 1
    line-height 70px
    background #f1f1f1
    padding-left 35px
    color #666
    .s_key
      border 0 none
      outline 0 none
      height 100%
      width 100%
      vertical-align top
      background transparent
  .s_txt
    font-size 30px
    height 70px
    color #666
    line-height 70px
    text-align center
    margin-left 20px
.s_total
  font-size 28px
  color #666
  padding 25px 30px
  border-bottom 1px solid #ddd
  ul
    display flex
    li:first-child
      flex 1
.active
  color orange
</style>


