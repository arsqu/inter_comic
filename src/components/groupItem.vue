<template>
  <!-- more comic -->
  <div class="groupItem">
    <!--  :key="Math.random()" -->
    <div class="push_column">
      <!-- 滚动加载 -->
      <ul
        class="book_list scroll_tab"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isScroll"
        infinite-scroll-distance="15"
      >
        <template v-if="bookList.length>0">
          <li
            class="book_detl"
            v-for="(detl,idx) in bookList"
            :key="idx"
            @click="tar_href(detl.id,detl.title)"
          >
            <div class="book_pto">
              <img v-lazy="detl.show_img+'?'+autoImg" alt />
            </div>
            <div class="book_desc">
              <span class="book_txt over_ellipsis">{{detl.title}}</span>
              <span
                class="book_update"
              >{{$t('show.case')}} {{$t('index.week')[detl.week_no-1]}} {{$t('show.update')}}</span>
            </div>
          </li>
        </template>
      </ul>
      <loading :loadState="loadState" />
      <template v-if="!loadState">
        <!-- 加载结束后小于9条 -->
        <template v-if="bookList.length<9">
          <div class="prompt_txt">{{$t('tips.nomore')}}</div>
        </template>
        <div class="prompt_txt" v-else>{{$t('tips.end')}}</div>
      </template>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      autoImg: "",
      groupId: null,
      isScroll: false, //是否停止滚动
      loadState: false, //加载状态
      page: {
        offset: 0,
        limit: 10,
        total: 0
      },
      bookList: []
    };
  },
  activated() {
    var param = this.$route.params;
    if (this.groupId != param.id) {
      this.def();
      this.bookList = [];
      this.isScroll = false;
      this.resetPage();
      this.getBook();
      console.log("update");
    } else {
      this.$bus.$emit("navBar", this.type); //切换header状态
    }
    // console.log("activated");
  },
  created() {
    this.autoImg = this.$config.autoImg.column;
  },
  mounted() {
    // console.log("mounted");
    this.def();
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
      // console.log("滚动");
      this.getBook();
    },
    //加载漫画
    getBook() {
      if (this.loadState) {
        // console.log("操作太频繁");
        // this.$toast("please wait...");
        return;
      }
      var opt = Object.assign({}, this.page); //分页参数
      opt.groupId = this.groupId;
      this.loadState = true;
      if (this.bookList.length != 0 && this.bookList.length >= opt.total) {
        this.isScroll = true;
        this.loadState = false;
        return;
      }
      this.$api
        .getData("getMore", opt)
        .then(res => {
          if (res.code == 1) {
            var data = res.data;
            if (this.bookList.length == 0) {
              this.$set(this, "bookList", data.list);
              //首次请求小于10关闭滚动
              if (data.list.length < 10) {
                console.log("暂无更多数据");
                this.isScroll = true;
                this.loadState = false;
                return;
              }
            } else {
              // console.log("拼接");
              if (this.bookList.length < data.total) {
                this.bookList = this.bookList.concat(data.list);
              }
              // else {
              //   console.log("ajax停止滚动");
              //   this.isScroll = true; //停止滚动
              //   this.loadState = false;
              //   return;
              // }
            }
            //更新分页参数
            this.$set(this, "page", {
              limit: 10,
              offset: data.offset + data.limit,
              total: data.total
            });
          } else {
            this.isScroll = true; //停止滚动
          }
          this.loadState = false;
        })
        .catch(err => {
          // console.log(err);
          this.isScroll = true;
          this.loadState = false;
        });
      //Mock测试数据
      // this.$axios.post("/test/comicMore").then(res => {
      //   var data = res.data;
      //   data = data.data ? data.data : data;
      //   if (this.bookList.length == 0) {
      //     this.bookList = data;
      //   } else {
      //     this.bookList = this.bookList.concat(data);
      //   }
      //   var page = this.page;
      //   this.$set(page, "idx", ++page.idx);
      //   this.$set(page, "offset", page.idx * page.limit);
      //   this.loadState = false;
      //   // console.log(page);
      // });
    }
  },
  watch: {
    $route: {
      //监听当前路由下的变化
      handler(to, from) {
        // console.log(to, from);
        //跳转详情页的laoding效果
        if (to.name == "new_detl") {
          this.$bus.$emit("loading", true); //loading加载效果
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="stylus" scoped>
.push_column 
  font-size 30px
  padding 15px
  background #fff
  .book_list 
    display flex
    flex-wrap wrap
    .book_detl 
      width 33.3%
      box-sizing border-box
      padding 15px 10px
      cursor pointer
      .book_pto 
        position relative
        width 100%
        margin-bottom 5px
        padding-bottom 133%
        img 
          position absolute
          height 100%
          width 100%
          border-radius 10px
      .book_txt 
        display block
        font-size 28px
        padding 0 5px
        color #252525
        letter-spacing 0
        font-weight bold
        text-align center
      .book_update 
        display block
        font-size 26px
        padding 0 5px
        color #777
        text-align center
  .prompt_txt 
    color #555
    font-size 0.373333rem
    padding 0.266667rem
    text-align center


</style>
