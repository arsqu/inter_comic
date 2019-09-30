<template>
  <!-- lock.png -->
  <div class="chapterList">
    <span class="prompt_txt" v-if="catalogue.length == 0">{{$t('detl.emptyChapter')}}</span>
    <template v-else>
      <ul class="book_item">
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
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    catalogue: Array,
    bookList: Object
  },
  mounted() {
    // this.$bus.$emit("recharge", 1);
  },
  methods: {
    book_view(opt, idx) {
      var id = opt.id;
      //1付费 0免费
      if (opt.is_free) {
        this.$bus.$emit("comic", {
          bookId: this.bookList.id,
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
        this.$bus.$emit("recharge", 1);
        return;
      }
      localStorage.setItem("bookId", this.bookList.id);
      this.$router.push({
        name: "view",
        params: { bookId: this.bookList.id, id }
      });
      // console.log("查看图书");
    }
  }
};
</script>

<style lang="stylus" scoped>
.prompt_txt 
  text-align center
  display block
  font-size 16px
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
          background #fff url(/static/img/icon/lock.png)
          width 40px
          height 40px
          display block
          z-index 11
          background-size 100%
          position absolute
          right 0px
          bottom -5px
          border-radius 50%
    .cont_num 
      font-size 30px
    .cont_money 
      color #ffa500
</style>


