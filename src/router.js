import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    routes: [{
        path: '/',
        name: 'Main',
        component: () => import(/* webpackChunkName: "about" */ './views/Main')
    }, {
        path: '/article',
        name: 'Article',
        component: () => import(/* webpackChunkName: "about" */ './views/Article')
    }, {
        path: '/vue_demo/:id',
        name: 'VueDemo',
        component: () => import(/* webpackChunkName: "about" */ './views/VueDemo')
    }, {
        path: '/demo',
        name: 'Demo',
        component: () => import(/* webpackChunkName: "about" */ './views/Demo')
    }]
});
