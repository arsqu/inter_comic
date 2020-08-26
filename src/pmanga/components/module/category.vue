<template>
  <!-- lock.png -->
  <div class="chapterList">
    <span class="prompt_txt" v-if="catalogue.length == 0">{{
      $t("detl.emptyChapter")
    }}</span>
    <template v-else>
      <ul class="book_item">
        <li
          v-for="(item, idx) in catalogue"
          :class="{ lock: item.is_free }"
          :key="idx"
          @click="book_view(item, idx)"
        >
          <!--     v-lazy="
                item.content
                  ? item.content.split(',')[0] + '?' + $config.autoImg.list
                  : ''
              " -->
          <a href="javascript:;">
            <!-- <img
                :src="require('x/image/icon/chapter.png')"
                :key="idx"
                alt=""
              /> -->
            <!-- </div> -->
            <div class="cont_desc">
              <span class="cont_num"
                >{{ $t("column.chapter") }} {{ item.order_no }}</span
              >
              <span class="cont_date"
                >{{ $t("index.update") }} {{ item.ad && format(item.ad) }}</span
              >
              <span class="cont_lock" v-if="item.is_free || item.hasBuy"></span>
            </div>
          </a>
        </li>
      </ul>
      <!-- <ul class="book_item">
        <li
          v-for="(item,idx) in catalogue"
          :class="{lock:item.is_free}"
          :key="idx"
          @click="book_view(item,idx)"
        >
          <a href="javascript:;">
            <span class="cont_num">{{$t('column.chapter')}} {{item.order_no}}</span>
            <span class="cont_lock" v-if="item.is_free||item.hasBuy"></span>
          </a>
        </li>
      </ul> -->
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoBuy: false
    };
  },
  props: {
    catalogue: Array,
    bookList: Object
  },
  mounted() {
    this.autoBuy = localStorage.getItem("autoBuy") || false;
  },
  methods: {
    format(v) {
      v = v || "";
      if (!v) {
        return;
      }
      var d = new Date(v),
        y = d.getFullYear(),
        M = d.getMonth() + 1,
        d = d.getDay();
      return y + "/" + M + "/" + d;
    },
    book_view(opt, idx) {
      var id = opt.id,
        bookId = this.bookList.id;
      //1付费 0免费
      if (opt.is_free) {
        this.$bus.$emit("comic", {
          bookId,
          chapterId: opt.id,
          chapterIdx: idx,
          title: opt.title,
          orderNo: opt.order_no,
          price: this.bookList.price
        });
        //已登录
        if (localStorage.getItem("isLogin")) {
          this.$bus.$emit("isLogin", 1);
        } else {
          // console.log("isLogin", 0);
          this.$bus.$emit("isLogin", 0);
        }
        //自动购买
        if (this.autoBuy) {
          this.$bus.$emit("recharge", "autoBuy");
        } else {
          this.$bus.$emit("recharge", 1);
        }
        return;
      }
      localStorage.setItem("bookId", bookId);
      this.$router.push({
        // name: "view",
        name: "new_view",
        params: { bookId, id }
      });
      var loginUrl = this.$util.replaceUrl("new_view", [bookId, id]);
      localStorage.setItem("loginUrl", loginUrl);
      // console.log("查看图书");
    }
  }
};
</script>

<style lang="stylus" scoped>
.prompt_txt
  text-align center
  display block
  font-size 28px
.cont_book_list
  .book_item
    display flex
    flex-wrap wrap
    font-size 25px
    li
      width calc(50% - 15px)
      margin 0 7.5px
      margin-bottom 3%
      position relative
      border 1px solid #ddd
      .cont_desc
        width 75%
        text-align left
        display flex
        flex-direction column
        justify-content  center
        padding 20px 0 25px 35px
      a
        width 100%
        border-radius 30px
        text-align center
        cursor pointer
        display flex
        flex-direction row
      &.lock
        .cont_lock
          background #fff url('~x/image/icon/lock.png')
          width 60px
          height 60px
          display block
          z-index 11
          background-size 100%
          position absolute
          right 20px
          top 50%
          margin-top -30px
          border-radius 50%
    .cont_num
      font-size 33px
      font-weight bold
      padding-bottom 20px
    .cont_date
      font-size 28px
      color #cdcdcd
    .cont_money
      color #ffa500
</style>
