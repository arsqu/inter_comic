<template>
  <div class="page_modal" v-show="isModal" @click="closeModal"></div>
</template>

<script>
export default {
  props: {
    isModal: {
      type: Boolean,
      default: false
    },
    topMask: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", 1);
      // this.isModal = false;
      // console.log('isModal',this.isModal);
    }
  }
};
</script>

<style lang="stylus" scoped>
//拟态框
.page_modal
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  margin auto
  z-index 100
  background-color rgba(0, 0, 0, .65)
  &.topMask
    top 100px
</style>