const loading = () => import('./loading.vue');

export default (Vue) => {
  Vue.component('loading', loading);
}

