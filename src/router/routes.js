import i18n from '@/i18n/index'
import guide from '@/components/doc/guide_1'
import policy from '@/components/doc/policy'
import about from '@/components/doc/about'
import refund from '@/components/doc/refund'
import diffRoutes from 'x/routes'

console.log(diffRoutes)

// 公用的路由
const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('x/views/main'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/login.html',
    name: 'login',
    component: () => import('x/views/user/login'),
  },
  {
    path: '/register.html',
    name: 'register',
    // component: () => import('@/components/user/register'),
    component: () => import('x/views/user/register'),
  },
  {
    path: '/new_infos.html',
    name: 'new_infos',
    component: () => import('x/views/new_infos'),
    meta: {
      title: i18n.t("userInfo.info")
    }
  },
  {
    path: '/new_charging.html',
    name: 'new_charging',
    component: () => import('x/views/new_charging'), //充值
    meta: {
      title: i18n.t("recharge.recharge")
    }
  },
  {
    path: '/new_detl.html/:id/:title?',
    name: 'new_detl',
    component: () => import('x/views/new_detl'), //漫画详情
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/new_view.html/:bookId/:id',
    name: 'new_view',
    component: () => import('x/views/new_view'), //漫画详情
  },
  {
    path: '/ranking.html',
    name: 'ranking',
    component: () => import('x/views/ranking'), //漫画详情
    meta: {
      keepAlive: true,
      title: i18n.t('index.rankHead')
    }
  },
  {
    path: '/groupItem.html/:type/:id',
    name: "groupItem",
    component: () => import('x/views/groupItem'),
    meta: {
      title: "",
      keepAlive: true
    }
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
    path: '/new_week.html',
    name: 'new_week',
    component: () => import('@/components/new_week'),
    meta: {
      keepAlive: true,
      title: i18n.t('index.updateHead')
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
    path: '/search.html/:key?',
    name: 'search',
    component: () => import('@/components/search'),
    meta: {
      title: i18n.t("search.search"),
      keepAlive: true
    }
  },
  {
    path: '/guide.html',
    name: 'guide',
    component: guide,
    meta: {
      keepAlive: true,
      title: ' '
    }
  },
  {
    path: '/policy.html',
    name: 'policy',
    component: policy,
    meta: {
      keepAlive: true,
      title: ' '
    }
  },
  {
    path: '/about.html',
    name: 'about',
    component: about,
    meta: {
      keepAlive: true,
      title: ' '
    }
  },
  {
    path: '/refund.html',
    name: 'refund',
    component: refund,
    meta: {
      keepAlive: true,
      title: ' '
    }
  },
  {
    path: '/share_link.html',
    name: "share_link",
    component: () => import(`@/components/share_link`),
    meta: {
      title: i18n.t('shareLink.title')
    }
  },
  {
    path: '/paid_record.html',
    name: "paid_record",
    component: () => import(`@/components/paid_record`),
    meta: {
      title: i18n.t('paidRecord.title')
    }
  }
]

if (diffRoutes.length > 0) {
  routes.push(...diffRoutes);
}

routes.push(
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
    path: "*",
    redirect: "/404.html"
  }
)

export default new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) { //自动滚到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})