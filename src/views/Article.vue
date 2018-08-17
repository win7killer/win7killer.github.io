<template>
<div class="article">
    <ArticleList></ArticleList>
</div>
</template>

<script>
import ArticleList from '@/modules/ArticleList';

export default {
    data() {
        return {};
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
</style>
