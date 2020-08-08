import i18n from '../i18n/index'
import guide from '@/components/doc/guide_1'
import policy from '@/components/doc/policy'
import about from '@/components/doc/about'
import refund from '@/components/doc/refund'

export default new VueRouter({
  routes: [
    // {
    //   path: 'login.html',
    //   name: 'login',
    //   component: () => import('@/components/user/login'),
    //   meta: {
    //     title: '登录'
    //   }
    // },
    // {
    //   path: '/register.html',
    //   name: 'register',
    //   component: () => import("/components/user/register"),
    //   meta: {
    //     title: '注册'
    //   }
    // },
    // {
    //   path: '/userInfo.html',
    //   name: 'userInfo',
    //   component: () => import('@/components/cache/userInfo'),
    //   meta: {
    //     title: '用户信息'
    //   }
    // },
    // {
    //   path: '/recharge.html',
    //   name: 'recharge',
    //   component: () => import('@/components/cache/recharge'),
    //   meta: {
    //     title: '充值'
    //   }
    // },
    // {
    //   path: '/view.html/:bookId/:id',
    //   name: 'view',
    //   component: () => import('@/components/cache/view'),
    //   meta: {
    //     title: '章节详情(未启用)'
    //   }
    // },
    // {
    //   path: '/chapter.html/:id',
    //   name: 'chapter',
    //   component: () => import('@/components/chapter'),
    //   meta: {
    //     title: '目录页(未启用)'
    //   }
    // },
    // {
    //   path: '/weekList.html',
    //   name: 'weekList',
    //   component: () => import('@/components/cache/weekList'),
    //   meta: {
    //     keepAlive: true,
    //     title: "更新时间(未启用)"
    //   }
    // },
    // {
    //   // path: '/payfor.html/:payUrl',
    //   path: '/payfor.html/:payForm',
    //   name: 'payfor(未启用)',
    //   component: () => import('@/components/cache/payfor'),
    // },
    // {
    //   path: '/userCtrl.html',
    //   name: 'userCtrl',
    //   component: () => import('@/components/user/userCtrl') //用户登录注册
    // },
    {
      path: '/',
      name: 'main',
      component: () => import('@/components/main'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/login.html',
      name: 'login',
      component: () => import('@/components/user/login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register.html',
      name: 'register',
      component: () => import('@/components/user/register'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/new_info.html',
      name: 'new_info',
      component: () => import('@/components/new_info'),
    },
    {
      path: '/new_infos.html',
      name: 'new_infos',
      component: () => import('@/components/new_infos'),
    },
    {
      path: '/info_detl.html',
      name: 'info_detl',
      component: () => import('@/components/info_detl'),
      meta: {
        title: i18n.t("infoDetl.title")
      },
    },
    {
      path: '/new_charging.html',
      name: 'new_charging',
      component: () => import('@/components/new_charging'), //充值
      meta: {
        title: i18n.t("recharge.recharge")
      }
    },
    {
      path: '/new_detl.html/:id/:title?',
      name: 'new_detl',
      component: () => import('@/components/new_detl'), //漫画详情
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/new_view.html/:bookId/:id',
      name: 'new_view',
      component: () => import('@/components/new_view') //章节内容
    },
    {
      path: '/bookmark.html',
      name: 'bookmark',
      component: () => import('@/components/bookmark') //收藏
    },
    {
      path: '/new_week.html',
      name: 'new_week',
      component: () => import('@/components/new_week'),
      meta: {
        keepAlive: true,
        title: i18n.t('index.updateHead')
      }
    },
    {
      path: '/ranking.html',
      name: 'ranking',
      component: () => import('@/components/ranking'),
      meta: {
        keepAlive: true,
        title: i18n.t('index.rankHead')
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
      path: '/feedback.html',
      name: 'feedback',
      component: () => import('@/components/feedback'),
      meta: {
        title: i18n.t('suggest.txt')
      }
    },
    {
      path: '/search.html',
      name: 'search',
      component: () => import('@/components/search'),
      meta: {
        title: i18n.t("search.search"),
        keepAlive: true
      }
    },
    // {
    //   path: '/guide.html',
    //   name: 'guide',
    //   component: () => import('@/components/doc/guide'),
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    {
      path: '/guide.html',
      name: 'guide',
      // component: () => import('@/components/doc/guide_1'),
      component: guide,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/policy.html',
      name: 'policy',
      // component: () => import('@/components/doc/policy'),
      component: policy,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/about.html',
      name: 'about',
      // component: () => import('@/components/doc/about'),
      component: about,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/refund.html',
      name: 'refund',
      // component: () => import('@/components/doc/refund'),
      component: refund,
      meta: {
        keepAlive: true
      }
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