<template>
  <div class="withdraw">
    <loading :loadState="loading" />
    <template v-if="!loading">
      <template v-if="recordList.length > 0"
        ><div class="text-center pt-3 pb-1">Total {{ Total }} items</div>
        <table class="recordTable" v-if="showTable">
          <thead>
            <td>{{ this.$t("paidRecord.OutType") }}</td>
            <td>{{ this.$t("paidRecord.outCoin") }}</td>
            <td>{{ this.$t("paidRecord.money") }}</td>
            <td>{{ this.$t("paidRecord.status") }}</td>
            <td>Control</td>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in recordList" :key="idx">
              <td>{{ item.outType == "wallet" ? "Paytm" : item.outType }}</td>
              <td>{{ item.outCoin }}</td>
              <td>{{ item.money }}</td>
              <td>{{ mapConfig[item.payOutStatus] }}</td>
              <td>
                <span class="btn_def btn_span" @click="viewDetl(item)"
                  >detail</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <div v-else class="prompt_week">{{ $t("tips.nomore") }} record</div>
    </template>

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
      loading: false,
      withVisible: false,
      showTable: false,
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
      this.loading = true;
      this.$api
        .postDataN("withdraw.record", {})
        .then(res => {
          this.loading = false;
          if (res.code == 1) {
            this.recordList = res.data;
            this.Total = res.data.length;
            this.showTable = true;
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
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
  td
    padding 5px 0
    text-align center
    border-bottom 1px solid #ddd
</style>
