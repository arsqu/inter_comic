<template>
  <div class="list_module">
    <template v-if="boxList">
      <template v-if="boxList.length > 0">
        <div
          class="com_lists"
          v-for="(item, idx) in boxList"
          :key="idx"
          @click="tar_detail(item.id, item.title)"
        >
          <div class="com_img">
            <img
              v-lazy="
                item.show_img
                  ? item.show_img + '?' + autoImg
                  : item.showImg
                  ? item.showImg + '?' + autoImg
                  : ''
              "
              :key="item.show_img"
            />
          </div>
          <div class="com_desc">
            <p class="com_tit">{{ item.title }}</p>
            <p class="com_tit com_week">
              <!-- {{$t('show.week')}} {{$t('index.date')[item.week_no-1]}} {{$t('show.update')}} -->
              {{ $t("show.case") }} {{ $t("index.date")[item.week_no - 1] }}
              {{ $t("show.update") }}
            </p>
            <p class="com_tit">{{ item.info }}</p>
          </div>
          <div
            :class="['com_rank', idx <= 2 ? 'spec spec_' + idx : '']"
            v-show="rankState"
          >
            <template v-if="idx > 2">{{
              idx + 1 > 9 ? idx + 1 : "0" + (idx + 1)
            }}</template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "app-list",
  data() {
    return {};
  },
  props: {
    boxList: Array,
    autoImg: String,
    rankState: Boolean
  },
  activated() {},
  created() {},
  mounted() {},
  methods: {
    loadMore() {
      console.log("测试滚动");
    },
    //跳转详情页
    tar_detail(id, title) {
      this.$router.push({ name: "new_detl", params: { id, title } });
      var loginUrl = this.$util.replaceUrl("new_detl", [id, title]);
      localStorage.setItem("loginUrl", loginUrl);
    }
  },
  watch: {}
};
</script>

<style>
.com_tit {
  /* ! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer:on */
}
</style>

<style lang="stylus" scoped>
.com_lists
  display flex
  align-items center
  background #fff
  margin 10px 0
  border-bottom 1px solid #eee
  position relative
  .com_img > img
    width 165px
    height 210px
    border 0 none
    border-radius 4px
  .com_desc
    padding 10px 30px
    width auto
    text-align left
    align-items center
    .com_tit
      overflow hidden
      display -webkit-box
      -webkit-line-clamp 2
      word-break break-all
      color #4b566a
      padding 5px 0
      &:first-child
        font-size 32px
        padding-right 35px
        font-weight bold
      &:last-child
        color #a2a2a2
        font-size 30px
    .com_week
      font-size 28px
  .com_rank
    position absolute
    color #999
    z-index 10
    right 10px
    top 10px
    font-size 35px
    padding 10px
    &.spec
      color #fff
      width 60px
      height 80px
      display inline-block
      &.spec_0
        background url('~x/image/icon/rank0.png')no-repeat
        background-size 100%
      &.spec_1
        background url('~x/image/icon/rank1.png')no-repeat
        background-size 100%
      &.spec_2
        background url('~x/image/icon/rank2.png')no-repeat
        background-size 100%
</style>
