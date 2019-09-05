<template>
<nav id="main-nav" class="main-nav" :style="{
    width: width + 'px'
}">
    <el-menu :default-active="activeIndex" class="el-menu-nav clearfix" mode="horizontal" @select="handleSelect" :background-color="bgColor" text-color="#fff" active-text-color="#64D8FF">

        <el-menu-item class="nav-item" v-for="(item, index) in navList" :key="index" :index="`${index}`">
            <router-link v-if="!item.isOut" :to="item.link">{{item.title}}</router-link>
            <a v-else :href="item.link" :target="item.target || '_self'">{{item.title}}</a>
        </el-menu-item>
        <el-menu-item class="nav-item float-right">
            <a :href="github_link" target="_blank">
                <em class="icon icon-github_out" :style="{color: '#fff', fontSize: '24px'}"></em>
            </a>
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
                link: 'http://www.cnblogs.com/ufex/',
                target: '_blank'
            }, {
                title: 'CODE_PEN',
                isOut: true,
                link: 'https://codepen.io/win7killer/',
                target: '_blank'
            }],
            github_link: 'https://github.com/win7killer'
        };
    },
    props: {
        bgColor: String,
        width: Number,
    },
    computed: {
        activeIndex() {
            for (let i = 0, l = this.navList.length; i < l; i++) {
                if (this.navList[i].link === this.$route.path) {
                    return i + '';
                }
            }
            return '0';
        }
    },
    methods: {
        handleSelect() {

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

        &.float-right {
            float: right;
        }
    }

}
</style>
