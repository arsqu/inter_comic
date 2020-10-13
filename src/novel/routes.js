import i18n from '@/i18n/index'

export default [
  { // novel
    path: '/paid_book.html',
    name: 'paid_book',
    // component: () => import(`@/novel/views/paid_book`),
    component: () => import(`x/views/paid_book`),
    meta: {
      title: i18n.t("index.free")
    }
  },
  { // novel
    path: '/cate_book.html',
    name: 'cate_book',
    // component: () => _import(`${output}/views/cate_book`),
    component: () => import(`x/views/cate_book`),
    meta: {
      title: i18n.t("index.category")
    }
  }
]