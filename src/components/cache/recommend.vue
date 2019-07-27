<template>
  <div class="box_layout">
    <!-- 电子书 -->
    <div
      class="box_list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      :infinite-scroll-immediate-check="false"
      infinite-scroll-distance="10"
    >
      <app-list :boxList="boxList" :postState="loadState"/>
    </div>
  </div>
</template> 
<script>
// import infoList from "../module/infoList";
import listModule from "../module/listModule.vue";

export default {
  data() {
    return {
      tabKey: "",
      boxList: [],
      pageNum: 1,
      pageSize: 10,
      loading: false,
      loadState: false,
      loadComplete: true
    };
  },
  created() {
    var path = this.$route.params;
    console.log(path);
    this.tabKey = path.url;
    this.loadData(); //默认直接加载数据
  },
  components: {
    // "app-list": listModule
  },
  methods: {
    loadMore() {
      // console.log("滚动加载数据");
      this.loadData(); //滚动加载数据
    },
    loadData() {
      console.log("list loadData");
      // console.log(this.tabKey);
      this.loadState = true; //显示spinner组件
      if (this.loadComplete) {
        this.loadComplete = false; //数据加载中
        //模拟请求
        this.$axios({
          method: "get",
          url:
            "/static/data/" +
            this.tabKey +
            ".json?pageNum=" +
            this.pageNum +
            "&pageSize=" +
            this.pageSize,
          // url: "/static/data/" + this.tabKey + ".json",
          dataType: "json",
          crossDomain: true,
          cache: false
        }).then(resolve => {
          var arr = resolve.data.data;
          var me = this;
          //模拟测试数据
          setTimeout(function() {
            if (me.boxList.length == 0) {
              me.boxList = arr; //没有则填充
            } else {
              //否则更新数据
              var last = me.boxList[me.boxList.length - 1];
              for (let i = 1; i <= 7; i++) {
                last.id++;
                me.boxList.push(last);
              }
            }
            me.pageNum++;
            me.loadState = false; //隐藏spinner组件
            me.loadComplete = true; //数据加载完成可以再次请求,防止多次请求数据
          }, 5500);
          // console.log(this.loading);
          // console.log("请求成功", resolve);
        }),
          reject => {
            console.log("请求失败", reject);
          };
      }
    }
  }
};
</script>

<style scoped>
.box_layout {
  /* tabbar高度 */
  /* padding-bottom: 90px; */
  padding-bottom: 50px;
}

.box_list {
  padding: 0.65rem;
}
</style>


