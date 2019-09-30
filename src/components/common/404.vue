<template>
  <div id="notFound">
    <div class="page_box">
      <img src="/static/img/404.png" alt />
      <button @click="reback">{{$t('tips.404')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
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
  .page_box 
    width 50%
    margin 0 auto
    display block
    margin-top 200px

  button 
    border 0 none
    background #e06278
    width 100%
    height 80px
    color #fff
    cursor pointer
    border-radius 10px
</style>