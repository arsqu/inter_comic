<template>
  <!-- $route.params.type -->
  <!-- more comic -->
  <div class="groupItem" :key="Math.random()">
    <!-- 列表模板 -->
    <div class="push_column">
      <!-- 滚动加载 -->
      <ul
        class="book_list scroll_tab"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isScroll"
        infinite-scroll-distance="15"
      >
        <!-- infinite-scroll-immediate-check="true" -->
        <template v-if="bookList.length>0">
          <li
            class="book_detl"
            v-for="(detl,idx) in bookList"
            :key="idx"
            @click="tar_href(detl.id,detl.title)"
          >
            <div class="book_pto">
              <img v-lazy="detl.show_img" alt />
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
      // check: false,
      groupId: null,
      check: true,
      isScroll: false, //是否停止滚动
      loadState: false, //加载状态
      isUpdate: true, //是否更新
      page: {
        offset: 0,
        limit: 10,
        total: 0
      },
      bookList: []
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log(from, to);
  //   this.$route.meta.keepAlive = true;
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   this.$route.meta.keepAlive = true;
  //   next();
  // },
  activated() {
    var param = this.$route.params;
    this.isUpdate = false;
    // console.log("groupId", this.groupId);
    // console.log("paramId", param.id);
    if (this.groupId != param.id) {
      this.def();
      this.init();
      this.isScroll = false;
      this.isUpdate = true;
      // this.loadMore();
      console.log("update");
    } else {
      this.sendMsg("navBar", this.type); //切换header状态
    }
    // console.log("activated");
  },
  mounted() {
    // console.log("mounted");
    this.def();
    this.init();
  },
  methods: {
    def() {
      var param = this.$route.params;
      this.groupId = param.id;
      this.type = param.type;
      this.sendMsg("navBar", this.type);
      // console.log(this.bookList);
    },
    init() {
      this.getBook();
    },
    //组件通信
    sendMsg(key, data) {
      this.$bus.$emit(key, data);
    },
    //跳转详情页
    tar_href(id, title) {
      console.log("跳转详情页");
      this.$router.push({ name: "new_detl", params: { id, title } });
    },
    //加载更多漫画
    loadMore() {
      // console.log("滚动到底部");
      console.log("滚动");
      this.getBook();
    },
    //加载漫画
    getBook() {
      if (this.loadState) {
        // console.log("异步请求中...禁止操作");
        // this.$toast("please wait...");
        return;
      }
      var opt = Object.assign({}, this.page);
      opt.groupId = this.groupId;
      this.loadState = true;
      //测试数据
      // console.log("请求数据");
      this.$api
        .getData("getMore", opt)
        .then(res => {
          console.log(res);
          if (res.code != 0) {
            var data = res.data;
            // console.log(this.bookList, this.bookList.length);
            if (this.bookList.length == 0 || this.isUpdate) {
              // console.log(data.length);
              this.$set(this, "bookList", data.list);
              this.isUpdate = false;
              if (data.list.length < 10) {
                // console.log("暂无更多数据");
                this.isScroll = true;
                this.loadState = false;
                return;
              }
            } else {
              // console.log("拼接");
              this.bookList = this.bookList.concat(data.list);
            }
          } else {
            if (this.isUpdate) this.$set(this, "bookList", []);
            console.log("停止滚动");
            this.isScroll = true; //停止滚动
          }
          this.loadState = false;
        })
        .catch(err => {
          // console.log(err);
          if (this.isUpdate) this.$set(this, "bookList", []);
          this.isScroll = true;
          this.loadState = false;
        });

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
      //api接口
      // this.$api.getGroupItem(opt).then(res => {
      //   if (res.code == 1) {
      //     var data = res.data;
      //     if (data.list && data.list.length > 0) {
      //       this.bookList = data.list;
      //     }
      //   }
      //   this.loadState = false;
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
<style scoped>
.push_column {
  font-size: 30px;
  padding: 15px;
  background: #fff;
}

.book_list {
  display: flex;
  flex-wrap: wrap;
}

.push_column .book_txt {
  display: block;
  font-size: 28px;
  padding: 0 5px;
  color: #252525;
  letter-spacing: 0;
  font-weight: bold;
  text-align: center;
}

.push_column .book_update {
  display: block;
  font-size: 26px;
  padding: 0 5px;
  color: #777;
  text-align: center;
}

.book_detl {
  width: 33.3%;
  box-sizing: border-box;
  padding: 15px 10px;
  cursor: pointer;
}

.book_pto {
  position: relative;
  width: 100%;
  margin-bottom: 5px;
  padding-bottom: 133%;
}

.book_pto img {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 10px;
}

.prompt_txt {
  color: #555;
  font-size: 0.373333rem;
  padding: 0.266667rem;
  text-align: center;
  /* display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
  font-size: 26px;
  color: #666; */
}
</style>
