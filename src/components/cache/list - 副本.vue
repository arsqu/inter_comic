<template>
  <div class="box_layout">
    <div
      class="box_list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      :infinite-scroll-immediate-check="false"
      infinite-scroll-distance="10"
    >
      <div class="com_lists" v-for="(item,idx) in boxList" v-bind:key="idx" @click="tar_detail">
        <div class="com_img">
          <img :src="item.icon" alt>
        </div>
        <div class="com_desc">
          <p class="com_tit">{{item.name}}{{idx}}</p>
          <p class="com_tit">{{item.desc}}</p>
        </div>
        <div>
          <p class="btn btn_def">获取</p>
          <p class="d_tit">App内购买项目</p>
        </div>
      </div>
      <p class="page-infinite-loading" v-show="loadState">
        <mt-spinner type="fading-circle" class="r_loading"></mt-spinner>加载中...
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabKey: "",
      loading: false,
      loadComplete: true,
      loadState: false,
      pageSize: 10,
      pageNum: 1,
      boxList: []
    };
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to, from, next);
    console.log(from.meta.keepAlive);
    from.meta.keepAlive = false;
    next();
  },
  activated() {},
  created() {
    console.log("创建");
    var path = this.$route.params;
    this.tabKey = path.url.replace(/\//, "");
    console.log(path);
    this.loadData(); //默认直接加载数据
  },
  methods: {
    loadMore() {
      // console.log("滚动加载数据");
      this.loadData(); //滚动加载数据
    },
    loadData() {
      console.log("loadData");
      this.loadState = true; //显示spinner组件
      if (this.loadComplete) {
        this.loadComplete = false; //数据加载中
        //模拟请求
        this.$axios({
          method: "get",
          // url:
          //   "/static/data/list.json?pageNum=" +
          //   this.pageNum +
          //   "&pageSize=" +
          //   this.pageSize,
          url: "/static/data/" + this.tabKey + ".json",
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
    },
    tar_detail() {
      //跳转详情页
      // console.log(1);
      this.$router.push({
        name: "detail",
        params: {
          id: "game"
        }
      });
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

.com_lists {
  display: flex;
  padding: 0.5rem 0;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
}

.com_lists .com_desc {
  padding: 0.3rem 0.65rem;
  width: 45%;
}

.com_img > img {
  width: 75px;
  height: 75px;
  border: 0 none;
  border-radius: 8px;
}

.com_desc {
  text-align: left;
  align-items: center;
}

.com_lists .com_tit {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  color: #4b566a;
  padding: 0.15rem 0;
}

.com_lists .com_tit:first-child {
  font-size: 18px;
  font-weight: bold;
}

.com_lists .com_tit:last-child {
  color: #a2a2a2;
  font-size: 13px;
}

.d_tit {
  font-size: 12px;
  color: #999;
  padding: 5px 0;
}
</style>


