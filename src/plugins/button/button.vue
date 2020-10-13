<template>
  <mt-button
    :class="['btn_def','btn_color',{btn_round:!round}]"
    :type="type"
    :size="size"
    :plain="plain"
    :nativeType="nativeType"
    :disabled="isComplete"
    @click.native="func"
  >
    <mt-spinner
      class="load_spinner icon-fill"
      v-show="isComplete"
      :color="spinColor"
      v-if="isComplete"
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
    plain: {
      type: Boolean,
      default: false
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
    spinColor: {
      type: String,
      default: "#ffffff"
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
.mint-button 
  & >>> .mint-button-text
    font-size 35px
    // vertical-align middle
    display inline-block
    padding-left 10px
  & >>> .mint-button-icon
    vertical-align: sub;

</style>