import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import initFilter from '@/filter';
import 'element-ui/lib/theme-chalk/index.css';
import '@/css/common.less';

Vue.config.productionTip = false;
Vue.use(ElementUI);
initFilter();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
