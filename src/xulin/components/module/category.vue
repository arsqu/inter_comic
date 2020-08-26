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
          <a href="javascript:;">
            <span class="cont_num"
              >{{ $t("column.chapter") }} {{ item.order_no }}</span
            >
            <span class="cont_lock" v-if="item.is_free || item.hasBuy"></span>
          </a>
        </li>
      </ul>
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
      height 55px
      line-height 55px
      width 33.3%
      margin-bottom 3%
      padding 0 15px
      position relative
      a
        width 100%
        border 2px solid #ccc
        border-radius 30px
        text-align center
        cursor pointer
        display inline-block
      &.lock
        .cont_lock
          background #fff url('~x/image/icon/lock.png')
          width 40px
          height 40px
          display block
          z-index 11
          background-size 100%
          position absolute
          right 0
          bottom -5px
          border-radius 50%
    .cont_num
      font-size 30px
    .cont_money
      color #ffa500
</style>
