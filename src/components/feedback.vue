<template>
  <div class="suggest">
    <div class="form_box">
      <div class="form_item">
        <label></label>
        <textarea
          class="content"
          v-model="param.content"
          :placeholder="$t('suggest.tips.content')"
        ></textarea>
      </div>
      <div class="form_item">
        <label for>{{ $t("suggest.phone") }}</label>
        <input
          type="text"
          v-model="param.phone"
          :placeholder="$t('suggest.verify.require')"
        />
      </div>
      <div class="form_item">
        <label for>{{ $t("suggest.email") }}</label>
        <input
          type="text"
          v-model="param.email"
          :placeholder="$t('suggest.verify.require')"
        />
      </div>
    </div>
    <div class="prompt_txt">{{ msg }}</div>
    <div class="mt-5">
      <cs-button
        round
        :size="'large'"
        :disabled="disabled"
        :title="$t('post.txt')"
        :isComplete="isComplete"
        :func="postBtn"
      />
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      msg: "",
      param: {
        contryId: "1",
        content: "",
        // userName: "",
        phone: "",
        email: ""
      },
      isComplete: false,
      disabled: false
    };
  },
  created() {},
  activated() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    //提交表单
    postBtn() {
      var msg = "";
      if (this.isComplete) {
        this.msg = this.$t("login.tips.wait");
        return;
      }
      var param = this.param;
      if (!param.content) {
        this.msg = this.$t("suggest.verify.content");
        return;
      }
      if (!param.phone && !param.email) {
        this.msg = this.$t("suggest.verify.require");
        return;
      }
      this.feedBack();
    },
    //反馈
    feedBack() {
      this.isComplete = true;
      // this.param.userName = localStorage.getItem("uname");
      this.disabled = true;
      this.$api
        .postDataN("suggest.post", Qs.stringify(this.param))
        .then(res => {
          if (res.code == 1) {
            this.msg = this.$t("post.success");
            this.param = {
              contryId: "1"
            };
            setTimeout(_ => {
              this.msg = "";
            }, 2000);
          } else {
            this.msg = this.$t("post.err");
          }
          this.isComplete = false;
          this.disabled = false;
        })
        .catch(err => {
          this.msg = this.$t("post.err");
          this.disabled = false;
          this.isComplete = false;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
// https://segmentfault.com/q/1010000010541142
// @import '~@/assets/mixins/feedback'
@import '~x/css/feedback'
</style>
