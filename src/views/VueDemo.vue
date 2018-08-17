<template>
<div class="vue-demo-list clearfix">
    <div class="left">
        <h3>Demo List</h3>
        <ul class="no-style-list">
            <li>
                <router-link to="/vue_demo/HelloWorld">HelloWorld</router-link>
                <router-link to="/vue_demo/ColorPicker">ColorPicker</router-link>
                <router-link to="/vue_demo/CharDeep">CharDeep</router-link>
                <router-link to="/vue_demo/CodeVideo">CodeVideo</router-link>

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
import HelloWorld from '@/components/HelloWorld';
import ColorPicker from '@/components/ColorPicker';
import CodeVideo from '@/components/CodeVideo';
import CharDeep from '@/components/CharDeep';

let componentsMap = {
    HelloWorld,
    ColorPicker,
    CodeVideo,
    CharDeep,
};

export default {
    data() {
        return {
            bg: '#ccc',
            colorData: {
                rgb: '',
                hex: ''
            }
        };
    },
    computed: {
        componentId() {
            return this.$route.params.id;
        },
        getId() {
            return this.$route.params.id;
        }
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

<style lang="less" scoped>
.vue-demo-list {
    display: flex;
    min-height: 800px;
}

.left {
    width: 200px;
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
