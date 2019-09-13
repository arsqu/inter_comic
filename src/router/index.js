// import Vue from 'vue'
// import Router from 'vue-router'
// const list = () => import('@/components/cache/list')
// const recommend = () => import('@/components/cache/recommend')
// const downFile = () => import('@/components/cache/downFile') //下载
// const detail = () => import('@/components/cache/detail') //详情页
// const ebook = () => import('@/components/cache/ebook') //电子书

// Vue.use(Router)

// export default new Router({
  export default new VueRouter({
  routes: [{
    path: '/',
    name: 'main',
    component: () => import('@/components/main'), //首页
    meta: {
      keepAlive: true,
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/login'), //首页
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/register'), //首页
    meta: {
      title: '注册'
    }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/components/userInfo'), //首页
    meta: {
      title: '用户信息'
    }
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: () => import('@/components/recharge'), //首页
    meta: {
      title: '充值'
    }
  },
  {
    path: '/new_detl/:id/:title',
    name: 'new_detl',
    component: () => import('@/components/new_detl'), //详情页
    meta: {
      keepAlive: true,
      title: '详情页'
    }
  }, {
    path: '/view/:id',
    name: 'view',
    component: () => import('@/components/view'),
    meta: {
      title: '漫画章节'
    }
  },
  {
    path: '/chapter/:id',
    name: 'chapter',
    component: () => import('@/components/chapter'), //目录页,
    meta: {
      title: '目录页'
    }
  },
  {
    path: '/weekList',
    name: 'weekList',
    component: () => import('@/components/weekList'), //更新列表
    meta: {
      keepAlive: true,
      title: "更新时间"
    }
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('@/components/ranking'), //排行榜
    meta: {
      keepAlive: true,
      title: "排行"
    }
  },
  {
    path: '/groupItem/:type/:id',
    name: "groupItem",
    component: () => import('@/components/groupItem'), //更多漫画
    meta: {
      title: "更多漫画",
      keepAlive: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/components/search'), //搜索
  }
    // , {
    //   path: '/list/:key/:url',
    //   name: 'list',
    //   component: list
    // }, {
    //   path: '/recommend/:key/:url',
    //   name: 'recommend',
    //   component: recommend
    // },
    // {
    //   path: '/downFile/:key/:url',
    //   name: 'downFile',
    //   component: downFile
    // },
    // {
    //   path: '/detail',
    //   name: 'detail',
    //   component: detail
    // },
    // {
    //   path: '/ebook',
    //   name: 'ebook',
    //   component: ebook
    // }
  ],
  mode: "history", //隐藏地址栏#号
  scrollBehavior(to, from, savedPosition) { //自动滚到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})