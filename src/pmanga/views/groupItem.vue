<template>
  <!-- more comic -->
  <div class="groupItem">
    <div class="push_column">
      <div
        class="scroll_tab"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isScroll"
        infinite-scroll-distance="20"
      >
        <!-- <listMore :autoImg="this.$config.autoImg.column" :boxList="bookList" /> -->
        <listModule
          :autoImg="this.$config.autoImg.column"
          :boxList="bookList"
        />
      </div>
      <loading :loadState="loading" />
      <template v-if="!loading">
        <!-- 加载结束后小于12条 -->
        <div v-if="bookList.length < 12" class="prompt_week">
          {{ $t("tips.nomore") }}
        </div>
        <div class="prompt_week" v-else>{{ $t("tips.end") }}</div>
      </template>
    </div>
  </div>
</template>

<script>
const listModule = () => import("../components/module/listModule");
// const listMore = () => import("./module/listMore");
export default {
  data() {
    return {
      groupId: null,
      isScroll: false, //是否停止滚动
      loadState: false, //接口请求状态
      loading: true, //loading效果
      page: {
        offset: 0,
        limit: 12,
        total: 0
      },
      bookList: []
    };
  },
  components: {
    listModule
    // listMore
  },
  //离开时关闭滚动
  beforeRouteLeave(to, from, next) {
    this.isScroll = true;
    next();
  },
  created() {},
  mounted() {
    //console.log("mounted");
    this.def();
  },
  activated() {
    var param = this.$route.params;
    if (this.groupId != param.id) {
      this.def();
      this.bookList = [];
      this.resetPage();
      this.getBook();
      console.log("update");
    } else {
      this.$bus.$emit("navBar", this.type); //切换header状态
    }
    this.isScroll = false;
    // console.log("activated");
  },
  methods: {
    resetPage() {
      this.$set(this.page, "offset", 0);
      this.$set(this.page, "total", 0);
    },
    def() {
      var param = this.$route.params;
      this.groupId = param.id;
      this.type = param.type;
      this.$bus.$emit("navBar", this.type);
    },
    //跳转详情页
    tar_href(id, title) {
      // console.log("跳转详情页");
      this.$router.push({ name: "new_detl", params: { id, title } });
    },
    //加载更多漫画
    loadMore() {
      console.log("滚动");
      this.getBook();
    },
    //加载漫画
    getBook() {
      if (this.loadState) {
        console.log("数据请求中...");
        // this.$toast("please wait...");
        return;
      }
      var opt = Object.assign({}, this.page); //分页参数
      opt.groupId = this.groupId;
      if (this.bookList.length != 0 && this.bookList.length >= opt.total) {
        this.isScroll = true; //禁止滚动
        this.loadState = false;
        this.loading = false;
        return;
      }
      this.loadState = true;
      this.loading = true;
      this.$api
        .getData("getMore", opt)
        .then(res => {
          if (res.code == 1) {
            var data = res.data;
            if (this.bookList.length == 0) {
              this.$set(this, "bookList", data.list);
              // 首次请求小于12关闭滚动
              if (data.list.length < 12) {
                // console.log("暂无更多数据");
                this.isScroll = true;
                this.loading = false;
              }
            } else {
              // console.log("拼接");
              if (this.bookList.length < data.total) {
                this.bookList = this.bookList.concat(data.list);
              }
            }
            //更新分页参数
            this.$set(this, "page", {
              limit: 12,
              offset: data.offset + data.limit,
              total: data.total
            });
          } else {
            this.isScroll = true; //停止滚动
            this.loading = false;
          }
          this.loadState = false;
        })
        .catch(err => {
          // console.log(err);
          this.isScroll = true;
          this.loading = false;
          this.loadState = false;
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.push_column
  padding 10px
</style>
