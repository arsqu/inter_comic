<template></template>

<script>
export default {
  data() {
    return { t: "test" };
  },
  created() {
    this.a();
  },
  mounted() {},
  methods: {
    a() {
      console.log("a");
      console.log(this.t);
    }
  }
};
</script>

<style lang="stylus" scoped></style>