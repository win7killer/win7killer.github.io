// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/css/common.less';
import VueSimpleMarkdown from 'vue-simple-markdown';
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vue-simple-markdown/dist/vue-simple-markdown.css';
import initFilter from '@/filter';
import Footer from '@/modules/common/Footer';
Vue.use(ElementUI);
Vue.use(VueSimpleMarkdown);
Vue.component('Footer', Footer);
// Vue.use(Footer, 'Footer');
Vue.config.productionTip = false;
initFilter();
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});
