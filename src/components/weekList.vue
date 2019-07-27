<template>
  <!-- 更新列表 -->
  <div class="bingeWatch">
    <div class="update_time">
      <ul>
        <li
          :class="{active:isDay == (idx + 1)}"
          @click="updateTab(idx + 1)"
          v-for="(item,idx) in date"
          :key="idx"
        >{{item}}</li>
      </ul>
    </div>
    <div class="update_box">
      <div
        class="scroll_tab"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="15"
      >
        <div class="update_list" v-show="isDay == (idx+1)" v-for="(item,idx) in date" :key="idx">
          <app-list :boxList="boxT['d'+(idx+1)]" :rankState="false" :loadState="loading" />
        </div>
      </div>
    </div>
    <div class="scroll_tips">
      <loading :loadState="loadState" />
      <template v-if="!loadState">
        <div
          v-if="boxT['d'+isDay]&&boxT['d'+isDay].length == 0"
          class="prompt_week"
        >{{$t('tips.notupdate')}}</div>
        <div v-else class="prompt_week">{{$t('tips.end')}}</div>
      </template>
    </div>
  </div>
</template>

<script>
const listModule = () => import("./module/listModule");
import Qs from "qs";
export default {
  data() {
    return {
      loading: false,
      cache: [],
      date: [],
      isDay: "", //当前为第几天
      boxT: {}, //所有更新的列表
      loadState: false,
      //分页
      page: {
        offset: 0, //起始位置
        limit: 10, //查询条数
        total: 0 //当前总条数
      }
    };
  },
  components: {
    "app-list": listModule
  },
  created() {
    // console.log("created");
    this.date = this.$t("index.week");
  },
  mounted() {
    console.log("update_mounted");
    this.isDay = new Date().getDay();
    this.init();
  },
  methods: {
    init() {
      this.sendMsg("navBar", this.$t("index.updateHead"));
      this.defData(); // 初始化时间
    },
    defData() {
      this.date.forEach((res, i) => {
        this.$set(this.boxT, ["d" + (i + 1)], []);
        this.$set(this.page, ["d" + (i + 1)], {
          offset: 0,
          limit: 10,
          total: 0
        });
      });
    },
    sendMsg(key, data) {
      //组件通信
      this.$bus.$emit(key, data);
    },
    //更新标签选中状态
    updateTab(idx) {
      this.isDay = idx;
      this.getUpdate();
    },
    loadMore() {
      console.log("测试滚动");
      this.getUpdate();
    },
    //周更新
    getUpdate() {
      var cache = this.cache,
        d = this.isDay;
      if (cache.indexOf(d) != -1) {
        return;
      }
      if (this.loadState) {
        console.log("异步请求中...禁止操作");
        return;
      }
      cache.push(d);
      var page = this.page["d" + d]; //分页参数
      var opt = Object.assign({}, page);
      opt.week = d;
      this.loadState = true;
      this.$api.getUpDate(opt).then(res => {
        //请求成功时
        if (res.code == 1) {
          var data = res.data;
          if (this.boxT["d" + d].length == 0) {
            this.$set(this.boxT, ["d" + d], data.list);
          } else {
            //数组变化时更新
            if (data.list.length > this.boxT["d" + d].length) {
              this.boxT["d" + d] = this.boxT["d" + d].concat(data.list);
              this.$set(this.page, [key], {
                limit: 10,
                offset: page.offset + 1,
                total: res.total
              });
            }
          }
        }
        this.loadState = false;
      });
    }
  }
};
</script>

<style scoped>
.update_time {
  background: #fff;
}

.update_time > ul {
  display: flex;
  font-size: 30px;
  color: #999;
  padding: 0 25px;
}

.update_time li {
  padding: 25px 0;
  flex: 1;
  background: #fff;
  text-align: center;
  position: relative;
}

.update_time li.active {
  background: #f7f7f7;
  color: #ffa500;
  font-size: 32px;
}

.update_time li.active:after {
  content: "";
  display: block;
  border-top: 3px solid #ffa500;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.update_list {
  padding: 10px;
  background: #f3f3f3;
}
</style>


