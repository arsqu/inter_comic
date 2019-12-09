<template>
  <mt-button
    :class="['btn_def',{btn_round:!round}]"
    :type="type"
    :size="size"
    :nativeType="nativeType"
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
    nativeType: {
      type: String,
      default: "button"
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

<style scoped>
.load_spinner >>> .mint-spinner-snake {
  border: 3px solid transparent; /*no*/
}
</style>

<style lang="stylus" scoped>
.mint-button >>> .mint-button-text
  font-size 35px
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