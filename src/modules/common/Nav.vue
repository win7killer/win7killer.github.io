<template>
<nav id="main-nav" class="main-nav" :style="{
    width: width + 'px'
}">
    <el-menu :default-active="activeIndex" class="el-menu-nav" mode="horizontal" @select="handleSelect" :background-color="bgColor" text-color="#fff" active-text-color="#64D8FF">

        <el-menu-item class="nav-item" v-for="(item, index) in navList" :key="index" :index="`${index}`">
            <router-link v-if="!item.isOut" :to="item.link">{{item.title}}</router-link>
            <a v-else :href="item.link" :target="item.target || '_self'">{{item.title}}</a>
        </el-menu-item>
    </el-menu>
</nav>
</template>

<script>
export default {
    data() {
        return {
            navList: [{
                title: 'Home',
                link: '/',
                default: true
            }, {
                title: '文章',
                link: '/article',
            }, {
                title: 'VUE_DEMO',
                link: '/vue_demo/HelloWorld',
            }, {
                title: '博客园',
                isOut: true,
                link: 'http://www.cnblogs.com/ufex/'
            }]
        };
    },
    props: {
        bgColor: String,
        width: Number,
    },
    computed: {
        activeIndex() {
            for (let i = 0, l = this.navList.length; i < l; i++) {
                if (this.navList[i].link === window.location.hash.replace('#', '')) {
                    return i + '';
                }
            }
            return '0';
        }
    },
    methods: {
        handleSelect(key, keyPath) {

        }
    }
};
</script>

<style lang="less">
.main-nav {
    .el-menu-nav {
        // padding-left: 55px;
    }
    margin: 0 auto;
    .nav-item {
        padding: 0;
        a {
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
            padding: 0 24px;
            display: block;
        }
    }
}
</style>
