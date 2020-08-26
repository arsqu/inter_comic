<template>
  <p v-show="loadState" class="page-infinite-loading">
    <mt-spinner :type="type" class="r_loading" :color="color" />
    {{ $t("tips.loading") }}...
  </p>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    color: String,
    type: {
      type: String,
      default: "fading-circle"
    },
    loadState: Boolean
  }
};
</script>
