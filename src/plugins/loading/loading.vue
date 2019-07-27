<template>
  <p v-show="loadState" class="page-infinite-loading">
    <mt-spinner type="fading-circle" class="r_loading" />
    {{$t('tips.loading')}}...
  </p>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    loadState: Boolean
  }
};
</script>

