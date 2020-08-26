<template>
  <!-- 列表模板 -->
  <div class="push_box" :key="$route.path">
    <div class="push_column" v-for="(item, idx) in bookList" :key="idx">
      <div :class="['icon_' + item.GroupId, 'push_txt']">
        <span class="push_title">{{
          $t("index.module." + item.GroupName)
        }}</span>
        <!-- <span
          class="push_more"
          @click="loadGroupItem(item.GroupId, item.GroupName)"
          >{{ $t("show.more") }}</span
        > -->
      </div>
      <div class="push_book">
        <ul class="book_list">
          <template v-if="item.List.length > 0">
            <li
              :class="[
                mapRule[item.GroupId].limit
                  ? 'limit' + mapRule[item.GroupId].limit
                  : '',
                'book_detl'
              ]"
              v-for="(detl, bookIdx) in mapRule[item.GroupId].showList"
              :key="bookIdx"
              @click="tar_href(detl.id, detl.title)"
            >
              <!-- v-for="(detl, bookIdx) in item.List" -->
              <!-- v-if="mapRule[item.GroupId].showList" -->
              <!-- v-if="bookIdx < mapRule[item.GroupId].max" -->
              <template>
                <div class="book_pto">
                  <img
                    v-lazy="detl.show_img + '?' + autoImg"
                    :key="detl.show_img"
                    alt
                  />
                </div>
                <div class="book_desc">
                  <span class="book_txt over_ellipsis">{{ detl.title }}</span>
                  <!-- <span class="book_update over_ellipsis">{{$t('column.chapter')}} {{detl.week_no}}</span> -->
                  <span class="book_update over_ellipsis"
                    >{{ $t("index.update") }}
                    {{ $t("index.week")[detl.week_no] }}</span
                  >
                </div>
              </template>
            </li>
          </template>
          <!-- 6条以内时 -->
          <div
            v-if="item.List.length > mapRule[item.GroupId].max"
            class="prompt_txt"
          >
            <div
              class="refresh btn_def"
              @click="
                getMore({
                  id: item.GroupId,
                  idx,
                  max: mapRule[item.GroupId].max
                })
              "
            >
              <img
                class="icon"
                :src="require('x/image/icon/refresh.png')"
                alt=""
              />
              <span>Change batch</span>
            </div>
            <div
              class="loadMore btn_def"
              @click="loadGroupItem(item.GroupId, item.GroupName)"
            >
              <img
                class="icon"
                :src="require('x/image/icon/more.png')"
                alt=""
              />
              <span>Load more...</span>
            </div>
          </div>
          <!-- <div
            class="prompt_txt"
            v-if="item.List.length < 6 && item.List.length >= 0"
          >
            {{ $t("tips.notHave") }}
          </div> -->
          <!-- <div
            class="prompt_txt"
            v-if="item.List.length < 6 && item.List.length >= 0"
          >
            {{ $t("tips.notHave") }}
          </div> -->
          <!-- <div
            class="prompt_txt"
            v-if="item.List.length < 6 && item.List.length >= 0"
          >
            {{ $t("tips.notHave") }}
          </div> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapRule: {
        2: {
          showList: [],
          limit: 3,
          max: 6
        },
        3: {
          showList: [],
          limit: 3,
          max: 6
        },
        4: {
          showList: [],
          max: 3
        },
        5: {
          showList: [],
          // limit: 2,
          // max: 4
          limit: 3,
          max: 6
        },
        6: {
          showList: [],
          limit: 3,
          max: 6
        }
      }
    };
  },
  props: {
    bookList: Array,
    autoImg: String
  },
  watch: {
    bookList() {
      this.bookList.map(res => {
        var rule = this.mapRule[res.GroupId];
        // console.log(rule);
        // rule.showList = res.List.slice(0, rule.max);
        this.$set(rule, "showList", res.List.slice(0, rule.max));
      });
    }
  },
  mounted() {
    this.bookList.map(res => {
      var rule = this.mapRule[res.GroupId];
      console.log(rule);
      // rule.showList = res.List.slice(0, rule.max);
      this.$set(rule, "showList", res.List.slice(0, rule.max));
    });
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
    },
    //加载更多
    getMore(opt) {
      console.log("refresh");
      // var list = this.bookList[idx].List;
      var id = opt.id,
        max = opt.max,
        idx = opt.idx;
      var list = this.bookList[idx].List;
      // var sRan = parseInt(Math.random() * (list.length - max));
      // this.mapRule[id].showList = list.slice(sRan, sRan + max);
      this.mapRule[id].showList = this.makeRandomArr(list, max);
    },
    makeRandomArr(arrList, num) {
      if (num > arrList.length) {
        return;
      }
      var tempArr = arrList.slice(0);
      var newArrList = [];
      for (var i = 0; i < num; i++) {
        var random = Math.floor(Math.random() * (tempArr.length - 1));
        var arr = tempArr[random];
        tempArr.splice(random, 1);
        newArrList.push(arr);
      }
      return newArrList;
    }
  }
};
</script>

<style lang="stylus" scoped>
.prompt_txt .btn_def .icon
  width 36px
  height 36px
  vertical-align sub
  margin-right 6px
// 图标
.icon_2.push_txt .push_title:before
  background url('~x/image/icon/recommed.png')no-repeat center
  background-size contain
.icon_3.push_txt .push_title:before
  background url('~x/image/icon/hot.png')no-repeat center
  background-size contain
.icon_4.push_txt .push_title:before
  background url('~x/image/icon/collect.png')no-repeat center
  background-size contain
.icon_5.push_txt .push_title:before
  background url('~x/image/icon/fast.png')no-repeat center
  background-size contain
.icon_6.push_txt .push_title:before
  background url('~x/image/icon/new.png')no-repeat center
  background-size contain
.prompt_txt .btn_def
  border-radius 50px
  width calc(50% - 20px)
  height:60px;
  line-height:60px;
  margin 0 auto

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
      font-size 35px
      font-weight bold
      color #333
      flex 1
      display flex
      align-items center
      padding-left 60px
      position relative
      &:before
        content ""
        display inline-block
        width 40px
        height 40px
        position absolute
        left 0
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
        &.limit2
          width 50%
          .book_pto
            padding-bottom 100%
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
