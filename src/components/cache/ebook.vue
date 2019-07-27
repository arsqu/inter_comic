<template>
  <!-- 详情页头信息 -->
  <div class="list_detl">
    <div class="detl_arrow" @click="reBack">
      <i class="arrow arrow_lf"></i>
      <span class>游戏</span>
    </div>
    <div class="detl_desc">
      <div class="com_lists">
        <div class="com_img">
          <img src="http://img60.ddimg.cn/digital/product/82/76/1901118276_ii_cover.jpg" alt>
        </div>
        <div class="com_desc">
          <p class="com_tit">平凡的世界（全三册)</p>
          <p class="com_tit1 over_hide">茅盾文学奖皇冠上的明珠，激励亿万读者的不朽经典。</p>
          <div class="com_func">
            <p class="btn btn_bl">打开</p>
            <p class="d_tit">App内购买项目</p>
            <p class="btn btn_bl">...</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 评分 -->
    <div class="detl_desc detl_group">
      <div class="detl_rule">
        <span class="detl_num d_tit">4.1</span>
        <span>
          <!-- <img style="width:130px;height:30px;" src="../assets/test2.png" alt> -->
        </span>
      </div>
      <div class="detl_tit d_tit">3.63万个评分</div>
    </div>
    <!-- 截图视频 -->
    <div class="detl_pic detl_desc">
      <div class="pic_group">
        <img
          src="http://img60.ddimg.cn/digital/product/82/76/1901118276_ii_cover.jpg?version=19559a96-54b6-4283-950f-449c18302dcf"
          alt
        >
        <img
          src="http://img60.ddimg.cn/digital/product/82/76/1901118276_ii_cover.jpg?version=19559a96-54b6-4283-950f-449c18302dcf"
          alt
        >
        <img
          src="http://img60.ddimg.cn/digital/product/82/76/1901118276_ii_cover.jpg?version=19559a96-54b6-4283-950f-449c18302dcf"
          alt
        >
      </div>
    </div>
    <!-- 用户评论 -->
    <div class="talk_list">
      <div class="user_talk">
        <div class="u_info">
          <div class="u_info_lf">
            <p class="u_name">值得分享</p>
            <p class="u_score"></p>
          </div>
          <div class="u_info_rt">
            <p class="d_tit">1月22日</p>
            <p class="i_id d_tit">efewfewfewfewfewf</p>
          </div>
        </div>
        <div class="u_detl">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam eius excepturi qui aliquid officia possimus corporis atque officiis aspernatur distinctio quibusdam quaerat culpa in, vero ad impedit ipsum animi.</p>
        </div>
      </div>
      <div class="user_talk">
        <div class="u_info">
          <div class="u_info_lf">
            <p class="u_name">值得分享</p>
            <p class="u_score"></p>
          </div>
          <div class="u_info_rt">
            <p class="d_tit">1月22日</p>
            <p class="i_id d_tit">efewfewfewfewfewf</p>
          </div>
        </div>
        <div class="u_detl">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam eius excepturi qui aliquid officia possimus corporis atque officiis aspernatur distinctio quibusdam quaerat culpa in, vero ad impedit ipsum animi.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    reBack() {
      console.log("返回");
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style scoped>
.list_detl {
  padding: 0.65rem;
  padding-bottom: 100px;
}

.detl_arrow {
  color: #3478f6;
  font-size: 18px;
  height: 20px;
  line-height: 20px;
}

/* 方向键 */
.arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  color: #3478f6;
}

.arrow_lf {
  border-left: 3px solid;
  border-bottom: 3px solid;
  transform: rotate(45deg);
}

.detl_desc {
  padding: 0.65rem;
}

.com_lists {
  display: flex;
  padding: 0.5rem 0;
}

.com_lists .com_desc {
  padding: 0 0.65rem;
}

.com_img > img {
  width: 120px;
  height: 120px;
  border: 0 none;
  border-radius: 8px;
}

.com_desc {
  text-align: left;
  align-items: center;
  width: 75%;
  position: relative;
}

.com_lists .com_tit,
.over_hide {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  color: #4b566a;
  padding: 0.15rem 0;
  font-size: 20px;
  font-weight: bold;
}

.com_lists .com_tit1 {
  color: #a2a2a2;
  font-size: 14px;
  font-weight: normal;
}

.d_tit {
  font-size: 12px;
  color: #999;
  padding: 0 5px;
}

.com_func {
  display: flex;
  position: absolute;
  bottom: 5px;
}

.com_func .btn_bl:last-child {
  width: 40px;
  font-weight: bold;
  font-size: 15px;
  line-height: 30px;
}

/* 评分 */
.detl_rule {
  display: flex;
  align-items: center;
}

.detl_num {
  font-size: 22px;
  font-weight: bold;
}

/* 游戏信息 */
.detl_pic {
  overflow: auto;
}

.pic_group {
  width: 910px;
  height: 160px;
}

.pic_group > img {
  width: 300px;
  height: 100%;
}

/* 用户评论 */
.user_talk {
  background: #f1f1f8;
  margin: 0.65rem;
  padding: 1rem;
  border-radius: 15px;
}

.u_name {
  color: #000;
  font-size: 15px;
  font-weight: bold;
}

.u_info_lf {
  width: 80%;
}

.u_info {
  display: flex;
  padding: 0.5rem 0;
}

.u_info_rt {
  text-align: right;
}
</style>


