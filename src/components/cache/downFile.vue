<template>
  <div>视频</div>
</template>

<script>
export default {
  data() {
    return {
      loadState: true
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   // // console.log(to, from, next);
  //   // console.log(to, from, next);
  //   // from.meta.keepAlive = false;
  //   // console.log(from.meta.keepAlive);
  //   // next();
  // },
  created() {
    console.log(this.$route.params);
  },
  methods: {}
};
</script>

<style scoped>
</style>


