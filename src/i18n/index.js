// import Vue from 'vue'
import VueI18n from 'vue-i18n' //国际化
import config from '../util/config'
const _import = require('@/i18n/_import_lang')//获取组件的方法
Vue.use(VueI18n);


// arr
// function exchange(arr) {
//   var opt = {};
//   for (var i = 0; i < arr.length; i++)
//     opt[arr[i]] = _import(arr[i]);
//   return opt;
// }

// object
function exchange(opt) {
  var lang = {};
  for (var k in opt) {
    lang[k] = _import(k);
  }
  return lang;
}

export default new VueI18n({
  locale: (navigator.language || navigator.browserLanguage).toLowerCase().substr(0, 2), //语言
  fallbackLocale: 'en', //default locale
  silentTranslationWarn: true, //close message
  messages: exchange(config.lang)
})

