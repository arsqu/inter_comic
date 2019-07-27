import Vue from 'vue'
// import { Tabbar, TabItem, InfiniteScroll, Spinner, Swipe, SwipeItem, Loadmore } from 'mint-ui';
import { Spinner, Swipe, SwipeItem, Lazyload, InfiniteScroll } from 'mint-ui';

// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);
// Vue.component(Loadmore.name, Loadmore);
Vue.component(Spinner.name, Spinner);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Swipe.name, Swipe);
Vue.use(Lazyload, {
  attempt: 1
});
Vue.use(InfiniteScroll)