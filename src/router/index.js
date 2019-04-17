import Vue from 'vue';
import Router from 'vue-router';
const Main = () => import('@/views/Main');
const VueDemo = () => import('@/views/VueDemo.vue');
const Article = () => import('@/views/Article.vue');
const Demo = () => import('@/views/Demo.vue');

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'Main',
        component: Main
    }, {
        path: '/article',
        name: 'Article',
        component: Article
    }, {
        path: '/vue_demo/:id',
        name: 'VueDemo',
        component: VueDemo
    }, {
        path: '/demo',
        name: 'demo',
        component: Demo
    }]
});
