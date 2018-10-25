<template>
<div class="article">
    <ArticleList></ArticleList>
    <div ref="ani" class="animate"></div>
</div>
</template>

<script>
import ArticleList from '@/modules/ArticleList';

export default {
    data() {
        return {};
    },
    mounted() {
        this.$refs.ani.addEventListener('webkitAnimationStart', e => {
            console.log(e);
            console.log('start');
        });
        this.$refs.ani.addEventListener('webkitAnimationEnd', e => {
            console.log(e);
            console.log('end');
        });
    },
    components: {
        ArticleList,
    },
};
</script>

<style lang="less">
.ba_1, .ba_2, .ba_3, .ba_4 {
    width: 7.5rem;
    background-size: 100% 100%;
}
.ba_1 {
    height: 3.2rem;
    background: #00f;
}
.ba_2 {
    height: 4rem;
    background: #800;
}
.ba_3 {
    height: 8rem;
    background: #080;

}
.ba_4 {
    height: 10rem;
    background: #000;

}

.animate {
    animation: aniframe 3s linear 1s infinite;
    background: #09f;
    height: 100px;
}

@keyframes aniframe {
    0% {
        width: 100px;
    }
    50% {
        width: 400px;
    }
    100% {
        width: 100px;
    }
}
</style>
