import Vue from 'vue';
import Router from 'vue-router';
// const Main = () => import('@/views/Main');
// const VueDemo = () => import('@/views/VueDemo.vue');
// const Article = () => import('@/views/Article.vue');

const Main = r => {
    require.ensure([], () => {
        return r(require('@/views/Main'));
    });
};
const VueDemo = render => {
    require.ensure([], function () {
        return render(require('@/views/VueDemo.vue').default);
    });
};
// const Article = () => import('@/views/Article.vue');
const Article = require('@/views/Article.vue');
console.log(Main);
console.log(VueDemo);
console.log(Article);

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'Main',
        component: Main
    }, {
        path: '/article',
        name: 'Article',
        component: render => render(Article)
    }, {
        path: '/vue_demo/:id',
        name: 'VueDemo',
        component: VueDemo
    }]
});
