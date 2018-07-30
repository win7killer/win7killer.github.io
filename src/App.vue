<template>
<div id="app" :class="['app', `app-${$route.name.toLowerCase()}`]">
    <Header bgColor="#333">
        <Nav bgColor="#333" :routerName="routerName"></Nav>
    </Header>
    <div class="layout" :style="{
        height: $route.name === 'Main' ? `${appLayoutHeight}` : 'auto'
    }">
        <router-view/>
    </div>
    <Footer></Footer>

</div>
</template>

<script>
import Header from '@/modules/common/Header';

import Nav from '@/modules/common/Nav';
export default {
    name: 'App',
    data() {
        return {
            cWidth: window.innerWidth,
            cHeight: window.innerHeight,
        };
    },
    computed: {
        year() {
            return new Date().getFullYear();
        },
        navWidth() {
            return this.cWidth >= 1000 ? this.cWidth : 1000;
        },
        routerName() {
            return this.$route.name;
        },
        appLayoutHeight() {
            console.log(this.cHeight);
            return `${this.cHeight - 57 - 61}px`;
        }
    },
    mounted() {
        this.cWidth = document.body.innerWidth;
        this.bindEvn();
    },
    components: {
        Nav,
        Header,
    },
    methods: {
        bindEvn() {
            window.addEventListener('resize', (e) => {
                this.cHeight = window.innerHeight >= 600 ? window.innerHeight : 600;
            })
        }
    },
};
</script>

<style lang="less">
.app {
    font-family: sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana, ;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    color: #333;
    background: #fcfcfc;
}
.app-main {

}
.app-article {
    &>.layout {
        min-height: 800px;
    }
}
</style>
