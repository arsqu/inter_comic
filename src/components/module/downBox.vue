<template>
  <!-- 下载app -->
  <div class="downloadApp" v-show="showApp && this.show">
    <i class="close" @click="close"></i>
    <img src="/static/img/win-logo.png" alt />
    <div class="down_txt">
      <p class>Mangeline</p>
      <p class>{{$t('common.download')}}</p>
    </div>
    <a :href="this.$config.downUrl" class="down_btn">{{$t('common.install')}}</a>
  </div>
</template>

<script>
export default {
  props: {
    showApp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false
    };
  },
  created() {
    if (sessionStorage.getItem("closeApk")) {
      this.showApp = false;
      return;
    }
    const config = this.$config;
    this.show = config.showDownload;
  },
  methods: {
    //关闭
    close() {
      console.log("close");
      this.showApp = false;
      sessionStorage.setItem("closeApk", 1);
    }
  }
};
</script>

<style>
</style>
