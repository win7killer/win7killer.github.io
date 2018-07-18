<template>
<div class="article">
    <div class="layout">
        <ArticleList></ArticleList>
    </div>
    <Footer></Footer>
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

</style>
