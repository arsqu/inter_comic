<template>
  <svg
    :width="autoSize.wid"
    :height="autoSize.het"
    class="banner-svg"
    id="banner_svg"
  >
    <defs>
      <filter id="f">
        <feImage
          id="svg_feImage"
          :xlink:href="autoSize.src"
          x="0"
          y="0"
          :width="autoSize.wid"
          :height="autoSize.het"
          preserveAspectRatio="xMidYMid slice"
        />
        <feGaussianBlur stdDeviation="30" />
      </filter>
    </defs>
    <rect
      id="svg_rect"
      x="0"
      y="0"
      :width="autoSize.wid"
      :height="autoSize.het"
      filter="url(#f)"
    />
  </svg>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    autoSize: Object
  },
  created() {
    // console.log(this.autoSize);
  }
};
</script>

<style scoped>
.banner-svg {
  position: absolute;
}
</style>
