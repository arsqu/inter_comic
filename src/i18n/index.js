// import Vue from 'vue'
import VueI18n from 'vue-i18n' //国际化
import config from '../util/config' //语言种类
const _import = require('@/i18n/_import_lang')//获取组件的方法

// object
function exchange(opt) {
  var lang = {};
  for (var k in opt)
    lang[k] = _import(k);
  return lang;
}
// Vue.use(VueI18n);
export default new VueI18n({
  locale: (navigator.language || navigator.browserLanguage).toLowerCase().substr(0, 2), //语言
  fallbackLocale: 'en', //default locale
  silentTranslationWarn: true, //close message
  messages: exchange(config.lang)
})

