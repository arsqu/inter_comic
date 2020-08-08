// mangaline注册流程简化, 取消邮箱验证, 账号密码即可注册(2020/7/20)
const register = {
  // 目前暂未开通短信通道,不开放手机注册
  showPhone: process.env.ENV_CONFIG == 'manga' ? false : true,
  simple: process.env.ENV_CONFIG == 'manga' ? true : false
}

// 获取url参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

// 是否为渠道推广,渠道推广时网站title隐藏,图片替换
if (getQueryString('ch')) {
  localStorage.setItem('isShare', '1')
}

// 域名对应的网站规则
/**
 * siteName 域名
 * outPut 本地文件夹
 * siteName 域名
 */
const siteMap = {
  "www.mangaline.com": {
    phone: '+91 93709 54921',
    siteName: "Mangaline",
    webDir:'Mangaline',
    mail: 'aimghub.com'
  },
  "www.xulinad.com": {
    phone: '+91 93709 54921',
    siteName: "Manga",
    outPut: "Xulinad",
    webDir:'Xulinad',
    mail: 'xulinad.com',
    topUpList: [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000]
  },
  "www.aimghub.com": {
    phone: '+91 74291 32896',
    siteName: "Mangahub",
    webDir: "Mangahub",
    mail: 'aimghub.com'
  },
  "192.168.1.103": {
    phone: '1555151',
    siteName: "Mangahub",
    mail: 'test123.com'
  }
}

const siteDetl = siteMap[location.hostname] || siteMap['www.' + location.hostname] || {};

export default {
  simple: true,
  register,
  // 是否为渠道推广
  share: localStorage.getItem('isShare') || null,
  siteDetl,
  siteName: siteDetl.siteName || process.env.OUT_PUT,
  topUpList: siteDetl.topUpList || [10, 20, 50, 100, 200, 500],
}