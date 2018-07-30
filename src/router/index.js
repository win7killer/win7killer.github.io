import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main';
import Article from '@/views/Article.vue';
import VueDemo from '@/views/VueDemo.vue';

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
    }]
});
