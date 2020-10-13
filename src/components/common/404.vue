<template>
  <div id="notFound" class="text-center">
    <div class="page_box">
      <!-- <img src="/static/image/404.png" alt /> -->
      <img :src="require('x/image/404.png')" alt />
    </div>
    <p class="text" v-if="output == 'novel'">404</p>
    <p class="desc">{{ $t("404")[output] || $t("404.desc") }}</p>
    <button class="btn_primary btn_def" @click="reback">
      {{ $t("tips.404") }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      output: null
    };
  },
  mounted() {
    this.output = process.env.OUT_PUT;
    this.$bus.$emit("navBar", "404");
  },
  methods: {
    reback() {
      this.$router.push({ name: "main" });
      // console.log("reback");
    }
  }
};
</script>

<style lang="stylus" scoped>
#notFound
  .text
    font-size 80px
    font-weight bold
    color #333
  .desc
    width 80%
    margin 30px auto 60px
    font-size 36px
    color #d9d9d9
  .page_box
    width 100%
    margin 0 auto
    display block
    // height 70vh
    position relative
  button
    border 0 none
    font-size 35px
    margin 0 auto
    width 80%
    height 80px
    border-radius 50px
    color #fff
    cursor pointer
</style>
