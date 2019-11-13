export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/components/main'),
      meta: {
        keepAlive: true,
        title: '首页'
      }
    },
    {
      path: '/login.html',
      name: 'login',
      component: () => import('@/login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register.html',
      name: 'register',
      component: () => import("@/register"),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/userInfo.html',
      name: 'userInfo',
      component: () => import('@/components/userInfo'),
      meta: {
        title: '用户信息'
      }
    },
    {
      path: '/recharge.html',
      name: 'recharge',
      component: () => import('@/components/recharge'),
      meta: {
        title: '充值'
      }
    },
    {
      path: '/new_detl.html/:id/:title?',
      name: 'new_detl',
      component: () => import('@/components/new_detl'),
      meta: {
        keepAlive: true,
        title: '详情页'
      }
    }, {
      path: '/view.html/:bookId/:id',
      name: 'view',
      component: () => import('@/components/cache/view'),
      meta: {
        title: '章节详情(未启用)'
      }
    },
    {
      path: '/new_view.html/:bookId/:id',
      name: 'new_view',
      component: () => import('@/components/new_view'),
      meta: {
        title: '章节详情'
      }
    },
    {
      path: '/chapter.html/:id',
      name: 'chapter',
      component: () => import('@/components/chapter'),
      meta: {
        title: '目录页(未启用)'
      }
    },
    {
      path: '/weekList.html',
      name: 'weekList',
      component: () => import('@/components/cache/weekList'),
      meta: {
        keepAlive: true,
        title: "更新时间(未启用)"
      }
    },
    {
      path: '/new_week.html',
      name: 'new_week',
      component: () => import('@/components/new_week'),
      meta: {
        keepAlive: true,
        title: "更新时间"
      }
    },
    {
      path: '/ranking.html',
      name: 'ranking',
      component: () => import('@/components/ranking'),
      meta: {
        keepAlive: true,
        title: "排行"
      }
    },
    {
      path: '/groupItem.html/:type/:id',
      name: "groupItem",
      component: () => import('@/components/groupItem'),
      meta: {
        title: "更多漫画",
        keepAlive: true
      }
    },
    {
      path: '/suggest.html',
      name: 'suggest',
      component: () => import('@/components/suggest'),
      meta: {
        title: '建议反馈'
      }
    },
    {
      path: '/search.html',
      name: 'search',
      component: () => import('@/components/search'),
      meta: {
        title: '搜索',
        keepAlive: true
      }
    },
    {
      // path: '/payfor.html/:payUrl',
      path: '/payfor.html/:payForm',
      name: 'payfor(未启用)',
      component: () => import('@/components/payfor'),
    },
    {
      path: "/404.html",
      name: "notFound",
      component: () => import('@/components/common/404')
    },
    {
      path: '/406',
      name: '406',
      component: () => import('@/components/common/406')
    },
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404.html"
    }
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