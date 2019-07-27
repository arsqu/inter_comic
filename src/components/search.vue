<template>
  <div class="sPage">
    <!-- 搜索框 -->
    <div class="s_group">
      <div class="s_inp">
        <input class="s_key" type="text" placeholder="输入搜索结果" v-model="inp" />
      </div>
      <span class="s_txt" @click="searchVal">搜索</span>
    </div>
    <!-- 搜索结果 -->
    <div class="s_total" v-show="isShow">
      搜索
      <span class="active s_words">{{inp}}</span> 结果，共
      <span class="active s_num">{{num}}</span> 条
    </div>
    <!-- 搜索列表 -->
    <div class="s_list">
      <app-list :boxList="boxList" />
      <p class="page-infinite-loading" v-show="loadState">
        <mt-spinner type="fading-circle" class="r_loading" />加载中...
      </p>
    </div>
  </div>
</template>

<script>
// import listModule from "./module/listModule";
const listModule = () => import("./module/listModule");
export default {
  data() {
    return {
      //搜索信息
      inp: "", //表单值
      num: "",
      loadState: false, //搜索结果加载
      isShow: false, //搜索结果信息
      boxList: [] //数据
    };
  },
  components: {
    "app-list": listModule
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化
    init() {
      this.sendMsg("navBar", "搜索");
      // this.getUpdate();
    },
    //组件通信
    sendMsg(key, data) {
      this.$bus.$emit(key, data);
    },
    //搜索数据
    searchVal() {
      var val = this.inp;
      if (val) this.getUpdate();
    },
    //更新数据
    getUpdate() {
      var me = this;
      me.loadState = true;
      this.$api.getSearch(this.inp).then(resolve => {
        var arr = resolve;
        //模拟测试数据
        setTimeout(function() {
          if (me.boxList.length == 0) {
            me.boxList = arr.data; //没有则填充
            me.num = arr.num;
            me.isShow = true;
            me.loadState = false;
          }
        }, 1000);
      });
    }
  }
};
</script>

<style scoped>
/* 重置 */
.s_list >>> .com_lists {
  padding: 10px 20px;
  border-bottom: 2px solid #eee;
}

.sPage {
  height: 100vh;
  background: #fff;
}

.s_group {
  margin: 10px 30px;
  display: flex;
}

.s_inp {
  border-radius: 30px;
  height: 60px;
  flex: 1;
  line-height: 60px;
  background: #f1f1f1;
  padding-left: 35px;
}

.s_key {
  border: 0 none;
  outline: 0 none;
  height: 100%;
  width: 100%;
  vertical-align: top;
  background: transparent;
}

.s_txt {
  font-size: 30px;
  height: 60px;
  color: #666;
  line-height: 60px;
  text-align: center;
  margin-left: 20px;
}

.s_total {
  font-size: 28px;
  color: #666;
  padding: 25px 30px;
  border-bottom: 1px solid #ddd;
}

.active {
  color: orange;
}
</style>


