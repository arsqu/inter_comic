<template>
  <div>
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    分为会计法珀尔瓦科特公婆二位客官泊尔卡
    <!-- 列表模板 -->
    <div class="push_box">
      分为会计法珀尔瓦科特公婆二位客官泊尔卡
      <div class="push_column" v-for="(item,idx) in bookList" :key="idx">
        <div class="push_txt">
          <span class="push_title">{{item.GroupName}}</span>
        </div>
        <div class="push_book">
          <ul class="book_list">
            <template v-if="item.List.length>0">
              <li
                class="book_detl"
                v-for="(detl,idx) in testData"
                :key="idx"
                @click="tar_href(detl.id,detl.title)"
              >
                <div class="book_pto">
                  <img :src="detl.show_img" alt>
                </div>
                <div class="book_desc">
                  <span class="book_txt over_ellipsis">{{detl.title}}</span>
                  <span class="book_update over_ellipsis">{{detl.update}}</span>
                </div>
              </li>
            </template>
            <template v-if="item.List.length<3">
              <div class="prompt_txt">暂无更多漫画</div>
            </template>
            <div v-else>当前栏目下没有漫画</div>
            <!-- 测试数据 -->
            <!-- <template v-else>
            <li
              class="book_detl"
              v-for="(detl,idx) in testData"
              :key="idx"
              @click="tar_href(detl.id,detl.title)"
            >
              <div class="book_pto">
                <img :src="detl.show_img" alt>
              </div>
              <div class="book_desc">
                <span class="book_txt over_ellipsis">{{detl.title}}</span>
                <span class="book_update over_ellipsis">{{detl.update}}</span>
              </div>
            </li>
            </template>-->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookList: [
        {
          id: "0",
          show_img:
            "http://media-photo.oss-cn-hangzhou.aliyuncs.com/media/1/1/1.jpg",
          title: "被勇者队伍开除的驭兽使、邂逅了最强种的猫耳少女",
          update: "更新 第二十话"
        },
        {
          id: "1",
          show_img:
            "http://media-photo.oss-cn-hangzhou.aliyuncs.com/media/1/1/1.jpg",
          title: "被勇者队伍开除的驭兽使、邂逅了最强种的猫耳少女",
          update: "更新 第二十话"
        },
        {
          id: "2",
          show_img:
            "http://media-photo.oss-cn-hangzhou.aliyuncs.com/media/1/1/1.jpg",
          title: "被勇者队伍开除的驭兽使、邂逅了最强种的猫耳少女",
          update: "更新 第二十话"
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.push_column {
  font-size: 30px;
  padding: 25px;
  margin: 25px 0;
  background: #fff;
}

.push_column .push_txt {
  display: flex;
  align-items: center;
}

.push_column .push_title {
  border-left: 5px solid #ffa500;
  padding: 0 15px;
  color: #333;
  flex: 1;
}

.push_column .push_more {
  font-size: 20px;
  position: relative;
  padding-right: 20px;
  color: #666;
}

.push_column .push_more:after {
  width: 16px;
  height: 16px;
  border-top: 2px solid transparent;
  border-right: 2px solid transparent;
  border-color: #ffa500;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -8px;
  transform: rotate(45deg);
  content: "";
  display: block;
}

.push_column .push_book {
  padding-top: 20px;
}

.push_book .book_list {
  display: flex;
  flex-wrap: wrap;
}

.push_column .book_txt {
  display: block;
  font-size: 28px;
  color: #333;
  text-align: center;
}

.push_column .book_update {
  display: block;
  font-size: 22px;
  color: #666;
  text-align: center;
}

.book_detl {
  width: 33.3%;
  box-sizing: border-box;
  padding: 0 10px;
}

.book_pto {
  position: relative;
  width: 100%;
  margin-bottom: 15px;
  padding-bottom: 133%;
}

.book_pto img {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 10px;
}

.prompt_txt {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
  font-size: 26px;
  color: #666;
}
</style>


