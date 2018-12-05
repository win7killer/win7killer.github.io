<template>
<div id="main" class="main">

    <h1>FE_Bean's show
        <p class="desc text-right">-- Just a little FE...</p>
    </h1>
    <Chicken class="pos-chicken"></Chicken>
    <ul class="info no-style-list">
        <li class="field" v-for="(item, index) in infoList" :key="index">
            <span class="title text-right">{{item.title}}:</span>
            <span class="value">{{item.value}}</span>
        </li>
    </ul>
</div>
</template>

<script>
import Chicken from '@/components/Chicken';
export default {
    data() {
        return {
            infoList: [{
                title: 'Nickname',
                value: 'fe_bean | win7killer'
            }, {
                title: 'Sex',
                value: 'male'
            }, {
                title: 'Profession',
                value: 'FE-developer'
            }, {
                title: 'Area',
                value: 'Asia'
            }, {
                title: 'Country',
                value: 'China'
            }, {
                title: 'E-mail',
                value: 'win7killer@163.com'
            }],
        };
    },
    props: {
        cHeight: Number
    },
    components: {
        Chicken,
    }
};
</script>

<style lang="less" scoped>
@import "~@/css/theme.less";

.main {
    position: relative;

    h1 {
        display: inline-block;
        font-size: 100px;
        font-weight: bolder;
        // text-shadow: 7px 7px 10px #999;
        filter: drop-shadow(7px 7px 4px #999);
        margin-bottom: 20px;
        background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543951252580&di=8c5dd5f4f532d65c014af75d45df15c7&imgtype=0&src=http%3A%2F%2Fimgs.aixifan.com%2Flive%2F1484527776400%2F1484527776400.jpg');
        background-size: 100% 100%;
        // background: linear-gradient(to left, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        // animation: bgMove 5s ease-in-out infinite;
    }

    .desc {
        font-size: 24px;
        color: @theme-blue;
        transform: translate(25%, 0);
        -webkit-background-clip: none;
        -webkit-text-fill-color: @theme-blue;
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
@keyframes bgMove {
    0%, 100% {
        background-position-x: 0%;
    }
    50% {
        background-position-x: 100%;
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

    .pos-chicken {
        position: fixed;
        bottom: 100px;
        right: 100px;
    }
}

.footer {}
</style>
