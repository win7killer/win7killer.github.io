<template>
<div class="vue-demo-list clearfix">
    <div class="left">
        <h3>Demo List</h3>
        <ul class="no-style-list">
            <li v-for="(item, index) of componentsMap" :key="index" :class="{
                cur: componentId === index
            }">
                <router-link class="demo-nav-item" :to="`/vue_demo/${index}`">{{index}}</router-link>
            </li>
        </ul>
    </div>
    <div class="right">
        <div v-if="componentId === 'ColorPicker'" class="color-picker-demo" :style="{
            background: bg
        }">
            <ColorPicker @afterPicked="afterPicked"></ColorPicker>
            <p :class="['show-color', colorData.isDeep ? '' : 'black']">
                <span class="rgb">RGB: {{colorData.rgb}}</span>
                <span class="hex">HEX: {{colorData.hex}}</span>
            </p>
        </div>
        <template v-else>
            <component :is="componentId"></component>
        </template>
    </div>
</div>
</template>

<script>
const HelloWorld = () => import('@/components/HelloWorld');
const ColorPicker = () => import('@/components/ColorPicker');
const CodeVideo = () => import('@/components/CodeVideo');
const CodeGif = () => import('@/components/CodeGif');
const CodePic = () => import('@/components/CodePic');
const CharDeep = () => import('@/components/CharDeep');
const IconAnimate = () => import('@/components/Icon');
const CricleProcess = () => import('@/components/Process');

let componentsMap = {
    HelloWorld,
    ColorPicker,
    CodeVideo,
    CodeGif,
    CodePic,
    CharDeep,
    IconAnimate,
    CricleProcess,
};

export default {
    data() {
        return {
            bg: '#ccc',
            colorData: {
                rgb: '',
                hex: ''
            },
            componentsMap
        };
    },
    computed: {
        componentId() {
            let id = this.$route.params.id;
            if (!componentsMap[id]) {
                return this.$router.replace('/')
            }
            return  id;;
        },
    },
    mounted() {
        console.log(this.components);
    },
    components: componentsMap,
    methods: {
        afterPicked(val) {
            this.colorData = val;
            this.bg = val.rgb;
        }
    }
};
</script>

<style lang="less">

.char_box {
    transform-origin: 0 0;
    transform: scale(.5);
    tt {
        color: #000;
        font-size: 14px;

    }
}

a {
    text-decoration: none;
}
.vue-demo-list {
    display: flex;
    min-height: 800px;
    @background: #333;
    .no-style-list {
        li {
            width: 100px;
            // height: 24px;
            // line-height: 24px;
            padding: 8px;
            // background: linear-gradient(to right, rgb(0, 0, 0), rgb(196, 196, 196));
            background: #333;
            border-bottom: 1px solid #09f;
            a {
                color: #fff;
            }
            &:hover {
                background: lighten(#09f, 10%);
            }
        }
        .demo-nav-item {
            display: block;

        }
        .cur {
            background: #09f;
        }
    }
}

.left {
    // width: 150px;
    margin-right: 60px;
    float: left;
}

.right {}

.show-color {
    .rgb,
    .hex {
        text-shadow: 0px 0px 10px #ccc;
        width: 100px;
        font-size: 20px;
        font-weight: bold;
    }
    &.black {
        color: #fff;
    }
}
</style>
