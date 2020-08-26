<template>
  <div class="docView">
    <h3>CONTACT</h3>
    <div class="fir">
      <i class="icon icon_earth"></i>
      <span class="spec">Registered Office</span>
    </div>
    <div class="mt-0">
      <p>
        FL NO 03,, AKANSHA APP,, PALLOD FARM, PHASE II, BANER, Pune,
        Maharashtra, 411045
      </p>
    </div>
    <div>
      <i class="icon icon_phone"></i>
      <span class="phone_call">{{ phone }}</span>
    </div>
    <div>
      <i class="icon icon_email"></i>
      <span>Service: {{ mail[0] }}</span>
    </div>
    <div>
      <i class="icon"></i>
      <span>Business: {{ mail[1] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mail: [],
      phone: ""
    };
  },
  mounted() {
    var siteDir = this.$project.siteDetl;
    this.phone = siteDir.phone;
    this.mail = siteDir.mail;
  }
};
</script>

<style lang="stylus" scoped>
.docView
  font-size 28px
  padding 10px 25px
  width 100%
  height calc(100vh - 100px)
  margin 0 auto
  background #363839
  .phone_call
    font-size 40px
  p
    margin-left 79px
    margin-top 30px
    font-size 40px
    width 75%
    color #8C8989
  div
    margin-top 50px
    &.fir
      margin-top 10px
    &:last-child
      margin-top 5px
  span
    &.spec
      color #fff
      font-size 43px
    color #8C8989
    vertical-align middle
    font-size 35px
  .icon
    vertical-align middle
    border-radius 50%
    margin-right 15px
  .icon_earth
    background url('/static/image/icon/earth.png')
    background-size 100%
    background-color #fff
  .icon_phone
    background url('/static/image/icon/phone.png')
    background-size 100%
    background-color #fff
  .icon_email
    background url('/static/image/icon/email1.png')
    background-size 100%
    background-color #fff
  b
    color #333
  h3
    font-size 33px
    color #fff
    margin-left 79px
    font-weight normal
    text-align left
    padding 25px 0
  p
    color #6e6e6e
    line-height 1.5
    // margin-left 64px
    margin-bottom 20px
</style>
