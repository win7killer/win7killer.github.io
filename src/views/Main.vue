<template>
<div id="main" class="main">

    <h1>FE_Bean's show
        <p class="desc text-right">-- Just a little FE...</p>
    </h1>

    <ul class="info no-style-list">
        <li class="field" v-for="(item, index) in infoList" :key="index">
            <span class="title text-right">{{item.title}}:</span>
            <span class="value">{{item.value}}</span>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    data() {
        return {
            infoList: [{
                title: 'Nickname',
                value: '😀 fe_bean | win7killer'
            }, {
                title: 'Sex',
                value: '🚹 male'
            }, {
                title: 'Profession',
                value: '👨‍💻‍ FE-developer'
            }, {
                title: 'Area',
                value: '🌏 Asia'
            }, {
                title: 'Country',
                value: '🇨🇳 China'
            }, {
                title: 'E-mail',
                value: '📧 win7killer@163.com'
            }],
        };
    },
    props: {
        cHeight: Number
    },
    components: {

    }
};
</script>

<style lang="less" scoped>
@import "~@/css/theme.less";
.main {
    h1 {
        display: inline-block;
        font-size: 80px;
        font-weight: bold;
        text-shadow: 7px 7px 10px #999;
        margin-bottom: 20px;
    }
    .desc {
        font-size: 24px;
        color: @theme-blue;
        transform: translate(25%, 0);
    }
    .info {
        padding-left: 0;
    }
    .field {
        list-style: none;
        padding: 8px 4px;
        font-size: 18px;
        display: flex;
        .title {
            width: 80px;
            display: inline-block;
            margin-right: 24px;
        }
    }
}

</style>
<style lang="less" scoped>
.main {
    .layout {
        width: 800px;
        margin: 0 auto;
        height: 100%;
        // height: 500px;
    }
}

.footer {}
</style>
