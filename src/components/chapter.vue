<template>
  <div class="bookCate">
    <!-- 目录 -->
    <div class="cont_book_list">
      <category :catalogue="chapterList" :id="id" />
    </div>
  </div>
</template>
<script>
const category = () => import("./module/category");
export default {
  data() {
    return {
      id: "",
      chapterList: []
    };
  },
  components: {
    category: category
  },
  created() {
    console.log("chapter_created");
  },
  mounted() {
    console.log("chapter_mounted");
    var route = this.$route.params; //路由参数
    this.id = route.id;
    this.init();
  },
  methods: {
    init() {
      this.getChapter();
      // this.sendMsg();
    },
    //组件通信
    sendMsg(key, val) {
      this.$bus.$emit(key, val); //漫画名
    },
    //获取所有章节
    getChapter() {
      // console.log("所有章节");
      this.$api.getChapter(this.id).then(resolve => {
        // console.log(resolve);
        var result = resolve.data;
        //请求完成
        if (resolve.errorCode == 0) {
          this.chapterList = result.list;
          // console.log(resolve.viewName);
          this.sendMsg("navBar", resolve.viewName);
        }
      });
    }
  }
};
</script>

<style scoped>
.bookCate {
  padding: 0 20px;
  padding-top: 130px;
  height: 100vh;
  margin-top: -100px;
  background: #f5f5ee;
}

.bookCate >>> .cont_book_list .book_item li {
  margin-bottom: 4%;
}

.bookCate >>> .cont_book_list .book_item li a {
  background: #fff;
}
</style>

