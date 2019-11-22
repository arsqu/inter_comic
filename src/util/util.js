
var toast, i18n;

function statistics(ch, status) {
  if (_hmt)
    _hmt.push(["_trackEvent", ch, status]); //充值失败数
}

function closeToast() {
  if (toast)
    toast.close();
}

function awaitReturn(promise) {
  // return promise.then(data => [null, data]).catch(err => [err, null]);
  return promise.then(data => data).catch(err => null);
}

function replaceUrl(url, param) {
  return url + '.html/' + param.join('/');
}

function Toast(txt, trans) {
  if (txt) {
    i18n = i18n || window.vm.$i18n;
    // console.log(trans, i18n.t(txt));
    txt = !trans ? i18n.t(txt) : txt
    if (toast)
      toast.close();
    toast = window.Vue.$toast(txt);
  }
}

//移除样式
function clearItem() {
  var l = localStorage;
  l.removeItem("isLogin");
  l.removeItem("bookId");
  // l.removeItem("cache_chapter");
  l.removeItem("autoBuy");
  l.removeItem("loginTips");
  l.removeItem("uname");
  l.removeItem("money");
  l.removeItem("path");
  l.removeItem("detl_from");
}

export default {
  clearItem, replaceUrl,
  awaitReturn,
  closeToast, Toast,
  statistics
}