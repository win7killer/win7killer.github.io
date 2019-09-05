<template>
<div class="process-box">
    <div :class="['top-box ', flag ? 'show' : '']">
        <div class="roll-item top-roll" :style="{
          transform: `rotate(${3.6 * process}deg)`
        }"></div>
    </div>
    <div :class="['roll-item bottom-roll', flag ? 'show' : '']"></div>
    <div class="inner">
        <span class="text">{{getNum}}%</span>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            process: 0,
            timmer: null,
            flag: false,
            start: false,
        }
    },
    mounted () {
        this.load();
    },
    computed: {
        getNum () {
            return this.process.toFixed(2);
        }
    },
    watch: {
        process (val, oldVal) {
            if (val >= 50 && oldVal < 50) {
                this.flag = true;
            } else if (val > 0 && oldVal < 100 && val < oldVal) {
                this.flag = false;
            }
        }
    },
    methods: {
        load () {
            this.start = true;
            clearInterval(this.timmer);
            this.timmer = setInterval(() => {
                this.process = this.process + 0.12;
                if (this.process >= 100) {
                    this.process = 100;
                    this.unload();
                }
            }, 16.6);
        },
        unload () {
            this.start = false;
            clearInterval(this.timmer);
        }
    }
}
</script>

<style lang="less" scoped>
.flex-center() {
    display: flex;
    justify-content: center;
    align-items: center;
}

.process-box {
    @diam: 200px;
    @bg_color: #eee;
    width: @diam;
    height: @diam;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    background: @bg_color;
    .flex-center();
    .top-box {
        width: 50%;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 3;
        overflow: hidden;
        &.show {
            overflow: visible;
        }
    }
    .roll-item {
        width: @diam;
        height: @diam;
        border-radius: 50%;
        background: linear-gradient(to right, #09f 49.99%, rgba(255, 255, 255, 0) 50%);
        position: absolute;
        top: 0;
    }
    .top-roll {
        z-index: 2;
        right: 0;
    }
    .bottom-roll {
        z-index: 1;
        left: 0;
        opacity: 0;
        transform: rotate(180deg);
        &.show {
            opacity: 1;
        }
    }
    .inner {
        width: 94%;
        height: 94%;
        border-radius: 50%;
        background: @bg_color;
        position: relative;
        z-index: 4;
        .flex-center();
        .text {
            font-size: 24px;
            color: #f90;
            font-weight: bold;
            font-family: monospace;
        }
    }
}
</style>
