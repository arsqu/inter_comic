<template>
  <!-- lock.png -->
  <ul class="book_item">
    <li
      v-for="(item,idx) in catalogue"
      :class="{lock:item.is_free}"
      :key="idx"
      @click="book_view(item.id)"
    >
      <a href="javascript:;">
        <!-- <span class="cont_num">{{item.seqNum}}话</span> -->
        <span class="cont_num">{{$t('column.chapter')}} {{item.order_no}}</span>
        <!-- <span class="cont_money" v-if="!item.hasBuy">{{item.price}}书币</span> -->
        <span class="cont_lock" v-if="item.is_free"></span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    catalogue: Array,
    id: String
  },
  mounted() {},
  methods: {
    book_view(id) {
      this.$router.push({ name: "view", params: { id } });
      console.log("查看图书");
    }
  }
};
</script>

<style scoped>
.book_item {
  display: flex;
  flex-wrap: wrap;
  font-size: 25px;
}

.cont_book_list .book_item li {
  height: 60px;
  line-height: 60px;
  width: 33.3%;
  margin-bottom: 3%;
  display: flex;
  align-items: center;
  position: relative;
}

.cont_book_list .book_item li a {
  width: 100%;
  margin: 0 10px;
  border: 2px solid #ccc;
  border-radius: 30px;
  text-align: center;
  display: flex;
  cursor: pointer;
  align-items: center;
}

.cont_book_list .book_item li.lock .cont_lock {
  background: #fff url(/static/img/icon/lock.png);
  width: 40px;
  height: 40px;
  display: block;
  z-index: 11;
  background-size: 100%;
  position: absolute;
  right: 0px;
  bottom: -5px;
  border-radius: 50%;
}

.cont_book_list .book_item .cont_num {
  font-size: 30px;
  flex: 1;
}

.cont_book_list .book_item .cont_money {
  color: #ffa500;
  /* padding-right: 35px; */
}

/* .cont_book_list .book_item .lock .cont_money {
  padding-right: 15px;
} */
</style>


