<template>
  <!-- 列表模板 -->
  <div class="push_box" :key="$route.path">
    <div class="push_column" v-for="(item,idx) in bookList" :key="idx">
      <div class="push_txt">
        <span class="push_title">{{$t('index.module.'+item.GroupName)}}</span>
        <span
          class="push_more"
          @click="loadGroupItem(item.GroupId,item.GroupName)"
        >{{$t('show.more')}}</span>
      </div>
      <div class="push_book">
        <ul class="book_list">
          <template v-if="item.List.length>0">
            <li
              class="book_detl"
              v-for="(detl,idx) in item.List"
              :key="idx"
              @click="tar_href(detl.id,detl.title)"
            >
              <div class="book_pto">
                <img v-lazy="detl.show_img+'?'+autoImg" :key="detl.show_img" alt />
              </div>
              <div class="book_desc">
                <span class="book_txt over_ellipsis">{{detl.title}}</span>
                <!-- <span class="book_update over_ellipsis">{{$t('column.chapter')}} {{detl.week_no}}</span> -->
                <span
                  class="book_update over_ellipsis"
                >{{$t('index.update')}} {{$t('index.week')[detl.week_no]}}</span>
              </div>
            </li>
          </template>
          <div
            class="prompt_txt"
            v-if="item.List.length<6&&item.List.length>=0"
          >{{$t('tips.notHave')}}</div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    bookList: Array,
    autoImg: String
  },
  methods: {
    tar_href(id, title) {
      // console.log("跳转详情页");
      this.$router.push({ name: "new_detl", params: { id, title } });
      var loginUrl = this.$util.replaceUrl("new_detl", [id, title]);
      localStorage.setItem("loginUrl", loginUrl);
    },
    loadGroupItem(id, groupName) {
      this.$router.push({ name: "groupItem", params: { id, type: groupName } });
    }
  }
};
</script>


<style lang="stylus" scoped>
.push_column
  font-size 30px
  padding 25px 10px
  margin-bottom 10px
  background #fff
  .push_more
    cursor pointer
    font-size 28px
    position relative
    padding-right 30px
    font-weight 600
    cursor pointer
    &:after
      width 16px
      height 16px
      border-top 3px solid transparent
      border-right 3px solid transparent
      position absolute
      right 0
      top 50%
      margin-top -8px
      margin-right 8px
      transform rotate(45deg)
      content ''
      display block
  .push_txt
    display flex
    align-items center
    padding 0 10px
    .push_title
      // border-left 5px solid
      border-left-style solid
      border-left-width 5px
      padding 0 15px
      font-size 30px
      font-weight bold
      color #333
      flex 1
  .push_book
    padding-top 20px
    .book_list
      display flex
      flex-wrap wrap
      .book_detl
        width 33.3%
        box-sizing border-box
        cursor pointer
        padding 0 10px
        .book_desc
          margin-bottom 8px
          .book_txt
            display block
            font-size 28px
            color #333
            text-align center
          .book_update
            display block
            font-size 22px
            color #666
            text-align center
        .book_pto
          position relative
          width 100%
          margin-bottom 8px
          padding-bottom 133%
          img
            position absolute
            height 100%
            width 100%
            border-radius 10px
    .prompt_txt
      display flex
      align-items center
      justify-content center
      padding 15px 0
      width 100%
      font-size 30px
      color #666
</style>

