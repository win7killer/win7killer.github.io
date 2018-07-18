<template>
<div id="app">
    <Header bgColor="#333">
        <Nav bgColor="#333" ></Nav>
    </Header>
    <router-view :cHeight="appHeight"/>
</div>
</template>

<script>
import Header from '@/modules/common/Header';

import Nav from '@/modules/common/Nav';
export default {
    name: 'App',
    data() {
        return {
            cWidth: document.body.clientWidth,
            cHeight: document.body.clientHeight,
        };
    },
    computed: {
        year() {
            return new Date().getFullYear();
        },
        navWidth() {
            return this.cWidth >= 1000 ? this.cWidth : 1000;
        },
        appHeight() {
            return this.cHeight;
        }
    },
    mounted() {
        this.cWidth = document.body.clientWidth;
        window.hljs.initHighlightingOnLoad();
        this.bindEvn();
    },
    components: {
        Nav,
        Header,
    },
    methods: {
        bindEvn() {
            window.addEventListener('resize', (e) => {
                this.cWidth = document.body.clientWidth;
                this.cHeight = document.body.clientHeight;
            })
        }
    },
};
</script>

<style>
#app {
    font-family: sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana, ;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    color: #333;
    background: #fcfcfc;
}

</style>
