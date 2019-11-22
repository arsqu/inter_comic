<template>
  <div class="payfor">
    <loading :loadState="loadState"></loading>
    <div v-html="payForm">{{payForm}}</div>
    <!-- <iframe id="payfor" :src="payUrl"></iframe> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadState: false,
      payUrl: "",
      payForm: ""
    };
  },
  created() {
    var params = this.$route.params;
    // this.payUrl = params.payUrl;
    this.payForm = params.payForm;
    // location.href = params.payForm;
    console.log(params);
    var newwindow = window.open("#", "_blank");
    newwindow.document.write(params.payForm);
    this.$bus.$emit("navBar", "payfor");
  },
  mounted() {
    // var iframe = document.getElementById("payfor");
    // this.loadState = true;
    // iframe.onload = () => {
    //   this.loadState = false;
    // };
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
iframe
  width 100%
  border 0 none
  height calc(100vh - 100px)
.back
  z-index 100
  border-top 3px solid transparent
  border-right 3px solid transparent
  border-color orange
  height 30px
  width 30px
  vertical-align middle
  -webkit-transform rotate(-135deg)
  transform rotate(-135deg)
  display inline-block
  position relative
  left 5%
  top 3%
  padding 15px
</style>