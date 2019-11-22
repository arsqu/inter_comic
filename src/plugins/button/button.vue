<template>
  <mt-button
    :class="['btn_def',void 0 != round?'btn_round':'']"
    :type="type"
    :size="size"
    :disabled="isComplete"
    @click.native="func"
  >
    <mt-spinner
      class="load_spinner"
      v-show="isComplete"
      :color="color"
      :size="loadSize"
      :type="loadType"
      slot="icon"
    ></mt-spinner>
    {{title}}
  </mt-button>
</template>

<script>
export default {
  created() {},
  data() {
    return {};
  },
  props: {
    //样式
    type: {
      type: String,
      default: "default"
    },
    //尺寸
    size: {
      type: String,
      default: "small"
    },
    title: String, //文字
    round: String, //圆角
    isComplete: Boolean, //loading
    disabled: Boolean, //禁止点击
    func: Function, //点击事件
    //按钮样式
    loadType: {
      type: String,
      default: "snake"
    },
    //尺寸
    loadSize: {
      type: String,
      default: "20"
    },
    //颜色
    color: {
      type: String,
      default: "#fff"
    }
  }
};
</script>

<style lang="stylus" scoped>
.load_spinner >>> .mint-spinner-snake
  border 3px solid transparent /*no*/
.mint-button >>> .mint-button-text
  vertical-align middle
  font-size 30px
.icon_load1
  display inline-block
  border-radius 50%
  border 3px solid #fff
  border-top-color transparent
  animation circAnimate 1s infinite linear
  vertical-align text-bottom
  transform-origin center
  &.danger
    border-color #F0656B
    border-top-color transparent
@keyframes circAnimate
  from
    transform rotate(0)
  to
    transform rotate(359deg)
</style>