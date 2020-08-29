<template>
  <div class="withdraw">
    <!-- <ul class="recordHead">
      <li>
        <span>{{ $t("paidRecord.money") }}</span>
        <span>{{ $t("paidRecord.time") }}</span>
      </li>
    </ul>
    <ul class="recordList">
      <li v-for="(item, idx) in recordList" :key="idx">
        <span>{{ item.custAccount }}</span>
        <span>{{ item.custIfcs }}</span>
      </li>
    </ul> -->
    <div class="text-center pt-3 pb-1">Total {{ Total }} items</div>
    <table class="recordTable" v-if="showTable">
      <thead>
        <!-- <td>{{ this.$t("paidRecord.formList.account") }}</td>
        <td>{{ this.$t("paidRecord.formList.ifsc") }}</td>
        <td>{{ this.$t("paidRecord.formList.phone") }}</td> -->
        <td>{{ this.$t("paidRecord.OutType") }}</td>
        <td>{{ this.$t("paidRecord.outCoin") }}</td>
        <td>{{ this.$t("paidRecord.money") }}</td>
        <td>{{ this.$t("paidRecord.status") }}</td>
        <td>Control</td>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in recordList" :key="idx">
          <!-- <td>{{ item.custAccount }}</td>
          <td>{{ item.custIfcs }}</td>
          <td>{{ item.custPhone }}</td> -->
          <td>{{ item.outType }}</td>
          <td>{{ item.outCoin }}</td>
          <td>{{ item.money }}</td>
          <td>{{ mapConfig[item.payOutStatus] }}</td>
          <td>
            <span class="btn_def btn_span" @click="viewDetl(item)">detail</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="prompt_txt">{{ msg }}</div>

    <mt-popup
      v-model="withVisible"
      class="cus_popup"
      position="right"
      popup-transition="popup-fade"
    >
      <mt-field
        :label="$t('paidRecord.oderId')"
        v-model="showOpt.oderId"
      ></mt-field>
      <mt-field
        :label="$t('paidRecord.OutType')"
        v-model="showOpt.outType"
      ></mt-field>
      <mt-field
        v-show="showOpt.outType == 'wallet'"
        :label="$t('paidRecord.formList.phone')"
        v-model="showOpt.custPhone"
      ></mt-field>
      <mt-field
        v-show="showOpt.outType == 'bank'"
        :label="$t('paidRecord.formList.account')"
        v-model="showOpt.custAccount"
      ></mt-field>
      <mt-field
        :label="$t('paidRecord.vpa')"
        v-model="showOpt.custVpa"
      ></mt-field>
      <mt-field
        v-show="showOpt.outType == 'bank'"
        :label="$t('paidRecord.formList.ifsc')"
        v-model="showOpt.custIfcs"
      ></mt-field>
      <mt-field
        :label="$t('paidRecord.outCoin')"
        v-model="showOpt.outCoin"
      ></mt-field>
      <mt-field
        :label="$t('paidRecord.money')"
        v-model="showOpt.money"
      ></mt-field>
      <mt-field
        :label="$t('paidRecord.status')"
        :value="showOpt.payOutStatus"
      ></mt-field>
    </mt-popup>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      withOpt: {},
      withVisible: false,
      showTable: false,
      msg: "",
      showOpt: {},
      mapConfig: {
        0: "pending",
        1: "success",
        2: "error"
      },
      recordList: []
    };
  },
  created() {},
  mounted() {
    this.getRecord();
  },
  methods: {
    viewDetl(d) {
      this.withVisible = true;
      d = Object.assign({}, d);
      d.payOutStatus = this.mapConfig[d.payOutStatus];
      this.showOpt = d;
    },
    getRecord() {
      this.$api
        .postDataN("withdraw.record", {})
        .then(res => {
          if (res.code == 1) {
            this.recordList = res.data;
            this.Total = res.data.length;
            this.showTable = true;
            console.log(res);
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="stylus" scoped>
.btn_span
  padding 5px 8px
  border-radius 5px

.withdraw
  width 100%
  font-size 28px
  overflow-x auto
.recordTable
  width 100%
  border-collapse collapse
  // border-bottom 1px solid #ddd
  td
    padding 5px 0
    text-align center
    border-bottom 1px solid #ddd
    // border-right 1px solid #ddd
    &:last-child
      // border-right 0 none
      // border-bottom 0 none

.recordHead
  position fixed
  background #fff
  width 100%
.recordList
  padding-top 60px
.recordList li,.recordHead li
  border-bottom 1px solid #ddd
  display flex
  font-size 28px
  &:last-child
    border-bottom 0 none
  span
    // width 50%
    padding 20px 5px
    text-align center
    display inline-block
</style>
