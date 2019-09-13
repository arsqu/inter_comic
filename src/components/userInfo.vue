<template>
  <div class="userList">
    <div class="info_box">
      <div class="info_img">
        <img src="/static/img/icon/default_head.png" alt />
      </div>
      <div class="infoList">
        <div>{{uname}}</div>
        <div class="balance">{{$t('detl.hasMoney')}}：{{money}}</div>
      </div>
      <div class="rechargeBtn">
        <span @click="recharge">{{$t('recharge.recharge')}}</span>
      </div>
    </div>
    <div class="tabTurn">
      <span
        @click="toggle(idx)"
        :class="[isCur==idx?'active':'']"
        v-for="(item,idx) in tabList"
        :key="idx"
      >{{item}}</span>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      isCur: 1,
      tabList: [],
      //用户信息
      uname: "",
      money: "",
      loadState: false //接口请求状态
    };
  },
  components: {},
  created() {
    // console.log("created");
    this.tabList = this.$t("userInfo.tabList");
    console.log(this.$t("userInfo.tabList"));
    this.init();
  },
  mounted() {
    console.log("update_mounted");
    // this.getUpdate();
  },
  computed: {},
  methods: {
    recharge() {
      this.$router.push({ name: "recharge" });
    },
    init() {
      this.sendMsg("navBar", this.tabList[this.isCur]);
      this.loadData();
    },
    toggle(idx) {
      this.isCur = idx;
      this.sendMsg("navBar", this.tabList[idx]);
    },
    sendMsg(key, data) {
      //组件通信
      this.$bus.$emit(key, data);
    },
    loadData() {
      this.$api.getDataN("hasMoney").then(res => {
        // console.log(res);
        if (res.code == 1) {
          var data = res.data;
          localStorage.setItem("money", data.money);
          localStorage.setItem("uname", data.uname);
          this.money = data.money;
          this.uname = data.uname;
        }
      });
    }
  }
};
</script>

<style scoped>
.rechargeBtn {
  text-align: right;
  flex: 1;
}

.rechargeBtn > span {
  background: #ee7676;
  padding: 15px 15px;
  font-size: 16px; /*no*/
  border-radius: 20px;
  color: #fff;
}

.info_box {
  display: flex;
  padding: 8% 25px;
  align-items: center;
  background: #f5f5f5;
}

.info_box .balance {
  color: #e55c3f;
  font-size: 15px; /*no*/
}

.info_box .info_img {
  width: 130px;
  height: 130px;
  margin-right: 30px;
}

.info_box .infoList {
  font-size: 16px; /*no*/
  color: #333;
  margin-right: 30px;
}

.info_box .infoList > div:first-child {
  margin-bottom: 15px;
}

.info_box .info_img > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.tabTurn {
  font-size: 16px; /*no*/
  color: #333;
}

.tabTurn > span:first-child {
  border-right: 1px solid #ddd;
}

.tabTurn > span {
  width: 50%;
  color: #666;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  padding: 15px 0;
  border-bottom: 3px solid #ddd;
}

.tabTurn > span.active {
  border-bottom-color: #e55c3f;
  color: #e55c3f;
}
</style>


