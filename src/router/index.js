import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main';
import Article from '@/views/Article.vue';

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
    }]
});
