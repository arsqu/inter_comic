<template>
  <div class="list_module">
    <template v-if="boxList && boxList.length > 0">
      <ul class="book_list">
        <li
          class="book_detl"
          v-for="(detl, idx) in boxList"
          :key="idx"
          @click="tar_href(detl.id, detl.title)"
        >
          <div class="book_pto">
            <img v-lazy="detl.show_img + '?' + autoImg" alt />
          </div>
          <div class="book_desc">
            <span class="book_txt over_ellipsis">{{ detl.title }}</span>
            <span class="book_update"
              >{{ $t("show.case") }} {{ $t("index.week")[detl.week_no - 1] }}
              {{ $t("show.update") }}</span
            >
          </div>
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
    boxList: Array,
    autoImg: String
  },
  activated() {},
  created() {
    // console.log("listMore_created");
  },
  mounted() {
    // console.log(this.boxList);
  },
  methods: {
    //跳转详情页
    tar_href(id, title) {
      // console.log("跳转详情页");
      var loginUrl = this.$util.replaceUrl("new_detl", [id, title]);
      localStorage.setItem("loginUrl", loginUrl);
      this.$router.push({ name: "new_detl", params: { id, title } });
    }
  }
};
</script>

<style lang="stylus" scoped>
.push_column
  .book_list
    display flex
    flex-wrap wrap
    .book_detl
      width 33.3%
      box-sizing border-box
      padding 10px 10px
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
          // border-radius 10px
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
</style>
