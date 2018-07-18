<template>
<div class="article-list-wrpper">
    <h1 class="main-title">文章列表</h1>
    <ul class="article-list no-style-list">
        <li class="item" v-for="(item, index) in docMap.list" :key="index">
            <div>
                <h3 class="article-title">
                    <a :href="'/' + item.name">
                        {{item.title}}
                    </a>
                </h3>
                <p class="article-info">
                    <span class="author">作者：{{item.author}}</span>
                    <span class="create-time">发布时间：{{item.create_time|time('Y-M-D H:M')}}</span>
                    <span class="update-time">更新时间：{{item.update_time|time('Y-M-D H:M')}}</span>
                </p>
                <p><a :href="'/' + item.name">{{item.summary}}</a></p>
            </div>
        </li>
    </ul>
    <p>一共 {{docMap.list.length}} 篇</p>
</div>
</template>

<script>
import docMap from '@/docMap.json';
export default {
    data() {
        return {
            docMap
        };
    },
    props: {}
}
</script>

<style lang="less" scoped>
.article-list {
    .article-day {
        margin-bottom: 12px;
        overflow: hidden;
        &::after {
            width: 200%;
            content: ' ';
            background: linear-gradient(to left, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
            height: 3px;
            display: block;
            position: relative;
            top: 10px;
            margin-bottom: 20px;
            opacity: 0.7;
            animation: show 3s infinite linear;
        }
    }
    .item {
        margin-bottom: 12px;
        overflow: hidden;
        &::after {
            width: 200%;
            content: ' ';
            background: #eee;
            box-shadow: 0 1px 1px 0px #999 inset;
            height: 4px;
            display: block;
            position: relative;
            top: 10px;
            margin-bottom: 20px;
            opacity: 0.7;
            animation: show 3s infinite linear;
        }
    }
}

.article-title {
    color: #09f;
    text-shadow: 3px 3px 4px #ccc;
    font-size: 20px;
}

.article-info {
    font-size: 12px;
    color: #999;
    span {
        margin-right: 16px;
    }
}

.main-title {
    background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f);
    font-size: 28px;
    display: inline-block;
    -webkit-background-clip: text;
    color: transparent;
}

@keyframes show {
    0% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(0);
    }
}

</style><style lang="less" scoped>
</style>
