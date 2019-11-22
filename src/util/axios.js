import util from './util'

const instance = axios.create({
  withCredentials: true,
  timeout: 10 * 1000
});

var idx = 0;

//拦截器
instance.interceptors.response.use(function (response) {
  if (response.data.code == 401) {
    // console.log('未登录');
    localStorage.setItem('loginTips', ++idx);
    if (idx < 3) {
      util.Toast('tips.tiplogin');
    }
    util.clearItem();
    // router.push({ name: 'login' });
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default instance
